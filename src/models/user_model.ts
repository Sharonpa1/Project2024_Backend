import mongoose from "mongoose";

export interface IUser {
    name: string;
    email: string;
    password: string;
    tokens: string[];
}

const userSchema = new mongoose.Schema<IUser>({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    tokens: {
        type: [String]
    }
});

export default mongoose.model<IUser>("User", userSchema);