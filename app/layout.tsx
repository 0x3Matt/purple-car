import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://purplecar.co.uk'),
  title: 'Purple Car | Skip the Hassle of Buying & Selling Cars',
  description: 'Join our waitlist to be the first to experience the future of automotive excellence. Purple Car makes buying and selling cars hassle-free.',
  keywords: ['car marketplace', 'buy car', 'sell car', 'automotive', 'used cars', 'new cars', 'car dealership'],
  authors: [{ name: 'Purple Car' }],
  creator: 'Purple Car',
  publisher: 'Purple Car',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/apple-touch-icon-precomposed.png',
    },
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://purplecar.co.uk',
    siteName: 'Purple Car',
    title: 'Purple Car | Skip the Hassle of Buying & Selling Cars',
    description: 'Join our waitlist to be the first to experience the future of automotive excellence. Purple Car makes buying and selling cars hassle-free.',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Purple Car - The Future of Car Buying and Selling',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Purple Car | Skip the Hassle of Buying & Selling Cars',
    description: 'Join our waitlist to be the first to experience the future of automotive excellence. Purple Car makes buying and selling cars hassle-free.',
    images: ['/images/og-image.png'],
    creator: '@purplecar',
    site: '@purplecar',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}