# 📁 [DELIVERABLE 5: DESIGN OPTIONS — USER JOURNEY & ADMIN DASHBOARD]

## Design System Foundations

Legal Sathi uses one shared design language across React Native mobile and React web, with persona-aware composition rather than separate design systems.

### Shared Tokens

| Token Family | Standard |
|---|---|
| Breakpoints | `390px` mobile base, `768px` tablet, `1024px` laptop, `1440px` desktop |
| Spacing | `4, 8, 12, 16, 24, 32, 40, 56` |
| Radius | `12` cards, `16` sheets, `24` modal surfaces, `999` pills |
| Elevation | `surface-1`, `surface-2`, `surface-3`, `overlay` |
| Touch targets | Minimum `44x44px` on mobile, `40x40px` on web controls |
| Typography scale | `12, 14, 16, 18, 20, 24, 32, 40` |
| Motion | `120ms`, `180ms`, `240ms`; reduce-motion fallback required |

### Shared UX Rules

- Persona selection in `S-01` and `S-03` changes dashboard order, quick actions, default widgets, and AI prompt suggestions.
- `S-07` LegalGPT India remains globally reachable from every mobile dashboard and every admin dashboard.
- `S-17` Notifications Center and `S-18` Settings & Privacy are global destinations available to all personas.
- Admin and firm dashboards strip direct PII from charts, heatmaps, and summary cards unless the current role has explicit need-to-know access.
- Offline-first coverage includes case notes, saved judgments, downloaded course materials, document draft metadata, and calendar state.

## Option 1: Courtroom Brief

This concept is optimized for lawyers, firms, and citizens who need fast, glanceable status, court movement, and next actions.

### User Journey Dashboard

#### Layout Structure

- Primary pattern: vertical flex layout with a sticky top brief header and stacked task surfaces.
- Top area: `Morning Brief` hero with date, persona context, AI quick launch, and urgent alert badge.
- Middle area: horizontally scrollable quick-action rail for `Cases`, `Search`, `Book`, `Upload`, `Calendar`.
- Lower area: stacked live modules for hearings, alerts, consultation calendar, and recent documents.
- Floating action: circular AI assistant trigger pinned above bottom navigation.

#### Component Hierarchy

1. `S-04 Home — Morning Brief`
2. `Urgent Court Alert Banner`
3. `Quick Actions Rail`
4. `Today's Hearings Timeline`
5. `Pending Tasks Card Stack`
6. `Upcoming Consultation Calendar Strip`
7. `AI Assistant Pane Preview`
8. `Recent Document Vault Activity`
9. `Bottom Navigation`

#### Navigation Pattern

- Bottom navigation: `Home`, `Cases`, `Search`, `Calendar`, `Inbox`
- Context drawer from top-right for persona switching, language, and privacy shortcuts
- Deep-link actions:
  - Court alert card → `S-13`
  - Hearing row → `S-06`
  - Calendar block → `S-12` or `S-16`
  - AI prompt chip → `S-07`

#### Screen Mapping

| Priority | Screens Anchored in this Concept | Role |
|---|---|---|
| Primary | `S-04`, `S-05`, `S-06`, `S-07`, `S-12`, `S-13`, `S-16`, `S-17` | Daily execution flow |
| Secondary | `S-14`, `S-15`, `S-18` | Finance, files, privacy |
| Entry | `S-01`, `S-02`, `S-03` | Onboarding and persona setup |

#### Color and Typography Tokens

| Token | Value |
|---|---|
| `color-bg-primary` | `#F6F1E7` |
| `color-surface` | `#FFF9F0` |
| `color-ink` | `#21303A` |
| `color-accent` | `#0F766E` |
| `color-accent-2` | `#A56A1C` |
| `color-alert` | `#B42318` |
| `color-success` | `#166534` |
| `font-ui` | `Manrope` |
| `font-reading` | `Source Serif 4` |

- Light mode uses warm paper surfaces and teal operational accents.
- Dark mode switches to `#111827` background, `#18212B` cards, muted brass dividers, and brighter alert contrast.

#### Accessibility

