import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';
import { generateToken, isAdmin, isAuth } from '../utils.js';

const userRouter = express.Router();

userRouter.post(
  '/signin',
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });

    if (user.isAdmin === req.body.isAdmin) {
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          res.send({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            contact: user.contact,
            token: generateToken(user),
          });
          return;
        }
      }
      res.status(401).send({ message: 'Invalid email or password' });
    } else {
      if (req.body.isAdmin)
        res.status(401).send({ message: 'You are not Admin' });
      else {
        res.status(401).send({ message: 'You are not User' });
      }
    }
  }
  )
);

userRouter.post(
  '/register',
  expressAsyncHandler(async (req, res) => {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      contact: req.body.contact,
      password: bcrypt.hashSync(req.body.password, 8),
    });
    const createdUser = await user.save();
    res.send({
      _id: createdUser._id,
      name: createdUser.name,
      email: createdUser.email,
      isAdmin: createdUser.isAdmin,
      token: generateToken(createdUser),
    });
  })
);

userRouter.get(
  '/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  })
);


userRouter.get(
  '/summary/getAll',
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const user = await User.find({ isAdmin: false });
    if (user) {
      res.status(200).send(user);
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  })
);


userRouter.get(
  '/count/getAll',
  isAdmin,
  function (req, res) {
    User.count({ isAdmin: false }, function (err, count) {
      if (err) {
        res.status(404).json(err);
      } else {
        res.status(200).json(count);
      }
    });
  });


userRouter.put(
  '/profile',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8);
      }
      const updatedUser = await user.save();
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        token: generateToken(updatedUser),
      });
    }
  })
);
export default userRouter;