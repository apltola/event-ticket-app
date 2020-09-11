import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';
import { Order, OrderStatus } from '../../models/order';
import { Ticket } from '../../models/ticket';

const buildTicket = async () => {
  const ticket = Ticket.build({
    title: 'concert',
    price: 100,
  });
  await ticket.save();
  return ticket;
};

it('fetches orders for an particular user', async () => {
  // create three tickets
  const ticket1 = await buildTicket();
  const ticket2 = await buildTicket();
  const ticket3 = await buildTicket();

  const user1 = global.signin();
  const user2 = global.signin();
  // create one order as User #1
  await request(app)
    .post('/api/orders')
    .set('Cookie', user1)
    .send({ ticketId: ticket1.id })
    .expect(201);

  // create two orders as User #2
  const res1 = await request(app)
    .post('/api/orders')
    .set('Cookie', user2)
    .send({ ticketId: ticket2.id })
    .expect(201);
  const res2 = await request(app)
    .post('/api/orders')
    .set('Cookie', user2)
    .send({ ticketId: ticket3.id })
    .expect(201);

  // Make request to get orders for User #2
  const response = await request(app)
    .get('/api/orders')
    .set('Cookie', user2)
    .expect(200);

  // make sure we only got the orders for User #2
  console.log('res.body => ', response.body);
});
