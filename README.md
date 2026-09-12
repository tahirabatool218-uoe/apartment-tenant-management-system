# Apartment & Tenant Management System

A full-stack web application for managing apartments and tenants through a role-based management system. The project provides secure JWT authentication, role-based authorization, apartment and tenant CRUD operations, automatic apartment occupancy management, dashboard statistics, and Super Admin-based Admin management.

---

## Project Overview

The **Apartment & Tenant Management System** is a full-stack application built with **React, Node.js, Express.js, MongoDB, and Mongoose**.

The system is designed around three user roles:

* **Super Admin** — manages administrators and has full management access.
* **Admin** — manages apartments and tenants.
* **User** — browses available apartments and views apartment details.

The backend provides RESTful APIs with JWT authentication, protected routes, role-based authorization, Mongoose models, validation, relationship handling, and centralized error handling.

The frontend provides a clean dashboard-based interface for management users and a simplified apartment browsing experience for normal users.

---

## Project Links

| Resource              | Link                                                                                                              |
| --------------------- | ----------------------------------------------------------------------------------------------------------------- |
| **GitHub Repository** | [Apartment & Tenant Management System](https://github.com/tahirabatool218-uoe/apartment-tenant-management-system) |
| **Live Deployment**   | `Coming Soon`                                                                                                     |

> **Deployment:** The live deployment link will be added here after the project is deployed.

---

## Features

### Authentication & Authorization

* User registration
* User login
* JWT-based authentication
* Protected API routes
* Role-based authorization
* Secure password hashing with bcrypt
* Authentication token expiration
* Current-user authentication endpoint
* Public registration always creates a normal `user` account

### Apartment Management

Authorized Admins and Super Admins can:

* Add apartments
* View all apartments
* View apartment details
* Update apartment information
* Delete apartments
* Search apartments
* Filter apartments by status
* Manage apartment availability
* Track apartment occupancy

Apartment information includes:

* Apartment number
* Building
* Floor
* Number of bedrooms
* Monthly rent
* Availability status

### Tenant Management

Admins and Super Admins can:

* Add tenants
* View tenants
* View tenant details
* Update tenant information
* Delete tenants
* Assign tenants to apartments

Tenant information includes:

* Tenant name
* Email
* Phone number
* Assigned apartment
* Move-in date

### Automatic Apartment Occupancy

The system automatically maintains apartment occupancy status based on tenant assignments.

For example:

* When a tenant is assigned to an available apartment → apartment becomes **Occupied**
* When a tenant is removed → apartment becomes **Available**
* When a tenant is moved to another apartment → the previous apartment becomes **Available** and the new apartment becomes **Occupied**
* A tenant cannot be assigned to an already occupied apartment

This keeps the apartment and tenant relationship synchronized.

### Dashboard

Management users have access to dashboard statistics including:

* Total apartments
* Available apartments
* Occupied apartments
* Total tenants
* Recent apartments
* Recent tenants

### Admin Management

The **Super Admin** has additional administrative capabilities:

* Create Admin accounts
* View all Admin accounts
* Delete Admin accounts

Normal users cannot create Admin or Super Admin accounts through public registration.

### User Apartment Browsing

Normal users have a simplified interface where they can:

* Browse apartments
* Search apartments
* Filter apartments
* View apartment details
* Check apartment availability

Normal users cannot:

* Create apartments
* Update apartments
* Delete apartments
* Manage tenants
* Access the management dashboard
* Manage Admin accounts

---

## User Roles

| Role            | Dashboard | Apartments    | Tenants   | Manage Admins |
| --------------- | --------- | ------------- | --------- | ------------- |
| **Super Admin** | ✅         | Full CRUD     | Full CRUD | ✅             |
| **Admin**       | ✅         | Full CRUD     | Full CRUD | ❌             |
| **User**        | ❌         | Browse / View | ❌         | ❌             |

### Super Admin

The highest-level management role.

Permissions:

* Dashboard access
* Apartment management
* Tenant management
* Admin management
* View apartment information
* Full system management access

### Admin

Management-level role for day-to-day apartment and tenant operations.

Permissions:

* Dashboard access
* Apartment CRUD
* Tenant CRUD
* View apartment information

### User

Normal application user.

Permissions:

* Browse apartments
* Search and filter apartments
* View apartment details
* Logout

---

## Technology Stack

### Frontend

* React
* React Router
* Axios
* React Icons
* CSS
* JavaScript / JSX

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JSON Web Token (JWT)
* bcryptjs
* CORS
* dotenv

### Development Tools

* Visual Studio Code
* MongoDB Compass
* Postman
* Git & GitHub

---

## REST API

### Authentication

| Method | Endpoint             | Access        | Description         |
| ------ | -------------------- | ------------- | ------------------- |
| `POST` | `/api/auth/register` | Public        | Register a new User |
| `POST` | `/api/auth/login`    | Public        | Login               |
| `GET`  | `/api/auth/me`       | Authenticated | Get current user    |

### Apartments

| Method   | Endpoint              | Access                  | Description         |
| -------- | --------------------- | ----------------------- | ------------------- |
| `GET`    | `/api/apartments`     | All authenticated roles | Get apartments      |
| `GET`    | `/api/apartments/:id` | All authenticated roles | Get apartment by ID |
| `POST`   | `/api/apartments`     | Admin / Super Admin     | Create apartment    |
| `PUT`    | `/api/apartments/:id` | Admin / Super Admin     | Update apartment    |
| `DELETE` | `/api/apartments/:id` | Admin / Super Admin     | Delete apartment    |

### Tenants

| Method   | Endpoint           | Access              | Description      |
| -------- | ------------------ | ------------------- | ---------------- |
| `POST`   | `/api/tenants`     | Admin / Super Admin | Create tenant    |
| `GET`    | `/api/tenants`     | Admin / Super Admin | Get tenants      |
| `GET`    | `/api/tenants/:id` | Admin / Super Admin | Get tenant by ID |
| `PUT`    | `/api/tenants/:id` | Admin / Super Admin | Update tenant    |
| `DELETE` | `/api/tenants/:id` | Admin / Super Admin | Delete tenant    |

### Dashboard

| Method | Endpoint               | Access              | Description              |
| ------ | ---------------------- | ------------------- | ------------------------ |
| `GET`  | `/api/dashboard/stats` | Admin / Super Admin | Get dashboard statistics |

### Admin Management

| Method   | Endpoint          | Access      | Description    |
| -------- | ----------------- | ----------- | -------------- |
| `POST`   | `/api/admins`     | Super Admin | Create Admin   |
| `GET`    | `/api/admins`     | Super Admin | Get all Admins |
| `DELETE` | `/api/admins/:id` | Super Admin | Delete Admin   |

---

## Database Models

The application uses MongoDB with Mongoose.

### User

Main fields:

* `name`
* `email`
* `password`
* `role`
* `createdAt`
* `updatedAt`

Available roles:

```text
superadmin
admin
user
```

### Apartment

Main fields:

* `apartmentNumber`
* `building`
* `floor`
* `bedrooms`
* `rent`
* `status`
* `createdAt`
* `updatedAt`

Apartment status:

```text
Available
Occupied
```

### Tenant

Main fields:

* `name`
* `email`
* `phone`
* `apartment`
* `moveInDate`
* `createdAt`
* `updatedAt`

The `apartment` field uses a Mongoose reference to the Apartment model.

---

## Authentication Flow

The application uses JWT-based authentication.

### Registration

1. User submits name, email, and password.
2. Backend validates the request.
3. Password is hashed using bcrypt.
4. User is created with the `user` role.
5. JWT token is generated.
6. User receives authentication credentials.

### Login

1. User submits email and password.
2. Backend finds the user.
3. Password is verified using bcrypt.
4. JWT token is generated.
5. User role is returned with the authenticated user information.
6. Frontend redirects the user according to their role.

### Role-Based Access

The backend uses authentication and authorization middleware.

The request flow is:

```text
Request
   ↓
JWT Authentication
   ↓
User Verification
   ↓
Role Authorization
   ↓
Controller
   ↓
Database
   ↓
Response
```

This ensures that hiding a frontend button is not the only security mechanism. Unauthorized users are also blocked at the API level.

---

## Middleware

The backend includes middleware for:

### Authentication Middleware

Verifies:

* Authorization header
* JWT token
* Token validity
* User existence

### Role Authorization Middleware

Controls access based on user roles.

Example:

```text
authorizeRoles("admin", "superadmin")
```

Only Admin and Super Admin users can access the protected resource.

### Error Handling Middleware

A centralized error-handling middleware is used to handle backend errors and provide consistent API responses.

---

## Project Structure

```text
apartment-management-system/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── apartmentController.js
│   │   ├── authController.js
│   │   ├── dashboardController.js
│   │   ├── tenantController.js
│   │   └── userController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── errorMiddleware.js
│   ├── models/
│   │   ├── Apartment.js
│   │   ├── Tenant.js
│   │   └── User.js
│   ├── routes/
│   │   ├── adminRoutes.js
│   │   ├── apartmentRoutes.js
│   │   ├── authRoutes.js
│   │   ├── dashboardRoutes.js
│   │   └── tenantRoutes.js
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── Header.css
│   │   │   ├── Header.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── Sidebar.css
│   │   │   └── Sidebar.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── AdminManagement.css
│   │   │   ├── AdminManagement.jsx
│   │   │   ├── Apartments.css
│   │   │   ├── Apartments.jsx
│   │   │   ├── Dashboard.css
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Login.css
│   │   │   ├── Login.jsx
│   │   │   ├── Register.css
│   │   │   ├── Register.jsx
│   │   │   ├── Tenants.css
│   │   │   └── Tenants.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── package.json
└── README.md
```

---

## Environment Variables

Create a `.env` file inside the backend directory.

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### Environment Variables

| Variable     | Description                            |
| ------------ | -------------------------------------- |
| `PORT`       | Backend server port                    |
| `MONGO_URI`  | MongoDB connection string              |
| `JWT_SECRET` | Secret key used for JWT authentication |

> Never commit the actual `.env` file or secret credentials to GitHub.

---

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/tahirabatool218-uoe/apartment-tenant-management-system.git
```

```bash
cd apartment-tenant-management-system
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create the `.env` file and add the required environment variables.

Start the backend:

```bash
npm start
```

The backend will run on:

```text
http://localhost:5000
```

### 3. Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
```

Start the React development server:

```bash
npm run dev
```

The frontend will run on the local development URL provided by Vite.

---

## API Testing

The REST API can be tested using **Postman**.

Authentication-protected endpoints require a JWT token in the request header:

```text
Authorization: Bearer <JWT_TOKEN>
```

The API was designed and tested around:

* Authentication
* Authorization
* Apartment CRUD
* Tenant CRUD
* Apartment/tenant relationship
* Dashboard statistics
* Admin management
* Error responses
* Protected routes

---

## Apartment & Tenant Relationship

The system maintains a relationship between tenants and apartments using Mongoose references.

```text
Apartment
     ↑
     │
Tenant
```

When a tenant is assigned to an apartment, the apartment status is automatically updated.

This prevents multiple tenants from being assigned to an apartment that is already occupied.

---

## Security

The project implements several basic security practices:

* Password hashing with bcrypt
* JWT-based authentication
* Protected API endpoints
* Role-based authorization
* Environment variables for secrets
* Password excluded from authenticated user responses
* Backend-level authorization checks

---

## Key Learning Outcomes

This project was developed to practice and demonstrate the following concepts:

* Node.js fundamentals
* Express.js server development
* REST API architecture
* Express routing
* Middleware
* Error handling
* MongoDB
* Mongoose
* Schemas and models
* CRUD operations
* MongoDB relationships using references
* JWT authentication
* Password hashing
* Role-based authorization
* Protected routes
* React frontend integration
* Axios API communication
* React Router
* Context API
* Git and GitHub workflow
* API testing with Postman

---

## Future Improvements

Possible future improvements include:

* Apartment booking/request system
* Tenant payment management
* Rental history
* Notifications
* Advanced reporting
* Profile management
* Improved deployment configuration
* Production-level validation and monitoring

These are planned improvements and are **not part of the current implementation**.

---

## Assignment Requirements

This project fulfills the main requirements of the **Node.js, Express & MongoDB** task:

* ✅ CRUD REST API with Express
* ✅ Mongoose schemas and models
* ✅ MongoDB database integration
* ✅ JWT-based registration and login
* ✅ Authentication middleware
* ✅ Role-based authorization
* ✅ Error handling middleware
* ✅ At least two API resources
* ✅ React frontend connected with REST APIs

### Main Resources

```text
Users
Apartments
Tenants
```

---

## Author

**Tahira Batool**

BS Computer Science
University of Education

GitHub: [tahirabatool218-uoe](https://github.com/tahirabatool218-uoe)

---

## License

This project was developed for educational and portfolio purposes.
