import cors from "cors";
import express from "express";
import pino from "pino";

const app = express();
const port = Number(process.env.PORT || 8090);
const logger = pino({
  level: process.env.LOG_LEVEL || "info",
  name: "integration-mocks",
});

const fixtures = {
  ecourts: {
    causeListUpdate: {
      caseNumber: "WP/1234/2026",
      court: "Delhi High Court",
      serialNumber: 18,
      hearingAt: "2026-04-16T10:30:00+05:30",
    },
  },
  razorpay: {
    paymentCaptured: {
      paymentId: "pay_local_001",
      orderId: "order_local_001",
      amount: 250000,
      currency: "INR",
      status: "captured",
    },
  },
  agora: {
    sessionReady: {
      roomId: "consult-room-local-001",
      status: "ready",
    },
  },
  whatsapp: {
    messageDelivered: {
      messageId: "wa_local_001",
      status: "delivered",
    },
  },
  digilocker: {
    esignComplete: {
      documentId: "doc_local_001",
      status: "signed",
    },
  },
};

app.use(cors());
app.use(express.json({ limit: "1mb" }));

app.get("/health", (_req, res) => {
  res.json({
    service: "integration-mocks",
    status: "ok",
    providers: Object.keys(fixtures),
  });
});

app.get("/fixtures", (_req, res) => {
  res.json(fixtures);
});

app.post("/replay/:provider/:fixture", (req, res) => {
  const provider = req.params.provider;
  const fixture = req.params.fixture;
  const payload = fixtures[provider]?.[fixture];

  if (!payload) {
    return res.status(404).json({
      error: "fixture_not_found",
      provider,
      fixture,
    });
  }

  logger.info({ provider, fixture, payload }, "fixture.replayed");
  return res.json({
    provider,
    fixture,
    payload,
    replayedAt: new Date().toISOString(),
  });
});

for (const provider of Object.keys(fixtures)) {
  app.post(`/webhooks/${provider}`, (req, res) => {
    logger.info(
      {
        provider,
        payload: req.body,
      },
      "webhook.received",
    );

    res.json({
      status: "accepted",
      provider,
      receivedAt: new Date().toISOString(),
    });
  });
}

app.listen(port, () => {
  logger.info({ port }, "integration.mocks.started");
});
