import React from 'react';
import buildClient from '../api/buildClient';

const LandingPage = ({ currentUser }) => {
  console.log('currentUser: ', currentUser);
  return <h1>landing page....</h1>;
};

LandingPage.getInitialProps = async (context) => {
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
