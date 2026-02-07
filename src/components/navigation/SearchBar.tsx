import { useState } from 'react';
import type { SearchBarProps } from '../../types/navigation-types';
import './SearchBar.scss';

function SearchBar({
  onSearch,
  placeholder = 'Search manga...',
}: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <button type="submit" className="search-bar__button" aria-label="Search">
        <svg
          className="search-bar__icon"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
          <path
            d="M21 21l-4.35-4.35"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>

      <input
        type="text"
        className="search-bar__input"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-label="Search manga"
      />
    </form>
  );
}

export default SearchBar;
