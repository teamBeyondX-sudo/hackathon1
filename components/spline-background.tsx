"use client"

import { Suspense } from "react"
import dynamic from "next/dynamic"
import { Loader2 } from "lucide-react"

// Dynamically import Spline to avoid SSR issues
const Spline = dynamic(() => import("@splinetool/react-spline/next"), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 flex items-center justify-center bg-black">
      <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
    </div>
  ),
})

export function SplineBackground() {
  return (
    <div className="fixed inset-0 w-full h-full z-0" aria-hidden="true">
      <Suspense
        fallback={
          <div className="fixed inset-0 flex items-center justify-center bg-black">
            <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
          </div>
        }
      >
        <Spline scene="https://prod.spline.design/lAna6UWWKmCZkT-L/scene.splinecode" className="w-full h-full" />
      </Suspense>
    </div>
  )
}
