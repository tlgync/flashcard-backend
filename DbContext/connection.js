import dotenv from 'dotenv';
// Database conection
import mongoose from 'mongoose';

dotenv.config();

const connectionString = process.env.CONNECTION_STRING;
const DB = {
  connect: async () => {
    try {
      await mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
      return true;
    } catch (ex) {
      console.log('CONNECTION ERROR', ex.toString());
      return false;
    }
  },
};

export default DB;
