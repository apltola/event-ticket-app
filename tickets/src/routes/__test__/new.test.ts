import request from 'supertest';
import { app } from '../../app';

it('has a route handler listening to api/tickets for post requests', async () => {
  const res = await request(app).post('/api/tickets').send({});

  expect(res.status).not.toEqual(404);
});

it('can only be accessed with signed in user', async () => {
  await request(app).post('/api/tickets').send({}).expect(401);
});

it('returns a status other than 401 with signed in user', async () => {
  const res = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({});

  expect(res.status).not.toEqual(401);
});

it('returns an error if invalid title is provided', async () => {
  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title: '',
      price: 10,
    })
    .expect(400);

  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      price: 10,
    })
    .expect(400);
});

it('returns an error if invalid price is provided', async () => {
  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title: 'judas priest',
      price: -99,
    })
    .expect(400);

  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title: 'abraxas',
    })
    .expect(400);
});

it('creates a ticket with valid inputs', async () => {
  // add in a check to make sure a ticket was saved

  await request(app)
    .post('/api/tickets')
    .send({
      title: 'martti vainaa ja sallitut aineet',
      price: 10,
    })
    .expect(201);
});
