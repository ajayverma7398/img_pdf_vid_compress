'use client'

interface CompressionProgressProps {
  progress: number
}

export default function CompressionProgress({ progress }: CompressionProgressProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 mb-6 sm:mb-8">
      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Compression Progress</h3>
      
      <div className="mb-6">
        <div className="flex justify-between text-sm sm:text-base text-gray-600 mb-3">
          <span className="font-medium">Processing files...</span>
          <span className="font-bold text-red-500">{progress}%</span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-4 sm:h-5 overflow-hidden">
          <div
            className="bg-gradient-to-r from-red-500 to-red-600 h-full rounded-full transition-all duration-500 ease-out shadow-sm"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
      
      <div className="text-center">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-red-500"></div>
          <p className="text-sm sm:text-base text-gray-600 font-medium">
            {progress < 100 
              ? 'Please wait while we compress your files...' 
              : 'Compression completed! Your files are ready for download.'
            }
          </p>
        </div>
        
        {progress === 100 && (
          <button className="mt-4 bg-green-500 hover:bg-green-600 active:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 touch-manipulation w-full sm:w-auto">
            Download Compressed Files
          </button>
        )}
      </div>
    </div>
  )
}

