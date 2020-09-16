import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

declare global {
  namespace NodeJS {
    interface Global {
      signin(id?: string): string[];
    }
  }
}

jest.mock('../nats-wrapper');
//jest.setTimeout(15000);

let mongo: any;

process.env.STRIPE_KEY = 'sk_test_4eYv55u4jGU2mEbX5l0hy5tN';

// before all tests start
beforeAll(async () => {
  process.env.JWT_KEY = 'konsukiepre';

  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

// before each test starts
beforeEach(async () => {
  jest.clearAllMocks();
  // delete all collections before each test
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

// after all test are executed
afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.signin = (id?: string) => {
  // build a JWT payload: { id, email }
  const payload = {
    id: id || new mongoose.Types.ObjectId().toHexString(),
    email: 'test@test.com',
  };

  // create the JWT
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  // build a cookie session object { jwt: my_jwt }
  const session = { jwt: token };

  // turn that session into JSON
  const sessionJSON = JSON.stringify(session);

  // take JSON and encode it as base64
  const base64 = Buffer.from(sessionJSON).toString('base64');

  // return cookie string with jwt
  return [`express:sess=${base64}`];
};
