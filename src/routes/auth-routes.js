import express from 'express';

import db from '../models';
const router = express.Router();

const registerUsers = (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  if (firstName && lastName && email && password) {
    res.send('hi');
  } else {
    res.send(400).json({
      success: false,
      message: 'Please fill out the details',
    });
  }
};

router.get('/register', registerUsers);

export default router;