- Court status always uses text plus icon plus color.
- Hearing countdown cards expose screen-reader labels like `Next hearing in 30 minutes, Court 3, Item 18`.
- Timeline nodes remain reachable by keyboard in PWA mode.
- Contrast target: minimum `4.5:1` for body text and `3:1` for large type and chart legends.

#### Offline State and Skeletons

- Cached hearings and notes show `Last synced` time at the top of `S-04` and `S-13`.
- Offline actions queue:
  - case note edits
  - hearing reminder snoozes
  - calendar adjustments
  - document tags
- Skeletons:
  - timeline skeleton with pulse markers
  - alert banner skeleton
  - consultation card skeleton with avatar, slot, and CTA placeholder

#### Data Visualization

- Hearing urgency ladder with countdown bars
- `S-14` mini P&L sparkline and receivables status chips
- `S-13` live queue cards with `Not Started`, `In Queue`, `Within 5`, `Completed`
- Status badges with compact court, payment, and task states

### Admin & Firm Command Dashboard

#### Layout Structure

- Three-column CSS grid for desktop:
  - left `Portfolio and tenant snapshot`
  - center `Operational command workspace`
  - right `Compliance, AI, and support signals`
- Sticky top command bar for tenant, role, environment, and date filters.

#### Component Hierarchy

1. `A-02 Multi-Tenant Overview`
2. `A-04 Firm Workspace` or `A-03 User Management` based on role
3. `A-06 Revenue Analytics`
4. `A-07 AI Performance Monitor`
5. `A-08 Compliance Audit Log`
6. `A-12 Support Ticket Router`
7. `A-13 Feature Flag Console`
8. `A-14 System Settings`

#### Navigation Pattern

- Left rail: `Overview`, `Users`, `Firm`, `Revenue`, `AI`, `Compliance`, `Support`, `Flags`, `Settings`
- Secondary tab strip inside workspace:
  - Super Admin: `Platform`, `Tenants`, `Incidents`
  - Firm Partner: `Matters`, `Drafting`, `Utilization`, `Invoices`
  - Compliance Officer: `Audit`, `Rights Requests`, `Retention`

#### Screen Mapping

| Priority | Screens Anchored in this Concept | Role |
|---|---|---|
| Primary | `A-02`, `A-04`, `A-06`, `A-07`, `A-08`, `A-12`, `A-13`, `A-14` | Command center |
| Secondary | `A-03`, `A-09`, `A-10`, `A-11` | Drill-down workflows |
| Entry | `A-01` | Secure admin access |

#### Color and Typography Tokens

| Token | Value |
|---|---|
| `color-admin-bg` | `#FBFAF7` |
| `color-admin-surface` | `#FFFFFF` |
| `color-admin-ink` | `#1B2430` |
| `color-admin-accent` | `#155E75` |
| `color-admin-gold` | `#9A6700` |
| `color-admin-danger` | `#B42318` |
| `font-admin-ui` | `Manrope` |
| `font-admin-data` | `IBM Plex Mono` |

#### Accessibility

- Every chart supports table-view fallback.
- Activity streams expose `aria-live="polite"` only for critical operational changes.
- KPI cards use explicit labels such as `MAU last 30 days` instead of acronym-only headings.

#### Offline and Loading Behavior

- Dashboard shells render with cached last-known metrics if analytics APIs are delayed.
- `A-08` audit export and `A-06` CSV/PDF export show resumable progress states.
- Skeleton system:
  - KPI band skeleton
  - table row skeleton
  - chart panel shimmer with labeled placeholder axes

#### Data Visualization

- MRR/ARR trend lines
- workload heatmaps per lawyer
- court alert latency chart by court
- AI confidence histogram
- SLA countdown badges in support queue

## Option 2: Matter Grid

This concept is optimized for broad discovery across students, tutors, citizens, and mixed-role users who need modular navigation more than a single guided task flow.

### User Journey Dashboard

#### Layout Structure

- Primary pattern: card-grid layout using a responsive two-column mobile grid with variable card heights.
- Top area: compact persona header with dynamic search bar and rotating AI suggestion chip.
- Main area: reorderable module cards ranked by usage, recency, and plan entitlement.
- Bottom sheet: AI assistant opens as a half-height tray with citation previews.

#### Component Hierarchy

