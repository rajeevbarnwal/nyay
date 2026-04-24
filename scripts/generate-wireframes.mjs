import fs from "node:fs/promises";
import path from "node:path";

const root = "/Users/rajeevbarnwal/Desktop/Codes/Nyay";
const outDir = path.join(root, "docs", "wireframes");

const mobileScreens = [
  {
    id: "S-01",
    title: "Splash / Onboarding",
    persona: "All",
    purpose: "App launch, persona selection, language entry",
    cta: "Get Started",
    emptyTitle: "No onboarding pack cached",
    emptyBody: "Download the latest persona pack to continue setup.",
    errorBody: "Couldn't load onboarding assets. Please retry.",
    offlineBody: "You're offline. Cached language packs remain available.",
    aiVisible: false,
    keyComponents: [
      "Logo animation",
      "Persona cards",
      "Language switcher",
      "Primary onboarding CTA",
    ],
    componentTree: [
      "SplashContainer",
      "├── StatusBar",
      "├── BrandHero",
      "│   ├── LegalSathiLogo",
      "│   ├── Tagline",
      "│   └── LanguageSwitcher",
      "├── PersonaCardGrid",
      "│   └── PersonaCard[]",
      "├── TrustStrip",
      "└── PrimaryCTA",
    ],
  },
  {
    id: "S-02",
    title: "Auth — Login/Signup",
    persona: "All",
    purpose: "Secure authentication and account entry",
    cta: "Continue securely",
    emptyTitle: "No sign-in methods enabled",
    emptyBody: "Activate email, phone, or SSO to let users log in.",
    errorBody: "Authentication service is temporarily unavailable.",
    offlineBody: "Offline mode supports only last-session read access.",
    aiVisible: false,
    keyComponents: [
      "Email and phone tabs",
      "OTP input",
      "Password field",
      "OAuth buttons",
      "Verification helper text",
    ],
    componentTree: [
      "AuthContainer",
      "├── Header",
      "│   ├── WelcomeText",
      "│   └── SecurityBadge",
      "├── AuthMethodTabs",
      "├── CredentialForm",
      "│   ├── IdentifierField",
      "│   ├── SecretField",
      "│   ├── OTPFieldGroup",
      "│   └── SubmitButton",
      "├── AlternateSignInOptions",
      "└── RecoveryLinks",
    ],
  },
  {
    id: "S-03",
    title: "Profile Setup",
    persona: "All",
    purpose: "Collect persona-specific context and DPDP consent",
    cta: "Save profile",
    emptyTitle: "Profile details not started",
    emptyBody: "Add persona details to personalize Legal Sathi.",
    errorBody: "Profile setup couldn't be saved. Try again.",
    offlineBody: "Profile edits are saved locally and will sync later.",
    aiVisible: true,
    keyComponents: [
      "Persona form",
      "Languages",
      "Practice areas or college",
      "Notification preferences",
      "DPDP consent card",
    ],
    componentTree: [
      "ProfileSetupContainer",
      "├── ProgressHeader",
      "├── PersonaSummaryChip",
      "├── FormSection",
      "│   ├── IdentityFields",
      "│   ├── PersonaContextFields",
      "│   ├── LanguagePreferences",
      "│   └── NotificationPreferences",
      "├── DPDPConsentManager",
      "│   ├── PurposeDisclosure",
      "│   ├── ConsentToggleList",
      "│   └── ExportDeleteLinks",
      "└── SaveActions",
    ],
  },
  {
    id: "S-04",
    title: "Home — Morning Brief",
    persona: "Lawyer/Firm",
    purpose: "Daily agenda, hearings, alerts, AI quick access",
    cta: "Open morning brief",
    emptyTitle: "No hearings scheduled today",
    emptyBody: "Your calendar is clear. Add a matter or client follow-up.",
    errorBody: "Morning brief failed to refresh.",
    offlineBody: "Showing last synced hearings and task cards from cache.",
    aiVisible: true,
    keyComponents: [
      "Greeting hero",
      "Today's hearings",
      "Pending tasks",
      "AI prompt cards",
      "Calendar strip",
    ],
    componentTree: [
      "HomeContainer",
      "├── OfflineBanner",
      "├── GreetingHeader",
      "│   ├── GreetingText",
      "│   ├── DateDisplay",
      "│   └── NotificationBadge",
      "├── TodaySchedule",
      "│   └── HearingCard[]",
      "├── PendingTasks",
      "├── LegalGPTQuickAccess",
      "│   ├── AssistantButton",
      "│   └── SuggestedPrompt[]",
      "├── ConsultationCalendarStrip",
      "└── BottomNavigationBar",
    ],
  },
  {
    id: "S-05",
    title: "Case Management",
    persona: "Lawyer/Firm",
    purpose: "Active matter overview and filters",
    cta: "Create case",
    emptyTitle: "No cases yet",
    emptyBody: "Get started by creating a new case or importing one.",
    errorBody: "Failed to load matters. Please try again.",
    offlineBody: "Cached matters are available. New edits will sync later.",
    aiVisible: true,
    keyComponents: [
      "Search bar",
      "Case list",
      "Status filters",
      "Sort controls",
      "Add new case FAB",
    ],
    componentTree: [
      "CaseManagementContainer",
      "├── FilterHeader",
      "│   ├── SearchInput",
      "│   ├── FilterChips",
      "│   └── SortMenu",
      "├── CaseList",
      "│   └── CaseCard[]",
      "├── QuickSummaryBar",
      "├── FloatingCreateButton",
      "└── BottomNavigationBar",
    ],
  },
  {
    id: "S-06",
    title: "Case Detail View",
    persona: "Lawyer/Firm",
    purpose: "Single matter workspace",
    cta: "Update matter",
    emptyTitle: "No timeline activity yet",
    emptyBody: "Add the first note, hearing, or document to start this matter.",
    errorBody: "Matter details couldn't be loaded.",
    offlineBody: "Viewing cached matter details. Edits will sync when online.",
    aiVisible: true,
    keyComponents: [
      "Timeline",
      "Documents tab",
      "Notes",
      "Client log",
      "Opposing party details",
    ],
    componentTree: [
      "CaseDetailContainer",
      "├── MatterHeader",
      "│   ├── MatterIdentity",
      "│   ├── StatusBadge",
      "│   └── QuickActions",
      "├── TabNavigation",
      "├── TimelineSection",
      "├── NotesSection",
      "├── DocumentVaultPreview",
      "├── ClientCommunicationLog",
      "└── LegalGPTMatterAssist",
    ],
  },
  {
    id: "S-07",
    title: "AI Legal Assistant",
    persona: "All",
    purpose: "LegalGPT India chat with citations and confidence",
    cta: "Ask LegalGPT India",
    emptyTitle: "No conversation yet",
    emptyBody: "Start with a prompt about a judgment, matter, or memorial.",
    errorBody: "LegalGPT India couldn't complete this request.",
    offlineBody: "Chat history is cached. New questions require connectivity.",
    aiVisible: true,
    keyComponents: [
      "Conversation thread",
      "Citation cards",
      "Language switcher",
      "Voice input",
      "Confidence indicator",
    ],
    componentTree: [
      "LegalGPTContainer",
      "├── ConversationHeader",
      "│   ├── Title",
      "│   ├── LanguageSwitcher",
      "│   └── ConfidenceLegend",
      "├── ConversationThread",
      "│   └── MessageBubble[]",
      "├── CitationShelf",
      "├── SuggestedPromptRow",
      "├── Composer",
      "│   ├── VoiceInput",
      "│   ├── TextArea",
      "│   └── SubmitButton",
      "└── DisclaimerFooter",
    ],
  },
  {
    id: "S-08",
    title: "Judgment Search",
    persona: "Student/Lawyer",
    purpose: "Case law research and retrieval",
    cta: "Search judgments",
    emptyTitle: "No judgments match those filters",
    emptyBody: "Try a broader court range or fewer citation filters.",
    errorBody: "Search results couldn't be loaded.",
    offlineBody: "Saved judgments stay available offline. Live search will resume when online.",
    aiVisible: true,
    keyComponents: [
      "Search field",
      "Filter chips",
      "Result cards",
      "Save to library",
      "Cross-reference view",
    ],
    componentTree: [
      "JudgmentSearchContainer",
      "├── SearchHeader",
      "│   ├── QueryInput",
      "│   ├── FilterDrawerTrigger",
      "│   └── SaveSearchAction",
      "├── FilterChips",
      "├── ResultsList",
      "│   └── JudgmentResultCard[]",
      "├── CrossReferencePreview",
      "└── FooterActions",
    ],
  },
  {
    id: "S-09",
    title: "Moot Court Suite",
    persona: "Student",
    purpose: "Moot prep, memorial drafting, AI judge simulation",
    cta: "Start practice round",
    emptyTitle: "No moot problem selected",
    emptyBody: "Pick a moot problem to unlock memorial drafting and judge simulation.",
    errorBody: "Moot workspace failed to load.",
    offlineBody: "Saved memorial drafts remain editable offline.",
    aiVisible: true,
    keyComponents: [
      "Problem selector",
      "Memorial drafter",
      "Counter-argument builder",
      "Judge simulation",
      "Scoring rubric",
    ],
    componentTree: [
      "MootSuiteContainer",
      "├── ProblemSelector",
      "├── ProgressOverview",
      "├── MemorialDraftPanel",
      "├── CounterArgumentBuilder",
      "├── JudgeSimulationPanel",
      "├── ScoringRubric",
      "└── PeerReviewActions",
    ],
  },
  {
    id: "S-10",
    title: "Internship Hub",
    persona: "Student",
    purpose: "Opportunity discovery and application tracking",
    cta: "Find internships",
    emptyTitle: "No internships match your filters",
    emptyBody: "Expand location or practice-area filters to discover more roles.",
    errorBody: "Internship feed couldn't be refreshed.",
    offlineBody: "Saved internship listings and drafts remain available offline.",
    aiVisible: true,
    keyComponents: [
      "Opportunity grid",
      "Deadline tracker",
      "AI resume builder",
      "Mock interview",
      "Alumni directory",
    ],
    componentTree: [
      "InternshipHubContainer",
      "├── SearchAndFilterBar",
      "├── OpportunityGrid",
      "│   └── InternshipCard[]",
      "├── ApplicationTracker",
      "├── ResumeBuilderCTA",
      "├── MockInterviewLauncher",
      "└── AlumniNetworkPreview",
    ],
  },
  {
    id: "S-11",
    title: "Lawyer Discovery",
    persona: "Citizen",
    purpose: "Find verified counsel and compare profiles",
    cta: "Find a lawyer",
    emptyTitle: "No lawyers found",
    emptyBody: "Try a different city, practice area, or budget range.",
    errorBody: "Lawyer search failed to load.",
    offlineBody: "Saved lawyer profiles stay available while offline.",
    aiVisible: false,
    keyComponents: [
      "Search filters",
      "Profile cards",
      "Verified badges",
      "Near me",
      "Book consultation CTA",
    ],
    componentTree: [
      "LawyerDiscoveryContainer",
      "├── SearchHeader",
      "│   ├── QueryInput",
      "│   ├── FilterSheetTrigger",
      "│   └── NearMeAction",
      "├── AppliedFilterChips",
      "├── LawyerResultList",
      "│   └── LawyerProfileCard[]",
      "└── BottomNavigationBar",
    ],
  },
  {
    id: "S-12",
    title: "Consultation Booking",
    persona: "Citizen/Lawyer",
    purpose: "Schedule, pay, and prepare for a consultation",
    cta: "Confirm booking",
    emptyTitle: "No available slots",
    emptyBody: "This lawyer has no open slots for the selected date range.",
    errorBody: "Booking flow couldn't load right now.",
    offlineBody: "Booking details are cached. Payment requires connectivity.",
    aiVisible: true,
    keyComponents: [
      "Slot calendar",
      "Mode toggle",
      "Payment summary",
      "Pre-consultation form",
      "Notes autosave",
    ],
    componentTree: [
      "ConsultationBookingContainer",
      "├── LawyerSummaryHeader",
      "├── SlotCalendar",
      "├── ModeToggle",
      "├── PreConsultationForm",
      "├── PaymentSummary",
      "├── RazorpayCTA",
      "└── FollowUpReminderNote",
    ],
  },
  {
    id: "S-13",
    title: "Court Alerts Center",
    persona: "Lawyer/Firm",
    purpose: "Real-time cause list and hearing reminders",
    cta: "Open alert center",
    emptyTitle: "No live alerts right now",
    emptyBody: "Tracked courts are quiet. Reminders will appear here as hearings approach.",
    errorBody: "Court alerts couldn't sync.",
    offlineBody: "Showing last-known court queue positions from cache.",
    aiVisible: true,
    keyComponents: [
      "Live queue",
      "Push banner",
      "Alert history",
      "Snooze controls",
      "Reminder timeline",
    ],
    componentTree: [
      "CourtAlertsContainer",
      "├── ConnectivityBanner",
      "├── LiveQueueHeader",
      "├── YourCaseNextBanner",
      "├── AlertHistoryList",
      "│   └── AlertCard[]",
      "├── SnoozeAndReminderControls",
      "└── MultiCourtTracker",
    ],
  },
  {
    id: "S-14",
    title: "Billing & Invoices",
    persona: "Lawyer/Firm",
    purpose: "Legal finance, invoices, GST, receivables",
    cta: "Create invoice",
    emptyTitle: "No invoices generated yet",
    emptyBody: "Create your first GST-compliant invoice to start tracking revenue.",
    errorBody: "Billing data failed to load.",
    offlineBody: "Last synced invoices are available. New collections will sync later.",
    aiVisible: false,
    keyComponents: [
      "P&L summary",
      "Invoice list",
      "Receivables",
      "Retainer alerts",
      "Collection methods",
    ],
    componentTree: [
      "BillingContainer",
      "├── RevenueSummaryCards",
      "├── InvoiceActionBar",
      "├── InvoiceTable",
      "├── RetainerAlertPanel",
      "├── ReceivablesChart",
      "└── CollectionMethodActions",
    ],
  },
  {
    id: "S-15",
    title: "Document Vault",
    persona: "All",
    purpose: "Secure file storage and version history",
    cta: "Upload document",
    emptyTitle: "No documents uploaded",
    emptyBody: "Upload a file or import one from your matter workspace.",
    errorBody: "Document vault couldn't load files.",
    offlineBody: "Downloaded files and metadata are available offline.",
    aiVisible: true,
    keyComponents: [
      "Folder tree",
      "OCR search",
      "Version history",
      "eSign integration",
      "Encrypted storage badge",
    ],
    componentTree: [
      "DocumentVaultContainer",
      "├── VaultHeader",
      "│   ├── SearchInput",
      "│   ├── UploadAction",
      "│   └── EncryptionBadge",
      "├── FolderNavigator",
      "├── DocumentList",
      "├── VersionHistoryPanel",
      "├── DigiLockerESignAction",
      "└── SyncStatusFooter",
    ],
  },
  {
    id: "S-16",
    title: "Calendar & Scheduler",
    persona: "Lawyer/Firm",
    purpose: "Unified legal calendar across hearings and meetings",
    cta: "Add event",
    emptyTitle: "Nothing scheduled",
    emptyBody: "Your calendar is clear for the selected range.",
    errorBody: "Calendar data couldn't be loaded.",
    offlineBody: "Cached calendar blocks remain visible. New edits will queue.",
    aiVisible: true,
    keyComponents: [
      "Day/week/month switch",
      "Hearing blocks",
      "Client meetings",
      "Sync status",
      "Conflict checker",
    ],
    componentTree: [
      "CalendarSchedulerContainer",
      "├── ViewSwitcher",
      "├── SyncIndicator",
      "├── CalendarGrid",
      "│   └── EventBlock[]",
      "├── ConflictCheckerPanel",
      "├── AIComplianceDateAssist",
      "└── AddEventActions",
    ],
  },
  {
    id: "S-17",
    title: "Notifications Center",
    persona: "All",
    purpose: "Consolidated alerts feed",
    cta: "Review notifications",
    emptyTitle: "Nothing new right now",
    emptyBody: "You're caught up across court, payment, AI, and general alerts.",
    errorBody: "Notifications couldn't be loaded.",
    offlineBody: "Showing cached notifications from your last sync.",
    aiVisible: true,
    keyComponents: [
      "Chronological feed",
      "Type filters",
      "Read/unread",
      "Priority sorting",
      "Archive",
    ],
    componentTree: [
      "NotificationsContainer",
      "├── FilterToolbar",
      "├── PriorityTabs",
      "├── NotificationFeed",
      "│   └── NotificationRow[]",
      "├── ArchiveToggle",
      "└── QuietHoursShortcut",
    ],
  },
  {
    id: "S-18",
    title: "Settings & Privacy",
    persona: "All",
    purpose: "Theme, language, privacy, account controls",
    cta: "Save preferences",
    emptyTitle: "No connected integrations",
    emptyBody: "Connect calendar, mail, or messaging tools to expand workflows.",
    errorBody: "Settings couldn't be loaded.",
    offlineBody: "Preference changes are saved locally and queued for sync.",
    aiVisible: false,
    keyComponents: [
      "Theme controls",
      "Language preference",
      "DPDP consent manager",
      "Export/delete actions",
      "Integration list",
    ],
    componentTree: [
      "SettingsPrivacyContainer",
      "├── ThemeSelector",
      "├── LanguageSelector",
      "├── NotificationPreferenceSection",
      "├── DPDPConsentManager",
      "├── ConnectedIntegrationsList",
      "├── DataExportDeleteActions",
      "└── AccountDestructionGuardrail",
    ],
  },
];

