// Simple test utility for PDF compression
// This can be run in the browser console to test the compression

export async function testPDFCompression() {
  console.log('Testing PDF compression...')
  
  // Create a simple test PDF using pdf-lib
  const { PDFDocument, rgb } = await import('pdf-lib')
  
  try {
    // Create a test PDF
    const pdfDoc = await PDFDocument.create()
    const page = pdfDoc.addPage([600, 400])
    
    page.drawText('Test PDF for Compression', {
      x: 50,
      y: 350,
      size: 20,
      color: rgb(0, 0, 0),
    })
    
    page.drawText('This is a test document to verify compression works.', {
      x: 50,
      y: 300,
      size: 12,
      color: rgb(0.5, 0.5, 0.5),
    })
    
    // Save the test PDF
    const pdfBytes = await pdfDoc.save()
    const testFile = new File([new Uint8Array(pdfBytes)], 'test.pdf', { type: 'application/pdf' })
    
    console.log('Test PDF created:', {
      name: testFile.name,
      size: testFile.size,
      type: testFile.type
    })
    
    // Test compression
    const { compressPDF } = await import('./compression')
    const result = await compressPDF(testFile)
    
    console.log('Compression result:', {
      originalSize: result.originalSize,
      compressedSize: result.compressedSize,
      compressionRatio: `${result.compressionRatio.toFixed(2)}%`,
      fileName: result.fileName
    })
    
    return result
    
  } catch (error) {
    console.error('Test failed:', error)
    throw error
  }
}

// Export for use in browser console
if (typeof window !== 'undefined') {
  (window as any).testPDFCompression = testPDFCompression
}

