import { useState } from 'react';
import PropTypes from 'prop-types';

const CryptoSearch = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by name or symbol"
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

CryptoSearch.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default CryptoSearch;
