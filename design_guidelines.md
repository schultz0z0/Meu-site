# Design Guidelines: AI Services Marketplace SAAS

## Design Approach: Reference-Based

Drawing inspiration from **Stripe** (professional tech aesthetic), **Linear** (modern minimalism), and **Vercel** (futuristic edge) to create a cutting-edge AI marketplace platform.

**Key Principles:**
- Futuristic sophistication without overwhelming users
- Trust through clean professionalism
- Subtle innovation indicators (gradients, animations)
- Mobile-first clarity

---

## Typography

**Font Stack:**
- Primary: Inter (via Google Fonts CDN) - all UI elements
- Headings: Font weights 700-800, sizes: text-4xl to text-6xl (hero), text-2xl to text-3xl (sections)
- Body: Font weight 400-500, sizes: text-base to text-lg
- Small text: Font weight 400-500, text-sm (labels, captions)
- Code/technical: Font weight 500, mono font for API keys or technical details

---

## Layout System

**Spacing Primitives:** Use Tailwind units: **2, 4, 6, 8, 12, 16, 20, 24** (p-8, m-12, gap-6, etc.)

**Container Strategy:**
- Full-width sections with inner `max-w-7xl mx-auto px-6` for content
- Service cards: `max-w-sm` to `max-w-md`
- Admin forms: `max-w-2xl`
- Text content: `max-w-prose`

**Grid Patterns:**
- Service catalog: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` with `gap-8`
- Feature highlights: `grid-cols-1 lg:grid-cols-2` for side-by-side layouts
- Admin dashboard: Sidebar layout `grid-cols-[280px,1fr]` on desktop, stacked on mobile

---

## Component Library

### Navigation
- **Header**: Transparent over hero, solid on scroll with blur backdrop, sticky top-0
- **Logo + Nav links** (left) + **Auth/CTA buttons** (right)
- Mobile: Hamburger menu with slide-in drawer
- Admin navigation: Persistent left sidebar (280px) with collapsible sections

### Hero Section
- Full viewport height (min-h-screen) with gradient background overlay
- Large hero image showing futuristic AI/tech workspace
- Centered content: H1 (text-5xl/6xl), subtitle (text-xl), dual CTAs
- Subtle parallax scroll effect on background
- Floating gradient orbs (decorative, animated with blur)

### Service Cards
- Elevated cards with subtle border and hover lift effect
- Card structure: Image thumbnail (aspect-video), category tag, title (text-xl font-bold), description (text-sm), pricing, CTA button
- Hover: Slight scale transform and glow effect

### Buttons
- Primary CTA: Gradient background (purple to blue), text-white, rounded-lg, px-8 py-4
- Secondary: Border with gradient, transparent background
- Buttons over images: Backdrop blur (backdrop-blur-md) with semi-transparent background
- No custom hover states (use default button behavior)

### Forms (Admin & Checkout)
- Single-column layouts with clear labels above inputs
- Input fields: border, rounded-lg, px-4 py-3, focus ring with gradient
- Textarea for descriptions
- File upload zones with drag-drop indication
- Multi-step checkout with progress indicator

### Dashboard Components
- **Stat cards**: Grid of metric cards showing numbers (orders, revenue, services)
- **Data tables**: Striped rows, sortable headers, action buttons per row
- **Charts**: Use Chart.js or similar for analytics visualization

### Modals & Overlays
- Centered modal with backdrop blur
- Close button (top-right)
- Max-width constraints (max-w-2xl)
- Smooth fade-in/scale animation

---

## Visual Treatment

**Gradient System:**
- Primary gradient: Purple (#8B5CF6) → Blue (#3B82F6) → Cyan (#06B6D4)
- Apply to: Hero backgrounds, CTAs, accent elements, card borders on hover
- Use sparingly: Don't gradient everything, mostly on key elements

**Glass Morphism:**
- Navigation bar (when scrolled): backdrop-blur-lg with semi-transparent background
- Buttons over images: backdrop-blur-md
- Modal overlays: backdrop-blur-sm

**Elevation:**
- Cards: subtle shadow, increased on hover
- Floating elements: Stronger shadows for depth
- Layering: Use z-index strategically (nav: z-50, modals: z-40, content: z-10)

---

## Animations

**Usage:** Minimal and purposeful only

**Allowed Animations:**
- Hero gradient background: Slow, subtle shift/pulse (15-20s duration)
- Card hover: Transform scale (1.02) with 200ms ease
- Page transitions: Fade-in on route change
- Parallax: Hero background moves slower than foreground (transform: translateY)
- Loading states: Skeleton screens with shimmer effect

**Forbidden:**
- Excessive scroll-triggered animations
- Auto-playing carousels
- Distracting floating elements
- Over-animated buttons

---

## Page-Specific Layouts

### Landing Page
1. **Hero**: Full-height with gradient, large heading, dual CTAs, floating decorative elements
2. **Featured Services**: 3-column grid showcasing top AI services
3. **Categories Section**: Icon cards for each service type (Influencer AI, Agents, SaaS, etc.)
4. **Social Proof**: Client testimonials in 2-column layout with avatars
5. **Stats Bar**: Single row showing key metrics (services delivered, clients, satisfaction rate)
6. **Final CTA**: Centered section with gradient background
7. **Footer**: Multi-column with links, newsletter signup, social icons

### Service Catalog
- Filter sidebar (left, collapsible on mobile): Categories, price range, ratings
- Main content: Grid of service cards with pagination
- Sort dropdown (top-right): Popular, newest, price
- Breadcrumb navigation above content

### Service Detail
- Two-column layout: Image gallery (left), details (right)
- Tabs for: Overview, Features, Pricing, Examples, Reviews
- Sticky CTA button (right column) that follows scroll
- Related services carousel at bottom

### Admin Panel
- Persistent left sidebar navigation
- Top bar: Breadcrumbs, user profile dropdown
- Main content area: Forms or tables based on section
- Action buttons consistently positioned (top-right)

---

## Images

**Hero Section:**
- Large, high-quality image of futuristic workspace with AI/holographic elements
- Apply gradient overlay (purple to blue, 60% opacity) for text readability
- Parallax scroll effect on image

**Service Cards:**
- 16:9 aspect ratio thumbnails representing each service type
- Consistent style: Modern, tech-focused, professional stock imagery

**Testimonial Section:**
- Circular avatar images (96px diameter) for clients
- Optional: Company logos below testimonials

**About/Team (if included):**
- Professional headshots in consistent style

---

## Icon Library

**Use:** Heroicons (via CDN)
- Navigation icons (menu, close, user, settings)
- Feature icons (sparkles for AI, code, rocket, users)
- Action icons (edit, delete, view, download)
- Status indicators (check, warning, info)

---

## Accessibility

- Maintain WCAG 2.1 AA contrast ratios (especially text over gradients)
- Focus indicators on all interactive elements (ring with gradient)
- Keyboard navigation support throughout
- ARIA labels for icon-only buttons
- Form validation with clear error messages below inputs
- Skip-to-content link for main navigation