const adminScreens = [
  {
    id: "A-01",
    title: "Admin Login / SSO",
    role: "Super Admin",
    purpose: "Secure platform access",
    cta: "Sign in to console",
    emptyTitle: "No SSO providers enabled",
    emptyBody: "Add at least one SSO path or fallback login method.",
    errorBody: "Admin authentication failed. Please retry.",
    offlineBody: "Admin access requires connectivity for verification.",
    aiVisible: false,
    keyComponents: ["SSO buttons", "MFA prompt", "session timer", "IP whitelist notice"],
    componentTree: [
      "AdminAuthContainer",
      "├── BrandPanel",
      "├── SSOProviderList",
      "├── CredentialForm",
      "├── MFAVerificationPanel",
      "├── SessionWarningNote",
      "└── SecurityFooter",
    ],
  },
  {
    id: "A-02",
    title: "Multi-Tenant Overview",
    role: "Super Admin",
    purpose: "Platform health snapshot",
    cta: "Open platform overview",
    emptyTitle: "No tenant data yet",
    emptyBody: "Platform metrics will appear after tenant activity begins.",
    errorBody: "Platform overview failed to refresh.",
    offlineBody: "Showing last-known metrics and cached incident feed.",
    aiVisible: true,
    keyComponents: ["active users", "MRR/ARR", "server status", "adoption metrics", "geo map"],
    componentTree: [
      "MultiTenantOverviewContainer",
      "├── CommandHeader",
      "├── KPIBand",
      "│   └── KPICard[]",
      "├── GrowthAndRevenueCharts",
      "├── TenantHealthPanels",
      "├── IncidentFeed",
      "├── LegalGPTInsightsPanel",
      "└── FooterFilters",
    ],
  },
  {
    id: "A-03",
    title: "User Management",
    role: "Admin",
    purpose: "Account lifecycle and role control",
    cta: "Manage users",
    emptyTitle: "No users match these filters",
    emptyBody: "Adjust role, plan, or status filters to broaden results.",
    errorBody: "User table couldn't be loaded.",
    offlineBody: "Cached user results are viewable. Account changes require connectivity.",
    aiVisible: false,
    keyComponents: ["search", "bulk actions", "role assignment", "deletion workflow", "CSV export"],
    componentTree: [
      "UserManagementContainer",
      "├── SearchAndFilterBar",
      "├── BulkActionToolbar",
      "├── UserDataTable",
      "│   └── UserRow[]",
      "├── RoleAssignmentDrawer",
      "├── DPDPDeletionWorkflowPanel",
      "└── ExportActions",
    ],
  },
  {
    id: "A-04",
    title: "Firm Workspace",
    role: "Firm Partner",
    purpose: "Team command center",
    cta: "Open firm workspace",
    emptyTitle: "No active matters assigned",
    emptyBody: "Create or assign a matter to populate the workspace.",
    errorBody: "Firm workspace failed to load.",
    offlineBody: "Last synced team roster and matters are available offline.",
    aiVisible: true,
    keyComponents: ["roster", "assignment board", "workload heatmap", "approval queue", "conflict checker"],
    componentTree: [
      "FirmWorkspaceContainer",
      "├── TeamRosterPanel",
      "├── MatterAssignmentBoard",
      "├── WorkloadHeatmap",
      "├── ApprovalQueue",
      "├── ConflictChecker",
      "└── LegalGPTOperationsAssist",
    ],
  },
  {
    id: "A-05",
    title: "Collaborative Drafting",
    role: "Firm Team",
    purpose: "Document co-editing and partner review",
    cta: "Open drafting studio",
    emptyTitle: "No draft selected",
    emptyBody: "Choose a matter or template to begin collaborative drafting.",
    errorBody: "Drafting workspace couldn't be loaded.",
    offlineBody: "Read-only cached draft remains available offline.",
    aiVisible: true,
    keyComponents: ["editor", "comments", "version diff", "approval workflow", "presence indicators"],
    componentTree: [
      "CollaborativeDraftingContainer",
      "├── DocumentToolbar",
      "├── CoAuthorPresenceBar",
      "├── EditorSurface",
      "├── CommentRail",
      "├── VersionDiffPanel",
      "├── ApprovalWorkflowBar",
      "└── LegalGPTDraftAssist",
    ],
  },
  {
    id: "A-06",
    title: "Revenue Analytics",
    role: "Admin/Firm",
    purpose: "Financial intelligence",
    cta: "Open revenue analytics",
    emptyTitle: "No revenue data yet",
    emptyBody: "Revenue charts will populate once billing events are processed.",
    errorBody: "Revenue analytics couldn't be refreshed.",
    offlineBody: "Using cached revenue snapshots for this workspace.",
    aiVisible: false,
    keyComponents: ["MRR/ARR", "tier breakdown", "commission ledger", "cohort analysis", "exports"],
    componentTree: [
      "RevenueAnalyticsContainer",
      "├── KPIHeader",
      "├── TrendCharts",
      "├── TierBreakdownCards",
      "├── CommissionLedgerTable",
      "├── CohortAnalysisPanel",
      "└── ExportTools",
    ],
  },
  {
    id: "A-07",
    title: "AI Performance Monitor",
    role: "Admin",
    purpose: "LegalGPT India quality control",
    cta: "Open AI monitor",
    emptyTitle: "No AI activity in this range",
    emptyBody: "Adjust the time window to review LegalGPT India performance.",
    errorBody: "AI monitoring data failed to load.",
    offlineBody: "Showing last synced AI metrics and review queue.",
    aiVisible: true,
    keyComponents: ["query volume", "citation accuracy", "review queue", "feedback loop", "confidence distribution"],
    componentTree: [
      "AIPerformanceMonitorContainer",
      "├── QueryVolumeChart",
      "├── CitationAccuracyPanel",
      "├── HallucinationReviewQueue",
      "├── FeedbackTrendPanel",
      "├── ConfidenceDistributionChart",
      "└── LegalGPTInsightsNotes",
    ],
  },
  {
    id: "A-08",
    title: "Compliance Audit Log",
    role: "Compliance Officer",
    purpose: "Regulatory transparency and evidence",
    cta: "Open audit log",
    emptyTitle: "No audit entries match this filter",
    emptyBody: "Adjust action, date, or user filters to surface more records.",
    errorBody: "Audit log failed to load.",
    offlineBody: "Recent audit entries are cached for read-only review.",
    aiVisible: true,
    keyComponents: ["immutable logs", "rights requests", "consent records", "retention policy", "export"],
    componentTree: [
      "ComplianceAuditContainer",
      "├── AuditFilterBar",
      "├── RightsRequestSummary",
      "├── ImmutableLogTable",
      "├── ConsentRecordPanel",
      "├── RetentionPolicyStatus",
      "├── ExportDrawer",
      "└── LegalGPTComplianceAssist",
    ],
  },
  {
    id: "A-09",
    title: "Court Data Pipeline",
    role: "Admin",
    purpose: "eCourts integration health",
    cta: "Open court pipeline",
    emptyTitle: "No court events in this range",
    emptyBody: "Expand the time range to view parser and latency activity.",
    errorBody: "Court pipeline status couldn't be loaded.",
    offlineBody: "Using the last-known court pipeline snapshot.",
    aiVisible: true,
    keyComponents: ["API status", "parser success", "fallback logs", "latency metrics", "queue state"],
    componentTree: [
      "CourtPipelineContainer",
      "├── APIHealthPanel",
      "├── ParserSuccessChart",
      "├── FallbackTriggerLog",
      "├── LatencyByCourtPanel",
      "├── QueueStateMonitor",
      "└── LegalGPTOperationalSummary",
    ],
  },
  {
    id: "A-10",
    title: "Content Moderation",
    role: "Admin",
    purpose: "UGC safety and BCI compliance",
    cta: "Open moderation queue",
    emptyTitle: "No items need moderation",
    emptyBody: "Flagged reviews and profile changes will appear here.",
    errorBody: "Moderation queue failed to load.",
    offlineBody: "Review notes are cached. Moderation actions require connectivity.",
    aiVisible: false,
    keyComponents: ["flagged reviews", "profile approval", "disclaimer checks", "takedown SLA", "manual review"],
    componentTree: [
      "ContentModerationContainer",
      "├── ModerationQueueTabs",
      "├── FlaggedReviewList",
      "├── ProfileApprovalPanel",
      "├── DisclaimerEnforcementCheck",
      "├── TakedownWorkflowBar",
      "└── ModeratorDecisionDrawer",
    ],
  },
  {
    id: "A-11",
    title: "Marketplace Management",
    role: "Admin",
    purpose: "Tutor course and internship marketplace",
    cta: "Open marketplace",
    emptyTitle: "No marketplace items pending",
    emptyBody: "Course submissions and internship listings will appear here.",
    errorBody: "Marketplace management failed to load.",
    offlineBody: "Cached marketplace analytics remain visible offline.",
    aiVisible: false,
    keyComponents: ["approval queue", "revenue split", "featured placements", "discounts", "rating analytics"],
    componentTree: [
      "MarketplaceManagementContainer",
      "├── ApprovalQueuePanel",
      "├── RevenueSplitSummary",
      "├── FeaturedPlacementControls",
      "├── DiscountCampaignManager",
      "├── ListingModerationTable",
      "└── RatingAnalyticsPanel",
    ],
  },
  {
    id: "A-12",
    title: "Support Ticket Router",
    role: "Admin",
    purpose: "Customer success operations",
    cta: "Open support router",
    emptyTitle: "No open tickets",
    emptyBody: "Support queue is clear for the selected priority range.",
    errorBody: "Support routing data couldn't be loaded.",
    offlineBody: "Cached ticket queue is visible. Assignment changes need connectivity.",
    aiVisible: true,
    keyComponents: ["triage", "SLA timer", "escalations", "templates", "knowledge suggestions"],
    componentTree: [
      "SupportTicketRouterContainer",
      "├── PriorityFilterBar",
      "├── TicketQueue",
      "│   └── TicketCard[]",
      "├── SLATimerPanel",
      "├── EscalationRulesPanel",
      "├── ResolutionTemplateTray",
      "├── KnowledgeSuggestionPane",
      "└── LegalGPTSupportAssist",
    ],
  },
  {
    id: "A-13",
    title: "Feature Flag Console",
    role: "Admin",
    purpose: "Controlled rollout and experiments",
    cta: "Open feature flags",
    emptyTitle: "No active flags",
    emptyBody: "Create a rollout rule to begin controlled release.",
    errorBody: "Feature flags couldn't be loaded.",
    offlineBody: "Cached rollout state is visible. Changes need connectivity.",
    aiVisible: false,
    keyComponents: ["module toggles", "A/B config", "rollback", "analytics", "beta groups"],
    componentTree: [
      "FeatureFlagConsoleContainer",
      "├── FlagList",
      "├── PersonaRegionTargetingPanel",
      "├── ExperimentSplitControls",
      "├── RollbackActions",
      "├── BetaCohortManager",
      "└── ExperimentAnalyticsPanel",
    ],
  },
  {
    id: "A-14",
    title: "System Settings",
    role: "Super Admin",
    purpose: "Platform configuration",
    cta: "Open system settings",
    emptyTitle: "No settings overrides",
    emptyBody: "Global runtime and environment settings use defaults.",
    errorBody: "System settings couldn't be loaded.",
    offlineBody: "Last synced settings are viewable. Editing needs connectivity.",
    aiVisible: false,
    keyComponents: ["versions", "key rotation", "backups", "disaster recovery", "rate limits", "environment config"],
    componentTree: [
      "SystemSettingsContainer",
      "├── EnvironmentSwitcher",
      "├── RuntimeVersionPanel",
      "├── APIKeyRotationSchedule",
      "├── BackupAndRecoveryPanel",
      "├── RateLimitControls",
      "├── CacheAndCertificateControls",
      "└── EnvironmentVariableEditor",
    ],
  },
];

const variations = [
  {
    number: "1",
    slug: "bharat-first",
    title: "Bharat First",
    tagline: "Warm legal credibility with courtroom-ready operational speed.",
    mobileConcept: "Stacked daily command center",
    desktopConcept: "Three-column command room",
    palette: {
      primary: {
        50: "#effcf8",
        100: "#d7f5ee",
        200: "#b2e9dd",
        300: "#7fd6c5",
        400: "#49bca8",
        500: "#239986",
        600: "#0f766e",
        700: "#115e59",
        800: "#134e4a",
        900: "#0f3f3d",
      },
      accent: {
        50: "#fffbeb",
        100: "#fff3c6",
        200: "#ffe588",
        300: "#ffd24d",
        400: "#f8b92c",
        500: "#e49a18",
        600: "#c37a0d",
        700: "#a16207",
        800: "#854d0e",
        900: "#713f12",
      },
      neutral: {
        50: "#fcfbf7",
        100: "#f7f4ec",
        200: "#ede5d6",
        300: "#ddcdb3",
        400: "#b9aa92",
        500: "#8d7f6d",
        600: "#6a5d51",
        700: "#4d433b",
        800: "#332d29",
        900: "#1f1c1a",
      },
      info: "#155e75",
      success: "#166534",
      warning: "#b45309",
      danger: "#b91c1c",
    },
    surfaces: {
      pageBg: "from-neutral-100 via-amber-50 to-white",
      heroBg: "from-primary-900 via-primary-700 to-accent-700",
      cardGlow: "shadow-[0_28px_60px_rgba(31,28,26,0.14)]",
      pattern:
        "bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.24),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.88),rgba(255,255,255,0.72))]",
    },
    commentary: {
      inspiration:
        "Combines Clio's practical legal mobility with Niva's warmth and restrained fintech-style analytics.",
      motion: "Soft alert pulses, progress shimmer, and brief success flashes on key milestones.",
      bestFor:
        "Lawyers, firms, and citizens who need trust, urgency, and operational clarity.",
    },
  },
  {
    number: "2",
    slug: "legal-pro",
    title: "Legal Pro",
    tagline: "Premium legal operations with dense analytics and sharper enterprise polish.",
    mobileConcept: "Modular discovery dashboard",
    desktopConcept: "Analytics tile board",
    palette: {
      primary: {
        50: "#eef5ff",
        100: "#dbeafe",
        200: "#bcd7ff",
        300: "#8db8ff",
        400: "#5b92ff",
        500: "#336eea",
        600: "#1d4ed8",
        700: "#1d3fa8",
        800: "#1e357f",
        900: "#1b2e66",
      },
      accent: {
        50: "#eefbf3",
        100: "#d4f5df",
        200: "#aeecc2",
        300: "#79d99b",
        400: "#48bf74",
        500: "#2f855a",
        600: "#256b49",
        700: "#1f563d",
        800: "#194533",
        900: "#14372a",
      },
      neutral: {
        50: "#f8fafc",
        100: "#f1f5f9",
        200: "#e2e8f0",
        300: "#cbd5e1",
        400: "#94a3b8",
        500: "#64748b",
        600: "#475569",
        700: "#334155",
        800: "#1e293b",
        900: "#0f172a",
      },
      info: "#0f766e",
      success: "#15803d",
      warning: "#c26d2d",
      danger: "#be123c",
    },
    surfaces: {
      pageBg: "from-slate-100 via-white to-blue-50",
      heroBg: "from-neutral-900 via-primary-800 to-accent-700",
      cardGlow: "shadow-[0_28px_64px_rgba(15,23,42,0.16)]",
      pattern:
        "bg-[radial-gradient(circle_at_top_left,rgba(29,78,216,0.08),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.88),rgba(255,255,255,0.74))]",
    },
    commentary: {
      inspiration:
        "Uses enterprise precision from legal operations products and cleaner KPI structure from modern analytics dashboards.",
      motion: "Sharper hover lifts, quick panel reveals, and crisp filter transitions.",
      bestFor:
        "Admin, firm, compliance, and revenue-heavy workflows with stronger dashboard density.",
    },
  },
  {
    number: "3",
    slug: "ai-native",
    title: "AI Native",
    tagline: "Guided, supportive, and deeply integrated with LegalGPT India workflows.",
    mobileConcept: "Now / Next / Later guided journey",
    desktopConcept: "Queue, workspace, insights layout",
    palette: {
      primary: {
        50: "#eef6ff",
        100: "#d9ebff",
        200: "#b8d7ff",
        300: "#86baff",
        400: "#5795ff",
        500: "#356fe4",
        600: "#254ec8",
        700: "#1f3ea4",
        800: "#1e357f",
        900: "#172554",
      },
      accent: {
        50: "#fff7ed",
        100: "#ffedd5",
        200: "#fed7aa",
        300: "#fdba74",
        400: "#fb923c",
        500: "#f97316",
        600: "#d97706",
        700: "#b45309",
        800: "#92400e",
        900: "#78350f",
      },
      neutral: {
        50: "#f8fafc",
        100: "#f1f5f9",
        200: "#e2e8f0",
        300: "#cbd5e1",
        400: "#94a3b8",
        500: "#64748b",
        600: "#475569",
        700: "#334155",
        800: "#1e293b",
        900: "#0f172a",
      },
      info: "#0f766e",
      success: "#15803d",
      warning: "#d97706",
      danger: "#be123c",
    },
    surfaces: {
      pageBg: "from-blue-50 via-white to-orange-50",
      heroBg: "from-primary-900 via-primary-700 to-accent-600",
      cardGlow: "shadow-[0_28px_64px_rgba(23,37,84,0.14)]",
      pattern:
        "bg-[radial-gradient(circle_at_top_right,rgba(37,78,200,0.08),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.9),rgba(255,255,255,0.76))]",
    },
    commentary: {
      inspiration:
        "Blends supportive AI interaction cues with gamified progress and guided workflow reduction.",
      motion: "Calm step transitions, assistant focus glow, and lightweight completion celebrations.",
      bestFor:
        "Students, tutors, guided workflows, and high-frequency LegalGPT India engagement.",
    },
  },
];

