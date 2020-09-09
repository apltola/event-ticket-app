import mongoose from 'mongoose';
import { app } from './app';
import { natsWrapper } from './nats-wrapper';

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }

  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined');
  }

  try {
    await natsWrapper.connect('ticketing', 'lasdflk', 'http://nats-srv:4222');
    natsWrapper.client.on('close', () => {
      console.log('CLOSING NATS CONNECTION');
      process.exit();
    });
    process.on('SIGINT', () => natsWrapper.client.close());
    process.on('SIGTERM', () => natsWrapper.client.close());

    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('🥭 Tickets Connected to M0ngo');
  } catch (error) {
    console.log('mongo error ==> ', error);
  }
};

app.listen(3000, () => {
  console.log('🎫 Tickets server up at 3000');
});

start();
