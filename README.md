# AI Image Foldering Desktop App

A modern Electron desktop application that uses AI to automatically organize images into folders based on their content. Built with React 19, TypeScript, Tailwind CSS v4, and TanStack Router for optimal performance and user experience.

## 🚀 Features

- **AI-Powered Image Organization**: Upload images and let AI analyze and organize them into logical folders
- **Batch Folder Processing**: Upload entire folders and process multiple images at once
- **Modern UI**: Beautiful, responsive interface with dock-style navigation
- **Fast Performance**: Optimized for quick startup and smooth interactions
- **Cross-Platform**: Works on Windows, macOS, and Linux
- **Type Safety**: Full TypeScript support throughout the application

## 🛠️ Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18+ or **Bun** (recommended for better performance)
- **Git** for cloning the repository

## 📥 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/bforbilly24/folderingbyimagecaptioning-electron-frontend-desktop.git
cd folderingbyimagecaptioning-electron-frontend-desktop
```

### 2. Install Main Dependencies

```bash
# Install Electron and main process dependencies
bun install

# Or if using npm
npm install
```

### 3. Install Renderer Dependencies

```bash
# Navigate to the renderer directory
cd renderer

# Install React app dependencies
bun install

# Or if using npm
npm install
```

### 4. Return to Root Directory

```bash
cd ..
```

## 🚀 Running the Application

### Development Mode

Start the application in development mode with hot reloading:

```bash
# This will start both the Vite dev server and Electron
bun run dev

# Or if using npm
npm run dev
```

This command will:
- Start the Vite development server on `http://localhost:5173`
- Launch the Electron app automatically
- Enable hot reloading for both React and Electron

### Production Build

To build and run the production version:

```bash
# Build the React app
bun run build

# Start the production Electron app
bun run start

# Or combine both
npm run build:prod
```

## 📁 Project Structure

```
folderingbyimagecaptioning-electron-frontend-desktop/
├── main.js                 # Electron main process
├── preload.js             # Electron preload script
├── renderer.js            # Electron renderer utilities
├── package.json           # Main package configuration
├── favicon.ico            # App icon (Windows)
├── favicon.icns           # App icon (macOS)
├── renderer/              # React frontend application
│   ├── src/              # Source code
│   ├── public/           # Static assets
│   ├── build/            # Production build output
│   └── package.json      # Renderer dependencies
└── README.md             # This file
```

## 🖥️ Using the Application

### 1. Home Page
- Launch the app to see the main interface
- Navigate between features using the top navigation (desktop) or bottom dock (mobile)

### 2. Single Image Upload
- Click "Image Upload" in the navigation
- Drag and drop images or click to select files
- Confirm the upload in the dialog that appears
- Wait for AI processing and download the organized results

### 3. Folder Upload
- Click "Folder Upload" in the navigation
- Select an entire folder containing images
- Review the file list and confirm the upload
- Monitor progress and download the ZIP file when complete

## ⚙️ Configuration

### Backend API Configuration

The app connects to a backend API for AI processing. Update the API URL in:

```typescript
// renderer/src/api/api-url.ts
export const API_BASE_URL = "http://127.0.0.1:8000"; // Change this to your API server
```

### Electron Settings

Main Electron configuration is in `main.js`. Key settings:

- **Window Size**: Default 1200x800, minimum 800x600
- **Development**: Auto-opens DevTools in development mode
- **Performance**: Optimized startup flags for better performance

## 🔧 Development

### Scripts Available

From the root directory:

```bash
# Development
bun run dev              # Start dev server + Electron
bun run dev:renderer     # Start only Vite dev server
bun run dev:electron     # Start only Electron (requires running renderer)

# Production
bun run build           # Build React app
bun run start           # Start production Electron app
bun run build:prod      # Build + start production

# Distribution
bun run dist            # Package for distribution
```

From the renderer directory:

```bash
# Development
bun run dev             # Start Vite dev server
bun run route-gen       # Generate TanStack Router routes
bun run route-watch     # Watch and auto-generate routes

# Production
bun run build           # Build for production
bun run preview         # Preview production build
bun run lint            # Run ESLint
```

### Performance Optimizations

The app includes several performance optimizations:

- **Fast Startup**: Optimized Electron launch with performance flags
- **Lazy Loading**: Route-based code splitting for faster initial load
- **Bundle Optimization**: Vendor chunk separation and tree shaking
- **Memory Management**: Proper cleanup and error handling

## 📦 Building for Distribution

### Create Distributable Packages

```bash
# Package for current platform
bun run dist

# This creates platform-specific packages in the dist/ folder
# - Windows: .exe installer
# - macOS: .dmg file
# - Linux: .AppImage file
```

### Manual Packaging

For more control over the packaging process:

```bash
# Install electron-builder globally if needed
npm install -g electron-builder

# Build the React app first
bun run build

# Package for specific platforms
electron-builder --mac dmg          # macOS
electron-builder --win nsis         # Windows
electron-builder --linux AppImage   # Linux
```

## 🚨 Troubleshooting

### Common Issues

1. **Port 5173 already in use**
   ```bash
   # Kill the process using the port
   lsof -ti:5173 | xargs kill -9
   ```

2. **Electron fails to start**
   ```bash
   # Clear node_modules and reinstall
   rm -rf node_modules renderer/node_modules
   bun install && cd renderer && bun install
   ```

3. **API connection errors**
   - Ensure your backend API is running
   - Check the API URL in `renderer/src/api/api-url.ts`
   - Verify CORS settings on your backend

4. **Build fails**
   ```bash
   # Clean build cache
   cd renderer
   rm -rf build/ node_modules/.vite/
   bun run build
   ```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and test thoroughly
4. Commit with clear messages: `git commit -m "Add feature description"`
5. Push to your fork: `git push origin feature-name`
6. Create a Pull Request

## 📄 License

This project is licensed under the MIT License. See the LICENSE file for details.

## 🆘 Support

If you encounter any issues or need help:

1. Check the troubleshooting section above
2. Look for existing issues in the GitHub repository
3. Create a new issue with detailed information about your problem
4. Include your OS, Node.js/Bun version, and error messages

---

**Happy coding! 🎉**