const comparisonMatrix = `
| Variation | Character | Strongest Personas | Mobile Bias | Desktop Bias | Best Use |
|---|---|---|---|---|---|
| Variation 1 — Bharat First | Warm, grounded, courtroom-ready | Lawyers, firms, citizens | stacked command cards | 3-column command room | operational beta launch |
| Variation 2 — Legal Pro | Premium, analytical, structured | Admin, firms, compliance | modular discovery grid | KPI and analytics tile board | mature legal operations |
| Variation 3 — AI Native | Guided, supportive, assistant-led | Students, tutors, guided professionals | now/next/later flow | queue + workspace + insights | LegalGPT India-heavy workflows |
`;

function hexToRgb(hex) {
  const clean = hex.replace("#", "");
  const bigint = parseInt(clean, 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  };
}

function luminance(hex) {
  const { r, g, b } = hexToRgb(hex);
  const values = [r, g, b].map((v) => {
    const channel = v / 255;
    return channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * values[0] + 0.7152 * values[1] + 0.0722 * values[2];
}

function contrastRatio(a, b) {
  const l1 = luminance(a);
  const l2 = luminance(b);
  const [light, dark] = l1 > l2 ? [l1, l2] : [l2, l1];
  return ((light + 0.05) / (dark + 0.05)).toFixed(1);
}

function tailwindConfig(variation) {
  return `
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
      tailwind.config = {
        theme: {
          extend: {
            colors: {
              primary: ${JSON.stringify(variation.palette.primary)},
              accent: ${JSON.stringify(variation.palette.accent)},
              neutral: ${JSON.stringify(variation.palette.neutral)},
              info: "${variation.palette.info}",
              success: "${variation.palette.success}",
              warning: "${variation.palette.warning}",
              danger: "${variation.palette.danger}"
            },
            fontFamily: {
              sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
              display: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
              serif: ["Georgia", "ui-serif", "serif"],
              mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "monospace"]
            },
            spacing: {
              4: "16px",
              6: "24px",
              8: "32px"
            },
            boxShadow: {
              panel: "0 20px 44px rgba(15, 23, 42, 0.12)",
              float: "0 28px 70px rgba(15, 23, 42, 0.18)"
            },
            borderRadius: {
              xl: "12px",
              "2xl": "18px",
              "3xl": "26px"
            }
          }
        }
      }
    </script>
  `;
}

function accessibilityComment(variation) {
  const primaryText = variation.palette.neutral[900];
  const secondaryText = variation.palette.neutral[700];
  const white = "#FFFFFF";
  const buttonBg = variation.palette.primary[600];
  return `<!-- ACCESSIBILITY SPECS
Contrast Ratios:
- Primary text (${primaryText}) on white (${white}): ${contrastRatio(primaryText, white)}:1 ✅
- Secondary text (${secondaryText}) on white (${white}): ${contrastRatio(secondaryText, white)}:1 ✅
- Primary button text (${white}) on primary bg (${buttonBg}): ${contrastRatio(white, buttonBg)}:1 ✅

Touch Targets (all ≥44dp):
- Bottom nav items: 56dp height ✅
- Primary buttons: 48dp height ✅
- Icon buttons: 44dp × 44dp ✅

Screen Reader Labels:
- aria-label on all nav items and primary actions ✅
- aria-live="polite" on real-time alert and sync surfaces ✅
- tabindex="0" on interactive preview cards ✅
- focus-visible rings on keyboard-focusable controls ✅
-->`;
}

function commonStyleBlock() {
  return `
    <style>
      html { scroll-behavior: smooth; }
      body { min-height: 100vh; }
      .screen-grid::before {
        content: "";
        position: absolute;
        inset: 0;
        background-image:
          linear-gradient(to right, rgba(148, 163, 184, 0.08) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(148, 163, 184, 0.08) 1px, transparent 1px);
        background-size: 24px 24px;
        pointer-events: none;
        opacity: 0.45;
      }
      .device-frame {
        box-shadow: 0 24px 60px rgba(15, 23, 42, 0.18);
      }
      .scrollbar-hide::-webkit-scrollbar { display: none; }
      .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      .safe-label {
        box-shadow: inset 0 0 0 1px rgba(255,255,255,0.28);
      }
      .focus-ring:focus-visible {
        outline: 3px solid rgba(59, 130, 246, 0.55);
        outline-offset: 3px;
      }
      .divider-dot::before {
        content: "•";
        margin-right: 0.5rem;
        color: rgb(148 163 184);
      }
    </style>
  `;
}

function iconDot(color) {
  return `<span class="h-2.5 w-2.5 rounded-full ${color}"></span>`;
}

function chip(label, tone = "bg-neutral-100 text-neutral-700") {
  return `<span class="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ${tone}">${label}</span>`;
}

function mobileNav(variation, active = "Home") {
  const items =
    variation.slug === "legal-pro"
      ? ["Dashboard", "Research", "Market", "Calendar", "Profile"]
      : variation.slug === "ai-native"
        ? ["Today", "Workspace", "Assistant", "Calendar", "Inbox"]
        : ["Home", "Cases", "AI", "Alerts", "Profile"];
  return `
    <nav aria-label="Primary mobile navigation" class="sticky bottom-0 mt-4 grid grid-cols-5 gap-2 rounded-[24px] border border-neutral-200/80 bg-white/95 p-2 backdrop-blur">
      ${items
        .map(
          (item) => `
            <button aria-label="${item}" class="focus-ring min-h-[56px] rounded-2xl text-[11px] font-semibold ${
              item === active
                ? "bg-primary-50 text-primary-700 shadow-sm"
                : "text-neutral-500 hover:bg-neutral-50"
            }">${item}</button>
          `,
        )
        .join("")}
    </nav>
  `;
}

function desktopRail(variation, active) {
  const items =
    variation.slug === "legal-pro"
      ? ["Platform", "Users", "Marketplace", "Revenue", "AI", "Compliance", "Ops", "Settings"]
      : variation.slug === "ai-native"
        ? ["Queue", "Workspace", "Approvals", "Audit", "Support", "Insights", "Settings"]
        : ["Overview", "Users", "Firm", "Revenue", "AI", "Compliance", "Support", "Settings"];
  return `
    <aside class="border-b border-neutral-200/70 bg-white/72 p-6 lg:min-h-[900px] lg:border-b-0 lg:border-r">
      <div class="mb-6 flex items-center justify-between lg:block">
        <div>
          <p class="text-xs font-semibold uppercase tracking-[0.24em] text-neutral-500">Legal Sathi</p>
          <h3 class="mt-2 text-lg font-bold text-neutral-900">${variation.title}</h3>
        </div>
        <button aria-label="Collapse navigation" class="focus-ring hidden h-11 w-11 rounded-2xl border border-neutral-200 text-neutral-500 hover:bg-neutral-50 md:grid md:place-items-center lg:grid">≡</button>
      </div>
      <div class="grid gap-3">
        ${items
          .map(
            (item) => `
              <button tabindex="0" aria-label="${item}" class="focus-ring flex min-h-[52px] items-center justify-between rounded-2xl border px-4 text-left text-sm font-medium ${
                item === active
                  ? "border-primary-200 bg-primary-50 text-primary-700"
                  : "border-neutral-200 bg-white text-neutral-600 hover:border-primary-100 hover:bg-neutral-50"
              }">
                <span>${item}</span>
                <span class="text-xs text-neutral-400">↵</span>
              </button>
            `,
          )
          .join("")}
      </div>
    </aside>
  `;
}

function loadingState() {
  return `
    <div class="rounded-2xl border border-neutral-200 bg-white p-4">
      <p class="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">Loading</p>
      <div class="animate-pulse space-y-3" aria-live="polite">
        <div class="h-4 w-3/4 rounded bg-neutral-200"></div>
        <div class="h-4 w-1/2 rounded bg-neutral-200"></div>
        <div class="h-20 rounded-2xl bg-neutral-100"></div>
      </div>
    </div>
  `;
}

function emptyState(screen) {
  return `
    <div class="rounded-2xl border border-neutral-200 bg-white p-4 text-center">
      <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-neutral-100 text-neutral-400">○</div>
      <h4 class="mt-3 text-sm font-semibold text-neutral-900">${screen.emptyTitle}</h4>
      <p class="mt-1 text-sm text-neutral-500">${screen.emptyBody}</p>
      <button aria-label="${screen.cta}" class="focus-ring mt-4 inline-flex min-h-[48px] items-center justify-center rounded-xl bg-primary-600 px-4 text-sm font-semibold text-white shadow-sm hover:bg-primary-700">${screen.cta}</button>
    </div>
  `;
}

function errorState(screen) {
  return `
    <div class="rounded-2xl border border-danger/20 bg-danger/5 p-4">
      <div class="flex gap-3">
        <div class="mt-0.5 h-5 w-5 rounded-full bg-danger/20 text-danger"></div>
        <div>
          <p class="text-sm font-medium text-danger">${screen.errorBody}</p>
          <button aria-label="Retry ${screen.title}" class="focus-ring mt-3 inline-flex min-h-[44px] items-center rounded-xl border border-danger/20 px-3 text-sm font-semibold text-danger hover:bg-white">Retry</button>
        </div>
      </div>
    </div>
  `;
}

function offlineState(screen) {
  return `
    <div class="rounded-2xl border border-warning/20 bg-warning/5 p-4">
      <div class="flex items-start justify-between gap-3">
        <div class="flex gap-3">
          <div class="mt-1 h-4 w-4 rounded-full bg-warning/25"></div>
          <p class="text-sm text-warning">${screen.offlineBody}</p>
        </div>
        <button aria-label="Retry sync for ${screen.title}" class="focus-ring text-sm font-semibold text-warning underline">Retry</button>
      </div>
    </div>
  `;
}

function stateGrid(screen) {
  return `
    <div class="grid gap-4 md:grid-cols-2">
      ${loadingState()}
      ${emptyState(screen)}
      ${errorState(screen)}
      ${offlineState(screen)}
    </div>
  `;
}

function topHeader(screen, variation, kind) {
  const ratioPrimary = contrastRatio(variation.palette.neutral[900], "#FFFFFF");
  return `
    <section class="rounded-[32px] bg-gradient-to-br ${variation.surfaces.heroBg} p-6 text-white shadow-float">
      <div class="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div class="max-w-3xl">
          <p class="text-xs font-semibold uppercase tracking-[0.24em] text-white/70">Variation ${variation.number} — ${variation.title}</p>
          <h1 class="mt-3 font-display text-4xl font-black tracking-tight lg:text-5xl">${kind === "mobile" ? "Mobile Screen System" : "Desktop Command System"}</h1>
          <p class="mt-4 max-w-2xl text-base text-white/80 lg:text-lg">${variation.tagline}</p>
          <p class="mt-3 text-sm text-white/70">${variation.commentary.inspiration}</p>
        </div>
        <div class="grid gap-3 sm:grid-cols-3">
          <div class="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
            <p class="text-xs uppercase tracking-[0.2em] text-white/60">Layout</p>
            <p class="mt-2 text-sm font-semibold">${kind === "mobile" ? variation.mobileConcept : variation.desktopConcept}</p>
          </div>
          <div class="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
            <p class="text-xs uppercase tracking-[0.2em] text-white/60">Best for</p>
            <p class="mt-2 text-sm font-semibold">${variation.commentary.bestFor}</p>
          </div>
          <div class="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
            <p class="text-xs uppercase tracking-[0.2em] text-white/60">Contrast</p>
            <p class="mt-2 text-sm font-semibold">${ratioPrimary}:1 primary-on-white</p>
          </div>
        </div>
      </div>
    </section>
  `;
}

function screenMeta(screen, variation, kind) {
  return `
    <div class="rounded-3xl border border-neutral-200 bg-white p-5 shadow-panel">
      <div class="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div class="flex flex-wrap items-center gap-2">
            ${chip(screen.id, "bg-primary-50 text-primary-700")}
            ${chip(kind === "mobile" ? screen.persona : screen.role, "bg-accent-50 text-accent-700")}
            ${screen.aiVisible ? chip("LegalGPT India visible", "bg-info/10 text-info") : ""}
          </div>
          <h2 class="mt-4 text-2xl font-bold tracking-tight text-neutral-900">${screen.title}</h2>
          <p class="mt-2 text-sm leading-6 text-neutral-600">${screen.purpose}</p>
        </div>
        <div class="rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-right">
          <p class="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">Design intent</p>
          <p class="mt-2 text-sm font-medium text-neutral-700">${variation.title} · ${kind === "mobile" ? variation.mobileConcept : variation.desktopConcept}</p>
        </div>
      </div>
      <div class="mt-5 flex flex-wrap gap-2">
        ${screen.keyComponents.map((item) => chip(item)).join("")}
      </div>
    </div>
  `;
}

