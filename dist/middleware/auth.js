import { verifyToken } from "../lib/jwt.js";
import jwt from "jsonwebtoken";
const { JsonWebTokenError, TokenExpiredError } = jwt;
const authMiddleware = async (req, res, next) => {
    let token;
    const authHeader = req.headers.authorization;
    if (authHeader?.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
    }
    if (!token) {
        token = req.cookies.jwtToken;
        // if (token) console.log("token found in cookies");
    }
    if (!token) {
        res.status(401).json({ message: "Access denied, token required" });
        return;
    }
    try {
        const payload = verifyToken(token);
        // console.log(payload);
        req.userId = payload.userId;
        return next();
    }
    catch (error) {
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
//# sourceMappingURL=auth.js.map