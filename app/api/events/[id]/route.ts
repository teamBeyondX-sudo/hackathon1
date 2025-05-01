import { NextResponse } from "next/server"
import { getEventById, updateEvent, deleteEvent } from "@/lib/db"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = Number.parseInt(params.id)

  // Find the event by ID
  const event = getEventById(id)

  if (!event) {
    return NextResponse.json({ error: "Event not found" }, { status: 404 })
  }

  return NextResponse.json(event)
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const updateData = await request.json()

    // Update the event
    const updatedEvent = updateEvent(id, updateData)

    if (!updatedEvent) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: "Event updated successfully",
      event: updatedEvent,
    })
  } catch (error) {
    console.error("Event update error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const id = Number.parseInt(params.id)

  // Delete the event
  const success = deleteEvent(id)

  if (!success) {
    return NextResponse.json({ error: "Event not found" }, { status: 404 })
  }

  return NextResponse.json({
    success: true,
    message: "Event deleted successfully",
  })
}
