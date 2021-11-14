/* eslint-disable consistent-return */
import express from 'express';
import { ValidationError } from 'express-validation';
import cors from 'cors';
import dotenv from 'dotenv';
import DB from './DbContext/connection.js';
import UserController from './Controllers/UserController/index.js';

dotenv.config();

DB.connect();
const app = express();
app.use(express.json());

app.use(cors());
const deployPort = process.env.PORT;

app.use('/user', UserController);

app.use((err, req, res, next) => {
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json();
  }
  next();
});

app.listen(deployPort, err => {
  if (err) {
    console.log('err thrown', err.stack);
    return err;
  }
  console.log('Server online');
});
