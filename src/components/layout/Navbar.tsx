import { Link } from 'react-router-dom';
import SearchBar from '../navigation/SearchBar';
import GenreDropdown from '../navigation/GenreDropdown';
import UserMenu from '../navigation/UserMenu';
import { GENRES } from '../../constants/genres';
import type { NavbarProps } from '../../types/navigation-types';
import './Navbar.scss';

function Navbar({ className = '' }: NavbarProps) {
  const handleSearch = (query: string) => {
    // TODO: Implement search navigation
    console.log('Searching for:', query);
  };

  const handleGenreSelect = (genreId: string) => {
    // TODO: Navigate to genre page
    console.log('Selected genre:', genreId);
  };

  return (
    <nav className={`navbar ${className}`}>
      <div className="navbar__container">
        <Link to="/" className="navbar__logo">
          <span className="navbar__logo-text">MangaVerse</span>
        </Link>

        <div className="navbar__search">
          <SearchBar onSearch={handleSearch} placeholder="Search manga..." />
        </div>

        <div className="navbar__actions">
          <GenreDropdown genres={GENRES} onGenreSelect={handleGenreSelect} />
          <UserMenu />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
