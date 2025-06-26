# AI Image Foldering Desktop App - Frontend

A modern React-based frontend for an Electron desktop application that performs AI-powered image organization and foldering. This application uses cutting-edge technologies including React 19, TypeScript, Tailwind CSS v4, TanStack Router, and shadcn/ui components for a beautiful and responsive user experience.

## 🚀 Features

- **AI-Powered Image Organization**: Upload images and let AI analyze and organize them into logical folders
- **Batch Folder Processing**: Upload entire folders and process multiple images at once
- **Modern UI**: Beautiful, responsive interface built with shadcn/ui components and Tailwind CSS v4
- **Clean Light Theme**: Optimized light-only theme for better performance and consistency
- **Animated Navigation**: Smooth, dock-style mobile navigation with elegant animations
- **Type Safety**: Full TypeScript support throughout the application
- **Modern Routing**: File-based routing with TanStack Router with lazy loading for better performance
- **Performance Optimized**: Fast startup, optimized builds, and smooth animations
- **Confirmation Dialogs**: User-friendly confirmation dialogs for upload operations
- **Error Handling**: Comprehensive error handling with user-friendly messages

## 🛠️ Tech Stack

### Core Technologies
- **React 19** - Latest React with improved concurrent features and performance
- **TypeScript** - Type-safe development with comprehensive coverage
- **Vite** - Fast build tool with optimized dev server and production builds
- **Electron** - Cross-platform desktop app framework with performance optimizations

### UI & Styling
- **Tailwind CSS v4** - Latest utility-first CSS framework with enhanced performance
- **shadcn/ui** - High-quality, accessible React components with tooltips support
- **Framer Motion** - Smooth animations and micro-interactions
- **Tabler Icons** - Beautiful, consistent icon set

### Routing & State
- **TanStack Router** - Type-safe, file-based routing with lazy loading
- **React Dropzone** - Elegant drag & drop file uploads
- **Form Handling** - Robust form validation and error handling

### Development Tools
- **ESLint** - Code linting and quality
- **Bun** - Fast package manager and runtime
- **PostCSS** - CSS processing

## 📁 Project Structure

```
renderer/
├── src/
│   ├── actions/           # Server actions and API calls
│   │   ├── get-download.ts
│   │   ├── get-progress.ts
│   │   └── post-upload.ts
│   ├── api/              # API configuration
│   │   └── api-url.ts
│   ├── components/       # Reusable UI components
│   │   ├── global/       # Global components
│   │   │   ├── file-upload.tsx
│   │   │   ├── folder-upload.tsx
│   │   │   ├── results-table.tsx
│   │   │   └── error-boundary.tsx
│   │   ├── layouts/      # Layout components
│   │   │   ├── navbar.tsx
│   │   │   ├── mobile-nav.tsx
│   │   │   ├── nav-link.tsx
│   │   │   └── index.ts
│   │   └── ui/          # UI library components
│   │       └── shadcn/   # shadcn/ui components
│   │           ├── button.tsx
│   │           ├── tooltip.tsx
│   │           ├── alert-dialog.tsx
│   │           └── navigation-menu.tsx
│   ├── features/        # Feature-based modules
│   │   ├── home/        # Main home page feature
│   │   │   └── index.tsx
│   │   ├── image-upload/# Single image upload feature
│   │   │   └── index.tsx
│   │   ├── folder-upload/# Batch folder upload feature
│   │   │   └── index.tsx
│   │   └── errors/      # Error page components
│   ├── config/          # Configuration files
│   │   └── navigation.ts# Navigation configuration
│   ├── utils/           # Utility functions
│   │   └── navigation.tsx# Navigation utilities
│   ├── lib/             # Utility libraries
│   │   ├── cn.ts        # Tailwind class name utility
│   │   └── app-safety.ts# App safety and error prevention
│   ├── styles/          # Global styles
│   │   └── global.css   # Tailwind base styles and CSS variables
│   ├── types/           # TypeScript type definitions
│   │   ├── navigation.ts
│   │   ├── upload.ts
│   │   └── download.ts
│   ├── routes/          # TanStack Router routes
│   │   ├── __root.tsx   # Root layout with Suspense
│   │   ├── index.tsx    # Home route
│   │   ├── image.tsx    # Image upload route (lazy)
│   │   └── folder.tsx   # Folder upload route (lazy)
│   ├── main.tsx         # React entry point with performance optimizations
│   ├── router.tsx       # Router configuration
│   └── routeTree.gen.ts # Generated route tree
├── public/              # Static assets
├── build/               # Production build output
└── package.json         # Dependencies and scripts
```

## 🎨 Design System

### Color Palette
The app uses a modern light-only theme optimized for performance and consistency:

**Light Theme Colors:**
- Primary: `#3b82f6` - Modern blue for buttons and active states
- Secondary: `#f1f5f9` - Light gray for secondary elements
- Background: `#ffffff` - Clean white background
- Foreground: `#0f172a` - Dark text for optimal readability
- Border: `#e2e8f0` - Subtle borders for component separation
- Muted: `#64748b` - Muted text for secondary information

### Typography
- **Headings**: Clean, modern hierarchy with proper contrast ratios
- **Body**: System fonts optimized for readability across all platforms
- **Interactive**: Clear visual feedback for all interactive elements

