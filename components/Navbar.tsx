import Link from 'next/link'
import { Button } from './ui/button'

export function Navbar() {
  return (
    <nav className="fixed w-full z-50 bg-black/20 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-white">
            Purple Car
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/search" className="text-white/90 hover:text-white transition-colors">
              Search Cars
            </Link>
            <Link href="/sell" className="text-white/90 hover:text-white transition-colors">
              Sell Your Car
            </Link>
            <Link href="/about" className="text-white/90 hover:text-white transition-colors">
              About Us
            </Link>
            <Link href="/contact" className="text-white/90 hover:text-white transition-colors">
              Contact
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="text-white hover:text-white/90">
              Sign In
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700 text-white">
              Register
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
} 