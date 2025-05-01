export interface EventType {
  id: number
  title: string
  description: string
  date: string
  time: string
  location: string
  category: string
  isPaid: boolean
  price?: string
  image?: string
  organizer: string
  attendees: number
  maxAttendees: number
  featured: boolean
  tags: string[]
  schedule?: ScheduleItem[]
  speakers?: SpeakerItem[]
  createdAt: string
  updatedAt: string
}

export interface ScheduleItem {
  time: string
  title: string
  speaker?: string
  location: string
}

export interface SpeakerItem {
  name: string
  title: string
  avatar?: string
}

export interface UserType {
  id: string
  firstName: string
  lastName: string
  email: string
  department: string
  studentId: string
  role: "student" | "admin" | "faculty"
  avatar?: string
  phone?: string
  createdAt: string
  updatedAt: string
}

export interface RegistrationType {
  id: number
  eventId: number
  userId: string
  registrationDate: string
  status: "pending" | "confirmed" | "cancelled"
  paymentStatus: "pending" | "paid" | "free" | "failed"
  paymentAmount: number
  paymentId?: string
}

export interface ClubType {
  id: number
  name: string
  description: string
  category: string
  image?: string
  members: number
  president: string
  faculty: string
  meetingTime?: string
  meetingLocation?: string
  socialMedia?: {
    instagram?: string
    facebook?: string
    twitter?: string
  }
  createdAt: string
  updatedAt: string
}
