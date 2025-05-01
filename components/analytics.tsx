"use client"

import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

export function Analytics() {
  const pathname = usePathname()
  const [searchParams, setSearchParams] = useState("")

  useEffect(() => {
    // Get search params from window.location instead of using useSearchParams hook
    const queryString = window.location.search
    setSearchParams(queryString)

    // This would be replaced with your actual analytics code
    const url = pathname + (queryString ? queryString : "")

    // Example analytics tracking
    console.log(`Page view: ${url}`)

    // In a real app, you would use something like:
    // if (window.gtag) {
    //   window.gtag('config', 'GA-MEASUREMENT-ID', {
    //     page_path: url,
    //   })
    // }
  }, [pathname])

  return null
}
