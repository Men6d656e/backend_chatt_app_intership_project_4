import type { NextFunction, Response } from "express";
import type { CustomRequest } from "../@types/custom-types.js";
declare const authMiddleware: (req: CustomRequest, res: Response, next: NextFunction) => Promise<void>;
export { authMiddleware };
//# sourceMappingURL=auth.d.ts.map