import { useEffect, useState } from 'react';

import Search from './Search';

const Nav = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isScroll, setIsScroll] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScroll(true);
      } else {
        setIsScroll(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <nav
      className={`w-full h-18 fixed px-2 lg:px-8 xl:px-[8%] py-5 flex items-center justify-between z-50 text-white bg-opacity-50 bg-gray whitespace-nowrap ${
        isScroll ? 'bg-opacity-30 backdrop-blur-lg shadow-sm' : ''
      }`}
    >
      <a
        href="#home"
        className="flex flex-row items-center justify-center gap-3"
      >
        <img src="logo.svg" alt="logo" />
        <span>Hakomovies</span>
      </a>
      <ul className="hidden md:flex text-2sm items-center gap-6 lg:gap-8 rounded-full py-3 ">
        <li>
          <a href="#home" className="hover:text-light-200">
            Home
          </a>
        </li>
        <li>
          <a href="#movies" className="hover:text-light-200">
            All Movies
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-light-200">
            Top IMDB
          </a>
        </li>

        {/* Search Bar */}
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </ul>
    </nav>
  );
};

export default Nav;
