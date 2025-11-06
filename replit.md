# AI Services Marketplace - Replit Agent Guide

## Overview

This is a full-stack AI Services Marketplace SaaS platform built with React, Express, and PostgreSQL (via Neon). The platform serves as a marketplace for AI-powered services including AI Influencers, AI Agents, Micro-SaaS solutions, and full SaaS platforms. It features a modern public-facing website with integrated CRM capabilities for managing leads, customers, and sales pipeline.

**Tech Stack:**
- Frontend: React + TypeScript + Vite
- UI: Shadcn/ui components + Tailwind CSS + Framer Motion
- Backend: Express + TypeScript
- Database: PostgreSQL (Neon serverless)
- ORM: Drizzle
- State Management: TanStack Query (React Query)
- Authentication: Session-based (express-session)

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Component Structure:**
- **Pages**: Route-based pages (Home, Services, About, Blog, Admin, Login)
- **Components**: Reusable UI components organized by feature (CRM components in `crm/` subdirectory)
- **Shadcn/ui**: Pre-built accessible components from Radix UI with Tailwind styling
- **Design System**: Custom design tokens defined in `design_guidelines.md` with inspiration from Stripe, Linear, and Vercel

**Key Architectural Decisions:**
- **SPA with Wouter**: Lightweight routing solution chosen over React Router for minimal bundle size
- **Framer Motion**: Used extensively for page transitions and micro-animations (fade-in, slide-up, stagger effects)
- **Theme System**: Custom light/dark theme implementation with CSS variables and localStorage persistence
- **Form Validation**: Currently uses basic state management; TODO items indicate planned migration to React Hook Form + Zod for type-safe validation
- **Public API Routes**: Separate `/api/public/*` endpoints for contact forms and newsletter to bypass authentication

**Design Patterns:**
- Page transition wrapper using Framer Motion variants
- Protected routes via `ProtectedRoute` component checking session auth
- Custom hooks for auth state (`useAuth`) and theme management (`useTheme`)
- Component composition with Radix UI primitives via Shadcn

### Backend Architecture

**Express Server Setup:**
- **Session Management**: Express-session with configurable secrets, HTTP-only cookies, 24-hour expiration
- **Request Logging**: Custom middleware logging all requests with execution time and JSON response capture
- **Raw Body Access**: Special handling for webhook verification (Stripe integration planned)

**Authentication Strategy:**
- Session-based authentication stored in express-session
- Admin users stored in `admin_users` table with bcrypt password hashing
- Separate customer-facing `users` table (currently unused, planned for future features)
- `requireAuth` middleware protects admin routes
- Default admin credentials: username "admin", password "admin" (seeded automatically)

**API Structure:**
- **Admin Routes** (`/api/admin/*`): CRUD for services, CRM (leads, customers, deals, pipeline stages)
- **Public Routes** (`/api/public/*`): Contact form submission, newsletter signup (both save to leads table)
- **Auth Routes** (`/api/auth/*`): Login, logout, session check (`/me`)

**Storage Layer:**
- `storage.ts` defines `IStorage` interface for database operations
- In-memory implementation for development/testing
- Production uses Drizzle ORM with Neon serverless PostgreSQL
- Seed script creates default admin user and pipeline stages on first run

### Data Storage Solutions

**Database Schema (Drizzle):**

**Core Tables:**
- `users`: Customer accounts (username, password, created_at)
- `admin_users`: Admin accounts for dashboard access (username, password, created_at)
- `services`: Service catalog (title, description, category, price, image, features, deliverables, isActive, timestamps)

**CRM Tables:**
- `leads`: Prospective customers (name, email, phone, company, source, status, score, notes, timestamps)
- `customers`: Converted customers (name, email, phone, company, lifetimeValue, satisfaction, status, notes, timestamps)
- `interactions`: Communication history (type, subject, description, date, leadId, customerId, userId)
- `pipeline_stages`: Sales funnel stages (name, order, color)
- `deals`: Sales opportunities (title, value, probability, expectedCloseDate, notes, stageId, leadId, customerId, timestamps)

**Additional Tables:**
- `orders`: Service purchases (serviceId, userId, status, totalAmount, payment details, timestamps)
- `contacts`: General contact form submissions (name, email, subject, message, status, timestamps)

**Key Design Decisions:**
- UUID primary keys using PostgreSQL's `gen_random_uuid()`
- Array columns for features/deliverables (PostgreSQL ARRAY type)
- Soft deletes via `isActive` boolean on services
- Timestamps on all tables for audit trail
- Foreign key relationships: deals → leads/customers, interactions → leads/customers

**Neon PostgreSQL Configuration:**
- Serverless driver (`@neondatabase/serverless`)
- WebSocket constructor override for Node.js compatibility
- Connection string from `DATABASE_URL` environment variable
- Drizzle migrations stored in `./migrations` directory

### Authentication and Authorization

**Admin Authentication:**
- Bcrypt password hashing (10 rounds)
- Session stored in `req.session.adminUserId`
- Login validates credentials, sets session, returns user object
- Logout destroys session
- `/api/auth/me` checks session and returns user or 401

**Security Measures:**
- HTTP-only cookies prevent XSS access to session
- Secure cookies in production (HTTPS only)
- Session secret configurable via environment variable
- Password validation before setting session
- 401 responses for unauthorized access

**Authorization Pattern:**
- `requireAuth` middleware checks `req.session.adminUserId`
- Applied to all `/api/admin/*` routes
- Public routes intentionally bypass authentication
- Frontend `ProtectedRoute` component redirects to `/login` if no user

### External Dependencies

**Third-Party Services:**
- **Neon**: Serverless PostgreSQL database (primary data store)
- **Unsplash**: Image hosting for blog post thumbnails (via CDN URLs)
- **Google Fonts**: Inter font family loaded via CDN

**Planned Integrations (from attached strategy docs):**
- **Supabase**: Migration planned for auth, storage, and realtime features
- **Stripe**: Payment processing (evidence in schema with stripe payment fields, rawBody middleware)

**NPM Dependencies:**

**UI/Frontend:**
- `@radix-ui/*`: 20+ accessible component primitives
- `framer-motion`: Animation library
- `@tanstack/react-query`: Data fetching and state management
- `wouter`: Lightweight routing
- `tailwindcss`: Utility-first CSS framework
- `class-variance-authority`, `clsx`, `tailwind-merge`: Styling utilities

**Backend:**
- `express`: Web server framework
- `express-session`: Session management
- `bcryptjs`: Password hashing
- `@neondatabase/serverless`: Neon database driver
- `drizzle-orm`: TypeScript ORM
- `zod`: Schema validation
- `@hookform/resolvers`: Form validation integration (for planned React Hook Form migration)

**Development:**
- `vite`: Build tool and dev server
- `tsx`: TypeScript execution
- `esbuild`: Production build bundler
- `@replit/*`: Replit-specific development plugins

**Component Libraries:**
- `@dnd-kit/*`: Drag-and-drop for pipeline kanban board
- `react-day-picker`: Calendar/date picker
- `embla-carousel-react`: Carousel component
- `recharts`: Chart visualization

**Icons:**
- `lucide-react`: Icon library
- `react-icons`: Additional icons (social media)

**API/Storage Integration:**
- Fetch API for all HTTP requests (no Axios)
- Custom `apiRequest` utility in `queryClient.ts`
- React Query for caching, refetching, and optimistic updates
- Credentials: "include" for cookie-based auth on all requests