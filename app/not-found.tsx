import Link from 'next/link'
import { FaCar } from 'react-icons/fa'

export default function NotFound() {
  return (
    <main className="hero-background min-h-screen flex flex-col items-center justify-center p-24">
      <div className="text-center text-white space-y-8">
        <div className="logo-container justify-center">
          <FaCar className="logo" />
          <h1 className="text-4xl font-bold">Purple Car</h1>
        </div>
        
        <h2 className="text-6xl font-bold mb-4">404</h2>
        <h3 className="text-2xl mb-8">Page Not Found</h3>
        
        <p className="text-xl mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <Link 
          href="/"
          className="inline-block px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          Return Home
        </Link>
      </div>
    </main>
  )
} 