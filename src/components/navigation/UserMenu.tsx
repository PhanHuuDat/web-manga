import './UserMenu.css';

function UserMenu() {
  return (
    <div className="user-menu">
      <button className="user-menu__button" aria-label="User menu">
        <svg
          className="user-menu__icon"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
          <path
            d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </div>
  );
}

export default UserMenu;
