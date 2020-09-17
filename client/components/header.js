import Link from 'next/link';

const Header = ({ currentUser }) => {
  return (
    <header className="app-header">
      <nav className="nav">
        <Link href="/">
          <a>ticket_app2020</a>
        </Link>
        <div className="right-container">
          {currentUser && (
            <div className="auth-links">
              <Link href="/tickets/new">
                <a>Sell Tickets</a>
              </Link>
              <Link href="/orders">
                <a>My orders</a>
              </Link>
              <span className="email">{currentUser.email}</span>
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
                <a>Register</a>
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
        .auth-links {
          display: flex;
          flex-flow: row wrap;
          justify-content: space-evenly;
          align-items: center;
        }

        .auth-links a,
        .auth-links span {
          margin-left: 2vw;
        }
      `}</style>
    </header>
  );
};

export default Header;
