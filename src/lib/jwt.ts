// src/lib/jwt.ts
import jwt from "jsonwebtoken";
import type { SignOptions } from "jsonwebtoken";
import type { Types } from "mongoose";
import config from "../config/index.js";

export const genrateJwtToken = (userId: Types.ObjectId): string => {
  const options: SignOptions = {
    subject: "auth-token",
  };

  if (config.TOKEN_EXPIRY) {
    options.expiresIn = config.TOKEN_EXPIRY;
  }

  return jwt.sign({ userId }, config.JWT_SECRET, options);
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, config.JWT_SECRET);
};
