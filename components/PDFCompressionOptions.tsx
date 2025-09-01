'use client'

import { useState } from 'react'

export interface PDFCompressionOptions {
  quality: 'screen' | 'ebook' | 'printer' | 'prepress'
  removeMetadata: boolean
  optimizeImages: boolean
}

interface PDFCompressionOptionsProps {
  onOptionsChange: (options: PDFCompressionOptions) => void
  defaultOptions?: Partial<PDFCompressionOptions>
}

export default function PDFCompressionOptions({ 
  onOptionsChange, 
  defaultOptions = {} 
}: PDFCompressionOptionsProps) {
  const [options, setOptions] = useState<PDFCompressionOptions>({
    quality: 'ebook',
    removeMetadata: false,
    optimizeImages: true,
    ...defaultOptions
  })

  const handleOptionChange = (key: keyof PDFCompressionOptions, value: any) => {
    const newOptions = { ...options, [key]: value }
    setOptions(newOptions)
    onOptionsChange(newOptions)
  }

  const qualityDescriptions = {
    screen: {
      name: 'Screen',
      description: 'Low quality, small file size (72 DPI)',
      compression: '40-60%',
      useCase: 'Web viewing, email'
    },
    ebook: {
      name: 'Ebook',
      description: 'Medium quality, balanced size (150 DPI)',
      compression: '25-40%',
      useCase: 'Digital reading, tablets'
    },
    printer: {
      name: 'Printer',
      description: 'High quality, moderate size (300 DPI)',
      compression: '15-30%',
      useCase: 'Printing, documents'
    },
    prepress: {
      name: 'Prepress',
      description: 'Highest quality, minimal compression (300 DPI)',
      compression: '5-15%',
      useCase: 'Professional printing'
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">PDF Compression Options</h3>
      
      <div className="space-y-6">
        {/* Quality Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Compression Quality
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {Object.entries(qualityDescriptions).map(([key, desc]) => (
              <div
                key={key}
                className={`relative border-2 rounded-lg p-3 cursor-pointer transition-all ${
                  options.quality === key
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => handleOptionChange('quality', key)}
              >
                <input
                  type="radio"
                  name="quality"
                  value={key}
                  checked={options.quality === key}
                  onChange={() => handleOptionChange('quality', key)}
                  className="sr-only"
                />
                <div className="text-center">
                  <div className="font-semibold text-gray-900">{desc.name}</div>
                  <div className="text-xs text-gray-600 mt-1">{desc.description}</div>
                  <div className="text-xs font-medium text-blue-600 mt-1">
                    {desc.compression} compression
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{desc.useCase}</div>
                </div>
                {options.quality === key && (
                  <div className="absolute top-2 right-2">
                    <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Additional Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center">
            <input
              id="removeMetadata"
              type="checkbox"
              checked={options.removeMetadata}
              onChange={(e) => handleOptionChange('removeMetadata', e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="removeMetadata" className="ml-2 block text-sm text-gray-900">
              Remove metadata (author, creation date, etc.)
            </label>
          </div>

          <div className="flex items-center">
            <input
              id="optimizeImages"
              type="checkbox"
              checked={options.optimizeImages}
              onChange={(e) => handleOptionChange('optimizeImages', e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="optimizeImages" className="ml-2 block text-sm text-gray-900">
              Optimize embedded images
            </label>
          </div>
        </div>

        {/* Quality Preview */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Selected Quality:</span>
            <span className="text-sm font-semibold text-blue-600 capitalize">
              {qualityDescriptions[options.quality].name}
            </span>
          </div>
          <div className="text-xs text-gray-600">
            {qualityDescriptions[options.quality].description} • 
            Expected compression: {qualityDescriptions[options.quality].compression} • 
            Best for: {qualityDescriptions[options.quality].useCase}
          </div>
        </div>
      </div>
    </div>
  )
}

