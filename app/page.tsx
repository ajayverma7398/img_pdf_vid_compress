'use client'

import { useState, useCallback } from 'react'
import { FileText, Image, Video, Heart, Cloud, Download, Merge, Scissors, Trash2, Scan } from 'lucide-react'
import Link from 'next/link'
import FileList from '@/components/FileList'
import CompressionProgress from '@/components/CompressionProgress'
import PDFCompressionOptions, { PDFCompressionOptions as PDFOptions } from '@/components/PDFCompressionOptions'
import { compressFile, CompressionResult } from '@/utils/compression'

export default function Home() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [isCompressing, setIsCompressing] = useState(false)
  const [compressionProgress, setCompressionProgress] = useState(0)
  const [compressionResults, setCompressionResults] = useState<CompressionResult[]>([])
  const [testResult, setTestResult] = useState<string>('')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [pdfCompressionOptions, setPdfCompressionOptions] = useState<PDFOptions>({
    quality: 'screen', // Default to screen for maximum compression (50%)
    removeMetadata: true,
    optimizeImages: true
  })
  

  const handleFileSelect = useCallback((files: File[]) => {
    // Filter out files larger than 10MB
    const validFiles = files.filter(file => file.size <= 10 * 1024 * 1024)
    const oversizedFiles = files.filter(file => file.size > 10 * 1024 * 1024)
    
    if (oversizedFiles.length > 0) {
      alert(`Some files are too large. Maximum file size is 10MB.`)
    }
    
    setSelectedFiles(prev => [...prev, ...validFiles])
  }, [])

  const handleRemoveFile = useCallback((index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index))
  }, [])

  const handleCompression = useCallback(async () => {
    if (selectedFiles.length === 0) return
    
    setIsCompressing(true)
    setCompressionProgress(0)
    setCompressionResults([])
    
    const results: CompressionResult[] = []
    
    for (let i = 0; i < selectedFiles.length; i++) {
      try {
        const file = selectedFiles[i]
        let result: CompressionResult
        
        // Use PDF compression options for PDF files
        if (file.type === 'application/pdf') {
          const { compressPDFEnhanced } = await import('@/utils/enhanced-pdf-compression')
          result = await compressPDFEnhanced(file, pdfCompressionOptions)
        } else {
          result = await compressFile(file)
        }
        
        results.push(result)
        
        // Update progress
        const progress = ((i + 1) / selectedFiles.length) * 100
        setCompressionProgress(progress)
        
        // Small delay to show progress
        await new Promise(resolve => setTimeout(resolve, 500))
      } catch (error) {
        console.error(`Failed to compress ${selectedFiles[i].name}:`, error)
        // Continue with other files
      }
    }
    
    setCompressionResults(results)
    setIsCompressing(false)
    setCompressionProgress(100)
  }, [selectedFiles, pdfCompressionOptions])

  const downloadCompressedFile = useCallback((result: CompressionResult) => {
    const url = URL.createObjectURL(result.compressedBlob)
    const a = document.createElement('a')
    a.href = url
    a.download = result.fileName
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }, [])

  const downloadAllFiles = useCallback(() => {
    compressionResults.forEach(downloadCompressedFile)
  }, [compressionResults, downloadCompressedFile])

  const testPDFCompression = useCallback(async () => {
    setTestResult('Testing PDF compression...')
    try {
      const { testPDFCompression } = await import('@/utils/test-compression')
      const result = await testPDFCompression()
      setTestResult(`Test successful! Compression ratio: ${result.compressionRatio.toFixed(2)}%`)
    } catch (error) {
      setTestResult(`Test failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <div className="flex items-center min-w-0 flex-1">
              <div className="flex items-center space-x-1 sm:space-x-2">
                <span className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 truncate">
                  Compress Your Files
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-6 xl:space-x-8">
              <a href="#" className="text-red-500 px-2 xl:px-3 py-2 text-xs xl:text-sm font-medium border-b-2 border-red-500 whitespace-nowrap">
                COMPRESS FILES
              </a>
              <Link href="/PDF/organize-pdf" className="text-gray-600 hover:text-gray-900 px-2 xl:px-3 py-2 text-xs xl:text-sm font-medium whitespace-nowrap">
                Organize PDF
              </Link>
              <Link href="/PDF/new_pdf_features" className="text-gray-600 hover:text-gray-900 px-2 xl:px-3 py-2 text-xs xl:text-sm font-medium whitespace-nowrap">
                PDF Tools
              </Link>
              <Link href="/demo" className="text-gray-600 hover:text-gray-900 px-2 xl:px-3 py-2 text-xs xl:text-sm font-medium whitespace-nowrap">
                DEMO
              </Link>
            </nav>
            
            {/* Desktop Auth Buttons */}
            <div className="hidden sm:flex items-center space-x-2 lg:space-x-4">
              <button className="text-gray-700 hover:text-gray-900 px-2 lg:px-4 py-2 text-xs lg:text-sm font-medium">
                Login
              </button>
              <button className="bg-red-500 hover:bg-red-600 text-white px-3 lg:px-4 py-2 rounded text-xs lg:text-sm font-medium">
                Sign up
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex sm:hidden">
              <button 
                className="text-gray-700 hover:text-gray-900 p-2"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a href="#" className="text-red-500 block px-3 py-2 text-base font-medium border-l-4 border-red-500">
              COMPRESS FILES
            </a>
            <Link 
              href="/PDF/organize-pdf" 
              className="text-gray-600 hover:text-gray-900 block px-3 py-2 text-base font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Organize PDF
            </Link>
            <Link 
              href="/PDF/new_pdf_features" 
              className="text-gray-600 hover:text-gray-900 block px-3 py-2 text-base font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              PDF Tools
            </Link>
            <Link 
              href="/demo" 
              className="text-gray-600 hover:text-gray-900 block px-3 py-2 text-base font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              DEMO
            </Link>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
            Compress PDF, Images & Videos
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Reduce file size while optimizing for maximal quality. Support for PDF, images, and videos up to 10MB.
          </p>
        </div>

        {/* Test PDF Compression Button */}
        <div className="text-center mb-6">
          <button
            onClick={testPDFCompression}
            className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
          >
            Test PDF Compression (50% Target)
          </button>
          {testResult && (
            <div className="mt-2 text-sm text-gray-600">
              {testResult}
            </div>
          )}
        </div>
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* PDF Upload */}
            <div className="text-center">
              <button
                onClick={() => document.getElementById('pdf-upload')?.click()}
                className="w-full bg-pink-500 hover:bg-pink-600 active:bg-pink-700 text-white font-semibold py-6 sm:py-8 lg:py-6 px-4 sm:px-6 rounded-lg transition-all duration-200 flex flex-col items-center space-y-2 sm:space-y-3 touch-manipulation min-h-[120px] sm:min-h-[140px]"
              >
                <FileText className="w-8 h-8 sm:w-10 sm:h-10 lg:w-8 lg:h-8" />
                <span className="text-sm sm:text-base lg:text-sm">Select PDF files</span>
                <span className="text-xs opacity-75">Up to 10MB</span>
              </button>
              <input
                id="pdf-upload"
                type="file"
                accept=".pdf"
                multiple
                className="hidden"
                onChange={(e) => {
                  const files = Array.from(e.target.files || [])
                  handleFileSelect(files)
                }}
              />
            </div>

            {/* Image Upload */}
            <div className="text-center">
              <button
                onClick={() => document.getElementById('img-upload')?.click()}
                className="w-full bg-pink-500 hover:bg-pink-600 active:bg-pink-700 text-white font-semibold py-6 sm:py-8 lg:py-6 px-4 sm:px-6 rounded-lg transition-all duration-200 flex flex-col items-center space-y-2 sm:space-y-3 touch-manipulation min-h-[120px] sm:min-h-[140px]"
              >
                <Image className="w-8 h-8 sm:w-10 sm:h-10 lg:w-8 lg:h-8" />
                <span className="text-sm sm:text-base lg:text-sm">Select IMG files</span>
                <span className="text-xs opacity-75">Up to 10MB</span>
              </button>
              <input
                id="img-upload"
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) => {
                  const files = Array.from(e.target.files || [])
                  handleFileSelect(files)
                }}
              />
            </div>

            {/* Video Upload */}
            <div className="text-center sm:col-span-2 lg:col-span-1">
              <button
                onClick={() => document.getElementById('video-upload')?.click()}
                className="w-full bg-pink-500 hover:bg-pink-600 active:bg-pink-700 text-white font-semibold py-6 sm:py-8 lg:py-6 px-4 sm:px-6 rounded-lg transition-all duration-200 flex flex-col items-center space-y-2 sm:space-y-3 touch-manipulation min-h-[120px] sm:min-h-[140px]"
              >
                <Video className="w-8 h-8 sm:w-10 sm:h-10 lg:w-8 lg:h-8" />
                <span className="text-sm sm:text-base lg:text-sm">Select Video</span>
                <span className="text-xs opacity-75">Up to 10MB</span>
              </button>
              <input
                id="video-upload"
                type="file"
                accept="video/*"
                multiple
                className="hidden"
                onChange={(e) => {
                  const files = Array.from(e.target.files || [])
                  handleFileSelect(files)
                }}
              />
            </div>
          </div>
        </div>

        {/* File List */}
        <FileList
          files={selectedFiles}
          onRemoveFile={handleRemoveFile}
          onCompressFiles={handleCompression}
          isCompressing={isCompressing}
        />

        {/* PDF Compression Options - Show only when PDF files are selected */}
        {selectedFiles.some(file => file.type === 'application/pdf') && (
          <PDFCompressionOptions
            onOptionsChange={setPdfCompressionOptions}
            defaultOptions={pdfCompressionOptions}
          />
        )}

        {/* Compression Progress */}
        {isCompressing && (
          <CompressionProgress progress={compressionProgress} />
        )}

        {/* Compression Results */}
        {compressionResults.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Compression Results</h3>
            <div className="space-y-3 sm:space-y-4 mb-6">
              {compressionResults.map((result, index) => (
                <div key={index} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 bg-green-50 border border-green-200 rounded-lg gap-3">
                  <div className="flex items-start sm:items-center space-x-3 min-w-0 flex-1">
                    <FileText className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5 sm:mt-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm sm:text-base font-medium text-gray-700 truncate">{result.fileName}</p>
                      <p className="text-xs sm:text-sm text-gray-500 mt-1">
                        <span className="block sm:inline">
                          {result.originalSize > 1024 * 1024 
                            ? `${(result.originalSize / 1024 / 1024).toFixed(2)} MB` 
                            : `${(result.originalSize / 1024).toFixed(2)} KB`
                          } → {result.compressedSize > 1024 * 1024 
                            ? `${(result.compressedSize / 1024 / 1024).toFixed(2)} MB` 
                            : `${(result.compressedSize / 1024).toFixed(2)} KB`
                          }
                        </span>
                        <span className="block sm:inline sm:ml-2">
                          ({result.compressionRatio.toFixed(1)}% reduction)
                        </span>
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => downloadCompressedFile(result)}
                    className="bg-green-500 hover:bg-green-600 active:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium touch-manipulation flex-shrink-0 w-full sm:w-auto"
                  >
                    <Download className="w-4 h-4 inline mr-2" />
                    Download
                  </button>
                </div>
              ))}
            </div>
            
            <div className="text-center">
              <button
                onClick={downloadAllFiles}
                className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 touch-manipulation w-full sm:w-auto"
              >
                <Download className="w-5 h-5 inline mr-2" />
                Download All Files
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-8 sm:mt-12 lg:mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="text-center text-gray-600">
            <p className="text-sm sm:text-base">© File Compressor 2025 ® - Your File Compression Tool</p>
            <p className="text-xs sm:text-sm mt-2 opacity-75">Optimized for mobile, tablet, and desktop devices</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
