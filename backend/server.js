import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import productRouter from './routers/productRouter.js';
import userRouter from './routers/userRouter.js';
import customerRouter from './routers/customerRouter.js';
import orderRouter from './routers/orderRouter.js';
import require from 'requirejs';
const cors = require('cors');
const twilio = require('twilio');
require.config();
dotenv.config();


const accountSid = process.env.accountSid;
const authToken = process.env.authToken;
const client = new twilio(accountSid, authToken);

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const fileUpload = require('express-fileupload');
app.use(fileUpload());

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/amazon', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
app.use('/api/users', userRouter);
app.use('/api/customers', customerRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);
app.get('/api/config/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
});
app.get('/', (req, res) => {
  res.send('Server is ready');
});

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});


//Twilio 
app.get('/send-text', (req, res) => {
  res.send('Hello to the Twilio Server')
  const { recipient, textmessage } = req.query;

  //Send Text
  client.messages.create({
    body: textmessage,
    to: `+91${recipient}`,  // Text this number
    from: process.env.sender // From a valid Twilio number
  }).then((message) => console.log(message.body));
})
