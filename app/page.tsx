"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, Users, Award, BookOpen, ChevronRight, Star, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function LandingPage() {
  const [activeTestimonial, setActiveTestimonial] = useState(0)

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <Badge className="mb-6 px-4 py-1.5 text-sm bg-white/10 text-white border-none">
              #1 University in Eastern India
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="opacity-50 block mb-2">DISCOVER</span>
              <span className="text-gradient">Campus Life at Brainware</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto text-balance">
              Connect with events, clubs, and activities that shape your university experience
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gradient-primary hover:bg-gradient-primary-hover text-white">
                <Link href="/events">
                  Explore Events
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                <Link href="/register">Join Now</Link>
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Floating elements */}
        <div className="absolute top-1/4 left-10 w-20 h-20 rounded-full bg-purple-500/20 blur-xl animate-float"></div>
        <div
          className="absolute bottom-1/4 right-10 w-32 h-32 rounded-full bg-blue-500/20 blur-xl animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
      </section>

      {/* Stats Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {[
              { number: "15,000+", label: "Students" },
              { number: "500+", label: "Events Yearly" },
              { number: "50+", label: "Clubs & Societies" },
              { number: "95%", label: "Placement Rate" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glassmorphism rounded-xl p-6 text-center card-hover"
              >
                <h3 className="text-3xl md:text-4xl font-bold text-gradient mb-2">{stat.number}</h3>
                <p className="text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 px-3 py-1 text-sm bg-white/10 text-white border-none">Why Choose Us</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Experience <span className="text-gradient">Brainware University</span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Discover a vibrant campus life with endless opportunities to learn, grow, and connect
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              icon={<BookOpen className="h-10 w-10 text-purple-400" />}
              title="Academic Excellence"
              description="Cutting-edge programs designed to prepare you for the future"
              delay={0.1}
            />
            <FeatureCard
              icon={<Users className="h-10 w-10 text-purple-400" />}
              title="Vibrant Community"
              description="Join a diverse community of students from across India"
              delay={0.2}
            />
            <FeatureCard
              icon={<Calendar className="h-10 w-10 text-purple-400" />}
              title="Campus Events"
              description="Participate in tech fests, cultural events, and workshops"
              delay={0.3}
            />
            <FeatureCard
              icon={<Award className="h-10 w-10 text-purple-400" />}
              title="Career Opportunities"
              description="Connect with industry leaders and build your professional network"
              delay={0.4}
            />
          </div>
        </div>
      </section>

      {/* Upcoming Events Preview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-10">
            <div>
              <Badge className="mb-2 px-3 py-1 text-sm bg-white/10 text-white border-none">What's Happening</Badge>
              <h2 className="text-3xl font-bold text-white">Upcoming Events</h2>
            </div>
            <Button asChild variant="ghost" className="text-purple-400 hover:text-purple-300 mt-4 md:mt-0">
              <Link href="/events" className="flex items-center">
                View All Events
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <EventCard event={event} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 px-3 py-1 text-sm bg-white/10 text-white border-none">Student Voices</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              What Our <span className="text-gradient">Students Say</span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Hear from the students who have experienced life at Brainware University
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="glassmorphism rounded-xl p-6 md:p-10 card-hover">
              <div className="flex justify-center mb-6">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    className={`w-3 h-3 rounded-full mx-1 transition-all ${
                      activeTestimonial === index ? "bg-purple-500 scale-125" : "bg-white/30"
                    }`}
                    aria-label={`View testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <div className="relative h-[300px] md:h-[250px]">
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{
                      opacity: activeTestimonial === index ? 1 : 0,
                      x: activeTestimonial === index ? 0 : 20,
                      zIndex: activeTestimonial === index ? 1 : 0,
                    }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className="mb-6 relative">
                        <Avatar className="h-20 w-20 border-4 border-purple-500">
                          <AvatarImage src={testimonial.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {testimonial.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="absolute -bottom-2 -right-2 bg-gradient-primary rounded-full p-1">
                          <Star className="h-4 w-4 text-white fill-white" />
                        </div>
                      </div>
                      <div className="flex mb-6">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                        ))}
                      </div>
                      <p className="text-white text-lg italic mb-6">"{testimonial.quote}"</p>
                      <div>
                        <h4 className="text-white font-bold">{testimonial.name}</h4>
                        <p className="text-gray-400 text-sm">{testimonial.program}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="glassmorphism rounded-2xl p-8 md:p-12 text-center max-w-4xl mx-auto card-hover"
          >
            <Badge className="mb-6 px-4 py-1.5 text-sm bg-white/10 text-white border-none">Join Us Today</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Begin Your Journey?</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Join Brainware University and be part of a community that's shaping the future
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gradient-primary hover:bg-gradient-primary-hover text-white">
                <Link href="/register">Apply Now</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}

function FeatureCard({ icon, title, description, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
    >
      <Card className="glassmorphism h-full card-hover">
        <CardContent className="p-6 flex flex-col items-center text-center">
          <div className="mb-4 p-3 rounded-full bg-purple-900/30">{icon}</div>
          <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
          <p className="text-gray-300">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function EventCard({ event }) {
  return (
    <Card className="overflow-hidden glassmorphism card-hover group">
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <img
          src={event.image || `/placeholder.svg?height=192&width=384&text=${encodeURIComponent(event.title)}`}
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute bottom-4 left-4 z-20 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium">
          {event.category}
        </div>
        {event.featured && (
          <div className="absolute top-4 right-4 z-20 bg-gradient-primary px-3 py-1 rounded-full text-xs font-medium text-white">
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
        </div>
        <Button asChild className="w-full bg-gradient-primary hover:bg-gradient-primary-hover text-white group">
          <Link href={`/events/${event.id}`} className="flex items-center justify-center">
            View Details
            <ChevronRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}

const upcomingEvents = [
  {
    id: 1,
    title: "Tech Innovators Summit 2023",
    description:
      "Join industry leaders and innovators for a day of tech talks, workshops, and networking opportunities.",
    date: "May 15, 2023",
    time: "10:00 AM - 4:00 PM",
    category: "Technology",
    featured: true,
    image: "/placeholder.svg?height=192&width=384&text=Tech+Summit",
  },
  {
    id: 2,
    title: "Cultural Fest: Rhythms of India",
    description: "Celebrate the diverse cultural heritage of India with music, dance, and art performances.",
    date: "May 20, 2023",
    time: "6:00 PM - 10:00 PM",
    category: "Cultural",
    featured: false,
    image: "/placeholder.svg?height=192&width=384&text=Cultural+Fest",
  },
  {
    id: 3,
    title: "Career Development Workshop",
    description: "Learn essential skills for job hunting, resume building, and interview preparation.",
    date: "May 25, 2023",
    time: "2:00 PM - 5:00 PM",
    category: "Career",
    featured: false,
    image: "/placeholder.svg?height=192&width=384&text=Career+Workshop",
  },
]

const testimonials = [
  {
    name: "Rahul Sharma",
    program: "B.Tech Computer Science, 3rd Year",
    quote:
      "Brainware University has provided me with incredible opportunities to grow both academically and personally. The events and clubs have helped me develop leadership skills I never knew I had.",
    avatar: "/placeholder.svg?height=80&width=80&text=RS",
  },
  {
    name: "Priya Patel",
    program: "BBA, Final Year",
    quote:
      "The campus life at Brainware is vibrant and engaging. I've participated in numerous events that have connected me with industry professionals and helped shape my career path.",
    avatar: "/placeholder.svg?height=80&width=80&text=PP",
  },
  {
    name: "Amit Kumar",
    program: "B.Tech Electronics, 2nd Year",
    quote:
      "From technical workshops to cultural festivals, Brainware University offers something for everyone. The supportive community and experienced faculty make learning enjoyable.",
    avatar: "/placeholder.svg?height=80&width=80&text=AK",
  },
]
