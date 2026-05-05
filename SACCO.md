# SACCO Management System - Implementation Plan

## Overview

The SACCO Management System is an integrated loan management solution added to the Arova Cooperative website. It enables members to apply for loans online, allows SACCO staff to process applications, provides management with analytics and reporting, and gives admins tools to configure system parameters.

**Key Objectives:**
- Streamline loan application process (online + staff entry)
- Automate initial loan qualification recommendations
- Reduce manual workload for loan verification
- Provide data-driven insights into loan approvals and member qualifications
- Track loan disbursement for recordkeeping

---

## System Architecture

### Technology Stack
- **Frontend**: React 18 + React Router + Tailwind CSS
- **Backend**: Express.js with Prisma ORM
- **Database**: PostgreSQL (Neon)
- **Authentication**: Existing role-based auth system (extend for SACCO roles)
- **Notifications**: Email + in-app notifications

### Architecture Pattern
**Integrated MVC Architecture:**
- Single Express backend integrated with existing API
- Prisma models for SACCO entities (no separate services)
- React components integrated into existing AdminDashboard
- Configurable rules engine (stored in database, not hardcoded)

### User Roles
1. **Applicant/Member**: Submit loan applications online, view decisions, receive notifications
2. **SACCO Staff**: Enter applications on behalf of walk-in applicants, verify documents, confirm decisions
3. **SACCO Management**: Review all applications, view analytics, make final approvals, filter & export data
4. **System Admin**: Configure loan criteria, manage form fields, manage users, view audit logs

---

## Data Model

### Core Entities

#### User (extend existing)
```
- id (UUID)
- email (unique)
- password (hashed)
- role (Applicant, Staff, Manager, Admin)
- name
- phone
- status (active, inactive)
- createdAt
- updatedAt
```

#### LoanApplication
```
- id (UUID)
- applicantId (FK → User)
- staffEnteredById (FK → User, nullable - if entered by staff)
- status (draft, submitted, under_review, approved, rejected)
- evaluationResultId (FK → EvaluationResult)
- loanAmountRequested
- loanPurpose
- repaymentPeriodMonths
- submittedDate
- verifiedByStaffDate (nullable)
- decisionConfirmedDate (nullable)
- createdAt
- updatedAt
```

#### ApplicationData (stores flexible form responses)
```
- id (UUID)
- applicationId (FK → LoanApplication)
- fieldName (e.g., "personalName", "income", "employment_status")
- fieldValue
- fieldType (text, number, select, date, etc.)
```

#### LoanCriteria (configurable parameters)
```
- id (UUID)
- parameterName (e.g., "minSavingsDuration", "minIncome", "maxDebtToIncome")
- dataType (number, percent, months)
- minValue (nullable)
- maxValue (nullable)
- weight (for scoring - 0-1)
- description
- active (boolean)
- createdAt
- updatedAt
```

#### EvaluationResult
```
- id (UUID)
- applicationId (FK → LoanApplication)
- recommendedDecision (approve, reject)
- qualificationScore (0-100)
- failureReasons (array of reasons why rejected, if applicable)
- evaluatedAt
```

#### Notification
```
- id (UUID)
- userId (FK → User)
- title
- message
- type (loan_approved, loan_rejected, application_update)
- relatedApplicationId (FK → LoanApplication, nullable)
- isRead (boolean)
- createdAt
```

#### LoanFormField (tracks available form fields)
```
- id (UUID)
- fieldName (e.g., "personalName", "idNumber")
- fieldLabel
- fieldType (text, number, email, select, date, textarea)
- isRequired (boolean)
- fieldOrder (for display order)
- active (boolean)
- createdAt
- updatedAt
```

#### LoanDisbursement (Phase 4)
```
- id (UUID)
- applicationId (FK → LoanApplication)
- disbursedAmount
- disbursementDate
- verificationStatus (pending, verified)
- notes
```

---

## Application Flow

