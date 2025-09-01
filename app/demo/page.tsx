'use client'

import Link from 'next/link'
import { FileText, Image, Video, Zap, Download, Shield, Globe } from 'lucide-react'

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
                <span className="text-2xl font-bold text-gray-900">←</span>
                <span className="text-lg text-gray-600">Back to App</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            File Compression Demo
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the power of our file compression tool. See how it can reduce your file sizes while maintaining quality.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FileText className="w-8 h-8 text-red-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">PDF Compression</h3>
            <p className="text-gray-600 mb-4">
              Compress PDF files by removing unnecessary metadata and optimizing object streams.
            </p>
            <div className="text-sm text-gray-500">
              <p>• Reduce size by 20-60%</p>
              <p>• Maintain document quality</p>
              <p>• Fast processing</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Image className="w-8 h-8 text-blue-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Image Optimization</h3>
            <p className="text-gray-600 mb-4">
              Optimize images with intelligent compression algorithms and quality settings.
            </p>
            <div className="text-sm text-gray-500">
              <p>• Reduce size by 40-80%</p>
              <p>• Configurable quality</p>
              <p>• Multiple formats</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Video className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Video Processing</h3>
            <p className="text-gray-600 mb-4">
              Basic video file processing with future enhancements planned.
            </p>
            <div className="text-sm text-gray-500">
              <p>• Multiple formats</p>
              <p>• Size optimization</p>
              <p>• Coming soon</p>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-red-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Select Files</h4>
              <p className="text-sm text-gray-600">Choose PDF, image, or video files up to 10MB</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-red-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Process</h4>
              <p className="text-sm text-gray-600">Our algorithms compress your files automatically</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-red-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Download</h4>
              <p className="text-sm text-gray-600">Get your compressed files ready to use</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-red-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                4
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Share</h4>
              <p className="text-sm text-gray-600">Share smaller files via email or cloud storage</p>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Choose Our Tool?</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <Zap className="w-5 h-5 text-red-500" />
                <span className="text-gray-700">Lightning-fast processing</span>
              </li>
              <li className="flex items-center space-x-3">
                <Shield className="w-5 h-5 text-red-500" />
                <span className="text-gray-700">100% secure - files never leave your browser</span>
              </li>
              <li className="flex items-center space-x-3">
                <Globe className="w-5 h-5 text-red-500" />
                <span className="text-gray-700">Works on any device, anywhere</span>
              </li>
              <li className="flex items-center space-x-3">
                <Download className="w-5 h-5 text-red-500" />
                <span className="text-gray-700">No registration required</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Perfect For</h3>
            <ul className="space-y-3">
              <li className="text-gray-700">• Students sharing research papers</li>
              <li className="text-gray-700">• Professionals sending presentations</li>
              <li className="text-gray-700">• Photographers optimizing portfolios</li>
              <li className="text-gray-700">• Content creators managing media files</li>
              <li className="text-gray-700">• Anyone needing smaller file sizes</li>
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/"
            className="inline-block bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors duration-200"
          >
            Try It Now - It's Free!
          </Link>
          <p className="text-gray-600 mt-4">No registration, no limits, just fast file compression</p>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>© File Compressor 2025 ® - Your File Compression Tool</p>
          </div>
        </div>
      </footer>
    </div>
  )
}




