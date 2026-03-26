import mongoose from "mongoose";
import { IBase, ObjectId } from "../types/common.types";

export interface IUser extends IBase {
    id?: ObjectId;
    name: string;
    email: string;
    password?: string; //optional bcz while google authentication we don't need password
    role: "user" | "admin" | "vendor"
}

const userSchema = new mongoose.Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String },

    role: {
        type: String,
        enum: ["user", "admin", "vendor"],
        default: "user",
    },
}, { timestamps: true })

//Always in: Next.js, API routes as
//In environments with hot reload (like Next.js, Nodemon, etc.), files can run multiple times.
//so check if exists then use that
export const User =
    mongoose.models.User || mongoose.model("User", userSchema);