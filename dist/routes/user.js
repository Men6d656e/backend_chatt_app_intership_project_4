import { Router } from "express";
import { fetchfriend, login, logout, signup } from "../controllers/user.js";
import { authMiddleware } from "../middleware/auth.js";
import { body } from "express-validator";
import User from "../models/user.js";
import validationError from "../middleware/validationError.js";
import bcrypt from "bcrypt";
const router = Router();
router.post("/sign-up", body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ max: 30 })
    .withMessage("Username must be less then 30 characters"), body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isLength({ max: 30 })
    .withMessage("Email must be less then 30 characters")
    .isEmail()
    .withMessage("Invalid email address")
    .custom(async (value) => {
    const userexist = await User.exists({ email: value });
    if (userexist) {
        throw new Error("User is already exists");
    }
}), body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be atleast 8 characters long"), validationError, signup);
router.post("/login", body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isLength({ max: 50 })
    .withMessage("Email must be less then e0 characters")
    .isEmail()
    .withMessage("Invaid email address")
    .custom(async (value) => {
    const userExists = await User.exists({ email: value });
    if (!userExists) {
        throw new Error("Something went wrong");
    }
}), body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be atleast 8 characters long")
    .custom(async (value, { req }) => {
    const { email } = req.body;
    const user = await User.findOne({ email })
        .select("password")
        .lean()
        .exec();
    if (!user) {
        throw new Error("User email or password is invalid");
    }
    const passwordMatch = await bcrypt.compare(value, user.password);
    if (!passwordMatch) {
        throw new Error("User email or assword is invalid");
    }
}), validationError, login);
router.post("/logout", authMiddleware, logout);
router.post("/fetchfriend", authMiddleware, fetchfriend);
export default router;
//# sourceMappingURL=user.js.map