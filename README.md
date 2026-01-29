# AI Website Builder

A powerful AI-powered website builder with drag-and-drop visual editing, AI content generation, and instant preview capabilities.

## Features

- 🎨 **Visual Drag & Drop Editor** - Intuitive interface for building websites
- 🤖 **AI Content Generation** - Generate page content, copy, and designs with AI
- 📱 **Responsive Design** - Build mobile-friendly websites
- 🎯 **Component Library** - Pre-built components (Hero, Features, Contact, etc.)
- 🔍 **Live Preview** - See changes in real-time
- 💾 **Export Code** - Get clean HTML/CSS/JS code
- 🎭 **Templates** - Start with professional templates
- ⚡ **Fast & Modern** - Built with React, Vite, and Tailwind CSS

## Quick Start

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Add your OpenAI API key to .env

# Start development server
npm run dev

# Start backend API (in another terminal)
npm run server
```

## Project Structure

```
ai-web-builder/
├── src/
│   ├── components/         # React components
│   │   ├── Builder/       # Visual editor components
│   │   ├── Canvas/        # Drag & drop canvas
│   │   ├── ComponentLibrary/ # Available components
│   │   ├── Preview/       # Live preview
│   │   └── AI/            # AI generation UI
│   ├── lib/               # Utilities and helpers
│   ├── types/             # TypeScript types
│   ├── templates/         # Pre-built templates
│   └── App.tsx            # Main application
├── server/                # Backend API
│   ├── index.ts          # Express server
│   └── ai.ts             # AI generation logic
└── public/               # Static assets
```

## Core Components

### Builder
The main editor interface with toolbar, component library, and canvas.

### Canvas
Drag & drop area where users build their websites. Supports:
- Component dragging
- Inline editing
- Responsive preview
- Layer management

### AI Generator
AI-powered content generation for:
- Page layouts
- Marketing copy
- Image suggestions
- Color schemes
- Complete sections

### Component Library
Pre-built components:
- Hero sections
- Feature grids
- Testimonials
- Pricing tables
- Contact forms
- Footers
- Navigation bars

## API Endpoints

### POST /api/generate
Generate AI content for website sections.

**Request:**
```json
{
  "prompt": "Create a hero section for a SaaS startup",
  "type": "hero" | "features" | "full-page",
  "style": "modern" | "minimal" | "bold"
}
```

**Response:**
```json
{
  "component": {
    "type": "hero",
    "content": {...},
    "html": "<section>...</section>"
  }
}
```

### POST /api/export
Export the website as HTML/CSS/JS.

**Request:**
```json
{
  "components": [...],
  "styles": {...}
}
```

**Response:**
```json
{
  "html": "...",
  "css": "...",
  "js": "..."
}
```

## Environment Variables

```env
VITE_API_URL=http://localhost:3001
OPENAI_API_KEY=your_openai_api_key_here
PORT=3001
```

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS
- **Drag & Drop**: react-dnd
- **Backend**: Express.js, Node.js
- **AI**: OpenAI GPT-4
- **Styling**: Tailwind CSS, PostCSS
- **Icons**: Lucide React

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment

### Vercel (Recommended)
```bash
vercel deploy
```

### Docker
```bash
docker build -t ai-web-builder .
docker run -p 3000:3000 -p 3001:3001 ai-web-builder
```

### Manual
```bash
npm run build
# Serve the dist folder with any static host
```

## Usage Examples

### 1. Build from Scratch
1. Drag components from the library to the canvas
2. Edit text inline by clicking
3. Adjust styles with the properties panel
4. Preview on different devices
5. Export your website

### 2. Use AI Generation
1. Click "Generate with AI"
2. Describe your website (e.g., "landing page for a fitness app")
3. AI generates a complete layout
4. Customize and refine
5. Export

### 3. Start from Template
1. Browse template gallery
2. Select a template
3. Customize colors, content, and layout
4. Export your website

## Key Features in Detail

### Visual Editor
- Real-time editing
- Undo/redo support
- Copy/paste components
- Layer management
- Grid and spacing guides

### AI Integration
- Content generation
- Layout suggestions
- Color palette generation
- Image recommendations
- SEO optimization

### Export Options
- Clean HTML/CSS/JS
- React components
- WordPress theme
- Static site generator compatible

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

Contributions are welcome! Please read CONTRIBUTING.md for details.

## License

MIT License - see LICENSE file for details.

## Support

For issues and questions:
- GitHub Issues: [Report a bug](https://github.com/yourusername/ai-web-builder/issues)
- Email: support@example.com

## Roadmap

- [ ] Multi-page support
- [ ] Custom component creation
- [ ] Team collaboration
- [ ] Version history
- [ ] A/B testing
- [ ] Analytics integration
- [ ] CMS integration
- [ ] E-commerce components
- [ ] Form builder
- [ ] Animation editor

## Credits

Built with ❤️ using modern web technologies.
