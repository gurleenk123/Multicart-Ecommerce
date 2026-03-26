import mongoose from "mongoose";
import { IBase, ObjectId } from "../types/common.types";

export interface ICategory extends IBase {
	name: string;
	parent?: ObjectId;
}
const categorySchema = new mongoose.Schema({
	name: { type: String, required: true },

	parent: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Category",
	},
});

export const Category =
	mongoose.models.Category || mongoose.model("Category", categorySchema);