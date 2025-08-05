import type { Response } from "express";
import type { CustomRequest } from "../@types/custom-types.js";
export declare const newMessage: (req: CustomRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getMessage: (req: CustomRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=messages.d.ts.map