"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Users, ArrowUpRight, Bell, BookOpen, Award } from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export default function Dashboard() {
  return (
    <div className="min-h-[calc(100vh-73px)] p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">Welcome, Rahul</h1>
            <p className="text-gray-400">Here's what's happening at Brainware University</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="border-white/10 text-white hover:bg-white/10">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700 text-white">
              <Calendar className="h-4 w-4 mr-2" />
              My Schedule
            </Button>
          </div>
        </div>

        <section>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Stats Cards */}
            <StatsCard
              title="Upcoming Events"
              value="5"
              description="Next: Tomorrow"
              icon={Calendar}
              trend="neutral"
              delay={0.1}
            />
            <StatsCard title="Attendance" value="92%" description="Above average" icon={Users} trend="up" delay={0.2} />
            <StatsCard
              title="Courses"
              value="6"
              description="Current semester"
              icon={BookOpen}
              trend="neutral"
              delay={0.3}
            />
            <StatsCard
              title="Achievement Points"
              value="750"
              description="+150 this month"
              icon={Award}
              trend="up"
              delay={0.4}
            />
          </motion.div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          {/* Upcoming Events */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="backdrop-blur-lg bg-black/30 border-white/10 shadow-[0_0_15px_rgba(149,128,255,0.1)]">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-white">Upcoming Events</CardTitle>
                  <CardDescription className="text-gray-400">Events you've registered for</CardDescription>
                </div>
                <Button asChild variant="ghost" className="text-purple-400 hover:text-purple-300">
                  <Link href="/events">
                    View All
                    <ArrowUpRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingEvents.map((event, index) => (
                    <EventCard key={index} event={event} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Profile Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="backdrop-blur-lg bg-black/30 border-white/10 shadow-[0_0_15px_rgba(149,128,255,0.1)]">
              <CardHeader>
                <CardTitle className="text-white">Your Profile</CardTitle>
                <CardDescription className="text-gray-400">Academic progress and achievements</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16 border-2 border-purple-600 p-1">
                    <AvatarImage src="/placeholder.svg?height=64&width=64&text=RS" />
                    <AvatarFallback>RS</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-white font-medium">Rahul Sharma</h3>
                    <p className="text-gray-400 text-sm">Computer Science, 3rd Year</p>
                    <div className="flex gap-2 mt-1">
                      <Badge className="bg-purple-600 text-white">Student</Badge>
                      <Badge className="bg-blue-600 text-white">Tech Club</Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <p className="text-white text-sm">Semester Progress</p>
                      <p className="text-gray-400 text-xs">65%</p>
                    </div>
                    <Progress value={65} className="h-2 bg-gray-700">
                      <div className="h-full bg-gradient-to-r from-purple-600 to-blue-600 rounded-full" />
                    </Progress>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <p className="text-white text-sm">Attendance Rate</p>
                      <p className="text-gray-400 text-xs">92%</p>
                    </div>
                    <Progress value={92} className="h-2 bg-gray-700">
                      <div className="h-full bg-gradient-to-r from-purple-600 to-blue-600 rounded-full" />
                    </Progress>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <p className="text-white text-sm">Assignment Completion</p>
                      <p className="text-gray-400 text-xs">78%</p>
                    </div>
                    <Progress value={78} className="h-2 bg-gray-700">
                      <div className="h-full bg-gradient-to-r from-purple-600 to-blue-600 rounded-full" />
                    </Progress>
                  </div>
                </div>

                <div className="pt-2">
                  <Button asChild className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                    <Link href="/profile">View Full Profile</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Announcements */}
        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card className="backdrop-blur-lg bg-black/30 border-white/10 shadow-[0_0_15px_rgba(149,128,255,0.1)]">
            <CardHeader>
              <CardTitle className="text-white">Recent Announcements</CardTitle>
              <CardDescription className="text-gray-400">Important updates from Brainware University</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {announcements.map((announcement, index) => (
                  <div key={index} className="p-4 backdrop-blur-sm bg-white/5 rounded-lg border border-white/10">
                    <div className="flex items-start gap-4">
                      <div
                        className={`h-10 w-10 rounded-full ${announcement.color} flex items-center justify-center flex-shrink-0`}
                      >
                        <announcement.icon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-white font-medium">{announcement.title}</h3>
                        <p className="text-gray-400 text-sm mt-1">{announcement.content}</p>
                        <div className="flex items-center mt-2">
                          <p className="text-gray-500 text-xs">{announcement.date}</p>
                          <span className="mx-2 text-gray-600">•</span>
                          <p className="text-gray-500 text-xs">{announcement.from}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

function StatsCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  delay,
}: {
  title: string
  value: string
  description: string
  icon: any
  trend: "up" | "down" | "neutral"
  delay: number
}) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay }}>
      <Card className="backdrop-blur-lg bg-black/30 border-white/10 shadow-[0_0_15px_rgba(149,128,255,0.1)] hover:shadow-[0_0_20px_rgba(149,128,255,0.2)] transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="h-12 w-12 rounded-full bg-purple-500/10 flex items-center justify-center">
              <Icon className="h-6 w-6 text-purple-400" />
            </div>
            {trend === "up" && (
              <div className="flex items-center text-emerald-400 text-sm">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                <span>Trending</span>
              </div>
            )}
          </div>
          <div className="mt-4">
            <h3 className="text-gray-400 text-sm font-medium">{title}</h3>
            <p className="text-white text-2xl font-bold mt-1">{value}</p>
            <p className="text-gray-400 text-xs mt-1">{description}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function EventCard({ event }: { event: any }) {
  return (
    <div className="flex items-center justify-between p-4 rounded-lg backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-colors border border-white/10">
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 rounded-md bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white font-medium">
          {event.date.split(" ")[1].replace(",", "")}
        </div>
        <div>
          <h4 className="text-white font-medium">{event.title}</h4>
          <div className="flex items-center text-gray-400 text-sm mt-1">
            <Calendar className="h-3 w-3 mr-1" />
            <span>{event.date}</span>
            <span className="mx-2">•</span>
            <Clock className="h-3 w-3 mr-1" />
            <span>{event.time}</span>
          </div>
        </div>
      </div>
      <Button asChild variant="ghost" size="sm" className="text-purple-400 hover:text-purple-300">
        <Link href={`/events/${event.id}`}>Details</Link>
      </Button>
    </div>
  )
}

const upcomingEvents = [
  {
    id: 1,
    title: "Tech Innovators Summit 2023",
    date: "May 15, 2023",
    time: "10:00 AM - 4:00 PM",
    location: "University Center, Room 302",
  },
  {
    id: 2,
    title: "Cultural Fest: Rhythms of India",
    date: "May 20, 2023",
    time: "6:00 PM - 10:00 PM",
    location: "Campus Amphitheater",
  },
  {
    id: 3,
    title: "Career Development Workshop",
    date: "May 25, 2023",
    time: "2:00 PM - 5:00 PM",
    location: "Business Building, Room 105",
  },
]

const announcements = [
  {
    title: "Mid-Semester Examination Schedule",
    content:
      "The mid-semester examinations will commence from June 10th. The detailed schedule is now available on the university portal.",
    date: "May 5, 2023",
    from: "Examination Department",
    icon: Calendar,
    color: "bg-blue-600",
  },
  {
    title: "Campus Recruitment Drive",
    content:
      "TCS and Infosys will be conducting campus recruitment drives for final year students on May 18th and 19th respectively.",
    date: "May 3, 2023",
    from: "Placement Cell",
    icon: Users,
    color: "bg-green-600",
  },
  {
    title: "Library Timings Extended",
    content:
      "The central library will remain open until 11:00 PM during the examination period from June 5th to June 25th.",
    date: "May 1, 2023",
    from: "Library Department",
    icon: BookOpen,
    color: "bg-purple-600",
  },
]
