# Legal Pro Screen S-08 Change Log

Last updated: 25 Apr 2026

This document records the approved design and implementation decisions for `S-08 · Judgment Search / Case Law Research`.

Primary file:

`docs/wireframes/S-08-legal-pro.html`

## Approved S-08 Structure

`S-08` is the citation-first judgment search workspace for students and lawyers. It follows the newer Legal Pro shell pattern approved across `S-03` through `S-07`.

The approved mobile structure is:

1. Priority alert bar.
2. Sticky LegalSaathi logo utility card with notification bell and single appearance control.
3. Compact `S-08 · Case law research` hero card.
4. Research query card.
5. Result set.
6. LegalGPT India note.
7. Collapsible preview states and accessibility notes.

The approved desktop structure is:

1. Priority alert bar.
2. Left navigation rail with `Research` active.
3. Compact sticky desktop header with greeting, notification bell, single appearance control, and metadata chips.
4. Three-column research workspace:
   - Filters.
   - Result set and search query.
   - LegalGPT India note and saved research folders.

## Layout and Shell Fixes

The standalone HTML now uses explicit S-08 wrappers:

```html
<div class="s08-mobile-view">
<div class="s08-desktop-view">
```

These wrappers keep mobile and desktop rendering deterministic, preventing hidden mobile content from affecting desktop layout.

The screen also uses an S-08-specific `body` identifier:

```html
<body data-screen-id="s08-judgment-search">
```

This allows S-08 overrides to stay isolated from other Legal Pro screens.

## Mobile Spacing Controls

The upper mobile flow uses one spacing variable:

```css
--s08-mobile-flow-gap: 8px;
```

This controls:

- Priority alert to LegalSaathi utility card.
- LegalSaathi utility card to the `S-08 · Case law research` card.
- `S-08 · Case law research` card to the Research query card.

The lower mobile content uses the same gap rhythm through:

```html
<div class="mobile-lower-stack space-y-2">
```

The key fix was adding the same spacing guard to `mobile-content`, because the query card sits outside the first mobile stack.

## Mobile Hero and Query Card

The mobile hero card was reduced and made more compact:

- The greeting was tightened.
- The result count pill was reduced.
- The description was moved below the greeting row so it can use full card width.
- The description is now rendered as two controlled lines:

```html
Search across courts, acts, judges, and sections
with context-aware result cards and saved research folders.
```

The mobile Research query card was also compacted:

- Card padding reduced.
- Query input spacing reduced.
- Filter chip spacing reduced by roughly 20%.
- Text size was intentionally preserved.

## Visual Treatment

S-08 now follows the approved colorful Legal Pro treatment:

- Outer parent cards use darker tinted shell backgrounds.
- Inner cards remain separately tinted for hierarchy.
- `LegalGPT India note` uses a rose chip instead of green, avoiding green-on-green repetition.
- `Research query` uses a navy chip that is slightly lighter than the first draft.
- The Research query magnifier uses a dedicated high-contrast dark-purple filled icon with a white stroke and subtle glow.

The main S-08 visual classes are:

```css
.s08-kicker
.s08-kicker-navy
.s08-kicker-rose
.s08-query-search-icon
.s08-shell-blue
.s08-shell-violet
.s08-shell-green
.s08-shell-amber
.s08-shell-teal
```

## Desktop Changes

Desktop changes include:

- `Research` active in the left navigation rail.
- Compact sticky header with metadata chips.
- Darker parent card backgrounds for Filters, Result set, LegalGPT India note, and Saved research folders.
- Search icon added near the result count and query area.
- Result action text buttons converted into accessible icon buttons with `title` and `aria-label`.
- `LegalGPT India note` chip changed from green to rose.

## Mobile Popover Fixes

The notification and appearance popovers were misaligned because a broad mobile panel width clamp also affected popover panels. S-08 now excludes popovers from the card clamp:

```css
.panel:not(.notify-panel):not(.popover-panel)
```

The notification panel was also reduced by roughly 30%:

```css
width: min(196px, calc(100vw - 48px));
```

The appearance/Sun dropdown remains compact and aligned.

## Interaction and Accessibility

The S-08 controls preserve the Legal Pro interaction model:

- Notification bell and appearance controls remain icon-first and keyboard accessible.
- Search/result action buttons use `title`, `aria-label`, and focus rings.
- LegalGPT India note uses `aria-live="polite"`.
- Priority alert uses `aria-live="assertive"`.
- The Research query search icon has a clear semantic label: `aria-label="Search judgments"`.
- Interactive controls retain the 44px minimum target pattern where applicable.

## Verification

Validation performed:

- `git diff --check -- docs/wireframes/S-08-legal-pro.html`
- Headless Chrome mobile render at `390 x 900`
- Headless Chrome desktop render at `1440 x 1200`
- Headless Chrome mobile render with notification popover forced open
- Headless Chrome mobile render with appearance popover forced open

The mobile renders confirmed:

- The `S-08 · Case law research` card is compact.
- The Research query card no longer overlaps the hero card.
- The notification popover is aligned and smaller.
- The appearance popover remains aligned.
- The dark-purple magnifier icon is readable on the research card.

## Current Notes

- This update applies to the standalone `docs/wireframes/S-08-legal-pro.html` screen and this reference document.
- `S-05` and `S-06` have unrelated local modifications and were intentionally not staged.
- Generator/prototype synchronization is intentionally separate and should only happen after explicit approval.