1. `Persona Header`
2. `Universal Search`
3. `Module Grid`
4. `Pinned Tasks Row`
5. `Saved Items Shelf`
6. `AI Suggestion Strip`
7. `Bottom Navigation`

#### Navigation Pattern

- Bottom navigation: `Dashboard`, `Research`, `Marketplace`, `Calendar`, `Profile`
- Swipeable card groups:
  - Students: `Judgment Search`, `Moot Court Suite`, `Internship Hub`
  - Citizens: `Lawyer Discovery`, `Consultation Booking`, `Document Vault`
  - Tutors: `Courses`, `Students`, `Certificates`
- Long-press on a card reveals `Pin`, `Hide`, `Offline Sync`, `Set as Quick Action`

#### Screen Mapping

| Priority | Screens Anchored in this Concept | Role |
|---|---|---|
| Primary | `S-07`, `S-08`, `S-09`, `S-10`, `S-11`, `S-12`, `S-15`, `S-17` | Discovery and transaction |
| Secondary | `S-04`, `S-05`, `S-16`, `S-18` | Ongoing workflow |
| Entry | `S-01`, `S-02`, `S-03` | Onboarding |

#### Color and Typography Tokens

| Token | Value |
|---|---|
| `color-bg-primary` | `#F3F7FA` |
| `color-surface` | `#FFFFFF` |
| `color-ink` | `#1F2937` |
| `color-accent` | `#1D4ED8` |
| `color-accent-2` | `#2F855A` |
| `color-highlight` | `#C26D2D` |
| `color-muted` | `#64748B` |
| `font-ui` | `IBM Plex Sans` |
| `font-reading` | `IBM Plex Serif` |

- Light mode emphasizes cool, clean surfaces for browse-heavy usage.
- Dark mode uses deep charcoal panels with green and copper states for action and premium content.

#### Accessibility

- Grid cards maintain consistent reading order for screen readers even when visually rearranged.
- Voice input control on `S-07` and `S-08` includes explicit labels and live permission state.
- Drag-and-drop personalization in PWA mode also supports keyboard reordering.

#### Offline State and Skeletons

- Per-card offline badges indicate `Available Offline`, `Sync Pending`, or `Online Only`.
- Downloaded judgments, saved prompts, and internship tracker entries remain accessible offline.
- Skeletons:
  - masonry card placeholders
  - search result card shimmer
  - lawyer profile tile skeleton with fee and rating lines

#### Data Visualization

- Compact donut charts for plan usage
- cross-reference cluster preview in judgment search
- internship application funnel counters
- card-level delta indicators for new alerts, new opportunities, and pending reviews

### Admin & Firm Command Dashboard

#### Layout Structure

- Dense 12-column grid with modular analytics cards and right-side drill-in drawer.
- Each module acts as a dashboard tile that can expand into a deep workspace.

#### Component Hierarchy

1. `A-02 Multi-Tenant Overview`
2. `A-03 User Management`
3. `A-09 Court Data Pipeline`
4. `A-10 Content Moderation`
5. `A-11 Marketplace Management`
6. `A-13 Feature Flag Console`
7. `A-07 AI Performance Monitor`
8. `A-06 Revenue Analytics`

#### Navigation Pattern

- Top navigation by operating domain: `Platform`, `Growth`, `Marketplace`, `Compliance`, `AI`, `Ops`
- Right-side contextual drawer for row details, moderation decisions, and user profile actions
- Saved dashboard presets for `Admin`, `Firm Partner`, `Marketplace Manager`, `Support Lead`

#### Screen Mapping

| Priority | Screens Anchored in this Concept | Role |
|---|---|---|
| Primary | `A-03`, `A-06`, `A-07`, `A-09`, `A-10`, `A-11`, `A-13` | Modular operations |
| Secondary | `A-02`, `A-08`, `A-12` | High-level oversight and compliance |
| Entry | `A-01` | Secure entry |

#### Color and Typography Tokens

| Token | Value |
|---|---|
| `color-admin-bg` | `#F4F8FB` |
| `color-admin-surface` | `#FFFFFF` |
| `color-admin-ink` | `#1E293B` |
| `color-admin-accent` | `#2563EB` |
| `color-admin-success` | `#15803D` |
| `color-admin-warning` | `#B45309` |
| `font-admin-ui` | `IBM Plex Sans` |
| `font-admin-data` | `IBM Plex Mono` |

