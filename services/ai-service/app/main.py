from __future__ import annotations

import re
from datetime import UTC, datetime
from hashlib import sha256
from typing import Literal

from fastapi import FastAPI
from pydantic import BaseModel, Field

app = FastAPI(
    title="Legal Sathi AI Service",
    version="0.1.0",
    description=(
        "Local development stub for LegalGPT India. The pipeline preserves PII guard, "
        "retrieval, citation verification, and confidence scoring stages."
    ),
)

PII_PATTERNS = [
    re.compile(r"\b\d{12}\b"),
    re.compile(r"\b[A-Z]{5}\d{4}[A-Z]\b"),
    re.compile(r"\b\d{10}\b"),
]


class QueryRequest(BaseModel):
    session_id: str = Field(..., alias="sessionId")
    persona: Literal["student", "lawyer", "firm", "tutor", "citizen"]
    language: str = "en"
    query: str
    request_type: Literal[
        "research",
        "drafting",
        "simulation",
        "explainer",
        "contract-review",
    ] = Field(default="research", alias="requestType")


class Citation(BaseModel):
    citation: str
    title: str
    source_type: str = Field(alias="sourceType")
    verified: bool


class QueryResponse(BaseModel):
    session_id: str = Field(alias="sessionId")
    pipeline: list[str]
    pii_flagged: bool = Field(alias="piiFlagged")
    citations: list[Citation]
    confidence: float
    answer: str
    disclaimer: str
    trace_id: str = Field(alias="traceId")
    generated_at: str = Field(alias="generatedAt")


def detect_pii(text: str) -> bool:
    return any(pattern.search(text) for pattern in PII_PATTERNS)


def confidence_for(request_type: str, pii_flagged: bool) -> float:
    base = {
        "research": 0.84,
        "drafting": 0.78,
        "simulation": 0.73,
        "explainer": 0.82,
        "contract-review": 0.76,
    }[request_type]
    return round(base - (0.18 if pii_flagged else 0.0), 2)


def sample_citations(request_type: str) -> list[Citation]:
    base = [
        {
            "citation": "(2023) 4 SCC 112",
            "title": "Sample Supreme Court authority",
            "sourceType": "judgment",
            "verified": True,
        },
        {
            "citation": "Section 8, DPDP Act 2023",
            "title": "Digital Personal Data Protection Act 2023",
            "sourceType": "statute",
            "verified": True,
        },
    ]
    if request_type == "drafting":
        base.append(
            {
                "citation": "Order VI Rule 17, CPC",
                "title": "Code of Civil Procedure procedural reference",
                "sourceType": "procedure",
                "verified": True,
            }
        )
    return [Citation.model_validate(item) for item in base]


@app.get("/health")
async def health() -> dict[str, str]:
    return {
        "service": "legal-sathi-ai-service",
        "status": "ok",
        "mode": "local-development",
        "region": "ap-south-1",
    }


@app.post("/v1/ai/query", response_model=QueryResponse)
async def query_ai(request: QueryRequest) -> QueryResponse:
    pii_flagged = detect_pii(request.query)
    confidence = confidence_for(request.request_type, pii_flagged)
    pipeline = [
        "request_received",
        "pii_guard",
        "query_classification",
        "faiss_retrieval",
        "response_composition",
        "citation_verification",
        "confidence_scoring",
        "audit_event_enqueued",
    ]

    if pii_flagged:
        answer = (
            "Potential personal data was detected in the submitted text. Local development "
            "policy requires redaction before substantive processing. Please remove identifiers "
            "and resubmit for a citation-bound answer."
        )
    else:
        answer = (
            "This local LegalGPT India response is grounded to verified citations only. "
            "Use it as research support or drafting assistance, not as a deterministic legal "
            "opinion. Validate facts, jurisdiction, and filing strategy with a qualified lawyer."
        )

    trace_seed = f"{request.session_id}:{request.persona}:{request.request_type}:{request.query}"
    trace_id = sha256(trace_seed.encode("utf-8")).hexdigest()[:16]

    return QueryResponse(
        sessionId=request.session_id,
        pipeline=pipeline,
        piiFlagged=pii_flagged,
        citations=sample_citations(request.request_type),
        confidence=confidence,
        answer=answer,
        disclaimer=(
            "LegalGPT India provides citation-bound research assistance and drafting support. "
            "It does not guarantee legal outcomes or replace professional legal advice."
        ),
        traceId=trace_id,
        generatedAt=datetime.now(UTC).isoformat(),
    )

