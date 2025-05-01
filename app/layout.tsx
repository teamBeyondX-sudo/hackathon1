import type React from "react"
import type { Metadata } from "next"
import { Outfit } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SplineBackground } from "@/components/spline-background"
import { Header } from "@/components/header"
import { Analytics } from "@/components/analytics"
import { Suspense } from "react"

// Use Outfit as our primary font - it's modern, readable, and casual
const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Brainware University - Campus Events Hub",
  description: "Discover and join exciting events, clubs, and activities at Brainware University",
  keywords: ["Brainware University", "campus events", "student activities", "college clubs", "university events"],
  authors: [{ name: "Brainware University Students" }],
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#6d28d9",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={outfit.variable}>
      <body className="font-outfit">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <div className="relative min-h-screen overflow-hidden">
            <SplineBackground />
            <div className="relative z-10 flex flex-col min-h-screen">
              <Suspense fallback={null}>
                <Header />
              </Suspense>
              <main className="flex-1">{children}</main>
              <Suspense fallback={null}>
                <Analytics />
              </Suspense>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
