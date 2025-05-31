import dotenv from "dotenv";
import express from "express";

import { jwtRefreshTokenValidate, jwtValidate } from "./src/middleware/auth.js";
import { doRefreshToken, login, signup } from "./src/users.js";

const PORT = 8080;

const app = express();
app.use(express.json());
dotenv.config();

app.get("/", jwtValidate, (req, res) => {
  return res.send("Hello World");
});

app.post("/users", signup);
app.post("/users/login", login);
app.post("/users/refresh", jwtRefreshTokenValidate, doRefreshToken);

app.listen(8080, function () {
  console.log(`Listening on port ${PORT}`);
});
