import request from 'supertest';
import { app } from '../../app';

it('fails when non-existent email is supplied', async () => {
  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: 'rosebud',
    })
    .expect(400);
});

it('fails when incorrect is supplied', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'wordpass',
    })
    .expect(201);

  return request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: 'alksdjflaöskdjfasödkfj',
    })
    .expect(400);
});

it('responds with a cookie when given valid credentials', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'wordpass',
    })
    .expect(201);

  const response = await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: 'wordpass',
    })
    .expect(200);

  return expect(response.get('Set-Cookie')).toBeDefined();
});
