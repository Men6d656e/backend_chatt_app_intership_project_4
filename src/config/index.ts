import type { Secret, SignOptions } from "jsonwebtoken";
import pkg from "dotenv";
const dotenv = pkg;
dotenv.config();

type TokenExpiryType = SignOptions["expiresIn"];

interface AppConfig {
  PORT: string;
  NODE_ENV: "development" | "production";
  MONGO_URI: string;
  JWT_SECRET: Secret;
  TOKEN_EXPIRY: TokenExpiryType;
  WHITELIST_OPIGINS: string[];
  CLOUDENARY_CLOUD_NAME: string;
  API_KEY: string;
  SECRET_KEY: string;
}

if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI is not defined in the environment variables.");
}

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in the environment variables.");
}

const config: AppConfig = {
  PORT: process.env.PORT!,
  NODE_ENV: process.env.NODE_ENV as "development" | "production",
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET as Secret,
  TOKEN_EXPIRY: (process.env.TOKEN_EXPIRY || "1d") as TokenExpiryType,
  WHITELIST_OPIGINS: process.env.WHITELIST_OPIGINS
    ? process.env.WHITELIST_OPIGINS!.split(",")
    : ["https://frontend-chatt-app-internship-proje.vercel.app"],
  CLOUDENARY_CLOUD_NAME: process.env.CLOUDENARY_CLOUD_NAME!,
  API_KEY: process.env.API_KEY!,
  SECRET_KEY: process.env.SECRET_KEY!,
};

export default config;
