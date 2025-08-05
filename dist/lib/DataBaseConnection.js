import mongoose from "mongoose";
import config from "../config/index.js";
const clientOptions = {
    dbName: "chatt-app",
    appName: "Chatt App",
    serverApi: {
        version: "1",
        strict: true,
        deprecationErrors: true,
    },
};
export const connectDataBase = async () => {
    if (!config.MONGO_URI) {
        throw new Error("MongoDB Url is not defined in the configuration");
    }
    try {
        await mongoose.connect(config.MONGO_URI, clientOptions);
        console.log("DataBase Connected Successfully!\n");
    }
    catch (error) {
        if (error instanceof Error) {
            throw error;
        }
        console.error("Error connecting to MongoDB:", error);
    }
};
export const disconnectDataBas = async () => {
    try {
        await mongoose.disconnect();
        console.log("DataBase Disconnected Successfully!\n");
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        console.error("Error disconnecting from MongoDB:", error);
    }
};
//# sourceMappingURL=DataBaseConnection.js.map