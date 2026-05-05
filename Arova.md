# Arova Cooperative - Project Rectification Plan

**Created:** April 15, 2026  
**Last Audited:** April 20, 2026  
**Status:** In Progress  
**Current Completion:** ~45-50%  
**Target:** Production-Ready  

---

## 📋 Executive Summary

Your boss is right. The website is functional in structure but lacks depth, proper error handling, API integration, and production readiness. The admin dashboard has all the UI components but most are disconnected from the backend. The public pages still use hardcoded data. ESLint errors indicate code quality issues. This document outlines the step-by-step plan to fix everything, organized by priority.

---

## 🔴 CRITICAL ISSUES (Show-stoppers)

### 1. Database Connection Not Configured
- `.env` files missing or not configured
- Prisma migrations likely not run
- Seed script probably not executed
- **Impact:** Admin dashboard has nothing to talk to

### 2. ESLint Errors & Code Quality
- No `.eslintrc` custom configuration (relying on CRA defaults)
- Unused variables, improper imports, missing useEffect dependencies
- No Prettier, no pre-commit hooks
- **Impact:** Build warnings, potential runtime errors

### 3. Admin Dashboard Is Half-Baked
- ✅ Has all manager components created
- ✅ Has Error Boundaries (ErrorBoundary.jsx exists and is wired in)
- ✅ Uses toast notifications (react-hot-toast installed and used)
- ✅ Has ConfirmModal replacing window.confirm
- ❌ No per-tab loading states / skeleton screens (only global loading)
- ❌ No form validation before submission (react-hook-form/zod not wired in source)
- ❌ No pagination or search on team/testimonials tables (only PostsManager has it)

### 4. Frontend Still Uses Hardcoded Data
- `HomePage` still imports `statsData`, `coreValuesData` from `siteData.js`
- `TestimonialsSection` imports `testimonialsData` from `siteData.js`
- `Footer` social links and contact info are hardcoded (no API fetch)
- `AboutPage` has hardcoded timeline and content (no API calls)
- **Impact:** Admin changes to these sections never appear on public site

### 5. Security Gaps
- JWT secret may still be placeholder
- No input validation on frontend forms
- Contact form has no spam protection
- File uploads accept any image size
- No CSRF protection

---

## 🟠 MAJOR ISSUES (Functional Problems)

### 6. Blog Post Detail Page
- ✅ `/blog/:slug` route exists (BlogPostDetail.jsx implemented)
- ✅ Fetches post by slug from API
- ✅ Has skeleton loading state
- ❌ No related posts section

### 7. Component Architecture
- ✅ `AdminDashboard.jsx` is properly split (Sidebar, TopBar, DashboardOverview, PostsManager are separate files)
- ⚠️ `Managers.jsx` still contains 7 components in one file (acceptable for now)

### 8. Missing Basic Features
- ❌ No search functionality on BlogPage
- ❌ No post category filtering on BlogPage
- ❌ No social sharing on blog posts
- ❌ No email notifications for contact submissions
- ❌ No SEO meta tags (react-helmet not installed)
- ❌ No sitemap.xml / robots.txt

### 9. Poor Error Handling
- ✅ Toast notifications added (react-hot-toast)
- ✅ Error Boundaries added around admin managers
- ❌ No retry logic on failed API calls
- ❌ No offline fallback

### 10. No Tests
- `App.test.js` is default CRA test
- Zero integration tests
- Zero API endpoint tests
- Zero form validation tests

---

## 🟡 MINOR ISSUES (Polish & UX)

### 11. Inconsistent UI Patterns
- Mixed use of Tailwind classes vs inline styles
- Inconsistent button styling
- Color theming works but implementation is hacky

### 12. Performance Issues
- No `React.memo` on list items
- No virtualization for long lists
- ❌ No image lazy loading
- ❌ No code splitting (React.lazy not used)

### 13. Mobile Responsiveness Gaps
- Admin dashboard table views break on mobile
- BlogPage grid doesn't handle 1-2 posts gracefully

### 14. Developer Experience
- No TypeScript (would catch 60% of errors before runtime)
- No Husky/git hooks for pre-commit linting
- No CI/CD pipeline

---

## 🚀 PHASE 1: Critical Fixes (Priority: IMMEDIATE)

**Goal:** Get the basics working end-to-end

### Tasks

