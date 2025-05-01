import { NextResponse } from "next/server"
import { getEvents, createEvent } from "@/lib/db"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get("category")
  const search = searchParams.get("search")?.toLowerCase()
  const featured = searchParams.get("featured") === "true"
  const limit = Number.parseInt(searchParams.get("limit") || "0")
  const tag = searchParams.get("tag")?.toLowerCase()

  // Get all events
  let events = getEvents()

  // Filter by category if provided
  if (category && category !== "all") {
    events = events.filter((event) => event.category.toLowerCase() === category.toLowerCase())
  }

  // Filter by search term if provided
  if (search) {
    events = events.filter(
      (event) =>
        event.title.toLowerCase().includes(search) ||
        event.description.toLowerCase().includes(search) ||
        event.location.toLowerCase().includes(search) ||
        event.category.toLowerCase().includes(search),
    )
  }

  // Filter by featured flag if provided
  if (featured) {
    events = events.filter((event) => event.featured)
  }

  // Filter by tag if provided
  if (tag) {
    events = events.filter((event) => event.tags?.some((t) => t.toLowerCase() === tag))
  }

  // Apply limit if provided
  if (limit > 0) {
    events = events.slice(0, limit)
  }

  return NextResponse.json(events)
}

export async function POST(request: Request) {
  try {
    const eventData = await request.json()

    // Validate required fields
    const requiredFields = ["title", "description", "date", "time", "location", "category"]
    for (const field of requiredFields) {
      if (!eventData[field]) {
        return NextResponse.json({ error: `${field} is required` }, { status: 400 })
      }
    }

    // Create the event
    const newEvent = createEvent(eventData)

    return NextResponse.json({
      success: true,
      message: "Event created successfully",
      event: newEvent,
    })
  } catch (error) {
    console.error("Event creation error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
