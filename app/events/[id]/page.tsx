"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, DollarSign, MapPin, Users, ArrowLeft, Share2, Heart, CalendarPlus } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { PaymentModal } from "@/components/payment-modal"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function EventDetailPage({ params }: { params: { id: string } }) {
  const [isLiked, setIsLiked] = useState(false)
  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const router = useRouter()

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/events/${params.id}`)

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Event not found")
          }
          throw new Error("Failed to fetch event details")
        }

        const data = await response.json()
        setEvent(data)
      } catch (err) {
        console.error("Error fetching event:", err)
        setError(err.message || "Failed to load event details. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchEvent()
  }, [params.id])

  const handleRegister = async () => {
    try {
      // In a real app, you would make an API call to register
      // const response = await fetch('/api/registration', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     eventId: event.id,
      //     userId: 'user1', // This would come from auth context
      //     paymentStatus: event.isPaid ? 'paid' : 'free',
      //     paymentAmount: event.isPaid ? event.price : 0
      //   }),
      // })

      // if (!response.ok) throw new Error('Registration failed')

      // For now, just redirect to dashboard
      router.push("/dashboard")
    } catch (error) {
      console.error("Registration error:", error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-73px)] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white">Loading event details...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-[calc(100vh-73px)] flex items-center justify-center p-4">
        <Card className="backdrop-blur-lg bg-black/30 border-white/10 max-w-md w-full">
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-bold text-white mb-4">{error}</h2>
            <p className="text-gray-400 mb-6">The event you're looking for might have been removed or doesn't exist.</p>
            <Button asChild className="bg-purple-600 hover:bg-purple-700 text-white">
              <Link href="/events">Browse All Events</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!event) return null

  return (
    <div className="min-h-[calc(100vh-73px)]">
      <div className="relative h-[40vh] md:h-[50vh]">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black z-10" />
        <div className="absolute inset-0 bg-black/50 z-10" />
        <img src={event.image || "/placeholder.svg"} alt={event.title} className="w-full h-full object-cover" />
        <div className="absolute top-4 left-4 z-20">
          <Button
            variant="ghost"
            size="icon"
            className="bg-black/40 backdrop-blur-sm text-white hover:bg-black/60"
            asChild
          >
            <Link href="/events">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
        </div>
        <div className="absolute top-4 right-4 z-20 flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="bg-black/40 backdrop-blur-sm text-white hover:bg-black/60"
            onClick={() => setIsLiked(!isLiked)}
          >
            <Heart className={`h-5 w-5 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
          </Button>
          <Button variant="ghost" size="icon" className="bg-black/40 backdrop-blur-sm text-white hover:bg-black/60">
            <Share2 className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 -mt-20 relative z-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card className="backdrop-blur-lg bg-black/30 border-white/10 shadow-[0_0_15px_rgba(149,128,255,0.1)]">
            <CardContent className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div>
                  <Badge className="mb-2 bg-purple-600 hover:bg-purple-700 text-white">{event.category}</Badge>
                  <h1 className="text-2xl md:text-3xl font-bold text-white">{event.title}</h1>
                  <p className="text-gray-400 mt-1">Organized by {event.organizer}</p>
                </div>
                {event.isPaid && (
                  <div className="flex items-center bg-black/60 backdrop-blur-sm text-white px-4 py-2 rounded-lg">
                    <DollarSign className="h-5 w-5 mr-2 text-purple-400" />
                    <span className="text-xl font-bold">{event.price}</span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-3 text-purple-400" />
                  <div>
                    <p className="text-gray-400 text-sm">Date</p>
                    <p className="text-white">{event.date}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-3 text-purple-400" />
                  <div>
                    <p className="text-gray-400 text-sm">Time</p>
                    <p className="text-white">{event.time}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-3 text-purple-400" />
                  <div>
                    <p className="text-gray-400 text-sm">Location</p>
                    <p className="text-white">{event.location}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-2 text-purple-400" />
                  <span className="text-white">
                    {event.attendees} / {event.maxAttendees} attending
                  </span>
                </div>
                <div className="flex -space-x-2">
                  {[...Array(5)].map((_, i) => (
                    <Avatar key={i} className="border-2 border-gray-900">
                      <AvatarImage src={`/placeholder.svg?height=32&width=32&text=${String.fromCharCode(65 + i)}`} />
                      <AvatarFallback>{String.fromCharCode(65 + i)}</AvatarFallback>
                    </Avatar>
                  ))}
                  {event.attendees > 5 && (
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-700 border-2 border-gray-900 text-xs text-white">
                      +{event.attendees - 5}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                {event.isPaid ? (
                  <PaymentModal eventTitle={event.title} price={event.price} onSuccess={handleRegister} />
                ) : (
                  <Button
                    className="flex-1 bg-purple-600 hover:bg-purple-700 text-white shadow-[0_0_15px_rgba(149,128,255,0.2)] hover:shadow-[0_0_20px_rgba(149,128,255,0.4)]"
                    onClick={handleRegister}
                  >
                    Register Now
                  </Button>
                )}
                <Button
                  variant="outline"
                  className="flex-1 bg-black/20 border-white/10 text-white hover:bg-black/30 hover:text-purple-400"
                >
                  <CalendarPlus className="h-4 w-4 mr-2" />
                  Add to Calendar
                </Button>
              </div>

              <Tabs defaultValue="details" className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-black/20 border border-white/10">
                  <TabsTrigger
                    value="details"
                    className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
                  >
                    Details
                  </TabsTrigger>
                  <TabsTrigger
                    value="schedule"
                    className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
                  >
                    Schedule
                  </TabsTrigger>
                  <TabsTrigger
                    value="speakers"
                    className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
                  >
                    Speakers
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="details" className="mt-6">
                  <div className="space-y-4 text-white">
                    <p className="text-gray-300 whitespace-pre-line">{event.description}</p>
                  </div>
                </TabsContent>
                <TabsContent value="schedule" className="mt-6">
                  <div className="space-y-4">
                    {event.schedule?.map((item, index) => (
                      <div key={index} className="border-l-2 border-purple-600 pl-4 pb-6 relative">
                        <div className="absolute w-3 h-3 bg-purple-600 rounded-full -left-[7px] top-1.5"></div>
                        <p className="text-purple-400 text-sm">{item.time}</p>
                        <h3 className="text-white font-medium mt-1">{item.title}</h3>
                        {item.speaker && <p className="text-gray-300 text-sm">Speaker: {item.speaker}</p>}
                        <p className="text-gray-400 text-sm">Location: {item.location}</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="speakers" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {event.speakers?.map((speaker, index) => (
                      <div
                        key={index}
                        className="bg-black/20 border border-white/10 rounded-lg p-4 flex flex-col items-center text-center"
                      >
                        <Avatar className="h-16 w-16 mb-3">
                          <AvatarImage src={speaker.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {speaker.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <h3 className="text-white font-medium">{speaker.name}</h3>
                        <p className="text-gray-400 text-sm mt-1">{speaker.title}</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
