'use client'

import { useState } from 'react'
import { FileText, Image, Video, X, Download } from 'lucide-react'
import { getFileType, formatFileSize } from '@/utils/compression'

interface FileListProps {
  files: File[]
  onRemoveFile: (index: number) => void
  onCompressFiles: () => void
  isCompressing: boolean
}

export default function FileList({ files, onRemoveFile, onCompressFiles, isCompressing }: FileListProps) {
  const [compressionQuality, setCompressionQuality] = useState<'low' | 'medium' | 'high'>('medium')

  const getFileIcon = (file: File) => {
    const fileType = getFileType(file)
    switch (fileType) {
      case 'pdf':
        return <FileText className="w-5 h-5 text-red-500" />
      case 'image':
        return <Image className="w-5 h-5 text-blue-500" />
      case 'video':
        return <Video className="w-5 h-5 text-green-500" />
      default:
        return <FileText className="w-5 h-5 text-gray-500" />
    }
  }

  const getFileTypeLabel = (file: File) => {
    const fileType = getFileType(file)
    switch (fileType) {
      case 'pdf':
        return 'PDF Document'
      case 'image':
        return 'Image File'
      case 'video':
        return 'Video File'
      default:
        return 'Unknown File'
    }
  }

  if (files.length === 0) return null

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 mb-6 sm:mb-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-3 sm:gap-4">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
          Selected Files ({files.length})
        </h3>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <label className="text-sm text-gray-600 font-medium">Quality:</label>
          <select
            value={compressionQuality}
            onChange={(e) => setCompressionQuality(e.target.value as 'low' | 'medium' | 'high')}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm touch-manipulation min-h-[44px] bg-white"
          >
            <option value="low">Low (Smaller size)</option>
            <option value="medium">Medium (Balanced)</option>
            <option value="high">High (Better quality)</option>
          </select>
        </div>
      </div>

      <div className="space-y-3 mb-6">
        {files.map((file, index) => (
          <div key={index} className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg gap-3">
            <div className="flex items-center space-x-3 min-w-0 flex-1">
              <div className="flex-shrink-0">
                {getFileIcon(file)}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm sm:text-base font-medium text-gray-700 truncate">{file.name}</p>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">
                  <span className="block sm:inline">{getFileTypeLabel(file)}</span>
                  <span className="block sm:inline sm:ml-2">• {formatFileSize(file.size)}</span>
                </p>
              </div>
            </div>
            <button
              onClick={() => onRemoveFile(index)}
              className="text-red-500 hover:text-red-700 active:text-red-800 p-2 rounded-full hover:bg-red-50 active:bg-red-100 touch-manipulation flex-shrink-0"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        ))}
      </div>

      <div className="text-center">
        <button
          onClick={onCompressFiles}
          disabled={isCompressing}
          className="bg-red-500 hover:bg-red-600 active:bg-red-700 disabled:bg-gray-400 text-white font-semibold py-4 px-6 sm:px-8 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 mx-auto touch-manipulation w-full sm:w-auto min-h-[52px]"
        >
          {isCompressing ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white"></div>
              <span className="text-sm sm:text-base">Compressing...</span>
            </>
          ) : (
            <>
              <Download className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-sm sm:text-base">Start Compression</span>
            </>
          )}
        </button>
        
        {!isCompressing && (
          <p className="text-xs sm:text-sm text-gray-500 mt-3 px-4">
            Estimated compression: {compressionQuality === 'low' ? '60-80%' : 
                                   compressionQuality === 'medium' ? '40-60%' : '20-40%'} size reduction
          </p>
        )}
      </div>
    </div>
  )
}


