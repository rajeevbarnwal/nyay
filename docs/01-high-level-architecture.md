# 📁 [DELIVERABLE 1: HIGH-LEVEL ARCHITECTURE]

## Scope

This diagram implements the approved Legal Sathi high-level architecture for MacBook-first development while preserving the production target of AWS `ap-south-1`, Kubernetes/EKS, and microservice boundaries.

- Solid arrows: synchronous REST/GraphQL or direct service calls
- Dotted arrows: asynchronous Kafka streams and event-driven propagation

```mermaid
graph LR
  subgraph PersonaEntry["5 Persona Entry Points"]
    Student["Law Students"]
    Lawyer["Independent Lawyers"]
    Firm["Law Firms"]
    Tutor["Law Tutors"]
    Citizen["Citizens"]
  end

  Mobile["React Native Mobile App<br/>Android-first, offline-capable"]
  Web["React.js + TypeScript Web App<br/>PWA, Admin, Firm Dashboards"]
  APIGW["API Gateway<br/>Node.js 20 + Express.js + Apollo GraphQL"]

  Student --> Mobile
  Lawyer --> Mobile
  Citizen --> Mobile
  Firm --> Web
  Tutor --> Web
  Mobile -->|REST / GraphQL| APIGW
  Web -->|REST / GraphQL| APIGW

  subgraph CoreServices["Core Microservices"]
    Auth["Auth & Identity Service"]
    Profile["Profile & Persona Service"]
    LawyerDiscovery["Lawyer Discovery Service"]
    CaseMgmt["Case Management Service"]
    CourtData["Court Data Pipeline Service"]
    Consult["Consultation & Scheduling Service"]
    Billing["Billing & Subscription Service"]
    Documents["Document Vault Service"]
    Search["Search & Knowledge Service"]
    AIOrchestrator["LegalGPT India Orchestrator Service"]
    Notify["Notification & Consent Service"]
    Admin["Admin & Tenant Management Service"]
  end

  APIGW --> Auth
  APIGW --> Profile
  APIGW --> LawyerDiscovery
  APIGW --> CaseMgmt
  APIGW --> CourtData
  APIGW --> Consult
  APIGW --> Billing
  APIGW --> Documents
  APIGW --> Search
  APIGW --> AIOrchestrator
  APIGW --> Notify
  APIGW --> Admin

  subgraph DataStores["Core Data Stores"]
    Postgres["PostgreSQL 16"]
    Mongo["MongoDB 7"]
    Elastic["Elasticsearch 8"]
    Redis["Redis 7"]
    Kafka["Apache Kafka"]
    FAISS["FAISS Index"]
    S3["AWS S3"]
  end

  Auth --> Postgres
  Profile --> Postgres
  LawyerDiscovery --> Postgres
  CaseMgmt --> Postgres
  Consult --> Postgres
  Billing --> Postgres
  Admin --> Postgres
  Documents --> Mongo
  Documents --> S3
  Search --> Elastic
  Search --> Redis
  CaseMgmt --> Redis
  Notify --> Redis
  AIOrchestrator --> Redis

  subgraph AIPipeline["LegalGPT India Pipeline"]
    FastAPI["Python FastAPI AI Service"]
    LangChain["LangChain Orchestration"]
  end

  AIOrchestrator -->|gRPC / internal call| FastAPI
  FastAPI --> LangChain
  LangChain --> FAISS
  LangChain --> Elastic
  FastAPI --> Mongo
  FastAPI -. "ai.audit" .-> Kafka

  CourtData -. "court.events.raw" .-> Kafka
  Kafka -. "court.events.parsed" .-> CaseMgmt
  Kafka -. "alerts.dispatch" .-> Notify
  Billing -. "billing.events" .-> Kafka
  Documents -. "document.events" .-> Kafka
  Notify -. "consent.events" .-> Kafka

  subgraph Integrations["External Integrations"]
    eCourts["eCourts API"]
    Razorpay["Razorpay"]
    Agora["Agora.io"]
    WhatsApp["Meta WhatsApp Business API"]
    DigiLocker["DigiLocker / eSign"]
  end

  CourtData --> eCourts
  Billing --> Razorpay
  Consult --> Agora
  Notify --> WhatsApp
  Documents --> DigiLocker
```

## Architecture Notes

- `LegalGPT India Orchestrator Service` is the only Node-side entry point into the AI pipeline.
- `Document Vault Service` stores metadata and version history in MongoDB and document/media binaries in AWS S3.
- `Search & Knowledge Service` owns judgment retrieval, faceting, and cross-language search against Elasticsearch.
- `Court Data Pipeline Service` is the only service allowed to ingest directly from eCourts and emit court event streams.

## Assumptions

- `[ASSUMPTION]` Local development uses Docker Compose with single-node data services; production remains multi-AZ on AWS `ap-south-1`.
- `[ASSUMPTION]` Local FAISS indexes and Elasticsearch corpora are reduced datasets for faster iteration on the MacBook.
- `[ASSUMPTION]` AWS S3 access can remain adapter-driven in local development until credentials are configured, without changing the production storage boundary.