#### Accessibility

- Tables support frozen headers and keyboard-sortable columns.
- Heatmaps always include numeric overlays and tooltip summaries.
- Drawer opening traps focus correctly and returns focus to the source row on close.

#### Offline and Loading Behavior

- Cached analytics panels display `Data may be stale` badge when live services lag.
- Moderation queue supports optimistic local state for note-taking only; approval actions require connectivity.
- Skeletons:
  - tile grid shimmer
  - table header and row placeholders
  - drawer field placeholders

#### Data Visualization

- cohort retention matrix
- stacked bar charts for subscription mix
- court parser success gauges
- course revenue split bars
- moderation backlog counters with SLA badges

## Option 3: Guided Workspace

This concept is optimized for deep professional workflows where the product should feel like a daily operating system rather than a menu of modules.

### User Journey Dashboard

#### Layout Structure

- Primary pattern: single-column guided workflow with one dominant next-action card and secondary supporting trays.
- Top area: agenda header with progress ring and daily completion indicator.
- Middle area: `Now`, `Next`, and `Later` workflow bands.
- Right-swipe contextual tray exposes AI assistant, citations, and supporting documents.

#### Component Hierarchy

1. `Today Agenda Header`
2. `Next Best Action Card`
3. `Case or Study Workflow Stack`
4. `AI Assistant Side Pane`
5. `Calendar and Reminder Rail`
6. `Recent Notifications Summary`
7. `Bottom Navigation or Step Nav`

#### Navigation Pattern

- Navigation prioritizes journey continuity over destinations:
  - `Today`
  - `Workspace`
  - `Assistant`
  - `Calendar`
  - `Inbox`
- `S-07` behaves as a contextual pane rather than a full interruption for most tasks.
- Breadcrumbs appear in case, drafting, and learning workflows.

#### Screen Mapping

| Priority | Screens Anchored in this Concept | Role |
|---|---|---|
| Primary | `S-04`, `S-05`, `S-06`, `S-07`, `S-13`, `S-16`, `S-17`, `S-18` | Guided daily work |
| Secondary | `S-08`, `S-09`, `S-12`, `S-15` | Embedded supporting tools |
| Entry | `S-01`, `S-02`, `S-03` | Setup |

#### Color and Typography Tokens

| Token | Value |
|---|---|
| `color-bg-primary` | `#F8FAFC` |
| `color-surface` | `#FFFFFF` |
| `color-ink` | `#172554` |
| `color-accent` | `#D97706` |
| `color-success` | `#0F766E` |
| `color-notice` | `#BE123C` |
| `color-divider` | `#CBD5E1` |
| `font-ui` | `Plus Jakarta Sans` |
| `font-reading` | `Literata` |

- Light mode is calm and spacious with navy structural framing.
- Dark mode uses muted blue-black surfaces with amber action lines and teal success states.

#### Accessibility

- Focus order follows the visible workflow path: agenda → current task → supporting context → assistant.
- AI suggestions include a `simple explanation` mode without hidden gestures.
- Reduce-motion preference disables animated step transitions and pulsing attention rings.

#### Offline State and Skeletons

- Current task remains editable offline if it belongs to notes, saved research, draft memorials, or calendar planning.
- Conflict resolution sheet appears on reconnect when edits differ from server state.
- Skeletons:
  - agenda skeleton with progress ring placeholder
  - next-action card skeleton
  - contextual pane skeleton with citation card placeholders

#### Data Visualization

- progress rings for daily completion
- timeline lanes for hearings and consultations
- AI confidence gauges inside assistant pane
- priority ladders for notifications and pending approvals

### Admin & Firm Command Dashboard

#### Layout Structure

- Three-zone web workspace:
  - left `Queue`
  - center `Active Work Surface`
  - right `Insights and Audit`
- The center panel changes based on role and current task, such as partner approval, rights request handling, or incident review.

#### Component Hierarchy

