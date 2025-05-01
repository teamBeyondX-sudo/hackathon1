"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Calendar, Download, Award, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react"

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Card className="bg-black/40 border-white/10 backdrop-blur-sm shadow-[0_0_15px_rgba(149,128,255,0.1)]">
            <CardContent className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                <div className="relative">
                  <div className="h-24 w-24 md:h-32 md:w-32 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 p-1">
                    <div className="h-full w-full rounded-full bg-black/40 p-1">
                      <Avatar className="h-full w-full">
                        <AvatarImage src="/placeholder.svg?height=128&width=128&text=JS" />
                        <AvatarFallback>JS</AvatarFallback>
                      </Avatar>
                    </div>
                  </div>
                  <div className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-emerald-500 border-4 border-black flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                </div>

                <div className="flex-1 text-center md:text-left">
                  <h1 className="text-2xl md:text-3xl font-bold text-white">John Smith</h1>
                  <p className="text-gray-400">Computer Science, Class of 2025</p>
                  <div className="flex flex-wrap gap-2 mt-3 justify-center md:justify-start">
                    <Badge className="bg-purple-600 hover:bg-purple-700 text-white">Tech Enthusiast</Badge>
                    <Badge className="bg-blue-600 hover:bg-blue-700 text-white">Event Leader</Badge>
                    <Badge className="bg-emerald-600 hover:bg-emerald-700 text-white">Volunteer</Badge>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="text-center md:text-right">
                    <p className="text-gray-400 text-sm">Student ID</p>
                    <p className="text-white font-mono">STU-2023-45678</p>
                  </div>
                  <Button
                    variant="outline"
                    className="bg-black/20 border-white/10 text-white hover:bg-black/30 hover:text-purple-400"
                  >
                    Edit Profile
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Tabs defaultValue="upcoming" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-black/20 border border-white/10">
                <TabsTrigger
                  value="upcoming"
                  className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
                >
                  Upcoming
                </TabsTrigger>
                <TabsTrigger value="past" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
                  Past Events
                </TabsTrigger>
                <TabsTrigger
                  value="certificates"
                  className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
                >
                  Certificates
                </TabsTrigger>
              </TabsList>

              <TabsContent value="upcoming" className="mt-6 space-y-4">
                {upcomingEvents.map((event, index) => (
                  <EventCard key={index} event={event} type="upcoming" />
                ))}
              </TabsContent>

              <TabsContent value="past" className="mt-6 space-y-4">
                {pastEvents.map((event, index) => (
                  <EventCard key={index} event={event} type="past" />
                ))}
              </TabsContent>

              <TabsContent value="certificates" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {certificates.map((certificate, index) => (
                    <CertificateCard key={index} certificate={certificate} />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="bg-black/40 border-white/10 backdrop-blur-sm shadow-[0_0_15px_rgba(149,128,255,0.1)]">
              <CardHeader>
                <CardTitle className="text-white">Achievements</CardTitle>
                <CardDescription className="text-gray-400">Your progress and badges</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <p className="text-white">Event Attendance</p>
                    <p className="text-gray-400 text-sm">12/20</p>
                  </div>
                  <Progress value={60} className="h-2 bg-gray-700">
                    <div className="h-full bg-gradient-to-r from-purple-600 to-blue-600 rounded-full" />
                  </Progress>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <p className="text-white">Leadership Points</p>
                    <p className="text-gray-400 text-sm">750/1000</p>
                  </div>
                  <Progress value={75} className="h-2 bg-gray-700">
                    <div className="h-full bg-gradient-to-r from-purple-600 to-blue-600 rounded-full" />
                  </Progress>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <p className="text-white">Volunteer Hours</p>
                    <p className="text-gray-400 text-sm">18/25</p>
                  </div>
                  <Progress value={72} className="h-2 bg-gray-700">
                    <div className="h-full bg-gradient-to-r from-purple-600 to-blue-600 rounded-full" />
                  </Progress>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <h3 className="text-white font-medium mb-4">Badges Earned</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {badges.map((badge, index) => (
                      <div key={index} className="flex flex-col items-center text-center">
                        <div className={`h-12 w-12 rounded-full ${badge.color} flex items-center justify-center mb-2`}>
                          <badge.icon className="h-6 w-6 text-white" />
                        </div>
                        <p className="text-white text-xs">{badge.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

function EventCard({ event, type }: { event: any; type: "upcoming" | "past" }) {
  return (
    <Card className="bg-black/20 border-white/10 hover:bg-black/30 transition-colors">
      <CardContent className="p-4 flex flex-col md:flex-row gap-4">
        <div className="h-16 w-16 md:h-20 md:w-20 rounded-md bg-gradient-to-br from-purple-800 to-black flex items-center justify-center text-white font-bold text-xl">
          {event.date.split(" ")[1].replace(",", "")}
        </div>
        <div className="flex-1">
          <h3 className="text-white font-medium">{event.title}</h3>
          <div className="flex items-center text-gray-400 text-sm mt-1">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{event.date}</span>
            <span className="mx-2">•</span>
            <Clock className="h-4 w-4 mr-1" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center mt-2">
            {type === "upcoming" ? (
              <Badge className="bg-blue-600 hover:bg-blue-700 text-white">Registered</Badge>
            ) : (
              <div className="flex items-center">
                {event.status === "attended" ? (
                  <Badge className="bg-emerald-600 hover:bg-emerald-700 text-white flex items-center">
                    <CheckCircle className="h-3 w-3 mr-1" /> Attended
                  </Badge>
                ) : event.status === "missed" ? (
                  <Badge className="bg-red-600 hover:bg-red-700 text-white flex items-center">
                    <XCircle className="h-3 w-3 mr-1" /> Missed
                  </Badge>
                ) : (
                  <Badge className="bg-amber-600 hover:bg-amber-700 text-white flex items-center">
                    <AlertCircle className="h-3 w-3 mr-1" /> Partial
                  </Badge>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center">
          <Button variant="ghost" className="text-white hover:text-purple-400 hover:bg-black/40">
            {type === "upcoming" ? "View Details" : "View Feedback"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function CertificateCard({ certificate }: { certificate: any }) {
  return (
    <Card className="bg-black/20 border-white/10 hover:bg-black/30 transition-colors">
      <CardContent className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
            <Award className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-white font-medium">{certificate.title}</h3>
            <p className="text-gray-400 text-sm">{certificate.date}</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="text-white hover:text-purple-400 hover:bg-black/40">
          <Download className="h-5 w-5" />
        </Button>
      </CardContent>
    </Card>
  )
}

const upcomingEvents = [
  {
    title: "Tech Innovation Summit",
    date: "May 15, 2023",
    time: "10:00 AM - 4:00 PM",
    location: "University Center, Room 302",
  },
  {
    title: "Career Development Workshop",
    date: "May 18, 2023",
    time: "2:00 PM - 5:00 PM",
    location: "Business Building, Room 105",
  },
  {
    title: "Spring Music Festival",
    date: "May 20, 2023",
    time: "6:00 PM - 10:00 PM",
    location: "Campus Amphitheater",
  },
]

const pastEvents = [
  {
    title: "Entrepreneurship Panel",
    date: "April 25, 2023",
    time: "3:00 PM - 5:00 PM",
    location: "Business Building, Auditorium",
    status: "attended",
  },
  {
    title: "Hackathon 2023",
    date: "April 15, 2023",
    time: "9:00 AM - 9:00 PM",
    location: "Innovation Center",
    status: "attended",
  },
  {
    title: "AI in Healthcare Lecture",
    date: "April 5, 2023",
    time: "2:00 PM - 4:00 PM",
    location: "Science Building, Room 201",
    status: "missed",
  },
  {
    title: "Student Leadership Conference",
    date: "March 28, 2023",
    time: "10:00 AM - 3:00 PM",
    location: "Student Union",
    status: "partial",
  },
]

const certificates = [
  {
    title: "Hackathon 2023 Participant",
    date: "April 15, 2023",
  },
  {
    title: "Leadership Workshop Completion",
    date: "March 28, 2023",
  },
  {
    title: "Volunteer Recognition",
    date: "February 12, 2023",
  },
  {
    title: "Tech Skills Bootcamp",
    date: "January 20, 2023",
  },
]

const badges = [
  {
    name: "Tech Expert",
    icon: Award,
    color: "bg-purple-600",
  },
  {
    name: "Volunteer",
    icon: Award,
    color: "bg-emerald-600",
  },
  {
    name: "Leader",
    icon: Award,
    color: "bg-blue-600",
  },
  {
    name: "Networker",
    icon: Award,
    color: "bg-amber-600",
  },
  {
    name: "Innovator",
    icon: Award,
    color: "bg-cyan-600",
  },
  {
    name: "Speaker",
    icon: Award,
    color: "bg-pink-600",
  },
]
