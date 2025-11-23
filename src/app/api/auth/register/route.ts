import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest): Promise<Response> {
  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and Password are required" },
        { status: 400 }
      );
    }
    await connectToDatabase();
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already Registered " },
        { status: 409 }
      );
    }
    await User.create({
      email,
      password,
    });
    return NextResponse.json(
      { message: "Successfully Registered " },
      { status: 201 }
    );
  } catch (error) {
    console.error("During Registering process:", error);
    return NextResponse.json(
      { error: "Failed to Register user" },
      { status: 500 }
    );
  }
}
