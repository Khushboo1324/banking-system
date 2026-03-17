# 🏦 Banking System – Full-Stack Digital Banking Application

A full-stack digital banking application with a **Spring Boot + MongoDB Atlas** backend and a **React + Vite** frontend, featuring JWT authentication, account management, PIN-secured fund transfers, transaction history with analytics, and a clean responsive UI.

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Running the Application](#-running-the-application)
- [Frontend Overview](#-frontend-overview)
- [API Documentation](#-api-documentation)
- [Project Structure](#-project-structure)
- [API Endpoints](#-api-endpoints)
- [Security](#-security)
- [Deployment](#-deployment)

---

## ✨ Features

### Core Banking
- 👤 **User Registration & Login** — Secure JWT-based auth with BCrypt password hashing
- 🏦 **Account Management** — Create Savings or Current accounts per user
- 💸 **PIN-Secured Transfers** — Send money to any account by Account ID; every transfer requires a 4-digit Transfer PIN
- 💰 **Deposits & Withdrawals** — Full balance management
- 📊 **Transaction Analytics** — Total credit/debit stats on the Dashboard
- 🔍 **Transaction History** — Filterable, searchable table (ALL / CREDIT / DEBIT)

### Frontend UI
- 🖥️ **Dashboard** — Welcome banner, live balance, analytics cards, quick-action buttons
- 🗂️ **Accounts Page** — Visual gradient account card, balance refresh, create-account form with type selector
- ↔️ **Transfer Page** — PIN modal confirmation before every transfer
- 📋 **Transactions Page** — Full history with filter tabs and keyword search
- 👤 **Profile Page** — Personal info, account details, **Change Transfer PIN** flow (verify current → set new → confirm)
- 📱 **Responsive Layout** — Collapsible sidebar with mobile hamburger menu
- 🔔 **Toast Notifications** — Real-time success/error feedback
- ₨ **Rupee currency** — All monetary values displayed with ₨ symbol

### Security & Performance
- 🔐 **JWT Authentication** — Stateless token auth, auto-logout on 401
- 🛡️ **Spring Security** — Properly wired CORS + route protection
- ⚡ **Spring Cache** — Performance optimisation
- 🚦 **Rate Limiting** — Per-IP request counter (100 req/min, resets on schedule)
- ✉️ **Email Notifications** — Spring Mail integration (SMTP)
- 🔑 **Transfer PIN** — SHA-256 hashed, stored only in `localStorage`; set at registration, changeable from Profile

---

## 🛠️ Tech Stack

### Backend
| Layer | Technology |
|-------|-----------|
| Framework | Spring Boot 3.2.5 |
| Language | Java 17 |
| Database | MongoDB Atlas |
| Security | Spring Security + JWT (jjwt 0.11.5) |
| Documentation | SpringDoc OpenAPI (Swagger UI) |
| Email | Spring Mail (Gmail SMTP) |
| Validation | Jakarta Validation |
| Build | Maven (Maven Wrapper included) |
| Utilities | Lombok |

### Frontend
| Layer | Technology |
|-------|-----------|
| Framework | React 19 |
| Build tool | Vite 8 |
| Styling | Tailwind CSS 3 |
| Routing | React Router v7 |
| HTTP client | Axios |
| Icons | Lucide React |
| Notifications | React Hot Toast |
| State | React Context API |

---

## 📦 Prerequisites

- **Java 17+**
- **Maven 3.6+** (or use the included `./mvnw`)
- **Node.js 18+** and **npm 9+**
- A **MongoDB Atlas** cluster (free tier is fine) — or a local MongoDB instance

---

## 🚀 Installation

### 1. Clone the repository
```bash
git clone https://github.com/Khushboo1324/banking-system.git
cd banking-system
```

### 2. Backend — install dependencies
```bash
./mvnw clean install -DskipTests
```

### 3. Frontend — install dependencies
```bash
cd banking-frontend
npm install
```

---

## ⚙️ Configuration

### Environment variables

Copy the example files and fill in your values:

```bash
# Backend
cp .env.example .env

# Frontend
cp banking-frontend/.env.example banking-frontend/.env.local
```

#### Backend `.env`
| Variable | Description | Default (fallback) |
|----------|-------------|-------------------|
| `MONGODB_URI` | MongoDB Atlas connection URI | hardcoded Atlas URI in `application.yaml` |
| `MAIL_USERNAME` | Gmail address for email notifications | _(empty — email disabled)_ |
| `MAIL_PASSWORD` | Gmail App Password | _(empty — email disabled)_ |
| `JWT_SECRET` | JWT signing secret (use 64+ random chars in prod) | hardcoded dev key |

#### Frontend `.env.local`
| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend origin in production, e.g. `https://api.mybank.com` | _(empty — uses Vite proxy / same-origin)_ |

> **Note:** Leave `VITE_API_BASE_URL` empty during local development — the Vite dev server proxy handles routing to `localhost:8080` automatically.

---

## ▶️ Running the Application

> Start the **backend first** so the frontend proxy can reach it immediately.

### Backend

```bash
# Using Maven wrapper (recommended)
./mvnw spring-boot:run

# Or run the packaged JAR
./mvnw clean package -DskipTests
java -jar target/banking-system-0.0.1-SNAPSHOT.jar
```

API available at → `http://localhost:8080`  
Swagger UI → `http://localhost:8080/swagger-ui.html`

### Frontend

```bash
cd banking-frontend
npm run dev
```

App available at → `http://localhost:5173`

---

## 🖥️ Frontend Overview

| Route | Page | Description |
|-------|------|-------------|
| `/login` | Login | Sign in with email + password |
| `/register` | Register | Create user account + set 4-digit Transfer PIN |
| `/dashboard` | Dashboard | Balance, analytics stats, quick actions |
| `/accounts` | Accounts | Account card, refresh, create account (Savings/Current) |
| `/transfer` | Transfer | Send funds — requires PIN confirmation modal |
| `/transactions` | Transactions | Full history, filter by type, keyword search |
| `/profile` | Profile | Personal info, account details, Change Transfer PIN |

### Transfer PIN flow
1. **Registration** — user sets a 4-digit Transfer PIN; it is SHA-256 hashed and stored in `localStorage`
2. **Transfer** — PIN modal appears before every transfer; wrong PIN blocks the operation
3. **Profile → Change PIN** — 3-step wizard: verify current PIN → enter new PIN → confirm new PIN

### Session persistence
- JWT token and user ID stored in `localStorage`
- On every page load `AccountContext` silently refreshes balance from the backend
- 401 responses automatically redirect to `/login`

---

## 📚 API Documentation

Run the backend, then open:

- **Swagger UI**: `http://localhost:8080/swagger-ui.html`
- **OpenAPI JSON**: `http://localhost:8080/v3/api-docs`

---

## 📁 Project Structure

```
banking-system/
├── .env.example                    # Backend env-var template
├── pom.xml
├── mvnw / mvnw.cmd
│
├── banking-frontend/               # React + Vite SPA
│   ├── .env.example                # Frontend env-var template
│   ├── vite.config.js              # Dev proxy + production build config
│   └── src/
│       ├── api/
│       │   ├── axiosInstance.js    # /api  (VITE_API_BASE_URL aware)
│       │   ├── authApi.js
│       │   ├── accountApi.js
│       │   ├── transactionApi.js   # /transactions  (VITE_API_BASE_URL aware)
│       │   └── userApi.js
│       ├── components/             # Layout, PinModal, StatCard, Spinner
│       ├── context/                # AuthContext, AccountContext
│       ├── pages/                  # Login, Register, Dashboard, Accounts,
│       │                           # Transfer, Transactions, Profile
│       ├── routes/                 # ProtectedRoute
│       └── utils/
│           └── pinUtils.js         # SHA-256 PIN hash/verify/save/clear
│
└── src/main/java/com/bankingsystem/
    ├── config/
    │   ├── SecurityConfig.java        # CORS + route auth rules
    │   ├── RateLimitInterceptor.java  # 100 req/min per IP (scheduled reset)
    │   └── ...
    ├── controller/
    │   ├── AuthController.java        # POST /api/auth/register|login
    │   ├── AccountController.java     # /api/accounts/**
    │   ├── TransactionController.java # /transactions/**
    │   └── UserController.java        # /api/users/**
    ├── dto / model / repository / service / util/
    └── BankingSystemApplication.java  # @SpringBootApplication @EnableScheduling
```

---

## 🔌 API Endpoints

### Authentication

| Method | Endpoint | Auth |
|--------|----------|------|
| POST | `/api/auth/register` | No |
| POST | `/api/auth/login` | No |

### Users

| Method | Endpoint | Auth |
|--------|----------|------|
| GET | `/api/users/{id}` | ✅ |

### Accounts

| Method | Endpoint | Auth |
|--------|----------|------|
| POST | `/api/accounts?userId={userId}` | ✅ |
| GET | `/api/accounts/{id}/balance` | ✅ |
| POST | `/api/accounts/{id}/deposit` | ✅ |
| POST | `/api/accounts/{id}/withdraw` | ✅ |

> **Deposit / Withdraw body:** `{ "amount": 500.00, "accountId": "<id>" }`

> **Transfers** are client-side: withdraw from sender → deposit to receiver.

### Transactions

| Method | Endpoint | Auth |
|--------|----------|------|
| GET | `/transactions/account/{accountId}` | ✅ |
| GET | `/transactions/filter?accountId=&type=&page=&size=&sortBy=` | ✅ |
| GET | `/transactions/analytics/{accountId}` | ✅ |

### Example payloads

```json
// POST /api/auth/register
{ "name": "Jane Doe", "email": "jane@example.com", "password": "secret123" }

// POST /api/auth/login  →  { "token": "eyJ...", "userId": "...", "role": "USER" }
{ "email": "jane@example.com", "password": "secret123" }

// POST /api/accounts?userId=<id>
{ "accountType": "SAVINGS" }

// POST /api/accounts/<id>/deposit
{ "amount": 1000.00, "accountId": "<id>" }
```

---

## 🔒 Security

### Auth flow
1. Register → password BCrypt-hashed in DB
2. Login → server returns `{ token, userId, role }`
3. Client stores token in `localStorage`, sends `Authorization: Bearer <token>` on every request
4. `JwtAuthenticationFilter` validates token on every protected endpoint
5. 401 response → client clears storage and redirects to `/login`

### Transfer PIN
- Set at registration (4-digit numeric)
- Stored as **SHA-256 hash** in `localStorage` — **never** sent to the server
- Required before every fund transfer
- Changeable from Profile (must verify current PIN first)

### Rate limiting
- 100 requests per minute per IP
- Counter resets via `@Scheduled(fixedRate = 60_000)` — no permanent lockouts

---

## 🚢 Deployment

### Option A — Same-origin (backend serves the built frontend)

1. Build the frontend:
   ```bash
   cd banking-frontend && npm run build
   ```
2. Copy `banking-frontend/dist/*` into `src/main/resources/static/`
3. Rebuild and run the Spring Boot JAR — it serves the SPA at `/`
   ```bash
   ./mvnw clean package -DskipTests
   java -jar target/banking-system-0.0.1-SNAPSHOT.jar
   ```

### Option B — Split deployment (frontend on Vercel/Netlify, backend on Render/Railway)

1. Deploy the Spring Boot JAR; note its public URL (e.g. `https://api.mybank.com`)
2. Set backend environment variables in your platform's dashboard:
   - `MONGODB_URI`, `MAIL_USERNAME`, `MAIL_PASSWORD`, `JWT_SECRET`
3. In your **frontend** deployment set:
   - `VITE_API_BASE_URL=https://api.mybank.com`
4. Deploy the frontend (`npm run build` → `dist/`)
5. Update `corsConfigurationSource()` in `SecurityConfig.java` to allow your frontend domain

### Production checklist
- [ ] Set a strong random `JWT_SECRET` (64+ characters)
- [ ] Set `MONGODB_URI` to your Atlas connection string
- [ ] Configure `MAIL_USERNAME` / `MAIL_PASSWORD`
- [ ] Set `VITE_API_BASE_URL` in the frontend deployment
- [ ] Restrict CORS `allowedOriginPatterns` to your actual domain(s)
- [ ] Enable HTTPS / TLS at the hosting layer
- [ ] Review rate-limit threshold for expected traffic

---

## 👨‍💻 Author

**Khushboo** — [@Khushboo1324](https://github.com/Khushboo1324)

---

## 🙏 Acknowledgements

Spring Boot · MongoDB Atlas · React · Vite · Tailwind CSS · Lucide Icons · JWT.io · Swagger/OpenAPI
