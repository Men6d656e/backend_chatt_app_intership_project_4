import { model, Schema } from "mongoose";
import { Types } from "mongoose";

export interface IMessage {
  senderId: Types.ObjectId;
  receiverId: Types.ObjectId;
  text: string;
  image: string;
}

const messageSchema = new Schema<IMessage>(
  {
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
  },
  { timestamps: true }
);

export default model<IMessage>("Messages", messageSchema);
