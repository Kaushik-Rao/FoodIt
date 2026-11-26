# Bug Report - FoodIt Restaurant Ordering App

## Summary
This document tracks all issues found during the audit of the FoodIt project, organized by severity.

---

## 🔴 BLOCKER Issues (Must Fix Before Deploy)

### 1. Hardcoded `localhost:3000` API URLs in Server Components
**Files Affected:**
- `src/app/menu/page.tsx:6`
- `src/app/menu/[category]/page.tsx:8`
- `src/app/product/[id]/page.tsx:8`
- `src/components/Featured.tsx:6`
- `src/app/cart/page.tsx:22`
- `src/app/pay/[id]/page.tsx:21`
- `src/app/success/page.tsx:14`
- `src/app/orders/page.tsx:23`
- `src/components/DeleteButton.tsx:21`

**Problem:** All server-side data fetching uses `http://localhost:3000/api/...` which will fail in production.

**Fix:** Use relative URLs (`/api/...`) or construct absolute URL from `headers()`.

---

### 2. Products API Ignores Category Filter (`?cat=` param)
**File:** `src/app/api/products/route.ts`

**Problem:** The GET handler fetches ALL products, ignoring the `cat` query parameter used by `menu/[category]/page.tsx`.

**Fix:** Add query parameter parsing and filter by `catSlug`.

---

### 3. Create Intent Uses Hardcoded Amount (10000 cents)
**File:** `src/app/api/(checkout)/create-intent/[orderId]/route.ts:20`

**Problem:** `amount: 100 * 100` should use the actual order price from the database.

**Fix:** Calculate amount from `order.price * 100` (convert to cents).

---

### 4. Stripe Checkout `return_url` Hardcoded to localhost
**File:** `src/components/CheckoutForm.tsx:66`

**Problem:** `return_url: "http://localhost:3000/success"` won't work in production.

**Fix:** Use environment variable or construct from `window.location.origin`.

---

### 5. Cart Store `addToCart` Price Calculation Bug
**File:** `src/utils/store.ts:28-29`

**Problem:** When item already exists in cart, it adds `item.price` (which is already total = unit * quantity) instead of unit price.

```typescript
// Current buggy code:
price: item.price + product.price,  // Wrong: adds total to total
```

**Fix:** Track unit price separately or calculate correctly.

---

### 6. Missing `/add` Admin Route
**File:** `src/components/CartIcon.tsx:21` references `/add` which doesn't exist.

**Problem:** Admin users see "Add product" button linking to non-existent route.

**Fix:** Either create the admin product creation page or remove the link.

---

## 🟠 MAJOR Issues (Should Fix)

### 7. Order Status Update No Validation
**File:** `src/app/api/orders/[id]/route.ts:19`

**Problem:** Accepts any string as status without validation.

**Fix:** Validate against allowed statuses (e.g., "Not Paid!", "Being prepared!", "Out for delivery", "delivered").

---

### 8. Facebook OAuth Button Non-Functional
**Files:** `src/app/login/page.tsx:44-53`, `src/utils/auth.ts`

**Problem:** Facebook login button exists but provider not configured in NextAuth.

**Fix:** Add Facebook provider or remove button.

---

### 9. API Error Responses Inconsistent
**Files:** All API routes

**Problem:** Some return `NextResponse` with JSON, others return plain strings. Error messages vary.

**Fix:** Standardize error response format.

---

### 10. No Database Connection Error Handling in Build
**Problem:** Build fails if database unavailable (as seen in `npm run build`).

**Fix:** Add `output: 'standalone'` or handle build-time data fetching gracefully.

---

## 🟡 MINOR Issues (Nice to Fix)

### 11. CountDown Uses Past Date (2024-07-25)
**File:** `src/components/CountDown.tsx:6`

**Fix:** Use future date or make configurable.

---

### 12. Placeholder Text in Offer Component
**File:** `src/components/Offer.tsx:11-13`

**Problem:** "Progressively simplify effective e-toilers..." is lorem ipsum.

**Fix:** Replace with actual marketing copy.

---

### 13. No `.env.example` File
**Problem:** New developers don't know required environment variables.

**Fix:** Create `.env.example` with all required vars (no secrets).

---

### 14. README is Default Next.js Template
**File:** `README.md`

