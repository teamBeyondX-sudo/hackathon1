import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Footer() {
  return (
    <footer className="glassmorphism border-t border-white/10 mt-12">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-full bg-gradient-primary flex items-center justify-center">
                <span className="font-bold text-white text-lg">BU</span>
              </div>
              <span className="font-bold text-xl text-white">Brainware</span>
            </Link>
            <p className="text-gray-400 text-sm">
              Brainware University is committed to providing quality education and fostering a vibrant campus life for
              students.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-white font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/events" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/clubs" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Clubs
                </Link>
              </li>
              <li>
                <Link href="/departments" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Departments
                </Link>
              </li>
              <li>
                <Link href="/faculty" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Faculty
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-purple-400 transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-medium mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-400">398, Ramkrishnapur Road, Barasat, Kolkata, West Bengal 700125</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-purple-400 flex-shrink-0" />
                <span className="text-gray-400">+91 1234567890</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-purple-400 flex-shrink-0" />
                <span className="text-gray-400">info@brainwareuniversity.ac.in</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-medium mb-4">Newsletter</h3>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe to our newsletter to get updates on events and activities.
            </p>
            <div className="flex gap-2">
              <Input type="email" placeholder="Your email" className="bg-black/20 border-white/10 text-white" />
              <Button className="bg-gradient-primary hover:bg-gradient-primary-hover text-white">Subscribe</Button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Brainware University. All rights reserved.
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link href="/privacy" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">
              Terms of Service
            </Link>
            <Link href="/sitemap" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
