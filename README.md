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
