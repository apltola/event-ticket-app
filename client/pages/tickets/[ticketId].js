import useRequest from '../../hooks/use-request';
import Router from 'next/router';

const TicketShow = ({ ticket, currentUser }) => {
  const { doRequest, errors } = useRequest({
    url: '/api/orders',
    method: 'post',
    body: {
      ticketId: ticket.id,
    },
    onSuccess: (order) =>
      Router.push('/orders/[orderId]', `/orders/${order.id}`),
  });

  return (
    <section>
      <h1>{ticket.title}</h1>
      <h4>Price: {ticket.price.toFixed(2)} €</h4>
      <button
        onClick={() => doRequest()}
        disabled={!currentUser}
        style={{ cursor: currentUser ? 'pointer' : 'not-allowed' }}
      >
        {currentUser ? 'Purchase Ticket' : 'Sign in to purchase ticket'}
      </button>
      {errors}
    </section>
  );
};

TicketShow.getInitialProps = async (context, client) => {
  const { ticketId } = context.query;
  const { data } = await client.get(`/api/tickets/${ticketId}`);
  return { ticket: data };
};

export default TicketShow;
