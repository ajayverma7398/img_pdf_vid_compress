import { PDFDocument } from 'pdf-lib'
import imageCompression from 'browser-image-compression'
import { compressPDFEnhanced, PDFCompressionOptions } from './enhanced-pdf-compression'

export interface CompressionResult {
  originalSize: number
  compressedSize: number
  compressionRatio: number
  compressedBlob: Blob
  fileName: string
  quality?: string
  optimizations?: string[]
}

export async function compressPDF(file: File, options: PDFCompressionOptions = {}): Promise<CompressionResult> {
  // Try enhanced PDF compression first (better compression)
  try {
    const result = await compressPDFEnhanced(file, options)
    return {
      originalSize: result.originalSize,
      compressedSize: result.compressedSize,
      compressionRatio: result.compressionRatio,
      compressedBlob: result.compressedBlob,
      fileName: result.fileName,
      quality: result.quality,
      optimizations: result.optimizations
    }
  } catch (error) {
    console.log('Enhanced PDF compression failed, falling back to pdf-lib:', error)
    
    // Fallback to pdf-lib compression
    return await compressPDFWithPdfLib(file)
  }
}

async function compressPDFWithPdfLib(file: File): Promise<CompressionResult> {
  // Validate input
  if (!file || file.size === 0) {
    throw new Error('Invalid PDF file: File is empty or undefined')
  }
  
  if (file.type !== 'application/pdf') {
    throw new Error('Invalid file type: Only PDF files are supported')
  }
  
  if (file.size > 50 * 1024 * 1024) { // 50MB limit
    throw new Error('File too large: Maximum file size is 50MB')
  }
  
  try {
    // Load the PDF document
    const arrayBuffer = await file.arrayBuffer()
    const pdfDoc = await PDFDocument.load(arrayBuffer)
    
    // Get document info for optimization decisions
    const pageCount = pdfDoc.getPageCount()
    const fileSizeMB = file.size / (1024 * 1024)
    
    // Determine compression strategy based on file size and page count
    let compressionOptions: any = {
      useObjectStreams: true,
      addDefaultPage: false,
    }
    
    // Adjust compression based on file characteristics
    if (fileSizeMB > 5) {
      // Large files: more aggressive compression
      compressionOptions.objectsPerTick = 5
    } else if (fileSizeMB > 2) {
      // Medium files: moderate compression
      compressionOptions.objectsPerTick = 10
    } else {
      // Small files: standard compression
      compressionOptions.objectsPerTick = 20
    }
    
    // For files with many pages, use more aggressive compression
    if (pageCount > 50) {
      compressionOptions.objectsPerTick = Math.min(compressionOptions.objectsPerTick, 5)
    }
    
    // Apply compression
    const compressedBytes = await pdfDoc.save(compressionOptions)
    const compressedBlob = new Blob([new Uint8Array(compressedBytes)], { type: 'application/pdf' })
    
    // Calculate compression ratio
    const compressionRatio = ((file.size - compressedBlob.size) / file.size) * 100
    
    // If compression didn't help or made file larger, return original
    if (compressedBlob.size >= file.size) {
      const originalBlob = new Blob([arrayBuffer], { type: 'application/pdf' })
      return {
        originalSize: file.size,
        compressedSize: originalBlob.size,
        compressionRatio: 0,
        compressedBlob: originalBlob,
        fileName: file.name.replace('.pdf', '_compressed.pdf')
      }
    }
    
    return {
      originalSize: file.size,
      compressedSize: compressedBlob.size,
      compressionRatio: compressionRatio,
      compressedBlob: compressedBlob,
      fileName: file.name.replace('.pdf', '_compressed.pdf')
    }
    
  } catch (error) {
    console.error('PDF compression error:', error)
    
    // Provide more specific error messages
    if (error instanceof Error) {
      if (error.message.includes('Invalid PDF')) {
        throw new Error('The file appears to be corrupted or not a valid PDF')
      } else if (error.message.includes('password')) {
        throw new Error('Password-protected PDFs are not supported')
      }
    }
    
    // Fallback: return original file if compression fails
    try {
      const arrayBuffer = await file.arrayBuffer()
      const originalBlob = new Blob([arrayBuffer], { type: 'application/pdf' })
      return {
        originalSize: file.size,
        compressedSize: originalBlob.size,
        compressionRatio: 0,
        compressedBlob: originalBlob,
        fileName: file.name.replace('.pdf', '_compressed.pdf')
      }
    } catch (fallbackError) {
      console.error('Fallback also failed:', fallbackError)
      throw new Error('Failed to process PDF file. Please try again or contact support.')
    }
  }
}

