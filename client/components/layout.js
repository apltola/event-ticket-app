import Head from 'next/head';
import Header from './header';

export default function Layout({ children, currentUser }) {
  return (
    <div className="app-container">
      <Header currentUser={currentUser} />
      <div className="content">
        <main>{children}</main>
      </div>
      <footer>
        <a href="https://github.com/apltola/event-ticket-app" target="_blank">
          GitHub repo
        </a>
      </footer>

      <style jsx>{`
        .app-container {
          display: flex;
          flex-flow: column nowrap;
          min-height: 100vh;
        }

        .vertical-flex {
          display: flex;
          flex-direction: column;
          justify-content: center;
          height: 100%;
        }

        .content {
          flex-grow: 1;
          display: flex;
          flex-flow: row nowrap;
          justify-content: center;
        }

        main {
          flex: 1;
          max-width: 1300px;
        }

        footer {
          padding: 2rem 2rem 4rem;
          background-color: #fafafa;
          border-top: 1px solid #eaeaea;
          border-bottom: 1px solid #eaeaea;
        }

        footer a {
          color: inherit;
          text-decoration: none;
        }
      `}</style>
    </div>
  );
}
