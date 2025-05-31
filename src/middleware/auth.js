import jwt from "jsonwebtoken";

export const jwtValidate = (req, res, next) => {
  try {
    if (!req.headers["authorization"]) {
      return res.sendStatus(401);
    }
    const token = req.headers["authorization"].replace("Bearer ", "");
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        throw new Error(err);
      }
      next();
    });
  } catch (error) {
    return res.sendStatus(403);
  }
};

export const jwtRefreshTokenValidate = (req, res, next) => {
  try {
    if (!req.headers["authorization"]) {
      return res.sendStatus(401);
    }
    const token = req.headers["authorization"].replace("Bearer ", "");

    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        throw new Error(err);
      }

      req.user = decoded;
      req.user.token = token;
      delete req.user.exp;
      delete req.user.iat;
    });

    next();
  } catch (err) {
    return res.sendStatus(403);
  }
};
