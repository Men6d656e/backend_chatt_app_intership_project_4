import User from "../models/user.js";
import type { Response, Request, CookieOptions } from "express";
import { genrateJwtToken } from "../lib/jwt.js";
import config from "../config/index.js";
import bcrypt from "bcrypt";

const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: config.NODE_ENV === "production" ? true : false,
  sameSite: "none",
  maxAge: 1000 * 60 * 60 * 24,
};

export const signup = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    const newUser = await User.create({ username, email, password });

    const token = genrateJwtToken(newUser._id);

    res.cookie("jwtToken", token, cookieOptions);

    res.status(201).json({
      success: true,
      message: "sign up successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Sign up failed",
      error,
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const token = genrateJwtToken(user._id);

    res.cookie("jwtToken", token, cookieOptions);

    res.status(200).json({
      success: true,
      message: "login successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Login failed",
      error,
    });
  }
};

export const logout = async (req: Request, res: Response) => {
  res.cookie("jwtToken", "", {
    httpOnly: true,
    expires: new Date(Date.now() - 1000),
  });

  res.status(200).json({
    success: true,
    message: "logout successfully",
  });
};

export const fetchfriend = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    const user = await User.findById(id);
    if (!user) {
      res.status(400).json({
        success: false,
        message: "user not found",
      });
    }
    const messages = 'akash';
    res.status(200).json({
      success: true,
      message: "ok",
      data: {
        user,
        messages,
      },
    });
  } catch (error) {
    console.log('Error in fetching the friend data',error);
    res.status(500).json({
      success: false,
      message: "request failed",
      error,
    });
  }
};
