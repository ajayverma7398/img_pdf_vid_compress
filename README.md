# File Compression App

A modern Next.js application for compressing PDF files, images, and videos up to 10MB in size. Built with a clean, responsive design similar to popular PDF tools.

## Features

- **PDF Compression**: Compress PDF files while maintaining quality
- **Image Compression**: Optimize images with configurable quality settings
- **Video Compression**: Basic video file support (placeholder implementation)
- **Drag & Drop**: Intuitive file upload interface
- **File Size Limit**: Maximum 10MB file size support
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Clean, professional interface with Tailwind CSS

## Tech Stack

- **Frontend**: Next.js 14 with React 18
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **PDF Processing**: pdf-lib
- **Image Compression**: browser-image-compression
- **TypeScript**: Full type safety
- **Build Tool**: Next.js built-in bundler

## Prerequisites

- Node.js 18+ 
- npm or yarn package manager

## Installation

1. **Clone the repository** (if applicable) or navigate to the project directory:
   ```bash
   cd img_pdf_vid_compress
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser** and navigate to [http://localhost:3000](http://localhost:3000)

## Usage

### PDF Compression
1. Click "Select PDF files" button
2. Choose one or more PDF files (max 10MB each)
3. Click "Start Compression"
4. Wait for processing to complete
5. Download compressed files

### Image Compression
1. Click "Select IMG files" button
2. Choose image files (max 10MB each)
3. Images are automatically compressed with quality optimization
4. Download compressed images

### Video Compression
1. Click "Select Video" button
2. Choose video files (max 10MB each)
3. Basic compression processing
4. Download processed videos

### Drag & Drop
- Simply drag files from your file explorer onto the upload area
- Supports all supported file types
- Automatic file type detection

## File Size Limits

- **Maximum file size**: 10MB per file
- **Supported formats**:
  - PDF: `.pdf`
  - Images: `.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`
  - Videos: `.mp4`, `.avi`, `.mov`, `.wmv`, `.flv`

## Project Structure

```
img_pdf_vid_compress/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main page component
├── components/             # React components
│   ├── FileUploader.tsx   # File upload component
│   └── CompressionProgress.tsx # Progress indicator
├── utils/                  # Utility functions
│   └── compression.ts     # Compression logic
├── package.json           # Dependencies and scripts
├── tailwind.config.js     # Tailwind CSS configuration
├── next.config.js         # Next.js configuration
└── README.md              # This file
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Customization

### Compression Settings
Edit `utils/compression.ts` to modify:
- Image quality settings
- PDF compression options
- Video compression parameters

### Styling
Modify `tailwind.config.js` and `app/globals.css` to customize:
- Color scheme
- Typography
- Layout spacing
- Component styles

## Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Performance Notes

- **PDF Compression**: Uses pdf-lib for client-side processing
- **Image Compression**: Optimized with browser-image-compression
- **Video Compression**: Basic implementation (consider server-side for production)
- **File Size**: Client-side processing limited by browser memory

## Production Deployment

1. **Build the application**:
   ```bash
   npm run build
   ```

2. **Start production server**:
   ```bash
   npm run start
   ```

3. **Deploy to platforms**:
   - Vercel (recommended for Next.js)
   - Netlify
   - AWS Amplify
   - Docker containers

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For issues and questions:
- Check the existing issues
- Create a new issue with detailed information
- Include browser version and error messages

## Roadmap

- [ ] Advanced video compression with FFmpeg.wasm
- [ ] Batch processing improvements
- [ ] Cloud storage integration
- [ ] Progress tracking for large files
- [ ] Compression quality presets
- [ ] File format conversion options

