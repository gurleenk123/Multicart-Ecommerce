import { NextRequest } from "next/server";
import connectDB from "@/src/lib/database";
import { User } from "@/src/model/user.model";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    await connectDB()
    const { name, email, password } = await req.json();

    // ✅ 1. Validation
    if (!name || !email || !password) {
      return Response.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // ✅ 2. Check existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return Response.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    // ✅ 3. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ 4. Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // ✅ 5. Remove password from response
    const userObj = user.toObject();
    delete userObj.password;

    return Response.json(
      {
        message: "User registered successfully",
        user: userObj,
      },
      { status: 201 }
    );

  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}