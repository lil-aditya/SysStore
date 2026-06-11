import { Link } from 'react-router-dom';
import { GitHub, Logo } from '@/components';

export const Footer = () => {
  return (
    <div className="bg-gray-950 border-t border-gray-800 flex flex-col md:flex-row justify-center items-center px-3 md:px-5 py-3 md:py-0 md:h-8 space-y-2 md:space-y-0">
      <Link
        to={'/'}
        className="text-gray-300 md:absolute md:left-5 order-1 md:order-none"
      >
        <span className="flex items-center text-base md:text-lg font-semibold gap-1.5 md:gap-2">
          <Logo />
          CloudNative
        </span>
      </Link>

      <p className="text-gray-400 text-center text-xs md:text-base font-bold tracking-wider order-2 md:order-none">
        Developed by Aditya
      </p>

      <span className="md:absolute md:right-5 order-3 md:order-none">
        <Link
          to="https://github.com/lil-aditya/SysStore"
          target="_blank"
          rel="noopener noreferrer"
          className="block p-1 md:p-0"
        >
          <GitHub className="text-gray-400 cursor-pointer hover:text-emerald-400 w-5 h-5 md:w-6 md:h-6 transition-colors duration-200" />
        </Link>
      </span>
    </div>
  );
};