function mobileCore(screen, variation) {
  const cards = {
    "S-01": `
      <div class="space-y-4">
        <div class="rounded-[28px] bg-gradient-to-br from-primary-700 to-accent-600 p-5 text-white">
          <p class="text-xs uppercase tracking-[0.24em] text-white/70">Welcome to Legal Sathi</p>
          <h3 class="mt-2 text-2xl font-black tracking-tight">Choose your path into Bharat's legal ecosystem.</h3>
          <div class="mt-4 flex flex-wrap gap-2">
            ${["English", "हिंदी", "தமிழ்", "తెలుగు"].map((x) => `<button aria-label="${x}" class="focus-ring min-h-[44px] rounded-full border border-white/20 bg-white/10 px-3 text-sm">${x}</button>`).join("")}
          </div>
        </div>
        <div class="grid grid-cols-2 gap-3">
          ${["Student", "Lawyer", "Firm", "Tutor", "Citizen"].map((role, index) => `
            <button aria-label="${role}" class="focus-ring ${index === 4 ? "col-span-2" : ""} min-h-[92px] rounded-3xl border border-neutral-200 bg-white px-4 py-4 text-left shadow-sm hover:border-primary-200 hover:bg-primary-50">
              <span class="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">Persona</span>
              <strong class="mt-2 block text-base text-neutral-900">${role}</strong>
              <span class="mt-1 block text-sm text-neutral-500">${role === "Citizen" ? "Find verified counsel and legal help" : "Optimized dashboard and workflows"}</span>
            </button>
          `).join("")}
        </div>
      </div>
    `,
    "S-02": `
      <div class="space-y-4">
        <div class="rounded-[28px] bg-neutral-900 p-5 text-white">
          <p class="text-xs uppercase tracking-[0.24em] text-white/60">Secure sign in</p>
          <h3 class="mt-2 text-2xl font-black tracking-tight">Access your matters, research, and consultations.</h3>
        </div>
        <div class="rounded-[28px] border border-neutral-200 bg-white p-4 shadow-sm">
          <div class="grid grid-cols-2 gap-2 rounded-full bg-neutral-100 p-1">
            <button class="focus-ring min-h-[44px] rounded-full bg-white text-sm font-semibold text-neutral-900 shadow-sm">Phone + OTP</button>
            <button class="focus-ring min-h-[44px] rounded-full text-sm font-semibold text-neutral-500">Email</button>
          </div>
          <div class="mt-4 space-y-3">
            <div class="rounded-2xl border border-neutral-200 px-4 py-3 text-sm text-neutral-500">+91 98765 43210</div>
            <div class="grid grid-cols-6 gap-2">
              ${Array.from({ length: 6 }, () => `<div class="h-12 rounded-2xl border border-neutral-200 bg-neutral-50"></div>`).join("")}
            </div>
            <button aria-label="Continue securely" class="focus-ring min-h-[48px] w-full rounded-2xl bg-primary-600 text-sm font-semibold text-white shadow-sm hover:bg-primary-700">Continue securely</button>
            <div class="grid gap-2">
              <button class="focus-ring min-h-[44px] rounded-2xl border border-neutral-200 bg-white text-sm font-medium text-neutral-700">Continue with Google</button>
              <button class="focus-ring min-h-[44px] rounded-2xl border border-neutral-200 bg-white text-sm font-medium text-neutral-700">Continue with Microsoft</button>
            </div>
          </div>
        </div>
      </div>
    `,
    "S-03": `
      <div class="space-y-4">
        <div class="rounded-[28px] bg-primary-50 p-4">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs uppercase tracking-[0.24em] text-primary-700">Step 2 of 3</p>
              <h3 class="mt-1 text-xl font-bold text-neutral-900">Tell Legal Sathi how you work.</h3>
            </div>
            ${chip("DPDP ready", "bg-white text-primary-700")}
          </div>
        </div>
        <div class="space-y-3 rounded-[28px] border border-neutral-200 bg-white p-4 shadow-sm">
          <div class="rounded-2xl border border-neutral-200 px-4 py-3 text-sm text-neutral-500">Name, designation, and location</div>
          <div class="rounded-2xl border border-neutral-200 px-4 py-3 text-sm text-neutral-500">Languages spoken and practice areas</div>
          <div class="rounded-2xl border border-neutral-200 px-4 py-3 text-sm text-neutral-500">College / firm / chamber details</div>
          <div class="rounded-[24px] border border-primary-100 bg-primary-50 p-4">
            <p class="text-sm font-semibold text-neutral-900">DPDP consent manager</p>
            <div class="mt-3 space-y-2">
              ${["Profile personalization", "Court alerts and reminders", "LegalGPT India assistance"].map((item, idx) => `
                <div class="flex items-center justify-between rounded-2xl bg-white px-3 py-2">
                  <span class="text-sm text-neutral-700">${item}</span>
                  <span class="h-6 w-11 rounded-full ${idx < 2 ? "bg-primary-600" : "bg-neutral-300"} p-0.5"><span class="block h-5 w-5 rounded-full bg-white ${idx < 2 ? "translate-x-5" : ""}"></span></span>
                </div>`).join("")}
            </div>
          </div>
        </div>
      </div>
    `,
    "S-04": `
      <div class="space-y-4">
        <div class="rounded-[30px] bg-gradient-to-br from-primary-700 to-accent-700 p-5 text-white">
          <div class="flex items-start justify-between gap-4">
            <div>
              <p class="text-xs uppercase tracking-[0.24em] text-white/70">S-04 Morning Brief</p>
              <h3 class="mt-2 text-[28px] font-black leading-none tracking-tight">2 hearings.<br/>1 consultation.<br/>One urgent queue jump.</h3>
            </div>
            ${chip("Court 3 · Item 18", "safe-label bg-white/10 text-white")}
          </div>
          <div class="mt-4 rounded-[24px] bg-white/10 p-4 backdrop-blur" aria-live="polite">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-semibold">Khanna v. State</p>
                <p class="text-sm text-white/75">Delhi High Court · Estimated call in 28 mins</p>
              </div>
              ${chip("Within 5", "bg-red-500/20 text-white")}
            </div>
          </div>
        </div>
        <div class="flex gap-2 overflow-x-auto scrollbar-hide">
          ${["Open Case", "Search", "Upload Order", "Calendar", "Billing"].map((x) => `<button class="focus-ring min-h-[44px] shrink-0 rounded-full border border-neutral-200 bg-white px-4 text-sm font-medium text-neutral-700">${x}</button>`).join("")}
        </div>
        <div class="space-y-3 rounded-[28px] border border-neutral-200 bg-white p-4 shadow-sm">
          <div class="flex items-center justify-between">
            <h4 class="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">Today's hearings</h4>
            ${chip("Live queue", "bg-primary-50 text-primary-700")}
          </div>
          ${[
            ["10:30", "Khanna v. State", "Court 3 · Queue moving faster than expected", "Urgent"],
            ["13:45", "Rao Arbitration Petition", "Virtual mention · Client note pending", "Prep"],
          ]
            .map(
              ([time, matter, meta, status]) => `
              <button aria-label="${matter}" class="focus-ring flex w-full items-center gap-3 rounded-[24px] border border-neutral-200 px-4 py-3 text-left hover:border-primary-200 hover:bg-primary-50">
                <div class="rounded-2xl bg-neutral-100 px-3 py-2 text-sm font-bold text-neutral-900">${time}</div>
                <div class="min-w-0 flex-1">
                  <p class="truncate text-sm font-semibold text-neutral-900">${matter}</p>
                  <p class="truncate text-xs text-neutral-500">${meta}</p>
                </div>
                ${chip(status, status === "Urgent" ? "bg-danger/10 text-danger" : "bg-warning/10 text-warning")}
              </button>`,
            )
            .join("")}
        </div>
      </div>
    `,
    "S-05": `
      <div class="space-y-4">
        <div class="rounded-[28px] border border-neutral-200 bg-white p-4 shadow-sm">
          <div class="flex items-center justify-between gap-3">
            <div class="rounded-2xl bg-neutral-100 px-4 py-3 text-sm text-neutral-500">Search matters, courts, clients</div>
            <button class="focus-ring h-11 w-11 rounded-2xl bg-primary-600 text-lg font-bold text-white">+</button>
          </div>
          <div class="mt-3 flex gap-2 overflow-x-auto scrollbar-hide">
            ${["All", "High priority", "This week", "Delhi HC", "Commercial"].map((x, i) => chip(x, i === 0 ? "bg-primary-50 text-primary-700" : "bg-neutral-100 text-neutral-600")).join("")}
          </div>
        </div>
        <div class="space-y-3">
          ${[
            ["WP/1234/2026", "Khanna v. State", "Delhi HC · Criminal", "Active"],
            ["ARB/98/2026", "Rao Arbitration", "Virtual matter · 13 docs", "Awaiting hearing"],
            ["CC/430/2026", "Devaki Consumer Claim", "District Court · Client invoice pending", "Drafting"],
          ]
            .map(
              ([num, name, meta, status]) => `
              <button class="focus-ring w-full rounded-[28px] border border-neutral-200 bg-white p-4 text-left shadow-sm hover:border-primary-200">
                <div class="flex items-start justify-between gap-3">
                  <div>
                    <p class="font-mono text-xs text-neutral-500">${num}</p>
                    <p class="mt-1 text-base font-semibold text-neutral-900">${name}</p>
                    <p class="mt-1 text-sm text-neutral-500">${meta}</p>
                  </div>
                  ${chip(status, "bg-accent-50 text-accent-700")}
                </div>
              </button>`,
            )
            .join("")}
        </div>
      </div>
    `,
    "S-06": `
      <div class="space-y-4">
        <div class="rounded-[30px] bg-neutral-900 p-5 text-white">
          <p class="font-mono text-xs tracking-[0.24em] text-white/55">WP/1234/2026</p>
          <div class="mt-2 flex items-center justify-between gap-4">
            <div>
              <h3 class="text-2xl font-black tracking-tight">Khanna v. State</h3>
              <p class="mt-1 text-sm text-white/70">Delhi High Court · Client communication updated 12 mins ago</p>
            </div>
            ${chip("Active", "bg-white/10 text-white")}
          </div>
        </div>
        <div class="grid gap-3">
          ${[
            ["Timeline", "Today's hearing note drafted and tagged to the matter."],
            ["Documents", "Order upload complete · OCR index in progress."],
            ["Client log", "Client informed by WhatsApp and in-app note."],
            ["LegalGPT India", "Suggested 3 supporting precedents with 0.89 confidence."],
          ]
            .map(
              ([title, body]) => `
              <div class="rounded-[24px] border border-neutral-200 bg-white p-4 shadow-sm">
                <div class="flex items-center justify-between">
                  <h4 class="text-sm font-semibold text-neutral-900">${title}</h4>
                  ${title === "LegalGPT India" ? chip("Visible", "bg-info/10 text-info") : iconDot("bg-primary-500")}
                </div>
                <p class="mt-2 text-sm text-neutral-500">${body}</p>
              </div>`,
            )
            .join("")}
        </div>
      </div>
    `,
    "S-07": `
      <div class="space-y-4">
        <div class="rounded-[30px] bg-gradient-to-br from-primary-900 to-primary-700 p-5 text-white">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs uppercase tracking-[0.24em] text-white/60">LegalGPT India</p>
              <h3 class="mt-2 text-2xl font-black tracking-tight">Citation-bound legal help, inside the workflow.</h3>
            </div>
            ${chip("0.91 confidence", "bg-white/10 text-white")}
          </div>
          <div class="mt-4 flex flex-wrap gap-2">
            ${["Explain simply", "Hindi", "Voice input"].map((x) => `<button class="focus-ring min-h-[44px] rounded-full border border-white/15 bg-white/10 px-3 text-sm">${x}</button>`).join("")}
          </div>
        </div>
        <div class="space-y-3 rounded-[28px] border border-neutral-200 bg-white p-4 shadow-sm">
          <div class="rounded-[22px] bg-primary-50 p-4 text-sm text-neutral-800">
            Summarize the ratio and procedural posture of the judgment. Highlight anything relevant to interim relief.
          </div>
          <div class="rounded-[22px] bg-neutral-100 p-4 text-sm text-neutral-700">
            The judgment turns on proportionality and procedural fairness. I found three supporting authorities and one caution on maintainability.
          </div>
          <div class="grid gap-2">
            ${["(2023) 4 SCC 112", "Order VI Rule 17 CPC", "Section 8 DPDP Act 2023"].map((x) => `<div class="rounded-2xl border border-neutral-200 px-3 py-2 text-sm text-neutral-700">${x}</div>`).join("")}
          </div>
          <div class="rounded-[22px] border border-neutral-200 px-4 py-3 text-sm text-neutral-400">Ask a new question with context, citation, or uploaded document.</div>
        </div>
      </div>
    `,
    "S-08": `
      <div class="space-y-4">
        <div class="rounded-[28px] border border-neutral-200 bg-white p-4 shadow-sm">
          <div class="rounded-2xl border border-neutral-200 px-4 py-3 text-sm text-neutral-500">Search by keyword, context, court, act, or judge</div>
          <div class="mt-3 flex gap-2 overflow-x-auto scrollbar-hide">
            ${["Supreme Court", "Constitution", "2020+", "Article 14", "Saved offline"].map((x, i) => chip(x, i === 4 ? "bg-primary-50 text-primary-700" : "bg-neutral-100 text-neutral-600")).join("")}
          </div>
        </div>
        <div class="space-y-3">
          ${[
            ["(2023) 4 SCC 112", "Procedural fairness in urgent relief matters", "Saved"],
            ["AIR 2021 Del 88", "Bench clarified maintainability threshold", "Cross-ref"],
          ]
            .map(
              ([cite, title, status]) => `
              <div class="rounded-[26px] border border-neutral-200 bg-white p-4 shadow-sm">
                <div class="flex items-start justify-between gap-3">
                  <div>
                    <p class="font-mono text-xs text-neutral-500">${cite}</p>
                    <p class="mt-1 text-sm font-semibold text-neutral-900">${title}</p>
                    <p class="mt-1 text-xs text-neutral-500">Court, date, judge, cited acts, and quick summary visible</p>
                  </div>
                  ${chip(status, "bg-accent-50 text-accent-700")}
                </div>
              </div>`,
            )
            .join("")}
        </div>
      </div>
    `,
    "S-09": `
      <div class="space-y-4">
        <div class="rounded-[30px] bg-gradient-to-br from-accent-600 to-primary-700 p-5 text-white">
          <p class="text-xs uppercase tracking-[0.24em] text-white/60">Moot court suite</p>
          <h3 class="mt-2 text-2xl font-black tracking-tight">Build your memorial. Simulate the bench. Score your round.</h3>
        </div>
        <div class="grid grid-cols-2 gap-3">
          ${[
            ["Memorial Drafter", "Draft 3"],
            ["Counter Arguments", "6 generated"],
            ["Judge Simulation", "Ready"],
            ["Scoring Rubric", "78 / 100"],
          ]
            .map(
              ([name, value]) => `
              <div class="rounded-[24px] border border-neutral-200 bg-white p-4 shadow-sm">
                <p class="text-xs uppercase tracking-[0.2em] text-neutral-500">${name}</p>
                <p class="mt-2 text-lg font-bold text-neutral-900">${value}</p>
              </div>`,
            )
            .join("")}
        </div>
      </div>
    `,
    "S-10": `
      <div class="space-y-4">
        <div class="rounded-[28px] border border-neutral-200 bg-white p-4 shadow-sm">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs uppercase tracking-[0.2em] text-neutral-500">Internship hub</p>
              <h3 class="mt-1 text-xl font-bold text-neutral-900">Opportunities matched to your current focus.</h3>
            </div>
            ${chip("8 new", "bg-success/10 text-success")}
          </div>
        </div>
        <div class="space-y-3">
          ${[
            ["Constitutional Law Intern", "Delhi · 3 days left · NLU alumni referral"],
            ["NGO Litigation Fellow", "Bengaluru · Resume score 86% · Mock interview ready"],
            ["Tribunal Research Intern", "Hybrid · Saved to tracker"],
          ]
            .map(
              ([title, meta]) => `
              <div class="rounded-[26px] border border-neutral-200 bg-white p-4 shadow-sm">
                <p class="text-sm font-semibold text-neutral-900">${title}</p>
                <p class="mt-1 text-sm text-neutral-500">${meta}</p>
              </div>`,
            )
            .join("")}
        </div>
      </div>
    `,
    "S-11": `
      <div class="space-y-4">
        <div class="rounded-[28px] border border-neutral-200 bg-white p-4 shadow-sm">
          <div class="rounded-2xl border border-neutral-200 px-4 py-3 text-sm text-neutral-500">Search city, language, budget, or practice area</div>
          <div class="mt-3 flex gap-2 overflow-x-auto scrollbar-hide">
            ${["Near me", "Family law", "Hindi", "₹₹", "Female lawyer"].map((x) => chip(x, "bg-neutral-100 text-neutral-600")).join("")}
          </div>
        </div>
        <div class="space-y-3">
          ${[
            ["Adv. Asha Menon", "Family Law · Bengaluru · Verified", "₹₹₹"],
            ["Adv. Irfan Khan", "Civil + Property · Mysuru · Accepting new clients", "₹₹"],
          ]
            .map(
              ([name, meta, fee]) => `
              <button class="focus-ring flex w-full items-start gap-3 rounded-[26px] border border-neutral-200 bg-white p-4 text-left shadow-sm hover:border-primary-200">
                <div class="mt-1 h-12 w-12 rounded-2xl bg-primary-100"></div>
                <div class="min-w-0 flex-1">
                  <div class="flex items-center gap-2">
                    <p class="text-sm font-semibold text-neutral-900">${name}</p>
                    ${chip("Verified", "bg-primary-50 text-primary-700")}
                  </div>
                  <p class="mt-1 text-sm text-neutral-500">${meta}</p>
                </div>
                ${chip(fee, "bg-accent-50 text-accent-700")}
              </button>`,
            )
            .join("")}
        </div>
      </div>
    `,
    "S-12": `
      <div class="space-y-4">
        <div class="rounded-[30px] bg-primary-50 p-4">
          <div class="flex items-start justify-between gap-4">
            <div>
              <p class="text-xs uppercase tracking-[0.2em] text-primary-700">Consultation booking</p>
              <h3 class="mt-1 text-xl font-bold text-neutral-900">Choose a slot, confirm payment, and arrive prepared.</h3>
            </div>
            ${chip("Razorpay ready", "bg-white text-primary-700")}
          </div>
        </div>
        <div class="rounded-[28px] border border-neutral-200 bg-white p-4 shadow-sm">
          <div class="grid grid-cols-4 gap-2 text-center text-sm">
            ${["12", "13", "14", "15"].map((d, i) => `<button class="focus-ring min-h-[52px] rounded-2xl ${i === 1 ? "bg-primary-600 text-white" : "bg-neutral-100 text-neutral-600"}">${d}</button>`).join("")}
          </div>
          <div class="mt-4 grid grid-cols-3 gap-2">
            ${["10:00", "10:30", "11:00", "11:30", "14:00", "16:00"].map((slot, i) => `<button class="focus-ring min-h-[44px] rounded-2xl border ${i === 5 ? "border-primary-600 bg-primary-50 text-primary-700" : "border-neutral-200 bg-white text-neutral-600"} text-sm font-medium">${slot}</button>`).join("")}
          </div>
          <div class="mt-4 rounded-[22px] bg-neutral-50 p-4 text-sm text-neutral-600">
            30-minute video consult · ₹1,500 total · Notes autosave enabled.
          </div>
        </div>
      </div>
    `,
    "S-13": `
      <div class="space-y-4">
        <div class="rounded-[30px] bg-gradient-to-br from-danger to-accent-700 p-5 text-white" aria-live="polite">
          <p class="text-xs uppercase tracking-[0.24em] text-white/60">Court Alerts Center</p>
          <h3 class="mt-2 text-2xl font-black tracking-tight">Your case is almost up.</h3>
          <p class="mt-2 text-sm text-white/80">Order uploads, queue jumps, and reminder checkpoints stay in one place.</p>
        </div>
        <div class="space-y-3">
          ${[
            ["Live queue", "Court 3 · Item 18 · moving to item 15", "Within 5"],
            ["Reminder", "Tomorrow · Filing deadline for affidavit", "1 day"],
            ["Order upload", "District Court · Order indexed to vault", "New"],
          ]
            .map(
              ([title, meta, status]) => `
              <div class="rounded-[26px] border border-neutral-200 bg-white p-4 shadow-sm">
                <div class="flex items-start justify-between gap-3">
                  <div>
                    <p class="text-sm font-semibold text-neutral-900">${title}</p>
                    <p class="mt-1 text-sm text-neutral-500">${meta}</p>
                  </div>
                  ${chip(status, status === "Within 5" ? "bg-danger/10 text-danger" : "bg-primary-50 text-primary-700")}
                </div>
              </div>`,
            )
            .join("")}
        </div>
      </div>
    `,
    "S-14": `
      <div class="space-y-4">
        <div class="grid grid-cols-2 gap-3">
          ${[
            ["Receivables", "₹2.3L"],
            ["Collected", "₹8.4L"],
            ["Retainer alerts", "3"],
            ["GST due", "₹42K"],
          ]
            .map(
              ([name, value]) => `
              <div class="rounded-[24px] border border-neutral-200 bg-white p-4 shadow-sm">
                <p class="text-xs uppercase tracking-[0.2em] text-neutral-500">${name}</p>
                <p class="mt-2 text-xl font-bold text-neutral-900">${value}</p>
              </div>`,
            )
            .join("")}
        </div>
        <div class="rounded-[28px] border border-neutral-200 bg-white p-4 shadow-sm">
          <div class="flex items-center justify-between">
            <h3 class="text-base font-semibold text-neutral-900">Invoice queue</h3>
            ${chip("GST compliant", "bg-success/10 text-success")}
          </div>
          <div class="mt-3 space-y-2">
            ${[
              ["INV-2026-044", "Paid", "₹24,000"],
              ["INV-2026-045", "Pending", "₹48,000"],
              ["INV-2026-046", "Retainer", "₹1,20,000"],
            ]
              .map(
                ([invoice, status, amount]) => `
                <div class="flex items-center justify-between rounded-2xl bg-neutral-50 px-3 py-2 text-sm">
                  <span class="font-mono text-neutral-500">${invoice}</span>
                  ${chip(status, status === "Paid" ? "bg-success/10 text-success" : "bg-warning/10 text-warning")}
                  <span class="font-semibold text-neutral-900">${amount}</span>
                </div>`,
              )
              .join("")}
          </div>
        </div>
      </div>
    `,
    "S-15": `
      <div class="space-y-4">
        <div class="rounded-[28px] border border-neutral-200 bg-white p-4 shadow-sm">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs uppercase tracking-[0.2em] text-neutral-500">Document vault</p>
              <h3 class="mt-1 text-xl font-bold text-neutral-900">Search across case files, drafts, and signed records.</h3>
            </div>
            ${chip("AES-256", "bg-primary-50 text-primary-700")}
          </div>
        </div>
        <div class="space-y-3">
          ${[
            ["Khanna Matter", "14 files · OCR indexed · 2 pending signatures"],
            ["Rao Arbitration", "7 files · version history clean"],
            ["Citizen Consultation", "3 notes · follow-up saved"],
          ]
            .map(
              ([folder, meta]) => `
              <div class="rounded-[26px] border border-neutral-200 bg-white p-4 shadow-sm">
                <p class="text-sm font-semibold text-neutral-900">${folder}</p>
                <p class="mt-1 text-sm text-neutral-500">${meta}</p>
              </div>`,
            )
            .join("")}
        </div>
      </div>
    `,
    "S-16": `
      <div class="space-y-4">
        <div class="rounded-[28px] border border-neutral-200 bg-white p-4 shadow-sm">
          <div class="grid grid-cols-3 gap-2 rounded-full bg-neutral-100 p-1">
            ${["Day", "Week", "Month"].map((x, i) => `<button class="focus-ring min-h-[44px] rounded-full ${i === 1 ? "bg-white text-neutral-900 shadow-sm" : "text-neutral-500"} text-sm font-semibold">${x}</button>`).join("")}
          </div>
          <div class="mt-4 space-y-2">
            ${[
              ["09:00", "Travel to Delhi HC", "Primary"],
              ["10:30", "Hearing block · Court 3", "Critical"],
              ["16:00", "Citizen video consultation", "Booked"],
            ]
              .map(
                ([time, event, label]) => `
                <div class="flex items-center justify-between rounded-2xl bg-neutral-50 px-4 py-3 text-sm">
                  <div>
                    <p class="font-semibold text-neutral-900">${time}</p>
                    <p class="text-neutral-500">${event}</p>
                  </div>
                  ${chip(label, "bg-primary-50 text-primary-700")}
                </div>`,
              )
              .join("")}
          </div>
        </div>
      </div>
    `,
    "S-17": `
      <div class="space-y-4">
        <div class="flex gap-2 overflow-x-auto scrollbar-hide">
          ${["All", "Court", "Payment", "AI", "General"].map((x, i) => chip(x, i === 0 ? "bg-primary-50 text-primary-700" : "bg-neutral-100 text-neutral-600")).join("")}
        </div>
        <div class="space-y-3">
          ${[
            ["Court alert", "Your case is within five serials in Court 3.", "High"],
            ["Payment", "Consultation payment captured successfully.", "Normal"],
            ["LegalGPT India", "Research bundle ready with 3 verified citations.", "Normal"],
          ]
            .map(
              ([title, body, priority]) => `
              <div class="rounded-[26px] border border-neutral-200 bg-white p-4 shadow-sm">
                <div class="flex items-start justify-between gap-3">
                  <div>
                    <p class="text-sm font-semibold text-neutral-900">${title}</p>
                    <p class="mt-1 text-sm text-neutral-500">${body}</p>
                  </div>
                  ${chip(priority, priority === "High" ? "bg-danger/10 text-danger" : "bg-neutral-100 text-neutral-600")}
                </div>
              </div>`,
            )
            .join("")}
        </div>
      </div>
    `,
    "S-18": `
      <div class="space-y-4">
        <div class="rounded-[28px] border border-neutral-200 bg-white p-4 shadow-sm">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs uppercase tracking-[0.2em] text-neutral-500">Settings & privacy</p>
              <h3 class="mt-1 text-xl font-bold text-neutral-900">Control appearance, language, consent, and data rights.</h3>
            </div>
            ${chip("DPDP", "bg-primary-50 text-primary-700")}
          </div>
        </div>
        <div class="space-y-3">
          ${[
            ["Theme", "Light · Dark · System"],
            ["Language", "English, हिंदी, தமிழ்"],
            ["Consent manager", "Review purpose, export data, request deletion"],
            ["Connected tools", "Calendar, WhatsApp, mail"],
          ]
            .map(
              ([title, body]) => `
              <div class="rounded-[24px] border border-neutral-200 bg-white p-4 shadow-sm">
                <div class="flex items-center justify-between">
                  <p class="text-sm font-semibold text-neutral-900">${title}</p>
                  <span class="text-neutral-400">›</span>
                </div>
                <p class="mt-1 text-sm text-neutral-500">${body}</p>
              </div>`,
            )
            .join("")}
        </div>
      </div>
    `,
  };

  const specialV2 = {
    "S-04": `
      <div class="space-y-4">
        <div class="rounded-[28px] border border-primary-100 bg-white p-4 shadow-sm">
          <p class="text-xs uppercase tracking-[0.2em] text-primary-700">Dashboard grid</p>
          <div class="mt-3 grid grid-cols-2 gap-3">
            ${[
              ["Live queue", "Item 18", "bg-primary-50"],
              ["Consultations", "1 today", "bg-accent-50"],
              ["Open matters", "14", "bg-white"],
              ["AI suggestions", "4", "bg-white"],
            ]
              .map(
                ([label, value, tone]) => `
                <div class="rounded-[24px] border border-neutral-200 ${tone} p-4">
                  <p class="text-xs uppercase tracking-[0.2em] text-neutral-500">${label}</p>
                  <p class="mt-2 text-xl font-black text-neutral-900">${value}</p>
                </div>`,
              )
              .join("")}
          </div>
        </div>
        <div class="grid grid-cols-2 gap-3">
          ${[
            ["Cases", "3 urgent"],
            ["Calendar", "2 conflicts checked"],
            ["Alerts", "1 queue jump"],
            ["Billing", "₹48K pending"],
          ]
            .map(
              ([title, meta]) => `
              <div class="rounded-[24px] border border-neutral-200 bg-white p-4 shadow-sm">
                <p class="text-sm font-semibold text-neutral-900">${title}</p>
                <p class="mt-1 text-sm text-neutral-500">${meta}</p>
              </div>`,
            )
            .join("")}
        </div>
      </div>
    `,
    "S-07": `
      <div class="space-y-4">
        <div class="rounded-[28px] border border-primary-100 bg-white p-4 shadow-sm">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs uppercase tracking-[0.2em] text-primary-700">Assistant workspace</p>
              <h3 class="mt-1 text-xl font-bold text-neutral-900">Ask, retrieve, verify, and pin results.</h3>
            </div>
            ${chip("Pinned", "bg-primary-50 text-primary-700")}
          </div>
          <div class="mt-4 grid grid-cols-2 gap-3">
            <div class="rounded-[22px] bg-primary-50 p-4 text-sm text-neutral-800">What is the ratio and maintainability risk here?</div>
            <div class="rounded-[22px] bg-neutral-100 p-4 text-sm text-neutral-700">3 verified authorities found. 1 maintainability caution flagged.</div>
          </div>
          <div class="mt-4 grid gap-2">
            ${["Authority card", "Timeline card", "Simple explanation toggle"].map((x) => `<div class="rounded-2xl border border-neutral-200 px-3 py-2 text-sm text-neutral-600">${x}</div>`).join("")}
          </div>
        </div>
      </div>
    `,
  };

  const specialV3 = {
    "S-04": `
      <div class="space-y-4">
        <div class="rounded-[28px] border border-primary-100 bg-white p-4 shadow-sm">
          <p class="text-xs uppercase tracking-[0.2em] text-primary-700">Today agenda</p>
          <h3 class="mt-2 text-2xl font-black tracking-tight text-neutral-900">Now, next, and later are already prioritized.</h3>
        </div>
        <div class="space-y-3">
          ${[
            ["Now", "Update hearing note for Khanna matter", "Due"],
            ["Next", "Review LegalGPT India precedent bundle", "AI"],
            ["Later", "Confirm citizen consultation slot", "4 PM"],
          ]
            .map(
              ([label, body, state]) => `
              <div class="rounded-[24px] border border-neutral-200 bg-white p-4 shadow-sm">
                <div class="flex items-center justify-between">
                  ${chip(label, "bg-primary-50 text-primary-700")}
                  ${chip(state, state === "Due" ? "bg-danger/10 text-danger" : "bg-accent-50 text-accent-700")}
                </div>
                <p class="mt-3 text-sm font-semibold text-neutral-900">${body}</p>
              </div>`,
            )
            .join("")}
        </div>
      </div>
    `,
    "S-07": `
      <div class="space-y-4">
        <div class="rounded-[30px] bg-gradient-to-br from-primary-800 to-accent-600 p-5 text-white">
          <p class="text-xs uppercase tracking-[0.24em] text-white/60">Guided assistant</p>
          <h3 class="mt-2 text-2xl font-black tracking-tight">LegalGPT India is part of the workflow, not a detour.</h3>
        </div>
        <div class="space-y-3">
          ${[
            ["Question", "Summarize the strongest interim-relief precedent in simpler language."],
            ["Response", "I found 3 authorities. One is strongest on urgency, one on maintainability, one on procedural fairness."],
            ["Next step", "Pin the strongest authority to your matter note and send a simplified summary to the client."],
          ]
            .map(
              ([label, body], i) => `
              <div class="rounded-[24px] border border-neutral-200 ${i === 2 ? "bg-accent-50" : "bg-white"} p-4 shadow-sm">
                <p class="text-xs uppercase tracking-[0.2em] text-neutral-500">${label}</p>
                <p class="mt-2 text-sm text-neutral-800">${body}</p>
              </div>`,
            )
            .join("")}
        </div>
      </div>
    `,
  };

  if (variation.slug === "legal-pro" && specialV2[screen.id]) return specialV2[screen.id];
  if (variation.slug === "ai-native" && specialV3[screen.id]) return specialV3[screen.id];
  return cards[screen.id];
}

