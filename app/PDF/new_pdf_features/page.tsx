"use client";

import React, { useState } from 'react';
import { 
  FileText, 
  Scissors, 
  Trash2, 
  Download, 
  Scan, 
  Merge, 
  ArrowLeft,
  Heart
} from 'lucide-react';
import Link from 'next/link';

export default function PDFToolsPage() {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);

 


  const pdfTools = [
    {
      id: 'IMG_to_PDF',
      title: 'IMG to PDF',
      description: 'Convert images to PDF format',
      icon: FileText,   
      color: "bg-pink-500 hover:bg-pink-600",
      iconColor: 'text-blue-500'
    },{
      id: 'PDF_to_IMG',
      title: 'PDF to IMG',
      description: 'Convert PDF pages to images',
      icon: FileText,
      color: "bg-violet-500 hover:bg-violet-600",
      iconColor: 'text-blue-500'
    },{
      id: 'organize',
      title: 'Organize PDF',
      description: 'Reorder, rotate, and organize PDF pages with visual interface',
      icon: FileText,
      color: "bg-gray-500 hover:bg-gray-600",
      iconColor: 'text-blue-500'
    },
    {
      id: 'merge',
      title: 'Merge PDF',
      description: 'Combine multiple PDF files into one',
      icon: Merge,
      color: "bg-blue-500 hover:bg-blue-600",
      iconColor: 'text-green-500'
    },
    {
      id: 'split',
      title: 'Split PDF',
      description: 'Split PDF into multiple files',
      icon: Scissors,
      color: "bg-green-500 hover:bg-green-600",
      iconColor: 'text-purple-500'
    },
    {
      id: 'remove',
      title: 'Remove Pages',
      description: 'Delete unwanted pages from PDF',
      icon: Trash2,
      color: "bg-red-500 hover:bg-red-600",
      iconColor: 'text-red-500'
    },
    {
      id: 'extract',
      title: 'Extract Pages',
      description: 'Extract specific pages from PDF',
      icon: Download,
      color: "bg-yellow-500 hover:bg-yellow-600",
      iconColor: 'text-orange-500'
    },
    {
      id: 'scan',
      title: 'Scan to PDF',
      description: 'Convert scanned documents to PDF',
      icon: Scan,
      color: "bg-orange-500 hover:bg-orange-600",
      iconColor: 'text-indigo-500'
    }
  ];

  const handleToolClick = (toolId: string) => {
    setSelectedTool(toolId);
    // Navigate to specific tool pages
    if (toolId === 'organize') {
      window.location.href = '/PDF/organize-pdf';
    } else {
      // Here you can add navigation logic or open specific tool functionality
      console.log(`Selected tool: ${toolId}`);
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
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            PDF Tools <br />
            <strong>Coming Soon...</strong>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Professional PDF tools to organize, merge, split, and transform your documents. 
            All tools work directly in your browser for maximum security.
          </p>
        </div>

        {/* PDF Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {pdfTools.map((tool) => {
            const IconComponent = tool.icon;
            return (
              <div
                key={tool.id}
                className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
                onClick={() => handleToolClick(tool.id)}
              >
                <div className="text-center">
                  <div className={`w-16 h-16 ${tool.iconColor} bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <IconComponent className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {tool.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {tool.description}
                  </p>
                  <button
                    className={`w-full ${tool.color} text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200`}
                  >
                    Use Tool
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Tool Info */}
        {selectedTool && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {pdfTools.find(t => t.id === selectedTool)?.title} - Coming Soon
            </h3>
            <p className="text-gray-600 mb-4">
              This feature is currently under development. You'll be able to:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
              <li>Upload your PDF files securely</li>
              <li>Process documents in your browser</li>
              <li>Download results instantly</li>
              <li>No file size limits</li>
            </ul>
            <div className="text-center">
              <button
                onClick={() => setSelectedTool(null)}
                className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Features Section */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Why Choose Our PDF Tools?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6 text-green-500" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">100% Secure</h3>
              <p className="text-sm text-gray-600">Files never leave your browser</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Instant Results</h3>
              <p className="text-sm text-gray-600">No waiting, no uploads</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-6 h-6 text-purple-500" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Professional Quality</h3>
              <p className="text-sm text-gray-600">Industry-standard tools</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>© PDF Tools 2025 ® - Your Professional PDF Solution</p>
          </div>
        </div>
      </footer>
    </div>
  );
}



