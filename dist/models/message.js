import { model, Schema } from "mongoose";
import { Types } from "mongoose";
const messageSchema = new Schema({
    senderId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Please provide a senderId"],
    },
    receiverId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Please provide a receiverId"],
    },
    text: {
        type: String,
    },
}, { timestamps: true });
export default model("Messages", messageSchema);
//# sourceMappingURL=message.js.map