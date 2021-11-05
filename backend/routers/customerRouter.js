import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import Customer from '../models/customerModel.js';
import { generateToken, isAdmin, isCustomer } from '../utils.js';
import Product from '../models/productModel.js';

const customerRouter = express.Router();

customerRouter.post(
  '/signin',
  expressAsyncHandler(async (req, res) => {
    const customer = await Customer.findOne({ email: req.body.email });
    if (customer) {
      if (bcrypt.compareSync(req.body.password, customer.password)) {
        res.send({
          _id: customer._id,
          name: customer.name,
          email: customer.email,
          token: generateToken(customer),
        });
        return;
      }
    }
    res.status(401).send({ message: 'Invalid email or password' });
  })
);

customerRouter.post(
  '/register',
  expressAsyncHandler(async (req, res) => {
    const customer = new Customer({
      name: req.body.name,
      email: req.body.email,
      contact: req.body.contact,
      password: bcrypt.hashSync(req.body.password, 8),
    });
    const createdCustomer = await customer.save();
    res.send({
      _id: createdCustomer._id,
      name: createdCustomer.name,
      email: createdCustomer.email,
      token: generateToken(createdCustomer),
    });
  })
);


customerRouter.get(
  '/:id',
  isCustomer,
  expressAsyncHandler(async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    if (customer) {
      res.send(customer);
    } else {
      res.status(404).send({ message: 'Customer Not Found' });
    }
  })
);

customerRouter.put(
  '/profile',
  isCustomer,
  expressAsyncHandler(async (req, res) => {
    const customer = await Customer.findById(req.user._id);
    if (customer) {
      customer.name = req.body.name || user.name;
      customer.email = req.body.email || user.email;
      if (req.body.password) {
        customer.password = bcrypt.hashSync(req.body.password, 8);
      }
      const updatedCustomer = await customer.save();
      res.send({
        _id: updatedCustomer._id,
        name: updatedCustomer.name,
        email: updatedCustomer.email,
        token: generateToken(updatedCustomer),
      });
    }
  })
);


customerRouter.get(
  '/summary/getAll',
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const customer = await Customer.find();
    if (customer) {
      res.status(200).send(customer);
    } else {
      res.status(404).send({ message: 'customer Not Found' });
    }
  })
);

customerRouter.get(
  '/count/getAll',
  isAdmin,
  function (req, res) {
    Customer.count({}, function (err, count) {
      if (err) {
        res.status(404).json(err);
      } else {
        res.status(200).json(count);
      }
    });
  });


customerRouter.patch(
  '/update/:customer',
  isCustomer,
  expressAsyncHandler(async (req, res) => {
    try {
      const customer = req.params.customer;
      const options = { multi: true, new: true };
      const updatedData = await Product.updateMany({ customer: customer }, { customer: req.body.name }, options);
      return res.status(200).json({ status: true, data: updatedData });

    } catch (error) {
      return res.status(400).json({ status: false, error: error });
    }
  }))


export default customerRouter;
