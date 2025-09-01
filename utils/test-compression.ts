// Simple test utility for PDF compression
// This can be run in the browser console to test the compression

import { compressPDFEnhanced } from './enhanced-pdf-compression'

export async function testPDFCompression() {
  console.log('🧪 Starting PDF Compression Test (Target: 50% compression)')
  
  // Create a simple test PDF with some content
  const { PDFDocument, rgb } = await import('pdf-lib')
  
  // Create a new PDF document
  const pdfDoc = await PDFDocument.create()
  
  // Add multiple pages with different content types to test various scenarios
  for (let pageNum = 0; pageNum < 5; pageNum++) {
    const page = pdfDoc.addPage([600, 400])
    
    // Add some text
    await pdfDoc.embedFont('Helvetica')
    page.drawText(`Page ${pageNum + 1}: This is a test PDF for compression testing`, {
      x: 50,
      y: 350,
      size: 20,
      color: rgb(0, 0, 0),
    })
    
    // Add more content to make the file larger
    for (let i = 0; i < 20; i++) {
      page.drawText(`Line ${i + 1}: This is additional content to increase file size for better compression testing. This line contains more text to make the file larger.`, {
        x: 50,
        y: 300 - (i * 15),
        size: 12,
        color: rgb(0.2, 0.2, 0.2),
      })
    }
    
    // Add some shapes to increase file size
    page.drawRectangle({
      x: 50,
      y: 50,
      width: 100,
      height: 50,
      color: rgb(0.8, 0.8, 0.8),
    })
    
    page.drawCircle({
      x: 200,
      y: 100,
      size: 30,
      color: rgb(0.7, 0.7, 0.7),
    })
  }
  
  // Save the PDF
  const pdfBytes = await pdfDoc.save()
  const originalBlob = new Blob([pdfBytes], { type: 'application/pdf' })
  
  // Create a File object
  const file = new File([originalBlob], 'test.pdf', { type: 'application/pdf' })
  
  console.log('📄 Original file size:', file.size, 'bytes')
  
  // Test compression with screen quality (should give ~50% compression)
  console.log('⚡ Applying ultra-aggressive compression...')
  const result = await compressPDFEnhanced(file, {
    quality: 'screen',
    removeMetadata: true,
    optimizeImages: true
  })
  
  console.log('📦 Compressed file size:', result.compressedSize, 'bytes')
  console.log('🎯 Compression ratio:', result.compressionRatio.toFixed(2), '%')
  console.log('🔧 Optimizations applied:', result.optimizations)
  
  // Provide feedback on compression success
  if (result.compressionRatio >= 40) {
    console.log('✅ SUCCESS: Achieved target compression (40%+)')
  } else if (result.compressionRatio >= 20) {
    console.log('⚠️ MODERATE: Achieved moderate compression (20-40%)')
  } else {
    console.log('❌ LOW: Compression below 20% - PDF may already be optimized')
  }
  
  // Explain why compression might be low
  if (result.compressionRatio < 20) {
    console.log('💡 TIP: Low compression usually means:')
    console.log('   - PDF is already well-optimized')
    console.log('   - PDF contains mostly text (harder to compress)')
    console.log('   - PDF has minimal metadata or images')
    console.log('   - Try with a larger, more complex PDF for better results')
  }
  
  return {
    originalSize: result.originalSize,
    compressedSize: result.compressedSize,
    compressionRatio: result.compressionRatio,
    optimizations: result.optimizations
  }
}

// Export for use in browser console
if (typeof window !== 'undefined') {
  (window as any).testPDFCompression = testPDFCompression
}