function desktopCore(screen, variation) {
  const common = {
    "A-01": `
      <div class="grid gap-4 lg:grid-cols-[1.1fr,0.9fr]">
        <div class="rounded-[28px] bg-neutral-900 p-6 text-white">
          <p class="text-xs uppercase tracking-[0.24em] text-white/60">Secure admin entry</p>
          <h3 class="mt-3 text-3xl font-black tracking-tight">Role-aware access with MFA and audit trail.</h3>
          <p class="mt-3 text-sm text-white/70">SSO, fallback login, session timeout warnings, and IP-aware safeguards.</p>
        </div>
        <div class="rounded-[28px] border border-neutral-200 bg-white p-6 shadow-sm">
          <div class="space-y-3">
            <div class="rounded-2xl border border-neutral-200 px-4 py-3 text-sm text-neutral-500">admin@legalsathi.in</div>
            <div class="rounded-2xl border border-neutral-200 px-4 py-3 text-sm text-neutral-500">••••••••••••</div>
            <div class="grid grid-cols-6 gap-2">${Array.from({ length: 6 }, () => `<div class="h-12 rounded-2xl border border-neutral-200 bg-neutral-50"></div>`).join("")}</div>
            <button class="focus-ring min-h-[48px] w-full rounded-2xl bg-primary-600 text-sm font-semibold text-white">Verify and continue</button>
          </div>
        </div>
      </div>
    `,
    "A-02": `
      <div class="grid gap-4 xl:grid-cols-[1.1fr,1.1fr,0.8fr]">
        <div class="rounded-[28px] border border-neutral-200 bg-white p-5 shadow-sm">
          <div class="flex items-start justify-between">
            <div>
              <p class="text-xs uppercase tracking-[0.24em] text-neutral-500">Platform health</p>
              <h3 class="mt-2 text-2xl font-black tracking-tight text-neutral-900">18,240 active users across 5 personas.</h3>
            </div>
            ${chip("Live", "bg-success/10 text-success")}
          </div>
          <div class="mt-5 grid grid-cols-2 gap-3">
            ${[
              ["MRR", "₹10.4L"],
              ["AI satisfaction", "4.6/5"],
              ["Court latency", "84s"],
              ["Support backlog", "12"],
            ]
              .map(
                ([name, value]) => `
                <div class="rounded-[22px] bg-neutral-50 p-4">
                  <p class="text-xs uppercase tracking-[0.2em] text-neutral-500">${name}</p>
                  <p class="mt-2 text-xl font-bold text-neutral-900">${value}</p>
                </div>`,
              )
              .join("")}
          </div>
        </div>
        <div class="rounded-[28px] border border-neutral-200 bg-white p-5 shadow-sm">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-bold text-neutral-900">Growth and usage</h3>
            ${chip("30 days", "bg-primary-50 text-primary-700")}
          </div>
          <div class="mt-4 h-56 rounded-[24px] bg-gradient-to-b from-primary-50 to-white p-4">
            <svg viewBox="0 0 100 40" preserveAspectRatio="none" class="h-full w-full" aria-label="Growth trend chart">
              <polyline fill="none" stroke="currentColor" class="text-primary-600" stroke-width="2.5" points="0,30 12,29 24,26 36,20 48,22 60,16 72,14 84,9 100,11"></polyline>
              <polyline fill="none" stroke="currentColor" class="text-accent-600" stroke-width="2.5" opacity="0.78" points="0,34 12,33 24,31 36,28 48,25 60,22 72,20 84,17 100,14"></polyline>
            </svg>
          </div>
        </div>
        <div class="rounded-[28px] border border-neutral-200 bg-white p-5 shadow-sm">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-bold text-neutral-900">Insights</h3>
            ${screen.aiVisible ? chip("LegalGPT India", "bg-info/10 text-info") : ""}
          </div>
          <div class="mt-4 space-y-3">
            ${[
              ["Tenant adoption spike", "Student research up 18% after prompt pack release."],
              ["Alert health", "No court ingestion incidents in the last 6 hours."],
              ["Recommendation", "Expand citizen booking redesign to 20% more beta users."],
            ]
              .map(
                ([title, body]) => `
                <div class="rounded-[22px] bg-neutral-50 p-4">
                  <p class="text-sm font-semibold text-neutral-900">${title}</p>
                  <p class="mt-1 text-sm text-neutral-500">${body}</p>
                </div>`,
              )
              .join("")}
          </div>
        </div>
      </div>
    `,
    "A-03": `
      <div class="rounded-[28px] border border-neutral-200 bg-white p-5 shadow-sm">
        <div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div class="flex flex-wrap gap-2">
            ${["Name", "Role", "Plan", "Status", "Deletion workflow"].map((x, i) => chip(x, i === 1 ? "bg-primary-50 text-primary-700" : "bg-neutral-100 text-neutral-600")).join("")}
          </div>
          <div class="flex gap-2">
            <button class="focus-ring min-h-[44px] rounded-2xl border border-neutral-200 px-4 text-sm font-medium text-neutral-700">Bulk assign</button>
            <button class="focus-ring min-h-[44px] rounded-2xl bg-primary-600 px-4 text-sm font-semibold text-white">Export CSV</button>
          </div>
        </div>
        <div class="mt-5 grid gap-3">
          ${[
            ["Priya Shah", "Student", "Pro", "Active"],
            ["Adv. Naina Khanna", "Lawyer", "Solo Pro", "Active"],
            ["Khanna Legal LLP", "Firm", "Enterprise", "Review"],
            ["JusticePrep", "Tutor", "Institute", "Active"],
          ]
            .map(
              ([name, role, plan, status]) => `
                <div class="grid min-h-[68px] grid-cols-[1.4fr,1fr,1fr,0.8fr] items-center gap-3 rounded-[22px] border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm">
                  <strong class="text-neutral-900">${name}</strong>
                  <span class="text-neutral-600">${role}</span>
                  <span class="text-neutral-600">${plan}</span>
                  ${chip(status, status === "Review" ? "bg-warning/10 text-warning" : "bg-success/10 text-success")}
                </div>`,
            )
            .join("")}
        </div>
      </div>
    `,
    "A-04": `
      <div class="grid gap-4 xl:grid-cols-[1.2fr,1fr]">
        <div class="rounded-[28px] border border-neutral-200 bg-white p-5 shadow-sm">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-bold text-neutral-900">Matter assignment board</h3>
            ${chip("24 active matters", "bg-primary-50 text-primary-700")}
          </div>
          <div class="mt-4 grid gap-3 md:grid-cols-3">
            ${[
              ["Unassigned", ["New arbitration brief", "Consumer complaint intake"]],
              ["In Progress", ["Khanna v. State", "Rao Arbitration", "M&A due diligence"]],
              ["Partner Review", ["Memorial draft v7", "Tax appeal note"]],
            ]
              .map(
                ([lane, items]) => `
                  <div class="rounded-[24px] bg-neutral-50 p-4">
                    <p class="text-sm font-semibold text-neutral-900">${lane}</p>
                    <div class="mt-3 space-y-2">
                      ${items
                        .map(
                          (item) => `
                            <div class="rounded-2xl border border-neutral-200 bg-white px-3 py-3 text-sm text-neutral-700">${item}</div>`,
                        )
                        .join("")}
                    </div>
                  </div>`,
              )
              .join("")}
          </div>
        </div>
        <div class="rounded-[28px] border border-neutral-200 bg-white p-5 shadow-sm">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-bold text-neutral-900">Workload heatmap</h3>
            ${chip("78% utilized", "bg-accent-50 text-accent-700")}
          </div>
          <div class="mt-4 grid gap-2">
            ${[
              ["Adv. Naina Khanna", "High"],
              ["Adv. Dev Anand", "Medium"],
              ["Adv. Shreya Das", "Medium"],
              ["Intern team", "Low"],
            ]
              .map(
                ([name, load]) => `
                  <div class="flex items-center justify-between rounded-2xl bg-neutral-50 px-4 py-3 text-sm">
                    <span class="text-neutral-700">${name}</span>
                    ${chip(load, load === "High" ? "bg-danger/10 text-danger" : load === "Medium" ? "bg-warning/10 text-warning" : "bg-success/10 text-success")}
                  </div>`,
              )
              .join("")}
          </div>
        </div>
      </div>
    `,
    "A-05": `
      <div class="grid gap-4 xl:grid-cols-[1.3fr,0.7fr]">
        <div class="rounded-[28px] border border-neutral-200 bg-white p-5 shadow-sm">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-bold text-neutral-900">Collaborative drafting studio</h3>
            ${chip("Draft → Review → Approve", "bg-primary-50 text-primary-700")}
          </div>
          <div class="mt-4 rounded-[24px] border border-neutral-200 bg-neutral-50 p-4">
            <div class="mb-4 flex items-center justify-between">
              <div class="flex gap-2">
                ${["Memorial", "Comments", "Diff", "Share"].map((x, i) => chip(x, i === 0 ? "bg-white text-neutral-900 shadow-sm" : "bg-neutral-100 text-neutral-600")).join("")}
              </div>
              ${chip("2 co-authors live", "bg-success/10 text-success")}
            </div>
            <div class="grid gap-3">
              <div class="rounded-2xl bg-white p-4 text-sm leading-6 text-neutral-700">The petitioner respectfully submits that the impugned administrative action is arbitrary, disproportionate, and procedurally infirm...</div>
              <div class="rounded-2xl border border-primary-100 bg-primary-50 p-4 text-sm text-neutral-800">LegalGPT India suggested two precedent inserts and one caution on maintainability.</div>
            </div>
          </div>
        </div>
        <div class="rounded-[28px] border border-neutral-200 bg-white p-5 shadow-sm">
          <h3 class="text-lg font-bold text-neutral-900">Review rail</h3>
          <div class="mt-4 space-y-3">
            ${[
              ["Partner comment", "Need stronger citation on procedural fairness."],
              ["Version diff", "Draft 6 → Draft 7 adds 2 authorities."],
              ["Approval action", "Send to client once comment 4 is resolved."],
            ]
              .map(
                ([title, body]) => `
                  <div class="rounded-[22px] bg-neutral-50 p-4">
                    <p class="text-sm font-semibold text-neutral-900">${title}</p>
                    <p class="mt-1 text-sm text-neutral-500">${body}</p>
                  </div>`,
              )
              .join("")}
          </div>
        </div>
      </div>
    `,
    "A-06": `
      <div class="grid gap-4 xl:grid-cols-[1.1fr,0.9fr]">
        <div class="rounded-[28px] border border-neutral-200 bg-white p-5 shadow-sm">
          <h3 class="text-lg font-bold text-neutral-900">Revenue trend</h3>
          <div class="mt-4 h-64 rounded-[24px] bg-gradient-to-b from-primary-50 to-white p-4">
            <svg viewBox="0 0 100 40" preserveAspectRatio="none" class="h-full w-full" aria-label="Revenue trend">
              <polyline fill="none" stroke="currentColor" class="text-primary-600" stroke-width="2.5" points="0,34 12,31 24,28 36,22 48,23 60,18 72,15 84,11 100,8"></polyline>
              <polyline fill="none" stroke="currentColor" class="text-accent-600" stroke-width="2.5" opacity="0.7" points="0,36 12,34 24,31 36,29 48,26 60,23 72,21 84,18 100,16"></polyline>
            </svg>
          </div>
        </div>
        <div class="rounded-[28px] border border-neutral-200 bg-white p-5 shadow-sm">
          <h3 class="text-lg font-bold text-neutral-900">Breakdown</h3>
          <div class="mt-4 space-y-3">
            ${[
              ["Subscriptions", "₹6.2L"],
              ["Consultation commission", "₹1.4L"],
              ["Marketplace commission", "₹82K"],
              ["Premium listings", "₹34K"],
            ]
              .map(
                ([label, value]) => `
                <div class="flex items-center justify-between rounded-2xl bg-neutral-50 px-4 py-3 text-sm">
                  <span class="text-neutral-600">${label}</span>
                  <strong class="text-neutral-900">${value}</strong>
                </div>`,
              )
              .join("")}
          </div>
        </div>
      </div>
    `,
    "A-07": `
      <div class="grid gap-4 xl:grid-cols-[1fr,1fr]">
        <div class="rounded-[28px] border border-neutral-200 bg-white p-5 shadow-sm">
          <h3 class="text-lg font-bold text-neutral-900">Citation accuracy and confidence</h3>
          <div class="mt-4 grid grid-cols-3 gap-3">
            ${[
              ["Accuracy", "91.3%"],
              ["Median confidence", "0.88"],
              ["Review flags", "11"],
            ]
              .map(
                ([label, value]) => `
                  <div class="rounded-[22px] bg-neutral-50 p-4">
                    <p class="text-xs uppercase tracking-[0.2em] text-neutral-500">${label}</p>
                    <p class="mt-2 text-xl font-bold text-neutral-900">${value}</p>
                  </div>`,
              )
              .join("")}
          </div>
        </div>
        <div class="rounded-[28px] border border-neutral-200 bg-white p-5 shadow-sm">
          <h3 class="text-lg font-bold text-neutral-900">Review queue</h3>
          <div class="mt-4 space-y-3">
            ${[
              ["Low-confidence memorial draft", "Student flow · 0.62 confidence"],
              ["Multilingual query mismatch", "Citizen rights explainer · needs review"],
              ["Citation verification delay", "Case summary card still pending cross-check"],
            ]
              .map(
                ([title, body]) => `
                  <div class="rounded-[22px] bg-neutral-50 p-4">
                    <p class="text-sm font-semibold text-neutral-900">${title}</p>
                    <p class="mt-1 text-sm text-neutral-500">${body}</p>
                  </div>`,
              )
              .join("")}
          </div>
        </div>
      </div>
    `,
    "A-08": `
      <div class="grid gap-4 xl:grid-cols-[1.1fr,0.9fr]">
        <div class="rounded-[28px] border border-neutral-200 bg-white p-5 shadow-sm">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-bold text-neutral-900">Immutable audit stream</h3>
            ${chip("7-year retention", "bg-primary-50 text-primary-700")}
          </div>
          <div class="mt-4 space-y-3">
            ${[
              ["09:18", "Deletion request identity verified", "Pass"],
              ["09:26", "Billing records exempted from deletion", "Hold"],
              ["09:31", "Consent version updated", "Review"],
              ["09:42", "Data export package queued", "Ready"],
            ]
              .map(
                ([time, event, state]) => `
                <div class="grid grid-cols-[80px,1fr,auto] items-center gap-3 rounded-[22px] border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm">
                  <span class="font-mono text-neutral-500">${time}</span>
                  <span class="text-neutral-700">${event}</span>
                  ${chip(state, state === "Pass" ? "bg-success/10 text-success" : state === "Hold" ? "bg-warning/10 text-warning" : "bg-primary-50 text-primary-700")}
                </div>`,
              )
              .join("")}
          </div>
        </div>
        <div class="rounded-[28px] border border-neutral-200 bg-white p-5 shadow-sm">
          <h3 class="text-lg font-bold text-neutral-900">Rights requests</h3>
          <div class="mt-4 space-y-3">
            ${[
              ["View request", "2 open"],
              ["Export request", "1 in progress"],
              ["Delete request", "1 awaiting legal hold check"],
            ]
              .map(
                ([title, body]) => `
                <div class="rounded-[22px] bg-neutral-50 p-4">
                  <p class="text-sm font-semibold text-neutral-900">${title}</p>
                  <p class="mt-1 text-sm text-neutral-500">${body}</p>
                </div>`,
              )
              .join("")}
          </div>
        </div>
      </div>
    `,
    "A-09": `
      <div class="grid gap-4 xl:grid-cols-[1fr,1fr]">
        <div class="rounded-[28px] border border-neutral-200 bg-white p-5 shadow-sm">
          <h3 class="text-lg font-bold text-neutral-900">Pipeline health</h3>
          <div class="mt-4 grid grid-cols-2 gap-3">
            ${[
              ["eCourts API", "Operational"],
              ["Parser success", "97.1%"],
              ["Fallbacks", "0 active"],
              ["Freshness", "1m 12s"],
            ]
              .map(
                ([label, value]) => `
                  <div class="rounded-[22px] bg-neutral-50 p-4">
                    <p class="text-xs uppercase tracking-[0.2em] text-neutral-500">${label}</p>
                    <p class="mt-2 text-xl font-bold text-neutral-900">${value}</p>
                  </div>`,
              )
              .join("")}
          </div>
        </div>
        <div class="rounded-[28px] border border-neutral-200 bg-white p-5 shadow-sm">
          <h3 class="text-lg font-bold text-neutral-900">Queue state</h3>
          <div class="mt-4 space-y-3">
            ${[
              ["court.events.raw", "83 waiting"],
              ["court.events.parsed", "12 waiting"],
              ["alerts.dispatch", "4 waiting"],
            ]
              .map(
                ([topic, count]) => `
                <div class="flex items-center justify-between rounded-2xl bg-neutral-50 px-4 py-3 text-sm">
                  <span class="font-mono text-neutral-600">${topic}</span>
                  <strong class="text-neutral-900">${count}</strong>
                </div>`,
              )
              .join("")}
          </div>
        </div>
      </div>
    `,
    "A-10": `
      <div class="grid gap-4 xl:grid-cols-[1fr,1fr]">
        <div class="rounded-[28px] border border-neutral-200 bg-white p-5 shadow-sm">
          <h3 class="text-lg font-bold text-neutral-900">Flagged review queue</h3>
          <div class="mt-4 space-y-3">
            ${[
              ["Citizen review mentions guaranteed result", "BCI risk"],
              ["Profile update contains unverifiable claim", "Manual review"],
              ["Course listing missing disclaimer", "Fix required"],
            ]
              .map(
                ([title, meta]) => `
                <div class="rounded-[22px] border border-neutral-200 bg-neutral-50 p-4">
                  <p class="text-sm font-semibold text-neutral-900">${title}</p>
                  <p class="mt-1 text-sm text-neutral-500">${meta}</p>
                </div>`,
              )
              .join("")}
          </div>
        </div>
        <div class="rounded-[28px] border border-neutral-200 bg-white p-5 shadow-sm">
          <h3 class="text-lg font-bold text-neutral-900">Moderation actions</h3>
          <div class="mt-4 flex flex-wrap gap-2">
            ${["Approve", "Reject", "Request edits", "Escalate legal", "Export evidence"].map((x) => `<button class="focus-ring min-h-[44px] rounded-2xl border border-neutral-200 px-4 text-sm font-medium text-neutral-700 hover:bg-neutral-50">${x}</button>`).join("")}
          </div>
        </div>
      </div>
    `,
    "A-11": `
      <div class="grid gap-4 xl:grid-cols-[1fr,1fr]">
        <div class="rounded-[28px] border border-neutral-200 bg-white p-5 shadow-sm">
          <h3 class="text-lg font-bold text-neutral-900">Marketplace queue</h3>
          <div class="mt-4 space-y-3">
            ${[
              ["Course approvals", "16 waiting"],
              ["Internship moderation", "9 waiting"],
              ["Featured placement slots", "5 available"],
            ]
              .map(
                ([title, body]) => `
                  <div class="rounded-[22px] bg-neutral-50 p-4">
                    <p class="text-sm font-semibold text-neutral-900">${title}</p>
                    <p class="mt-1 text-sm text-neutral-500">${body}</p>
                  </div>`,
              )
              .join("")}
          </div>
        </div>
        <div class="rounded-[28px] border border-neutral-200 bg-white p-5 shadow-sm">
          <h3 class="text-lg font-bold text-neutral-900">Revenue split</h3>
          <div class="mt-4 h-48 rounded-[24px] bg-gradient-to-b from-accent-50 to-white p-4">
            <div class="grid h-full grid-cols-[7fr,3fr] gap-3">
              <div class="flex items-end">
                <div class="w-full rounded-t-[24px] bg-accent-600 px-4 py-4 text-white">Tutor 70%</div>
              </div>
              <div class="flex items-end">
                <div class="w-full rounded-t-[24px] bg-primary-600 px-4 py-4 text-white">Platform 30%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `,
    "A-12": `
      <div class="grid gap-4 xl:grid-cols-[1fr,1fr,0.85fr]">
        <div class="rounded-[28px] border border-neutral-200 bg-white p-5 shadow-sm">
          <h3 class="text-lg font-bold text-neutral-900">Ticket queue</h3>
          <div class="mt-4 space-y-3">
            ${[
              ["P0 Billing mismatch", "Lawyer", "3h to breach"],
              ["P1 Court alert lag", "Firm", "9h to breach"],
              ["P2 Student access issue", "Student", "42h to breach"],
            ]
              .map(
                ([title, persona, sla]) => `
                <div class="rounded-[22px] border border-neutral-200 bg-neutral-50 p-4">
                  <div class="flex items-center justify-between gap-3">
                    <div>
                      <p class="text-sm font-semibold text-neutral-900">${title}</p>
                      <p class="mt-1 text-sm text-neutral-500">${persona}</p>
                    </div>
                    ${chip(sla, title.startsWith("P0") ? "bg-danger/10 text-danger" : title.startsWith("P1") ? "bg-warning/10 text-warning" : "bg-primary-50 text-primary-700")}
                  </div>
                </div>`,
              )
              .join("")}
          </div>
        </div>
        <div class="rounded-[28px] border border-neutral-200 bg-white p-5 shadow-sm">
          <h3 class="text-lg font-bold text-neutral-900">Knowledge suggestions</h3>
          <div class="mt-4 space-y-3">
            ${[
              ["Suggested article", "Court alert troubleshooting playbook"],
              ["Suggested template", "Refund and reconciliation reply"],
              ["LegalGPT India assist", "Draft a calm customer response with exact status context"],
            ]
              .map(
                ([title, body]) => `
                  <div class="rounded-[22px] bg-neutral-50 p-4">
                    <p class="text-sm font-semibold text-neutral-900">${title}</p>
                    <p class="mt-1 text-sm text-neutral-500">${body}</p>
                  </div>`,
              )
              .join("")}
          </div>
        </div>
        <div class="rounded-[28px] border border-neutral-200 bg-white p-5 shadow-sm">
          <h3 class="text-lg font-bold text-neutral-900">SLA board</h3>
          <div class="mt-4 space-y-3">
            ${[
              ["P0", "4h"],
              ["P1", "24h"],
              ["P2", "72h"],
            ]
              .map(
                ([level, time]) => `
                  <div class="flex items-center justify-between rounded-2xl bg-neutral-50 px-4 py-3 text-sm">
                    <span class="font-semibold text-neutral-900">${level}</span>
                    <span class="text-neutral-500">${time}</span>
                  </div>`,
              )
              .join("")}
          </div>
        </div>
      </div>
    `,
    "A-13": `
      <div class="grid gap-4 xl:grid-cols-[1fr,1fr]">
        <div class="rounded-[28px] border border-neutral-200 bg-white p-5 shadow-sm">
          <h3 class="text-lg font-bold text-neutral-900">Rollout controls</h3>
          <div class="mt-4 space-y-3">
            ${[
              ["Citizen booking redesign", "50/50", "Active"],
              ["Hindi prompt pack", "Students only", "Beta"],
              ["Court alerts refresh", "10%", "Observe"],
            ]
              .map(
                ([title, target, state]) => `
                  <div class="rounded-[22px] border border-neutral-200 bg-neutral-50 p-4">
                    <div class="flex items-center justify-between gap-3">
                      <div>
                        <p class="text-sm font-semibold text-neutral-900">${title}</p>
                        <p class="mt-1 text-sm text-neutral-500">${target}</p>
                      </div>
                      ${chip(state, state === "Active" ? "bg-success/10 text-success" : state === "Beta" ? "bg-primary-50 text-primary-700" : "bg-warning/10 text-warning")}
                    </div>
                  </div>`,
              )
              .join("")}
          </div>
        </div>
        <div class="rounded-[28px] border border-neutral-200 bg-white p-5 shadow-sm">
          <h3 class="text-lg font-bold text-neutral-900">Experiment analytics</h3>
          <div class="mt-4 h-56 rounded-[24px] bg-gradient-to-b from-primary-50 to-white p-4">
            <svg viewBox="0 0 100 40" preserveAspectRatio="none" class="h-full w-full" aria-label="Experiment analytics chart">
              <polyline fill="none" stroke="currentColor" class="text-primary-600" stroke-width="2.5" points="0,32 18,28 36,24 54,20 72,16 100,12"></polyline>
              <polyline fill="none" stroke="currentColor" class="text-accent-600" stroke-width="2.5" opacity="0.75" points="0,34 18,31 36,29 54,25 72,22 100,20"></polyline>
            </svg>
          </div>
        </div>
      </div>
    `,
    "A-14": `
      <div class="grid gap-4 xl:grid-cols-[1fr,1fr]">
        <div class="rounded-[28px] border border-neutral-200 bg-white p-5 shadow-sm">
          <h3 class="text-lg font-bold text-neutral-900">Runtime and security</h3>
          <div class="mt-4 space-y-3">
            ${[
              ["Node.js", "20 LTS"],
              ["Python", "FastAPI stack locked"],
              ["API key rotation", "Next in 6h"],
              ["TLS certificates", "Healthy"],
            ]
              .map(
                ([label, value]) => `
                  <div class="flex items-center justify-between rounded-2xl bg-neutral-50 px-4 py-3 text-sm">
                    <span class="text-neutral-600">${label}</span>
                    <strong class="text-neutral-900">${value}</strong>
                  </div>`,
              )
              .join("")}
          </div>
        </div>
        <div class="rounded-[28px] border border-neutral-200 bg-white p-5 shadow-sm">
          <h3 class="text-lg font-bold text-neutral-900">Backups and recovery</h3>
          <div class="mt-4 space-y-3">
            ${[
              ["Backup cadence", "Every 6 hours"],
              ["Last snapshot", "08:00 IST"],
              ["Disaster recovery", "Warm standby armed"],
              ["Rate limiting", "Healthy"],
            ]
              .map(
                ([label, value]) => `
                  <div class="rounded-[22px] bg-neutral-50 p-4">
                    <p class="text-sm font-semibold text-neutral-900">${label}</p>
                    <p class="mt-1 text-sm text-neutral-500">${value}</p>
                  </div>`,
              )
              .join("")}
          </div>
        </div>
      </div>
    `,
  };

  const variationOverrides = {
    "legal-pro": {
      "A-02": `
        <div class="grid gap-4 xl:grid-cols-12">
          <div class="rounded-[28px] border border-neutral-200 bg-white p-5 shadow-sm xl:col-span-7">
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-bold text-neutral-900">KPI board</h3>
              ${chip("Growth mode", "bg-primary-50 text-primary-700")}
            </div>
            <div class="mt-4 grid grid-cols-2 gap-3">
              ${[
                ["MAU", "122k"],
                ["MRR", "₹14.8L"],
                ["Alert latency", "82s"],
                ["AI accuracy", "90.6%"],
              ]
                .map(
                  ([label, value]) => `
                  <div class="rounded-[22px] bg-neutral-50 p-4">
                    <p class="text-xs uppercase tracking-[0.2em] text-neutral-500">${label}</p>
                    <p class="mt-2 text-2xl font-black text-neutral-900">${value}</p>
                  </div>`,
                )
                .join("")}
            </div>
          </div>
          <div class="rounded-[28px] border border-neutral-200 bg-white p-5 shadow-sm xl:col-span-5">
            <h3 class="text-lg font-bold text-neutral-900">Adoption heat</h3>
            <div class="mt-4 grid grid-cols-4 gap-2">
              ${Array.from({ length: 16 }, (_, idx) => {
                const tones = ["bg-primary-100", "bg-primary-200", "bg-primary-300", "bg-accent-300"];
                return `<div class="aspect-square rounded-2xl ${tones[idx % tones.length]}"></div>`;
              }).join("")}
            </div>
          </div>
          <div class="rounded-[28px] border border-neutral-200 bg-white p-5 shadow-sm xl:col-span-8">
            <h3 class="text-lg font-bold text-neutral-900">Revenue and usage trends</h3>
            <div class="mt-4 h-60 rounded-[24px] bg-gradient-to-b from-primary-50 to-white p-4">
              <svg viewBox="0 0 100 40" preserveAspectRatio="none" class="h-full w-full" aria-label="Revenue and usage trend">
                <polyline fill="none" stroke="currentColor" class="text-primary-600" stroke-width="2.5" points="0,34 16,30 32,28 48,21 64,18 80,14 100,10"></polyline>
                <polyline fill="none" stroke="currentColor" class="text-accent-600" stroke-width="2.5" opacity="0.8" points="0,35 16,33 32,30 48,27 64,22 80,20 100,16"></polyline>
              </svg>
            </div>
          </div>
          <div class="rounded-[28px] border border-neutral-200 bg-white p-5 shadow-sm xl:col-span-4">
            <h3 class="text-lg font-bold text-neutral-900">Insight queue</h3>
            <div class="mt-4 space-y-3">
              ${[
                ["Students up 18%", "Prompt pack release driving returns"],
                ["Citizen funnel drop", "Booking slot UI needs review"],
                ["Firm upgrade signal", "3 tenants nearing team-plan limit"],
              ]
                .map(
                  ([title, body]) => `
                  <div class="rounded-[22px] bg-neutral-50 p-4">
                    <p class="text-sm font-semibold text-neutral-900">${title}</p>
                    <p class="mt-1 text-sm text-neutral-500">${body}</p>
                  </div>`,
                )
                .join("")}
            </div>
          </div>
        </div>
      `,
      "A-05": `
        <div class="grid gap-4 xl:grid-cols-[1.35fr,0.75fr]">
          <div class="rounded-[28px] border border-neutral-200 bg-white p-5 shadow-sm">
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-bold text-neutral-900">Drafting board</h3>
              ${chip("Resizable panes", "bg-primary-50 text-primary-700")}
            </div>
            <div class="mt-4 grid gap-4 xl:grid-cols-[1.25fr,0.75fr]">
              <div class="rounded-[24px] border border-neutral-200 bg-neutral-50 p-4">
                <p class="text-xs uppercase tracking-[0.2em] text-neutral-500">Editor surface</p>
                <div class="mt-3 space-y-3">
                  <div class="rounded-2xl bg-white p-4 text-sm leading-6 text-neutral-700">The petitioner respectfully submits...</div>
                  <div class="rounded-2xl bg-white p-4 text-sm leading-6 text-neutral-700">The respondent's procedural objection must fail because...</div>
                </div>
              </div>
              <div class="rounded-[24px] border border-dashed border-neutral-300 bg-white p-4 text-center text-sm text-neutral-500">Drag to resize panel</div>
            </div>
          </div>
          <div class="rounded-[28px] border border-neutral-200 bg-white p-5 shadow-sm">
            <h3 class="text-lg font-bold text-neutral-900">Review systems</h3>
            <div class="mt-4 space-y-3">
              ${[
                ["Comment queue", "4 unresolved"],
                ["Version diff", "Draft 6 → 7"],
                ["Approval state", "Partner review"],
              ]
                .map(
                  ([title, body]) => `
                    <div class="rounded-[22px] bg-neutral-50 p-4">
                      <p class="text-sm font-semibold text-neutral-900">${title}</p>
                      <p class="mt-1 text-sm text-neutral-500">${body}</p>
                    </div>`,
                )
                .join("")}
            </div>
          </div>
        </div>
      `,
    },
    "ai-native": {
      "A-02": `
        <div class="grid gap-4 xl:grid-cols-[0.9fr,1.25fr,0.85fr]">
          <div class="rounded-[28px] border border-neutral-200 bg-white p-5 shadow-sm">
            <h3 class="text-lg font-bold text-neutral-900">Queue summary</h3>
            <div class="mt-4 space-y-3">
              ${[
                ["Rights requests", "4"],
                ["AI review flags", "8"],
                ["Support escalations", "3"],
              ]
                .map(
                  ([label, value]) => `
                    <div class="flex items-center justify-between rounded-2xl bg-neutral-50 px-4 py-3 text-sm">
                      <span class="text-neutral-600">${label}</span>
                      <strong class="text-neutral-900">${value}</strong>
                    </div>`,
                )
                .join("")}
            </div>
          </div>
          <div class="rounded-[28px] border border-neutral-200 bg-white p-5 shadow-sm">
            <h3 class="text-lg font-bold text-neutral-900">Today's operating priorities</h3>
            <div class="mt-4 space-y-3">
              ${[
                ["Now", "Resolve deletion request with legal hold check"],
                ["Next", "Review LegalGPT India confidence flags in education flows"],
                ["Later", "Expand citizen booking experiment to beta cohort B"],
              ]
                .map(
                  ([step, body]) => `
                    <div class="rounded-[22px] ${step === "Now" ? "bg-primary-50" : step === "Next" ? "bg-accent-50" : "bg-neutral-50"} p-4">
                      <p class="text-xs uppercase tracking-[0.2em] text-neutral-500">${step}</p>
                      <p class="mt-2 text-sm font-semibold text-neutral-900">${body}</p>
                    </div>`,
                )
                .join("")}
            </div>
          </div>
          <div class="rounded-[28px] border border-neutral-200 bg-white p-5 shadow-sm">
            <h3 class="text-lg font-bold text-neutral-900">Assistant insights</h3>
            <div class="mt-4 space-y-3">
              ${[
                ["Recommendation", "Route low-confidence memorial drafts to tutor review by default."],
                ["Risk note", "Parser confidence dipped for one district court feed."],
                ["Opportunity", "Student return rate likely to rise with guided challenge cards."],
              ]
                .map(
                  ([title, body]) => `
                    <div class="rounded-[22px] bg-neutral-50 p-4">
                      <p class="text-sm font-semibold text-neutral-900">${title}</p>
                      <p class="mt-1 text-sm text-neutral-500">${body}</p>
                    </div>`,
                )
                .join("")}
            </div>
          </div>
        </div>
      `,
      "A-05": `
        <div class="grid gap-4 xl:grid-cols-[1.1fr,0.9fr]">
          <div class="rounded-[28px] border border-neutral-200 bg-white p-5 shadow-sm">
            <h3 class="text-lg font-bold text-neutral-900">Guided drafting flow</h3>
            <div class="mt-4 space-y-3">
              ${[
                ["Step 1", "Review partner comments and unresolved risk notes."],
                ["Step 2", "Pull citation bundle from LegalGPT India with confidence threshold."],
                ["Step 3", "Approve or return draft with exact markup."],
              ]
                .map(
                  ([step, body]) => `
                  <div class="rounded-[22px] ${step === "Step 1" ? "bg-primary-50" : step === "Step 2" ? "bg-accent-50" : "bg-neutral-50"} p-4">
                    <p class="text-xs uppercase tracking-[0.2em] text-neutral-500">${step}</p>
                    <p class="mt-2 text-sm font-semibold text-neutral-900">${body}</p>
                  </div>`,
                )
                .join("")}
            </div>
          </div>
          <div class="rounded-[28px] border border-neutral-200 bg-white p-5 shadow-sm">
            <h3 class="text-lg font-bold text-neutral-900">Assistant rail</h3>
            <div class="mt-4 space-y-3">
              ${[
                ["Strongest authority", "(2023) 4 SCC 112 · confidence 0.91"],
                ["Simple explanation", "Procedural fairness argument is strongest if framed around urgency."],
                ["Next action", "Pin precedent to matter note before approval."],
              ]
                .map(
                  ([title, body]) => `
                    <div class="rounded-[22px] bg-neutral-50 p-4">
                      <p class="text-sm font-semibold text-neutral-900">${title}</p>
                      <p class="mt-1 text-sm text-neutral-500">${body}</p>
                    </div>`,
                )
                .join("")}
            </div>
          </div>
        </div>
      `,
    },
  };

  return variationOverrides[variation.slug]?.[screen.id] || common[screen.id];
}

