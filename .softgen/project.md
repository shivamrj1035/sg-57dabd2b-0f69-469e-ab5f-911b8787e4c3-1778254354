# Multi-Tenant Vendor SaaS Platform

## Vision
A centralized SaaS platform enabling local vendors/shop owners to create online storefronts with product catalogs, inventory management, and WhatsApp-based ordering. Super admins manage multiple vendors, vendors manage their products and store customization, and customers browse and order via WhatsApp.

**Target Users**: Platform owners (super admins), local shop owners (vendors), end customers

## Design
Color System (HSL):
- `--primary: 220 85% 45%` (deep professional blue)
- `--secondary: 220 15% 50%` (slate gray)
- `--accent: 142 76% 36%` (success green)
- `--muted: 220 15% 95%` (light gray background)
- `--background: 0 0% 100%` (white)
- `--foreground: 222 47% 11%` (dark slate text)
- `--destructive: 0 84% 60%` (error red)
- `--border: 220 13% 91%` (subtle borders)
- `--card: 0 0% 100%` (white cards)

**Fonts**: 
- Body: Inter (400, 500, 600, 700)
- Headings: Plus Jakarta Sans (600, 700, 800)

**Style Direction**: Modern SaaS dashboard aesthetic — card-based layouts, data density with clarity, smooth transitions, mobile-first responsive design, professional color palette

## Features

### Super Admin
- Vendor management (create, edit, suspend, delete)
- Platform analytics dashboard
- Global settings and configurations
- Subscription/plan management

### Vendor
- Product catalog management (CRUD)
- Inventory tracking (stock status)
- Storefront customization (logo, colors, banner)
- WhatsApp integration configuration
- Vendor analytics

### Customer (Public)
- Browse vendor storefronts without login
- View products with stock availability
- Filter by category
- Contact/order via WhatsApp
- Share products

### Technical
- Multi-tenant architecture
- Role-based access control (Super Admin / Vendor / Customer)
- Public storefront URLs (/store/[vendorSlug])
- WhatsApp direct messaging integration
- Image upload and optimization
- SEO-friendly vendor pages