### Applicant Self-Service Flow
1. **Visit Public Application Page** (`/sacco/apply`)
   - Unauthenticated user visits loan application page
   - Views information about SACCO loans

2. **Fill Application Form**
   - Enters personal info (name, ID number, address, contact)
   - Enters financial info (income, employment status, savings balance)
   - Enters loan details (amount requested, purpose, repayment period)
   - Enters guarantor/family info
   - All data saved to ApplicationData table

3. **Submit Application**
   - Application status → submitted
   - System automatically evaluates against LoanCriteria
   - EvaluationResult created with recommendation (approve/reject)
   - Applicant receives notification with decision

4. **Monitor Application**
   - Can view decision and qualification details
   - Staff updates status as they verify

### Staff Entry Flow
1. **Staff Login** to Dashboard `/dashboard/sacco/staff`
   - Views "New Applications to Enter" section
   - Opens form to enter applicant details
   - Same form as public application

2. **Enter Application**
   - Staff fills form for walk-in applicant
   - Staffs enters `staffEnteredById` to track who entered it
   - Submits application

3. **Verify & Confirm**
   - Views evaluation recommendation
   - Conducts document verification (outside app - manual)
   - Marks application as verified in dashboard
   - Confirms decision (approve/reject) - can override system recommendation if needed
   - Decision status → approved or rejected
   - Applicant notified

### Management Review Flow
1. **Management Login** to Dashboard `/dashboard/sacco/management`
   - Views all applications in pipeline
   - Filters by: status, date range, applicant name, decision, amount range
   - Sees analytics:
     - Total applications this month/quarter/year
     - Approval rate (%)
     - Rejection rate (%)
     - Average qualification score
     - Breakdown of rejection reasons

2. **Make Final Decisions**
   - Can review staff recommendations
   - Can approve/reject applications
   - Can add notes/comments

3. **Export & Reporting**
   - Export application data to CSV
   - Generate approval trend reports
   - Track disbursement status

### Admin Configuration Flow
1. **Admin Login** to Dashboard `/dashboard/sacco/admin`

2. **Configure Loan Criteria**
   - View all LoanCriteria
   - Edit min/max values for each parameter
   - Adjust weights (importance) in evaluation
   - Activate/deactivate criteria
   - Add new criteria types
   - Changes apply immediately to future evaluations

3. **Manage Form Fields**
   - View all available form fields (LoanFormField)
   - Add new fields (personal, financial, guarantor sections)
   - Edit field labels, types, order
   - Mark fields as required/optional
   - Activate/deactivate fields

4. **Manage Users**
   - View all users
   - Create new staff/manager accounts
   - Assign roles
   - Reset passwords
   - Deactivate accounts

5. **View Audit & Logs**
   - Track changes to criteria
   - Track user actions (who approved what)
   - System activity logs

---

## Evaluation System

### Automatic Qualification Scoring
1. **Evaluate each LoanCriteria** against application data
   - Check if applicant meets min/max requirements
   - Score: 1 point per met criterion (weighted by criterion importance)

2. **Calculate Qualification Score**
   - Total score: sum of weighted criteria
   - Normalized to 0-100 scale

3. **Generate Recommendation**
   - If score ≥ configured threshold (e.g., 70%) → recommend approve
   - If score < threshold → recommend reject
   - Generate failure reasons (which criteria they failed)

4. **Staff Override**
   - Staff can approve even if system recommended reject (with reason in notes)
   - Staff can reject even if system recommended approve (rare, with reason)

---

## Frontend Structure

### Public Pages
- **`/sacco/apply`** - Loan application form (public, unauthenticated)

### Dashboard Pages (Role-Based)
- **`/dashboard/sacco/staff`**
  - List of submitted applications awaiting verification
  - Form to enter new applications
  - Verification checklist
  - Approve/reject confirmation modal

- **`/dashboard/sacco/management`**
  - All applications filterable dashboard
  - Statistics/analytics cards
  - Application detail view
  - Export button

