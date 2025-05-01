"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Bell, ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { usePathname } from "next/navigation"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const isLoggedIn = pathname !== "/" && pathname !== "/login" && pathname !== "/register"

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Events", path: "/events" },
    { name: "Clubs", path: "/clubs" },
    {
      name: "Academics",
      path: "#",
      dropdown: [
        { name: "Departments", path: "/departments" },
        { name: "Courses", path: "/courses" },
        { name: "Faculty", path: "/faculty" },
      ],
    },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ]

  return (
    <header
      className={`sticky top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "glassmorphism shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="h-10 w-10 rounded-full bg-gradient-primary flex items-center justify-center transition-transform group-hover:scale-110 duration-300">
              <span className="font-bold text-white text-lg">BU</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl text-white hidden md:block">Brainware University</span>
              <span className="text-xs text-gray-400 hidden md:block">Campus Events Hub</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) =>
              link.dropdown ? (
                <DropdownMenu key={link.name}>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-1 text-sm text-white hover:text-purple-400 transition-colors">
                      {link.name}
                      <ChevronDown className="h-4 w-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="glassmorphism border-white/10">
                    <DropdownMenuLabel className="text-white">{link.name}</DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-white/10" />
                    {link.dropdown.map((item) => (
                      <DropdownMenuItem key={item.name} asChild>
                        <Link href={item.path} className="text-white hover:text-purple-400 cursor-pointer">
                          {item.name}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  key={link.name}
                  href={link.path}
                  className={`text-sm relative group ${
                    pathname === link.path ? "text-purple-400" : "text-white hover:text-purple-400"
                  } transition-colors`}
                >
                  {link.name}
                  <span
                    className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-400 transition-all duration-300 group-hover:w-full ${
                      pathname === link.path ? "w-full" : ""
                    }`}
                  ></span>
                </Link>
              ),
            )}
          </nav>

          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative text-gray-300 hover:text-white">
                      <Bell className="h-5 w-5" />
                      <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center bg-red-500 text-[10px]">
                        3
                      </Badge>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="glassmorphism border-white/10 w-72">
                    <DropdownMenuLabel className="text-white">Notifications</DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-white/10" />
                    {[
                      "New event: Tech Fest 2023 has been announced",
                      "Your registration for Cultural Night is confirmed",
                      "Reminder: Career Fair tomorrow at 10 AM",
                    ].map((notification, i) => (
                      <DropdownMenuItem key={i} className="py-2 cursor-pointer">
                        <div>
                          <p className="text-white text-sm">{notification}</p>
                          <p className="text-gray-400 text-xs mt-1">Just now</p>
                        </div>
                      </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator className="bg-white/10" />
                    <DropdownMenuItem className="text-center text-purple-400 cursor-pointer">
                      View all notifications
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="p-0 h-auto hover:bg-transparent">
                      <Avatar className="h-9 w-9 border-2 border-purple-500">
                        <AvatarImage src="/placeholder.svg?height=36&width=36&text=RS" />
                        <AvatarFallback>RS</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="glassmorphism border-white/10">
                    <DropdownMenuLabel className="text-white">My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-white/10" />
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="text-white hover:text-purple-400 cursor-pointer">
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard" className="text-white hover:text-purple-400 cursor-pointer">
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/settings" className="text-white hover:text-purple-400 cursor-pointer">
                        Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-white/10" />
                    <DropdownMenuItem asChild>
                      <Link href="/login" className="text-red-400 hover:text-red-300 cursor-pointer">
                        Logout
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Button asChild variant="ghost" className="text-white hover:text-purple-400 hover:bg-white/10">
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild className="bg-gradient-primary hover:bg-gradient-primary-hover text-white">
                  <Link href="/register">Register</Link>
                </Button>
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden glassmorphism border-b border-white/10"
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col gap-4">
                {navLinks.map((link) =>
                  link.dropdown ? (
                    <div key={link.name} className="flex flex-col gap-2">
                      <div className="text-white font-medium">{link.name}</div>
                      <div className="pl-4 flex flex-col gap-2 border-l border-white/10">
                        {link.dropdown.map((item) => (
                          <Link
                            key={item.name}
                            href={item.path}
                            className="text-gray-300 hover:text-purple-400 transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      key={link.name}
                      href={link.path}
                      className={`text-white hover:text-purple-400 transition-colors ${
                        pathname === link.path ? "text-purple-400" : ""
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  ),
                )}
                {!isLoggedIn && (
                  <div className="flex flex-col gap-2 pt-4 border-t border-white/10">
                    <Button
                      asChild
                      variant="ghost"
                      className="justify-center text-white hover:text-purple-400 hover:bg-white/10"
                    >
                      <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                        Login
                      </Link>
                    </Button>
                    <Button
                      asChild
                      className="justify-center bg-gradient-primary hover:bg-gradient-primary-hover text-white"
                    >
                      <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                        Register
                      </Link>
                    </Button>
                  </div>
                )}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
