# 📁 [DELIVERABLE 3: DETAILED FLOW DESIGN]

## 1. Citizen Books a Verified Lawyer Consultation

```mermaid
sequenceDiagram
    autonumber
    actor Citizen
    participant App as Citizen Mobile App
    participant GW as API Gateway
    participant Discovery as Lawyer Discovery Service
    participant Profile as Profile & Persona Service
    participant Consult as Consultation & Scheduling Service
    participant Billing as Billing & Subscription Service
    participant Razorpay as Razorpay
    participant Agora as Agora.io
    participant Notify as Notification & Consent Service
    participant Audit as Immutable Audit Logger

    Citizen->>App: Search by practice area, city, language, budget
    App->>GW: REST /lawyers?filters=...
    GW->>Discovery: Search verified lawyers
    Discovery->>Profile: Fetch verification and availability summary
    Profile-->>Discovery: Verified profile cards
    Discovery-->>GW: Ranked lawyer list
    GW-->>App: Results with verified badges and fee range
    Citizen->>App: Select lawyer and slot
    App->>GW: POST /consultations
    GW->>Consult: Create provisional booking
    Consult->>Billing: Create payment order
    Billing->>Razorpay: Create order
    Razorpay-->>Billing: order_id
    Billing-->>Consult: Payment session created
    Consult-->>GW: Booking awaiting payment
    GW-->>App: Launch payment sheet
    Citizen->>Razorpay: Complete payment
    alt Payment webhook arrives in time
        Razorpay->>Billing: payment.captured webhook
        Billing->>Consult: Mark consultation paid
        Consult->>Agora: Create video room token
        Agora-->>Consult: room token
        Consult->>Notify: Send lawyer and citizen confirmations
        Notify->>Audit: consultation.confirmed
        Consult->>Audit: consultation.booked
        GW-->>App: Booking confirmed with meeting link
    else Payment webhook delayed or network timeout
        App->>GW: GET /billing/payment-status?orderId=...
        GW->>Billing: Poll payment status
        Billing->>Razorpay: Fetch payment status
        Razorpay-->>Billing: captured
        Billing->>Consult: Mark consultation paid idempotently
        Consult->>Notify: Send delayed confirmation
        Billing->>Audit: payment.reconciled_after_timeout
        GW-->>App: Booking confirmed after retry
    else Payment failed
        Razorpay-->>Billing: failed
        Billing->>Consult: Release provisional slot
        Billing->>Audit: payment.failed
        GW-->>App: Payment failed, choose another slot or retry
    end
```

## 2. Independent Lawyer Receives a Real-Time Court Alert and Updates Case Status

```mermaid
sequenceDiagram
    autonumber
    actor Lawyer
    participant eCourts as eCourts API
    participant Scraper as Fallback Scrapers
    participant Court as Court Data Pipeline Service
    participant Kafka as Apache Kafka
    participant Notify as Notification & Consent Service
    participant App as Lawyer Mobile App
    participant Case as Case Management Service
    participant Audit as Immutable Audit Logger

    eCourts->>Court: Cause list update
    Court->>Kafka: Publish court.events.raw
    Kafka->>Court: Consume raw event
    Court->>Court: Parse cause list and match enrolled cases
    Court->>Kafka: Publish court.events.parsed
    Kafka->>Notify: Deliver parsed court event
    Notify->>Notify: Evaluate consent, quiet hours, escalation rules
    Notify->>App: Push "Your case is within 5 serials"
    Notify->>Audit: alert.dispatched
    Lawyer->>App: Open alert and case detail
    App->>Case: PATCH /cases/{id}/status
    Case->>Kafka: Publish document.events or follow-up reminders if needed
    Case->>Audit: case.status.updated
    Case-->>App: Updated timeline and next action
    alt eCourts unavailable
        Scraper->>Court: Fallback scraped cause list
        Court->>Audit: ecourts.primary_unavailable_fallback_used
        Court->>Kafka: Publish court.events.raw from scraper source
    else Parser confidence is low
        Court->>Audit: parser.low_confidence_manual_review_flagged
        Notify->>App: Send cautionary in-app alert with verification banner
    end
```

## 3. Firm Partner Assigns a Matter, Team Drafts, and Partner Approves

