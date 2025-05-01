"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CreditCard, Calendar, Lock, X } from "lucide-react"

interface PaymentModalProps {
  eventTitle: string
  price: string
  onSuccess?: () => void
}

export function PaymentModal({ eventTitle, price, onSuccess }: PaymentModalProps) {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate payment processing
    setTimeout(() => {
      setLoading(false)
      setStep(2)
    }, 1500)
  }

  const handleClose = () => {
    setOpen(false)
    setTimeout(() => {
      setStep(1)
    }, 300)
  }

  const handleSuccess = () => {
    handleClose()
    if (onSuccess) onSuccess()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-[0_0_15px_rgba(149,128,255,0.2)] hover:shadow-[0_0_20px_rgba(149,128,255,0.4)]">
          Register Now
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-teal-700/40 to-blue-900/40 backdrop-blur-md border-white/10 shadow-[0_0_30px_rgba(149,128,255,0.2)]">
        <DialogHeader className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 text-gray-400 hover:text-white hover:bg-white/10"
            onClick={handleClose}
          >
            <X className="h-4 w-4" />
          </Button>
          <DialogTitle className="text-white text-xl">Payment for Event</DialogTitle>
          <DialogDescription className="text-gray-300">
            {eventTitle} - {price}
          </DialogDescription>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div
              key="payment-form"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="card-number" className="text-white">
                    Card Number
                  </Label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="card-number"
                      placeholder="4242 4242 4242 4242"
                      className="pl-10 bg-black/20 border-gray-700 focus:border-teal-500 text-white placeholder:text-gray-500 shadow-[0_0_10px_rgba(149,128,255,0.1)] transition-all focus:shadow-[0_0_15px_rgba(149,128,255,0.3)]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry" className="text-white">
                      Expiry Date
                    </Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="expiry"
                        placeholder="MM/YY"
                        className="pl-10 bg-black/20 border-gray-700 focus:border-teal-500 text-white placeholder:text-gray-500 shadow-[0_0_10px_rgba(149,128,255,0.1)] transition-all focus:shadow-[0_0_15px_rgba(149,128,255,0.3)]"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cvc" className="text-white">
                      CVC
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="cvc"
                        placeholder="123"
                        className="pl-10 bg-black/20 border-gray-700 focus:border-teal-500 text-white placeholder:text-gray-500 shadow-[0_0_10px_rgba(149,128,255,0.1)] transition-all focus:shadow-[0_0_15px_rgba(149,128,255,0.3)]"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white">
                    Name on Card
                  </Label>
                  <Input
                    id="name"
                    placeholder="John Smith"
                    className="bg-black/20 border-gray-700 focus:border-teal-500 text-white placeholder:text-gray-500 shadow-[0_0_10px_rgba(149,128,255,0.1)] transition-all focus:shadow-[0_0_15px_rgba(149,128,255,0.3)]"
                  />
                </div>

                <div className="pt-4">
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white"
                    disabled={loading}
                  >
                    {loading ? "Processing..." : `Pay ${price}`}
                  </Button>
                </div>

                <p className="text-xs text-gray-400 text-center">
                  Your payment is secured with SSL encryption. We do not store your card details.
                </p>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="payment-success"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="py-6 text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Payment Successful!</h3>
              <p className="text-gray-300 mb-6">
                Your registration for {eventTitle} is confirmed. A confirmation email has been sent to your inbox.
              </p>
              <Button
                className="bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white"
                onClick={handleSuccess}
              >
                View Event Details
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  )
}
