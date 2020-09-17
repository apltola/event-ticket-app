import React from 'react';

const LandingPage = ({ currentUser }) => {
  if (currentUser) {
    return <h1>you are signed in</h1>;
  } else {
    return <h1>you are not signed in</h1>;
  }
};

LandingPage.getInitialProps = async (context, client, currentUser) => {
  return {};
};

/* export async function getServerSideProps(context) {
  console.log('SERVER SIDE EXECUTED');
  return {
    props: {},
  };
} */

export default LandingPage;
