import { verifyToken } from "../lib/jwt.js";
import type { Types } from "mongoose";
import type { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import type { CustomRequest } from "../@types/custom-types.js";

const { JsonWebTokenError, TokenExpiredError } = jwt;

const authMiddleware = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  let token: string | undefined;

  const authHeader = req.headers.authorization;
  if (authHeader?.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  }

  if (!token) {
    token = req.cookies.jwtToken as string | undefined;
    // if (token) console.log("token found in cookies");
  }
  if (!token) {
    res.status(401).json({ message: "Access denied, token required" });
    return;
  }

  try {
    const payload = verifyToken(token) as {
      userId: string | Types.ObjectId;
    };
    // console.log(payload);
    req.userId = payload.userId;
    return next();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return next();
    }
    if (error instanceof JsonWebTokenError) {
      res.status(401).json({
        message: "Invalid Token",
      });
      console.log("Invalid json token: ", error);
      return;
    }
    console.log("middleWare Error: ", error);

    res.status(500).json({
      message: "Internal server Error",
    });
  }
};

export { authMiddleware };
