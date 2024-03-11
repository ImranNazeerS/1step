export const SearchBar = () => {
  const handleSearch = (event) => {
    event.preventDefault();
    // Add your search logic here, e.g., using the form data
    console.log('Search submitted:', event.target.elements.where.value);
  };

  return (
    <div className='flex bg-white shadow-2xl rounded-lg  mx-auto w-auto'>
      <form className="tailwind-search-bar flex items-center" onSubmit={handleSearch}>
        <div className="mb-3">
          <label htmlFor="what" className="text-gray-500 mr-2">
            What
          </label>
          <input
            type="text"
            id="what"
            placeholder="Services or Provider name"
            className="appearance-none bg-transparent text-sm border-slate-600 w-full text-gray-700 py-1 px-2 leading-tight focus:outline-none mb-2"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="where" className="text-gray-500 mr-2">
            Where
          </label>
          <input
            type="text"
            id="where"
            placeholder="City, State, Zip Code"
            className="appearance-none bg-transparent text-sm border-none w-full text-gray-700 py-1 px-2 leading-tight focus:outline-none mb-2"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="insurance" className="text-gray-500 mr-2">
            Insurance
          </label>
          <input
            type="text"
            id="insurance"
            placeholder="Not Sure? Skip"
            className="appearance-none bg-transparent text-sm border-none w-full text-gray-700 py-1 px-2 leading-tight focus:outline-none mb-2"
          />
        </div>
        <button type="submit" className="bg-indigo-500 text-white rounded-md py-2 px-4 hover:bg-indigo-700">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
