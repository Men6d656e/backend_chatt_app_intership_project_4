import express from "express";
import config from "./config/index.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import {
  connectDataBase,
  disconnectDataBas,
} from "./lib/DataBaseConnection.js";

import http from "http";
import { initializeSocketIO } from "./socket/index.js";

import type { Request, Response } from "express";
import type { CorsOptions } from "cors";

// routes
import userRouters from "./routes/user.js";
import messagesRoutes from "./routes/message.js";
import mainScreenRoutes from "./routes/main.js";

const app = express();
const server = http.createServer(app);

const io = initializeSocketIO(server); // Pass the HTTP server to the Socket.IO setup

// cors options
// const corsOptions: CorsOptions = {
//   origin(origin, callbacl) {
//     if (
//       config.NODE_ENV === "development" ||
//       !origin ||
//       origin === 'https://frontend-chatt-app-internship-proje.vercel.app'
//     ) {
//       callbacl(null, true);
//     } else {
//       // reject the request non-whitelist
//       callbacl(new Error("Not allowed by CORS"), false);
//       console.log(`Cors Error: ${origin} is not allowed by cors`);
//     }
//   },
//   credentials: true,
// };

const corsOptions: CorsOptions = {
  origin: config.WHITELIST_OPIGINS,
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  res.send("Server is running");
});
(async () => {
  try {
    await connectDataBase();

    // routes
    app.use("/api/user", userRouters);
    app.use("/api/messages", messagesRoutes);
    // main screen
    app.use("/api/main", mainScreenRoutes);
    server.listen(config.PORT, () => {
      console.log(`Server is running at http://localhost:${config.PORT}`);
    });
  } catch (error) {
    console.log("failed to start server:", error);
    if (config.NODE_ENV === "production") {
      process.exit(1);
    }
  }
})();

const handleServerShutDown = async () => {
  try {
    await disconnectDataBas();
    console.log("Server shutdown successfully");
    process.exit(0);
  } catch (error) {
    console.log("Error diring server Shutdown", error);
  }
};

process.on("SIGTERM", handleServerShutDown);
process.on("SIGINT", handleServerShutDown);
