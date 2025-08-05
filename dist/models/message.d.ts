import { Types } from "mongoose";
export interface IMessage {
    senderId: Types.ObjectId;
    receiverId: Types.ObjectId;
    text: string;
    image: string;
}
declare const _default: import("mongoose").Model<IMessage, {}, {}, {}, import("mongoose").Document<unknown, {}, IMessage, {}, {}> & IMessage & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=message.d.ts.map