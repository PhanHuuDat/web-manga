import { useState, useRef, useEffect } from 'react';
import type { GenreDropdownProps } from '../../types/navigation-types';
import './GenreDropdown.scss';

function GenreDropdown({ genres, onGenreSelect }: GenreDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleGenreClick = (genreId: string) => {
    onGenreSelect(genreId);
    setIsOpen(false);
  };

  return (
    <div
      className="genre-dropdown"
      ref={dropdownRef}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        className="genre-dropdown__button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span>Genres</span>
        <svg
          className={`genre-dropdown__icon ${isOpen ? 'genre-dropdown__icon--open' : ''}`}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 9l6 6 6-6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="genre-dropdown__menu">
          <div className="genre-dropdown__grid">
            {genres.map((genre) => (
              <button
                key={genre.id}
                className="genre-dropdown__item"
                onClick={() => handleGenreClick(genre.id)}
              >
                <span className="genre-dropdown__item-name">{genre.name}</span>
                {genre.description && (
                  <span className="genre-dropdown__item-desc">
                    {genre.description}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default GenreDropdown;