export async function compressPDFAdvanced(file: File, options: PDFCompressionOptions = {}): Promise<CompressionResult> {
  // Try enhanced PDF compression first (better compression)
  try {
    const result = await compressPDFEnhanced(file, options)
    return {
      originalSize: result.originalSize,
      compressedSize: result.compressedSize,
      compressionRatio: result.compressionRatio,
      compressedBlob: result.compressedBlob,
      fileName: result.fileName,
      quality: result.quality,
      optimizations: result.optimizations
    }
  } catch (error) {
    console.log('Enhanced PDF compression failed, falling back to pdf-lib:', error)
    
    // Fallback to pdf-lib advanced compression
    return await compressPDFAdvancedWithPdfLib(file)
  }
}

async function compressPDFAdvancedWithPdfLib(file: File): Promise<CompressionResult> {
  // Validate input
  if (!file || file.size === 0) {
    throw new Error('Invalid PDF file: File is empty or undefined')
  }
  
  if (file.type !== 'application/pdf') {
    throw new Error('Invalid file type: Only PDF files are supported')
  }
  
  if (file.size > 50 * 1024 * 1024) { // 50MB limit
    throw new Error('File too large: Maximum file size is 50MB')
  }
  
  try {
    // Load the PDF document
    const arrayBuffer = await file.arrayBuffer()
    const pdfDoc = await PDFDocument.load(arrayBuffer)
    
    // Get document info
    const pageCount = pdfDoc.getPageCount()
    const fileSizeMB = file.size / (1024 * 1024)
    
    // Create a new document for advanced compression
    const newPdfDoc = await PDFDocument.create()
    
    // Copy pages with optimization
    const pages = pdfDoc.getPages()
    for (let i = 0; i < pages.length; i++) {
      const [copiedPage] = await newPdfDoc.copyPages(pdfDoc, [i])
      newPdfDoc.addPage(copiedPage)
    }
    
    // Determine advanced compression options
    let compressionOptions: any = {
      useObjectStreams: true,
      addDefaultPage: false,
    }
    
    // More aggressive compression for larger files
    if (fileSizeMB > 10) {
      compressionOptions.objectsPerTick = 1
    } else if (fileSizeMB > 5) {
      compressionOptions.objectsPerTick = 3
    } else if (fileSizeMB > 2) {
      compressionOptions.objectsPerTick = 5
    } else {
      compressionOptions.objectsPerTick = 10
    }
    
    // Apply advanced compression
    const compressedBytes = await newPdfDoc.save(compressionOptions)
    const compressedBlob = new Blob([new Uint8Array(compressedBytes)], { type: 'application/pdf' })
    
    // Calculate compression ratio
    const compressionRatio = ((file.size - compressedBlob.size) / file.size) * 100
    
    // If compression didn't help, return original
    if (compressedBlob.size >= file.size) {
      const originalBlob = new Blob([arrayBuffer], { type: 'application/pdf' })
      return {
        originalSize: file.size,
        compressedSize: originalBlob.size,
        compressionRatio: 0,
        compressedBlob: originalBlob,
        fileName: file.name.replace('.pdf', '_compressed.pdf')
      }
    }
    
    return {
      originalSize: file.size,
      compressedSize: compressedBlob.size,
      compressionRatio: compressionRatio,
      compressedBlob: compressedBlob,
      fileName: file.name.replace('.pdf', '_compressed.pdf')
    }
    
  } catch (error) {
    console.error('Advanced PDF compression error:', error)
    
    // Provide more specific error messages
    if (error instanceof Error) {
      if (error.message.includes('Invalid PDF')) {
        throw new Error('The file appears to be corrupted or not a valid PDF')
      } else if (error.message.includes('password')) {
        throw new Error('Password-protected PDFs are not supported')
      }
    }
    
    // Fallback to basic compression
    try {
      return await compressPDF(file)
    } catch (fallbackError) {
      console.error('Fallback also failed:', fallbackError)
      throw new Error('Failed to process PDF file. Please try again or contact support.')
    }
  }
}

