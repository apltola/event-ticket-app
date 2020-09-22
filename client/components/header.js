import Link from 'next/link';

const Header = ({ currentUser }) => {
  return (
    <header className="app-header">
      <nav className="nav">
        <Link href="/">
          <a className="border">ticket_app2020</a>
        </Link>
        {currentUser && (
          <React.Fragment>
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

        nav a {
          flex: 1;
          text-align: center;
          padding: 20px;
          text-decoration: none;
          color: inherit;
          font-size: 20px;
          font-weight: bold;
          transition: all cubic-bezier(0.075, 0.82, 0.165, 1);
        }

        a:hover {
          background-color: rgba(0, 0, 0, 0.05);
        }

        nav a.border {
          border-right: 1px solid #e1e4e8;
        }
      `}</style>
    </header>
  );
};

export default Header;
