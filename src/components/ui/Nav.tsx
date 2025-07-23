import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bars3Icon, XMarkIcon, SunIcon, UserIcon } from '@heroicons/react/24/outline';

export const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Movies', path: '/movies' },
    { name: 'Most Popular', path: '/popular' },
    { name: 'TV Series', path: '/tv' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const currentIndex = navLinks.findIndex(link => link.path === location.pathname);
    setActiveIndex(currentIndex);
  }, [location.pathname]);

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav 
      className={`fixed w-full top-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-[#201f31]/90 backdrop-blur-md' 
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Logo and Nav Links */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link 
                to="/" 
                className="flex items-center group"
              >
                <img 
                  src="/logo.svg" 
                  alt="Hakomovies Logo" 
                  className="h-6 w-auto transition-transform duration-300 group-hover:scale-110"
                />
                <span className="ml-2 text-white text-xl font-bold relative overflow-hidden">
                  <span className="relative z-10 group-hover:text-[#ffbade] transition-colors duration-300">
                    Hako<span className="text-[#ffbade]">Movies</span>
                  </span>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#ffbade] group-hover:w-full transition-all duration-300"></span>
                </span>
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:block ml-10">
              <div className="flex space-x-6">
                {navLinks.map((link, index) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onMouseEnter={() => setActiveIndex(index)}
                    onMouseLeave={() => setActiveIndex(navLinks.findIndex(l => l.path === location.pathname))}
                    className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 group overflow-hidden ${
                      isActivePath(link.path)
                        ? 'text-[#ffbade]'
                        : 'text-white hover:text-[#ffbade]'
                    }`}
                  >
                    <span className="relative z-10">{link.name}</span>
                    <span 
                      className={`absolute bottom-0 left-0 w-full h-0.5 transform origin-left transition-transform duration-300 
                        bg-[#ffbade] ${
                        isActivePath(link.path) || index === activeIndex
                          ? 'scale-x-100'
                          : 'scale-x-0'
                      }`}
                    />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right side - Theme and Login */}
          <div className="flex items-center space-x-4">
            <button
              className="p-2 rounded-lg bg-[#ffbade] text-[#201f31]
                transition-all duration-300 transform hover:scale-105 active:scale-95
                focus:outline-none focus:ring-2 focus:ring-[#ffbade]/50"
              aria-label="Toggle theme"
            >
              <SunIcon className="h-5 w-5" />
            </button>
            <button
              className="flex items-center px-5 py-2 rounded-lg bg-[#ffbade] text-[#201f31]
                transition-all duration-300 transform hover:scale-105 active:scale-95 font-medium
                focus:outline-none focus:ring-2 focus:ring-[#ffbade]/50"
            >
              <UserIcon className="h-5 w-5 mr-2" />
              <span className="hidden sm:inline text-sm">Login</span>
            </button>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2.5 rounded-lg text-white hover:text-[#ffbade] bg-white/5
                  hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
              >
                {isMenuOpen ? (
                  <XMarkIcon className="h-5 w-5" />
                ) : (
                  <Bars3Icon className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div 
        className={`transform transition-all duration-300 ease-in-out ${
          isMenuOpen 
            ? 'translate-y-0 opacity-100' 
            : '-translate-y-2 opacity-0 pointer-events-none'
        } md:hidden`}
      >
        <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-3 space-y-1 bg-[#201f31]/95 backdrop-blur-md border-t border-white/5">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsMenuOpen(false)}
              className={`block px-4 py-2.5 rounded-lg text-base font-medium transition-all duration-300 
                relative overflow-hidden ${
                isActivePath(link.path)
                  ? 'bg-white/10 text-[#ffbade]'
                  : 'text-white hover:bg-white/5 hover:text-[#ffbade]'
              }`}
            >
              <span className="relative z-10">{link.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}; 