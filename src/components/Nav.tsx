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
    <nav>
      {/* Mobile Logo and Menu Button */}
      <div className="md:hidden fixed top-0 w-full z-50 flex justify-between items-center px-4 py-4">
        <Link 
          to="/"
          className={`flex items-center transition-all duration-300 ${
            isScrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          <img 
            src="/logo.svg" 
            alt="Hakomovies Logo" 
            className="h-6 w-auto"
          />
        </Link>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-3 rounded-full bg-[#201f31] text-white hover:text-[#ffbade]
            shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
        >
          {isMenuOpen ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Desktop Navbar */}
      <div className="hidden md:block fixed w-full top-0 z-50">
        <div className={`w-full transition-all duration-500 ${
          isScrolled 
            ? 'bg-[#201f31]/90 backdrop-blur-md' 
            : 'bg-transparent'
        }`}>
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
                <div className="ml-10">
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
                  <span className="text-sm">Login</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Fullscreen Menu */}
      <div 
        className={`md:hidden fixed inset-0 z-40 bg-[#201f31] transition-all duration-300 ${
          isMenuOpen 
            ? 'opacity-100 pointer-events-auto' 
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8">
          <Link 
            to="/" 
            className="flex items-center group mb-8"
            onClick={() => setIsMenuOpen(false)}
          >
            <img 
              src="/logo.svg" 
              alt="Hakomovies Logo" 
              className="h-8 w-auto"
            />
            <span className="ml-2 text-white text-2xl font-bold">
              Hako<span className="text-[#ffbade]">Movies</span>
            </span>
          </Link>

          <div className="flex flex-col items-center space-y-6 mb-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`text-xl font-medium transition-colors duration-300 ${
                  isActivePath(link.path)
                    ? 'text-[#ffbade]'
                    : 'text-white hover:text-[#ffbade]'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex flex-col items-center space-y-4">
            <button
              className="w-full flex items-center justify-center px-6 py-3 rounded-lg bg-[#ffbade] text-[#201f31]
                transition-all duration-300 transform hover:scale-105 active:scale-95 font-medium"
            >
              <UserIcon className="h-5 w-5 mr-2" />
              <span>Login</span>
            </button>
            <button
              className="w-full flex items-center justify-center px-6 py-3 rounded-lg bg-[#ffbade] text-[#201f31]
                transition-all duration-300 transform hover:scale-105 active:scale-95"
              aria-label="Toggle theme"
            >
              <SunIcon className="h-5 w-5 mr-2" />
              <span>Toggle Theme</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}; 