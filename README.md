# 🏦 Banking System – Full-Stack Digital Banking Application

A full-stack digital banking application with a **Spring Boot + MongoDB** backend and a **React + Vite** frontend, featuring JWT authentication, account management, fund transfers, transaction history with analytics, and a clean, responsive UI.

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
- [Contributing](#-contributing)

## ✨ Features

### Core Banking Features
- 👤 **User Management** – Registration, login, and profile management
- 🏦 **Account Management** – Create and manage Savings or Current accounts
- 💸 **Fund Transfers** – Send money instantly to any account by Account ID
- 💰 **Deposits & Withdrawals** – Manage your account balance
- 📊 **Transaction Analytics** – View total credits, debits, and full history
- 🔍 **Advanced Filtering** – Filter and search transactions by type or keyword

### Frontend UI
- 🖥️ **Dashboard** – Welcome banner, balance overview, credit/debit stats, and quick actions
- 🗂️ **Accounts Page** – Visual account card with balance and account details
- ↔️ **Transfer Page** – Transfer funds to another account with live balance display
- 📋 **Transactions Page** – Paginated transaction table with type filter and search
- 👤 **Profile Page** – View personal info and account summary, with logout
- 📱 **Responsive Layout** – Sidebar navigation with mobile-friendly hamburger menu
- 🔔 **Toast Notifications** – Real-time success/error feedback on all actions

### Security & Performance
- 🔐 **JWT Authentication** – Secure token-based authentication
- 🛡️ **Spring Security** – Role-based access control (ADMIN/USER)
- ⚡ **Caching** – Performance optimisation with Spring Cache
- 🚦 **Rate Limiting** – API rate limiting to prevent abuse
- ✉️ **Email Notifications** – Email service integration for notifications

### Developer Features
- 📝 **API Documentation** – Interactive Swagger/OpenAPI documentation
- ✅ **Validation** – Request validation with Jakarta Validation
- 🎯 **Exception Handling** – Global exception handling mechanism
- 📁 **File Upload** – File management capabilities

## 🛠️ Tech Stack

### Backend
| Layer | Technology |
|-------|-----------|
| Framework | Spring Boot 3.2.5 |
| Language | Java 17 |
| Database | MongoDB |
| Security | Spring Security + JWT (jjwt 0.11.5) |
| Documentation | SpringDoc OpenAPI (Swagger UI) |
| Email | Spring Mail |
| Validation | Jakarta Validation |
| Build tool | Maven |
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

## 📦 Prerequisites

Before running this application, ensure you have:

- **Java 17** or higher
- **Maven 3.6+**
- **MongoDB 4.4+** (running on `localhost:27017`)
- **Node.js 18+** and **npm 9+** (for the frontend)
- **IDE** (IntelliJ IDEA, Eclipse, or VS Code recommended)

## 🚀 Installation

### 1. Clone the repository
```bash
git clone https://github.com/Khushboo1324/banking-system-backend.git
cd banking-system-backend
```

### 2. Backend – install dependencies
```bash
mvn clean install
```

### 3. Frontend – install dependencies
```bash
cd banking-frontend
npm install
```

### 4. Set up MongoDB
- Ensure MongoDB is running on `localhost:27017`
- The application will automatically create the database `banking_db`

## ⚙️ Configuration

### Backend – Application Configuration

Edit `src/main/resources/application.yaml`:

```yaml
spring:
  application:
    name: Banking-System
  data:
    mongodb:
      uri: mongodb://localhost:27017/DigitalBank
      database: banking_db
  mail:
    host: smtp.gmail.com
    port: 587
    username: ${MAIL_USERNAME}
    password: ${MAIL_PASSWORD}

server:
  port: 8080

jwt:
  secret: your-secret-key-here
  expiration: 86400000  # 24 hours in milliseconds
```

### Environment Variables

```bash
# Email Configuration
export MAIL_USERNAME=your-email@gmail.com
export MAIL_PASSWORD=your-app-password
```

### Frontend – Vite Proxy

The frontend dev server is configured to proxy API requests to the backend. See `banking-frontend/vite.config.js`. No extra configuration is required during local development as long as the backend runs on port `8080`.

## ▶️ Running the Application

### Start the Backend

**Using Maven:**
```bash
mvn spring-boot:run
```

**Using Java:**
```bash
mvn clean package
java -jar target/banking-system-0.0.1-SNAPSHOT.jar
```

**Using Maven Wrapper:**
```bash
# On Linux/Mac
./mvnw spring-boot:run

# On Windows
mvnw.cmd spring-boot:run
```

The backend API will be available at `http://localhost:8080`.

### Start the Frontend

```bash
cd banking-frontend
npm run dev
```

The frontend will be available at `http://localhost:5173`.

> **Tip:** Start the backend first so that the frontend can reach the API immediately.

## 🖥️ Frontend Overview

The frontend is a single-page application (SPA) with the following screens:

| Route | Page | Description |
|-------|------|-------------|
| `/login` | Login | Sign in with email and password |
| `/register` | Register | Create a new user account |
| `/dashboard` | Dashboard | Balance overview, analytics, quick actions |
| `/accounts` | Accounts | Account card, balance refresh, create account |
| `/transfer` | Transfer | Send funds to another account by Account ID |
| `/transactions` | Transactions | Full transaction history with filter and search |
| `/profile` | Profile | User details, account info, logout |

### State Management

- **AuthContext** – Manages JWT token, user data, and login/logout state (persisted in `localStorage`).
- **AccountContext** – Manages the active account, balance refreshing, and session rehydration.

## 📚 API Documentation

Once the backend is running, access the interactive API docs:

- **Swagger UI**: `http://localhost:8080/swagger-ui.html`
- **OpenAPI JSON**: `http://localhost:8080/v3/api-docs`

## 📁 Project Structure

```
banking-system-backend/
├── banking-frontend/            # React + Vite frontend
│   ├── public/
│   ├── src/
│   │   ├── api/                 # Axios API clients
│   │   │   ├── axiosInstance.js
│   │   │   ├── authApi.js
│   │   │   ├── accountApi.js
│   │   │   ├── transactionApi.js
│   │   │   └── userApi.js
│   │   ├── components/          # Shared UI components
│   │   │   ├── Layout.jsx       # Sidebar + top nav
│   │   │   ├── StatCard.jsx
│   │   │   └── Spinner.jsx
│   │   ├── context/             # React Context providers
│   │   │   ├── AuthContext.jsx
│   │   │   └── AccountContext.jsx
│   │   ├── pages/               # Route-level page components
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Accounts.jsx
│   │   │   ├── Transfer.jsx
│   │   │   ├── Transactions.jsx
│   │   │   └── Profile.jsx
│   │   ├── routes/
│   │   │   └── ProtectedRoute.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── src/
│   ├── main/
│   │   ├── java/com/bankingsystem/
│   │   │   ├── config/          # Security, cache, rate-limit configs
│   │   │   ├── controller/      # REST Controllers
│   │   │   │   ├── AuthController.java
│   │   │   │   ├── AccountController.java
│   │   │   │   ├── TransactionController.java
│   │   │   │   ├── UserController.java
│   │   │   │   └── FileController.java
│   │   │   ├── dto/             # Data Transfer Objects
│   │   │   │   ├── AuthenticationDtos/
│   │   │   │   ├── AccountDtos/
│   │   │   │   ├── TransactionDtos/
│   │   │   │   └── UserDtos/
│   │   │   ├── exception/       # Global exception handler
│   │   │   ├── model/           # Domain models (User, Account, Transaction…)
│   │   │   ├── repository/      # Spring Data MongoDB repositories
│   │   │   ├── service/         # Business logic services
│   │   │   └── util/            # JwtUtil and helpers
│   │   └── resources/
│   │       └── application.yaml
│   └── test/
├── pom.xml
└── README.md
```

## 🔌 API Endpoints

### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register a new user | No |
| POST | `/api/auth/login` | Login and get JWT token | No |

### User Management

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/users/{id}` | Get user details by ID | Yes |

### Account Management

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/accounts?userId={userId}` | Create a new account | Yes |
| GET | `/api/accounts/{id}/balance` | Get account balance | Yes |
| POST | `/api/accounts/{id}/deposit` | Deposit money | Yes |
| POST | `/api/accounts/{id}/withdraw` | Withdraw money | Yes |

> **Transfers** are performed by the frontend by calling withdraw on the sender's account followed by deposit on the receiver's account.

### Transactions

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/transactions/account/{accountId}` | Get all transactions for an account | Yes |
| GET | `/transactions/filter` | Filter transactions by type, page, size | Yes |
| GET | `/transactions/analytics/{accountId}` | Get total credit/debit analytics | Yes |

### Request/Response Examples

#### Register a User
```json
POST /api/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

#### Login
```json
POST /api/auth/login
{
  "email": "john@example.com",
  "password": "securePassword123"
}

// Response
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "userId": "507f1f77bcf86cd799439011",
  "role": "USER"
}
```

#### Create Account
```json
POST /api/accounts?userId=507f1f77bcf86cd799439011
{
  "accountType": "SAVINGS"
}

// Response
{
  "accountId": "507f191e810c19729de860ea",
  "accountNumber": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "balance": 0.0,
  "accountType": "SAVINGS"
}
```

#### Deposit Money
```json
POST /api/accounts/{accountId}/deposit
{
  "amount": 1000.00,
  "accountId": "{accountId}"
}
```

#### Filter Transactions
```
GET /transactions/filter?accountId={accountId}&type=CREDIT&page=0&size=10&sortBy=transactionDate
```

## 🔒 Security

### Authentication Flow
1. User registers with name, email, and password
2. Password is encrypted using BCrypt
3. User logs in with credentials
4. Server returns a JWT token along with the user ID and role
5. Client stores the token in `localStorage` and includes it in every subsequent request as `Authorization: Bearer <token>`
6. Token is validated on each protected endpoint via `JwtAuthenticationFilter`

### JWT Token Format
```
Authorization: Bearer <jwt-token>
```

### Roles
- **USER** – Standard user with access to own accounts and transactions
- **ADMIN** – Administrative privileges

## 🧪 Testing

Run backend tests with Maven:

```bash
mvn test
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License – see the LICENSE file for details.

## 👨‍💻 Author

**Khushboo1324**

- GitHub: [@Khushboo1324](https://github.com/Khushboo1324)

## 🙏 Acknowledgments

- Spring Boot Documentation
- MongoDB Documentation
- JWT.io for token debugging
- Swagger/OpenAPI for API documentation
- Vite & React Documentation

---

**Production Deployment Checklist:**
- [ ] Change the JWT secret key to a strong, randomly generated value
- [ ] Configure proper email credentials via environment variables
- [ ] Set up MongoDB with authentication enabled
- [ ] Enable HTTPS / TLS termination
- [ ] Configure CORS policies for your deployed frontend domain
- [ ] Build the frontend for production: `cd banking-frontend && npm run build`
- [ ] Implement proper logging and monitoring
