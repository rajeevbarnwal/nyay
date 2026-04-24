# Legal Saathi Screen Editing Guide

This folder contains **generated screen outputs**.

## Source of truth

The current source of truth for the user screens is:

- `/Users/rajeevbarnwal/Desktop/Codes/Nyay/scripts/generate-legal-pro-batch1.mjs`

That file generates:

- `/Users/rajeevbarnwal/Desktop/Codes/Nyay/docs/wireframes/S-01-legal-pro.html`
- `/Users/rajeevbarnwal/Desktop/Codes/Nyay/docs/wireframes/S-02-legal-pro.html`
- ...
- `/Users/rajeevbarnwal/Desktop/Codes/Nyay/docs/wireframes/S-32-legal-pro.html`

The prototype copy is then built into:

- `/Users/rajeevbarnwal/Desktop/Codes/Nyay/docs/wireframes/Final User Screens/`

## Which file should I edit?

### If you want a change to survive a rebuild
Edit:

- `/Users/rajeevbarnwal/Desktop/Codes/Nyay/scripts/generate-legal-pro-batch1.mjs`

### If you only want a temporary one-off visual tweak
You can edit a generated HTML file directly, but the next build will overwrite it.

Examples:

- `/Users/rajeevbarnwal/Desktop/Codes/Nyay/docs/wireframes/S-01-legal-pro.html`
- `/Users/rajeevbarnwal/Desktop/Codes/Nyay/docs/wireframes/Final User Screens/S-01-legal-pro.html`

## Build flow

### Generate the screen HTML files
```bash
node /Users/rajeevbarnwal/Desktop/Codes/Nyay/scripts/generate-legal-pro-batch1.mjs
```

### Copy generated screens into the prototype folder
```bash
node /Users/rajeevbarnwal/Desktop/Codes/Nyay/scripts/build-final-user-prototype.mjs
```

### Do both in one step
```bash
node /Users/rajeevbarnwal/Desktop/Codes/Nyay/scripts/build-user-screens.mjs
```

## Practical rule

- `scripts/generate-legal-pro-batch1.mjs` = authored source
- `docs/wireframes/*.html` = generated screen outputs
- `docs/wireframes/Final User Screens/*.html` = generated prototype copies

## If you do not want a prototype

If you do **not** care about `Final User Screens`, you can stop after generating:

```bash
node /Users/rajeevbarnwal/Desktop/Codes/Nyay/scripts/generate-legal-pro-batch1.mjs
```

In that case, the file you would hand off or open directly is:

- `/Users/rajeevbarnwal/Desktop/Codes/Nyay/docs/wireframes/S-01-legal-pro.html`

But while the generator is still part of the workflow, the **source of truth remains the generator**, not the generated HTML.

The generated HTML becomes the real source of truth only if you intentionally stop using the generator and manually maintain that file going forward.

