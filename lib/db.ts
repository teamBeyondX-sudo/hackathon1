// This is a simple in-memory database simulation
// In a real application, you would use a proper database like MongoDB, PostgreSQL, etc

import type { EventType, UserType, RegistrationType } from "@/types/db"

// Initial data
let events: EventType[] = []
let users: UserType[] = []
let registrations: RegistrationType[] = []

// Initialize with some data
const initializeDb = () => {
  // This would typically be loaded from a real database
  events = [
    {
      id: 1,
      title: "Tech Innovators Summit 2023",
      description:
        "Join industry leaders and innovators for a day of tech talks, workshops, and networking opportunities. This summit brings together the brightest minds in technology to discuss emerging trends, share insights, and collaborate on future innovations.",
      date: "May 15, 2023",
      time: "10:00 AM - 4:00 PM",
      location: "University Center, Room 302",
      category: "Technology",
      isPaid: true,
      price: "₹500",
      image: "/placeholder.svg?height=192&width=384&text=Tech+Summit",
      organizer: "Computer Science Department",
      attendees: 156,
      maxAttendees: 200,
      featured: true,
      tags: ["tech", "innovation", "networking"],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    // More events would be added here
  ]

  users = [
    {
      id: "user1",
      firstName: "Rahul",
      lastName: "Sharma",
      email: "rahul.sharma@brainwareuniversity.ac.in",
      department: "computer-science",
      studentId: "BU2023001",
      role: "student",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    // More users would be added here
  ]

  registrations = [
    {
      id: 1,
      eventId: 1,
      userId: "user1",
      registrationDate: new Date().toISOString(),
      status: "confirmed",
      paymentStatus: "paid",
      paymentAmount: 500,
    },
    // More registrations would be added here
  ]
}

// Initialize the database
initializeDb()

// Event operations
export const getEvents = (filters = {}) => {
  // Apply filters
  const filteredEvents = [...events]

  // In a real app, you would implement proper filtering logic here

  return filteredEvents
}

export const getEventById = (id: number) => {
  return events.find((event) => event.id === id)
}

export const createEvent = (eventData: Partial<EventType>) => {
  const newEvent = {
    id: events.length + 1,
    ...eventData,
    attendees: 0,
    maxAttendees: eventData.maxAttendees || 100,
    featured: eventData.featured || false,
    tags: eventData.tags || [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  } as EventType

  events.push(newEvent)
  return newEvent
}

export const updateEvent = (id: number, eventData: Partial<EventType>) => {
  const index = events.findIndex((event) => event.id === id)
  if (index === -1) return null

  const updatedEvent = {
    ...events[index],
    ...eventData,
    updatedAt: new Date().toISOString(),
  }

  events[index] = updatedEvent
  return updatedEvent
}

export const deleteEvent = (id: number) => {
  const index = events.findIndex((event) => event.id === id)
  if (index === -1) return false

  events.splice(index, 1)
  return true
}

// User operations
export const getUserByEmail = (email: string) => {
  return users.find((user) => user.email === email)
}

export const createUser = (userData: Partial<UserType>) => {
  const newUser = {
    id: `user${users.length + 1}`,
    ...userData,
    role: userData.role || "student",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  } as UserType

  users.push(newUser)
  return newUser
}

// Registration operations
export const getRegistrations = (filters = {}) => {
  // Apply filters
  const filteredRegistrations = [...registrations]

  // In a real app, you would implement proper filtering logic here

  return filteredRegistrations
}

export const createRegistration = (registrationData: Partial<RegistrationType>) => {
  const newRegistration = {
    id: registrations.length + 1,
    ...registrationData,
    registrationDate: new Date().toISOString(),
  } as RegistrationType

  registrations.push(newRegistration)

  // Update event attendees count
  const event = events.find((e) => e.id === registrationData.eventId)
  if (event) {
    event.attendees = (event.attendees || 0) + 1
  }

  return newRegistration
}

export const getRegistrationsByUser = (userId: string) => {
  return registrations.filter((reg) => reg.userId === userId)
}

export const getRegistrationsByEvent = (eventId: number) => {
  return registrations.filter((reg) => reg.eventId === eventId)
}

// Export the database for direct access if needed
export const db = {
  events,
  users,
  registrations,
}