```mermaid
sequenceDiagram
    autonumber
    actor Partner
    actor Associate
    participant Web as Firm Web Dashboard
    participant GW as API Gateway
    participant Case as Case Management Service
    participant Docs as Document Vault Service
    participant AI as LegalGPT India Orchestrator Service
    participant AISvc as Python FastAPI AI Service
    participant Notify as Notification & Consent Service
    participant Audit as Immutable Audit Logger

    Partner->>Web: Create matter and assign associate
    Web->>GW: POST /cases and assignment payload
    GW->>Case: Create matter and workload assignment
    Case->>Notify: Send assignment event
    Case->>Audit: matter.created
    Notify-->>Web: Assignment acknowledged
    Associate->>Web: Open drafting workspace
    Web->>GW: POST /documents
    GW->>Docs: Create draft version
    Docs->>Audit: document.version.created
    Associate->>Web: Request AI drafting support
    Web->>GW: POST /ai/query requestType=drafting
    GW->>AI: Forward drafting request
    AI->>AISvc: gRPC query with matter context
    AISvc-->>AI: Citation-bound drafting guidance with confidence score
    AI->>Audit: ai.drafting.response_recorded
    AI-->>Web: Suggested clauses and citations
    Associate->>Web: Submit for partner review
    Web->>GW: POST /documents/{id}/submit-review
    GW->>Docs: Lock version and mark under_review
    Docs->>Notify: Notify partner
    alt Partner approves
        Partner->>Web: Approve final draft
        Web->>GW: POST /documents/{id}/approve
        GW->>Docs: Mark approved and release share link
        Docs->>Audit: document.approved
        Notify-->>Web: Approval confirmation
    else Partner rejects with comments
        Partner->>Web: Reject with redlines
        Web->>GW: POST /documents/{id}/reject
        GW->>Docs: Create review comment thread
        Docs->>Notify: Notify associate for revisions
        Docs->>Audit: document.rejected_for_revision
    else AI response confidence below threshold
        AISvc-->>AI: confidence below threshold
        AI->>Audit: ai.low_confidence_blocked_for_human_review
        AI-->>Web: Return citations only with caution banner
    end
```

## 4. Law Student Uses LegalGPT India for Moot Memorial Drafting and Judge Simulation

```mermaid
sequenceDiagram
    autonumber
    actor Student
    participant App as Student Mobile App
    participant GW as API Gateway
    participant Search as Search & Knowledge Service
    participant AI as LegalGPT India Orchestrator Service
    participant AISvc as Python FastAPI AI Service
    participant Audit as Immutable Audit Logger

    Student->>App: Ask for memorial structure and likely counter-arguments
    App->>GW: POST /ai/query requestType=drafting
    GW->>AI: Route student drafting request
    AI->>AISvc: Submit query for PII guard and retrieval
    AISvc->>AISvc: PII guard and query classification
    AISvc->>Search: Retrieve judgments and statutory references
    Search-->>AISvc: Ranked legal authorities
    AISvc->>AISvc: Compose answer, verify citations, compute confidence
    alt Confidence above threshold
        AISvc-->>AI: Drafting guidance with citations and disclaimer
        AI->>Audit: ai.query.completed
        AI-->>GW: Citation-bound response
        GW-->>App: Memorial outline and AI judge prompts
    else Confidence below threshold
        AISvc-->>AI: Citations only, no full drafting recommendation
        AI->>Audit: ai.query.low_confidence
        GW-->>App: Retrieved authorities, caution banner, suggested clarification prompts
    end
    Student->>App: Start AI judge simulation
    App->>GW: POST /ai/query requestType=simulation
    GW->>AI: Route simulation session
    AI->>AISvc: Run same citation-bound pipeline
    AISvc-->>AI: Bench questions with cited authority anchors
    AI->>Audit: ai.simulation.completed
    GW-->>App: Judge simulation script with confidence score
    Note over App,AISvc: Every response includes a disclaimer that LegalGPT India is research support, not deterministic legal advice.
```

## 5. Law Tutor Publishes a Course, Student Enrolls, AI Grading Runs, and Certificate Is Issued

```mermaid
sequenceDiagram
    autonumber
    actor Tutor
    actor Student
    participant Web as Tutor Web Dashboard
    participant GW as API Gateway
    participant Admin as Admin & Tenant Management Service
    participant Billing as Billing & Subscription Service
    participant Docs as Document Vault Service
    participant AI as LegalGPT India Orchestrator Service
    participant AISvc as Python FastAPI AI Service
    participant Notify as Notification & Consent Service
    participant Audit as Immutable Audit Logger

    Tutor->>Web: Publish course with modules and assessments
    Web->>GW: POST /admin/courses
    GW->>Admin: Create draft course
    Admin->>Docs: Store curriculum assets and certificate template
    Admin->>Audit: course.created
    Admin-->>Web: Draft saved
    Student->>GW: POST /billing/checkout for course enrollment
    GW->>Billing: Create order
    Billing-->>GW: Payment session ready
    Student->>Billing: Complete payment
    Billing->>Admin: Confirm enrollment
    Admin->>Notify: Send enrollment confirmation
    Admin->>Audit: student.enrolled
    Student->>GW: Submit assessment
    GW->>AI: POST /ai/query requestType=simulation
    AI->>AISvc: Grade answers against rubric
    alt Confidence above threshold
        AISvc-->>AI: Scores, rubric notes, improvement guidance
        AI->>Admin: Persist grade and completion status
        Admin->>Docs: Generate certificate artifact
        Docs->>Notify: Send certificate issued notification
        Admin->>Audit: certificate.issued
        GW-->>Student: Graded result and certificate link
    else Confidence below threshold
        AISvc-->>AI: Manual review required
        AI->>Admin: Mark submission pending tutor review
        Admin->>Notify: Notify tutor and student
        AI->>Audit: assessment.manual_review_required
        GW-->>Student: Submission received, tutor review pending
    end
    alt Payment callback delayed
        Billing->>Audit: enrollment.payment_reconciliation_started
        Admin-->>Student: Enrollment pending confirmation banner
    end
```

## Flow Design Guarantees

- Every critical path records immutable audit events.
- Every AI path includes PII guard, retrieval, citation verification, confidence scoring, and explicit disclaimer behavior.
- Every external integration path uses idempotency and retry-safe reconciliation.
