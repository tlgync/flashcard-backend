import express from "express";
import { ValidationError } from "express-validation";
import cors from "cors";
import DB from "./DataContext/connection.js";
import bodyParser from 'body-parser'
import UserController from "./Controllers/UserController/index.js";

DB.connect();
const app = express();
app.use(express.json());

app.use(cors());
const deployPort = process.env.port;

app.use("/user", UserController);

service.use((err, req, res, next) => {
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json();
  }
  next();
});

service.listen(deployPort, (err) => {
  if (err) {
    console.log("err thrown", err.stack);
    return err;
  }
  console.log("Server online");
});

