import { Link } from 'react-router-dom';

export const Hero = () => {
  return (
    <section className="relative pt-8 md:pt-16 pb-20 md:pb-32 overflow-hidden min-h-screen">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-emerald-950" />
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-full max-w-6xl">
        <div className="absolute top-10 md:top-20 left-5 md:left-10 w-48 h-48 md:w-72 md:h-72 bg-emerald-500 rounded-full mix-blend-screen filter blur-xl opacity-15 animate-blob" />
        <div className="absolute top-10 md:top-20 right-5 md:right-10 w-48 h-48 md:w-72 md:h-72 bg-teal-400 rounded-full mix-blend-screen filter blur-xl opacity-15 animate-blob animation-delay-2000" />
        <div className="absolute bottom-10 md:bottom-20 left-1/2 transform -translate-x-1/2 w-48 h-48 md:w-72 md:h-72 bg-cyan-500 rounded-full mix-blend-screen filter blur-xl opacity-15 animate-blob animation-delay-4000" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="inline-flex items-center px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs md:text-sm font-medium mb-6 md:mb-8">
            <span className="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse" />
            New: Advanced file management features
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 md:mb-8 leading-tight px-2">
            Manage Your
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
              {' '}
              Files
            </span>{' '}
            Like Never Before
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-gray-400 mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed px-4">
            Experience the future of file management with CloudNative. Secure, fast,
            and intuitive - everything you need to organize your digital life.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center px-4">
            <Link
              to="/register"
              className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 md:px-8 py-3 md:py-3.5 rounded-md hover:from-emerald-600 hover:to-teal-600 transition-all duration-200 font-medium text-base md:text-lg shadow-lg shadow-emerald-500/25 text-center"
            >
              Start Free Trial
              <span className="ml-2 group-hover:translate-x-1 transition-transform duration-200">
                →
              </span>
            </Link>
            <button
              type="button"
              className="w-full sm:w-auto bg-gray-800/60 text-gray-300 px-6 md:px-8 py-3 md:py-3.5 rounded-md border border-gray-700 hover:border-gray-500 hover:bg-gray-800 transition-all duration-200 font-medium text-base md:text-lg shadow-sm hover:shadow-md"
            >
              Watch Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
