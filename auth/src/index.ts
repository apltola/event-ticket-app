import mongoose from 'mongoose';
import { app } from './app';

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }

  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('🥭 Connected to M0ngo');
  } catch (error) {
    console.log('mongo error ==> ', error);
  }
};

app.listen(3000, () => {
  console.log('🔐 Auth server up at 3000');
});

start();
