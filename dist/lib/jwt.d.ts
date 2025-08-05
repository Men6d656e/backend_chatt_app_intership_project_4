import jwt from "jsonwebtoken";
import type { Types } from "mongoose";
export declare const genrateJwtToken: (userId: Types.ObjectId) => string;
export declare const verifyToken: (token: string) => string | jwt.JwtPayload;
//# sourceMappingURL=jwt.d.ts.map