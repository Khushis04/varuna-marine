```md
# Fuel EU Maritime Compliance Platform

This project implements a minimal but structured FuelEU Maritime Compliance platform. It includes a React + TypeScript + Tailwind frontend and a Node.js + TypeScript + PostgreSQL backend, following a clean Hexagonal (Ports & Adapters) architecture.

The system supports the four main FuelEU modules:
- Routes
- Compare
- Banking
- Pooling

All modules follow domain-driven boundaries.

## Overview

The platform provides:

### Routes Dashboard
- View all routes
- Set baseline
- Filter by vesselType, fuelType, year

### Compare Module
- Compare baseline vs other routes
- Show percent difference
- Show compliance result
- Simple intensity chart

### Banking Module
- Compute CB (Compliance Balance)
- Bank positive CB
- Apply banked CB
- View historical bank entries

### Pooling Module
- Create pools across ships
- Validate FuelEU pooling rules
- Compute final CB redistribution

---

## Architecture (Hexagonal)

### Backend structure:

```
backend/
  src/
    core/
      domain/
      application/
      ports/
    adapters/
      inbound/http/
      outbound/postgres/
    infrastructure/
      db/migrations/
      db/seeds/
      server/
    shared/
```

### Frontend structure:

```
frontend/
  src/
    core/
    adapters/
    infrastructure/
    shared/
```

This ensures domain logic stays independent from UI and database concerns.

---

## Setup and Run Instructions

### 1. Clone Repo

```
git clone https://github.com/your/repo.git
cd varuna-marine
```

### 2. Start PostgreSQL (Docker)

```
docker run -d --name fuel_eu_db \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=fuel_eu \
  -p 5432:5432 postgres:15
```

### 3. Run migrations

```
Get-Content backend/src/infrastructure/db/migrations/001_init.sql |
  docker exec -i fuel_eu_db psql -U postgres -d fuel_eu
```

### 4. Seed data

```
Get-Content backend/src/infrastructure/db/seeds/seed.sql |
  docker exec -i fuel_eu_db psql -U postgres -d fuel_eu
```

---

## Running Backend

```
cd backend
npm install
npm run dev
```

Backend runs at:

```
http://localhost:3000
```

---

## Running Frontend

```
cd frontend
npm install
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

## Sample API Requests

### Compute CB

```
GET http://localhost:3000/compliance/cb?shipId=S1&year=2025
```

### Get Adjusted CB

```
GET http://localhost:3000/compliance/adjusted-cb?shipId=S1&year=2025
```

### Bank surplus

```
POST http://localhost:3000/banking/bank?shipId=S1&year=2025
```

### Apply banked amount

```
POST http://localhost:3000/banking/apply?shipId=S1&year=2025
Content-Type: application/json

{ "amount": 5000 }
```

### Create a pool

```
POST http://localhost:3000/pools
Content-Type: application/json

{
  "year": 2025,
  "members": [
    { "shipId": "S1", "cb_before": 10000 },
    { "shipId": "S2", "cb_before": -6000 }
  ]
}
```

---

## Testing

Once test files are added:

```
npm run test
```

Recommended:
- Vitest / Jest
- Supertest for HTTP tests
- Mocks/stubs for ports

---

## Screenshots

Place images under:

```
frontend/public/screenshots/
```

Embed like:

```
![Routes](./public/screenshots/routes.png)
```

---
```
