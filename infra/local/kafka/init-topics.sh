#!/bin/bash
set -euo pipefail

TOPICS=(
  "court.events.raw"
  "court.events.parsed"
  "alerts.dispatch"
  "billing.events"
  "document.events"
  "ai.audit"
  "consent.events"
)

until /opt/bitnami/kafka/bin/kafka-topics.sh --bootstrap-server kafka:9092 --list >/dev/null 2>&1; do
  echo "Waiting for Kafka broker..."
  sleep 3
done

for topic in "${TOPICS[@]}"; do
  /opt/bitnami/kafka/bin/kafka-topics.sh \
    --bootstrap-server kafka:9092 \
    --create \
    --if-not-exists \
    --topic "${topic}" \
    --replication-factor 1 \
    --partitions 3
done

echo "Kafka topics initialized."

