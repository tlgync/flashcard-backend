// import bson from 'bson';
import mongoose from 'mongoose';
import toJson from 'meanie-mongoose-to-json';

const { Schema } = mongoose;
const { model } = mongoose;
// const { ObjectID } = bson;

const user = new Schema(
  {
    email: {
      type: String,
      index: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      trim: true,
    },
    name: {
      type: String,
      trim: true,
    },
    surname: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true },
);

// _id yi id olarak parse ediyor gereksiz parametreleri ortadan kaldırıyor..!
user.plugin(toJson);

export const User = model('User', user, 'User');
