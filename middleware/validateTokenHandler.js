import AsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

const validateToken = AsyncHandler(async (req, res, next) => {
  // let token;
  const authHeader = req.headers.Authorization || req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    res
      .status(401)
      .json({ error: "User is not authorized or token is missing" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ error: "User is not authorized" });
  }
});

export { validateToken };
