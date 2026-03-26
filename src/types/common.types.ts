import mongoose from "mongoose";

export type ObjectId = mongoose.Types.ObjectId;

export interface IBase {
  _id?: ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}