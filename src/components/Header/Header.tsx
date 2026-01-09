import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { dropToken } from '../../services/token';
import { AuthorizationStatus } from '../../const';

function Header(): JSX.Element {
  const navigate = useNavigate();

  const email = useAppSelector((state) => state.userEmail);
  const favoritesCount = useAppSelector((state) => state.favorites.length);
  const authStatus = useAppSelector((state) => state.authorizationStatus);

  const handleLogout = () => {
    dropToken();
    navigate('/login');
    window.location.reload();
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link" to="/">
              <img src="img/logo.svg" alt="6 cities logo" />
            </Link>
          </div>

          <nav className="header__nav">
            <ul className="header__nav-list">
              {authStatus === AuthorizationStatus.Auth ? (
                <>
                  <li className="header__nav-item user">
                    <Link to="/favorites" className="header__nav-link">
                      <span className="header__user-name">{email}</span>
                      <span className="header__favorite-count">
                        {favoritesCount}
                      </span>
                    </Link>
                  </li>
                  <li className="header__nav-item">
                    <button
                      className="header__nav-link button"
                      onClick={handleLogout}
                    >
                      Log out
                    </button>
                  </li>
                </>
              ) : (
                <li className="header__nav-item">
                  <Link to="/login" className="header__nav-link">
                    Sign in
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;


