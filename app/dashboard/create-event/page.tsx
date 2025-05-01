"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { CalendarIcon, Clock, DollarSign, Link, Upload } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Event title must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  date: z.date({
    required_error: "Event date is required.",
  }),
  time: z.string().min(1, {
    message: "Event time is required.",
  }),
  location: z.string().min(2, {
    message: "Location is required.",
  }),
  formLink: z.string().url({
    message: "Please enter a valid URL for the registration form.",
  }),
  isPaid: z.boolean().default(false),
  price: z.string().optional(),
})

export default function CreateEventPage() {
  const [date, setDate] = useState<Date>()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      location: "",
      formLink: "",
      isPaid: false,
      price: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    // Handle form submission
  }

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="bg-black/40 border-white/10 backdrop-blur-sm shadow-[0_0_15px_rgba(149,128,255,0.1)]">
          <CardHeader>
            <CardTitle className="text-white text-2xl">Create New Event</CardTitle>
            <CardDescription className="text-gray-400">
              Fill out the form below to create a new campus event
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Event Title</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter event title"
                            {...field}
                            className="bg-black/20 border-gray-700 focus:border-purple-500 text-white"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Location</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter event location"
                            {...field}
                            className="bg-black/20 border-gray-700 focus:border-purple-500 text-white"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter event description"
                          {...field}
                          className="min-h-32 bg-black/20 border-gray-700 focus:border-purple-500 text-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className="text-white">Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full pl-3 text-left font-normal bg-black/20 border-gray-700 hover:bg-black/30 text-white",
                                  !field.value && "text-gray-400",
                                )}
                              >
                                {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0 bg-gray-900 border-gray-700" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              initialFocus
                              className="bg-gray-900 text-white"
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="time"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Time</FormLabel>
                        <div className="relative">
                          <FormControl>
                            <Input
                              type="time"
                              placeholder="Select time"
                              {...field}
                              className="bg-black/20 border-gray-700 focus:border-purple-500 text-white"
                            />
                          </FormControl>
                          <Clock className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="formLink"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Registration Form Link</FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input
                            placeholder="https://forms.google.com/..."
                            {...field}
                            className="bg-black/20 border-gray-700 focus:border-purple-500 text-white pl-10"
                          />
                        </FormControl>
                        <Link className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      </div>
                      <FormDescription className="text-gray-500">
                        Add a Google Form or other registration form link
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="isPaid"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border border-white/10 p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-white">Paid Event</FormLabel>
                          <FormDescription className="text-gray-500">Toggle if this is a paid event</FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="data-[state=checked]:bg-purple-600"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  {form.watch("isPaid") && (
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Price</FormLabel>
                          <div className="relative">
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="19.99"
                                {...field}
                                className="bg-black/20 border-gray-700 focus:border-purple-500 text-white pl-10"
                              />
                            </FormControl>
                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>

                <div className="border border-dashed border-white/10 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-white font-medium">Upload Event Banner</p>
                  <p className="text-gray-400 text-sm mt-1">Drag and drop or click to upload</p>
                  <p className="text-gray-500 text-xs mt-1">PNG, JPG or GIF, max 5MB</p>
                  <Input type="file" className="hidden" id="event-banner" accept="image/*" />
                  <Button
                    variant="outline"
                    className="mt-4 bg-black/20 border-gray-700 hover:bg-black/30 text-white"
                    onClick={() => document.getElementById("event-banner")?.click()}
                    type="button"
                  >
                    Select File
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-between border-t border-white/10 pt-6">
            <Button variant="outline" className="bg-black/20 border-gray-700 hover:bg-black/30 text-white">
              Cancel
            </Button>
            <Button
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
              onClick={form.handleSubmit(onSubmit)}
            >
              Create Event
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}
