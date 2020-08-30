import jwt from "jsonwebtoken";

export const isAuthorized = (req, res, next): void => {
  if (req.get("User-Token")) {
    const token = req.header("User-Token");

    jwt.verify(token, process.env.TOKEN_SECRET, (err) => {
      if (err) {
        console.error(err);
        res.status(401).json({ error: "Not authorized" });
      } else {
        return next();
      }
    });
  } else {
    res.status(401).json({ error: "Not authorized" });
  }
};

export const getUserToken = (id: string, platform: string): string => {
  return jwt.sign({ id, platform }, process.env.TOKEN_SECRET, {
    expiresIn: "1m",
  });
};
