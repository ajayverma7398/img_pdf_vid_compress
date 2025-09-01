# Deployment Guide

This guide will help you deploy the File Compression App to various platforms.

## Prerequisites

- Node.js 18+ installed
- Git repository (if deploying from source)
- Account on your chosen deployment platform

## Local Development

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run development server**:
   ```bash
   npm run dev
   ```

3. **Open browser** at [http://localhost:3000](http://localhost:3000)

## Building for Production

1. **Build the application**:
   ```bash
   npm run build
   ```

2. **Test production build locally**:
   ```bash
   npm run start
   ```

## Deployment Options

### Option 1: Vercel (Recommended for Next.js)

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Deploy**:
   ```bash
   vercel
   ```

3. **Follow the prompts** to connect your GitHub account and deploy

### Option 2: Netlify

1. **Build the app**:
   ```bash
   npm run build
   npm run export
   ```

2. **Drag and drop** the `out` folder to Netlify

3. **Or use Netlify CLI**:
   ```bash
   npm i -g netlify-cli
   netlify deploy
   ```

### Option 3: AWS Amplify

1. **Connect your repository** to AWS Amplify
2. **Set build settings**:
   - Build command: `npm run build`
   - Output directory: `.next`
3. **Deploy automatically** on every push

### Option 4: Docker

1. **Create Dockerfile**:
   ```dockerfile
   FROM node:18-alpine
   WORKDR /app
   COPY package*.json ./
   RUN npm ci --only=production
   COPY . .
   RUN npm run build
   EXPOSE 3000
   CMD ["npm", "start"]
   ```

2. **Build and run**:
   ```bash
   docker build -t file-compressor .
   docker run -p 3000:3000 file-compressor
   ```

## Environment Variables

Create a `.env.local` file for local development:

```env
NEXT_PUBLIC_APP_NAME=File Compressor
NEXT_PUBLIC_MAX_FILE_SIZE=10485760
```

## Performance Optimization

1. **Enable compression** in your hosting platform
2. **Set up CDN** for static assets
3. **Configure caching** headers
4. **Monitor performance** with tools like Lighthouse

## Security Considerations

1. **File size limits** are enforced client-side and server-side
2. **File type validation** prevents malicious uploads
3. **No server storage** - files are processed in memory only
4. **HTTPS required** for production deployments

## Troubleshooting

### Common Issues

1. **Build fails**: Check Node.js version and dependencies
2. **File upload errors**: Verify file size limits and types
3. **Compression fails**: Check browser compatibility
4. **Performance issues**: Optimize images and enable compression

### Debug Mode

Enable debug logging:

```bash
DEBUG=* npm run dev
```

## Monitoring

1. **Set up logging** for production
2. **Monitor file uploads** and compression success rates
3. **Track performance metrics** and user experience
4. **Set up alerts** for errors and failures

## Updates and Maintenance

1. **Regular dependency updates**:
   ```bash
   npm update
   npm audit fix
   ```

2. **Security patches**: Monitor for vulnerabilities
3. **Feature updates**: Deploy new versions regularly
4. **Backup strategy**: Version control and deployment rollbacks

## Support

For deployment issues:
- Check platform-specific documentation
- Review build logs and error messages
- Test locally before deploying
- Use staging environments for testing