- **`/dashboard/sacco/admin`**
  - Loan criteria configuration
  - Form fields management
  - User management
  - System logs/audit trail

### Components to Create
- `LoanApplicationForm` (reusable, used in public page + staff entry)
- `ApplicationList` (with filters, used in multiple dashboards)
- `EvaluationCard` (displays evaluation results & recommendation)
- `AnalyticsCards` (approval rates, metrics)
- `CriteriaEditor` (admin panel for editing criteria)
- `FormFieldManager` (admin panel for form fields)

---

## Backend API Endpoints

### Authentication
- `POST /api/auth/login` - User login (existing, extend roles)
- `POST /api/auth/logout` - User logout (existing)
- `GET /api/auth/me` - Get current user (existing, extend roles)

### Loan Applications
- `POST /api/sacco/applications` - Submit new application (public + staff)
- `GET /api/sacco/applications` - List applications (staff/management/admin)
- `GET /api/sacco/applications/:id` - Get application details
- `PUT /api/sacco/applications/:id` - Update application (edit as draft)
- `PATCH /api/sacco/applications/:id/verify` - Mark as verified (staff)
- `PATCH /api/sacco/applications/:id/confirm-decision` - Confirm approve/reject (staff/management)

### Evaluations
- `GET /api/sacco/applications/:id/evaluation` - Get evaluation result
- `POST /api/sacco/applications/:id/re-evaluate` - Re-run evaluation (admin)

### Loan Criteria
- `GET /api/sacco/criteria` - List all criteria
- `POST /api/sacco/criteria` - Create new criterion (admin)
- `PUT /api/sacco/criteria/:id` - Update criterion (admin)
- `DELETE /api/sacco/criteria/:id` - Delete criterion (admin)

### Form Fields
- `GET /api/sacco/form-fields` - Get active form fields
- `POST /api/sacco/form-fields` - Create new field (admin)
- `PUT /api/sacco/form-fields/:id` - Update field (admin)
- `DELETE /api/sacco/form-fields/:id` - Delete field (admin)

### Notifications
- `GET /api/sacco/notifications` - Get user's notifications
- `PATCH /api/sacco/notifications/:id/read` - Mark notification as read

### Analytics
- `GET /api/sacco/analytics/dashboard` - Get dashboard stats (approval rate, rejection rate, etc.)
- `GET /api/sacco/analytics/export` - Export application data (CSV)

### Users
- `GET /api/sacco/users` - List all users (admin)
- `POST /api/sacco/users` - Create new user (admin)
- `PUT /api/sacco/users/:id` - Update user (admin)
- `DELETE /api/sacco/users/:id` - Deactivate user (admin)

---

## Database Migrations (Prisma)

### New Schema Addition
```prisma
// User role enum (extend existing User model)
enum UserRole {
  APPLICANT
  STAFF
  MANAGER
  ADMIN
}

// All new models as defined in Data Model section
model LoanApplication { ... }
model ApplicationData { ... }
model LoanCriteria { ... }
model EvaluationResult { ... }
model Notification { ... }
model LoanFormField { ... }
model LoanDisbursement { ... }
```

---

## Phased Implementation

### Phase 1: Core Application & Staff Entry (Weeks 1-3)
**Goal:** Basic loan application system with staff entry and automatic evaluation

**Deliverables:**
- ✅ Public loan application form (`/sacco/apply`)
- ✅ LoanApplication, ApplicationData, LoanFormField tables
- ✅ Dynamic form fields (configured in database)
- ✅ Application submission API
- ✅ Automatic evaluation system (LoanCriteria, EvaluationResult)
- ✅ Staff section in dashboard (`/dashboard/sacco/staff`)
- ✅ Staff can enter applications
- ✅ Staff can verify and confirm decisions
- ✅ Basic notifications (approval/rejection via email + in-app)