### Components
- **Navigation**: Animated dock-style navigation that adapts to mobile/desktop
- **Buttons**: Consistent styling with hover states and proper accessibility
- **Forms**: Clean, accessible form controls with comprehensive validation
- **Cards**: Elevated content containers with subtle shadows
- **Tooltips**: Helpful tooltips for truncated text and additional information
- **Dialogs**: User-friendly confirmation and error dialogs

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ or Bun
- Electron (installed via npm/bun)

### Installation

1. **Clone the repository**
   ```bash
   cd renderer
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Start development server**
   ```bash
   bun run dev
   ```

4. **Build for production**
   ```bash
   bun run build
   ```

5. **Preview production build**
   ```bash
   bun run preview
   ```

### Running with Electron
From the root directory:
```bash
# Install main dependencies
bun install

# Start the Electron app in development
bun run dev
```

## 🧭 Navigation & Routing

### Route Structure
The app uses TanStack Router with file-based routing and lazy loading for optimal performance:

- `/` - Home page (main landing page with feature overview)
- `/image` - Single image upload (lazy loaded for performance)
- `/folder` - Batch folder upload (lazy loaded for performance)

### Navigation Features
- **Responsive Design**: Seamlessly adapts between mobile and desktop layouts
- **Animated Transitions**: Smooth page transitions with React Suspense
- **Keyboard Navigation**: Full keyboard accessibility support
- **Active States**: Clear visual indication of current page
- **Performance Optimized**: Lazy loading reduces initial bundle size

### Mobile Navigation
- **Dock Style**: Bottom-anchored navigation dock on mobile devices
- **Touch Optimized**: Large touch targets for mobile interaction
- **Animation**: Smooth hover and active state animations
- **Accessibility**: Screen reader friendly with proper ARIA labels

## 📱 Features Deep Dive

### Home Page
- **Welcome Interface**: Clean introduction to the app's capabilities
- **Quick Actions**: Direct access to upload features
- **Navigation Cards**: Visual navigation to main features

### Image Upload
- **Drag & Drop**: Intuitive file upload interface with visual feedback
- **Progress Indicators**: Real-time upload progress with status updates
- **Preview**: Image previews before processing with file information
- **Validation**: Comprehensive file type and size validation
- **Error Handling**: User-friendly error messages and retry options

### Folder Upload
- **Batch Processing**: Upload entire folders of images with confirmation dialog
- **Progress Tracking**: Individual file progress indicators and overall status
- **File Organization**: Visual folder structure display before upload
- **Error Handling**: Graceful error handling with detailed feedback
- **Results Summary**: Clear feedback on processing results with downloadable output
- **Tooltips**: Helpful tooltips for truncated filenames and captions

## 🎯 Development Guidelines

### Code Organization
- **Feature-based**: Organize code by features rather than file types
- **Modular Components**: Small, reusable, and testable components
- **Type Safety**: Comprehensive TypeScript coverage
- **Clean Code**: Consistent formatting and naming conventions

### Styling Guidelines
- **Tailwind Classes**: Use utility-first approach with Tailwind
- **Custom CSS**: Minimal custom CSS, prefer Tailwind utilities
- **Responsive Design**: Mobile-first responsive design
- **Dark Mode**: Consider both light and dark themes

### Performance
- **Lazy Loading**: Route-based code splitting with React Suspense
- **Bundle Optimization**: Manual chunks for vendor dependencies
- **Fast Startup**: Optimized Electron startup with performance flags
- **Memory Management**: Proper cleanup of resources and event listeners
- **Build Optimization**: ESBuild minification and optimized production builds

## 🔧 Configuration

### Tailwind CSS v4
The app uses Tailwind CSS v4 with modern features and performance optimizations:
- **Import-based**: Uses `@import "tailwindcss"` instead of PostCSS config
- **CSS Variables**: Full CSS custom property support for theming
- **Performance**: Improved build performance and smaller bundles
- **Light Theme**: Optimized light-only theme for consistency and performance

### Vite Configuration
- **Fast Refresh**: React Fast Refresh for instant updates during development
- **TypeScript**: Full TypeScript support with type checking
- **Path Aliases**: Clean import paths with @ alias for better DX
- **Build Optimization**: Manual chunks, ESBuild minification, and dependency pre-bundling
- **Development Server**: Optimized dev server with proxy support

## 🚀 Deployment

### Building for Production
```bash
# Build the React app with optimizations
bun run build

# The built files will be in the build/ directory
# Includes optimized chunks, minified assets, and performance optimizations
```

### Electron Packaging
From the root directory:
```bash
# Install main dependencies
bun install

# Build the renderer
bun run build

# Package for current platform
bun run dist

# Start production app
bun run start
```

### Performance Optimizations
The production build includes:
- **Code Splitting**: Automatic vendor chunk separation
- **Minification**: ESBuild-powered minification
- **Tree Shaking**: Unused code elimination
- **Asset Optimization**: Optimized images and icons
- **Bundle Analysis**: Chunk size optimization

## 🤝 Contributing

1. **Code Style**: Follow the existing code style and conventions
2. **Type Safety**: Ensure all new code is properly typed
3. **Testing**: Add tests for new features and bug fixes
4. **Documentation**: Update documentation for significant changes
5. **Performance**: Consider performance impact of changes

## 📄 License

This project is part of an AI image foldering application. Please refer to the root project license for terms and conditions.

---

**Built with ❤️ using React 19, TypeScript, Tailwind CSS v4, TanStack Router, and modern web technologies for optimal performance and user experience.**