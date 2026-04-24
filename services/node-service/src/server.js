import cors from "cors";
import express from "express";
import pino from "pino";
import { ApolloServer, gql } from "apollo-server-express";

const port = Number(process.env.PORT || 8080);
const serviceName = process.env.SERVICE_NAME || "legal-sathi-service";
const serviceRole = process.env.SERVICE_ROLE || "domain";
const logLevel = process.env.LOG_LEVEL || "info";
const kafkaTopics = (process.env.KAFKA_TOPICS || "")
  .split(",")
  .map((topic) => topic.trim())
  .filter(Boolean);
const downstreamServices = (process.env.DOWNSTREAM_SERVICES || "")
  .split(",")
  .map((service) => service.trim())
  .filter(Boolean);

const logger = pino({
  level: logLevel,
  name: serviceName,
});

const app = express();
app.use(cors());
app.use(express.json({ limit: "1mb" }));

app.use((req, res, next) => {
  const startedAt = Date.now();

  res.on("finish", () => {
    logger.info(
      {
        method: req.method,
        path: req.originalUrl,
        statusCode: res.statusCode,
        durationMs: Date.now() - startedAt,
      },
      "request.completed",
    );
  });

  next();
});

app.get("/health", async (_req, res) => {
  res.json({
    service: serviceName,
    role: serviceRole,
    status: "ok",
    runtime: "nodejs20-express-apollo",
    region: process.env.AWS_REGION || "ap-south-1",
  });
});

app.get("/metadata", async (_req, res) => {
  res.json({
    service: serviceName,
    role: serviceRole,
    port,
    dependencies: {
      postgresUrl: process.env.POSTGRES_URL,
      mongodbUrl: process.env.MONGODB_URL,
      redisUrl: process.env.REDIS_URL,
      kafkaBrokers: process.env.KAFKA_BROKERS,
      elasticsearchUrl: process.env.ELASTICSEARCH_URL,
      aiServiceUrl: process.env.AI_SERVICE_URL,
      s3Bucket: process.env.S3_BUCKET,
    },
    kafkaTopics,
    downstreamServices,
    compliance: {
      dataResidency: "ap-south-1",
      auditRetentionYears: 7,
      consentManagerEnabled: true,
    },
  });
});

app.get("/openapi.json", async (_req, res) => {
  res.json({
    openapi: "3.1.0",
    info: {
      title: `${serviceName} API`,
      version: "0.1.0",
      description:
        "Local development stub for Legal Sathi services. REST and GraphQL contracts are documented in docs/04-prd-brd.md.",
    },
    servers: [{ url: `http://localhost:${port}` }],
    paths: {
      "/health": {
        get: {
          summary: "Service liveness",
          responses: {
            "200": { description: "Healthy service" },
          },
        },
      },
      "/metadata": {
        get: {
          summary: "Service metadata",
          responses: {
            "200": { description: "Service topology metadata" },
          },
        },
      },
      "/graphql": {
        post: {
          summary: "GraphQL endpoint",
          responses: {
            "200": { description: "GraphQL response" },
          },
        },
      },
    },
  });
});

const typeDefs = gql`
  type Dependency {
    name: String!
    category: String!
  }

  type ServiceInfo {
    name: String!
    role: String!
    port: Int!
    kafkaTopics: [String!]!
    downstreamServices: [String!]!
  }

  type Query {
    health: String!
    serviceInfo: ServiceInfo!
    dependencies: [Dependency!]!
  }
`;

const dependencyCatalog = [
  { name: "PostgreSQL 16", category: "transactional-store" },
  { name: "MongoDB 7", category: "document-store" },
  { name: "Redis 7", category: "cache" },
  { name: "Apache Kafka", category: "event-stream" },
  { name: "Elasticsearch 8", category: "search" },
  { name: "LegalGPT India AI Service", category: "ai-pipeline" },
];

const resolvers = {
  Query: {
    health: () => "ok",
    serviceInfo: () => ({
      name: serviceName,
      role: serviceRole,
      port,
      kafkaTopics,
      downstreamServices,
    }),
    dependencies: () => dependencyCatalog,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

await server.start();
server.applyMiddleware({ app, path: "/graphql" });

app.listen(port, () => {
  logger.info(
    {
      port,
      graphqlPath: "/graphql",
      kafkaTopics,
      downstreamServices,
    },
    "service.started",
  );
});

