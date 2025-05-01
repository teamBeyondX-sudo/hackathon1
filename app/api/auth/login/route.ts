import { NextResponse } from "next/server"
import { getUserByEmail } from "@/lib/db"

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    // Validate input
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // Find user
    const user = getUserByEmail(email.toLowerCase())

    // In a real app, you would verify the password with bcrypt or similar
    // For demo purposes, we'll just check if the user exists
    if (!user) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    // In a real app, you would create a JWT token here
    const userWithoutPassword = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    }

    return NextResponse.json({
      user: userWithoutPassword,
      message: "Login successful",
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 })
}
