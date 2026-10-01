# Nebula AI

Nebula AI is a Next.js-based AI platform for chat, document-aware Q&A, and subscription-based usage. The app combines Clerk authentication, Prisma + Postgres persistence, Stripe billing, and LangGraph-based multi-agent routing to power a "chat with AI" product.

## Overview

This project includes:

- A chat interface with conversation history
- Multi-agent routing for chat, coding, search, image, and RAG workflows
- PDF ingestion and retrieval using LangChain + Qdrant
- User and plan management with Prisma
- Stripe checkout and plan-based billing
- Authentication and user session handling with Clerk

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Prisma + PostgreSQL
- Clerk
- Stripe
- LangChain / LangGraph
- Qdrant
- Groq and Google Generative AI model integrations

## Project Structure

```text
.
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.ts
├── src/
│   ├── actions/
│   ├── agents/
│   ├── app/
│   ├── components/
│   ├── graph/
│   ├── lib/
│   ├── store/
│   ├── types/
│   ├── proxy.ts
├── generated/prisma/
├── public/
├── package.json
├── tsconfig.json
├── next.config.ts
├── components.json
├── README.md
└── .env.local (local environment file)
```

### Key app areas

- `src/app/api/chat` — chat API routes and streaming responses
- `src/graph/graph.ts` — LangGraph orchestration for router + agent nodes
- `src/agents` — task-specific agent implementations
- `src/app/api/ingest` — PDF ingestion endpoint
- `src/lib/ai/qdrant.ts` — vector store configuration
- `src/lib/prisma.ts` — Prisma client
- `src/app/pricing` — plan and checkout UI
- `src/lib/stripe.ts` — Stripe client

## Features

### AI chat experience

The app routes prompts through a LangGraph graph that can branch into:

- `chat` for general conversations
- `coding` for code-oriented responses
- `search` for search tasks
- `image` for image-related flows
- `rag` for retrieval-augmented generation over uploaded documents

### Document ingestion and RAG

Users can upload PDFs through the ingest endpoint. The app:

1. Parses the PDF text
2. Splits it into chunks
3. Generates embeddings
4. Stores those chunks in Qdrant
5. Uses the vector store when `useRag` is enabled in the chat flow

### Authentication and user sync

The UI is protected via Clerk and user data is synced into the Prisma database, including plan and credit metadata.

### Billing

The app includes Stripe checkout for plan upgrades and stores the resulting payment/subscription metadata in Prisma.

## Prerequisites

Before running the project locally, make sure you have:

- Node.js 20+
- npm
- PostgreSQL database
- Qdrant instance
- Clerk application credentials
- Stripe account and secret key
- Groq and/or Google AI API keys

## Environment Variables

Create a `.env.local` file in the project root with the following variables:

```bash
DATABASE_URL="postgresql://username:password@localhost:5432/nebula"
NEXT_PUBLIC_APP_URL="http://localhost:3000"

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your_clerk_publishable_key"
CLERK_SECRET_KEY="your_clerk_secret_key"

QDRANT_URL="http://localhost:6333"
QDRANT_API_KEY="your_qdrant_api_key_if_required"

STRIPE_SECRET_KEY="your_stripe_secret_key"

GROQ_API_KEY="your_groq_api_key"
GOOGLE_API_KEY="your_google_api_key"
```

> If your Qdrant deployment is local and does not require an API key, you can leave `QDRANT_API_KEY` empty.

## Installation

```bash
npm install
```

## Database Setup

Generate Prisma client and apply migrations:

```bash
npx prisma generate
npx prisma migrate dev --name init
```

If you prefer to sync the schema without migrations during local development, you can also use:

```bash
npx prisma db push
```

## Running the App

Start the development server:

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## Production Build

```bash
npm run build
npm run start
```

## Linting

```bash
npm run lint
```

## Notes

- The project uses a custom LangGraph workflow defined in `src/graph/graph.ts`.
- The ingestion route is designed for PDF documents and stores extracted text in Qdrant.
- Clerk authentication is enforced on protected API routes and page-level data fetches.
- Plans and credits are stored in the Prisma schema and are used together with Stripe for checkout and subscription handling.

## Deployment

This is a standard Next.js app and can be deployed to platforms such as Vercel, Railway, or a custom Node.js server. For production deployment, ensure all required environment variables are configured in the target environment.

## License

This project is currently set up for local development and internal use unless a project-specific license is added later.
