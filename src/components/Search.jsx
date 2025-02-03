/* eslint-disable react/prop-types */
const Search = ({ searchTerm, setSearchTerm }) => {
  return (
    <>
      <div className="search mb-3">
        <div>
          <img src="search.svg" alt="search" />

          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>
      </div>
    </>
  );
};

export default Search;
