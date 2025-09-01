"use client";

import React, { useState, useRef } from 'react';
import { 
  FileText, 
  RotateCw, 
  RotateCcw, 
  ArrowUp, 
  ArrowDown, 
  Trash2, 
  Download, 
  Upload,
  ArrowLeft,
  Grid3X3,
  Eye,
  EyeOff
} from 'lucide-react';
import Link from 'next/link';
import { PDFOrganizer, PDFPageInfo } from '@/utils/pdf-organizer';

export default function OrganizePDFPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [pages, setPages] = useState<PDFPageInfo[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [previewMode, setPreviewMode] = useState<'grid' | 'list'>('grid');
  const [pdfOrganizer, setPdfOrganizer] = useState<PDFOrganizer | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || file.type !== 'application/pdf') {
      alert('Please select a valid PDF file');
      return;
    }

    setSelectedFile(file);
    setIsProcessing(true);

    try {
      const organizer = new PDFOrganizer();
      const loadedPages = await organizer.loadPDF(file);
      
      // Generate thumbnails for each page
      const pagesWithThumbnails = await Promise.all(
        loadedPages.map(async (page) => {
          const canvas = document.createElement('canvas');
          const thumbnail = await organizer.generateThumbnail(page.id, canvas);
          return { ...page, thumbnail };
        })
      );

      setPages(pagesWithThumbnails);
      setPdfOrganizer(organizer);
    } catch (error) {
      console.error('Error processing PDF:', error);
      alert('Error processing PDF file');
    } finally {
      setIsProcessing(false);
    }
  };

  const rotatePage = (pageId: number, direction: 'left' | 'right') => {
    if (pdfOrganizer) {
      pdfOrganizer.rotatePage(pageId, direction);
      setPages([...pdfOrganizer.getPages()]);
    }
  };

  const movePage = (pageId: number, direction: 'up' | 'down') => {
    if (pdfOrganizer) {
      pdfOrganizer.movePage(pageId, direction);
      setPages([...pdfOrganizer.getPages()]);
    }
  };

  const togglePageVisibility = (pageId: number) => {
    if (pdfOrganizer) {
      pdfOrganizer.togglePageVisibility(pageId);
      setPages([...pdfOrganizer.getPages()]);
    }
  };

  const deletePage = (pageId: number) => {
    if (pdfOrganizer) {
      pdfOrganizer.deletePage(pageId);
      setPages([...pdfOrganizer.getPages()]);
    }
  };

  const downloadPDF = async () => {
    if (!pdfOrganizer) {
      alert('No PDF loaded');
      return;
    }

    try {
      const pdfBlob = await pdfOrganizer.exportPDF();
      const url = URL.createObjectURL(pdfBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = selectedFile ? `organized_${selectedFile.name}` : 'organized_document.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading PDF:', error);
      alert('Error downloading PDF');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
                <ArrowLeft className="w-5 h-5 text-gray-600" />
                <span className="text-lg text-gray-600">Back to Main</span>
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="text-gray-700 hover:text-gray-900 px-4 py-2 text-sm font-medium">
                Login
              </button>
              <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm font-medium">
                Sign up
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
           <strong style={{ color: 'orangered' }}>Working but Under Development or better user experience</strong><br />
            Reorder, Rotate & Organize PDF Pages
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Upload your PDF and use our open-source tools to reorder pages, rotate them, and organize your document exactly how you want it.
          </p>
        </div>

        {/* File Upload Section */}
        {!selectedFile ? (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="max-w-md mx-auto">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Upload Your PDF</h3>
              <p className="text-gray-600 mb-6">
                Select a PDF file to start organizing your pages
              </p>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                <Upload className="w-5 h-5 inline mr-2" />
                Choose PDF File
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* File Info */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <FileText className="w-8 h-8 text-red-500" />
                  <div>
                    <h3 className="font-semibold text-gray-900">{selectedFile.name}</h3>
                    <p className="text-sm text-gray-600">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB • {pages.length} pages
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedFile(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  Change File
                </button>
              </div>
            </div>

            {/* Toolbar */}
            <div className="bg-white rounded-lg shadow-lg p-4">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setPreviewMode('grid')}
                    className={`p-2 rounded ${previewMode === 'grid' ? 'bg-red-100 text-red-600' : 'text-gray-600 hover:text-gray-900'}`}
                  >
                    <Grid3X3 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setPreviewMode('list')}
                    className={`p-2 rounded ${previewMode === 'list' ? 'bg-red-100 text-red-600' : 'text-gray-600 hover:text-gray-900'}`}
                  >
                    <FileText className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">
                    {pages.filter(p => p.visible).length} of {pages.length} pages visible
                  </span>
                  <button
                    onClick={downloadPDF}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium"
                  >
                    <Download className="w-4 h-4 inline mr-2" />
                    Download PDF
                  </button>
                </div>
              </div>
            </div>

            {/* Pages Grid/List */}
            {isProcessing ? (
              <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
                <p className="text-gray-600">Processing PDF pages...</p>
              </div>
            ) : (
              <div className={`grid gap-4 ${previewMode === 'grid' ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4' : 'grid-cols-1'}`}>
                {pages.map((page) => (
                  <div
                    key={page.id}
                    className={`bg-white rounded-lg shadow-lg p-4 ${!page.visible ? 'opacity-50' : ''}`}
                  >
                    {/* Page Thumbnail */}
                    <div className="relative mb-4">
                      <img
                        src={page.thumbnail}
                        alt={`Page ${page.pageNumber}`}
                        className={`w-full h-auto rounded border ${page.rotation !== 0 ? 'transform' : ''}`}
                        style={{
                          transform: page.rotation !== 0 ? `rotate(${page.rotation}deg)` : undefined
                        }}
                      />
                      {!page.visible && (
                        <div className="absolute inset-0 bg-gray-200 bg-opacity-50 flex items-center justify-center">
                          <EyeOff className="w-8 h-8 text-gray-500" />
                        </div>
                      )}
                    </div>

                    {/* Page Info */}
                    <div className="text-center mb-4">
                      <h4 className="font-semibold text-gray-900">Page {page.pageNumber}</h4>
                      {page.rotation !== 0 && (
                        <p className="text-sm text-gray-600">Rotated {page.rotation}°</p>
                      )}
                    </div>

                    {/* Page Controls */}
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => rotatePage(page.id, 'left')}
                        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded"
                        title="Rotate Left"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => rotatePage(page.id, 'right')}
                        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded"
                        title="Rotate Right"
                      >
                        <RotateCw className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => movePage(page.id, 'up')}
                        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded"
                        title="Move Up"
                        disabled={page.id === 0}
                      >
                        <ArrowUp className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => movePage(page.id, 'down')}
                        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded"
                        title="Move Down"
                        disabled={page.id === pages.length - 1}
                      >
                        <ArrowDown className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Additional Controls */}
                    <div className="flex justify-between mt-3 pt-3 border-t">
                      <button
                        onClick={() => togglePageVisibility(page.id)}
                        className={`p-2 rounded ${page.visible ? 'text-blue-600 hover:text-blue-700' : 'text-gray-400 hover:text-gray-600'}`}
                        title={page.visible ? 'Hide Page' : 'Show Page'}
                      >
                        {page.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => deletePage(page.id)}
                        className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded"
                        title="Delete Page"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-gray-600">
            <p className="text-sm">© File Compressor 2025 ® - PDF Organization Tools</p>
            <p className="text-xs mt-2 opacity-75">Built with open-source libraries for maximum compatibility</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
