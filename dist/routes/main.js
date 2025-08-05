import { Router } from "express";
import { authMiddleware } from "../middleware/auth.js";
import { mainScreenSideBar } from "../controllers/main.js";
const router = Router();
router.get("/sidebar", authMiddleware, mainScreenSideBar);
export default router;
//# sourceMappingURL=main.js.map