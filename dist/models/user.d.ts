export interface IUser {
    username: string;
    email: string;
    password: string;
}
declare const _default: import("mongoose").Model<IUser, {}, {}, {}, import("mongoose").Document<unknown, {}, IUser, {}, {}> & IUser & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=user.d.ts.map