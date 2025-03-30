# White Wallpaper - Project Documentation

## Overview
White Wallpaper is an elegant wallpaper showcase website that focuses on displaying high-quality white-themed wallpapers. The project adopts an Apple-inspired design philosophy, emphasizing simplicity and user experience.

## Analytics and Tracking
The project uses Google Analytics 4 for tracking user interactions and gathering usage statistics. The tracking code is implemented in the `index.html` file with the following features:
- Page view tracking
- User engagement metrics
- Performance monitoring
- User behavior analysis

To modify the Google Analytics configuration:
1. Locate the Google Analytics code in `index.html`
2. Update the tracking ID (G-TG7BCHFH4W) with your own if needed
3. Customize tracking parameters as required

## Project Structure
```
project/
├── src/                    # Source code directory
│   ├── App.tsx            # Main application component
│   ├── main.tsx           # Application entry point
│   ├── index.css          # Global styles
│   ├── components/        # Reusable components
│   │   ├── preview/       # Device preview components
│   │   │   ├── DevicePreview.tsx        # Device frame renderer
│   │   │   ├── DeviceSelector.tsx       # Device selection UI
│   │   │   ├── DeviceTypes.tsx          # Device definitions
│   │   │   ├── DevicePreviewUtils.tsx   # Utility functions
│   │   │   ├── ImagePreviewModal.tsx    # Preview modal container
│   │   │   └── index.ts                 # Component exports
│   └── vite-env.d.ts      # Vite environment declarations
├── public/                # Static assets
├── .bolt/                 # Project configuration
└── [Configuration Files]  # Various config files for TypeScript, ESLint, etc.
```

## Technical Stack

### Core Technologies
- **Frontend Framework**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Code Quality**: ESLint

### Development Tools
- **TypeScript Configuration**: Multiple config files for different environments
- **CSS Processing**: PostCSS with Tailwind
- **Code Linting**: ESLint with React-specific rules

## Features

### 1. Homepage
- Featured wallpaper carousel
- Clean navigation menu
- Smooth animations and transitions

### 2. Wallpaper Gallery
- Grid layout for wallpaper display
- Category-based filtering
- Search functionality

### 3. Wallpaper Details
- High-resolution preview
- Download capability

### 4. Device Preview System
The project includes a sophisticated device preview system that allows users to visualize wallpapers on different devices:

- **Multiple Device Support**: 
  - iPhone 15 Pro (with dynamic island)
  - Android Flagship
  - PC Monitor
  - MacBook Pro
  - iPad Pro
  - Original Size (no frame)

- **Realistic Device Rendering**:
  - Accurate device dimensions and aspect ratios
  - Realistic frames with appropriate bezels
  - Device-specific features (notches, control bars)
  - Proper scaling for all device types
  
- **Visual Enhancements**:
  - Subtle light reflections on device surfaces
  - Realistic shadows and gradients
  - Device-specific buttons and controls
  - Status bar simulation

- **Interactive Preview Modal**:
  - Elegant backdrop with subtle gradient
  - Quick device switching via dropdown
  - Smooth transitions between device types
  - Device-specific wallpaper download
  - Keyboard navigation support

- **Device Navigation**:
  - Left/right arrows to cycle through available devices
  - Visual indicator showing current device selection
  - Smooth animations during device switching

- **Device-Specific Wallpaper Download**:
  - Download wallpapers sized specifically for the selected device
  - Automatic image resizing based on device screen dimensions
  - Proper aspect ratio preservation during resizing
  - Image cropping to fit device aspect ratio
  - Original size download option for full resolution

## Design Philosophy

### Color Scheme
- Primary: White
- Secondary: Light gray and black
- Accent colors: Minimal, focusing on content

### Typography
- Primary font: SF Pro Display (Apple system font)
- Clean, readable text hierarchy

### Layout
- Large image focus
- Generous white space
- Responsive design

### Animations
- Smooth transitions
- Subtle micro-interactions
- Performance-optimized animations

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation
1. Clone the repository
```bash
git clone [repository-url]
```

2. Navigate to project directory
```bash
cd project
```

3. Install dependencies
```bash
npm install
```

### Development
Run the development server:
```bash
npm run dev
```

### Building for Production
Build the project:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Project Configuration

### TypeScript Configuration
- `tsconfig.json`: Base configuration
- `tsconfig.app.json`: Application-specific settings
- `tsconfig.node.json`: Node.js environment settings

### ESLint Configuration
- React-specific rules
- TypeScript support
- Modern JavaScript features

### Tailwind Configuration
- Custom theme settings
- Responsive breakpoints
- Utility class customization

## Development Guidelines

### Code Style
- Follow TypeScript best practices
- Use functional components with hooks
- Implement proper type definitions
- Maintain consistent naming conventions

### Component Structure
- Keep components modular and reusable
- Implement proper prop typing
- Use appropriate React patterns

### Performance Considerations
- Optimize image loading
- Implement lazy loading
- Minimize bundle size
- Monitor performance metrics

## Deployment

### Build Process
1. Run type checking
2. Execute linting
3. Build production assets
4. Optimize for deployment

### Deployment Platform
- Vercel (recommended)
- Other static hosting services supported

## Contributing

### Development Workflow
1. Create feature branch
2. Implement changes
3. Run tests and linting
4. Submit pull request

### Code Review Process
- TypeScript type checking
- ESLint compliance
- Performance impact assessment
- Accessibility considerations

## Recent Updates and Improvements

### Device Preview System Enhancement (2024-03-30)
- Improved visual fidelity of device frames
- Added realistic reflections and lighting effects
- Enhanced device-specific features (buttons, notches, etc.)
- Added realistic status bars and control elements
- Optimized transitions between device types
- Redesigned preview modal with improved UX
- Added direct download capability from preview

### Device Navigation Feature (2024-03-30)
- Added ability to cycle through devices using left/right arrows
- Added device indicators to show current selection
- Implemented smooth animation during device switching

### Device-Specific Wallpaper Download (2024-03-30)
- Added capability to download wallpapers sized for specific devices
- Implemented image resizing and cropping to fit device aspect ratios
- Added tooltips showing download information
- Preserved original download option for full resolution

## Support

### Documentation
- Keep documentation up to date
- Include code examples
- Document API changes

### Issue Management
- Bug reporting guidelines
- Feature request process
- Support ticket handling

## License
MIT License - See LICENSE file for details

## Contact
For questions and support, please refer to the project repository or contact the maintainers. 