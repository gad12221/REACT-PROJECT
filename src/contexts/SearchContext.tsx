import { useState } from 'react'


const SearchContext = () => {
  const [search, setSearch] = useState('');

  const handleSearch = () => {
    setSearch(search + `?filter=${search}`);
  };

  return (
    <>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search..."
      />
      <button onClick={handleSearch}>Search</button>
    </>
  );
};

export default SearchContext