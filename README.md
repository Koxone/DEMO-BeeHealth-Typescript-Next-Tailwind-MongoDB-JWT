# 🏥 **MedTrack — Medical Management Platform**

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=nextdotjs)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?style=flat-square&logo=typescript)
![MongoDB](https://img.shields.io/badge/MongoDB-8-green?style=flat-square&logo=mongodb)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38bdf8?style=flat-square&logo=tailwindcss)
![Zustand](https://img.shields.io/badge/Zustand-State%20Management-orange?style=flat-square)
![Zod](https://img.shields.io/badge/Zod-Schema%20Validation-3068ff?style=flat-square)
![Google Calendar API](https://img.shields.io/badge/Google%20API-Calendar-red?style=flat-square&logo=google)
![Vercel](https://img.shields.io/badge/Vercel-Hosting-black?style=flat-square&logo=vercel)

**A modern medical platform designed for doctors, employees, and patients with real-time scheduling, consult management, inventory tracking, and Google Calendar integration.**

🔗 **Live Demo:** [https://demo-beehealth.vercel.app/](https://demo-beehealth.vercel.app/)

---

## 🚀 **Features**

### 🩺 **Consultation Management**

- Daily consultation dashboard
- Pricing, items sold and totals
- Patient history and notes

### 📅 **Google Calendar Integration**

- Events parsed and normalized for medical use
- Automatic specialty routing
- Same-day appointment detection in real time

### 🧪 **Medical Inventory System**

- Intelligent stock tracking
- Low and critical stock alerts
- Full inventory history per product

### 👨‍⚕️👩‍⚕️ **Role-Based Access**

- **Doctor:** Clinical data, appointments, consults
- **Employee:** Reception, sales, prescriptions
- **Patient:** Profile, history, future appointments

### 📊 **Analytics & Charts**

- Income distribution
- Consult vs medication insights
- Recharts with responsive UI

### ⚙️ **Performance & Architecture**

- Built with **Next.js 16 App Router**
- Modular architecture following real enterprise patterns
- Type-safe backend and frontend with **Zod**
- Persistent auth and state with **Zustand**
- Integrated JWT-based authentication

---

## 🛠 **Tech Stack**

| Category   | Technology              |
| ---------- | ----------------------- |
| Framework  | Next.js 16 (App Router) |
| Language   | TypeScript              |
| Backend    | MongoDB + Mongoose      |
| Auth       | JWT (stateless)         |
| Validation | Zod                     |
| State      | Zustand                 |
| UI         | Tailwind CSS v4         |
| Animations | Framer Motion           |
| Calendar   | Google Calendar API     |
| Charts     | Recharts                |
| Deployment | Vercel                  |

---

## 📂 **Project Structure**

```
src/
├── app/               # Routes, layouts and server actions
├── components/        # Reusable UI blocks
├── lib/               # Utils, DB connect, validators
├── models/            # Mongoose models (User, Patient, Inventory, Consults)
├── hooks/             # Zustand logic + Calendar hooks
├── services/          # Data services and controllers
├── styles/            # Tailwind and global styles
└── zustand/           # Auth, UI, Inventory stores
```

---

## ⚡ **Getting Started**

### 1️⃣ Clone the repo

```bash
git clone https://github.com/Koxone/MedTrack.git
cd MedTrack
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Environment Variables

Create a `.env.local` file and add:

```env
MONGODB_URI=your_mongo_uri
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_EMAIL=your_google_service_account_email
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_CALENDAR_WEIGHT_ID=calendar_id_here
GOOGLE_CALENDAR_DENTAL_ID=calendar_id_here
```

### 4️⃣ Run the dev server

```bash
npm run dev
```

### 5️⃣ Build for production

```bash
npm run build
npm start
```

---

## 📦 **Features in Development**

- Full patient portal
- Rich medical record system
- Multi-clinic support
- Medication barcode scanning
- Staff performance analytics

---

## 🤝 Contributing

Contributions are welcome.
Fork the repo, open an issue or submit a PR.

---

## 📜 License

This project is licensed under the MIT License.
© 2025 Kox

---

## 💡 Why MedTrack?

This platform is designed to function as a **real**, production-ready medical system with:

✔ Clinical workflows
✔ Inventory management
✔ Google Calendar sync
✔ Scalable modular architecture
✔ Professional TypeScript patterns
