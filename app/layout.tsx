import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ['latin'] });

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#4c1d95'
}

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
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' }
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
        color: '#4c1d95'
      }
    ]
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
        <Analytics />
      </body>
    </html>
  );
}