/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import constant from '../Config/Constants.js';

const Helpers = {
  verifyToken: (request, response, next) => {
    const bearerHeader = request.headers.authorization;
    if (typeof bearerHeader !== 'undefined') {
      const bearerToken = bearerHeader.split(' ')[1];
      jwt.verify(bearerToken, constant.secretKey, (err, authData) => {
        if (err) {
          response.json(false);
        } else {
          next();
        }
      });
    } else {
      response.json(false);
    }
  },
  currentUser: async request => {
    const bearerHeader = request.headers.authorization;
    const bearerToken = bearerHeader.split(' ')[1];
    const decoded = await jwt.verify(bearerToken, constant.secretKey);
    return decoded.user;
  },
  ObjectId: oid => mongoose.Types.ObjectId(oid),
};

export default Helpers;
