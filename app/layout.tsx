import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Purple Car | Premium Car Marketplace in London',
  description: 'Find and sell premium cars in London. Verified sellers, quality vehicles, and secure transactions.',
  keywords: ['cars', 'premium cars', 'car marketplace', 'London cars', 'buy cars', 'sell cars'],
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
      { url: '/favicon.ico' },
      { url: '/icon.png', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png', type: 'image/png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
      },
    ],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://purplecar.co.uk',
    title: 'Purple Car | Premium Car Marketplace in London',
    description: 'Find and sell premium cars in London. Verified sellers, quality vehicles, and secure transactions.',
    siteName: 'Purple Car',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Purple Car | Premium Car Marketplace in London',
    description: 'Find and sell premium cars in London. Verified sellers, quality vehicles, and secure transactions.',
    creator: '@purplecar',
    images: ['/og-image.png'],
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}