# AEROM Ecommerce

Premium Next.js storefront with PostgreSQL, Prisma, and an admin dashboard.

## Requirements

- Node.js 20+
- PostgreSQL 14+

## Setup

```bash
cp .env.example .env
# Edit DATABASE_URL and ADMIN_SECRET

npm install
npm run db:push
npm run db:seed
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Admin: [http://localhost:3000/admin/login](http://localhost:3000/admin/login) (use `ADMIN_SECRET` from `.env`).

## Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `ADMIN_SECRET` | Yes | Password for admin login |
| `NEXT_PUBLIC_SITE_URL` | Production | Canonical site URL for sitemap/SEO |

## Production deploy

1. Provision PostgreSQL and set `DATABASE_URL`.
2. Set a strong `ADMIN_SECRET` and `NEXT_PUBLIC_SITE_URL` (e.g. `https://yourdomain.com`).
3. Run migrations and seed:

```bash
npm run db:push
npm run db:seed
```

4. Build and start:

```bash
npm run build
npm run start
```

### Vercel

- Add the same env vars in the project settings.
- Use a hosted Postgres (Neon, Supabase, RDS).
- `postinstall` runs `prisma generate` automatically.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run db:push` | Sync Prisma schema to database |
| `npm run db:seed` | Seed categories, products, coupons |

## Discount codes

Seed includes `WELCOME10` (10% off, min order ৳100). Apply at checkout.
