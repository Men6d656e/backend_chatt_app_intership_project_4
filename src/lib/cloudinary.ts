import { v2 as cloudinary } from "cloudinary";
import config from "../config/index.js";

cloudinary.config({
  cloud_name: config.CLOUDENARY_CLOUD_NAME,
  api_key: config.API_KEY,
  api_secret: config.SECRET_KEY,
});

export default cloudinary;