1. `A-12 Support Ticket Router` or `A-04 Firm Workspace` depending on role
2. `A-05 Collaborative Drafting` active surface
3. `A-08 Compliance Audit Log`
4. `A-07 AI Performance Monitor`
5. `A-14 System Settings`
6. `A-02 Multi-Tenant Overview` summary tray

#### Navigation Pattern

- Role-based workspace presets:
  - Super Admin → `Incidents`, `Tenants`, `Config`
  - Compliance Officer → `Rights Requests`, `Audit`, `Retention`
  - Firm Partner → `Assignments`, `Approvals`, `Billing`
  - Platform Manager → `AI`, `Pipeline`, `Support`
- Workspace tabs stay local to the current task instead of forcing full page switches.

#### Screen Mapping

| Priority | Screens Anchored in this Concept | Role |
|---|---|---|
| Primary | `A-04`, `A-05`, `A-08`, `A-12`, `A-14` | Guided operational work |
| Secondary | `A-02`, `A-06`, `A-07`, `A-09` | Insight and monitoring |
| Entry | `A-01` | Secure access |

#### Color and Typography Tokens

| Token | Value |
|---|---|
| `color-admin-bg` | `#F8FAFC` |
| `color-admin-surface` | `#FFFFFF` |
| `color-admin-ink` | `#172554` |
| `color-admin-accent` | `#D97706` |
| `color-admin-info` | `#0F766E` |
| `color-admin-danger` | `#BE123C` |
| `font-admin-ui` | `Plus Jakarta Sans` |
| `font-admin-reading` | `Literata` |

#### Accessibility

- Work queues support full keyboard traversal and bulk selection by shortcut.
- Diff viewer in `A-05` uses side-by-side text plus inline change summary for screen reader parity.
- Rights request and audit export actions require explicit confirmation dialogs with clear focus handling.

#### Offline and Loading Behavior

- Notes and draft annotations can be created offline in local cache, but approval, moderation, and rights-request resolution remain online-only.
- Loading states favor structured wireframes over generic shimmer to preserve workflow orientation.

#### Data Visualization

- document approval funnel
- AI review waterfall
- support SLA timer bands
- tenant health scorecards
- audit event timelines with severity markers

## Comparative Guidance

| Goal | Best Option | Why |
|---|---|---|
| Launch with strong lawyer and firm utility | Option 1: Courtroom Brief | Fast status visibility, alert prominence, and operational clarity |
| Drive cross-persona discovery and marketplace engagement | Option 2: Matter Grid | Flexible module browsing and strong surfacing for students, tutors, and citizens |
| Maximize repeat daily usage for professional workflows | Option 3: Guided Workspace | Turns the product into a step-based operating environment |

## Screen Index Coverage Summary

| Screen Cluster | Most Natural Option | Reason |
|---|---|---|
| `S-01` to `S-03` onboarding and profile setup | Option 2 | Persona-aware card system makes setup feel tailored without being heavy |
| `S-04` to `S-06`, `S-13`, `S-16` practitioner execution | Option 1 or Option 3 | Option 1 is faster, Option 3 is deeper |
| `S-07` to `S-10` AI, research, and learning flows | Option 2 or Option 3 | Option 2 aids discovery, Option 3 aids continuous task completion |
| `S-11` to `S-12` citizen discovery and booking | Option 2 | Better browse-compare-book rhythm |
| `A-02` to `A-14` command and control surfaces | Option 1 or Option 3 | Option 1 favors broad visibility, Option 3 favors focused action |

## Recommendation

- Use **Option 1: Courtroom Brief** as the default beta direction for lawyers, firms, and citizens.
- Borrow **Option 2: Matter Grid** patterns for student and tutor dashboards where discovery matters more than urgency.
- Use **Option 3: Guided Workspace** selectively for firm drafting, compliance operations, and support routing where sequential work quality matters.

## Assumptions

- `[ASSUMPTION]` Light mode is the first-run default because courts, offices, and classrooms in Bharat often operate in bright environments and high-glare conditions.
- `[ASSUMPTION]` Persona-aware dashboard composition is controlled by backend-driven configuration through GraphQL so layout priorities can change without forcing app-store releases.
- `[ASSUMPTION]` Offline cache stores only the minimum required operational data on-device and respects DPDP purpose limitation through encrypted local storage and user-triggered data wipe from `S-18`.