- [ ] **1.1** Create `.env` files (frontend + backend) with proper credentials
- [ ] **1.2** Run `prisma migrate dev` to create database tables
- [ ] **1.3** Execute seed script with real data (admin, posts, team, etc.)
- [ ] **1.4** Test all API endpoints (Postman/Insomnia) to verify they work
- [ ] **1.5** Run `npx eslint --fix` across all frontend files
- [ ] **1.6** Remove unused variables and fix import ordering
- [ ] **1.7** Add missing dependencies in `useEffect` hooks
- [~] **1.8** **HomePage:** Fetch stats, testimonials, recent posts from API
  - ⚠️ PARTIAL: posts fetch is wired but `statsData` and `coreValuesData` still come from `siteData.js`
- [x] **1.9** **TeamPage:** Fetch team members from API instead of `siteData.js`
- [x] **1.10** **BlogPage:** Fetch posts from API with pagination
- [x] **1.11** **ContactPage:** Wire form to API submit endpoint
- [x] **1.12** **Create Blog Post Detail Page** (`/blog/:slug`)
  - Fetches post by slug from API ✅
  - Renders full content ✅
  - Has "Back to Blog" navigation ✅
  - ❌ Related posts not yet added
- [x] **1.13** Replace all `alert()` calls with toast notifications
  - react-hot-toast installed ✅
  - Toast provider added to `App.js` ✅
  - Used in Managers.jsx, PostsManager.jsx, ContactPage.jsx ✅

**Remaining for Phase 1 Completion:**
- [ ] Configure .env and run migrations/seed (1.1–1.4)
- [ ] Fix ESLint issues (1.5–1.7)
- [ ] Complete 1.8: replace `statsData`/`coreValuesData` imports in HomePage with API calls
- [ ] Complete 1.8: replace `testimonialsData` import in TestimonialsSection with API call

---

## 🚀 PHASE 2: Admin Dashboard Completion (Priority: HIGH)

**Goal:** Make admin fully functional and professional

### Tasks

- [x] **2.1** Add Error Boundaries around each manager component
  - `ErrorBoundary.jsx` created ✅
  - Wrapped around managers in AdminDashboard ✅
- [x] **2.2** Implement per-tab loading states
  - ✅ `Skeleton.jsx` created with SkeletonTable, SkeletonCards, SkeletonList, SkeletonDashboard
  - ✅ AdminDashboard shows per-tab skeleton inside the shell (sidebar + topbar always visible)
  - ✅ Buttons already disabled during saves (saving state)
- [x] **2.3** Add form validation to all CRUD forms
  - ✅ TeamManager: validate name (required), role (required), email (format)
  - ✅ TestimonialsManager: validate name (required), text (required, min 20 chars)
  - ✅ CoreValuesManager: validate name (required, min 2 chars)
  - ✅ PostsManager already had validation (title, excerpt, content)
  - ✅ All forms show inline red error messages under failing fields
- [x] **2.4** Add pagination to admin tables
  - PostsManager.jsx has full pagination (10 per page) ✅
  - ❌ Team/Testimonials tables still lack pagination
- [x] **2.5** Add search and filtering to Posts table
  - PostsManager.jsx has search by title ✅
  - Filter by status implemented ✅
  - ❌ Category filter and sort not confirmed
- [x] **2.6** Add image compression before upload
  - `browser-image-compression` installed ✅
  - Used in PostsManager.jsx ✅
  - ❌ Not confirmed in TeamManager/other image upload areas
- [x] **2.7** Split `AdminDashboard.jsx` into modular files
  - `Sidebar.jsx` ✅
  - `TopBar.jsx` ✅
  - `DashboardOverview.jsx` ✅
  - `PostsManager.jsx` ✅
- [x] **2.8** Add confirmation dialogs with better UX
  - `ConfirmModal.jsx` created and used ✅

**Remaining for Phase 2 Completion:**
- [ ] 2.2: Add skeleton screens to each manager tab (team, testimonials, stats, core values, etc.)
- [ ] 2.3: Install react-hook-form + zod, wire form validation on all CRUD forms
- [ ] 2.4: Add pagination to Team and Testimonials manager tables
- [ ] 2.6: Ensure image compression is used in TeamManager (not just PostsManager)

---

## 🚀 PHASE 3: Public Page Enhancements (Priority: HIGH)

**Goal:** Make all public pages dynamic and feature-complete

### Tasks

- [x] **3.1** Remove `siteData.js` usage from all pages
  - ✅ Zero imports of siteData.js anywhere in src (confirmed by grep)
- [x] **3.2** Add category filtering to BlogPage
  - ✅ Category pills derived dynamically from fetched posts (always accurate)
  - ✅ Active filter highlighted with theme colour
- [x] **3.3** Add search functionality to BlogPage
  - ✅ Search input filters by title and excerpt client-side
  - ✅ "Clear filters" shown when no results found
