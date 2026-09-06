# DealFlow360

DealFlow360 is a comprehensive Deal Flow, Quotation, and Approval Management System designed for Sales Representatives and Sales Managers. It streamlines the process of generating quotes, monitoring deal health, and managing multi-tier approval chains.

## 🚀 Features

- **Sales Manager Dashboard:** Monitor pending approvals, high-risk deals, and team activity at a glance.
- **Quotation Management:** View and manage quotations with detailed breakdown of discounts and margins.
- **Intelligent Approvals:** Multi-level approval chains based on discount thresholds (e.g., Finance, VP of Sales).
- **Deal Health Monitoring:** Automatic tracking of stalled deals, high-risk quotes, and discount anomalies.
- **Discount Governance:** Define and enforce customer-tier and product-category discount limits.
- **Audit Logs:** Immutable tracking of all approval actions and status changes.
- **Modern UI:** Built with a premium, monochromatic zinc aesthetic with glassmorphism effects.

## 🔄 System Workflow

Here is the standard lifecycle of a quotation within DealFlow360:

1. **Quote Creation (Sales Rep):** A Sales Representative creates a quotation for a customer, adding products and applying discounts.
2. **Risk & Rules Evaluation (System):** The system automatically compares the requested discount against the **Discount Tiers** (e.g., Gold Tier maximums). If it exceeds the allowed limit, a **Risk Score** is calculated and an approval request is triggered based on the **Approval Chains**.
3. **Manager Review (Sales Manager):** The quotation appears in the Sales Manager's **Pending Approvals**. The manager can view the Quote Details, Risk Score, and Deal Health.
4. **Action (Sales Manager):** The manager can choose to:
   - **Approve:** The quote is finalized and the rep can send it to the customer.
   - **Reject:** The quote is declined.
   - **Return for Revision:** The quote is sent back to the rep with feedback.
5. **Audit Logging (System):** Every status change and decision is permanently recorded in the **Audit Logs** for compliance and reporting.

## 👥 Role-Based Access & Responsibilities

The system distinguishes between different levels of access to ensure a secure and governed quoting process:

### 1. Sales Representative
- **Primary Action:** Create and submit quotations.
- **Access:** Can view their own pending/approved/rejected quotes. Cannot approve quotes.
- **Constraints:** Limited by system-defined discount rules. Any quotation exceeding the allowed margin or discount threshold is automatically flagged for review.

### 2. Sales Manager
- **Primary Action:** Review, approve, reject, or request revisions on flagged quotations.
- **Access:** Full access to the Manager Dashboard, Pending Approvals, Deal Health, and Reports.
- **Governance:** Can define and adjust **Discount Tiers** and **Approval Chains** to adapt to market conditions. Can also see comprehensive audit logs.

### 3. Finance / VP of Sales (Higher-Tier Approvers)
- **Primary Action:** Act as secondary approvers for exceptionally high-risk deals.
- **Access:** Triggered only when a quotation hits the highest threshold (e.g., Tier 3 Rule - 25%+ discount).

### 4. System Administrator (Admin)
- **Primary Action:** Manage users, roles, and global system settings.
- **Access:** Full backend and frontend administrative access.
- **Governance:** Can add/remove Sales Reps and Managers, configure overarching organizational settings, and manage master product catalogs or warehouse rules.

### 5. Customer
- **Primary Action:** Receive, review, and accept final quotations.
- **Access:** No direct access to internal dashboards. They interact with DealFlow360 via externally shared secure quotation links or PDF exports.
- **Constraints:** Can only view finalized, approved pricing and product details. Cannot see internal risk scores, margins, or approval chains.

## 🛠 Tech Stack

### Frontend
- **Framework:** React.js (Vite)
- **Styling:** Tailwind CSS v4
- **Routing:** React Router v6
- **Icons:** Lucide React
- **Language:** TypeScript

### Backend
- **Framework:** Node.js & Express.js
- **Database ORM:** Prisma
- **Database:** SQLite (Development) / PostgreSQL (Production ready)
- **Language:** TypeScript

## 📁 Project Structure

The project follows a monorepo-style structure, separating the client and server code for modularity.

```
Dealflow360/
├── client/
│   └── sales_manager/      # Frontend React application
│       ├── src/
│       │   ├── pages/      # UI components and views (Dashboard, Approvals, etc.)
│       │   ├── App.tsx     # Routing setup
│       │   └── index.css   # Tailwind configuration
│       └── package.json
└── server/
    └── sales_manager/      # Backend Node.js/Express API
        ├── src/
        │   ├── routes/     # API endpoints
        │   └── index.ts    # Server entry point
        ├── prisma/
        │   ├── schema.prisma # Database models
        │   └── dev.db      # SQLite database
        └── package.json
```

## 🏁 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- npm or yarn

### 1. Setup the Backend
Navigate to the backend directory, install dependencies, initialize the database, and start the server:

```bash
cd server/sales_manager
npm install
npx prisma db push
npm run dev
```
The backend server will run on `http://localhost:5000`.

### 2. Setup the Frontend
Open a new terminal window, navigate to the frontend directory, install dependencies, and start the Vite dev server:

```bash
cd client/sales_manager
npm install
npm run dev
```
The frontend application will be available at `http://localhost:5173` (or the port specified in your console).

## 🔒 Authentication
Currently, the system uses a mock authentication flow for development purposes. Clicking "Login" on the frontend will generate a mock JWT token via the backend's `/api/login` endpoint, allowing you to bypass the login screen and access the dashboard.
