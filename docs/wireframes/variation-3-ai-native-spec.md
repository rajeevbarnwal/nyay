# Variation 3 — AI Native Design Spec

## Summary

- Visual character: Guided, supportive, and deeply integrated with LegalGPT India workflows.
- Mobile concept: Now / Next / Later guided journey
- Desktop concept: Queue, workspace, insights layout
- Best use: Students, tutors, guided workflows, and high-frequency LegalGPT India engagement.
- Reference blend: Blends supportive AI interaction cues with gamified progress and guided workflow reduction.

## Design Tokens

| Token | Value |
|---|---|
| Font sans | `Inter, ui-sans-serif, system-ui, sans-serif` |
| Font mono | `JetBrains Mono, ui-monospace, monospace` |
| Radius card | `12px / 18px / 26px` |
| Elevation | `shadow-panel`, `shadow-float` |
| Mobile padding | `16px` |
| Desktop padding | `24px` |
| Touch target minimum | `44dp` |
| Desktop rail collapse | `768px` |

### Color Palette

| Token | Hex |
|---|---|
| Primary 50 | `#eef6ff` |
| Primary 100 | `#d9ebff` |
| Primary 200 | `#b8d7ff` |
| Primary 300 | `#86baff` |
| Primary 400 | `#5795ff` |
| Primary 500 | `#356fe4` |
| Primary 600 | `#254ec8` |
| Primary 700 | `#1f3ea4` |
| Primary 800 | `#1e357f` |
| Primary 900 | `#172554` |
| Accent 50 | `#fff7ed` |
| Accent 100 | `#ffedd5` |
| Accent 200 | `#fed7aa` |
| Accent 300 | `#fdba74` |
| Accent 400 | `#fb923c` |
| Accent 500 | `#f97316` |
| Accent 600 | `#d97706` |
| Accent 700 | `#b45309` |
| Accent 800 | `#92400e` |
| Accent 900 | `#78350f` |
| Neutral 50 | `#f8fafc` |
| Neutral 100 | `#f1f5f9` |
| Neutral 200 | `#e2e8f0` |
| Neutral 300 | `#cbd5e1` |
| Neutral 400 | `#94a3b8` |
| Neutral 500 | `#64748b` |
| Neutral 600 | `#475569` |
| Neutral 700 | `#334155` |
| Neutral 800 | `#1e293b` |
| Neutral 900 | `#0f172a` |
| Success | `#15803d` |
| Warning | `#d97706` |
| Danger | `#be123c` |
| Info | `#0f766e` |

## Typography Scale

| Token | Usage |
|---|---|
| `text-5xl` / `text-4xl` | dashboard hero headlines |
| `text-3xl` / `text-2xl` | section titles and critical metrics |
| `text-base` | body copy and card titles |
| `text-sm` | metadata and helper copy |
| `text-xs` | labels, state captions, audit details |
| `font-mono` | case IDs, invoice numbers, system references |

## Accessibility Specs

