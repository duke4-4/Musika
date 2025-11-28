# Musika

Modern e-commerce storefront built with Vite + React, Supabase for auth/data, Stripe Checkout for payments, Resend for transactional emails, and an Express API for secure server-side flows.

## Overview

Musika now ships with:

- Supabase-backed authentication, user profiles, products, orders, and real-time tracking.
- Secure checkout flow that validates cart contents on the server, creates Stripe Checkout sessions, and stores orders + line items.
- Stripe webhooks that update order statuses and trigger Resend confirmation emails.
- Live order dashboard that listens to Supabase Realtime updates so customers can watch status changes instantly.

## Features

- 🔐 Email/password registration, login, and password reset powered by Supabase.
- 🛍️ Products, carts, and checkout UI built with shadcn/ui + Tailwind.
- 💳 Stripe sandbox checkout with automatic order creation and status syncing.
- ✉️ Resend order-confirmation emails on successful payment.
- 📦 Real-time order tracking dashboard (Supabase Realtime channel on `orders`).

## Tech Stack

- [Vite](https://vitejs.dev/) + [React 18](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/) + [TanStack Query](https://tanstack.com/query)
- [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- [Supabase](https://supabase.com/) (auth, Postgres, realtime)
- [Stripe](https://stripe.com/docs/payments/checkout)
- [Resend](https://resend.com/) for transactional email
- [Express](https://expressjs.com/) API (`server/index.ts`) runnable with `tsx`

## Getting Started

```bash
git clone https://github.com/your-name/musika.git
cd musika
cp env.example .env        # fill in Supabase/Stripe/Resend keys
npm install
Musika

A mini e-commerce platform built with the latest web technologies, providing a fast and customizable shopping experience.




Tech Stack

- [Next.js](https://nextjs.org/): React framework for production-grade websites and applications.
- [Tailwind CSS](https://tailwindcss.com/): Utility-first CSS framework for rapid and responsive UI design.
- [TypeScript](https://www.typescriptlang.org/): Typed superset of JavaScript for better code reliability and maintainability.



Prerequisites

- [Node.js](https://nodejs.org/) (v16 or newer recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

HOW TO INSTALL

1. Clone the repo

   
   git clone <YOUR_GIT_URL>
   cd <YOUR_PROJECT_NAME>
   

2. Install dependencies

   npm install

# terminal 1 - Vite app
npm run dev                # http://localhost:5173

# terminal 2 - Express API (Stripe webhooks + checkout session)
npm run server             # http://localhost:4000
```

## Environment Variables

All variables live in `env.example`.

| Key | Description |
| --- | --- |
| `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` | Supabase project URL + anon key (client). |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key used by the Express API. |
| `VITE_API_BASE_URL` | Base URL the client calls (default `http://localhost:4000`). |
| `VITE_APP_URL` / `CLIENT_URL` | Public app URL used for Stripe redirect + CORS. |
| `VITE_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key used in the web app. |
| `STRIPE_SECRET_KEY` | Secret key used by the Express API. |
| `STRIPE_WEBHOOK_SECRET` | Secret from `stripe listen` for webhook verification. |
| `RESEND_API_KEY` / `RESEND_FROM_EMAIL` | Optional Resend credentials for order emails. |

## Database schema (Supabase)

Run the SQL below in Supabase (SQL editor) to create tables + relationships. The structure mirrors the TypeScript types used by the UI and API.

```sql
create type public.order_status as enum (
  'pending_payment',
  'paid',
  'processing',
  'shipped',
  'delivered',
  'cancelled'
);

create table public.profiles (
  id uuid primary key references auth.users on delete cascade,
  full_name text,
  phone text,
  address text,
  city text,
  state text,
  zip text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  price numeric not null,
  image text,
  category text,
  stock int default 0,
  rating numeric default 0,
  reviews int default 0,
  created_at timestamptz default now()
);

create table public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users on delete cascade,
  status order_status default 'pending_payment',
  amount_subtotal int not null,
  amount_total int not null,
  currency text default 'usd',
  shipping_address jsonb,
  stripe_session_id text,
  payment_intent text,
  tracking_number text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references public.orders on delete cascade,
  product_id uuid references public.products,
  quantity int not null,
  unit_price int not null,
  created_at timestamptz default now()
);
```

> Use `src/data/products.ts` as a quick reference when seeding the `products` table.

### Enable Realtime + RLS

1. In Supabase **Database → Replication**, enable Realtime for `public.orders` so the dashboard can stream status updates.
2. Turn on Row-Level Security for `products`, `orders`, `order_items`, and `profiles`, then add policies such as:

```sql
-- everyone can read products
create policy "Public read products"
on public.products
for select
to anon, authenticated
using (true);

-- users can see their own orders
create policy "Users read own orders"
on public.orders
for select
to authenticated
using (auth.uid() = user_id);
```

Adjust insert/update policies to suit your admin tools if you plan to mutate data outside the API.

## Stripe + Resend

1. Install & login to the [Stripe CLI](https://stripe.com/docs/stripe-cli).
2. Forward webhooks to the local API:

```bash
stripe listen --events checkout.session.completed,checkout.session.async_payment_failed \
  --forward-to http://localhost:4000/api/webhooks/stripe
```

3. Use the sandbox test card `4242 4242 4242 4242`, any future expiry, and any CVC during checkout.
4. Resend is optional but recommended—set `RESEND_API_KEY` + `RESEND_FROM_EMAIL` to send the confirmation email rendered in `server/index.ts`.

## Useful Commands

| Command | Description |
| --- | --- |
| `npm run dev` | Vite dev server (frontend). |
| `npm run server` | Express API for Stripe + Supabase operations. |
| `npm run build` | Production build of the web app. |
| `npm run lint` | ESLint across the codebase. |

## Testing the flow

1. Start both servers, ensure env vars are populated.
2. Register a user, update profile details on `/account`.
3. Add products to the cart and complete checkout; you’ll be redirected to Stripe.
4. After paying with the sandbox card, you’ll land on `/order-confirmation?session_id=...`.
5. Open `/orders` to watch real-time status changes as the webhook updates the Supabase row.

