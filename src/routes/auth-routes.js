import express from 'express';
import bcrypt from 'bcrypt';

import db from '../models';

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

const loginUser = (req, res) => {};

router.get('/register', registerUsers);
router.post('/login', loginUser);
export default router;
