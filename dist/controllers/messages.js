import User from "../models/user.js";
import Messages from "../models/message.js";
import cloudinary from "../lib/cloudinary.js";
export const newMessage = async (req, res) => {
    try {
        const { message, receiverId } = req.body;
        const userId = req.userId;
        console.log(message, receiverId, userId);
        const receiver = await User.findById(receiverId);
        if (!receiver) {
            return res.status(400).json({
                success: false,
                message: "user not found",
            });
        }
        const newMessage = await Messages.create({
            senderId: userId,
            receiverId,
            text: message,
        });
        const populatedMessage = await Messages.findById(newMessage._id)
            .populate("senderId", "username")
            .populate("receiverId", "username");
        if (!populatedMessage) {
            return res.status(500).json({
                success: false,
                message: "Failed to retrieve and populate the new message.",
            });
        }
        res.status(200).json({
            success: true,
            message: "ok",
            data: populatedMessage,
        });
    }
    catch (error) {
        console.log("Error in sending message:", error);
        res.status(500).json({
            success: false,
            message: "request failed",
            error: error.message,
        });
    }
};
export const getMessage = async (req, res) => {
    try {
        const { receiverId } = req.body;
        const userId = req.userId;
        const receiver = await User.findById(receiverId);
        if (!receiver) {
            return res.status(400).json({
                success: false,
                message: "user not found",
            });
        }
        const messages = await Messages.find({
            $or: [
                { senderId: userId, receiverId: receiverId },
                { senderId: receiverId, receiverId: userId },
            ],
        })
            .sort({ timestamp: 1 })
            .populate("senderId", "username")
            .populate("receiverId", "username");
        res.status(200).json({
            success: true,
            message: "ok",
            data: messages,
        });
    }
    catch (error) {
        console.log("Error in sending message:", error);
        res.status(500).json({
            success: false,
            message: "request failed",
            error: error.message,
        });
    }
};
//# sourceMappingURL=messages.js.map