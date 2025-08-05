import User from "../models/user.js";
import type { Response } from "express";
import type { CustomRequest } from "../@types/custom-types.js";

export const mainScreenSideBar = async (req: CustomRequest, res: Response) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
    }
    const allusers = await User.find({ $nor: [{ _id: userId }] });

    res.status(201).json({
      success: true,
      message: "ok",
      user,
      allusers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "request fail for main screen userdata and loged user",
      error,
    });
  }
};
