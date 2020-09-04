import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../app';
let mongo: any;

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