**APIs to Implement:**
- POST /api/sacco/applications (submit)
- GET /api/sacco/applications (list with role-based filtering)
- PATCH /api/sacco/applications/:id/verify
- PATCH /api/sacco/applications/:id/confirm-decision
- GET /api/sacco/applications/:id/evaluation

**Database:**
- Create all core tables (User, LoanApplication, ApplicationData, LoanCriteria, EvaluationResult, Notification, LoanFormField)
- Seed initial LoanCriteria (min savings, income, employment status, etc.)
- Seed LoanFormField with default fields

---

### Phase 2: Management Dashboard & Analytics (Weeks 4-5)
**Goal:** Give management visibility into applications with analytics and filtering

**Deliverables:**
- ✅ Management section in dashboard (`/dashboard/sacco/management`)
- ✅ Filterable application list (by status, date, applicant, decision, amount)
- ✅ Analytics cards (approval rate %, rejection rate %, total applications, avg score)
- ✅ Rejection reasons breakdown
- ✅ Export to CSV functionality
- ✅ Application detail view with full decision history

**APIs to Implement:**
- GET /api/sacco/analytics/dashboard (stats)
- GET /api/sacco/analytics/export (CSV export)
- Enhanced GET /api/sacco/applications with advanced filtering

**Database:**
- No new tables needed (use existing data)

---

### Phase 3: Admin Configuration & Settings (Weeks 6-7)
**Goal:** Admins can adjust system parameters without code changes

**Deliverables:**
- ✅ Admin section in dashboard (`/dashboard/sacco/admin`)
- ✅ Loan criteria editor (edit min/max values, weights, descriptions)
- ✅ Add/remove/edit form fields
- ✅ User management (create staff/managers, assign roles)
- ✅ Audit log (track changes to criteria, user actions)

**APIs to Implement:**
- POST/PUT/DELETE /api/sacco/criteria
- POST/PUT/DELETE /api/sacco/form-fields
- GET/POST/PUT/DELETE /api/sacco/users
- GET /api/sacco/audit-logs (if needed)

**Database:**
- No new tables needed (use existing schema)

---

### Phase 4: Enhancements & Refinements (Ongoing)
**Goal:** Based on real-world usage, add features as needed

**Possible Enhancements:**
- Document upload/verification tracking (LoanDisbursement table)
- Loan disbursement tracking (who received, when, amount)
- Advanced analytics (approval trends over time, member segments, repayment rates)
- SMS notifications (in addition to email)
- Bulk import/export (upload CSV of applications)
- Payment/repayment tracking
- Interest calculation
- Follow-up/reminder system

---

## Security & Access Control

### Authentication
- Existing session-based auth extended with SACCO roles
- Password hashing with bcryptjs (already in use)

### Authorization
- **Public** (`/sacco/apply`): Unauthenticated users
- **Staff** (`/dashboard/sacco/staff`): Role = STAFF or MANAGER or ADMIN
- **Management** (`/dashboard/sacco/management`): Role = MANAGER or ADMIN
- **Admin** (`/dashboard/sacco/admin`): Role = ADMIN only

### Data Access
- Applicants can only see their own applications
- Staff can see all applications submitted/entered by them
- Managers can see all applications
- Admins can see everything + system configuration

---

## Notifications

### Applicant Notifications
- **Application Submitted**: Confirmation that application was received
- **Decision Made**: Approval or rejection with reasons (if rejected)
- **Application Updated**: When staff marks as verified/confirmed

### Notification Channels
- In-app notifications (Notification table)
- Email notifications (via existing nodemailer setup if available, or create)

---

## Success Criteria by Phase

### Phase 1 Success Metrics
- [ ] Public form loads and accepts submissions
- [ ] Staff can enter applications
- [ ] System evaluates and recommends correctly
- [ ] Notifications delivered to applicants
- [ ] Staff dashboard shows applications ready for verification

### Phase 2 Success Metrics
- [ ] Management can filter applications by all criteria
- [ ] Analytics show correct approval/rejection rates
- [ ] CSV export works
- [ ] No performance issues with 100+ applications

