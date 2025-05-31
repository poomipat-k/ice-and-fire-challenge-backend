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
      console.log("==decoded", decoded);
      next();
    });
  } catch (error) {
    return res.sendStatus(403);
  }
};