function renderMobileSection(screen, variation) {
  const active =
    screen.id === "S-04"
      ? variation.slug === "legal-pro"
        ? "Dashboard"
        : variation.slug === "ai-native"
          ? "Today"
          : "Home"
      : screen.id === "S-07"
        ? variation.slug === "legal-pro"
          ? "Research"
          : variation.slug === "ai-native"
            ? "Assistant"
            : "AI"
        : screen.id === "S-13"
          ? variation.slug === "legal-pro"
            ? "Calendar"
            : variation.slug === "ai-native"
              ? "Inbox"
              : "Alerts"
          : screen.id === "S-18"
            ? "Profile"
            : variation.slug === "legal-pro"
              ? "Dashboard"
              : variation.slug === "ai-native"
                ? "Workspace"
                : "Cases";

  return `
    <section id="${screen.id.toLowerCase()}" class="rounded-[36px] border border-neutral-200/80 bg-white/85 ${variation.surfaces.cardGlow} backdrop-blur">
      <div class="grid gap-6 p-6 xl:grid-cols-[430px,1fr] xl:items-start">
        <div class="mx-auto w-full max-w-[390px]">
          <div class="device-frame rounded-[38px] border-[12px] border-neutral-900 bg-neutral-900 p-2">
            <div class="relative overflow-hidden rounded-[30px] bg-gradient-to-b from-white to-neutral-50 p-4">
              <div class="mx-auto mb-4 h-7 w-32 rounded-full bg-neutral-900"></div>
              <div class="mb-4 flex items-center justify-between text-xs font-semibold text-neutral-500">
                <span>9:41</span>
                <span>5G • 82%</span>
              </div>
              ${mobileCore(screen, variation)}
              ${mobileNav(variation, active)}
            </div>
          </div>
        </div>
        <div class="space-y-5">
          ${screenMeta(screen, variation, "mobile")}
          <div class="rounded-3xl border border-neutral-200 bg-neutral-50/80 p-5">
            <div class="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 class="text-lg font-bold text-neutral-900">Screen states</h3>
                <p class="mt-1 text-sm text-neutral-500">Loading, empty, error, and offline surfaces for ${screen.id}.</p>
              </div>
              ${screen.aiVisible ? chip("LegalGPT India touchpoint", "bg-info/10 text-info") : chip("Operational state coverage", "bg-primary-50 text-primary-700")}
            </div>
            <div class="mt-4">${stateGrid(screen)}</div>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderDesktopSection(screen, variation) {
  const active =
    screen.id === "A-01"
      ? variation.slug === "ai-native"
        ? "Settings"
        : "Overview"
      : screen.id === "A-02"
        ? variation.slug === "legal-pro"
          ? "Platform"
          : variation.slug === "ai-native"
            ? "Workspace"
            : "Overview"
        : screen.id === "A-05"
          ? variation.slug === "legal-pro"
            ? "Platform"
            : variation.slug === "ai-native"
              ? "Approvals"
              : "Firm"
          : screen.id === "A-08"
            ? variation.slug === "ai-native"
              ? "Audit"
              : "Compliance"
            : screen.id === "A-12"
              ? variation.slug === "ai-native"
                ? "Support"
                : "Support"
              : screen.id === "A-13"
                ? variation.slug === "legal-pro"
                  ? "Ops"
                  : "Settings"
                : "Overview";

  return `
    <section id="${screen.id.toLowerCase()}" class="rounded-[36px] border border-neutral-200/80 bg-white/85 ${variation.surfaces.cardGlow} backdrop-blur">
      <div class="space-y-5 p-6">
        ${screenMeta(screen, variation, "desktop")}
        <div class="grid gap-5 xl:grid-cols-[1.7fr,0.8fr]">
          <div class="overflow-hidden rounded-[34px] border border-neutral-200 bg-white shadow-panel">
            <div class="flex items-center justify-between border-b border-neutral-200 bg-neutral-50/90 px-5 py-4">
              <div class="flex items-center gap-2">
                ${iconDot("bg-red-400")}${iconDot("bg-amber-400")}${iconDot("bg-emerald-400")}
              </div>
              <div class="flex flex-wrap gap-2">
                ${chip(screen.id, "bg-primary-50 text-primary-700")}
                ${chip(screen.role, "bg-accent-50 text-accent-700")}
              </div>
            </div>
            <div class="screen-grid relative overflow-hidden">
              <div class="grid gap-0 lg:grid-cols-[240px,1fr]">
                ${desktopRail(variation, active)}
                <div class="bg-gradient-to-b ${variation.surfaces.pageBg} p-6">${desktopCore(screen, variation)}</div>
              </div>
            </div>
          </div>
          <div class="space-y-5">
            <div class="rounded-3xl border border-neutral-200 bg-neutral-50/80 p-5">
              <h3 class="text-lg font-bold text-neutral-900">Interaction and state panel</h3>
              <p class="mt-1 text-sm text-neutral-500">Hover, focus, loading, empty, error, and offline references for ${screen.id}.</p>
              <div class="mt-4">${stateGrid(screen)}</div>
            </div>
            <div class="rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm">
              <h3 class="text-base font-bold text-neutral-900">Desktop behavior</h3>
              <ul class="mt-3 space-y-2 text-sm text-neutral-600">
                <li>• Left rail collapses to icons at 768px and restores labels at 1024px.</li>
                <li>• All interactive controls expose hover, focus-visible, and keyboard-entry states.</li>
                <li>• Panels are sized to favor primary work surface over decorative sidebars.</li>
                <li>• Resizable panel affordance is shown where drafting or analytics depth requires it.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderHtmlFile(variation, kind) {
  const screens = kind === "mobile" ? mobileScreens : adminScreens;
  const sections =
    kind === "mobile"
      ? screens.map((screen) => renderMobileSection(screen, variation)).join("\n")
      : screens.map((screen) => renderDesktopSection(screen, variation)).join("\n");
  const title =
    kind === "mobile"
      ? `variation-${variation.number}-${variation.slug}-mobile`
      : `variation-${variation.number}-${variation.slug}-desktop`;
  const bodyTitle = kind === "mobile" ? "Mobile · 390px" : "Desktop · 1440px";
  const lead =
    kind === "mobile"
      ? "All 18 user journey screens, each with responsive preview panels and complete state coverage."
      : "All 14 admin and firm command screens, each with responsive desktop layouts and operational state coverage.";

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Legal Sathi — ${variation.title} ${kind === "mobile" ? "Mobile" : "Desktop"}</title>
    ${tailwindConfig(variation)}
    ${commonStyleBlock()}
    ${accessibilityComment(variation)}
  </head>
  <body class="bg-gradient-to-br ${variation.surfaces.pageBg} font-sans text-neutral-900">
    <main class="mx-auto flex min-h-screen max-w-[1680px] flex-col gap-8 px-4 py-6 lg:px-6 xl:px-8">
      ${topHeader(
        { title: bodyTitle },
        variation,
        kind,
      )}
      <section class="rounded-[32px] border border-neutral-200 bg-white/80 p-5 shadow-panel backdrop-blur lg:p-6">
        <div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.24em] text-neutral-500">${bodyTitle}</p>
            <h2 class="mt-2 text-3xl font-black tracking-tight text-neutral-900">${lead}</h2>
            <p class="mt-3 max-w-4xl text-sm leading-6 text-neutral-600">${variation.commentary.motion}</p>
          </div>
          <div class="flex flex-wrap gap-2">
            ${chip("Tailwind CDN", "bg-primary-50 text-primary-700")}
            ${chip("WCAG 2.1 AA target", "bg-success/10 text-success")}
            ${chip("LegalGPT India embedded", "bg-info/10 text-info")}
            ${chip("Loading / Empty / Error / Offline", "bg-accent-50 text-accent-700")}
          </div>
        </div>
      </section>
      ${sections}
      <footer class="rounded-[30px] border border-neutral-200 bg-white/80 p-5 shadow-panel backdrop-blur">
        <div class="grid gap-4 lg:grid-cols-[1fr,0.8fr] lg:items-start">
          <div>
            <h3 class="text-lg font-bold text-neutral-900">Variation comparison quick read</h3>
            <div class="mt-4 overflow-x-auto">
              <table class="min-w-full text-left text-sm text-neutral-600">
                <thead class="border-b border-neutral-200 text-xs uppercase tracking-[0.2em] text-neutral-500">
                  <tr><th class="py-3 pr-4">Variation</th><th class="py-3 pr-4">Character</th><th class="py-3 pr-4">Best use</th></tr>
                </thead>
                <tbody>
                  <tr class="border-b border-neutral-100"><td class="py-3 pr-4 font-semibold text-neutral-900">Bharat First</td><td class="py-3 pr-4">Warm, grounded, courtroom-ready</td><td class="py-3 pr-4">Operational beta launch</td></tr>
                  <tr class="border-b border-neutral-100"><td class="py-3 pr-4 font-semibold text-neutral-900">Legal Pro</td><td class="py-3 pr-4">Premium, analytical, structured</td><td class="py-3 pr-4">Enterprise and admin workflows</td></tr>
                  <tr><td class="py-3 pr-4 font-semibold text-neutral-900">AI Native</td><td class="py-3 pr-4">Guided, supportive, assistant-led</td><td class="py-3 pr-4">Student, tutor, and guided task flows</td></tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="rounded-[26px] bg-neutral-50 p-5">
            <h3 class="text-base font-bold text-neutral-900">Preview instruction</h3>
            <ol class="mt-3 space-y-2 text-sm text-neutral-600">
              <li>1. Open this file directly in any modern browser.</li>
              <li>2. Test widths at 390px, 768px, 1024px, and 1440px.</li>
              <li>3. Tab through controls to confirm focus treatment and interaction ordering.</li>
              <li>4. Review the matching spec markdown for component hierarchy and token details.</li>
            </ol>
          </div>
        </div>
      </footer>
    </main>
  </body>
</html>`;
}

function renderTokenTable(palette) {
  const rows = (name, scale) =>
    Object.entries(scale)
      .map(([step, value]) => `| ${name} ${step} | \`${value}\` |`)
      .join("\n");
  return `${rows("Primary", palette.primary)}\n${rows("Accent", palette.accent)}\n${rows("Neutral", palette.neutral)}\n| Success | \`${palette.success}\` |\n| Warning | \`${palette.warning}\` |\n| Danger | \`${palette.danger}\` |\n| Info | \`${palette.info}\` |`;
}

