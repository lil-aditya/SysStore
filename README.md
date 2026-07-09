# SysStore

Cloud storage system built with Go microservices. Handles file uploads with SHA-256 deduplication, JWT auth, and an NGINX gateway tying everything together. React frontend on top.

## What it does

- Users register, log in, and get a JWT. That token gates every file operation.
- Files are hashed on upload (SHA-256). If the hash already exists in the DB, no duplicate is written to disk — a new `FileReference` is created pointing to the existing blob. Reference counting handles cleanup on delete.
- MIME type validation catches mismatches between what the client declares and what the file actually contains.
- NGINX sits in front, routes `/api/v1/auth/*` to the auth service and `/api/v1/files/*` to the file service. Rate limiting at 10 req/s with burst of 20.
- Each service does graceful shutdown on SIGTERM.

## Architecture

```
┌─────────┐      ┌──────────────┐      ┌──────────────┐
│  React  │─────▶│ NGINX Gateway│─────▶│ Auth Service │──┐
│  Client │      │   (port 80)  │      │  (port 8080) │  │
└─────────┘      │              │      └──────────────┘  │
                 │              │      ┌──────────────┐  │   ┌────────────┐
                 │              │─────▶│ File Service │──┼──▶│ PostgreSQL │
                 └──────────────┘      │  (port 8081) │  │   └────────────┘
                                       └──────────────┘  │
                                       ┌──────────────┐  │
                                       │   db (shared  │──┘
                                       │   models/cfg) │
                                       └──────────────┘
```

## Project layout

```
├── auth-service/        Go service — registration, login, JWT, profile
│   └── pkg/
│       ├── controllers/ request handlers
│       ├── middlewares/  CORS, logging, JWT validation
│       ├── routes/       route definitions
│       └── utils/        JWT generation
├── file-service/        Go service — upload, delete, list, storage stats
│   └── pkg/
│       ├── controllers/ request handlers
│       ├── middlewares/  CORS, logging, auth middleware
│       ├── routes/       route definitions
│       └── utils/        SHA-256 hashing, MIME validation, dedup logic
├── db/                  shared across services (Go workspace)
│   ├── config/          DB connection, env helpers, migrations
│   └── models/          User, File, FileReference, response types
├── api-gateway/         NGINX configs + supervisord for prod
├── client/              React 19 + TypeScript + Tailwind + Vite
├── k8s/                 Kubernetes manifests (namespace, deployments, PVs, ingress)
├── docker-compose.yml   local dev — spins up Postgres, both services, gateway
├── Dockerfile           prod — multi-stage build, both Go binaries + NGINX in one image
├── Makefile             build/run shortcuts
└── go.work              Go workspace linking auth-service, file-service, db
```

## How deduplication works

1. On upload, the file contents are streamed through `sha256` to produce a hash.
2. The DB is queried for a `File` row with that hash.
3. **Hash exists →** skip writing to disk. Create a `FileReference` for the user pointing to the existing `File`. Mark it as duplicate. The `File`'s `reference_count` increments.
4. **Hash is new →** write to `uploads/<hash>.<ext>`, create the `File` row, then create the `FileReference`.
5. On delete, the `FileReference` is removed and `reference_count` decrements. When it hits zero, the physical file is deleted from disk and the `File` row is removed.

There's also a check for the case where the same user uploads the same file twice — it just returns the existing reference without creating a duplicate.

## Running locally

### With Docker Compose (recommended)

```bash
git clone https://github.com/lil-aditya/SysStore.git
cd SysStore

docker-compose up -d
```

This starts:

| Service       | Port   |
|---------------|--------|
| React client  | `5173` |
| NGINX gateway | `80`   |
| Auth service  | `8080` |
| File service  | `8081` |
| PostgreSQL    | `5432` |

Health checks are built in — compose waits for Postgres to be ready before starting the Go services, and waits for both services before starting the gateway.

### Without Docker

You'll need Go 1.24+, Node 18+, and a running Postgres instance.

**1. Database**

```bash
docker run -d --name sysstore-db \
  -e POSTGRES_DB=cloudnativedb \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -p 5432:5432 postgres:15
```

**2. Auth service**

```bash
cd auth-service
cp .env.example .env    # edit DB creds if needed
go run main.go          # starts on :8080
```

**3. File service** (separate terminal)

```bash
cd file-service
cp .env.example .env
go run main.go          # starts on :8081
```

**4. Frontend** (separate terminal)

```bash
cd client
npm install
npm run dev             # starts on :5173
```

Or use the Makefile:

```bash
make build              # compiles both Go services
make run                # builds + runs both
make auth-service       # run just auth
make file-service       # run just file service
```

### Kubernetes

```bash
cd k8s
./deploy-k8s.sh
```

Manifests cover namespace, deployments, services, configmaps, secrets, persistent volumes, and ingress.

## API

### Auth — `auth-service:8080`

| Method | Endpoint                  | Auth | Description               |
|--------|---------------------------|------|---------------------------|
| GET    | `/api/v1/health`          | No   | Health check              |
| POST   | `/api/v1/auth/register`   | No   | Create account, get JWT   |
| POST   | `/api/v1/auth/login`      | No   | Login, get JWT            |
| GET    | `/api/v1/auth/profile`    | Yes  | Get current user profile  |

### Files — `file-service:8081`

| Method | Endpoint                          | Auth | Description                        |
|--------|-----------------------------------|------|------------------------------------|
| GET    | `/api/v1/file-service/health`     | No   | Health check                       |
| POST   | `/api/v1/files/upload`            | Yes  | Upload file (multipart, 10MB max)  |
| GET    | `/api/v1/files/{userID}`          | No   | List files for a user              |
| DELETE | `/api/v1/files/{fileID}`          | Yes  | Delete a file reference            |
| GET    | `/api/v1/users/storage-stats`     | Yes  | Storage usage + dedup stats        |

Upload response includes `was_duplicate`, `saved_bytes`, and current storage stats.

## Environment variables

```bash
# Both services
DB_HOST=localhost
DB_PORT=5432
DB_NAME=cloudnativedb
DB_USER=postgres
DB_PASSWORD=postgres
JWT_SECRET=change-this

# Auth
AUTH_PORT=8080

# File
FILE_PORT=8081

# Production (replaces individual DB vars)
DATABASE_URL=postgres://...
APP_MODE=production
```

Copy `.env.example` in each service directory and fill in your values.

## Tech stack

| Layer     | Tech                                            |
|-----------|-------------------------------------------------|
| Backend   | Go 1.24, gorilla/mux, GORM, bcrypt, godotenv    |
| Frontend  | React 19, TypeScript, Tailwind CSS 4, Vite 7    |
| Database  | PostgreSQL 15                                   |
| Gateway   | NGINX with rate limiting + CORS                 |
| Infra     | Docker, docker-compose, Kubernetes, supervisord  |
| Tooling   | Biome (lint/format), Go workspaces               |

---

Built by [Aditya](https://github.com/lil-aditya)
