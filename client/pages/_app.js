import '../styles/global.css';
import '../styles/elements/forms.css';
import buildClient from '../api/buildClient';
import Header from '../components/header';
import Layout from '../components/layout';
import Head from 'next/head';

function AppComponent({ Component, pageProps, currentUser }) {
  return (
    <React.Fragment>
      <Head>
        <title>Lippuja Mulle Heti</title>
      </Head>
      <Layout currentUser={currentUser}>
        <Component currentUser={currentUser} {...pageProps} />
      </Layout>
    </React.Fragment>
  );
}

AppComponent.getInitialProps = async (appContext) => {
  const client = buildClient(appContext.ctx);
  const { data } = await client.get('/api/users/currentuser');

  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(
      appContext.ctx,
      client,
      data.currentUser
    );
  }

  return {
    pageProps,
    ...data,
  };
};

export default AppComponent;
