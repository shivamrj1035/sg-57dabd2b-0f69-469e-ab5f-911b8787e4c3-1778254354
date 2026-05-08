---
title: Super Admin Dashboard & Vendor Management
status: in_progress
priority: high
type: feature
tags: [admin, vendors]
created_by: agent
created_at: 2026-05-08T15:12:09Z
position: 2
---

## Notes
Super admin dashboard with vendor CRUD operations. Platform owner can create vendors, assign store slugs, approve/suspend vendors, and view platform-wide metrics.

## Checklist
- [x] Admin dashboard page with stats cards (total vendors, active vendors, total products, pending approvals)
- [x] Admin layout with navigation
- [ ] Vendors list page with data table (name, slug, status, products count, created date)
- [ ] Create vendor modal/form (name, email, password, slug, contact, status)
- [ ] Edit vendor functionality
- [ ] Suspend/activate vendor toggle
- [ ] Delete vendor with confirmation
- [x] API routes for vendor CRUD (/api/admin/vendors)
- [ ] Vendor approval workflow (pending → approved → active)

## Acceptance
- Super admin sees platform metrics on dashboard
- Super admin can create new vendors with unique slugs
- Vendor list shows all vendors with filtering by status
- Super admin can edit, suspend, or delete vendors