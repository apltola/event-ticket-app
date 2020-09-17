import { formatPrice } from '../../helpers';

const OrderIndex = ({ orders }) => {
  return (
    <React.Fragment>
      <h1>Order History</h1>

      <table>
        <thead>
          <tr>
            <th>Ticket Title</th>
            <th>Price</th>
            <th>Order Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => {
            console.log(order);
            return (
              <tr key={order.id}>
                <td>{order.ticket.title}</td>
                <td>{order.ticket.price.toFixed(2)}</td>
                <td>{order.status}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </React.Fragment>
  );
};

OrderIndex.getInitialProps = async (context, client) => {
  const { data } = await client.get('/api/orders');

  return {
    orders: data,
  };
};

export default OrderIndex;
