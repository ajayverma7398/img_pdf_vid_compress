import { PDFDocument, PDFPage, RotationTypes } from 'pdf-lib';

export interface PDFPageInfo {
  id: number;
  pageNumber: number;
  rotation: number;
  visible: boolean;
  thumbnail?: string;
}

export class PDFOrganizer {
  private pdfDoc: PDFDocument | null = null;
  private pages: PDFPageInfo[] = [];

  async loadPDF(file: File): Promise<PDFPageInfo[]> {
    try {
      const arrayBuffer = await file.arrayBuffer();
      this.pdfDoc = await PDFDocument.load(arrayBuffer);
      
      const pageCount = this.pdfDoc.getPageCount();
      this.pages = Array.from({ length: pageCount }, (_, i) => ({
        id: i,
        pageNumber: i + 1,
        rotation: 0,
        visible: true,
      }));

      return this.pages;
    } catch (error) {
      console.error('Error loading PDF:', error);
      throw new Error('Failed to load PDF file');
    }
  }

  async generateThumbnail(pageIndex: number, canvas: HTMLCanvasElement): Promise<string> {
    // This would use pdfjs-dist to render PDF pages to canvas
    // For now, return a placeholder
    return `data:image/svg+xml;base64,${btoa(`
      <svg width="200" height="280" xmlns="http://www.w3.org/2000/svg">
        <rect width="200" height="280" fill="#f3f4f6" stroke="#d1d5db" stroke-width="1"/>
        <text x="100" y="140" text-anchor="middle" font-family="Arial" font-size="16" fill="#6b7280">
          Page ${pageIndex + 1}
        </text>
      </svg>
    `)}`;
  }

  rotatePage(pageId: number, direction: 'left' | 'right'): void {
    const page = this.pages.find(p => p.id === pageId);
    if (page) {
      page.rotation = (page.rotation + (direction === 'left' ? -90 : 90)) % 360;
    }
  }

  movePage(pageId: number, direction: 'up' | 'down'): void {
    const currentIndex = this.pages.findIndex(page => page.id === pageId);
    
    if (direction === 'up' && currentIndex > 0) {
      [this.pages[currentIndex], this.pages[currentIndex - 1]] = 
      [this.pages[currentIndex - 1], this.pages[currentIndex]];
    } else if (direction === 'down' && currentIndex < this.pages.length - 1) {
      [this.pages[currentIndex], this.pages[currentIndex + 1]] = 
      [this.pages[currentIndex + 1], this.pages[currentIndex]];
    }
  }

  togglePageVisibility(pageId: number): void {
    const page = this.pages.find(p => p.id === pageId);
    if (page) {
      page.visible = !page.visible;
    }
  }

  deletePage(pageId: number): void {
    this.pages = this.pages.filter(page => page.id !== pageId);
  }

  async exportPDF(): Promise<Blob> {
    if (!this.pdfDoc) {
      throw new Error('No PDF loaded');
    }

    try {
      // Create a new PDF document
      const newPdfDoc = await PDFDocument.create();
      
      // Add pages in the current order, applying rotations and visibility
      for (const pageInfo of this.pages) {
        if (pageInfo.visible) {
          const [copiedPage] = await newPdfDoc.copyPages(this.pdfDoc, [pageInfo.id]);
          
          // Apply rotation
          if (pageInfo.rotation !== 0) {
            copiedPage.setRotation({ type: RotationTypes.Degrees, angle: pageInfo.rotation });
          }
          
          newPdfDoc.addPage(copiedPage);
        }
      }

      const pdfBytes = await newPdfDoc.save();
      return new Blob([pdfBytes as BlobPart], { type: 'application/pdf' });
    } catch (error) {
      console.error('Error exporting PDF:', error);
      throw new Error('Failed to export PDF');
    }
  }

  getPages(): PDFPageInfo[] {
    return [...this.pages];
  }

  getVisiblePages(): PDFPageInfo[] {
    return this.pages.filter(page => page.visible);
  }
}

// Utility function to create a thumbnail from PDF page
export async function createPageThumbnail(
  pdfUrl: string, 
  pageNumber: number, 
  canvas: HTMLCanvasElement
): Promise<string> {
  try {
    // This would use pdfjs-dist to render the PDF page
    // For now, return a placeholder
    return `data:image/svg+xml;base64,${btoa(`
      <svg width="200" height="280" xmlns="http://www.w3.org/2000/svg">
        <rect width="200" height="280" fill="#f3f4f6" stroke="#d1d5db" stroke-width="1"/>
        <text x="100" y="140" text-anchor="middle" font-family="Arial" font-size="16" fill="#6b7280">
          Page ${pageNumber}
        </text>
      </svg>
    `)}`;
  } catch (error) {
    console.error('Error creating thumbnail:', error);
    throw new Error('Failed to create thumbnail');
  }
}
