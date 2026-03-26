import mongoose from "mongoose";
import { IBase, ObjectId } from "../types/common.types";

export interface IVendor extends IBase {
	user: ObjectId;

	storeName: string;
	storeDescription?: string;

	gstNumber?: string;
	address?: string;

	isApproved?: boolean;

	verificationStatus?: "pending" | "approved" | "rejected";

	requestedAt?: Date;
	approvedAt?: Date;
}

const vendorSchema = new mongoose.Schema<IVendor>({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},

	storeName: { type: String, required: true },
	storeDescription: String,

	gstNumber: String,
	address: String,

	isApproved: { type: Boolean, default: false },

	verificationStatus: {
		type: String,
		enum: ["pending", "approved", "rejected"],
		default: "pending",
	},

	requestedAt: { type: Date, default: Date.now },
	approvedAt: Date,

}, { timestamps: true });

export const Vendor =
	mongoose.models.Vendor || mongoose.model("Vendor", vendorSchema);