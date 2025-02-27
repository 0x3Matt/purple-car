"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { 
  Car, 
  Mail, 
  Phone, 
  Github, 
  Linkedin, 
  Twitter, 
  ArrowRight,
  CheckCircle2
} from "lucide-react";
import { toast } from "sonner";

export default function Home() {
  const [contactOpen, setContactOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      toast.error("Please enter a valid email address");
      return;
    }
    
    // In a real app, you would send this to your backend
    setSubscribed(true);
    toast.success("Thanks for subscribing!");
    setEmail("");
    
    // Reset the subscribed state after 3 seconds
    setTimeout(() => setSubscribed(false), 3000);
  };

  if (!mounted) {
    return null; // Prevent hydration issues
  }

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 opacity-90" />
      
      {/* Animated car shapes in background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute text-white/10"
            style={{
              left: `-100px`,
              top: `${Math.random() * 100}vh`,
              transform: `scale(${0.5 + Math.random() * 2}) rotate(${Math.random() * 360}deg)`,
              animation: `float-${i} ${15 + Math.random() * 20}s linear infinite`,
              animationDelay: `${i * 2}s`
            }}
          >
            <Car size={50 + Math.random() * 50} />
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes float-0 { to { transform: translateX(calc(100vw + 200px)) rotate(${Math.random() * 360}deg); } }
        @keyframes float-1 { to { transform: translateX(calc(100vw + 200px)) rotate(${Math.random() * 360}deg); } }
        @keyframes float-2 { to { transform: translateX(calc(100vw + 200px)) rotate(${Math.random() * 360}deg); } }
        @keyframes float-3 { to { transform: translateX(calc(100vw + 200px)) rotate(${Math.random() * 360}deg); } }
        @keyframes float-4 { to { transform: translateX(calc(100vw + 200px)) rotate(${Math.random() * 360}deg); } }
        @keyframes float-5 { to { transform: translateX(calc(100vw + 200px)) rotate(${Math.random() * 360}deg); } }
      `}</style>

      {/* Content container */}
      <div 
        className="relative z-10 max-w-3xl w-full mx-auto px-6 text-center opacity-0 animate-fadeIn"
        style={{ animation: 'fadeIn 0.8s forwards' }}
      >
        {/* Logo */}
        <div 
          className="mb-8 inline-flex items-center justify-center p-3 bg-white/10 backdrop-blur-sm rounded-full transition-transform duration-300 hover:scale-105"
        >
          <Car className="h-10 w-10 text-white" />
        </div>
        
        {/* Headline */}
        <h1 
          className="text-4xl md:text-6xl font-bold text-white mb-6 opacity-0 animate-fadeIn"
          style={{ animation: 'fadeIn 0.8s 0.2s forwards' }}
        >
          The Future of Car Shopping is <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Coming Soon</span>
        </h1>
        
        {/* Description */}
        <p 
          className="text-xl text-white/90 mb-10 opacity-0 animate-fadeIn"
          style={{ animation: 'fadeIn 0.8s 0.4s forwards' }}
        >
          Our AI-powered marketplace is revolutionizing how cars are bought and sold. 
          Get personalized recommendations, instant valuations, and seamless transactions.
        </p>
        
        {/* Subscription form */}
        <form 
          onSubmit={handleSubscribe}
          className="flex flex-col sm:flex-row gap-3 mb-12 max-w-md mx-auto opacity-0 animate-fadeIn"
          style={{ animation: 'fadeIn 0.8s 0.6s forwards' }}
        >
          <div className="relative flex-grow">
            <Input
              type="email"
              placeholder="Enter your email"
              className="bg-white/10 border-white/20 text-white placeholder:text-white/60 h-12 pr-10"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {subscribed && (
              <div 
                className="absolute right-3 top-1/2 -translate-y-1/2 text-green-400 animate-scaleIn"
                style={{ animation: 'scaleIn 0.3s forwards' }}
              >
                <CheckCircle2 size={20} />
              </div>
            )}
          </div>
          <Button 
            type="submit" 
            className="h-12 px-6 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-medium"
          >
            Notify Me
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </form>
        
        {/* Social links */}
        <div 
          className="flex justify-center space-x-6 mb-10 opacity-0 animate-fadeIn"
          style={{ animation: 'fadeIn 0.8s 0.8s forwards' }}
        >
          {[
            { icon: Twitter, label: "Twitter", href: "https://twitter.com" },
            { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com" },
            { icon: Github, label: "GitHub", href: "https://github.com" }
          ].map((social, index) => (
            <a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white/10 rounded-full text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
              aria-label={social.label}
            >
              <social.icon className="h-5 w-5" />
            </a>
          ))}
        </div>
        
        {/* Contact button */}
        <div
          className="opacity-0 animate-fadeIn"
          style={{ animation: 'fadeIn 0.8s 1s forwards' }}
        >
          <Button 
            variant="outline" 
            onClick={() => setContactOpen(true)}
            className="bg-purple-500 border-purple-400 text-white hover:bg-purple-600 hover:border-purple-500"
          >
            Contact Us
          </Button>
        </div>
      </div>
      
      {/* Footer */}
      <div 
        className="absolute bottom-4 text-white/60 text-sm opacity-0 animate-fadeIn"
        style={{ animation: 'fadeIn 0.8s 1.2s forwards' }}
      >
        © {new Date().getFullYear()} Purple Car. All rights reserved.
      </div>
      
      {/* Contact dialog */}
      <Dialog open={contactOpen} onOpenChange={setContactOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Get in touch with Purple Car</DialogTitle>
            <DialogDescription>
              Have questions? We're here to help.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-full text-blue-600">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium">Email</p>
                <p className="text-sm text-muted-foreground">contact@purplecar.com</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-full text-green-600">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium">Phone</p>
                <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-full text-purple-600">
                <Car className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium">Office</p>
                <p className="text-sm text-muted-foreground">123 Innovation Drive, San Francisco, CA</p>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <Button onClick={() => setContactOpen(false)}>Close</Button>
          </div>
        </DialogContent>
      </Dialog>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes scaleIn {
          from { transform: translate(-50%, -50%) scale(0); }
          to { transform: translate(-50%, -50%) scale(1); }
        }
      `}</style>
    </main>
  );
}