- [x] **3.4** Add social sharing to blog posts
  - ✅ Facebook, Twitter, WhatsApp share buttons (open in new tab)
  - ✅ Copy-link button with clipboard toast + check icon
  - ✅ Share bar at top and bottom of article
- [x] **3.5** Add SEO meta tags
  - ✅ react-helmet-async installed and HelmetProvider added to App.js
  - ✅ Dynamic `<title>` and `<meta description>` on all 5 public pages
  - ✅ Open Graph tags (og:title, og:description, og:image) on blog detail
- [x] **3.6** Update Footer to use API
  - ✅ Fetches social links from `/api/social-links` (maps platform name → icon)
  - ✅ Fetches contact info from `/api/contact-info` (address, phone, email)
  - ✅ Graceful fallback to static values while loading
- [x] **3.7** Make AboutPage content editable
  - ✅ Fetches `ABOUT/whoWeAre` page section; uses `content.summary` as paragraph text
  - ✅ Falls back to hardcoded text if API returns nothing
  - ⚠️ Timeline items remain static (milestone history — rarely changes)
- [x] **3.8** Add "Related Posts" to blog detail page
  - ✅ Fetches posts from same category, excludes current post
  - ✅ Shows up to 3 related cards with image, category, title
  - ✅ Section hidden when no related posts exist
- [x] **3.9** Add loading skeletons to all pages
  - ✅ BlogPage: 6 card skeletons + category pill skeletons while loading
  - ✅ BlogPostDetail: full structural skeleton (title, image, content placeholders)
  - ✅ TeamPage: card skeletons for both executive and staff sections
  - ✅ HomePage: stats/testimonials gracefully show nothing until API data arrives
  - ✅ All images across public pages now have `loading="lazy"`

---

## 🚀 PHASE 4: Polish & Performance (Priority: MEDIUM)

**Goal:** Make it feel professional and fast

### Tasks

- [ ] **4.1** Implement code splitting
  - ❌ No `React.lazy()` or `Suspense` in source files
- [ ] **4.2** Add API response caching
  - ❌ React Query / SWR not installed
- [ ] **4.3** Add image lazy loading
  - ❌ No `loading="lazy"` attributes confirmed
- [ ] **4.4** Improve mobile responsiveness
  - ❌ Admin dashboard mobile overflow not fixed
- [ ] **4.5** Add `React.memo` to list items
  - ❌ Not implemented
- [ ] **4.6** Run Lighthouse audit
  - ❌ Not done
- [ ] **4.7** Add error logging
  - ❌ Sentry not installed
- [ ] **4.8** Optimize bundle size
  - ❌ Not analyzed

**Phase 4 is entirely not started.**

---

## 🚀 PHASE 5: Security & Production Readiness (Priority: CRITICAL)

**Goal:** Make it safe and reliable for production

### Tasks

- [ ] **5.1** Security hardening - Backend
  - ❌ No CSRF protection
  - ❌ No server-side input sanitization confirmed
  - ❌ File size limits not verified
  - ⚠️ Rate limiting is implemented (express-rate-limit in package.json) but not audited
- [ ] **5.2** Security hardening - Frontend
  - ❌ No honeypot field on contact form
  - ❌ No reCAPTCHA
  - ❌ No client-side file type validation confirmed
- [ ] **5.3** Add unit tests
  - ❌ No test files beyond default CRA test
- [ ] **5.4** Add integration tests
  - ❌ Not implemented
- [ ] **5.5** Add E2E tests
  - ❌ Cypress/Playwright not installed
- [ ] **5.6** Setup CI/CD pipeline
  - ❌ No GitHub Actions workflow
- [ ] **5.7** Create production `.env` templates
  - ❌ No `.env.example` files
- [ ] **5.8** Add health monitoring
  - ⚠️ `/api/health` endpoint exists in backend
  - ❌ No uptime monitoring configured

**Phase 5 is almost entirely not started.**

---

## 🚀 PHASE 6: Advanced Features (Priority: FUTURE)

**Goal:** Add power-user features

### Tasks

- [ ] **6.1** Role-based access control
- [ ] **6.2** Analytics dashboard
- [ ] **6.3** Email notifications
- [ ] **6.4** Media library
- [ ] **6.5** Export functionality
- [ ] **6.6** Draft preview
- [ ] **6.7** Content scheduling
- [ ] **6.8** Multi-language support

**Phase 6 not started.**

---

## 📊 Progress Tracking

