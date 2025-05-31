import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { users } from "./store.js";

export const signup = (req, res) => {
  const payload = req.body;
  let { email, password } = payload;
  if (!email || !password) {
    return res.send("invalid body").status(400);
  }
  if (typeof email != "string") {
    return res.send("email must be a string").status(400);
  }
  if (typeof password != "string") {
    return res.send("password must be a string").status(400);
  }
  if (password.length < 8) {
    return res.send("password must greater or equal 8 characters").status(400);
  }
  email = email.trim().toLowerCase();

  if (users.find((user) => user.email === email)) {
    return res.send("email already exists").status(409);
  }

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      return res.send("hashing error:", err);
    }
    users.push({ email: email, password: hash });
    return res.send({ success: true, email: email });
  });
};

export const login = (req, res) => {
  const payload = req.body;
  let { email, password } = payload;
  if (!email || !password) {
    return res.send("invalid body").status(400);
  }
  if (typeof email != "string") {
    return res.send("email must be a string").status(400);
  }
  if (typeof password != "string") {
    return res.send("password must be a string").status(400);
  }

  email = email.trim().toLowerCase();
  const user = users.find((user) => user.email === email);
  if (!user) {
    return res.send("user not exist").status(404);
  }

  bcrypt.compare(password, user.password, (err, result) => {
    if (err) {
      console.error("hash compare error:", err);
      return res.send("hash compare error:", err);
    }
    if (result) {
      // create accessToken and refreshToken
      const accessToken = jwtGenerate(user);
      const refreshToken = jwtRefreshTokenGenerate(user);

      return res.status(200).json({
        success: true,
        message: "Login successful",
        accessToken,
        refreshToken,
      });
    }
    return res.status(401).json({
      success: false,
      message: "Invalid credential",
    });
  });
};

export const doRefreshToken = (req, res) => {
  const user = users.find((u) => u.email === req.user.email);

  if (!user) {
    return res.sendStatus(401);
  }

  const accessToken = jwtGenerate(user);
  const refreshToken = jwtRefreshTokenGenerate(user);
  user.refresh = refreshToken;

  return res.json({
    accessToken,
    refreshToken,
  });
};

const jwtGenerate = (user) => {
  const accessToken = jwt.sign(
    { email: user.email },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "5m", algorithm: "HS256" }
  );

  return accessToken;
};

const jwtRefreshTokenGenerate = (user) => {
  const refreshToken = jwt.sign(
    { email: user.email },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "1d", algorithm: "HS256" }
  );

  return refreshToken;
};
