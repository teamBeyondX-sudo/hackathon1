import { NextResponse } from "next/server"
import { getRegistrations, createRegistration, getEventById } from "@/lib/db"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get("userId")
  const eventId = searchParams.get("eventId")

  // Get all registrations
  let registrations = getRegistrations()

  // Filter by userId if provided
  if (userId) {
    registrations = registrations.filter((reg) => reg.userId === userId)
  }

  // Filter by eventId if provided
  if (eventId) {
    registrations = registrations.filter((reg) => reg.eventId === Number.parseInt(eventId))
  }

  return NextResponse.json(registrations)
}

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Validate required fields
    if (!data.eventId || !data.userId) {
      return NextResponse.json({ error: "eventId and userId are required" }, { status: 400 })
    }

    // Check if event exists
    const event = getEventById(data.eventId)
    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 })
    }

    // Check if event is full
    if (event.attendees >= event.maxAttendees) {
      return NextResponse.json({ error: "Event is already full" }, { status: 400 })
    }

    // Create the registration
    const newRegistration = createRegistration({
      eventId: data.eventId,
      userId: data.userId,
      status: "confirmed",
      paymentStatus: data.paymentStatus || (event.isPaid ? "paid" : "free"),
      paymentAmount: data.paymentAmount || (event.isPaid ? Number.parseInt(event.price.replace(/[^\d]/g, "")) : 0),
      paymentId: data.paymentId,
    })

    return NextResponse.json({
      success: true,
      message: "Registration successful",
      registration: newRegistration,
    })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
