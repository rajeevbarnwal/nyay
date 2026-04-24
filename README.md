# Legal Sathi

MacBook-first delivery scaffold for Legal Sathi. This workspace implements the approved plan as:

- a local full-stack development topology for macOS with Docker Compose
- runnable Node.js and Python service stubs aligned to the approved stack
- phased architecture, flow, PRD/BRD, and design deliverables in Markdown

## Workspace Layout

- `docs/01-high-level-architecture.md`
- `docs/02-low-level-architecture.md`
- `docs/03-detailed-flow-design.md`
- `docs/04-prd-brd.md`
- `docs/05-design-options.md`
- `infra/local/docker-compose.yml`
- `services/node-service/`
- `services/ai-service/`
- `services/integration-mocks/`

## Local Development Topology

The scaffold keeps production architecture unchanged while making local development practical on a MacBook:

- Single-node PostgreSQL 16, MongoDB 7, Redis 7, Apache Kafka, and Elasticsearch 8
- Node.js 20 + Express.js + Apollo GraphQL service template reused for the API gateway and domain services
- Python FastAPI AI service stub for LegalGPT India with PII guard, retrieval, citation verification, and confidence scoring stages
- Integration mock service for eCourts, Razorpay, Agora, Meta WhatsApp Business API, and DigiLocker/eSign

## Prerequisites

- Docker Desktop or Colima with Docker CLI support
- Node.js 20+ for local lint-free syntax checks
- Python 3.12+ for the FastAPI service if you want to run it outside containers

## Quick Start

1. Copy `.env.example` to `.env`.
2. Install Docker on the MacBook if it is not already available.
3. Start the stack:

```bash
cd /Users/rajeevbarnwal/Desktop/Codes/Nyay/infra/local
docker compose --env-file ../../.env.example up --build
```

4. Core endpoints after startup:

- API Gateway: `http://localhost:8080/health`
- LegalGPT India AI Service: `http://localhost:8000/health`
- Integration Mocks: `http://localhost:8090/health`
- PostgreSQL: `localhost:5432`
- MongoDB: `localhost:27017`
- Redis: `localhost:6379`
- Kafka: `localhost:9092`
- Elasticsearch: `http://localhost:9200`

## Notes

- Docker is not installed in this workspace at the moment, so the compose stack is scaffolded but not executed here.
- The documentation uses the prompt-approved stack as the primary source of truth.
- AWS S3 appears only as the approved exception for document/media binaries; MongoDB remains the metadata and version-history store.

