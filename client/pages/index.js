import React from 'react';
import buildClient from '../api/buildClient';

const LandingPage = ({ currentUser }) => {
  if (currentUser) {
    return <h1>you are signed in</h1>;
  } else {
    return <h1>you are not signed in</h1>;
  }
};

LandingPage.getInitialProps = async (context) => {
  console.log('LANDING PAGE');
  const client = buildClient(context);
  const { data } = await client.get('/api/users/currentuser');

  return data;
};

/* export async function getServerSideProps(context) {
  console.log('SERVER SIDE EXECUTED');
  return {
    props: {},
  };
} */

export default LandingPage;
