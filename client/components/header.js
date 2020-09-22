import Link from 'next/link';

const Header = ({ currentUser }) => {
  return (
    <header className="app-header">
      <nav className="nav">
        <Link href="/">
          <a className="brand">ticket_app2020</a>
        </Link>
        {currentUser && (
          <React.Fragment>
            <div className="spacer" />
            <Link href="/tickets/new">
              <a>Sell Tickets</a>
            </Link>
            <Link href="/orders">
              <a>My orders</a>
            </Link>
            <span className="email">{currentUser.email}</span>
            <Link href="/auth/signout">
              <a>Sign Out</a>
            </Link>
          </React.Fragment>
        )}
        {!currentUser && (
          <React.Fragment>
            <div className="spacer" />
            <Link href="/auth/signin">
              <a className="">Sign in</a>
            </Link>
            <Link href="/auth/signup">
              <a>Register</a>
            </Link>
          </React.Fragment>
        )}
      </nav>

      <style jsx>{`
        .app-header {
          border-bottom: 1px solid #e1e4e8;
          /* background-color: #100e17; */
        }

        nav {
          display: flex;
          flex-flow: row wrap;
        }

        .spacer {
          flex: 1;
        }

        nav a,
        nav span {
          flex: 1;
          text-align: center;
          padding: 20px;
          text-decoration: none;
          color: inherit;
          font-size: 16px;
          font-weight: 500;
          transition: all 100ms cubic-bezier(0.445, 0.05, 0.55, 0.95);

          display: flex;
          align-items: center;
          justify-content: center;
        }

        a:hover {
          background-color: rgba(0, 0, 0, 0.05);
        }

        nav a.brand {
          font-size: 22px;
          font-weight: bold;
        }

        a.border {
          border-right: 1px solid #e1e4e8;
        }
      `}</style>
    </header>
  );
};

export default Header;
