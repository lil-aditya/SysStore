import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CloseIcon, Hamburger, Logo } from '@/components';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isAuthenticated = !!localStorage.getItem('token');
  const user = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user') as string)
    : null;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
    setIsMenuOpen(false);
  };

  return (
    <nav className="border-b border-gray-800 sticky top-0 z-50 backdrop-blur-lg bg-gray-950/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link
            to={'/'}
            onClick={() => {
              setIsMenuOpen(false);
            }}
          >
            <span className="flex items-center text-lg font-semibold gap-2 text-white">
              <Logo />
              CloudNative
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            {isAuthenticated ? (
              <>
                <span className="text-gray-400 font-semibold">
                  Welcome, {user?.username || 'User'}!
                </span>

                <Link to="/dashboard">
                  <button
                    type="button"
                    className={`text-gray-300 hover:text-emerald-400 transition-colors duration-200 font-medium px-3 py-2 hover:bg-gray-800/50 rounded-sm cursor-pointer ${
                      location.pathname === '/dashboard' ? 'hidden' : ''
                    }`}
                  >
                    Dashboard
                  </button>
                </Link>

                <Link to="/profile">
                  <button
                    type="button"
                    className={`text-gray-300 hover:text-emerald-400 transition-colors duration-200 font-medium px-3 py-2 hover:bg-gray-800/50 rounded-sm cursor-pointer ${
                      location.pathname === '/profile' ? 'hidden' : ''
                    }`}
                  >
                    Profile
                  </button>
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="text-gray-300 hover:text-red-400 transition-colors duration-200 font-medium px-3 py-2 hover:bg-gray-800/50 rounded-sm cursor-pointer"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-300 hover:text-emerald-400 transition-colors duration-200 px-4 py-2 hover:bg-gray-800/50 rounded-sm font-semibold"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 rounded-md hover:from-emerald-600 hover:to-teal-600 transition-all duration-200 font-semibold text-base shadow-lg shadow-emerald-500/20"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          <div className="md:hidden">
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300  cursor-pointer hover:text-emerald-400  focus:outline-none focus:text-emerald-400 p-2"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <CloseIcon /> : <Hamburger />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-800 bg-gray-950/95 backdrop-blur-sm">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {isAuthenticated ? (
                <>
                  <div className="px-3 py-2 text-gray-400 font-semibold border-b border-gray-800">
                    Welcome, {user?.username || 'User'}!
                  </div>

                  {location.pathname !== '/dashboard' && (
                    <Link
                      to="/dashboard"
                      onClick={() => {
                        setIsMenuOpen(false);
                      }}
                      className="block px-3 py-2 text-gray-300 hover:text-emerald-400 hover:bg-gray-800/50 rounded-md transition-colors duration-200 font-medium"
                    >
                      Dashboard
                    </Link>
                  )}

                  {location.pathname !== '/profile' && (
                    <Link
                      to="/profile"
                      onClick={() => {
                        setIsMenuOpen(false);
                      }}
                      className="block px-3 py-2 text-gray-300 hover:text-emerald-400 hover:bg-gray-800/50 rounded-md transition-colors duration-200 font-medium"
                    >
                      Profile
                    </Link>
                  )}

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="block w-full text-left px-3 py-2 text-gray-300 hover:text-red-400 hover:bg-gray-800/50 rounded-md transition-colors duration-200 font-medium"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => {
                      setIsMenuOpen(false);
                    }}
                    className="block px-3 py-2 text-gray-300 hover:text-emerald-400 hover:bg-gray-800/50 rounded-md transition-colors duration-200 font-semibold"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => {
                      setIsMenuOpen(false);
                    }}
                    className="block mx-3 my-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 rounded-md hover:from-emerald-600 hover:to-teal-600 transition-all duration-200 font-semibold text-center shadow-lg shadow-emerald-500/20"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