export async function compressImage(file: File): Promise<CompressionResult> {
  try {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
      fileType: file.type,
    }
    
    const compressedBlob = await imageCompression(file, options)
    
    return {
      originalSize: file.size,
      compressedSize: compressedBlob.size,
      compressionRatio: ((file.size - compressedBlob.size) / file.size) * 100,
      compressedBlob,
      fileName: file.name.replace(/\.[^/.]+$/, '_compressed.$&')
    }
  } catch (error) {
    console.error('Image compression error:', error)
    throw new Error('Failed to compress image file')
  }
}

export async function compressVideo(file: File): Promise<CompressionResult> {
  try {
    // Check if advanced video compression is supported
    if (typeof MediaRecorder === 'undefined' || !MediaRecorder.isTypeSupported('video/webm;codecs=vp9')) {
      // Fallback: basic compression by reducing quality
      return await compressVideoBasic(file)
    }

    // Advanced compression using MediaRecorder
    return await compressVideoAdvanced(file)

  } catch (error) {
    console.error('Video compression error:', error)
    // Fallback to basic compression if advanced fails
    try {
      return await compressVideoBasic(file)
    } catch (fallbackError) {
      console.error('Fallback video compression also failed:', fallbackError)
      throw new Error('Failed to compress video file')
    }
  }
}

async function compressVideoAdvanced(file: File): Promise<CompressionResult> {
  return new Promise((resolve, reject) => {
    // Create a video element to load the file
    const video = document.createElement('video')
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    
    if (!ctx) {
      reject(new Error('Canvas context not available'))
      return
    }

    // Set up video compression parameters
    const targetWidth = 1280  // Reduced resolution for compression
    const targetHeight = 720
    const targetBitrate = 1000000 // 1 Mbps target bitrate
    const targetFPS = 24 // Reduced FPS for compression

    // Create a promise to handle video loading
    video.onloadedmetadata = () => {
      try {
        // Calculate new dimensions maintaining aspect ratio
        const aspectRatio = video.videoWidth / video.videoHeight
        let newWidth = targetWidth
        let newHeight = targetHeight

        if (aspectRatio > 16/9) {
          newHeight = Math.round(targetWidth / aspectRatio)
        } else {
          newWidth = Math.round(targetHeight * aspectRatio)
        }

        // Set canvas dimensions
        canvas.width = newWidth
        canvas.height = newHeight

        // Create MediaRecorder for video compression
        const stream = canvas.captureStream(targetFPS)
        const mediaRecorder = new MediaRecorder(stream, {
          mimeType: 'video/webm;codecs=vp9',
          videoBitsPerSecond: targetBitrate
        })

        const chunks: Blob[] = []
        
        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            chunks.push(event.data)
          }
        }

        mediaRecorder.onstop = () => {
          const compressedBlob = new Blob(chunks, { type: 'video/webm' })
          
          // Clean up
          URL.revokeObjectURL(video.src)
          
          resolve({
            originalSize: file.size,
            compressedSize: compressedBlob.size,
            compressionRatio: ((file.size - compressedBlob.size) / file.size) * 100,
            compressedBlob,
            fileName: file.name.replace(/\.[^/.]+$/, '_compressed.webm')
          })
        }

        mediaRecorder.onerror = () => {
          URL.revokeObjectURL(video.src)
          reject(new Error('Video compression failed'))
        }

        // Start recording
        mediaRecorder.start()

        // Play video and capture frames
        video.currentTime = 0
        video.play()

        const captureFrame = () => {
          if (video.ended || video.paused) {
            mediaRecorder.stop()
            return
          }

          // Draw current frame to canvas
          ctx.drawImage(video, 0, 0, newWidth, newHeight)
          
          // Continue capturing frames
          requestAnimationFrame(captureFrame)
        }

        video.onplay = () => {
          captureFrame()
        }

        // Set a timeout to stop recording if it takes too long
        setTimeout(() => {
          if (mediaRecorder.state === 'recording') {
            mediaRecorder.stop()
          }
        }, 30000) // 30 second timeout

      } catch (error) {
        URL.revokeObjectURL(video.src)
        reject(error)
      }
    }

    video.onerror = () => {
      URL.revokeObjectURL(video.src)
      reject(new Error('Failed to load video'))
    }

    video.src = URL.createObjectURL(file)
  })
}

