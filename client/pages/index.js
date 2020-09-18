import React from 'react';
import Link from 'next/link';

const renderTickets = (tickets) => {
  if (tickets.length === 0) {
    return null;
  }
  return tickets.map((ticket) => {
    return (
      <div style={{}} key={ticket.id}>
        <span>
          <Link href="/tickets/[ticketId]" as={`/tickets/${ticket.id}`}>
            <a>{ticket.title}</a>
          </Link>
        </span>
        <span style={{ paddingLeft: '10px', paddingRight: '10px' }}>–</span>
        <span>{ticket.price.toFixed(2)} €</span>
      </div>
    );
  });
};

const LandingPage = ({ currentUser, tickets }) => {
  console.log('test test test test');
  return (
    <div>
      <h1>Tickets for sale</h1>
      {renderTickets(tickets)}
    </div>
  );
};

LandingPage.getInitialProps = async (context, client, currentUser) => {
  const { data } = await client.get('/api/tickets');

  return {
    tickets: data,
  };
};

/* export async function getServerSideProps(context) {
  console.log('SERVER SIDE EXECUTED');
  return {
    props: {},
  };
} */

export default LandingPage;
