import mongoose from 'mongoose';
import { app } from './app';

const start = async () => {
  console.log('test log...');
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }

  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined');
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('🥭 Auth Connected to M0ngo');
  } catch (error) {
    console.log('mongo error ==> ', error);
  }
};

app.listen(3000, () => {
  console.log('🔐 Auth server up at 3000');
});

start();
