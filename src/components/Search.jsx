/* eslint-disable react/prop-types */
const Search = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="relative flex items-center w-full max-w-5xl bg-light-100/5 px-4 py-2 rounded-full border  text-white">
      <img src="search.svg" alt="search" className="w-5 h-5 mr-2" />

      <input
        type="text"
        placeholder="Search for"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        className="w-3xs bg-transparent outline-none text-white placeholder-indigo-300"
      />
    </div>
  );
};

export default Search;
