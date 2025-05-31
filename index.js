// const express = require('express');
// const { signup } = require('./src/users');
import express from "express";
import { login, signup } from "./src/users.js";

const PORT = 8080;

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  return res.send("Hello World");
});

app.post("/users", signup);
app.post("/users/login", login);

app.listen(8080, function () {
  console.log(`Listening on port ${PORT}`);
});