function renderSpec(variation) {
  const primaryText = variation.palette.neutral[900];
  const secondaryText = variation.palette.neutral[700];
  const white = "#FFFFFF";
  const buttonBg = variation.palette.primary[600];
  const screenSections = [
    ...mobileScreens.map((screen) => ({ ...screen, viewport: "Mobile" })),
    ...adminScreens.map((screen) => ({ ...screen, viewport: "Desktop" })),
  ];

  return `# Variation ${variation.number} — ${variation.title} Design Spec

## Summary

- Visual character: ${variation.tagline}
- Mobile concept: ${variation.mobileConcept}
- Desktop concept: ${variation.desktopConcept}
- Best use: ${variation.commentary.bestFor}
- Reference blend: ${variation.commentary.inspiration}

## Design Tokens

| Token | Value |
|---|---|
| Font sans | \`Inter, ui-sans-serif, system-ui, sans-serif\` |
| Font mono | \`JetBrains Mono, ui-monospace, monospace\` |
| Radius card | \`12px / 18px / 26px\` |
| Elevation | \`shadow-panel\`, \`shadow-float\` |
| Mobile padding | \`16px\` |
| Desktop padding | \`24px\` |
| Touch target minimum | \`44dp\` |
| Desktop rail collapse | \`768px\` |

### Color Palette

| Token | Hex |
|---|---|
${renderTokenTable(variation.palette)}

## Typography Scale

| Token | Usage |
|---|---|
| \`text-5xl\` / \`text-4xl\` | dashboard hero headlines |
| \`text-3xl\` / \`text-2xl\` | section titles and critical metrics |
| \`text-base\` | body copy and card titles |
| \`text-sm\` | metadata and helper copy |
| \`text-xs\` | labels, state captions, audit details |
| \`font-mono\` | case IDs, invoice numbers, system references |

## Accessibility Specs

<!-- ACCESSIBILITY SPECS -->
<!--
Contrast Ratios:
- Primary text (${primaryText}) on white (${white}): ${contrastRatio(primaryText, white)}:1
- Secondary text (${secondaryText}) on white (${white}): ${contrastRatio(secondaryText, white)}:1
- Primary button text (${white}) on primary background (${buttonBg}): ${contrastRatio(white, buttonBg)}:1
-->

- WCAG 2.1 AA target is the baseline for all preview surfaces.
- All interactive controls use visible focus rings and \`tabindex="0"\` where needed.
- Real-time court alerts and sync updates are annotated with \`aria-live="polite"\`.
- Every desktop chart has a text fallback panel or explicit supporting metrics.
- Bottom navigation items, icon controls, and CTA buttons all meet or exceed \`44dp\`.

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
| LeftNavigationRail | desktop primary nav | collapses at \`768px\` |
| KPIBand | metrics summary | priority numbers before labels |
| TimelineCard | hearings and deadlines | always includes status badge |
| MatterCard | case or workflow summary | action-focused, not decorative |
| LegalGPTPanel | assistant and citation support | visible on at least 5 screens |
| StateCard | loading, empty, error, offline | standardized across screens |
| AnalyticsPanel | charts, counts, trends | must include textual context |
| ConsentPanel | DPDP preference and rights management | surfaced in \`S-03\` and \`S-18\` |

## Variation Comparison Matrix

${comparisonMatrix}

## Screen Hierarchies

${screenSections
  .map(
    (screen) => `### ${screen.id} ${screen.title}

- Viewport: ${screen.viewport}
- Audience: ${screen.viewport === "Mobile" ? screen.persona : screen.role}
- Purpose: ${screen.purpose}
- LegalGPT India visible: ${screen.aiVisible ? "Yes" : "No"}

Component Tree:
\`\`\`
${screen.componentTree.join("\n")}
\`\`\`

State Coverage:
- Loading: skeleton placeholders for key content regions.
- Empty: ${screen.emptyTitle} — ${screen.emptyBody}
- Error: ${screen.errorBody}
- Offline: ${screen.offlineBody}
`,
  )
  .join("\n")}
`;
}

async function main() {
  await fs.mkdir(outDir, { recursive: true });
  for (const variation of variations) {
    const mobileFile = path.join(outDir, `variation-${variation.number}-${variation.slug}-mobile.html`);
    const desktopFile = path.join(outDir, `variation-${variation.number}-${variation.slug}-desktop.html`);
    const specFile = path.join(outDir, `variation-${variation.number}-${variation.slug}-spec.md`);
    await fs.writeFile(mobileFile, renderHtmlFile(variation, "mobile"));
    await fs.writeFile(desktopFile, renderHtmlFile(variation, "desktop"));
    await fs.writeFile(specFile, renderSpec(variation));
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
