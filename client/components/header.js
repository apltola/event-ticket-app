import Link from 'next/link';
import axios from 'axios';

const Header = ({ currentUser }) => {
  return (
    <header className="app-header">
      <nav className="nav">
        <Link href="/">
          <a>ticket_app2020</a>
        </Link>
        <div className="right-container">
          {currentUser && (
            <div>
              <span>{currentUser.email}</span>
              <Link href="/auth/signout">
                <a>
                  <button className="signout-button">Sign out</button>
                </a>
              </Link>
            </div>
          )}
          {!currentUser && (
            <div>
              <Link href="/auth/signin">
                <a>Sign in</a>
              </Link>
              <Link href="/auth/signup">
                <a className="register-link">Register</a>
              </Link>
            </div>
          )}
        </div>
      </nav>

      <style jsx>{`
        .app-header {
          padding: 10px;
        }

        .nav {
          display: flex;
          align-items: center;
        }

        a {
          text-decoration: none;
          color: inherit;
        }

        .right-container {
          flex: 1;
          display: flex;
          justify-content: flex-end;
        }

        .register-link {
          margin-left: 1em;
        }

        .signout-button {
          margin-left: 1em;
        }
      `}</style>
    </header>
  );
};

export default Header;
