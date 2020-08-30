import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import csurf from "csurf";
import baseRoutes from "./routes/base/base";

import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 5000;

app.use(bodyParser.json());

app.use(cookieParser());
const csrfProtection = csurf({ cookie: true });
app.use(csrfProtection);

const corsOptions = {
  origin: process.env.ORIGIN,
  exposedHeaders: ["Authorization", "User-Token"],
  credentials: true,
};

app.use(cors(corsOptions));

app.use((req, res, next) => {
  res.cookie("XSRF-TOKEN", req.csrfToken());
  res.locals._csrf = req.csrfToken();
  next();
});

app.use("/", baseRoutes);

app.listen(port, () => {
  console.log(`Listening at port ${port}`);
});
