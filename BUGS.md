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

*None yet - Phase 3 will populate this section*

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

- [ ] Fix all BLOCKER issues
- [ ] Fix all MAJOR issues
- [ ] Create `.env.example`
- [ ] Update README
- [ ] Run `npm run build` successfully
- [ ] Run `npm run start` and verify production build
- [ ] Configure Vercel environment variables
- [ ] Deploy preview and test
- [ ] Deploy to production