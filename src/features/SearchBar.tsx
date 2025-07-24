import { useState, useEffect, useCallback } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { SearchBarProps } from '../types';

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  // Debounced search implementation
  const debouncedSearch = useCallback(
    (value: string) => {
      if (value.trim()) {
        onSearch(value);
      }
    },
    [onSearch]
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      debouncedSearch(query);
    }, 500); // 500ms delay

    return () => clearTimeout(timer);
  }, [query, debouncedSearch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="relative max-w-2xl mx-auto group"
    >
      <div className={`
        relative flex items-center transition-all duration-300
        ${isFocused ? 'transform scale-105' : ''}
      `}>
        <div className="relative flex-grow">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Search for movies..."
            className="w-full pl-12 pr-4 py-3 bg-white/10 border-2 border-transparent
              text-white placeholder-gray-400 rounded-xl outline-none
              transition-all duration-300 focus:border-[#ffbade] focus:bg-white/15"
          />
          <MagnifyingGlassIcon className={`
            absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5
            transition-colors duration-300
            ${isFocused ? 'text-[#ffbade]' : 'text-gray-400'}
          `} />
        </div>
        <button
          type="submit"
          className="ml-3 px-6 py-3 bg-[#ffbade] text-[#201f31] rounded-xl font-medium
            transform transition-all duration-300 hover:scale-105 active:scale-95"
        >
          Search
        </button>
      </div>

      {/* Gradient line */}
      <div className="absolute -bottom-4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#ffbade]/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </form>
  );
}; 