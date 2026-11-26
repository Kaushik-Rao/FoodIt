# FoodIt - Restaurant Ordering Application

**Live site:** https://kaushik-food-it.vercel.app

A full-stack restaurant ordering and management application built with Next.js 13, featuring user authentication, shopping cart, Stripe payments, and admin order management.

## Features

- **User Authentication**: Google OAuth via NextAuth.js
- **Menu Browsing**: Categories and products with images
- **Shopping Cart**: Persistent cart with quantity/options management (Zustand)
- **Checkout**: Stripe Payment Elements integration
- **Order Tracking**: User order history and admin order management
- **Responsive Design**: Mobile-first with Tailwind CSS

## Tech Stack

- **Framework**: Next.js 13.5 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js (Google OAuth)
- **Payments**: Stripe
- **State Management**: Zustand (cart), TanStack Query (server state)
- **Styling**: Tailwind CSS
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 20+
- PostgreSQL database
- Stripe account (for payments)
- Google Cloud Console project (for OAuth)

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd FoodIt
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```
Edit `.env` with your credentials (see [Environment Variables](#environment-variables)).

4. Set up the database:
```bash
npx prisma migrate dev --name init
npx prisma db seed  # if seed script exists
```

5. Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `NEXTAUTH_SECRET` | Secret for NextAuth (min 32 chars) | Yes |
| `NEXTAUTH_URL` | Your app URL (local: http://localhost:3000, production: https://kaushik-food-it.vercel.app) | Yes |
| `GOOGLE_ID` | Google OAuth Client ID | Yes |
| `GOOGLE_SECRET` | Google OAuth Client Secret | Yes |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key | Yes |
| `STRIPE_SECRET_KEY` | Stripe secret key | Yes |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook secret (for production) | No |

### Getting Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs — one per environment you sign in from:
   - Local: `http://localhost:3000/api/auth/callback/google`
   - Production: `https://kaushik-food-it.vercel.app/api/auth/callback/google`
6. Copy Client ID and Secret to `.env`

### Getting Stripe Keys

1. Create a [Stripe account](https://stripe.com)
2. Get test keys from [Stripe Dashboard](https://dashboard.stripe.com/test/apikeys)
3. For production, set up a webhook endpoint at `/api/webhooks/stripe`

## Project Structure

```
src/
├── app/
│   ├── api/                    # API routes
│   │   ├── auth/[...nextauth]/ # NextAuth configuration
│   │   ├── categories/         # Category CRUD
│   │   ├── products/           # Product CRUD
│   │   ├── orders/             # Order management
│   │   └── checkout/           # Stripe payment intents
│   ├── page.tsx                # Homepage (hero, featured, offer)
│   ├── menu/                   # Menu pages
│   ├── product/[id]/           # Product detail
│   ├── cart/                   # Shopping cart
│   ├── pay/[id]/               # Stripe checkout
│   ├── success/                # Payment success
│   ├── login/                  # Login page
│   └── orders/                 # Order history
├── components/                 # React components
├── utils/
│   ├── auth.ts                 # NextAuth config
│   ├── connect.ts              # Prisma client
│   └── store.ts                # Zustand cart store
└── types/
    └── types.ts                # TypeScript types
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production (runs `prisma generate` first)
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run seed` - Seed the database with categories and products
- `npx prisma studio` - Open Prisma database GUI

## Deployment

### Vercel (Recommended)

The production app runs at **https://kaushik-food-it.vercel.app** and deploys from the `main` branch of this repository — every push triggers a new build.

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Database Setup for Production

Production runs on **Neon** (provisioned through the Vercel Marketplace).

1. Provision PostgreSQL (Neon, Supabase, Vercel Postgres, etc.)
2. Run migrations: `npx prisma migrate deploy`
3. Seed the database: `npm run seed`
4. Set `DATABASE_URL` in the Vercel environment variables

> **Neon + Prisma:** Prisma rejects the `channel_binding=require` parameter that Neon adds to its connection strings, so drop it and enable the pooler explicitly:
> `postgresql://USER:PASSWORD@HOST/neondb?sslmode=require&pgbouncer=true`
> `vercel env pull` gives you the raw URL; `DATABASE_URL_UNPOOLED` is available as a fallback.

## License

MIT License - feel free to use for your portfolio!

## Live Demo

**[https://kaushik-food-it.vercel.app](https://kaushik-food-it.vercel.app)**

Production: `https://kaushik-food-it.vercel.app` · Vercel alias: `https://food-it-kaushiks-projects-9e6b9e3c.vercel.app`
