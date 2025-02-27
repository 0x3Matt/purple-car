"use client";

import { useState } from 'react'
import { FaTwitter, FaGithub, FaLinkedinIn, FaFacebook, FaInstagram, FaCar } from 'react-icons/fa'

export default function Home() {
  const [showModal, setShowModal] = useState(false)
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle email submission here
    console.log('Email submitted:', email)
    setEmail('')
  }

  return (
    <main className="hero-background">
      {/* Floating Icons */}
      <div className="floating-icon" style={{ top: '10%', left: '10%' }}>
        <FaTwitter size={30} color="white" />
      </div>
      <div className="floating-icon" style={{ top: '20%', right: '15%' }}>
        <FaGithub size={30} color="white" />
      </div>
      <div className="floating-icon" style={{ bottom: '15%', left: '20%' }}>
        <FaLinkedinIn size={30} color="white" />
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
          />
          <button type="submit" className="waitlist-button">
            Notify Me
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
                <strong>Email:</strong> contact@purplecar.co.uk
              </p>
              <p>
                <strong>Phone:</strong> +44 7362 300523
              </p>
              <p>
                <strong>Address:</strong><br />
                123 Innovation Drive<br />
                Tech Valley, CA 94025
              </p>
              <div className="flex space-x-4 mt-6">
                <a href="#" className="hover:text-purple-400"><FaTwitter size={24} /></a>
                <a href="#" className="hover:text-purple-400"><FaLinkedinIn size={24} /></a>
                <a href="#" className="hover:text-purple-400"><FaGithub size={24} /></a>
              </div>
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