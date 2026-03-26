import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL!;

let cached = (global as any).mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export default async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
	cached.promise = mongoose.connect(MONGODB_URL) as Promise<typeof mongoose>;
  }

  cached.conn = await cached.promise;
  return cached.conn;
}