**Fix:** Write project-specific documentation.

---

### 15. Netlify Config Present but Deploying to Vercel
**Files:** `netlify.toml`, `public/_redirects`

**Fix:** Remove or update for Vercel.

---

### 16. Accessibility Issues
- Missing `alt` text on many `<Image>` components (empty string `alt=""`)
- Form inputs missing labels
- Color contrast issues (red text on various backgrounds)

---

### 17. Duplicate `useCartStore.persist.rehydrate()` Calls
**Files:** `src/components/CartIcon.tsx:13-19`, `src/components/Price.tsx:15-17`, `src/app/cart/page.tsx:13-15`

**Fix:** Call once in a layout or provider.

---

### 18. Hardcoded Phone Number in Navbar
**File:** `src/components/Navbar.tsx:30`

**Fix:** Move to config/env.

---

### 19. TypeScript `any` Types / Loose Typing
**Files:** Various API routes use loose types.

**Fix:** Add proper TypeScript interfaces.

---

### 20. No Tests
**Problem:** Zero test coverage.

**Fix:** Add unit/integration tests for critical paths (cart, checkout, auth).

---

## ✅ FIXED (Track Progress Here)

Fixed while deploying the app to Vercel (production: https://kaushik-food-it.vercel.app):

- **#1 — Hardcoded `localhost:3000` API URLs**: server components now use the shared
  `src/utils/api.ts` helper, which builds the base URL from the request `host` header.
- **#2 — Products API ignored the `cat` filter**: `src/app/api/products/route.ts` now
  parses `?cat=` and filters on `catSlug`.
- **#3 — Create intent used a hardcoded amount**: the PaymentIntent amount is now
  `order.price * 100` from the database.
- **#4 — Stripe `return_url` hardcoded to localhost**: the checkout flow uses Stripe
  Payment Elements with a client-side redirect, so no `return_url` is sent.
- **#5 — Cart store `addToCart` price calculation**: the store now derives the unit
  price (`item.price / item.quantity`) before recomputing the line total.
- **#7 — Order status update had no validation**: `src/utils/validation.ts` validates
  the status against `ORDER_STATUSES` before the database write.
- **#8 — Facebook OAuth button non-functional**: the unused Facebook button was removed.
- **#10 — Build failed when the database was unreachable**: `prisma generate` was moved
  into the build script and the app fetches data at request time, so builds no longer
  need a live database.
- **#13 — No `.env.example`**: added, with production notes for `NEXTAUTH_URL` and the
  Google OAuth redirect URIs.
- **#14 — README was the default template**: replaced with project documentation,
  including the live URL and the real Neon/Vercel deployment steps.
- **#15 — Netlify config present while deploying to Vercel**: `netlify.toml` and
  `public/_redirects` are gone.

Also fixed during the deployment: `outputFileTracing: false` in `next.config.js` was
stripping server files from the Vercel bundle (runtime 500s), `zod` v4 changed
`err.errors` to `err.issues`, and the `/success` page needed a `Suspense` boundary
around `useSearchParams()` to prerender.

### Still open

- **#6 — Missing `/add` admin route**: `src/components/CartIcon.tsx` still links to
  `/add`, which does not exist.
- **#9, #11, #12, #16–#20**: still outstanding.

---

## Environment Variables Required

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `NEXTAUTH_SECRET` | NextAuth encryption secret | Yes |
| `GOOGLE_ID` | Google OAuth client ID | Yes |
| `GOOGLE_SECRET` | Google OAuth client secret | Yes |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key | Yes |
| `STRIPE_SECRET_KEY` | Stripe secret key | Yes |

---

## Deployment Checklist

- [x] Fix all BLOCKER issues
- [x] Fix all MAJOR issues
- [x] Create `.env.example`
- [x] Update README
- [x] Run `npm run build` successfully
- [x] Run `npm run start` and verify production build
- [x] Configure Vercel environment variables
- [x] Deploy preview and test
- [x] Deploy to production — https://kaushik-food-it.vercel.app

Production stack: Vercel (Next.js 13.5) + Neon PostgreSQL + Stripe test keys.
`DATABASE_URL` for Prisma must drop Neon's `channel_binding` parameter and add
`pgbouncer=true`; see the README for the exact format.