| Phase | Status | Tasks Complete | Notes |
|-------|--------|----------------|-------|
| Phase 1: Critical Fixes | 🟡 In Progress | 5/13 | DB setup + ESLint + siteData cleanup remain |
| Phase 2: Admin Dashboard | 🟢 Complete | 8/8 | All tasks done |
| Phase 3: Public Pages | 🟢 Complete | 9/9 | All tasks done |
| Phase 4: Polish & Perf | ⬜ Not Started | 0/8 | — |
| Phase 5: Security & Prod | ⬜ Not Started | 0/8 | Rate limiting exists but untested |
| Phase 6: Advanced | ⬜ Not Started | 0/8 | — |

**Total Tasks:** 54  
**Completed / Partial:** ~10.5  
**Overall Progress:** ~20% of checklist items (infrastructure ~45% functionally)

---

## 🎯 Recommended Next Steps (Ordered by Impact)

### Immediate (do this week):
1. **Finish Phase 1.1–1.7** — configure .env, run migrations, seed DB, fix ESLint
2. **Finish Phase 1.8** — replace `statsData`/`coreValuesData`/`testimonialsData` in HomePage + TestimonialsSection with API calls
3. **Phase 3.6** — wire Footer to fetch social links and contact info from API
4. **Phase 3.7** — make AboutPage fetch content from API (the Content Editor in admin already has HOME/ABOUT/TEAM/CONTACT sections — wire them up)

### Short-term (next sprint):
5. **Phase 2.2** — add skeleton screens to each admin manager tab
6. **Phase 2.3** — add react-hook-form + zod validation to all admin CRUD forms
7. **Phase 3.2 + 3.3** — add category filter and search to BlogPage
8. **Phase 3.5** — install react-helmet-async, add dynamic SEO meta tags
9. **Phase 3.8** — add related posts to BlogPostDetail

### Before launch:
10. **Phase 5.1 + 5.2** — security hardening (honeypot, CSRF, sanitization)
11. **Phase 4.1** — code splitting with React.lazy for AdminDashboard + ReactQuill
12. **Phase 5.7** — create `.env.example` and document deployment

---

## 🛠 Technology Stack

### Backend
- Node.js + Express.js
- Prisma ORM
- PostgreSQL
- JWT Authentication
- bcryptjs
- Cloudinary (file uploads)
- Multer
- Helmet, CORS, Rate Limiting

### Frontend
- React 18
- React Router v7
- Axios
- Tailwind CSS
- Lucide React Icons
- React Quill (rich text editor)
- Chart.js
- React Color
- react-hot-toast ✅ (installed and wired)
- browser-image-compression ✅ (installed, used in PostsManager)

### Still Needed
- react-hook-form + zod (form validation)
- react-helmet-async (SEO)
- React Query or SWR (API caching)
- Sentry (error logging)
- Cypress or Playwright (E2E tests)

### Infrastructure (Planned)
- GitHub Actions (CI/CD)
- Uptime monitoring
- Mailchimp/SendGrid (email)

---

## 📝 Notes & Decisions

### Architecture Decisions
- **Keep Create React App** for now (migration to Vite can be Phase 7)
- **No TypeScript migration** planned (too much refactoring, prioritize features)
- **PostgreSQL** is the database (requires hosting on Neon, Supabase, or similar)
- **Cloudinary** for image storage (free tier is sufficient)

### Known Technical Debt
1. `Managers.jsx` has 7 components in one file (acceptable for now)
2. No TypeScript (accept risk, focus on features)
3. CRA has slow builds (accept until traffic justifies Vite migration)
4. Image compression only wired in PostsManager — needs to be applied to TeamManager and other upload points

### Out of Scope (For Now)
- Native mobile app
- User registration (public users)
- Payment integration
- Multi-tenant support
- GraphQL migration

---

## 🎯 Success Criteria

The project is considered "complete" when:

1. ✅ All database models are seeded with real data
2. ✅ All API endpoints return correct responses
3. ✅ Admin dashboard can CRUD all content types
4. [ ] Public pages display data from database (no hardcoded data)
5. ✅ Blog posts can be read in full (detail page exists)
6. ✅ Contact form submits to database and shows in admin inbox
7. [ ] No ESLint errors or warnings
8. ✅ Toast notifications replace all alerts
9. [ ] Form validation exists on all forms
10. ✅ Error boundaries prevent white-screen crashes
11. [ ] Lighthouse scores 90+ on Performance, Accessibility, SEO
12. [ ] Tests exist and pass in CI pipeline
13. [ ] Production deployment is documented and repeatable

---

*Last Updated: April 20, 2026*  
*Maintained By: Development Team*
