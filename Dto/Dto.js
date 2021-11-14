import { Joi } from "express-validation";
import joi from "joi";

const Dto = {
  UserDto: {
    Login: {
      body: joi.object({
        email: joi.string().required().email(),
        password: joi.string().required(),
      }),
    },
    Register: {
      body: joi.object({
        email: joi.string().required().email(),
        password: joi.string().required(),
        repassword: joi.string().required(),
      }),
    },
    ForgotPassword: {
      body: joi.object({
        email: joi.string().required().email(),
      }),
    },
  },
};

export default Dto;