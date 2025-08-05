// src/lib/jwt.ts
import jwt from "jsonwebtoken";
import config from "../config/index.js";
export const genrateJwtToken = (userId) => {
    const options = {
        subject: "auth-token",
    };
    if (config.TOKEN_EXPIRY) {
        options.expiresIn = config.TOKEN_EXPIRY;
    }
    return jwt.sign({ userId }, config.JWT_SECRET, options);
};
export const verifyToken = (token) => {
    return jwt.verify(token, config.JWT_SECRET);
};
//# sourceMappingURL=jwt.js.map