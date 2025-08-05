// src/@types/custom-types.d.ts
import { Request } from 'express';
import { Types } from 'mongoose';

export interface CustomRequest extends Request {
  userId?: string | Types.ObjectId;
}