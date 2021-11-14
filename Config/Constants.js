import dotenv from 'dotenv';

dotenv.config();

const constant = {
  secretKey: process.env.SECRET_KEY,
};
export default constant;
