import { Router } from 'express';
import { validate } from 'express-validation';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import Helpers from '../../Helpers/index.js';
import Dto from '../../Dto/Dto.js';
import Filter from '../../Dto/DbFilter.js';
import constant from '../../Config/Constants.js';
import { User } from '../../Models/index.js';

dotenv.config();

const UserController = Router();

// Giriş
const Login = async (request, response) => {
  try {
    const user = await User.findOne(request.body);
    if (user) {
      const token = jwt.sign({ user }, constant.secretKey, {
        expiresIn: '1w',
      });
      response.json({ token, data: user });
    }
  } catch (ex) {
    const Response = { message: ex.toString(), data: null, error: true };
    response.json(Response);
  }
};
UserController.post('/login', validate(Dto.UserDto.Login), Login);

// Forgot Password
const ForgotPassword = async (request, response) => {
  try {
    const user = await User.findOne(request.body);
    if (user) {
      response.json({ user });
      const transporter = nodemailer.createTransport({
        port: 465,
        host: 'smtp.gmail.com',
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD,
        },
        secure: true,
      });
      const mailData = {
        from: `${user.name} ${user.surname}`,
        to: 'ynctlg@gmail.com',
        subject: 'Reset Password Flash Cards React',
        text: `${user.name} ${user.surname} | Change Password: http:localhost:3000/resetPassword/${user.id}`,
        html: `<div>${user.name} ${user.name}</div><p>Change Password:
          http://localhost:3000/resetPassword/${user.id}</p>`,
      };
      transporter.sendMail(mailData, (err, info) => {
        if (err) { console.log(err, 'EROR'); } else { console.log(info, 'INFO'); }
      });
    } else {
      response.json({ message: 'User not exist!' });
    }
  } catch (ex) {
    const Response = { message: ex.toString(), data: null, error: true };
    response.json(Response);
  }
};
UserController.post('/forgotPassword', validate(Dto.UserDto.ForgotPassword), ForgotPassword);

// Kayıt Olma
const Register = async (request, response) => {
  try {
    const allUser = await User.findOne(request.body, Filter.UserFilter);
    console.log(allUser);
    if (allUser) {
      response.json({
        message: 'This email exist.',
        data: null,
        error: false,
      });
    } else {
      const user = request.body;
      const newUser = new User(user);
      await newUser.save();
      response.json({
        message: 'You have successfully registered.',
        data: newUser,
        error: false,
      });
    }
  } catch (ex) {
    const Response = { message: ex.toString(), data: null, error: true };
    response.json(Response);
  }
};
UserController.post('/register', Register);
// Reset Password

const ResetPassword = async (request, response) => {
  try {
    const user = await User.updateOne(
      { _id: (request.body.id) },
      request.body,
    );
    if (user.n !== 0) {
      response.json({
        message: 'User updated',
        data: null,
        error: false,
      });
    } else {
      response.json({
        message: 'User not exist',
      });
    }
  } catch (ex) {
    const Response = { message: ex.toString(), data: null, error: true };
    response.json(Response);
  }
};
UserController.post('/resetPassword', ResetPassword);

//  Token Durumu
const CheckAuth = async (request, response) => {
  response.json({ status: true });
};
UserController.get('/checkauth', Helpers.verifyToken, CheckAuth);

export default UserController;
