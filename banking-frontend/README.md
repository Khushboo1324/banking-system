# 🏦 Banking System – Frontend

The React-based frontend for the Banking System full-stack application. Built with **React 19**, **Vite**, and **Tailwind CSS**, it provides a clean and responsive UI for all banking operations.

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| React | 19 | UI framework |
| Vite | 8 | Build tool & dev server |
| Tailwind CSS | 3 | Utility-first styling |
| React Router | 7 | Client-side routing |
| Axios | 1.x | HTTP client for API calls |
| Lucide React | latest | Icon library |
| React Hot Toast | 2.x | Toast notifications |

## 📋 Pages & Routes

| Route | Page | Description |
|-------|------|-------------|
| `/login` | Login | Sign in with email and password |
| `/register` | Register | Create a new user account |
| `/dashboard` | Dashboard | Balance overview, analytics stats, quick actions |
| `/accounts` | Accounts | Account card with balance, refresh, and create account |
| `/transfer` | Transfer | Send funds to another account by Account ID |
| `/transactions` | Transactions | Full transaction history with filter and search |
| `/profile` | Profile | User details, account info, and logout |

## 🚀 Getting Started

### Prerequisites

- **Node.js 18+** and **npm 9+**
- Backend API running on `http://localhost:8080` (see root README for backend setup)

### Installation

```bash
# From the repo root
cd banking-frontend
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`. API requests are proxied to `http://localhost:8080` via the Vite dev server configuration.

### Production Build

```bash
npm run build
```

The compiled output will be placed in the `dist/` folder and can be served by any static file server or CDN.

### Preview Production Build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## 📁 Project Structure

```
banking-frontend/
├── public/
├── src/
│   ├── api/                   # Axios API client modules
│   │   ├── axiosInstance.js   # Shared Axios instance with auth interceptor
│   │   ├── authApi.js         # Login & register
│   │   ├── accountApi.js      # Create account, balance, deposit, withdraw
│   │   ├── transactionApi.js  # Transaction history, filter, analytics, transfer
│   │   └── userApi.js         # Fetch user profile
│   ├── components/            # Reusable UI components
│   │   ├── Layout.jsx         # Sidebar + top nav shell
│   │   ├── StatCard.jsx       # Dashboard statistic card
│   │   └── Spinner.jsx        # Loading spinner
│   ├── context/               # React Context state management
│   │   ├── AuthContext.jsx    # Auth token, user data, login/logout
│   │   └── AccountContext.jsx # Active account, balance refresh, session rehydration
│   ├── pages/                 # Route-level page components
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Accounts.jsx
│   │   ├── Transfer.jsx
│   │   ├── Transactions.jsx
│   │   └── Profile.jsx
│   ├── routes/
│   │   └── ProtectedRoute.jsx # Guards authenticated routes
│   ├── App.jsx                # Root component with router setup
│   └── main.jsx               # Entry point
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```

## 🔐 Authentication

- On login the JWT token and user ID are stored in `localStorage`.
- `axiosInstance.js` automatically attaches `Authorization: Bearer <token>` to every request.
- A 401 response from the API clears local storage and redirects the user to `/login`.
- `ProtectedRoute` prevents unauthenticated access to all routes other than `/login` and `/register`.

## 🔗 Backend API

The frontend communicates with two base paths on the backend:

| Prefix | Used for |
|--------|---------|
| `/api` | Auth, users, accounts |
| `/transactions` | Transaction history, filtering, analytics |

For full API documentation refer to the [root README](../README.md) or the live Swagger UI at `http://localhost:8080/swagger-ui.html`.
