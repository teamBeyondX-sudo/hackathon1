"use client"

import type React from "react"

import { useState } from "react"
import { ArrowRight, Mail, Lock } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [emailError, setEmailError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const validateEmail = (email: string) => {
    const regex = /@brainwareuniversity\.ac\.in$/
    if (!regex.test(email) && email) {
      setEmailError("Please use your Brainware University email (@brainwareuniversity.ac.in)")
      return false
    }
    setEmailError("")
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (validateEmail(email)) {
      setIsLoading(true)

      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // In a real app, you would make an API call here
        // const response = await fetch('/api/auth/login', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ email, password }),
        // })

        // if (!response.ok) throw new Error('Login failed')

        router.push("/dashboard")
      } catch (error) {
        console.error("Login error:", error)
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <div className="min-h-[calc(100vh-73px)] w-full flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <div className="backdrop-blur-lg bg-black/30 border border-white/10 rounded-2xl shadow-[0_0_15px_rgba(149,128,255,0.2)] p-6 md:p-8">
          <div className="mb-8 text-center">
            <motion.h1
              className="text-3xl font-bold text-white mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Welcome Back
            </motion.h1>
            <motion.p
              className="text-gray-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Sign in to access Brainware University events
            </motion.p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="relative">
                <Label htmlFor="email" className="text-sm text-gray-300 mb-1 block">
                  University Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      if (e.target.value) validateEmail(e.target.value)
                    }}
                    onBlur={() => validateEmail(email)}
                    placeholder="your.name@brainwareuniversity.ac.in"
                    className="pl-10 bg-black/20 border-gray-700 focus:border-purple-500 text-white placeholder:text-gray-500 shadow-[0_0_10px_rgba(149,128,255,0.1)] transition-all focus:shadow-[0_0_15px_rgba(149,128,255,0.3)]"
                  />
                </div>
                {emailError && <p className="text-red-400 text-xs mt-1">{emailError}</p>}
              </div>
            </motion.div>

            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="relative">
                <Label htmlFor="password" className="text-sm text-gray-300 mb-1 block">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="pl-10 bg-black/20 border-gray-700 focus:border-purple-500 text-white placeholder:text-gray-500 shadow-[0_0_10px_rgba(149,128,255,0.1)] transition-all focus:shadow-[0_0_15px_rgba(149,128,255,0.3)]"
                  />
                </div>
              </div>
              <div className="text-right">
                <Link
                  href="/forgot-password"
                  className="text-xs text-purple-400 hover:text-purple-300 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
              <Button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 rounded-md transition-all duration-300 hover:shadow-[0_0_15px_rgba(149,128,255,0.5)] flex items-center justify-center gap-2 group"
                disabled={!email || !password || !!emailError || isLoading}
              >
                {isLoading ? "Signing In..." : "Sign In"}
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
            transition={{ delay: 0.7 }}
          >
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-purple-400 hover:text-purple-300 transition-colors">
              Register here
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
