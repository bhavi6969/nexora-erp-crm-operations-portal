# Nexora ERP-CRM Operations Portal

> A full-stack Mini ERP + CRM Operations Portal built for wholesale and distribution companies.  
> Manage customers, products, inventory, delivery challans, and invoices — all in one place.

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Environment Variables](#environment-variables)
- [Demo Credentials](#demo-credentials)
- [API Reference](#api-reference)
  - [Authentication](#authentication)
  - [Customers](#customers)
  - [Products](#products)
  - [Stock](#stock)
  - [Challans](#challans)
  - [Invoices](#invoices)
- [Database Schema](#database-schema)
- [Role-Based Access Control](#role-based-access-control)
- [Deployment](#deployment)

---

## Overview

**Nexora** is a lightweight ERP + CRM portal designed for wholesale and distribution businesses. It provides:

- 🔐 **Role-based authentication** (Admin, Sales, Warehouse, Accounts)
- 👥 **Customer Relationship Management** (CRM) with follow-up tracking
- 📦 **Product & Inventory Management** with S3 image support
- 📊 **Stock movement tracking** (IN / OUT)
- 🧾 **Delivery Challan management** with PDF export
- 💰 **Invoice & Payment status tracking**

---

## Tech Stack

### Backend

| Layer | Technology |
|-------|-----------|
| Runtime | Node.js (ESM) |
| Framework | Express.js v5 |
| Language | TypeScript |
| ORM | Prisma v7 |
| Database | PostgreSQL |
| Auth | JWT (jsonwebtoken) + bcryptjs |
| Storage | AWS S3 (product images) |
| PDF | PDFKit |
| Validation | Custom validators (express middleware) |
| Dev server | tsx watch |

### Frontend

| Layer | Technology |
|-------|-----------|
| Framework | React 19 + Vite 8 |
| Language | TypeScript |
| Routing | React Router v7 |
| Styling | Tailwind CSS v4 |
| Icons | Lucide React |
| HTTP | Axios |

---

## Project Structure

```
Nexora-ERP-CRM-Operations-Portal/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma          # Database models & enums
│   │   ├── seed.ts                # Initial seed data (demo users & products)
│   │   └── migrations/            # Prisma migration history
│   ├── src/
│   │   ├── app.ts                 # Express app setup, routes mounting, CORS
│   │   ├── server.ts              # HTTP server entry point
│   │   ├── config/                # DB connection, env config
│   │   ├── controllers/           # Request handlers (thin layer)
│   │   │   ├── auth.controller.ts
│   │   │   ├── customer.controller.ts
│   │   │   ├── product.controller.ts
│   │   │   ├── stock.controller.ts
│   │   │   ├── challan.controller.ts
│   │   │   ├── challanPdf.controller.ts
│   │   │   └── invoice.controller.ts
│   │   ├── services/              # Business logic layer
│   │   ├── routes/                # Express router definitions
│   │   ├── middleware/            # Auth, roles, validation, error handling
│   │   ├── validators/            # Request body validators
│   │   ├── types/                 # TypeScript type extensions
│   │   └── utils/                 # JWT, S3, response helpers
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── src/
│   │   ├── main.tsx               # App entry point
│   │   ├── App.tsx                # Root component with routing
│   │   ├── pages/                 # Page-level components
│   │   │   ├── auth/              # Login page
│   │   │   ├── dashboard/         # Dashboard overview
│   │   │   ├── customers/         # Customer list & detail
│   │   │   ├── products/          # Product catalog
│   │   │   ├── inventory/         # Stock movements
│   │   │   └── challans/          # Challan management
│   │   ├── components/
│   │   │   ├── layout/            # Sidebar, Navbar, DashboardLayout
│   │   │   └── common/            # Shared UI components
│   │   ├── context/               # React context (auth, etc.)
│   │   ├── hooks/                 # Custom React hooks
│   │   ├── services/              # Axios API service calls
│   │   ├── routes/                # Protected route wrappers
│   │   └── types/                 # TypeScript interfaces
│   ├── .env.example
│   ├── vite.config.ts
│   └── package.json
│
├── vercel.json                    # Root Vercel config
└── README.md
```

---

## Getting Started

### Prerequisites

- **Node.js** >= 18.x
- **npm** >= 9.x
- **PostgreSQL** database (local or cloud, e.g. Supabase, Neon)
- **AWS S3 bucket** (for product images)

---

### Backend Setup

```bash
# 1. Navigate to backend
cd backend

# 2. Install dependencies
npm install

# 3. Copy and configure environment variables
cp .env.example .env
# Edit .env with your DB and AWS credentials

# 4. Run database migrations
npx prisma migrate deploy

# 5. Seed the database with demo data
npm run db:seed

# 6. Start the development server
npm run dev
# Server runs at http://localhost:3000
```

**Available backend scripts:**

| Script | Description |
|--------|-------------|
| `npm run dev` | Start with hot-reload (tsx watch) |
| `npm run start` | Start without hot-reload |
| `npm run build` | TypeScript type-check (no emit) |
| `npm run db:seed` | Seed demo data into DB |
| `npm run prisma:generate` | Regenerate Prisma client |

---

### Frontend Setup

```bash
# 1. Navigate to frontend
cd frontend

# 2. Install dependencies
npm install

# 3. Copy and configure environment variables
cp .env.example .env
# Set VITE_API_URL to your backend URL

# 4. Start the development server
npm run dev
# App runs at http://localhost:5173
```

**Available frontend scripts:**

| Script | Description |
|--------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | TypeScript check + production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

---

## Environment Variables

### Backend (`.env`)

```env
DATABASE_URL=postgresql://user:password@host:port/dbname
JWT_SECRET=your_jwt_secret_key
FRONTEND_URL=http://localhost:5173

# AWS S3 (for product images)
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=your_region
AWS_S3_BUCKET=your_bucket_name
```

### Frontend (`.env`)

```env
VITE_API_URL=http://localhost:3000
```

---

## Demo Credentials

| Role      | Email                   | Password      |
|-----------|-------------------------|---------------|
| ADMIN     | admin@nexora.com        | Admin@123     |
| SALES     | sales@nexora.com        | Sales@123     |
| WAREHOUSE | warehouse@nexora.com    | Warehouse@123 |
| ACCOUNTS  | accounts@nexora.com     | Accounts@123  |

---

## API Reference

All API endpoints are prefixed with `/api`. Protected routes require a `Bearer` JWT token in the `Authorization` header.

```
Authorization: Bearer <your_jwt_token>
```

### Health Check

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/health` | Check API status |

---

### Authentication

Base path: `/api/auth`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/api/auth/login` | Public | Login with email & password |
| `GET` | `/api/auth/me` | Required | Get current authenticated user |

**Login Request Body:**
```json
{
  "email": "admin@nexora.com",
  "password": "Admin@123"
}
```

**Login Response:**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGci...",
    "user": {
      "id": "cuid",
      "name": "Admin User",
      "email": "admin@nexora.com",
      "role": "ADMIN"
    }
  }
}
```

---

### Customers

Base path: `/api/customers`

| Method | Endpoint | Roles | Description |
|--------|----------|-------|-------------|
| `GET` | `/api/customers` | ADMIN, SALES, ACCOUNTS | List all customers (paginated) |
| `POST` | `/api/customers` | ADMIN, SALES | Create a new customer |
| `GET` | `/api/customers/:id` | ADMIN, SALES, ACCOUNTS | Get customer by ID |
| `PUT` | `/api/customers/:id` | ADMIN, SALES | Update customer |
| `DELETE` | `/api/customers/:id` | ADMIN, SALES | Delete customer |
| `POST` | `/api/customers/:id/followups` | ADMIN, SALES | Add a follow-up note |
| `GET` | `/api/customers/:id/followups` | ADMIN, SALES, ACCOUNTS | List follow-ups for customer |
| `GET` | `/api/customers/:id/challans` | ADMIN, SALES, ACCOUNTS | List challans for customer |

**Query Parameters (List):**

| Param | Type | Description |
|-------|------|-------------|
| `page` | number | Page number (default: 1) |
| `limit` | number | Items per page (default: 20, max: 100) |
| `search` | string | Search by name, mobile, or business |
| `status` | string | Filter: `LEAD`, `ACTIVE`, `INACTIVE` |
| `customerType` | string | Filter: `RETAIL`, `WHOLESALE`, `DISTRIBUTOR` |

**Create Customer Request Body:**
```json
{
  "customerName": "John Doe",
  "mobile": "9876543210",
  "businessName": "Doe Traders",
  "customerType": "WHOLESALE",
  "address": "123 Main St, City",
  "email": "john@example.com",
  "gstNumber": "22AAAAA0000A1Z5",
  "status": "LEAD",
  "followUpDate": "2026-09-01",
  "notes": "Interested in bulk orders"
}
```

---

### Products

Base path: `/api/products`

| Method | Endpoint | Roles | Description |
|--------|----------|-------|-------------|
| `GET` | `/api/products` | ALL roles | List all products (paginated) |
| `POST` | `/api/products` | ADMIN, WAREHOUSE | Create a new product |
| `GET` | `/api/products/images` | Public | Get presigned URL for a product image |
| `GET` | `/api/products/:id` | ALL roles | Get product by ID |
| `PUT` | `/api/products/:id` | ADMIN, WAREHOUSE | Update product details |
| `DELETE` | `/api/products/:id` | ADMIN, WAREHOUSE | Delete product |
| `POST` | `/api/products/:id/image` | ADMIN, WAREHOUSE | Upload product image |

**Query Parameters (List):**

| Param | Type | Description |
|-------|------|-------------|
| `page` | number | Page number (default: 1) |
| `limit` | number | Items per page (default: 20, max: 100) |
| `search` | string | Search by product name or SKU |
| `category` | string | Filter by category |
| `lowStock` | boolean | Show only low-stock products |

**Create Product Request Body:**
```json
{
  "productName": "Widget Pro",
  "sku": "WGT-001",
  "category": "Electronics",
  "unitPrice": 299.99,
  "currentStock": 100,
  "minimumStock": 20,
  "warehouseLocation": "Shelf A-3"
}
```

**Image Upload:**
- Endpoint: `POST /api/products/:id/image`
- Content-Type: `multipart/form-data`
- Field name: `image`
- Max file size: **5 MB**
- Accepted types: `image/*`
- Images are stored in AWS S3; responses include presigned URLs valid for 1 hour.

---

### Stock

Base path: `/api/stock`

| Method | Endpoint | Roles | Description |
|--------|----------|-------|-------------|
| `GET` | `/api/stock/movements` | ADMIN, WAREHOUSE, ACCOUNTS | List all stock movements (paginated) |
| `POST` | `/api/stock/in` | ADMIN, WAREHOUSE | Record stock received (IN) |
| `POST` | `/api/stock/out` | ADMIN, WAREHOUSE | Record stock dispatched (OUT) |

**Query Parameters (List Movements):**

| Param | Type | Description |
|-------|------|-------------|
| `page` | number | Page number |
| `limit` | number | Items per page |
| `productId` | string | Filter by product ID |
| `type` | string | `IN` or `OUT` |

**Stock In / Out Request Body:**
```json
{
  "productId": "cuid_of_product",
  "quantity": 50,
  "reason": "Purchase from supplier"
}
```

---

### Challans

Base path: `/api/challans`

| Method | Endpoint | Roles | Description |
|--------|----------|-------|-------------|
| `GET` | `/api/challans` | ADMIN, SALES, ACCOUNTS | List all challans (paginated, filterable) |
| `POST` | `/api/challans` | ADMIN, SALES | Create a new draft challan |
| `GET` | `/api/challans/:id` | ADMIN, SALES, ACCOUNTS | Get challan by ID |
| `PUT` | `/api/challans/:id` | ADMIN, SALES | Update a draft challan |
| `PATCH` | `/api/challans/:id/confirm` | ADMIN, SALES | Confirm a challan (DRAFT → CONFIRMED) |
| `PATCH` | `/api/challans/:id/cancel` | ADMIN, SALES | Cancel a challan |
| `PATCH` | `/api/challans/:id/paid` | ADMIN, SALES, ACCOUNTS | Mark challan payment as PAID |
| `GET` | `/api/challans/:id/pdf` | ADMIN, SALES, ACCOUNTS | Download challan as PDF |

**Query Parameters (List):**

| Param | Type | Description |
|-------|------|-------------|
| `page` | number | Page number |
| `limit` | number | Items per page (max: 100) |
| `status` | string | `DRAFT`, `CONFIRMED`, `CANCELLED` |
| `paymentStatus` | string | `UNPAID`, `PAID` |
| `search` | string | Search by challan number |
| `customerId` | string | Filter by customer ID |

**Create / Update Challan Request Body:**
```json
{
  "customerId": "cuid_of_customer",
  "items": [
    { "productId": "cuid_product_1", "quantity": 10 },
    { "productId": "cuid_product_2", "quantity": 5 }
  ]
}
```

**Challan Lifecycle:**
```
DRAFT → CONFIRMED
      ↘ CANCELLED

CONFIRMED → PAID (payment status updated separately)
```

---

### Invoices

Base path: `/api/invoices`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/api/invoices` | Required | List invoices |

---

## Database Schema

### Models

```
User          → customers, followUps, stockMovements, challans
Customer      → followUps, challans
FollowUp      → (belongs to customer & user)
Product       → stockMovements, challanItems
StockMovement → (belongs to product & user)
Challan       → items (ChallanItems), (belongs to customer & user)
ChallanItem   → (belongs to challan & product)
```

### Enums

| Enum | Values |
|------|--------|
| `Role` | `ADMIN`, `SALES`, `WAREHOUSE`, `ACCOUNTS` |
| `CustomerType` | `RETAIL`, `WHOLESALE`, `DISTRIBUTOR` |
| `CustomerStatus` | `LEAD`, `ACTIVE`, `INACTIVE` |
| `StockMovementType` | `IN`, `OUT` |
| `ChallanStatus` | `DRAFT`, `CONFIRMED`, `CANCELLED` |
| `PaymentStatus` | `UNPAID`, `PAID` |

---

## Role-Based Access Control

| Feature | ADMIN | SALES | WAREHOUSE | ACCOUNTS |
|---------|:-----:|:-----:|:---------:|:--------:|
| View customers | ✅ | ✅ | ❌ | ✅ |
| Create/edit customers | ✅ | ✅ | ❌ | ❌ |
| Delete customers | ✅ | ✅ | ❌ | ❌ |
| Add follow-ups | ✅ | ✅ | ❌ | ❌ |
| View follow-ups | ✅ | ✅ | ❌ | ✅ |
| View products | ✅ | ✅ | ✅ | ✅ |
| Create/edit products | ✅ | ❌ | ✅ | ❌ |
| Upload product images | ✅ | ❌ | ✅ | ❌ |
| View stock movements | ✅ | ❌ | ✅ | ✅ |
| Record stock in/out | ✅ | ❌ | ✅ | ❌ |
| View challans | ✅ | ✅ | ❌ | ✅ |
| Create/edit challans | ✅ | ✅ | ❌ | ❌ |
| Confirm/cancel challans | ✅ | ✅ | ❌ | ❌ |
| Mark challan paid | ✅ | ✅ | ❌ | ✅ |
| Export challan PDF | ✅ | ✅ | ❌ | ✅ |

---

## Response Format

All API responses follow a consistent structure:

**Success:**
```json
{
  "success": true,
  "data": { }
}
```

**Paginated:**
```json
{
  "success": true,
  "data": [ ],
  "pagination": {
    "total": 100,
    "page": 1,
    "limit": 20,
    "totalPages": 5
  }
}
```

**Error:**
```json
{
  "success": false,
  "message": "Descriptive error message"
}
```

---

## Deployment

The project is configured for deployment on **Vercel** using `vercel.json` at the root, `backend/vercel.json`, and `frontend/vercel.json`.

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from root (or per sub-project)
vercel --prod
```

### Production Environment Variables

Configure in Vercel project settings:

**Backend:**
- `DATABASE_URL`
- `JWT_SECRET`
- `FRONTEND_URL` (deployed frontend URL)
- `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION`, `AWS_S3_BUCKET`

**Frontend:**
- `VITE_API_URL` (deployed backend URL)

---

## License

ISC
