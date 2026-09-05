# DealFlow360 Admin API Contract

This document outlines the APIs exposed by the Admin Backend for consumption by the Admin Frontend, as well as future modules (Sales Rep, Approver, Finance).

## Base URL
`/api/v1`

## Authentication
All endpoints require a valid JWT token in the `Authorization: Bearer <token>` header. Admin endpoints require an `ADMIN` role.

---

## 1. Product Catalog

### `GET /products`
- **Purpose**: Get list of all products. Consumed by Admin, Sales Rep.
- **Response**: `Product[]`

### `POST /products`
- **Purpose**: Create a product.
- **Role**: Admin

---

## 2. Discount Governance

### `GET /discounts/rules`
- **Purpose**: Get all active discount ceilings.
- **Role**: Admin, Sales Rep (to check limits)

### `POST /discounts/simulate`
- **Purpose**: Simulate a discount rule to evaluate risk and approval requirements.
- **Body**: `{ customerTier: string, category: string, requestedDiscount: number }`
- **Response**: `{ allowedDiscount, exceededBy, riskLevel, requiredApprovals }`
- **Role**: Admin, Sales Rep

---

## 3. Approvals

### `GET /approvals/chains`
- **Purpose**: Get configured approval escalation ladders.

### `POST /approvals/evaluate`
- **Purpose**: Evaluate quotation data against active chains.
- **Role**: Sales Rep

---

## 4. Operations

### `GET /warehouses`
- **Purpose**: List warehouses and stock levels.
- **Role**: Admin, Finance/Ops

---

## 5. Subscriptions & Upsells

### `GET /subscriptions`
- **Purpose**: List active recurring billing plans.

### `GET /upsells/suggestions/:productId`
- **Purpose**: Get ranked cross-sell/upsell suggestions for a product.
- **Role**: Sales Rep
