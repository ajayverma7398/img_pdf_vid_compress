'use client'

import { useState, useCallback } from 'react'
import { Upload } from 'lucide-react'

interface FileUploaderProps {
  onFilesSelected: (files: File[]) => void
  accept?: string
  multiple?: boolean
  maxSize?: number // in MB
}

export default function FileUploader({
  onFilesSelected,
  accept = '*',
  multiple = true,
  maxSize = 10
}: FileUploaderProps) {
  const [isDragOver, setIsDragOver] = useState(false)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    
    const files = Array.from(e.dataTransfer.files)
    const validFiles = files.filter(file => {
      if (maxSize && file.size > maxSize * 1024 * 1024) {
        alert(`File ${file.name} is too large. Maximum size is ${maxSize}MB.`)
        return false
      }
      return true
    })
    
    if (validFiles.length > 0) {
      onFilesSelected(validFiles)
    }
  }, [onFilesSelected, maxSize])

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-200 ${
        isDragOver ? 'drag-over' : 'border-gray-300'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
      <p className="text-gray-600 mb-2">Drag and drop files here</p>
      <p className="text-sm text-gray-500">or click to browse</p>
      {maxSize && (
        <p className="text-xs text-gray-400 mt-2">Maximum file size: {maxSize}MB</p>
      )}
    </div>
  )
}

