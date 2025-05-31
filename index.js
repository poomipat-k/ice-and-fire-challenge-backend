import dotenv from "dotenv";
import express from "express";

import { jwtValidate } from "./src/middleware/auth.js";
import { login, signup } from "./src/users.js";

const PORT = 8080;

const app = express();
app.use(express.json());
dotenv.config();

app.get("/", jwtValidate, (req, res) => {
  console.log(process.env.TESTENV);
  return res.send("Hello World");
});

app.post("/users", signup);
app.post("/users/login", login);

app.listen(8080, function () {
  console.log(`Listening on port ${PORT}`);
});
