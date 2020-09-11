import request from 'supertest';
import { app } from '../../app';
import { OrderStatus } from '../../models/order';
import { Ticket } from '../../models/ticket';

it('deletes order with valid id', async () => {
  const ticket = Ticket.build({
    title: 'concert',
    price: 29,
  });
  ticket.save();

  const user = global.signin();

  const { body: order } = await request(app)
    .post('/api/orders')
    .set('Cookie', user)
    .send({ ticketId: ticket.id })
    .expect(201);

  expect(order.status).toEqual(OrderStatus.Created);

  await request(app)
    .delete(`/api/orders/${order.id}`)
    .set('Cookie', user)
    .send()
    .expect(204);

  const { body: cancelledOrder } = await request(app)
    .get(`/api/orders/${order.id}`)
    .set('Cookie', user)
    .send()
    .expect(200);

  expect(cancelledOrder.status).toEqual(OrderStatus.Cancelled);
});

it.todo('emit an order-deleted event');