<!-- ACCESSIBILITY SPECS -->
<!--
Contrast Ratios:
- Primary text (#0f172a) on white (#FFFFFF): 17.9:1
- Secondary text (#334155) on white (#FFFFFF): 10.4:1
- Primary button text (#FFFFFF) on primary background (#254ec8): 7.0:1
-->

- WCAG 2.1 AA target is the baseline for all preview surfaces.
- All interactive controls use visible focus rings and `tabindex="0"` where needed.
- Real-time court alerts and sync updates are annotated with `aria-live="polite"`.
- Every desktop chart has a text fallback panel or explicit supporting metrics.
- Bottom navigation items, icon controls, and CTA buttons all meet or exceed `44dp`.

## Required State Coverage

- Loading state shown for every screen as animated skeleton blocks.
- Empty state shown for every screen with a contextual CTA.
- Error state shown for every screen with retry action.
- Offline state shown for every screen with sync guidance.

## Component Library

| Component | Purpose | Notes |
|---|---|---|
| AppHeader | top context and task framing | persona-aware and state-aware |
| BottomNavigationBar | mobile primary nav | max 5 items |
| LeftNavigationRail | desktop primary nav | collapses at `768px` |
| KPIBand | metrics summary | priority numbers before labels |
| TimelineCard | hearings and deadlines | always includes status badge |
| MatterCard | case or workflow summary | action-focused, not decorative |
| LegalGPTPanel | assistant and citation support | visible on at least 5 screens |
| StateCard | loading, empty, error, offline | standardized across screens |
| AnalyticsPanel | charts, counts, trends | must include textual context |
| ConsentPanel | DPDP preference and rights management | surfaced in `S-03` and `S-18` |

## Variation Comparison Matrix


| Variation | Character | Strongest Personas | Mobile Bias | Desktop Bias | Best Use |
|---|---|---|---|---|---|
| Variation 1 — Bharat First | Warm, grounded, courtroom-ready | Lawyers, firms, citizens | stacked command cards | 3-column command room | operational beta launch |
| Variation 2 — Legal Pro | Premium, analytical, structured | Admin, firms, compliance | modular discovery grid | KPI and analytics tile board | mature legal operations |
| Variation 3 — AI Native | Guided, supportive, assistant-led | Students, tutors, guided professionals | now/next/later flow | queue + workspace + insights | LegalGPT India-heavy workflows |


## Screen Hierarchies

### S-01 Splash / Onboarding

- Viewport: Mobile
- Audience: All
- Purpose: App launch, persona selection, language entry
- LegalGPT India visible: No

Component Tree:
```
SplashContainer
├── StatusBar
├── BrandHero
│   ├── LegalSathiLogo
│   ├── Tagline
│   └── LanguageSwitcher
├── PersonaCardGrid
│   └── PersonaCard[]
├── TrustStrip
└── PrimaryCTA
```

State Coverage:
- Loading: skeleton placeholders for key content regions.
- Empty: No onboarding pack cached — Download the latest persona pack to continue setup.
- Error: Couldn't load onboarding assets. Please retry.
- Offline: You're offline. Cached language packs remain available.

### S-02 Auth — Login/Signup

- Viewport: Mobile
- Audience: All
- Purpose: Secure authentication and account entry
- LegalGPT India visible: No

Component Tree:
```
AuthContainer
├── Header
│   ├── WelcomeText
│   └── SecurityBadge
├── AuthMethodTabs
├── CredentialForm
│   ├── IdentifierField
│   ├── SecretField
│   ├── OTPFieldGroup
│   └── SubmitButton
├── AlternateSignInOptions
└── RecoveryLinks
```

State Coverage:
- Loading: skeleton placeholders for key content regions.
- Empty: No sign-in methods enabled — Activate email, phone, or SSO to let users log in.
- Error: Authentication service is temporarily unavailable.
- Offline: Offline mode supports only last-session read access.

### S-03 Profile Setup

- Viewport: Mobile
- Audience: All
- Purpose: Collect persona-specific context and DPDP consent
- LegalGPT India visible: Yes

Component Tree:
```
ProfileSetupContainer
├── ProgressHeader
├── PersonaSummaryChip
├── FormSection
│   ├── IdentityFields
│   ├── PersonaContextFields
│   ├── LanguagePreferences
│   └── NotificationPreferences
├── DPDPConsentManager
│   ├── PurposeDisclosure
│   ├── ConsentToggleList
│   └── ExportDeleteLinks
└── SaveActions
```

State Coverage:
- Loading: skeleton placeholders for key content regions.
- Empty: Profile details not started — Add persona details to personalize Legal Sathi.
- Error: Profile setup couldn't be saved. Try again.
- Offline: Profile edits are saved locally and will sync later.

### S-04 Home — Morning Brief

- Viewport: Mobile
- Audience: Lawyer/Firm
- Purpose: Daily agenda, hearings, alerts, AI quick access
- LegalGPT India visible: Yes

Component Tree:
```
HomeContainer
├── OfflineBanner
├── GreetingHeader
│   ├── GreetingText
│   ├── DateDisplay
│   └── NotificationBadge
├── TodaySchedule
│   └── HearingCard[]
├── PendingTasks
├── LegalGPTQuickAccess
│   ├── AssistantButton
│   └── SuggestedPrompt[]
├── ConsultationCalendarStrip
└── BottomNavigationBar
```

State Coverage:
- Loading: skeleton placeholders for key content regions.
- Empty: No hearings scheduled today — Your calendar is clear. Add a matter or client follow-up.
- Error: Morning brief failed to refresh.
- Offline: Showing last synced hearings and task cards from cache.

### S-05 Case Management

- Viewport: Mobile
- Audience: Lawyer/Firm
- Purpose: Active matter overview and filters
- LegalGPT India visible: Yes

Component Tree:
```
CaseManagementContainer
├── FilterHeader
│   ├── SearchInput
│   ├── FilterChips
│   └── SortMenu
├── CaseList
│   └── CaseCard[]
├── QuickSummaryBar
├── FloatingCreateButton
└── BottomNavigationBar
```

State Coverage:
- Loading: skeleton placeholders for key content regions.
- Empty: No cases yet — Get started by creating a new case or importing one.
- Error: Failed to load matters. Please try again.
- Offline: Cached matters are available. New edits will sync later.

### S-06 Case Detail View

- Viewport: Mobile
- Audience: Lawyer/Firm
- Purpose: Single matter workspace
- LegalGPT India visible: Yes

Component Tree:
```
CaseDetailContainer
├── MatterHeader
│   ├── MatterIdentity
│   ├── StatusBadge
│   └── QuickActions
├── TabNavigation
├── TimelineSection
├── NotesSection
├── DocumentVaultPreview
├── ClientCommunicationLog
└── LegalGPTMatterAssist
```

State Coverage:
- Loading: skeleton placeholders for key content regions.
- Empty: No timeline activity yet — Add the first note, hearing, or document to start this matter.
- Error: Matter details couldn't be loaded.
- Offline: Viewing cached matter details. Edits will sync when online.

### S-07 AI Legal Assistant

- Viewport: Mobile
- Audience: All
- Purpose: LegalGPT India chat with citations and confidence
- LegalGPT India visible: Yes

Component Tree:
```
LegalGPTContainer
├── ConversationHeader
│   ├── Title
│   ├── LanguageSwitcher
│   └── ConfidenceLegend
├── ConversationThread
│   └── MessageBubble[]
├── CitationShelf
├── SuggestedPromptRow
├── Composer
│   ├── VoiceInput
│   ├── TextArea
│   └── SubmitButton
└── DisclaimerFooter
```

State Coverage:
- Loading: skeleton placeholders for key content regions.
- Empty: No conversation yet — Start with a prompt about a judgment, matter, or memorial.
- Error: LegalGPT India couldn't complete this request.
- Offline: Chat history is cached. New questions require connectivity.

### S-08 Judgment Search

- Viewport: Mobile
- Audience: Student/Lawyer
- Purpose: Case law research and retrieval
- LegalGPT India visible: Yes

Component Tree:
```
JudgmentSearchContainer
├── SearchHeader
│   ├── QueryInput
│   ├── FilterDrawerTrigger
│   └── SaveSearchAction
├── FilterChips
├── ResultsList
│   └── JudgmentResultCard[]
├── CrossReferencePreview
└── FooterActions
```

State Coverage:
- Loading: skeleton placeholders for key content regions.
- Empty: No judgments match those filters — Try a broader court range or fewer citation filters.
- Error: Search results couldn't be loaded.
- Offline: Saved judgments stay available offline. Live search will resume when online.

### S-09 Moot Court Suite

- Viewport: Mobile
- Audience: Student
- Purpose: Moot prep, memorial drafting, AI judge simulation
- LegalGPT India visible: Yes

Component Tree:
```
MootSuiteContainer
├── ProblemSelector
├── ProgressOverview
├── MemorialDraftPanel
├── CounterArgumentBuilder
├── JudgeSimulationPanel
├── ScoringRubric
└── PeerReviewActions
```

State Coverage:
- Loading: skeleton placeholders for key content regions.
- Empty: No moot problem selected — Pick a moot problem to unlock memorial drafting and judge simulation.
- Error: Moot workspace failed to load.
- Offline: Saved memorial drafts remain editable offline.

### S-10 Internship Hub

- Viewport: Mobile
- Audience: Student
- Purpose: Opportunity discovery and application tracking
- LegalGPT India visible: Yes

Component Tree:
```
InternshipHubContainer
├── SearchAndFilterBar
├── OpportunityGrid
│   └── InternshipCard[]
├── ApplicationTracker
├── ResumeBuilderCTA
├── MockInterviewLauncher
└── AlumniNetworkPreview
```

State Coverage:
- Loading: skeleton placeholders for key content regions.
- Empty: No internships match your filters — Expand location or practice-area filters to discover more roles.
- Error: Internship feed couldn't be refreshed.
- Offline: Saved internship listings and drafts remain available offline.

### S-11 Lawyer Discovery

- Viewport: Mobile
- Audience: Citizen
- Purpose: Find verified counsel and compare profiles
- LegalGPT India visible: No

Component Tree:
```
LawyerDiscoveryContainer
├── SearchHeader
│   ├── QueryInput
│   ├── FilterSheetTrigger
│   └── NearMeAction
├── AppliedFilterChips
├── LawyerResultList
│   └── LawyerProfileCard[]
└── BottomNavigationBar
```

State Coverage:
- Loading: skeleton placeholders for key content regions.
- Empty: No lawyers found — Try a different city, practice area, or budget range.
- Error: Lawyer search failed to load.
- Offline: Saved lawyer profiles stay available while offline.

### S-12 Consultation Booking

- Viewport: Mobile
- Audience: Citizen/Lawyer
- Purpose: Schedule, pay, and prepare for a consultation
- LegalGPT India visible: Yes

Component Tree:
```
ConsultationBookingContainer
├── LawyerSummaryHeader
├── SlotCalendar
├── ModeToggle
├── PreConsultationForm
├── PaymentSummary
├── RazorpayCTA
└── FollowUpReminderNote
```

State Coverage:
- Loading: skeleton placeholders for key content regions.
- Empty: No available slots — This lawyer has no open slots for the selected date range.
- Error: Booking flow couldn't load right now.
- Offline: Booking details are cached. Payment requires connectivity.

### S-13 Court Alerts Center

- Viewport: Mobile
- Audience: Lawyer/Firm
- Purpose: Real-time cause list and hearing reminders
- LegalGPT India visible: Yes

Component Tree:
```
CourtAlertsContainer
├── ConnectivityBanner
├── LiveQueueHeader
├── YourCaseNextBanner
├── AlertHistoryList
│   └── AlertCard[]
├── SnoozeAndReminderControls
└── MultiCourtTracker
```

State Coverage:
- Loading: skeleton placeholders for key content regions.
- Empty: No live alerts right now — Tracked courts are quiet. Reminders will appear here as hearings approach.
- Error: Court alerts couldn't sync.
- Offline: Showing last-known court queue positions from cache.

### S-14 Billing & Invoices

- Viewport: Mobile
- Audience: Lawyer/Firm
- Purpose: Legal finance, invoices, GST, receivables
- LegalGPT India visible: No

Component Tree:
```
BillingContainer
├── RevenueSummaryCards
├── InvoiceActionBar
├── InvoiceTable
├── RetainerAlertPanel
├── ReceivablesChart
└── CollectionMethodActions
```

State Coverage:
- Loading: skeleton placeholders for key content regions.
- Empty: No invoices generated yet — Create your first GST-compliant invoice to start tracking revenue.
- Error: Billing data failed to load.
- Offline: Last synced invoices are available. New collections will sync later.

### S-15 Document Vault

- Viewport: Mobile
- Audience: All
- Purpose: Secure file storage and version history
- LegalGPT India visible: Yes

Component Tree:
```
DocumentVaultContainer
├── VaultHeader
│   ├── SearchInput
│   ├── UploadAction
│   └── EncryptionBadge
├── FolderNavigator
├── DocumentList
├── VersionHistoryPanel
├── DigiLockerESignAction
└── SyncStatusFooter
```

State Coverage:
- Loading: skeleton placeholders for key content regions.
- Empty: No documents uploaded — Upload a file or import one from your matter workspace.
- Error: Document vault couldn't load files.
- Offline: Downloaded files and metadata are available offline.

### S-16 Calendar & Scheduler

- Viewport: Mobile
- Audience: Lawyer/Firm
- Purpose: Unified legal calendar across hearings and meetings
- LegalGPT India visible: Yes

Component Tree:
```
CalendarSchedulerContainer
├── ViewSwitcher
├── SyncIndicator
├── CalendarGrid
│   └── EventBlock[]
├── ConflictCheckerPanel
├── AIComplianceDateAssist
└── AddEventActions
```

State Coverage:
- Loading: skeleton placeholders for key content regions.
- Empty: Nothing scheduled — Your calendar is clear for the selected range.
- Error: Calendar data couldn't be loaded.
- Offline: Cached calendar blocks remain visible. New edits will queue.

### S-17 Notifications Center

- Viewport: Mobile
- Audience: All
- Purpose: Consolidated alerts feed
- LegalGPT India visible: Yes

Component Tree:
```
NotificationsContainer
├── FilterToolbar
├── PriorityTabs
├── NotificationFeed
│   └── NotificationRow[]
├── ArchiveToggle
└── QuietHoursShortcut
```

State Coverage:
- Loading: skeleton placeholders for key content regions.
- Empty: Nothing new right now — You're caught up across court, payment, AI, and general alerts.
- Error: Notifications couldn't be loaded.
- Offline: Showing cached notifications from your last sync.

### S-18 Settings & Privacy

- Viewport: Mobile
- Audience: All
- Purpose: Theme, language, privacy, account controls
- LegalGPT India visible: No

Component Tree:
```
SettingsPrivacyContainer
├── ThemeSelector
├── LanguageSelector
├── NotificationPreferenceSection
├── DPDPConsentManager
├── ConnectedIntegrationsList
├── DataExportDeleteActions
└── AccountDestructionGuardrail
```

State Coverage:
- Loading: skeleton placeholders for key content regions.
- Empty: No connected integrations — Connect calendar, mail, or messaging tools to expand workflows.
- Error: Settings couldn't be loaded.
- Offline: Preference changes are saved locally and queued for sync.

### A-01 Admin Login / SSO

- Viewport: Desktop
- Audience: Super Admin
- Purpose: Secure platform access
- LegalGPT India visible: No

Component Tree:
```
AdminAuthContainer
├── BrandPanel
├── SSOProviderList
├── CredentialForm
├── MFAVerificationPanel
├── SessionWarningNote
└── SecurityFooter
```

State Coverage:
- Loading: skeleton placeholders for key content regions.
- Empty: No SSO providers enabled — Add at least one SSO path or fallback login method.
- Error: Admin authentication failed. Please retry.
- Offline: Admin access requires connectivity for verification.

### A-02 Multi-Tenant Overview

- Viewport: Desktop
- Audience: Super Admin
- Purpose: Platform health snapshot
- LegalGPT India visible: Yes

Component Tree:
```
MultiTenantOverviewContainer
├── CommandHeader
├── KPIBand
│   └── KPICard[]
├── GrowthAndRevenueCharts
├── TenantHealthPanels
├── IncidentFeed
├── LegalGPTInsightsPanel
└── FooterFilters
```

State Coverage:
- Loading: skeleton placeholders for key content regions.
- Empty: No tenant data yet — Platform metrics will appear after tenant activity begins.
- Error: Platform overview failed to refresh.
- Offline: Showing last-known metrics and cached incident feed.

### A-03 User Management

- Viewport: Desktop
- Audience: Admin
- Purpose: Account lifecycle and role control
- LegalGPT India visible: No

Component Tree:
```
UserManagementContainer
├── SearchAndFilterBar
├── BulkActionToolbar
├── UserDataTable
│   └── UserRow[]
├── RoleAssignmentDrawer
├── DPDPDeletionWorkflowPanel
└── ExportActions
```

State Coverage:
- Loading: skeleton placeholders for key content regions.
- Empty: No users match these filters — Adjust role, plan, or status filters to broaden results.
- Error: User table couldn't be loaded.
- Offline: Cached user results are viewable. Account changes require connectivity.

### A-04 Firm Workspace

- Viewport: Desktop
- Audience: Firm Partner
- Purpose: Team command center
- LegalGPT India visible: Yes

Component Tree:
```
FirmWorkspaceContainer
├── TeamRosterPanel
├── MatterAssignmentBoard
├── WorkloadHeatmap
├── ApprovalQueue
├── ConflictChecker
└── LegalGPTOperationsAssist
```

State Coverage:
- Loading: skeleton placeholders for key content regions.
- Empty: No active matters assigned — Create or assign a matter to populate the workspace.
- Error: Firm workspace failed to load.
- Offline: Last synced team roster and matters are available offline.

### A-05 Collaborative Drafting

- Viewport: Desktop
- Audience: Firm Team
- Purpose: Document co-editing and partner review
- LegalGPT India visible: Yes

Component Tree:
```
CollaborativeDraftingContainer
├── DocumentToolbar
├── CoAuthorPresenceBar
├── EditorSurface
├── CommentRail
├── VersionDiffPanel
├── ApprovalWorkflowBar
└── LegalGPTDraftAssist
```

State Coverage:
- Loading: skeleton placeholders for key content regions.
- Empty: No draft selected — Choose a matter or template to begin collaborative drafting.
- Error: Drafting workspace couldn't be loaded.
- Offline: Read-only cached draft remains available offline.

### A-06 Revenue Analytics

- Viewport: Desktop
- Audience: Admin/Firm
- Purpose: Financial intelligence
- LegalGPT India visible: No

Component Tree:
```
RevenueAnalyticsContainer
├── KPIHeader
├── TrendCharts
├── TierBreakdownCards
├── CommissionLedgerTable
├── CohortAnalysisPanel
└── ExportTools
```

State Coverage:
- Loading: skeleton placeholders for key content regions.
- Empty: No revenue data yet — Revenue charts will populate once billing events are processed.
- Error: Revenue analytics couldn't be refreshed.
- Offline: Using cached revenue snapshots for this workspace.

### A-07 AI Performance Monitor

- Viewport: Desktop
- Audience: Admin
- Purpose: LegalGPT India quality control
- LegalGPT India visible: Yes

Component Tree:
```
AIPerformanceMonitorContainer
├── QueryVolumeChart
├── CitationAccuracyPanel
├── HallucinationReviewQueue
├── FeedbackTrendPanel
├── ConfidenceDistributionChart
└── LegalGPTInsightsNotes
```

State Coverage:
- Loading: skeleton placeholders for key content regions.
- Empty: No AI activity in this range — Adjust the time window to review LegalGPT India performance.
- Error: AI monitoring data failed to load.
- Offline: Showing last synced AI metrics and review queue.

### A-08 Compliance Audit Log

- Viewport: Desktop
- Audience: Compliance Officer
- Purpose: Regulatory transparency and evidence
- LegalGPT India visible: Yes

Component Tree:
```
ComplianceAuditContainer
├── AuditFilterBar
├── RightsRequestSummary
├── ImmutableLogTable
├── ConsentRecordPanel
├── RetentionPolicyStatus
├── ExportDrawer
└── LegalGPTComplianceAssist
```

State Coverage:
- Loading: skeleton placeholders for key content regions.
- Empty: No audit entries match this filter — Adjust action, date, or user filters to surface more records.
- Error: Audit log failed to load.
- Offline: Recent audit entries are cached for read-only review.

### A-09 Court Data Pipeline

- Viewport: Desktop
- Audience: Admin
- Purpose: eCourts integration health
- LegalGPT India visible: Yes

Component Tree:
```
CourtPipelineContainer
├── APIHealthPanel
├── ParserSuccessChart
├── FallbackTriggerLog
├── LatencyByCourtPanel
├── QueueStateMonitor
└── LegalGPTOperationalSummary
```

State Coverage:
- Loading: skeleton placeholders for key content regions.
- Empty: No court events in this range — Expand the time range to view parser and latency activity.
- Error: Court pipeline status couldn't be loaded.
- Offline: Using the last-known court pipeline snapshot.

### A-10 Content Moderation

- Viewport: Desktop
- Audience: Admin
- Purpose: UGC safety and BCI compliance
- LegalGPT India visible: No

Component Tree:
```
ContentModerationContainer
├── ModerationQueueTabs
├── FlaggedReviewList
├── ProfileApprovalPanel
├── DisclaimerEnforcementCheck
├── TakedownWorkflowBar
└── ModeratorDecisionDrawer
```

State Coverage:
- Loading: skeleton placeholders for key content regions.
- Empty: No items need moderation — Flagged reviews and profile changes will appear here.
- Error: Moderation queue failed to load.
- Offline: Review notes are cached. Moderation actions require connectivity.

### A-11 Marketplace Management

- Viewport: Desktop
- Audience: Admin
- Purpose: Tutor course and internship marketplace
- LegalGPT India visible: No

Component Tree:
```
MarketplaceManagementContainer
├── ApprovalQueuePanel
├── RevenueSplitSummary
├── FeaturedPlacementControls
├── DiscountCampaignManager
├── ListingModerationTable
└── RatingAnalyticsPanel
```

State Coverage:
- Loading: skeleton placeholders for key content regions.
- Empty: No marketplace items pending — Course submissions and internship listings will appear here.
- Error: Marketplace management failed to load.
- Offline: Cached marketplace analytics remain visible offline.

### A-12 Support Ticket Router

- Viewport: Desktop
- Audience: Admin
- Purpose: Customer success operations
- LegalGPT India visible: Yes

Component Tree:
```
SupportTicketRouterContainer
├── PriorityFilterBar
├── TicketQueue
│   └── TicketCard[]
├── SLATimerPanel
├── EscalationRulesPanel
├── ResolutionTemplateTray
├── KnowledgeSuggestionPane
└── LegalGPTSupportAssist
```

State Coverage:
- Loading: skeleton placeholders for key content regions.
- Empty: No open tickets — Support queue is clear for the selected priority range.
- Error: Support routing data couldn't be loaded.
- Offline: Cached ticket queue is visible. Assignment changes need connectivity.

### A-13 Feature Flag Console

- Viewport: Desktop
- Audience: Admin
- Purpose: Controlled rollout and experiments
- LegalGPT India visible: No

Component Tree:
```
FeatureFlagConsoleContainer
├── FlagList
├── PersonaRegionTargetingPanel
├── ExperimentSplitControls
├── RollbackActions
├── BetaCohortManager
└── ExperimentAnalyticsPanel
```

State Coverage:
- Loading: skeleton placeholders for key content regions.
- Empty: No active flags — Create a rollout rule to begin controlled release.
- Error: Feature flags couldn't be loaded.
- Offline: Cached rollout state is visible. Changes need connectivity.

### A-14 System Settings

- Viewport: Desktop
- Audience: Super Admin
- Purpose: Platform configuration
- LegalGPT India visible: No

Component Tree:
```
SystemSettingsContainer
├── EnvironmentSwitcher
├── RuntimeVersionPanel
├── APIKeyRotationSchedule
├── BackupAndRecoveryPanel
├── RateLimitControls
├── CacheAndCertificateControls
└── EnvironmentVariableEditor
```

State Coverage:
- Loading: skeleton placeholders for key content regions.
- Empty: No settings overrides — Global runtime and environment settings use defaults.
- Error: System settings couldn't be loaded.
- Offline: Last synced settings are viewable. Editing needs connectivity.