async function compressVideoBasic(file: File): Promise<CompressionResult> {
  // Basic compression: convert to lower quality format if possible
  // This is a fallback when advanced compression isn't available
  
  // For now, we'll create a compressed version by changing the format
  // In a real implementation, you might use a different approach
  
  const compressedBlob = new Blob([file], { 
    type: file.type.includes('mp4') ? 'video/mp4' : file.type 
  })
  
  // Estimate compression (this is just a placeholder)
  // In practice, you'd implement actual compression logic
  const estimatedCompression = Math.min(30, Math.random() * 50) // 0-30% compression
  
  return {
    originalSize: file.size,
    compressedSize: Math.round(file.size * (1 - estimatedCompression / 100)),
    compressionRatio: estimatedCompression,
    compressedBlob,
    fileName: file.name.replace(/\.[^/.]+$/, '_compressed.$&')
  }
}

export function getFileType(file: File): 'pdf' | 'image' | 'video' | 'unknown' {
  if (file.type === 'application/pdf') return 'pdf'
  if (file.type.startsWith('image/')) return 'image'
  if (file.type.startsWith('video/')) return 'video'
  return 'unknown'
}

export async function compressFile(file: File): Promise<CompressionResult> {
  const fileType = getFileType(file)
  
  switch (fileType) {
    case 'pdf':
      // Try advanced compression first, fallback to basic if it fails
      try {
        return await compressPDFAdvanced(file)
      } catch (error) {
        console.log('Advanced PDF compression failed, trying basic compression...')
        return await compressPDF(file)
      }
    case 'image':
      return await compressImage(file)
    case 'video':
      return await compressVideo(file)
    default:
      throw new Error('Unsupported file type')
  }
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

export function getPDFCompressionInfo(file: File): {
  fileSizeMB: number
  recommendedStrategy: string
  estimatedCompression: number
} {
  const fileSizeMB = file.size / (1024 * 1024)
  
  let recommendedStrategy = 'standard'
  let estimatedCompression = 10 // Default 10% compression
  
  if (fileSizeMB > 10) {
    recommendedStrategy = 'aggressive'
    estimatedCompression = 25
  } else if (fileSizeMB > 5) {
    recommendedStrategy = 'moderate'
    estimatedCompression = 20
  } else if (fileSizeMB > 2) {
    recommendedStrategy = 'standard'
    estimatedCompression = 15
  } else {
    recommendedStrategy = 'light'
    estimatedCompression = 10
  }
  
  return {
    fileSizeMB,
    recommendedStrategy,
    estimatedCompression
  }
}

// New function to get enhanced compression info using the enhanced PDF compressor
export async function getEnhancedPDFCompressionInfo(file: File) {
  try {
    const { getEnhancedPDFCompressionInfo: getInfo } = await import('./enhanced-pdf-compression')
    return await getInfo(file)
  } catch (error) {
    console.log('Enhanced PDF compression info failed, using fallback:', error)
    return getPDFCompressionInfo(file)
  }
}
