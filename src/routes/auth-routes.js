import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../models';
import { AUTH_SECRET } from '../config/config';

const router = express.Router();

const validate = (body) => {
  const { firstName, lastName, email, password } = body;
  const isValid = firstName && lastName && email && password;
  return isValid;
};

const registerUsers = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (validate(req.body)) {
    const user = await db.User.findOne({ email });
    if (user) {
      res.send(303).json({
        success: false,
        message: 'User already exists',
      });
    } else {
      const saltRounds = 10;
      const passwordHash = await bcrypt.hash(password, saltRounds);
      await db.User.create({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email,
        password: passwordHash,
      });
      res
        .status(201)
        .json({ success: true, message: `Account created for ${email}` });
    }
  } else {
    res.send(400).json({
      success: false,
      message: 'Please fill out the details',
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (email && password) {
    const user = await db.User.findOne({ email });
    if (!user) {
      res.send(404).json({
        success: false,
        message: 'User no longer exists',
      });
    } else {
      const validPassword = await bcrypt.compare(password, user.password);
      if (validPassword) {
        const authToken = await jwt.sign(
          {
            id: user._id,
            email: user.email,
          },
          AUTH_SECRET,
          { expiresIn: '1h' }
        );
        res.status(200).json({ success: true, token: authToken });
      } else {
        res.send(401).json({
          success: false,
          message: 'Failed user authentication',
        });
      }
    }
  } else {
    res.send(400).json({
      success: false,
      message: 'Login failed, please try again',
    });
  }
};

router.post('/register', registerUsers);
router.post('/login', loginUser);
export default router;
