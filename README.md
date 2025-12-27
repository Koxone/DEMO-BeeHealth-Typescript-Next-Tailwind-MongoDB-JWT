---

# BeeHealth — Medical Practice Management System

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=nextdotjs)
![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?style=flat-square&logo=typescript)
![MongoDB](https://img.shields.io/badge/MongoDB-8-green?style=flat-square&logo=mongodb)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38bdf8?style=flat-square&logo=tailwindcss)

A full-featured medical practice management platform built for multi-specialty clinics. Handles patient records, appointments, inventory, accounting, and clinical workflows with role-based access for doctors, employees, and patients.

**Live Demo:** https://demo-beehealth.vercel.app

**Demo Credentials:**
| Role | Email | Password |
|------|-------|----------|
| Doctor | doctor@demo.com | demo2025 |
| Employee | employee@demo.com | demo2025 |
| Patient | patient@demo.com | demo2025 |

---

## Features

### Clinical Management

**Patient Records**

- Complete patient profiles with medical history
- Clinical records with customizable fields per doctor
- Weight and measurement tracking with visual progress charts
- Patient timeline showing all events: consultations, prescriptions, diet changes, workout assignments

**Consultations**

- Full consultation workflow with configurable UI
- Drag-and-drop field ordering with per-doctor persistence
- Link consultations to assigned diets, workouts, and prescriptions
- Medical notes and follow-up tracking

**Diets & Workouts**

- Create, edit, and manage diet and workout plans
- Assign plans to patients with activation/deactivation
- Track compliance and history per patient
- Patients only see their assigned plans

### Scheduling

**Google Calendar Integration**

- Real-time sync with Google Calendar API
- Appointment scheduling with time slot management
- Multi-specialty calendar routing (weight, dental, aesthetic)
- Same-day appointment detection

### Inventory Management

**Full Stock Control**

- Medications, supplies, and prescriptions tracking
- Low stock and critical stock alerts
- Complete transaction history per product
- Every action logged: sales, restocks, edits, price changes
- Audit trail with timestamp, user, and reason for each change

### Accounting

**Financial Tracking**

- Daily and weekly income reports
- Consultation vs product sales breakdown
- Revenue distribution by specialty
- Event reversal handling (appointment cancellations reflected in accounting)
- Visual charts with Recharts

### Role-Based Access

**Doctor**

- Full patient management and clinical records
- Consultation management with UI customization
- Diet and workout creation and assignment
- Calendar and appointment scheduling
- Inventory access and sales
- Complete accounting dashboard
- Configurable views saved per user profile

**Employee**

- Appointment scheduling and management
- Inventory management with full transaction logging
- Consultation registration
- Product sales

**Patient**

- View assigned diets and workouts
- Book appointments
- Access personal medical history

---

## Architecture

### Authentication

Dual-token JWT system:

- Access token (15 min) for API requests
- Refresh token (7 days) in httpOnly secure cookies
- Server-side validation on every request

### Authorization

Hybrid RBAC + ABAC model:

- **RBAC:** Role-based module separation (doctor, employee, patient)
- **ABAC:** Attribute-based filtering by specialty (weight, dental, aesthetic)
- Doctors only access patients within their specialty
- Complete module isolation between roles

### Security

| Layer            | Implementation                           |
| ---------------- | ---------------------------------------- |
| Authentication   | JWT with refresh token rotation          |
| Cookies          | httpOnly, secure, sameSite strict        |
| Passwords        | bcrypt hashing                           |
| Validation       | Zod schemas on client and server         |
| Route Protection | ServerRoleGuard with automatic redirects |

### Data Flow

```
Frontend (React + Zustand)
    │
    ▼
React Query (caching + sync)
    │
    ▼
API Routes (Next.js)
    │
    ├── getAuthUser (validates every request)
    │
    ▼
MongoDB (Mongoose ODM)
```

### Project Structure

```
src/
├── app/
│   ├── (main)/
│   │   ├── doctor/      # Clinical records, patients, diets, workouts, accounting
│   │   ├── employee/    # Appointments, inventory, consultations
│   │   └── patient/     # Personal dashboard, assigned content
│   └── api/             # REST endpoints
├── components/
│   ├── sections/        # Role-specific components
│   └── shared/          # Cross-role UI components
├── hooks/               # React Query hooks for data fetching
├── models/              # Mongoose schemas
├── lib/                 # Auth, database, utilities
├── types/               # TypeScript definitions
├── zod/                 # Validation schemas
└── zustand/             # Global state stores
```

---

## Tech Stack

| Category   | Technology              |
| ---------- | ----------------------- |
| Framework  | Next.js 16 (App Router) |
| UI Library | React 19                |
| Language   | TypeScript              |
| Database   | MongoDB + Mongoose      |
| Auth       | JWT (stateless)         |
| Validation | Zod                     |
| State      | Zustand + React Query   |
| Styling    | Tailwind CSS v4         |
| Animations | Framer Motion           |
| Calendar   | Google Calendar API     |
| Charts     | Recharts                |
| Deployment | Vercel                  |

---

## Local Development

### Prerequisites

- Node.js 18+
- MongoDB instance
- Google Cloud project with Calendar API enabled

### Setup

```bash
git clone https://github.com/Koxone/DEMO-BeeHealth-Typescript-Next-Tailwind-MongoDB-JWT.git
cd DEMO-BeeHealth-Typescript-Next-Tailwind-MongoDB-JWT
npm install
```

### Environment Variables

Create `.env.local`:

```env
MONGODB_URI=your_mongo_uri
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_EMAIL=your_google_service_account_email
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_CALENDAR_WEIGHT_ID=calendar_id
GOOGLE_CALENDAR_DENTAL_ID=calendar_id
```

### Run

```bash
npm run dev     # Development
npm run build   # Production build
npm start       # Production server
```

---

## License

MIT License - 2025

```

---
```
