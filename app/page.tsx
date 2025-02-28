"use client";

import { useState } from 'react'
import { FaTwitter, FaGithub, FaLinkedinIn, FaFacebook, FaInstagram, FaCar } from 'react-icons/fa'
import { toast } from 'sonner'

export default function Home() {
  const [showModal, setShowModal] = useState(false)
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (isSubmitting) return
    
    try {
      setIsSubmitting(true)
      
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email: email.trim()
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to join waitlist')
      }

      toast.success('Successfully joined the waitlist!')
      setEmail('')
    } catch (error) {
      console.error('Error:', error)
      toast.error(error instanceof Error ? error.message : 'Failed to join waitlist')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="hero-background">
      {/* Floating Cars */}
      <div className="floating-icon" style={{ top: '15%', left: '10%', animationDelay: '0s' }}>
        <FaCar size={35} color="white" />
      </div>
      <div className="floating-icon" style={{ top: '25%', right: '15%', animationDelay: '2s' }}>
        <FaCar size={28} color="white" />
      </div>
      <div className="floating-icon" style={{ bottom: '20%', left: '20%', animationDelay: '4s' }}>
        <FaCar size={42} color="white" />
      </div>
      <div className="floating-icon" style={{ bottom: '35%', right: '10%', animationDelay: '6s' }}>
        <FaCar size={32} color="white" />
      </div>
      <div className="floating-icon" style={{ top: '45%', left: '15%', animationDelay: '3s' }}>
        <FaCar size={25} color="white" />
      </div>
      <div className="floating-icon" style={{ top: '60%', right: '20%', animationDelay: '5s' }}>
        <FaCar size={38} color="white" />
      </div>
      <div className="floating-icon" style={{ bottom: '50%', left: '5%', animationDelay: '7s' }}>
        <FaCar size={30} color="white" />
      </div>
      <div className="floating-icon" style={{ top: '10%', right: '25%', animationDelay: '1s' }}>
        <FaCar size={28} color="white" />
      </div>

      {/* Main Content */}
      <div className="text-center text-white relative z-10 space-y-8">
        <div className="logo-container justify-center">
          <FaCar className="logo" />
          <h1 className="text-4xl font-bold">Purple Car</h1>
        </div>
        
        <h2 className="text-5xl font-semibold mb-4">
          Buying or Selling a car?
          <br />
          <span className="text-4xl">Skip the Hassle</span>
        </h2>
        
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Join our waitlist to be the first to experience the future of automotive excellence
        </p>

        {/* Waitlist Form */}
        <form onSubmit={handleSubmit} className="waitlist-form">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="waitlist-input"
            required
            disabled={isSubmitting}
          />
          <button 
            type="submit" 
            className="waitlist-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Notify Me'}
          </button>
        </form>

        {/* Social Icons */}
        <div className="social-icons">
          <a href="#" className="social-icon">
            <FaFacebook size={28} />
          </a>
          <a href="#" className="social-icon">
            <FaInstagram size={28} />
          </a>
          <a href="#" className="social-icon">
            <FaTwitter size={28} />
          </a>
        </div>

        {/* Contact Button */}
        <button
          onClick={() => setShowModal(true)}
          className="mt-8 px-8 py-3 bg-white/10 backdrop-blur rounded-lg hover:bg-white/20 transition-colors"
        >
          Contact Us
        </button>
      </div>

      {/* Contact Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <div className="space-y-4">
              <p>
                <strong>Email:</strong>{' '}
                <a href="mailto:contact@purplecar.co.uk" className="hover:text-purple-400">
                  contact@purplecar.co.uk
                </a>
              </p>
              <p>
                <strong>Phone:</strong>{' '}
                <a href="tel:+447362300523" className="hover:text-purple-400">
                  +44 7362 300523
                </a>
              </p>
              <p>
                <strong>Address:</strong><br />
                123 Innovation Drive<br />
                Tech Valley, CA 94025
              </p>
            </div>
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-white/60 hover:text-white"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="footer-text">
        © 2025 Purple Car. All rights reserved.
      </div>
    </main>
  )
}