import express from 'express';
import bcrypt from 'bcrypt';

import db from '../models';

const router = express.Router();

const validate = (body) => {
  const {
    firstName, lastName, email, password,
  } = body;
  const isValid = firstName && lastName && email && password;
  return isValid;
};

const registerUsers = async (req, res) => {
  const {
    firstName, lastName, email, password,
  } = req.body;

  if (validate(req.body)) {
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
  } else {
    res.send(400).json({
      success: false,
      message: 'Please fill out the details',
    });
  }
};

router.get('/register', registerUsers);

export default router;
