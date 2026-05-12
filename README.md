# 📚 LivroSaaS

Programming e-book subscription SaaS platform with monthly curated technical books, built with **Next.js 15**, **Stripe**, **Turso DB**, and **NextAuth**.

## 🚀 Tech Stack

### Frontend
- **[Next.js 15](https://nextjs.org/)** — App Router, Turbopack, Server Actions, Middleware
- **[React 19](https://react.dev/)** — Server Components, `useActionState`
- **[TypeScript](https://www.typescriptlang.org/)** — Static typing
- **[Tailwind CSS](https://tailwindcss.com/)** + **[shadcn/ui](https://ui.shadcn.com/)** — Components and styling
- **[Radix UI](https://www.radix-ui.com/)** — Accessible components (Dropdown, Dialog, Label)
- **[Lucide](https://lucide.dev/)** — Icons
- **[next-intl](https://next-intl-docs.vercel.app/)** — Internationalization (pt-BR / en-US)

### Authentication
- **[NextAuth v5](https://next-auth.js.org/)** (beta) — Credentials provider (email + password)
- **[bcrypt-ts](https://github.com/elithrar/bcrypt-ts)** — Password hashing

### Database
- **[Prisma](https://www.prisma.io/)** + **[Turso](https://turso.tech/)** — ORM with edge SQLite database (LibSQL)
- **[@libsql/client](https://github.com/tursodatabase/libsql-client-ts)** — Turso client

### Payments
- **[Stripe](https://stripe.com/)** v17 — Embedded checkout, recurring subscriptions

### Tooling
- **ESLint** + **PostCSS**

## ✨ Features

- ✅ Email/password registration and login
- ✅ Protected dashboard with redirect
- ✅ Monthly subscription via Stripe (Embedded Checkout)
- ✅ Subscription cancellation
- ✅ Monthly e-book download
- ✅ Internationalization pt-BR / en-US
- ✅ Language switcher in navigation
- ✅ Responsive design

## 🧱 Project Structure

```
app/
├── [locale]/               # Internationalized pages
│   ├── (auth)/             # Login and registration
│   ├── (checkout)/         # Payment confirmation
│   └── dashboard/          # Dashboard and subscription
├── api/
│   ├── auth/[...nextauth]  # NextAuth route handler
│   └── checkout/           # Stripe checkout session
├── assets/                 # Images and icons
├── fonts/                  # Local fonts
├── layout.tsx              # Root layout
└── globals.css             # Global styles

components/                 # Reusable components
│   ├── ui/                 # shadcn/ui components
│   ├── payment-button.tsx  # Stripe payment button
│   ├── pricing-card.tsx    # Pricing plan card
│   ├── locale-switcher.tsx # Language switcher
│   └── ...

i18n/                       # next-intl configuration
├── routing.ts
└── request.ts

messages/                   # Translation files
├── pt-BR.json
└── en-US.json

prisma/
├── schema.prisma           # Data model
└── migrations/             # Database migrations
```

## ⚙️ Getting Started

1. **Clone the repository**

```bash
git clone <your-repo>
cd mp-saas-com-nextjs-e-stripe
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables** (copy `.env.copy` to `.env` and fill in)

```env
TURSO_AUTH_TOKEN="your-turso-token"
TURSO_DATABASE_URL="libsql://..."
AUTH_URL="http://localhost:3000"
AUTH_SECRET="your-secret"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="..."
STRIPE_SECRET_KEY="..."
STRIPE_WEBHOOK_SECRET="..."
STRIPE_CUSTOMER_PORTAL_URL="..."
```

4. **Prepare the database**

```bash
npx prisma db push
npx prisma generate
```

5. **Run the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## 🌐 Internationalization

- **pt-BR** (default) — accessible at `/` or `/pt-BR/`
- **en-US** — accessible at `/en-US/`
- Automatic language detection via browser (`next-intl` middleware)
- Manual switch via the 🌐 button in navigation

## 📄 License

GPL v3 — see [LICENSE](LICENSE).
