import mongoose from "mongoose";
import { IBase, ObjectId } from "../types/common.types";

export interface IProduct extends IBase {
  vendor: ObjectId;
  name: string;
  description?: string;
  price: number;
  stock?: number;
  images?: string[];
  category?: ObjectId;
  isActive?: boolean;
}

const productSchema = new mongoose.Schema<IProduct>({
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vendor",
    required: true,
  },

  name: { type: String, required: true },
  description: String,

  price: { type: Number, required: true },
  stock: { type: Number, default: 0 },

  images: [String],

  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },

  isActive: { type: Boolean, default: true },

}, { timestamps: true });

export const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);