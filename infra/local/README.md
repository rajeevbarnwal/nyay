# Local Stack Notes

This directory contains the MacBook-first local development stack for Legal Sathi.

## Services

- `postgres`: transactional system of record for users, billing, cases, audit indexes
- `mongodb`: document metadata, templates, version history
- `redis`: cache, rate limiting, sync cursor storage
- `kafka`: event streams for court alerts, billing, document, consent, and AI audit topics
- `elasticsearch`: search index for judgments and faceted retrieval
- `api-gateway`: external REST and GraphQL entry point
- domain services: one container per approved service boundary
- `ai-service`: FastAPI service for LegalGPT India orchestration support
- `integration-mocks`: local webhook and adapter simulation

## Local Assumptions

- Local Docker Compose runs a single-node topology.
- Elasticsearch security is disabled only for local development.
- AWS S3 is represented as a logical dependency; document binary flows stay adapter-driven until AWS credentials are wired.
- Kafka topics are created by `kafka-init` during stack startup.

