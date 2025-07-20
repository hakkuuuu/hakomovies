import { MdSearch } from 'react-icons/md';

const Search = ({ searchTerm, setSearchTerm }) => {
  return (
    <form
      className="flex items-center w-full max-w-full bg-[#23232b] px-2 sm:px-3 py-1.5 sm:py-2 rounded-full border border-blue-900 focus-within:ring-2 focus-within:ring-blue-900 transition-all"
      role="search"
      onSubmit={e => e.preventDefault()}
    >
      <MdSearch className="w-5 h-5 sm:w-6 sm:h-6 text-blue-900 mr-1.5 sm:mr-2 flex-shrink-0" aria-hidden="true" />
      <input
        type="text"
        placeholder="Search for movies..."
        value={searchTerm}
        onChange={event => setSearchTerm(event.target.value)}
        className="flex-1 bg-transparent outline-none text-white placeholder-white text-sm sm:text-base min-w-0"
        aria-label="Search movies"
      />
    </form>
  );
};

export default Search;
