import { useEffect, useState } from 'react';
import Search from './Search';

const Nav = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isScroll, setIsScroll] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const handleHamburgerClick = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  return (
    <>
      <nav
        className={`w-full fixed top-0 left-0 right-0 px-2 lg:px-8 xl:px-[8%] py-4 flex items-center justify-between z-50 text-white whitespace-nowrap transition-all duration-300 bg-gray-900 ${
          isScroll ? 'bg-opacity-90 shadow-lg backdrop-blur-lg' : 'bg-opacity-70 shadow-md'
        }`}
        style={{ minHeight: '64px' }}
        aria-label="Main navigation"
      >
        <a
          href="#home"
          className="flex flex-row items-center justify-center gap-3 text-lg font-semibold"
        >
          <img src="logo.svg" alt="logo" className="w-8 h-8" />
          <span>Hakomovies</span>
        </a>
        {/* Hamburger for mobile */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 focus:outline-none"
          onClick={handleHamburgerClick}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
        >
          <span className={`block w-6 h-0.5 bg-white mb-1 transition-transform duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-white mb-1 transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
        </button>
        {/* Desktop Menu */}
        <ul className="hidden md:flex text-base items-center gap-6 lg:gap-8 rounded-full py-3 ">
          <li>
            <a href="#home" className="hover:text-light-200 transition-colors">Home</a>
          </li>
          <li>
            <a href="#movies" className="hover:text-light-200 transition-colors">All Movies</a>
          </li>
          <li>
            <a href="#" className="hover:text-light-200 transition-colors">Top IMDB</a>
          </li>
        </ul>
        {/* Search bar always visible below nav on mobile, inline on desktop */}
        <div className="hidden md:block ml-6 w-full max-w-xs">
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>
      </nav>
      {/* Mobile Menu Drawer */}
      <div
        id="mobile-menu"
        className={`fixed top-0 right-0 h-full w-4/5 max-w-xs bg-gray-900 z-[100] shadow-2xl transform transition-transform duration-300 ease-in-out md:hidden flex flex-col pt-6 px-6 gap-6 ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        aria-hidden={!mobileMenuOpen}
      >
        <button
          className="self-end mb-4 text-white text-3xl focus:outline-none"
          onClick={handleHamburgerClick}
          aria-label="Close menu"
        >
          &times;
        </button>
        <a href="#home" className="py-2 px-4 rounded hover:text-light-200 transition-colors" onClick={handleHamburgerClick}>Home</a>
        <a href="#movies" className="py-2 px-4 rounded hover:text-light-200 transition-colors" onClick={handleHamburgerClick}>All Movies</a>
        <a href="#" className="py-2 px-4 rounded hover:text-light-200 transition-colors" onClick={handleHamburgerClick}>Top IMDB</a>
        <div className="mt-4">
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>
      </div>
      {/* Overlay for mobile menu */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 z-[90] md:hidden transition-opacity duration-300"
          onClick={handleHamburgerClick}
          aria-hidden="true"
        ></div>
      )}
      {/* Mobile search bar below nav (when menu is closed) */}
      {!mobileMenuOpen && (
        <div className="block md:hidden fixed left-0 right-0 top-[64px] px-4 z-40">
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>
      )}
    </>
  );
};

export default Nav;
