# Legal Pro Screen S-09 Change Log

Last updated: 25 Apr 2026

This document records the approved design and implementation decisions for `S-09 · Moot Court Suite / Moot Preparation`.

Primary file:

`docs/wireframes/S-09-legal-pro.html`

## Approved S-09 Structure

`S-09` is the student moot-preparation workspace. It follows the newer Legal Pro shell pattern approved across `S-03` through `S-08`, while preserving the product decision that Phase 1 supports a single AI judge simulation panel.

The approved mobile structure is:

1. Priority alert bar.
2. Sticky LegalSaathi logo utility card with notification bell and single appearance control.
3. Compact `S-09 · Moot Court Suite` hero card.
4. KPI row for problem bank, memorial draft, and bench score.
5. Selected moot workspace.
6. Judge simulation card.
7. Collapsible preview states and accessibility notes.

The approved desktop structure is:

1. Priority alert bar.
2. Left navigation rail with `Research` active.
3. Compact sticky desktop header with greeting, notification bell, single appearance control, and metadata chips.
4. Three-column moot preparation workspace:
   - Problem bank.
   - Memorial workspace.
   - Single judge simulation and scoring rubric.

## Layout and Shell Fixes

The standalone HTML now uses explicit S-09 wrappers:

```html
<div class="s09-mobile-view">
<div class="s09-desktop-view">
```

These wrappers keep mobile and desktop rendering deterministic and prevent hidden mobile content from affecting desktop layout.

The screen also uses an S-09-specific `body` identifier:

```html
<body data-screen-id="s09-moot-suite">
```

This allows S-09 overrides to stay isolated from other Legal Pro screens.

## Mobile Spacing Controls

The upper and lower mobile flow use one card-to-card spacing variable:

```css
--s09-mobile-flow-gap: 8px;
```

This controls:

- Priority alert to LegalSaathi utility card.
- LegalSaathi utility card to the `S-09 · Moot Court Suite` card.
- Hero card to KPI cards.
- KPI cards to selected moot.
- Selected moot to judge simulation.

The priority alert gets a separate top inset because it controls browser-edge spacing, not card-to-card rhythm:

```css
--s09-mobile-alert-top: 12px;
```

## Mobile Sticky Logo Fix

The LegalSaathi logo card was made sticky on its own wrapper instead of relying on an inner card. This prevents the logo card from scrolling away with the content.

The important pattern is:

```css
.mobile-sticky-stack {
  position: sticky;
  top: calc(var(--ls-mobile-toolbar-top) + var(--s09-mobile-flow-gap));
}

.mobile-utility-card {
  position: relative;
}
```

This keeps the logo utility card sticky while allowing the S-09 hero and lower content to scroll normally.

## Mobile Overflow Fix

The mobile shell, content, and bottom dock are clamped to the phone-safe width:

```css
width: min(358px, calc(100vw - 32px));
max-width: calc(100vw - 32px);
```

This prevents right-side overflow while preserving the 16px left/right mobile gutters on a 390px viewport.

The bottom navigation dock uses the same width clamp so its border aligns with the app shell.

## Visual Treatment

S-09 now follows the approved colorful Legal Pro treatment:

- Outer parent cards use richer tinted shell backgrounds.
- Inner cards use separate tinted surfaces for hierarchy.
- Header chips use darker variants when the card background has similar color.
- `Selected moot`, `Memorial workspace`, `Judge simulation`, `Single judge simulation`, and `Scoring rubric` chips use high-contrast darker chip styles.

The key S-09 visual classes are:

```css
.s09-kicker
.s09-kicker-deep-violet
.s09-kicker-deep-amber
.s09-kicker-deep-rose
.s09-shell-blue
.s09-shell-violet
.s09-shell-green
.s09-shell-amber
.s09-shell-rose
```

## Desktop Changes

Desktop changes include:

- `Research` active in the left navigation rail.
- Compact sticky header with metadata chips.
- Compact card sizing for Problem bank, Memorial workspace, Single judge simulation, and Scoring rubric.
- `align-items: start` on the desktop work grid so compact cards do not stretch vertically.
- Darker `Memorial workspace`, `Single judge simulation`, and `Scoring rubric` chips for readability.

## Mobile Content Changes

Mobile changes include:

- Compact `S-09 · Moot Court Suite` hero card.
- Problem bank, memorial draft, and bench score cards aligned within the phone shell.
- `Issue map` copy tightened for a compact two-line-friendly presentation.
- `Judge simulation` redesigned with a rose/dark-chip treatment to avoid green-on-green conflict.
- Sticky LegalSaathi card verified while scrolling.

## Interaction and Accessibility

The S-09 controls preserve the Legal Pro interaction model:

- Notification bell and appearance controls remain icon-first and keyboard accessible.
- Priority alert uses `aria-live="assertive"`.
- Judge simulation uses `aria-live="polite"`.
- Mobile and desktop navigation retain visible active states.
- Interactive controls retain the 44px minimum target pattern where applicable.

## Verification

Validation performed:

- `git diff --check -- docs/wireframes/S-09-legal-pro.html`
- Headless Chrome mobile render at `390 x 900`
- Headless Chrome mobile render after programmatic scroll to verify sticky logo behavior
- Headless Chrome desktop render at `1440 x 1200`

The mobile renders confirmed:

- No right-side overflow after the width clamp.
- Priority alert has a small top gap.
- Priority alert no longer overlaps the LegalSaathi card.
- LegalSaathi logo card remains sticky during scroll.
- S-09 hero card spacing follows the same mobile flow gap.
- Judge simulation chip is readable on the rose card background.

The desktop render confirmed:

- The `Single judge simulation` chip is readable on the green card background.
- The desktop layout remains compact and aligned.

## Current Notes

- This update applies to the standalone `docs/wireframes/S-09-legal-pro.html` screen and this reference document.
- `S-05` and `S-06` have unrelated local modifications and were intentionally not staged.
- Generator/prototype synchronization is intentionally separate and should only happen after explicit approval.
