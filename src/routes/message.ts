import { Router } from "express";
import { authMiddleware } from "../middleware/auth.js";
import { getMessage, newMessage } from "../controllers/messages.js";

const router = Router();

router.post("/new", authMiddleware, newMessage);
router.post("/get", authMiddleware, getMessage);

export default router;
