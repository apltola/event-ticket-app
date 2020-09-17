import { useState } from 'react';
import { formatPrice } from '../../helpers';

const OrderIndex = ({ orders }) => {
  const [showAll, setShowAll] = useState(true);

  let data;
  if (showAll) {
    data = orders;
  } else {
    data = orders.filter((order) => order.status !== 'cancelled');
  }

  const onToggle = () => {
    setShowAll((prev) => !prev);
  };

  return (
    <React.Fragment>
      <div className="header">
        <h1>Order History</h1>
        <div className="toggle-container">
          Hide All Cancelled
          <input
            type="checkbox"
            value={showAll}
            onChange={onToggle}
            className="check"
          />
        </div>
      </div>

      {data.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Ticket Title</th>
              <th>Price</th>
              <th>Order Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((order) => {
              //console.log(order);
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
      ) : (
        <div className="no-orders">No Orders</div>
      )}

      <style jsx>{`
        .header {
          display: flex;
          align-items: baseline;
        }

        .toggle-container {
          padding-left: 2em;
          display: flex;
          align-items: center;
        }

        .check {
          margin-left: 5px;
          cursor: pointer;
        }

        .no-orders {
          color: rgba(0, 0, 0, 0.65);
          font-style: italic;
        }
      `}</style>
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
