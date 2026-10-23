# RideNow

RideNow is a ride-booking platform under development, inspired by services
such as Uber, Ola, and Rapido. This repository currently contains the Phase 1
project foundation only.

## Technology

- Next.js with the App Router
- React
- TypeScript with strict type checking
- Tailwind CSS
- ESLint
- npm

## Getting started

### Prerequisites

- Node.js 20.9 or newer
- npm

### Install dependencies

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available scripts

- `npm run dev` starts the local development server.
- `npm run lint` checks the project with ESLint.
- `npm run build` creates a production build.
- `npm run start` serves the production build locally.

## Environment variables

Copy `.env.example` to `.env.local` when environment variables are introduced.
Do not commit `.env.local` or real credentials.

## Project status

The initial homepage is intentionally limited to the foundation stage. Booking
flows, authentication, database integration, maps, and APIs will be added in
later phases.
