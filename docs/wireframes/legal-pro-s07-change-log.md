# Legal Pro Screen S-07 Change Log

Last updated: 25 Apr 2026

This document records the approved design and implementation decisions for `S-07 · AI Legal Assistant (LegalGPT India)`.

Primary file:

`docs/wireframes/S-07-legal-pro.html`

## Approved S-07 Structure

`S-07` is the LegalGPT India workspace for legal Q&A, authority review, and matter-linked drafting assistance. It follows the newer Legal Pro shell pattern established across `S-03`, `S-04`, `S-05`, and `S-06`.

The approved mobile structure is:

1. Priority alert bar.
2. Sticky LegalSaathi logo utility card with notification bell and single appearance control.
3. Separate scrollable `S-07 · LegalGPT India` hero card.
4. Compact KPI row for confidence, citations, and language.
5. Query card.
6. Assistant summary.
7. Authorities.
8. Suggested prompts.
9. Compose next query.
10. Collapsible preview states and accessibility notes.

The approved desktop structure is:

1. Priority alert bar.
2. Left navigation rail with `LegalGPT India` active.
3. Compact sticky desktop header with notification bell, single appearance control, greeting, and metadata chips.
4. Three-column AI workspace:
   - Session controls and saved prompts.
   - Conversation and composer.
   - Authority rail and matter insights.

## Layout and Shell Fixes

The standalone HTML now uses explicit S-07 wrappers:

```html
<div class="s07-mobile-view">
<div class="s07-desktop-view">
```

This prevents desktop rendering from being pushed below hidden mobile content.

The mobile logo card is sticky and no longer scrolls with the page. The previous issue was caused by horizontal overflow rules interfering with sticky behavior in Chrome. S-07 now uses `overflow-x: clip` for the screen wrapper and mobile content clamps.

## Mobile Spacing Controls

The upper mobile flow uses one spacing controller:

```html
<div class="mobile-stack space-y-2">
```

This controls:

- Priority alert to LegalSaathi logo utility card.
- LegalSaathi logo utility card to `S-07 · LegalGPT India`.
- `S-07 · LegalGPT India` to the first mobile content section.

The lower mobile content uses one spacing controller:

```html
<div class="mobile-lower-stack space-y-2">
```

This controls:

- Query to assistant summary and authorities flow.
- Authorities to suggested prompts.
- Suggested prompts to compose next query.
- Compose section to lower preview/accessibility sections.

## Visual Treatment

The screen now follows the approved colorful/tinted Legal Pro treatment:

- `tint-blue`, `tint-amber`, `tint-violet`, `tint-green`, and `tint-rose` are used for card rhythm and information hierarchy.
- Query is represented by a bot-style SVG icon instead of plain `Query` text.
- Assistant summary is represented by a right-aligned user-style SVG icon instead of plain `Assistant summary` text.
- Mobile `Authorities`, `Suggested next prompts`, and `Compose next query` use bold colorful round labels.
- Desktop `Session controls`, `Saved prompts`, `Conversation`, `Composer`, `Authority rail`, and `Matter insights` use the same consolidated bold label system.

The shared label/icon styling is controlled by:

```css
.s07-kicker
.s07-kicker-icon
.s07-kicker-blue
.s07-kicker-amber
.s07-kicker-violet
.s07-kicker-green
```

## Interaction and Accessibility

The S-07 controls preserve the Legal Pro interaction model:

- Notification bell and appearance controls remain compact, icon-first, and accessible.
- Send prompt and voice input remain icon buttons with `title`, `aria-label`, and focus rings.
- AI conversation uses `aria-live="polite"`.
- Mobile bot and assistant icons use semantic labels and hidden text where the visible label has been replaced.
- All interactive controls preserve the 44px minimum target pattern.

## Verification

Validation performed:

- `git diff --check -- docs/wireframes/S-07-legal-pro.html`
- Headless Chrome mobile render at `390 x 900`

The mobile render confirmed:

- The LegalSaathi utility card remains visible in the approved top position.
- The bot query icon appears in the left/top position of the query card.
- The assistant/user icon appears in the right/top position of the assistant summary card.
- The bottom dock remains within the mobile viewport.

## Current Notes

- This commit updates the standalone `docs/wireframes/S-07-legal-pro.html` screen and this reference document.
- Generator/prototype synchronization is intentionally separate and should only happen after explicit approval.
