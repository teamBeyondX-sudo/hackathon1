"use client"

import type React from "react"

import { useState } from "react"
import { ArrowRight, Mail, Lock, User, School, Phone } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    department: "",
    studentId: "",
    password: "",
    confirmPassword: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user selects
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.firstName) newErrors.firstName = "First name is required"
    if (!formData.lastName) newErrors.lastName = "Last name is required"

    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!formData.email.endsWith("@brainwareuniversity.ac.in")) {
      newErrors.email = "Please use your Brainware University email (@brainwareuniversity.ac.in)"
    }

    if (!formData.phone) {
      newErrors.phone = "Phone number is required"
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid 10-digit phone number"
    }

    if (!formData.department) newErrors.department = "Department is required"
    if (!formData.studentId) newErrors.studentId = "Student ID is required"

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password"
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      setIsLoading(true)

      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500))

        // In a real app, you would make an API call here
        // const response = await fetch('/api/auth/register', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(formData),
        // })

        // if (!response.ok) throw new Error('Registration failed')

        router.push("/registration-success")
      } catch (error) {
        console.error("Registration error:", error)
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <div className="min-h-[calc(100vh-73px)] w-full flex items-center justify-center p-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-2xl"
      >
        <div className="backdrop-blur-lg bg-black/30 border border-white/10 rounded-2xl shadow-[0_0_15px_rgba(149,128,255,0.2)] p-6 md:p-8">
          <div className="mb-8 text-center">
            <motion.h1
              className="text-3xl font-bold text-white mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Join Brainware University
            </motion.h1>
            <motion.p
              className="text-gray-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Create your account to access campus events and activities
            </motion.p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Label htmlFor="firstName" className="text-sm text-gray-300">
                  First Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="John"
                    className="pl-10 bg-black/20 border-gray-700 focus:border-purple-500 text-white placeholder:text-gray-500"
                  />
                </div>
                {errors.firstName && <p className="text-red-400 text-xs mt-1">{errors.firstName}</p>}
              </motion.div>

              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Label htmlFor="lastName" className="text-sm text-gray-300">
                  Last Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Doe"
                    className="pl-10 bg-black/20 border-gray-700 focus:border-purple-500 text-white placeholder:text-gray-500"
                  />
                </div>
                {errors.lastName && <p className="text-red-400 text-xs mt-1">{errors.lastName}</p>}
              </motion.div>
            </div>

            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Label htmlFor="email" className="text-sm text-gray-300">
                University Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.name@brainwareuniversity.ac.in"
                  className="pl-10 bg-black/20 border-gray-700 focus:border-purple-500 text-white placeholder:text-gray-500"
                />
              </div>
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Label htmlFor="phone" className="text-sm text-gray-300">
                  Phone Number
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="9876543210"
                    className="pl-10 bg-black/20 border-gray-700 focus:border-purple-500 text-white placeholder:text-gray-500"
                  />
                </div>
                {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
              </motion.div>

              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <Label htmlFor="department" className="text-sm text-gray-300">
                  Department
                </Label>
                <Select value={formData.department} onValueChange={(value) => handleSelectChange("department", value)}>
                  <SelectTrigger className="bg-black/20 border-gray-700 focus:border-purple-500 text-white">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-700 text-white">
                    <SelectItem value="computer-science">Computer Science & Engineering</SelectItem>
                    <SelectItem value="electronics">Electronics & Communication</SelectItem>
                    <SelectItem value="electrical">Electrical Engineering</SelectItem>
                    <SelectItem value="mechanical">Mechanical Engineering</SelectItem>
                    <SelectItem value="civil">Civil Engineering</SelectItem>
                    <SelectItem value="business">Business Administration</SelectItem>
                    <SelectItem value="arts">Arts & Humanities</SelectItem>
                  </SelectContent>
                </Select>
                {errors.department && <p className="text-red-400 text-xs mt-1">{errors.department}</p>}
              </motion.div>
            </div>

            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Label htmlFor="studentId" className="text-sm text-gray-300">
                Student ID
              </Label>
              <div className="relative">
                <School className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="studentId"
                  name="studentId"
                  value={formData.studentId}
                  onChange={handleChange}
                  placeholder="BU2023001"
                  className="pl-10 bg-black/20 border-gray-700 focus:border-purple-500 text-white placeholder:text-gray-500"
                />
              </div>
              {errors.studentId && <p className="text-red-400 text-xs mt-1">{errors.studentId}</p>}
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                <Label htmlFor="password" className="text-sm text-gray-300">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="pl-10 bg-black/20 border-gray-700 focus:border-purple-500 text-white placeholder:text-gray-500"
                  />
                </div>
                {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
              </motion.div>

              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
              >
                <Label htmlFor="confirmPassword" className="text-sm text-gray-300">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="pl-10 bg-black/20 border-gray-700 focus:border-purple-500 text-white placeholder:text-gray-500"
                  />
                </div>
                {errors.confirmPassword && <p className="text-red-400 text-xs mt-1">{errors.confirmPassword}</p>}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              className="pt-2"
            >
              <Button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 rounded-md transition-all duration-300 hover:shadow-[0_0_15px_rgba(149,128,255,0.5)] flex items-center justify-center gap-2 group"
                disabled={isLoading}
              >
                {isLoading ? "Creating Account..." : "Create Account"}
                {!isLoading && (
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                )}
              </Button>
            </motion.div>
          </form>

          <motion.div
            className="mt-6 text-center text-sm text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            Already have an account?{" "}
            <Link href="/login" className="text-purple-400 hover:text-purple-300 transition-colors">
              Sign in
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
