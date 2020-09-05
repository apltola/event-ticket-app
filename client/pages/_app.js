import '../styles/global.css';
import '../styles/elements/forms.css';
import buildClient from '../api/buildClient';

function AppComponent({ Component, pageProps, currentUser }) {
  return (
    <div>
      <header>this is a header! {currentUser.email}</header>
      <Component {...pageProps} />
    </div>
  );
}

AppComponent.getInitialProps = async (appContext) => {
  const client = buildClient(appContext.ctx);
  const { data } = await client.get('/api/users/currentuser');

  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx);
  }

  return {
    pageProps,
    ...data,
  };
};

export default AppComponent;
