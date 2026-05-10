---
title: Database Schema - Location & Customers
status: todo
priority: urgent
type: feature
tags: [database, schema]
created_by: agent
created_at: 2026-05-08T16:20:00Z
position: 9
---

## Notes
Update database schema to support location-based vendor discovery, customer accounts, and subscription management.

## Checklist
- [ ] Add Customer model (id, userId, name, phone, location, preferences)
- [ ] Add location fields to Vendor (city, area, serviceAreas[], coordinates)
- [ ] Add Subscription model (id, vendorId, plan, status, startDate, endDate, amount)
- [ ] Add Location/Area model for managing service zones
- [ ] Update User model to support customer role properly
- [ ] Add indexes for location-based queries
- [ ] Create migration and seed with location data

## Acceptance
- Vendors have location/service area data
- Customers can be filtered by location
- Subscription plans can be assigned to vendors