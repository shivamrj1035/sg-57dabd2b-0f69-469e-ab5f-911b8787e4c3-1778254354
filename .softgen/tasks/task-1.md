---
title: Authentication & Role System
status: todo
priority: urgent
type: feature
tags: [auth, foundation]
created_by: agent
created_at: 2026-05-08T15:12:09Z
position: 1
---

## Notes
Foundation authentication system with role-based access control. Three roles: Super Admin, Vendor, Customer (optional - public access default). JWT-based authentication with secure login/logout flow.

## Checklist
- [ ] Create auth context and hooks
- [ ] Login page with email/password fields
- [ ] Registration page for vendors (approval pending state)
- [ ] Protected route wrapper component
- [ ] Role-based route guards (super-admin, vendor)
- [ ] Auth API routes (/api/auth/login, /api/auth/register, /api/auth/logout)
- [ ] User session management with JWT
- [ ] Logout functionality

## Acceptance
- Super admin can log in and access admin dashboard
- Vendors can register and log in after approval
- Unauthorized users are redirected to login