### Phase 3 Success Metrics
- [ ] Admins can change criteria without code changes
- [ ] New form fields take effect immediately
- [ ] User management functional
- [ ] Audit logs track all changes

### Phase 4 Success Metrics
- [ ] System performs well with real usage
- [ ] All identified bugs fixed
- [ ] Additional features implemented based on feedback

---

## Future Considerations

### Scalability
- If data grows large (10,000+ applications), consider caching for analytics queries
- Evaluation engine is currently single-threaded; consider job queue if throughput increases

### Extensibility
- Form fields are database-driven; easy to add new fields without code changes
- Criteria are database-driven; easy to add new evaluation parameters
- Evaluation engine can be enhanced with more complex rules (weighted scoring, complex logic)

### Integration
- Loan disbursement can integrate with accounting system later
- Payment tracking can integrate with mobile money/payment system
- Email notifications can integrate with SMS gateway

---

## File Structure (Additions to Existing Project)

```
src/
├── pages/
│   ├── SACCO/
│   │   ├── SACCOApplicationPage.jsx      (public loan application)
│   │   ├── SACCOStaffDashboard.jsx       (staff section)
│   │   ├── SACCOManagementDashboard.jsx  (management section)
│   │   └── SACCOAdminDashboard.jsx       (admin section)
│   └── ...existing pages
├── components/
│   ├── SACCO/
│   │   ├── LoanApplicationForm.jsx
│   │   ├── ApplicationList.jsx
│   │   ├── EvaluationCard.jsx
│   │   ├── AnalyticsCards.jsx
│   │   ├── CriteriaEditor.jsx
│   │   ├── FormFieldManager.jsx
│   │   └── UserManager.jsx
│   └── ...existing components
└── ...existing structure

server/
├── routes/
│   ├── sacco.js                          (all SACCO routes)
│   └── ...existing routes
├── controllers/
│   ├── saccoController.js                (business logic)
│   └── ...existing controllers
├── prisma/
│   ├── schema.prisma                     (updated with SACCO models)
│   └── migrations/
│       └── [date]_add_sacco_system       (migration file)
└── ...existing structure
```

---

## Dependencies (Already Available)
- React 18, React Router (frontend)
- Express.js (backend)
- Prisma ORM (database)
- PostgreSQL (database)
- Tailwind CSS (styling)
- bcryptjs (password hashing)

## New Dependencies (If Needed)
- `axios` (HTTP client - likely already in use)
- Email library if nodemailer not available: `nodemailer`
- CSV export: `csv-writer` or `papaparse`

---

## Notes & Assumptions

1. **User Registration**: Assumes applicants can register/create accounts on the public form, or that staff creates accounts for them
2. **Document Verification**: Assumes staff conduct physical/manual verification outside this system and mark as complete in the dashboard
3. **Notifications**: Email infrastructure exists or will be set up (nodemailer or similar)
4. **Loan Disbursement**: Phase 1-3 don't include actual fund disbursement; Phase 4 will add tracking
5. **Role-Based Access**: Extends existing authentication system; assumes roles already defined
6. **Salary/Income Verification**: System evaluates based on self-reported income; actual verification is manual by staff
7. **Currency**: Assumes all monetary values in same currency; adjust as needed
8. **Scalability**: Design assumes <5,000 applications per year; adjust if higher volume expected

---

## Questions to Revisit During Implementation

1. Should rejected applicants be able to reapply? (After how long?)
2. What happens if an application is approved but applicant doesn't claim the loan?
3. Should there be an audit trail of who approved what?
4. Should loan amounts have a min/max limit?
5. Should interest rates vary by applicant or be fixed?
6. Should guarantors be tracked as separate entities?
7. Should there be a waiting period after approval before disbursement?

---

**Document Version**: 1.0  
**Last Updated**: April 27, 2026  
**Status**: Design approved, ready for Phase 1 implementation
