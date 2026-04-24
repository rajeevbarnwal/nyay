# Legal Pro Screens S-01 to S-04 Change Log

Last updated: 24 Apr 2026

This document records the approved design and implementation decisions for the Legal Pro HTML screens from `S-01` to `S-04`, with extra detail for the latest `S-04` Morning Brief work.

## S-04 Morning Brief Change Record

Primary file:

`docs/wireframes/S-04-legal-pro.html`

### Approved S-04 Structure

`S-04` is the lawyer/firm morning command screen. It is intentionally denser than the pre-auth screens and focuses on hearings, matter actions, collections, court alerts, and LegalGPT India prep.

The approved desktop structure is:

1. Priority alert bar at the very top.
2. Left navigation rail with colorful icon backgrounds.
3. Sticky first desktop card containing `S-04 · Home / Morning Brief`, greeting, notification bell, theme control, and metadata chips.
4. Scrollable `Priority window`.
5. Three-column command layout for docket, matter board, LegalGPT India, collections, actions, and alerts.

The approved mobile structure is:

1. Priority alert bar.
2. LegalSaathi logo utility card.
3. `S-04 · Lawyer/Firm dashboard` card.
4. `S-04 · Morning brief` card.
5. KPI row.
6. Live docket.
7. Prep/collections actions.
8. Priority filing.
9. LegalGPT India briefing.
10. Collapsible preview states and accessibility notes.

### Desktop Fixes

The desktop screen previously appeared blank until the user scrolled. Root cause: the hidden mobile wrapper was still reserving a full viewport before the desktop wrapper, pushing desktop content below the fold.

Fix applied:

```css
@media (min-width: 768px) {
  body[data-screen-id="s04-home"] > .mx-auto {
    min-height: 0 !important;
  }
  .s04-mobile-view {
    display: none !important;
  }
  .s04-desktop-view {
    display: block !important;
  }
}
```

The mobile and desktop wrappers now use explicit screen classes:

```html
<div class="s04-mobile-view block md:hidden">
<div class="s04-desktop-view hidden md:block">
```

### Mobile Spacing Controls

The top mobile area now has a single spacing controller:

```html
<div class="mobile-stack space-y-2">
```

This controls the spacing between:

- Priority banner to LegalSaathi logo card.
- LegalSaathi logo card to `S-04 · Lawyer/Firm dashboard`.
- `S-04 · Lawyer/Firm dashboard` to `S-04 · Morning brief`.
- `S-04 · Morning brief` to the KPI/lower content stack.

The lower mobile content has its own single spacing controller:

```html
<div class="mobile-lower-stack space-y-2">
```

This controls the spacing between:

- KPI row (`Hearings / Filings / Fees`) to `Live docket`.
- `Live docket` to `Prep brief / Collections`.
- `Prep brief / Collections` to `Priority filing`.
- `Priority filing` to `LegalGPT India briefing`.

### S-04 Icon Button Changes

Two desktop text buttons were converted to icon-only controls with accessible labels and browser hover titles.

`Matter command board`:

- Before: visible text button `New case`.
- After: green tinted icon button.
- Hover title: `New Case`.
- ARIA label: `New Case`.

`LegalGPT India briefing`:

- Before: visible text button `Open brief`.
- After: violet tinted icon button.
- Hover title: `Open Brief`.
- ARIA label: `Open Brief`.

The mobile `Open brief` button was left unchanged because the requested change targeted the desktop `Matter command board` and desktop `LegalGPT India briefing` controls.

### S-04 Verification

Chrome headless screenshots were used to verify both viewports after the desktop blank-screen fix:

- Desktop `1440 x 1000`: renders immediately from the priority alert and dashboard, with no initial blank viewport.
- Mobile `390 x 844`: renders priority alert, logo card, dashboard card, morning brief card, KPI row, and live docket.

## S-01 to S-04 Comparison

| Screen | Product Role | User State | Header / Shell Pattern | Primary Content | Navigation State | Key Design Decisions | Current Notes |
|---|---|---|---|---|---|---|---|
| `S-01` Splash / Onboarding | Pre-auth entry and persona selection | Pre-auth | Merged utility header, no personalized workspace data, collapsible disabled rail on desktop | LegalSaathi entry, persona choice, language, auth gate | Routes disabled with authentication-required behavior | Removed duplicate greeting-style card; added pre-auth neutral copy, compact logo treatment, persona icons, auth tabs | Review any old mobile copy labels before final production handoff |
| `S-02` Auth Login / Signup | Secure access and login/signup | Pre-auth | Same pre-auth shell family as `S-01` | Email, mobile, OAuth, persona preview, verification pipeline, trust boundary | Routes disabled with authentication-required behavior | Reworked auth layout, added tinted auth method cards, compact trust boundary, mobile card separation | Approved as auth-focused continuation of `S-01` |
| `S-03` Profile Setup | Guided post-auth onboarding/profile completion | Post-auth onboarding style, but visually aligned with `S-01/S-02` shell | Compact utility header, active Settings rail, reduced mobile logo card | Setup progress, identity, professional context, DPDP consent, integrations, LegalGPT India note | Settings highlighted in left rail | Reduced top card size, compacted desktop content cards, fixed mobile stat overlap, removed extra text from mobile logo card | Synced to generator and prototype after approval |
| `S-04` Home / Morning Brief | Lawyer/firm daily command dashboard | Authenticated workspace screen | Sticky first desktop card, priority alert, mobile logo/dashboard/morning brief stack | Hearings, filings, collections, matter board, LegalGPT India briefing, court alerts | Home active in left rail and mobile dock | Fixed desktop blank initial viewport, added top and lower mobile spacing controllers, replaced key text buttons with icon controls | Latest approved working screen; update generator only after explicit confirmation |

## Design Memory Going Forward

For future Legal Pro screens, preserve these decisions unless explicitly changed:

- Use colorful icon backgrounds for action controls and nav items.
- Prefer icon-only buttons with `title` and `aria-label` for compact dashboard actions.
- Keep visible text only where the action benefits from reading as a command.
- Use one local spacing controller per logical mobile group whenever possible.
- Keep desktop and mobile wrapper visibility explicit when standalone HTML depends on Tailwind CDN responsive classes.
- Validate standalone HTML screens in both desktop and mobile viewports before committing.
- Commit each approved screen milestone to GitHub so rollback points are available.
