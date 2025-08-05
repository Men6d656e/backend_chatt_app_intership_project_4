import type { Secret, SignOptions } from "jsonwebtoken";
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
declare const config: AppConfig;
export default config;
//# sourceMappingURL=index.d.ts.map