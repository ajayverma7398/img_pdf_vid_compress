import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'File Compressor - Compress PDF, Images & Videos',
  description: 'Compress PDF files, images, and videos up to 100MB with optimal quality. Mobile-friendly compression tool for all devices.',
  keywords: 'PDF compression, image compression, video compression, mobile, tablet, responsive',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#ef4444',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
        <meta name="theme-color" content="#ef4444" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="File Compressor" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
      </head>
      <body className="min-h-screen bg-gray-50 antialiased">
        {children}
      </body>
    </html>
  )
}

