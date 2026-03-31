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
# AI Web Builder Platform

An AI-powered web builder that generates complete, production-ready React/Next.js applications from natural language descriptions. Built with Next.js 14, TypeScript, Tailwind CSS, and powered by OpenAI GPT-4 and Anthropic Claude 3.5 Sonnet.

## 🚀 Features

- **AI-Powered Generation**: Describe your website in natural language and let AI create it for you
- **Multi-Model Architecture**: Uses Claude 3.5 Sonnet for intent parsing and GPT-4 for code generation
- **Production-Ready Code**: Generates clean, maintainable Next.js/React/TypeScript code
- **Component-Based**: Creates reusable React components following best practices
- **Database Integration**: Complete data model with Prisma ORM and PostgreSQL
- **Real-time Preview**: See your generated website instantly
- **Version Control**: Track changes and rollback when needed
- **Project Management**: Organize multiple projects with ease
- **Deployment Ready**: Structured for easy deployment to Vercel, Netlify, or Spaceship

## 🏗️ Architecture

### Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL with Prisma ORM
- **AI Models**: 
  - OpenAI GPT-4 (Code Generation)
  - Anthropic Claude 3.5 Sonnet (Intent Parsing)
- **UI Components**: Radix UI primitives
- **Authentication**: NextAuth.js (ready for integration)

### Project Structure

```
ai-web-builder/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── ai/           # AI generation endpoints
│   │   ├── projects/     # Project management
│   │   ├── auth/         # Authentication (ready)
│   │   └── templates/    # Template management (ready)
│   └── page.tsx          # Homepage
├── components/            # React components
│   ├── ui/               # UI primitives (Button, Card, etc.)
│   ├── editor/           # Code editor components (ready)
│   ├── preview/          # Live preview components (ready)
│   ├── chat/             # AI chat interface (ready)
│   └── dashboard/        # Dashboard components (ready)
├── lib/                   # Core libraries
│   ├── ai/               # AI orchestration
│   │   └── orchestrator.ts  # Main AI coordinator
│   ├── db/               # Database utilities
│   │   └── prisma.ts     # Prisma client
│   ├── types.ts          # TypeScript type definitions
│   └── utils.ts          # Helper functions
├── prisma/
│   └── schema.prisma     # Database schema
└── README.md
```

### Database Schema

The platform includes 11 comprehensive models:

- **User**: User accounts and authentication
- **Project**: User projects with metadata
- **ProjectVersion**: Version control for projects
- **Component**: Reusable components
- **Page**: Individual pages within projects
- **Asset**: Images, fonts, and other media
- **Deployment**: Deployment tracking
- **Template**: Pre-built templates
- **Subscription**: User subscription management
- **Collaborator**: Team collaboration
- **ApiKey**: API access management

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database
- OpenAI API key
- Anthropic API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/mperkins0155/ai-web-builder.git
cd ai-web-builder
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and add your credentials:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/ai_web_builder"
OPENAI_API_KEY="sk-..."
ANTHROPIC_API_KEY="sk-ant-..."
NEXTAUTH_SECRET="your-secret-key"
```

4. Initialize the database:
```bash
npx prisma migrate dev --name init
npx prisma generate
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## 💡 How It Works

### AI Orchestration Pipeline

1. **Intent Parsing** (Claude 3.5 Sonnet)
   - Analyzes user's natural language description
   - Extracts pages, features, style preferences, and components needed
   - Returns structured JSON with requirements

2. **Code Generation** (GPT-4)
   - Takes parsed intent and generates complete React/Next.js code
   - Follows modern best practices and patterns
   - Uses TypeScript for type safety
   - Implements Tailwind CSS for styling

3. **Validation & Auto-Fix**
   - Validates generated code for common issues
   - Checks for security vulnerabilities
   - Automatically fixes errors when possible
   - Returns production-ready code

4. **Project Creation**
   - Saves generated code to database
   - Creates project structure
   - Enables version control
   - Prepares for deployment

### Example Usage

```typescript
// Simple example: Generate a website
const response = await fetch('/api/ai/generate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    prompt: 'Create a modern landing page for a SaaS startup',
    style: 'modern',
  }),
})

const { success, pages, components } = await response.json()
```

## 🔑 API Endpoints

### AI Generation

**POST /api/ai/generate**
```json
{
  "prompt": "Create a landing page for...",
  "style": "modern",
  "pages": ["Home", "About"],
  "features": ["contact form", "testimonials"]
}
```

### Project Management

**GET /api/projects?userId={userId}**
- List all projects for a user

**POST /api/projects**
```json
{
  "name": "My Project",
  "description": "Project description",
  "userId": "user_id"
}
```

## 🎨 Styling & Design

The platform uses a modern, gradient-based design system:

- **Primary Colors**: Indigo, Purple, Pink gradients
- **Typography**: System fonts with careful hierarchy
- **Components**: Built with Radix UI for accessibility
- **Responsive**: Mobile-first design approach
- **Animations**: Smooth transitions and micro-interactions

## 🔐 Security

- Input validation with Zod schemas
- SQL injection prevention with Prisma
- XSS protection in generated code
- Environment variable protection
- API rate limiting (ready for implementation)
- Authentication with NextAuth.js (ready for integration)

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npx prisma generate
RUN npm run build
CMD ["npm", "start"]
```

## 📊 Performance

- Server-side rendering for fast initial loads
- Optimized API routes with edge functions
- Database query optimization with Prisma
- Lazy loading for components
- Image optimization with Next.js Image

## 🛣️ Roadmap

### Phase 1: MVP (Current)
- ✅ AI code generation pipeline
- ✅ Basic project management
- ✅ Modern landing page
- ✅ Database schema
- ✅ API endpoints

### Phase 2: Enhanced Features
- 🔄 Visual drag-and-drop editor
- 🔄 WebContainer-based live preview
- 🔄 AI chat interface for refinements
- 🔄 Template library
- 🔄 Real-time collaboration

### Phase 3: Production Features
- 🔄 One-click deployment to multiple platforms
- 🔄 Custom domain management
- 🔄 Analytics integration
- 🔄 A/B testing capabilities
- 🔄 Advanced version control with branching

### Phase 4: Enterprise
- 🔄 Team workspaces
- 🔄 Role-based access control
- 🔄 SSO integration
- 🔄 Advanced analytics dashboard
- 🔄 White-label options

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

MIT License - see LICENSE file for details

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- AI powered by [OpenAI](https://openai.com/) and [Anthropic](https://anthropic.com/)
- UI components from [Radix UI](https://radix-ui.com/)
- Styling with [Tailwind CSS](https://tailwindcss.com/)

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

**Made with ❤️ and AI**
# ai-web-builder

AI-powered web builder platform for creating modern web applications.
