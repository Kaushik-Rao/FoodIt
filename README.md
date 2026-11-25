# FoodIt - Restaurant Ordering Application

A full-stack restaurant ordering and management application built with Next.js 13, featuring user authentication, shopping cart, Stripe payments, and admin order management.

## Features

- **User Authentication**: Google OAuth via NextAuth.js
- **Menu Browsing**: Categories and products with images
- **Shopping Cart**: Persistent cart with quantity/options management (Zustand)
- **Checkout**: Stripe Payment Elements integration
- **Order Tracking**: User order history and admin order management
- **Responsive Design**: Mobile-first with Tailwind CSS

## Tech Stack

- **Framework**: Next.js 13.4 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js (Google OAuth)
- **Payments**: Stripe
- **State Management**: Zustand (cart), TanStack Query (server state)
- **Styling**: Tailwind CSS
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+
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
| `NEXTAUTH_URL` | Your app URL (e.g., http://localhost:3000) | Yes |
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
5. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
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
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npx prisma studio` - Open Prisma database GUI

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Database Setup for Production

1. Provision PostgreSQL (Vercel Postgres, Supabase, Neon, etc.)
2. Run migrations: `npx prisma migrate deploy`
3. Update `DATABASE_URL` in Vercel environment variables

## License

MIT License - feel free to use for your portfolio!

## Live Demo

[Add your Vercel deployment URL here]