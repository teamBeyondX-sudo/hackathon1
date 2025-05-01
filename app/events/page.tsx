"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar, Clock, DollarSign, MapPin, Search, Filter, ChevronRight } from "lucide-react"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { EventCardSkeleton } from "@/components/event-skeleton"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { EventType } from "@/types/db"

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [category, setCategory] = useState("all")
  const [events, setEvents] = useState<EventType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true)

        // Build query parameters
        const params = new URLSearchParams()
        if (searchQuery) params.append("search", searchQuery)
        if (category !== "all") params.append("category", category)
        if (activeTab === "featured") params.append("featured", "true")

        const response = await fetch(`/api/events?${params.toString()}`)

        if (!response.ok) {
          throw new Error("Failed to fetch events")
        }

        const data = await response.json()
        setEvents(data)
      } catch (err) {
        console.error("Error fetching events:", err)
        setError("Failed to load events. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [searchQuery, category, activeTab])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // The search is already handled by the useEffect
  }

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "technology", label: "Technology" },
    { value: "cultural", label: "Cultural" },
    { value: "career", label: "Career" },
    { value: "business", label: "Business" },
    { value: "environment", label: "Environment" },
    { value: "sports", label: "Sports" },
    { value: "arts", label: "Arts" },
    { value: "literary", label: "Literary" },
    { value: "networking", label: "Networking" },
  ]

  return (
    <div className="min-h-[calc(100vh-73px)]">
      <div className="relative py-20 md:py-24 overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <Badge className="mb-4 px-3 py-1 text-sm bg-white/10 text-white border-none">Discover & Connect</Badge>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">Campus Events</h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Discover and register for upcoming events, workshops, and activities happening at Brainware University
            </p>
          </motion.div>

          <div className="mb-8">
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search events by name, category, or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-6 bg-black/40 border-white/10 text-white placeholder:text-gray-500 rounded-xl shadow-[0_0_15px_rgba(149,128,255,0.1)]"
                />
              </div>
              <div className="w-full md:w-64">
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="bg-black/40 border-white/10 text-white h-12">
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-700 text-white">
                    {categories.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="bg-gradient-primary hover:bg-gradient-primary-hover text-white h-12">
                <Filter className="h-4 w-4 mr-2" />
                Search
              </Button>
            </form>
          </div>

          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList className="bg-black/40 border border-white/10">
              <TabsTrigger value="all" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
                All Events
              </TabsTrigger>
              <TabsTrigger
                value="featured"
                className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
              >
                Featured
              </TabsTrigger>
              <TabsTrigger
                value="upcoming"
                className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
              >
                Upcoming
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <EventCardSkeleton key={index} />
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-12 glassmorphism rounded-xl">
              <p className="text-red-400 mb-4">{error}</p>
              <Button
                onClick={() => window.location.reload()}
                className="bg-gradient-primary hover:bg-gradient-primary-hover text-white"
              >
                Try Again
              </Button>
            </div>
          ) : events.length === 0 ? (
            <div className="text-center py-12 glassmorphism rounded-xl">
              <h3 className="text-xl font-bold text-white mb-2">No events found</h3>
              <p className="text-gray-400 mb-4">Try adjusting your search criteria</p>
              <Button
                onClick={() => {
                  setSearchQuery("")
                  setCategory("all")
                  setActiveTab("all")
                }}
                className="bg-gradient-primary hover:bg-gradient-primary-hover text-white"
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event, index) => (
                <EventCard key={event.id} event={event} index={index} />
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}

function EventCard({ event, index }: { event: EventType; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="overflow-hidden glassmorphism card-hover group">
        <div className="relative h-48 overflow-hidden">
          <div className="absolute inset-0 bg-black/50 z-10" />
          <img
            src={event.image || `/placeholder.svg?height=192&width=384&text=${encodeURIComponent(event.title)}`}
            alt={event.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {event.isPaid && (
            <div className="absolute top-4 right-4 z-20 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium flex items-center">
              <DollarSign className="h-3 w-3 mr-1" />
              {event.price}
            </div>
          )}
          <div className="absolute bottom-4 left-4 z-20 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium">
            {event.category}
          </div>
          {event.featured && (
            <div className="absolute top-4 left-4 z-20 bg-gradient-primary px-3 py-1 rounded-full text-xs font-medium text-white">
              Featured
            </div>
          )}
        </div>
        <CardContent className="p-6">
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
            {event.title}
          </h3>
          <p className="text-gray-400 text-sm mb-4 line-clamp-2">{event.description}</p>
          <div className="space-y-2 mb-4">
            <div className="flex items-center text-gray-400 text-sm">
              <Calendar className="h-4 w-4 mr-2 text-purple-400" />
              {event.date}
            </div>
            <div className="flex items-center text-gray-400 text-sm">
              <Clock className="h-4 w-4 mr-2 text-purple-400" />
              {event.time}
            </div>
            <div className="flex items-center text-gray-400 text-sm">
              <MapPin className="h-4 w-4 mr-2 text-purple-400" />
              {event.location}
            </div>
          </div>
          <Button asChild className="w-full bg-gradient-primary hover:bg-gradient-primary-hover text-white group">
            <Link href={`/events/${event.id}`} className="flex items-center justify-center">
              {event.isPaid ? "Register Now" : "Join Event"}
              <ChevronRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}
