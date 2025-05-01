import { NextResponse } from "next/server"
import { getUserByEmail, createUser } from "@/lib/db"

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Validate required fields
    const requiredFields = ["firstName", "lastName", "email", "password", "studentId", "department"]
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json({ error: `${field} is required` }, { status: 400 })
      }
    }

    // Validate email format
    if (!data.email.endsWith("@brainwareuniversity.ac.in")) {
      return NextResponse.json({ error: "Email must be a valid Brainware University email" }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = getUserByEmail(data.email.toLowerCase())
    if (existingUser) {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 400 })
    }

    // In a real app, you would hash the password here
    // const hashedPassword = await bcrypt.hash(data.password, 10)

    // Create the user
    const newUser = createUser({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email.toLowerCase(),
      department: data.department,
      studentId: data.studentId,
      role: "student",
      // In a real app, you would store the hashed password
      // password: hashedPassword
    })

    return NextResponse.json({
      success: true,
      message: "Registration successful",
      userId: newUser.id,
    })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 })
}
