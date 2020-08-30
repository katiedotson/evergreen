import jwt from "jsonwebtoken";
import { UserData, User } from "../types";
import nodemailer from "nodemailer";
import util from "../util";

export const isAuthorized = (req, res, next): void => {
  if (req.get("User-Token")) {
    const token = req.header("User-Token");

    jwt.verify(token, process.env.TOKEN_SECRET, (err) => {
      if (err) {
        console.error(err);
        res.status(401).json({ error: "Not Authorized" });
      } else {
        return next();
      }
    });
  } else {
    res.status(401).json({ error: "Not Authorized" });
  }
};

export const getUserToken = (id: string, platform: string): string => {
  return jwt.sign({ id, platform }, process.env.TOKEN_SECRET, {
    expiresIn: "30m",
  });
};

export const getUserDataFromHeader = (req): any => {
  const token = req.header("User-Token");
  const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
  return decoded;
};

export const decodeToken = (token: string): any => {
  return jwt.verify(token, process.env.TOKEN_SECRET);
};

export const sendAuthEmail = (userData: UserData, user: User): void => {
  const email = user.email;
  const firstName = user.firstName;
  const lastName = user.lastName;
  const unexpiredAuthToken = jwt.sign(
    { id: userData.id, platform: userData.platform },
    process.env.TOKEN_SECRET
  );
  const authenticateUrl = `${process.env.HOST}/user/activate?authToken=${unexpiredAuthToken}`;
  const transport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  transport.sendMail(
    {
      from: process.env.EMAIL_ADDRESS,
      to: email,
      subject: "Evegreen | Verify Your Email Address",
      html: util.generateVerificationEmail(
        firstName,
        lastName,
        authenticateUrl
      ),
    },
    (err, info) => {
      if (err) console.error(err);

      console.log(info);
    }
  );
};
