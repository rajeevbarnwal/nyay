import fs from "node:fs";
import path from "node:path";

const outDir = "/Users/rajeevbarnwal/Desktop/Codes/Nyay/docs/wireframes";
const logoSourcePath = "/Users/rajeevbarnwal/Desktop/Logo/LegalSaathi_Logo.png";
const logoFileName = "LegalSaathi_Logo.png";
const TONE_MAP = {
  accent: { border: "rgba(43,108,176,0.28)", bg: "rgba(43,108,176,0.14)", color: "#2B6CB0", glow: "rgba(43,108,176,0.18)" },
  amber: { border: "rgba(217,119,6,0.28)", bg: "rgba(217,119,6,0.14)", color: "#D97706", glow: "rgba(217,119,6,0.18)" },
  violet: { border: "rgba(99,102,241,0.28)", bg: "rgba(99,102,241,0.14)", color: "#4F46E5", glow: "rgba(99,102,241,0.18)" },
  emerald: { border: "rgba(5,150,105,0.28)", bg: "rgba(5,150,105,0.14)", color: "#059669", glow: "rgba(5,150,105,0.18)" },
  rose: { border: "rgba(225,29,72,0.28)", bg: "rgba(225,29,72,0.14)", color: "#E11D48", glow: "rgba(225,29,72,0.18)" },
  slate: { border: "rgba(71,85,105,0.28)", bg: "rgba(71,85,105,0.14)", color: "#475569", glow: "rgba(71,85,105,0.18)" },
  teal: { border: "rgba(13,148,136,0.28)", bg: "rgba(13,148,136,0.14)", color: "#0D9488", glow: "rgba(13,148,136,0.18)" },
};
const NAV_ICON_PALETTE = {
  Home: ["rgba(43,108,176,0.18)", "#2B6CB0"],
  Cases: ["rgba(217,119,6,0.18)", "#D97706"],
  Research: ["rgba(13,148,136,0.18)", "#0D9488"],
  "LegalGPT India": ["rgba(99,102,241,0.18)", "#4F46E5"],
  Calendar: ["rgba(225,29,72,0.18)", "#E11D48"],
  Billing: ["rgba(5,150,105,0.18)", "#059669"],
  Settings: ["rgba(71,85,105,0.18)", "#475569"],
};
const PERSONA_TONE_MAP = {
  Citizen: "accent",
  Student: "amber",
  "Independent Lawyer": "violet",
  Firm: "emerald",
  Tutor: "rose",
};
const COMPLIANCE_TONE_MAP = {
  DPDP: "accent",
  "Bar Council": "amber",
  ISO: "emerald",
  RLS: "violet",
  Audit: "rose",
};

function toneStyle(tone = "accent") {
  return TONE_MAP[tone] || TONE_MAP.accent;
}

function iconShellStyle(tone = "accent") {
  const config = toneStyle(tone);
  return `border-color:${config.border}; background:${config.bg}; color:${config.color}; box-shadow:0 10px 24px -18px ${config.glow};`;
}

function complianceGlyph(kind, className = "h-3.5 w-3.5") {
  const icons = {
    DPDP: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="${className}"><path d="M12 3.8 5.5 6.6v5.6c0 4.1 2.7 6.9 6.5 8 3.8-1.1 6.5-3.9 6.5-8V6.6L12 3.8Z"></path><path d="m9.5 12 1.6 1.7 3.4-3.7"></path></svg>`,
    "Bar Council": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="${className}"><path d="M12 4.5v12.5"></path><path d="M7 8.5 4.5 13h5L7 8.5Zm10 0L14.5 13h5L17 8.5ZM9.5 19h5"></path></svg>`,
    ISO: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="${className}"><circle cx="12" cy="12" r="7.5"></circle><path d="M9.3 12.2 11 14l4-4.3"></path></svg>`,
    RLS: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="${className}"><path d="M6 5.5h12v13H6z"></path><path d="M9 9.5h6M9 13h4"></path></svg>`,
    Audit: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="${className}"><path d="M6 4.5h9l3 3V19.5H6z"></path><path d="M15 4.5v3h3M9 12h6M9 15h4"></path></svg>`,
  };
  return icons[kind];
}

function complianceBadge(kind) {
  const accent = "#2B6CB0";
  const amber = "#D97706";
  const emerald = "#059669";
  const violet = "#4F46E5";
  const slate = "#475569";
  const white = "#FFFFFF";

  const badges = {
    DPDP: `
      <svg viewBox="0 0 88 88" class="h-11 w-11" aria-hidden="true">
        <circle cx="44" cy="44" r="40" fill="${white}" stroke="${slate}" stroke-width="3"/>
        <path d="M12 31h64" stroke="${amber}" stroke-width="10" stroke-linecap="round"/>
        <path d="M12 44h64" stroke="${white}" stroke-width="10" stroke-linecap="round"/>
        <path d="M12 57h64" stroke="${emerald}" stroke-width="10" stroke-linecap="round"/>
        <circle cx="44" cy="44" r="11" fill="none" stroke="${accent}" stroke-width="2.5"/>
        <text x="44" y="77" text-anchor="middle" font-size="10" font-weight="700" fill="${accent}" font-family="Inter, sans-serif">DPDP</text>
      </svg>`,
    PCI: `
      <svg viewBox="0 0 88 88" class="h-11 w-11" aria-hidden="true">
        <circle cx="44" cy="44" r="40" fill="${white}" stroke="${slate}" stroke-width="3"/>
        <circle cx="44" cy="44" r="31" fill="none" stroke="${slate}" stroke-width="2"/>
        <rect x="27" y="26" width="34" height="20" rx="5" fill="none" stroke="${accent}" stroke-width="3"/>
        <path d="M27 34h34" stroke="${accent}" stroke-width="3"/>
        <text x="44" y="64" text-anchor="middle" font-size="12" font-weight="800" fill="${slate}" font-family="Inter, sans-serif">PCI DSS</text>
      </svg>`,
    SOC: `
      <svg viewBox="0 0 88 88" class="h-11 w-11" aria-hidden="true">
        <circle cx="44" cy="44" r="40" fill="${white}" stroke="${accent}" stroke-width="3"/>
        <circle cx="44" cy="44" r="29" fill="rgba(43,108,176,0.14)" stroke="${accent}" stroke-width="2"/>
        <text x="44" y="40" text-anchor="middle" font-size="12" font-weight="700" fill="${white}" font-family="Inter, sans-serif">SOC</text>
        <text x="44" y="52" text-anchor="middle" font-size="8" font-weight="700" fill="${white}" font-family="Inter, sans-serif">AICPA</text>
      </svg>`,
    GDPR: `
      <svg viewBox="0 0 88 88" class="h-11 w-11" aria-hidden="true">
        <rect x="10" y="18" width="68" height="52" rx="14" fill="rgba(43,108,176,0.14)" stroke="${accent}" stroke-width="3"/>
        <g fill="${amber}">
          <circle cx="26" cy="31" r="2.1"/><circle cx="20" cy="39" r="2.1"/><circle cx="18" cy="49" r="2.1"/><circle cx="20" cy="58" r="2.1"/>
          <circle cx="26" cy="66" r="2.1"/><circle cx="62" cy="31" r="2.1"/><circle cx="68" cy="39" r="2.1"/><circle cx="70" cy="49" r="2.1"/>
          <circle cx="68" cy="58" r="2.1"/><circle cx="62" cy="66" r="2.1"/><circle cx="35" cy="26" r="2.1"/><circle cx="53" cy="26" r="2.1"/>
        </g>
        <text x="44" y="52" text-anchor="middle" font-size="14" font-weight="800" fill="${accent}" font-family="Inter, sans-serif">GDPR</text>
      </svg>`,
    ISO: `
      <svg viewBox="0 0 88 88" class="h-11 w-11" aria-hidden="true">
        <circle cx="44" cy="44" r="40" fill="${white}" stroke="${violet}" stroke-width="3"/>
        <circle cx="44" cy="44" r="30" fill="rgba(99,102,241,0.14)" stroke="${violet}" stroke-width="2"/>
        <text x="44" y="40" text-anchor="middle" font-size="10" font-weight="800" fill="${violet}" font-family="Inter, sans-serif">ISO</text>
        <text x="44" y="51" text-anchor="middle" font-size="9" font-weight="700" fill="${violet}" font-family="JetBrains Mono, monospace">27001</text>
        <text x="44" y="61" text-anchor="middle" font-size="7" font-weight="700" fill="${slate}" font-family="JetBrains Mono, monospace">2022</text>
      </svg>`,
  };
  return badges[kind];
}

function navIcon(kind, className = "h-4 w-4") {
  const icons = {
    Home: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="${className}"><path d="M3.5 10.5 12 3l8.5 7.5"></path><path d="M5.5 9.8V20h13V9.8"></path></svg>`,
    Cases: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="${className}"><rect x="4.5" y="5" width="15" height="14" rx="2"></rect><path d="M8 3.5v3M16 3.5v3M8 10h8M8 14h5"></path></svg>`,
    Research: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="${className}"><circle cx="10.5" cy="10.5" r="5.5"></circle><path d="m15 15 5 5"></path></svg>`,
    "LegalGPT India": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="${className}"><path d="M12 4.5 6.5 7.7v6.6l5.5 3.2 5.5-3.2V7.7L12 4.5Z"></path><path d="M9.5 10.2h5M9.5 13.3h3.5"></path></svg>`,
    Calendar: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="${className}"><rect x="4.5" y="5.5" width="15" height="14" rx="2"></rect><path d="M8 3.5v4M16 3.5v4M4.5 9.5h15"></path></svg>`,
    Billing: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="${className}"><path d="M5 7.5h14v9H5z"></path><path d="M5 10.5h14M8 15h2"></path></svg>`,
    Settings: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="${className}"><circle cx="12" cy="12" r="3.2"></circle><path d="M19.4 15a1 1 0 0 0 .2 1.1l.1.1a2 2 0 0 1-2.8 2.8l-.1-.1a1 1 0 0 0-1.1-.2 1 1 0 0 0-.6.9V20a2 2 0 0 1-4 0v-.2a1 1 0 0 0-.6-.9 1 1 0 0 0-1.1.2l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1 1 0 0 0 .2-1.1 1 1 0 0 0-.9-.6H4a2 2 0 0 1 0-4h.2a1 1 0 0 0 .9-.6 1 1 0 0 0-.2-1.1l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1 1 0 0 0 1.1.2 1 1 0 0 0 .6-.9V4a2 2 0 0 1 4 0v.2a1 1 0 0 0 .6.9 1 1 0 0 0 1.1-.2l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1 1 0 0 0-.2 1.1 1 1 0 0 0 .9.6h.2a2 2 0 0 1 0 4h-.2a1 1 0 0 0-.9.6Z"></path></svg>`,
    bell: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="${className}"><path d="M15 17.5H5.5a1 1 0 0 1-.8-1.6l1.3-1.8V9.8a6 6 0 1 1 12 0v4.3l1.3 1.8a1 1 0 0 1-.8 1.6H15"></path><path d="M9.5 17.5a2.5 2.5 0 0 0 5 0"></path></svg>`,
  };
  return icons[kind];
}

function controlGlyph(kind, className = "h-4 w-4") {
  const icons = {
    mail: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" class="${className}"><rect x="4.5" y="6.5" width="15" height="11" rx="2"></rect><path d="m5.5 8 6.5 5 6.5-5"></path></svg>`,
    phone: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" class="${className}"><path d="M7.8 4.8h2.9l1 3-1.7 1.7a14.3 14.3 0 0 0 4.5 4.5l1.7-1.7 3 1v2.9a1.8 1.8 0 0 1-2 1.8 15.7 15.7 0 0 1-11.2-11.2 1.8 1.8 0 0 1 1.8-2Z"></path></svg>`,
    send: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" class="${className}"><path d="M4.5 11.5 19 4l-3.2 16-4.2-5-7.1-3.5Z"></path><path d="M11.6 15 19 4"></path></svg>`,
    mic: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" class="${className}"><rect x="9" y="3.5" width="6" height="10" rx="3"></rect><path d="M7 10.5v1a5 5 0 0 0 10 0v-1M12 16.5v4M9 20.5h6"></path></svg>`,
    search: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" class="${className}"><circle cx="10.5" cy="10.5" r="5.5"></circle><path d="m15 15 5 5"></path></svg>`,
    filter: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" class="${className}"><path d="M4.5 6.5h15M7.5 12h9M10 17.5h4"></path></svg>`,
    bell: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" class="${className}"><path d="M15 17.5H5.5a1 1 0 0 1-.8-1.6l1.3-1.8V9.8a6 6 0 1 1 12 0v4.3l1.3 1.8a1 1 0 0 1-.8 1.6H15"></path><path d="M9.5 17.5a2.5 2.5 0 0 0 5 0"></path></svg>`,
    calendar: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" class="${className}"><rect x="4.5" y="5.5" width="15" height="14" rx="2"></rect><path d="M8 3.5v4M16 3.5v4M4.5 9.5h15"></path></svg>`,
  };
  return icons[kind];
}

function authModeButton(mode, label, tone, active, group) {
  return `<button type="button" data-auth-managed="true" data-auth-mode="${mode}" data-action-select data-action-group="${group}" data-action-active="${active ? "true" : "false"}" aria-pressed="${active ? "true" : "false"}" class="focus-ring ${active ? "auth-tab-active" : ""} auth-mode-button min-h-[40px] flex-1 rounded-xl px-2.5 py-2 text-sm font-semibold ${active ? "" : "text-[var(--ls-text-primary)]"}"><span class="auth-mode-icon-shell" style="${iconShellStyle(tone)}">${controlGlyph(mode === "email" ? "mail" : "phone", "h-3.5 w-3.5")}</span><span>${label}</span></button>`;
}

function personaGlyph(kind, className = "h-full w-full") {
  const icons = {
    Citizen: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" class="${className}"><circle cx="12" cy="7" r="2.7"></circle><path d="M7.5 19v-1.2A3.8 3.8 0 0 1 11.3 14h1.4a3.8 3.8 0 0 1 3.8 3.8V19"></path><path d="M5.5 18.8h13"></path></svg>`,
    Student: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" class="${className}"><path d="M3.5 8.4 12 4.6l8.5 3.8L12 12.3 3.5 8.4Z"></path><path d="M7 10.4v3.4c0 .8 2.1 2.5 5 2.5s5-1.7 5-2.5v-3.4"></path><path d="M20.5 9.2v4.1"></path></svg>`,
    "Independent Lawyer": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" class="${className}"><path d="M12 4.5v12.8"></path><path d="M7 8.3 4.6 12.8h4.8L7 8.3Zm10 0-2.4 4.5h4.8L17 8.3ZM9.3 18.7h5.4"></path><path d="M8.5 6.7h7"></path></svg>`,
    Firm: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" class="${className}"><path d="M4.5 19.2h15"></path><path d="M6.2 19.2V9.2h11.6v10"></path><path d="M8 6.8h8"></path><path d="M9 11.5v4.7M12 11.5v4.7M15 11.5v4.7"></path></svg>`,
    Tutor: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" class="${className}"><path d="M5 6.8A2.3 2.3 0 0 1 7.3 4.5H19v13H7.3A2.3 2.3 0 0 0 5 19.8V6.8Z"></path><path d="M7.3 4.5h1.4v15.3H7.3A2.3 2.3 0 0 1 5 17.5"></path><path d="M11.5 8.7H16M11.5 12.1H16"></path></svg>`,
  };
  return icons[kind];
}

function controlIconButton(kind, label, tone = "accent", sizeClasses = "h-11 w-11 rounded-xl", iconClassName = "h-4 w-4") {
  const tones = {
    accent: { border: "rgba(43,108,176,0.28)", bg: "rgba(43,108,176,0.14)", color: "#2B6CB0" },
    amber: { border: "rgba(217,119,6,0.28)", bg: "rgba(217,119,6,0.14)", color: "#D97706" },
    violet: { border: "rgba(99,102,241,0.28)", bg: "rgba(99,102,241,0.14)", color: "#4F46E5" },
    emerald: { border: "rgba(5,150,105,0.28)", bg: "rgba(5,150,105,0.14)", color: "#059669" },
    rose: { border: "rgba(225,29,72,0.28)", bg: "rgba(225,29,72,0.14)", color: "#E11D48" },
  };
  const toneConfig = tones[tone] || tones.accent;
  return `<button type="button" title="${label}" aria-label="${label}" data-action-select data-action-active="false" class="focus-ring action-icon-button grid ${sizeClasses} shrink-0 place-items-center border" style="border-color:${toneConfig.border}; background:${toneConfig.bg}; color:${toneConfig.color};">${controlGlyph(kind, iconClassName)}<span class="sr-only">${label}</span></button>`;
}

function brandLogoImage(sizeClass = "w-[120px]") {
  return `<img src="./${logoFileName}" alt="Legal Saathi" class="${sizeClass} h-auto object-contain" />`;
}

function brandShell({ compact = false } = {}) {
  const logoSize = compact ? "w-[108px] sm:w-[120px]" : "w-[124px]";
  const copyClass = compact ? "text-[11px] leading-4" : "text-sm leading-5";
  return `
    <div class="min-w-0">
      ${brandLogoImage(logoSize)}
      <p class="mt-2 ${copyClass} text-[var(--ls-text-secondary)]">Enterprise legal operations for Bharat.</p>
    </div>
  `;
}

function makeButtonsInteractive(markup) {
  return markup.replace(/<(button|a)\b([^>]*class="[^"]*focus-ring[^"]*"[^>]*)>/g, (full, tag, attrs) => {
    if (/\b(data-(theme-option|pref-toggle|clear-notifications|close-popover|dismiss-priority|action-select)|href="#")\b/.test(attrs)) {
      return `<${tag}${attrs}>`;
    }
    const withType = tag === "button" && !/\btype=/.test(attrs) ? ` type="button"${attrs}` : attrs;
    if (/\bdata-action-select\b/.test(withType)) {
      return `<${tag}${withType}>`;
    }
    return `<${tag}${withType} data-action-select data-action-active="false">`;
  });
}

function addTintedCardClass(markup) {
  return markup.replace(/class="([^"]*?)bg-\[var\(--ls-surface-2\)\]([^"]*?)"/g, (full, before, after) => {
    const classes = `${before}bg-[var(--ls-surface-2)]${after}`;
    return /(?:^|\s)tinted-card(?:\s|$)/.test(classes) ? full : `class="${classes} tinted-card"`;
  });
}

function vaultActionGlyph(kind, className = "h-4 w-4") {
  const icons = {
    upload: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="${className}"><path d="M7 3.5h7l4.5 4.5v11.5A1.5 1.5 0 0 1 17 21H7A1.5 1.5 0 0 1 5.5 19.5V5A1.5 1.5 0 0 1 7 3.5Z"></path><path d="M14 3.5V8h4.5"></path><path d="M12 17V10"></path><path d="m9.5 12.5 2.5-2.5 2.5 2.5"></path></svg>`,
    open: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="${className}"><path d="M3.5 8.5A2.5 2.5 0 0 1 6 6h4l2 2h6A2.5 2.5 0 0 1 20.5 10.5v6A2.5 2.5 0 0 1 18 19H6a2.5 2.5 0 0 1-2.5-2.5v-8Z"></path><path d="M3.5 10h17"></path></svg>`,
    preview: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="${className}"><path d="M2.8 12s3.2-5.2 9.2-5.2 9.2 5.2 9.2 5.2-3.2 5.2-9.2 5.2S2.8 12 2.8 12Z"></path><circle cx="12" cy="12" r="2.5"></circle></svg>`,
    download: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="${className}"><path d="M12 4.5v10"></path><path d="m8.5 11 3.5 3.5 3.5-3.5"></path><path d="M5.5 18.5h13"></path></svg>`,
  };
  return icons[kind];
}

function vaultActionButton(kind, label, sizeClasses = "h-10 w-10 rounded-xl", iconClassName = "h-4 w-4") {
  const tones = {
    upload: { border: "rgba(43,108,176,0.26)", bg: "rgba(43,108,176,0.14)", color: "#2B6CB0" },
    open: { border: "rgba(217,119,6,0.28)", bg: "rgba(217,119,6,0.14)", color: "#D97706" },
    preview: { border: "rgba(99,102,241,0.28)", bg: "rgba(99,102,241,0.14)", color: "#4F46E5" },
    download: { border: "rgba(5,150,105,0.28)", bg: "rgba(5,150,105,0.14)", color: "#059669" },
  };
  const tone = tones[kind];
  return `<button title="${label}" aria-label="${label}" class="focus-ring grid ${sizeClasses} shrink-0 place-items-center border" style="border-color:${tone.border}; background:${tone.bg}; color:${tone.color};">${vaultActionGlyph(kind, iconClassName)}<span class="sr-only">${label}</span></button>`;
}

function vaultActionLink(kind, label, href, sizeClasses = "h-10 w-10 rounded-xl", iconClassName = "h-4 w-4") {
  const tones = {
    upload: { border: "rgba(43,108,176,0.26)", bg: "rgba(43,108,176,0.14)", color: "#2B6CB0" },
    open: { border: "rgba(217,119,6,0.28)", bg: "rgba(217,119,6,0.14)", color: "#D97706" },
    preview: { border: "rgba(99,102,241,0.28)", bg: "rgba(99,102,241,0.14)", color: "#4F46E5" },
    download: { border: "rgba(5,150,105,0.28)", bg: "rgba(5,150,105,0.14)", color: "#059669" },
  };
  const tone = tones[kind];
  return `<a href="${href}" title="${label}" aria-label="${label}" class="focus-ring grid ${sizeClasses} shrink-0 place-items-center border" style="border-color:${tone.border}; background:${tone.bg}; color:${tone.color};">${vaultActionGlyph(kind, iconClassName)}<span class="sr-only">${label}</span></a>`;
}

function audioTransportGlyph(kind, className = "h-4 w-4") {
  const icons = {
    play: `<svg viewBox="0 0 24 24" fill="currentColor" class="${className}"><path d="M8.2 6.4a1 1 0 0 1 1.5-.86l8.2 5.1a1.6 1.6 0 0 1 0 2.72l-8.2 5.1A1 1 0 0 1 8.2 17.6Z"></path></svg>`,
    pause: `<svg viewBox="0 0 24 24" fill="currentColor" class="${className}"><path d="M8 5.8A1.3 1.3 0 0 1 9.3 4.5h.4A1.3 1.3 0 0 1 11 5.8v12.4a1.3 1.3 0 0 1-1.3 1.3h-.4A1.3 1.3 0 0 1 8 18.2Zm5 0a1.3 1.3 0 0 1 1.3-1.3h.4A1.3 1.3 0 0 1 16 5.8v12.4a1.3 1.3 0 0 1-1.3 1.3h-.4A1.3 1.3 0 0 1 13 18.2Z"></path></svg>`,
    stop: `<svg viewBox="0 0 24 24" fill="currentColor" class="${className}"><rect x="7" y="7" width="10" height="10" rx="2"></rect></svg>`,
  };
  return icons[kind];
}

function audioTransportButton(kind, label, sizeClasses = "h-11 w-11 rounded-xl", iconClassName = "h-4 w-4") {
  const tones = {
    play: { border: "rgba(43,108,176,0.28)", bg: "rgba(43,108,176,0.14)", color: "#2B6CB0" },
    pause: { border: "rgba(217,119,6,0.28)", bg: "rgba(217,119,6,0.14)", color: "#D97706" },
    stop: { border: "rgba(220,38,38,0.28)", bg: "rgba(220,38,38,0.14)", color: "#DC2626" },
  };
  const tone = tones[kind];
  return `<button type="button" title="${label}" aria-label="${label}" class="focus-ring grid ${sizeClasses} shrink-0 place-items-center border" style="border-color:${tone.border}; background:${tone.bg}; color:${tone.color};">${audioTransportGlyph(kind, iconClassName)}<span class="sr-only">${label}</span></button>`;
}

function normalizeMobileActive(active) {
  const map = {
    AI: "LegalGPT India",
    Profile: "Settings",
  };
  return map[active] || active;
}

function shortTitle(title) {
  return title.replace("Legal Sathi — ", "").replace("Legal Saathi — ", "");
}

function greetingIconPlaceholder() {
  return `<span class="greeting-icon-badge" data-greeting-icon aria-hidden="true"></span>`;
}

function dateChip(dateLabel = "Friday", dateValue = "18 Apr 2026") {
  return `
    <div class="hero-date-chip">
      <span class="hero-date-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <rect x="4.5" y="5.5" width="15" height="14" rx="2"></rect>
          <path d="M8 3.5v4M16 3.5v4M4.5 9.5h15"></path>
        </svg>
      </span>
      <div>
        <p class="text-[9px] font-semibold uppercase tracking-[0.2em] text-[var(--ls-text-secondary)]">${dateLabel}</p>
        <p class="mono mt-1 text-xs text-[var(--ls-text-primary)]"><time>${dateValue}</time></p>
      </div>
    </div>
  `;
}

function splitFirstSection(markup) {
  const match = markup.trim().match(/^(\s*<section[\s\S]*?<\/section>)([\s\S]*)$/);
  if (!match) {
    return { first: "", rest: markup };
  }
  return { first: match[1], rest: match[2] };
}

function extractHeroParts(section) {
  const match = section.match(
    /<div class="flex[^"]*justify-between[^"]*">\s*<div>\s*<p[^>]*>([\s\S]*?)<\/p>\s*<h1[^>]*>([\s\S]*?)<\/h1>\s*<p[^>]*>([\s\S]*?)<\/p>\s*<\/div>\s*([\s\S]*?)\s*<\/div>\s*<\/section>/,
  );
  if (!match) {
    return null;
  }
  return {
    label: match[1].trim(),
    title: match[2].trim(),
    description: match[3].trim(),
    accessory: match[4].trim(),
  };
}

function heroAccessoryForMobile(file, accessory) {
  if (file.filename === "S-04-legal-pro.html") {
    return dateChip();
  }
  return accessory;
}

function buildMobileHero(file, section) {
  const hero = extractHeroParts(section);
  if (!hero) {
    return `
    <section class="mobile-hero-card panel rounded-[22px] p-3 shadow-panel">
      <div class="flex items-start justify-between gap-3">
        <div>
          <p class="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--ls-text-secondary)]">${shortTitle(file.title)}</p>
          <div class="mt-2 greeting-chip">
            ${greetingIconPlaceholder()}
            <div>
              <h1 data-greeting-text class="text-xl font-semibold text-[var(--ls-text-primary)]">Good Morning, Rajeev!</h1>
              <p class="mt-1 text-xs leading-5 text-[var(--ls-text-secondary)]">${file.description}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
  }
  return `
    <section class="mobile-hero-card panel rounded-[22px] p-3 shadow-panel">
      <div class="flex items-start justify-between gap-3">
        <div>
          <p class="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--ls-text-secondary)]">${hero.label}</p>
          <div class="mt-2 greeting-chip">
            ${greetingIconPlaceholder()}
            <div>
              <h1 data-greeting-text class="text-xl font-semibold text-[var(--ls-text-primary)]">Good Morning, Rajeev!</h1>
              <p class="mt-1 text-xs leading-5 text-[var(--ls-text-secondary)]">${hero.description}</p>
            </div>
          </div>
        </div>
        ${heroAccessoryForMobile(file, hero.accessory)}
      </div>
    </section>
  `;
}

function buildDesktopHero(file, section) {
  const hero = extractHeroParts(section);
  const compactHero = file.filename === "S-14-legal-pro.html";
  const heroSectionClass = compactHero
    ? "desktop-hero panel rounded-[24px] p-4 shadow-float"
    : "desktop-hero panel rounded-[28px] p-6 shadow-float";
  const heroGapClass = compactHero ? "flex items-start justify-between gap-5" : "flex items-start justify-between gap-6";
  const heroTitleClass = compactHero ? "text-2xl font-semibold text-[var(--ls-text-primary)]" : "text-3xl font-semibold text-[var(--ls-text-primary)]";
  const heroDescClass = compactHero
    ? "mt-2 max-w-2xl text-xs leading-5 text-[var(--ls-text-secondary)]"
    : "mt-3 max-w-3xl text-sm leading-6 text-[var(--ls-text-secondary)]";
  if (!hero) {
    return `
      <section class="${heroSectionClass}">
        <div class="${heroGapClass}">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--ls-text-secondary)]">${shortTitle(file.title)}</p>
            <div class="mt-2 greeting-chip">
              ${greetingIconPlaceholder()}
              <h1 data-greeting-text class="${heroTitleClass}">Good Morning, Rajeev!</h1>
            </div>
            <p class="${heroDescClass}">${file.description}</p>
          </div>
        </div>
      </section>
  `;
  }
  return `
      <section class="${heroSectionClass}">
        <div class="${heroGapClass}">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--ls-text-secondary)]">${hero.label}</p>
            <div class="mt-2 greeting-chip">
              ${greetingIconPlaceholder()}
              <h1 data-greeting-text class="${heroTitleClass}">Good Morning, Rajeev!</h1>
            </div>
            <p class="${heroDescClass}">${hero.description}</p>
          </div>
          ${hero.accessory}
        </div>
      </section>
  `;
}

function compactMetricGrid(markup) {
  const iconSet = [
    {
      outer: "linear-gradient(180deg, rgba(43,108,176,0.16), rgba(43,108,176,0.06))",
      inner: "rgba(43,108,176,0.16)",
      color: "#2B6CB0",
      icon: navIcon("Calendar", "h-4 w-4"),
    },
    {
      outer: "linear-gradient(180deg, rgba(217,119,6,0.16), rgba(217,119,6,0.06))",
      inner: "rgba(217,119,6,0.16)",
      color: "#D97706",
      icon: navIcon("Cases", "h-4 w-4"),
    },
    {
      outer: "linear-gradient(180deg, rgba(5,150,105,0.16), rgba(5,150,105,0.06))",
      inner: "rgba(5,150,105,0.16)",
      color: "#059669",
      icon: navIcon("Billing", "h-4 w-4"),
    },
    {
      outer: "linear-gradient(180deg, rgba(217,38,38,0.16), rgba(217,38,38,0.06))",
      inner: "rgba(217,38,38,0.16)",
      color: "#DC2626",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3.5 4.5 17h15L12 3.5Z"></path><path d="M12 9v3.5M12 16h.01"></path></svg>`,
    },
  ];

  return markup.replace(
    /<section class="grid gap-3 sm:grid-cols-3">([\s\S]*?)<\/section>/,
    (fullMatch, inner) => {
      const cards = Array.from(
        inner.matchAll(
          /<div class="panel rounded-\[20px\] p-4">\s*<p class="text-xs uppercase tracking-\[0\.18em\] text-\[var\(--ls-text-secondary\)\]">([\s\S]*?)<\/p>\s*<p class="mt-3 font-mono text-2xl text-\[var\(--ls-text-primary\)\]">([\s\S]*?)<\/p>\s*<p class="mt-2 text-xs text-\[var\(--ls-text-secondary\)\]">([\s\S]*?)<\/p>\s*<\/div>/g,
        ),
      );

      if (cards.length < 2) {
        return fullMatch;
      }

      return `
      <section class="grid grid-cols-2 gap-2">
        ${cards
          .map((card, index) => {
            const theme = iconSet[index % iconSet.length];
            const spanClass = index === cards.length - 1 && cards.length % 2 === 1 ? " col-span-2" : "";
            return `
              <div class="mobile-stat-card${spanClass}" style="background:${theme.outer};">
                <div class="mobile-stat-row">
                  <div class="mobile-stat-copy">
                    <span class="mobile-stat-icon" style="background:${theme.inner}; color:${theme.color};">
                      ${theme.icon}
                    </span>
                    <p class="text-[10px] uppercase tracking-[0.14em] text-[var(--ls-text-secondary)]">${card[1].trim()}</p>
                  </div>
                  <p class="mono text-sm text-[var(--ls-text-primary)]">${card[2].trim()}</p>
                </div>
                <p class="mobile-stat-meta">${card[3].trim()}</p>
              </div>
            `;
          })
          .join("")}
      </section>
      `;
    },
  );
}

function prepareMobileContent(file) {
  const normalized = addTintedCardClass(makeButtonsInteractive(file.mobile));
  const { first, rest } = splitFirstSection(normalized);
  if (file.useFirstSectionAsHero) {
    return {
      hero: first,
      body: rest,
    };
  }
  const hero = buildMobileHero(file, first);
  const bodyBase = extractHeroParts(first) ? rest : `${first}${rest}`;
  return {
    hero,
    body: compactMetricGrid(bodyBase),
  };
}

function prepareDesktopContent(file) {
  const normalized = addTintedCardClass(makeButtonsInteractive(file.desktop));
  const { first, rest } = splitFirstSection(normalized);
  if (file.useFirstSectionAsHero) {
    return {
      hero: first,
      body: rest,
    };
  }
  const hero = buildDesktopHero(file, first);
  return {
    hero,
    body: extractHeroParts(first) ? rest : `${first}${rest}`,
  };
}

function mobileDock(active) {
  const selected = normalizeMobileActive(active);
  const items = [
    ["Home", "rgba(43,108,176,0.18)", "#2B6CB0"],
    ["Cases", "rgba(217,119,6,0.18)", "#D97706"],
    ["Research", "rgba(13,148,136,0.18)", "#0F766E"],
    ["LegalGPT India", "rgba(79,70,229,0.18)", "#4F46E5"],
    ["Calendar", "rgba(225,29,72,0.18)", "#E11D48"],
    ["Billing", "rgba(5,150,105,0.18)", "#059669"],
    ["Settings", "rgba(71,85,105,0.18)", "#475569"],
  ];
  return `
    <nav aria-label="Primary mobile navigation" class="mobile-dock p-2">
      <div class="dock-grid">
        ${items
          .map(([label, bg, color]) => {
            const activeItem = label === selected;
            return `
              <button aria-label="${label}" ${activeItem ? 'aria-current="page"' : ""} class="dock-item focus-ring rounded-2xl" data-active="${activeItem ? "true" : "false"}">
                <span class="dock-icon-wrap" style="background:${bg}; color:${color};">
                  ${navIcon(label)}
                </span>
                <span class="dock-label">${label === "LegalGPT India" ? "LegalGPT" : label}</span>
              </button>
            `;
          })
          .join("")}
      </div>
    </nav>
  `;
}

function desktopRail(active, file) {
  if (file?.preAuthShell) {
    return preAuthDesktopRail(active, file);
  }
  const items = [
    "Home",
    "Cases",
    "Research",
    "LegalGPT India",
    "Calendar",
    "Billing",
    "Settings",
  ];
  return `
    <aside class="hidden md:flex md:w-[220px] md:flex-col md:border-r md:border-[var(--ls-border)] md:bg-[var(--ls-surface)]/90">
      <div class="border-b border-[var(--ls-border)] px-5 py-6">
        ${brandShell()}
      </div>
      <nav aria-label="Primary desktop navigation" class="flex-1 space-y-2 px-3 py-4">
        ${items
          .map(
            (label) => `
              <button aria-label="${label}" class="desktop-nav-button focus-ring" ${label === active ? 'data-active="true"' : ""}>
                <span class="desktop-nav-copy">
                  <span class="desktop-nav-icon" style="background:${NAV_ICON_PALETTE[label][0]}; color:${NAV_ICON_PALETTE[label][1]};">
                    ${navIcon(label)}
                  </span>
                  <span>${label}</span>
                </span>
                <span class="font-mono text-xs">${label === active ? "ON" : "↵"}</span>
              </button>
            `,
          )
          .join("")}
      </nav>
      <div class="border-t border-[var(--ls-border)] px-5 py-4">
        <div class="rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] p-4">
          <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Sync</p>
          <p class="mt-2 font-mono text-sm text-[var(--ls-text-primary)]">12 events queued</p>
          <p class="mt-1 text-xs text-[var(--ls-text-secondary)]">Last refresh 09:18 IST</p>
        </div>
      </div>
    </aside>
  `;
}

function stateSection({ emptyTitle, emptyBody, emptyJson, errorText, offlineText }) {
  return `
    <section class="space-y-4 rounded-[24px] border border-[var(--ls-border)] bg-[var(--ls-surface)]/72 p-4 md:p-6">
      <div>
        <p class="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--ls-text-secondary)]">UX states</p>
        <h2 class="mt-2 text-lg font-semibold text-[var(--ls-text-primary)]">Loading, empty, error, and offline coverage</h2>
      </div>
      <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div class="rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-bg)]/65 p-4">
          <p class="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--ls-text-secondary)]">Loading</p>
          <div class="animate-pulse space-y-3" aria-hidden="true">
            <div class="h-4 w-3/4 rounded bg-[var(--ls-skeleton)]"></div>
            <div class="h-4 w-1/2 rounded bg-[var(--ls-skeleton)]"></div>
            <div class="h-24 rounded-2xl bg-[var(--ls-skeleton)]"></div>
          </div>
        </div>
        <div class="rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-bg)]/65 p-4 text-center">
          <p class="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--ls-text-secondary)]">Empty</p>
          <div class="py-6">
            <p class="font-mono text-sm text-[var(--ls-text-secondary)]">// ${emptyTitle}</p>
            <p class="mt-2 text-sm text-[var(--ls-text-secondary)]">${emptyBody}</p>
            <p class="mt-2 font-mono text-xs text-[var(--ls-text-secondary)]">${emptyJson}</p>
            <button class="focus-ring mt-4 min-h-[44px] rounded-lg bg-[var(--ls-accent)] px-4 py-2 font-mono text-xs text-white">initialize()</button>
          </div>
        </div>
        <div class="rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-bg)]/65 p-4">
          <p class="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--ls-text-secondary)]">Error</p>
          <div class="rounded-lg border border-[var(--ls-error)] bg-[var(--ls-error)]/10 p-4">
            <p class="font-mono text-sm text-[#FC8181]">ERR: ${errorText}</p>
            <button class="focus-ring mt-3 min-h-[44px] font-mono text-xs text-[#FC8181] underline">retry()</button>
          </div>
        </div>
        <div class="rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-bg)]/65 p-4">
          <p class="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--ls-text-secondary)]">Offline</p>
          <div class="rounded-lg border border-[#D97706] bg-[#FEF3C7] p-4" role="alert" aria-live="assertive">
            <p class="text-sm text-[#92400E]">${offlineText}</p>
            <button class="focus-ring mt-3 min-h-[44px] text-sm text-[#92400E] underline">Retry</button>
          </div>
        </div>
      </div>
    </section>
  `;
}

function accessibilityPanel(extra) {
  return `
    <section class="rounded-[24px] border border-[var(--ls-border)] bg-[var(--ls-surface)]/72 p-4 md:p-6">
      <p class="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--ls-text-secondary)]">Accessibility</p>
      <h2 class="mt-2 text-lg font-semibold text-[var(--ls-text-primary)]">Interaction and compliance notes</h2>
      <ul class="mt-4 space-y-2 text-sm text-[var(--ls-text-secondary)]">
        <li>Primary text <span class="font-mono text-[var(--ls-text-primary)]">#E2E8F0</span> on background <span class="font-mono text-[var(--ls-text-primary)]">#0F1923</span> is <span class="font-mono text-[var(--ls-text-primary)]">14.39:1</span>.</li>
        <li>Secondary text <span class="font-mono text-[var(--ls-text-primary)]">#90A4B7</span> on background <span class="font-mono text-[var(--ls-text-primary)]">#0F1923</span> is <span class="font-mono text-[var(--ls-text-primary)]">6.91:1</span>.</li>
        <li>White text on accent <span class="font-mono text-[var(--ls-text-primary)]">#2B6CB0</span> is <span class="font-mono text-[var(--ls-text-primary)]">5.42:1</span>.</li>
        <li>All buttons, pills, and table actions meet the <span class="font-mono text-[var(--ls-text-primary)]">44px</span> minimum target size.</li>
        <li>Keyboard focus uses a <span class="font-mono text-[var(--ls-text-primary)]">2px</span> accent ring with offset.</li>
        ${extra}
      </ul>
    </section>
  `;
}

function themeIcon(type, className = "h-5 w-5") {
  const icons = {
    light: `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="${className}">
        <circle cx="12" cy="12" r="4.2"></circle>
        <path d="M12 2.75v2.1M12 19.15v2.1M4.93 4.93l1.49 1.49M17.58 17.58l1.49 1.49M2.75 12h2.1M19.15 12h2.1M4.93 19.07l1.49-1.49M17.58 6.42l1.49-1.49"></path>
      </svg>
    `,
    dark: `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="${className}">
        <path d="M20.2 14.1A8.6 8.6 0 0 1 9.9 3.8a8.85 8.85 0 1 0 10.3 10.3Z"></path>
      </svg>
    `,
    system: `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="${className}">
        <rect x="3.5" y="4.5" width="17" height="11.5" rx="2"></rect>
        <path d="M8.5 19.5h7M12 16.5v3"></path>
      </svg>
    `,
  };
  return icons[type];
}

function notificationsControl() {
  return `
    <details class="notifications-popover relative">
      <summary aria-label="Open notifications" class="notify-button focus-ring cursor-pointer">
        ${navIcon("bell", "h-5 w-5")}
        <span data-notification-count class="notify-badge">4</span>
      </summary>
      <div class="notify-panel panel absolute right-0 top-full mt-2 rounded-[18px] p-2.5 shadow-float">
        <div class="flex items-center justify-between gap-3">
          <div>
            <p class="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--ls-text-secondary)]">Notifications</p>
            <p data-notification-summary class="mt-1 text-xs text-[var(--ls-text-primary)]"><span class="mono">4</span> new updates</p>
          </div>
          <div class="flex items-center gap-1">
            <button type="button" data-clear-notifications class="focus-ring min-h-[32px] rounded-lg px-2.5 text-[11px] font-medium text-[var(--ls-accent)]">Clear all</button>
            <button type="button" data-close-popover="notifications" aria-label="Close notifications" class="focus-ring grid h-8 w-8 place-items-center rounded-lg text-[var(--ls-text-secondary)]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><path d="m6 6 12 12M18 6 6 18"></path></svg>
            </button>
          </div>
        </div>
        <div data-notification-list class="mt-3">
          <div class="notify-item">
            <p class="text-[11px] font-semibold text-[var(--ls-text-primary)]">Court 32 moved up by <span class="mono">18m</span></p>
            <p class="mt-1 text-[10px] leading-[1.35] text-[var(--ls-text-secondary)]">Sharma v. State of Maharashtra · Delhi High Court</p>
          </div>
          <div class="notify-item">
            <p class="text-[11px] font-semibold text-[var(--ls-text-primary)]">NCLT Mumbai uploaded a new order</p>
            <p class="mt-1 text-[10px] leading-[1.35] text-[var(--ls-text-secondary)]">Apex Builders matter refreshed at <span class="mono">08:57</span></p>
          </div>
          <div class="notify-item">
            <p class="text-[11px] font-semibold text-[var(--ls-text-primary)]">Reminder due in <span class="mono">2h</span></p>
            <p class="mt-1 text-[10px] leading-[1.35] text-[var(--ls-text-secondary)]">Rao Exports arbitration prep note is still pending</p>
          </div>
          <div class="notify-item">
            <p class="text-[11px] font-semibold text-[var(--ls-text-primary)]">Bench assembled</p>
            <p class="mt-1 text-[10px] leading-[1.35] text-[var(--ls-text-secondary)]">Apex Builders v. RERA is now ready in virtual court</p>
          </div>
        </div>
      </div>
    </details>
  `;
}

function priorityBannerMobile() {
  return `
    <div class="priority-banner critical-banner sticky top-3 z-50 mb-3 rounded-xl px-3 py-1.5 shadow-panel" role="alert" aria-live="assertive">
      <div class="flex items-center justify-between gap-3">
        <p class="text-[10px] leading-[1.2] text-[var(--ls-critical-text)]">Priority alert · Delhi High Court Court 32 is running <span class="mono">18m</span> ahead of schedule for Sharma v. State of Maharashtra</p>
        <div class="flex shrink-0 items-center gap-1">
          <button class="focus-ring min-h-[32px] text-[10px] font-medium text-[var(--ls-critical-text)] underline">View</button>
          <button type="button" data-dismiss-priority aria-label="Dismiss priority alert" class="focus-ring grid h-8 w-8 place-items-center rounded-lg text-[var(--ls-critical-text)]">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><path d="m6 6 12 12M18 6 6 18"></path></svg>
          </button>
        </div>
      </div>
    </div>
  `;
}

function priorityBannerDesktop() {
  return `
    <div class="priority-banner critical-banner sticky top-0 z-50 border-b px-5 py-1.5" role="alert" aria-live="assertive">
      <div class="mx-auto flex max-w-[1440px] items-center justify-between gap-4">
        <p class="text-[10px] leading-[1.2] text-[var(--ls-critical-text)]">Priority alert · Delhi High Court Court 32 is running <span class="mono">18m</span> ahead of schedule for Sharma v. State of Maharashtra</p>
        <div class="flex shrink-0 items-center gap-2">
          <button class="focus-ring min-h-[32px] text-[10px] font-medium text-[var(--ls-critical-text)] underline">Open alert</button>
          <button type="button" data-dismiss-priority aria-label="Dismiss priority alert" class="focus-ring grid h-8 w-8 place-items-center rounded-lg text-[var(--ls-critical-text)]">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><path d="m6 6 12 12M18 6 6 18"></path></svg>
          </button>
        </div>
      </div>
    </div>
  `;
}

function mobileUtilityBar(file) {
  if (file?.mobileUtilityOverride) {
    return file.mobileUtilityOverride;
  }
  if (file?.preAuthShell) {
    return preAuthMobileUtilityBar();
  }
  return `
    <section class="mobile-utility-card panel rounded-[24px] p-3 shadow-panel">
      <div class="flex items-center justify-between gap-3">
        ${brandShell({ compact: true })}
        <div class="flex shrink-0 items-center gap-2">
          ${notificationsControl()}
          ${appearancePopoverMobile()}
        </div>
      </div>
    </section>
  `;
}

function appearancePopoverMobile() {
  return `
    <details class="appearance-popover relative">
      <summary aria-label="Open appearance controls" class="focus-ring grid h-11 w-11 cursor-pointer place-items-center rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)]">
        <div data-theme-preview data-current-theme="dark" class="theme-logo-shell theme-logo-mobile">
          <div class="theme-logo-core">
            <span data-mode="light" class="theme-preview-icon">${themeIcon("light", "h-4 w-4")}</span>
            <span data-mode="dark" class="theme-preview-icon">${themeIcon("dark", "h-4 w-4")}</span>
            <span data-mode="system" class="theme-preview-icon">${themeIcon("system", "h-4 w-4")}</span>
          </div>
        </div>
      </summary>
      <div class="panel absolute right-0 top-full mt-2 w-[184px] rounded-[20px] p-2 shadow-float">
        <p class="px-2 pt-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--ls-text-secondary)]">Appearance</p>
        <div class="mt-2 grid grid-cols-3 gap-2">
          <button type="button" data-theme-option="light" aria-label="Switch to light mode" aria-pressed="false" class="theme-toggle-btn focus-ring min-h-[44px] rounded-xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] px-0">
            ${themeIcon("light", "h-4 w-4")}
          </button>
          <button type="button" data-theme-option="dark" aria-label="Switch to dark mode" aria-pressed="false" class="theme-toggle-btn focus-ring min-h-[44px] rounded-xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] px-0">
            ${themeIcon("dark", "h-4 w-4")}
          </button>
          <button type="button" data-theme-option="system" aria-label="Use system theme" aria-pressed="false" class="theme-toggle-btn focus-ring min-h-[44px] rounded-xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] px-0">
            ${themeIcon("system", "h-4 w-4")}
          </button>
        </div>
      </div>
    </details>
  `;
}

function themeControls() {
  return themeControlsForFile();
}

function themeControlsForFile(file = null) {
  if (file?.desktopToolbarOverride) {
    return file.desktopToolbarOverride;
  }
  if (file?.preAuthShell) {
    return preAuthDesktopHeader();
  }
  return `
    <section class="desktop-toolbar panel rounded-[20px] p-3 shadow-panel">
      <div class="flex items-center justify-between gap-4">
        <div class="flex items-center gap-3">
          ${brandShell({ compact: true })}
        </div>
        <div class="flex items-center gap-3">
          ${notificationsControl()}
          <div class="theme-toggle-group grid grid-cols-3 gap-2 rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] p-1">
            <button type="button" data-theme-option="light" aria-label="Switch to light mode" aria-pressed="false" class="theme-toggle-btn focus-ring min-h-[44px] min-w-[44px] rounded-xl px-3">
              ${themeIcon("light", "h-4 w-4")}
              <span class="sr-only">Light mode</span>
            </button>
            <button type="button" data-theme-option="dark" aria-label="Switch to dark mode" aria-pressed="false" class="theme-toggle-btn focus-ring min-h-[44px] min-w-[44px] rounded-xl px-3">
              ${themeIcon("dark", "h-4 w-4")}
              <span class="sr-only">Dark mode</span>
            </button>
            <button type="button" data-theme-option="system" aria-label="Use system theme" aria-pressed="false" class="theme-toggle-btn focus-ring min-h-[44px] min-w-[44px] rounded-xl px-3">
              ${themeIcon("system", "h-4 w-4")}
              <span class="sr-only">System theme</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  `;
}

function mobileDrawer(title, subtitle, content) {
  return `
    <details class="panel rounded-[24px] p-4 shadow-panel">
      <summary class="drawer-summary focus-ring rounded-xl">
        <div>
          <p class="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--ls-text-secondary)]">${title}</p>
          <p class="mt-1 text-sm text-[var(--ls-text-primary)]">${subtitle}</p>
        </div>
      </summary>
      <div class="mt-4">
        ${content}
      </div>
    </details>
  `;
}

function preAuthMetadataLine() {
  return `
    <div class="metadata-line" aria-label="Current date and system metadata">
      <span class="metadata-chip metadata-chip-primary mono">19 Apr 2026</span>
      <span class="metadata-chip metadata-chip-amber mono">IST</span>
      <span class="metadata-chip metadata-chip-violet mono">ap-south-1</span>
      <span class="metadata-chip metadata-chip-emerald mono">RLS</span>
    </div>
  `;
}

function preAuthNotificationsControl({ iconSize = "h-4 w-4", shellClass = "h-12 w-12 rounded-2xl", tone = "rose" } = {}) {
  return `
    <details class="notifications-popover relative">
      <summary aria-label="Open notifications panel. Authentication required." class="notify-button focus-ring cursor-pointer ${shellClass}" style="${iconShellStyle(tone)}">
        ${navIcon("bell", iconSize)}
      </summary>
      <div class="notify-panel panel absolute right-0 top-full mt-2 rounded-[18px] p-3 shadow-float">
        <div class="flex items-center justify-between gap-3">
          <div>
            <p class="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--ls-text-secondary)]">Notifications</p>
            <p class="mt-1 text-xs text-[var(--ls-text-primary)]">Authentication required</p>
          </div>
          <button type="button" data-close-popover="notifications" aria-label="Close notifications" class="focus-ring grid h-8 w-8 place-items-center rounded-lg text-[var(--ls-text-secondary)]">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><path d="m6 6 12 12M18 6 6 18"></path></svg>
          </button>
        </div>
        <div class="mt-3 rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] p-4">
          <p class="font-mono text-sm text-[var(--ls-text-secondary)]">// Sign in to view alerts</p>
          <p class="mt-2 text-xs leading-5 text-[var(--ls-text-secondary)]">Court alerts, reminders, and billing notices become available after successful authentication.</p>
        </div>
      </div>
    </details>
  `;
}

function appearancePopoverCompact({ iconSize = "h-4 w-4", shellClass = "h-12 w-12 rounded-2xl", panelWidth = "w-[168px]", tone = "amber" } = {}) {
  return `
    <details class="appearance-popover relative">
      <summary aria-label="Open appearance controls. Current mode available." class="focus-ring grid ${shellClass} cursor-pointer place-items-center" style="${iconShellStyle(tone)}">
        <div data-theme-preview data-current-theme="dark" class="theme-preview-trigger">
          <span data-mode="light" class="theme-preview-icon-static">${themeIcon("light", iconSize)}</span>
          <span data-mode="dark" class="theme-preview-icon-static">${themeIcon("dark", iconSize)}</span>
          <span data-mode="system" class="theme-preview-icon-static">${themeIcon("system", iconSize)}</span>
        </div>
      </summary>
      <div class="panel absolute right-0 top-full mt-2 ${panelWidth} rounded-[20px] p-2 shadow-float">
        <p class="px-2 pt-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--ls-text-secondary)]">Appearance</p>
        <div class="mt-2 grid grid-cols-3 gap-2">
          <button type="button" data-theme-option="light" aria-label="Switch to light mode" aria-pressed="false" class="theme-toggle-btn focus-ring min-h-[44px] rounded-xl border px-0" style="${iconShellStyle("amber")}">
            ${themeIcon("light", iconSize)}
          </button>
          <button type="button" data-theme-option="dark" aria-label="Switch to dark mode" aria-pressed="false" class="theme-toggle-btn focus-ring min-h-[44px] rounded-xl border px-0" style="${iconShellStyle("accent")}">
            ${themeIcon("dark", iconSize)}
          </button>
          <button type="button" data-theme-option="system" aria-label="Use system theme" aria-pressed="false" class="theme-toggle-btn focus-ring min-h-[44px] rounded-xl border px-0" style="${iconShellStyle("violet")}">
            ${themeIcon("system", iconSize)}
          </button>
        </div>
      </div>
    </details>
  `;
}

function preAuthMobileUtilityBar() {
  return `
    <section class="mobile-utility-card header-card card rounded-[22px] px-4 py-3 shadow-panel">
      <div class="flex items-start justify-between gap-3">
        <div class="min-w-0 flex-1 preauth-mobile-brand">
          ${brandLogoImage("w-[84px] max-w-[70%]")}
          <p class="mt-1.5 text-[10px] leading-4 text-[var(--ls-text-secondary)]">Enterprise legal operations for Bharat.</p>
        </div>
        <div class="flex shrink-0 items-center gap-2">
          ${preAuthNotificationsControl({ iconSize: "h-4 w-4", shellClass: "h-12 w-12 rounded-2xl", tone: "rose" })}
          ${appearancePopoverCompact({ iconSize: "h-4 w-4", shellClass: "h-12 w-12 rounded-2xl", panelWidth: "w-[160px]", tone: "amber" })}
        </div>
      </div>
      <div class="mt-2.5 border-t border-[var(--ls-border)] pt-2.5 text-center">
        <p class="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">S-02 · Secure access</p>
        <p class="mt-1 text-sm font-semibold text-[var(--ls-text-primary)]">Sign in to continue</p>
        <p class="mt-1 px-1 text-[11px] leading-4 text-[var(--ls-text-secondary)]">Pre-auth entry for citizen, student, lawyer, firm, and tutor workspaces.</p>
      </div>
    </section>
  `;
}

function preAuthDesktopHeader() {
  return `
    <section class="desktop-toolbar header-card rounded-[20px] p-4 shadow-panel preauth-header-card">
      <div class="flex items-start justify-between gap-5">
        <div class="min-w-0">
          <p class="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Pre-auth entry</p>
          <h1 class="mt-2 text-[26px] font-semibold text-[var(--ls-text-primary)]">Welcome to Legal Saathi</h1>
          <p class="mt-2 text-sm leading-6 text-[var(--ls-text-secondary)]">Sign in to continue. Workspace routing, tenant binding, and verification checks begin only after authentication.</p>
        </div>
        <div class="flex shrink-0 flex-col items-end gap-2">
          <div class="flex items-center gap-2">
            ${preAuthNotificationsControl({ iconSize: "h-4 w-4", shellClass: "h-12 w-12 rounded-2xl", tone: "rose" })}
            ${appearancePopoverCompact({ iconSize: "h-4 w-4", shellClass: "h-12 w-12 rounded-2xl", panelWidth: "w-[168px]", tone: "amber" })}
          </div>
          ${preAuthMetadataLine()}
        </div>
      </div>
    </section>
  `;
}

function preAuthDesktopRail(active, file = null) {
  const items = ["Home", "Cases", "Research", "LegalGPT India", "Calendar", "Billing", "Settings"];
  return `
    <aside class="preauth-rail sidebar hidden md:flex md:flex-col md:sticky md:top-0 md:h-screen md:overflow-y-auto" data-preauth-rail>
      <div class="preauth-rail-header relative border-b border-[var(--ls-border)] px-4 py-4 pb-6">
        <div class="min-w-0 pr-14">
          <div class="preauth-brand-block min-w-0">
            ${brandLogoImage("w-[90px] max-w-full lg:w-[98px]")}
            <p class="preauth-brand-copy mt-2 text-[11px] leading-4 text-[var(--ls-text-secondary)]">Enterprise legal operations for Bharat.</p>
          </div>
        </div>
        <button type="button" aria-label="Collapse authentication sidebar" data-preauth-sidebar-toggle class="preauth-rail-toggle focus-ring absolute right-4 bottom-0 grid h-11 w-11 shrink-0 place-items-center rounded-2xl border" style="${iconShellStyle("slate")}">
          <svg data-rail-toggle-open viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><path d="M14.5 5.5 8 12l6.5 6.5"></path></svg>
          <svg data-rail-toggle-closed viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="hidden h-4 w-4"><path d="M9.5 5.5 16 12l-6.5 6.5"></path></svg>
        </button>
      </div>
      <nav aria-label="Primary desktop navigation" class="space-y-1 px-3 pb-3 pt-6">
        ${items
          .map((label) => {
            const isActive = file?.preAuthHighlightActive && label === active;
            return `
            <button
              type="button"
              aria-label="${label}. Authentication required."
              aria-disabled="true"
              title="Authentication Required"
              data-preauth-route
              data-auth-tooltip="Authentication Required"
              class="preauth-nav-button focus-ring${isActive ? " is-active" : ""}"${isActive ? ' aria-current="page"' : ""}>
              <span class="desktop-nav-copy">
                <span class="desktop-nav-icon" style="background:${NAV_ICON_PALETTE[label][0]}; color:${NAV_ICON_PALETTE[label][1]};">
                  ${navIcon(label)}
                </span>
                <span class="preauth-nav-label">${label}</span>
              </span>
            </button>`;
          })
          .join("")}
      </nav>
      <div class="gate-info border-t border-[var(--ls-border)] px-4 py-4">
        <div class="card rounded-2xl p-3">
          <p class="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Authentication gate</p>
          <p class="mt-2 text-xs leading-5 text-[var(--ls-text-secondary)]">Routes unlock after successful sign-in and explicit persona selection.</p>
        </div>
      </div>
    </aside>
  `;
}

function authInfoPopover() {
  return `
    <details class="info-popover relative">
      <summary aria-label="Authentication details" class="focus-ring grid h-11 w-11 cursor-pointer place-items-center rounded-2xl border" style="${iconShellStyle("accent")}">
        <span class="text-base font-semibold">i</span>
      </summary>
      <div class="info-panel panel absolute right-0 top-full z-30 mt-2 w-[280px] rounded-[20px] p-4 shadow-float">
        <p class="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Auth details</p>
        <ul class="mt-3 space-y-2 text-xs leading-5 text-[var(--ls-text-secondary)]">
          <li>Email/password, phone OTP, Google, and LinkedIn all lead to the same post-auth routing check.</li>
          <li>Bar Council verification begins after sign-in and only if the selected persona requires it.</li>
          <li>DPDP consent, residency handling, and tenant binding stay post-auth or user-triggered.</li>
        </ul>
      </div>
    </details>
  `;
}

function socialAuthButton(kind, label, tone = "accent") {
  const icon =
    kind === "google"
      ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><path d="M20 12.2c0-.7-.1-1.3-.2-1.9H12v3.6h4.5a4 4 0 0 1-1.7 2.6v2.2h2.8c1.6-1.5 2.4-3.6 2.4-6.5Z"></path><path d="M12 21c2.2 0 4.1-.7 5.5-2l-2.8-2.2c-.8.5-1.7.8-2.7.8-2.1 0-3.9-1.4-4.6-3.4H4.5v2.3A9 9 0 0 0 12 21Z"></path><path d="M7.4 14.2a5.4 5.4 0 0 1 0-4.4V7.5H4.5a9 9 0 0 0 0 8.9l2.9-2.2Z"></path><path d="M12 6.6c1.2 0 2.3.4 3.2 1.2l2.4-2.4A8.9 8.9 0 0 0 4.5 7.5l2.9 2.3C8.1 8 9.9 6.6 12 6.6Z"></path></svg>`
      : `<svg viewBox="0 0 24 24" fill="currentColor" class="h-4 w-4"><path d="M6.9 8.2A1.7 1.7 0 1 1 6.9 4.8a1.7 1.7 0 0 1 0 3.4ZM5.4 9.6h3V19h-3V9.6Zm4.8 0H13v1.3h.1c.4-.8 1.4-1.6 2.9-1.6 3.1 0 3.7 2 3.7 4.7V19h-3v-4.2c0-1 0-2.3-1.4-2.3s-1.6 1.1-1.6 2.2V19h-3V9.6Z"></path></svg>`;
  return `<button type="button" data-action-select data-action-active="false" class="focus-ring auth-compact-button inline-flex min-h-[40px] items-center justify-center gap-1.5 rounded-xl chip px-2.5 py-2 text-[11px] font-semibold text-[var(--ls-text-primary)]"><span class="grid h-7 w-7 place-items-center rounded-lg border" style="${iconShellStyle(tone)}">${icon}</span><span class="truncate">${label}</span></button>`;
}

function preAuthAuthCard({ desktop = false, outerClass = "", outerStyle = "" } = {}) {
  const sectionClassBase = desktop ? "card preauth-auth-card rounded-[28px] p-6 shadow-float" : "card preauth-auth-card rounded-[22px] p-3 shadow-panel";
  const sectionClass = `${sectionClassBase} ${outerClass}`.trim();
  const layoutClass = desktop ? "grid gap-6 xl:grid-cols-[1.08fr,0.92fr]" : "space-y-3";
  const contentGapClass = desktop ? "mt-1" : "mt-0.5";
  const headingCopy = desktop
    ? `<p class="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--ls-text-secondary)]">Authentication</p>
       <h2 class="mt-0.5 text-2xl font-semibold text-[var(--ls-text-primary)]">Access your workspace</h2>
       <p class="mt-0.5 text-sm leading-6 text-[var(--ls-text-secondary)]">Choose a persona, confirm language, and authenticate without exposing any post-login workspace state.</p>`
    : `<p class="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--ls-text-secondary)]">Authentication</p>
       <h2 class="mt-0.5 text-lg font-semibold text-[var(--ls-text-primary)]">Access your workspace</h2>
       <p class="mt-0.5 text-[13px] leading-5 text-[var(--ls-text-secondary)]">Choose a persona, confirm language, and authenticate securely.</p>`;
  return `
    <section class="${sectionClass}" ${outerStyle ? `style="${outerStyle}"` : ""} data-auth-surface>
      <div class="flex items-start justify-between gap-4">
        <div>${headingCopy}</div>
        ${authInfoPopover()}
      </div>
      <div class="${contentGapClass} ${layoutClass}">
        <div class="${desktop ? "space-y-4" : "space-y-3"}">
          <div>
            <p class="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Choose persona</p>
            <div class="${desktop ? "mt-3 grid grid-cols-5 gap-2" : "mt-2.5 grid grid-cols-3 gap-1.5 md:grid-cols-5 md:gap-2"}">
              ${[
                ["Citizen", "Citizen"],
                ["Student", "Student"],
                ["Independent Lawyer", "Lawyer"],
                ["Firm", "Firm"],
                ["Tutor", "Tutor"],
              ]
                .map(
                  ([value, label]) => `<button type="button" title="${value}" aria-label="${value}" data-auth-managed="true" data-auth-persona="${value}" data-action-select data-action-group="${desktop ? "s01-desktop-persona" : "s01-mobile-persona"}" data-action-active="false" aria-pressed="false" class="focus-ring preauth-persona-button chip">
                    <span class="preauth-persona-icon-shell" style="${iconShellStyle(PERSONA_TONE_MAP[value])}">
                      <span class="preauth-persona-icon" aria-hidden="true">${personaGlyph(value)}</span>
                    </span>
                    <span class="preauth-persona-label">${label}</span>
                  </button>`,
                )
                .join("")}
            </div>
          </div>
          <div>
            <p class="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Language</p>
            <div class="mt-3 flex flex-wrap gap-2">
              ${["English", "Hindi", "Marathi", "Tamil"]
                .map((label, index) => `<button type="button" data-auth-managed="true" data-auth-language="${label}" data-action-select data-action-group="${desktop ? "s01-desktop-language" : "s01-mobile-language"}" data-action-active="${index === 0 ? "true" : "false"}" aria-pressed="${index === 0 ? "true" : "false"}" class="focus-ring chip min-h-[44px] rounded-full px-4 text-xs font-semibold text-[var(--ls-text-primary)]">${label}</button>`)
                .join("")}
            </div>
          </div>
          <div class="surface rounded-[24px] ${desktop ? "p-4" : "p-3"} tinted-card">
            <div class="flex items-center gap-1.5 rounded-2xl surface p-[3px]">
              ${authModeButton("email", "Email", "accent", true, desktop ? "s01-desktop-mode" : "s01-mobile-mode")}
              ${authModeButton("phone", "Phone OTP", "emerald", false, desktop ? "s01-desktop-mode" : "s01-mobile-mode")}
            </div>
            <div class="mt-3 space-y-3.5" data-auth-panel="email">
              <label class="block">
                <span class="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Work email</span>
                <input data-auth-email type="email" autocomplete="email" class="focus-ring mt-1.5 block min-h-[42px] w-full rounded-xl border border-[var(--ls-border)] bg-[var(--ls-surface)] px-4 py-2.5 text-sm text-[var(--ls-text-primary)]" placeholder="rajeev@legalsaathi.in" />
              </label>
              <label class="block">
                <span class="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Password</span>
                <input data-auth-password type="password" autocomplete="current-password" class="focus-ring mt-1.5 block min-h-[42px] w-full rounded-xl border border-[var(--ls-border)] bg-[var(--ls-surface)] px-4 py-2.5 text-sm text-[var(--ls-text-primary)]" placeholder="Minimum 8 characters" />
              </label>
              <div class="mt-3 grid grid-cols-3 gap-2">
                <button type="button" data-auth-cta="email" disabled aria-disabled="true" class="focus-ring auth-compact-button auth-signup-button min-h-[40px] rounded-xl bg-[#3CB043] px-2 py-2 text-[11px] font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40"><span class="grid h-7 w-7 place-items-center rounded-lg border border-white/20 bg-white/10">${controlGlyph("mail", "h-3.5 w-3.5")}</span><span class="truncate">SignUp</span></button>
                ${socialAuthButton("google", "Google", "accent")}
                ${socialAuthButton("linkedin", "LinkedIn", "violet")}
              </div>
            </div>
            <div class="mt-3 space-y-3.5" data-auth-panel="phone" hidden>
              <div data-auth-phone-step="request" class="space-y-3.5">
                <label class="block">
                  <span class="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Mobile number</span>
                  <input data-auth-phone type="tel" inputmode="numeric" autocomplete="tel" class="focus-ring mt-1.5 block min-h-[42px] w-full rounded-xl border border-[var(--ls-border)] bg-[var(--ls-surface)] px-4 py-2.5 text-sm text-[var(--ls-text-primary)]" placeholder="+91 98765 43210" />
                </label>
                <button type="button" data-auth-cta="phone" disabled aria-disabled="true" class="focus-ring min-h-[40px] w-full rounded-xl bg-[var(--ls-accent)] px-4 py-2.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40">Send OTP</button>
              </div>
              <div data-auth-phone-step="verify" class="space-y-3.5" hidden>
                <label class="block">
                  <span class="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Enter OTP</span>
                  <input data-auth-otp type="text" inputmode="numeric" autocomplete="one-time-code" class="focus-ring mt-1.5 block min-h-[42px] w-full rounded-xl border border-[var(--ls-border)] bg-[var(--ls-surface)] px-4 py-2.5 text-sm text-[var(--ls-text-primary)]" placeholder="6-digit code" />
                </label>
                <button type="button" data-auth-cta="verify" disabled aria-disabled="true" class="focus-ring min-h-[40px] w-full rounded-xl bg-[var(--ls-accent)] px-4 py-2.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40">Verify</button>
              </div>
            </div>
            <p data-auth-live role="status" aria-live="polite" class="mt-3 min-h-[20px] text-xs text-[var(--ls-text-secondary)]">Choose a persona to begin secure sign-in.</p>
          </div>
        </div>
        <div class="surface rounded-[24px] p-4 md:p-5 tinted-card">
          <p class="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Persona preview</p>
          <div class="mt-4 grid gap-3">
            <div class="card rounded-2xl p-4 tinted-card">
              <p data-auth-preview-title class="text-sm font-semibold text-[var(--ls-text-primary)]">Select a persona</p>
              <p data-auth-preview-copy class="mt-2 text-sm leading-6 text-[var(--ls-text-secondary)]">Choose Citizen, Student, Lawyer, Firm, or Tutor to preview the post-auth workspace outcome.</p>
            </div>
            <div class="card rounded-2xl p-4 text-center tinted-card">
              <p class="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Deterministic routing</p>
              <p class="mt-2 text-sm leading-6 text-[var(--ls-text-secondary)]">Selected persona and language are cached only after explicit interaction and are applied post-auth without exposing tenant or matter state.</p>
              <div class="mt-3 grid grid-cols-3 gap-3 place-items-center md:grid-cols-5">
                ${[
                  ["PCI", "Payment"],
                  ["ISO", "ISO 27001"],
                  ["SOC", "SOC 2"],
                  ["GDPR", "GDPR"],
                  ["DPDP", "DPDP"],
                ]
                  .map(
                    ([badge, label]) => `<div class="flex min-h-[74px] w-full max-w-[88px] flex-col items-center justify-start gap-1.5 text-center">
                      ${complianceBadge(badge)}
                      <span class="text-[10px] font-semibold leading-4 text-[var(--ls-text-secondary)]">${label}</span>
                    </div>`,
                  )
                  .join("")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

function preAuthStateScript(storageKey = "legal-saathi-s01-rail-collapsed") {
  return `
        const initPreAuthEntry = () => {
          const desktopShell = document.querySelector("[data-desktop-shell='preauth']");
          const railToggle = document.querySelector("[data-preauth-sidebar-toggle]");
          const railStorageKey = "${storageKey}";
          const applyRailState = (collapsed) => {
            if (!desktopShell) return;
            desktopShell.setAttribute("data-rail-collapsed", collapsed ? "true" : "false");
            if (railToggle) {
              railToggle.setAttribute("aria-label", collapsed ? "Expand authentication sidebar" : "Collapse authentication sidebar");
            }
          };
          if (desktopShell) {
            applyRailState(localStorage.getItem(railStorageKey) === "true");
          }
          if (railToggle) {
            railToggle.addEventListener("click", () => {
              const nextState = desktopShell?.getAttribute("data-rail-collapsed") !== "true";
              localStorage.setItem(railStorageKey, nextState ? "true" : "false");
              applyRailState(nextState);
            });
          }
          document.querySelectorAll("[data-preauth-route]").forEach((button) => {
            button.addEventListener("click", (event) => {
              event.preventDefault();
            });
          });

          const personaCopy = {
            Citizen: ["Citizen workspace preview", "Lawyer discovery, consultation booking, secure document uploads, and neutral pre-consultation prompts become available after sign-in."],
            Student: ["Student workspace preview", "Moot preparation, internship tracking, quiz mode, and research digests unlock after successful authentication."],
            "Independent Lawyer": ["Independent lawyer preview", "Morning brief, case management, court alerts, consultations, and billing open after sign-in and verification steps."],
            Firm: ["Firm workspace preview", "Collaborative drafting, matter boards, approvals, and utilization visibility route only after authenticated team access."],
            Tutor: ["Tutor workspace preview", "Session scheduling, student ratings, payments, and teaching analytics route into the post-auth tutor workspace."],
          };
          const genericPreview = ["Select a persona", "Choose Citizen, Student, Lawyer, Firm, or Tutor to preview the post-auth workspace outcome."];

          document.querySelectorAll("[data-auth-surface]").forEach((surface, index) => {
            const modeButtons = Array.from(surface.querySelectorAll("[data-auth-mode]"));
            const personaButtons = Array.from(surface.querySelectorAll("[data-auth-persona]"));
            const languageButtons = Array.from(surface.querySelectorAll("[data-auth-language]"));
            const emailPanel = surface.querySelector('[data-auth-panel="email"]');
            const phonePanel = surface.querySelector('[data-auth-panel="phone"]');
            const phoneRequestPanel = surface.querySelector('[data-auth-phone-step="request"]');
            const phoneVerifyPanel = surface.querySelector('[data-auth-phone-step="verify"]');
            const emailInput = surface.querySelector("[data-auth-email]");
            const passwordInput = surface.querySelector("[data-auth-password]");
            const phoneInput = surface.querySelector("[data-auth-phone]");
            const otpInput = surface.querySelector("[data-auth-otp]");
            const emailCta = surface.querySelector('[data-auth-cta="email"]');
            const phoneCta = surface.querySelector('[data-auth-cta="phone"]');
            const verifyCta = surface.querySelector('[data-auth-cta="verify"]');
            const live = surface.querySelector("[data-auth-live]");
            const previewTitle = surface.querySelector("[data-auth-preview-title]");
            const previewCopy = surface.querySelector("[data-auth-preview-copy]");
            let activeAuthMode = "email";
            let phoneOtpRequested = false;
            let activePersona = null;

            const setHiddenState = (element, hidden) => {
              if (!element) return;
              element.hidden = hidden;
              element.classList.toggle("hidden", hidden);
            };

            const setGroupState = (buttons, activeValue, attr) => {
              buttons.forEach((button) => {
                const active = !!activeValue && button.getAttribute(attr) === activeValue;
                setActionState(button, active);
              });
            };

            const updatePreview = () => {
              const [title, copy] = activePersona ? personaCopy[activePersona] || genericPreview : genericPreview;
              if (previewTitle) previewTitle.textContent = title;
              if (previewCopy) previewCopy.textContent = copy;
            };

            const syncPhoneStep = () => {
              setHiddenState(phoneRequestPanel, phoneOtpRequested);
              setHiddenState(phoneVerifyPanel, !phoneOtpRequested);
            };

            const validate = () => {
              const hasPersona = !!activePersona;
              const emailValid = hasPersona && !!emailInput?.value.match(/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/) && (passwordInput?.value || "").length >= 8;
              const phoneValid = hasPersona && !!(phoneInput?.value || "").replace(/\\D/g, "").match(/^\\d{10}$/);
              const otpValid = hasPersona && !!(otpInput?.value || "").replace(/\\D/g, "").match(/^\\d{6}$/);
              if (emailCta) {
                emailCta.disabled = !emailValid;
                emailCta.setAttribute("aria-disabled", emailValid ? "false" : "true");
              }
              if (phoneCta) {
                phoneCta.disabled = !phoneValid;
                phoneCta.setAttribute("aria-disabled", phoneValid ? "false" : "true");
              }
              if (verifyCta) {
                verifyCta.disabled = !otpValid;
                verifyCta.setAttribute("aria-disabled", otpValid ? "false" : "true");
              }
              if (!live) return;
              if (!hasPersona) {
                live.textContent = "Choose a persona to begin secure sign-in.";
                return;
              }
              if (activeAuthMode === "email") {
                if ((emailInput?.value || "").length === 0 && (passwordInput?.value || "").length === 0) {
                  live.textContent = "Enter your work email and password to continue.";
                } else if (!emailValid) {
                  live.textContent = "Enter a valid email address and a password with at least 8 characters.";
                } else {
                  live.textContent = "Email sign-in is ready.";
                }
              } else {
                if (!phoneOtpRequested && (phoneInput?.value || "").length === 0) {
                  live.textContent = "Select a persona and enter a 10-digit mobile number to receive OTP.";
                } else if (!phoneOtpRequested && !phoneValid) {
                  live.textContent = "Enter a valid 10-digit mobile number.";
                } else if (phoneOtpRequested && (otpInput?.value || "").length === 0) {
                  live.textContent = "Enter the 6-digit OTP sent to your mobile number.";
                } else if (phoneOtpRequested && !otpValid) {
                  live.textContent = "Enter a valid 6-digit OTP.";
                } else if (!phoneOtpRequested) {
                  live.textContent = "Phone OTP is ready.";
                } else {
                  live.textContent = "OTP verification is ready.";
                }
              }
            };

            modeButtons.forEach((button) => {
              button.addEventListener("click", () => {
                activeAuthMode = button.getAttribute("data-auth-mode") || "email";
                setGroupState(modeButtons, activeAuthMode, "data-auth-mode");
                setHiddenState(emailPanel, activeAuthMode !== "email");
                setHiddenState(phonePanel, activeAuthMode !== "phone");
                if (activeAuthMode === "phone") {
                  syncPhoneStep();
                }
                validate();
              });
            });

            personaButtons.forEach((button) => {
              button.addEventListener("click", () => {
                const nextPersona = button.getAttribute("data-auth-persona") || "Citizen";
                activePersona = activePersona === nextPersona ? null : nextPersona;
                if (activePersona) {
                  sessionStorage.setItem("legal-saathi-s01-persona", activePersona);
                } else {
                  sessionStorage.removeItem("legal-saathi-s01-persona");
                }
                setGroupState(personaButtons, activePersona, "data-auth-persona");
                updatePreview();
                validate();
              });
            });

            languageButtons.forEach((button) => {
              button.addEventListener("click", () => {
                const activeLanguage = button.getAttribute("data-auth-language") || "English";
                localStorage.setItem("legal-saathi-s01-language", activeLanguage);
                setGroupState(languageButtons, activeLanguage, "data-auth-language");
              });
            });

            [emailInput, passwordInput, phoneInput, otpInput].forEach((input) => input?.addEventListener("input", validate));

            surface.querySelectorAll("[data-auth-cta]").forEach((button) => {
              button.addEventListener("click", () => {
                if (button.disabled) return;
                if (button.getAttribute("data-auth-cta") === "phone") {
                  phoneOtpRequested = true;
                  syncPhoneStep();
                  if (live) live.textContent = "OTP sent. Enter the 6-digit code to verify your mobile number.";
                  validate();
                  return;
                }
                if (button.getAttribute("data-auth-cta") === "verify") {
                  if (live) live.textContent = "OTP verified. Continue to the selected workspace after secure validation.";
                  return;
                }
                if (live) live.textContent = "Authentication initialized. Continue to the selected workspace after secure validation.";
              });
            });

            const storedPersona = sessionStorage.getItem("legal-saathi-s01-persona");
            if (storedPersona && personaButtons.some((button) => button.getAttribute("data-auth-persona") === storedPersona)) {
              activePersona = storedPersona;
              setGroupState(personaButtons, activePersona, "data-auth-persona");
            }
            const storedLanguage = localStorage.getItem("legal-saathi-s01-language");
            if (storedLanguage && languageButtons.some((button) => button.getAttribute("data-auth-language") === storedLanguage)) {
              setGroupState(languageButtons, storedLanguage, "data-auth-language");
            }
            setGroupState(modeButtons, activeAuthMode, "data-auth-mode");
            setHiddenState(emailPanel, false);
            setHiddenState(phonePanel, true);
            syncPhoneStep();
            updatePreview();
            validate();
          });
        };
  `;
}

function renderPage(file) {
  const mobileContent = prepareMobileContent(file);
  const desktopContent = prepareDesktopContent(file);
  return `<!DOCTYPE html>
<!--
  GENERATED FILE - DO NOT EDIT THIS FILE IF YOU WANT CHANGES TO SURVIVE A REBUILD.
  Source of truth: /Users/rajeevbarnwal/Desktop/Codes/Nyay/scripts/generate-legal-pro-batch1.mjs
  Screen: ${file.filename}
  Rebuild screen outputs:
    node /Users/rajeevbarnwal/Desktop/Codes/Nyay/scripts/generate-legal-pro-batch1.mjs
  Rebuild prototype copy:
    node /Users/rajeevbarnwal/Desktop/Codes/Nyay/scripts/build-final-user-prototype.mjs
-->
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${file.title}</title>
    <meta name="description" content="${file.description}" />
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
      tailwind.config = {
        theme: {
          extend: {
            colors: {
              ls: {
                bg: "#0F1923",
                surface: "#162030",
                "surface-2": "#1D2D40",
                border: "#2A3F57",
                accent: "#2B6CB0",
                "accent-soft": "#8DB8FF",
                "text-primary": "#E2E8F0",
                "text-secondary": "#90A4B7",
                success: "#2F855A",
                error: "#C53030",
                warning: "#D97706"
              }
            },
            fontFamily: {
              sans: ["Inter", "system-ui", "sans-serif"],
              mono: ["JetBrains Mono", "ui-monospace", "monospace"]
            },
            boxShadow: {
              panel: "0 22px 48px var(--ls-shadow-panel)",
              float: "0 32px 80px var(--ls-shadow-float)"
            }
          }
        }
      }
    </script>
    <style>
      :root {
        --ls-bg: #F4F7FB;
        --ls-surface: #FFFFFF;
        --ls-surface-2: #F2F6FC;
        --ls-border: #D5E0EE;
        --ls-accent: #2B6CB0;
        --ls-accent-soft: #1D4E89;
        --ls-text-primary: #12202F;
        --ls-text-secondary: #56697E;
        --ls-success: #2F855A;
        --ls-error: #C53030;
        --ls-warning: #D97706;
        --ls-shadow-panel: rgba(15, 23, 42, 0.12);
        --ls-shadow-float: rgba(15, 23, 42, 0.16);
        --ls-grid: rgba(86, 105, 126, 0.08);
        --ls-skeleton: #D9E4F2;
        --ls-critical-bg: #FEE2E2;
        --ls-critical-border: #FCA5A5;
        --ls-critical-text: #7F1D1D;
        --ls-mobile-toolbar-top: 56px;
        --ls-desktop-card-top: 56px;
        --logo-base: 120px;
        color-scheme: light;
      }
      :root[data-theme="dark"] {
        --ls-bg: #0F1923;
        --ls-surface: #162030;
        --ls-surface-2: #223244;
        --ls-border: #2A3F57;
        --ls-accent: #2B6CB0;
        --ls-accent-soft: #8DB8FF;
        --ls-text-primary: #E2E8F0;
        --ls-text-secondary: #90A4B7;
        --ls-success: #2F855A;
        --ls-error: #C53030;
        --ls-warning: #D97706;
        --ls-shadow-panel: rgba(3, 7, 18, 0.35);
        --ls-shadow-float: rgba(3, 7, 18, 0.42);
        --ls-grid: rgba(144, 164, 183, 0.08);
        --ls-skeleton: #1D2D40;
        --ls-critical-bg: #7F1D1D;
        --ls-critical-border: #B91C1C;
        --ls-critical-text: #FECACA;
        --ls-mobile-toolbar-top: 56px;
        --ls-desktop-card-top: 56px;
        --logo-base: 120px;
        color-scheme: dark;
      }
      :root[data-theme="system"] {
        color-scheme: light dark;
      }
      :root[data-priority-dismissed="true"] {
        --ls-mobile-toolbar-top: 12px;
        --ls-desktop-card-top: 16px;
      }
      @media (prefers-color-scheme: dark) {
        :root[data-theme="system"] {
          --ls-bg: #0F1923;
          --ls-surface: #162030;
          --ls-surface-2: #1D2D40;
          --ls-border: #2A3F57;
          --ls-accent: #2B6CB0;
          --ls-accent-soft: #8DB8FF;
          --ls-text-primary: #E2E8F0;
          --ls-text-secondary: #90A4B7;
          --ls-success: #2F855A;
          --ls-error: #C53030;
          --ls-warning: #D97706;
          --ls-shadow-panel: rgba(3, 7, 18, 0.35);
          --ls-shadow-float: rgba(3, 7, 18, 0.42);
          --ls-grid: rgba(144, 164, 183, 0.08);
          --ls-skeleton: #1D2D40;
          --ls-critical-bg: #7F1D1D;
          --ls-critical-border: #B91C1C;
          --ls-critical-text: #FECACA;
          --ls-mobile-toolbar-top: 56px;
          --ls-desktop-card-top: 56px;
          --logo-base: 120px;
        }
      }
      html { scroll-behavior: smooth; }
      body {
        background:
          radial-gradient(circle at top right, rgba(43, 108, 176, 0.16), transparent 28%),
          linear-gradient(180deg, rgba(43, 108, 176, 0.04), transparent 22%),
          var(--ls-bg);
        color: var(--ls-text-primary);
        font-family: Inter, system-ui, sans-serif;
        transition: background-color 180ms ease, color 180ms ease;
      }
      body[data-screen-id="s01-preauth"],
      body[data-screen-id="s02-auth"] {
        min-height: 100dvh;
      }
      body[data-screen-id="s01-preauth"] .min-h-screen,
      body[data-screen-id="s02-auth"] .min-h-screen {
        min-height: 100dvh;
      }
      .mono, .data-value, time, code, pre { font-family: "JetBrains Mono", ui-monospace, monospace; }
      .card,
      .surface,
      .chip {
        background: var(--ls-surface);
        border: 1px solid var(--ls-border);
      }
      .header-card,
      .sidebar {
        background: var(--ls-bg);
        border: 1px solid var(--ls-border);
      }
      .panel {
        background: linear-gradient(180deg, color-mix(in srgb, var(--ls-surface) 94%, transparent), color-mix(in srgb, var(--ls-surface) 98%, transparent));
        border: 1px solid var(--ls-border);
      }
      .tinted-card {
        background: linear-gradient(180deg, color-mix(in srgb, var(--ls-accent) 9%, var(--ls-surface-2)), color-mix(in srgb, var(--ls-surface-2) 92%, transparent)) !important;
      }
      .panel-muted { background: rgba(29, 45, 64, 0.48); border: 1px solid rgba(42, 63, 87, 0.9); }
      .focus-ring:focus-visible { outline: 2px solid var(--ls-accent); outline-offset: 2px; }
      .btn-active,
      .persona-selected,
      .auth-tab-active {
        background: var(--ls-accent);
        color: var(--ls-text-primary);
        border-color: transparent;
      }
      [data-action-select] {
        cursor: pointer;
        transition: background-color 140ms ease, color 140ms ease, border-color 140ms ease, box-shadow 140ms ease;
      }
      [data-action-select][data-action-active="true"] {
        background: var(--ls-accent) !important;
        border-color: transparent !important;
        color: #ffffff !important;
        box-shadow: 0 14px 30px rgba(43, 108, 176, 0.22);
      }
      [data-action-select][data-action-active="true"] .action-icon-shell {
        border-color: rgba(255,255,255,0.22) !important;
        background: rgba(255,255,255,0.10) !important;
        color: #ffffff !important;
      }
      [data-action-select][data-action-active="true"] span,
      [data-action-select][data-action-active="true"] svg {
        color: inherit;
      }
      .theme-logo-shell {
        position: relative;
        display: grid;
        place-items: center;
        width: 52px;
        height: 52px;
        overflow: hidden;
        border-radius: 999px;
        border: 1px solid var(--ls-border);
        background: linear-gradient(145deg, rgba(43, 108, 176, 0.22), rgba(43, 108, 176, 0.06));
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
      }
      .theme-logo-shell::before {
        content: "";
        position: absolute;
        inset: -34%;
        background: conic-gradient(from 90deg, transparent 12%, rgba(43, 108, 176, 0.54), transparent 62%);
        animation: ls-orbit 7s linear infinite;
      }
      .theme-logo-shell::after {
        content: "";
        position: absolute;
        inset: 7px;
        border-radius: 999px;
        background: radial-gradient(circle at 30% 25%, rgba(255,255,255,0.24), transparent 45%), var(--ls-surface);
        border: 1px solid rgba(255, 255, 255, 0.04);
      }
      .theme-logo-shell[data-current-theme="light"] {
        background: linear-gradient(145deg, rgba(255, 201, 76, 0.34), rgba(43, 108, 176, 0.10));
      }
      .theme-logo-shell[data-current-theme="dark"] {
        background: linear-gradient(145deg, rgba(43, 108, 176, 0.28), rgba(15, 25, 35, 0.18));
      }
      .theme-logo-shell[data-current-theme="system"] {
        background: linear-gradient(145deg, rgba(43, 108, 176, 0.22), rgba(47, 133, 90, 0.14));
      }
      .theme-logo-core {
        position: relative;
        z-index: 1;
        display: grid;
        place-items: center;
        width: 100%;
        height: 100%;
      }
      .theme-preview-icon {
        position: absolute;
        display: grid;
        place-items: center;
        color: var(--ls-text-primary);
        opacity: 0;
        transform: translateY(4px) scale(0.78);
        transition: opacity 180ms ease, transform 200ms ease, color 180ms ease;
      }
      [data-theme-preview][data-current-theme="light"] [data-mode="light"],
      [data-theme-preview][data-current-theme="dark"] [data-mode="dark"],
      [data-theme-preview][data-current-theme="system"] [data-mode="system"] {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
      .theme-toggle-btn {
        display: grid;
        place-items: center;
        color: var(--ls-text-secondary);
        transition: background-color 140ms ease, color 140ms ease, border-color 140ms ease;
      }
      .theme-toggle-btn svg {
        pointer-events: none;
      }
      .theme-toggle-btn[data-active="true"] {
        background: var(--ls-accent);
        color: #ffffff;
        box-shadow: 0 10px 24px rgba(43, 108, 176, 0.24);
      }
      .theme-preview-trigger {
        position: relative;
        display: grid;
        place-items: center;
        width: 100%;
        height: 100%;
        color: var(--ls-text-primary);
      }
      .metadata-line {
        display: inline-flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: flex-end;
        gap: 6px;
      }
      .metadata-chip {
        display: inline-flex;
        min-height: 28px;
        align-items: center;
        border-radius: 999px;
        padding: 0 10px;
        font-size: 11px;
        color: var(--ls-text-primary);
      }
      .metadata-chip-primary {
        background: linear-gradient(90deg, color-mix(in srgb, var(--ls-accent) 18%, var(--ls-surface)), color-mix(in srgb, var(--ls-accent-soft) 18%, var(--ls-surface)));
        border: 1px solid color-mix(in srgb, var(--ls-accent) 42%, var(--ls-border));
      }
      .metadata-chip-amber {
        background: linear-gradient(90deg, rgba(217,119,6,0.16), rgba(217,119,6,0.08));
        border: 1px solid rgba(217,119,6,0.28);
        color: ${toneStyle("amber").color};
      }
      .metadata-chip-violet {
        background: linear-gradient(90deg, rgba(99,102,241,0.16), rgba(99,102,241,0.08));
        border: 1px solid rgba(99,102,241,0.28);
        color: ${toneStyle("violet").color};
      }
      .metadata-chip-emerald {
        background: linear-gradient(90deg, rgba(5,150,105,0.16), rgba(5,150,105,0.08));
        border: 1px solid rgba(5,150,105,0.28);
        color: ${toneStyle("emerald").color};
      }
      .theme-preview-icon-static {
        position: absolute;
        display: grid;
        place-items: center;
        opacity: 0;
        transform: scale(0.82);
        transition: opacity 160ms ease, transform 160ms ease;
      }
      [data-theme-preview][data-current-theme="light"] .theme-preview-icon-static[data-mode="light"],
      [data-theme-preview][data-current-theme="dark"] .theme-preview-icon-static[data-mode="dark"],
      [data-theme-preview][data-current-theme="system"] .theme-preview-icon-static[data-mode="system"] {
        opacity: 1;
        transform: scale(1);
      }
      details > summary { list-style: none; }
      details > summary::-webkit-details-marker { display: none; }
      .appearance-popover[open] summary,
      .notifications-popover[open] summary {
        background: var(--ls-surface-2);
      }
      .appearance-popover,
      .notifications-popover {
        position: relative;
        z-index: 70;
      }
      .theme-logo-mobile {
        width: 38px;
        height: 38px;
      }
      .theme-logo-mobile::after {
        inset: 5px;
      }
      .critical-banner {
        border: 1px solid var(--ls-critical-border);
        background: var(--ls-critical-bg);
      }
      .notify-button {
        position: relative;
        display: grid;
        place-items: center;
        min-width: 44px;
        min-height: 44px;
        border-radius: 16px;
        border: 1px solid var(--ls-border);
        padding: 0;
        background: var(--ls-surface-2);
        color: var(--ls-text-primary);
      }
      .notify-badge {
        position: absolute;
        right: -4px;
        top: -4px;
        display: grid;
        min-width: 20px;
        height: 20px;
        place-items: center;
        border-radius: 999px;
        background: var(--ls-error);
        padding-inline: 5px;
        font-family: "JetBrains Mono", ui-monospace, monospace;
        font-size: 10px;
        line-height: 1;
        color: #ffffff;
        box-shadow: 0 6px 14px rgba(197, 48, 48, 0.28);
      }
      .notify-panel {
        width: min(224px, calc(100vw - 40px));
        z-index: 90;
      }
      .notify-item {
        border: 1px solid var(--ls-border);
        background: var(--ls-surface-2);
        border-radius: 16px;
        padding: 9px;
      }
      .notify-item + .notify-item {
        margin-top: 8px;
      }
      .kpi-spark span { display: block; width: 6px; border-radius: 999px; background: linear-gradient(180deg, rgba(141,184,255,0.92), rgba(43,108,176,0.25)); }
      .wave span { display: block; width: 4px; border-radius: 999px; background: linear-gradient(180deg, rgba(141,184,255,1), rgba(43,108,176,0.18)); }
      .grid-pattern {
        background-image:
          linear-gradient(var(--ls-grid) 1px, transparent 1px),
          linear-gradient(90deg, var(--ls-grid) 1px, transparent 1px);
        background-size: 24px 24px;
      }
      .mobile-dock {
        position: fixed;
        left: 16px;
        right: 16px;
        bottom: 12px;
        z-index: 60;
        border: 1px solid var(--ls-border);
        border-radius: 24px;
        background: var(--ls-surface);
        background: color-mix(in srgb, var(--ls-surface) 92%, transparent);
        backdrop-filter: blur(18px);
        box-shadow: 0 24px 60px var(--ls-shadow-float);
      }
      .dock-grid {
        display: grid;
        grid-template-columns: repeat(7, minmax(0, 1fr));
        gap: 4px;
      }
      .dock-item {
        position: relative;
        display: grid;
        justify-items: center;
        gap: 4px;
        min-height: 60px;
        padding: 8px 2px;
        border: 1px solid transparent;
        color: var(--ls-text-secondary);
        transition: transform 140ms ease, color 140ms ease, background-color 140ms ease, border-color 140ms ease;
      }
      .dock-item[data-active="true"] {
        color: var(--ls-text-primary);
        border-color: color-mix(in srgb, var(--ls-accent) 48%, var(--ls-border));
        background: linear-gradient(180deg, color-mix(in srgb, var(--ls-accent) 14%, var(--ls-surface)), color-mix(in srgb, var(--ls-accent) 7%, var(--ls-surface)));
        box-shadow: inset 0 1px 0 rgba(255,255,255,0.06), 0 10px 22px rgba(43, 108, 176, 0.12);
        transform: translateY(-1px);
      }
      .dock-item[data-active="true"] .dock-icon-wrap {
        transform: translateY(-2px) scale(1.04);
        box-shadow: 0 12px 24px rgba(43, 108, 176, 0.18);
      }
      .dock-item[data-active="true"] .dock-label {
        color: var(--ls-text-primary);
        font-weight: 700;
      }
      .dock-item[data-active="true"]::after {
        content: "";
        position: absolute;
        left: 50%;
        bottom: 4px;
        width: 18px;
        height: 3px;
        transform: translateX(-50%);
        border-radius: 999px;
        background: var(--ls-accent);
      }
      .dock-icon-wrap {
        display: grid;
        place-items: center;
        width: 32px;
        height: 32px;
        border-radius: 12px;
        transition: transform 140ms ease, box-shadow 140ms ease;
      }
      .dock-label {
        font-size: 9px;
        line-height: 1;
        letter-spacing: -0.01em;
        white-space: nowrap;
      }
      .mobile-sticky-stack {
        position: sticky;
        top: calc(var(--ls-mobile-toolbar-top) + 8px);
        z-index: 40;
        display: grid;
        gap: 12px;
        margin-bottom: 16px;
      }
      .desktop-sticky-stack {
        position: sticky;
        top: calc(var(--ls-desktop-card-top) + 8px);
        z-index: 40;
        display: grid;
        gap: 24px;
      }
      body[data-screen-id="s01-preauth"] .mobile-sticky-stack,
      body[data-screen-id="s02-auth"] .mobile-sticky-stack {
        top: 0;
        gap: 8px;
      }
      body[data-screen-id="s01-preauth"] .desktop-sticky-stack,
      body[data-screen-id="s02-auth"] .desktop-sticky-stack {
        top: 0;
        z-index: 20;
        gap: 10px;
      }
      body[data-screen-id="s02-auth"] .min-h-screen {
        padding-top: 0 !important;
      }
      .hero-date-chip {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        border-radius: 18px;
        border: 1px solid var(--ls-border);
        background: color-mix(in srgb, var(--ls-surface-2) 84%, transparent);
        padding: 8px 10px;
      }
      .hero-date-icon {
        display: grid;
        place-items: center;
        width: 28px;
        height: 28px;
        flex-shrink: 0;
        border-radius: 10px;
        background: linear-gradient(160deg, rgba(43, 108, 176, 0.18), rgba(245, 158, 11, 0.14));
        color: var(--ls-accent);
      }
      .greeting-chip {
        display: inline-flex;
        align-items: center;
        gap: 10px;
      }
      .greeting-icon-badge {
        display: grid;
        place-items: center;
        width: 42px;
        height: 42px;
        flex-shrink: 0;
        border-radius: 14px;
        border: 1px solid var(--ls-border);
        background: linear-gradient(160deg, rgba(245, 158, 11, 0.24), rgba(43, 108, 176, 0.14));
        color: #F59E0B;
        box-shadow: 0 10px 24px rgba(245, 158, 11, 0.14);
      }
      .greeting-icon-badge svg {
        width: 20px;
        height: 20px;
      }
      .mobile-hero-card {
        padding: 10px 12px;
      }
      .mobile-hero-card .greeting-icon-badge {
        width: 36px;
        height: 36px;
        border-radius: 12px;
      }
      .mobile-hero-card .greeting-icon-badge svg {
        width: 17px;
        height: 17px;
      }
      .mobile-hero-card [data-greeting-text] {
        font-size: 1.125rem;
        line-height: 1.35;
      }
      .mobile-hero-card .greeting-chip p {
        font-size: 11px;
        line-height: 1.35;
      }
      .desktop-nav-button {
        display: flex;
        min-height: 48px;
        width: 100%;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        border-radius: 12px;
        border: 1px solid transparent;
        padding-inline: 14px;
        text-align: left;
        font-size: 14px;
        font-weight: 500;
        color: var(--ls-text-secondary);
        transition: border-color 140ms ease, background-color 140ms ease, color 140ms ease;
      }
      .desktop-nav-button:hover {
        border-color: var(--ls-border);
        background: var(--ls-surface-2);
        color: var(--ls-text-primary);
      }
      .desktop-nav-button[data-active="true"] {
        border-color: color-mix(in srgb, var(--ls-accent) 65%, var(--ls-border));
        background: color-mix(in srgb, var(--ls-accent) 14%, var(--ls-surface));
        color: var(--ls-text-primary);
      }
      .desktop-shell[data-desktop-shell="preauth"] {
        grid-template-columns: 220px minmax(0, 1fr);
        transition: grid-template-columns 160ms ease;
      }
      .desktop-shell[data-desktop-shell="preauth"][data-rail-collapsed="true"] {
        grid-template-columns: 88px minmax(0, 1fr);
      }
      .preauth-brand-block {
        transition: opacity 160ms ease, transform 160ms ease;
      }
      .preauth-brand-block img {
        max-width: calc(var(--logo-base) * 0.7);
        width: 100%;
      }
      .preauth-mobile-brand img {
        max-width: calc(var(--logo-base) * 0.75);
        margin-inline: 0;
      }
      .preauth-nav-button {
        position: relative;
        display: flex;
        min-height: 44px;
        width: 100%;
        align-items: center;
        justify-content: flex-start;
        border-radius: 12px;
        border: 1px solid var(--ls-border);
        background: var(--ls-surface);
        padding: 8px 10px;
        color: var(--ls-text-secondary);
        transition: border-color 140ms ease, background-color 140ms ease, color 140ms ease;
      }
      .preauth-nav-button.is-active {
        border-color: var(--ls-border);
      }
      .preauth-nav-button::after {
        content: attr(data-auth-tooltip);
        position: absolute;
        left: calc(100% + 12px);
        top: 50%;
        transform: translateY(-50%);
        opacity: 0;
        pointer-events: none;
        white-space: nowrap;
        border-radius: 10px;
        border: 1px solid var(--ls-border);
        background: var(--ls-surface);
        padding: 8px 10px;
        font-size: 11px;
        color: var(--ls-text-primary);
        box-shadow: 0 18px 36px var(--ls-shadow-panel);
        transition: opacity 140ms ease;
      }
      .preauth-nav-button:hover::after,
      .preauth-nav-button:focus-visible::after {
        opacity: 1;
      }
      .desktop-shell[data-desktop-shell="preauth"][data-rail-collapsed="true"] .preauth-nav-label,
      .desktop-shell[data-desktop-shell="preauth"][data-rail-collapsed="true"] .preauth-brand-copy {
        display: none;
      }
      .desktop-shell[data-desktop-shell="preauth"][data-rail-collapsed="true"] .preauth-brand-block img {
        width: 54px;
      }
      .desktop-shell[data-desktop-shell="preauth"][data-rail-collapsed="true"] .preauth-rail .desktop-nav-copy {
        justify-content: center;
      }
      .desktop-shell[data-desktop-shell="preauth"][data-rail-collapsed="true"] .preauth-nav-button {
        justify-content: center;
        padding-inline: 0;
      }
      .desktop-shell[data-desktop-shell="preauth"][data-rail-collapsed="true"] .preauth-rail .preauth-rail-header,
      .desktop-shell[data-desktop-shell="preauth"][data-rail-collapsed="true"] .preauth-rail .border-t {
        padding-inline: 12px;
      }
      .info-popover {
        position: relative;
      }
      .info-panel {
        display: none;
      }
      .info-popover:hover .info-panel,
      .info-popover:focus-within .info-panel,
      .info-popover[open] .info-panel {
        display: block;
      }
      .desktop-nav-copy {
        display: flex;
        min-width: 0;
        align-items: center;
        gap: 12px;
      }
      .desktop-nav-icon {
        display: grid;
        place-items: center;
        width: 32px;
        height: 32px;
        flex-shrink: 0;
        border-radius: 11px;
      }
      .preauth-rail .desktop-nav-icon {
        border: 1px solid color-mix(in srgb, currentColor 22%, var(--ls-border));
        box-shadow: 0 10px 20px -18px currentColor;
      }
      .preauth-header-card {
        position: sticky;
        top: 0;
        z-index: 20;
        background: var(--ls-bg);
        border-bottom: 1px solid var(--ls-border);
      }
      body[data-screen-id="s01-preauth"] .desktop-shell > main.grid-pattern {
        padding-top: 16px !important;
        background-color: color-mix(in srgb, var(--ls-bg) 76%, white 24%) !important;
        background-image:
          linear-gradient(rgba(144,164,183,0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(144,164,183,0.05) 1px, transparent 1px) !important;
        background-size: 24px 24px !important;
      }
      .gate-info {
        margin-top: auto;
        padding-bottom: 1.5rem;
      }
      .preauth-persona-button {
        display: grid;
        min-height: 44px;
        width: 100%;
        grid-template-rows: 30px 12px;
        justify-items: center;
        align-content: center;
        gap: 3px;
        border-radius: 18px;
        padding: 6px 4px;
        color: var(--ls-text-secondary);
        text-align: center;
      }
      .preauth-persona-icon-shell {
        display: grid;
        place-items: center;
        width: 30px;
        height: 30px;
        margin-inline: auto;
        border-radius: 12px;
        border: 1px solid transparent;
      }
      .preauth-persona-icon {
        display: grid;
        place-items: center;
        width: 16px;
        height: 16px;
        color: currentColor;
        line-height: 0;
      }
      .preauth-persona-label {
        display: block;
        min-height: 12px;
        width: 100%;
        font-size: 9.5px;
        line-height: 1.2;
        opacity: 0;
        visibility: hidden;
        color: currentColor;
        text-align: center;
        transition: opacity 140ms ease, visibility 140ms ease;
      }
      .preauth-persona-button[data-action-active="true"] {
        background: var(--ls-accent) !important;
        color: var(--ls-text-primary) !important;
        border-color: transparent !important;
        box-shadow: 0 18px 32px -24px var(--ls-accent);
      }
      .preauth-persona-button[data-action-active="true"] .preauth-persona-icon-shell {
        background: color-mix(in srgb, var(--ls-surface) 78%, transparent) !important;
        border-color: color-mix(in srgb, var(--ls-border) 72%, transparent) !important;
        color: var(--ls-text-primary) !important;
      }
      .preauth-persona-button[data-action-active="true"] .preauth-persona-label {
        opacity: 1;
        visibility: visible;
      }
      .preauth-auth-card {
        margin-top: 12px;
      }
      .auth-mode-button,
      .auth-signup-button,
      .auth-compact-button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }
      .auth-mode-button,
      .auth-signup-button {
        gap: 8px;
      }
      .auth-mode-icon-shell {
        display: grid;
        width: 24px;
        height: 24px;
        flex-shrink: 0;
        place-items: center;
        border-radius: 10px;
        border: 1px solid transparent;
      }
      .auth-compact-button {
        min-width: 0;
        gap: 6px;
      }
      .auth-compact-button span:last-child {
        min-width: 0;
      }
      .preauth-mobile-brand {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        text-align: left;
      }
      @media (min-width: 768px) {
        .preauth-persona-button {
          min-height: 46px;
          grid-template-rows: 30px 12px;
        }
        .preauth-persona-label {
          min-height: 0;
        }
        .preauth-persona-button[data-action-active="true"] {
          min-height: 46px;
        }
        .preauth-auth-card {
          margin-top: 20px;
        }
      }
      .desktop-nav-icon svg {
        width: 16px;
        height: 16px;
      }
      .mobile-stat-card {
        border-radius: 18px;
        border: 1px solid var(--ls-border);
        background: color-mix(in srgb, var(--ls-surface-2) 70%, var(--ls-surface));
        padding: 10px 12px;
        overflow: hidden;
      }
      .mobile-stat-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
      }
      .mobile-stat-copy {
        display: flex;
        min-width: 0;
        align-items: center;
        gap: 8px;
      }
      .mobile-stat-icon {
        display: grid;
        place-items: center;
        width: 24px;
        height: 24px;
        flex-shrink: 0;
        border-radius: 9px;
      }
      .mobile-stat-icon svg {
        width: 14px;
        height: 14px;
      }
      .mobile-stat-meta {
        margin-top: 6px;
        font-size: 10px;
        line-height: 1.25;
        color: var(--ls-text-secondary);
      }
      .drawer-summary {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        cursor: pointer;
      }
      .drawer-summary::after {
        content: "+";
        font-family: "JetBrains Mono", ui-monospace, monospace;
        font-size: 18px;
        color: var(--ls-text-secondary);
      }
      details[open] > .drawer-summary::after {
        content: "−";
      }
      .scrollbar-hide::-webkit-scrollbar { display: none; }
      .scrollbar-hide { scrollbar-width: none; -ms-overflow-style: none; }
      .desktop-stack > section:nth-of-type(2) {
        position: static;
      }
      @keyframes ls-orbit {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
    </style>
    ${file.extraStyle ? `<style>${file.extraStyle}</style>` : ""}
    <!-- ACCESSIBILITY SPECS
    Contrast Ratios:
    - Dark mode primary text (#E2E8F0) on bg (#0F1923): 14.39:1 ✅ AAA
    - Dark mode secondary text (#90A4B7) on bg (#0F1923): 6.91:1 ✅ AA
    - Primary button text (#FFFFFF) on accent bg (#2B6CB0): 5.42:1 ✅ AA
    - Light mode primary text (#12202F) on bg (#F4F7FB): 15.40:1 ✅ AAA

    Touch Targets (all >=44dp):
    - Mobile action buttons: 44px min-height ✅
    - Desktop rail items: 48px min-height ✅
    - Icon controls: 44px × 44px ✅

    Screen Reader Labels:
    - aria-label applied to primary navigation, record actions, and chat controls ✅
    - aria-live="polite" on assistant responses and transcript updates ✅
    - aria-live="assertive" on offline banners and urgent alerts ✅
    - Icon-based Sun / Moon / System theme control persists selection in localStorage ✅
    -->
  </head>
  <body ${file.bodyAttrs || ""}>
    <div class="mx-auto min-h-screen max-w-[1440px]">
      <div class="block md:hidden">
        <div class="min-h-screen px-4 pb-28 pt-4">
          ${file.hidePriorityBanners ? "" : priorityBannerMobile()}
          <div class="mobile-sticky-stack">
            ${mobileUtilityBar(file)}
            ${file.preAuthShell ? "" : mobileContent.hero}
          </div>
          ${file.mobileBanner || ""}
          <main class="mobile-content space-y-4">
            ${file.preAuthShell ? `${mobileContent.hero}${mobileContent.body}` : mobileContent.body}
            ${mobileDrawer("Preview states", "Loading, empty, error, offline", stateSection(file.states))}
            ${mobileDrawer("Accessibility notes", "Tap targets, contrast, live regions", accessibilityPanel(file.accessibilityMobile))}
          </main>
          ${file.hideMobileDock ? "" : mobileDock(file.mobileActive)}
        </div>
      </div>

      <div class="hidden md:block">
        ${file.hidePriorityBanners ? "" : priorityBannerDesktop()}
        ${file.desktopBanner || ""}
        <div class="desktop-shell grid min-h-screen grid-cols-[220px,minmax(0,1fr)]" ${file.preAuthShell ? 'data-desktop-shell="preauth" data-rail-collapsed="false"' : ""}>
          ${desktopRail(file.desktopActive, file)}
          <main class="grid-pattern px-6 pb-6 lg:px-8" style="padding-top:5px; ${file.desktopMainStyle || "background-color: color-mix(in srgb, var(--ls-bg) 76%, white 24%); background-image: linear-gradient(rgba(144,164,183,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(144,164,183,0.05) 1px, transparent 1px); background-size:24px 24px;"}">
            <div class="desktop-stack space-y-6" style="${file.desktopStackStyle || "row-gap:10px;"}">
              <div class="desktop-sticky-stack" style="${file.desktopStickyStyle || "top:calc(var(--ls-desktop-card-top) - 4px); gap:10px;"}">
                ${themeControlsForFile(file)}
                ${file.preAuthShell ? "" : desktopContent.hero}
              </div>
              ${file.preAuthShell ? `${desktopContent.hero}${desktopContent.body}` : desktopContent.body}
              ${stateSection(file.states)}
              ${accessibilityPanel(file.accessibilityDesktop)}
            </div>
          </main>
        </div>
      </div>
    </div>
    <script>
      (() => {
        const storageKey = "legal-saathi-legal-pro-theme";
        const root = document.documentElement;
        const buttons = () => Array.from(document.querySelectorAll("[data-theme-option]"));
        const previews = () => Array.from(document.querySelectorAll("[data-theme-preview]"));
        const greetingTexts = () => Array.from(document.querySelectorAll("[data-greeting-text]"));
        const greetingIcons = () => Array.from(document.querySelectorAll("[data-greeting-icon]"));

        const iconForPeriod = (period) => {
          if (period === "morning") {
            return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14a8 8 0 0 1 16 0"></path><path d="M12 4v3M5.5 10.5l2 1.2M18.5 10.5l-2 1.2M3 17h18"></path></svg>';
          }
          if (period === "afternoon") {
            return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4.2"></circle><path d="M12 2.75v2.1M12 19.15v2.1M4.93 4.93l1.49 1.49M17.58 17.58l1.49 1.49M2.75 12h2.1M19.15 12h2.1"></path></svg>';
          }
          return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20.2 14.1A8.6 8.6 0 0 1 9.9 3.8a8.85 8.85 0 1 0 10.3 10.3Z"></path><path d="M15.5 2.8v2M20 7.3h-2"></path></svg>';
        };

        const syncGreeting = () => {
          const hour = new Date().getHours();
          const period = hour < 12 ? "morning" : hour < 17 ? "afternoon" : "evening";
          const label =
            period === "morning"
              ? "Good Morning, Rajeev!"
              : period === "afternoon"
                ? "Good Afternoon, Rajeev!"
                : "Good Evening, Rajeev!";
          greetingTexts().forEach((node) => {
            node.textContent = label;
          });
          greetingIcons().forEach((node) => {
            node.innerHTML = iconForPeriod(period);
          });
        };

        const applyTheme = (theme) => {
          root.setAttribute("data-theme", theme);
          previews().forEach((preview) => {
            preview.setAttribute("data-current-theme", theme);
          });
          buttons().forEach((button) => {
            const active = button.getAttribute("data-theme-option") === theme;
            button.setAttribute("data-active", active ? "true" : "false");
            button.setAttribute("aria-pressed", active ? "true" : "false");
          });
        };

        const setPreferenceState = (button, enabled) => {
          button.setAttribute("aria-checked", enabled ? "true" : "false");
          button.setAttribute("data-enabled", enabled ? "true" : "false");

          const row = button.closest("[data-pref-row]");
          if (row) {
            row.setAttribute("data-enabled", enabled ? "true" : "false");
            row.style.opacity = enabled ? "1" : "0.72";
            row.style.filter = enabled ? "none" : "saturate(0.68)";
          }

          const track = button.querySelector("[data-pref-track]");
          const toneMap = {
            green: {
              track: "rgba(5,150,105,0.78)",
              status: "rounded-full border border-emerald-500/35 bg-emerald-500/12 px-2.5 py-1 font-mono text-[10px] text-emerald-600 dark:text-emerald-300",
            },
            red: {
              track: "rgba(220,38,38,0.78)",
              status: "rounded-full border border-red-500/35 bg-red-500/12 px-2.5 py-1 font-mono text-[10px] text-red-600 dark:text-red-300",
            },
            slate: {
              track: "rgba(42,63,87,0.92)",
              status: "rounded-full border border-slate-500/30 bg-slate-500/12 px-2.5 py-1 font-mono text-[10px] text-slate-600 dark:text-slate-300",
            },
          };
          const onTone = button.getAttribute("data-pref-on-tone") || row?.getAttribute("data-pref-on-tone") || "green";
          const offTone = button.getAttribute("data-pref-off-tone") || row?.getAttribute("data-pref-off-tone") || "slate";
          const activeTone = enabled ? onTone : offTone;
          const palette = toneMap[activeTone] || toneMap.green;

          if (track) {
            track.style.background = palette.track;
            track.style.justifyContent = enabled ? "flex-end" : "flex-start";
          }

          const thumb = button.querySelector("[data-pref-thumb]");
          if (thumb) {
            thumb.style.transform = enabled ? "translateX(0px)" : "translateX(0px)";
          }

          const status = row?.querySelector("[data-pref-status]");
          if (status) {
            const onLabel = button.getAttribute("data-pref-on-label") || row?.getAttribute("data-pref-on-label") || "ENABLED";
            const offLabel = button.getAttribute("data-pref-off-label") || row?.getAttribute("data-pref-off-label") || "PAUSED";
            status.textContent = enabled ? onLabel : offLabel;
            status.className = palette.status;
          }
        };

        const setActionState = (button, active) => {
          button.setAttribute("data-action-active", active ? "true" : "false");
          button.setAttribute("aria-pressed", active ? "true" : "false");
        };

        const init = () => {
          const savedTheme = localStorage.getItem(storageKey) || "dark";
          applyTheme(savedTheme);
          syncGreeting();
          document.querySelectorAll("[data-pref-toggle]").forEach((button) => {
            setPreferenceState(button, button.getAttribute("aria-checked") !== "false");
          });
          document.querySelectorAll("[data-action-select]").forEach((button) => {
            setActionState(button, button.getAttribute("data-action-active") === "true");
          });
        };

        document.addEventListener("click", (event) => {
          const button = event.target.closest("[data-theme-option]");
          if (button) {
            const theme = button.getAttribute("data-theme-option");
            localStorage.setItem(storageKey, theme);
            applyTheme(theme);
            const popover = button.closest(".appearance-popover");
            if (popover) {
              popover.removeAttribute("open");
            }
            return;
          }

          const prefToggle = event.target.closest("[data-pref-toggle]");
          if (prefToggle) {
            const enabled = prefToggle.getAttribute("aria-checked") !== "true";
            setPreferenceState(prefToggle, enabled);
            return;
          }

          const actionButton = event.target.closest("[data-action-select]");
          if (actionButton) {
            if (actionButton.getAttribute("data-auth-managed") === "true") {
              return;
            }
            const group = actionButton.getAttribute("data-action-group");
            const isActive = actionButton.getAttribute("data-action-active") === "true";
            if (group) {
              const nextActive = !isActive;
              document.querySelectorAll('[data-action-select][data-action-group="' + group + '"]').forEach((button) => {
                setActionState(button, nextActive && button === actionButton);
              });
            } else {
              setActionState(actionButton, !isActive);
            }
            return;
          }

          const clearButton = event.target.closest("[data-clear-notifications]");
          if (clearButton) {
            document.querySelectorAll("[data-notification-count]").forEach((badge) => {
              badge.textContent = "0";
            });
            document.querySelectorAll("[data-notification-summary]").forEach((summary) => {
              summary.innerHTML = '<span class="mono">0</span> new updates';
            });
            document.querySelectorAll("[data-notification-list]").forEach((list) => {
              list.innerHTML = '<div class="rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] p-4 text-center"><p class="font-mono text-sm text-[var(--ls-text-secondary)]">// No new notifications</p><p class="mt-2 text-xs text-[var(--ls-text-secondary)]">Critical alerts and reminders will appear here.</p></div>';
            });
            document.querySelectorAll(".notifications-popover[open]").forEach((popover) => {
              popover.removeAttribute("open");
            });
            return;
          }

          const closePopover = event.target.closest("[data-close-popover]");
          if (closePopover) {
            const kind = closePopover.getAttribute("data-close-popover");
            const popover = closePopover.closest("." + kind + "-popover");
            if (popover) {
              popover.removeAttribute("open");
            }
            return;
          }

          const dismissPriority = event.target.closest("[data-dismiss-priority]");
          if (dismissPriority) {
            root.setAttribute("data-priority-dismissed", "true");
            document.querySelectorAll(".priority-banner").forEach((banner) => {
              banner.setAttribute("hidden", "hidden");
            });
            return;
          }

          if (!event.target.closest(".appearance-popover") && !event.target.closest(".notifications-popover")) {
            document.querySelectorAll(".appearance-popover[open], .notifications-popover[open]").forEach((popover) => {
              popover.removeAttribute("open");
            });
          }
        });

        document.addEventListener("keydown", (event) => {
          if (event.key === "Escape") {
            document.querySelectorAll(".appearance-popover[open], .notifications-popover[open]").forEach((popover) => {
              popover.removeAttribute("open");
            });
          }
        });

        const media = window.matchMedia("(prefers-color-scheme: dark)");
        if (media.addEventListener) {
          media.addEventListener("change", () => {
            if ((localStorage.getItem(storageKey) || "dark") === "system") {
              applyTheme("system");
            }
          });
        }

        if (document.readyState === "loading") {
          document.addEventListener("DOMContentLoaded", init, { once: true });
        } else {
          init();
        }
        ${file.extraScript || ""}
        if (["s01-preauth", "s02-auth", "s03-profile"].includes(document.body.getAttribute("data-screen-id"))) {
          initPreAuthEntry();
        }
      })();
    </script>
  </body>
</html>`.replaceAll("Legal Sathi", "Legal Saathi");
}

const commonChips = `
  <div class="flex flex-wrap gap-2">
    <span class="inline-flex items-center gap-2 rounded-full border border-sky-500/25 bg-gradient-to-r from-sky-500/16 via-amber-400/16 to-violet-500/12 px-3 py-1.5 text-[11px] text-[var(--ls-text-primary)]">
      <span class="grid h-5 w-5 place-items-center rounded-full bg-[var(--ls-surface)]/70 text-[var(--ls-accent)]">
        ${navIcon("Calendar", "h-3.5 w-3.5")}
      </span>
      <span class="font-mono">19 Apr 2026</span>
    </span>
    <span class="rounded-full border border-amber-500/20 bg-amber-500/12 px-3 py-1 font-mono text-[11px] text-amber-700 dark:text-amber-300">IST</span>
    <span class="rounded-full border border-violet-500/20 bg-violet-500/12 px-3 py-1 font-mono text-[11px] text-violet-700 dark:text-violet-300">AP-SOUTH-1</span>
    <span class="rounded-full border border-emerald-500/20 bg-emerald-500/12 px-3 py-1 font-mono text-[11px] text-emerald-700 dark:text-emerald-300">RLS</span>
  </div>
`;

const files = [
  {
    filename: "S-01-legal-pro.html",
    title: "Legal Sathi — Splash and Onboarding",
    description: "Pre-auth Legal Saathi entry screen with deterministic persona routing and unified authentication.",
    mobileActive: "Home",
    desktopActive: "Home",
    preAuthShell: true,
    useFirstSectionAsHero: true,
    hidePriorityBanners: true,
    hideMobileDock: true,
    bodyAttrs: 'data-screen-id="s01-preauth"',
    desktopStickyStyle: "top:8px; gap:10px;",
    desktopMainStyle:
      "background-color: color-mix(in srgb, var(--ls-bg) 76%, white 24%); background-image: linear-gradient(rgba(144,164,183,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(144,164,183,0.05) 1px, transparent 1px); background-size:24px 24px; padding-top:16px;",
    extraScript: preAuthStateScript(),
    mobile: `
      ${preAuthAuthCard()}
      <section class="panel rounded-[24px] p-4 shadow-panel">
        <div class="flex items-center justify-between gap-3">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Persona preview</p>
            <p class="mt-1 text-sm text-[var(--ls-text-primary)]">What unlocks after secure sign-in</p>
          </div>
          <span class="rounded-full border border-[var(--ls-border)] px-3 py-1 font-mono text-xs text-[var(--ls-text-secondary)]">PRE-AUTH</span>
        </div>
        <div class="mt-4 space-y-3">
          ${[
            ["Citizen", "Verified lawyer discovery, consultation booking, and secure matter uploads."],
            ["Student", "Internship hub, case digests, quiz mode, and moot prep workflows."],
            ["Independent Lawyer", "Morning brief, alerts, consultations, billing, and case tracking."],
          ]
            .map(
              ([title, copy]) => `
                <article class="rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] p-4 tinted-card">
                  <p class="text-sm font-semibold text-[var(--ls-text-primary)]">${title}</p>
                  <p class="mt-2 text-sm leading-6 text-[var(--ls-text-secondary)]">${copy}</p>
                </article>
              `,
            )
            .join("")}
        </div>
      </section>
    `,
    desktop: `
      <div class="space-y-4">
      ${preAuthAuthCard({ desktop: true })}
      <section class="grid gap-6 xl:grid-cols-[0.98fr,1.02fr]">
        <div class="panel rounded-[24px] p-5">
          <div class="flex items-center justify-between gap-3">
            <div>
              <p class="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Persona preview</p>
              <p class="mt-1 text-sm text-[var(--ls-text-primary)]">Post-auth workspace outcomes</p>
            </div>
            <span class="rounded-full border border-[var(--ls-border)] px-3 py-1 font-mono text-xs text-[var(--ls-text-secondary)]">DETERMINISTIC</span>
          </div>
          <div class="mt-4 grid gap-3">
            ${[
              ["Citizen", "Lawyer discovery, consultation booking, document vault, and privacy-safe pre-consultation notes."],
              ["Student", "Internship tracking, LegalGPT India research, case digest playback, and study tools."],
              ["Independent Lawyer", "Morning brief, case management, court alerts, billing, and scheduling."],
              ["Firm", "Team assignments, collaborative drafting, approvals, and workload analytics."],
              ["Tutor", "Session booking, ratings, payout visibility, and learner communication."],
            ]
              .map(
                ([title, copy]) => `
                  <article class="rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] p-4 tinted-card">
                    <div class="flex items-start justify-between gap-3">
                      <div>
                        <p class="text-sm font-semibold text-[var(--ls-text-primary)]">${title}</p>
                        <p class="mt-2 text-sm leading-6 text-[var(--ls-text-secondary)]">${copy}</p>
                      </div>
                      <span class="rounded-full bg-[var(--ls-surface)]/75 px-3 py-1 font-mono text-xs text-[var(--ls-text-secondary)]">${title === "Independent Lawyer" ? "DEFAULT" : "READY"}</span>
                    </div>
                  </article>
                `,
              )
              .join("")}
          </div>
        </div>
        <div class="space-y-4">
          <div class="panel rounded-[24px] p-5">
            <p class="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Compliance boundary</p>
            <div class="mt-4 grid gap-3">
              ${[
                ["Pre-auth neutrality", "No personalized greeting, tenant routing, or workspace data appears before successful authentication."],
                ["Verification timing", "Bar Council verification begins only after sign-in for lawyer and firm personas."],
                ["DPDP gating", "Consent, residency acknowledgement, and data export flows remain post-auth or user-triggered."],
              ]
                .map(
                  ([title, copy]) => `
                    <div class="rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] p-4 tinted-card">
                      <p class="text-sm font-semibold text-[var(--ls-text-primary)]">${title}</p>
                      <p class="mt-2 text-sm leading-6 text-[var(--ls-text-secondary)]">${copy}</p>
                    </div>
                  `,
                )
                .join("")}
            </div>
          </div>
          <div class="panel rounded-[24px] p-5">
            <p class="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Why this screen is deterministic</p>
            <p class="mt-4 text-sm leading-6 text-[var(--ls-text-secondary)]">Persona, language, and auth method are explicit inputs. Nothing from prior sessions leaks into routing except user-chosen preferences cached after interaction.</p>
          </div>
        </div>
      </section>
      </div>
    `,
    states: {
      emptyTitle: "No persona preference selected",
      emptyBody: "Choose a persona and confirm language before you initialize secure sign-in.",
      emptyJson: '{ "persona": null, "language": "English", "auth": "email" }',
      errorText: "auth_init_failed",
      offlineText: "Offline · Cached language and persona preferences are available. Retry initialization when connectivity returns.",
    },
    accessibilityMobile:
      "<li>The header, auth card, and persona preview stack into one scrollable flow so screen-reader and touch users reach authentication without dock interference.</li>",
    accessibilityDesktop:
      "<li>Pre-auth sidebar items announce their full route label and authentication requirement while remaining keyboard-focusable for tooltip disclosure.</li>",
  },
  {
    filename: "S-02-legal-pro.html",
    title: "Legal Sathi — Auth Login and Signup",
    description: "Legal Pro secure authentication with OTP, Google, LinkedIn, and Bar Council verification.",
    mobileActive: "Home",
    desktopActive: "Home",
    preAuthShell: true,
    useFirstSectionAsHero: true,
    hidePriorityBanners: true,
    hideMobileDock: true,
    bodyAttrs: 'data-screen-id="s02-auth"',
    desktopStickyStyle: "top:8px; gap:10px;",
    desktopMainStyle:
      "background-color: color-mix(in srgb, var(--ls-bg) 76%, white 24%); background-image: linear-gradient(rgba(144,164,183,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(144,164,183,0.05) 1px, transparent 1px); background-size:24px 24px; padding-top:16px;",
    extraScript: preAuthStateScript(),
    mobile: `
      <section class="card rounded-[22px] p-3 shadow-panel tinted-card" style="background:linear-gradient(180deg, rgba(43,108,176,0.16), rgba(43,108,176,0.06));">
        <div class="flex items-start justify-between gap-3">
          <div class="min-w-0">
            <p class="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--ls-text-secondary)]">S-02 · Secure access</p>
            <h1 class="mt-1 text-lg font-semibold text-[var(--ls-text-primary)]">Login and signup</h1>
            <p class="mt-1 text-[13px] leading-5 text-[var(--ls-text-secondary)]">Authenticate with email, phone OTP, Google, or LinkedIn. Lawyer verification begins only after secure sign-in.</p>
          </div>
          <span class="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border" style="${iconShellStyle("accent")}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><rect x="5" y="10" width="14" height="9" rx="2"></rect><path d="M8 10V8a4 4 0 1 1 8 0v2"></path></svg>
          </span>
        </div>
        <div class="mt-3 flex flex-wrap gap-2">
          <span class="rounded-full border border-sky-500/20 bg-sky-500/12 px-3 py-1 font-mono text-[10px] text-sky-700 dark:text-sky-300">LOGIN</span>
          <span class="rounded-full border border-emerald-500/20 bg-emerald-500/12 px-3 py-1 font-mono text-[10px] text-emerald-700 dark:text-emerald-300">OTP</span>
          <span class="rounded-full border border-amber-500/20 bg-amber-500/12 px-3 py-1 font-mono text-[10px] text-amber-700 dark:text-amber-300">BAR COUNCIL</span>
        </div>
      </section>
      ${preAuthAuthCard({ outerClass: "tinted-card", outerStyle: "background:linear-gradient(180deg, rgba(43,108,176,0.12), rgba(43,108,176,0.04));" })}
      <section class="panel rounded-[24px] p-4 tinted-card" style="background:linear-gradient(180deg, rgba(217,119,6,0.14), rgba(217,119,6,0.05));">
        <div class="flex items-center justify-between gap-3">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Verification pipeline</p>
            <p class="mt-1 text-sm text-[var(--ls-text-primary)]">Lawyer and firm checks stay post-auth</p>
          </div>
          <span class="grid h-10 w-10 place-items-center rounded-2xl border" style="${iconShellStyle("amber")}">
            ${complianceGlyph("Bar Council", "h-4 w-4")}
          </span>
        </div>
        <div class="mt-4 grid gap-3">
          <div class="rounded-2xl border border-[var(--ls-border)] p-4 tinted-card" style="background:linear-gradient(180deg, rgba(217,119,6,0.18), rgba(217,119,6,0.08));">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Enrollment number</p>
            <p class="mt-2 font-mono text-sm text-[var(--ls-text-primary)]">D/2456/2017</p>
          </div>
          <div class="rounded-2xl border border-[var(--ls-border)] p-4 tinted-card" style="background:linear-gradient(180deg, rgba(99,102,241,0.18), rgba(99,102,241,0.08));">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Identity proof</p>
            <p class="mt-2 text-sm text-[var(--ls-text-primary)]">Requested only after successful authentication and persona routing.</p>
          </div>
          <div class="rounded-2xl border border-[var(--ls-border)] p-4 tinted-card" style="background:linear-gradient(180deg, rgba(5,150,105,0.18), rgba(5,150,105,0.08));">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Practice profile</p>
            <p class="mt-2 text-sm text-[var(--ls-text-primary)]">Practice areas and courts are completed in profile setup, not on this pre-auth screen.</p>
          </div>
        </div>
      </section>
      <section class="panel rounded-[24px] p-3 tinted-card" style="background:linear-gradient(180deg, rgba(71,85,105,0.14), rgba(71,85,105,0.05));">
        <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Trust boundary</p>
        <div class="mt-2 grid gap-2">
          <div class="flex items-start gap-2.5 rounded-2xl border border-[var(--ls-border)] p-3 tinted-card" style="background:linear-gradient(180deg, rgba(43,108,176,0.18), rgba(43,108,176,0.08));">
            <span class="grid h-8 w-8 shrink-0 place-items-center rounded-xl border" style="${iconShellStyle("accent")}">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><path d="m12 3.8 7 3.2v4.8c0 4.3-2.8 7.5-7 8.9-4.2-1.4-7-4.6-7-8.9V7l7-3.2Z"></path><path d="m9.4 11.8 1.6 1.6 3.6-3.6"></path></svg>
            </span>
            <div>
              <p class="text-sm font-semibold text-[var(--ls-text-primary)]">Pre-auth neutrality</p>
              <p class="mt-1.5 text-[13px] leading-5 text-[var(--ls-text-secondary)]">No personalized greeting, tenant binding, hearings, or matter state appear before sign-in succeeds.</p>
            </div>
          </div>
          <div class="flex items-start gap-2.5 rounded-2xl border border-[var(--ls-border)] p-3 tinted-card" style="background:linear-gradient(180deg, rgba(99,102,241,0.18), rgba(99,102,241,0.08));">
            <span class="grid h-8 w-8 shrink-0 place-items-center rounded-xl border" style="${iconShellStyle("violet")}">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><path d="M6.5 7.5h11M6.5 12h11M6.5 16.5h7"></path><path d="M4.5 5.5h15v13h-15z"></path></svg>
            </span>
            <div>
              <p class="text-sm font-semibold text-[var(--ls-text-primary)]">DPDP and residency</p>
              <p class="mt-1.5 text-[13px] leading-5 text-[var(--ls-text-secondary)]">Consent capture, data-rights workflows, and residency acknowledgements remain post-auth or explicitly user-triggered.</p>
            </div>
          </div>
        </div>
      </section>
    `,
    desktop: `
      <div class="space-y-4">
      <section class="card rounded-[28px] p-6 shadow-float tinted-card" style="background:linear-gradient(180deg, rgba(43,108,176,0.14), rgba(43,108,176,0.05));">
        <div class="flex items-start justify-between gap-6">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--ls-text-secondary)]">S-02 · Secure access</p>
            <h1 class="mt-2 text-3xl font-semibold text-[var(--ls-text-primary)]">Login and signup workspace</h1>
            <p class="mt-3 max-w-3xl text-sm leading-6 text-[var(--ls-text-secondary)]">Choose a persona, confirm language, and continue with email, phone OTP, Google, or LinkedIn. Lawyer-grade verification starts only after authentication.</p>
          </div>
          <div class="flex flex-wrap gap-2">
            <span class="rounded-full border border-sky-500/20 bg-sky-500/12 px-3 py-1 font-mono text-[11px] text-sky-700 dark:text-sky-300">LOGIN</span>
            <span class="rounded-full border border-emerald-500/20 bg-emerald-500/12 px-3 py-1 font-mono text-[11px] text-emerald-700 dark:text-emerald-300">OTP READY</span>
            <span class="rounded-full border border-violet-500/20 bg-violet-500/12 px-3 py-1 font-mono text-[11px] text-violet-700 dark:text-violet-300">GOOGLE / LINKEDIN</span>
            <span class="rounded-full border border-amber-500/20 bg-amber-500/12 px-3 py-1 font-mono text-[11px] text-amber-700 dark:text-amber-300">BAR COUNCIL</span>
          </div>
        </div>
        <div class="mt-5 grid gap-3 md:grid-cols-3">
          <div class="rounded-2xl border border-[var(--ls-border)] p-4 tinted-card" style="background:linear-gradient(180deg, rgba(43,108,176,0.18), rgba(43,108,176,0.08));">
            <div class="flex items-start gap-3">
              <span class="grid h-10 w-10 shrink-0 place-items-center rounded-2xl border" style="${iconShellStyle("accent")}">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><rect x="4.5" y="6.5" width="15" height="11" rx="2"></rect><path d="m5.5 8 6.5 5 6.5-5"></path></svg>
              </span>
              <div>
                <p class="text-sm font-semibold text-[var(--ls-text-primary)]">Email sign-in</p>
                <p class="mt-2 text-sm leading-6 text-[var(--ls-text-secondary)]">Best for returning professionals using work email and password.</p>
              </div>
            </div>
          </div>
          <div class="rounded-2xl border border-[var(--ls-border)] p-4 tinted-card" style="background:linear-gradient(180deg, rgba(5,150,105,0.18), rgba(5,150,105,0.08));">
            <div class="flex items-start gap-3">
              <span class="grid h-10 w-10 shrink-0 place-items-center rounded-2xl border" style="${iconShellStyle("emerald")}">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><path d="M7.8 4.8h2.9l1 3-1.7 1.7a14.3 14.3 0 0 0 4.5 4.5l1.7-1.7 3 1v2.9a1.8 1.8 0 0 1-2 1.8 15.7 15.7 0 0 1-11.2-11.2 1.8 1.8 0 0 1 1.8-2Z"></path></svg>
              </span>
              <div>
                <p class="text-sm font-semibold text-[var(--ls-text-primary)]">Phone OTP</p>
                <p class="mt-2 text-sm leading-6 text-[var(--ls-text-secondary)]">Fast India-first access path for students, citizens, and lawyers.</p>
              </div>
            </div>
          </div>
          <div class="rounded-2xl border border-[var(--ls-border)] p-4 tinted-card" style="background:linear-gradient(180deg, rgba(99,102,241,0.18), rgba(99,102,241,0.08));">
            <div class="flex items-start gap-3">
              <span class="grid h-10 w-10 shrink-0 place-items-center rounded-2xl border" style="${iconShellStyle("violet")}">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><path d="M12 4.5 6.5 7.7v6.6l5.5 3.2 5.5-3.2V7.7L12 4.5Z"></path><path d="M9.5 10.2h5M9.5 13.3h3.5"></path></svg>
              </span>
              <div>
                <p class="text-sm font-semibold text-[var(--ls-text-primary)]">OAuth providers</p>
                <p class="mt-2 text-sm leading-6 text-[var(--ls-text-secondary)]">Google and LinkedIn reduce setup time while keeping the same routing rules.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="grid gap-6 xl:grid-cols-[1.28fr,0.92fr]">
        <div class="space-y-4">
        ${preAuthAuthCard({ desktop: true, outerClass: "tinted-card", outerStyle: "background:linear-gradient(180deg, rgba(43,108,176,0.12), rgba(43,108,176,0.04));" })}
          <div class="panel rounded-[24px] p-4 tinted-card" style="background:linear-gradient(180deg, rgba(71,85,105,0.14), rgba(71,85,105,0.05));">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Trust boundary</p>
            <div class="mt-3 grid gap-2 md:grid-cols-2">
              <div class="flex items-start gap-2.5 rounded-2xl border border-[var(--ls-border)] p-3 tinted-card" style="background:linear-gradient(180deg, rgba(43,108,176,0.18), rgba(43,108,176,0.08));">
                <span class="grid h-8 w-8 shrink-0 place-items-center rounded-xl border" style="${iconShellStyle("accent")}">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><path d="m12 3.8 7 3.2v4.8c0 4.3-2.8 7.5-7 8.9-4.2-1.4-7-4.6-7-8.9V7l7-3.2Z"></path><path d="m9.4 11.8 1.6 1.6 3.6-3.6"></path></svg>
                </span>
                <div>
                  <p class="text-sm font-semibold text-[var(--ls-text-primary)]">Pre-auth neutrality</p>
                  <p class="mt-1.5 text-[13px] leading-5 text-[var(--ls-text-secondary)]">No personalized greeting, no tenant binding, and no matter state are exposed before authentication.</p>
                </div>
              </div>
              <div class="flex items-start gap-2.5 rounded-2xl border border-[var(--ls-border)] p-3 tinted-card" style="background:linear-gradient(180deg, rgba(99,102,241,0.18), rgba(99,102,241,0.08));">
                <span class="grid h-8 w-8 shrink-0 place-items-center rounded-xl border" style="${iconShellStyle("violet")}">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><path d="M6.5 7.5h11M6.5 12h11M6.5 16.5h7"></path><path d="M4.5 5.5h15v13h-15z"></path></svg>
                </span>
                <div>
                  <p class="text-sm font-semibold text-[var(--ls-text-primary)]">DPDP and residency</p>
                  <p class="mt-1.5 text-[13px] leading-5 text-[var(--ls-text-secondary)]">Consent capture, data-rights flows, and residency acknowledgements remain post-auth or explicitly user-triggered.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="space-y-4">
          <div class="panel rounded-[24px] p-5 tinted-card" style="background:linear-gradient(180deg, rgba(217,119,6,0.14), rgba(217,119,6,0.05));">
            <div class="flex items-center justify-between gap-3">
              <div>
                <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Verification pipeline</p>
                <p class="mt-1 text-sm text-[var(--ls-text-primary)]">Lawyer and firm checks</p>
              </div>
              <span class="grid h-10 w-10 place-items-center rounded-2xl border" style="${iconShellStyle("amber")}">
                ${complianceGlyph("Bar Council", "h-4 w-4")}
              </span>
            </div>
            <div class="mt-4 grid gap-3">
              <div class="rounded-2xl border border-[var(--ls-border)] p-4 tinted-card" style="background:linear-gradient(180deg, rgba(217,119,6,0.18), rgba(217,119,6,0.08));">
                <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Enrollment number</p>
                <p class="mt-2 font-mono text-lg text-[var(--ls-text-primary)]">D/2456/2017</p>
              </div>
              <div class="rounded-2xl border border-[var(--ls-border)] p-4 tinted-card" style="background:linear-gradient(180deg, rgba(99,102,241,0.18), rgba(99,102,241,0.08));">
                <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Identity proof</p>
                <p class="mt-2 text-sm leading-6 text-[var(--ls-text-primary)]">Queued after sign-in for lawyers and firm admins requiring verified discovery or billing privileges.</p>
              </div>
              <div class="rounded-2xl border border-[var(--ls-border)] p-4 tinted-card" style="background:linear-gradient(180deg, rgba(5,150,105,0.18), rgba(5,150,105,0.08));">
                <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Practice profile</p>
                <p class="mt-2 text-sm leading-6 text-[var(--ls-text-primary)]">Practice areas, courts, and language preferences continue in profile setup after secure access.</p>
              </div>
            </div>
          </div>
          <div class="panel rounded-[24px] p-5 tinted-card" style="background:linear-gradient(180deg, rgba(71,85,105,0.14), rgba(71,85,105,0.05));">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Security controls</p>
            <div class="mt-4 grid gap-3">
              <div class="rounded-2xl border border-[var(--ls-border)] p-4 tinted-card" style="background:linear-gradient(180deg, rgba(43,108,176,0.18), rgba(43,108,176,0.08));">Argon2id password hashing protects email sign-in credentials.</div>
              <div class="rounded-2xl border border-[var(--ls-border)] p-4 tinted-card" style="background:linear-gradient(180deg, rgba(5,150,105,0.18), rgba(5,150,105,0.08));">OTP retry throttling and device trust logging reduce abuse across phone-based sign-ins.</div>
              <div class="rounded-2xl border border-[var(--ls-border)] p-4 tinted-card" style="background:linear-gradient(180deg, rgba(99,102,241,0.18), rgba(99,102,241,0.08));">Audit events capture successful sign-in, failed sign-in, and post-auth route selection.</div>
            </div>
          </div>
        </div>
      </section>
      </div>
    `,
    states: {
      emptyTitle: "No credentials entered",
      emptyBody: "Choose a persona and use email, phone OTP, or OAuth to begin secure access.",
      emptyJson: '{ "persona": null, "authMethod": "email", "otpSent": false, "verification": "post_auth" }',
      errorText: "auth_init_failed",
      offlineText: "Offline · Cached sign-in preferences are available. Retry initialization when connectivity returns.",
    },
    accessibilityMobile: "<li>The auth surface keeps persona selection, language choice, and credential entry in one mobile flow without introducing duplicate pre-auth banners.</li>",
    accessibilityDesktop: "<li>The disabled pre-auth rail remains keyboard focusable for tooltip disclosure while the active auth surface manages all actual sign-in actions.</li>",
  },
  {
    filename: "S-03-legal-pro.html",
    title: "Legal Sathi — Profile Setup",
    description: "Legal Pro persona-aware profile setup with consent capture and notification preferences.",
    mobileActive: "Settings",
    desktopActive: "Settings",
    preAuthShell: true,
    useFirstSectionAsHero: true,
    preAuthHighlightActive: true,
    bodyAttrs: 'data-screen-id="s03-profile"',
    desktopMainStyle:
      "background-color: color-mix(in srgb, var(--ls-bg) 76%, white 24%); background-image: linear-gradient(rgba(144,164,183,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(144,164,183,0.05) 1px, transparent 1px); background-size:24px 24px; padding-top:16px;",
    extraStyle: `
      body[data-screen-id="s03-profile"] {
        min-height: 100dvh;
      }
      body[data-screen-id="s03-profile"] .min-h-screen {
        min-height: 100dvh;
      }
      body[data-screen-id="s03-profile"] .mobile-sticky-stack {
        top: 0;
        gap: 8px;
      }
      body[data-screen-id="s03-profile"] .desktop-sticky-stack {
        top: 0;
        z-index: 20;
        gap: 10px;
      }
      body[data-screen-id="s03-profile"] .preauth-nav-button.is-active {
        border-color: color-mix(in srgb, var(--ls-accent) 42%, var(--ls-border));
        background: linear-gradient(180deg, color-mix(in srgb, var(--ls-accent) 16%, var(--ls-surface)), color-mix(in srgb, var(--ls-accent) 7%, var(--ls-surface)));
        color: var(--ls-text-primary);
        box-shadow: 0 14px 28px -24px rgba(43, 108, 176, 0.38);
      }
      body[data-screen-id="s03-profile"] .mobile-stat-card {
        padding: 8px 9px;
        min-height: 86px;
      }
      body[data-screen-id="s03-profile"] .mobile-stat-row {
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        gap: 6px;
      }
      body[data-screen-id="s03-profile"] .mobile-stat-copy {
        width: 100%;
        gap: 6px;
      }
      body[data-screen-id="s03-profile"] .mobile-stat-copy p {
        font-size: 9px;
        line-height: 1.2;
      }
      body[data-screen-id="s03-profile"] .mobile-stat-card .mono {
        font-size: 13px;
        line-height: 1;
      }
      body[data-screen-id="s03-profile"] .mobile-stat-meta {
        margin-top: 4px;
        font-size: 9px;
        line-height: 1.2;
      }
    `,
    extraScript: preAuthStateScript("legal-saathi-s03-rail-collapsed"),
    mobileUtilityOverride: `
      <section class="mobile-utility-card header-card card rounded-[20px] px-3 py-2 shadow-panel">
        <div class="flex items-start justify-between gap-3">
          <div class="min-w-0 flex-1 preauth-mobile-brand">
            ${brandLogoImage("w-[76px] max-w-[68%]")}
            <p class="mt-1 text-[9px] leading-4 text-[var(--ls-text-secondary)]">Enterprise legal operations for Bharat.</p>
          </div>
          <div class="flex shrink-0 items-center gap-2">
            ${preAuthNotificationsControl({ iconSize: "h-4 w-4", shellClass: "h-12 w-12 rounded-2xl", tone: "rose" })}
            ${appearancePopoverCompact({ iconSize: "h-4 w-4", shellClass: "h-12 w-12 rounded-2xl", panelWidth: "w-[160px]", tone: "amber" })}
          </div>
        </div>
      </section>
    `,
    desktopToolbarOverride: `
      <section class="desktop-toolbar header-card rounded-[18px] p-[14px] shadow-panel preauth-header-card">
        <div class="flex items-start justify-between gap-5">
          <div class="min-w-0">
            <p class="text-[10px] font-semibold uppercase tracking-[0.17em] text-[var(--ls-text-secondary)]">S-03 · Profile setup</p>
            <h1 class="mt-1.5 text-[25px] font-semibold text-[var(--ls-text-primary)]">Complete your profile</h1>
            <p class="mt-1.5 text-[13px] leading-5 text-[var(--ls-text-secondary)]">Finalize practice areas, languages, delivery preferences, integrations, and DPDP consent before the full workspace goes live.</p>
          </div>
          <div class="flex shrink-0 flex-col items-end gap-2">
            <div class="flex items-center gap-2">
              ${preAuthNotificationsControl({ iconSize: "h-4 w-4", shellClass: "h-12 w-12 rounded-2xl", tone: "rose" })}
              ${appearancePopoverCompact({ iconSize: "h-4 w-4", shellClass: "h-12 w-12 rounded-2xl", panelWidth: "w-[168px]", tone: "amber" })}
            </div>
            ${preAuthMetadataLine()}
          </div>
        </div>
      </section>
    `,
    mobile: `
      <section class="card rounded-[20px] p-2.5 shadow-panel tinted-card" style="background:linear-gradient(180deg, rgba(43,108,176,0.16), rgba(43,108,176,0.06));">
        <div class="flex items-start justify-between gap-3">
          <div class="min-w-0">
            <p class="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--ls-text-secondary)]">S-03 · Profile setup</p>
            <h1 class="mt-1 text-[17px] font-semibold text-[var(--ls-text-primary)]">Complete your profile</h1>
            <p class="mt-1 text-[12px] leading-5 text-[var(--ls-text-secondary)]">Capture practice areas, languages, firm or college details, integrations, and DPDP consent before personalized workflows go live.</p>
          </div>
          <span class="rounded-full border border-sky-500/20 bg-sky-500/12 px-2.5 py-1 font-mono text-[10px] text-sky-700 dark:text-sky-300">STEP 3/5</span>
        </div>
        <div class="mt-2.5 flex flex-wrap gap-1.5">
          <span class="rounded-full border border-emerald-500/20 bg-emerald-500/12 px-2.5 py-1 font-mono text-[10px] text-emerald-700 dark:text-emerald-300">PROFILE</span>
          <span class="rounded-full border border-violet-500/20 bg-violet-500/12 px-2.5 py-1 font-mono text-[10px] text-violet-700 dark:text-violet-300">CONSENT</span>
          <span class="rounded-full border border-amber-500/20 bg-amber-500/12 px-2.5 py-1 font-mono text-[10px] text-amber-700 dark:text-amber-300">ALERTS</span>
        </div>
      </section>

      <section class="grid grid-cols-3 gap-2">
        <div class="mobile-stat-card" style="background:linear-gradient(180deg, rgba(43,108,176,0.16), rgba(43,108,176,0.06));">
          <div class="mobile-stat-row">
            <div class="mobile-stat-copy">
              <span class="mobile-stat-icon" style="background:rgba(43,108,176,0.16); color:#2B6CB0;">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><path d="M5 12h14"></path><path d="M5 7.5h14"></path><path d="M5 16.5h9"></path></svg>
              </span>
              <p class="text-[10px] uppercase tracking-[0.14em] text-[var(--ls-text-secondary)]">Progress</p>
            </div>
            <p class="mono text-sm text-[var(--ls-text-primary)]">72%</p>
          </div>
          <p class="mobile-stat-meta">2 steps pending</p>
        </div>
        <div class="mobile-stat-card" style="background:linear-gradient(180deg, rgba(217,119,6,0.16), rgba(217,119,6,0.06));">
          <div class="mobile-stat-row">
            <div class="mobile-stat-copy">
              <span class="mobile-stat-icon" style="background:rgba(217,119,6,0.16); color:#D97706;">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><circle cx="12" cy="12" r="7.5"></circle><path d="M12 8.5v4l2.5 1.5"></path></svg>
              </span>
              <p class="text-[10px] uppercase tracking-[0.14em] text-[var(--ls-text-secondary)]">Blockers</p>
            </div>
            <p class="mono text-sm text-[var(--ls-text-primary)]">02</p>
          </div>
          <p class="mobile-stat-meta">Photo, calendar</p>
        </div>
        <div class="mobile-stat-card" style="background:linear-gradient(180deg, rgba(5,150,105,0.16), rgba(5,150,105,0.06));">
          <div class="mobile-stat-row">
            <div class="mobile-stat-copy">
              <span class="mobile-stat-icon" style="background:rgba(5,150,105,0.16); color:#059669;">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><path d="m12 3.8 7 3.2v4.8c0 4.3-2.8 7.5-7 8.9-4.2-1.4-7-4.6-7-8.9V7l7-3.2Z"></path><path d="m9.4 11.8 1.6 1.6 3.6-3.6"></path></svg>
              </span>
              <p class="text-[10px] uppercase tracking-[0.14em] text-[var(--ls-text-secondary)]">Consent</p>
            </div>
            <p class="mono text-sm text-[var(--ls-text-primary)]">01</p>
          </div>
          <p class="mobile-stat-meta">Mandatory active</p>
        </div>
      </section>

      <section class="panel rounded-[24px] p-4">
        <div class="flex items-start justify-between gap-3">
          <div>
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Setup path</p>
            <p class="mt-2 text-sm text-[var(--ls-text-primary)]">Complete the last profile details before dashboards and alerts personalize around your role.</p>
          </div>
          <span class="rounded-full border border-amber-500/30 bg-amber-500/12 px-3 py-1 font-mono text-[10px] text-amber-600 dark:text-amber-300">2 BLOCKERS</span>
        </div>
        <div class="mt-3 grid gap-2">
          <button type="button" data-action-select data-action-group="s03-mobile-step" data-action-active="true" aria-pressed="true" class="focus-ring flex min-h-[44px] items-center gap-3 rounded-2xl border border-[var(--ls-border)] px-3 py-3 text-left">
            <span class="action-icon-shell grid h-9 w-9 shrink-0 place-items-center rounded-xl border" style="${iconShellStyle("accent")}">
              ${navIcon("Calendar", "h-4 w-4")}
            </span>
            <span class="min-w-0">
              <span class="block text-sm font-semibold text-[var(--ls-text-primary)]">Identity imported</span>
              <span class="mt-1 block text-xs leading-5 text-[var(--ls-text-secondary)]">Name, role, and language preferences already synced from onboarding.</span>
            </span>
          </button>
          <button type="button" data-action-select data-action-group="s03-mobile-step" data-action-active="false" aria-pressed="false" class="focus-ring flex min-h-[44px] items-center gap-3 rounded-2xl border border-[var(--ls-border)] px-3 py-3 text-left">
            <span class="action-icon-shell grid h-9 w-9 shrink-0 place-items-center rounded-xl border" style="${iconShellStyle("amber")}">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><path d="M5 12h14"></path><path d="M5 7.5h14"></path><path d="M5 16.5h9"></path></svg>
            </span>
            <span class="min-w-0">
              <span class="block text-sm font-semibold text-[var(--ls-text-primary)]">Professional context</span>
              <span class="mt-1 block text-xs leading-5 text-[var(--ls-text-secondary)]">Finalize practice areas, courts, city, and profile photo.</span>
            </span>
          </button>
          <button type="button" data-action-select data-action-group="s03-mobile-step" data-action-active="false" aria-pressed="false" class="focus-ring flex min-h-[44px] items-center gap-3 rounded-2xl border border-[var(--ls-border)] px-3 py-3 text-left">
            <span class="action-icon-shell grid h-9 w-9 shrink-0 place-items-center rounded-xl border" style="${iconShellStyle("emerald")}">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><path d="m12 3.8 7 3.2v4.8c0 4.3-2.8 7.5-7 8.9-4.2-1.4-7-4.6-7-8.9V7l7-3.2Z"></path><path d="m9.4 11.8 1.6 1.6 3.6-3.6"></path></svg>
            </span>
            <span class="min-w-0">
              <span class="block text-sm font-semibold text-[var(--ls-text-primary)]">Consent and delivery</span>
              <span class="mt-1 block text-xs leading-5 text-[var(--ls-text-secondary)]">Confirm DPDP permissions and preferred alert channels.</span>
            </span>
          </button>
        </div>
      </section>

      <section class="panel rounded-[24px] p-4">
        <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Persona profile</p>
        <div class="mt-3 grid gap-3">
          <div class="rounded-2xl border border-[var(--ls-border)] p-4 tinted-card" style="background:linear-gradient(180deg, rgba(43,108,176,0.18), rgba(43,108,176,0.07));">
            <p class="text-sm font-semibold text-[var(--ls-text-primary)]">Independent Lawyer</p>
            <p class="mt-2 text-sm text-[var(--ls-text-secondary)]">Rajeev Barnwal · Delhi NCR · 7 years PQE</p>
            <div class="mt-3 flex flex-wrap gap-2">
              <span class="rounded-full border border-[var(--ls-border)] bg-[var(--ls-surface)]/70 px-3 py-1.5 text-[11px] text-[var(--ls-text-primary)]">Criminal litigation</span>
              <span class="rounded-full border border-[var(--ls-border)] bg-[var(--ls-surface)]/70 px-3 py-1.5 text-[11px] text-[var(--ls-text-primary)]">Arbitration</span>
              <span class="rounded-full border border-[var(--ls-border)] bg-[var(--ls-surface)]/70 px-3 py-1.5 text-[11px] text-[var(--ls-text-primary)]">White-collar defence</span>
            </div>
          </div>
          <div class="rounded-2xl border border-[var(--ls-border)] p-4 tinted-card" style="background:linear-gradient(180deg, rgba(217,119,6,0.18), rgba(217,119,6,0.07));">
            <p class="text-sm font-semibold text-[var(--ls-text-primary)]">Court coverage</p>
            <p class="mt-2 text-sm leading-6 text-[var(--ls-text-secondary)]">Delhi High Court, Saket District Courts, and NCLT New Delhi are mapped for cause lists, hearing reminders, and filing shortcuts.</p>
          </div>
          <div class="rounded-2xl border border-[var(--ls-border)] p-4 tinted-card" style="background:linear-gradient(180deg, rgba(99,102,241,0.18), rgba(99,102,241,0.07));">
            <div class="flex items-start justify-between gap-3">
              <div>
                <p class="text-sm font-semibold text-[var(--ls-text-primary)]">Profile blockers</p>
                <p class="mt-2 text-sm text-[var(--ls-text-secondary)]">Photo upload and Google Calendar connection are still pending.</p>
              </div>
              <span class="rounded-full border border-red-500/35 bg-red-500/12 px-2.5 py-1 font-mono text-[10px] text-red-600 dark:text-red-300">2 OPEN</span>
            </div>
          </div>
        </div>
      </section>

      <section class="panel rounded-[24px] p-4">
        <p class="text-sm font-semibold text-[var(--ls-text-primary)]">Delivery preferences</p>
        <div class="mt-3 space-y-3">
          <div data-pref-row data-enabled="true" data-pref-on-label="ENABLED" data-pref-off-label="PAUSED" data-pref-on-tone="green" data-pref-off-tone="red" class="rounded-2xl border border-[var(--ls-border)] p-4" style="background:linear-gradient(180deg, rgba(43,108,176,0.18), rgba(43,108,176,0.07));">
            <div class="flex items-start justify-between gap-3">
              <div class="min-w-0">
                <p class="text-sm font-semibold text-[var(--ls-text-primary)]">Court alerts</p>
                <p class="mt-1 text-xs leading-5 text-[var(--ls-text-secondary)]">Push + WhatsApp for cause list changes, bench movement, and order uploads.</p>
              </div>
              <div class="flex items-center gap-2">
                <button type="button" role="switch" aria-checked="true" data-pref-toggle data-pref-on-label="ENABLED" data-pref-off-label="PAUSED" data-pref-on-tone="green" data-pref-off-tone="red" class="focus-ring shrink-0 rounded-full p-1">
                  <span data-pref-track class="flex h-6 w-11 items-center rounded-full px-1"><span data-pref-thumb class="h-4 w-4 rounded-full bg-white shadow-sm"></span></span>
                </button>
                <span data-pref-status class="rounded-full px-2.5 py-1 font-mono text-[10px]"></span>
              </div>
            </div>
          </div>
          <div data-pref-row data-enabled="true" data-pref-on-label="ENABLED" data-pref-off-label="PAUSED" data-pref-on-tone="green" data-pref-off-tone="red" class="rounded-2xl border border-[var(--ls-border)] p-4" style="background:linear-gradient(180deg, rgba(5,150,105,0.18), rgba(5,150,105,0.07));">
            <div class="flex items-start justify-between gap-3">
              <div class="min-w-0">
                <p class="text-sm font-semibold text-[var(--ls-text-primary)]">Billing and exports</p>
                <p class="mt-1 text-xs leading-5 text-[var(--ls-text-secondary)]">Email summaries for invoices, retainers, and weekly receivables snapshots.</p>
              </div>
              <div class="flex items-center gap-2">
                <button type="button" role="switch" aria-checked="true" data-pref-toggle data-pref-on-label="ENABLED" data-pref-off-label="PAUSED" data-pref-on-tone="green" data-pref-off-tone="red" class="focus-ring shrink-0 rounded-full p-1">
                  <span data-pref-track class="flex h-6 w-11 items-center rounded-full px-1"><span data-pref-thumb class="h-4 w-4 rounded-full bg-white shadow-sm"></span></span>
                </button>
                <span data-pref-status class="rounded-full px-2.5 py-1 font-mono text-[10px]"></span>
              </div>
            </div>
          </div>
          <div data-pref-row data-enabled="false" data-pref-on-label="ENABLED" data-pref-off-label="PAUSED" data-pref-on-tone="green" data-pref-off-tone="red" class="rounded-2xl border border-[var(--ls-border)] p-4" style="background:linear-gradient(180deg, rgba(99,102,241,0.18), rgba(99,102,241,0.07));">
            <div class="flex items-start justify-between gap-3">
              <div class="min-w-0">
                <p class="text-sm font-semibold text-[var(--ls-text-primary)]">LegalGPT India suggestions</p>
                <p class="mt-1 text-xs leading-5 text-[var(--ls-text-secondary)]">Optional drafting tips and workflow nudges inside case and research surfaces.</p>
              </div>
              <div class="flex items-center gap-2">
                <button type="button" role="switch" aria-checked="false" data-pref-toggle data-pref-on-label="ENABLED" data-pref-off-label="PAUSED" data-pref-on-tone="green" data-pref-off-tone="red" class="focus-ring shrink-0 rounded-full p-1">
                  <span data-pref-track class="flex h-6 w-11 items-center rounded-full px-1"><span data-pref-thumb class="h-4 w-4 rounded-full bg-white shadow-sm"></span></span>
                </button>
                <span data-pref-status class="rounded-full px-2.5 py-1 font-mono text-[10px]"></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="panel rounded-[24px] p-4">
        <div class="flex items-center justify-between">
          <p class="text-sm font-semibold text-[var(--ls-text-primary)]">DPDP consent manager</p>
          <span class="rounded-full border border-emerald-500/35 bg-emerald-500/12 px-3 py-1 font-mono text-xs text-emerald-600 dark:text-emerald-300">REQUIRED</span>
        </div>
        <div class="mt-3 space-y-3">
          <div data-pref-row data-enabled="true" data-pref-on-label="ACTIVE" data-pref-off-label="OFF" data-pref-on-tone="green" data-pref-off-tone="red" class="rounded-2xl border border-[var(--ls-border)] p-4" style="background:linear-gradient(180deg, rgba(43,108,176,0.18), rgba(43,108,176,0.07));">
            <div class="flex items-start justify-between gap-3">
              <div class="min-w-0">
                <p class="text-sm font-semibold text-[var(--ls-text-primary)]">Service operations</p>
                <p class="mt-1 text-xs leading-5 text-[var(--ls-text-secondary)]">Required to route alerts, bookings, documents, and billing to your workspace.</p>
              </div>
              <div class="flex items-center gap-2">
                <button type="button" role="switch" aria-checked="true" data-pref-toggle data-pref-on-label="ACTIVE" data-pref-off-label="OFF" data-pref-on-tone="green" data-pref-off-tone="red" class="focus-ring shrink-0 rounded-full p-1">
                  <span data-pref-track class="flex h-6 w-11 items-center rounded-full px-1"><span data-pref-thumb class="h-4 w-4 rounded-full bg-white shadow-sm"></span></span>
                </button>
                <span data-pref-status class="rounded-full px-2.5 py-1 font-mono text-[10px]"></span>
              </div>
            </div>
          </div>
          <div data-pref-row data-enabled="false" data-pref-on-label="ACTIVE" data-pref-off-label="OFF" data-pref-on-tone="green" data-pref-off-tone="red" class="rounded-2xl border border-[var(--ls-border)] p-4" style="background:linear-gradient(180deg, rgba(5,150,105,0.18), rgba(5,150,105,0.07));">
            <div class="flex items-start justify-between gap-3">
              <div class="min-w-0">
                <p class="text-sm font-semibold text-[var(--ls-text-primary)]">Product improvement</p>
                <p class="mt-1 text-xs leading-5 text-[var(--ls-text-secondary)]">Use anonymized onboarding signals to improve setup flows and dashboard defaults.</p>
              </div>
              <div class="flex items-center gap-2">
                <button type="button" role="switch" aria-checked="false" data-pref-toggle data-pref-on-label="ACTIVE" data-pref-off-label="OFF" data-pref-on-tone="green" data-pref-off-tone="red" class="focus-ring shrink-0 rounded-full p-1">
                  <span data-pref-track class="flex h-6 w-11 items-center rounded-full px-1"><span data-pref-thumb class="h-4 w-4 rounded-full bg-white shadow-sm"></span></span>
                </button>
                <span data-pref-status class="rounded-full px-2.5 py-1 font-mono text-[10px]"></span>
              </div>
            </div>
          </div>
          <div data-pref-row data-enabled="false" data-pref-on-label="ACTIVE" data-pref-off-label="OFF" data-pref-on-tone="green" data-pref-off-tone="red" class="rounded-2xl border border-[var(--ls-border)] p-4" style="background:linear-gradient(180deg, rgba(244,114,182,0.18), rgba(244,114,182,0.07));">
            <div class="flex items-start justify-between gap-3">
              <div class="min-w-0">
                <p class="text-sm font-semibold text-[var(--ls-text-primary)]">Marketing updates</p>
                <p class="mt-1 text-xs leading-5 text-[var(--ls-text-secondary)]">Feature launches, education campaigns, and regional webinars.</p>
              </div>
              <div class="flex items-center gap-2">
                <button type="button" role="switch" aria-checked="false" data-pref-toggle data-pref-on-label="ACTIVE" data-pref-off-label="OFF" data-pref-on-tone="green" data-pref-off-tone="red" class="focus-ring shrink-0 rounded-full p-1">
                  <span data-pref-track class="flex h-6 w-11 items-center rounded-full px-1"><span data-pref-thumb class="h-4 w-4 rounded-full bg-white shadow-sm"></span></span>
                </button>
                <span data-pref-status class="rounded-full px-2.5 py-1 font-mono text-[10px]"></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="panel rounded-[24px] p-4">
        <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Integrations and blockers</p>
        <div class="mt-3 space-y-3">
          <div class="rounded-2xl border border-[var(--ls-border)] p-4 tinted-card" style="background:linear-gradient(180deg, rgba(5,150,105,0.18), rgba(5,150,105,0.07));">
            <div class="flex items-center justify-between gap-3">
              <p class="text-sm font-semibold text-[var(--ls-text-primary)]">WhatsApp alerts</p>
              <span class="rounded-full border border-emerald-500/35 bg-emerald-500/12 px-2.5 py-1 font-mono text-[10px] text-emerald-600 dark:text-emerald-300">CONNECTED</span>
            </div>
            <p class="mt-2 text-xs leading-5 text-[var(--ls-text-secondary)]">Primary courtroom alert channel is already active.</p>
          </div>
          <div class="rounded-2xl border border-[var(--ls-border)] p-4 tinted-card" style="background:linear-gradient(180deg, rgba(99,102,241,0.18), rgba(99,102,241,0.07));">
            <div class="flex items-center justify-between gap-3">
              <p class="text-sm font-semibold text-[var(--ls-text-primary)]">Google Calendar</p>
              <span class="rounded-full border border-amber-500/35 bg-amber-500/12 px-2.5 py-1 font-mono text-[10px] text-amber-600 dark:text-amber-300">PENDING</span>
            </div>
            <p class="mt-2 text-xs leading-5 text-[var(--ls-text-secondary)]">Connect to block hearings and consultations automatically.</p>
          </div>
          <div class="rounded-2xl border border-[var(--ls-border)] p-4 tinted-card" style="background:linear-gradient(180deg, rgba(217,119,6,0.18), rgba(217,119,6,0.07));">
            <div class="flex items-center justify-between gap-3">
              <p class="text-sm font-semibold text-[var(--ls-text-primary)]">DigiLocker identity</p>
              <span class="rounded-full border border-red-500/35 bg-red-500/12 px-2.5 py-1 font-mono text-[10px] text-red-600 dark:text-red-300">ACTION</span>
            </div>
            <p class="mt-2 text-xs leading-5 text-[var(--ls-text-secondary)]">Link identity before eSign and verified document flows go live.</p>
          </div>
        </div>
        <div class="mt-4 rounded-2xl border border-[var(--ls-border)] p-4 tinted-card" style="background:linear-gradient(180deg, rgba(99,102,241,0.18), rgba(43,108,176,0.08));">
          <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">LegalGPT India note</p>
          <p class="mt-2 text-sm leading-6 text-[var(--ls-text-primary)]">Complete photo upload and calendar sync now so your morning brief and hearing reminders are personalized from first launch.</p>
          <div class="mt-4 grid grid-cols-2 gap-2">
            <button type="button" data-action-select data-action-group="s03-mobile-cta" data-action-active="false" aria-pressed="false" class="focus-ring min-h-[44px] rounded-xl border border-[var(--ls-border)] px-3 py-2 text-sm font-semibold text-[var(--ls-text-primary)]">Preview</button>
            <button type="button" data-action-select data-action-group="s03-mobile-cta" data-action-active="true" aria-pressed="true" class="focus-ring min-h-[44px] rounded-xl border border-[var(--ls-border)] px-3 py-2 text-sm font-semibold text-[var(--ls-text-primary)]">Save and continue</button>
          </div>
        </div>
      </section>
    `,
    desktop: `
      <section class="card rounded-[24px] p-5 shadow-float tinted-card" style="background:linear-gradient(180deg, rgba(43,108,176,0.14), rgba(43,108,176,0.05));">
        <div class="flex items-start justify-between gap-6">
          <div>
            <p class="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--ls-text-secondary)]">Setup workspace</p>
            <h2 class="mt-1.5 text-[29px] font-semibold text-[var(--ls-text-primary)]">Role, language, and consent configuration</h2>
            <p class="mt-2.5 max-w-3xl text-[13px] leading-5 text-[var(--ls-text-secondary)]">Complete your role context, delivery preferences, integrations, and DPDP permissions so Legal Saathi can personalize dashboards, alerts, and drafting surfaces from first launch.</p>
          </div>
          <div class="flex flex-wrap gap-1.5">
            <span class="rounded-full border border-sky-500/20 bg-sky-500/12 px-2.5 py-1 font-mono text-[10px] text-sky-700 dark:text-sky-300">STEP 3/5</span>
            <span class="rounded-full border border-emerald-500/20 bg-emerald-500/12 px-2.5 py-1 font-mono text-[10px] text-emerald-700 dark:text-emerald-300">PROFILE</span>
            <span class="rounded-full border border-violet-500/20 bg-violet-500/12 px-2.5 py-1 font-mono text-[10px] text-violet-700 dark:text-violet-300">CONSENT</span>
            <span class="rounded-full border border-amber-500/20 bg-amber-500/12 px-2.5 py-1 font-mono text-[10px] text-amber-700 dark:text-amber-300">ALERTS</span>
          </div>
        </div>
      </section>

      <section class="grid gap-6 xl:grid-cols-[0.84fr,1.16fr,0.92fr]">
        <div class="space-y-4">
          <div class="panel rounded-[22px] p-4">
            <div class="flex items-start justify-between gap-3">
              <div>
                <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Setup progress</p>
                <p class="mt-1.5 text-[28px] font-mono text-[var(--ls-text-primary)]">72%</p>
              </div>
              <span class="rounded-full border border-emerald-500/35 bg-emerald-500/12 px-2.5 py-1 font-mono text-[10px] text-emerald-600 dark:text-emerald-300">ON TRACK</span>
            </div>
            <div class="mt-3 h-2 rounded-full bg-[var(--ls-surface-2)]">
              <div class="h-2 w-[72%] rounded-full bg-[var(--ls-accent)]"></div>
            </div>
            <div class="mt-3 space-y-2">
              <div class="flex items-center justify-between rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] px-3 py-2 text-[13px] text-[var(--ls-text-primary)]">
                <span>Identity and role</span>
                <span class="font-mono text-emerald-400">DONE</span>
              </div>
              <div class="flex items-center justify-between rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] px-3 py-2 text-[13px] text-[var(--ls-text-primary)]">
                <span>Photo upload</span>
                <span class="font-mono text-amber-300">PENDING</span>
              </div>
              <div class="flex items-center justify-between rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] px-3 py-2 text-[13px] text-[var(--ls-text-primary)]">
                <span>Calendar sync</span>
                <span class="font-mono text-amber-300">PENDING</span>
              </div>
            </div>
            <button type="button" data-action-select data-action-group="s03-desktop-cta" data-action-active="true" aria-pressed="true" class="focus-ring mt-3 min-h-[44px] w-full rounded-xl border border-[var(--ls-border)] px-4 py-2 text-[13px] font-semibold text-[var(--ls-text-primary)]">Save and continue</button>
          </div>
          <div class="panel rounded-[22px] p-4">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Persona and languages</p>
            <div class="mt-3 rounded-2xl border border-[var(--ls-border)] p-3 tinted-card" style="background:linear-gradient(180deg, rgba(43,108,176,0.18), rgba(43,108,176,0.07));">
              <p class="text-[13px] font-semibold text-[var(--ls-text-primary)]">Independent Lawyer</p>
              <p class="mt-1.5 text-[13px] leading-5 text-[var(--ls-text-secondary)]">Criminal litigation, arbitration, Delhi NCR, English, Hindi, Marathi.</p>
            </div>
            <div class="mt-2.5 flex flex-wrap gap-1.5">
              <span class="rounded-full border border-[var(--ls-border)] px-2.5 py-1.5 text-[11px] text-[var(--ls-text-primary)]">English</span>
              <span class="rounded-full border border-[var(--ls-border)] px-2.5 py-1.5 text-[11px] text-[var(--ls-text-primary)]">Hindi</span>
              <span class="rounded-full border border-[var(--ls-border)] px-2.5 py-1.5 text-[11px] text-[var(--ls-text-primary)]">Marathi</span>
            </div>
            <div class="mt-3 grid gap-2">
              <button type="button" data-action-select data-action-group="s03-desktop-checklist" data-action-active="true" aria-pressed="true" class="focus-ring flex min-h-[44px] items-center justify-between rounded-2xl border border-[var(--ls-border)] px-3 py-2 text-left">
                <span class="text-[13px] font-semibold text-[var(--ls-text-primary)]">Professional context imported</span>
                <span class="font-mono text-xs">OK</span>
              </button>
              <button type="button" data-action-select data-action-group="s03-desktop-checklist" data-action-active="false" aria-pressed="false" class="focus-ring flex min-h-[44px] items-center justify-between rounded-2xl border border-[var(--ls-border)] px-3 py-2 text-left">
                <span class="text-[13px] font-semibold text-[var(--ls-text-primary)]">Connect Google Calendar</span>
                <span class="font-mono text-xs">NEXT</span>
              </button>
              <button type="button" data-action-select data-action-group="s03-desktop-checklist" data-action-active="false" aria-pressed="false" class="focus-ring flex min-h-[44px] items-center justify-between rounded-2xl border border-[var(--ls-border)] px-3 py-2 text-left">
                <span class="text-[13px] font-semibold text-[var(--ls-text-primary)]">Upload profile photo</span>
                <span class="font-mono text-xs">NEXT</span>
              </button>
            </div>
          </div>
        </div>
        <div class="space-y-4">
          <div class="panel rounded-[22px] p-4">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Identity and professional context</p>
            <div class="mt-3 grid gap-3 md:grid-cols-2">
              <div class="rounded-2xl border border-[var(--ls-border)] p-3 tinted-card" style="background:linear-gradient(180deg, rgba(43,108,176,0.18), rgba(43,108,176,0.07));">
                <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Full name</p>
                <p class="mt-1.5 text-[13px] font-semibold text-[var(--ls-text-primary)]">Rajeev Barnwal</p>
              </div>
              <div class="rounded-2xl border border-[var(--ls-border)] p-3 tinted-card" style="background:linear-gradient(180deg, rgba(5,150,105,0.18), rgba(5,150,105,0.07));">
                <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Designation</p>
                <p class="mt-1.5 text-[13px] font-semibold text-[var(--ls-text-primary)]">Advocate</p>
              </div>
              <div class="rounded-2xl border border-[var(--ls-border)] p-3 tinted-card" style="background:linear-gradient(180deg, rgba(217,119,6,0.18), rgba(217,119,6,0.07));">
                <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Practice areas</p>
                <p class="mt-1.5 text-[13px] leading-5 text-[var(--ls-text-primary)]">Criminal litigation, arbitration, white-collar defence</p>
              </div>
              <div class="rounded-2xl border border-[var(--ls-border)] p-3 tinted-card" style="background:linear-gradient(180deg, rgba(99,102,241,0.18), rgba(99,102,241,0.07));">
                <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Primary courts</p>
                <p class="mt-1.5 text-[13px] leading-5 text-[var(--ls-text-primary)]">Delhi High Court, Saket District Courts, NCLT New Delhi</p>
              </div>
              <div class="rounded-2xl border border-[var(--ls-border)] p-3 tinted-card" style="background:linear-gradient(180deg, rgba(244,114,182,0.18), rgba(244,114,182,0.07));">
                <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Profile photo</p>
                <p class="mt-1.5 text-[13px] leading-5 text-[var(--ls-text-primary)]">Pending upload. Used for consultations, tutor discovery, and firm rosters.</p>
              </div>
              <div class="rounded-2xl border border-[var(--ls-border)] p-3 tinted-card" style="background:linear-gradient(180deg, rgba(71,85,105,0.18), rgba(71,85,105,0.07));">
                <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Bar enrollment</p>
                <p class="mt-1.5 text-[13px] font-mono text-[var(--ls-text-primary)]">D/2456/2017</p>
              </div>
            </div>
          </div>
          <div class="panel rounded-[22px] p-4">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Notification delivery</p>
            <div class="mt-3 grid gap-2.5">
              <div data-pref-row data-enabled="true" data-pref-on-label="ENABLED" data-pref-off-label="PAUSED" data-pref-on-tone="green" data-pref-off-tone="red" class="rounded-2xl border border-[var(--ls-border)] p-3" style="background:linear-gradient(180deg, rgba(43,108,176,0.18), rgba(43,108,176,0.07));">
                <div class="flex items-start justify-between gap-3">
                  <div class="min-w-0">
                    <p class="text-[13px] font-semibold text-[var(--ls-text-primary)]">Court alerts</p>
                    <p class="mt-1 text-xs leading-5 text-[var(--ls-text-secondary)]">Push + WhatsApp on cause list changes, next-in-line alerts, and new order uploads.</p>
                  </div>
                  <div class="flex items-center gap-2">
                    <button type="button" role="switch" aria-checked="true" data-pref-toggle data-pref-on-label="ENABLED" data-pref-off-label="PAUSED" data-pref-on-tone="green" data-pref-off-tone="red" class="focus-ring ml-2 shrink-0 rounded-full p-1">
                      <span data-pref-track class="flex h-6 w-11 items-center rounded-full px-1"><span data-pref-thumb class="h-4 w-4 rounded-full bg-white shadow-sm"></span></span>
                    </button>
                    <span data-pref-status class="rounded-full px-2.5 py-1 font-mono text-[10px]"></span>
                  </div>
                </div>
              </div>
              <div data-pref-row data-enabled="true" data-pref-on-label="ENABLED" data-pref-off-label="PAUSED" data-pref-on-tone="green" data-pref-off-tone="red" class="rounded-2xl border border-[var(--ls-border)] p-3" style="background:linear-gradient(180deg, rgba(5,150,105,0.18), rgba(5,150,105,0.07));">
                <div class="flex items-start justify-between gap-3">
                  <div class="min-w-0">
                    <p class="text-[13px] font-semibold text-[var(--ls-text-primary)]">Billing exports</p>
                    <p class="mt-1 text-xs leading-5 text-[var(--ls-text-secondary)]">Email invoices, receivables summaries, and retainer alerts.</p>
                  </div>
                  <div class="flex items-center gap-2">
                    <button type="button" role="switch" aria-checked="true" data-pref-toggle data-pref-on-label="ENABLED" data-pref-off-label="PAUSED" data-pref-on-tone="green" data-pref-off-tone="red" class="focus-ring ml-2 shrink-0 rounded-full p-1">
                      <span data-pref-track class="flex h-6 w-11 items-center rounded-full px-1"><span data-pref-thumb class="h-4 w-4 rounded-full bg-white shadow-sm"></span></span>
                    </button>
                    <span data-pref-status class="rounded-full px-2.5 py-1 font-mono text-[10px]"></span>
                  </div>
                </div>
              </div>
              <div data-pref-row data-enabled="false" data-pref-on-label="ENABLED" data-pref-off-label="PAUSED" data-pref-on-tone="green" data-pref-off-tone="red" class="rounded-2xl border border-[var(--ls-border)] p-3" style="background:linear-gradient(180deg, rgba(99,102,241,0.18), rgba(99,102,241,0.07));">
                <div class="flex items-start justify-between gap-3">
                  <div class="min-w-0">
                    <p class="text-[13px] font-semibold text-[var(--ls-text-primary)]">LegalGPT India nudges</p>
                    <p class="mt-1 text-xs leading-5 text-[var(--ls-text-secondary)]">Optional workflow prompts inside research, drafting, and morning brief modules.</p>
                  </div>
                  <div class="flex items-center gap-2">
                    <button type="button" role="switch" aria-checked="false" data-pref-toggle data-pref-on-label="ENABLED" data-pref-off-label="PAUSED" data-pref-on-tone="green" data-pref-off-tone="red" class="focus-ring ml-2 shrink-0 rounded-full p-1">
                      <span data-pref-track class="flex h-6 w-11 items-center rounded-full px-1"><span data-pref-thumb class="h-4 w-4 rounded-full bg-white shadow-sm"></span></span>
                    </button>
                    <span data-pref-status class="rounded-full px-2.5 py-1 font-mono text-[10px]"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="space-y-4">
          <div class="panel rounded-[22px] p-4">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">DPDP consent manager</p>
            <div class="mt-3 grid gap-2.5">
              <div data-pref-row data-enabled="true" data-pref-on-label="ACTIVE" data-pref-off-label="OFF" data-pref-on-tone="green" data-pref-off-tone="red" class="rounded-2xl border border-[var(--ls-border)] p-3" style="background:linear-gradient(180deg, rgba(43,108,176,0.18), rgba(43,108,176,0.07));">
                <div class="flex items-start justify-between gap-3">
                  <div class="min-w-0">
                    <p class="text-[13px] font-semibold text-[var(--ls-text-primary)]">Service consent</p>
                    <p class="mt-1 text-xs leading-5 text-[var(--ls-text-secondary)]">Required for alerts, case routing, billing exports, and secure workspace creation.</p>
                  </div>
                  <div class="flex items-center gap-2">
                    <button type="button" role="switch" aria-checked="true" data-pref-toggle data-pref-on-label="ACTIVE" data-pref-off-label="OFF" data-pref-on-tone="green" data-pref-off-tone="red" class="focus-ring ml-2 shrink-0 rounded-full p-1">
                      <span data-pref-track class="flex h-6 w-11 items-center rounded-full px-1"><span data-pref-thumb class="h-4 w-4 rounded-full bg-white shadow-sm"></span></span>
                    </button>
                    <span data-pref-status class="rounded-full px-2.5 py-1 font-mono text-[10px]"></span>
                  </div>
                </div>
              </div>
              <div data-pref-row data-enabled="false" data-pref-on-label="ACTIVE" data-pref-off-label="OFF" data-pref-on-tone="green" data-pref-off-tone="red" class="rounded-2xl border border-[var(--ls-border)] p-3" style="background:linear-gradient(180deg, rgba(5,150,105,0.18), rgba(5,150,105,0.07));">
                <div class="flex items-start justify-between gap-3">
                  <div class="min-w-0">
                    <p class="text-[13px] font-semibold text-[var(--ls-text-primary)]">Analytics consent</p>
                    <p class="mt-1 text-xs leading-5 text-[var(--ls-text-secondary)]">Improve onboarding quality, activation funnels, and performance dashboards.</p>
                  </div>
                  <div class="flex items-center gap-2">
                    <button type="button" role="switch" aria-checked="false" data-pref-toggle data-pref-on-label="ACTIVE" data-pref-off-label="OFF" data-pref-on-tone="green" data-pref-off-tone="red" class="focus-ring ml-2 shrink-0 rounded-full p-1">
                      <span data-pref-track class="flex h-6 w-11 items-center rounded-full px-1"><span data-pref-thumb class="h-4 w-4 rounded-full bg-white shadow-sm"></span></span>
                    </button>
                    <span data-pref-status class="rounded-full px-2.5 py-1 font-mono text-[10px]"></span>
                  </div>
                </div>
              </div>
              <div data-pref-row data-enabled="false" data-pref-on-label="ACTIVE" data-pref-off-label="OFF" data-pref-on-tone="green" data-pref-off-tone="red" class="rounded-2xl border border-[var(--ls-border)] p-3" style="background:linear-gradient(180deg, rgba(244,114,182,0.18), rgba(244,114,182,0.07));">
                <div class="flex items-start justify-between gap-3">
                  <div class="min-w-0">
                    <p class="text-[13px] font-semibold text-[var(--ls-text-primary)]">Marketing consent</p>
                    <p class="mt-1 text-xs leading-5 text-[var(--ls-text-secondary)]">Optional launches, education campaigns, and product announcements.</p>
                  </div>
                  <div class="flex items-center gap-2">
                    <button type="button" role="switch" aria-checked="false" data-pref-toggle data-pref-on-label="ACTIVE" data-pref-off-label="OFF" data-pref-on-tone="green" data-pref-off-tone="red" class="focus-ring ml-2 shrink-0 rounded-full p-1">
                      <span data-pref-track class="flex h-6 w-11 items-center rounded-full px-1"><span data-pref-thumb class="h-4 w-4 rounded-full bg-white shadow-sm"></span></span>
                    </button>
                    <span data-pref-status class="rounded-full px-2.5 py-1 font-mono text-[10px]"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="panel rounded-[22px] p-4">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Integration readiness</p>
            <div class="mt-3 grid gap-2.5">
              <div data-pref-row data-enabled="true" data-pref-on-label="CONNECTED" data-pref-off-label="DISCONNECTED" data-pref-on-tone="green" data-pref-off-tone="red" class="rounded-2xl border border-[var(--ls-border)] p-3" style="background:linear-gradient(180deg, rgba(5,150,105,0.18), rgba(5,150,105,0.07));">
                <div class="flex items-start justify-between gap-3">
                  <div class="min-w-0">
                    <p class="text-[13px] font-semibold text-[var(--ls-text-primary)]">WhatsApp alerts</p>
                    <p class="mt-1 text-xs leading-5 text-[var(--ls-text-secondary)]">Primary hearing and order notification channel is already connected.</p>
                  </div>
                  <div class="flex items-center gap-2">
                    <button type="button" role="switch" aria-checked="true" data-pref-toggle data-pref-on-label="CONNECTED" data-pref-off-label="DISCONNECTED" data-pref-on-tone="green" data-pref-off-tone="red" class="focus-ring ml-2 shrink-0 rounded-full p-1">
                      <span data-pref-track class="flex h-6 w-11 items-center rounded-full px-1"><span data-pref-thumb class="h-4 w-4 rounded-full bg-white shadow-sm"></span></span>
                    </button>
                    <span data-pref-status class="rounded-full px-2.5 py-1 font-mono text-[10px]"></span>
                  </div>
                </div>
              </div>
              <div data-pref-row data-enabled="false" data-pref-on-label="CONNECTED" data-pref-off-label="DISCONNECTED" data-pref-on-tone="green" data-pref-off-tone="red" class="rounded-2xl border border-[var(--ls-border)] p-3" style="background:linear-gradient(180deg, rgba(99,102,241,0.18), rgba(99,102,241,0.07));">
                <div class="flex items-start justify-between gap-3">
                  <div class="min-w-0">
                    <p class="text-[13px] font-semibold text-[var(--ls-text-primary)]">Google Calendar</p>
                    <p class="mt-1 text-xs leading-5 text-[var(--ls-text-secondary)]">Needed to auto-block hearings, consultations, and compliance dates.</p>
                  </div>
                  <div class="flex items-center gap-2">
                    <button type="button" role="switch" aria-checked="false" data-pref-toggle data-pref-on-label="CONNECTED" data-pref-off-label="DISCONNECTED" data-pref-on-tone="green" data-pref-off-tone="red" class="focus-ring ml-2 shrink-0 rounded-full p-1">
                      <span data-pref-track class="flex h-6 w-11 items-center rounded-full px-1"><span data-pref-thumb class="h-4 w-4 rounded-full bg-white shadow-sm"></span></span>
                    </button>
                    <span data-pref-status class="rounded-full px-2.5 py-1 font-mono text-[10px]"></span>
                  </div>
                </div>
              </div>
              <div data-pref-row data-enabled="false" data-pref-on-label="CONNECTED" data-pref-off-label="DISCONNECTED" data-pref-on-tone="green" data-pref-off-tone="red" class="rounded-2xl border border-[var(--ls-border)] p-3" style="background:linear-gradient(180deg, rgba(217,119,6,0.18), rgba(217,119,6,0.07));">
                <div class="flex items-start justify-between gap-3">
                  <div class="min-w-0">
                    <p class="text-[13px] font-semibold text-[var(--ls-text-primary)]">DigiLocker identity</p>
                    <p class="mt-1 text-xs leading-5 text-[var(--ls-text-secondary)]">Required before verified eSign and secure document identity flows activate.</p>
                  </div>
                  <div class="flex items-center gap-2">
                    <button type="button" role="switch" aria-checked="false" data-pref-toggle data-pref-on-label="CONNECTED" data-pref-off-label="DISCONNECTED" data-pref-on-tone="green" data-pref-off-tone="red" class="focus-ring ml-2 shrink-0 rounded-full p-1">
                      <span data-pref-track class="flex h-6 w-11 items-center rounded-full px-1"><span data-pref-thumb class="h-4 w-4 rounded-full bg-white shadow-sm"></span></span>
                    </button>
                    <span data-pref-status class="rounded-full px-2.5 py-1 font-mono text-[10px]"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="panel rounded-[22px] p-4">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">LegalGPT India note</p>
            <div class="mt-3 rounded-2xl border border-[var(--ls-border)] p-3 tinted-card" style="background:linear-gradient(180deg, rgba(99,102,241,0.18), rgba(43,108,176,0.08));">
              <p class="text-[13px] leading-5 text-[var(--ls-text-primary)]">If you complete profile photo, calendar sync, and delivery preferences now, your morning brief, court alerts, and consultation workspace will be persona-aware on first load.</p>
              <div class="mt-3 grid grid-cols-2 gap-2">
                <button type="button" data-action-select data-action-group="s03-desktop-side" data-action-active="false" aria-pressed="false" class="focus-ring min-h-[44px] rounded-xl border border-[var(--ls-border)] px-3 py-2 text-[13px] font-semibold text-[var(--ls-text-primary)]">Preview workspace</button>
                <button type="button" data-action-select data-action-group="s03-desktop-side" data-action-active="true" aria-pressed="true" class="focus-ring min-h-[44px] rounded-xl border border-[var(--ls-border)] px-3 py-2 text-[13px] font-semibold text-[var(--ls-text-primary)]">Continue</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    `,
    states: {
      emptyTitle: "Profile fields not completed",
      emptyBody: "Add role-specific details and accept mandatory consent to continue setup.",
      emptyJson: '{ "completion": 0, "consentRequired": true, "languages": [] }',
      errorText: "profile settings could not be saved",
      offlineText: "Offline · Showing cached profile progress from 5m ago",
    },
    accessibilityMobile: "<li>Consent switches remain paired with explanatory copy so users understand the purpose before enabling each data use.</li>",
    accessibilityDesktop: "<li>All profile values are grouped by field labels, which improves navigation for screen-reader rotor and form summary tools.</li>",
  },
  {
    filename: "S-08-legal-pro.html",
    title: "Legal Sathi — Judgment Search",
    description: "Legal Pro judgment search with filters, cross references, and citation-first results.",
    mobileActive: "Research",
    desktopActive: "Research",
    mobile: `
      <section class="panel rounded-[24px] p-4 shadow-panel">
        <div class="flex items-start justify-between gap-3">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--ls-text-secondary)]">S-08 · Case law research</p>
            <h1 class="mt-2 text-2xl font-semibold text-[var(--ls-text-primary)]">Judgment search</h1>
            <p class="mt-2 text-sm text-[var(--ls-text-secondary)]">Search across courts, acts, judges, and sections with context-aware result cards and saved research folders.</p>
          </div>
          <div class="flex items-center gap-2 rounded-full border border-[var(--ls-border)] px-3 py-1">
            <span class="grid h-7 w-7 place-items-center rounded-full border border-violet-500/25 bg-violet-500/12 text-violet-600 dark:text-violet-300">
              ${controlGlyph("search", "h-3.5 w-3.5")}
            </span>
            <span class="font-mono text-xs text-[var(--ls-text-secondary)]">4,218 HITS</span>
          </div>
        </div>
      </section>
      <section class="grid gap-3 sm:grid-cols-3">
        ${[
          ["Results", "4,218", "Delhi High Court + Supreme Court"],
          ["Saved", "18", "Folders synced"],
          ["Cross refs", "06", "Acts and precedents linked"],
        ]
          .map(
            ([label, value, meta]) => `
              <div class="panel rounded-[20px] p-4">
                <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">${label}</p>
                <p class="mt-3 font-mono text-2xl text-[var(--ls-text-primary)]">${value}</p>
                <p class="mt-2 text-xs text-[var(--ls-text-secondary)]">${meta}</p>
              </div>
            `,
          )
          .join("")}
      </section>
      <section class="panel rounded-[24px] p-4">
        <div class="rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] px-4 py-3">
          <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Current query</p>
          <p class="mt-2 text-sm text-[var(--ls-text-primary)]">Section <span class="mono">138</span> NI Act cheque dishonour notice service presumption</p>
        </div>
        <div class="mt-4 flex flex-wrap gap-2">
          ${["Delhi HC", "Supreme Court", "2024-2026", "NI Act", "Criminal"].map((chip) => `<span class="rounded-full border border-[var(--ls-border)] px-3 py-2 text-xs text-[var(--ls-text-secondary)]">${chip}</span>`).join("")}
        </div>
      </section>
      <section class="space-y-3">
        ${[
          ["Sharma v. State of Maharashtra", "(2025) 3 SCC 145", "Supreme Court", "Discusses presumptions, service requirements, and rebuttal thresholds under Section 138 NI Act."],
          ["Priya Sharma v. State", "2025 SCC OnLine Del 418", "Delhi High Court", "Clarifies deemed service where notice is refused and return memo is on record."],
          ["Apex Finlease v. Rohan Arora", "2024 SCC OnLine Del 2191", "Delhi High Court", "Useful for limitation, dispatch proof, and digital delivery evidence."],
        ]
          .map(
            ([title, citation, court, copy], index) => `
              <article class="panel rounded-[24px] p-4 ${index === 0 ? "ring-1 ring-[var(--ls-accent)]" : ""}">
                <div class="flex items-start justify-between gap-3">
                  <div>
                    <h2 class="text-base font-semibold text-[var(--ls-text-primary)]">${title}</h2>
                    <p class="mt-1 font-mono text-xs text-[var(--ls-accent-soft)]">${citation}</p>
                  </div>
                  <span class="rounded-full bg-[var(--ls-surface-2)] px-3 py-1 font-mono text-xs text-[var(--ls-text-secondary)]">${court}</span>
                </div>
                <p class="mt-3 text-sm leading-6 text-[var(--ls-text-secondary)]">${copy}</p>
                <div class="mt-4 flex gap-2">
                  <button aria-label="Open ${title}" class="focus-ring min-h-[44px] flex-1 rounded-xl bg-[var(--ls-accent)] px-4 py-3 text-sm font-semibold text-white">Open case</button>
                  <button aria-label="Save ${title} to library" class="focus-ring min-h-[44px] flex-1 rounded-xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] px-4 py-3 text-sm font-semibold text-[var(--ls-text-primary)]">Save</button>
                </div>
              </article>
            `,
          )
          .join("")}
      </section>
      <section class="panel rounded-[24px] p-4" aria-live="polite">
        <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">LegalGPT India research note</p>
        <div class="mt-3 rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] p-4">
          <p class="text-sm leading-6 text-[var(--ls-text-primary)]">The stronger line of authority appears where dispatch proof, refusal endorsement, and timeline under <span class="mono">Section 138(b)</span> are all visible in the record. Use Delhi High Court cases for service presumptions and Supreme Court cases for rebuttal threshold.</p>
        </div>
      </section>
    `,
    desktop: `
      <section class="panel rounded-[28px] p-6 shadow-float">
        <div class="flex items-start justify-between gap-6">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--ls-text-secondary)]">S-08 · Research</p>
            <h1 class="mt-2 text-3xl font-semibold text-[var(--ls-text-primary)]">Judgment search workstation</h1>
            <p class="mt-3 max-w-3xl text-sm leading-6 text-[var(--ls-text-secondary)]">Dense case research view with citation-first ranking, saved folders, cross references, and LegalGPT India drafting cues.</p>
          </div>
          ${commonChips}
        </div>
      </section>
      <section class="grid gap-6 xl:grid-cols-[280px,1.2fr,0.9fr]">
        <div class="space-y-4">
          <div class="panel rounded-[24px] p-5">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Filters</p>
            <div class="mt-4 space-y-3">
              ${["Court: Supreme Court, Delhi HC", "Act: Negotiable Instruments Act", "Section: 138, 139", "Year: 2024-2026", "Judge: Sanjiv Khanna, Prathiba M. Singh"].map((item) => `<div class="rounded-2xl bg-[var(--ls-surface-2)] p-4 text-sm text-[var(--ls-text-primary)]">${item}</div>`).join("")}
            </div>
          </div>
        </div>
        <div class="panel rounded-[24px] p-5">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Result set</p>
              <p class="mt-1 text-sm text-[var(--ls-text-primary)]">Query: Section <span class="mono">138</span> NI Act notice presumption</p>
            </div>
            <div class="flex items-center gap-2 rounded-full border border-[var(--ls-border)] px-3 py-1">
              <span class="grid h-7 w-7 place-items-center rounded-full border border-violet-500/25 bg-violet-500/12 text-violet-600 dark:text-violet-300">
                ${controlGlyph("search", "h-3.5 w-3.5")}
              </span>
              <span class="font-mono text-xs text-[var(--ls-text-secondary)]">4,218 MATCHES</span>
            </div>
          </div>
          <div class="mt-4 space-y-3">
            ${[
              ["Sharma v. State of Maharashtra", "(2025) 3 SCC 145", "Supreme Court", "Leading service-presumption discussion with detailed reasoning on rebuttal."],
              ["Priya Sharma v. State", "2025 SCC OnLine Del 418", "Delhi High Court", "Helpful on refusal endorsements and postal tracking evidence."],
              ["Apex Finlease v. Rohan Arora", "2024 SCC OnLine Del 2191", "Delhi High Court", "Useful for limitation, notice timelines, and digital delivery evidence."],
            ]
              .map(
                ([title, citation, court, copy], index) => `
                  <article class="rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] p-4 ${index === 0 ? "ring-1 ring-[var(--ls-accent)]" : ""}">
                    <div class="flex items-start justify-between gap-4">
                      <div>
                        <h2 class="text-base font-semibold text-[var(--ls-text-primary)]">${title}</h2>
                        <p class="mt-1 font-mono text-xs text-[var(--ls-accent-soft)]">${citation}</p>
                      </div>
                      <span class="rounded-full bg-[var(--ls-bg)] px-3 py-1 font-mono text-xs text-[var(--ls-text-secondary)]">${court}</span>
                    </div>
                    <p class="mt-3 text-sm leading-6 text-[var(--ls-text-secondary)]">${copy}</p>
                    <div class="mt-4 flex gap-2">
                      <button class="focus-ring min-h-[44px] rounded-xl bg-[var(--ls-accent)] px-4 py-2 text-sm font-semibold text-white">Read full text</button>
                      <button class="focus-ring min-h-[44px] rounded-xl border border-[var(--ls-border)] px-4 py-2 text-sm font-semibold text-[var(--ls-text-primary)]">Save to folder</button>
                      <button class="focus-ring min-h-[44px] rounded-xl border border-[var(--ls-border)] px-4 py-2 text-sm font-semibold text-[var(--ls-text-primary)]">Cross-reference</button>
                    </div>
                  </article>
                `,
              )
              .join("")}
          </div>
        </div>
        <div class="space-y-4">
          <div class="panel rounded-[24px] p-5" aria-live="polite">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">LegalGPT India note</p>
            <div class="mt-4 rounded-2xl bg-[var(--ls-surface-2)] p-4 text-sm leading-6 text-[var(--ls-text-primary)]">For notice-service arguments, combine Supreme Court authority on presumptions with Delhi High Court cases on refusal endorsements and courier tracking. Keep the answer citation-bound and avoid treating it as legal advice.</div>
          </div>
          <div class="panel rounded-[24px] p-5">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Saved research folders</p>
            <div class="mt-4 space-y-3">
              ${[
                ["Cheque Dishonour", "12 authorities"],
                ["Anticipatory Bail", "09 authorities"],
                ["DPDP Compliance", "17 authorities"],
              ]
                .map(([name, count]) => `<div class="rounded-2xl bg-[var(--ls-surface-2)] px-4 py-3"><div class="flex items-center justify-between gap-3"><p class="text-sm text-[var(--ls-text-primary)]">${name}</p><span class="font-mono text-xs text-[var(--ls-text-secondary)]">${count}</span></div></div>`)
                .join("")}
            </div>
          </div>
        </div>
      </section>
    `,
    states: {
      emptyTitle: "No judgments found",
      emptyBody: "Widen the court, year, or act filters to retrieve more authorities.",
      emptyJson: '{ "results": [], "total": 0, "savedFolders": 0 }',
      errorText: "judgment search results could not be loaded",
      offlineText: "Offline · Showing cached judgments and saved folders from 5m ago",
    },
    accessibilityMobile: "<li>Citation strings stay in JetBrains Mono to improve scannability and keep case references visually distinct from summaries.</li>",
    accessibilityDesktop: "<li>Search result actions are presented as labeled buttons, which makes keyboard traversal predictable across dense research lists.</li>",
  },
  {
    filename: "S-09-legal-pro.html",
    title: "Legal Sathi — Moot Court Suite",
    description: "Legal Pro moot court workspace with memorial drafting, argument building, and Phase 1 single-judge simulation.",
    mobileActive: "LegalGPT India",
    desktopActive: "LegalGPT India",
    mobile: `
      <section class="panel rounded-[24px] p-4 shadow-panel">
        <div class="flex items-start justify-between gap-3">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--ls-text-secondary)]">S-09 · Moot court suite</p>
            <h1 class="mt-2 text-2xl font-semibold text-[var(--ls-text-primary)]">Phase 1 single-judge prep</h1>
            <p class="mt-2 text-sm text-[var(--ls-text-secondary)]">Prepare memorials, argument ladders, and rebuttals with one AI judge simulation panel in the approved Phase 1 scope.</p>
          </div>
          <span class="rounded-full border border-[var(--ls-border)] px-3 py-1 font-mono text-xs text-[var(--ls-text-secondary)]">SINGLE JUDGE</span>
        </div>
      </section>
      <section class="grid gap-3 sm:grid-cols-3">
        ${[
          ["Problem bank", "512", "National + international"],
          ["Memorial draft", "78%", "2 issues pending"],
          ["Bench score", "84", "Last simulation"],
        ]
          .map(
            ([label, value, meta]) => `
              <div class="panel rounded-[20px] p-4">
                <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">${label}</p>
                <p class="mt-3 font-mono text-2xl text-[var(--ls-text-primary)]">${value}</p>
                <p class="mt-2 text-xs text-[var(--ls-text-secondary)]">${meta}</p>
              </div>
            `,
          )
          .join("")}
      </section>
      <section class="panel rounded-[24px] p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Selected moot</p>
            <p class="mt-1 text-sm text-[var(--ls-text-primary)]">NLSIU Constitutional Law Moot <span class="mono">2026</span></p>
          </div>
          <span class="rounded-full bg-[var(--ls-accent)]/15 px-3 py-1 font-mono text-xs text-[var(--ls-accent-soft)]">ROUND 02</span>
        </div>
        <div class="mt-4 space-y-3">
          <div class="rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] p-4">
            <p class="text-sm font-semibold text-[var(--ls-text-primary)]">Issue map</p>
            <p class="mt-2 text-sm text-[var(--ls-text-secondary)]">Maintainability under Article <span class="mono">226</span>, proportionality under Article <span class="mono">14</span>, and procedural fairness.</p>
          </div>
          <div class="rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] p-4">
            <p class="text-sm font-semibold text-[var(--ls-text-primary)]">Argument builder</p>
            <p class="mt-2 text-sm text-[var(--ls-text-secondary)]">Petitioner ladder ready with <span class="mono">12</span> authorities, <span class="mono">4</span> counter-arguments, and <span class="mono">2</span> weak spots flagged.</p>
          </div>
        </div>
      </section>
      <section class="panel rounded-[24px] p-4" aria-live="polite">
        <div class="flex items-center justify-between">
          <p class="text-sm font-semibold text-[var(--ls-text-primary)]">LegalGPT India judge simulation</p>
          <span class="font-mono text-xs text-[var(--ls-text-secondary)]">PHASE 1</span>
        </div>
        <div class="mt-3 space-y-3">
          <div class="rounded-2xl bg-[var(--ls-surface-2)] p-4">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Judge question</p>
            <p class="mt-2 text-sm leading-6 text-[var(--ls-text-primary)]">If your maintainability argument succeeds, why should the Court still entertain relief despite an alternate statutory remedy?</p>
          </div>
          <div class="rounded-2xl bg-[var(--ls-surface-2)] p-4">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Coach note</p>
            <p class="mt-2 text-sm leading-6 text-[var(--ls-text-primary)]">Open with exceptional circumstances, then move into proportionality and urgency. Cite only authorities already in your memorial workspace.</p>
          </div>
        </div>
      </section>
    `,
    desktop: `
      <section class="panel rounded-[28px] p-6 shadow-float">
        <div class="flex items-start justify-between gap-6">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--ls-text-secondary)]">S-09 · Moot preparation</p>
            <h1 class="mt-2 text-3xl font-semibold text-[var(--ls-text-primary)]">Single-judge moot workstation</h1>
            <p class="mt-3 max-w-3xl text-sm leading-6 text-[var(--ls-text-secondary)]">Phase 1 covers one AI judge simulation pane, memorial drafting, argument ladders, and scoring rubrics without multi-judge orchestration.</p>
          </div>
          ${commonChips}
        </div>
      </section>
      <section class="grid gap-6 xl:grid-cols-[0.85fr,1.15fr,0.9fr]">
        <div class="space-y-4">
          <div class="panel rounded-[24px] p-5">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Problem bank</p>
            <div class="mt-4 space-y-3">
              ${[
                ["Constitutional law", "148 problems"],
                ["Arbitration", "96 problems"],
                ["Criminal law", "132 problems"],
                ["Commercial law", "136 problems"],
              ]
                .map(([name, count]) => `<div class="rounded-2xl bg-[var(--ls-surface-2)] px-4 py-3"><div class="flex items-center justify-between gap-3"><p class="text-sm text-[var(--ls-text-primary)]">${name}</p><span class="font-mono text-xs text-[var(--ls-text-secondary)]">${count}</span></div></div>`)
                .join("")}
            </div>
          </div>
        </div>
        <div class="panel rounded-[24px] p-5">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Memorial workspace</p>
              <p class="mt-1 text-sm text-[var(--ls-text-primary)]">NLSIU Constitutional Law Moot <span class="mono">2026</span></p>
            </div>
            <span class="rounded-full border border-[var(--ls-border)] px-3 py-1 font-mono text-xs text-[var(--ls-text-secondary)]">DRAFT 07</span>
          </div>
          <div class="mt-4 grid gap-4 md:grid-cols-2">
            <div class="rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] p-4">
              <p class="text-sm font-semibold text-[var(--ls-text-primary)]">Issue structure</p>
              <p class="mt-2 text-sm text-[var(--ls-text-secondary)]">Maintainability, proportionality, relief, and interim prayer drafted.</p>
            </div>
            <div class="rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] p-4">
              <p class="text-sm font-semibold text-[var(--ls-text-primary)]">Authorities</p>
              <p class="mt-2 text-sm text-[var(--ls-text-secondary)]"><span class="mono">12</span> primary, <span class="mono">7</span> supporting, <span class="mono">3</span> comparative notes.</p>
            </div>
          </div>
          <div class="mt-4 rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-bg)]/55 p-4">
            <p class="text-sm font-semibold text-[var(--ls-text-primary)]">Argument builder</p>
            <ul class="mt-3 space-y-2 text-sm text-[var(--ls-text-secondary)]">
              <li>Petitioner submission opens with exceptional urgency and no efficacious alternative remedy.</li>
              <li>Counter block handles delay, maintainability challenge, and proportionality burden.</li>
              <li>Rebuttal branch cites <span class="mono">2025 SCC OnLine Del 418</span> and comparative Article <span class="mono">14</span> reasoning.</li>
            </ul>
          </div>
        </div>
        <div class="space-y-4">
          <div class="panel rounded-[24px] p-5" aria-live="polite">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Single judge simulation</p>
            <div class="mt-4 space-y-3">
              <div class="rounded-2xl bg-[var(--ls-surface-2)] p-4 text-sm leading-6 text-[var(--ls-text-primary)]">Judge asks: “Why should Article 226 relief survive when the statute creates an appeal mechanism?”</div>
              <div class="rounded-2xl bg-[var(--ls-surface-2)] p-4 text-sm leading-6 text-[var(--ls-text-primary)]">Coach response: “Lead with urgency, procedural unfairness, and irreparable prejudice before moving to merits.”</div>
            </div>
          </div>
          <div class="panel rounded-[24px] p-5">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Scoring rubric</p>
            <div class="mt-4 grid gap-3">
              ${[
                ["Knowledge of record", "88"],
                ["Bench handling", "84"],
                ["Clarity and pace", "81"],
              ]
                .map(([label, score]) => `<div class="rounded-2xl bg-[var(--ls-surface-2)] p-4"><div class="flex items-center justify-between gap-3"><p class="text-sm text-[var(--ls-text-primary)]">${label}</p><span class="font-mono text-sm text-[var(--ls-accent-soft)]">${score}</span></div></div>`)
                .join("")}
            </div>
          </div>
        </div>
      </section>
    `,
    states: {
      emptyTitle: "No moot problem selected",
      emptyBody: "Choose a problem from the bank or import one to start the memorial and judge-simulation workflow.",
      emptyJson: '{ "problem": null, "memorialDraft": false, "judgeMode": "single" }',
      errorText: "moot preparation workspace could not be loaded",
      offlineText: "Offline · Showing cached memorial draft and rubric data from 5m ago",
    },
    accessibilityMobile: "<li>The Phase 1 single-judge limitation is stated in text so product scope is clear without relying on badge styling alone.</li>",
    accessibilityDesktop: "<li>Judge prompts and coach responses are separated into labeled regions, helping assistive technology users distinguish question from guidance.</li>",
  },
  {
    filename: "S-10-legal-pro.html",
    title: "Legal Sathi — Internship Hub",
    description: "Legal Pro internship hub with listings, application tracking, AI resume builder, and mock interview launchers.",
    mobileActive: "Home",
    desktopActive: "Home",
    mobile: `
      <section class="panel rounded-[24px] p-4 shadow-panel">
        <div class="flex items-start justify-between gap-3">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--ls-text-secondary)]">S-10 · Student opportunities</p>
            <h1 class="mt-2 text-2xl font-semibold text-[var(--ls-text-primary)]">Internship hub</h1>
            <p class="mt-2 text-sm text-[var(--ls-text-secondary)]">Track legal internships, polish your profile, and launch AI interview prep from one dense student workspace.</p>
          </div>
          <span class="rounded-full border border-[var(--ls-border)] px-3 py-1 font-mono text-xs text-[var(--ls-text-secondary)]">27 OPEN</span>
        </div>
      </section>
      <section class="grid gap-3 sm:grid-cols-3">
        ${[
          ["Open roles", "27", "Litigation, policy, corporate"],
          ["Applied", "09", "3 under review"],
          ["ATS score", "87", "Resume builder synced"],
        ]
          .map(
            ([label, value, meta]) => `
              <div class="panel rounded-[20px] p-4">
                <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">${label}</p>
                <p class="mt-3 font-mono text-2xl text-[var(--ls-text-primary)]">${value}</p>
                <p class="mt-2 text-xs text-[var(--ls-text-secondary)]">${meta}</p>
              </div>
            `,
          )
          .join("")}
      </section>
      <section class="panel rounded-[24px] p-4">
        <div class="flex items-center justify-between">
          <p class="text-sm font-semibold text-[var(--ls-text-primary)]">Featured roles</p>
          <div class="flex items-center gap-2">
            <span class="font-mono text-xs text-[var(--ls-text-secondary)]">UPDATED TODAY</span>
            ${controlIconButton("filter", "Filter roles", "amber", "h-10 w-10 rounded-xl", "h-4 w-4")}
          </div>
        </div>
        <div class="mt-3 space-y-3">
          ${[
            ["Khaitan & Co.", "Corporate Internship · Mumbai", "₹25,000 stipend", "Apply by 22 Apr"],
            ["Vidhi Centre for Legal Policy", "Research Internship · Delhi", "₹18,000 stipend", "Apply by 24 Apr"],
            ["Delhi High Court Mediation Centre", "Court Internship · Delhi", "Certificate + travel allowance", "Apply by 26 Apr"],
          ]
            .map(
              ([org, role, pay, deadline]) => `
                <article class="rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] p-4">
                  <div class="flex items-start justify-between gap-3">
                    <div>
                      <h2 class="text-sm font-semibold text-[var(--ls-text-primary)]">${org}</h2>
                      <p class="mt-1 text-sm text-[var(--ls-text-secondary)]">${role}</p>
                    </div>
                    <span class="rounded-full bg-[var(--ls-bg)] px-3 py-1 font-mono text-xs text-[var(--ls-text-secondary)]">${deadline}</span>
                  </div>
                  <p class="mt-3 font-mono text-xs text-[var(--ls-accent-soft)]">${pay}</p>
                </article>
              `,
            )
            .join("")}
        </div>
      </section>
      <section class="panel rounded-[24px] p-4">
        <div class="grid gap-3">
          <button aria-label="Open AI resume builder" class="focus-ring min-h-[44px] rounded-xl bg-[var(--ls-accent)] px-4 py-3 text-left text-sm font-semibold text-white">Open AI Resume Builder</button>
          <button aria-label="Launch AI mock interview" class="focus-ring min-h-[44px] rounded-xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] px-4 py-3 text-left text-sm font-semibold text-[var(--ls-text-primary)]">Launch AI Mock Interview</button>
        </div>
        <div class="mt-4 rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] p-4" aria-live="polite">
          <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">LegalGPT India tip</p>
          <p class="mt-2 text-sm leading-6 text-[var(--ls-text-primary)]">Your AZB internship bullets convert better when “diligence” and “shareholder agreement review” appear in the first third of the resume.</p>
        </div>
      </section>
    `,
    desktop: `
      <section class="panel rounded-[28px] p-6 shadow-float">
        <div class="flex items-start justify-between gap-6">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--ls-text-secondary)]">S-10 · Internship hub</p>
            <h1 class="mt-2 text-3xl font-semibold text-[var(--ls-text-primary)]">Student opportunity command view</h1>
            <p class="mt-3 max-w-3xl text-sm leading-6 text-[var(--ls-text-secondary)]">Combines open listings, application tracking, AI resume building, and mock interview readiness in one student dashboard.</p>
          </div>
          ${commonChips}
        </div>
      </section>
      <section class="grid gap-6 xl:grid-cols-[0.9fr,1.15fr,0.95fr]">
        <div class="space-y-4">
          <div class="panel rounded-[24px] p-5">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Pipeline</p>
            <div class="mt-4 grid gap-3">
              ${[
                ["Open roles", "27"],
                ["Applied", "09"],
                ["Shortlisted", "03"],
                ["Interviews", "02"],
              ]
                .map(([label, value]) => `<div class="rounded-2xl bg-[var(--ls-surface-2)] p-4"><div class="flex items-center justify-between gap-3"><p class="text-sm text-[var(--ls-text-primary)]">${label}</p><span class="font-mono text-sm text-[var(--ls-accent-soft)]">${value}</span></div></div>`)
                .join("")}
            </div>
          </div>
          <div class="panel rounded-[24px] p-5">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Resume readiness</p>
            <div class="mt-4 rounded-2xl bg-[var(--ls-surface-2)] p-4">
              <p class="font-mono text-3xl text-[var(--ls-text-primary)]">87</p>
              <p class="mt-2 text-sm text-[var(--ls-text-secondary)]">ATS-aligned after AI rewrite suggestions from the resume builder.</p>
            </div>
          </div>
        </div>
        <div class="panel rounded-[24px] p-5">
          <div class="flex items-center justify-between">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Featured internships</p>
            ${controlIconButton("filter", "Filter roles", "amber", "h-11 w-11 rounded-xl", "h-4 w-4")}
          </div>
          <div class="mt-4 space-y-3">
            ${[
              ["Khaitan & Co.", "Corporate Internship · Mumbai", "₹25,000 stipend", "22 Apr"],
              ["Vidhi Centre for Legal Policy", "Research Internship · Delhi", "₹18,000 stipend", "24 Apr"],
              ["SAM & Co.", "Arbitration Internship · Bengaluru", "₹20,000 stipend", "25 Apr"],
              ["Delhi High Court Mediation Centre", "Court Internship · Delhi", "Travel allowance", "26 Apr"],
            ]
              .map(
                ([org, role, pay, deadline]) => `
                  <article class="rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] p-4">
                    <div class="flex items-start justify-between gap-4">
                      <div>
                        <h2 class="text-base font-semibold text-[var(--ls-text-primary)]">${org}</h2>
                        <p class="mt-1 text-sm text-[var(--ls-text-secondary)]">${role}</p>
                      </div>
                      <span class="rounded-full bg-[var(--ls-bg)] px-3 py-1 font-mono text-xs text-[var(--ls-text-secondary)]">${deadline}</span>
                    </div>
                    <div class="mt-3 flex items-center justify-between gap-3">
                      <p class="font-mono text-xs text-[var(--ls-accent-soft)]">${pay}</p>
                      <button class="focus-ring min-h-[44px] rounded-xl bg-[var(--ls-accent)] px-4 py-2 text-sm font-semibold text-white">Apply</button>
                    </div>
                  </article>
                `,
              )
              .join("")}
          </div>
        </div>
        <div class="space-y-4">
          <div class="panel rounded-[24px] p-5" aria-live="polite">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">AI actions</p>
            <div class="mt-4 space-y-3">
              <button class="focus-ring min-h-[44px] w-full rounded-xl bg-[var(--ls-accent)] px-4 py-3 text-left text-sm font-semibold text-white">Open AI Resume Builder</button>
              <button class="focus-ring min-h-[44px] w-full rounded-xl border border-[var(--ls-border)] px-4 py-3 text-left text-sm font-semibold text-[var(--ls-text-primary)]">Launch mock interview</button>
            </div>
            <div class="mt-4 rounded-2xl bg-[var(--ls-surface-2)] p-4 text-sm leading-6 text-[var(--ls-text-primary)]">LegalGPT India suggests leading with diligence work, moot ranking, and publication credits before listing research assistantship experience.</div>
          </div>
          <div class="panel rounded-[24px] p-5">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Application tracker</p>
            <div class="mt-4 space-y-3">
              ${[
                ["Khaitan & Co.", "Under review", "3 days ago"],
                ["Vidhi Centre", "Interview stage", "1 day ago"],
                ["Trilegal", "Submitted", "Today"],
              ]
                .map(([org, status, age]) => `<div class="rounded-2xl bg-[var(--ls-surface-2)] px-4 py-3"><div class="flex items-center justify-between gap-3"><div><p class="text-sm text-[var(--ls-text-primary)]">${org}</p><p class="mt-1 text-xs text-[var(--ls-text-secondary)]">${status}</p></div><span class="font-mono text-xs text-[var(--ls-text-secondary)]">${age}</span></div></div>`)
                .join("")}
            </div>
          </div>
        </div>
      </section>
    `,
    states: {
      emptyTitle: "No internships available",
      emptyBody: "Adjust location, practice-area, or stipend filters to widen the opportunity pool.",
      emptyJson: '{ "roles": [], "applications": [], "resumeScore": 0 }',
      errorText: "internship hub data could not be loaded",
      offlineText: "Offline · Showing cached listings and application tracker from 5m ago",
    },
    accessibilityMobile: "<li>Primary AI actions are separate full-width buttons so students do not confuse resume building with interview launch.</li>",
    accessibilityDesktop: "<li>Listings and tracker cards keep deadline and status text visible, avoiding icon-only meaning for application progress.</li>",
  },
  {
    filename: "S-14-legal-pro.html",
    title: "Legal Sathi — Billing and Invoices",
    description: "Legal Pro billing workspace with GST invoicing, payment tracking, retainers, and collection visibility.",
    mobileActive: "Billing",
    desktopActive: "Billing",
    mobile: `
      <section class="panel rounded-[24px] p-4 shadow-panel">
        <div class="flex items-start justify-between gap-2">
          <div class="min-w-0">
            <p class="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--ls-text-secondary)]">S-14 · Financial management</p>
            <h1 class="mt-2 text-2xl font-semibold text-[var(--ls-text-primary)]">Billing and invoices</h1>
            <p class="mt-2 text-sm text-[var(--ls-text-secondary)]">Issue GST-ready invoices, monitor collections, and keep retainers visible across active matters.</p>
          </div>
          <span class="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border border-sky-500/25 bg-gradient-to-r from-sky-500/16 via-amber-400/16 to-emerald-500/16 px-2.5 py-1 text-[10px] text-[var(--ls-text-primary)]">
            <span class="grid h-4.5 w-4.5 place-items-center rounded-full bg-[var(--ls-surface)]/70 text-[var(--ls-accent)]">
              ${navIcon("Calendar", "h-3.5 w-3.5")}
            </span>
            <span class="font-mono">18 Apr 2026</span>
          </span>
        </div>
      </section>
      <section class="panel rounded-[24px] p-4">
        <div class="flex items-center gap-2">
          <div class="min-w-0 flex-1">
            <span class="inline-flex rounded-full border border-sky-500/20 bg-gradient-to-r from-sky-500/16 to-violet-500/12 px-2.5 py-1 font-semibold uppercase tracking-[0.14em] text-[10px] text-[var(--ls-text-primary)]">Billing range</span>
            <details class="relative mt-2 block w-full max-w-full">
              <summary aria-label="Open billing date range picker" class="focus-ring inline-flex min-h-[40px] w-full max-w-full cursor-pointer items-center justify-between gap-2 rounded-xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] px-2.5">
                <span class="flex min-w-0 items-center gap-2">
                  <span class="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-[var(--ls-bg)] text-[var(--ls-accent)]">
                    ${navIcon("Calendar", "h-3.5 w-3.5")}
                  </span>
                  <span class="truncate font-mono text-[12px] text-[var(--ls-text-primary)]">01 Apr 2026 - 30 Apr 2026</span>
                </span>
                <span class="shrink-0 text-[var(--ls-text-secondary)]">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><path d="m6 9 6 6 6-6"></path></svg>
                </span>
              </summary>
              <div class="mt-2 w-[248px] max-w-[calc(100vw-64px)] rounded-[20px] border border-[var(--ls-border)] bg-[var(--ls-surface)] p-3 shadow-panel">
                <div class="flex items-center justify-between gap-2">
                  <button class="focus-ring min-h-[32px] rounded-lg border border-[var(--ls-border)] bg-[var(--ls-surface-2)] px-3 font-mono text-[11px] text-[var(--ls-text-primary)]">Today</button>
                  <div class="flex items-center gap-2">
                    <button class="focus-ring grid h-8 w-8 place-items-center rounded-lg border border-[var(--ls-border)] bg-[var(--ls-surface-2)] text-[var(--ls-text-secondary)]">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><path d="m15 6-6 6 6 6"></path></svg>
                    </button>
                    <span class="font-mono text-[12px] text-[var(--ls-text-primary)]">Apr 2026</span>
                    <button class="focus-ring grid h-8 w-8 place-items-center rounded-lg border border-[var(--ls-border)] bg-[var(--ls-surface-2)] text-[var(--ls-text-secondary)]">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><path d="m9 6 6 6-6 6"></path></svg>
                    </button>
                  </div>
                </div>
                <div class="mt-3 grid grid-cols-7 gap-1 text-center text-[9px] text-[var(--ls-text-secondary)]">
                  ${["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((day) => `<span class="py-1">${day}</span>`).join("")}
                </div>
                <div class="mt-1 grid grid-cols-7 gap-1 text-center font-mono text-[10px]">
                  ${[
                    "", "", "", "", "", "1", "2",
                    "3", "4", "5", "6", "7", "8", "9",
                    "10", "11", "12", "13", "14", "15", "16",
                    "17", "18", "19", "20", "21", "22", "23",
                    "24", "25", "26", "27", "28", "29", "30",
                  ]
                    .map((d) =>
                      d === ""
                        ? `<span class="py-1 text-transparent">.</span>`
                        : d === "1"
                          ? `<span class="rounded-lg bg-[var(--ls-accent)] px-1 py-1 text-white">${d}</span>`
                          : d === "30"
                            ? `<span class="rounded-lg border border-[var(--ls-accent)] bg-[var(--ls-accent)]/12 px-1 py-1 text-[var(--ls-accent-soft)]">${d}</span>`
                            : `<span class="rounded-lg px-1 py-1 text-[var(--ls-text-primary)]">${d}</span>`,
                    )
                    .join("")}
                </div>
              </div>
            </details>
          </div>
          <div class="mt-[22px] inline-flex min-h-[32px] shrink-0 items-center gap-1 rounded-full border border-emerald-500/35 bg-emerald-500/12 px-2 py-1 font-mono text-[10px] whitespace-nowrap text-emerald-600 dark:text-emerald-300">
            <span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
            <span>SYNCHED</span>
          </div>
        </div>
        <p class="mt-2 text-[11px] leading-5 text-[var(--ls-text-secondary)]">Collections, outstanding dues, and retainer balances refresh from the server billing ledger when the selected date range changes.</p>
      </section>
      <section class="grid grid-cols-2 gap-2">
        ${[
          ["Collections", "₹1,58,000", "April month-to-date", "linear-gradient(180deg, rgba(43,108,176,0.18), rgba(43,108,176,0.07))", "rgba(43,108,176,0.16)", "#2B6CB0", navIcon("Billing", "h-4 w-4")],
          ["Outstanding", "₹42,500", "3 invoices pending", "linear-gradient(180deg, rgba(217,119,6,0.18), rgba(217,119,6,0.08))", "rgba(217,119,6,0.16)", "#D97706", `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><path d="M12 3.5 4.5 17h15L12 3.5Z"></path><path d="M12 9v3.5M12 16h.01"></path></svg>`],
          ["Retainers", "₹85,000", "2 clients below threshold", "linear-gradient(180deg, rgba(5,150,105,0.18), rgba(5,150,105,0.08))", "rgba(5,150,105,0.16)", "#059669", navIcon("Calendar", "h-4 w-4")],
        ]
          .map(
            ([label, value, meta, outer, inner, color, icon], index) => `
              <article class="rounded-[20px] border border-[var(--ls-border)] p-4 ${index === 2 ? "col-span-2" : ""}" style="background:${outer};">
                <div class="flex items-start justify-between gap-3">
                  <div class="min-w-0">
                    <p class="text-[10px] uppercase tracking-[0.16em] text-[var(--ls-text-secondary)]">${label}</p>
                    <p class="mt-2 font-mono text-[18px] leading-none text-[var(--ls-text-primary)]">${value}</p>
                  </div>
                  <span class="grid h-8 w-8 shrink-0 place-items-center rounded-xl" style="background:${inner}; color:${color};">
                    ${icon}
                  </span>
                </div>
                <p class="mt-3 text-[11px] leading-5 text-[var(--ls-text-secondary)]">${meta}</p>
              </article>
            `,
          )
          .join("")}
      </section>
      <section class="space-y-3">
        ${[
          ["INV-2026-0418-02", "Sharma v. State of Maharashtra", "₹18,000", "Awaiting UPI payment", "Due today"],
          ["INV-2026-0417-09", "Apex Builders arbitration hearing prep", "₹24,500", "Part-paid via NEFT", "Due in 2 days"],
          ["INV-2026-0415-04", "Priya Sharma consultation package", "₹7,500", "Paid by card", "Settled"],
        ]
          .map(
            ([invoice, matter, amount, status, due]) => `
              <article class="panel rounded-[24px] p-4">
                <div class="flex items-start justify-between gap-3">
                  <div>
                    <h2 class="font-mono text-sm text-[var(--ls-text-primary)]">${invoice}</h2>
                    <p class="mt-2 text-sm text-[var(--ls-text-primary)]">${matter}</p>
                    <p class="mt-1 text-xs text-[var(--ls-text-secondary)]">${status}</p>
                  </div>
                  <div class="text-right">
                    <p class="font-mono text-sm text-[var(--ls-accent-soft)]">${amount}</p>
                    <span class="mt-2 inline-flex rounded-full border border-[var(--ls-border)] bg-[var(--ls-surface-2)] px-2.5 py-1 font-mono text-[10px] text-[var(--ls-text-secondary)]">${due}</span>
                  </div>
                </div>
              </article>
            `,
          )
          .join("")}
      </section>
      <section class="panel rounded-[24px] p-4" aria-live="polite">
        <div class="flex items-center justify-between">
          <p class="text-sm font-semibold text-[var(--ls-text-primary)]">Quick actions</p>
          <span class="font-mono text-xs text-[var(--ls-text-secondary)]">P&L SNAPSHOT</span>
        </div>
        <div class="mt-3 grid grid-cols-2 gap-2">
          <button class="focus-ring rounded-[20px] border border-sky-500/20 p-3 text-left" style="background:linear-gradient(180deg, rgba(43,108,176,0.18), rgba(43,108,176,0.07));">
            <div class="flex items-start justify-between gap-2">
              <div class="min-w-0">
                <p class="text-[10px] uppercase tracking-[0.16em] text-[var(--ls-text-secondary)]">Invoice</p>
                <p class="mt-2 text-sm font-semibold leading-5 text-[var(--ls-text-primary)]">Generate GST invoice</p>
              </div>
              <span class="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-[rgba(43,108,176,0.16)] text-[var(--ls-accent)]">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><path d="M7 3.5h7l4.5 4.5v12a1.5 1.5 0 0 1-1.5 1.5h-10A1.5 1.5 0 0 1 5.5 20V5A1.5 1.5 0 0 1 7 3.5Z"></path><path d="M14 3.5V8h4.5"></path><path d="M8.5 12h7"></path><path d="M8.5 15h7"></path><path d="M8.5 18h4"></path></svg>
              </span>
            </div>
            <p class="mt-3 text-[11px] leading-5 text-[var(--ls-text-secondary)]">Issue compliant invoices in one step.</p>
          </button>
          <button class="focus-ring rounded-[20px] border border-emerald-500/20 p-3 text-left" style="background:linear-gradient(180deg, rgba(5,150,105,0.18), rgba(5,150,105,0.08));">
            <div class="flex items-start justify-between gap-2">
              <div class="min-w-0">
                <p class="text-[10px] uppercase tracking-[0.16em] text-[var(--ls-text-secondary)]">Logs</p>
                <p class="mt-2 text-sm font-semibold leading-5 text-[var(--ls-text-primary)]">Log time and expense</p>
              </div>
              <span class="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-[rgba(5,150,105,0.16)] text-emerald-600 dark:text-emerald-300">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><circle cx="12" cy="12" r="7.5"></circle><path d="M12 8.5v4l2.5 1.5"></path></svg>
              </span>
            </div>
            <p class="mt-3 text-[11px] leading-5 text-[var(--ls-text-secondary)]">Capture billable work and case costs.</p>
          </button>
        </div>
        <div class="mt-4 rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] p-4">
          <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">LegalGPT India note</p>
          <p class="mt-2 text-sm leading-6 text-[var(--ls-text-primary)]">Two retainers are likely to drop below comfort level after next hearing expenses. Recommend raising a replenishment request before Tuesday.</p>
        </div>
      </section>
    `,
    desktop: `
      <section class="panel rounded-[28px] p-6 shadow-float">
        <div class="flex items-start justify-between gap-6">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--ls-text-secondary)]">S-14 · Billing</p>
            <h1 class="mt-2 text-3xl font-semibold text-[var(--ls-text-primary)]">Revenue and invoicing command workspace</h1>
            <p class="mt-3 max-w-3xl text-sm leading-6 text-[var(--ls-text-secondary)]">Built for lawyers and firms handling hearing fees, consultation settlements, retainers, task time logs, and GST-compliant invoices.</p>
          </div>
          <div class="flex min-w-[280px] flex-col items-end gap-3">
            <div class="flex flex-wrap gap-2">
              <span class="inline-flex items-center gap-2 rounded-full border border-sky-500/25 bg-gradient-to-r from-sky-500/16 via-amber-400/16 to-emerald-500/16 px-3 py-1.5 text-[11px] text-[var(--ls-text-primary)]">
                <span class="grid h-5 w-5 place-items-center rounded-full bg-[var(--ls-surface)]/70 text-[var(--ls-accent)]">
                  ${navIcon("Calendar", "h-3.5 w-3.5")}
                </span>
                <span class="font-mono">18 Apr 2026</span>
              </span>
              <span class="rounded-full border border-amber-500/20 bg-amber-500/12 px-3 py-1 font-mono text-[11px] text-amber-700 dark:text-amber-300">IST</span>
              <span class="rounded-full border border-violet-500/20 bg-violet-500/12 px-3 py-1 font-mono text-[11px] text-violet-700 dark:text-violet-300">AP-SOUTH-1</span>
              <span class="rounded-full border border-emerald-500/20 bg-emerald-500/12 px-3 py-1 font-mono text-[11px] text-emerald-700 dark:text-emerald-300">RLS</span>
            </div>
            <div class="w-full rounded-[20px] border border-[var(--ls-border)] bg-[var(--ls-surface-2)]/84 p-3">
              <div class="grid gap-2">
                <div class="flex items-start justify-between gap-4">
                  <div class="min-w-0 flex-1">
                    <span class="inline-flex rounded-full border border-sky-500/20 bg-gradient-to-r from-sky-500/16 to-violet-500/12 px-2.5 py-1 font-semibold uppercase tracking-[0.14em] text-[10px] text-[var(--ls-text-primary)]">Billing range</span>
                    <details class="relative mt-2 inline-block max-w-full">
                      <summary aria-label="Open billing date range picker" class="focus-ring inline-flex min-h-[40px] max-w-full cursor-pointer items-center justify-between gap-2 rounded-xl border border-[var(--ls-border)] bg-[var(--ls-surface)] px-2.5">
                        <span class="flex min-w-0 items-center gap-2">
                          <span class="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-[var(--ls-surface-2)] text-[var(--ls-accent)]">
                            ${navIcon("Calendar", "h-3.5 w-3.5")}
                          </span>
                          <span class="truncate font-mono text-[12px] text-[var(--ls-text-primary)]">01 Apr 2026 - 30 Apr 2026</span>
                        </span>
                        <span class="shrink-0 text-[var(--ls-text-secondary)]">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><path d="m6 9 6 6 6-6"></path></svg>
                        </span>
                      </summary>
                      <div class="mt-2 w-[268px] max-w-[calc(100vw-96px)] rounded-[20px] border border-[var(--ls-border)] bg-[var(--ls-surface)] p-3 shadow-panel">
                        <div class="flex items-center justify-between gap-2">
                          <button class="focus-ring min-h-[32px] rounded-lg border border-[var(--ls-border)] bg-[var(--ls-surface-2)] px-3 font-mono text-[11px] text-[var(--ls-text-primary)]">Today</button>
                          <div class="flex items-center gap-2">
                            <button class="focus-ring grid h-8 w-8 place-items-center rounded-lg border border-[var(--ls-border)] bg-[var(--ls-surface-2)] text-[var(--ls-text-secondary)]">
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><path d="m15 6-6 6 6 6"></path></svg>
                            </button>
                            <span class="font-mono text-[12px] text-[var(--ls-text-primary)]">Apr 2026</span>
                            <button class="focus-ring grid h-8 w-8 place-items-center rounded-lg border border-[var(--ls-border)] bg-[var(--ls-surface-2)] text-[var(--ls-text-secondary)]">
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><path d="m9 6 6 6-6 6"></path></svg>
                            </button>
                          </div>
                        </div>
                        <div class="mt-3 grid grid-cols-7 gap-1 text-center text-[9px] text-[var(--ls-text-secondary)]">
                          ${["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((day) => `<span class="py-1">${day}</span>`).join("")}
                        </div>
                        <div class="mt-1 grid grid-cols-7 gap-1 text-center font-mono text-[10px]">
                          ${[
                            "", "", "", "", "", "1", "2",
                            "3", "4", "5", "6", "7", "8", "9",
                            "10", "11", "12", "13", "14", "15", "16",
                            "17", "18", "19", "20", "21", "22", "23",
                            "24", "25", "26", "27", "28", "29", "30",
                          ]
                            .map((d) =>
                              d === ""
                                ? `<span class="py-1 text-transparent">.</span>`
                                : d === "1"
                                  ? `<span class="rounded-lg bg-[var(--ls-accent)] px-1 py-1 text-white">${d}</span>`
                                  : d === "30"
                                    ? `<span class="rounded-lg border border-[var(--ls-accent)] bg-[var(--ls-accent)]/12 px-1 py-1 text-[var(--ls-accent-soft)]">${d}</span>`
                                    : `<span class="rounded-lg px-1 py-1 text-[var(--ls-text-primary)]">${d}</span>`,
                            )
                            .join("")}
                        </div>
                      </div>
                    </details>
                  </div>
                  <div class="mt-6 inline-flex min-h-[36px] items-center gap-1.5 rounded-full border border-emerald-500/35 bg-emerald-500/12 px-2.5 py-1.5 font-mono text-[11px] text-emerald-600 dark:text-emerald-300">
                    <span class="h-2 w-2 rounded-full bg-emerald-500"></span>
                    <span>SYNCHED</span>
                  </div>
                </div>
                <p class="text-[11px] leading-5 text-[var(--ls-text-secondary)]">Switching the range updates collections, outstanding dues, and retainer balances from the live billing service.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="grid gap-6 xl:grid-cols-[0.88fr,1.12fr,0.9fr]">
        <div class="space-y-4">
          <div class="panel rounded-[24px] p-5">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Collections</p>
            <div class="mt-4 grid gap-3">
              ${[
                ["Collected", "₹1,58,000", "April month-to-date", "linear-gradient(180deg, rgba(43,108,176,0.18), rgba(43,108,176,0.07))", "rgba(43,108,176,0.16)", "#2B6CB0", navIcon("Billing", "h-4 w-4")],
                ["Outstanding", "₹42,500", "3 invoices pending", "linear-gradient(180deg, rgba(217,119,6,0.18), rgba(217,119,6,0.08))", "rgba(217,119,6,0.16)", "#D97706", `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><path d="M12 3.5 4.5 17h15L12 3.5Z"></path><path d="M12 9v3.5M12 16h.01"></path></svg>`],
                ["Consultation commission", "₹6,300", "15% platform fee", "linear-gradient(180deg, rgba(99,102,241,0.18), rgba(99,102,241,0.08))", "rgba(99,102,241,0.16)", "#4F46E5", `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><path d="M12 4v16M7.5 8.5c0-1.6 1.8-2.8 4.2-2.8 2.2 0 3.8 1 3.8 2.5 0 1.6-1.3 2.2-3.5 2.7-2.5.6-4.2 1.3-4.2 3.4 0 1.9 1.9 3.2 4.5 3.2 2.6 0 4.5-1.3 4.5-3.3"></path></svg>`],
                ["Receivables aging", "11d avg", "Healthy collection cycle", "linear-gradient(180deg, rgba(5,150,105,0.18), rgba(5,150,105,0.08))", "rgba(5,150,105,0.16)", "#059669", navIcon("Calendar", "h-4 w-4")],
              ]
                .map(
                  ([label, value, meta, outer, inner, color, icon]) => `
                    <div class="rounded-2xl border border-[var(--ls-border)] p-4" style="background:${outer};">
                      <div class="flex items-start justify-between gap-3">
                        <div class="min-w-0">
                          <p class="text-sm text-[var(--ls-text-primary)]">${label}</p>
                          <p class="mt-2 font-mono text-sm text-[var(--ls-accent-soft)]">${value}</p>
                        </div>
                        <span class="grid h-9 w-9 shrink-0 place-items-center rounded-xl" style="background:${inner}; color:${color};">
                          ${icon}
                        </span>
                      </div>
                      <p class="mt-3 text-xs text-[var(--ls-text-secondary)]">${meta}</p>
                    </div>
                  `,
                )
                .join("")}
            </div>
          </div>
          <div class="panel rounded-[24px] p-5">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Payment methods</p>
            <div class="mt-4 flex flex-wrap gap-2">
              ${["UPI", "NEFT", "Card", "Retainer debit"].map((method) => `<span class="rounded-full border border-[var(--ls-border)] px-3 py-2 text-xs text-[var(--ls-text-primary)]">${method}</span>`).join("")}
            </div>
          </div>
        </div>
        <div class="panel rounded-[24px] p-5">
          <div class="flex items-center justify-between">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Invoice ledger</p>
            <button class="focus-ring min-h-[44px] rounded-xl bg-[var(--ls-accent)] px-4 py-2 text-sm font-semibold text-white">New GST invoice</button>
          </div>
          <div class="mt-4 rounded-[24px] border border-[var(--ls-border)] bg-gradient-to-br from-[rgba(43,108,176,0.10)] via-[var(--ls-surface-2)] to-[rgba(99,102,241,0.08)] p-2 overflow-x-auto">
            <table class="min-w-full border-separate border-spacing-y-2 text-left text-sm">
              <thead>
                <tr class="text-[var(--ls-text-secondary)]">
                  <th class="px-4 py-2 font-medium">Invoice</th>
                  <th class="px-4 py-2 font-medium">Matter</th>
                  <th class="px-4 py-2 font-medium">Amount</th>
                  <th class="px-4 py-2 font-medium">Status</th>
                  <th class="px-4 py-2 font-medium">Due</th>
                </tr>
              </thead>
              <tbody>
                ${[
                  ["INV-2026-0418-02", "Sharma v. State of Maharashtra", "₹18,000", "Awaiting UPI", "Today", "linear-gradient(180deg, rgba(43,108,176,0.18), rgba(43,108,176,0.07))"],
                  ["INV-2026-0417-09", "Apex Builders arbitration prep", "₹24,500", "Part-paid NEFT", "20 Apr", "linear-gradient(180deg, rgba(217,119,6,0.16), rgba(217,119,6,0.06))"],
                  ["INV-2026-0415-04", "Priya Sharma consultation package", "₹7,500", "Paid", "Settled", "linear-gradient(180deg, rgba(5,150,105,0.16), rgba(5,150,105,0.06))"],
                  ["INV-2026-0414-03", "Nandini Rao DPDP advisory", "₹16,000", "Pending", "21 Apr", "linear-gradient(180deg, rgba(99,102,241,0.16), rgba(99,102,241,0.06))"],
                ]
                  .map(
                    ([invoice, matter, amount, status, due, outer]) => `
                      <tr style="background:${outer};">
                        <td class="rounded-l-2xl px-4 py-3 font-mono text-[var(--ls-text-primary)]">${invoice}</td>
                        <td class="px-4 py-3 text-[var(--ls-text-primary)]">${matter}</td>
                        <td class="px-4 py-3 font-mono text-[var(--ls-text-primary)]">${amount}</td>
                        <td class="px-4 py-3 text-[var(--ls-text-secondary)]">${status}</td>
                        <td class="rounded-r-2xl px-4 py-3 font-mono text-[var(--ls-accent-soft)]"><span class="inline-flex rounded-full border border-[var(--ls-border)] bg-[var(--ls-surface)] px-2.5 py-1 text-[11px] text-[var(--ls-text-primary)]">${due}</span></td>
                      </tr>
                    `,
                  )
                  .join("")}
              </tbody>
            </table>
          </div>
        </div>
        <div class="space-y-4">
          <div class="panel rounded-[24px] p-5" aria-live="polite">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Retainer watch</p>
            <div class="mt-4 space-y-3">
              ${[
                ["Sharma family", "₹22,000 left", "Top up this week"],
                ["Apex Builders", "₹63,000 left", "Healthy"],
                ["Nandini Rao", "₹9,500 left", "Critical"],
              ]
                .map(([client, balance, note]) => `<div class="rounded-2xl bg-[var(--ls-surface-2)] p-4"><p class="text-sm text-[var(--ls-text-primary)]">${client}</p><div class="mt-2 flex items-center justify-between gap-3"><span class="font-mono text-sm text-[var(--ls-accent-soft)]">${balance}</span><span class="text-xs text-[var(--ls-text-secondary)]">${note}</span></div></div>`)
                .join("")}
            </div>
          </div>
          <div class="panel rounded-[24px] p-5">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Expense log</p>
            <div class="mt-4 space-y-3">
              ${[
                ["Court filing", "₹2,150"],
                ["Travel to Patiala House", "₹860"],
                ["Courier and copies", "₹540"],
              ]
                .map(([item, cost]) => `<div class="rounded-2xl bg-[var(--ls-surface-2)] px-4 py-3"><div class="flex items-center justify-between gap-3"><p class="text-sm text-[var(--ls-text-primary)]">${item}</p><span class="font-mono text-xs text-[var(--ls-text-secondary)]">${cost}</span></div></div>`)
                .join("")}
            </div>
          </div>
        </div>
      </section>
    `,
    states: {
      emptyTitle: "No invoices generated",
      emptyBody: "Create a GST invoice or log billable work to start your collections ledger.",
      emptyJson: '{ "invoices": [], "outstanding": 0, "retainers": [] }',
      errorText: "billing data could not be loaded",
      offlineText: "Offline · Showing cached billing ledger from 5m ago",
    },
    accessibilityMobile: "<li>Invoice cards use visible due-date text and payment-state copy so urgency does not rely on color alone.</li>",
    accessibilityDesktop: "<li>The invoice ledger keeps column headers attached to each row for reliable keyboard and screen-reader table navigation.</li>",
  },
  {
    filename: "S-15-legal-pro.html",
    title: "Legal Sathi — Document Vault",
    description: "Legal Pro secure document vault with case folders, OCR search, version history, and eSign actions.",
    mobileActive: "Cases",
    desktopActive: "Cases",
    mobile: `
      <section class="panel rounded-[24px] p-4 shadow-panel">
        <div class="flex items-start justify-between gap-3">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--ls-text-secondary)]">S-15 · Secure repository</p>
            <h1 class="mt-2 text-2xl font-semibold text-[var(--ls-text-primary)]">Document vault</h1>
            <p class="mt-2 text-sm text-[var(--ls-text-secondary)]">Search across matter folders, preview the latest filing, download signed copies, and keep OCR results close to the case flow.</p>
          </div>
          <span class="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-emerald-500/25 bg-gradient-to-r from-emerald-500/16 via-sky-500/12 to-violet-500/12 px-2.5 py-1 text-[10px] text-[var(--ls-text-primary)]">
            <span class="grid h-4.5 w-4.5 place-items-center rounded-full bg-[var(--ls-surface)]/70 text-emerald-600 dark:text-emerald-300">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="h-3.5 w-3.5"><rect x="5.5" y="10.5" width="13" height="9" rx="2"></rect><path d="M8.5 10.5V8a3.5 3.5 0 1 1 7 0v2.5"></path></svg>
            </span>
            <span class="font-mono">AES-256</span>
          </span>
        </div>
      </section>
      <section class="panel rounded-[22px] p-3">
        <div class="flex items-center justify-between gap-3">
          <div>
            <p class="text-[10px] uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Vault search</p>
            <p class="mt-1 text-[13px] font-semibold text-[var(--ls-text-primary)]">Find files across matter folders</p>
          </div>
          <span class="rounded-full border border-sky-500/20 bg-sky-500/12 px-2 py-0.5 font-mono text-[9px] text-sky-700 dark:text-sky-300">211 OCR</span>
        </div>
        <label class="mt-2.5 flex items-center gap-2.5 rounded-[18px] border border-[var(--ls-border)] bg-[var(--ls-surface-2)] px-3 py-2.5">
          <span class="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-[var(--ls-bg)] text-[var(--ls-accent)]">
            ${navIcon("Research", "h-3.5 w-3.5")}
          </span>
          <input aria-label="Search document vault" value="bail application order copy" class="focus-ring w-full bg-transparent text-[13px] text-[var(--ls-text-primary)] placeholder:text-[var(--ls-text-secondary)] outline-none" placeholder="Search by matter, file name, or OCR text" />
        </label>
        <div class="mt-2.5 flex flex-wrap gap-1.5">
          ${["OCR text", "Matter", "Latest upload", "Download ready"].map((chip, index) => `<button class="focus-ring min-h-[32px] rounded-full px-2.5 text-[10px] ${index === 0 ? "border border-sky-500/20 bg-sky-500/12 text-sky-700 dark:text-sky-300" : "border border-[var(--ls-border)] bg-[var(--ls-surface)] text-[var(--ls-text-secondary)]"}">${chip}</button>`).join("")}
        </div>
        <p class="mt-2.5 text-[10px] leading-5 text-[var(--ls-text-secondary)]">Search matches filenames, OCR text, party names, court metadata, and version history.</p>
      </section>
      <section class="grid grid-cols-2 gap-2">
        ${[
          ["Files", "248", "Across 14 matters", "linear-gradient(180deg, rgba(43,108,176,0.16), rgba(43,108,176,0.06))", "rgba(43,108,176,0.16)", "#2B6CB0", `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><path d="M7 3.5h7l4.5 4.5v12a1.5 1.5 0 0 1-1.5 1.5h-10A1.5 1.5 0 0 1 5.5 20V5A1.5 1.5 0 0 1 7 3.5Z"></path><path d="M14 3.5V8h4.5"></path><path d="M8.5 12h7"></path><path d="M8.5 15h7"></path></svg>`],
          ["OCR hits", "37", "Searchable today", "linear-gradient(180deg, rgba(217,119,6,0.16), rgba(217,119,6,0.06))", "rgba(217,119,6,0.16)", "#D97706", navIcon("Research", "h-4 w-4")],
          ["eSign queue", "03", "Awaiting Aadhaar flow", "linear-gradient(180deg, rgba(5,150,105,0.16), rgba(5,150,105,0.06))", "rgba(5,150,105,0.16)", "#059669", `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><path d="M6 16.5c1.7-3.7 4.1-5.5 7.5-5.5 2.1 0 4 .6 5.5 1.8"></path><path d="M5.5 19.5H9l8.5-8.5a1.8 1.8 0 1 0-2.5-2.5L6.5 17v2.5Z"></path></svg>`],
        ]
          .map(
            ([label, value, meta, outer, inner, color, icon], index) => `
              <article class="rounded-[20px] border border-[var(--ls-border)] p-4 ${index === 2 ? "col-span-2" : ""}" style="background:${outer};">
                <div class="flex items-start justify-between gap-3">
                  <div class="min-w-0">
                    <p class="text-[10px] uppercase tracking-[0.16em] text-[var(--ls-text-secondary)]">${label}</p>
                    <p class="mt-2 font-mono text-[18px] leading-none text-[var(--ls-text-primary)]">${value}</p>
                  </div>
                  <span class="grid h-8 w-8 shrink-0 place-items-center rounded-xl" style="background:${inner}; color:${color};">
                    ${icon}
                  </span>
                </div>
                <p class="mt-3 text-[11px] leading-5 text-[var(--ls-text-secondary)]">${meta}</p>
              </article>
            `,
          )
          .join("")}
      </section>
      <section class="space-y-3">
        ${[
          ["Sharma v. State of Maharashtra", "Bail applications, vakalatnama, order copies", "32 files", "Order copy 18 Apr.pdf", "09:11 IST", "linear-gradient(180deg, rgba(43,108,176,0.16), rgba(43,108,176,0.06))", "OCR READY"],
          ["Apex Builders arbitration", "Pleadings, agreements, expert annexures", "54 files", "Settlement deed v4.pdf", "09:23 IST", "linear-gradient(180deg, rgba(99,102,241,0.14), rgba(99,102,241,0.06))", "eSIGN"],
          ["Nandini Rao DPDP advisory", "DPA drafts, notices, compliance tracker", "17 files", "Processor terms redline.docx", "08:42 IST", "linear-gradient(180deg, rgba(5,150,105,0.14), rgba(5,150,105,0.06))", "DOWNLOAD"],
        ]
          .map(
            ([matter, desc, count, fileName, updatedAt, outer, status]) => `
              <article class="rounded-[22px] border border-[var(--ls-border)] p-3" style="background:${outer};">
                <div class="flex items-start justify-between gap-3">
                  <div class="min-w-0">
                    <div class="flex flex-wrap items-center gap-2">
                      <h2 class="text-[13px] font-semibold text-[var(--ls-text-primary)]">${matter}</h2>
                      <span class="rounded-full border border-[var(--ls-border)] bg-[var(--ls-surface)]/65 px-2 py-0.5 font-mono text-[9px] text-[var(--ls-text-secondary)]">${count}</span>
                    </div>
                    <p class="mt-1.5 text-[12px] leading-5 text-[var(--ls-text-secondary)]">${desc}</p>
                  </div>
                  <span class="rounded-full border border-sky-500/20 bg-sky-500/12 px-2 py-0.5 font-mono text-[9px] text-sky-700 dark:text-sky-300">${status}</span>
                </div>
                <div class="mt-2.5 rounded-[18px] border border-[var(--ls-border)] bg-[var(--ls-surface)]/74 p-2.5">
                  <div class="flex items-start justify-between gap-3">
                    <div class="min-w-0">
                      <p class="text-[10px] uppercase tracking-[0.16em] text-[var(--ls-text-secondary)]">Latest document</p>
                      <p class="mt-1.5 text-[12px] text-[var(--ls-text-primary)]">${fileName}</p>
                      <p class="mt-1 font-mono text-[10px] text-[var(--ls-text-secondary)]">${updatedAt}</p>
                    </div>
                    <span class="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-[var(--ls-surface-2)] text-[var(--ls-accent)]">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><path d="M7 3.5h7l4.5 4.5v12a1.5 1.5 0 0 1-1.5 1.5h-10A1.5 1.5 0 0 1 5.5 20V5A1.5 1.5 0 0 1 7 3.5Z"></path><path d="M14 3.5V8h4.5"></path><path d="M8.5 12h7"></path><path d="M8.5 15h7"></path></svg>
                    </span>
                  </div>
                  <div class="mt-2.5 flex justify-end gap-2">
                    ${vaultActionButton("open", `Open folder for ${matter}`, "h-9 w-9 rounded-xl", "h-4 w-4")}
                    ${vaultActionLink("preview", `Preview latest document for ${matter}`, "S-15a-legal-pro.html", "h-9 w-9 rounded-xl", "h-4 w-4")}
                    ${vaultActionButton("download", `Download latest document for ${matter}`, "h-9 w-9 rounded-xl", "h-4 w-4")}
                  </div>
                </div>
              </article>
            `,
          )
          .join("")}
      </section>
      <section class="panel rounded-[24px] p-4" aria-live="polite">
        <div class="flex items-center justify-between">
          <p class="text-sm font-semibold text-[var(--ls-text-primary)]">Recent document activity</p>
          <span class="font-mono text-xs text-[var(--ls-text-secondary)]">OCR + DOWNLOAD</span>
        </div>
        <div class="mt-3 space-y-3">
          <div class="rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] p-4">
            <p class="text-sm text-[var(--ls-text-primary)]">Draft bail application <span class="mono">v6</span> uploaded and OCR-indexed at <time class="mono">09:11</time>.</p>
            <div class="mt-3 flex gap-2">
              ${vaultActionLink("preview", "Preview recent bail application", "S-15a-legal-pro.html", "h-9 w-9 rounded-full", "h-4 w-4")}
              ${vaultActionButton("download", "Download recent bail application", "h-9 w-9 rounded-full", "h-4 w-4")}
            </div>
          </div>
          <div class="rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] p-4">
            <p class="text-sm text-[var(--ls-text-primary)]">DigiLocker eSign request sent for settlement agreement in Apex Builders matter.</p>
          </div>
        </div>
      </section>
      <section class="panel rounded-[24px] p-4" aria-live="polite">
        <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">LegalGPT India note</p>
        <div class="mt-3 rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] p-4">
          <p class="text-sm leading-6 text-[var(--ls-text-primary)]">The OCR query for “indemnity carve-out” now surfaces seven transaction documents and the latest handwritten notes tagged to Apex Builders.</p>
        </div>
      </section>
    `,
    desktop: `
      <section class="panel rounded-[28px] p-6 shadow-float">
        <div class="flex items-start justify-between gap-6">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--ls-text-secondary)]">S-15 · Documents</p>
            <h1 class="mt-2 text-3xl font-semibold text-[var(--ls-text-primary)]">Case document repository workspace</h1>
            <p class="mt-3 max-w-3xl text-sm leading-6 text-[var(--ls-text-secondary)]">Search, preview, download, and route matter files through OCR, version history, and eSign without losing legal context.</p>
          </div>
          <div class="flex flex-col items-end gap-2">
            ${commonChips}
            <div class="flex flex-wrap justify-end gap-2">
              <span class="rounded-full border border-emerald-500/20 bg-emerald-500/12 px-3 py-1 font-mono text-[11px] text-emerald-700 dark:text-emerald-300">AES-256</span>
              <span class="rounded-full border border-sky-500/20 bg-sky-500/12 px-3 py-1 font-mono text-[11px] text-sky-700 dark:text-sky-300">OCR LIVE</span>
              <span class="rounded-full border border-violet-500/20 bg-violet-500/12 px-3 py-1 font-mono text-[11px] text-violet-700 dark:text-violet-300">VERSION LOG</span>
            </div>
          </div>
        </div>
      </section>
      <section class="grid gap-6 xl:grid-cols-[0.9fr,1.15fr,0.92fr]">
        <div class="space-y-4">
          <div class="panel rounded-[24px] p-5">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Repository health</p>
            <div class="mt-4 grid gap-3">
              ${[
                ["Files", "248", "linear-gradient(180deg, rgba(43,108,176,0.18), rgba(43,108,176,0.07))", "rgba(43,108,176,0.16)", "#2B6CB0", `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><path d="M7 3.5h7l4.5 4.5v12a1.5 1.5 0 0 1-1.5 1.5h-10A1.5 1.5 0 0 1 5.5 20V5A1.5 1.5 0 0 1 7 3.5Z"></path><path d="M14 3.5V8h4.5"></path><path d="M8.5 12h7"></path><path d="M8.5 15h7"></path></svg>`],
                ["OCR searchable", "211", "linear-gradient(180deg, rgba(217,119,6,0.18), rgba(217,119,6,0.07))", "rgba(217,119,6,0.16)", "#D97706", navIcon("Research", "h-4 w-4")],
                ["Signature queue", "03", "linear-gradient(180deg, rgba(5,150,105,0.18), rgba(5,150,105,0.07))", "rgba(5,150,105,0.16)", "#059669", `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><path d="M6 16.5c1.7-3.7 4.1-5.5 7.5-5.5 2.1 0 4 .6 5.5 1.8"></path><path d="M5.5 19.5H9l8.5-8.5a1.8 1.8 0 1 0-2.5-2.5L6.5 17v2.5Z"></path></svg>`],
                ["Storage growth", "+2.3 GB", "linear-gradient(180deg, rgba(99,102,241,0.18), rgba(99,102,241,0.07))", "rgba(99,102,241,0.16)", "#4F46E5", `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><path d="M12 5v14M6 11l6-6 6 6"></path></svg>`],
              ]
                .map(([label, value, outer, inner, color, icon]) => `
                  <div class="rounded-2xl border border-[var(--ls-border)] p-4" style="background:${outer};">
                    <div class="flex items-center justify-between gap-3">
                      <div class="min-w-0">
                        <p class="text-sm text-[var(--ls-text-primary)]">${label}</p>
                        <span class="mt-2 inline-block font-mono text-sm text-[var(--ls-accent-soft)]">${value}</span>
                      </div>
                      <span class="grid h-9 w-9 shrink-0 place-items-center rounded-xl" style="background:${inner}; color:${color};">
                        ${icon}
                      </span>
                    </div>
                  </div>
                `)
                .join("")}
            </div>
          </div>
          <div class="panel rounded-[24px] p-5">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Pinned filters</p>
            <div class="mt-4 flex flex-wrap gap-2">
              ${["OCR text", "Recent uploads", "Signed copies", "Client-shared"].map((chip) => `<button class="focus-ring min-h-[36px] rounded-full border border-[var(--ls-border)] bg-[var(--ls-surface-2)] px-3 text-xs text-[var(--ls-text-primary)]">${chip}</button>`).join("")}
            </div>
          </div>
        </div>
        <div class="panel rounded-[24px] p-5">
          <div class="flex items-center justify-between">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Matter folders</p>
            ${vaultActionButton("upload", "Upload document", "h-11 w-11 rounded-xl", "h-4 w-4")}
          </div>
          <label class="mt-4 flex items-center gap-3 rounded-[20px] border border-[var(--ls-border)] bg-[var(--ls-surface-2)] px-3 py-3">
            <span class="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[var(--ls-surface)] text-[var(--ls-accent)]">
              ${navIcon("Research", "h-4 w-4")}
            </span>
            <input aria-label="Search document vault on desktop" value="order copy / settlement deed" class="focus-ring w-full bg-transparent text-sm text-[var(--ls-text-primary)] placeholder:text-[var(--ls-text-secondary)] outline-none" placeholder="Search by matter, file name, citation, or OCR text" />
            <span class="rounded-full border border-sky-500/20 bg-sky-500/12 px-3 py-1 font-mono text-[11px] text-sky-700 dark:text-sky-300">211 OCR</span>
          </label>
          <div class="mt-4 space-y-3">
            ${[
              ["Sharma v. State of Maharashtra", "32 files", "Orders, applications, annexures", "Order copy 18 Apr.pdf", "09:11 IST", "OCR READY", "linear-gradient(180deg, rgba(43,108,176,0.12), rgba(43,108,176,0.05))"],
              ["Apex Builders arbitration", "54 files", "Contracts, pleadings, exhibits", "Settlement deed v4.pdf", "09:23 IST", "eSIGN", "linear-gradient(180deg, rgba(99,102,241,0.12), rgba(99,102,241,0.05))"],
              ["Nandini Rao DPDP advisory", "17 files", "Notices, policies, processor terms", "Processor terms redline.docx", "08:42 IST", "DOWNLOAD", "linear-gradient(180deg, rgba(5,150,105,0.12), rgba(5,150,105,0.05))"],
              ["Saket District Court tenancy dispute", "21 files", "Plaint, written statement, rent ledger", "Rent ledger scan.pdf", "Yesterday · 18:10", "RECENT", "linear-gradient(180deg, rgba(217,119,6,0.12), rgba(217,119,6,0.05))"],
            ]
              .map(
                ([matter, count, desc, fileName, updatedAt, status, outer]) => `
                  <article class="rounded-2xl border border-[var(--ls-border)] p-4" style="background:${outer};">
                    <div class="flex items-start justify-between gap-4">
                      <div class="min-w-0">
                        <div class="flex flex-wrap items-center gap-2">
                          <h2 class="text-base font-semibold text-[var(--ls-text-primary)]">${matter}</h2>
                          <span class="rounded-full bg-[var(--ls-surface)]/80 px-3 py-1 font-mono text-xs text-[var(--ls-text-secondary)]">${count}</span>
                          <span class="rounded-full border border-sky-500/20 bg-sky-500/12 px-2.5 py-1 font-mono text-[10px] text-sky-700 dark:text-sky-300">${status}</span>
                        </div>
                        <p class="mt-2 text-sm text-[var(--ls-text-secondary)]">${desc}</p>
                        <div class="mt-3 rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-surface)]/76 px-4 py-3">
                          <div class="flex items-center justify-between gap-3">
                            <div class="min-w-0">
                              <p class="text-[10px] uppercase tracking-[0.16em] text-[var(--ls-text-secondary)]">Latest file</p>
                              <p class="mt-2 text-sm text-[var(--ls-text-primary)]">${fileName}</p>
                            </div>
                            <span class="font-mono text-[11px] text-[var(--ls-text-secondary)]">${updatedAt}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="mt-3 flex flex-wrap gap-2">
                      ${vaultActionButton("open", `Open folder for ${matter}`, "h-10 w-10 rounded-xl", "h-4 w-4")}
                      ${vaultActionLink("preview", `Preview latest document for ${matter}`, "S-15a-legal-pro.html", "h-10 w-10 rounded-xl", "h-4 w-4")}
                      ${vaultActionButton("download", `Download latest document for ${matter}`, "h-10 w-10 rounded-xl", "h-4 w-4")}
                    </div>
                  </article>
                `,
              )
              .join("")}
          </div>
        </div>
        <div class="space-y-4">
          <div class="panel rounded-[24px] p-5">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Selected file snapshot</p>
            <div class="mt-4 rounded-[24px] border border-[var(--ls-border)] bg-gradient-to-br from-[rgba(43,108,176,0.08)] via-[var(--ls-surface-2)] to-[rgba(99,102,241,0.08)] p-4">
              <div class="rounded-[18px] border border-dashed border-[var(--ls-border)] bg-[var(--ls-surface)]/72 p-4">
                <p class="text-[10px] uppercase tracking-[0.16em] text-[var(--ls-text-secondary)]">Preview ready</p>
                <h3 class="mt-2 text-sm font-semibold text-[var(--ls-text-primary)]">Order copy 18 Apr.pdf</h3>
                <p class="mt-2 text-sm leading-6 text-[var(--ls-text-secondary)]">OCR text available, hearing tags attached, and download prepared for sharing with client.</p>
              </div>
              <div class="mt-4 grid gap-2">
                <div class="flex items-center justify-between rounded-2xl bg-[var(--ls-surface)]/78 px-4 py-3">
                  <span class="text-sm text-[var(--ls-text-secondary)]">Matter</span>
                  <span class="text-sm text-[var(--ls-text-primary)]">Sharma v. State</span>
                </div>
                <div class="flex items-center justify-between rounded-2xl bg-[var(--ls-surface)]/78 px-4 py-3">
                  <span class="text-sm text-[var(--ls-text-secondary)]">Version</span>
                  <span class="font-mono text-sm text-[var(--ls-text-primary)]">v6</span>
                </div>
              </div>
              <div class="mt-4 flex gap-2">
                ${vaultActionLink("preview", "Preview selected file", "S-15a-legal-pro.html", "h-10 w-10 rounded-xl", "h-4 w-4")}
                ${vaultActionButton("download", "Download selected file", "h-10 w-10 rounded-xl", "h-4 w-4")}
              </div>
            </div>
          </div>
          <div class="panel rounded-[24px] p-5" aria-live="polite">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Recent OCR and eSign</p>
            <div class="mt-4 space-y-3">
              ${[
                ["Bail application v6", "OCR complete · 09:11 IST"],
                ["Settlement deed.pdf", "Aadhaar eSign pending · 09:23 IST"],
                ["Court order 18 Apr", "Indexed to hearing timeline · 09:31 IST"],
              ]
                .map(([title, note]) => `<div class="rounded-2xl bg-[var(--ls-surface-2)] p-4"><p class="text-sm text-[var(--ls-text-primary)]">${title}</p><p class="mt-2 text-xs text-[var(--ls-text-secondary)]">${note}</p></div>`)
                .join("")}
            </div>
          </div>
          <div class="panel rounded-[24px] p-5">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Search recall</p>
            <div class="mt-4 rounded-2xl bg-[var(--ls-surface-2)] p-4 text-sm leading-6 text-[var(--ls-text-primary)]">Querying “indemnity carve-out” surfaces seven transaction documents and three handwritten note scans thanks to OCR matching and folder-linked metadata.</div>
          </div>
        </div>
      </section>
    `,
    states: {
      emptyTitle: "No documents uploaded",
      emptyBody: "Upload a first file or create a matter folder to initialize the vault.",
      emptyJson: '{ "folders": [], "files": [], "esignQueue": [] }',
      errorText: "document vault could not be loaded",
      offlineText: "Offline · Showing cached document index from 5m ago",
    },
    accessibilityMobile: "<li>Search input, folder cards, and preview actions use visible labels so users can find and open documents without relying on icon-only controls.</li>",
    accessibilityDesktop: "<li>Search, preview, and download actions stay grouped per matter row, making keyboard traversal predictable across the dense repository layout.</li>",
  },
  {
    filename: "S-15a-legal-pro.html",
    title: "Legal Sathi — Document Preview",
    description: "Legal Pro document preview modal with OCR text, version details, and secure download actions.",
    mobileActive: "Cases",
    desktopActive: "Cases",
    desktopStickyStyle: "top:calc(var(--ls-desktop-card-top) - 4px); gap:10px;",
    desktopStackStyle: "row-gap:10px;",
    mobile: `
      <section class="panel rounded-[24px] p-4 shadow-panel">
        <div class="flex items-start justify-between gap-3">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--ls-text-secondary)]">S-15a · Document preview</p>
            <h1 class="mt-2 text-2xl font-semibold text-[var(--ls-text-primary)]">Document preview modal</h1>
            <p class="mt-2 text-sm text-[var(--ls-text-secondary)]">Review OCR text, version history, and download the selected file without losing vault context.</p>
          </div>
          <span class="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-violet-500/25 bg-gradient-to-r from-violet-500/16 via-sky-500/12 to-emerald-500/12 px-2.5 py-1 text-[10px] text-[var(--ls-text-primary)]">
            <span class="grid h-4.5 w-4.5 place-items-center rounded-full bg-[var(--ls-surface)]/70 text-violet-700 dark:text-violet-300">
              ${vaultActionGlyph("preview", "h-3.5 w-3.5")}
            </span>
            <span class="font-mono">PREVIEW</span>
          </span>
        </div>
      </section>
      <section class="panel rounded-[24px] p-3">
        <div class="flex items-center justify-between gap-3">
          <div class="min-w-0">
            <p class="text-[10px] uppercase tracking-[0.16em] text-[var(--ls-text-secondary)]">Selected file</p>
            <h2 class="mt-1.5 truncate text-[13px] font-semibold text-[var(--ls-text-primary)]">Order copy 18 Apr.pdf</h2>
            <p class="mt-1 font-mono text-[10px] text-[var(--ls-text-secondary)]">v6 · 1.8 MB · Delhi High Court</p>
          </div>
          <div class="flex gap-2">
            ${vaultActionLink("open", "Back to Document Vault", "S-15-legal-pro.html", "h-9 w-9 rounded-xl", "h-4 w-4")}
            ${vaultActionButton("download", "Download selected document", "h-9 w-9 rounded-xl", "h-4 w-4")}
          </div>
        </div>
        <div class="mt-3 rounded-[22px] border border-[var(--ls-border)] bg-gradient-to-br from-[rgba(43,108,176,0.08)] via-[var(--ls-surface-2)] to-[rgba(99,102,241,0.08)] p-3">
          <div class="rounded-[18px] border border-[var(--ls-border)] bg-[var(--ls-surface)] p-4 shadow-panel">
            <div class="flex items-center justify-between gap-3 border-b border-[var(--ls-border)] pb-3">
              <p class="font-mono text-[11px] text-[var(--ls-text-secondary)]">Page 1 of 6</p>
              <span class="rounded-full border border-emerald-500/20 bg-emerald-500/12 px-2 py-0.5 font-mono text-[9px] text-emerald-700 dark:text-emerald-300">OCR READY</span>
            </div>
            <div class="mt-4 space-y-2.5 text-[12px] leading-6 text-[var(--ls-text-primary)]">
              <p class="font-semibold">IN THE HIGH COURT OF DELHI AT NEW DELHI</p>
              <p>Bail Application No. <span class="mono">2145/2026</span></p>
              <p>Sharma v. State of Maharashtra</p>
              <p>The petitioner seeks interim protection pending production of certified copies and relies on the order uploaded on <span class="mono">18 Apr 2026</span>.</p>
              <p>The matter is listed before Court <span class="mono">32</span>. Learned counsel submits that the annexures are already filed in the digital record.</p>
            </div>
          </div>
        </div>
        <div class="mt-3 flex items-center justify-between gap-3">
          <p class="text-[11px] text-[var(--ls-text-secondary)]">Confirm OCR text and page context before download.</p>
          <div class="flex gap-2">
            <button aria-label="Previous page" class="focus-ring grid h-9 w-9 place-items-center rounded-xl border border-amber-500/25 bg-amber-500/12 text-amber-700 dark:text-amber-300">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><path d="m15 18-6-6 6-6"></path></svg>
            </button>
            <button aria-label="Next page" class="focus-ring grid h-9 w-9 place-items-center rounded-xl border border-sky-500/25 bg-sky-500/12 text-sky-700 dark:text-sky-300">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><path d="m9 18 6-6-6-6"></path></svg>
            </button>
          </div>
        </div>
      </section>
      <section class="grid grid-cols-2 gap-2">
        ${[
          ["Matter", "Sharma v. State", "Active hearing", "linear-gradient(180deg, rgba(43,108,176,0.16), rgba(43,108,176,0.06))", "rgba(43,108,176,0.16)", "#2B6CB0", navIcon("Cases", "h-4 w-4")],
          ["Version", "v6", "Updated 09:11", "linear-gradient(180deg, rgba(99,102,241,0.16), rgba(99,102,241,0.06))", "rgba(99,102,241,0.16)", "#4F46E5", vaultActionGlyph("preview", "h-4 w-4")],
          ["Download", "Ready", "Client share enabled", "linear-gradient(180deg, rgba(5,150,105,0.16), rgba(5,150,105,0.06))", "rgba(5,150,105,0.16)", "#059669", vaultActionGlyph("download", "h-4 w-4")],
        ]
          .map(
            ([label, value, meta, outer, inner, color, icon], index) => `
              <article class="rounded-[20px] border border-[var(--ls-border)] p-4 ${index === 2 ? "col-span-2" : ""}" style="background:${outer};">
                <div class="flex items-start justify-between gap-3">
                  <div class="min-w-0">
                    <p class="text-[10px] uppercase tracking-[0.16em] text-[var(--ls-text-secondary)]">${label}</p>
                    <p class="mt-2 font-mono text-[18px] leading-none text-[var(--ls-text-primary)]">${value}</p>
                  </div>
                  <span class="grid h-8 w-8 shrink-0 place-items-center rounded-xl" style="background:${inner}; color:${color};">
                    ${icon}
                  </span>
                </div>
                <p class="mt-3 text-[11px] leading-5 text-[var(--ls-text-secondary)]">${meta}</p>
              </article>
            `,
          )
          .join("")}
      </section>
      <section class="panel rounded-[22px] p-3">
        <div class="flex items-center justify-between gap-3">
          <p class="text-sm font-semibold text-[var(--ls-text-primary)]">OCR highlights</p>
          <span class="font-mono text-[10px] text-[var(--ls-text-secondary)]">6 matches</span>
        </div>
        <div class="mt-2.5 grid gap-2">
          ${[
            ["Interim protection", "Paragraph 4", "Matched to current hearing note", "linear-gradient(180deg, rgba(43,108,176,0.14), rgba(43,108,176,0.05))", "rgba(43,108,176,0.16)", "#2B6CB0"],
            ["Certified copies", "Paragraph 6", "Useful for briefing", "linear-gradient(180deg, rgba(217,119,6,0.14), rgba(217,119,6,0.05))", "rgba(217,119,6,0.16)", "#D97706"],
            ["Court 32", "Header metadata", "Linked to alert center", "linear-gradient(180deg, rgba(99,102,241,0.14), rgba(99,102,241,0.05))", "rgba(99,102,241,0.16)", "#4F46E5"],
          ]
            .map(
              ([term, ref, note, outer, inner, color]) => `
                <div class="rounded-[16px] border border-[var(--ls-border)] p-2.5" style="background:${outer};">
                  <div class="flex items-center justify-between gap-2">
                    <div class="flex min-w-0 items-center gap-2">
                      <span class="grid h-7 w-7 shrink-0 place-items-center rounded-xl" style="background:${inner}; color:${color};">
                        ${vaultActionGlyph("preview", "h-3.5 w-3.5")}
                      </span>
                      <p class="truncate text-[11px] font-semibold text-[var(--ls-text-primary)]">${term}</p>
                    </div>
                    <span class="rounded-full border border-[var(--ls-border)] bg-[var(--ls-surface)] px-2 py-0.5 font-mono text-[8px] text-[var(--ls-text-secondary)]">${ref}</span>
                  </div>
                  <p class="mt-1.5 text-[10px] leading-5 text-[var(--ls-text-secondary)]">${note}</p>
                </div>
              `,
            )
            .join("")}
        </div>
      </section>
      <section class="panel rounded-[22px] p-3" aria-live="polite">
        <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Version log</p>
        <div class="mt-2.5 space-y-1.5">
          ${[
            ["v6", "18 Apr 2026 · 09:11", "Order copy uploaded and OCR indexed"],
            ["v5", "17 Apr 2026 · 18:42", "Clerk annotations removed"],
            ["v4", "17 Apr 2026 · 10:08", "Certified copy requested"],
          ]
            .map(
              ([version, time, note]) => `
                <div class="rounded-[16px] border border-[var(--ls-border)] bg-[var(--ls-surface-2)] px-3 py-2.5">
                  <div class="flex items-center justify-between gap-3">
                    <div class="flex items-center gap-2">
                      <span class="h-2 w-2 rounded-full bg-[var(--ls-accent)]"></span>
                      <span class="font-mono text-[10px] text-[var(--ls-accent-soft)]">${version}</span>
                    </div>
                    <span class="font-mono text-[9px] text-[var(--ls-text-secondary)]">${time}</span>
                  </div>
                  <p class="mt-1.5 text-[10px] leading-5 text-[var(--ls-text-primary)]">${note}</p>
                </div>
              `,
            )
            .join("")}
        </div>
      </section>
      <section class="panel rounded-[22px] p-3" aria-live="polite">
        <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">LegalGPT India note</p>
        <div class="mt-3 rounded-[18px] border border-violet-500/22 p-3" style="background:linear-gradient(180deg, rgba(99,102,241,0.16), rgba(43,108,176,0.08));">
          <div class="flex items-start justify-between gap-3">
            <div class="flex min-w-0 items-start gap-2.5">
              <span class="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-violet-500/16 text-violet-700 dark:text-violet-300">
                ${vaultActionGlyph("preview", "h-4 w-4")}
              </span>
              <p class="text-[12px] leading-6 text-[var(--ls-text-primary)]">The extracted text confirms the listing bench, hearing date, and interim-protection paragraph. This file can be safely downloaded for client circulation.</p>
            </div>
            <span class="rounded-full border border-violet-500/20 bg-violet-500/12 px-2 py-0.5 font-mono text-[9px] text-violet-700 dark:text-violet-300">READY</span>
          </div>
        </div>
      </section>
    `,
    desktop: `
      <section class="panel rounded-[28px] p-6 shadow-float">
        <div class="flex items-start justify-between gap-6">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--ls-text-secondary)]">S-15a · Document preview</p>
            <h1 class="mt-2 text-3xl font-semibold text-[var(--ls-text-primary)]">Document preview modal workspace</h1>
            <p class="mt-3 max-w-3xl text-sm leading-6 text-[var(--ls-text-secondary)]">Review the selected file with OCR context, version history, and secure download controls before returning to the vault.</p>
          </div>
          <div class="flex flex-col items-end gap-2">
            ${commonChips}
            <div class="flex flex-wrap justify-end gap-2">
              <span class="rounded-full border border-emerald-500/20 bg-emerald-500/12 px-3 py-1 font-mono text-[11px] text-emerald-700 dark:text-emerald-300">AES-256</span>
              <span class="rounded-full border border-sky-500/20 bg-sky-500/12 px-3 py-1 font-mono text-[11px] text-sky-700 dark:text-sky-300">OCR READY</span>
              <span class="rounded-full border border-violet-500/20 bg-violet-500/12 px-3 py-1 font-mono text-[11px] text-violet-700 dark:text-violet-300">DOWNLOAD READY</span>
            </div>
          </div>
        </div>
      </section>
      <section class="grid gap-6 xl:grid-cols-[0.26fr,1fr,0.34fr]" style="margin-top:12px;">
        <div class="space-y-4">
          <div class="panel rounded-[24px] p-5">
            <div class="flex items-center justify-between gap-3">
              <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Preview flow</p>
              ${vaultActionLink("open", "Back to Document Vault", "S-15-legal-pro.html", "h-10 w-10 rounded-xl", "h-4 w-4")}
            </div>
            <div class="mt-4 space-y-3">
              ${[
                ["Page 1", "", "bg-[var(--ls-accent)] text-white border-transparent"],
                ["Page 2", "OCR", "border border-[var(--ls-border)] bg-[var(--ls-surface-2)] text-[var(--ls-text-primary)]"],
                ["Page 3", "Notes", "border border-[var(--ls-border)] bg-[var(--ls-surface-2)] text-[var(--ls-text-primary)]"],
              ]
                .map(
                  ([page, note, classes]) => `
                    <button class="focus-ring flex min-h-[64px] w-full items-center justify-between rounded-2xl px-4 ${classes}">
                      <span class="text-sm font-semibold">${page}</span>
                      ${note ? `<span class="font-mono text-xs">${note}</span>` : `<span class="sr-only">Current page</span>`}
                    </button>
                  `,
                )
                .join("")}
            </div>
          </div>
          <div class="panel rounded-[24px] p-5">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Version log</p>
            <div class="mt-4 space-y-3">
              ${[
                ["v6", "18 Apr 2026 · 09:11", "Current order copy uploaded and indexed"],
                ["v5", "17 Apr 2026 · 18:42", "Annotation cleanup completed"],
                ["v4", "17 Apr 2026 · 10:08", "Certified copy request draft"],
              ]
                .map(
                  ([version, time, note]) => `
                    <div class="rounded-2xl bg-[var(--ls-surface-2)] p-4">
                      <div class="flex items-center justify-between gap-3">
                        <span class="font-mono text-sm text-[var(--ls-accent-soft)]">${version}</span>
                        <span class="font-mono text-xs text-[var(--ls-text-secondary)]">${time}</span>
                      </div>
                      <p class="mt-2 text-sm text-[var(--ls-text-primary)]">${note}</p>
                    </div>
                  `,
                )
                .join("")}
            </div>
          </div>
        </div>
        <div class="panel rounded-[28px] p-5 shadow-float">
          <div class="flex items-center justify-between gap-3 border-b border-[var(--ls-border)] pb-3">
            <div class="min-w-0">
              <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Selected file</p>
              <h2 class="mt-1.5 truncate text-base font-semibold text-[var(--ls-text-primary)]">Order copy 18 Apr.pdf</h2>
              <p class="mt-0.5 font-mono text-[11px] text-[var(--ls-text-secondary)]">Sharma v. State · v6 · 1.8 MB · Delhi High Court</p>
            </div>
            <div class="flex gap-1.5">
              ${vaultActionLink("preview", "Stay on preview modal", "S-15a-legal-pro.html", "h-9 w-9 rounded-xl", "h-4 w-4")}
              ${vaultActionButton("download", "Download selected document", "h-9 w-9 rounded-xl", "h-4 w-4")}
            </div>
          </div>
          <div class="mt-5 rounded-[24px] border border-[var(--ls-border)] bg-gradient-to-br from-[rgba(43,108,176,0.08)] via-[var(--ls-surface-2)] to-[rgba(99,102,241,0.08)] p-5">
            <div class="mx-auto max-w-[720px] rounded-[20px] border border-[var(--ls-border)] bg-[var(--ls-surface)] p-8 shadow-panel">
              <div class="flex items-center justify-between gap-3 border-b border-[var(--ls-border)] pb-4">
                <p class="font-mono text-xs text-[var(--ls-text-secondary)]">Page 1 of 6</p>
                <span class="rounded-full border border-emerald-500/20 bg-emerald-500/12 px-3 py-1 font-mono text-[10px] text-emerald-700 dark:text-emerald-300">OCR READY</span>
              </div>
              <div class="mt-6 space-y-4 text-sm leading-7 text-[var(--ls-text-primary)]">
                <p class="text-center font-semibold uppercase tracking-[0.16em]">IN THE HIGH COURT OF DELHI AT NEW DELHI</p>
                <p>Bail Application No. <span class="mono">2145/2026</span></p>
                <p>Sharma v. State of Maharashtra</p>
                <p>The petitioner seeks interim protection pending production of certified copies and relies on the order uploaded on <span class="mono">18 Apr 2026</span> from Court <span class="mono">32</span>.</p>
                <p>The annexures have been digitally filed. Counsel requests that the current order be circulated to the client and kept pinned in the matter vault.</p>
                <p>The record also reflects that the certified copy request was logged and the digital upload completed at <span class="mono">09:11 IST</span>.</p>
              </div>
            </div>
          </div>
          <div class="mt-4 flex items-center justify-between gap-3">
            <p class="text-sm text-[var(--ls-text-secondary)]">Use this preview to confirm OCR text, version, and page context before download.</p>
            <div class="flex gap-2">
              <button aria-label="Previous page" class="focus-ring grid h-10 w-10 place-items-center rounded-xl border border-amber-500/25 bg-amber-500/12 text-amber-700 dark:text-amber-300">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><path d="m15 18-6-6 6-6"></path></svg>
              </button>
              <button aria-label="Next page" class="focus-ring grid h-10 w-10 place-items-center rounded-xl border border-sky-500/25 bg-sky-500/12 text-sky-700 dark:text-sky-300">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><path d="m9 18 6-6-6-6"></path></svg>
              </button>
            </div>
          </div>
          <div class="mt-3 rounded-2xl border border-violet-500/22 px-4 py-3" style="background:linear-gradient(180deg, rgba(99,102,241,0.16), rgba(43,108,176,0.08));">
            <div class="flex items-start justify-between gap-3">
              <div class="flex min-w-0 items-start gap-3">
                <span class="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-violet-500/16 text-violet-700 dark:text-violet-300">
                  ${vaultActionGlyph("preview", "h-4 w-4")}
                </span>
                <div class="min-w-0">
                <p class="text-[10px] uppercase tracking-[0.16em] text-[var(--ls-text-secondary)]">LegalGPT India note</p>
                <p class="mt-1.5 text-sm leading-6 text-[var(--ls-text-primary)]">The selected order contains the most recent hearing reference, interim-protection language, and bench details. Safe to download for internal circulation.</p>
              </div>
              </div>
              <span class="rounded-full border border-violet-500/20 bg-violet-500/12 px-2.5 py-1 font-mono text-[10px] text-violet-700 dark:text-violet-300">READY</span>
            </div>
          </div>
        </div>
        <div class="space-y-4">
          <div class="panel rounded-[24px] p-5">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Metadata</p>
            <div class="mt-4 space-y-3">
              ${[
                ["Matter", "Sharma v. State of Maharashtra", "linear-gradient(180deg, rgba(43,108,176,0.18), rgba(43,108,176,0.07))", "rgba(43,108,176,0.16)", "#2B6CB0", navIcon("Cases", "h-4 w-4")],
                ["Court", "Delhi High Court · Court 32", "linear-gradient(180deg, rgba(217,119,6,0.18), rgba(217,119,6,0.07))", "rgba(217,119,6,0.16)", "#D97706", navIcon("Calendar", "h-4 w-4")],
                ["Uploaded by", "R. Barnwal · Clerk sync", "linear-gradient(180deg, rgba(5,150,105,0.18), rgba(5,150,105,0.07))", "rgba(5,150,105,0.16)", "#059669", vaultActionGlyph("upload", "h-4 w-4")],
                ["Checksum", "sha256:91af...c804", "linear-gradient(180deg, rgba(99,102,241,0.18), rgba(99,102,241,0.07))", "rgba(99,102,241,0.16)", "#4F46E5", `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><path d="M7.5 8.5h9M7.5 12h6M7.5 15.5h4"></path><rect x="5" y="4.5" width="14" height="15" rx="2"></rect></svg>`],
              ]
                .map(
                  ([label, value, outer, inner, color, icon]) => `
                    <div class="rounded-2xl border border-[var(--ls-border)] p-4" style="background:${outer};">
                      <div class="flex items-center justify-between gap-3">
                        <div class="min-w-0">
                          <span class="text-sm text-[var(--ls-text-secondary)]">${label}</span>
                          <p class="mt-1.5 font-mono text-xs text-[var(--ls-text-primary)]">${value}</p>
                        </div>
                        <span class="grid h-9 w-9 shrink-0 place-items-center rounded-xl" style="background:${inner}; color:${color};">
                          ${icon}
                        </span>
                      </div>
                    </div>
                  `,
                )
                .join("")}
            </div>
          </div>
          <div class="panel rounded-[24px] p-5">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">OCR highlights</p>
            <div class="mt-4 space-y-3">
              ${[
                ["Interim protection", "Paragraph 4", "Useful for hearing note export", "This phrase appears in the operative part of the order and should be pinned in the hearing brief.", "linear-gradient(180deg, rgba(43,108,176,0.16), rgba(43,108,176,0.07))", "rgba(43,108,176,0.16)", "#2B6CB0"],
                ["Certified copies", "Paragraph 6", "Client update draft suggested", "The order specifically references the pending certified copies and supports the next client communication.", "linear-gradient(180deg, rgba(217,119,6,0.16), rgba(217,119,6,0.07))", "rgba(217,119,6,0.16)", "#D97706"],
                ["Court 32", "Header metadata", "Linked to court alerts center", "Bench and courtroom mapping match the existing alert entry, so the vault record is consistent.", "linear-gradient(180deg, rgba(99,102,241,0.16), rgba(99,102,241,0.07))", "rgba(99,102,241,0.16)", "#4F46E5"],
              ]
                .map(
                  ([term, ref, note, body, outer, inner, color]) => `
                    <div class="rounded-2xl border border-[var(--ls-border)] p-4" style="background:${outer};">
                      <div class="flex items-start justify-between gap-3">
                        <div class="min-w-0">
                          <div class="flex items-center gap-2">
                            <span class="grid h-9 w-9 shrink-0 place-items-center rounded-xl" style="background:${inner}; color:${color};">
                              ${vaultActionGlyph("preview", "h-4 w-4")}
                            </span>
                            <span class="text-sm font-semibold text-[var(--ls-text-primary)]">${term}</span>
                          </div>
                          <p class="mt-3 text-sm text-[var(--ls-text-secondary)]">${note}</p>
                        </div>
                        <span class="rounded-full border border-[var(--ls-border)] bg-[var(--ls-surface)] px-2.5 py-1 font-mono text-[10px] text-[var(--ls-text-secondary)]">${ref}</span>
                      </div>
                      <div class="mt-3 rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-surface)]/76 px-4 py-3">
                        <p class="text-sm leading-6 text-[var(--ls-text-primary)]">${body}</p>
                      </div>
                    </div>
                  `,
                )
                .join("")}
            </div>
          </div>
        </div>
      </section>
    `,
    states: {
      emptyTitle: "No document selected",
      emptyBody: "Choose a file from the vault to open preview, OCR highlights, and download controls.",
      emptyJson: '{ "selectedFile": null, "ocrHighlights": [], "versions": [] }',
      errorText: "document preview could not be loaded",
      offlineText: "Offline · Showing cached document preview from 5m ago",
    },
    accessibilityMobile: "<li>Preview, back, and download actions stay visible as labeled icon buttons so document handling remains clear on smaller screens.</li>",
    accessibilityDesktop: "<li>The preview surface, version log, and metadata panels are visually separated to support comparison without losing reading position.</li>",
  },
  {
    filename: "S-16-legal-pro.html",
    title: "Legal Sathi — Calendar and Scheduler",
    description: "Legal Pro calendar with hearing blocks, sync state, conflict checks, and AI-set compliance dates.",
    mobileActive: "Calendar",
    desktopActive: "Calendar",
    desktopStickyStyle: "top:calc(var(--ls-desktop-card-top) - 4px); gap:10px;",
    desktopStackStyle: "row-gap:10px;",
    mobile: `
      <section class="panel rounded-[24px] p-4 shadow-panel">
        <div class="flex items-start justify-between gap-3">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--ls-text-secondary)]">S-16 · Unified scheduler</p>
            <h1 class="mt-2 text-2xl font-semibold text-[var(--ls-text-primary)]">Calendar and scheduler</h1>
            <p class="mt-2 text-sm text-[var(--ls-text-secondary)]">See hearings, consultations, travel buffers, and personal events in one synchronized legal calendar.</p>
          </div>
          <button class="focus-ring inline-flex min-h-[36px] shrink-0 items-center gap-1.5 rounded-full border border-emerald-500/35 bg-emerald-500/12 px-3 py-1.5 font-mono text-[10px] text-emerald-600 dark:text-emerald-300">
            <span class="h-2 w-2 rounded-full bg-current"></span>
            <span>SYNCHED</span>
          </button>
        </div>
      </section>
      <section class="grid gap-3 sm:grid-cols-3">
        ${[
          ["Hearings", "05", "Today"],
          ["Meetings", "03", "Client + tutor sessions"],
          ["Conflicts", "01", "Travel overlap flagged"],
        ]
          .map(
            ([label, value, meta]) => `
              <div class="panel rounded-[20px] p-4">
                <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">${label}</p>
                <p class="mt-3 font-mono text-2xl text-[var(--ls-text-primary)]">${value}</p>
                <p class="mt-2 text-xs text-[var(--ls-text-secondary)]">${meta}</p>
              </div>
            `,
          )
          .join("")}
      </section>
      <section class="panel rounded-[24px] p-4">
        <div class="flex rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] p-1">
          <button class="focus-ring min-h-[44px] flex-1 rounded-xl bg-[var(--ls-accent)] px-4 py-2 text-sm font-semibold text-white">Day</button>
          <button class="focus-ring min-h-[44px] flex-1 rounded-xl px-4 py-2 text-sm font-semibold text-[var(--ls-text-secondary)]">Week</button>
          <button class="focus-ring min-h-[44px] flex-1 rounded-xl px-4 py-2 text-sm font-semibold text-[var(--ls-text-secondary)]">Month</button>
        </div>
        <div class="mt-4 space-y-3">
          ${[
            ["09:30", "Delhi High Court · Court 32", "Sharma v. State of Maharashtra", "Travel ETA 18m"],
            ["12:45", "Client consultation · Video", "Nandini Rao DPDP advisory", "Agora token after payment"],
            ["15:15", "Patiala House filing", "Apex Builders reply affidavit", "Compliance date auto-set"],
          ]
            .map(
              ([time, venue, matter, meta]) => `
                <article class="rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] p-4">
                  <div class="flex items-start justify-between gap-3">
                    <div>
                      <p class="font-mono text-sm text-[var(--ls-accent-soft)]">${time}</p>
                      <p class="mt-2 text-sm font-semibold text-[var(--ls-text-primary)]">${venue}</p>
                      <p class="mt-1 text-sm text-[var(--ls-text-secondary)]">${matter}</p>
                    </div>
                    <span class="rounded-full bg-[var(--ls-bg)] px-3 py-1 text-xs text-[var(--ls-text-secondary)]">${meta}</span>
                  </div>
                </article>
              `,
            )
            .join("")}
        </div>
      </section>
      <section class="panel rounded-[24px] p-4" aria-live="polite">
        <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">LegalGPT India scheduler note</p>
        <div class="mt-3 rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] p-4">
          <p class="text-sm leading-6 text-[var(--ls-text-primary)]">The order uploaded in Apex Builders adds a reply deadline on <time class="mono">22 Apr 2026</time>. A draft reminder and filing block have been inserted.</p>
        </div>
      </section>
      ${mobileDrawer(
        "Synch",
        "Calendar integrations and conflict checks",
        `
          <div class="space-y-3">
            ${[
              ["Google Calendar", "Primary litigation and consultation calendar", "SYNCHED", "border-emerald-500/35 bg-emerald-500/12 text-emerald-600 dark:text-emerald-300", "linear-gradient(180deg, rgba(43,108,176,0.18), rgba(43,108,176,0.07))", "rgba(43,108,176,0.16)", "#2B6CB0", navIcon("Calendar", "h-4 w-4")],
              ["Outlook", "Firm team schedule mirrored for partner reviews", "SYNCHED", "border-emerald-500/35 bg-emerald-500/12 text-emerald-600 dark:text-emerald-300", "linear-gradient(180deg, rgba(99,102,241,0.18), rgba(99,102,241,0.07))", "rgba(99,102,241,0.16)", "#4F46E5", `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><path d="M4.5 7.5h15v9h-15z"></path><path d="m5.5 8.5 6.5 5 6.5-5"></path></svg>`],
              ["Conflict checker", "One overlap flagged between court travel and consultation", "1 FLAG", "border-red-500/35 bg-red-500/12 text-red-600 dark:text-red-300", "linear-gradient(180deg, rgba(239,68,68,0.18), rgba(239,68,68,0.07))", "rgba(239,68,68,0.16)", "#DC2626", `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><path d="M12 9.5v4"></path><path d="M12 17h.01"></path><path d="M10.3 4.9 3.9 16a1.5 1.5 0 0 0 1.3 2.2h13.6a1.5 1.5 0 0 0 1.3-2.2L13.7 4.9a1.5 1.5 0 0 0-2.6 0Z"></path></svg>`],
            ]
              .map(
                ([label, meta, value, pillClasses, outer, inner, color, icon]) => `
                  <div class="rounded-2xl border border-[var(--ls-border)] p-3.5" style="background:${outer};">
                    <div class="flex items-center justify-between gap-3">
                      <div class="flex min-w-0 items-center gap-3">
                        <span class="grid h-9 w-9 shrink-0 place-items-center rounded-xl" style="background:${inner}; color:${color};">
                          ${icon}
                        </span>
                        <div class="min-w-0">
                          <p class="text-sm text-[var(--ls-text-primary)]">${label}</p>
                          <p class="mt-1 text-xs leading-5 text-[var(--ls-text-secondary)]">${meta}</p>
                        </div>
                      </div>
                      <button class="focus-ring inline-flex min-h-[34px] shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 font-mono text-[10px] ${pillClasses}">
                        <span class="h-2 w-2 rounded-full bg-current"></span>
                        <span>${value}</span>
                      </button>
                    </div>
                  </div>
                `,
              )
              .join("")}
          </div>
        `,
      )}
    `,
    desktop: `
      <section class="panel rounded-[28px] p-6 shadow-float">
        <div class="flex items-start justify-between gap-6">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--ls-text-secondary)]">S-16 · Calendar</p>
            <h1 class="mt-2 text-3xl font-semibold text-[var(--ls-text-primary)]">Hearing and scheduling workspace</h1>
            <p class="mt-3 max-w-3xl text-sm leading-6 text-[var(--ls-text-secondary)]">Designed for day, week, and month views with travel buffers, consultation slots, synced calendars, and AI-derived compliance dates.</p>
          </div>
          <div class="flex flex-wrap gap-2">
            <span class="inline-flex items-center gap-2 rounded-full border border-sky-500/25 bg-gradient-to-r from-sky-500/16 via-amber-400/16 to-violet-500/12 px-3 py-1.5 text-[11px] text-[var(--ls-text-primary)]">
              <span class="grid h-5 w-5 place-items-center rounded-full bg-[var(--ls-surface)]/70 text-[var(--ls-accent)]">
                ${navIcon("Calendar", "h-3.5 w-3.5")}
              </span>
              <span class="font-mono">18 Apr 2026</span>
            </span>
            <span class="rounded-full border border-amber-500/20 bg-amber-500/12 px-3 py-1 font-mono text-[11px] text-amber-700 dark:text-amber-300">IST</span>
            <span class="rounded-full border border-violet-500/20 bg-violet-500/12 px-3 py-1 font-mono text-[11px] text-violet-700 dark:text-violet-300">AP-SOUTH-1</span>
            <span class="rounded-full border border-emerald-500/20 bg-emerald-500/12 px-3 py-1 font-mono text-[11px] text-emerald-700 dark:text-emerald-300">RLS</span>
          </div>
        </div>
      </section>
      <section class="grid gap-6 xl:grid-cols-[0.9fr,1.15fr,0.92fr]" style="margin-top:12px;">
        <div class="relative z-10 space-y-4">
          <div class="panel relative z-10 rounded-[24px] p-5" style="background:linear-gradient(180deg, rgba(5,150,105,0.12), rgba(5,150,105,0.04));">
            <div class="flex items-center justify-between gap-3">
              <div class="flex items-center gap-3">
                <span class="grid h-10 w-10 shrink-0 place-items-center rounded-2xl border border-emerald-500/22 bg-emerald-500/12 text-emerald-700 dark:text-emerald-300">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><path d="M20 6v5h-5"></path><path d="M4 18v-5h5"></path><path d="M6.8 9A7 7 0 0 1 18 7l2 4"></path><path d="M17.2 15A7 7 0 0 1 6 17l-2-4"></path></svg>
                </span>
                <div>
                  <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Synch</p>
                  <p class="mt-1 text-sm text-[var(--ls-text-primary)]">Calendar integrations and conflict checks</p>
                </div>
              </div>
              <button class="focus-ring inline-flex min-h-[36px] items-center gap-1.5 rounded-full border border-emerald-500/35 bg-emerald-500/12 px-3 py-1.5 font-mono text-[11px] text-emerald-600 dark:text-emerald-300">
                <span class="h-2 w-2 rounded-full bg-current"></span>
                <span>SYNCHED</span>
              </button>
            </div>
            <div class="mt-4 space-y-3">
              ${[
                ["Google Calendar", "Primary litigation and consultation calendar", "SYNCHED", "border-emerald-500/35 bg-emerald-500/12 text-emerald-600 dark:text-emerald-300", "linear-gradient(180deg, rgba(43,108,176,0.18), rgba(43,108,176,0.07))", "rgba(43,108,176,0.16)", "#2B6CB0", navIcon("Calendar", "h-4 w-4")],
                ["Outlook", "Firm team schedule mirrored for partner reviews", "SYNCHED", "border-emerald-500/35 bg-emerald-500/12 text-emerald-600 dark:text-emerald-300", "linear-gradient(180deg, rgba(99,102,241,0.18), rgba(99,102,241,0.07))", "rgba(99,102,241,0.16)", "#4F46E5", `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><path d="M4.5 7.5h15v9h-15z"></path><path d="m5.5 8.5 6.5 5 6.5-5"></path></svg>`],
                ["Conflict checker", "One overlap flagged between court travel and consultation", "1 FLAG", "border-red-500/35 bg-red-500/12 text-red-600 dark:text-red-300", "linear-gradient(180deg, rgba(239,68,68,0.18), rgba(239,68,68,0.07))", "rgba(239,68,68,0.16)", "#DC2626", `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><path d="M12 9.5v4"></path><path d="M12 17h.01"></path><path d="M10.3 4.9 3.9 16a1.5 1.5 0 0 0 1.3 2.2h13.6a1.5 1.5 0 0 0 1.3-2.2L13.7 4.9a1.5 1.5 0 0 0-2.6 0Z"></path></svg>`],
                ["Quiet hours", "Push and email muted outside chamber hours", "ACTIVE", "border-emerald-500/35 bg-emerald-500/12 text-emerald-600 dark:text-emerald-300", "linear-gradient(180deg, rgba(5,150,105,0.18), rgba(5,150,105,0.07))", "rgba(5,150,105,0.16)", "#059669", `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><path d="M12 3.5a7.5 7.5 0 1 0 7.5 7.5A6 6 0 0 1 12 3.5Z"></path></svg>`],
              ]
                .map(
                  ([label, meta, value, pillClasses, outer, inner, color, icon]) => `
                    <div class="rounded-2xl border border-[var(--ls-border)] p-4" style="background:${outer};">
                      <div class="flex items-center justify-between gap-3">
                        <div class="flex items-center gap-3">
                          <span class="grid h-9 w-9 shrink-0 place-items-center rounded-xl" style="background:${inner}; color:${color};">
                            ${icon}
                          </span>
                          <div>
                            <p class="text-sm text-[var(--ls-text-primary)]">${label}</p>
                            <p class="mt-1 text-xs text-[var(--ls-text-secondary)]">${meta}</p>
                          </div>
                        </div>
                        <button class="focus-ring inline-flex min-h-[34px] items-center gap-1.5 rounded-full border px-3 py-1.5 font-mono text-[11px] ${pillClasses}">
                          <span class="h-2 w-2 rounded-full bg-current"></span>
                          <span>${value}</span>
                        </button>
                      </div>
                    </div>
                  `,
                )
                .join("")}
            </div>
          </div>
        </div>
        <div class="panel rounded-[24px] p-5" style="background:linear-gradient(180deg, rgba(14,165,233,0.12), rgba(14,165,233,0.04));">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <span class="grid h-10 w-10 shrink-0 place-items-center rounded-2xl border border-sky-500/22 bg-sky-500/12 text-sky-700 dark:text-sky-300">
                ${navIcon("Calendar", "h-4 w-4")}
              </span>
              <div>
                <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Week planner</p>
                <p class="mt-1 text-sm text-[var(--ls-text-primary)]">Hearings, consultations, and filing buffers</p>
              </div>
            </div>
            <div class="flex gap-2">
              ${["Day", "Week", "Month"].map((view, i) => `<button class="focus-ring min-h-[44px] rounded-xl px-4 py-2 text-sm font-semibold ${i === 1 ? "bg-[var(--ls-accent)] text-white" : "border border-[var(--ls-border)] text-[var(--ls-text-primary)]"}">${view}</button>`).join("")}
            </div>
          </div>
          <div class="mt-4 space-y-3">
            ${[
              ["Mon 18 Apr · 09:30", "Delhi High Court Court 32", "Sharma v. State of Maharashtra", "Travel ETA 18m", "linear-gradient(180deg, rgba(43,108,176,0.12), rgba(43,108,176,0.05))"],
              ["Mon 18 Apr · 12:45", "Video consultation", "Nandini Rao DPDP advisory", "Paid and confirmed", "linear-gradient(180deg, rgba(99,102,241,0.12), rgba(99,102,241,0.05))"],
              ["Mon 18 Apr · 15:15", "Patiala House filing", "Apex Builders reply affidavit", "Reply deadline linked", "linear-gradient(180deg, rgba(217,119,6,0.12), rgba(217,119,6,0.05))"],
              ["Tue 19 Apr · 11:00", "Firm review call", "Apex settlement draft", "Partner approval", "linear-gradient(180deg, rgba(5,150,105,0.12), rgba(5,150,105,0.05))"],
            ]
              .map(
                ([time, venue, matter, meta, outer]) => `
                  <article class="rounded-2xl border border-[var(--ls-border)] p-4" style="background:${outer};">
                    <div class="flex items-start justify-between gap-4">
                      <div>
                        <p class="font-mono text-xs text-[var(--ls-accent-soft)]">${time}</p>
                        <p class="mt-2 text-sm font-semibold text-[var(--ls-text-primary)]">${venue}</p>
                        <p class="mt-1 text-sm text-[var(--ls-text-secondary)]">${matter}</p>
                      </div>
                      <span class="rounded-full bg-[var(--ls-bg)] px-3 py-1 text-xs text-[var(--ls-text-secondary)]">${meta}</span>
                    </div>
                  </article>
                `,
              )
              .join("")}
          </div>
        </div>
        <div class="space-y-4">
          <div class="panel rounded-[24px] p-5" aria-live="polite" style="background:linear-gradient(180deg, rgba(99,102,241,0.12), rgba(99,102,241,0.04));">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Compliance dates</p>
            <div class="mt-4 space-y-3">
              ${[
                ["Apex Builders reply deadline", "22 Apr 2026", "linear-gradient(180deg, rgba(43,108,176,0.18), rgba(43,108,176,0.07))"],
                ["Sharma certified copy reminder", "19 Apr 2026", "linear-gradient(180deg, rgba(99,102,241,0.18), rgba(99,102,241,0.07))"],
                ["Consultation follow-up note", "18 Apr 2026 · 18:00", "linear-gradient(180deg, rgba(5,150,105,0.18), rgba(5,150,105,0.07))"],
              ]
                .map(([item, due, outer]) => `<div class="rounded-2xl border border-[var(--ls-border)] p-4" style="background:${outer};"><p class="text-sm text-[var(--ls-text-primary)]">${item}</p><p class="mt-2 font-mono text-xs text-[var(--ls-text-secondary)]">${due}</p></div>`)
                .join("")}
            </div>
          </div>
          <div class="panel rounded-[24px] p-5" style="background:linear-gradient(180deg, rgba(244,114,182,0.12), rgba(244,114,182,0.04));">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Conflicts</p>
            <div class="mt-4 rounded-2xl border border-[var(--ls-border)] p-4 text-sm leading-6 text-[var(--ls-text-primary)]" style="background:linear-gradient(180deg, rgba(244,114,182,0.18), rgba(244,114,182,0.07));">A travel overlap is flagged between Saket District Court and a video consultation. Suggest moving the consultation to <time class="mono">13:30</time>.</div>
          </div>
        </div>
      </section>
    `,
    states: {
      emptyTitle: "No calendar entries",
      emptyBody: "Connect a calendar or add a hearing block to initialize your schedule.",
      emptyJson: '{ "events": [], "conflicts": 0, "complianceDates": [] }',
      errorText: "calendar data could not be synchronized",
      offlineText: "Offline · Showing cached schedule from 5m ago",
    },
    accessibilityMobile: "<li>Each event card preserves time, venue, and matter name as separate text lines for easier announcement and glance reading.</li>",
    accessibilityDesktop: "<li>View toggles use labeled buttons instead of icon-only controls, improving keyboard clarity across day, week, and month modes.</li>",
  },
  {
    filename: "S-17-legal-pro.html",
    title: "Legal Sathi — Notifications Center",
    description: "Legal Pro consolidated notifications feed with priority sorting, read states, and quiet-hour controls.",
    mobileActive: "Home",
    desktopActive: "Home",
    desktopStickyStyle: "top:calc(var(--ls-desktop-card-top) - 4px); gap:10px;",
    desktopStackStyle: "row-gap:10px;",
    desktopMainStyle:
      "background-color: color-mix(in srgb, var(--ls-bg) 76%, white 24%); background-image: linear-gradient(rgba(144,164,183,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(144,164,183,0.05) 1px, transparent 1px); background-size:24px 24px;",
    mobile: `
      <section class="panel rounded-[24px] p-4 shadow-panel">
        <div class="flex items-start justify-between gap-3">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--ls-text-secondary)]">S-17 · Notification center</p>
            <h1 class="mt-2 text-2xl font-semibold text-[var(--ls-text-primary)]">All alerts in one feed</h1>
            <p class="mt-2 text-sm text-[var(--ls-text-secondary)]">Track court, billing, AI, and general notifications with quiet hours, archive control, and priority sorting.</p>
          </div>
          <span class="rounded-full border border-[var(--ls-border)] px-3 py-1 font-mono text-xs text-[var(--ls-text-secondary)]">NEW 12</span>
        </div>
      </section>
      <section class="grid gap-3 sm:grid-cols-3">
        ${[
          ["Unread", "12", "Across 4 categories"],
          ["High priority", "03", "Court + payment"],
          ["Archived", "28", "Past 7 days"],
        ]
          .map(
            ([label, value, meta]) => `
              <div class="panel rounded-[20px] p-4">
                <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">${label}</p>
                <p class="mt-3 font-mono text-2xl text-[var(--ls-text-primary)]">${value}</p>
                <p class="mt-2 text-xs text-[var(--ls-text-secondary)]">${meta}</p>
              </div>
            `,
          )
          .join("")}
      </section>
      <section class="panel rounded-[24px] p-4">
        <div class="flex flex-wrap gap-2">
          ${["All", "Court", "Payment", "AI", "General"].map((chip, i) => `<button class="focus-ring min-h-[44px] rounded-full px-4 ${i === 0 ? "bg-[var(--ls-accent)] text-white" : "border border-[var(--ls-border)] bg-[var(--ls-surface-2)] text-[var(--ls-text-secondary)]"} text-xs font-semibold">${chip}</button>`).join("")}
        </div>
        <div class="mt-4 space-y-3">
          ${[
            ["High", "Court alert", "Delhi High Court Court 32 running 18m ahead for Sharma v. State of Maharashtra", "09:21", "border-red-500/28 bg-red-500/14 text-red-700 dark:text-red-300", `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><path d="M12 4v10"></path><path d="m8 8 4-4 4 4"></path><path d="M6 20h12"></path></svg>`],
            ["High", "Billing", "Invoice INV-2026-0418-02 received UPI payment confirmation", "09:10", "border-red-500/28 bg-red-500/14 text-red-700 dark:text-red-300", `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><path d="M12 4v10"></path><path d="m8 8 4-4 4 4"></path><path d="M6 20h12"></path></svg>`],
            ["Medium", "AI update", "LegalGPT India prepared a 3-case digest on Section 138 NI Act", "08:48", "border-amber-500/28 bg-amber-500/14 text-amber-700 dark:text-amber-300", `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><path d="M7 10.5h10M7 14.5h10"></path></svg>`],
            ["Low", "General", "Quiet hours enabled from 22:00 to 06:00", "Yesterday", "border-emerald-500/28 bg-emerald-500/14 text-emerald-700 dark:text-emerald-300", `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><path d="M12 20V10"></path><path d="m8 16 4 4 4-4"></path><path d="M6 4h12"></path></svg>`],
          ]
            .map(
              ([priority, type, message, time, badgeClasses, icon]) => `
                <article class="rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] p-4">
                  <div class="flex items-start justify-between gap-3">
                    <div class="min-w-0">
                      <div class="flex items-center gap-3">
                        <span class="grid h-9 w-9 shrink-0 place-items-center rounded-full border ${badgeClasses}">
                          <span class="sr-only">${priority} priority</span>
                          ${icon}
                        </span>
                        <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">${type}</p>
                      </div>
                      <p class="mt-2 text-sm leading-6 text-[var(--ls-text-primary)]">${message}</p>
                    </div>
                    <span class="font-mono text-xs text-[var(--ls-text-secondary)]">${time}</span>
                  </div>
                </article>
              `,
            )
            .join("")}
        </div>
      </section>
      <section class="panel rounded-[24px] p-4">
        <div class="flex items-center justify-between">
          <p class="text-sm font-semibold text-[var(--ls-text-primary)]">Delivery preferences</p>
          <span class="font-mono text-xs text-[var(--ls-text-secondary)]">QUIET HOURS ON</span>
        </div>
        <div class="mt-3 space-y-3">
          ${[
            [
              "Push + WhatsApp for court alerts",
              "Immediate cause list, next-call, and order-upload alerts",
              "true",
              "linear-gradient(180deg, rgba(43,108,176,0.18), rgba(43,108,176,0.07))",
              "rgba(43,108,176,0.16)",
              "#2B6CB0",
              `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><path d="M15 17.5H5.5a1 1 0 0 1-.8-1.6l1.3-1.8V9.8a6 6 0 1 1 12 0v4.3l1.3 1.8a1 1 0 0 1-.8 1.6H15"></path><path d="M9.5 17.5a2.5 2.5 0 0 0 5 0"></path></svg>`,
            ],
            [
              "Email for invoices and exports",
              "Monthly statements, GST exports, and settlement notices",
              "true",
              "linear-gradient(180deg, rgba(5,150,105,0.18), rgba(5,150,105,0.07))",
              "rgba(5,150,105,0.16)",
              "#059669",
              `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><path d="M4.5 7.5h15v9h-15z"></path><path d="m5.5 8.5 6.5 5 6.5-5"></path></svg>`,
            ],
            [
              "In-app only for AI suggestions",
              "Keep AI digests and research suggestions inside Legal Sathi only",
              "false",
              "linear-gradient(180deg, rgba(99,102,241,0.18), rgba(99,102,241,0.07))",
              "rgba(99,102,241,0.16)",
              "#4F46E5",
              navIcon("LegalGPT India", "h-4 w-4"),
            ],
          ]
            .map(
              ([label, detail, enabled, outer, inner, color, icon]) => `
                <div data-pref-row data-enabled="${enabled}" class="rounded-2xl border border-[var(--ls-border)] p-4" style="background:${outer};">
                  <div class="flex items-start justify-between gap-3">
                    <div class="flex min-w-0 items-start gap-3">
                      <span class="grid h-10 w-10 shrink-0 place-items-center rounded-xl" style="background:${inner}; color:${color};">
                        ${icon}
                      </span>
                      <div class="min-w-0">
                        <p class="text-sm font-semibold text-[var(--ls-text-primary)]">${label}</p>
                        <p data-pref-detail class="mt-1 text-xs leading-5 text-[var(--ls-text-secondary)]">${detail}</p>
                      </div>
                    </div>
                    <button type="button" role="switch" aria-checked="${enabled}" data-pref-toggle class="focus-ring shrink-0 rounded-full p-1">
                      <span data-pref-track class="flex h-6 w-11 items-center rounded-full px-1">
                        <span data-pref-thumb class="h-4 w-4 rounded-full bg-white shadow-sm"></span>
                      </span>
                    </button>
                  </div>
                  <div class="mt-3 flex items-center justify-between gap-3">
                    <p class="text-[11px] uppercase tracking-[0.14em] text-[var(--ls-text-secondary)]">Delivery route</p>
                    <span data-pref-status class="rounded-full px-2.5 py-1 font-mono text-[10px]"></span>
                  </div>
                </div>
              `,
            )
            .join("")}
        </div>
      </section>
    `,
    desktop: `
      <section class="panel rounded-[28px] p-6 shadow-float">
        <div class="flex items-start justify-between gap-6">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--ls-text-secondary)]">S-17 · Notifications</p>
            <h1 class="mt-2 text-3xl font-semibold text-[var(--ls-text-primary)]">Unified alert operations feed</h1>
            <p class="mt-3 max-w-3xl text-sm leading-6 text-[var(--ls-text-secondary)]">Centralizes operational alerts, AI updates, billing notices, and general account signals with sort and archive control.</p>
          </div>
          <div class="flex flex-wrap gap-2">
            <span class="inline-flex items-center gap-2 rounded-full border border-sky-500/25 bg-gradient-to-r from-sky-500/16 via-amber-400/16 to-violet-500/12 px-3 py-1.5 text-[11px] text-[var(--ls-text-primary)]">
              <span class="grid h-5 w-5 place-items-center rounded-full bg-[var(--ls-surface)]/70 text-[var(--ls-accent)]">
                ${navIcon("Calendar", "h-3.5 w-3.5")}
              </span>
              <span class="font-mono">18 Apr 2026</span>
            </span>
            <span class="rounded-full border border-amber-500/20 bg-amber-500/12 px-3 py-1 font-mono text-[11px] text-amber-700 dark:text-amber-300">IST</span>
            <span class="rounded-full border border-violet-500/20 bg-violet-500/12 px-3 py-1 font-mono text-[11px] text-violet-700 dark:text-violet-300">AP-SOUTH-1</span>
            <span class="rounded-full border border-emerald-500/20 bg-emerald-500/12 px-3 py-1 font-mono text-[11px] text-emerald-700 dark:text-emerald-300">RLS</span>
          </div>
        </div>
      </section>
      <section class="grid gap-6 xl:grid-cols-[0.9fr,1.15fr,0.9fr]" style="margin-top:12px;">
        <div class="space-y-4">
          <div class="panel rounded-[24px] p-5" style="background:linear-gradient(180deg, rgba(43,108,176,0.05), rgba(43,108,176,0.015));">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Feed summary</p>
            <div class="mt-4 grid gap-3">
              ${[
                ["Unread", "12", "Awaiting review", "linear-gradient(180deg, rgba(43,108,176,0.18), rgba(43,108,176,0.07))", "rgba(43,108,176,0.16)", "#2B6CB0", `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><path d="M15 17.5H5.5a1 1 0 0 1-.8-1.6l1.3-1.8V9.8a6 6 0 1 1 12 0v4.3l1.3 1.8a1 1 0 0 1-.8 1.6H15"></path><path d="M9.5 17.5a2.5 2.5 0 0 0 5 0"></path></svg>`],
                ["Priority", "03", "Court + payment", "linear-gradient(180deg, rgba(239,68,68,0.18), rgba(239,68,68,0.07))", "rgba(239,68,68,0.16)", "#DC2626", `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><path d="M12 4v10"></path><path d="m8 8 4-4 4 4"></path><path d="M6 20h12"></path></svg>`],
                ["Archived", "28", "Past 7 days", "linear-gradient(180deg, rgba(99,102,241,0.18), rgba(99,102,241,0.07))", "rgba(99,102,241,0.16)", "#4F46E5", `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><path d="M4.5 7.5h15"></path><path d="M6.5 7.5v11h11v-11"></path><path d="M9 11h6"></path></svg>`],
                ["Quiet hours", "22:00–06:00", "Notifications throttled", "linear-gradient(180deg, rgba(5,150,105,0.18), rgba(5,150,105,0.07))", "rgba(5,150,105,0.16)", "#059669", `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><path d="M12 3.5a7.5 7.5 0 1 0 7.5 7.5A6 6 0 0 1 12 3.5Z"></path></svg>`],
              ]
                .map(
                  ([label, value, note, outer, inner, color, icon]) => `
                    <div class="rounded-2xl border border-[var(--ls-border)] p-4" style="background:${outer};">
                      <div class="flex items-start justify-between gap-3">
                        <div class="flex items-center gap-3">
                          <span class="grid h-9 w-9 shrink-0 place-items-center rounded-xl" style="background:${inner}; color:${color};">
                            ${icon}
                          </span>
                          <div>
                            <p class="text-sm text-[var(--ls-text-primary)]">${label}</p>
                            <p class="mt-1 text-xs text-[var(--ls-text-secondary)]">${note}</p>
                          </div>
                        </div>
                        <span class="font-mono text-xs text-[var(--ls-text-primary)]">${value}</span>
                      </div>
                    </div>
                  `,
                )
                .join("")}
            </div>
          </div>
        </div>
        <div class="panel rounded-[24px] p-5" style="background:linear-gradient(180deg, rgba(99,102,241,0.05), rgba(99,102,241,0.015));">
          <div class="flex items-center justify-between">
            <div class="flex gap-2">
              ${["All", "Court", "Payment", "AI", "General"].map((chip, i) => `<button class="focus-ring min-h-[44px] rounded-full px-4 ${i === 0 ? "bg-[var(--ls-accent)] text-white" : "border border-[var(--ls-border)] text-[var(--ls-text-primary)]"} text-[11px] font-semibold">${chip}</button>`).join("")}
            </div>
            <button class="focus-ring min-h-[44px] whitespace-nowrap rounded-xl border border-[var(--ls-border)] px-4 py-2 text-[11px] font-semibold leading-tight text-[var(--ls-text-primary)]">Mark all read</button>
          </div>
          <div class="mt-4 space-y-3">
            ${[
              ["High", "Court", "Delhi High Court Court 32 running 18m ahead for Sharma v. State of Maharashtra", "09:21 IST", "linear-gradient(180deg, rgba(239,68,68,0.18), rgba(239,68,68,0.07))", "rgba(239,68,68,0.16)", "#DC2626", `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><path d="M12 4v10"></path><path d="m8 8 4-4 4 4"></path><path d="M6 20h12"></path></svg>`],
              ["High", "Payment", "Invoice INV-2026-0418-02 settled via UPI", "09:10 IST", "linear-gradient(180deg, rgba(244,114,182,0.18), rgba(244,114,182,0.07))", "rgba(244,114,182,0.16)", "#DB2777", `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><path d="M12 4v10"></path><path d="m8 8 4-4 4 4"></path><path d="M6 20h12"></path></svg>`],
              ["Medium", "AI", "LegalGPT India prepared a 3-case digest on cheque dishonour authorities", "08:48 IST", "linear-gradient(180deg, rgba(245,158,11,0.18), rgba(245,158,11,0.07))", "rgba(245,158,11,0.16)", "#D97706", `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><path d="M7 10.5h10M7 14.5h10"></path></svg>`],
              ["Low", "General", "Document vault sync completed for Apex Builders folder", "Yesterday", "linear-gradient(180deg, rgba(71,85,105,0.18), rgba(71,85,105,0.07))", "rgba(71,85,105,0.16)", "#475569", `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><path d="M12 20V10"></path><path d="m8 16 4 4 4-4"></path><path d="M6 4h12"></path></svg>`],
            ]
              .map(
                ([priority, type, message, time, outer, inner, color, icon]) => `
                  <article class="rounded-2xl border border-[var(--ls-border)] p-4" style="background:${outer};">
                    <div class="flex items-start justify-between gap-4">
                      <div class="min-w-0">
                        <div class="flex items-center gap-3">
                          <span class="grid h-9 w-9 shrink-0 place-items-center rounded-xl" style="background:${inner}; color:${color};">
                            <span class="sr-only">${priority} priority</span>
                            ${icon}
                          </span>
                          <div>
                            <p class="text-sm text-[var(--ls-text-primary)]">${type}</p>
                            <p class="mt-1 text-xs text-[var(--ls-text-secondary)]">Priority signal routed to this queue</p>
                          </div>
                        </div>
                        <p class="mt-2 text-sm leading-6 text-[var(--ls-text-primary)]">${message}</p>
                      </div>
                      <span class="font-mono text-xs text-[var(--ls-text-secondary)]">${time}</span>
                    </div>
                  </article>
                `,
              )
              .join("")}
          </div>
        </div>
        <div class="space-y-4">
          <div class="panel rounded-[24px] p-5" style="background:linear-gradient(180deg, rgba(14,165,233,0.05), rgba(14,165,233,0.015));">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Delivery matrix</p>
            <div class="mt-4 space-y-3">
              ${[
                ["Court alerts", "Immediate bench movement and next-call routing", ["Push", "WhatsApp"], "true", "linear-gradient(180deg, rgba(43,108,176,0.18), rgba(43,108,176,0.07))", "rgba(43,108,176,0.16)", "#2B6CB0", `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><path d="M15 17.5H5.5a1 1 0 0 1-.8-1.6l1.3-1.8V9.8a6 6 0 1 1 12 0v4.3l1.3 1.8a1 1 0 0 1-.8 1.6H15"></path><path d="M9.5 17.5a2.5 2.5 0 0 0 5 0"></path></svg>`],
                ["Billing notices", "Invoice settlement, GST export, and payout confirmations", ["Push", "Email"], "true", "linear-gradient(180deg, rgba(5,150,105,0.18), rgba(5,150,105,0.07))", "rgba(5,150,105,0.16)", "#059669", `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><path d="M7 5.5h10v13l-2.5-1.5-2.5 1.5-2.5-1.5-2.5 1.5z"></path><path d="M9 9h6M9 12h6"></path></svg>`],
                ["AI updates", "Research digests and suggestion summaries remain in-app", ["In-app"], "false", "linear-gradient(180deg, rgba(99,102,241,0.18), rgba(99,102,241,0.07))", "rgba(99,102,241,0.16)", "#4F46E5", navIcon("LegalGPT India", "h-4 w-4")],
                ["System notices", "Security posture, policy, and maintenance communication", ["Email", "In-app"], "true", "linear-gradient(180deg, rgba(71,85,105,0.18), rgba(71,85,105,0.07))", "rgba(71,85,105,0.16)", "#475569", navIcon("Settings", "h-4 w-4")],
              ]
                .map(
                  ([type, detail, routes, enabled, outer, inner, color, icon]) => `
                    <div data-pref-row data-enabled="${enabled}" class="rounded-2xl border border-[var(--ls-border)] p-4" style="background:${outer};">
                      <div class="flex items-start justify-between gap-3">
                        <div class="flex items-start gap-3">
                          <span class="grid h-9 w-9 shrink-0 place-items-center rounded-xl" style="background:${inner}; color:${color};">
                            ${icon}
                          </span>
                          <div>
                            <p class="text-sm text-[var(--ls-text-primary)]">${type}</p>
                            <p class="mt-1 text-xs leading-5 text-[var(--ls-text-secondary)]">${detail}</p>
                          </div>
                        </div>
                        <div class="flex items-start gap-3">
                          <button type="button" role="switch" aria-checked="${enabled}" data-pref-toggle class="focus-ring shrink-0 rounded-full p-1">
                            <span data-pref-track class="flex h-6 w-11 items-center rounded-full px-1">
                              <span data-pref-thumb class="h-4 w-4 rounded-full bg-white shadow-sm"></span>
                            </span>
                          </button>
                        </div>
                      </div>
                      <div class="mt-3 flex items-center justify-between gap-3">
                        <p class="text-[11px] uppercase tracking-[0.14em] text-[var(--ls-text-secondary)]">Delivery route</p>
                        <span data-pref-status class="rounded-full px-2.5 py-1 font-mono text-[10px]"></span>
                      </div>
                      <div class="mt-3 flex flex-wrap justify-end gap-2">
                          ${routes
                            .map(
                              (route) => `<span class="rounded-full border border-[var(--ls-border)] bg-[var(--ls-surface)]/78 px-2.5 py-1 font-mono text-[10px] text-[var(--ls-text-secondary)]">${route}</span>`,
                            )
                            .join("")}
                      </div>
                    </div>
                  `,
                )
                .join("")}
            </div>
          </div>
          <div class="panel rounded-[24px] p-5">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Archive policy</p>
            <div class="mt-4 rounded-2xl bg-[var(--ls-surface-2)] p-4 text-sm leading-6 text-[var(--ls-text-primary)]">Notifications can be archived from the feed while immutable audit records continue in the backend for compliance-sensitive events.</div>
          </div>
        </div>
      </section>
    `,
    states: {
      emptyTitle: "No notifications available",
      emptyBody: "You’re all caught up. New court, billing, and AI alerts will appear here.",
      emptyJson: '{ "notifications": [], "unread": 0, "archived": 0 }',
      errorText: "notifications feed could not be loaded",
      offlineText: "Offline · Showing cached notifications from 5m ago",
    },
    accessibilityMobile: "<li>Notification cards include type and priority in text so high-importance alerts remain understandable without color.</li>",
    accessibilityDesktop: "<li>Category filters and mark-read actions are exposed as labeled buttons, preserving keyboard clarity in a dense feed.</li>",
  },
  {
    filename: "S-18-legal-pro.html",
    title: "Legal Sathi — Settings and Privacy",
    description: "Legal Pro settings hub for theme, language, DPDP consent, exports, and connected integrations.",
    mobileActive: "Settings",
    desktopActive: "Settings",
    desktopStickyStyle: "top:calc(var(--ls-desktop-card-top) - 4px); gap:10px;",
    desktopStackStyle: "row-gap:10px;",
    desktopMainStyle:
      "background-color: color-mix(in srgb, var(--ls-bg) 76%, white 24%); background-image: linear-gradient(rgba(144,164,183,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(144,164,183,0.05) 1px, transparent 1px); background-size:24px 24px;",
    mobile: `
      <section class="panel rounded-[24px] p-4 shadow-panel">
        <div class="flex items-start justify-between gap-3">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--ls-text-secondary)]">S-18 · Account controls</p>
            <h1 class="mt-2 text-2xl font-semibold text-[var(--ls-text-primary)]">Settings and privacy</h1>
            <p class="mt-2 text-sm text-[var(--ls-text-secondary)]">Manage theme, language, data rights, integrations, and consent choices from one privacy-first control surface.</p>
          </div>
          <span class="rounded-full border border-[var(--ls-border)] px-3 py-1 font-mono text-xs text-[var(--ls-text-secondary)]">DPDP</span>
        </div>
      </section>
      <section class="grid gap-3 sm:grid-cols-3">
        ${[
          ["Theme", "System", "Sun / Moon / System"],
          ["Language", "English", "Global app setting"],
          ["Consent", "03", "1 required, 2 optional"],
        ]
          .map(
            ([label, value, meta]) => `
              <div class="panel rounded-[20px] p-4">
                <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">${label}</p>
                <p class="mt-3 font-mono text-2xl text-[var(--ls-text-primary)]">${value}</p>
                <p class="mt-2 text-xs text-[var(--ls-text-secondary)]">${meta}</p>
              </div>
            `,
          )
          .join("")}
      </section>
      <section class="panel rounded-[24px] p-4" style="background:linear-gradient(180deg, rgba(43,108,176,0.16), rgba(43,108,176,0.05));">
        <div class="flex items-start justify-between gap-3">
          <div class="flex min-w-0 items-start gap-3">
            <span class="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[rgba(43,108,176,0.16)] text-lg font-semibold text-[#2B6CB0]">RB</span>
            <div class="min-w-0">
              <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Personal profile</p>
              <h2 class="mt-1 text-base font-semibold text-[var(--ls-text-primary)]">Rajeev Barnwal</h2>
              <p class="mt-1 text-xs text-[var(--ls-text-secondary)]">Independent lawyer · Delhi NCR · EN / HI</p>
            </div>
          </div>
          <button class="focus-ring inline-flex min-h-[36px] items-center gap-2 rounded-xl border border-sky-500/25 bg-sky-500/12 px-3 py-2 text-[11px] font-semibold text-sky-700 dark:text-sky-300">
            ${vaultActionGlyph("preview", "h-4 w-4")}
            <span>Edit</span>
          </button>
        </div>
        <div class="mt-4 space-y-3">
          ${[
            ["Name", "Rajeev Barnwal", "linear-gradient(180deg, rgba(43,108,176,0.18), rgba(43,108,176,0.07))", "rgba(43,108,176,0.16)", "#2B6CB0", navIcon("Settings", "h-4 w-4")],
            ["Email", "rajeev@legalsathi.in", "linear-gradient(180deg, rgba(99,102,241,0.18), rgba(99,102,241,0.07))", "rgba(99,102,241,0.16)", "#4F46E5", `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><path d="M4.5 7.5h15v9h-15z"></path><path d="m5.5 8.5 6.5 5 6.5-5"></path></svg>`],
            ["Mobile", "+91 98765 43210", "linear-gradient(180deg, rgba(5,150,105,0.18), rgba(5,150,105,0.07))", "rgba(5,150,105,0.16)", "#059669", `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><rect x="7.5" y="3.5" width="9" height="17" rx="2"></rect><path d="M11 17h2"></path></svg>`],
          ]
            .map(
              ([label, value, outer, inner, color, icon]) => `
                <div class="rounded-2xl border border-[var(--ls-border)] p-3.5" style="background:${outer};">
                  <div class="flex items-center justify-between gap-3">
                    <div>
                      <p class="text-[10px] uppercase tracking-[0.14em] text-[var(--ls-text-secondary)]">${label}</p>
                      <p class="mt-1.5 text-sm text-[var(--ls-text-primary)]">${value}</p>
                    </div>
                    <span class="grid h-9 w-9 shrink-0 place-items-center rounded-xl" style="background:${inner}; color:${color};">
                      ${icon}
                    </span>
                  </div>
                </div>
              `,
            )
            .join("")}
        </div>
      </section>
      <section class="panel rounded-[24px] p-4" style="background:linear-gradient(180deg, rgba(245,158,11,0.16), rgba(245,158,11,0.05));">
        <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Preferences snapshot</p>
        <div class="mt-3 space-y-3">
          ${[
            ["Theme", "System", "Light / Dark / System", "linear-gradient(180deg, rgba(43,108,176,0.18), rgba(43,108,176,0.07))", "rgba(43,108,176,0.16)", "#2B6CB0", navIcon("Calendar", "h-4 w-4")],
            ["Language", "English", "Global language routing", "linear-gradient(180deg, rgba(217,119,6,0.18), rgba(217,119,6,0.07))", "rgba(217,119,6,0.16)", "#D97706", navIcon("Research", "h-4 w-4")],
            ["Quiet hours", "22:00–06:00", "Alerts muted outside chamber hours", "linear-gradient(180deg, rgba(99,102,241,0.18), rgba(99,102,241,0.07))", "rgba(99,102,241,0.16)", "#4F46E5", `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><path d="M12 3.5a7.5 7.5 0 1 0 7.5 7.5A6 6 0 0 1 12 3.5Z"></path></svg>`],
          ]
            .map(
              ([label, value, meta, outer, inner, color, icon]) => `
                <div class="rounded-2xl border border-[var(--ls-border)] p-3.5" style="background:${outer};">
                  <div class="flex items-center justify-between gap-3">
                    <div class="min-w-0">
                      <p class="text-[10px] uppercase tracking-[0.14em] text-[var(--ls-text-secondary)]">${label}</p>
                      <p class="mt-1 text-sm text-[var(--ls-text-primary)]">${value}</p>
                      <p class="mt-1 text-xs text-[var(--ls-text-secondary)]">${meta}</p>
                    </div>
                    <span class="grid h-9 w-9 shrink-0 place-items-center rounded-xl" style="background:${inner}; color:${color};">
                      ${icon}
                    </span>
                  </div>
                </div>
              `,
            )
            .join("")}
        </div>
      </section>
      <section class="panel rounded-[24px] p-4" style="background:linear-gradient(180deg, rgba(99,102,241,0.16), rgba(99,102,241,0.05));">
        <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Consent + integrations</p>
        <div class="mt-3 space-y-3">
          <div class="rounded-2xl border border-[var(--ls-border)] p-4" style="background:linear-gradient(180deg, rgba(5,150,105,0.18), rgba(5,150,105,0.07));">
            <div class="flex items-start justify-between gap-3">
              <div class="flex min-w-0 items-start gap-3">
                <span class="grid h-10 w-10 shrink-0 place-items-center rounded-xl" style="background:rgba(5,150,105,0.16); color:#059669;">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><path d="M7.5 12.5 10.5 15.5 16.5 9.5"></path><rect x="4.5" y="4.5" width="15" height="15" rx="2"></rect></svg>
                </span>
                <div class="min-w-0">
                  <p class="text-sm font-semibold text-[var(--ls-text-primary)]">Service consent</p>
                  <p class="mt-1 text-xs leading-5 text-[var(--ls-text-secondary)]">Required to run your legal workspace, alerts, and document access.</p>
                </div>
              </div>
              <span class="rounded-full border border-emerald-500/35 bg-emerald-500/12 px-2.5 py-1 font-mono text-[10px] text-emerald-600 dark:text-emerald-300">REQUIRED</span>
            </div>
          </div>
          ${[
            ["Analytics consent", "Improve onboarding and dashboard performance signals.", "true", "ACTIVE", "OFF", "green", "red", "linear-gradient(180deg, rgba(43,108,176,0.18), rgba(43,108,176,0.07))", "rgba(43,108,176,0.16)", "#2B6CB0", `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><path d="M5 19.5h14M8 16V9.5M12 16V6.5M16 16v-3.5"></path></svg>`],
            ["Marketing consent", "Promotional updates, offers, and feature launches.", "false", "ACTIVE", "OFF", "green", "red", "linear-gradient(180deg, rgba(244,114,182,0.18), rgba(244,114,182,0.07))", "rgba(244,114,182,0.16)", "#DB2777", `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><path d="m4 12 9-7v14l-9-7Z"></path><path d="M16 9c1.6 1.2 1.6 4.8 0 6"></path></svg>`],
            ["Google Calendar", "Calendar events and hearing blocks stay synchronized.", "true", "CONNECTED", "DISCONNECTED", "green", "red", "linear-gradient(180deg, rgba(99,102,241,0.18), rgba(99,102,241,0.07))", "rgba(99,102,241,0.16)", "#4F46E5", navIcon("Calendar", "h-4 w-4")],
            ["WhatsApp alerts", "Court alerts and slot reminders route to WhatsApp.", "true", "CONNECTED", "DISCONNECTED", "green", "red", "linear-gradient(180deg, rgba(5,150,105,0.18), rgba(5,150,105,0.07))", "rgba(5,150,105,0.16)", "#059669", navIcon("bell", "h-4 w-4")],
            ["DigiLocker", "Secure eSign and document retrieval when enabled.", "false", "CONNECTED", "DISCONNECTED", "green", "red", "linear-gradient(180deg, rgba(217,119,6,0.18), rgba(217,119,6,0.07))", "rgba(217,119,6,0.16)", "#D97706", `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><rect x="5" y="10" width="14" height="9" rx="2"></rect><path d="M8 10V8a4 4 0 1 1 8 0v2"></path></svg>`],
          ]
            .map(
              ([label, detail, enabled, onLabel, offLabel, onTone, offTone, outer, inner, color, icon]) => `
                <div data-pref-row data-enabled="${enabled}" data-pref-on-label="${onLabel}" data-pref-off-label="${offLabel}" data-pref-on-tone="${onTone}" data-pref-off-tone="${offTone}" class="rounded-2xl border border-[var(--ls-border)] p-4" style="background:${outer};">
                  <div class="flex items-start justify-between gap-3">
                    <div class="flex min-w-0 items-start gap-3">
                      <span class="grid h-10 w-10 shrink-0 place-items-center rounded-xl" style="background:${inner}; color:${color};">
                        ${icon}
                      </span>
                      <div class="min-w-0">
                        <p class="text-sm font-semibold text-[var(--ls-text-primary)]">${label}</p>
                        <p class="mt-1 text-xs leading-5 text-[var(--ls-text-secondary)]">${detail}</p>
                      </div>
                    </div>
                    <button type="button" role="switch" aria-checked="${enabled}" data-pref-toggle data-pref-on-label="${onLabel}" data-pref-off-label="${offLabel}" data-pref-on-tone="${onTone}" data-pref-off-tone="${offTone}" class="focus-ring shrink-0 rounded-full p-1">
                      <span data-pref-track class="flex h-6 w-11 items-center rounded-full px-1">
                        <span data-pref-thumb class="h-4 w-4 rounded-full bg-white shadow-sm"></span>
                      </span>
                    </button>
                  </div>
                  <div class="mt-3 flex flex-wrap items-center justify-between gap-2">
                    <p class="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--ls-text-secondary)]">Current state</p>
                    <span data-pref-status class="rounded-full px-2.5 py-1 font-mono text-[10px]"></span>
                  </div>
                </div>
              `,
            )
            .join("")}
        </div>
      </section>
      <section class="panel rounded-[24px] p-4" aria-live="polite">
        <div class="flex items-center justify-between">
          <p class="text-sm font-semibold text-[var(--ls-text-primary)]">Data rights</p>
          <span class="font-mono text-xs text-[var(--ls-text-secondary)]">72-HOUR SLA</span>
        </div>
        <div class="mt-3 grid gap-3">
          <button type="button" data-action-select data-action-group="settings-rights-mobile" data-action-active="true" aria-pressed="true" class="focus-ring flex min-h-[44px] items-center justify-between gap-3 rounded-xl bg-[var(--ls-accent)] px-4 py-3 text-left text-sm font-semibold text-white">
            <span>Export my data</span>
            <span class="action-icon-shell grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-white/20 bg-white/10 text-white">
              ${vaultActionGlyph("download", "h-4 w-4")}
            </span>
          </button>
          <button type="button" data-action-select data-action-group="settings-rights-mobile" data-action-active="false" aria-pressed="false" class="focus-ring flex min-h-[44px] items-center justify-between gap-3 rounded-xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] px-4 py-3 text-left text-sm font-semibold text-[var(--ls-text-primary)]">
            <span>Request account deletion</span>
            <span class="action-icon-shell grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-rose-500/20 bg-rose-500/10 text-rose-700 dark:text-rose-300">
              ${navIcon("Settings", "h-4 w-4")}
            </span>
          </button>
          <button type="button" data-action-select data-action-group="settings-rights-mobile" data-action-active="false" aria-pressed="false" class="focus-ring flex min-h-[44px] items-center justify-between gap-3 rounded-xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] px-4 py-3 text-left text-sm font-semibold text-[var(--ls-text-primary)]">
            <span>Download consent history</span>
            <span class="action-icon-shell grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">
              ${vaultActionGlyph("download", "h-4 w-4")}
            </span>
          </button>
        </div>
      </section>
    `,
    desktop: `
      <section class="panel rounded-[28px] p-6 shadow-float">
        <div class="flex items-start justify-between gap-6">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--ls-text-secondary)]">S-18 · Privacy controls</p>
            <h1 class="mt-2 text-3xl font-semibold text-[var(--ls-text-primary)]">Settings and privacy command hub</h1>
            <p class="mt-3 max-w-3xl text-sm leading-6 text-[var(--ls-text-secondary)]">Centralizes appearance, language, connected services, data rights, and consent records for Legal Sathi users.</p>
          </div>
          <div class="flex flex-wrap gap-2">
            <span class="inline-flex items-center gap-2 rounded-full border border-sky-500/25 bg-gradient-to-r from-sky-500/16 via-amber-400/16 to-violet-500/12 px-3 py-1.5 text-[11px] text-[var(--ls-text-primary)]">
              <span class="grid h-5 w-5 place-items-center rounded-full bg-[var(--ls-surface)]/70 text-[var(--ls-accent)]">
                ${navIcon("Calendar", "h-3.5 w-3.5")}
              </span>
              <span class="font-mono">18 Apr 2026</span>
            </span>
            <span class="rounded-full border border-amber-500/20 bg-amber-500/12 px-3 py-1 font-mono text-[11px] text-amber-700 dark:text-amber-300">IST</span>
            <span class="rounded-full border border-violet-500/20 bg-violet-500/12 px-3 py-1 font-mono text-[11px] text-violet-700 dark:text-violet-300">AP-SOUTH-1</span>
            <span class="rounded-full border border-emerald-500/20 bg-emerald-500/12 px-3 py-1 font-mono text-[11px] text-emerald-700 dark:text-emerald-300">RLS</span>
          </div>
        </div>
      </section>
      <section class="grid gap-6 xl:grid-cols-[0.92fr,1.1fr,0.9fr]" style="margin-top:12px;">
        <div class="space-y-4">
          <div class="panel rounded-[24px] p-5" style="background:linear-gradient(180deg, rgba(43,108,176,0.12), rgba(43,108,176,0.04));">
            <div class="flex items-start justify-between gap-3">
              <div class="flex min-w-0 items-start gap-3">
                <span class="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-[rgba(43,108,176,0.16)] text-lg font-semibold text-[#2B6CB0]">RB</span>
                <div class="min-w-0">
                  <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Personal profile</p>
                  <p class="mt-1 text-sm text-[var(--ls-text-secondary)]">Desig.: Independent lawyer</p>
                  <p class="mt-1 text-sm text-[var(--ls-text-secondary)]">Location: Delhi NCR</p>
                </div>
              </div>
              <button class="focus-ring inline-flex min-h-[40px] items-center gap-2 whitespace-nowrap rounded-xl border border-sky-500/25 bg-sky-500/12 px-4 py-2 text-sm font-semibold text-sky-700 dark:text-sky-300">
                ${vaultActionGlyph("preview", "h-4 w-4")}
                <span>Edit</span>
              </button>
            </div>
            <div class="mt-4 space-y-3">
              ${[
                ["Name", "Rajeev Barnwal", "linear-gradient(180deg, rgba(43,108,176,0.18), rgba(43,108,176,0.07))", "rgba(43,108,176,0.16)", "#2B6CB0", navIcon("Settings", "h-4 w-4")],
                ["Email", "rajeev@legalsathi.in", "linear-gradient(180deg, rgba(99,102,241,0.18), rgba(99,102,241,0.07))", "rgba(99,102,241,0.16)", "#4F46E5", `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><path d="M4.5 7.5h15v9h-15z"></path><path d="m5.5 8.5 6.5 5 6.5-5"></path></svg>`],
                ["Mobile", "+91 98765 43210", "linear-gradient(180deg, rgba(5,150,105,0.18), rgba(5,150,105,0.07))", "rgba(5,150,105,0.16)", "#059669", `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><rect x="7.5" y="3.5" width="9" height="17" rx="2"></rect><path d="M11 17h2"></path></svg>`],
              ]
                .map(
                  ([label, value, outer, inner, color, icon]) => `
                    <div class="rounded-2xl border border-[var(--ls-border)] p-4" style="background:${outer};">
                      <div class="flex items-center justify-between gap-3">
                        <div>
                          <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">${label}</p>
                          <p class="mt-2 text-sm text-[var(--ls-text-primary)]">${value}</p>
                        </div>
                        <span class="grid h-9 w-9 shrink-0 place-items-center rounded-xl" style="background:${inner}; color:${color};">
                          ${icon}
                        </span>
                      </div>
                    </div>
                  `,
                )
                .join("")}
            </div>
          </div>
          <div class="panel rounded-[24px] p-5" style="background:linear-gradient(180deg, rgba(245,158,11,0.12), rgba(245,158,11,0.04));">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Current profile defaults</p>
            <div class="mt-4 space-y-3">
              ${[
                ["Theme", "System", "linear-gradient(180deg, rgba(43,108,176,0.18), rgba(43,108,176,0.07))", "rgba(43,108,176,0.16)", "#2B6CB0", navIcon("Calendar", "h-4 w-4")],
                ["Language", "English", "linear-gradient(180deg, rgba(217,119,6,0.18), rgba(217,119,6,0.07))", "rgba(217,119,6,0.16)", "#D97706", navIcon("Research", "h-4 w-4")],
                ["Accessibility", "High contrast off", "linear-gradient(180deg, rgba(99,102,241,0.18), rgba(99,102,241,0.07))", "rgba(99,102,241,0.16)", "#4F46E5", `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><circle cx="12" cy="12" r="7"></circle><path d="M12 5v14"></path></svg>`],
                ["Quiet hours", "22:00–06:00", "linear-gradient(180deg, rgba(5,150,105,0.18), rgba(5,150,105,0.07))", "rgba(5,150,105,0.16)", "#059669", `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><path d="M12 3.5a7.5 7.5 0 1 0 7.5 7.5A6 6 0 0 1 12 3.5Z"></path></svg>`],
              ]
                .map(
                  ([label, value, outer, inner, color, icon]) => `
                    <div class="rounded-2xl border border-[var(--ls-border)] p-4" style="background:${outer};">
                      <div class="flex items-center justify-between gap-3">
                        <div>
                          <p class="text-sm text-[var(--ls-text-primary)]">${label}</p>
                          <p class="mt-1 font-mono text-xs text-[var(--ls-text-secondary)]">${value}</p>
                        </div>
                        <span class="grid h-9 w-9 shrink-0 place-items-center rounded-xl" style="background:${inner}; color:${color};">
                          ${icon}
                        </span>
                      </div>
                    </div>
                  `,
                )
                .join("")}
            </div>
          </div>
        </div>
        <div class="panel relative z-0 min-w-0 overflow-hidden rounded-[24px] p-5" style="background:linear-gradient(180deg, rgba(99,102,241,0.12), rgba(99,102,241,0.04));">
          <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Consent and integration controls</p>
          <div class="mt-4 grid gap-4 2xl:grid-cols-2">
            <div class="rounded-2xl border border-[var(--ls-border)] p-4" style="background:linear-gradient(180deg, rgba(5,150,105,0.18), rgba(5,150,105,0.07));">
              <div class="flex items-start justify-between gap-3">
                <div class="flex min-w-0 items-start gap-3">
                  <span class="grid h-10 w-10 shrink-0 place-items-center rounded-xl" style="background:rgba(5,150,105,0.16); color:#059669;">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><path d="M7.5 12.5 10.5 15.5 16.5 9.5"></path><rect x="4.5" y="4.5" width="15" height="15" rx="2"></rect></svg>
                  </span>
                  <div class="min-w-0">
                    <p class="text-sm font-semibold text-[var(--ls-text-primary)]">Service consent</p>
                    <p class="mt-1 text-xs leading-5 text-[var(--ls-text-secondary)]">Required for legal workspace creation, alerts, and document access.</p>
                  </div>
                </div>
                <span class="rounded-full border border-emerald-500/35 bg-emerald-500/12 px-2.5 py-1 font-mono text-[10px] text-emerald-600 dark:text-emerald-300">REQUIRED</span>
              </div>
            </div>
            ${[
              ["Analytics consent", "Improve onboarding and dashboard performance signals.", "true", "ACTIVE", "OFF", "green", "red", "linear-gradient(180deg, rgba(43,108,176,0.18), rgba(43,108,176,0.07))", "rgba(43,108,176,0.16)", "#2B6CB0", `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><path d="M5 19.5h14M8 16V9.5M12 16V6.5M16 16v-3.5"></path></svg>`],
              ["Marketing consent", "Promotional updates, offers, and feature launches.", "false", "ACTIVE", "OFF", "green", "red", "linear-gradient(180deg, rgba(244,114,182,0.18), rgba(244,114,182,0.07))", "rgba(244,114,182,0.16)", "#DB2777", `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><path d="m4 12 9-7v14l-9-7Z"></path><path d="M16 9c1.6 1.2 1.6 4.8 0 6"></path></svg>`],
              ["Google Calendar", "Calendar events and hearing blocks stay synchronized.", "true", "CONNECTED", "DISCONNECTED", "green", "red", "linear-gradient(180deg, rgba(99,102,241,0.18), rgba(99,102,241,0.07))", "rgba(99,102,241,0.16)", "#4F46E5", navIcon("Calendar", "h-4 w-4")],
              ["WhatsApp alerts", "Court alerts and slot reminders route to WhatsApp.", "true", "CONNECTED", "DISCONNECTED", "green", "red", "linear-gradient(180deg, rgba(5,150,105,0.18), rgba(5,150,105,0.07))", "rgba(5,150,105,0.16)", "#059669", navIcon("bell", "h-4 w-4")],
              ["DigiLocker", "Secure eSign and document retrieval when enabled.", "false", "CONNECTED", "DISCONNECTED", "green", "red", "linear-gradient(180deg, rgba(217,119,6,0.18), rgba(217,119,6,0.07))", "rgba(217,119,6,0.16)", "#D97706", `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><rect x="5" y="10" width="14" height="9" rx="2"></rect><path d="M8 10V8a4 4 0 1 1 8 0v2"></path></svg>`],
            ]
              .map(
                ([label, detail, enabled, onLabel, offLabel, onTone, offTone, outer, inner, color, icon]) => `
                  <div data-pref-row data-enabled="${enabled}" data-pref-on-label="${onLabel}" data-pref-off-label="${offLabel}" data-pref-on-tone="${onTone}" data-pref-off-tone="${offTone}" class="min-w-0 overflow-hidden rounded-2xl border border-[var(--ls-border)] p-4" style="background:${outer};">
                    <div class="flex min-w-0 items-start justify-between gap-3">
                      <div class="flex min-w-0 flex-1 items-start gap-3">
                        <span class="grid h-10 w-10 shrink-0 place-items-center rounded-xl" style="background:${inner}; color:${color};">
                          ${icon}
                        </span>
                        <div class="min-w-0 flex-1">
                          <p class="text-sm font-semibold text-[var(--ls-text-primary)]">${label}</p>
                          <p class="mt-1 text-xs leading-5 text-[var(--ls-text-secondary)]">${detail}</p>
                        </div>
                      </div>
                      <button type="button" role="switch" aria-checked="${enabled}" data-pref-toggle data-pref-on-label="${onLabel}" data-pref-off-label="${offLabel}" data-pref-on-tone="${onTone}" data-pref-off-tone="${offTone}" class="focus-ring ml-2 shrink-0 rounded-full p-1">
                        <span data-pref-track class="flex h-6 w-11 items-center rounded-full px-1">
                          <span data-pref-thumb class="h-4 w-4 rounded-full bg-white shadow-sm"></span>
                        </span>
                      </button>
                    </div>
                    <div class="mt-3 flex flex-wrap items-center justify-between gap-2">
                      <p class="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--ls-text-secondary)]">Current state</p>
                      <span data-pref-status class="rounded-full px-2.5 py-1 font-mono text-[10px]"></span>
                    </div>
                  </div>
                `,
              )
              .join("")}
          </div>
          <div class="mt-4 rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-bg)]/55 p-4">
            <p class="text-sm leading-6 text-[var(--ls-text-primary)]">Deletion and export requests are routed through the DPDP rights flow. Non-audit personal data targets a 72-hour completion SLA.</p>
          </div>
        </div>
        <div class="relative z-10 space-y-4">
          <div class="panel relative z-10 rounded-[24px] p-5" style="background:linear-gradient(180deg, rgba(5,150,105,0.12), rgba(5,150,105,0.04));">
            <p class="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Data rights</p>
            <div class="mt-4 grid gap-3">
              <button type="button" data-action-select data-action-group="settings-rights-desktop" data-action-active="true" aria-pressed="true" class="focus-ring flex min-h-[44px] items-center justify-between gap-3 rounded-xl bg-[var(--ls-accent)] px-4 py-3 text-left text-sm font-semibold text-white">
                <span>Export my data</span>
                <span class="action-icon-shell grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-white/20 bg-white/10 text-white">
                  ${vaultActionGlyph("download", "h-4 w-4")}
                </span>
              </button>
              <button type="button" data-action-select data-action-group="settings-rights-desktop" data-action-active="false" aria-pressed="false" class="focus-ring flex min-h-[44px] items-center justify-between gap-3 rounded-xl border border-[var(--ls-border)] px-4 py-3 text-left text-sm font-semibold text-[var(--ls-text-primary)]">
                <span>Request account deletion</span>
                <span class="action-icon-shell grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-rose-500/20 bg-rose-500/10 text-rose-700 dark:text-rose-300">
                  ${navIcon("Settings", "h-4 w-4")}
                </span>
              </button>
              <button type="button" data-action-select data-action-group="settings-rights-desktop" data-action-active="false" aria-pressed="false" class="focus-ring flex min-h-[44px] items-center justify-between gap-3 rounded-xl border border-[var(--ls-border)] px-4 py-3 text-left text-sm font-semibold text-[var(--ls-text-primary)]">
                <span>Download consent history</span>
                <span class="action-icon-shell grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">
                  ${vaultActionGlyph("download", "h-4 w-4")}
                </span>
              </button>
            </div>
          </div>
          <div class="panel rounded-[24px] p-5" style="background:linear-gradient(180deg, rgba(217,119,6,0.12), rgba(217,119,6,0.04));">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Language routing</p>
            <div class="mt-4 flex flex-wrap gap-2">
              ${["English", "Hindi", "Marathi", "Tamil", "Bengali"].map((lang, i) => `<span class="rounded-full ${i === 0 ? "bg-[var(--ls-accent)] text-white" : "border border-[var(--ls-border)] text-[var(--ls-text-primary)]"} px-3 py-2 text-xs">${lang}</span>`).join("")}
            </div>
          </div>
          <div class="panel rounded-[24px] p-5" style="background:linear-gradient(180deg, rgba(99,102,241,0.12), rgba(99,102,241,0.04));">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Appearance + accessibility</p>
            <div class="mt-4 space-y-3">
              ${[
                ["Theme", "System", "linear-gradient(180deg, rgba(43,108,176,0.18), rgba(43,108,176,0.07))"],
                ["Animations", "Reduced motion off", "linear-gradient(180deg, rgba(99,102,241,0.18), rgba(99,102,241,0.07))"],
                ["High contrast", "Off", "linear-gradient(180deg, rgba(5,150,105,0.18), rgba(5,150,105,0.07))"],
              ]
                .map(([label, value, outer]) => `<div class="rounded-2xl border border-[var(--ls-border)] p-4" style="background:${outer};"><div class="flex items-center justify-between gap-3"><p class="text-sm text-[var(--ls-text-primary)]">${label}</p><span class="font-mono text-xs text-[var(--ls-text-secondary)]">${value}</span></div></div>`)
                .join("")}
            </div>
          </div>
        </div>
      </section>
    `,
    states: {
      emptyTitle: "No settings loaded",
      emptyBody: "Reconnect your account context to load privacy controls and integration states.",
      emptyJson: '{ "theme": null, "language": null, "consents": [] }',
      errorText: "settings data could not be loaded",
      offlineText: "Offline · Showing cached settings from 5m ago",
    },
    accessibilityMobile: "<li>Profile, consent, and integration cards pair readable text with toggles so state changes remain clear without relying on color alone.</li>",
    accessibilityDesktop: "<li>Consent and integration switches include readable status labels like ACTIVE, OFF, CONNECTED, and DISCONNECTED for keyboard and screen-reader clarity.</li>",
  },
  {
    filename: "S-29-legal-pro.html",
    title: "Legal Sathi — Case Digest Library",
    description: "Legal Pro curated case digest library with subject filters, audio access, and study-mode entry points.",
    mobileActive: "Research",
    desktopActive: "Research",
    desktopStickyStyle: "top:calc(var(--ls-desktop-card-top) - 4px); gap:10px;",
    desktopStackStyle: "row-gap:10px;",
    desktopMainStyle:
      "background-color: color-mix(in srgb, var(--ls-bg) 76%, white 24%); background-image: linear-gradient(rgba(144,164,183,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(144,164,183,0.05) 1px, transparent 1px); background-size:24px 24px;",
    mobile: `
      <section class="panel rounded-[24px] p-4 shadow-panel">
        <div class="flex items-start justify-between gap-3">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--ls-text-secondary)]">S-29 · Study digest library</p>
            <h1 class="mt-2 text-2xl font-semibold text-[var(--ls-text-primary)]">Case digest library</h1>
            <p class="mt-2 text-sm text-[var(--ls-text-secondary)]">Browse curated summaries, switch into audio mode, and move into flashcard or quiz retention flows.</p>
          </div>
          <span class="rounded-full border border-[var(--ls-border)] px-3 py-1 font-mono text-xs text-[var(--ls-text-secondary)]">TTS READY</span>
        </div>
      </section>
      <section class="grid gap-3 sm:grid-cols-3">
        ${[
          ["Digests", "186", "Across 8 subjects", "linear-gradient(180deg, rgba(43,108,176,0.18), rgba(43,108,176,0.06))", "rgba(43,108,176,0.16)", "#2B6CB0", navIcon("Research", "h-4 w-4")],
          ["Saved", "24", "Offline available", "linear-gradient(180deg, rgba(99,102,241,0.18), rgba(99,102,241,0.06))", "rgba(99,102,241,0.16)", "#4F46E5", vaultActionGlyph("download", "h-4 w-4")],
          ["Audio queue", "03", "Ready to play", "linear-gradient(180deg, rgba(217,119,6,0.18), rgba(217,119,6,0.06))", "rgba(217,119,6,0.16)", "#D97706", audioTransportGlyph("play", "h-4 w-4")],
        ]
          .map(
            ([label, value, meta, outer, inner, color, icon]) => `
              <div class="panel rounded-[20px] p-4" style="background:${outer};">
                <div class="flex items-center justify-between gap-3">
                  <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">${label}</p>
                  <span class="grid h-9 w-9 shrink-0 place-items-center rounded-xl" style="background:${inner}; color:${color};">
                    ${icon}
                  </span>
                </div>
                <p class="mt-3 font-mono text-2xl text-[var(--ls-text-primary)]">${value}</p>
                <p class="mt-2 text-xs text-[var(--ls-text-secondary)]">${meta}</p>
              </div>
            `,
          )
          .join("")}
      </section>
      <section class="panel rounded-[24px] p-4" style="background:linear-gradient(180deg, rgba(43,108,176,0.12), rgba(43,108,176,0.04));">
        <div class="flex flex-wrap gap-2">
          ${["Constitution", "Criminal", "Contract", "Arbitration", "DPDP"].map((chip, i) => `<button type="button" data-action-select data-action-group="s29-mobile-subjects" data-action-active="${i === 1 ? "true" : "false"}" aria-pressed="${i === 1 ? "true" : "false"}" class="focus-ring min-h-[44px] rounded-full px-4 ${i === 1 ? "bg-[var(--ls-accent)] text-white" : "border border-[var(--ls-border)] bg-[var(--ls-surface-2)] text-[var(--ls-text-secondary)]"} text-xs font-semibold">${chip}</button>`).join("")}
        </div>
        <div class="mt-4 flex rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] p-1">
          <button type="button" data-action-select data-action-group="s29-mobile-mode" data-action-active="true" aria-pressed="true" class="focus-ring min-h-[44px] flex-1 rounded-xl bg-[var(--ls-accent)] px-4 py-2 text-sm font-semibold text-white">Digest</button>
          <button type="button" data-action-select data-action-group="s29-mobile-mode" data-action-active="false" aria-pressed="false" class="focus-ring min-h-[44px] flex-1 rounded-xl px-4 py-2 text-sm font-semibold text-[var(--ls-text-secondary)]">Flashcards</button>
          <button type="button" data-action-select data-action-group="s29-mobile-mode" data-action-active="false" aria-pressed="false" class="focus-ring min-h-[44px] flex-1 rounded-xl px-4 py-2 text-sm font-semibold text-[var(--ls-text-secondary)]">Quiz</button>
        </div>
      </section>
      <section class="space-y-3">
        ${[
          ["Sharma v. State of Maharashtra", "(2025) 3 SCC 145", "Anticipatory bail digest with Section 438 CrPC reasoning and custody threshold analysis.", "Audio 4m 12s · Flashcards ready", "linear-gradient(180deg, rgba(43,108,176,0.14), rgba(43,108,176,0.05))"],
          ["Priya Sharma v. State", "2025 SCC OnLine Del 418", "Cheque dishonour service-presumption digest linked to notice timeline evidence.", "Audio 3m 08s · Quiz ready", "linear-gradient(180deg, rgba(99,102,241,0.14), rgba(99,102,241,0.05))"],
          ["Nandini Rao v. Union of India", "2025 SCC OnLine Del 640", "DPDP compliance digest focused on purpose limitation and processor obligations.", "Audio 5m 01s · Saved offline", "linear-gradient(180deg, rgba(5,150,105,0.14), rgba(5,150,105,0.05))"],
        ]
          .map(
            ([title, citation, copy, meta, outer], index) => `
              <article class="panel rounded-[24px] p-4" style="background:${outer};">
                <div class="flex items-start justify-between gap-3">
                  <div>
                    <h2 class="text-sm font-semibold text-[var(--ls-text-primary)]">${title}</h2>
                    <p class="mt-1 font-mono text-xs text-[var(--ls-accent-soft)]">${citation}</p>
                  </div>
                  <div class="flex items-center gap-2">
                    ${audioTransportButton("play", `Play audio digest for ${title}`, "h-11 w-11 rounded-xl", "h-4 w-4").replace("<button ", `<button data-action-select data-action-group="s29-mobile-audio-${index}" data-action-active="true" aria-pressed="true" `)}
                    ${audioTransportButton("pause", `Pause audio digest for ${title}`, "h-11 w-11 rounded-xl", "h-4 w-4").replace("<button ", `<button data-action-select data-action-group="s29-mobile-audio-${index}" data-action-active="false" aria-pressed="false" `)}
                    ${audioTransportButton("stop", `Stop audio digest for ${title}`, "h-11 w-11 rounded-xl", "h-4 w-4").replace("<button ", `<button data-action-select data-action-group="s29-mobile-audio-${index}" data-action-active="false" aria-pressed="false" `)}
                  </div>
                </div>
                <p class="mt-3 text-sm leading-6 text-[var(--ls-text-secondary)]">${copy}</p>
                <div class="mt-3 flex flex-wrap gap-2">
                  <span class="rounded-full border border-[var(--ls-border)] bg-[var(--ls-surface-2)] px-3 py-1 font-mono text-[11px] text-[var(--ls-text-secondary)]">${meta}</span>
                </div>
              </article>
            `,
          )
          .join("")}
      </section>
      <section class="panel rounded-[24px] p-4" aria-live="polite" style="background:linear-gradient(180deg, rgba(217,119,6,0.14), rgba(217,119,6,0.05));">
        <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Study suggestion</p>
        <div class="mt-3 rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] p-4">
          <p class="text-sm leading-6 text-[var(--ls-text-primary)]">LegalGPT India recommends listening to the bail digest first, then switching to flashcards for authority recall and quiz mode for retention testing.</p>
        </div>
      </section>
    `,
    desktop: `
      <section class="panel rounded-[28px] p-6 shadow-float">
        <div class="flex items-start justify-between gap-6">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--ls-text-secondary)]">S-29 · Digest library</p>
            <h1 class="mt-2 text-3xl font-semibold text-[var(--ls-text-primary)]">Curated case digest workspace</h1>
            <p class="mt-3 max-w-3xl text-sm leading-6 text-[var(--ls-text-secondary)]">Combines subject filters, audio entry, saved offline digests, and study-mode transitions into one dense research surface.</p>
          </div>
          <div class="flex flex-wrap gap-2">
            <span class="inline-flex items-center gap-2 rounded-full border border-sky-500/25 bg-gradient-to-r from-sky-500/16 via-amber-400/16 to-violet-500/12 px-3 py-1.5 text-[11px] text-[var(--ls-text-primary)]">
              <span class="grid h-5 w-5 place-items-center rounded-full bg-[var(--ls-surface)]/70 text-[var(--ls-accent)]">
                ${navIcon("Calendar", "h-3.5 w-3.5")}
              </span>
              <span class="font-mono">18 Apr 2026</span>
            </span>
            <span class="rounded-full border border-amber-500/20 bg-amber-500/12 px-3 py-1 font-mono text-[11px] text-amber-700 dark:text-amber-300">IST</span>
            <span class="rounded-full border border-violet-500/20 bg-violet-500/12 px-3 py-1 font-mono text-[11px] text-violet-700 dark:text-violet-300">AP-SOUTH-1</span>
            <span class="rounded-full border border-emerald-500/20 bg-emerald-500/12 px-3 py-1 font-mono text-[11px] text-emerald-700 dark:text-emerald-300">RLS</span>
          </div>
        </div>
      </section>
      <section class="grid gap-6 xl:grid-cols-[0.9fr,1.12fr,0.9fr]" style="margin-top:12px;">
        <div class="space-y-4">
          <div class="panel rounded-[24px] p-5" style="background:linear-gradient(180deg, rgba(43,108,176,0.12), rgba(43,108,176,0.04));">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Library filters</p>
            <div class="mt-4 flex flex-wrap gap-2">
              ${["Constitution", "Criminal", "Contract", "Arbitration", "DPDP", "Tax"].map((chip, i) => `<button type="button" data-action-select data-action-group="s29-desktop-subjects" data-action-active="${i === 1 ? "true" : "false"}" aria-pressed="${i === 1 ? "true" : "false"}" class="focus-ring rounded-full ${i === 1 ? "bg-[var(--ls-accent)] text-white" : "border border-[var(--ls-border)] text-[var(--ls-text-primary)]"} px-3 py-2 text-xs">${chip}</button>`).join("")}
            </div>
          </div>
          <div class="panel rounded-[24px] p-5" style="background:linear-gradient(180deg, rgba(99,102,241,0.12), rgba(99,102,241,0.04));">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Saved offline</p>
            <div class="mt-4 grid gap-3">
              ${[
                ["Saved digests", "24", "Travel-ready summaries", "linear-gradient(180deg, rgba(99,102,241,0.18), rgba(99,102,241,0.07))", "rgba(99,102,241,0.16)", "#4F46E5", vaultActionGlyph("download", "h-4 w-4")],
                ["Audio queue", "03", "Ready for commute playback", "linear-gradient(180deg, rgba(217,119,6,0.18), rgba(217,119,6,0.07))", "rgba(217,119,6,0.16)", "#D97706", audioTransportGlyph("play", "h-4 w-4")],
              ]
                .map(
                  ([label, value, meta, outer, inner, color, icon]) => `
                    <div class="rounded-2xl border border-[var(--ls-border)] p-4" style="background:${outer};">
                      <div class="flex items-center justify-between gap-3">
                        <div>
                          <p class="text-sm text-[var(--ls-text-primary)]">${label}</p>
                          <p class="mt-1 font-mono text-2xl text-[var(--ls-text-primary)]">${value}</p>
                          <p class="mt-2 text-xs text-[var(--ls-text-secondary)]">${meta}</p>
                        </div>
                        <span class="grid h-10 w-10 shrink-0 place-items-center rounded-xl" style="background:${inner}; color:${color};">
                          ${icon}
                        </span>
                      </div>
                    </div>
                  `,
                )
                .join("")}
            </div>
          </div>
        </div>
        <div class="panel rounded-[24px] p-5" style="background:linear-gradient(180deg, rgba(43,108,176,0.1), rgba(43,108,176,0.035));">
          <div class="flex items-center justify-between">
            <div class="flex gap-2">
              ${["Digest", "Flashcards", "Quiz"].map((view, i) => `<button type="button" data-action-select data-action-group="s29-desktop-mode" data-action-active="${i === 0 ? "true" : "false"}" aria-pressed="${i === 0 ? "true" : "false"}" class="focus-ring min-h-[44px] rounded-xl px-4 py-2 text-sm font-semibold ${i === 0 ? "bg-[var(--ls-accent)] text-white" : "border border-[var(--ls-border)] text-[var(--ls-text-primary)]"}">${view}</button>`).join("")}
            </div>
            <button type="button" data-action-select data-action-active="false" aria-pressed="false" class="focus-ring min-h-[44px] rounded-xl border border-[var(--ls-border)] px-4 py-2 text-sm font-semibold text-[var(--ls-text-primary)]">Save current filter</button>
          </div>
          <div class="mt-4 space-y-3">
            ${[
              ["Sharma v. State of Maharashtra", "(2025) 3 SCC 145", "Anticipatory bail digest linked to Section 438 CrPC reasoning and custody threshold analysis.", "Audio 4m 12s · Flashcards ready", "linear-gradient(180deg, rgba(43,108,176,0.18), rgba(43,108,176,0.07))"],
              ["Priya Sharma v. State", "2025 SCC OnLine Del 418", "Cheque dishonour digest tied to service presumptions and refusal endorsements.", "Audio 3m 08s · Quiz ready", "linear-gradient(180deg, rgba(99,102,241,0.18), rgba(99,102,241,0.07))"],
              ["Nandini Rao v. Union of India", "2025 SCC OnLine Del 640", "DPDP digest focused on purpose limitation and processor obligations.", "Audio 5m 01s · Saved offline", "linear-gradient(180deg, rgba(5,150,105,0.18), rgba(5,150,105,0.07))"],
            ]
              .map(
                ([title, citation, copy, meta, outer], index) => `
                  <article class="rounded-2xl border border-[var(--ls-border)] p-4" style="background:${outer};">
                    <div class="flex items-start justify-between gap-4">
                      <div>
                        <h2 class="text-base font-semibold text-[var(--ls-text-primary)]">${title}</h2>
                        <p class="mt-1 font-mono text-xs text-[var(--ls-accent-soft)]">${citation}</p>
                      </div>
                      <div class="flex items-center gap-2">
                        ${audioTransportButton("play", `Play audio digest for ${title}`).replace("<button ", `<button data-action-select data-action-group="s29-desktop-audio-${index}" data-action-active="true" aria-pressed="true" `)}
                        ${audioTransportButton("pause", `Pause audio digest for ${title}`).replace("<button ", `<button data-action-select data-action-group="s29-desktop-audio-${index}" data-action-active="false" aria-pressed="false" `)}
                        ${audioTransportButton("stop", `Stop audio digest for ${title}`).replace("<button ", `<button data-action-select data-action-group="s29-desktop-audio-${index}" data-action-active="false" aria-pressed="false" `)}
                      </div>
                    </div>
                    <p class="mt-3 text-sm leading-6 text-[var(--ls-text-secondary)]">${copy}</p>
                    <div class="mt-3 flex flex-wrap gap-2">
                      <span class="rounded-full border border-[var(--ls-border)] bg-[var(--ls-surface)]/75 px-3 py-1 font-mono text-[11px] text-[var(--ls-text-secondary)]">${meta}</span>
                    </div>
                  </article>
                `,
              )
              .join("")}
          </div>
        </div>
        <div class="space-y-4">
          <div class="panel rounded-[24px] p-5" aria-live="polite" style="background:linear-gradient(180deg, rgba(217,119,6,0.12), rgba(217,119,6,0.04));">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Study path</p>
            <div class="mt-4 space-y-3">
              ${[
                ["Listen first", "Use the audio player for commute review.", "linear-gradient(180deg, rgba(217,119,6,0.18), rgba(217,119,6,0.07))"],
                ["Then flashcards", "Strengthen authority recall with spaced prompts.", "linear-gradient(180deg, rgba(99,102,241,0.18), rgba(99,102,241,0.07))"],
                ["Finish with quiz", "Validate retention and rubric-based grading.", "linear-gradient(180deg, rgba(5,150,105,0.18), rgba(5,150,105,0.07))"],
              ]
                .map(([title, note, outer]) => `<div class="rounded-2xl border border-[var(--ls-border)] p-4" style="background:${outer};"><p class="text-sm text-[var(--ls-text-primary)]">${title}</p><p class="mt-2 text-xs text-[var(--ls-text-secondary)]">${note}</p></div>`)
                .join("")}
            </div>
          </div>
          <div class="panel rounded-[24px] p-5" style="background:linear-gradient(180deg, rgba(43,108,176,0.12), rgba(43,108,176,0.04));">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">AI recommendation</p>
            <div class="mt-4 rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] p-4 text-sm leading-6 text-[var(--ls-text-primary)]">LegalGPT India recommends the criminal-law digest bundle first because your recent activity shows better recall when you hear the summary before reading the citation card.</div>
          </div>
        </div>
      </section>
    `,
    states: {
      emptyTitle: "No digests available",
      emptyBody: "Change subject filters or save new case summaries to populate the library.",
      emptyJson: '{ "digests": [], "saved": [], "audioQueue": [] }',
      errorText: "case digest library could not be loaded",
      offlineText: "Offline · Showing cached digest library from 5m ago",
    },
    accessibilityMobile: "<li>Each digest exposes separate play, pause, and stop buttons with screen-reader labels tied to the case title, so audio controls remain clear even without visible text.</li>",
    accessibilityDesktop: "<li>Icon-led audio controls keep their accessible names, while the digest, flashcard, and quiz tabs preserve visible labels for keyboard navigation clarity.</li>",
  },
  {
    filename: "S-29b-legal-pro.html",
    title: "Legal Sathi — Quiz Mode",
    description: "Legal Pro quiz mode for case-law retention with rubric grading, plagiarism checks, and AI first-pass evaluation.",
    mobileActive: "Research",
    desktopActive: "Research",
    desktopStickyStyle: "top:calc(var(--ls-desktop-card-top) - 4px); gap:10px;",
    desktopStackStyle: "row-gap:10px;",
    desktopMainStyle:
      "background-color: color-mix(in srgb, var(--ls-bg) 76%, white 24%); background-image: linear-gradient(rgba(144,164,183,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(144,164,183,0.05) 1px, transparent 1px); background-size:24px 24px;",
    mobile: `
      <section class="panel rounded-[24px] p-4 shadow-panel">
        <div class="flex items-start justify-between gap-3">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--ls-text-secondary)]">S-29b · Quiz mode</p>
            <h1 class="mt-2 text-2xl font-semibold text-[var(--ls-text-primary)]">Case-law retention quiz</h1>
            <p class="mt-2 text-sm text-[var(--ls-text-secondary)]">Switch between MCQ and short-answer practice, get rubric-based scoring, and review AI first-pass grading before final submission.</p>
          </div>
          <span class="rounded-full border border-[var(--ls-border)] px-3 py-1 font-mono text-xs text-[var(--ls-text-secondary)]">AI GRADED</span>
        </div>
      </section>
      <section class="grid gap-3 sm:grid-cols-3">
        ${[
          ["Questions", "12", "Criminal-law round", "linear-gradient(180deg, rgba(43,108,176,0.18), rgba(43,108,176,0.06))", "rgba(43,108,176,0.16)", "#2B6CB0", navIcon("Research", "h-4 w-4")],
          ["Accuracy", "82%", "Last 7 attempts", "linear-gradient(180deg, rgba(99,102,241,0.18), rgba(99,102,241,0.06))", "rgba(99,102,241,0.16)", "#4F46E5", navIcon("Cases", "h-4 w-4")],
          ["Streak", "05", "Days maintained", "linear-gradient(180deg, rgba(217,119,6,0.18), rgba(217,119,6,0.06))", "rgba(217,119,6,0.16)", "#D97706", navIcon("Calendar", "h-4 w-4")],
        ]
          .map(
            ([label, value, meta, outer, inner, color, icon]) => `
              <div class="panel rounded-[20px] p-4" style="background:${outer};">
                <div class="flex items-center justify-between gap-3">
                  <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">${label}</p>
                  <span class="grid h-9 w-9 shrink-0 place-items-center rounded-xl" style="background:${inner}; color:${color};">
                    ${icon}
                  </span>
                </div>
                <p class="mt-3 font-mono text-2xl text-[var(--ls-text-primary)]">${value}</p>
                <p class="mt-2 text-xs text-[var(--ls-text-secondary)]">${meta}</p>
              </div>
            `,
          )
          .join("")}
      </section>
      <section class="panel rounded-[24px] p-4" style="background:linear-gradient(180deg, rgba(43,108,176,0.12), rgba(43,108,176,0.04));">
        <div class="flex flex-wrap gap-2">
          ${["Criminal", "Constitution", "Contract", "DPDP"].map((chip, i) => `<button type="button" data-action-select data-action-group="s29b-mobile-subjects" data-action-active="${i === 0 ? "true" : "false"}" aria-pressed="${i === 0 ? "true" : "false"}" class="focus-ring min-h-[44px] rounded-full border border-[var(--ls-border)] bg-[var(--ls-surface-2)] px-4 text-xs font-semibold text-[var(--ls-text-primary)]">${chip}</button>`).join("")}
        </div>
        <div class="mt-4 flex rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] p-1">
          ${["MCQ", "Short answer", "Timed"].map((mode, i) => `<button type="button" data-action-select data-action-group="s29b-mobile-mode" data-action-active="${i === 0 ? "true" : "false"}" aria-pressed="${i === 0 ? "true" : "false"}" class="focus-ring min-h-[44px] flex-1 rounded-xl border border-transparent bg-transparent px-3 py-2 text-sm font-semibold text-[var(--ls-text-primary)]">${mode}</button>`).join("")}
        </div>
      </section>
      <section class="panel rounded-[24px] p-4" style="background:linear-gradient(180deg, rgba(99,102,241,0.14), rgba(99,102,241,0.05));">
        <div class="flex items-center justify-between gap-3">
          <div>
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Question 04 of 12</p>
            <p class="mt-1 font-mono text-xs text-[var(--ls-accent-soft)]">Topic: Section 138 NI Act · Service of notice</p>
          </div>
          <span class="rounded-full border border-[var(--ls-border)] bg-[var(--ls-surface-2)] px-3 py-1 font-mono text-[11px] text-[var(--ls-text-secondary)]">02:14 left</span>
        </div>
        <div class="mt-4 rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] p-4">
          <p class="text-sm leading-6 text-[var(--ls-text-primary)]">In a cheque-dishonour prosecution, which fact most strongly supports the presumption that the statutory notice was served on the drawer?</p>
        </div>
        <div class="mt-4 space-y-3">
          ${[
            "The complainant produced a courier invoice without delivery status.",
            "The notice was returned with the endorsement 'refused' at the correct residential address.",
            "The drawer orally denied receipt before filing a reply affidavit.",
            "The bank memo mentioned insufficiency of funds on first presentation.",
          ]
            .map(
              (option, index) => `
                <button type="button" data-action-select data-action-group="s29b-mobile-options" data-action-active="false" aria-pressed="false" class="focus-ring flex min-h-[56px] w-full items-start gap-3 rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] px-4 py-3 text-left text-sm text-[var(--ls-text-primary)]">
                  <span class="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-[var(--ls-border)] bg-[var(--ls-bg)] font-mono text-[11px] text-[var(--ls-text-secondary)]">${String.fromCharCode(65 + index)}</span>
                  <span>${option}</span>
                </button>
              `,
            )
            .join("")}
        </div>
        <div class="mt-4 flex items-center gap-2">
          <button type="button" data-action-select data-action-active="false" aria-pressed="false" class="focus-ring min-h-[44px] rounded-xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] px-4 py-2 text-sm font-semibold text-[var(--ls-text-primary)]">Submit answer</button>
          <button type="button" data-action-select data-action-active="false" aria-pressed="false" class="focus-ring min-h-[44px] rounded-xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] px-4 py-2 text-sm font-semibold text-[var(--ls-text-primary)]">View rubric</button>
        </div>
      </section>
      <section class="grid gap-3 sm:grid-cols-2">
        <div class="panel rounded-[24px] p-4" style="background:linear-gradient(180deg, rgba(5,150,105,0.14), rgba(5,150,105,0.05));">
          <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Rubric snapshot</p>
          <div class="mt-3 space-y-3">
            ${[
              ["Issue spotting", "40", "Captures notice-service presumption and refusal"],
              ["Authority recall", "35", "C.C. Alavi Haji expected"],
              ["Brevity", "25", "Answer in under 120 words"],
            ]
              .map(
                ([label, value, note]) => `
                  <div class="rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] p-3">
                    <div class="flex items-center justify-between gap-3">
                      <p class="text-sm text-[var(--ls-text-primary)]">${label}</p>
                      <span class="rounded-full border border-[var(--ls-border)] px-2.5 py-1 font-mono text-[10px] text-[var(--ls-text-secondary)]">${value}%</span>
                    </div>
                    <p class="mt-2 text-xs leading-5 text-[var(--ls-text-secondary)]">${note}</p>
                  </div>
                `,
              )
              .join("")}
          </div>
        </div>
        <div class="panel rounded-[24px] p-4" style="background:linear-gradient(180deg, rgba(217,119,6,0.14), rgba(217,119,6,0.05));">
          <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Integrity + AI grader</p>
          <div class="mt-3 space-y-3">
            <div class="rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] p-3">
              <div class="flex items-center justify-between gap-3">
                <p class="text-sm text-[var(--ls-text-primary)]">Similarity check</p>
                <span class="rounded-full border border-emerald-500/35 bg-emerald-500/12 px-2.5 py-1 font-mono text-[10px] text-emerald-600 dark:text-emerald-300">04%</span>
              </div>
              <p class="mt-2 text-xs leading-5 text-[var(--ls-text-secondary)]">No material overlap beyond statute quotation and party names.</p>
            </div>
            <div class="rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] p-3" aria-live="polite">
              <p class="text-sm text-[var(--ls-text-primary)]">LegalGPT India first-pass note</p>
              <p class="mt-2 text-xs leading-5 text-[var(--ls-text-secondary)]">Strong answers usually mention refusal endorsement at the correct address and cite <span class="mono">C.C. Alavi Haji</span> for deemed service.</p>
            </div>
          </div>
        </div>
      </section>
    `,
    desktop: `
      <section class="panel rounded-[28px] p-6 shadow-float">
        <div class="flex items-start justify-between gap-6">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--ls-text-secondary)]">S-29b · Quiz mode</p>
            <h1 class="mt-2 text-3xl font-semibold text-[var(--ls-text-primary)]">Interactive retention and grading workspace</h1>
            <p class="mt-3 max-w-3xl text-sm leading-6 text-[var(--ls-text-secondary)]">Practice case-law recall through MCQs and short-answer prompts, review rubric-based grading, and check first-pass AI feedback before final submission.</p>
          </div>
          <div class="flex flex-wrap gap-2">
            <span class="inline-flex items-center gap-2 rounded-full border border-sky-500/25 bg-gradient-to-r from-sky-500/16 via-amber-400/16 to-violet-500/12 px-3 py-1.5 text-[11px] text-[var(--ls-text-primary)]">
              <span class="grid h-5 w-5 place-items-center rounded-full bg-[var(--ls-surface)]/70 text-[var(--ls-accent)]">
                ${navIcon("Calendar", "h-3.5 w-3.5")}
              </span>
              <span class="font-mono">18 Apr 2026</span>
            </span>
            <span class="rounded-full border border-amber-500/20 bg-amber-500/12 px-3 py-1 font-mono text-[11px] text-amber-700 dark:text-amber-300">IST</span>
            <span class="rounded-full border border-violet-500/20 bg-violet-500/12 px-3 py-1 font-mono text-[11px] text-violet-700 dark:text-violet-300">AP-SOUTH-1</span>
            <span class="rounded-full border border-emerald-500/20 bg-emerald-500/12 px-3 py-1 font-mono text-[11px] text-emerald-700 dark:text-emerald-300">RLS</span>
          </div>
        </div>
      </section>
      <section class="grid gap-6 xl:grid-cols-[0.88fr,1.16fr,0.92fr]" style="margin-top:12px;">
        <div class="space-y-4">
          <div class="panel rounded-[24px] p-5" style="background:linear-gradient(180deg, rgba(43,108,176,0.12), rgba(43,108,176,0.04));">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Quiz setup</p>
            <div class="mt-4 flex flex-wrap gap-2">
              ${["Criminal", "Constitution", "Contract", "DPDP", "Tax"].map((chip, i) => `<button type="button" data-action-select data-action-group="s29b-desktop-subjects" data-action-active="${i === 0 ? "true" : "false"}" aria-pressed="${i === 0 ? "true" : "false"}" class="focus-ring rounded-full border border-[var(--ls-border)] bg-[var(--ls-surface-2)] px-3 py-2 text-xs text-[var(--ls-text-primary)]">${chip}</button>`).join("")}
            </div>
            <div class="mt-4 flex rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] p-1">
              ${["MCQ", "Short answer", "Timed"].map((mode, i) => `<button type="button" data-action-select data-action-group="s29b-desktop-mode" data-action-active="${i === 0 ? "true" : "false"}" aria-pressed="${i === 0 ? "true" : "false"}" class="focus-ring min-h-[44px] flex-1 rounded-xl border border-transparent bg-transparent px-3 py-2 text-sm font-semibold text-[var(--ls-text-primary)]">${mode}</button>`).join("")}
            </div>
          </div>
          <div class="panel rounded-[24px] p-5" style="background:linear-gradient(180deg, rgba(99,102,241,0.12), rgba(99,102,241,0.04));">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Attempt snapshot</p>
            <div class="mt-4 grid gap-3">
              ${[
                ["Questions remaining", "08", "Round closes in 18m", "linear-gradient(180deg, rgba(43,108,176,0.18), rgba(43,108,176,0.07))", "rgba(43,108,176,0.16)", "#2B6CB0", navIcon("Research", "h-4 w-4")],
                ["Last score", "82%", "Improved by 6 points", "linear-gradient(180deg, rgba(5,150,105,0.18), rgba(5,150,105,0.07))", "rgba(5,150,105,0.16)", "#059669", navIcon("Cases", "h-4 w-4")],
                ["Streak", "05 days", "Retention target on track", "linear-gradient(180deg, rgba(217,119,6,0.18), rgba(217,119,6,0.07))", "rgba(217,119,6,0.16)", "#D97706", navIcon("Calendar", "h-4 w-4")],
              ]
                .map(
                  ([label, value, meta, outer, inner, color, icon]) => `
                    <div class="rounded-2xl border border-[var(--ls-border)] p-4" style="background:${outer};">
                      <div class="flex items-center justify-between gap-3">
                        <div>
                          <p class="text-sm text-[var(--ls-text-primary)]">${label}</p>
                          <p class="mt-1 font-mono text-2xl text-[var(--ls-text-primary)]">${value}</p>
                          <p class="mt-2 text-xs text-[var(--ls-text-secondary)]">${meta}</p>
                        </div>
                        <span class="grid h-10 w-10 shrink-0 place-items-center rounded-xl" style="background:${inner}; color:${color};">
                          ${icon}
                        </span>
                      </div>
                    </div>
                  `,
                )
                .join("")}
            </div>
          </div>
        </div>
        <div class="panel rounded-[24px] p-5" style="background:linear-gradient(180deg, rgba(43,108,176,0.1), rgba(43,108,176,0.035));">
          <div class="flex items-center justify-between gap-4">
            <div>
              <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Question 04 of 12</p>
              <p class="mt-1 font-mono text-xs text-[var(--ls-accent-soft)]">Section 138 NI Act · Notice-service presumption</p>
            </div>
            <div class="flex items-center gap-2">
              <span class="rounded-full border border-[var(--ls-border)] bg-[var(--ls-surface-2)] px-3 py-1 font-mono text-[11px] text-[var(--ls-text-secondary)]">02:14 left</span>
              <button type="button" data-action-select data-action-active="false" aria-pressed="false" class="focus-ring min-h-[44px] rounded-xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] px-4 py-2 text-sm font-semibold text-[var(--ls-text-primary)]">Flag question</button>
            </div>
          </div>
          <div class="mt-4 rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] p-5">
            <p class="text-base leading-7 text-[var(--ls-text-primary)]">In a cheque-dishonour prosecution, which fact most strongly supports the presumption that the statutory notice was served on the drawer?</p>
          </div>
          <div class="mt-4 space-y-3">
            ${[
              "The complainant produced a courier invoice without delivery status.",
              "The notice was returned with the endorsement 'refused' at the correct residential address.",
              "The drawer orally denied receipt before filing a reply affidavit.",
              "The bank memo mentioned insufficiency of funds on first presentation.",
            ]
              .map(
                (option, index) => `
                  <button type="button" data-action-select data-action-group="s29b-desktop-options" data-action-active="false" aria-pressed="false" class="focus-ring flex min-h-[56px] w-full items-start gap-4 rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] px-4 py-3 text-left text-sm text-[var(--ls-text-primary)]">
                    <span class="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-[var(--ls-border)] bg-[var(--ls-bg)] font-mono text-[11px] text-[var(--ls-text-secondary)]">${String.fromCharCode(65 + index)}</span>
                    <span class="pt-0.5">${option}</span>
                  </button>
                `,
              )
              .join("")}
          </div>
          <div class="mt-4 flex items-center gap-2">
            <button type="button" data-action-select data-action-active="false" aria-pressed="false" class="focus-ring min-h-[44px] rounded-xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] px-4 py-2 text-sm font-semibold text-[var(--ls-text-primary)]">Submit answer</button>
            <button type="button" data-action-select data-action-active="false" aria-pressed="false" class="focus-ring min-h-[44px] rounded-xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] px-4 py-2 text-sm font-semibold text-[var(--ls-text-primary)]">View rubric</button>
            <button type="button" data-action-select data-action-active="false" aria-pressed="false" class="focus-ring min-h-[44px] rounded-xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] px-4 py-2 text-sm font-semibold text-[var(--ls-text-primary)]">Next question</button>
          </div>
        </div>
        <div class="space-y-4">
          <div class="panel rounded-[24px] p-5" style="background:linear-gradient(180deg, rgba(5,150,105,0.12), rgba(5,150,105,0.04));">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Rubric-based grading</p>
            <div class="mt-4 space-y-3">
              ${[
                ["Issue spotting", "40%", "Identifies deemed service through refusal at the correct address.", "linear-gradient(180deg, rgba(43,108,176,0.18), rgba(43,108,176,0.07))"],
                ["Authority recall", "35%", "Best answers cite C.C. Alavi Haji and connect presumption to the factual matrix.", "linear-gradient(180deg, rgba(99,102,241,0.18), rgba(99,102,241,0.07))"],
                ["Brevity + structure", "25%", "Scored on clear rule statement and sub-120-word precision.", "linear-gradient(180deg, rgba(217,119,6,0.18), rgba(217,119,6,0.07))"],
              ]
                .map(
                  ([label, value, note, outer]) => `
                    <div class="rounded-2xl border border-[var(--ls-border)] p-4" style="background:${outer};">
                      <div class="flex items-center justify-between gap-3">
                        <p class="text-sm text-[var(--ls-text-primary)]">${label}</p>
                        <span class="rounded-full border border-[var(--ls-border)] px-2.5 py-1 font-mono text-[10px] text-[var(--ls-text-secondary)]">${value}</span>
                      </div>
                      <p class="mt-2 text-xs leading-5 text-[var(--ls-text-secondary)]">${note}</p>
                    </div>
                  `,
                )
                .join("")}
            </div>
          </div>
          <div class="panel rounded-[24px] p-5" style="background:linear-gradient(180deg, rgba(217,119,6,0.12), rgba(217,119,6,0.04));">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Integrity checks</p>
            <div class="mt-4 grid gap-3">
              ${[
                ["Similarity", "04%", "No material plagiarism detected beyond statute references.", "rgba(5,150,105,0.16)", "#059669", navIcon("Cases", "h-4 w-4")],
                ["Citation match", "03 / 03", "Expected authorities recognised in the answer draft.", "rgba(43,108,176,0.16)", "#2B6CB0", navIcon("Research", "h-4 w-4")],
              ]
                .map(
                  ([label, value, note, inner, color, icon]) => `
                    <div class="rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] p-4">
                      <div class="flex items-center justify-between gap-3">
                        <div>
                          <p class="text-sm text-[var(--ls-text-primary)]">${label}</p>
                          <p class="mt-1 font-mono text-xl text-[var(--ls-text-primary)]">${value}</p>
                          <p class="mt-2 text-xs leading-5 text-[var(--ls-text-secondary)]">${note}</p>
                        </div>
                        <span class="grid h-10 w-10 shrink-0 place-items-center rounded-xl" style="background:${inner}; color:${color};">
                          ${icon}
                        </span>
                      </div>
                    </div>
                  `,
                )
                .join("")}
            </div>
          </div>
          <div class="panel rounded-[24px] p-5" aria-live="polite" style="background:linear-gradient(180deg, rgba(43,108,176,0.12), rgba(43,108,176,0.04));">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">AI first-pass grader</p>
            <div class="mt-4 rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] p-4 text-sm leading-6 text-[var(--ls-text-primary)]">LegalGPT India would reward answers that mention refusal endorsement at the correct address and cite <span class="mono">C.C. Alavi Haji</span>. Add one sentence explaining why mere denial of receipt is usually insufficient.</div>
          </div>
        </div>
      </section>
    `,
    states: {
      emptyTitle: "No quiz set loaded",
      emptyBody: "Select a subject or generate a new question set from saved digests to begin quiz mode.",
      emptyJson: '{ "questions": [], "mode": null, "score": null }',
      errorText: "quiz workspace could not be loaded",
      offlineText: "Offline · Showing cached quiz set from 5m ago",
    },
    accessibilityMobile: "<li>Answer options are full-width buttons with grouped pressed states so one selected answer remains clear to touch and screen-reader users.</li>",
    accessibilityDesktop: "<li>Rubric, integrity, and AI grading panels stay visually separate from the question workspace so evaluation context remains readable during keyboard navigation.</li>",
  },
  {
    filename: "S-30-legal-pro.html",
    title: "Legal Sathi — Community and Forums",
    description: "Legal Pro student community hub for peer discussion, school networks, and tutor connections.",
    mobileActive: "Research",
    desktopActive: "Research",
    desktopStickyStyle: "top:calc(var(--ls-desktop-card-top) - 4px); gap:10px;",
    desktopStackStyle: "row-gap:10px;",
    desktopMainStyle:
      "background-color: color-mix(in srgb, var(--ls-bg) 76%, white 24%); background-image: linear-gradient(rgba(144,164,183,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(144,164,183,0.05) 1px, transparent 1px); background-size:24px 24px;",
    mobile: `
      <section class="panel rounded-[24px] p-4 shadow-panel">
        <div class="flex items-start justify-between gap-3">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--ls-text-secondary)]">S-30 · Community and forums</p>
            <h1 class="mt-2 text-2xl font-semibold text-[var(--ls-text-primary)]">Peer discussion and mentor circles</h1>
            <p class="mt-2 text-sm text-[var(--ls-text-secondary)]">Join subject rooms, school cohorts, and national discussion boards while connecting directly with tutors around active topics.</p>
          </div>
          <span class="rounded-full border border-[var(--ls-border)] px-3 py-1 font-mono text-xs text-[var(--ls-text-secondary)]">COMMUNITY LIVE</span>
        </div>
      </section>
      <section class="grid gap-3 sm:grid-cols-3">
        ${[
          ["Threads", "28", "Active today", "linear-gradient(180deg, rgba(43,108,176,0.18), rgba(43,108,176,0.06))", "rgba(43,108,176,0.16)", "#2B6CB0", navIcon("Research", "h-4 w-4")],
          ["Replies", "146", "Across all rooms", "linear-gradient(180deg, rgba(99,102,241,0.18), rgba(99,102,241,0.06))", "rgba(99,102,241,0.16)", "#4F46E5", navIcon("Cases", "h-4 w-4")],
          ["Tutors", "09", "Available now", "linear-gradient(180deg, rgba(217,119,6,0.18), rgba(217,119,6,0.06))", "rgba(217,119,6,0.16)", "#D97706", navIcon("LegalGPT India", "h-4 w-4")],
        ]
          .map(
            ([label, value, meta, outer, inner, color, icon]) => `
              <div class="panel rounded-[20px] p-4" style="background:${outer};">
                <div class="flex items-center justify-between gap-3">
                  <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">${label}</p>
                  <span class="grid h-9 w-9 shrink-0 place-items-center rounded-xl" style="background:${inner}; color:${color};">
                    ${icon}
                  </span>
                </div>
                <p class="mt-3 font-mono text-2xl text-[var(--ls-text-primary)]">${value}</p>
                <p class="mt-2 text-xs text-[var(--ls-text-secondary)]">${meta}</p>
              </div>
            `,
          )
          .join("")}
      </section>
      <section class="panel rounded-[24px] p-4" style="background:linear-gradient(180deg, rgba(43,108,176,0.12), rgba(43,108,176,0.04));">
        <div class="flex rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] p-1">
          ${["Subject", "School", "National"].map((tab, i) => `<button type="button" data-action-select data-action-group="s30-mobile-lanes" data-action-active="${i === 0 ? "true" : "false"}" aria-pressed="${i === 0 ? "true" : "false"}" class="focus-ring min-h-[44px] flex-1 rounded-xl px-3 py-2 text-sm font-semibold text-[var(--ls-text-primary)]">${tab}</button>`).join("")}
        </div>
        <div class="mt-4 flex flex-wrap gap-2">
          ${["Moots", "Internships", "Evidence", "Constitution", "Drafting"].map((chip, i) => `<button type="button" data-action-select data-action-group="s30-mobile-tags" data-action-active="${i === 0 ? "true" : "false"}" aria-pressed="${i === 0 ? "true" : "false"}" class="focus-ring min-h-[40px] rounded-full border border-[var(--ls-border)] bg-[var(--ls-surface-2)] px-4 text-xs font-semibold text-[var(--ls-text-primary)]">${chip}</button>`).join("")}
        </div>
      </section>
      <section class="space-y-3">
        ${[
          ["Aditi S.", "NLU Delhi · 8m ago", "How are you structuring issue framing for the VIS Moot memorial this year?", "Need help balancing jurisdiction objections with merits without blowing past the page limit.", "23 replies · 4 tutors active", "linear-gradient(180deg, rgba(43,108,176,0.14), rgba(43,108,176,0.05))"],
          ["Raghav P.", "NLSIU · 21m ago", "Best cases for deemed service under Section 138 NI Act?", "I have C.C. Alavi Haji but need 2 more authorities for a short-answer round.", "17 replies · 2 tutor suggestions", "linear-gradient(180deg, rgba(99,102,241,0.14), rgba(99,102,241,0.05))"],
          ["Meera K.", "GNLU · 34m ago", "Anyone has a clean template for internship cover emails to tier-1 firms?", "Looking for a concise format that still sounds professional for litigation and corporate outreach.", "12 replies · 1 mentor note", "linear-gradient(180deg, rgba(5,150,105,0.14), rgba(5,150,105,0.05))"],
        ]
          .map(
            ([author, meta, title, copy, stats, outer], index) => `
              <article class="panel rounded-[24px] p-4" style="background:${outer};">
                <div class="flex items-start justify-between gap-3">
                  <div>
                    <p class="text-sm font-semibold text-[var(--ls-text-primary)]">${author}</p>
                    <p class="mt-1 font-mono text-[11px] text-[var(--ls-accent-soft)]">${meta}</p>
                  </div>
                  <button type="button" data-action-select data-action-active="false" aria-pressed="false" class="focus-ring min-h-[36px] rounded-full border border-[var(--ls-border)] bg-[var(--ls-surface-2)] px-3 py-1 font-mono text-[11px] text-[var(--ls-text-secondary)]">Save</button>
                </div>
                <h2 class="mt-3 text-sm font-semibold leading-6 text-[var(--ls-text-primary)]">${title}</h2>
                <p class="mt-2 text-sm leading-6 text-[var(--ls-text-secondary)]">${copy}</p>
                <div class="mt-3 flex flex-wrap gap-2">
                  <span class="rounded-full border border-[var(--ls-border)] bg-[var(--ls-surface-2)] px-3 py-1 font-mono text-[11px] text-[var(--ls-text-secondary)]">${stats}</span>
                </div>
                <div class="mt-4 flex items-center gap-2">
                  <button type="button" data-action-select data-action-active="false" aria-pressed="false" class="focus-ring min-h-[40px] rounded-xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] px-4 py-2 text-xs font-semibold text-[var(--ls-text-primary)]">Open thread</button>
                  <button type="button" data-action-select data-action-active="false" aria-pressed="false" class="focus-ring min-h-[40px] rounded-xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] px-4 py-2 text-xs font-semibold text-[var(--ls-text-primary)]">Reply</button>
                  <button type="button" data-action-select data-action-active="false" aria-pressed="false" class="focus-ring min-h-[40px] rounded-xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] px-4 py-2 text-xs font-semibold text-[var(--ls-text-primary)]">Tutor match</button>
                </div>
              </article>
            `,
          )
          .join("")}
      </section>
      <section class="panel rounded-[24px] p-4" style="background:linear-gradient(180deg, rgba(217,119,6,0.14), rgba(217,119,6,0.05));">
        <div class="flex items-center justify-between gap-3">
          <div>
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Connect with tutors</p>
            <p class="mt-1 text-sm text-[var(--ls-text-primary)]">Mentors active around your current discussion topics.</p>
          </div>
          <button type="button" data-action-select data-action-active="false" aria-pressed="false" class="focus-ring min-h-[36px] rounded-xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] px-3 py-2 text-[11px] font-semibold text-[var(--ls-text-primary)]">View all</button>
        </div>
        <div class="mt-4 space-y-3">
          ${[
            ["Prof. N. Rao", "Cheque dishonour · Criminal drafting", "₹900 / session"],
            ["Aarav Menon", "VIS Moot · Memorial review", "₹1,200 / session"],
          ]
            .map(
              ([name, expertise, fee]) => `
                <div class="rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] p-3">
                  <div class="flex items-center justify-between gap-3">
                    <div>
                      <p class="text-sm font-semibold text-[var(--ls-text-primary)]">${name}</p>
                      <p class="mt-1 text-xs text-[var(--ls-text-secondary)]">${expertise}</p>
                    </div>
                    <span class="rounded-full border border-[var(--ls-border)] px-2.5 py-1 font-mono text-[10px] text-[var(--ls-text-secondary)]">${fee}</span>
                  </div>
                </div>
              `,
            )
            .join("")}
        </div>
      </section>
      <button type="button" data-action-select data-action-active="false" aria-pressed="false" class="focus-ring fixed bottom-24 right-4 z-40 min-h-[52px] rounded-full bg-[var(--ls-accent)] px-5 py-3 text-sm font-semibold text-white shadow-float">
        Ask a Question
      </button>
    `,
    desktop: `
      <section class="panel rounded-[28px] p-6 shadow-float">
        <div class="flex items-start justify-between gap-6">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--ls-text-secondary)]">S-30 · Community and forums</p>
            <h1 class="mt-2 text-3xl font-semibold text-[var(--ls-text-primary)]">Student discussion and mentor network</h1>
            <p class="mt-3 max-w-3xl text-sm leading-6 text-[var(--ls-text-secondary)]">Follow subject discussions, school circles, and national legal-tech forums while routing active questions toward relevant tutors and mentors.</p>
          </div>
          <div class="flex flex-wrap gap-2">
            <span class="inline-flex items-center gap-2 rounded-full border border-sky-500/25 bg-gradient-to-r from-sky-500/16 via-amber-400/16 to-violet-500/12 px-3 py-1.5 text-[11px] text-[var(--ls-text-primary)]">
              <span class="grid h-5 w-5 place-items-center rounded-full bg-[var(--ls-surface)]/70 text-[var(--ls-accent)]">
                ${navIcon("Calendar", "h-3.5 w-3.5")}
              </span>
              <span class="font-mono">18 Apr 2026</span>
            </span>
            <span class="rounded-full border border-amber-500/20 bg-amber-500/12 px-3 py-1 font-mono text-[11px] text-amber-700 dark:text-amber-300">IST</span>
            <span class="rounded-full border border-violet-500/20 bg-violet-500/12 px-3 py-1 font-mono text-[11px] text-violet-700 dark:text-violet-300">AP-SOUTH-1</span>
            <span class="rounded-full border border-emerald-500/20 bg-emerald-500/12 px-3 py-1 font-mono text-[11px] text-emerald-700 dark:text-emerald-300">RLS</span>
          </div>
        </div>
      </section>
      <section class="grid gap-6 xl:grid-cols-[0.88fr,1.16fr,0.92fr]" style="margin-top:12px;">
        <div class="space-y-4">
          <div class="panel rounded-[24px] p-5" style="background:linear-gradient(180deg, rgba(43,108,176,0.12), rgba(43,108,176,0.04));">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Forum lanes</p>
            <div class="mt-4 flex rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] p-1">
              ${["Subject", "School", "National"].map((tab, i) => `<button type="button" data-action-select data-action-group="s30-desktop-lanes" data-action-active="${i === 0 ? "true" : "false"}" aria-pressed="${i === 0 ? "true" : "false"}" class="focus-ring min-h-[44px] flex-1 rounded-xl px-3 py-2 text-sm font-semibold text-[var(--ls-text-primary)]">${tab}</button>`).join("")}
            </div>
            <div class="mt-4 flex flex-wrap gap-2">
              ${["Moots", "Internships", "Evidence", "Constitution", "Drafting", "Career"].map((chip, i) => `<button type="button" data-action-select data-action-group="s30-desktop-tags" data-action-active="${i === 0 ? "true" : "false"}" aria-pressed="${i === 0 ? "true" : "false"}" class="focus-ring rounded-full border border-[var(--ls-border)] bg-[var(--ls-surface-2)] px-3 py-2 text-xs text-[var(--ls-text-primary)]">${chip}</button>`).join("")}
            </div>
          </div>
          <div class="panel rounded-[24px] p-5" style="background:linear-gradient(180deg, rgba(99,102,241,0.12), rgba(99,102,241,0.04));">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Community pulse</p>
            <div class="mt-4 grid gap-3">
              ${[
                ["Active threads", "28", "Within your tracked subjects", "linear-gradient(180deg, rgba(43,108,176,0.18), rgba(43,108,176,0.07))", "rgba(43,108,176,0.16)", "#2B6CB0", navIcon("Research", "h-4 w-4")],
                ["Tutor circles", "09", "Mentors online now", "linear-gradient(180deg, rgba(217,119,6,0.18), rgba(217,119,6,0.07))", "rgba(217,119,6,0.16)", "#D97706", navIcon("LegalGPT India", "h-4 w-4")],
                ["Reply velocity", "4.8m", "Median first response time", "linear-gradient(180deg, rgba(5,150,105,0.18), rgba(5,150,105,0.07))", "rgba(5,150,105,0.16)", "#059669", navIcon("Cases", "h-4 w-4")],
              ]
                .map(
                  ([label, value, meta, outer, inner, color, icon]) => `
                    <div class="rounded-2xl border border-[var(--ls-border)] p-4" style="background:${outer};">
                      <div class="flex items-center justify-between gap-3">
                        <div>
                          <p class="text-sm text-[var(--ls-text-primary)]">${label}</p>
                          <p class="mt-1 font-mono text-2xl text-[var(--ls-text-primary)]">${value}</p>
                          <p class="mt-2 text-xs text-[var(--ls-text-secondary)]">${meta}</p>
                        </div>
                        <span class="grid h-10 w-10 shrink-0 place-items-center rounded-xl" style="background:${inner}; color:${color};">
                          ${icon}
                        </span>
                      </div>
                    </div>
                  `,
                )
                .join("")}
            </div>
          </div>
        </div>
        <div class="panel rounded-[24px] p-5" style="background:linear-gradient(180deg, rgba(43,108,176,0.1), rgba(43,108,176,0.035));">
          <div class="flex items-center justify-between gap-4">
            <div>
              <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Forum feed</p>
              <p class="mt-1 text-sm text-[var(--ls-text-primary)]">Questions from subject rooms, school cohorts, and national boards.</p>
            </div>
            <button type="button" data-action-select data-action-active="false" aria-pressed="false" class="focus-ring min-h-[44px] rounded-xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] px-4 py-2 text-sm font-semibold text-[var(--ls-text-primary)]">Ask a Question</button>
          </div>
          <div class="mt-4 space-y-3">
            ${[
              ["Aditi S.", "NLU Delhi · 8m ago", "How are you structuring issue framing for the VIS Moot memorial this year?", "Need help balancing jurisdiction objections with merits without blowing past the page limit.", "23 replies · 4 tutors active", "linear-gradient(180deg, rgba(43,108,176,0.18), rgba(43,108,176,0.07))"],
              ["Raghav P.", "NLSIU · 21m ago", "Best cases for deemed service under Section 138 NI Act?", "I have C.C. Alavi Haji but need 2 more authorities for a short-answer round.", "17 replies · 2 tutor suggestions", "linear-gradient(180deg, rgba(99,102,241,0.18), rgba(99,102,241,0.07))"],
              ["Meera K.", "GNLU · 34m ago", "Anyone has a clean template for internship cover emails to tier-1 firms?", "Looking for a concise format that still sounds professional for litigation and corporate outreach.", "12 replies · 1 mentor note", "linear-gradient(180deg, rgba(5,150,105,0.18), rgba(5,150,105,0.07))"],
            ]
              .map(
                ([author, meta, title, copy, stats, outer]) => `
                  <article class="rounded-2xl border border-[var(--ls-border)] p-4" style="background:${outer};">
                    <div class="flex items-start justify-between gap-4">
                      <div>
                        <p class="text-sm font-semibold text-[var(--ls-text-primary)]">${author}</p>
                        <p class="mt-1 font-mono text-xs text-[var(--ls-accent-soft)]">${meta}</p>
                      </div>
                      <button type="button" data-action-select data-action-active="false" aria-pressed="false" class="focus-ring min-h-[36px] rounded-full border border-[var(--ls-border)] bg-[var(--ls-surface-2)] px-3 py-1 font-mono text-[11px] text-[var(--ls-text-secondary)]">Save</button>
                    </div>
                    <h2 class="mt-3 text-base font-semibold leading-7 text-[var(--ls-text-primary)]">${title}</h2>
                    <p class="mt-2 text-sm leading-6 text-[var(--ls-text-secondary)]">${copy}</p>
                    <div class="mt-3 flex flex-wrap gap-2">
                      <span class="rounded-full border border-[var(--ls-border)] bg-[var(--ls-surface)]/75 px-3 py-1 font-mono text-[11px] text-[var(--ls-text-secondary)]">${stats}</span>
                    </div>
                    <div class="mt-4 flex items-center gap-2">
                      <button type="button" data-action-select data-action-active="false" aria-pressed="false" class="focus-ring min-h-[40px] rounded-xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] px-4 py-2 text-sm font-semibold text-[var(--ls-text-primary)]">Open thread</button>
                      <button type="button" data-action-select data-action-active="false" aria-pressed="false" class="focus-ring min-h-[40px] rounded-xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] px-4 py-2 text-sm font-semibold text-[var(--ls-text-primary)]">Reply</button>
                      <button type="button" data-action-select data-action-active="false" aria-pressed="false" class="focus-ring min-h-[40px] rounded-xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] px-4 py-2 text-sm font-semibold text-[var(--ls-text-primary)]">Tutor match</button>
                    </div>
                  </article>
                `,
              )
              .join("")}
          </div>
        </div>
        <div class="space-y-4">
          <div class="panel rounded-[24px] p-5" style="background:linear-gradient(180deg, rgba(217,119,6,0.12), rgba(217,119,6,0.04));">
            <div class="flex items-center justify-between gap-3">
              <div>
                <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Connect with tutors</p>
                <p class="mt-1 text-sm text-[var(--ls-text-primary)]">Suggested mentors around the discussions you are following.</p>
              </div>
              <button type="button" data-action-select data-action-active="false" aria-pressed="false" class="focus-ring min-h-[36px] rounded-xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] px-3 py-2 text-[11px] font-semibold text-[var(--ls-text-primary)]">View all</button>
            </div>
            <div class="mt-4 space-y-3">
              ${[
                ["Prof. N. Rao", "Cheque dishonour · Criminal drafting", "₹900 / session"],
                ["Aarav Menon", "VIS Moot · Memorial review", "₹1,200 / session"],
                ["Ishita Verma", "Internship outreach · Cover emails", "₹750 / session"],
              ]
                .map(
                  ([name, expertise, fee]) => `
                    <div class="rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] p-4">
                      <div class="flex items-center justify-between gap-3">
                        <div>
                          <p class="text-sm font-semibold text-[var(--ls-text-primary)]">${name}</p>
                          <p class="mt-1 text-xs text-[var(--ls-text-secondary)]">${expertise}</p>
                        </div>
                        <span class="rounded-full border border-[var(--ls-border)] px-2.5 py-1 font-mono text-[10px] text-[var(--ls-text-secondary)]">${fee}</span>
                      </div>
                    </div>
                  `,
                )
                .join("")}
            </div>
          </div>
          <div class="panel rounded-[24px] p-5" style="background:linear-gradient(180deg, rgba(5,150,105,0.12), rgba(5,150,105,0.04));">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Community guidelines</p>
            <div class="mt-4 space-y-3">
              ${[
                ["No plagiarism", "Share summaries in your own words and cite authorities where relevant."],
                ["Professional tone", "Ask clear questions and avoid outcome guarantees or misleading legal claims."],
                ["Tutor disclosures", "Mentor replies should clearly distinguish guidance from final academic submission."],
              ]
                .map(
                  ([label, note]) => `
                    <div class="rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] p-4">
                      <p class="text-sm text-[var(--ls-text-primary)]">${label}</p>
                      <p class="mt-2 text-xs leading-5 text-[var(--ls-text-secondary)]">${note}</p>
                    </div>
                  `,
                )
                .join("")}
            </div>
          </div>
        </div>
      </section>
    `,
    states: {
      emptyTitle: "No community posts yet",
      emptyBody: "Switch forum lanes or follow more tags to populate your discussion feed.",
      emptyJson: '{ "threads": [], "forum": null, "tags": [] }',
      errorText: "community feed could not be loaded",
      offlineText: "Offline · Showing cached community feed from 5m ago",
    },
    accessibilityMobile: "<li>Forum tabs, topic tags, and thread actions use grouped pressed states so active filters and selected routes stay clear on touch devices.</li>",
    accessibilityDesktop: "<li>Forum lanes, feed cards, and tutor shortcuts remain in separate visual groups so discussion, mentorship, and policy information do not compete during keyboard navigation.</li>",
  },
  {
    filename: "S-31-legal-pro.html",
    title: "Legal Sathi — Notifications Screen",
    description: "Legal Pro user notification inbox for internship updates, session reminders, AI updates, community replies, and system notices.",
    mobileActive: "Settings",
    desktopActive: "Settings",
    desktopStickyStyle: "top:calc(var(--ls-desktop-card-top) - 4px); gap:10px;",
    desktopStackStyle: "row-gap:10px;",
    desktopMainStyle:
      "background-color: color-mix(in srgb, var(--ls-bg) 76%, white 24%); background-image: linear-gradient(rgba(144,164,183,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(144,164,183,0.05) 1px, transparent 1px); background-size:24px 24px;",
    mobile: `
      <section class="panel rounded-[24px] p-4 shadow-panel">
        <div class="flex items-start justify-between gap-3">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--ls-text-secondary)]">S-31 · Notifications screen</p>
            <h1 class="mt-2 text-2xl font-semibold text-[var(--ls-text-primary)]">Your alerts and updates</h1>
            <p class="mt-2 text-sm text-[var(--ls-text-secondary)]">Track internship activity, tutor-session reminders, AI updates, community replies, and system notices in one inbox.</p>
          </div>
          <span class="rounded-full border border-[var(--ls-border)] px-3 py-1 font-mono text-xs text-[var(--ls-text-secondary)]">08 UNREAD</span>
        </div>
      </section>
      <section class="grid gap-3 sm:grid-cols-3">
        ${[
          ["Unread", "08", "Needs review", "linear-gradient(180deg, rgba(43,108,176,0.18), rgba(43,108,176,0.06))", "rgba(43,108,176,0.16)", "#2B6CB0", navIcon("bell", "h-4 w-4")],
          ["Action due", "03", "Response or join now", "linear-gradient(180deg, rgba(217,119,6,0.18), rgba(217,119,6,0.06))", "rgba(217,119,6,0.16)", "#D97706", navIcon("Calendar", "h-4 w-4")],
          ["Archived", "24", "Last 30 days", "linear-gradient(180deg, rgba(99,102,241,0.18), rgba(99,102,241,0.06))", "rgba(99,102,241,0.16)", "#4F46E5", navIcon("Cases", "h-4 w-4")],
        ]
          .map(
            ([label, value, meta, outer, inner, color, icon]) => `
              <div class="panel rounded-[20px] p-4" style="background:${outer};">
                <div class="flex items-center justify-between gap-3">
                  <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">${label}</p>
                  <span class="grid h-9 w-9 shrink-0 place-items-center rounded-xl" style="background:${inner}; color:${color};">
                    ${icon}
                  </span>
                </div>
                <p class="mt-3 font-mono text-2xl text-[var(--ls-text-primary)]">${value}</p>
                <p class="mt-2 text-xs text-[var(--ls-text-secondary)]">${meta}</p>
              </div>
            `,
          )
          .join("")}
      </section>
      <section class="panel rounded-[24px] p-4" style="background:linear-gradient(180deg, rgba(43,108,176,0.12), rgba(43,108,176,0.04));">
        <div class="grid grid-cols-3 gap-2 rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] p-2">
          ${["All", "Internships", "Sessions", "AI", "Community", "System"].map((tab, i) => `<button type="button" data-action-select data-action-group="s31-mobile-cats" data-action-active="${i === 0 ? "true" : "false"}" aria-pressed="${i === 0 ? "true" : "false"}" class="focus-ring min-h-[44px] min-w-0 rounded-xl px-2 py-2 text-[11px] font-semibold text-[var(--ls-text-primary)]">${tab}</button>`).join("")}
        </div>
        <div class="mt-4 flex flex-wrap items-center gap-2">
          <button type="button" data-action-select data-action-active="false" aria-pressed="false" class="focus-ring min-h-[40px] rounded-xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] px-4 py-2 text-xs font-semibold text-[var(--ls-text-primary)]">Mark all read</button>
          <button type="button" data-action-select data-action-active="false" aria-pressed="false" class="focus-ring min-h-[40px] rounded-xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] px-4 py-2 text-xs font-semibold text-[var(--ls-text-primary)]">Archive viewed</button>
        </div>
      </section>
      <section class="space-y-3">
        ${[
          ["Internship update", "Khaitan & Co. viewed your application", "Your corporate internship application moved to shortlist review.", "6m ago", "SHORTLIST", "linear-gradient(180deg, rgba(43,108,176,0.14), rgba(43,108,176,0.05))"],
          ["Session reminder", "Tutor session starts in 30 minutes", "Prof. N. Rao · Negotiable Instruments revision slot at 18:30.", "18m ago", "JOIN SOON", "linear-gradient(180deg, rgba(217,119,6,0.14), rgba(217,119,6,0.05))"],
          ["AI update", "LegalGPT India generated a fresh digest pack", "Three new cheque-dishonour authorities added to your saved study path.", "42m ago", "AI READY", "linear-gradient(180deg, rgba(99,102,241,0.14), rgba(99,102,241,0.05))"],
          ["Community reply", "A mentor replied to your VIS Moot thread", "Aarav Menon added a structure note on jurisdiction objections.", "1h ago", "2 NEW", "linear-gradient(180deg, rgba(5,150,105,0.14), rgba(5,150,105,0.05))"],
          ["System notice", "Profile verification completed", "Your Bar Council and profile details are now fully verified for discovery flows.", "3h ago", "VERIFIED", "linear-gradient(180deg, rgba(71,85,105,0.14), rgba(71,85,105,0.05))"],
        ]
          .map(
            ([type, title, copy, time, badge, outer], index) => `
              <article class="panel rounded-[24px] p-4" style="background:${outer};">
                <div class="flex items-start justify-between gap-3">
                  <div>
                    <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">${type}</p>
                    <h2 class="mt-2 text-sm font-semibold text-[var(--ls-text-primary)]">${title}</h2>
                  </div>
                  <button type="button" data-action-select data-action-group="s31-mobile-items" data-action-active="${index === 0 ? "true" : "false"}" aria-pressed="${index === 0 ? "true" : "false"}" class="focus-ring min-h-[36px] rounded-full border border-[var(--ls-border)] bg-[var(--ls-surface-2)] px-3 py-1 font-mono text-[11px] text-[var(--ls-text-secondary)]">${badge}</button>
                </div>
                <p class="mt-3 text-sm leading-6 text-[var(--ls-text-secondary)]">${copy}</p>
                <div class="mt-3 flex items-center justify-between gap-3">
                  <span class="font-mono text-[11px] text-[var(--ls-accent-soft)]">${time}</span>
                  <div class="flex items-center gap-2">
                    <button type="button" data-action-select data-action-active="false" aria-pressed="false" class="focus-ring min-h-[36px] rounded-xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] px-3 py-2 text-[11px] font-semibold text-[var(--ls-text-primary)]">Open</button>
                    <button type="button" data-action-select data-action-active="false" aria-pressed="false" class="focus-ring min-h-[36px] rounded-xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] px-3 py-2 text-[11px] font-semibold text-[var(--ls-text-primary)]">Archive</button>
                  </div>
                </div>
              </article>
            `,
          )
          .join("")}
      </section>
    `,
    desktop: `
      <section class="panel rounded-[28px] p-6 shadow-float">
        <div class="flex items-start justify-between gap-6">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--ls-text-secondary)]">S-31 · Notifications screen</p>
            <h1 class="mt-2 text-3xl font-semibold text-[var(--ls-text-primary)]">Unified alerts and communication inbox</h1>
            <p class="mt-3 max-w-3xl text-sm leading-6 text-[var(--ls-text-secondary)]">Bring together internship updates, tutor-session reminders, AI updates, community replies, and system notices so the user can triage quickly from one surface.</p>
          </div>
          <div class="flex flex-wrap gap-2">
            <span class="inline-flex items-center gap-2 rounded-full border border-sky-500/25 bg-gradient-to-r from-sky-500/16 via-amber-400/16 to-violet-500/12 px-3 py-1.5 text-[11px] text-[var(--ls-text-primary)]">
              <span class="grid h-5 w-5 place-items-center rounded-full bg-[var(--ls-surface)]/70 text-[var(--ls-accent)]">
                ${navIcon("Calendar", "h-3.5 w-3.5")}
              </span>
              <span class="font-mono">18 Apr 2026</span>
            </span>
            <span class="rounded-full border border-amber-500/20 bg-amber-500/12 px-3 py-1 font-mono text-[11px] text-amber-700 dark:text-amber-300">IST</span>
            <span class="rounded-full border border-violet-500/20 bg-violet-500/12 px-3 py-1 font-mono text-[11px] text-violet-700 dark:text-violet-300">AP-SOUTH-1</span>
            <span class="rounded-full border border-emerald-500/20 bg-emerald-500/12 px-3 py-1 font-mono text-[11px] text-emerald-700 dark:text-emerald-300">RLS</span>
          </div>
        </div>
      </section>
      <section class="grid gap-6 xl:grid-cols-[0.88fr,1.16fr,0.92fr]" style="margin-top:12px;">
        <div class="space-y-4">
          <div class="panel rounded-[24px] p-5" style="background:linear-gradient(180deg, rgba(43,108,176,0.12), rgba(43,108,176,0.04));">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Notification filters</p>
            <div class="mt-4 flex rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] p-1">
              ${["All", "Internships", "Sessions", "AI", "Community", "System"].map((tab, i) => `<button type="button" data-action-select data-action-group="s31-desktop-cats" data-action-active="${i === 0 ? "true" : "false"}" aria-pressed="${i === 0 ? "true" : "false"}" class="focus-ring min-h-[44px] flex-1 rounded-xl px-2 py-2 text-xs font-semibold text-[var(--ls-text-primary)]">${tab}</button>`).join("")}
            </div>
            <div class="mt-4 grid gap-3">
              ${[
                ["Unread", "08", "Needs review", "linear-gradient(180deg, rgba(43,108,176,0.18), rgba(43,108,176,0.07))", "rgba(43,108,176,0.16)", "#2B6CB0", navIcon("bell", "h-4 w-4")],
                ["Action due", "03", "Join or respond today", "linear-gradient(180deg, rgba(217,119,6,0.18), rgba(217,119,6,0.07))", "rgba(217,119,6,0.16)", "#D97706", navIcon("Calendar", "h-4 w-4")],
                ["Archived", "24", "Last 30 days", "linear-gradient(180deg, rgba(99,102,241,0.18), rgba(99,102,241,0.07))", "rgba(99,102,241,0.16)", "#4F46E5", navIcon("Cases", "h-4 w-4")],
              ]
                .map(
                  ([label, value, meta, outer, inner, color, icon]) => `
                    <div class="rounded-2xl border border-[var(--ls-border)] p-4" style="background:${outer};">
                      <div class="flex items-center justify-between gap-3">
                        <div>
                          <p class="text-sm text-[var(--ls-text-primary)]">${label}</p>
                          <p class="mt-1 font-mono text-2xl text-[var(--ls-text-primary)]">${value}</p>
                          <p class="mt-2 text-xs text-[var(--ls-text-secondary)]">${meta}</p>
                        </div>
                        <span class="grid h-10 w-10 shrink-0 place-items-center rounded-xl" style="background:${inner}; color:${color};">
                          ${icon}
                        </span>
                      </div>
                    </div>
                  `,
                )
                .join("")}
            </div>
          </div>
        </div>
        <div class="panel rounded-[24px] p-5" style="background:linear-gradient(180deg, rgba(43,108,176,0.1), rgba(43,108,176,0.035));">
          <div class="flex items-center justify-between gap-4">
            <div>
              <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Inbox feed</p>
              <p class="mt-1 text-sm text-[var(--ls-text-primary)]">Newest alerts across internships, sessions, AI, community, and system activity.</p>
            </div>
            <div class="flex items-center gap-2">
              <button type="button" data-action-select data-action-active="false" aria-pressed="false" class="focus-ring min-h-[44px] rounded-xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] px-4 py-2 text-sm font-semibold text-[var(--ls-text-primary)]">Mark all read</button>
              <button type="button" data-action-select data-action-active="false" aria-pressed="false" class="focus-ring min-h-[44px] rounded-xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] px-4 py-2 text-sm font-semibold text-[var(--ls-text-primary)]">Archive viewed</button>
            </div>
          </div>
          <div class="mt-4 space-y-3">
            ${[
              ["Internship update", "Khaitan & Co. viewed your application", "Your corporate internship application moved to shortlist review.", "6m ago", "SHORTLIST", "linear-gradient(180deg, rgba(43,108,176,0.18), rgba(43,108,176,0.07))"],
              ["Session reminder", "Tutor session starts in 30 minutes", "Prof. N. Rao · Negotiable Instruments revision slot at 18:30.", "18m ago", "JOIN SOON", "linear-gradient(180deg, rgba(217,119,6,0.18), rgba(217,119,6,0.07))"],
              ["AI update", "LegalGPT India generated a fresh digest pack", "Three new cheque-dishonour authorities added to your saved study path.", "42m ago", "AI READY", "linear-gradient(180deg, rgba(99,102,241,0.18), rgba(99,102,241,0.07))"],
              ["Community reply", "A mentor replied to your VIS Moot thread", "Aarav Menon added a structure note on jurisdiction objections.", "1h ago", "2 NEW", "linear-gradient(180deg, rgba(5,150,105,0.18), rgba(5,150,105,0.07))"],
              ["System notice", "Profile verification completed", "Your Bar Council and profile details are now fully verified for discovery flows.", "3h ago", "VERIFIED", "linear-gradient(180deg, rgba(71,85,105,0.18), rgba(71,85,105,0.07))"],
            ]
              .map(
                ([type, title, copy, time, badge, outer], index) => `
                  <article class="rounded-2xl border border-[var(--ls-border)] p-4" style="background:${outer};">
                    <div class="flex items-start justify-between gap-4">
                      <div>
                        <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">${type}</p>
                        <h2 class="mt-2 text-base font-semibold text-[var(--ls-text-primary)]">${title}</h2>
                      </div>
                      <button type="button" data-action-select data-action-group="s31-desktop-items" data-action-active="${index === 0 ? "true" : "false"}" aria-pressed="${index === 0 ? "true" : "false"}" class="focus-ring min-h-[36px] rounded-full border border-[var(--ls-border)] bg-[var(--ls-surface-2)] px-3 py-1 font-mono text-[11px] text-[var(--ls-text-secondary)]">${badge}</button>
                    </div>
                    <p class="mt-3 text-sm leading-6 text-[var(--ls-text-secondary)]">${copy}</p>
                    <div class="mt-3 flex items-center justify-between gap-3">
                      <span class="font-mono text-[11px] text-[var(--ls-accent-soft)]">${time}</span>
                      <div class="flex items-center gap-2">
                        <button type="button" data-action-select data-action-active="false" aria-pressed="false" class="focus-ring min-h-[40px] rounded-xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] px-4 py-2 text-sm font-semibold text-[var(--ls-text-primary)]">Open</button>
                        <button type="button" data-action-select data-action-active="false" aria-pressed="false" class="focus-ring min-h-[40px] rounded-xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] px-4 py-2 text-sm font-semibold text-[var(--ls-text-primary)]">Archive</button>
                      </div>
                    </div>
                  </article>
                `,
              )
              .join("")}
          </div>
        </div>
        <div class="space-y-4">
          <div class="panel rounded-[24px] p-5" style="background:linear-gradient(180deg, rgba(217,119,6,0.12), rgba(217,119,6,0.04));">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Selected alert</p>
            <div class="mt-4 rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] p-4">
              <p class="text-sm font-semibold text-[var(--ls-text-primary)]">Khaitan & Co. viewed your application</p>
              <p class="mt-2 text-sm leading-6 text-[var(--ls-text-secondary)]">The internship listing team moved your profile into shortlist review. Keep your resume and writing sample ready, and expect further status movement within 24 to 48 hours.</p>
              <div class="mt-4 flex items-center gap-2">
                <button type="button" data-action-select data-action-active="false" aria-pressed="false" class="focus-ring min-h-[40px] rounded-xl border border-[var(--ls-border)] bg-[var(--ls-surface)] px-4 py-2 text-sm font-semibold text-[var(--ls-text-primary)]">Open application</button>
                <button type="button" data-action-select data-action-active="false" aria-pressed="false" class="focus-ring min-h-[40px] rounded-xl border border-[var(--ls-border)] bg-[var(--ls-surface)] px-4 py-2 text-sm font-semibold text-[var(--ls-text-primary)]">Mute similar</button>
              </div>
            </div>
          </div>
          <div class="panel rounded-[24px] p-5" style="background:linear-gradient(180deg, rgba(5,150,105,0.12), rgba(5,150,105,0.04));">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Quick routing</p>
            <div class="mt-4 space-y-3">
              ${[
                ["Internship tracker", "Open application statuses and recruiter actions."],
                ["My sessions", "Review tutor session reminders and join links."],
                ["Community thread", "Jump back into replies or mentor notes."],
              ]
                .map(
                  ([label, note]) => `
                    <div class="rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] p-4">
                      <p class="text-sm text-[var(--ls-text-primary)]">${label}</p>
                      <p class="mt-2 text-xs leading-5 text-[var(--ls-text-secondary)]">${note}</p>
                    </div>
                  `,
                )
                .join("")}
            </div>
          </div>
        </div>
      </section>
    `,
    states: {
      emptyTitle: "No notifications available",
      emptyBody: "New internship, session, AI, community, and system updates will appear here.",
      emptyJson: '{ "notifications": [], "unread": 0 }',
      errorText: "notification inbox could not be loaded",
      offlineText: "Offline · Showing cached notifications from 5m ago",
    },
    accessibilityMobile: "<li>Notification categories and selected alert states use grouped pressed controls so filter changes remain clear to touch and screen-reader users.</li>",
    accessibilityDesktop: "<li>The filter rail, inbox feed, and selected-alert panel are separated so users can triage and inspect alerts without losing context.</li>",
  },
  {
    filename: "S-32-legal-pro.html",
    title: "Legal Sathi — Settings and Support",
    description: "Legal Pro account configuration and help hub for profile controls, subscription, notifications, privacy, and support.",
    mobileActive: "Settings",
    desktopActive: "Settings",
    desktopStickyStyle: "top:calc(var(--ls-desktop-card-top) - 4px); gap:10px;",
    desktopStackStyle: "row-gap:10px;",
    desktopMainStyle:
      "background-color: color-mix(in srgb, var(--ls-bg) 76%, white 24%); background-image: linear-gradient(rgba(144,164,183,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(144,164,183,0.05) 1px, transparent 1px); background-size:24px 24px;",
    mobile: `
      <section class="panel rounded-[24px] p-4 shadow-panel">
        <div class="flex items-start justify-between gap-3">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--ls-text-secondary)]">S-32 · Settings and support</p>
            <h1 class="mt-2 text-2xl font-semibold text-[var(--ls-text-primary)]">Manage account and get help fast</h1>
            <p class="mt-2 text-sm text-[var(--ls-text-secondary)]">Control your profile, subscription, notification delivery, language, privacy requests, and support routes from one command surface.</p>
          </div>
          <span class="rounded-full border border-[var(--ls-border)] px-3 py-1 font-mono text-xs text-[var(--ls-text-secondary)]">02 OPEN</span>
        </div>
      </section>
      <section class="grid gap-3 sm:grid-cols-3">
        ${[
          ["Plan", "PRO", "Renews 30 Apr", "linear-gradient(180deg, rgba(43,108,176,0.18), rgba(43,108,176,0.06))", "rgba(43,108,176,0.16)", "#2B6CB0", navIcon("Billing", "h-4 w-4")],
          ["Support", "02", "Active tickets", "linear-gradient(180deg, rgba(217,119,6,0.18), rgba(217,119,6,0.06))", "rgba(217,119,6,0.16)", "#D97706", `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><path d="M5.5 7.5h13v8h-8l-3.5 3v-3h-1.5z"></path><path d="M8.5 11h7"></path></svg>`],
          ["Language", "EN", "Hindi available", "linear-gradient(180deg, rgba(99,102,241,0.18), rgba(99,102,241,0.06))", "rgba(99,102,241,0.16)", "#4F46E5", navIcon("Research", "h-4 w-4")],
        ]
          .map(
            ([label, value, meta, outer, inner, color, icon]) => `
              <div class="panel rounded-[20px] p-4" style="background:${outer};">
                <div class="flex items-center justify-between gap-3">
                  <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">${label}</p>
                  <span class="grid h-9 w-9 shrink-0 place-items-center rounded-xl" style="background:${inner}; color:${color};">
                    ${icon}
                  </span>
                </div>
                <p class="mt-3 font-mono text-2xl text-[var(--ls-text-primary)]">${value}</p>
                <p class="mt-2 text-xs text-[var(--ls-text-secondary)]">${meta}</p>
              </div>
            `,
          )
          .join("")}
      </section>
      <section class="panel rounded-[24px] p-4" style="background:linear-gradient(180deg, rgba(43,108,176,0.12), rgba(43,108,176,0.04));">
        <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Help and support</p>
        <div class="mt-3 grid grid-cols-2 gap-3">
          ${[
            ["Account", "rgba(43,108,176,0.16)", "#2B6CB0", navIcon("Settings", "h-4 w-4")],
            ["Subscription", "rgba(217,119,6,0.16)", "#D97706", navIcon("Billing", "h-4 w-4")],
            ["Support", "rgba(5,150,105,0.16)", "#059669", `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><path d="M5.5 7.5h13v8h-8l-3.5 3v-3h-1.5z"></path><path d="M8.5 11h7"></path></svg>`],
            ["Privacy", "rgba(99,102,241,0.16)", "#4F46E5", `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><rect x="5" y="10" width="14" height="9" rx="2"></rect><path d="M8 10V8a4 4 0 1 1 8 0v2"></path></svg>`],
          ].map(([tab, inner, color, icon], i) => `<button type="button" data-action-select data-action-group="s32-mobile-sections" data-action-active="${i === 0 ? "true" : "false"}" aria-pressed="${i === 0 ? "true" : "false"}" class="focus-ring flex min-h-[52px] min-w-0 items-center gap-3 rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] px-3 py-3 text-left text-xs font-semibold text-[var(--ls-text-primary)]"><span class="action-icon-shell grid h-10 w-10 shrink-0 place-items-center rounded-xl" style="background:${inner}; color:${color};">${icon}</span><span class="min-w-0">${tab}</span></button>`).join("")}
        </div>
      </section>
      <section class="panel rounded-[24px] p-4" style="background:linear-gradient(180deg, rgba(43,108,176,0.16), rgba(43,108,176,0.05));">
        <div class="flex items-start justify-between gap-3">
          <div class="flex min-w-0 items-start gap-3">
            <span class="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[rgba(43,108,176,0.16)] text-lg font-semibold text-[#2B6CB0]">RB</span>
            <div class="min-w-0">
              <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Account</p>
              <h2 class="mt-1 text-base font-semibold text-[var(--ls-text-primary)]">Rajeev Barnwal</h2>
              <p class="mt-1 text-xs text-[var(--ls-text-secondary)]">Independent lawyer</p>
              <p class="mt-1 text-xs text-[var(--ls-text-secondary)]">Delhi NCR</p>
            </div>
          </div>
          <button type="button" data-action-select data-action-active="false" aria-pressed="false" class="focus-ring inline-flex min-h-[36px] items-center gap-2 rounded-xl border border-sky-500/25 bg-sky-500/12 px-3 py-2 text-[11px] font-semibold text-sky-700 dark:text-sky-300">
            ${vaultActionGlyph("preview", "h-4 w-4")}
            <span>Edit</span>
          </button>
        </div>
        <div class="mt-4 space-y-3">
          ${[
            ["Email", "rajeev@legalsathi.in", "linear-gradient(180deg, rgba(99,102,241,0.18), rgba(99,102,241,0.07))", "rgba(99,102,241,0.16)", "#4F46E5", `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><path d="M4.5 7.5h15v9h-15z"></path><path d="m5.5 8.5 6.5 5 6.5-5"></path></svg>`],
            ["Mobile", "+91 98765 43210", "linear-gradient(180deg, rgba(5,150,105,0.18), rgba(5,150,105,0.07))", "rgba(5,150,105,0.16)", "#059669", `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><rect x="7.5" y="3.5" width="9" height="17" rx="2"></rect><path d="M11 17h2"></path></svg>`],
            ["Password", "Last changed 09 Apr 2026", "linear-gradient(180deg, rgba(217,119,6,0.18), rgba(217,119,6,0.07))", "rgba(217,119,6,0.16)", "#D97706", `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><rect x="5" y="10" width="14" height="9" rx="2"></rect><path d="M8 10V8a4 4 0 1 1 8 0v2"></path></svg>`],
          ]
            .map(
              ([label, value, outer, inner, color, icon]) => `
                <div class="rounded-2xl border border-[var(--ls-border)] p-3.5" style="background:${outer};">
                  <div class="flex items-center justify-between gap-3">
                    <div>
                      <p class="text-[10px] uppercase tracking-[0.14em] text-[var(--ls-text-secondary)]">${label}</p>
                      <p class="mt-1.5 text-sm text-[var(--ls-text-primary)]">${value}</p>
                    </div>
                    <span class="grid h-9 w-9 shrink-0 place-items-center rounded-xl" style="background:${inner}; color:${color};">
                      ${icon}
                    </span>
                  </div>
                </div>
              `,
            )
            .join("")}
        </div>
      </section>
      <section class="panel rounded-[24px] p-4" style="background:linear-gradient(180deg, rgba(99,102,241,0.16), rgba(99,102,241,0.05));">
        <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Notifications, language, and accessibility</p>
        <div class="mt-3 space-y-3">
          ${[
            ["Push alerts", "Instant internship and session updates.", "true", "ON", "OFF", "green", "red", "linear-gradient(180deg, rgba(43,108,176,0.18), rgba(43,108,176,0.07))", "rgba(43,108,176,0.16)", "#2B6CB0", navIcon("bell", "h-4 w-4")],
            ["Email digests", "Daily summary for invoices and exports.", "true", "ON", "OFF", "green", "red", "linear-gradient(180deg, rgba(99,102,241,0.18), rgba(99,102,241,0.07))", "rgba(99,102,241,0.16)", "#4F46E5", `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><path d="M4.5 7.5h15v9h-15z"></path><path d="m5.5 8.5 6.5 5 6.5-5"></path></svg>`],
            ["WhatsApp reminders", "Court and booking reminders when linked.", "false", "ON", "OFF", "green", "red", "linear-gradient(180deg, rgba(5,150,105,0.18), rgba(5,150,105,0.07))", "rgba(5,150,105,0.16)", "#059669", navIcon("bell", "h-4 w-4")],
          ]
            .map(
              ([label, detail, enabled, onLabel, offLabel, onTone, offTone, outer, inner, color, icon]) => `
                <div data-pref-row data-enabled="${enabled}" data-pref-on-label="${onLabel}" data-pref-off-label="${offLabel}" data-pref-on-tone="${onTone}" data-pref-off-tone="${offTone}" class="rounded-2xl border border-[var(--ls-border)] p-4" style="background:${outer};">
                  <div class="flex items-start justify-between gap-3">
                    <div class="flex min-w-0 items-start gap-3">
                      <span class="grid h-10 w-10 shrink-0 place-items-center rounded-xl" style="background:${inner}; color:${color};">
                        ${icon}
                      </span>
                      <div class="min-w-0">
                        <p class="text-sm font-semibold text-[var(--ls-text-primary)]">${label}</p>
                        <p class="mt-1 text-xs leading-5 text-[var(--ls-text-secondary)]">${detail}</p>
                      </div>
                    </div>
                    <button type="button" role="switch" aria-checked="${enabled}" data-pref-toggle data-pref-on-label="${onLabel}" data-pref-off-label="${offLabel}" data-pref-on-tone="${onTone}" data-pref-off-tone="${offTone}" class="focus-ring shrink-0 rounded-full p-1">
                      <span data-pref-track class="flex h-6 w-11 items-center rounded-full px-1">
                        <span data-pref-thumb class="h-4 w-4 rounded-full bg-white shadow-sm"></span>
                      </span>
                    </button>
                  </div>
                  <div class="mt-3 flex flex-wrap items-center justify-between gap-2">
                    <p class="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--ls-text-secondary)]">Current state</p>
                    <span data-pref-status class="rounded-full px-2.5 py-1 font-mono text-[10px]"></span>
                  </div>
                </div>
              `,
            )
            .join("")}
          <div class="grid grid-cols-2 gap-3">
            ${["English", "Hindi", "Marathi", "High contrast"].map((label, i) => `<button type="button" data-action-select data-action-group="s32-mobile-preferences" data-action-active="${i === 0 ? "true" : "false"}" aria-pressed="${i === 0 ? "true" : "false"}" class="focus-ring min-h-[44px] rounded-xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] px-3 py-3 text-sm font-semibold text-[var(--ls-text-primary)]">${label}</button>`).join("")}
          </div>
        </div>
      </section>
      <section class="grid gap-3">
        <div class="panel rounded-[24px] p-4" style="background:linear-gradient(180deg, rgba(217,119,6,0.16), rgba(217,119,6,0.05));">
          <div class="flex items-center justify-between gap-3">
            <p class="text-sm font-semibold text-[var(--ls-text-primary)]">Help and support</p>
            <span class="font-mono text-xs text-[var(--ls-text-secondary)]">P1 · 4H</span>
          </div>
          <div class="mt-3 grid gap-3">
            ${[
              ["Raise support ticket", "Route billing, booking, or account issues to the team.", "linear-gradient(180deg, rgba(43,108,176,0.18), rgba(43,108,176,0.07))", "rgba(43,108,176,0.16)", "#2B6CB0", `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><path d="M5.5 7.5h13v8h-8l-3.5 3v-3h-1.5z"></path><path d="M8.5 11h7"></path></svg>`],
              ["Browse help centre", "Payment, privacy, and integration articles.", "linear-gradient(180deg, rgba(99,102,241,0.18), rgba(99,102,241,0.07))", "rgba(99,102,241,0.16)", "#4F46E5", navIcon("Research", "h-4 w-4")],
              ["Request callback", "Get a support callback for urgent resolution.", "linear-gradient(180deg, rgba(5,150,105,0.18), rgba(5,150,105,0.07))", "rgba(5,150,105,0.16)", "#059669", `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><path d="M5 4.5h4l2 5-2.5 1.5a15 15 0 0 0 4.5 4.5L14.5 13l5 2v4a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 3 6.7 2 2 0 0 1 5 4.5Z"></path></svg>`],
            ]
              .map(
                ([label, detail, outer, inner, color, icon]) => `
                  <button type="button" data-action-select data-action-group="s32-mobile-support" data-action-active="false" aria-pressed="false" class="focus-ring flex min-h-[44px] items-center justify-between gap-3 rounded-2xl border border-[var(--ls-border)] p-4 text-left" style="background:${outer};">
                    <div>
                      <p class="text-sm font-semibold text-[var(--ls-text-primary)]">${label}</p>
                      <p class="mt-1 text-xs leading-5 text-[var(--ls-text-secondary)]">${detail}</p>
                    </div>
                    <span class="action-icon-shell grid h-10 w-10 shrink-0 place-items-center rounded-xl" style="background:${inner}; color:${color};">
                      ${icon}
                    </span>
                  </button>
                `,
              )
              .join("")}
          </div>
        </div>
        <div class="panel rounded-[24px] p-4" style="background:linear-gradient(180deg, rgba(5,150,105,0.16), rgba(5,150,105,0.05));" aria-live="polite">
          <div class="flex items-center justify-between gap-3">
            <p class="text-sm font-semibold text-[var(--ls-text-primary)]">Privacy and session</p>
            <span class="font-mono text-xs text-[var(--ls-text-secondary)]">72-HOUR SLA</span>
          </div>
          <div class="mt-3 grid gap-3">
            <button type="button" data-action-select data-action-group="s32-mobile-rights" data-action-active="true" aria-pressed="true" class="focus-ring flex min-h-[44px] items-center justify-between gap-3 rounded-xl bg-[var(--ls-accent)] px-4 py-3 text-left text-sm font-semibold text-white">
              <span>Export my data</span>
              <span class="action-icon-shell grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-white/20 bg-white/10 text-white">
                ${vaultActionGlyph("download", "h-4 w-4")}
              </span>
            </button>
            <button type="button" data-action-select data-action-group="s32-mobile-rights" data-action-active="false" aria-pressed="false" class="focus-ring flex min-h-[44px] items-center justify-between gap-3 rounded-xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] px-4 py-3 text-left text-sm font-semibold text-[var(--ls-text-primary)]">
              <span>Request account deletion</span>
              <span class="action-icon-shell grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-rose-500/20 bg-rose-500/10 text-rose-700 dark:text-rose-300">
                ${navIcon("Settings", "h-4 w-4")}
              </span>
            </button>
            <button type="button" data-action-select data-action-group="s32-mobile-rights" data-action-active="false" aria-pressed="false" class="focus-ring flex min-h-[44px] items-center justify-between gap-3 rounded-xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] px-4 py-3 text-left text-sm font-semibold text-[var(--ls-text-primary)]">
              <span>Download consent history</span>
              <span class="action-icon-shell grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">
                ${vaultActionGlyph("download", "h-4 w-4")}
              </span>
            </button>
            <button type="button" data-action-select data-action-active="false" aria-pressed="false" class="focus-ring flex min-h-[44px] items-center justify-between gap-3 rounded-xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] px-4 py-3 text-left text-sm font-semibold text-[var(--ls-text-primary)]">
              <span>Logout</span>
              <span class="action-icon-shell grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-300">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><path d="M9 20H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h3"></path><path d="M16 17l5-5-5-5"></path><path d="M21 12H9"></path></svg>
              </span>
            </button>
          </div>
        </div>
      </section>
    `,
    desktop: `
      <section class="panel rounded-[28px] p-6 shadow-float">
        <div class="flex items-start justify-between gap-6">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--ls-text-secondary)]">S-32 · Settings and support</p>
            <h1 class="mt-2 text-3xl font-semibold text-[var(--ls-text-primary)]">Account, preferences, and support command hub</h1>
            <p class="mt-3 max-w-3xl text-sm leading-6 text-[var(--ls-text-secondary)]">Bring together profile controls, subscription, notification delivery, language routing, privacy actions, and help desk shortcuts in one user-facing workspace.</p>
          </div>
          <div class="flex flex-wrap gap-2">
            <span class="inline-flex items-center gap-2 rounded-full border border-sky-500/25 bg-gradient-to-r from-sky-500/16 via-amber-400/16 to-violet-500/12 px-3 py-1.5 text-[11px] text-[var(--ls-text-primary)]">
              <span class="grid h-5 w-5 place-items-center rounded-full bg-[var(--ls-surface)]/70 text-[var(--ls-accent)]">
                ${navIcon("Calendar", "h-3.5 w-3.5")}
              </span>
              <span class="font-mono">19 Apr 2026</span>
            </span>
            <span class="rounded-full border border-amber-500/20 bg-amber-500/12 px-3 py-1 font-mono text-[11px] text-amber-700 dark:text-amber-300">IST</span>
            <span class="rounded-full border border-violet-500/20 bg-violet-500/12 px-3 py-1 font-mono text-[11px] text-violet-700 dark:text-violet-300">AP-SOUTH-1</span>
            <span class="rounded-full border border-emerald-500/20 bg-emerald-500/12 px-3 py-1 font-mono text-[11px] text-emerald-700 dark:text-emerald-300">RLS</span>
          </div>
        </div>
      </section>
      <section class="grid gap-6 xl:grid-cols-[0.9fr,1.1fr,0.92fr]" style="margin-top:12px;">
        <div class="space-y-4">
          <div class="panel rounded-[24px] p-5" style="background:linear-gradient(180deg, rgba(43,108,176,0.12), rgba(43,108,176,0.04));">
            <div class="flex items-start justify-between gap-3">
              <div class="flex min-w-0 items-start gap-3">
                <span class="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-[rgba(43,108,176,0.16)] text-lg font-semibold text-[#2B6CB0]">RB</span>
                <div class="min-w-0 flex-1">
                  <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Account</p>
                  <h2 class="mt-1 text-lg font-semibold text-[var(--ls-text-primary)]">Rajeev Barnwal</h2>
                  <p class="mt-1 text-[13px] whitespace-nowrap text-[var(--ls-text-secondary)]">Desig.: Independent lawyer</p>
                  <p class="mt-1 text-[13px] whitespace-nowrap text-[var(--ls-text-secondary)]">Location: Delhi NCR</p>
                </div>
              </div>
              <button type="button" data-action-select data-action-active="false" aria-pressed="false" class="focus-ring inline-flex min-h-[40px] items-center gap-2 whitespace-nowrap rounded-xl border border-sky-500/25 bg-sky-500/12 px-4 py-2 text-sm font-semibold text-sky-700 dark:text-sky-300">
                ${vaultActionGlyph("preview", "h-4 w-4")}
                <span>Edit</span>
              </button>
            </div>
            <div class="mt-4 space-y-3">
              ${[
                ["Email", "rajeev@legalsathi.in", "linear-gradient(180deg, rgba(99,102,241,0.18), rgba(99,102,241,0.07))", "rgba(99,102,241,0.16)", "#4F46E5", `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><path d="M4.5 7.5h15v9h-15z"></path><path d="m5.5 8.5 6.5 5 6.5-5"></path></svg>`],
                ["Mobile", "+91 98765 43210", "linear-gradient(180deg, rgba(5,150,105,0.18), rgba(5,150,105,0.07))", "rgba(5,150,105,0.16)", "#059669", `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><rect x="7.5" y="3.5" width="9" height="17" rx="2"></rect><path d="M11 17h2"></path></svg>`],
                ["Sign-in", "Google + LinkedIn linked", "linear-gradient(180deg, rgba(217,119,6,0.18), rgba(217,119,6,0.07))", "rgba(217,119,6,0.16)", "#D97706", `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><rect x="5" y="10" width="14" height="9" rx="2"></rect><path d="M8 10V8a4 4 0 1 1 8 0v2"></path></svg>`],
              ]
                .map(
                  ([label, value, outer, inner, color, icon]) => `
                    <div class="rounded-2xl border border-[var(--ls-border)] p-4" style="background:${outer};">
                      <div class="flex items-center justify-between gap-3">
                        <div>
                          <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">${label}</p>
                          <p class="mt-2 text-sm text-[var(--ls-text-primary)]">${value}</p>
                        </div>
                        <span class="grid h-9 w-9 shrink-0 place-items-center rounded-xl" style="background:${inner}; color:${color};">
                          ${icon}
                        </span>
                      </div>
                    </div>
                  `,
                )
                .join("")}
            </div>
          </div>
          <div class="panel rounded-[24px] p-5" style="background:linear-gradient(180deg, rgba(217,119,6,0.12), rgba(217,119,6,0.04));">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Subscription and app info</p>
            <div class="mt-4 space-y-3">
              ${[
                ["Plan", "Professional", "Renews 30 Apr 2026", "linear-gradient(180deg, rgba(43,108,176,0.18), rgba(43,108,176,0.07))", "rgba(43,108,176,0.16)", "#2B6CB0", navIcon("Billing", "h-4 w-4")],
                ["Usage", "LegalGPT India within monthly limit", "34 of 100 AI research prompts used", "linear-gradient(180deg, rgba(99,102,241,0.18), rgba(99,102,241,0.07))", "rgba(99,102,241,0.16)", "#4F46E5", navIcon("LegalGPT India", "h-4 w-4")],
                ["Version", "v2.0.4 · Build 418", "WCAG 2.1 AA · DPDP controls enabled", "linear-gradient(180deg, rgba(5,150,105,0.18), rgba(5,150,105,0.07))", "rgba(5,150,105,0.16)", "#059669", navIcon("Settings", "h-4 w-4")],
              ]
                .map(
                  ([label, value, meta, outer, inner, color, icon]) => `
                    <div class="rounded-2xl border border-[var(--ls-border)] p-4" style="background:${outer};">
                      <div class="flex items-center justify-between gap-3">
                        <div>
                          <p class="text-sm text-[var(--ls-text-primary)]">${label}</p>
                          <p class="mt-1 font-mono text-xs text-[var(--ls-text-secondary)]">${value}</p>
                          <p class="mt-2 text-xs text-[var(--ls-text-secondary)]">${meta}</p>
                        </div>
                        <span class="grid h-9 w-9 shrink-0 place-items-center rounded-xl" style="background:${inner}; color:${color};">
                          ${icon}
                        </span>
                      </div>
                    </div>
                  `,
                )
                .join("")}
            </div>
          </div>
        </div>
        <div class="space-y-4">
          <div class="panel rounded-[24px] p-5" style="background:linear-gradient(180deg, rgba(99,102,241,0.12), rgba(99,102,241,0.04));">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Delivery, language, and accessibility</p>
            <div class="mt-4 grid gap-4">
              ${[
                ["Push alerts", "Internships, sessions, and support replies.", "true", "ON", "OFF", "green", "red", "linear-gradient(180deg, rgba(43,108,176,0.18), rgba(43,108,176,0.07))", "rgba(43,108,176,0.16)", "#2B6CB0", navIcon("bell", "h-4 w-4")],
                ["Email digests", "Invoices, exports, and weekly summaries.", "true", "ON", "OFF", "green", "red", "linear-gradient(180deg, rgba(99,102,241,0.18), rgba(99,102,241,0.07))", "rgba(99,102,241,0.16)", "#4F46E5", `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><path d="M4.5 7.5h15v9h-15z"></path><path d="m5.5 8.5 6.5 5 6.5-5"></path></svg>`],
                ["WhatsApp reminders", "Court and booking reminders.", "false", "ON", "OFF", "green", "red", "linear-gradient(180deg, rgba(5,150,105,0.18), rgba(5,150,105,0.07))", "rgba(5,150,105,0.16)", "#059669", navIcon("bell", "h-4 w-4")],
              ]
                .map(
                  ([label, detail, enabled, onLabel, offLabel, onTone, offTone, outer, inner, color, icon]) => `
                    <div data-pref-row data-enabled="${enabled}" data-pref-on-label="${onLabel}" data-pref-off-label="${offLabel}" data-pref-on-tone="${onTone}" data-pref-off-tone="${offTone}" class="rounded-2xl border border-[var(--ls-border)] p-4" style="background:${outer};">
                      <div class="flex items-start justify-between gap-3">
                        <div class="flex min-w-0 flex-1 items-start gap-3">
                          <span class="grid h-10 w-10 shrink-0 place-items-center rounded-xl" style="background:${inner}; color:${color};">
                            ${icon}
                          </span>
                          <div class="min-w-0 flex-1">
                            <p class="text-sm font-semibold text-[var(--ls-text-primary)]">${label}</p>
                            <p class="mt-1 text-xs leading-5 text-[var(--ls-text-secondary)]">${detail}</p>
                          </div>
                        </div>
                        <button type="button" role="switch" aria-checked="${enabled}" data-pref-toggle data-pref-on-label="${onLabel}" data-pref-off-label="${offLabel}" data-pref-on-tone="${onTone}" data-pref-off-tone="${offTone}" class="focus-ring ml-2 shrink-0 rounded-full p-1">
                          <span data-pref-track class="flex h-6 w-11 items-center rounded-full px-1">
                            <span data-pref-thumb class="h-4 w-4 rounded-full bg-white shadow-sm"></span>
                          </span>
                        </button>
                      </div>
                      <div class="mt-3 flex flex-wrap items-center justify-between gap-2">
                        <p class="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--ls-text-secondary)]">Current state</p>
                        <span data-pref-status class="rounded-full px-2.5 py-1 font-mono text-[10px]"></span>
                      </div>
                    </div>
                  `,
                )
                .join("")}
            </div>
            <div class="mt-4 rounded-2xl border border-[var(--ls-border)] p-4" style="background:linear-gradient(180deg, rgba(217,119,6,0.18), rgba(217,119,6,0.07));">
              <div class="flex items-center justify-between gap-3">
                <p class="text-sm font-semibold text-[var(--ls-text-primary)]">Language and accessibility</p>
                <span class="font-mono text-[11px] text-[var(--ls-text-secondary)]">GLOBAL</span>
              </div>
              <div class="mt-3 flex flex-wrap gap-2">
                ${["English", "Hindi", "Marathi", "High contrast", "Reduced motion"].map((label, i) => `<button type="button" data-action-select data-action-group="s32-desktop-language" data-action-active="${i === 0 ? "true" : "false"}" aria-pressed="${i === 0 ? "true" : "false"}" class="focus-ring rounded-full border border-[var(--ls-border)] bg-[var(--ls-surface)]/75 px-3 py-2 text-xs font-semibold text-[var(--ls-text-primary)]">${label}</button>`).join("")}
              </div>
            </div>
          </div>
          <div class="panel rounded-[24px] p-5" style="background:linear-gradient(180deg, rgba(217,119,6,0.12), rgba(217,119,6,0.04));">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Help and support</p>
            <div class="mt-4 grid gap-3">
              ${[
                ["Raise support ticket", "Billing, booking, or profile support with SLA-backed routing.", "P1 4h / P2 24h", "linear-gradient(180deg, rgba(43,108,176,0.18), rgba(43,108,176,0.07))", "rgba(43,108,176,0.16)", "#2B6CB0", `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><path d="M5.5 7.5h13v8h-8l-3.5 3v-3h-1.5z"></path><path d="M8.5 11h7"></path></svg>`],
                ["Browse help centre", "Guides for payments, privacy, integrations, and consultations.", "42 articles", "linear-gradient(180deg, rgba(99,102,241,0.18), rgba(99,102,241,0.07))", "rgba(99,102,241,0.16)", "#4F46E5", navIcon("Research", "h-4 w-4")],
                ["Request callback", "Schedule a support callback during chamber hours.", "Today 18:00 available", "linear-gradient(180deg, rgba(5,150,105,0.18), rgba(5,150,105,0.07))", "rgba(5,150,105,0.16)", "#059669", `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><path d="M5 4.5h4l2 5-2.5 1.5a15 15 0 0 0 4.5 4.5L14.5 13l5 2v4a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 3 6.7 2 2 0 0 1 5 4.5Z"></path></svg>`],
              ]
                .map(
                  ([label, detail, meta, outer, inner, color, icon], i) => `
                    <button type="button" data-action-select data-action-group="s32-desktop-support" data-action-active="${i === 0 ? "true" : "false"}" aria-pressed="${i === 0 ? "true" : "false"}" class="focus-ring flex min-h-[44px] items-center justify-between gap-3 rounded-2xl border border-[var(--ls-border)] p-4 text-left" style="background:${outer};">
                      <div>
                        <p class="text-sm font-semibold text-[var(--ls-text-primary)]">${label}</p>
                        <p class="mt-1 text-xs leading-5 text-[var(--ls-text-secondary)]">${detail}</p>
                        <p class="mt-2 font-mono text-[11px] text-[var(--ls-text-secondary)]">${meta}</p>
                      </div>
                      <span class="action-icon-shell grid h-10 w-10 shrink-0 place-items-center rounded-xl" style="background:${inner}; color:${color};">
                        ${icon}
                      </span>
                    </button>
                  `,
                )
                .join("")}
            </div>
          </div>
        </div>
        <div class="space-y-4">
          <div class="panel rounded-[24px] p-5" style="background:linear-gradient(180deg, rgba(5,150,105,0.12), rgba(5,150,105,0.04));">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Privacy and data rights</p>
            <div class="mt-4 grid gap-3">
              <button type="button" data-action-select data-action-group="s32-desktop-rights" data-action-active="true" aria-pressed="true" class="focus-ring flex min-h-[44px] items-center justify-between gap-3 rounded-xl bg-[var(--ls-accent)] px-4 py-3 text-left text-sm font-semibold text-white">
                <span>Export my data</span>
                <span class="action-icon-shell grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-white/20 bg-white/10 text-white">
                  ${vaultActionGlyph("download", "h-4 w-4")}
                </span>
              </button>
              <button type="button" data-action-select data-action-group="s32-desktop-rights" data-action-active="false" aria-pressed="false" class="focus-ring flex min-h-[44px] items-center justify-between gap-3 rounded-xl border border-[var(--ls-border)] px-4 py-3 text-left text-sm font-semibold text-[var(--ls-text-primary)]">
                <span>Request account deletion</span>
                <span class="action-icon-shell grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-rose-500/20 bg-rose-500/10 text-rose-700 dark:text-rose-300">
                  ${navIcon("Settings", "h-4 w-4")}
                </span>
              </button>
              <button type="button" data-action-select data-action-group="s32-desktop-rights" data-action-active="false" aria-pressed="false" class="focus-ring flex min-h-[44px] items-center justify-between gap-3 rounded-xl border border-[var(--ls-border)] px-4 py-3 text-left text-sm font-semibold text-[var(--ls-text-primary)]">
                <span>Download consent history</span>
                <span class="action-icon-shell grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">
                  ${vaultActionGlyph("download", "h-4 w-4")}
                </span>
              </button>
            </div>
            <div class="mt-4 rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-bg)]/55 p-4">
              <p class="text-sm leading-6 text-[var(--ls-text-primary)]">Rights requests target a 72-hour fulfillment SLA for non-audit personal data. Immutable audit and billing records continue under platform retention rules.</p>
            </div>
          </div>
          <div class="panel rounded-[24px] p-5" style="background:linear-gradient(180deg, rgba(71,85,105,0.12), rgba(71,85,105,0.04));">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">About and session</p>
            <div class="mt-4 space-y-3">
              ${[
                ["About Legal Sathi", "Version 2.0.4 · Privacy-first legal workspace for India."],
                ["Compliance", "DPDP controls enabled · WCAG 2.1 AA surfaces available."],
                ["Support email", "support@legalsathi.in · Mon–Sat 09:00–21:00 IST"],
              ]
                .map(
                  ([label, note]) => `
                    <div class="rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] p-4">
                      <p class="text-sm text-[var(--ls-text-primary)]">${label}</p>
                      <p class="mt-2 text-xs leading-5 text-[var(--ls-text-secondary)]">${note}</p>
                    </div>
                  `,
                )
                .join("")}
              <button type="button" data-action-select data-action-active="false" aria-pressed="false" class="focus-ring flex min-h-[44px] w-full items-center justify-between gap-3 rounded-2xl border border-amber-500/20 bg-amber-500/10 px-4 py-3 text-left text-sm font-semibold text-amber-700 dark:text-amber-300">
                <span>Logout from this device</span>
                <span class="action-icon-shell grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-amber-500/20 bg-white/40 text-current dark:bg-white/5">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><path d="M9 20H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h3"></path><path d="M16 17l5-5-5-5"></path><path d="M21 12H9"></path></svg>
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>
    `,
    states: {
      emptyTitle: "No support threads open",
      emptyBody: "You're fully configured. New help tickets, plan updates, and account prompts will appear here.",
      emptyJson: '{ "tickets": [], "plan": "active", "rightsRequests": [] }',
      errorText: "settings and support workspace could not be loaded",
      offlineText: "Offline · Showing cached settings and support data from 5m ago",
    },
    accessibilityMobile: "<li>Section filters, delivery toggles, and privacy actions use grouped pressed or switch states so status remains clear on touch devices.</li>",
    accessibilityDesktop: "<li>Account, delivery, support, and privacy panels are separated into columns so users can scan configuration and help routes without losing context.</li>",
  },
  {
    filename: "S-18b-AI-legal-pro.html",
    title: "Legal Sathi — AI Resume Builder",
    description: "Legal Pro AI resume builder for internship applications.",
    mobileActive: "AI",
    desktopActive: "LegalGPT India",
    mobile: `
      <section class="panel rounded-[24px] p-4 shadow-panel">
        <div class="flex items-start justify-between gap-3">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--ls-text-secondary)]">S-18b · Internship Hub extension</p>
            <h1 class="mt-2 text-2xl font-semibold text-[var(--ls-text-primary)]">AI Resume Builder</h1>
            <p class="mt-2 text-sm text-[var(--ls-text-secondary)]">Build a recruiter-ready internship resume for corporate, litigation, or policy roles.</p>
          </div>
          <button aria-label="More actions" class="focus-ring min-h-[44px] min-w-[44px] rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] px-3 font-mono text-xs text-[var(--ls-text-secondary)]">...</button>
        </div>
        <div class="mt-4 flex items-center justify-between rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] px-4 py-3">
          <div>
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Target role</p>
            <p class="mt-1 text-sm text-[var(--ls-text-primary)]">Khaitan & Co. · Corporate Internship · Mumbai</p>
          </div>
          <span class="rounded-full bg-[var(--ls-success)]/15 px-3 py-1 font-mono text-xs text-[#9AE6B4]">JD MATCH 87%</span>
        </div>
      </section>

      <section class="grid gap-3 sm:grid-cols-3">
        <div class="panel rounded-[20px] p-4">
          <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">ATS</p>
          <p class="mt-3 font-mono text-2xl text-[var(--ls-text-primary)]">87</p>
          <div class="mt-3 kpi-spark flex h-10 items-end gap-1">
            <span style="height:28%"></span><span style="height:40%"></span><span style="height:55%"></span><span style="height:72%"></span><span style="height:90%"></span>
          </div>
        </div>
        <div class="panel rounded-[20px] p-4">
          <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Bullet rewrites</p>
          <p class="mt-3 font-mono text-2xl text-[var(--ls-text-primary)]">14</p>
          <p class="mt-2 text-xs text-[var(--ls-success)]">+6 stronger action verbs</p>
        </div>
        <div class="panel rounded-[20px] p-4">
          <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Keyword gaps</p>
          <p class="mt-3 font-mono text-2xl text-[var(--ls-text-primary)]">04</p>
          <p class="mt-2 text-xs text-[var(--ls-text-secondary)]">Due diligence, M&A research, diligence tracker, Companies Act</p>
        </div>
      </section>

      <section class="panel rounded-[24px] p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Imported profile</p>
            <p class="mt-1 text-sm text-[var(--ls-text-primary)]">NLSIU Bengaluru · B.A. LL.B. (Hons.) · Batch <span class="mono">2027</span></p>
          </div>
          <span class="rounded-full border border-[var(--ls-border)] px-3 py-1 font-mono text-xs text-[var(--ls-text-secondary)]">AUTO-SAVED <time>09:18</time></span>
        </div>
        <div class="mt-4 space-y-3">
          <div class="rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-bg)]/55 p-4">
            <div class="flex items-start justify-between gap-3">
              <div>
                <p class="text-sm font-medium text-[var(--ls-text-primary)]">Experience</p>
                <p class="mt-1 text-sm text-[var(--ls-text-secondary)]">Research Intern · AZB & Partners · <time class="mono">May 2025</time> to <time class="mono">Jul 2025</time></p>
              </div>
              <span class="rounded-full bg-[var(--ls-accent)]/12 px-3 py-1 font-mono text-xs text-[var(--ls-accent-soft)]">BOOST</span>
            </div>
            <ul class="mt-3 space-y-2 text-sm text-[var(--ls-text-secondary)]">
              <li>Drafted a diligence note on <span class="mono">Section 62</span> Companies Act and investor rights.</li>
              <li>Reviewed <span class="mono">23</span> shareholder agreements and flagged indemnity carve-outs.</li>
            </ul>
          </div>
          <div class="rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-bg)]/55 p-4" aria-live="polite">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">LegalGPT India suggestions</p>
            <div class="mt-3 space-y-3">
              <div class="rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] p-3">
                <p class="text-sm text-[var(--ls-text-primary)]">Replace “worked on agreements” with “reviewed <span class="mono">23</span> shareholder agreements and summarized indemnity risk exposure for associate review.”</p>
              </div>
              <div class="rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] p-3">
                <p class="text-sm text-[var(--ls-text-primary)]">Add moot achievement: “Ranked top <span class="mono">5</span> speaker at the NLU Delhi Arbitration Moot <span class="mono">2025</span>.”</p>
              </div>
            </div>
          </div>
          <div class="rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] p-4">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Missing recruiter terms</p>
            <div class="mt-3 flex flex-wrap gap-2">
              <span class="rounded-full border border-[var(--ls-border)] px-3 py-1 text-xs text-[var(--ls-text-secondary)]">Due diligence</span>
              <span class="rounded-full border border-[var(--ls-border)] px-3 py-1 text-xs text-[var(--ls-text-secondary)]">M&A</span>
              <span class="rounded-full border border-[var(--ls-border)] px-3 py-1 text-xs text-[var(--ls-text-secondary)]">Companies Act</span>
              <span class="rounded-full border border-[var(--ls-border)] px-3 py-1 text-xs text-[var(--ls-text-secondary)]">Transaction documents</span>
            </div>
          </div>
        </div>
        <div class="mt-4 flex gap-3">
          <button aria-label="Regenerate resume bullets" class="focus-ring min-h-[44px] flex-1 rounded-xl bg-[var(--ls-accent)] px-4 py-3 text-sm font-semibold text-white">Regenerate bullets</button>
          <button aria-label="Export resume as PDF" class="focus-ring min-h-[44px] flex-1 rounded-xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] px-4 py-3 text-sm font-semibold text-[var(--ls-text-primary)]">Export PDF</button>
        </div>
      </section>
    `,
    desktop: `
      <section class="panel rounded-[28px] p-6 shadow-float">
        <div class="flex items-start justify-between gap-6">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--ls-text-secondary)]">S-18b · AI Resume Builder</p>
            <h1 class="mt-2 text-3xl font-semibold text-[var(--ls-text-primary)]">Internship resume workstation</h1>
            <p class="mt-3 max-w-3xl text-sm leading-6 text-[var(--ls-text-secondary)]">Auto-populates from profile, internship history, moot achievements, and publication records. Drafting surfaces stay dense and recruiter-facing.</p>
          </div>
          ${commonChips}
        </div>
      </section>
      <section class="grid gap-6 xl:grid-cols-[260px,minmax(0,1.2fr),380px]">
        <div class="space-y-4">
          <div class="panel rounded-[24px] p-5">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Profile summary</p>
            <h2 class="mt-2 text-lg font-semibold text-[var(--ls-text-primary)]">Aditi Mehra</h2>
            <p class="mt-1 text-sm text-[var(--ls-text-secondary)]">NLSIU Bengaluru · B.A. LL.B. (Hons.) · Batch <span class="mono">2027</span></p>
            <div class="mt-4 space-y-3 text-sm text-[var(--ls-text-secondary)]">
              <p>Practice interest: Corporate law, PE, venture financing</p>
              <p>Moot wins: <span class="mono text-[var(--ls-text-primary)]">03</span></p>
              <p>Publications: <span class="mono text-[var(--ls-text-primary)]">02</span> notes on insolvency and data protection</p>
            </div>
          </div>
          <div class="panel rounded-[24px] p-5">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Target role</p>
            <p class="mt-2 text-sm text-[var(--ls-text-primary)]">Khaitan & Co. · Corporate Internship · Mumbai</p>
            <div class="mt-4 grid gap-3">
              <div class="rounded-2xl bg-[var(--ls-surface-2)] p-4">
                <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">JD match</p>
                <p class="mt-2 font-mono text-2xl text-[var(--ls-text-primary)]">87%</p>
              </div>
              <div class="rounded-2xl bg-[var(--ls-surface-2)] p-4">
                <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Missing terms</p>
                <p class="mt-2 text-sm text-[var(--ls-text-primary)]">M&A, due diligence, closing checklist, Companies Act</p>
              </div>
            </div>
          </div>
        </div>
        <div class="panel rounded-[24px] p-5">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Editor</p>
              <p class="mt-1 text-sm text-[var(--ls-text-primary)]">Autosave <time class="mono">09:18 IST</time></p>
            </div>
            <div class="flex gap-2">
              <button aria-label="Rewrite with LegalGPT India" class="focus-ring min-h-[44px] rounded-xl bg-[var(--ls-accent)] px-4 py-2 text-sm font-semibold text-white">Rewrite with LegalGPT India</button>
              <button aria-label="Export resume preview" class="focus-ring min-h-[44px] rounded-xl border border-[var(--ls-border)] px-4 py-2 text-sm font-semibold text-[var(--ls-text-primary)]">Export PDF</button>
            </div>
          </div>
          <div class="mt-5 space-y-4">
            <div class="rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-bg)]/55 p-4">
              <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Professional summary</p>
              <p class="mt-3 text-sm leading-6 text-[var(--ls-text-primary)]">Corporate law student with experience in transaction document review, early-stage diligence, and arbitration memorial drafting. Interested in private equity and venture financing across India-focused mandates.</p>
            </div>
            <div class="rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-bg)]/55 p-4">
              <div class="flex items-start justify-between gap-3">
                <div>
                  <p class="text-sm font-semibold text-[var(--ls-text-primary)]">Research Intern · AZB & Partners</p>
                  <p class="mt-1 text-xs text-[var(--ls-text-secondary)]"><time class="mono">May 2025</time> to <time class="mono">Jul 2025</time></p>
                </div>
                <span class="rounded-full bg-[var(--ls-accent)]/12 px-3 py-1 font-mono text-xs text-[var(--ls-accent-soft)]">IMPROVED</span>
              </div>
              <ul class="mt-3 space-y-2 text-sm text-[var(--ls-text-secondary)]">
                <li>Reviewed <span class="mono text-[var(--ls-text-primary)]">23</span> shareholder agreements and summarized indemnity risk exposure for associate review.</li>
                <li>Prepared a diligence note on <span class="mono text-[var(--ls-text-primary)]">Section 62</span> Companies Act for a proposed rights issue.</li>
              </ul>
            </div>
            <div class="rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-bg)]/55 p-4">
              <p class="text-sm font-semibold text-[var(--ls-text-primary)]">Moot & publications</p>
              <ul class="mt-3 space-y-2 text-sm text-[var(--ls-text-secondary)]">
                <li>Top <span class="mono text-[var(--ls-text-primary)]">5</span> speaker · NLU Delhi Arbitration Moot <span class="mono text-[var(--ls-text-primary)]">2025</span></li>
                <li>Published note on cross-border insolvency under the IBC in the NLS Business Law Review.</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="space-y-4">
          <div class="panel rounded-[24px] p-5" aria-live="polite">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Live preview</p>
            <div class="mt-4 rounded-2xl border border-[var(--ls-border)] bg-white p-5 text-slate-900 shadow-panel">
              <p class="text-lg font-semibold">Aditi Mehra</p>
              <p class="mt-1 font-mono text-xs">aditi.mehra@nls.ac.in · Bengaluru · +91-98XXXXXX14</p>
              <div class="mt-4 space-y-3 text-sm">
                <p><strong>Education</strong> · B.A. LL.B. (Hons.), NLSIU Bengaluru, Expected <span class="mono">2027</span></p>
                <p><strong>Experience</strong> · Research Intern, AZB & Partners</p>
                <p><strong>Achievements</strong> · NLU Delhi Arbitration Moot Top <span class="mono">5</span> speaker</p>
              </div>
            </div>
          </div>
          <div class="panel rounded-[24px] p-5">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">AI coach</p>
            <div class="mt-4 space-y-3">
              <div class="rounded-2xl bg-[var(--ls-surface-2)] p-4 text-sm text-[var(--ls-text-primary)]">Recruiters scanning for “diligence,” “term sheet,” and “closing checklist” will find better signal if those appear in the first third of the document.</div>
              <div class="rounded-2xl bg-[var(--ls-surface-2)] p-4 text-sm text-[var(--ls-text-primary)]">Shorten the summary to <span class="mono">3</span> lines if applying through a form with a visible preview pane.</div>
            </div>
          </div>
        </div>
      </section>
    `,
    states: {
      emptyTitle: "No resume draft started",
      emptyBody: "Import education, internships, and achievements to create the first version.",
      emptyJson: '{ "draftSections": [], "matchScore": 0 }',
      errorText: "resume draft could not be generated",
      offlineText: "Offline · Showing cached candidate profile from 5m ago",
    },
    accessibilityMobile: "<li>Resume suggestion cards use aria-live=\"polite\" so rewrites are announced without interrupting navigation.</li>",
    accessibilityDesktop: "<li>Editor actions expose descriptive aria-labels such as “Rewrite with LegalGPT India” and “Export resume preview”.</li>",
  },
  {
    filename: "S-27a-legal-pro.html",
    title: "Legal Sathi — Feature Gate Paywall",
    description: "Legal Pro feature gate paywall for AI research usage limits.",
    mobileActive: "AI",
    desktopActive: "Billing",
    mobileBanner: `
      <div class="sticky top-0 z-50 mb-4 rounded-xl border border-[#D97706] bg-[#FEF3C7] px-4 py-2.5" role="alert" aria-live="assertive">
        <div class="flex items-center justify-between gap-4">
          <p class="text-sm text-[#92400E]">Offline · Billing cache shown from <time class="mono">5m</time> ago</p>
          <button class="focus-ring min-h-[44px] text-sm text-[#92400E] underline">Retry</button>
        </div>
      </div>
    `,
    desktopBanner: `
      <div class="sticky top-0 z-50 border-b border-[#D97706] bg-[#FEF3C7] px-6 py-3" role="alert" aria-live="assertive">
        <div class="mx-auto flex max-w-[1440px] items-center justify-between gap-4">
          <p class="text-sm text-[#92400E]">Offline billing snapshot · subscription and entitlement data last synced <time class="mono">5m</time> ago</p>
          <button class="focus-ring min-h-[44px] text-sm text-[#92400E] underline">Retry</button>
        </div>
      </div>
    `,
    mobile: `
      <section class="panel rounded-[24px] p-4 shadow-panel">
        <p class="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--ls-text-secondary)]">S-27a · AI Research quota</p>
        <h1 class="mt-2 text-2xl font-semibold text-[var(--ls-text-primary)]">Feature gate paywall</h1>
        <p class="mt-2 text-sm text-[var(--ls-text-secondary)]">You have reached the monthly AI research limit for the Student plan.</p>
        <div class="mt-4 rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] p-4">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Research usage</p>
              <p class="mt-1 font-mono text-2xl text-[var(--ls-text-primary)]">50 / 50</p>
            </div>
            <span class="rounded-full bg-[var(--ls-error)]/15 px-3 py-1 font-mono text-xs text-[#FEB2B2]">LIMIT REACHED</span>
          </div>
          <div class="mt-4 h-3 rounded-full bg-[var(--ls-bg)]">
            <div class="h-3 w-full rounded-full bg-gradient-to-r from-[var(--ls-accent)] to-[var(--ls-error)]"></div>
          </div>
          <p class="mt-3 text-sm text-[var(--ls-text-secondary)]">Last query: “Summarize Section <span class="mono">138</span> NI Act notice requirements.”</p>
        </div>
      </section>
      <section class="space-y-3">
        ${[
          ["Student Plus", "₹699 / month", "150 research runs, saved research folders, TTS digests"],
          ["Lawyer Pro", "₹2,499 / month", "500 research runs, drafting assist, consultation analytics"],
          ["Firm Suite", "Custom", "Unlimited seats, admin controls, SLA support"],
        ]
          .map(
            ([plan, price, detail], index) => `
              <article class="panel rounded-[24px] p-4 ${index === 1 ? "ring-1 ring-[var(--ls-accent)]" : ""}">
                <div class="flex items-start justify-between gap-3">
                  <div>
                    <h2 class="text-lg font-semibold text-[var(--ls-text-primary)]">${plan}</h2>
                    <p class="mt-1 font-mono text-sm text-[var(--ls-accent-soft)]">${price}</p>
                  </div>
                  ${index === 1 ? '<span class="rounded-full bg-[var(--ls-accent)]/15 px-3 py-1 font-mono text-xs text-[var(--ls-accent-soft)]">RECOMMENDED</span>' : ""}
                </div>
                <p class="mt-3 text-sm text-[var(--ls-text-secondary)]">${detail}</p>
                <button aria-label="Choose ${plan}" class="focus-ring mt-4 min-h-[44px] w-full rounded-xl ${
                  index === 1 ? "bg-[var(--ls-accent)] text-white" : "border border-[var(--ls-border)] bg-[var(--ls-surface-2)] text-[var(--ls-text-primary)]"
                } px-4 py-3 text-sm font-semibold">${index === 1 ? "Upgrade now" : "View plan"}</button>
              </article>
            `,
          )
          .join("")}
      </section>
      <section class="panel rounded-[24px] p-4">
        <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">What unlocks immediately</p>
        <div class="mt-3 grid gap-3">
          <div class="rounded-2xl bg-[var(--ls-surface-2)] p-4">
            <p class="text-sm text-[var(--ls-text-primary)]">Unlimited citation cards for cases like <span class="mono">(2025) 3 SCC 145</span> and <span class="mono">2025 SCC OnLine Del 418</span>.</p>
          </div>
          <div class="rounded-2xl bg-[var(--ls-surface-2)] p-4">
            <p class="text-sm text-[var(--ls-text-primary)]">Long-form drafting support for memorials, notices, and written submissions.</p>
          </div>
        </div>
      </section>
    `,
    desktop: `
      <section class="panel rounded-[28px] p-6 shadow-float">
        <div class="flex items-start justify-between gap-6">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--ls-text-secondary)]">S-27a · Monetization</p>
            <h1 class="mt-2 text-3xl font-semibold text-[var(--ls-text-primary)]">AI research entitlement gate</h1>
            <p class="mt-3 max-w-3xl text-sm leading-6 text-[var(--ls-text-secondary)]">Used when a user exceeds plan limits for LegalGPT India research, deep search folders, or premium case digest actions.</p>
          </div>
          ${commonChips}
        </div>
      </section>
      <section class="grid gap-6 xl:grid-cols-[1.1fr,1.4fr]">
        <div class="space-y-4">
          <div class="panel rounded-[24px] p-5">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Current plan</p>
                <p class="mt-2 text-lg font-semibold text-[var(--ls-text-primary)]">Student Plan</p>
              </div>
              <span class="rounded-full bg-[var(--ls-error)]/15 px-3 py-1 font-mono text-xs text-[#FEB2B2]">QUOTA HIT</span>
            </div>
            <div class="mt-4 rounded-2xl bg-[var(--ls-surface-2)] p-4">
              <div class="flex items-end justify-between">
                <div>
                  <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Used this cycle</p>
                  <p class="mt-2 font-mono text-3xl text-[var(--ls-text-primary)]">50 / 50</p>
                </div>
                <p class="font-mono text-sm text-[var(--ls-text-secondary)]">Renews <time>01 May 2026</time></p>
              </div>
              <div class="mt-4 h-3 rounded-full bg-[var(--ls-bg)]">
                <div class="h-3 w-full rounded-full bg-gradient-to-r from-[var(--ls-accent)] to-[var(--ls-error)]"></div>
              </div>
              <div class="mt-4 grid gap-3 md:grid-cols-3">
                <div class="rounded-2xl border border-[var(--ls-border)] p-3">
                  <p class="text-xs text-[var(--ls-text-secondary)]">Research runs</p>
                  <p class="mt-2 font-mono text-xl text-[var(--ls-text-primary)]">50</p>
                </div>
                <div class="rounded-2xl border border-[var(--ls-border)] p-3">
                  <p class="text-xs text-[var(--ls-text-secondary)]">TTS digests</p>
                  <p class="mt-2 font-mono text-xl text-[var(--ls-text-primary)]">12</p>
                </div>
                <div class="rounded-2xl border border-[var(--ls-border)] p-3">
                  <p class="text-xs text-[var(--ls-text-secondary)]">Saved folders</p>
                  <p class="mt-2 font-mono text-xl text-[var(--ls-text-primary)]">08</p>
                </div>
              </div>
            </div>
          </div>
          <div class="panel rounded-[24px] p-5">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Why upgrade now</p>
            <div class="mt-4 space-y-3">
              <div class="rounded-2xl bg-[var(--ls-surface-2)] p-4 text-sm text-[var(--ls-text-primary)]">Continue research across Delhi High Court arbitration cases without hitting the cap mid-session.</div>
              <div class="rounded-2xl bg-[var(--ls-surface-2)] p-4 text-sm text-[var(--ls-text-primary)]">Unlock downloadable authority bundles for <span class="mono">Order XXXIX Rules 1 and 2 CPC</span> and similar recurring queries.</div>
            </div>
          </div>
        </div>
        <div class="panel rounded-[24px] p-5">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Plan matrix</p>
              <p class="mt-1 text-sm text-[var(--ls-text-primary)]">Monthly billing shown in INR</p>
            </div>
            <div class="flex rounded-xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] p-1">
              <button class="focus-ring min-h-[44px] rounded-lg bg-[var(--ls-accent)] px-4 text-sm font-semibold text-white">Monthly</button>
              <button class="focus-ring min-h-[44px] rounded-lg px-4 text-sm text-[var(--ls-text-secondary)]">Annual</button>
            </div>
          </div>
          <div class="mt-5 overflow-x-auto">
            <table class="min-w-full border-separate border-spacing-y-2 text-left text-sm">
              <thead>
                <tr class="text-[var(--ls-text-secondary)]">
                  <th class="px-4 py-3 font-medium">Plan</th>
                  <th class="px-4 py-3 font-medium">Price</th>
                  <th class="px-4 py-3 font-medium">Research runs</th>
                  <th class="px-4 py-3 font-medium">Drafting assist</th>
                  <th class="px-4 py-3 font-medium">Seat count</th>
                </tr>
              </thead>
              <tbody>
                ${[
                  ["Student Plus", "₹699", "150", "Basic", "01"],
                  ["Lawyer Pro", "₹2,499", "500", "Advanced", "01"],
                  ["Firm Suite", "Custom", "Unlimited", "Advanced", "25+"],
                ]
                  .map(
                    ([plan, price, research, drafting, seat], index) => `
                      <tr class="rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] ${index === 1 ? "ring-1 ring-[var(--ls-accent)]" : ""}">
                        <td class="rounded-l-2xl px-4 py-3 font-medium text-[var(--ls-text-primary)]">${plan}</td>
                        <td class="px-4 py-3 font-mono text-[var(--ls-accent-soft)]">${price}</td>
                        <td class="px-4 py-3 font-mono text-[var(--ls-text-primary)]">${research}</td>
                        <td class="px-4 py-3 text-[var(--ls-text-secondary)]">${drafting}</td>
                        <td class="rounded-r-2xl px-4 py-3 font-mono text-[var(--ls-text-primary)]">${seat}</td>
                      </tr>
                    `,
                  )
                  .join("")}
              </tbody>
            </table>
          </div>
          <div class="mt-5 flex flex-wrap gap-3">
            <button aria-label="Upgrade to Lawyer Pro" class="focus-ring min-h-[44px] rounded-xl bg-[var(--ls-accent)] px-5 py-3 text-sm font-semibold text-white">Upgrade to Lawyer Pro</button>
            <button aria-label="Contact sales for Firm Suite" class="focus-ring min-h-[44px] rounded-xl border border-[var(--ls-border)] px-5 py-3 text-sm font-semibold text-[var(--ls-text-primary)]">Contact sales</button>
          </div>
        </div>
      </section>
    `,
    states: {
      emptyTitle: "No plans available",
      emptyBody: "The subscription catalog is unavailable for this tenant.",
      emptyJson: '{ "plans": [], "recommendedPlan": null }',
      errorText: "subscription catalog could not be loaded",
      offlineText: "Offline · Showing cached subscription matrix from 5m ago",
    },
    accessibilityMobile: "<li>All pricing CTAs keep full-width 44px targets to remain tappable in a single-column pricing stack.</li>",
    accessibilityDesktop: "<li>The plan comparison table uses clear headers and monospace values for price, research limits, and seat counts.</li>",
  },
  {
    filename: "S-28a-legal-pro.html",
    title: "Legal Sathi — Review Dashboard",
    description: "Legal Pro spaced repetition dashboard for moot court review.",
    mobileActive: "AI",
    desktopActive: "Research",
    mobile: `
      <section class="panel rounded-[24px] p-4 shadow-panel">
        <div class="flex items-start justify-between gap-3">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--ls-text-secondary)]">S-28a · Moot Court Suite</p>
            <h1 class="mt-2 text-2xl font-semibold text-[var(--ls-text-primary)]">Review dashboard</h1>
            <p class="mt-2 text-sm text-[var(--ls-text-secondary)]">Spaced repetition for memorial arguments, authorities, rebuttals, and bench questions.</p>
          </div>
          <span class="rounded-full bg-[var(--ls-success)]/15 px-3 py-1 font-mono text-xs text-[#9AE6B4]">STREAK 18</span>
        </div>
      </section>
      <section class="grid gap-3 sm:grid-cols-3">
        <div class="panel rounded-[20px] p-4">
          <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Due today</p>
          <p class="mt-3 font-mono text-2xl text-[var(--ls-text-primary)]">17</p>
          <p class="mt-2 text-xs text-[var(--ls-text-secondary)]">Bench questions + counter-arguments</p>
        </div>
        <div class="panel rounded-[20px] p-4">
          <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Retention</p>
          <p class="mt-3 font-mono text-2xl text-[var(--ls-text-primary)]">82%</p>
          <p class="mt-2 text-xs text-[var(--ls-success)]">Up 6% this week</p>
        </div>
        <div class="panel rounded-[20px] p-4">
          <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Hard cards</p>
          <p class="mt-3 font-mono text-2xl text-[var(--ls-text-primary)]">06</p>
          <p class="mt-2 text-xs text-[var(--ls-text-secondary)]">Article 14, proportionality, maintainability</p>
        </div>
      </section>
      <section class="panel rounded-[24px] p-4">
        <div class="flex items-center justify-between">
          <p class="text-sm font-semibold text-[var(--ls-text-primary)]">Today’s review queue</p>
          <button aria-label="Start review session" class="focus-ring min-h-[44px] rounded-xl bg-[var(--ls-accent)] px-4 py-2 text-sm font-semibold text-white">Start session</button>
        </div>
        <div class="mt-4 space-y-3">
          ${[
            ["Article 14 proportionality test", "Next in 2h", "HARD"],
            ["Maintainability under Article 226", "Next in 4h", "MED"],
            ["Sharma v. State of Maharashtra facts", "Next in 1d", "EASY"],
          ]
            .map(
              ([topic, next, level]) => `
                <div class="rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] px-4 py-3">
                  <div class="flex items-center justify-between gap-3">
                    <div>
                      <p class="text-sm text-[var(--ls-text-primary)]">${topic}</p>
                      <p class="mt-1 font-mono text-xs text-[var(--ls-text-secondary)]">${next}</p>
                    </div>
                    <span class="rounded-full px-3 py-1 font-mono text-xs ${
                      level === "HARD"
                        ? "bg-[var(--ls-error)]/15 text-[#FEB2B2]"
                        : level === "MED"
                        ? "bg-[#D97706]/15 text-[#F6AD55]"
                        : "bg-[var(--ls-success)]/15 text-[#9AE6B4]"
                    }">${level}</span>
                  </div>
                </div>
              `,
            )
            .join("")}
        </div>
      </section>
      <section class="panel rounded-[24px] p-4" aria-live="polite">
        <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">LegalGPT India drill</p>
        <div class="mt-3 rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] p-4">
          <p class="text-sm text-[var(--ls-text-primary)]">“Explain why the classification in Sharma v. State of Maharashtra survives Article 14 scrutiny in under <span class="mono">60</span> seconds.”</p>
          <div class="mt-3 flex gap-3">
            <button aria-label="Practice answer aloud" class="focus-ring min-h-[44px] flex-1 rounded-xl bg-[var(--ls-accent)] px-4 py-3 text-sm font-semibold text-white">Practice aloud</button>
            <button aria-label="Get AI feedback" class="focus-ring min-h-[44px] flex-1 rounded-xl border border-[var(--ls-border)] px-4 py-3 text-sm font-semibold text-[var(--ls-text-primary)]">Get AI feedback</button>
          </div>
        </div>
      </section>
    `,
    desktop: `
      <section class="panel rounded-[28px] p-6 shadow-float">
        <div class="flex items-start justify-between gap-6">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--ls-text-secondary)]">S-28a · Review Dashboard</p>
            <h1 class="mt-2 text-3xl font-semibold text-[var(--ls-text-primary)]">Moot repetition control center</h1>
            <p class="mt-3 max-w-3xl text-sm leading-6 text-[var(--ls-text-secondary)]">Tracks recall strength, hard-card clusters, and next review windows for propositions, facts, and bench answer patterns.</p>
          </div>
          ${commonChips}
        </div>
      </section>
      <section class="grid gap-6 xl:grid-cols-[1.25fr,0.95fr]">
        <div class="space-y-4">
          <div class="grid gap-4 md:grid-cols-4">
            ${[
              ["Due today", "17"],
              ["Retention", "82%"],
              ["Average recall", "46s"],
              ["Current streak", "18d"],
            ]
              .map(
                ([label, value]) => `
                  <div class="panel rounded-[22px] p-4">
                    <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">${label}</p>
                    <p class="mt-3 font-mono text-2xl text-[var(--ls-text-primary)]">${value}</p>
                  </div>
                `,
              )
              .join("")}
          </div>
          <div class="panel rounded-[24px] p-5">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Review table</p>
                <p class="mt-1 text-sm text-[var(--ls-text-primary)]">Priority sequencing for the next study block</p>
              </div>
              <button aria-label="Start timed review set" class="focus-ring min-h-[44px] rounded-xl bg-[var(--ls-accent)] px-4 py-2 text-sm font-semibold text-white">Start timed set</button>
            </div>
            <div class="mt-4 overflow-x-auto">
              <table class="min-w-full border-separate border-spacing-y-2 text-left text-sm">
                <thead>
                  <tr class="text-[var(--ls-text-secondary)]">
                    <th class="px-4 py-2 font-medium">Prompt</th>
                    <th class="px-4 py-2 font-medium">Topic</th>
                    <th class="px-4 py-2 font-medium">Last score</th>
                    <th class="px-4 py-2 font-medium">Next review</th>
                    <th class="px-4 py-2 font-medium">Interval</th>
                  </tr>
                </thead>
                <tbody>
                  ${[
                    ["Explain proportionality in Sharma v. State of Maharashtra", "Article 14", "2/5", "Today 11:30", "2h"],
                    ["Maintainability under Article 226 against a private body", "Jurisdiction", "3/5", "Today 14:00", "4h"],
                    ["List the petitioner’s strongest rebuttal to delay", "Procedure", "4/5", "Tomorrow", "1d"],
                  ]
                    .map(
                      ([prompt, topic, score, next, interval]) => `
                        <tr class="bg-[var(--ls-surface-2)]">
                          <td class="rounded-l-2xl px-4 py-3 text-[var(--ls-text-primary)]">${prompt}</td>
                          <td class="px-4 py-3 text-[var(--ls-text-secondary)]">${topic}</td>
                          <td class="px-4 py-3 font-mono text-[var(--ls-text-primary)]">${score}</td>
                          <td class="px-4 py-3 font-mono text-[var(--ls-text-primary)]">${next}</td>
                          <td class="rounded-r-2xl px-4 py-3 font-mono text-[var(--ls-accent-soft)]">${interval}</td>
                        </tr>
                      `,
                    )
                    .join("")}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="space-y-4">
          <div class="panel rounded-[24px] p-5" aria-live="polite">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">AI coach</p>
            <div class="mt-4 space-y-3">
              <div class="rounded-2xl bg-[var(--ls-surface-2)] p-4 text-sm text-[var(--ls-text-primary)]">LegalGPT India suggests drilling maintainability and Article 14 back-to-back because your recall drops when both issues are combined in a bench question.</div>
              <div class="rounded-2xl bg-[var(--ls-surface-2)] p-4 text-sm text-[var(--ls-text-primary)]">Your speaking pace improved from <span class="mono">91</span> seconds to <span class="mono">64</span> seconds while preserving authority references.</div>
            </div>
          </div>
          <div class="panel rounded-[24px] p-5">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Deck health</p>
            <div class="mt-4 grid gap-3">
              <div class="rounded-2xl bg-[var(--ls-surface-2)] p-4">
                <p class="text-sm text-[var(--ls-text-primary)]">Facts deck</p>
                <p class="mt-2 font-mono text-xl text-[var(--ls-accent-soft)]">94%</p>
              </div>
              <div class="rounded-2xl bg-[var(--ls-surface-2)] p-4">
                <p class="text-sm text-[var(--ls-text-primary)]">Authorities deck</p>
                <p class="mt-2 font-mono text-xl text-[var(--ls-accent-soft)]">78%</p>
              </div>
              <div class="rounded-2xl bg-[var(--ls-surface-2)] p-4">
                <p class="text-sm text-[var(--ls-text-primary)]">Bench-answer deck</p>
                <p class="mt-2 font-mono text-xl text-[var(--ls-accent-soft)]">69%</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    `,
    states: {
      emptyTitle: "No review cards scheduled",
      emptyBody: "Create a moot deck or import issues from your memorial to start repetition.",
      emptyJson: '{ "due": [], "streak": 0, "retention": 0 }',
      errorText: "review schedule could not be calculated",
      offlineText: "Offline · Showing cached review queue from 5m ago",
    },
    accessibilityMobile: "<li>Review queue difficulty badges use text plus color so urgency does not depend on color perception alone.</li>",
    accessibilityDesktop: "<li>Spaced-repetition tables preserve clear header relationships for keyboard and assistive technology users.</li>",
  },
  {
    filename: "S-29a-legal-pro.html",
    title: "Legal Sathi — Audio Player State",
    description: "Legal Pro text-to-speech audio player for case digests.",
    mobileActive: "AI",
    desktopActive: "Research",
    mobileBanner: `
      <div class="sticky top-0 z-50 mb-4 rounded-xl border border-[#D97706] bg-[#FEF3C7] px-4 py-2.5" role="alert" aria-live="assertive">
        <div class="flex items-center justify-between gap-4">
          <p class="text-sm text-[#92400E]">Offline · Cached digest audio available from <time class="mono">5m</time> ago</p>
          <button class="focus-ring min-h-[44px] text-sm text-[#92400E] underline">Retry</button>
        </div>
      </div>
    `,
    desktopBanner: `
      <div class="sticky top-0 z-50 border-b border-[#D97706] bg-[#FEF3C7] px-6 py-3" role="alert" aria-live="assertive">
        <div class="mx-auto flex max-w-[1440px] items-center justify-between gap-4">
          <p class="text-sm text-[#92400E]">Offline mode active · transcript and saved digest queue are available locally</p>
          <button class="focus-ring min-h-[44px] text-sm text-[#92400E] underline">Retry</button>
        </div>
      </div>
    `,
    mobile: `
      <section class="panel rounded-[24px] p-4 shadow-panel">
        <p class="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--ls-text-secondary)]">S-29a · TTS case digest</p>
        <h1 class="mt-2 text-2xl font-semibold text-[var(--ls-text-primary)]">Audio player state</h1>
        <p class="mt-2 text-sm text-[var(--ls-text-secondary)]">Listen to case digests while commuting between courts or client meetings.</p>
      </section>
      <section class="panel rounded-[28px] p-4">
        <div class="rounded-[24px] bg-gradient-to-br from-[var(--ls-accent)]/25 via-[var(--ls-surface-2)] to-[var(--ls-bg)] p-5">
          <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Now playing</p>
          <h2 class="mt-3 text-xl font-semibold text-[var(--ls-text-primary)]">Sharma v. State of Maharashtra</h2>
          <p class="mt-2 text-sm text-[var(--ls-text-secondary)]">Anticipatory bail digest · Supreme Court · <span class="mono">(2025) 3 SCC 145</span></p>
          <div class="mt-5 wave flex h-14 items-end justify-between gap-1">
            ${new Array(36)
              .fill(0)
              .map((_, i) => `<span style="height:${20 + ((i * 11) % 70)}%"></span>`)
              .join("")}
          </div>
          <div class="mt-4 flex items-center justify-between text-sm">
            <span class="mono text-[var(--ls-text-secondary)]">08:42</span>
            <span class="mono text-[var(--ls-text-secondary)]">18:10</span>
          </div>
        </div>
        <div class="mt-4 flex items-center justify-center gap-4">
          <button aria-label="Skip backward 15 seconds" class="focus-ring min-h-[44px] min-w-[44px] rounded-full border border-[var(--ls-border)] bg-[var(--ls-surface-2)] px-3 font-mono text-xs text-[var(--ls-text-primary)]">-15</button>
          <button aria-label="Pause audio" class="focus-ring min-h-[56px] min-w-[56px] rounded-full bg-[var(--ls-accent)] text-sm font-semibold text-white">Pause</button>
          <button aria-label="Skip forward 30 seconds" class="focus-ring min-h-[44px] min-w-[44px] rounded-full border border-[var(--ls-border)] bg-[var(--ls-surface-2)] px-3 font-mono text-xs text-[var(--ls-text-primary)]">+30</button>
        </div>
        <div class="mt-4 flex flex-wrap gap-2">
          ${["0.8x", "1.0x", "1.25x", "1.5x"].map((x, i) => `<button aria-label="Playback speed ${x}" class="focus-ring min-h-[44px] rounded-full px-4 ${i === 1 ? "bg-[var(--ls-accent)] text-white" : "border border-[var(--ls-border)] bg-[var(--ls-surface-2)] text-[var(--ls-text-secondary)]"} font-mono text-xs">${x}</button>`).join("")}
        </div>
      </section>
      <section class="panel rounded-[24px] p-4" aria-live="polite">
        <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Transcript highlight</p>
        <div class="mt-3 space-y-3">
          <div class="rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] p-4">
            <p class="font-mono text-xs text-[var(--ls-accent-soft)]">08:42</p>
            <p class="mt-2 text-sm leading-6 text-[var(--ls-text-primary)]">The Court reiterated that anticipatory bail must consider the nature of accusation, role attributed to the applicant, and the need for custodial interrogation.</p>
          </div>
          <div class="rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] p-4">
            <p class="font-mono text-xs text-[var(--ls-accent-soft)]">09:13</p>
            <p class="mt-2 text-sm leading-6 text-[var(--ls-text-primary)]">The digest references <span class="mono">Section 438 CrPC</span> and compares the reasoning with Delhi High Court anticipatory bail orders from <span class="mono">2024</span>.</p>
          </div>
        </div>
      </section>
      <section class="panel rounded-[24px] p-4">
        <div class="flex items-center justify-between">
          <p class="text-sm font-semibold text-[var(--ls-text-primary)]">Up next</p>
          <span class="font-mono text-xs text-[var(--ls-text-secondary)]">QUEUE 03</span>
        </div>
        <div class="mt-3 space-y-3">
          ${[
            ["Priya Sharma v. State (Delhi High Court)", "Section 138 NI Act digest"],
            ["Nandini Rao v. Union of India", "Data protection compliance digest"],
          ]
            .map(
              ([title, meta]) => `
                <div class="rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] px-4 py-3">
                  <p class="text-sm text-[var(--ls-text-primary)]">${title}</p>
                  <p class="mt-1 text-xs text-[var(--ls-text-secondary)]">${meta}</p>
                </div>
              `,
            )
            .join("")}
        </div>
      </section>
    `,
    desktop: `
      <section class="panel rounded-[28px] p-6 shadow-float">
        <div class="flex items-start justify-between gap-6">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--ls-text-secondary)]">S-29a · Audio Player</p>
            <h1 class="mt-2 text-3xl font-semibold text-[var(--ls-text-primary)]">Digest listening workspace</h1>
            <p class="mt-3 max-w-3xl text-sm leading-6 text-[var(--ls-text-secondary)]">Built for in-transit review of case digests, TTS summaries, and authority-linked transcripts.</p>
          </div>
          ${commonChips}
        </div>
      </section>
      <section class="grid gap-6 xl:grid-cols-[1.1fr,1fr,0.9fr]">
        <div class="panel rounded-[24px] p-5">
          <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Player</p>
          <div class="mt-4 rounded-[24px] bg-gradient-to-br from-[var(--ls-accent)]/25 via-[var(--ls-surface-2)] to-[var(--ls-bg)] p-5">
            <h2 class="text-2xl font-semibold text-[var(--ls-text-primary)]">Sharma v. State of Maharashtra</h2>
            <p class="mt-2 text-sm text-[var(--ls-text-secondary)]">Anticipatory bail digest · Supreme Court · <span class="mono">(2025) 3 SCC 145</span></p>
            <div class="mt-6 wave flex h-20 items-end justify-between gap-1">
              ${new Array(44)
                .fill(0)
                .map((_, i) => `<span style="height:${18 + ((i * 9) % 76)}%"></span>`)
                .join("")}
            </div>
            <div class="mt-5 flex items-center justify-between">
              <span class="font-mono text-sm text-[var(--ls-text-secondary)]">08:42</span>
              <span class="font-mono text-sm text-[var(--ls-text-secondary)]">18:10</span>
            </div>
            <div class="mt-5 flex items-center gap-3">
              <button aria-label="Skip backward 15 seconds" class="focus-ring min-h-[44px] min-w-[44px] rounded-full border border-[var(--ls-border)] bg-[var(--ls-surface)] px-3 font-mono text-xs text-[var(--ls-text-primary)]">-15</button>
              <button aria-label="Pause audio" class="focus-ring min-h-[52px] min-w-[52px] rounded-full bg-[var(--ls-accent)] text-sm font-semibold text-white">Pause</button>
              <button aria-label="Skip forward 30 seconds" class="focus-ring min-h-[44px] min-w-[44px] rounded-full border border-[var(--ls-border)] bg-[var(--ls-surface)] px-3 font-mono text-xs text-[var(--ls-text-primary)]">+30</button>
              <div class="ml-auto flex gap-2">
                ${["1.0x", "1.25x", "1.5x"].map((x, i) => `<button aria-label="Playback speed ${x}" class="focus-ring min-h-[44px] rounded-full px-4 ${i === 1 ? "bg-[var(--ls-accent)] text-white" : "border border-[var(--ls-border)] bg-[var(--ls-surface)] text-[var(--ls-text-secondary)]"} font-mono text-xs">${x}</button>`).join("")}
              </div>
            </div>
          </div>
        </div>
        <div class="panel rounded-[24px] p-5" aria-live="polite">
          <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Transcript and citations</p>
          <div class="mt-4 space-y-3">
            <div class="rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] p-4">
              <p class="font-mono text-xs text-[var(--ls-accent-soft)]">08:42</p>
              <p class="mt-2 text-sm leading-6 text-[var(--ls-text-primary)]">The Court balanced liberty against investigative necessity, emphasizing that the accusation alone cannot justify denial where cooperation is demonstrated.</p>
            </div>
            <div class="rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] p-4">
              <p class="font-mono text-xs text-[var(--ls-accent-soft)]">09:13</p>
              <p class="mt-2 text-sm leading-6 text-[var(--ls-text-primary)]">Reference anchors: <span class="mono">Section 438 CrPC</span>, <span class="mono">Siddharam Satlingappa Mhetre</span>, and Delhi High Court comparison notes from <span class="mono">2024</span>.</p>
            </div>
            <div class="rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] p-4">
              <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Quick actions</p>
              <div class="mt-3 flex flex-wrap gap-2">
                <button class="focus-ring min-h-[44px] rounded-xl bg-[var(--ls-accent)] px-4 py-2 text-sm font-semibold text-white">Save note</button>
                <button class="focus-ring min-h-[44px] rounded-xl border border-[var(--ls-border)] px-4 py-2 text-sm font-semibold text-[var(--ls-text-primary)]">Copy citation</button>
                <button class="focus-ring min-h-[44px] rounded-xl border border-[var(--ls-border)] px-4 py-2 text-sm font-semibold text-[var(--ls-text-primary)]">Send to matter</button>
              </div>
            </div>
          </div>
        </div>
        <div class="space-y-4">
          <div class="panel rounded-[24px] p-5">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Queue</p>
            <div class="mt-4 space-y-3">
              ${[
                ["Priya Sharma v. State", "Section 138 NI Act digest", "12:04"],
                ["Nandini Rao v. Union of India", "DPDP compliance digest", "15:22"],
                ["M/s Apex Builders v. RERA", "Consumer appeal digest", "11:18"],
              ]
                .map(
                  ([title, meta, duration]) => `
                    <div class="rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] px-4 py-3">
                      <p class="text-sm text-[var(--ls-text-primary)]">${title}</p>
                      <div class="mt-1 flex items-center justify-between gap-3">
                        <p class="text-xs text-[var(--ls-text-secondary)]">${meta}</p>
                        <span class="font-mono text-xs text-[var(--ls-text-secondary)]">${duration}</span>
                      </div>
                    </div>
                  `,
                )
                .join("")}
            </div>
          </div>
          <div class="panel rounded-[24px] p-5">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Saved offline</p>
            <p class="mt-3 font-mono text-2xl text-[var(--ls-text-primary)]">09</p>
            <p class="mt-2 text-sm text-[var(--ls-text-secondary)]">Digests remain accessible during travel between Delhi High Court and Patiala House.</p>
          </div>
        </div>
      </section>
    `,
    states: {
      emptyTitle: "No audio digest queued",
      emptyBody: "Save a case digest or create a TTS summary to begin listening.",
      emptyJson: '{ "queue": [], "currentTrack": null }',
      errorText: "audio stream could not be initialized",
      offlineText: "Offline · Showing cached audio queue from 5m ago",
    },
    accessibilityMobile: "<li>Playback controls are grouped with distinct aria-labels for speed changes and skip intervals.</li>",
    accessibilityDesktop: "<li>Transcript updates use aria-live=\"polite\" so new highlighted text is announced without interrupting playback controls.</li>",
  },
  {
    filename: "S-04-legal-pro.html",
    title: "Legal Sathi — Morning Brief",
    description: "Legal Pro dense home dashboard for lawyers and firms.",
    mobileActive: "Home",
    desktopActive: "Home",
    mobile: `
      <section class="panel rounded-[24px] p-4 shadow-panel">
        <div class="flex items-start justify-between gap-3">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--ls-text-secondary)]">S-04 · Lawyer/Firm dashboard</p>
            <h1 class="mt-2 text-2xl font-semibold text-[var(--ls-text-primary)]">Morning brief</h1>
            <p class="mt-2 text-sm text-[var(--ls-text-secondary)]">Friday docket across Delhi High Court, NCLT Mumbai, and client consultations.</p>
          </div>
          <span class="rounded-full border border-[var(--ls-border)] px-3 py-1 font-mono text-xs text-[var(--ls-text-secondary)]"><time>18 Apr 2026</time></span>
        </div>
      </section>
      <section class="grid gap-3 sm:grid-cols-3">
        ${[
          ["Hearings", "05", "2 urgent"],
          ["Pending filings", "03", "1 due by 12:30"],
          ["Collections", "₹1,58,000", "2 invoices pending"],
        ]
          .map(
            ([label, value, meta]) => `
              <div class="panel rounded-[20px] p-4">
                <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">${label}</p>
                <p class="mt-3 font-mono text-2xl text-[var(--ls-text-primary)]">${value}</p>
                <p class="mt-2 text-xs text-[var(--ls-text-secondary)]">${meta}</p>
              </div>
            `,
          )
          .join("")}
      </section>
      <section class="panel rounded-[24px] p-4">
        <div class="flex items-center justify-between gap-3">
          <p class="text-sm font-semibold text-[var(--ls-text-primary)]">Today’s hearings</p>
          <button aria-label="View full hearing calendar" class="focus-ring min-h-[44px] rounded-xl border border-[var(--ls-border)] px-4 py-2 text-sm text-[var(--ls-text-secondary)]">Open calendar</button>
        </div>
        <div class="mt-4 overflow-hidden rounded-2xl border border-[var(--ls-border)]">
          <div class="grid grid-cols-[72px,minmax(0,1fr),72px] bg-[var(--ls-surface-2)] px-4 py-3 text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">
            <span>Time</span><span>Matter</span><span>Status</span>
          </div>
          ${[
            ["10:30", "Sharma v. State of Maharashtra · Court 32", "Next"],
            ["12:00", "Apex Builders v. RERA · NCDRC VC", "Prep"],
            ["15:15", "Rao Exports arbitration · Client call", "Booked"],
          ]
            .map(
              ([time, matter, status]) => `
                <div class="grid min-h-[40px] grid-cols-[72px,minmax(0,1fr),72px] items-center border-t border-[var(--ls-border)] px-4 py-3 text-sm">
                  <span class="font-mono text-[var(--ls-accent-soft)]">${time}</span>
                  <span class="text-[var(--ls-text-primary)]">${matter}</span>
                  <span class="font-mono text-xs text-[var(--ls-text-secondary)]">${status}</span>
                </div>
              `,
            )
            .join("")}
        </div>
      </section>
      <section class="panel rounded-[24px] p-4" aria-live="polite">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">LegalGPT India prep</p>
            <p class="mt-1 text-sm text-[var(--ls-text-primary)]">Your first matter starts in <span class="mono">42m</span></p>
          </div>
          <span class="rounded-full bg-[var(--ls-accent)]/15 px-3 py-1 font-mono text-xs text-[var(--ls-accent-soft)]">READY</span>
        </div>
        <div class="mt-3 rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] p-4">
          <p class="text-sm text-[var(--ls-text-primary)]">“Summarize the latest anticipatory bail reasoning in Sharma v. State of Maharashtra and list <span class="mono">3</span> likely bench questions.”</p>
          <div class="mt-3 flex items-center gap-3">
            <button aria-label="Open AI prep brief" class="focus-ring min-h-[44px] flex-1 rounded-xl bg-[var(--ls-accent)] px-4 py-3 text-sm font-semibold text-white">Open prep brief</button>
            ${audioTransportButton("play", "Listen digest", "h-11 w-11 rounded-xl", "h-4 w-4")}
          </div>
        </div>
      </section>
      <section class="panel rounded-[24px] p-4">
        <div class="flex items-center justify-between">
          <p class="text-sm font-semibold text-[var(--ls-text-primary)]">Urgent operations</p>
          <span class="font-mono text-xs text-[var(--ls-text-secondary)]">P0 02</span>
        </div>
        <div class="mt-3 space-y-3">
          <div class="rounded-2xl border border-[var(--ls-error)]/40 bg-[var(--ls-error)]/10 p-4">
            <p class="text-sm text-[#FEB2B2]">File vakalatnama in Priya Sharma matter before <time class="mono">12:30</time>.</p>
          </div>
          <div class="rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] p-4">
            <p class="text-sm text-[var(--ls-text-primary)]">Collect consultation fee of <span class="mono">₹1,500</span> from Meera Kulkarni after <time class="mono">17:00</time> video consult.</p>
          </div>
        </div>
      </section>
    `,
    desktop: `
      <section class="panel rounded-[28px] p-6 shadow-float">
        <div class="flex items-start justify-between gap-6">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--ls-text-secondary)]">S-04 · Home / Morning Brief</p>
            <h1 class="mt-2 text-3xl font-semibold text-[var(--ls-text-primary)]">Daily command center</h1>
            <p class="mt-3 max-w-3xl text-sm leading-6 text-[var(--ls-text-secondary)]">Legal Pro compresses hearings, filings, cash flow, and AI prep into a dense morning dashboard for lawyers and firm partners.</p>
          </div>
          ${commonChips}
        </div>
      </section>
      <section class="grid gap-4 md:grid-cols-3 xl:grid-cols-4">
        ${[
          ["Hearings", "05", "Delhi High Court + NCLT"],
          ["Tasks due", "09", "3 due before lunch"],
          ["Collections", "₹1,58,000", "Receivables this week"],
          ["Court alerts", "04", "2 benches running early"],
        ]
          .map(
            ([label, value, meta]) => `
              <div class="panel rounded-[22px] p-4">
                <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">${label}</p>
                <p class="mt-3 font-mono text-2xl text-[var(--ls-text-primary)]">${value}</p>
                <div class="mt-3 kpi-spark flex h-10 items-end gap-1">
                  <span style="height:26%"></span><span style="height:38%"></span><span style="height:51%"></span><span style="height:70%"></span><span style="height:88%"></span>
                </div>
                <p class="mt-2 text-xs text-[var(--ls-text-secondary)]">${meta}</p>
              </div>
            `,
          )
          .join("")}
      </section>
      <section class="grid gap-6 xl:grid-cols-[0.95fr,1.2fr,0.95fr]">
        <div class="space-y-4">
          <div class="panel rounded-[24px] p-5">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Calendar</p>
                <p class="mt-1 text-sm text-[var(--ls-text-primary)]"><time>18 Apr 2026</time> · Friday</p>
              </div>
              <button aria-label="Switch calendar view" class="focus-ring min-h-[44px] rounded-xl border border-[var(--ls-border)] px-4 py-2 text-sm text-[var(--ls-text-secondary)]">Week</button>
            </div>
            <div class="mt-4 space-y-3">
              ${[
                ["10:30", "Court 32", "Sharma v. State of Maharashtra"],
                ["12:00", "NCDRC VC", "Apex Builders v. RERA"],
                ["17:00", "Video", "Meera Kulkarni consult"],
              ]
                .map(
                  ([time, venue, item]) => `
                    <div class="rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] px-4 py-3">
                      <div class="flex items-center justify-between gap-3">
                        <span class="font-mono text-sm text-[var(--ls-accent-soft)]">${time}</span>
                        <span class="text-xs text-[var(--ls-text-secondary)]">${venue}</span>
                      </div>
                      <p class="mt-2 text-sm text-[var(--ls-text-primary)]">${item}</p>
                    </div>
                  `,
                )
                .join("")}
            </div>
          </div>
          <div class="panel rounded-[24px] p-5">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Urgent tasks</p>
            <div class="mt-4 space-y-3">
              <div class="rounded-2xl border border-[var(--ls-error)]/40 bg-[var(--ls-error)]/10 p-4 text-sm text-[#FEB2B2]">File vakalatnama in Priya Sharma matter before <time class="mono">12:30</time>.</div>
              <div class="rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] p-4 text-sm text-[var(--ls-text-primary)]">Review retainer invoice draft for Rao Exports before dispatch.</div>
            </div>
          </div>
        </div>
        <div class="panel rounded-[24px] p-5">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Active matters</p>
              <p class="mt-1 text-sm text-[var(--ls-text-primary)]">Dense matter table with quick actions</p>
            </div>
            <button aria-label="Create new case" class="focus-ring min-h-[44px] rounded-xl bg-[var(--ls-accent)] px-4 py-2 text-sm font-semibold text-white">New case</button>
          </div>
          <div class="mt-4 overflow-x-auto">
            <table class="min-w-full border-separate border-spacing-y-2 text-left text-sm">
              <thead>
                <tr class="text-[var(--ls-text-secondary)]">
                  <th class="px-4 py-2 font-medium">Matter</th>
                  <th class="px-4 py-2 font-medium">Court</th>
                  <th class="px-4 py-2 font-medium">Next date</th>
                  <th class="px-4 py-2 font-medium">Fee status</th>
                </tr>
              </thead>
              <tbody>
                ${[
                  ["Sharma v. State of Maharashtra", "Delhi HC", "18 Apr 2026", "Paid"],
                  ["Apex Builders v. RERA", "NCDRC", "18 Apr 2026", "Pending"],
                  ["Rao Exports arbitration", "SIAC", "21 Apr 2026", "Retainer"],
                ]
                  .map(
                    ([matter, court, next, fee]) => `
                      <tr class="bg-[var(--ls-surface-2)]">
                        <td class="rounded-l-2xl px-4 py-3 text-[var(--ls-text-primary)]">${matter}</td>
                        <td class="px-4 py-3 text-[var(--ls-text-secondary)]">${court}</td>
                        <td class="px-4 py-3 font-mono text-[var(--ls-text-primary)]">${next}</td>
                        <td class="rounded-r-2xl px-4 py-3 font-mono text-[var(--ls-accent-soft)]">${fee}</td>
                      </tr>
                    `,
                  )
                  .join("")}
              </tbody>
            </table>
          </div>
        </div>
        <div class="space-y-4">
          <div class="panel rounded-[24px] p-5" aria-live="polite">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">LegalGPT India</p>
                <p class="mt-1 text-sm text-[var(--ls-text-primary)]">Case prep and day plan</p>
              </div>
              <span class="rounded-full bg-[var(--ls-accent)]/15 px-3 py-1 font-mono text-xs text-[var(--ls-accent-soft)]">READY</span>
            </div>
            <div class="mt-4 rounded-2xl bg-[var(--ls-surface-2)] p-4">
              <p class="text-sm text-[var(--ls-text-primary)]">Generated prep note for Sharma v. State of Maharashtra with <span class="mono">3</span> probable bench questions and a <span class="mono">90</span>-second oral answer outline.</p>
              <div class="mt-3 flex items-center gap-3">
                <button class="focus-ring min-h-[44px] flex-1 rounded-xl bg-[var(--ls-accent)] px-4 py-2 text-sm font-semibold text-white">Open brief</button>
                ${audioTransportButton("play", "Listen digest", "h-11 w-11 rounded-xl", "h-4 w-4")}
              </div>
            </div>
          </div>
          <div class="panel rounded-[24px] p-5">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Court alerts</p>
            <div class="mt-4 space-y-3">
              <div class="rounded-2xl border border-[var(--ls-error)]/40 bg-[var(--ls-error)]/10 p-4 text-sm text-[#FEB2B2]">Court <span class="mono">32</span> is running <span class="mono">18m</span> ahead of the listed cause list.</div>
              <div class="rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] p-4 text-sm text-[var(--ls-text-primary)]">NCLT Mumbai order upload detected for Apex Builders at <time class="mono">08:57</time>.</div>
            </div>
          </div>
        </div>
      </section>
    `,
    states: {
      emptyTitle: "No matters scheduled",
      emptyBody: "Add hearings, consultations, or tasks to populate the morning brief.",
      emptyJson: '{ "hearings": [], "tasks": [], "receivables": 0 }',
      errorText: "morning brief data could not be assembled",
      offlineText: "Offline · Showing cached morning brief from 5m ago",
    },
    accessibilityMobile: "<li>Dense hearing rows keep 40px data rhythm while preserving 44px action buttons in surrounding controls.</li>",
    accessibilityDesktop: "<li>Calendar, table, and AI panels are separated into clear columns to preserve scan order for keyboard users.</li>",
  },
  {
    filename: "S-07-legal-pro.html",
    title: "Legal Sathi — AI Legal Assistant",
    description: "Legal Pro AI assistant with dense chat and authority patterns.",
    mobileActive: "AI",
    desktopActive: "LegalGPT India",
    mobile: `
      <section class="panel rounded-[24px] p-4 shadow-panel">
        <div class="flex items-start justify-between gap-3">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--ls-text-secondary)]">S-07 · LegalGPT India</p>
            <h1 class="mt-2 text-2xl font-semibold text-[var(--ls-text-primary)]">AI legal assistant</h1>
            <p class="mt-2 text-sm text-[var(--ls-text-secondary)]">Citation-bound analysis for case research, drafting, and issue framing. Not legal advice.</p>
          </div>
          <span class="rounded-full bg-[var(--ls-success)]/15 px-3 py-1 font-mono text-xs text-[#9AE6B4]">CONF 0.87</span>
        </div>
        <div class="mt-4 flex flex-wrap gap-2">
          ${["Delhi HC", "Hindi", "Simple mode", "Matter-linked"].map((x) => `<button aria-label="${x}" class="focus-ring min-h-[44px] rounded-full border border-[var(--ls-border)] bg-[var(--ls-surface-2)] px-4 text-sm text-[var(--ls-text-secondary)]">${x}</button>`).join("")}
        </div>
      </section>
      <section class="panel rounded-[24px] p-4">
        <div class="rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] p-4">
          <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Query</p>
          <p class="mt-2 text-sm text-[var(--ls-text-primary)]">Summarize the injunction test under <span class="mono">Order XXXIX Rules 1 and 2 CPC</span> and identify <span class="mono">3</span> Delhi High Court authorities for a startup shareholder dispute.</p>
        </div>
        <div class="mt-4 space-y-4" aria-live="polite">
          <div class="ml-10 rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-bg)]/50 p-4">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Assistant summary</p>
            <p class="mt-3 text-sm leading-6 text-[var(--ls-text-primary)]">The Court typically examines prima facie case, balance of convenience, and irreparable harm. In shareholder disputes, Delhi High Court orders often give weight to board-control prejudice and dilution risk if interim protection is denied.</p>
          </div>
          <div class="rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] p-4">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Authorities</p>
            <div class="mt-3 space-y-3">
              ${[
                ["2025 SCC OnLine Del 418", "Board-control injunction in a promoter dispute"],
                ["(2024) 9 SCC 221", "Supreme Court articulation of interim relief standards"],
                ["2023 SCC OnLine Del 991", "Share dilution and irreparable harm reasoning"],
              ]
                .map(
                  ([cite, note]) => `
                    <div class="rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-bg)]/55 p-3">
                      <p class="font-mono text-xs text-[var(--ls-accent-soft)]">${cite}</p>
                      <p class="mt-1 text-sm text-[var(--ls-text-primary)]">${note}</p>
                    </div>
                  `,
                )
                .join("")}
            </div>
          </div>
          <div class="rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-bg)]/55 p-4">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Suggested next prompts</p>
            <div class="mt-3 flex flex-wrap gap-2">
              ${[
                "Draft a short injunction note",
                "Explain in simple Hindi",
                "List contrary authorities",
              ]
                .map((x) => `<button aria-label="${x}" class="focus-ring min-h-[44px] rounded-xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] px-4 py-2 text-sm text-[var(--ls-text-primary)]">${x}</button>`)
                .join("")}
            </div>
          </div>
        </div>
      </section>
      <section class="panel rounded-[24px] p-4">
        <div class="flex items-center justify-between">
          <p class="text-sm font-semibold text-[var(--ls-text-primary)]">Compose next query</p>
          <div class="flex items-center gap-2">
            ${controlIconButton("send", "Send prompt to LegalGPT India", "accent", "h-11 w-11 rounded-xl", "h-4 w-4")}
            ${controlIconButton("mic", "Voice input", "rose", "h-11 w-11 rounded-xl", "h-4 w-4")}
          </div>
        </div>
        <div class="mt-3 rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] p-4">
          <p class="text-sm text-[var(--ls-text-secondary)]">Ask for authorities, drafting help, plain-language explanations, or bilingual summaries.</p>
        </div>
      </section>
    `,
    desktop: `
      <section class="panel rounded-[28px] p-6 shadow-float">
        <div class="flex items-start justify-between gap-6">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--ls-text-secondary)]">S-07 · AI Legal Assistant</p>
            <h1 class="mt-2 text-3xl font-semibold text-[var(--ls-text-primary)]">Dense chat and authority workspace</h1>
            <p class="mt-3 max-w-3xl text-sm leading-6 text-[var(--ls-text-secondary)]">Legal Pro surfaces conversation, authorities, and matter context side-by-side while keeping citation density high.</p>
          </div>
          ${commonChips}
        </div>
      </section>
      <section class="grid gap-6 xl:grid-cols-[0.8fr,1.25fr,0.9fr]">
        <div class="space-y-4">
          <div class="panel rounded-[24px] p-5">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Session controls</p>
            <div class="mt-4 space-y-3">
              <div class="rounded-2xl bg-[var(--ls-surface-2)] p-4">
                <p class="text-sm text-[var(--ls-text-primary)]">Jurisdiction</p>
                <p class="mt-2 font-mono text-sm text-[var(--ls-accent-soft)]">Delhi HC + Supreme Court</p>
              </div>
              <div class="rounded-2xl bg-[var(--ls-surface-2)] p-4">
                <p class="text-sm text-[var(--ls-text-primary)]">Matter context</p>
                <p class="mt-2 text-sm text-[var(--ls-text-secondary)]">Rao Exports shareholder dispute</p>
              </div>
              <div class="rounded-2xl bg-[var(--ls-surface-2)] p-4">
                <p class="text-sm text-[var(--ls-text-primary)]">Confidence threshold</p>
                <p class="mt-2 font-mono text-sm text-[var(--ls-accent-soft)]">0.82</p>
              </div>
            </div>
          </div>
          <div class="panel rounded-[24px] p-5">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Saved prompts</p>
            <div class="mt-4 space-y-3">
              ${[
                "Prepare a short interim-injunction note",
                "Explain a citation in plain Hindi",
                "List contrary authorities with bench composition",
              ]
                .map(
                  (item) => `<button aria-label="${item}" class="focus-ring flex min-h-[44px] w-full items-center rounded-xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] px-4 text-left text-sm text-[var(--ls-text-primary)]">${item}</button>`,
                )
                .join("")}
            </div>
          </div>
        </div>
        <div class="panel rounded-[24px] p-5" aria-live="polite">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Conversation</p>
              <p class="mt-1 text-sm text-[var(--ls-text-primary)]">Linked to Rao Exports matter</p>
            </div>
            <span class="rounded-full bg-[var(--ls-success)]/15 px-3 py-1 font-mono text-xs text-[#9AE6B4]">CONF 0.87</span>
          </div>
          <div class="mt-4 space-y-4">
            <div class="rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-bg)]/55 p-4">
              <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">User query</p>
              <p class="mt-2 text-sm leading-6 text-[var(--ls-text-primary)]">Summarize the injunction test under <span class="mono">Order XXXIX Rules 1 and 2 CPC</span> and identify Delhi High Court authorities for a shareholder dilution dispute.</p>
            </div>
            <div class="rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] p-4">
              <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Assistant response</p>
              <p class="mt-3 text-sm leading-7 text-[var(--ls-text-primary)]">The injunction test remains structured around prima facie case, balance of convenience, and irreparable harm. In shareholder disputes, interim relief analysis often emphasizes dilution risk, loss of governance rights, and whether damages can later repair the loss of control.</p>
              <div class="mt-4 flex flex-wrap gap-2">
                ${[
                  "Explain in simple terms",
                  "Draft issue list",
                  "Generate hearing note",
                ]
                  .map((x) => `<button aria-label="${x}" class="focus-ring min-h-[44px] rounded-xl border border-[var(--ls-border)] bg-[var(--ls-bg)]/40 px-4 py-2 text-sm text-[var(--ls-text-primary)]">${x}</button>`)
                  .join("")}
              </div>
            </div>
            <div class="rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-bg)]/55 p-4">
              <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Composer</p>
              <div class="mt-3 rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] p-4 text-sm text-[var(--ls-text-secondary)]">Ask about authorities, fact extraction, timeline preparation, or bilingual explanations.</div>
              <div class="mt-3 flex items-center gap-3">
                ${controlIconButton("send", "Send prompt", "accent", "h-11 w-11 rounded-xl", "h-4 w-4")}
                ${controlIconButton("mic", "Voice input", "rose", "h-11 w-11 rounded-xl", "h-4 w-4")}
              </div>
            </div>
          </div>
        </div>
        <div class="space-y-4">
          <div class="panel rounded-[24px] p-5">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Authority rail</p>
            <div class="mt-4 space-y-3">
              ${[
                ["2025 SCC OnLine Del 418", "Interim board-control restraint"],
                ["(2024) 9 SCC 221", "Interim-relief principle synthesis"],
                ["2023 SCC OnLine Del 991", "Share dilution and irreparable harm"],
              ]
                .map(
                  ([cite, note]) => `
                    <div class="rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] p-4">
                      <p class="font-mono text-xs text-[var(--ls-accent-soft)]">${cite}</p>
                      <p class="mt-2 text-sm text-[var(--ls-text-primary)]">${note}</p>
                    </div>
                  `,
                )
                .join("")}
            </div>
          </div>
          <div class="panel rounded-[24px] p-5">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Matter insights</p>
            <div class="mt-4 space-y-3">
              <div class="rounded-2xl bg-[var(--ls-surface-2)] p-4 text-sm text-[var(--ls-text-primary)]">Likely hearing objective: preserve board composition until the challenged allotment is reviewed.</div>
              <div class="rounded-2xl bg-[var(--ls-surface-2)] p-4 text-sm text-[var(--ls-text-primary)]">Risk note: watch for delay arguments if the allotment was disclosed more than <span class="mono">14</span> days ago.</div>
            </div>
          </div>
        </div>
      </section>
    `,
    states: {
      emptyTitle: "No chat started",
      emptyBody: "Ask a research or drafting question to open a citation-bound session.",
      emptyJson: '{ "messages": [], "citations": [], "confidence": null }',
      errorText: "assistant response could not be verified",
      offlineText: "Offline · Showing cached AI session from 5m ago",
    },
    accessibilityMobile: "<li>Assistant response and prompt suggestions are announced in a polite live region to support iterative querying.</li>",
    accessibilityDesktop: "<li>Authority rail keeps citations visually distinct with monospace formatting so dates and references are easier to scan.</li>",
  },
  {
    filename: "S-05-legal-pro.html",
    title: "Legal Sathi — Case Management",
    description: "Legal Pro dense case management screen for lawyers and firms.",
    mobileActive: "Cases",
    desktopActive: "Cases",
    mobile: `
      <section class="panel rounded-[24px] p-4 shadow-panel">
        <div class="flex items-start justify-between gap-3">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--ls-text-secondary)]">S-05 · Lawyer/Firm workspace</p>
            <h1 class="mt-2 text-2xl font-semibold text-[var(--ls-text-primary)]">Case management</h1>
            <p class="mt-2 text-sm text-[var(--ls-text-secondary)]">Monitor active matters, upcoming hearings, and filing risk across courts and tribunals.</p>
          </div>
          <button aria-label="Create new case" class="focus-ring min-h-[44px] min-w-[44px] rounded-2xl bg-[var(--ls-accent)] px-3 text-sm font-semibold text-white">New</button>
        </div>
      </section>
      <section class="grid gap-3 sm:grid-cols-3">
        ${[
          ["Active matters", "42", "05 urgent"],
          ["Hearings this week", "18", "Delhi HC 06"],
          ["Receivables", "₹3,42,000", "09 pending invoices"],
        ]
          .map(
            ([label, value, meta]) => `
              <div class="panel rounded-[20px] p-4">
                <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">${label}</p>
                <p class="mt-3 font-mono text-2xl text-[var(--ls-text-primary)]">${value}</p>
                <p class="mt-2 text-xs text-[var(--ls-text-secondary)]">${meta}</p>
              </div>
            `,
          )
          .join("")}
      </section>
      <section class="panel rounded-[24px] p-4">
        <div class="flex items-center justify-between gap-3">
          <div class="flex-1 rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] px-4 py-3">
            <p class="text-sm text-[var(--ls-text-secondary)]">Search by case number, client, court, or practice area</p>
          </div>
          <button aria-label="Open case filters" class="focus-ring min-h-[44px] rounded-xl border border-[var(--ls-border)] px-4 py-2 text-sm text-[var(--ls-text-primary)]">Filters</button>
        </div>
        <div class="mt-3 flex flex-wrap gap-2">
          ${["Delhi HC", "Arbitration", "Urgent", "Billing due", "This week"].map((x, i) => `<button aria-label="${x}" class="focus-ring min-h-[44px] rounded-full ${i === 0 ? "bg-[var(--ls-accent)] text-white" : "border border-[var(--ls-border)] bg-[var(--ls-surface-2)] text-[var(--ls-text-secondary)]"} px-4 text-sm">${x}</button>`).join("")}
        </div>
      </section>
      <section class="panel rounded-[24px] p-4">
        <div class="flex items-center justify-between">
          <p class="text-sm font-semibold text-[var(--ls-text-primary)]">Matter list</p>
          <span class="font-mono text-xs text-[var(--ls-text-secondary)]">42 records</span>
        </div>
        <div class="mt-4 space-y-3">
          ${[
            ["LS-DEL-2026-014", "Sharma v. State of Maharashtra", "Delhi High Court · 18 Apr 2026 · Court 32", "Next", "Paid"],
            ["LS-ARB-2026-007", "Rao Exports arbitration", "SIAC-linked matter · Draft due 20 Apr 2026", "Drafting", "Retainer"],
            ["LS-NCD-2026-003", "Apex Builders v. RERA", "NCDRC VC · Client update pending", "Prep", "Pending"],
          ]
            .map(
              ([id, matter, meta, stage, fee]) => `
                <article class="rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] p-4">
                  <div class="flex items-start justify-between gap-3">
                    <div>
                      <p class="font-mono text-xs text-[var(--ls-accent-soft)]">${id}</p>
                      <h2 class="mt-2 text-sm font-semibold text-[var(--ls-text-primary)]">${matter}</h2>
                      <p class="mt-1 text-xs text-[var(--ls-text-secondary)]">${meta}</p>
                    </div>
                    <div class="text-right">
                      <span class="rounded-full bg-[var(--ls-accent)]/12 px-3 py-1 font-mono text-xs text-[var(--ls-accent-soft)]">${stage}</span>
                      <p class="mt-2 font-mono text-xs text-[var(--ls-text-secondary)]">${fee}</p>
                    </div>
                  </div>
                  <div class="mt-3 flex gap-2">
                    <button aria-label="Open ${matter}" class="focus-ring min-h-[44px] flex-1 rounded-xl bg-[var(--ls-accent)] px-4 py-2 text-sm font-semibold text-white">Open</button>
                    <button aria-label="Share update for ${matter}" class="focus-ring min-h-[44px] flex-1 rounded-xl border border-[var(--ls-border)] px-4 py-2 text-sm font-semibold text-[var(--ls-text-primary)]">Share</button>
                  </div>
                </article>
              `,
            )
            .join("")}
        </div>
      </section>
      <section class="panel rounded-[24px] p-4" aria-live="polite">
        <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">LegalGPT India case digest</p>
        <div class="mt-3 rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] p-4">
          <p class="text-sm text-[var(--ls-text-primary)]">“Summarize all matters with filings due in the next <span class="mono">72</span> hours and list missing documents by case.”</p>
          <button aria-label="Generate filing risk digest" class="focus-ring mt-3 min-h-[44px] rounded-xl bg-[var(--ls-accent)] px-4 py-2 text-sm font-semibold text-white">Generate digest</button>
        </div>
      </section>
    `,
    desktop: `
      <section class="panel rounded-[28px] p-6 shadow-float">
        <div class="flex items-start justify-between gap-6">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--ls-text-secondary)]">S-05 · Case Management</p>
            <h1 class="mt-2 text-3xl font-semibold text-[var(--ls-text-primary)]">Matter portfolio board</h1>
            <p class="mt-3 max-w-3xl text-sm leading-6 text-[var(--ls-text-secondary)]">Designed for denser operations teams that need filters, risk views, and billing context beside the matter table.</p>
          </div>
          ${commonChips}
        </div>
      </section>
      <section class="grid gap-4 md:grid-cols-4">
        ${[
          ["Active matters", "42", "Civil, arbitration, criminal"],
          ["Urgent actions", "05", "2 filings due today"],
          ["Hearings this week", "18", "Delhi HC, NCLT, NCDRC"],
          ["Receivables", "₹3,42,000", "Collected 61%"],
        ]
          .map(
            ([label, value, meta]) => `
              <div class="panel rounded-[22px] p-4">
                <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">${label}</p>
                <p class="mt-3 font-mono text-2xl text-[var(--ls-text-primary)]">${value}</p>
                <div class="mt-3 kpi-spark flex h-10 items-end gap-1">
                  <span style="height:24%"></span><span style="height:42%"></span><span style="height:56%"></span><span style="height:71%"></span><span style="height:88%"></span>
                </div>
                <p class="mt-2 text-xs text-[var(--ls-text-secondary)]">${meta}</p>
              </div>
            `,
          )
          .join("")}
      </section>
      <section class="grid gap-6 xl:grid-cols-[0.82fr,1.35fr,0.83fr]">
        <div class="space-y-4">
          <div class="panel rounded-[24px] p-5">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Filters</p>
            <div class="mt-4 space-y-3">
              ${[
                ["Court", "Delhi HC, NCLT, SIAC"],
                ["Practice area", "Arbitration, commercial, criminal"],
                ["Status", "Next hearing, drafting, billing due"],
                ["Date window", "Next 7 days"],
              ]
                .map(
                  ([label, value]) => `
                    <div class="rounded-2xl bg-[var(--ls-surface-2)] p-4">
                      <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">${label}</p>
                      <p class="mt-2 text-sm text-[var(--ls-text-primary)]">${value}</p>
                    </div>
                  `,
                )
                .join("")}
            </div>
          </div>
          <div class="panel rounded-[24px] p-5" aria-live="polite">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">LegalGPT India</p>
            <div class="mt-4 rounded-2xl bg-[var(--ls-surface-2)] p-4 text-sm text-[var(--ls-text-primary)]">Daily risk digest identifies <span class="mono">3</span> matters missing pleadings and <span class="mono">2</span> matters with pending client approvals.</div>
          </div>
        </div>
        <div class="panel rounded-[24px] p-5">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Matter table</p>
              <p class="mt-1 text-sm text-[var(--ls-text-primary)]">Dense table with <span class="mono">40px</span> row rhythm</p>
            </div>
            <button aria-label="Create a new matter" class="focus-ring min-h-[44px] rounded-xl bg-[var(--ls-accent)] px-4 py-2 text-sm font-semibold text-white">New matter</button>
          </div>
          <div class="mt-4 overflow-x-auto">
            <table class="min-w-full border-separate border-spacing-y-2 text-left text-sm">
              <thead>
                <tr class="text-[var(--ls-text-secondary)]">
                  <th class="px-4 py-2 font-medium">Matter</th>
                  <th class="px-4 py-2 font-medium">Court</th>
                  <th class="px-4 py-2 font-medium">Next date</th>
                  <th class="px-4 py-2 font-medium">Stage</th>
                  <th class="px-4 py-2 font-medium">Fee</th>
                </tr>
              </thead>
              <tbody>
                ${[
                  ["LS-DEL-2026-014 · Sharma v. State of Maharashtra", "Delhi HC", "18 Apr 2026", "Next", "Paid"],
                  ["LS-ARB-2026-007 · Rao Exports arbitration", "SIAC", "20 Apr 2026", "Drafting", "Retainer"],
                  ["LS-NCD-2026-003 · Apex Builders v. RERA", "NCDRC", "18 Apr 2026", "Prep", "Pending"],
                  ["LS-CIV-2026-022 · Kulkarni tenancy dispute", "BHC", "22 Apr 2026", "Notice", "Pending"],
                ]
                  .map(
                    ([matter, court, date, stage, fee]) => `
                      <tr class="bg-[var(--ls-surface-2)]">
                        <td class="rounded-l-2xl px-4 py-3 text-[var(--ls-text-primary)]">${matter}</td>
                        <td class="px-4 py-3 text-[var(--ls-text-secondary)]">${court}</td>
                        <td class="px-4 py-3 font-mono text-[var(--ls-text-primary)]">${date}</td>
                        <td class="px-4 py-3 font-mono text-[var(--ls-accent-soft)]">${stage}</td>
                        <td class="rounded-r-2xl px-4 py-3 font-mono text-[var(--ls-text-primary)]">${fee}</td>
                      </tr>
                    `,
                  )
                  .join("")}
              </tbody>
            </table>
          </div>
        </div>
        <div class="space-y-4">
          <div class="panel rounded-[24px] p-5">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Upcoming deadlines</p>
            <div class="mt-4 space-y-3">
              <div class="rounded-2xl border border-[var(--ls-error)]/40 bg-[var(--ls-error)]/10 p-4 text-sm text-[#FEB2B2]">File vakalatnama in Sharma matter by <time class="mono">12:30</time>.</div>
              <div class="rounded-2xl bg-[var(--ls-surface-2)] p-4 text-sm text-[var(--ls-text-primary)]">Client approval pending for Rao Exports draft amendments.</div>
            </div>
          </div>
          <div class="panel rounded-[24px] p-5">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Collections</p>
            <div class="mt-4 grid gap-3">
              <div class="rounded-2xl bg-[var(--ls-surface-2)] p-4">
                <p class="text-sm text-[var(--ls-text-primary)]">Due today</p>
                <p class="mt-2 font-mono text-xl text-[var(--ls-accent-soft)]">₹61,500</p>
              </div>
              <div class="rounded-2xl bg-[var(--ls-surface-2)] p-4">
                <p class="text-sm text-[var(--ls-text-primary)]">Retainer balance alerts</p>
                <p class="mt-2 font-mono text-xl text-[var(--ls-accent-soft)]">03</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    `,
    states: {
      emptyTitle: "No matters available",
      emptyBody: "Create a new matter or import an existing case list to populate the board.",
      emptyJson: '{ "matters": [], "filters": {}, "total": 0 }',
      errorText: "matter portfolio could not be loaded",
      offlineText: "Offline · Showing cached matter portfolio from 5m ago",
    },
    accessibilityMobile: "<li>Matter cards keep action buttons full-width and distinct so case-open and share actions remain easy to target.</li>",
    accessibilityDesktop: "<li>The main table retains clear headers and monospace dates so large matter sets remain scannable with keyboard navigation.</li>",
  },
  {
    filename: "S-06-legal-pro.html",
    title: "Legal Sathi — Case Detail View",
    description: "Legal Pro case detail workspace for a single matter.",
    mobileActive: "Cases",
    desktopActive: "Cases",
    mobile: `
      <section class="panel rounded-[24px] p-4 shadow-panel">
        <div class="flex items-start justify-between gap-3">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--ls-text-secondary)]">S-06 · Single matter workspace</p>
            <h1 class="mt-2 text-2xl font-semibold text-[var(--ls-text-primary)]">Sharma v. State of Maharashtra</h1>
            <p class="mt-2 text-sm text-[var(--ls-text-secondary)]">Delhi High Court · Court <span class="mono">32</span> · Anticipatory bail</p>
          </div>
          <span class="rounded-full bg-[var(--ls-accent)]/12 px-3 py-1 font-mono text-xs text-[var(--ls-accent-soft)]">NEXT 10:30</span>
        </div>
      </section>
      <section class="grid gap-3 sm:grid-cols-3">
        ${[
          ["Matter value", "₹1,20,000", "Professional fee"],
          ["Documents", "18", "03 uploaded this week"],
          ["Open tasks", "07", "02 urgent"],
        ]
          .map(
            ([label, value, meta]) => `
              <div class="panel rounded-[20px] p-4">
                <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">${label}</p>
                <p class="mt-3 font-mono text-2xl text-[var(--ls-text-primary)]">${value}</p>
                <p class="mt-2 text-xs text-[var(--ls-text-secondary)]">${meta}</p>
              </div>
            `,
          )
          .join("")}
      </section>
      <section class="panel rounded-[24px] p-4">
        <p class="text-sm font-semibold text-[var(--ls-text-primary)]">Timeline</p>
        <div class="mt-4 space-y-3">
          ${[
            ["18 Apr 2026 · 09:02", "Court alert received", "Bench is running 18 minutes ahead of the cause list."],
            ["17 Apr 2026 · 18:40", "Draft note saved", "Arguments updated with latest anticipatory bail authorities."],
            ["15 Apr 2026 · 12:10", "Client call logged", "Client confirmed travel and affidavit availability."],
          ]
            .map(
              ([time, title, body]) => `
                <div class="rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] p-4">
                  <p class="font-mono text-xs text-[var(--ls-accent-soft)]">${time}</p>
                  <p class="mt-2 text-sm font-semibold text-[var(--ls-text-primary)]">${title}</p>
                  <p class="mt-1 text-sm text-[var(--ls-text-secondary)]">${body}</p>
                </div>
              `,
            )
            .join("")}
        </div>
      </section>
      <section class="panel rounded-[24px] p-4">
        <div class="flex flex-wrap gap-2">
          ${["Documents", "Notes", "Client log", "Scheduler"].map((x, i) => `<button aria-label="${x}" class="focus-ring min-h-[44px] rounded-full ${i === 0 ? "bg-[var(--ls-accent)] text-white" : "border border-[var(--ls-border)] bg-[var(--ls-surface-2)] text-[var(--ls-text-secondary)]"} px-4 text-sm">${x}</button>`).join("")}
        </div>
        <div class="mt-4 rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] p-4">
          <p class="text-sm font-semibold text-[var(--ls-text-primary)]">Recent documents</p>
          <div class="mt-3 space-y-3">
            ${[
              ["Bail note v4.docx", "Edited 17 Apr 2026 · 18:40"],
              ["Client affidavit.pdf", "Uploaded 16 Apr 2026 · 11:12"],
              ["Cause list extract.pdf", "Downloaded 18 Apr 2026 · 08:41"],
            ]
              .map(
                ([name, meta]) => `
                  <div class="flex items-center justify-between gap-3 rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-bg)]/55 px-4 py-3">
                    <div>
                      <p class="text-sm text-[var(--ls-text-primary)]">${name}</p>
                      <p class="mt-1 font-mono text-xs text-[var(--ls-text-secondary)]">${meta}</p>
                    </div>
                    <button aria-label="Open ${name}" class="focus-ring min-h-[44px] rounded-xl border border-[var(--ls-border)] px-4 py-2 text-xs text-[var(--ls-text-primary)]">Open</button>
                  </div>
                `,
              )
              .join("")}
          </div>
        </div>
      </section>
      <section class="panel rounded-[24px] p-4" aria-live="polite">
        <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">LegalGPT India matter brief</p>
        <div class="mt-3 rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] p-4">
          <p class="text-sm text-[var(--ls-text-primary)]">“Prepare a <span class="mono">90</span>-second oral summary, latest bail authorities, and likely bench questions for this matter.”</p>
          <button aria-label="Generate matter brief" class="focus-ring mt-3 min-h-[44px] rounded-xl bg-[var(--ls-accent)] px-4 py-2 text-sm font-semibold text-white">Generate brief</button>
        </div>
      </section>
    `,
    desktop: `
      <section class="panel rounded-[28px] p-6 shadow-float">
        <div class="flex items-start justify-between gap-6">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--ls-text-secondary)]">S-06 · Case Detail View</p>
            <h1 class="mt-2 text-3xl font-semibold text-[var(--ls-text-primary)]">Matter cockpit</h1>
            <p class="mt-3 max-w-3xl text-sm leading-6 text-[var(--ls-text-secondary)]">Combines timeline, document access, client communication, and AI prep around a single matter.</p>
          </div>
          ${commonChips}
        </div>
      </section>
      <section class="grid gap-6 xl:grid-cols-[0.85fr,1.15fr,0.9fr]">
        <div class="space-y-4">
          <div class="panel rounded-[24px] p-5">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Matter summary</p>
            <h2 class="mt-2 text-lg font-semibold text-[var(--ls-text-primary)]">Sharma v. State of Maharashtra</h2>
            <div class="mt-4 space-y-3 text-sm text-[var(--ls-text-secondary)]">
              <p>Court: Delhi High Court · Court <span class="mono text-[var(--ls-text-primary)]">32</span></p>
              <p>Next hearing: <time class="mono text-[var(--ls-text-primary)]">18 Apr 2026 · 10:30</time></p>
              <p>Client: Priya Sharma</p>
              <p>Opposing party: State of Maharashtra</p>
              <p>Fee status: <span class="mono text-[var(--ls-accent-soft)]">₹1,20,000 paid</span></p>
            </div>
          </div>
          <div class="panel rounded-[24px] p-5">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Parties and coordination</p>
            <div class="mt-4 space-y-3">
              <div class="rounded-2xl bg-[var(--ls-surface-2)] p-4 text-sm text-[var(--ls-text-primary)]">Client contact: Priya Sharma · Affidavit signed</div>
              <div class="rounded-2xl bg-[var(--ls-surface-2)] p-4 text-sm text-[var(--ls-text-primary)]">Junior counsel: Aditya Rao · Carrying paperbook</div>
            </div>
          </div>
        </div>
        <div class="space-y-4">
          <div class="panel rounded-[24px] p-5">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Timeline and notes</p>
            <div class="mt-4 space-y-3">
              ${[
                ["18 Apr 2026 · 09:02", "Court alert received", "Bench running ahead; reach Court 32 before 10:10."],
                ["17 Apr 2026 · 18:40", "Draft note saved", "Added latest anticipatory bail cases and narrowed oral framing."],
                ["16 Apr 2026 · 11:12", "Affidavit uploaded", "Signed affidavit synced to matter folder and marked ready."],
              ]
                .map(
                  ([time, title, body]) => `
                    <div class="rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] p-4">
                      <p class="font-mono text-xs text-[var(--ls-accent-soft)]">${time}</p>
                      <p class="mt-2 text-sm font-semibold text-[var(--ls-text-primary)]">${title}</p>
                      <p class="mt-1 text-sm text-[var(--ls-text-secondary)]">${body}</p>
                    </div>
                  `,
                )
                .join("")}
            </div>
          </div>
          <div class="panel rounded-[24px] p-5">
            <div class="flex items-center justify-between">
              <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Documents</p>
              ${vaultActionButton("upload", "Upload matter document", "h-11 w-11 rounded-xl", "h-4 w-4")}
            </div>
            <div class="mt-4 overflow-x-auto">
              <table class="min-w-full border-separate border-spacing-y-2 text-left text-sm">
                <thead>
                  <tr class="text-[var(--ls-text-secondary)]">
                    <th class="px-4 py-2 font-medium">File</th>
                    <th class="px-4 py-2 font-medium">Version</th>
                    <th class="px-4 py-2 font-medium">Updated</th>
                  </tr>
                </thead>
                <tbody>
                  ${[
                    ["Bail note", "v4", "17 Apr 2026"],
                    ["Client affidavit", "v1", "16 Apr 2026"],
                    ["Cause list extract", "v2", "18 Apr 2026"],
                  ]
                    .map(
                      ([file, version, updated]) => `
                        <tr class="bg-[var(--ls-surface-2)]">
                          <td class="rounded-l-2xl px-4 py-3 text-[var(--ls-text-primary)]">${file}</td>
                          <td class="px-4 py-3 font-mono text-[var(--ls-accent-soft)]">${version}</td>
                          <td class="rounded-r-2xl px-4 py-3 font-mono text-[var(--ls-text-primary)]">${updated}</td>
                        </tr>
                      `,
                    )
                    .join("")}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="space-y-4">
          <div class="panel rounded-[24px] p-5" aria-live="polite">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">LegalGPT India</p>
            <div class="mt-4 space-y-3">
              <div class="rounded-2xl bg-[var(--ls-surface-2)] p-4 text-sm text-[var(--ls-text-primary)]">Prepared a <span class="mono">90</span>-second oral brief with <span class="mono">3</span> probable bench questions for today’s hearing.</div>
              <div class="rounded-2xl bg-[var(--ls-surface-2)] p-4 text-sm text-[var(--ls-text-primary)]">Confidence alert: maintainability question risk increased because the FIR references additional co-accused not covered in the current note.</div>
            </div>
            <div class="mt-4 flex items-center gap-3">
              <button class="focus-ring min-h-[44px] flex-1 rounded-xl bg-[var(--ls-accent)] px-4 py-2 text-sm font-semibold text-white">Open brief</button>
              ${audioTransportButton("play", "Listen digest", "h-11 w-11 rounded-xl", "h-4 w-4")}
            </div>
          </div>
          <div class="panel rounded-[24px] p-5">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Task queue</p>
            <div class="mt-4 space-y-3">
              <div class="rounded-2xl border border-[var(--ls-error)]/40 bg-[var(--ls-error)]/10 p-4 text-sm text-[#FEB2B2]">Reach court by <time class="mono">10:10</time> due to queue acceleration.</div>
              <div class="rounded-2xl bg-[var(--ls-surface-2)] p-4 text-sm text-[var(--ls-text-primary)]">Confirm paperbook copies with junior counsel before departure.</div>
            </div>
          </div>
        </div>
      </section>
    `,
    states: {
      emptyTitle: "No matter loaded",
      emptyBody: "Select a matter from the case list to open timeline, documents, and notes.",
      emptyJson: '{ "matter": null, "timeline": [], "documents": [] }',
      errorText: "matter workspace could not be loaded",
      offlineText: "Offline · Showing cached matter workspace from 5m ago",
    },
    accessibilityMobile: "<li>Timeline cards use clear time stamps and title-body structure so updates remain understandable when read aloud.</li>",
    accessibilityDesktop: "<li>The document table and task queue are separated into stable columns to avoid keyboard focus jumps during live updates.</li>",
  },
  {
    filename: "S-11-legal-pro.html",
    title: "Legal Sathi — Lawyer Discovery",
    description: "Legal Pro lawyer discovery screen for citizens.",
    mobileActive: "Home",
    desktopActive: "Research",
    mobile: `
      <section class="panel rounded-[24px] p-4 shadow-panel">
        <div class="flex items-start justify-between gap-3">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--ls-text-secondary)]">S-11 · Citizen journey</p>
            <h1 class="mt-2 text-2xl font-semibold text-[var(--ls-text-primary)]">Lawyer discovery</h1>
            <p class="mt-2 text-sm text-[var(--ls-text-secondary)]">Find verified counsel by practice area, city, language, fee, and availability.</p>
          </div>
          <button aria-label="Use near me search" class="focus-ring min-h-[44px] rounded-xl border border-[var(--ls-border)] px-4 py-2 text-sm text-[var(--ls-text-primary)]">Near me</button>
        </div>
      </section>
      <section class="panel rounded-[24px] p-4">
        <div class="rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] px-4 py-3">
          <p class="text-sm text-[var(--ls-text-secondary)]">Search “bail lawyer in Delhi”, “startup counsel in Bengaluru”, or “family lawyer near me”</p>
        </div>
        <div class="mt-3 flex flex-wrap gap-2">
          ${["Criminal", "Family", "Corporate", "Hindi", "₹1,500-₹5,000"].map((x, i) => `<button aria-label="${x}" class="focus-ring min-h-[44px] rounded-full ${i === 0 ? "bg-[var(--ls-accent)] text-white" : "border border-[var(--ls-border)] bg-[var(--ls-surface-2)] text-[var(--ls-text-secondary)]"} px-4 text-sm">${x}</button>`).join("")}
        </div>
      </section>
      <section class="space-y-3">
        ${[
          ["Adv. Priya Sharma", "Criminal defense · Delhi High Court", "4.8", "₹3,000 / consult", "Hindi · English"],
          ["Adv. Arjun Mehta", "Startup and commercial disputes · Delhi", "4.7", "₹4,500 / consult", "English · Punjabi"],
          ["Adv. Meera Kulkarni", "Family and matrimonial law · Mumbai", "4.9", "₹2,000 / consult", "Marathi · Hindi"],
        ]
          .map(
            ([name, practice, rating, fee, lang]) => `
              <article class="panel rounded-[24px] p-4">
                <div class="flex items-start justify-between gap-3">
                  <div>
                    <h2 class="text-base font-semibold text-[var(--ls-text-primary)]">${name}</h2>
                    <p class="mt-1 text-sm text-[var(--ls-text-secondary)]">${practice}</p>
                    <p class="mt-2 font-mono text-xs text-[var(--ls-accent-soft)]">RATING ${rating} · ${lang}</p>
                  </div>
                  <span class="rounded-full bg-[var(--ls-success)]/15 px-3 py-1 font-mono text-xs text-[#9AE6B4]">VERIFIED</span>
                </div>
                <div class="mt-4 flex items-center justify-between">
                  <p class="font-mono text-sm text-[var(--ls-text-primary)]">${fee}</p>
                  <button aria-label="Book consultation with ${name}" class="focus-ring min-h-[44px] rounded-xl bg-[var(--ls-accent)] px-4 py-2 text-sm font-semibold text-white">Book</button>
                </div>
              </article>
            `,
          )
          .join("")}
      </section>
      <section class="panel rounded-[24px] p-4" aria-live="polite">
        <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">LegalGPT India helper</p>
        <div class="mt-3 rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] p-4">
          <p class="text-sm text-[var(--ls-text-primary)]">“Based on my problem, what type of lawyer should I speak to first?”</p>
          <button aria-label="Ask LegalGPT India what type of lawyer is needed" class="focus-ring mt-3 min-h-[44px] rounded-xl bg-[var(--ls-accent)] px-4 py-2 text-sm font-semibold text-white">Ask before booking</button>
        </div>
      </section>
    `,
    desktop: `
      <section class="panel rounded-[28px] p-6 shadow-float">
        <div class="flex items-start justify-between gap-6">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--ls-text-secondary)]">S-11 · Lawyer Discovery</p>
            <h1 class="mt-2 text-3xl font-semibold text-[var(--ls-text-primary)]">Verified counsel marketplace</h1>
            <p class="mt-3 max-w-3xl text-sm leading-6 text-[var(--ls-text-secondary)]">Balances citizen trust signals, fee transparency, and fast booking actions while avoiding misleading legal advertising patterns.</p>
          </div>
          ${commonChips}
        </div>
      </section>
      <section class="grid gap-6 xl:grid-cols-[0.85fr,1.15fr,0.95fr]">
        <div class="space-y-4">
          <div class="panel rounded-[24px] p-5">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Search filters</p>
            <div class="mt-4 space-y-3">
              ${[
                ["Practice area", "Criminal, family, corporate"],
                ["Location", "Delhi NCR"],
                ["Language", "Hindi, English"],
                ["Budget", "₹1,500 to ₹5,000"],
              ]
                .map(
                  ([label, value]) => `
                    <div class="rounded-2xl bg-[var(--ls-surface-2)] p-4">
                      <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">${label}</p>
                      <p class="mt-2 text-sm text-[var(--ls-text-primary)]">${value}</p>
                    </div>
                  `,
                )
                .join("")}
            </div>
          </div>
          <div class="panel rounded-[24px] p-5" aria-live="polite">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">LegalGPT India helper</p>
            <div class="mt-4 rounded-2xl bg-[var(--ls-surface-2)] p-4 text-sm text-[var(--ls-text-primary)]">Guided question flow suggests a criminal-defense lawyer first because your issue mentions FIR registration, anticipatory bail, and police notice.</div>
          </div>
        </div>
        <div class="panel rounded-[24px] p-5">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Results</p>
              <p class="mt-1 text-sm text-[var(--ls-text-primary)]"><span class="mono">26</span> verified lawyers found</p>
            </div>
            <button aria-label="Sort lawyer results by best match" class="focus-ring min-h-[44px] rounded-xl border border-[var(--ls-border)] px-4 py-2 text-sm text-[var(--ls-text-primary)]">Best match</button>
          </div>
          <div class="mt-4 space-y-3">
            ${[
              ["Adv. Priya Sharma", "Criminal defense · Delhi High Court", "4.8", "₹3,000", "Hindi · English"],
              ["Adv. Arjun Mehta", "Commercial disputes · Delhi", "4.7", "₹4,500", "English · Punjabi"],
              ["Adv. Meera Kulkarni", "Family law · Mumbai", "4.9", "₹2,000", "Marathi · Hindi"],
            ]
              .map(
                ([name, practice, rating, fee, lang]) => `
                  <article class="rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] p-4">
                    <div class="flex items-start justify-between gap-3">
                      <div>
                        <h2 class="text-base font-semibold text-[var(--ls-text-primary)]">${name}</h2>
                        <p class="mt-1 text-sm text-[var(--ls-text-secondary)]">${practice}</p>
                        <p class="mt-2 font-mono text-xs text-[var(--ls-accent-soft)]">RATING ${rating} · ${lang}</p>
                      </div>
                      <span class="rounded-full bg-[var(--ls-success)]/15 px-3 py-1 font-mono text-xs text-[#9AE6B4]">VERIFIED</span>
                    </div>
                    <div class="mt-4 flex items-center justify-between">
                      <p class="font-mono text-sm text-[var(--ls-text-primary)]">${fee} / consult</p>
                      <div class="flex gap-2">
                        <button class="focus-ring min-h-[44px] rounded-xl border border-[var(--ls-border)] px-4 py-2 text-sm text-[var(--ls-text-primary)]">View</button>
                        <button aria-label="Book consultation with ${name}" class="focus-ring min-h-[44px] rounded-xl bg-[var(--ls-accent)] px-4 py-2 text-sm font-semibold text-white">Book</button>
                      </div>
                    </div>
                  </article>
                `,
              )
              .join("")}
          </div>
        </div>
        <div class="space-y-4">
          <div class="panel rounded-[24px] p-5">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Selected profile</p>
            <div class="mt-4 space-y-3">
              <div class="rounded-2xl bg-[var(--ls-surface-2)] p-4">
                <p class="text-base font-semibold text-[var(--ls-text-primary)]">Adv. Priya Sharma</p>
                <p class="mt-1 text-sm text-[var(--ls-text-secondary)]">Criminal defense · Delhi High Court · <span class="mono">11</span> years PQE</p>
              </div>
              <div class="rounded-2xl bg-[var(--ls-surface-2)] p-4 text-sm text-[var(--ls-text-primary)]">Speaks Hindi and English. Offers anticipatory bail consultations, FIR quash petitions, and hearing representation in Delhi courts.</div>
              <div class="rounded-2xl bg-[var(--ls-surface-2)] p-4 text-sm text-[var(--ls-text-primary)]">Compliance note: profile shows verified credentials, languages, and fee transparency without outcome guarantees.</div>
            </div>
          </div>
        </div>
      </section>
    `,
    states: {
      emptyTitle: "No lawyers found",
      emptyBody: "Try widening practice area, city, or budget filters to see more verified counsel.",
      emptyJson: '{ "results": [], "filters": { "city": "Delhi" } }',
      errorText: "lawyer search results could not be loaded",
      offlineText: "Offline · Showing cached discovery results from 5m ago",
    },
    accessibilityMobile: "<li>Every book button includes the lawyer name in its aria-label so screen reader users can act confidently from result cards.</li>",
    accessibilityDesktop: "<li>Search results and selected-profile panels stay visually separated so users can compare options without losing context.</li>",
  },
  {
    filename: "S-12-legal-pro.html",
    title: "Legal Sathi — Consultation Booking",
    description: "Legal Pro consultation booking flow for citizens and lawyers.",
    mobileActive: "Calendar",
    desktopActive: "Calendar",
    mobile: `
      <section class="panel rounded-[24px] p-4 shadow-panel">
        <div class="flex items-start justify-between gap-3">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--ls-text-secondary)]">S-12 · Booking workflow</p>
            <h1 class="mt-2 text-2xl font-semibold text-[var(--ls-text-primary)]">Consultation booking</h1>
            <p class="mt-2 text-sm text-[var(--ls-text-secondary)]">Schedule a verified consultation with fee transparency and pre-consultation context.</p>
          </div>
          <span class="rounded-full bg-[var(--ls-success)]/15 px-3 py-1 font-mono text-xs text-[#9AE6B4]">AVAILABLE</span>
        </div>
      </section>
      <section class="panel rounded-[24px] p-4">
        <div class="rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] p-4">
          <p class="text-base font-semibold text-[var(--ls-text-primary)]">Adv. Priya Sharma</p>
          <p class="mt-1 text-sm text-[var(--ls-text-secondary)]">Criminal defense · Delhi High Court</p>
          <p class="mt-2 font-mono text-sm text-[var(--ls-accent-soft)]">₹3,000 / 30 min · Video or audio</p>
        </div>
        <div class="mt-4 grid grid-cols-3 gap-3">
          ${["15 min", "30 min", "60 min"].map((x, i) => `<button aria-label="${x}" class="focus-ring min-h-[44px] rounded-xl ${i === 1 ? "bg-[var(--ls-accent)] text-white" : "border border-[var(--ls-border)] bg-[var(--ls-surface-2)] text-[var(--ls-text-secondary)]"} text-sm">${x}</button>`).join("")}
        </div>
        <div class="mt-4 grid grid-cols-4 gap-3">
          ${["18", "19", "20", "21"].map((d, i) => `<button aria-label="Select April ${d}" class="focus-ring min-h-[52px] rounded-2xl ${i === 0 ? "bg-[var(--ls-accent)] text-white" : "border border-[var(--ls-border)] bg-[var(--ls-surface-2)] text-[var(--ls-text-secondary)]"} font-mono">${d}</button>`).join("")}
        </div>
        <div class="mt-4 grid grid-cols-2 gap-3">
          ${["10:00", "10:30", "11:00", "11:30", "14:00", "16:00"].map((slot, i) => `<button aria-label="Select ${slot}" class="focus-ring min-h-[44px] rounded-xl ${i === 3 ? "bg-[var(--ls-accent)] text-white" : "border border-[var(--ls-border)] bg-[var(--ls-surface-2)] text-[var(--ls-text-secondary)]"} font-mono text-sm">${slot}</button>`).join("")}
        </div>
      </section>
      <section class="panel rounded-[24px] p-4">
        <p class="text-sm font-semibold text-[var(--ls-text-primary)]">Pre-consultation note</p>
        <div class="mt-3 rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] p-4 text-sm text-[var(--ls-text-secondary)]">Received a police notice under Section <span class="mono">41A CrPC</span> and need advice on anticipatory bail before appearing.</div>
        <div class="mt-3 rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-bg)]/55 p-4" aria-live="polite">
          <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">LegalGPT India helper</p>
          <p class="mt-2 text-sm text-[var(--ls-text-primary)]">Can convert your note into a short consultation brief so the lawyer sees facts faster.</p>
          <button aria-label="Create concise AI consultation brief" class="focus-ring mt-3 min-h-[44px] rounded-xl border border-[var(--ls-border)] px-4 py-2 text-sm text-[var(--ls-text-primary)]">Create brief</button>
        </div>
      </section>
      <section class="panel rounded-[24px] p-4">
        <div class="flex items-center justify-between">
          <p class="text-sm font-semibold text-[var(--ls-text-primary)]">Payment summary</p>
          <span class="font-mono text-sm text-[var(--ls-accent-soft)]">₹3,000</span>
        </div>
        <div class="mt-4 space-y-2 text-sm text-[var(--ls-text-secondary)]">
          <div class="flex items-center justify-between"><span>Consultation fee</span><span class="font-mono">₹3,000</span></div>
          <div class="flex items-center justify-between"><span>Platform fee</span><span class="font-mono">₹0</span></div>
        </div>
        <button aria-label="Pay and confirm consultation" class="focus-ring mt-4 min-h-[44px] w-full rounded-xl bg-[var(--ls-accent)] px-4 py-3 text-sm font-semibold text-white">Pay and confirm</button>
      </section>
    `,
    desktop: `
      <section class="panel rounded-[28px] p-6 shadow-float">
        <div class="flex items-start justify-between gap-6">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--ls-text-secondary)]">S-12 · Consultation Booking</p>
            <h1 class="mt-2 text-3xl font-semibold text-[var(--ls-text-primary)]">Appointment and payment scheduler</h1>
            <p class="mt-3 max-w-3xl text-sm leading-6 text-[var(--ls-text-secondary)]">Designed to reduce booking friction while keeping schedule clarity, consultation context, and payment trust visible.</p>
          </div>
          ${commonChips}
        </div>
      </section>
      <section class="grid gap-6 xl:grid-cols-[1.1fr,0.95fr,0.85fr]">
        <div class="panel rounded-[24px] p-5">
          <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Schedule</p>
          <div class="mt-4 grid gap-4 md:grid-cols-2">
            <div class="rounded-2xl bg-[var(--ls-surface-2)] p-4">
              <p class="text-sm font-semibold text-[var(--ls-text-primary)]">Duration</p>
              <div class="mt-3 grid grid-cols-3 gap-3">
                ${["15 min", "30 min", "60 min"].map((x, i) => `<button aria-label="${x}" class="focus-ring min-h-[44px] rounded-xl ${i === 1 ? "bg-[var(--ls-accent)] text-white" : "border border-[var(--ls-border)] bg-[var(--ls-surface)] text-[var(--ls-text-secondary)]"} text-sm">${x}</button>`).join("")}
              </div>
            </div>
            <div class="rounded-2xl bg-[var(--ls-surface-2)] p-4">
              <p class="text-sm font-semibold text-[var(--ls-text-primary)]">Mode</p>
              <div class="mt-3 grid grid-cols-2 gap-3">
                <button class="focus-ring min-h-[44px] rounded-xl bg-[var(--ls-accent)] text-sm text-white">Video</button>
                <button class="focus-ring min-h-[44px] rounded-xl border border-[var(--ls-border)] bg-[var(--ls-surface)] text-sm text-[var(--ls-text-secondary)]">Audio</button>
              </div>
            </div>
          </div>
          <div class="mt-4 rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] p-4">
            <p class="text-sm font-semibold text-[var(--ls-text-primary)]">Available slots · 18 Apr 2026</p>
            <div class="mt-3 grid grid-cols-3 gap-3">
              ${["10:00", "10:30", "11:00", "11:30", "14:00", "16:00"].map((slot, i) => `<button aria-label="Select ${slot}" class="focus-ring min-h-[44px] rounded-xl ${i === 3 ? "bg-[var(--ls-accent)] text-white" : "border border-[var(--ls-border)] bg-[var(--ls-surface)] text-[var(--ls-text-secondary)]"} font-mono text-sm">${slot}</button>`).join("")}
            </div>
          </div>
        </div>
        <div class="space-y-4">
          <div class="panel rounded-[24px] p-5">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Lawyer summary</p>
            <div class="mt-4 rounded-2xl bg-[var(--ls-surface-2)] p-4">
              <p class="text-base font-semibold text-[var(--ls-text-primary)]">Adv. Priya Sharma</p>
              <p class="mt-1 text-sm text-[var(--ls-text-secondary)]">Criminal defense · Delhi High Court · <span class="mono">11</span> years PQE</p>
              <p class="mt-2 font-mono text-sm text-[var(--ls-accent-soft)]">₹3,000 / 30 min</p>
            </div>
          </div>
          <div class="panel rounded-[24px] p-5">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Consultation brief</p>
            <div class="mt-4 rounded-2xl bg-[var(--ls-surface-2)] p-4 text-sm text-[var(--ls-text-primary)]">Citizen received notice under <span class="mono">41A CrPC</span> and needs guidance on anticipatory bail timing, document readiness, and police appearance strategy.</div>
            <div class="mt-4 rounded-2xl bg-[var(--ls-surface-2)] p-4" aria-live="polite">
              <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">LegalGPT India helper</p>
              <p class="mt-2 text-sm text-[var(--ls-text-primary)]">AI can condense the citizen note into a lawyer-facing prep brief before payment confirmation.</p>
            </div>
          </div>
        </div>
        <div class="space-y-4">
          <div class="panel rounded-[24px] p-5">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Payment</p>
            <div class="mt-4 space-y-2 text-sm text-[var(--ls-text-secondary)]">
              <div class="flex items-center justify-between"><span>Consultation fee</span><span class="font-mono text-[var(--ls-text-primary)]">₹3,000</span></div>
              <div class="flex items-center justify-between"><span>Taxes</span><span class="font-mono text-[var(--ls-text-primary)]">₹0</span></div>
              <div class="flex items-center justify-between border-t border-[var(--ls-border)] pt-2"><span>Total</span><span class="font-mono text-[var(--ls-accent-soft)]">₹3,000</span></div>
            </div>
            <button aria-label="Proceed to Razorpay payment" class="focus-ring mt-4 min-h-[44px] w-full rounded-xl bg-[var(--ls-accent)] px-4 py-3 text-sm font-semibold text-white">Pay and confirm</button>
          </div>
          <div class="panel rounded-[24px] p-5">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Booking notes</p>
            <div class="mt-4 space-y-3">
              <div class="rounded-2xl bg-[var(--ls-surface-2)] p-4 text-sm text-[var(--ls-text-primary)]">Confirmation and reminder notifications will be sent via app and WhatsApp preferences if enabled.</div>
              <div class="rounded-2xl bg-[var(--ls-surface-2)] p-4 text-sm text-[var(--ls-text-primary)]">Consultation history and notes will be saved to the user’s secure document vault.</div>
            </div>
          </div>
        </div>
      </section>
    `,
    states: {
      emptyTitle: "No consultation slots available",
      emptyBody: "Choose another date or another verified lawyer to continue booking.",
      emptyJson: '{ "date": "2026-04-18", "slots": [] }',
      errorText: "booking slots could not be loaded",
      offlineText: "Offline · Showing cached booking availability from 5m ago",
    },
    accessibilityMobile: "<li>Slot buttons remain large and evenly spaced so time selection works reliably on small screens.</li>",
    accessibilityDesktop: "<li>The booking grid keeps schedule, lawyer context, and payment details in separate columns to reduce confirmation mistakes.</li>",
  },
  {
    filename: "S-13-legal-pro.html",
    title: "Legal Sathi — Court Alerts Center",
    description: "Legal Pro court alerts center for lawyers and firms.",
    mobileActive: "Calendar",
    desktopActive: "Home",
    mobile: `
      <section class="panel rounded-[24px] p-4 shadow-panel">
        <div class="flex items-start justify-between gap-3">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--ls-text-secondary)]">S-13 · Real-time cause list updates</p>
            <h1 class="mt-2 text-2xl font-semibold text-[var(--ls-text-primary)]">Court alerts center</h1>
            <p class="mt-2 text-sm text-[var(--ls-text-secondary)]">Track queue movement, order uploads, and hearing reminders across multiple courts.</p>
          </div>
          <span class="rounded-full bg-[var(--ls-error)]/15 px-3 py-1 font-mono text-xs text-[#FEB2B2]">LIVE 04</span>
        </div>
      </section>
      <section class="grid gap-3 sm:grid-cols-3">
        ${[
          ["Tracked courts", "03", "Delhi HC, NCLT, NCDRC"],
          ["Live alerts", "04", "02 urgent"],
          ["Order uploads", "02", "Today"],
        ]
          .map(
            ([label, value, meta]) => `
              <div class="panel rounded-[20px] p-4">
                <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">${label}</p>
                <p class="mt-3 font-mono text-2xl text-[var(--ls-text-primary)]">${value}</p>
                <p class="mt-2 text-xs text-[var(--ls-text-secondary)]">${meta}</p>
              </div>
            `,
          )
          .join("")}
      </section>
      <section class="panel rounded-[24px] p-4" aria-live="assertive">
        <p class="text-sm font-semibold text-[var(--ls-text-primary)]">Live queue</p>
        <div class="mt-4 space-y-3">
          ${[
            ["Sharma v. State of Maharashtra", "Court 32 · Delhi HC", "Your matter likely in 18m", "Urgent"],
            ["Apex Builders v. RERA", "NCDRC VC", "Bench assembled", "Watch"],
            ["Rao Exports arbitration", "Virtual prep reminder", "Draft note due in 2h", "Prep"],
          ]
            .map(
              ([matter, court, note, level]) => `
                <div class="rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] p-4">
                  <div class="flex items-start justify-between gap-3">
                    <div>
                      <p class="text-sm font-semibold text-[var(--ls-text-primary)]">${matter}</p>
                      <p class="mt-1 text-xs text-[var(--ls-text-secondary)]">${court}</p>
                      <p class="mt-2 text-sm ${level === "Urgent" ? "text-[#FEB2B2]" : "text-[var(--ls-text-primary)]"}">${note}</p>
                    </div>
                    <span class="rounded-full px-3 py-1 font-mono text-xs ${level === "Urgent" ? "bg-[var(--ls-error)]/15 text-[#FEB2B2]" : "bg-[var(--ls-accent)]/12 text-[var(--ls-accent-soft)]"}">${level}</span>
                  </div>
                </div>
              `,
            )
            .join("")}
        </div>
      </section>
      <section class="panel rounded-[24px] p-4" aria-live="polite">
        <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">LegalGPT India hearing prep</p>
        <div class="mt-3 rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] p-4">
          <p class="text-sm text-[var(--ls-text-primary)]">Generate a last-minute court note if the bench is moving faster than the listed sequence.</p>
          <button aria-label="Generate fast hearing prep note" class="focus-ring mt-3 min-h-[44px] rounded-xl bg-[var(--ls-accent)] px-4 py-2 text-sm font-semibold text-white">Generate quick note</button>
        </div>
      </section>
    `,
    desktop: `
      <section class="panel rounded-[28px] p-6 shadow-float">
        <div class="flex items-start justify-between gap-6">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--ls-text-secondary)]">S-13 · Court Alerts Center</p>
            <h1 class="mt-2 text-3xl font-semibold text-[var(--ls-text-primary)]">Cause list and order monitor</h1>
            <p class="mt-3 max-w-3xl text-sm leading-6 text-[var(--ls-text-secondary)]">Designed for multi-court tracking with high-priority queue changes, order uploads, and hearing reminders in one operational surface.</p>
          </div>
          ${commonChips}
        </div>
      </section>
      <section class="grid gap-4 md:grid-cols-4">
        ${[
          ["Tracked courts", "03", "Delhi HC, NCLT, NCDRC"],
          ["Live alerts", "04", "02 urgent right now"],
          ["Parser latency", "34s", "Average fresh cause list"],
          ["Orders uploaded", "02", "Since 08:00"],
        ]
          .map(
            ([label, value, meta]) => `
              <div class="panel rounded-[22px] p-4">
                <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">${label}</p>
                <p class="mt-3 font-mono text-2xl text-[var(--ls-text-primary)]">${value}</p>
                <p class="mt-2 text-xs text-[var(--ls-text-secondary)]">${meta}</p>
              </div>
            `,
          )
          .join("")}
      </section>
      <section class="grid gap-6 xl:grid-cols-[0.8fr,1.25fr,0.95fr]">
        <div class="space-y-4">
          <div class="panel rounded-[24px] p-5">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Monitored courts</p>
            <div class="mt-4 space-y-3">
              ${[
                ["Delhi High Court", "Cause list fresh · 08:57"],
                ["NCLT Mumbai", "Queue stable · 08:49"],
                ["NCDRC VC", "Bench assembled · 09:05"],
              ]
                .map(
                  ([court, meta]) => `
                    <div class="rounded-2xl bg-[var(--ls-surface-2)] p-4">
                      <p class="text-sm text-[var(--ls-text-primary)]">${court}</p>
                      <p class="mt-1 font-mono text-xs text-[var(--ls-text-secondary)]">${meta}</p>
                    </div>
                  `,
                )
                .join("")}
            </div>
          </div>
          <div class="panel rounded-[24px] p-5" aria-live="polite">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">LegalGPT India</p>
            <div class="mt-4 rounded-2xl bg-[var(--ls-surface-2)] p-4 text-sm text-[var(--ls-text-primary)]">Prepared a compressed hearing note for Sharma matter because queue velocity suggests a faster-than-expected call.</div>
          </div>
        </div>
        <div class="panel rounded-[24px] p-5" aria-live="assertive">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Alert stream</p>
              <p class="mt-1 text-sm text-[var(--ls-text-primary)]">Priority-sorted operational feed</p>
            </div>
            ${controlIconButton("bell", "Snooze selected alerts", "amber", "h-11 w-11 rounded-xl", "h-4 w-4")}
          </div>
          <div class="mt-4 overflow-x-auto">
            <table class="min-w-full border-separate border-spacing-y-2 text-left text-sm">
              <thead>
                <tr class="text-[var(--ls-text-secondary)]">
                  <th class="px-4 py-2 font-medium">Matter</th>
                  <th class="px-4 py-2 font-medium">Court</th>
                  <th class="px-4 py-2 font-medium">Event</th>
                  <th class="px-4 py-2 font-medium">Time</th>
                </tr>
              </thead>
              <tbody>
                ${[
                  ["Sharma v. State of Maharashtra", "Delhi HC", "Queue ahead by 18m", "09:02"],
                  ["Apex Builders v. RERA", "NCDRC", "Bench assembled", "08:58"],
                  ["Rao Exports arbitration", "Internal", "Prep reminder", "09:05"],
                ]
                  .map(
                    ([matter, court, event, time]) => `
                      <tr class="bg-[var(--ls-surface-2)]">
                        <td class="rounded-l-2xl px-4 py-3 text-[var(--ls-text-primary)]">${matter}</td>
                        <td class="px-4 py-3 text-[var(--ls-text-secondary)]">${court}</td>
                        <td class="px-4 py-3 text-[var(--ls-text-primary)]">${event}</td>
                        <td class="rounded-r-2xl px-4 py-3 font-mono text-[var(--ls-accent-soft)]">${time}</td>
                      </tr>
                    `,
                  )
                  .join("")}
              </tbody>
            </table>
          </div>
        </div>
        <div class="space-y-4">
          <div class="panel rounded-[24px] p-5">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Order uploads</p>
            <div class="mt-4 space-y-3">
              <div class="rounded-2xl bg-[var(--ls-surface-2)] p-4 text-sm text-[var(--ls-text-primary)]">NCLT Mumbai uploaded order in Apex Builders at <time class="mono">08:57</time>.</div>
              <div class="rounded-2xl bg-[var(--ls-surface-2)] p-4 text-sm text-[var(--ls-text-primary)]">Cause list extract saved to Document Vault for Delhi High Court Court <span class="mono">32</span>.</div>
            </div>
          </div>
          <div class="panel rounded-[24px] p-5">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Reminder ladder</p>
            <div class="mt-4 grid gap-3">
              ${["7d", "1d", "3h", "30m"].map((x) => `<div class="rounded-2xl bg-[var(--ls-surface-2)] p-4 font-mono text-sm text-[var(--ls-text-primary)]">${x}</div>`).join("")}
            </div>
          </div>
        </div>
      </section>
    `,
    states: {
      emptyTitle: "No alerts in queue",
      emptyBody: "Track at least one court or matter to start receiving live updates.",
      emptyJson: '{ "alerts": [], "trackedCourts": [] }',
      errorText: "court alert stream could not be refreshed",
      offlineText: "Offline · Showing cached court alerts from 5m ago",
    },
    accessibilityMobile: "<li>Urgent queue changes are announced in an assertive live region so high-priority movement is not missed.</li>",
    accessibilityDesktop: "<li>The alert table separates matter, court, event, and time so operations teams can scan queue movement quickly.</li>",
  },
  {
    filename: "S-19-legal-pro.html",
    title: "Legal Sathi — Application Confirmation",
    description: "Legal Pro internship application confirmation screen for students.",
    mobileActive: "Profile",
    desktopActive: "Research",
    mobile: `
      <section class="panel rounded-[24px] p-4 shadow-panel">
        <div class="flex items-start justify-between gap-3">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--ls-text-secondary)]">S-19 · Internship Hub</p>
            <h1 class="mt-2 text-2xl font-semibold text-[var(--ls-text-primary)]">Application submitted</h1>
            <p class="mt-2 text-sm text-[var(--ls-text-secondary)]">Your internship application has been successfully submitted to the organisation.</p>
          </div>
          <span class="rounded-full bg-[var(--ls-success)]/15 px-3 py-1 font-mono text-xs text-[#9AE6B4]">SENT</span>
        </div>
      </section>
      <section class="panel rounded-[24px] p-4">
        <div class="flex flex-col items-center text-center">
          <div class="grid h-24 w-24 place-items-center rounded-full border border-[var(--ls-border)] bg-gradient-to-br from-[var(--ls-success)]/18 to-[var(--ls-accent)]/12 shadow-panel">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="h-10 w-10 text-[#9AE6B4]">
              <path d="m5 12 4.1 4.1L19 6.2"></path>
            </svg>
          </div>
          <h2 class="mt-4 text-lg font-semibold text-[var(--ls-text-primary)]">Your application is with Khaitan & Co.</h2>
          <p class="mt-2 max-w-xs text-sm text-[var(--ls-text-secondary)]">We’ve saved your profile snapshot, uploaded documents, and role preferences for tracking.</p>
        </div>
        <div class="mt-4 space-y-3">
          <div class="rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] px-4 py-3">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Application ID</p>
            <p class="mt-2 font-mono text-sm text-[var(--ls-accent-soft)]">APP-KHC-2026-0418-017</p>
          </div>
          <div class="rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] px-4 py-3">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Role</p>
            <p class="mt-2 text-sm text-[var(--ls-text-primary)]">Corporate Internship · Mumbai</p>
          </div>
          <div class="rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] px-4 py-3">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Expected timeline</p>
            <p class="mt-2 text-sm text-[var(--ls-text-primary)]">Review usually begins within <span class="mono">3</span> to <span class="mono">5</span> business days.</p>
          </div>
        </div>
        <div class="mt-4 flex gap-3">
          <button aria-label="Track internship application" class="focus-ring min-h-[44px] flex-1 rounded-xl bg-[var(--ls-accent)] px-4 py-2 text-sm font-semibold text-white">Track application</button>
          <button aria-label="Browse more internships" class="focus-ring min-h-[44px] flex-1 rounded-xl border border-[var(--ls-border)] px-4 py-2 text-sm text-[var(--ls-text-primary)]">Browse more</button>
        </div>
      </section>
      <section class="panel rounded-[24px] p-4" aria-live="polite">
        <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Next steps</p>
        <div class="mt-4 space-y-3">
          ${[
            ["Application tracker enabled", "You’ll see movement in My Applications when the firm updates the status."],
            ["Documents preserved", "Resume, cover note, and transcript are pinned to this application record."],
            ["LegalGPT India follow-up", "AI can help tailor a second application or prepare you for an interview if shortlisted."],
          ]
            .map(
              ([title, body]) => `
                <div class="rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] p-4">
                  <p class="text-sm font-semibold text-[var(--ls-text-primary)]">${title}</p>
                  <p class="mt-1 text-sm text-[var(--ls-text-secondary)]">${body}</p>
                </div>
              `,
            )
            .join("")}
        </div>
      </section>
    `,
    desktop: `
      <section class="panel rounded-[28px] p-6 shadow-float">
        <div class="flex items-start justify-between gap-6">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--ls-text-secondary)]">S-19 · Application Confirmation</p>
            <h1 class="mt-2 text-3xl font-semibold text-[var(--ls-text-primary)]">Submission success workspace</h1>
            <p class="mt-3 max-w-3xl text-sm leading-6 text-[var(--ls-text-secondary)]">Confirms the application, surfaces tracking data, and points the student to follow-up actions without forcing them back into the listing flow.</p>
          </div>
          ${commonChips}
        </div>
      </section>
      <section class="grid gap-6 xl:grid-cols-[0.9fr,1.15fr,0.9fr]">
        <div class="space-y-4">
          <div class="panel rounded-[24px] p-5">
            <div class="flex flex-col items-center text-center">
              <div class="grid h-28 w-28 place-items-center rounded-full border border-[var(--ls-border)] bg-gradient-to-br from-[var(--ls-success)]/18 to-[var(--ls-accent)]/12 shadow-panel">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="h-12 w-12 text-[#9AE6B4]">
                  <path d="m5 12 4.1 4.1L19 6.2"></path>
                </svg>
              </div>
              <p class="mt-4 text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Submission complete</p>
              <h2 class="mt-2 text-xl font-semibold text-[var(--ls-text-primary)]">Khaitan & Co. application submitted</h2>
              <p class="mt-2 text-sm text-[var(--ls-text-secondary)]">Your candidate package is stored and now visible in the application tracker.</p>
            </div>
          </div>
          <div class="panel rounded-[24px] p-5">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Application summary</p>
            <div class="mt-4 space-y-3">
              ${[
                ["Application ID", "APP-KHC-2026-0418-017"],
                ["Role", "Corporate Internship · Mumbai"],
                ["Submitted at", "18 Apr 2026 · 09:26 IST"],
              ]
                .map(
                  ([label, value]) => `
                    <div class="rounded-2xl bg-[var(--ls-surface-2)] p-4">
                      <p class="text-sm text-[var(--ls-text-primary)]">${label}</p>
                      <p class="mt-1 font-mono text-xs text-[var(--ls-accent-soft)]">${value}</p>
                    </div>
                  `,
                )
                .join("")}
            </div>
          </div>
        </div>
        <div class="space-y-4">
          <div class="panel rounded-[24px] p-5">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">What happens next</p>
            <div class="mt-4 space-y-3">
              ${[
                ["Tracker update", "The application now appears in My Applications with a live status badge."],
                ["Document lock", "Uploaded resume, transcript, and cover note are attached to this application record."],
                ["Status alerts", "You’ll receive in-app and notification updates when the organisation changes state."],
              ]
                .map(
                  ([title, body]) => `
                    <div class="rounded-2xl bg-[var(--ls-surface-2)] p-4">
                      <p class="text-sm font-semibold text-[var(--ls-text-primary)]">${title}</p>
                      <p class="mt-1 text-sm text-[var(--ls-text-secondary)]">${body}</p>
                    </div>
                  `,
                )
                .join("")}
            </div>
          </div>
          <div class="panel rounded-[24px] p-5">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Shortlisting timeline</p>
            <div class="mt-4 space-y-3">
              <div class="rounded-2xl bg-[var(--ls-surface-2)] p-4 text-sm text-[var(--ls-text-primary)]">Most organisations begin first-pass review within <span class="mono">3</span> to <span class="mono">5</span> business days.</div>
              <div class="rounded-2xl bg-[var(--ls-surface-2)] p-4 text-sm text-[var(--ls-text-primary)]">If shortlisted, interview scheduling will appear inside the tracker with reminder notifications.</div>
            </div>
          </div>
        </div>
        <div class="space-y-4">
          <div class="panel rounded-[24px] p-5">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Actions</p>
            <div class="mt-4 flex flex-col gap-3">
              <button class="focus-ring min-h-[44px] rounded-xl bg-[var(--ls-accent)] px-4 py-2 text-sm font-semibold text-white">Track application</button>
              <button class="focus-ring min-h-[44px] rounded-xl border border-[var(--ls-border)] px-4 py-2 text-sm text-[var(--ls-text-primary)]">View submitted documents</button>
              <button class="focus-ring min-h-[44px] rounded-xl border border-[var(--ls-border)] px-4 py-2 text-sm text-[var(--ls-text-primary)]">Browse more internships</button>
            </div>
          </div>
          <div class="panel rounded-[24px] p-5" aria-live="polite">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">LegalGPT India follow-up</p>
            <div class="mt-4 rounded-2xl bg-[var(--ls-surface-2)] p-4 text-sm text-[var(--ls-text-primary)]">AI can now help tailor your next application, refine a cover note, or generate mock interview questions if this internship progresses.</div>
          </div>
        </div>
      </section>
    `,
    states: {
      emptyTitle: "No application record found",
      emptyBody: "The confirmation record is unavailable. Reopen the internship or tracker to continue.",
      emptyJson: '{ "application": null, "status": null }',
      errorText: "application confirmation could not be loaded",
      offlineText: "Offline · Showing cached application confirmation from 5m ago",
    },
    accessibilityMobile: "<li>The success state pairs icon, heading, and application ID so confirmation remains clear even when notifications are delayed.</li>",
    accessibilityDesktop: "<li>Tracking, submitted-documents, and browse-more actions are separated so students do not confuse follow-up paths after submission.</li>",
  },
  {
    filename: "S-20-legal-pro.html",
    title: "Legal Sathi — My Applications Tracker",
    description: "Legal Pro student application tracker for internship submissions.",
    mobileActive: "Profile",
    desktopActive: "Research",
    mobileBanner: `
      <div class="sticky top-0 z-50 mb-4 rounded-xl border border-[#D97706] bg-[#FEF3C7] px-4 py-2.5" role="alert" aria-live="assertive">
        <div class="flex items-center justify-between gap-4">
          <p class="text-sm text-[#92400E]">Offline · Showing cached internship statuses from <time class="mono">5m</time> ago</p>
          <button class="focus-ring min-h-[44px] text-sm text-[#92400E] underline">Retry</button>
        </div>
      </div>
    `,
    desktopBanner: `
      <div class="sticky top-0 z-50 border-b border-[#D97706] bg-[#FEF3C7] px-6 py-3" role="alert" aria-live="assertive">
        <div class="mx-auto flex max-w-[1440px] items-center justify-between gap-4">
          <p class="text-sm text-[#92400E]">Offline tracker view · application updates are temporarily showing the last cached snapshot</p>
          <button class="focus-ring min-h-[44px] text-sm text-[#92400E] underline">Retry</button>
        </div>
      </div>
    `,
    mobile: `
      <section class="panel rounded-[24px] p-4 shadow-panel">
        <div class="flex items-start justify-between gap-3">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--ls-text-secondary)]">S-20 · Internship Hub</p>
            <h1 class="mt-2 text-2xl font-semibold text-[var(--ls-text-primary)]">My applications</h1>
            <p class="mt-2 text-sm text-[var(--ls-text-secondary)]">Track submitted internship applications, timelines, and recruiter actions in one place.</p>
          </div>
          <span class="rounded-full border border-[var(--ls-border)] px-3 py-1 font-mono text-xs text-[var(--ls-text-secondary)]">ACTIVE 06</span>
        </div>
      </section>
      <section class="grid gap-3 sm:grid-cols-3">
        ${[
          ["Submitted", "06", "03 under review"],
          ["Shortlisted", "02", "01 interview set"],
          ["Response time", "4d", "Average first update"],
        ]
          .map(
            ([label, value, meta]) => `
              <div class="panel rounded-[20px] p-4">
                <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">${label}</p>
                <p class="mt-3 font-mono text-2xl text-[var(--ls-text-primary)]">${value}</p>
                <p class="mt-2 text-xs text-[var(--ls-text-secondary)]">${meta}</p>
              </div>
            `,
          )
          .join("")}
      </section>
      <section class="panel rounded-[24px] p-4">
        <div class="flex flex-wrap gap-2">
          ${["All", "Submitted", "Under review", "Shortlisted", "Closed"].map((x, i) => `<button aria-label="${x}" class="focus-ring min-h-[44px] rounded-full ${i === 0 ? "bg-[var(--ls-accent)] text-white" : "border border-[var(--ls-border)] bg-[var(--ls-surface-2)] text-[var(--ls-text-secondary)]"} px-4 text-sm">${x}</button>`).join("")}
        </div>
        <div class="mt-4 space-y-3">
          ${[
            ["APP-KHC-2026-0418-017", "Khaitan & Co. · Corporate Internship · Mumbai", "Submitted 2d ago", "Submitted"],
            ["APP-TAZ-2026-0411-009", "Trilegal · Disputes Internship · Delhi", "Under review · 4d", "Under review"],
            ["APP-AZB-2026-0405-002", "AZB & Partners · M&A Internship", "Interview on 21 Apr 2026", "Shortlisted"],
          ]
            .map(
              ([id, org, meta, status]) => `
                <article class="rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] p-4">
                  <div class="flex items-start justify-between gap-3">
                    <div>
                      <p class="font-mono text-xs text-[var(--ls-accent-soft)]">${id}</p>
                      <h2 class="mt-2 text-sm font-semibold text-[var(--ls-text-primary)]">${org}</h2>
                      <p class="mt-1 text-xs text-[var(--ls-text-secondary)]">${meta}</p>
                    </div>
                    <span class="rounded-full px-3 py-1 font-mono text-xs ${
                      status === "Shortlisted"
                        ? "bg-[var(--ls-success)]/15 text-[#9AE6B4]"
                        : status === "Under review"
                        ? "bg-[var(--ls-accent)]/12 text-[var(--ls-accent-soft)]"
                        : "bg-[var(--ls-surface)] text-[var(--ls-text-secondary)]"
                    }">${status}</span>
                  </div>
                  <button aria-label="Open ${id}" class="focus-ring mt-3 min-h-[44px] w-full rounded-xl border border-[var(--ls-border)] px-4 py-2 text-sm text-[var(--ls-text-primary)]">View details</button>
                </article>
              `,
            )
            .join("")}
        </div>
      </section>
      <section class="panel rounded-[24px] p-4" aria-live="polite">
        <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">LegalGPT India follow-up</p>
        <div class="mt-3 rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] p-4">
          <p class="text-sm text-[var(--ls-text-primary)]">Generate a follow-up note or interview prep checklist for shortlisted roles.</p>
          <button aria-label="Generate application follow-up guidance" class="focus-ring mt-3 min-h-[44px] rounded-xl bg-[var(--ls-accent)] px-4 py-2 text-sm font-semibold text-white">Generate guidance</button>
        </div>
      </section>
    `,
    desktop: `
      <section class="panel rounded-[28px] p-6 shadow-float">
        <div class="flex items-start justify-between gap-6">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--ls-text-secondary)]">S-20 · My Applications Tracker</p>
            <h1 class="mt-2 text-3xl font-semibold text-[var(--ls-text-primary)]">Application operations board</h1>
            <p class="mt-3 max-w-3xl text-sm leading-6 text-[var(--ls-text-secondary)]">A denser student-facing tracker for submitted internships, response patterns, and next actions.</p>
          </div>
          ${commonChips}
        </div>
      </section>
      <section class="grid gap-4 md:grid-cols-4">
        ${[
          ["Applications", "06", "Total active"],
          ["Under review", "03", "Median age 4d"],
          ["Shortlisted", "02", "1 interview scheduled"],
          ["Closed", "01", "No response / rejected"],
        ]
          .map(
            ([label, value, meta]) => `
              <div class="panel rounded-[22px] p-4">
                <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">${label}</p>
                <p class="mt-3 font-mono text-2xl text-[var(--ls-text-primary)]">${value}</p>
                <p class="mt-2 text-xs text-[var(--ls-text-secondary)]">${meta}</p>
              </div>
            `,
          )
          .join("")}
      </section>
      <section class="grid gap-6 xl:grid-cols-[0.8fr,1.25fr,0.95fr]">
        <div class="space-y-4">
          <div class="panel rounded-[24px] p-5">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Filters</p>
            <div class="mt-4 space-y-3">
              ${[
                ["Status", "All, submitted, review, shortlisted"],
                ["City", "Mumbai, Delhi, Bengaluru"],
                ["Practice area", "Corporate, disputes, policy"],
                ["Timeline", "Last 30 days"],
              ]
                .map(
                  ([label, value]) => `
                    <div class="rounded-2xl bg-[var(--ls-surface-2)] p-4">
                      <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">${label}</p>
                      <p class="mt-2 text-sm text-[var(--ls-text-primary)]">${value}</p>
                    </div>
                  `,
                )
                .join("")}
            </div>
          </div>
          <div class="panel rounded-[24px] p-5" aria-live="polite">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">LegalGPT India</p>
            <div class="mt-4 rounded-2xl bg-[var(--ls-surface-2)] p-4 text-sm text-[var(--ls-text-primary)]">AI suggests preparing for the AZB interview first and sending a polite follow-up on the Trilegal submission after <span class="mono">48</span> more hours.</div>
          </div>
        </div>
        <div class="panel rounded-[24px] p-5">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Tracker table</p>
              <p class="mt-1 text-sm text-[var(--ls-text-primary)]">Current application activity</p>
            </div>
            <button aria-label="Sort applications by latest update" class="focus-ring min-h-[44px] rounded-xl border border-[var(--ls-border)] px-4 py-2 text-sm text-[var(--ls-text-primary)]">Latest update</button>
          </div>
          <div class="mt-4 overflow-x-auto">
            <table class="min-w-full border-separate border-spacing-y-2 text-left text-sm">
              <thead>
                <tr class="text-[var(--ls-text-secondary)]">
                  <th class="px-4 py-2 font-medium">Application</th>
                  <th class="px-4 py-2 font-medium">Firm</th>
                  <th class="px-4 py-2 font-medium">Status</th>
                  <th class="px-4 py-2 font-medium">Age</th>
                </tr>
              </thead>
              <tbody>
                ${[
                  ["APP-KHC-2026-0418-017", "Khaitan & Co.", "Submitted", "2d"],
                  ["APP-TAZ-2026-0411-009", "Trilegal", "Under review", "4d"],
                  ["APP-AZB-2026-0405-002", "AZB & Partners", "Shortlisted", "13d"],
                ]
                  .map(
                    ([id, firm, status, age]) => `
                      <tr class="bg-[var(--ls-surface-2)]">
                        <td class="rounded-l-2xl px-4 py-3 font-mono text-[var(--ls-accent-soft)]">${id}</td>
                        <td class="px-4 py-3 text-[var(--ls-text-primary)]">${firm}</td>
                        <td class="px-4 py-3 text-[var(--ls-text-primary)]">${status}</td>
                        <td class="rounded-r-2xl px-4 py-3 font-mono text-[var(--ls-text-primary)]">${age}</td>
                      </tr>
                    `,
                  )
                  .join("")}
              </tbody>
            </table>
          </div>
        </div>
        <div class="space-y-4">
          <div class="panel rounded-[24px] p-5">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Upcoming actions</p>
            <div class="mt-4 space-y-3">
              <div class="rounded-2xl bg-[var(--ls-surface-2)] p-4 text-sm text-[var(--ls-text-primary)]">Mock interview prep for AZB shortlisted round due by <time class="mono">20 Apr 2026</time>.</div>
              <div class="rounded-2xl bg-[var(--ls-surface-2)] p-4 text-sm text-[var(--ls-text-primary)]">Trilegal follow-up recommended if no update arrives by <time class="mono">22 Apr 2026</time>.</div>
            </div>
          </div>
          <div class="panel rounded-[24px] p-5">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Sync note</p>
            <div class="mt-4 rounded-2xl bg-[var(--ls-surface-2)] p-4 text-sm text-[var(--ls-text-primary)]">Offline tracker mode preserves the last known application state until connectivity restores.</div>
          </div>
        </div>
      </section>
    `,
    states: {
      emptyTitle: "No applications submitted",
      emptyBody: "Apply to an internship to start building your application tracker.",
      emptyJson: '{ "applications": [], "total": 0 }',
      errorText: "application tracker could not be loaded",
      offlineText: "Offline · Showing cached application tracker from 5m ago",
    },
    accessibilityMobile: "<li>Status tabs and application cards combine text labels with clear badges so application state does not rely on color alone.</li>",
    accessibilityDesktop: "<li>The tracker table uses stable columns for status and age so repeated scans stay efficient for keyboard and screen reader users.</li>",
  },
  {
    filename: "S-21-legal-pro.html",
    title: "Legal Sathi — Application Detail and Status",
    description: "Legal Pro application detail screen for a single internship submission.",
    mobileActive: "Profile",
    desktopActive: "Research",
    mobile: `
      <section class="panel rounded-[24px] p-4 shadow-panel">
        <div class="flex items-start justify-between gap-3">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--ls-text-secondary)]">S-21 · Application detail</p>
            <h1 class="mt-2 text-2xl font-semibold text-[var(--ls-text-primary)]">Khaitan & Co. application</h1>
            <p class="mt-2 text-sm text-[var(--ls-text-secondary)]">Corporate Internship · Mumbai</p>
          </div>
          <span class="rounded-full bg-[var(--ls-accent)]/12 px-3 py-1 font-mono text-xs text-[var(--ls-accent-soft)]">UNDER REVIEW</span>
        </div>
      </section>
      <section class="grid gap-3 sm:grid-cols-3">
        ${[
          ["Application ID", "APP-KHC-2026-0418-017", "Snapshot saved"],
          ["Submitted", "18 Apr 2026", "09:26 IST"],
          ["Expected review", "3-5d", "Typical cycle"],
        ]
          .map(
            ([label, value, meta]) => `
              <div class="panel rounded-[20px] p-4">
                <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">${label}</p>
                <p class="mt-3 font-mono text-sm text-[var(--ls-text-primary)]">${value}</p>
                <p class="mt-2 text-xs text-[var(--ls-text-secondary)]">${meta}</p>
              </div>
            `,
          )
          .join("")}
      </section>
      <section class="panel rounded-[24px] p-4">
        <p class="text-sm font-semibold text-[var(--ls-text-primary)]">Application timeline</p>
        <div class="mt-4 space-y-3">
          ${[
            ["18 Apr 2026 · 09:26", "Application submitted", "Resume, transcript, and cover note uploaded."],
            ["18 Apr 2026 · 09:27", "Tracker created", "Application status entry added to My Applications."],
            ["20 Apr 2026 · Pending", "Recruiter review expected", "Most firms begin first-pass review within 3 to 5 business days."],
          ]
            .map(
              ([time, title, body]) => `
                <div class="rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] p-4">
                  <p class="font-mono text-xs text-[var(--ls-accent-soft)]">${time}</p>
                  <p class="mt-2 text-sm font-semibold text-[var(--ls-text-primary)]">${title}</p>
                  <p class="mt-1 text-sm text-[var(--ls-text-secondary)]">${body}</p>
                </div>
              `,
            )
            .join("")}
        </div>
      </section>
      <section class="panel rounded-[24px] p-4">
        <p class="text-sm font-semibold text-[var(--ls-text-primary)]">Submitted documents</p>
        <div class="mt-4 space-y-3">
          ${[
            ["Resume.pdf", "Version 3 · ATS score 87"],
            ["Cover Note.docx", "Tailored for corporate team"],
            ["Transcript.pdf", "Semester VI attached"],
          ]
            .map(
              ([doc, meta]) => `
                <div class="flex items-center justify-between rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] px-4 py-3">
                  <div>
                    <p class="text-sm text-[var(--ls-text-primary)]">${doc}</p>
                    <p class="mt-1 text-xs text-[var(--ls-text-secondary)]">${meta}</p>
                  </div>
                  <button aria-label="Open ${doc}" class="focus-ring min-h-[44px] rounded-xl border border-[var(--ls-border)] px-4 py-2 text-xs text-[var(--ls-text-primary)]">Open</button>
                </div>
              `,
            )
            .join("")}
        </div>
      </section>
      <section class="panel rounded-[24px] p-4" aria-live="polite">
        <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">LegalGPT India interview prep</p>
        <div class="mt-3 rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] p-4">
          <p class="text-sm text-[var(--ls-text-primary)]">Prepare likely screening questions based on this firm, role, and your submitted profile.</p>
          <button aria-label="Generate interview prep" class="focus-ring mt-3 min-h-[44px] rounded-xl bg-[var(--ls-accent)] px-4 py-2 text-sm font-semibold text-white">Generate prep</button>
        </div>
      </section>
    `,
    desktop: `
      <section class="panel rounded-[28px] p-6 shadow-float">
        <div class="flex items-start justify-between gap-6">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--ls-text-secondary)]">S-21 · Application Detail & Status</p>
            <h1 class="mt-2 text-3xl font-semibold text-[var(--ls-text-primary)]">Single application workspace</h1>
            <p class="mt-3 max-w-3xl text-sm leading-6 text-[var(--ls-text-secondary)]">Focuses on one internship record with status, supporting documents, and interview readiness actions.</p>
          </div>
          ${commonChips}
        </div>
      </section>
      <section class="grid gap-6 xl:grid-cols-[0.82fr,1.18fr,0.95fr]">
        <div class="space-y-4">
          <div class="panel rounded-[24px] p-5">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Summary</p>
            <div class="mt-4 space-y-3 text-sm text-[var(--ls-text-secondary)]">
              <p>Firm: <span class="text-[var(--ls-text-primary)]">Khaitan & Co.</span></p>
              <p>Role: <span class="text-[var(--ls-text-primary)]">Corporate Internship · Mumbai</span></p>
              <p>ID: <span class="font-mono text-[var(--ls-accent-soft)]">APP-KHC-2026-0418-017</span></p>
              <p>Status: <span class="font-mono text-[var(--ls-accent-soft)]">UNDER REVIEW</span></p>
            </div>
          </div>
          <div class="panel rounded-[24px] p-5">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Documents</p>
            <div class="mt-4 space-y-3">
              ${[
                ["Resume.pdf", "ATS 87 · Submitted"],
                ["Cover Note.docx", "Tailored for M&A team"],
                ["Transcript.pdf", "Semester VI included"],
              ]
                .map(
                  ([doc, meta]) => `
                    <div class="rounded-2xl bg-[var(--ls-surface-2)] p-4">
                      <p class="text-sm text-[var(--ls-text-primary)]">${doc}</p>
                      <p class="mt-1 text-xs text-[var(--ls-text-secondary)]">${meta}</p>
                    </div>
                  `,
                )
                .join("")}
            </div>
          </div>
        </div>
        <div class="panel rounded-[24px] p-5">
          <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Status timeline</p>
          <div class="mt-4 space-y-3">
            ${[
              ["18 Apr 2026 · 09:26", "Application submitted", "Resume, cover note, and transcript uploaded to the organisation record."],
              ["18 Apr 2026 · 09:27", "Tracker created", "Application made visible in student tracker with notification hooks enabled."],
              ["Pending", "Recruiter review", "Recruiter has not yet changed the state; typical evaluation begins within 3 to 5 business days."],
            ]
              .map(
                ([time, title, body]) => `
                  <div class="rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] p-4">
                    <p class="font-mono text-xs text-[var(--ls-accent-soft)]">${time}</p>
                    <p class="mt-2 text-sm font-semibold text-[var(--ls-text-primary)]">${title}</p>
                    <p class="mt-1 text-sm text-[var(--ls-text-secondary)]">${body}</p>
                  </div>
                `,
              )
              .join("")}
          </div>
        </div>
        <div class="space-y-4">
          <div class="panel rounded-[24px] p-5" aria-live="polite">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">LegalGPT India</p>
            <div class="mt-4 space-y-3">
              <div class="rounded-2xl bg-[var(--ls-surface-2)] p-4 text-sm text-[var(--ls-text-primary)]">AI can generate a short follow-up note once the role crosses <span class="mono">5</span> days without status movement.</div>
              <div class="rounded-2xl bg-[var(--ls-surface-2)] p-4 text-sm text-[var(--ls-text-primary)]">Interview prep can be tailored to the firm’s corporate team, your resume, and your internship history.</div>
            </div>
            <button class="focus-ring mt-4 min-h-[44px] w-full rounded-xl bg-[var(--ls-accent)] px-4 py-2 text-sm font-semibold text-white">Generate interview prep</button>
          </div>
          <div class="panel rounded-[24px] p-5">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Action options</p>
            <div class="mt-4 flex flex-col gap-3">
              <button class="focus-ring min-h-[44px] rounded-xl border border-[var(--ls-border)] px-4 py-2 text-sm text-[var(--ls-text-primary)]">Open tracker</button>
              <button class="focus-ring min-h-[44px] rounded-xl border border-[var(--ls-border)] px-4 py-2 text-sm text-[var(--ls-text-primary)]">Download submitted packet</button>
              <button class="focus-ring min-h-[44px] rounded-xl border border-[var(--ls-border)] px-4 py-2 text-sm text-[var(--ls-text-primary)]">Browse similar roles</button>
            </div>
          </div>
        </div>
      </section>
    `,
    states: {
      emptyTitle: "No application detail found",
      emptyBody: "Return to My Applications and select an internship record to open full status details.",
      emptyJson: '{ "application": null, "timeline": [] }',
      errorText: "application detail could not be loaded",
      offlineText: "Offline · Showing cached application detail from 5m ago",
    },
    accessibilityMobile: "<li>Timeline entries separate time, action, and explanation so application changes remain understandable in assistive reading order.</li>",
    accessibilityDesktop: "<li>Summary, timeline, and AI prep are split into stable columns so attention can shift without losing the current application state.</li>",
  },
  {
    filename: "S-22-legal-pro.html",
    title: "Legal Sathi — Find a Tutor",
    description: "Legal Pro tutor discovery screen for students.",
    mobileActive: "Home",
    desktopActive: "Research",
    mobile: `
      <section class="panel rounded-[24px] p-4 shadow-panel">
        <div class="flex items-start justify-between gap-3">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--ls-text-secondary)]">S-22 · Tutor marketplace</p>
            <h1 class="mt-2 text-2xl font-semibold text-[var(--ls-text-primary)]">Find a tutor</h1>
            <p class="mt-2 text-sm text-[var(--ls-text-secondary)]">Browse tutors by subject, court competition, exam focus, rating, and availability.</p>
          </div>
          <button aria-label="Open tutor filters" class="focus-ring min-h-[44px] rounded-xl border border-[var(--ls-border)] px-4 py-2 text-sm text-[var(--ls-text-primary)]">Filters</button>
        </div>
      </section>
      <section class="panel rounded-[24px] p-4">
        <div class="rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] px-4 py-3">
          <p class="text-sm text-[var(--ls-text-secondary)]">Search “moot court coach”, “company law tutor”, or “AILET writing mentor”</p>
        </div>
        <div class="mt-3 flex flex-wrap gap-2">
          ${["Moot Court", "Corporate Law", "Hindi", "Weekend", "₹800-₹2,500"].map((x, i) => `<button aria-label="${x}" class="focus-ring min-h-[44px] rounded-full ${i === 0 ? "bg-[var(--ls-accent)] text-white" : "border border-[var(--ls-border)] bg-[var(--ls-surface-2)] text-[var(--ls-text-secondary)]"} px-4 text-sm">${x}</button>`).join("")}
        </div>
      </section>
      <section class="space-y-3">
        ${[
          ["Prof. Ayesha Khan", "Moot court strategy · Constitutional law", "4.9", "₹1,800 / 45 min", "Next slot today 18:30"],
          ["Adv. Rohan Sethi", "Company law and contracts", "4.8", "₹2,200 / 60 min", "Tomorrow 10:00"],
          ["Neha Mukherjee", "CLAT / AILET writing", "4.7", "₹1,200 / 45 min", "Sat 14:00"],
        ]
          .map(
            ([name, subject, rating, fee, slot]) => `
              <article class="panel rounded-[24px] p-4">
                <div class="flex items-start justify-between gap-3">
                  <div>
                    <h2 class="text-base font-semibold text-[var(--ls-text-primary)]">${name}</h2>
                    <p class="mt-1 text-sm text-[var(--ls-text-secondary)]">${subject}</p>
                    <p class="mt-2 font-mono text-xs text-[var(--ls-accent-soft)]">RATING ${rating} · ${slot}</p>
                  </div>
                  <span class="rounded-full bg-[var(--ls-success)]/15 px-3 py-1 font-mono text-xs text-[#9AE6B4]">OPEN</span>
                </div>
                <div class="mt-4 flex items-center justify-between">
                  <p class="font-mono text-sm text-[var(--ls-text-primary)]">${fee}</p>
                  <button aria-label="View tutor profile for ${name}" class="focus-ring min-h-[44px] rounded-xl bg-[var(--ls-accent)] px-4 py-2 text-sm font-semibold text-white">View</button>
                </div>
              </article>
            `,
          )
          .join("")}
      </section>
    `,
    desktop: `
      <section class="panel rounded-[28px] p-6 shadow-float">
        <div class="flex items-start justify-between gap-6">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--ls-text-secondary)]">S-22 · Find a Tutor</p>
            <h1 class="mt-2 text-3xl font-semibold text-[var(--ls-text-primary)]">Tutor discovery board</h1>
            <p class="mt-3 max-w-3xl text-sm leading-6 text-[var(--ls-text-secondary)]">A discovery-first layout for law tutors with strong filters, ratings, fees, and slot availability.</p>
          </div>
          ${commonChips}
        </div>
      </section>
      <section class="grid gap-6 xl:grid-cols-[0.82fr,1.2fr,0.98fr]">
        <div class="space-y-4">
          <div class="panel rounded-[24px] p-5">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Filters</p>
            <div class="mt-4 space-y-3">
              ${[
                ["Focus", "Moot court, contracts, CLAT writing"],
                ["Language", "English, Hindi"],
                ["Availability", "Today, weekend"],
                ["Budget", "₹800 to ₹2,500"],
              ]
                .map(
                  ([label, value]) => `
                    <div class="rounded-2xl bg-[var(--ls-surface-2)] p-4">
                      <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">${label}</p>
                      <p class="mt-2 text-sm text-[var(--ls-text-primary)]">${value}</p>
                    </div>
                  `,
                )
                .join("")}
            </div>
          </div>
        </div>
        <div class="panel rounded-[24px] p-5">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Results</p>
              <p class="mt-1 text-sm text-[var(--ls-text-primary)]"><span class="mono">18</span> tutors matched</p>
            </div>
            <button aria-label="Sort tutors by best fit" class="focus-ring min-h-[44px] rounded-xl border border-[var(--ls-border)] px-4 py-2 text-sm text-[var(--ls-text-primary)]">Best fit</button>
          </div>
          <div class="mt-4 space-y-3">
            ${[
              ["Prof. Ayesha Khan", "Moot court strategy · Constitutional law", "4.9", "₹1,800 / 45 min", "Today 18:30"],
              ["Adv. Rohan Sethi", "Company law and contracts", "4.8", "₹2,200 / 60 min", "Tomorrow 10:00"],
              ["Neha Mukherjee", "CLAT / AILET writing", "4.7", "₹1,200 / 45 min", "Sat 14:00"],
            ]
              .map(
                ([name, subject, rating, fee, slot]) => `
                  <article class="rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] p-4">
                    <div class="flex items-start justify-between gap-3">
                      <div>
                        <h2 class="text-base font-semibold text-[var(--ls-text-primary)]">${name}</h2>
                        <p class="mt-1 text-sm text-[var(--ls-text-secondary)]">${subject}</p>
                        <p class="mt-2 font-mono text-xs text-[var(--ls-accent-soft)]">RATING ${rating} · NEXT ${slot}</p>
                      </div>
                      <p class="font-mono text-sm text-[var(--ls-text-primary)]">${fee}</p>
                    </div>
                    <div class="mt-4 flex gap-2">
                      <button class="focus-ring min-h-[44px] rounded-xl border border-[var(--ls-border)] px-4 py-2 text-sm text-[var(--ls-text-primary)]">Preview</button>
                      <button aria-label="Open tutor profile for ${name}" class="focus-ring min-h-[44px] rounded-xl bg-[var(--ls-accent)] px-4 py-2 text-sm font-semibold text-white">Open profile</button>
                    </div>
                  </article>
                `,
              )
              .join("")}
          </div>
        </div>
        <div class="space-y-4">
          <div class="panel rounded-[24px] p-5" aria-live="polite">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Selection helper</p>
            <div class="mt-4 rounded-2xl bg-[var(--ls-surface-2)] p-4 text-sm text-[var(--ls-text-primary)]">LegalGPT India can help match you to a tutor based on moot format, subject comfort, and language preference.</div>
          </div>
          <div class="panel rounded-[24px] p-5">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">High-demand signals</p>
            <div class="mt-4 space-y-3">
              <div class="rounded-2xl bg-[var(--ls-surface-2)] p-4 text-sm text-[var(--ls-text-primary)]">Moot court tutors with constitutional-law depth are most booked this week.</div>
              <div class="rounded-2xl bg-[var(--ls-surface-2)] p-4 text-sm text-[var(--ls-text-primary)]">Weekend slots between <span class="mono">14:00</span> and <span class="mono">18:00</span> fill fastest.</div>
            </div>
          </div>
        </div>
      </section>
    `,
    states: {
      emptyTitle: "No tutors matched",
      emptyBody: "Broaden subject, availability, or budget filters to discover more tutors.",
      emptyJson: '{ "tutors": [], "filters": { "subject": "Moot Court" } }',
      errorText: "tutor results could not be loaded",
      offlineText: "Offline · Showing cached tutor results from 5m ago",
    },
    accessibilityMobile: "<li>Tutor cards keep fee, rating, and next-slot details in consistent positions so comparisons remain fast on small screens.</li>",
    accessibilityDesktop: "<li>Filter, results, and helper panels are separated so students can compare tutors without losing search context.</li>",
  },
  {
    filename: "S-23-legal-pro.html",
    title: "Legal Sathi — Tutor Profile",
    description: "Legal Pro tutor profile detail screen for students.",
    mobileActive: "Home",
    desktopActive: "Research",
    mobile: `
      <section class="panel rounded-[24px] p-4 shadow-panel">
        <div class="flex items-start justify-between gap-3">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--ls-text-secondary)]">S-23 · Tutor detail</p>
            <h1 class="mt-2 text-2xl font-semibold text-[var(--ls-text-primary)]">Prof. Ayesha Khan</h1>
            <p class="mt-2 text-sm text-[var(--ls-text-secondary)]">Moot court strategy · Constitutional law · <span class="mono">4.9</span> rating</p>
          </div>
          <span class="rounded-full bg-[var(--ls-success)]/15 px-3 py-1 font-mono text-xs text-[#9AE6B4]">OPEN</span>
        </div>
      </section>
      <section class="grid gap-3 sm:grid-cols-3">
        ${[
          ["Fee", "₹1,800", "Per 45 min"],
          ["Sessions", "240+", "Completed"],
          ["Response time", "2h", "Average"],
        ]
          .map(
            ([label, value, meta]) => `
              <div class="panel rounded-[20px] p-4">
                <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">${label}</p>
                <p class="mt-3 font-mono text-2xl text-[var(--ls-text-primary)]">${value}</p>
                <p class="mt-2 text-xs text-[var(--ls-text-secondary)]">${meta}</p>
              </div>
            `,
          )
          .join("")}
      </section>
      <section class="panel rounded-[24px] p-4">
        <p class="text-sm font-semibold text-[var(--ls-text-primary)]">About</p>
        <div class="mt-3 rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] p-4 text-sm leading-6 text-[var(--ls-text-primary)]">National moot coach with experience training teams for constitutional, arbitration, and public international law competitions. Focuses on oral structuring, bench control, and rebuttal agility.</div>
      </section>
      <section class="panel rounded-[24px] p-4">
        <p class="text-sm font-semibold text-[var(--ls-text-primary)]">Specialisations</p>
        <div class="mt-3 flex flex-wrap gap-2">
          ${["Constitutional Moots", "Bench Question Drills", "Memorial Review", "Hindi + English Coaching"].map((x) => `<span class="rounded-full border border-[var(--ls-border)] px-4 py-2 text-sm text-[var(--ls-text-primary)]">${x}</span>`).join("")}
        </div>
      </section>
      <section class="panel rounded-[24px] p-4">
        <p class="text-sm font-semibold text-[var(--ls-text-primary)]">Recent reviews</p>
        <div class="mt-4 space-y-3">
          ${[
            ["“Helped me sharpen rebuttals before the quarter-finals.”", "Ananya · NLU Delhi"],
            ["“Very strong on bench interruptions and oral recovery.”", "Ritvik · JGLS"],
          ]
            .map(
              ([quote, who]) => `
                <div class="rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] p-4">
                  <p class="text-sm text-[var(--ls-text-primary)]">${quote}</p>
                  <p class="mt-2 font-mono text-xs text-[var(--ls-text-secondary)]">${who}</p>
                </div>
              `,
            )
            .join("")}
        </div>
        <button aria-label="Book a session with Prof. Ayesha Khan" class="focus-ring mt-4 min-h-[44px] w-full rounded-xl bg-[var(--ls-accent)] px-4 py-3 text-sm font-semibold text-white">Book session</button>
      </section>
    `,
    desktop: `
      <section class="panel rounded-[28px] p-6 shadow-float">
        <div class="flex items-start justify-between gap-6">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--ls-text-secondary)]">S-23 · Tutor Profile</p>
            <h1 class="mt-2 text-3xl font-semibold text-[var(--ls-text-primary)]">Tutor detail and trust surface</h1>
            <p class="mt-3 max-w-3xl text-sm leading-6 text-[var(--ls-text-secondary)]">Structured to show credibility, specialisation, and booking readiness without overloading the student.</p>
          </div>
          ${commonChips}
        </div>
      </section>
      <section class="grid gap-6 xl:grid-cols-[0.85fr,1.15fr,0.9fr]">
        <div class="space-y-4">
          <div class="panel rounded-[24px] p-5">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Profile summary</p>
            <h2 class="mt-2 text-xl font-semibold text-[var(--ls-text-primary)]">Prof. Ayesha Khan</h2>
            <p class="mt-2 text-sm text-[var(--ls-text-secondary)]">Moot court strategy · Constitutional law</p>
            <div class="mt-4 space-y-3 text-sm text-[var(--ls-text-secondary)]">
              <p>Rating: <span class="font-mono text-[var(--ls-accent-soft)]">4.9</span></p>
              <p>Fee: <span class="font-mono text-[var(--ls-accent-soft)]">₹1,800 / 45 min</span></p>
              <p>Sessions completed: <span class="font-mono text-[var(--ls-accent-soft)]">240+</span></p>
              <p>Next open slot: <span class="font-mono text-[var(--ls-accent-soft)]">Today 18:30</span></p>
            </div>
          </div>
          <div class="panel rounded-[24px] p-5">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Languages and focus</p>
            <div class="mt-4 flex flex-wrap gap-2">
              ${["English", "Hindi", "Constitutional Moots", "Bench Question Drills", "Memorial Review"].map((x) => `<span class="rounded-full border border-[var(--ls-border)] px-4 py-2 text-sm text-[var(--ls-text-primary)]">${x}</span>`).join("")}
            </div>
          </div>
        </div>
        <div class="space-y-4">
          <div class="panel rounded-[24px] p-5">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">About and approach</p>
            <div class="mt-4 rounded-2xl bg-[var(--ls-surface-2)] p-4 text-sm leading-7 text-[var(--ls-text-primary)]">National moot coach with extensive experience training constitutional, arbitration, and public international law teams. Sessions focus on oral argument flow, answer compression, bench interruption handling, and memorial coherence.</div>
          </div>
          <div class="panel rounded-[24px] p-5">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Reviews</p>
            <div class="mt-4 space-y-3">
              ${[
                ["“Helped me sharpen rebuttals before quarter-finals.”", "Ananya · NLU Delhi"],
                ["“Excellent at turning weak answers into structured oral responses.”", "Ritvik · JGLS"],
                ["“Useful for bilingual practice before memorial submissions.”", "Megha · GNLU"],
              ]
                .map(
                  ([quote, who]) => `
                    <div class="rounded-2xl bg-[var(--ls-surface-2)] p-4">
                      <p class="text-sm text-[var(--ls-text-primary)]">${quote}</p>
                      <p class="mt-2 font-mono text-xs text-[var(--ls-text-secondary)]">${who}</p>
                    </div>
                  `,
                )
                .join("")}
            </div>
          </div>
        </div>
        <div class="space-y-4">
          <div class="panel rounded-[24px] p-5">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Booking CTA</p>
            <div class="mt-4 space-y-3">
              <div class="rounded-2xl bg-[var(--ls-surface-2)] p-4 text-sm text-[var(--ls-text-primary)]">Best for: oral rounds, rebuttals, memorial review, and timed answer drills.</div>
              <div class="rounded-2xl bg-[var(--ls-surface-2)] p-4 text-sm text-[var(--ls-text-primary)]">Next available slot: <span class="font-mono text-[var(--ls-accent-soft)]">Today 18:30</span></div>
            </div>
            <button class="focus-ring mt-4 min-h-[44px] w-full rounded-xl bg-[var(--ls-accent)] px-4 py-3 text-sm font-semibold text-white">Book session</button>
          </div>
          <div class="panel rounded-[24px] p-5" aria-live="polite">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">LegalGPT India helper</p>
            <div class="mt-4 rounded-2xl bg-[var(--ls-surface-2)] p-4 text-sm text-[var(--ls-text-primary)]">AI can suggest whether this tutor is the best fit for oral advocacy, memorial editing, or interview writing practice based on your study goals.</div>
          </div>
        </div>
      </section>
    `,
    states: {
      emptyTitle: "No tutor profile available",
      emptyBody: "Return to tutor browse and select a tutor to view complete profile details.",
      emptyJson: '{ "tutor": null, "reviews": [] }',
      errorText: "tutor profile could not be loaded",
      offlineText: "Offline · Showing cached tutor profile from 5m ago",
    },
    accessibilityMobile: "<li>Reviews, specialisations, and the main booking CTA are kept in separate blocks so students can quickly understand tutor fit before acting.</li>",
    accessibilityDesktop: "<li>Trust information and booking cues are grouped but separated from reviews so comparisons stay readable for assistive technology users.</li>",
  },
  {
    filename: "S-24a-legal-pro.html",
    title: "Legal Sathi — Book Session Date and Time",
    description: "Legal Pro tutor booking date and time selection screen.",
    mobileActive: "Calendar",
    desktopActive: "Calendar",
    mobileBanner: `
      <div class="sticky top-0 z-50 mb-4 rounded-xl border border-[#D97706] bg-[#FEF3C7] px-4 py-2.5" role="alert" aria-live="assertive">
        <div class="flex items-center justify-between gap-4">
          <p class="text-sm text-[#92400E]">Offline · Tutor sessions can be reserved locally, but payment confirmation waits until you’re back online</p>
          <button class="focus-ring min-h-[44px] text-sm text-[#92400E] underline">Retry</button>
        </div>
      </div>
    `,
    desktopBanner: `
      <div class="sticky top-0 z-50 border-b border-[#D97706] bg-[#FEF3C7] px-6 py-3" role="alert" aria-live="assertive">
        <div class="mx-auto flex max-w-[1440px] items-center justify-between gap-4">
          <p class="text-sm text-[#92400E]">Offline booking mode · slot selection is cached locally and will require connectivity for final payment confirmation</p>
          <button class="focus-ring min-h-[44px] text-sm text-[#92400E] underline">Retry</button>
        </div>
      </div>
    `,
    mobile: `
      <section class="panel rounded-[24px] p-4 shadow-panel">
        <div class="flex items-start justify-between gap-3">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--ls-text-secondary)]">S-24a · Tutor booking</p>
            <h1 class="mt-2 text-2xl font-semibold text-[var(--ls-text-primary)]">Choose date and time</h1>
            <p class="mt-2 text-sm text-[var(--ls-text-secondary)]">Pick a session slot with Prof. Ayesha Khan.</p>
          </div>
          <span class="rounded-full bg-[var(--ls-success)]/15 px-3 py-1 font-mono text-xs text-[#9AE6B4]">OPEN</span>
        </div>
      </section>
      <section class="panel rounded-[24px] p-4">
        <div class="rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] p-4">
          <p class="text-base font-semibold text-[var(--ls-text-primary)]">Prof. Ayesha Khan</p>
          <p class="mt-1 text-sm text-[var(--ls-text-secondary)]">Moot court strategy · ₹1,800 / 45 min</p>
        </div>
        <div class="mt-4 grid grid-cols-3 gap-3">
          ${["30 min", "45 min", "60 min"].map((x, i) => `<button aria-label="${x}" class="focus-ring min-h-[44px] rounded-xl ${i === 1 ? "bg-[var(--ls-accent)] text-white" : "border border-[var(--ls-border)] bg-[var(--ls-surface-2)] text-[var(--ls-text-secondary)]"} text-sm">${x}</button>`).join("")}
        </div>
        <div class="mt-4 grid grid-cols-4 gap-3">
          ${["18", "19", "20", "21"].map((d, i) => `<button aria-label="Select April ${d}" class="focus-ring min-h-[52px] rounded-2xl ${i === 0 ? "bg-[var(--ls-accent)] text-white" : "border border-[var(--ls-border)] bg-[var(--ls-surface-2)] text-[var(--ls-text-secondary)]"} font-mono">${d}</button>`).join("")}
        </div>
        <div class="mt-4 grid grid-cols-2 gap-3">
          ${["16:00", "17:00", "18:30", "19:15", "20:00", "20:30"].map((slot, i) => `<button aria-label="Select ${slot}" class="focus-ring min-h-[44px] rounded-xl ${i === 2 ? "bg-[var(--ls-accent)] text-white" : "border border-[var(--ls-border)] bg-[var(--ls-surface-2)] text-[var(--ls-text-secondary)]"} font-mono text-sm">${slot}</button>`).join("")}
        </div>
      </section>
      <section class="panel rounded-[24px] p-4">
        <p class="text-sm font-semibold text-[var(--ls-text-primary)]">Price summary</p>
        <div class="mt-4 space-y-2 text-sm text-[var(--ls-text-secondary)]">
          <div class="flex items-center justify-between"><span>Session fee</span><span class="font-mono text-[var(--ls-text-primary)]">₹1,800</span></div>
          <div class="flex items-center justify-between"><span>Selected slot</span><span class="font-mono text-[var(--ls-text-primary)]">18 Apr 2026 · 18:30</span></div>
        </div>
        <button aria-label="Continue to tutor booking payment" class="focus-ring mt-4 min-h-[44px] w-full rounded-xl bg-[var(--ls-accent)] px-4 py-3 text-sm font-semibold text-white">Continue to payment</button>
      </section>
    `,
    desktop: `
      <section class="panel rounded-[28px] p-6 shadow-float">
        <div class="flex items-start justify-between gap-6">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--ls-text-secondary)]">S-24a · Book Session Date & Time</p>
            <h1 class="mt-2 text-3xl font-semibold text-[var(--ls-text-primary)]">Tutor slot scheduler</h1>
            <p class="mt-3 max-w-3xl text-sm leading-6 text-[var(--ls-text-secondary)]">Focused on slot clarity, duration choice, and lightweight price confirmation before payment.</p>
          </div>
          ${commonChips}
        </div>
      </section>
      <section class="grid gap-6 xl:grid-cols-[1.05fr,0.95fr,0.85fr]">
        <div class="panel rounded-[24px] p-5">
          <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Calendar and duration</p>
          <div class="mt-4 grid gap-4 md:grid-cols-2">
            <div class="rounded-2xl bg-[var(--ls-surface-2)] p-4">
              <p class="text-sm font-semibold text-[var(--ls-text-primary)]">Duration</p>
              <div class="mt-3 grid grid-cols-3 gap-3">
                ${["30 min", "45 min", "60 min"].map((x, i) => `<button aria-label="${x}" class="focus-ring min-h-[44px] rounded-xl ${i === 1 ? "bg-[var(--ls-accent)] text-white" : "border border-[var(--ls-border)] bg-[var(--ls-surface)] text-[var(--ls-text-secondary)]"} text-sm">${x}</button>`).join("")}
              </div>
            </div>
            <div class="rounded-2xl bg-[var(--ls-surface-2)] p-4">
              <p class="text-sm font-semibold text-[var(--ls-text-primary)]">Selected date</p>
              <div class="mt-3 grid grid-cols-4 gap-3">
                ${["18", "19", "20", "21"].map((d, i) => `<button aria-label="Select April ${d}" class="focus-ring min-h-[52px] rounded-2xl ${i === 0 ? "bg-[var(--ls-accent)] text-white" : "border border-[var(--ls-border)] bg-[var(--ls-surface)] text-[var(--ls-text-secondary)]"} font-mono">${d}</button>`).join("")}
              </div>
            </div>
          </div>
          <div class="mt-4 rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] p-4">
            <p class="text-sm font-semibold text-[var(--ls-text-primary)]">Available slots</p>
            <div class="mt-3 grid grid-cols-3 gap-3">
              ${["16:00", "17:00", "18:30", "19:15", "20:00", "20:30"].map((slot, i) => `<button aria-label="Select ${slot}" class="focus-ring min-h-[44px] rounded-xl ${i === 2 ? "bg-[var(--ls-accent)] text-white" : "border border-[var(--ls-border)] bg-[var(--ls-surface)] text-[var(--ls-text-secondary)]"} font-mono text-sm">${slot}</button>`).join("")}
            </div>
          </div>
        </div>
        <div class="space-y-4">
          <div class="panel rounded-[24px] p-5">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Tutor summary</p>
            <div class="mt-4 rounded-2xl bg-[var(--ls-surface-2)] p-4">
              <p class="text-base font-semibold text-[var(--ls-text-primary)]">Prof. Ayesha Khan</p>
              <p class="mt-1 text-sm text-[var(--ls-text-secondary)]">Moot court strategy · Constitutional law</p>
              <p class="mt-2 font-mono text-sm text-[var(--ls-accent-soft)]">₹1,800 / 45 min</p>
            </div>
          </div>
          <div class="panel rounded-[24px] p-5">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Offline booking policy</p>
            <div class="mt-4 rounded-2xl bg-[var(--ls-surface-2)] p-4 text-sm text-[var(--ls-text-primary)]">Slot intent can be stored offline, but final payment and confirmed booking happen only after connectivity returns.</div>
          </div>
        </div>
        <div class="space-y-4">
          <div class="panel rounded-[24px] p-5">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Summary</p>
            <div class="mt-4 space-y-2 text-sm text-[var(--ls-text-secondary)]">
              <div class="flex items-center justify-between"><span>Session fee</span><span class="font-mono text-[var(--ls-text-primary)]">₹1,800</span></div>
              <div class="flex items-center justify-between"><span>Date</span><span class="font-mono text-[var(--ls-text-primary)]">18 Apr 2026</span></div>
              <div class="flex items-center justify-between"><span>Time</span><span class="font-mono text-[var(--ls-text-primary)]">18:30</span></div>
            </div>
            <button class="focus-ring mt-4 min-h-[44px] w-full rounded-xl bg-[var(--ls-accent)] px-4 py-3 text-sm font-semibold text-white">Continue to payment</button>
          </div>
        </div>
      </section>
    `,
    states: {
      emptyTitle: "No tutor slots available",
      emptyBody: "Choose another date or another tutor to continue booking.",
      emptyJson: '{ "date": "2026-04-18", "slots": [] }',
      errorText: "tutor slots could not be loaded",
      offlineText: "Offline · Showing cached tutor slot availability from 5m ago",
    },
    accessibilityMobile: "<li>Date and time selection buttons stay evenly sized so tap confidence remains high while navigating booking choices.</li>",
    accessibilityDesktop: "<li>Calendar, tutor context, and pricing are split across columns so scheduling mistakes are easier to catch before payment.</li>",
  },
  {
    filename: "S-24b-legal-pro.html",
    title: "Legal Sathi — Book Session Payment",
    description: "Legal Pro tutor booking payment confirmation screen.",
    mobileActive: "Calendar",
    desktopActive: "Calendar",
    mobile: `
      <section class="panel rounded-[24px] p-4 shadow-panel">
        <div class="flex items-start justify-between gap-3">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--ls-text-secondary)]">S-24b · Tutor booking payment</p>
            <h1 class="mt-2 text-2xl font-semibold text-[var(--ls-text-primary)]">Confirm payment</h1>
            <p class="mt-2 text-sm text-[var(--ls-text-secondary)]">Review the booking summary and complete payment to secure the session.</p>
          </div>
          <span class="rounded-full bg-[var(--ls-accent)]/12 px-3 py-1 font-mono text-xs text-[var(--ls-accent-soft)]">READY</span>
        </div>
      </section>
      <section class="panel rounded-[24px] p-4">
        <p class="text-sm font-semibold text-[var(--ls-text-primary)]">Order summary</p>
        <div class="mt-4 space-y-2 text-sm text-[var(--ls-text-secondary)]">
          <div class="flex items-center justify-between"><span>Tutor</span><span class="text-[var(--ls-text-primary)]">Prof. Ayesha Khan</span></div>
          <div class="flex items-center justify-between"><span>Session</span><span class="font-mono text-[var(--ls-text-primary)]">18 Apr 2026 · 18:30</span></div>
          <div class="flex items-center justify-between"><span>Duration</span><span class="font-mono text-[var(--ls-text-primary)]">45 min</span></div>
          <div class="flex items-center justify-between"><span>Fee</span><span class="font-mono text-[var(--ls-text-primary)]">₹1,800</span></div>
          <div class="flex items-center justify-between"><span>Coupon</span><span class="font-mono text-[var(--ls-success)]">-₹200</span></div>
          <div class="flex items-center justify-between border-t border-[var(--ls-border)] pt-2"><span>Total</span><span class="font-mono text-[var(--ls-accent-soft)]">₹1,600</span></div>
        </div>
      </section>
      <section class="panel rounded-[24px] p-4">
        <p class="text-sm font-semibold text-[var(--ls-text-primary)]">Payment method</p>
        <div class="mt-4 space-y-3">
          ${["UPI", "Card", "NetBanking"].map((x, i) => `<button aria-label="${x}" class="focus-ring flex min-h-[44px] w-full items-center justify-between rounded-xl ${i === 0 ? "bg-[var(--ls-accent)] text-white" : "border border-[var(--ls-border)] bg-[var(--ls-surface-2)] text-[var(--ls-text-primary)]"} px-4 text-sm"><span>${x}</span><span class="font-mono text-xs">${i === 0 ? "SELECTED" : "↵"}</span></button>`).join("")}
        </div>
        <div class="mt-4 rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] px-4 py-3">
          <p class="text-sm text-[var(--ls-text-secondary)]">Coupon code</p>
          <p class="mt-2 font-mono text-sm text-[var(--ls-text-primary)]">MOOT200</p>
        </div>
        <button aria-label="Pay now for tutor booking" class="focus-ring mt-4 min-h-[44px] w-full rounded-xl bg-[var(--ls-accent)] px-4 py-3 text-sm font-semibold text-white">Pay now</button>
      </section>
      <section class="panel rounded-[24px] p-4" aria-live="polite">
        <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Booking note</p>
        <div class="mt-3 rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] p-4 text-sm text-[var(--ls-text-primary)]">Agora access tokens will be issued only after payment webhook confirmation and booking lock-in.</div>
      </section>
    `,
    desktop: `
      <section class="panel rounded-[28px] p-6 shadow-float">
        <div class="flex items-start justify-between gap-6">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--ls-text-secondary)]">S-24b · Book Session Payment</p>
            <h1 class="mt-2 text-3xl font-semibold text-[var(--ls-text-primary)]">Tutor payment confirmation</h1>
            <p class="mt-3 max-w-3xl text-sm leading-6 text-[var(--ls-text-secondary)]">Combines order summary, payment method choice, and booking constraints before payment is executed.</p>
          </div>
          ${commonChips}
        </div>
      </section>
      <section class="grid gap-6 xl:grid-cols-[1.05fr,0.95fr,0.85fr]">
        <div class="panel rounded-[24px] p-5">
          <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Order summary</p>
          <div class="mt-4 rounded-2xl bg-[var(--ls-surface-2)] p-4">
            <div class="space-y-2 text-sm text-[var(--ls-text-secondary)]">
              <div class="flex items-center justify-between"><span>Tutor</span><span class="text-[var(--ls-text-primary)]">Prof. Ayesha Khan</span></div>
              <div class="flex items-center justify-between"><span>Session</span><span class="font-mono text-[var(--ls-text-primary)]">18 Apr 2026 · 18:30</span></div>
              <div class="flex items-center justify-between"><span>Duration</span><span class="font-mono text-[var(--ls-text-primary)]">45 min</span></div>
              <div class="flex items-center justify-between"><span>Fee</span><span class="font-mono text-[var(--ls-text-primary)]">₹1,800</span></div>
              <div class="flex items-center justify-between"><span>Coupon</span><span class="font-mono text-[var(--ls-success)]">-₹200</span></div>
              <div class="flex items-center justify-between border-t border-[var(--ls-border)] pt-2"><span>Total</span><span class="font-mono text-[var(--ls-accent-soft)]">₹1,600</span></div>
            </div>
          </div>
        </div>
        <div class="space-y-4">
          <div class="panel rounded-[24px] p-5">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Payment method</p>
            <div class="mt-4 space-y-3">
              ${["UPI", "Card", "NetBanking"].map((x, i) => `<button aria-label="${x}" class="focus-ring flex min-h-[44px] w-full items-center justify-between rounded-xl ${i === 0 ? "bg-[var(--ls-accent)] text-white" : "border border-[var(--ls-border)] bg-[var(--ls-surface-2)] text-[var(--ls-text-primary)]"} px-4 text-sm"><span>${x}</span><span class="font-mono text-xs">${i === 0 ? "SELECTED" : "↵"}</span></button>`).join("")}
            </div>
            <div class="mt-4 rounded-2xl bg-[var(--ls-surface-2)] p-4">
              <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Coupon</p>
              <p class="mt-2 font-mono text-sm text-[var(--ls-text-primary)]">MOOT200</p>
            </div>
          </div>
        </div>
        <div class="space-y-4">
          <div class="panel rounded-[24px] p-5">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Payment action</p>
            <button class="focus-ring mt-4 min-h-[44px] w-full rounded-xl bg-[var(--ls-accent)] px-4 py-3 text-sm font-semibold text-white">Pay now</button>
          </div>
          <div class="panel rounded-[24px] p-5" aria-live="polite">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Booking policy</p>
            <div class="mt-4 rounded-2xl bg-[var(--ls-surface-2)] p-4 text-sm text-[var(--ls-text-primary)]">Video-session access tokens are generated only after payment webhook confirmation. Until then, the slot stays reserved but not fully confirmed.</div>
          </div>
        </div>
      </section>
    `,
    states: {
      emptyTitle: "No payment details available",
      emptyBody: "Select a valid tutor slot before continuing to payment.",
      emptyJson: '{ "order": null, "paymentMethods": [] }',
      errorText: "payment summary could not be loaded",
      offlineText: "Offline · Showing cached booking payment summary from 5m ago",
    },
    accessibilityMobile: "<li>Payment methods are rendered as large single-action rows so the selected path remains obvious before checkout.</li>",
    accessibilityDesktop: "<li>Order summary, payment choice, and booking policy are separated so final confirmation is easier to review before payment.</li>",
  },
  {
    filename: "S-24c-legal-pro.html",
    title: "Legal Sathi — Booking Confirmation",
    description: "Legal Pro tutor booking confirmation screen.",
    mobileActive: "Calendar",
    desktopActive: "Calendar",
    mobile: `
      <section class="panel rounded-[28px] p-5 shadow-float">
        <div class="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[var(--ls-success)]/15 text-[#9AE6B4]">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="h-9 w-9"><path d="m5 12 4.2 4.2L19 6.5"></path></svg>
        </div>
        <p class="mt-5 text-center text-xs font-semibold uppercase tracking-[0.24em] text-[var(--ls-text-secondary)]">S-24c · Booking confirmed</p>
        <h1 class="mt-2 text-center text-2xl font-semibold text-[var(--ls-text-primary)]">Tutor session booked</h1>
        <p class="mt-2 text-center text-sm text-[var(--ls-text-secondary)]">Your slot with Prof. Ayesha Khan is reserved. Video access is enabled after payment webhook confirmation.</p>
      </section>
      <section class="panel rounded-[24px] p-4">
        <div class="rounded-2xl bg-[var(--ls-surface-2)] p-4">
          <div class="flex items-center justify-between text-sm">
            <span class="text-[var(--ls-text-secondary)]">Booking ID</span>
            <span class="mono text-[var(--ls-text-primary)]">BK-24C-1842</span>
          </div>
          <div class="mt-3 flex items-center justify-between text-sm">
            <span class="text-[var(--ls-text-secondary)]">Session</span>
            <span class="mono text-[var(--ls-text-primary)]">18 Apr 2026 · 18:30</span>
          </div>
          <div class="mt-3 flex items-center justify-between text-sm">
            <span class="text-[var(--ls-text-secondary)]">Mode</span>
            <span class="text-[var(--ls-text-primary)]">Video consultation</span>
          </div>
        </div>
        <div class="mt-4 grid grid-cols-2 gap-3">
          <button class="focus-ring min-h-[44px] rounded-xl bg-[var(--ls-accent)] px-4 py-3 text-sm font-semibold text-white">Add to calendar</button>
          <button class="focus-ring min-h-[44px] rounded-xl border border-[var(--ls-border)] px-4 py-3 text-sm font-semibold text-[var(--ls-text-primary)]">Open sessions</button>
        </div>
      </section>
    `,
    desktop: `
      <section class="panel rounded-[28px] p-6 shadow-float">
        <div class="flex items-start justify-between gap-6">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--ls-text-secondary)]">S-24c · Booking Confirmation</p>
            <h1 class="mt-2 text-3xl font-semibold text-[var(--ls-text-primary)]">Tutor booking confirmed</h1>
            <p class="mt-3 max-w-3xl text-sm leading-6 text-[var(--ls-text-secondary)]">Confirms the session slot, surfaces the booking reference, and explains that video access becomes active only after payment webhook confirmation.</p>
          </div>
          ${commonChips}
        </div>
      </section>
      <section class="grid gap-6 xl:grid-cols-[1fr,0.95fr,0.8fr]">
        <div class="panel rounded-[24px] p-5">
          <div class="flex items-center gap-4">
            <div class="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--ls-success)]/15 text-[#9AE6B4]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="h-8 w-8"><path d="m5 12 4.2 4.2L19 6.5"></path></svg>
            </div>
            <div>
              <p class="text-sm font-semibold text-[var(--ls-text-primary)]">Booking status: confirmed</p>
              <p class="mt-1 text-sm text-[var(--ls-text-secondary)]">Reference <span class="mono">BK-24C-1842</span></p>
            </div>
          </div>
          <div class="mt-6 grid gap-3 md:grid-cols-2">
            ${[
              ["Tutor", "Prof. Ayesha Khan"],
              ["Session", "18 Apr 2026 · 18:30"],
              ["Duration", "45 min"],
              ["Amount paid", "₹1,600"],
            ].map(([label, value]) => `<div class="rounded-2xl bg-[var(--ls-surface-2)] p-4"><p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">${label}</p><p class="mt-2 ${label.includes("Amount") || label === "Session" ? "mono" : ""} text-sm text-[var(--ls-text-primary)]">${value}</p></div>`).join("")}
          </div>
        </div>
        <div class="panel rounded-[24px] p-5">
          <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Next actions</p>
          <div class="mt-4 space-y-3">
            ${["Add the session to Google Calendar", "Review prep notes from LegalGPT India", "Check session join link after payment webhook confirmation"].map((item) => `<div class="rounded-2xl bg-[var(--ls-surface-2)] p-4 text-sm text-[var(--ls-text-primary)]">${item}</div>`).join("")}
          </div>
        </div>
        <div class="panel rounded-[24px] p-5">
          <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Actions</p>
          <div class="mt-4 space-y-3">
            <button class="focus-ring min-h-[44px] w-full rounded-xl bg-[var(--ls-accent)] px-4 py-3 text-sm font-semibold text-white">Add to calendar</button>
            <button class="focus-ring min-h-[44px] w-full rounded-xl border border-[var(--ls-border)] px-4 py-3 text-sm font-semibold text-[var(--ls-text-primary)]">Open my sessions</button>
          </div>
        </div>
      </section>
    `,
    states: {
      emptyTitle: "No confirmed booking found",
      emptyBody: "Complete payment successfully to generate a tutor session confirmation.",
      emptyJson: '{ "booking": null, "status": "pending" }',
      errorText: "booking confirmation could not be loaded",
      offlineText: "Offline · Showing cached booking confirmation from 5m ago",
    },
    accessibilityMobile: "<li>Success details and the next primary actions are visible without relying on animation alone.</li>",
    accessibilityDesktop: "<li>Confirmation metadata and post-booking actions are separated so the user can verify the booking before navigating away.</li>",
  },
  {
    filename: "S-25a-legal-pro.html",
    title: "Legal Sathi — Rate and Review Tutor",
    description: "Legal Pro tutor review submission screen.",
    mobileActive: "Calendar",
    desktopActive: "Calendar",
    mobile: `
      <section class="panel rounded-[24px] p-4 shadow-panel">
        <p class="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--ls-text-secondary)]">S-25a · Tutor review</p>
        <h1 class="mt-2 text-2xl font-semibold text-[var(--ls-text-primary)]">Rate and review tutor</h1>
        <p class="mt-2 text-sm text-[var(--ls-text-secondary)]">Share structured feedback for your Company Law strategy session.</p>
      </section>
      <section class="panel rounded-[24px] p-4">
        <p class="text-sm font-semibold text-[var(--ls-text-primary)]">Session with Prof. Ayesha Khan</p>
        <div class="mt-4 grid grid-cols-5 gap-2">
          ${[1, 2, 3, 4, 5].map((x, i) => `<button aria-label="Rate ${x} stars" class="focus-ring min-h-[44px] rounded-xl ${i < 4 ? "bg-[var(--ls-accent)] text-white" : "border border-[var(--ls-border)] text-[var(--ls-text-secondary)]"}">${x}</button>`).join("")}
        </div>
        <div class="mt-4 grid grid-cols-2 gap-2">
          ${["Explains clearly", "Good memorial edits", "Strong oral feedback", "Helpful notes"].map((tag) => `<button class="focus-ring min-h-[44px] rounded-full border border-[var(--ls-border)] bg-[var(--ls-surface-2)] px-3 text-xs text-[var(--ls-text-primary)]">${tag}</button>`).join("")}
        </div>
        <div class="mt-4 rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] p-4">
          <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Written review</p>
          <p class="mt-2 text-sm leading-6 text-[var(--ls-text-primary)]">The tutor broke down memorial structure clearly and gave direct, useful feedback on oral submissions for the moot problem.</p>
        </div>
        <label class="mt-4 flex items-center gap-3 text-sm text-[var(--ls-text-primary)]">
          <input type="checkbox" checked class="h-4 w-4 rounded border-[var(--ls-border)]" />
          Post review publicly
        </label>
        <button class="focus-ring mt-4 min-h-[44px] w-full rounded-xl bg-[var(--ls-accent)] px-4 py-3 text-sm font-semibold text-white">Submit review</button>
      </section>
    `,
    desktop: `
      <section class="panel rounded-[28px] p-6 shadow-float">
        <div class="flex items-start justify-between gap-6">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--ls-text-secondary)]">S-25a · Tutor Review</p>
            <h1 class="mt-2 text-3xl font-semibold text-[var(--ls-text-primary)]">Structured tutor feedback</h1>
            <p class="mt-3 max-w-3xl text-sm leading-6 text-[var(--ls-text-secondary)]">Collects a rating, qualitative review, and publish preference after a completed session.</p>
          </div>
          ${commonChips}
        </div>
      </section>
      <section class="grid gap-6 xl:grid-cols-[0.95fr,1.1fr,0.85fr]">
        <div class="panel rounded-[24px] p-5">
          <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Session summary</p>
          <div class="mt-4 rounded-2xl bg-[var(--ls-surface-2)] p-4 text-sm text-[var(--ls-text-primary)]">
            <p>Prof. Ayesha Khan · Company Law strategy session</p>
            <p class="mt-2 text-[var(--ls-text-secondary)]">18 Apr 2026 · 18:30 · <span class="mono">45 min</span></p>
          </div>
        </div>
        <div class="panel rounded-[24px] p-5">
          <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Review form</p>
          <div class="mt-4 grid grid-cols-5 gap-2">
            ${[1, 2, 3, 4, 5].map((x, i) => `<button aria-label="Rate ${x} stars" class="focus-ring min-h-[48px] rounded-xl ${i < 4 ? "bg-[var(--ls-accent)] text-white" : "border border-[var(--ls-border)] text-[var(--ls-text-secondary)]"}">${x}</button>`).join("")}
          </div>
          <div class="mt-4 flex flex-wrap gap-2">
            ${["Explains clearly", "Strong oral coaching", "Great notes", "Time efficient"].map((tag) => `<button class="focus-ring min-h-[44px] rounded-full border border-[var(--ls-border)] bg-[var(--ls-surface-2)] px-4 text-sm text-[var(--ls-text-primary)]">${tag}</button>`).join("")}
          </div>
          <div class="mt-4 rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] p-4 text-sm leading-6 text-[var(--ls-text-primary)]">
            The tutor quickly diagnosed weak sections in the memorial and gave practical cross-question prep for the single-judge moot round.
          </div>
        </div>
        <div class="panel rounded-[24px] p-5">
          <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Publish settings</p>
          <label class="mt-4 flex items-center gap-3 text-sm text-[var(--ls-text-primary)]"><input type="checkbox" checked class="h-4 w-4 rounded border-[var(--ls-border)]" />Post publicly</label>
          <button class="focus-ring mt-4 min-h-[44px] w-full rounded-xl bg-[var(--ls-accent)] px-4 py-3 text-sm font-semibold text-white">Submit review</button>
        </div>
      </section>
    `,
    states: {
      emptyTitle: "No completed session available",
      emptyBody: "Finish a tutor session before posting a rating or public review.",
      emptyJson: '{ "session": null, "reviewable": false }',
      errorText: "review form could not be loaded",
      offlineText: "Offline · Showing cached tutor review draft from 5m ago",
    },
    accessibilityMobile: "<li>Star ratings are exposed as full-size buttons so score selection remains usable for touch and keyboard users.</li>",
    accessibilityDesktop: "<li>Session details, rating controls, and publish settings are separated to reduce accidental submission errors.</li>",
  },
  {
    filename: "S-25b-legal-pro.html",
    title: "Legal Sathi — Review Submitted Confirmation",
    description: "Legal Pro review submission confirmation screen.",
    mobileActive: "Calendar",
    desktopActive: "Calendar",
    mobile: `
      <section class="panel rounded-[28px] p-5 shadow-float">
        <div class="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[var(--ls-accent)]/15 text-[var(--ls-accent)]">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="h-9 w-9"><path d="m5 12 4.2 4.2L19 6.5"></path></svg>
        </div>
        <p class="mt-5 text-center text-xs font-semibold uppercase tracking-[0.24em] text-[var(--ls-text-secondary)]">S-25b · Review submitted</p>
        <h1 class="mt-2 text-center text-2xl font-semibold text-[var(--ls-text-primary)]">Thank you for the feedback</h1>
        <p class="mt-2 text-center text-sm text-[var(--ls-text-secondary)]">Your tutor review has been saved and will appear on the profile after moderation checks.</p>
      </section>
      <section class="panel rounded-[24px] p-4">
        <div class="rounded-2xl bg-[var(--ls-surface-2)] p-4 text-sm text-[var(--ls-text-primary)]">
          <p>Rating submitted: <span class="mono">4 / 5</span></p>
          <p class="mt-2 text-[var(--ls-text-secondary)]">Review ID <span class="mono">RV-2504</span></p>
        </div>
        <div class="mt-4 grid grid-cols-2 gap-3">
          <button class="focus-ring min-h-[44px] rounded-xl bg-[var(--ls-accent)] px-4 py-3 text-sm font-semibold text-white">Back to sessions</button>
          <button class="focus-ring min-h-[44px] rounded-xl border border-[var(--ls-border)] px-4 py-3 text-sm font-semibold text-[var(--ls-text-primary)]">Browse tutors</button>
        </div>
      </section>
    `,
    desktop: `
      <section class="panel rounded-[28px] p-6 shadow-float">
        <div class="flex items-start justify-between gap-6">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--ls-text-secondary)]">S-25b · Review Confirmation</p>
            <h1 class="mt-2 text-3xl font-semibold text-[var(--ls-text-primary)]">Tutor review successfully submitted</h1>
            <p class="mt-3 max-w-3xl text-sm leading-6 text-[var(--ls-text-secondary)]">Confirms successful review capture and surfaces navigation back into the session flow.</p>
          </div>
          ${commonChips}
        </div>
      </section>
      <section class="grid gap-6 xl:grid-cols-[1fr,0.8fr]">
        <div class="panel rounded-[24px] p-5">
          <div class="flex items-center gap-4">
            <div class="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--ls-accent)]/15 text-[var(--ls-accent)]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="h-8 w-8"><path d="m5 12 4.2 4.2L19 6.5"></path></svg>
            </div>
            <div>
              <p class="text-sm font-semibold text-[var(--ls-text-primary)]">Review status: received</p>
              <p class="mt-1 text-sm text-[var(--ls-text-secondary)]">Moderation reference <span class="mono">RV-2504</span></p>
            </div>
          </div>
        </div>
        <div class="panel rounded-[24px] p-5">
          <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Actions</p>
          <div class="mt-4 space-y-3">
            <button class="focus-ring min-h-[44px] w-full rounded-xl bg-[var(--ls-accent)] px-4 py-3 text-sm font-semibold text-white">Back to sessions</button>
            <button class="focus-ring min-h-[44px] w-full rounded-xl border border-[var(--ls-border)] px-4 py-3 text-sm font-semibold text-[var(--ls-text-primary)]">Browse tutors</button>
          </div>
        </div>
      </section>
    `,
    states: {
      emptyTitle: "No review submission available",
      emptyBody: "Submit a tutor review before opening the confirmation view.",
      emptyJson: '{ "review": null, "submitted": false }',
      errorText: "review confirmation could not be loaded",
      offlineText: "Offline · Showing cached review confirmation from 5m ago",
    },
    accessibilityMobile: "<li>Confirmation copy is paired with persistent actions so the next step is visible without hidden navigation.</li>",
    accessibilityDesktop: "<li>Success state and post-submit actions are separated to reduce missed follow-up paths.</li>",
  },
  {
    filename: "S-26-legal-pro.html",
    title: "Legal Sathi — My Sessions",
    description: "Legal Pro tutor sessions management screen.",
    mobileActive: "Calendar",
    desktopActive: "Calendar",
    mobileBanner: `
      <div class="sticky top-0 z-50 mb-4 rounded-xl border border-[#D97706] bg-[#FEF3C7] px-4 py-2.5" role="alert" aria-live="assertive">
        <div class="flex items-center justify-between gap-4">
          <p class="text-sm text-[#92400E]">Offline · Showing cached tutor sessions from <time class="mono">5m</time> ago</p>
          <button class="focus-ring min-h-[44px] text-sm text-[#92400E] underline">Retry</button>
        </div>
      </div>
    `,
    desktopBanner: `
      <div class="sticky top-0 z-50 border-b border-[#D97706] bg-[#FEF3C7] px-6 py-3" role="alert" aria-live="assertive">
        <div class="mx-auto flex max-w-[1440px] items-center justify-between gap-4">
          <p class="text-sm text-[#92400E]">Offline sessions view · join links and rating prompts are showing the last cached snapshot</p>
          <button class="focus-ring min-h-[44px] text-sm text-[#92400E] underline">Retry</button>
        </div>
      </div>
    `,
    mobile: `
      <section class="panel rounded-[24px] p-4 shadow-panel">
        <p class="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--ls-text-secondary)]">S-26 · Tutor sessions</p>
        <h1 class="mt-2 text-2xl font-semibold text-[var(--ls-text-primary)]">My sessions</h1>
        <p class="mt-2 text-sm text-[var(--ls-text-secondary)]">Track upcoming bookings and completed tutor sessions in one queue.</p>
      </section>
      <section class="panel rounded-[24px] p-4">
        <div class="grid grid-cols-2 gap-2">
          ${["Upcoming", "Completed"].map((x, i) => `<button class="focus-ring min-h-[44px] rounded-xl ${i === 0 ? "bg-[var(--ls-accent)] text-white" : "border border-[var(--ls-border)] text-[var(--ls-text-secondary)]"}">${x}</button>`).join("")}
        </div>
        <div class="mt-4 space-y-3">
          ${[
            ["Prof. Ayesha Khan", "18 Apr 2026 · 18:30", "Join session", "Upcoming"],
            ["Neha Mukherjee", "15 Apr 2026 · Completed", "Rate tutor", "Completed"],
          ].map(([name, time, action, status], i) => `<div class="rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] p-4"><div class="flex items-start justify-between gap-3"><div><p class="text-sm font-semibold text-[var(--ls-text-primary)]">${name}</p><p class="mt-1 text-xs text-[var(--ls-text-secondary)]">${time}</p></div><span class="rounded-full px-3 py-1 font-mono text-xs ${i === 0 ? "bg-[var(--ls-success)]/15 text-[#9AE6B4]" : "bg-[var(--ls-accent)]/12 text-[var(--ls-accent-soft)]"}">${status}</span></div><button class="focus-ring mt-3 min-h-[44px] w-full rounded-xl ${i === 0 ? "bg-[var(--ls-accent)] text-white" : "border border-[var(--ls-border)] text-[var(--ls-text-primary)]"} px-4 py-2 text-sm font-semibold">${action}</button></div>`).join("")}
        </div>
      </section>
    `,
    desktop: `
      <section class="panel rounded-[28px] p-6 shadow-float">
        <div class="flex items-start justify-between gap-6">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--ls-text-secondary)]">S-26 · My Sessions</p>
            <h1 class="mt-2 text-3xl font-semibold text-[var(--ls-text-primary)]">Tutor session pipeline</h1>
            <p class="mt-3 max-w-3xl text-sm leading-6 text-[var(--ls-text-secondary)]">Combines upcoming joins, completed lessons, and post-session review prompts into a single queue.</p>
          </div>
          ${commonChips}
        </div>
      </section>
      <section class="grid gap-6 xl:grid-cols-[0.9fr,1.2fr,0.8fr]">
        <div class="panel rounded-[24px] p-5">
          <div class="grid grid-cols-2 gap-2">
            ${["Upcoming", "Completed"].map((x, i) => `<button class="focus-ring min-h-[44px] rounded-xl ${i === 0 ? "bg-[var(--ls-accent)] text-white" : "border border-[var(--ls-border)] text-[var(--ls-text-secondary)]"}">${x}</button>`).join("")}
          </div>
        </div>
        <div class="panel rounded-[24px] p-5">
          <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Sessions queue</p>
          <div class="mt-4 space-y-3">
            ${[
              ["Prof. Ayesha Khan", "18 Apr 2026 · 18:30", "Video join enabled", "Join session"],
              ["Neha Mukherjee", "15 Apr 2026 · Completed", "Review pending", "Rate tutor"],
              ["Arjun Deshpande", "12 Apr 2026 · Completed", "Notes downloaded", "Open recap"],
            ].map(([name, time, status, action], i) => `<div class="rounded-2xl bg-[var(--ls-surface-2)] p-4"><div class="flex items-start justify-between gap-4"><div><p class="text-sm font-semibold text-[var(--ls-text-primary)]">${name}</p><p class="mt-1 text-xs text-[var(--ls-text-secondary)]">${time}</p><p class="mt-2 text-sm text-[var(--ls-text-primary)]">${status}</p></div><button class="focus-ring min-h-[44px] rounded-xl ${i === 0 ? "bg-[var(--ls-accent)] text-white" : "border border-[var(--ls-border)] text-[var(--ls-text-primary)]"} px-4 py-2 text-sm font-semibold">${action}</button></div></div>`).join("")}
          </div>
        </div>
        <div class="panel rounded-[24px] p-5">
          <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Session stats</p>
          <div class="mt-4 grid gap-3">
            ${[
              ["Upcoming this week", "02"],
              ["Completed this month", "07"],
              ["Pending reviews", "01"],
            ].map(([label, value]) => `<div class="rounded-2xl bg-[var(--ls-surface-2)] p-4"><p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">${label}</p><p class="mt-2 font-mono text-2xl text-[var(--ls-text-primary)]">${value}</p></div>`).join("")}
          </div>
        </div>
      </section>
    `,
    states: {
      emptyTitle: "No tutor sessions booked",
      emptyBody: "Book your first tutor session to start tracking joins, reviews, and recap notes.",
      emptyJson: '{ "upcoming": [], "completed": [] }',
      errorText: "tutor sessions could not be loaded",
      offlineText: "Offline · Showing cached tutor sessions from 5m ago",
    },
    accessibilityMobile: "<li>Upcoming and completed sessions remain reachable through large segmented tabs suited to touch and keyboard use.</li>",
    accessibilityDesktop: "<li>Queue rows pair timing and next action in a single row to reduce missed join or review prompts.</li>",
  },
  {
    filename: "S-27-legal-pro.html",
    title: "Legal Sathi — AI Legal Research",
    description: "Legal Pro AI legal research workspace with search and recent queries.",
    mobileActive: "Research",
    desktopActive: "Research",
    mobileBanner: `
      <div class="sticky top-0 z-50 mb-4 rounded-xl border border-[#D97706] bg-[#FEF3C7] px-4 py-2.5" role="alert" aria-live="assertive">
        <div class="flex items-center justify-between gap-4">
          <p class="text-sm text-[#92400E]">Offline · Showing cached legal research history from <time class="mono">5m</time> ago</p>
          <button class="focus-ring min-h-[44px] text-sm text-[#92400E] underline">Retry</button>
        </div>
      </div>
    `,
    desktopBanner: `
      <div class="sticky top-0 z-50 border-b border-[#D97706] bg-[#FEF3C7] px-6 py-3" role="alert" aria-live="assertive">
        <div class="mx-auto flex max-w-[1440px] items-center justify-between gap-4">
          <p class="text-sm text-[#92400E]">Offline research mode · saved search results and last verified citations are available locally</p>
          <button class="focus-ring min-h-[44px] text-sm text-[#92400E] underline">Retry</button>
        </div>
      </div>
    `,
    mobile: `
      <section class="panel rounded-[24px] p-4 shadow-panel">
        <p class="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--ls-text-secondary)]">S-27 · Legal research</p>
        <h1 class="mt-2 text-2xl font-semibold text-[var(--ls-text-primary)]">AI legal research</h1>
        <p class="mt-2 text-sm text-[var(--ls-text-secondary)]">Search judgments, ask scoped legal questions, and switch language without losing citations.</p>
      </section>
      <section class="panel rounded-[24px] p-4">
        <div class="rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] p-4">
          <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Query</p>
          <p class="mt-2 text-sm text-[var(--ls-text-primary)]">Summarize Section 138 NI Act notice requirements with Delhi High Court citations</p>
        </div>
        <div class="mt-3 flex flex-wrap gap-2">
          ${["English", "Hindi", "Marathi"].map((lang, i) => `<button class="focus-ring min-h-[44px] rounded-full ${i === 0 ? "bg-[var(--ls-accent)] text-white" : "border border-[var(--ls-border)] text-[var(--ls-text-secondary)]"} px-4 text-sm">${lang}</button>`).join("")}
        </div>
        <div class="mt-4 space-y-3">
          ${[
            ["Dashrath Rupsingh Rathod v. State of Maharashtra", "(2014) 9 SCC 129", "Territorial jurisdiction clarified for NI Act complaints."],
            ["Delhi HC · Rajesh Aggarwal v. State", "2010 SCC OnLine Del 2501", "Notice service and complaint filing sequence explained."],
          ].map(([title, cite, body]) => `<div class="rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] p-4"><p class="text-sm font-semibold text-[var(--ls-text-primary)]">${title}</p><p class="mt-1 mono text-xs text-[var(--ls-accent-soft)]">${cite}</p><p class="mt-2 text-sm text-[var(--ls-text-primary)]">${body}</p></div>`).join("")}
        </div>
      </section>
      <section class="panel rounded-[24px] p-4" aria-live="polite">
        <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">LegalGPT India</p>
        <div class="mt-3 rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] p-4">
          <p class="text-sm text-[var(--ls-text-primary)]">Citations verified. Confidence <span class="mono">0.91</span>. Ask for a bilingual summary or draft research notes.</p>
        </div>
      </section>
    `,
    desktop: `
      <section class="panel rounded-[28px] p-6 shadow-float">
        <div class="flex items-start justify-between gap-6">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--ls-text-secondary)]">S-27 · AI Legal Research</p>
            <h1 class="mt-2 text-3xl font-semibold text-[var(--ls-text-primary)]">Cited legal research workspace</h1>
            <p class="mt-3 max-w-3xl text-sm leading-6 text-[var(--ls-text-secondary)]">Combines legal search, language override, recent research history, and AI-guided follow-up within one research desk.</p>
          </div>
          ${commonChips}
        </div>
      </section>
      <section class="grid gap-6 xl:grid-cols-[0.9fr,1.2fr,0.9fr]">
        <div class="space-y-4">
          <div class="panel rounded-[24px] p-5">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Recent searches</p>
            <div class="mt-4 space-y-3">
              ${[
                "Section 138 NI Act notice",
                "Specific Relief Act injunction Delhi HC",
                "Arbitration interim relief Section 9",
              ].map((x) => `<div class="rounded-2xl bg-[var(--ls-surface-2)] p-4 text-sm text-[var(--ls-text-primary)]">${x}</div>`).join("")}
            </div>
          </div>
        </div>
        <div class="panel rounded-[24px] p-5">
          <div class="rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] p-4">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Active query</p>
            <p class="mt-2 text-sm text-[var(--ls-text-primary)]">Summarize Section 138 NI Act notice requirements with Delhi High Court citations and a Hindi fallback.</p>
          </div>
          <div class="mt-4 flex flex-wrap gap-2">
            ${["English", "Hindi", "Marathi"].map((lang, i) => `<button class="focus-ring min-h-[44px] rounded-full ${i === 0 ? "bg-[var(--ls-accent)] text-white" : "border border-[var(--ls-border)] text-[var(--ls-text-secondary)]"} px-4 text-sm">${lang}</button>`).join("")}
          </div>
          <div class="mt-4 space-y-3">
            ${[
              ["Dashrath Rupsingh Rathod v. State of Maharashtra", "(2014) 9 SCC 129", "Territorial jurisdiction clarified for NI Act complaints."],
              ["Rajesh Aggarwal v. State", "2010 SCC OnLine Del 2501", "Delhi High Court clarified the pre-summoning process and notice sequence."],
              ["MSR Leathers v. S. Palaniappan", "(2013) 1 SCC 177", "Multiple presentation of the cheque before complaint remains valid."],
            ].map(([title, cite, body]) => `<div class="rounded-2xl bg-[var(--ls-surface-2)] p-4"><p class="text-sm font-semibold text-[var(--ls-text-primary)]">${title}</p><p class="mt-1 mono text-xs text-[var(--ls-accent-soft)]">${cite}</p><p class="mt-2 text-sm text-[var(--ls-text-primary)]">${body}</p></div>`).join("")}
          </div>
        </div>
        <div class="space-y-4">
          <div class="panel rounded-[24px] p-5" aria-live="polite">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">LegalGPT India</p>
            <div class="mt-4 rounded-2xl bg-[var(--ls-surface-2)] p-4 text-sm text-[var(--ls-text-primary)]">Confidence <span class="mono">0.91</span> · citations verified. Ask for cross-language summary, issue framing, or note export.</div>
          </div>
        </div>
      </section>
    `,
    states: {
      emptyTitle: "No research history found",
      emptyBody: "Start a legal research query to build recent searches and citation-backed results.",
      emptyJson: '{ "recentSearches": [], "results": [] }',
      errorText: "research results could not be loaded",
      offlineText: "Offline · Showing cached legal research history from 5m ago",
    },
    accessibilityMobile: "<li>Language chips remain large enough to support rapid override between English and regional-language research views.</li>",
    accessibilityDesktop: "<li>Recent queries, results, and AI synthesis are split into columns to preserve focus while comparing citations.</li>",
  },
  {
    filename: "S-28-legal-pro.html",
    title: "Legal Sathi — Moot Court Suite",
    description: "Legal Pro moot court preparation suite for students.",
    mobileActive: "Research",
    desktopActive: "Research",
    mobile: `
      <section class="panel rounded-[24px] p-4 shadow-panel">
        <p class="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--ls-text-secondary)]">S-28 · Moot Court Suite</p>
        <h1 class="mt-2 text-2xl font-semibold text-[var(--ls-text-primary)]">Single-judge moot prep</h1>
        <p class="mt-2 text-sm text-[var(--ls-text-secondary)]">Problem bank, memorial drafting, and AI judge simulation for Phase 1 preparation.</p>
      </section>
      <section class="panel rounded-[24px] p-4">
        <div class="rounded-2xl bg-[var(--ls-surface-2)] p-4">
          <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Selected moot problem</p>
          <p class="mt-2 text-sm font-semibold text-[var(--ls-text-primary)]">Constitutional challenge to predictive policing regulations</p>
          <p class="mt-2 text-sm text-[var(--ls-text-secondary)]">Single-judge simulation enabled for Phase 1</p>
        </div>
        <div class="mt-4 grid grid-cols-2 gap-3">
          ${[
            ["Memorial draft", "07 sections"],
            ["Arguments", "12 nodes"],
            ["Judge questions", "18"],
            ["Peer review", "02 comments"],
          ].map(([label, value]) => `<div class="rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] p-4"><p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">${label}</p><p class="mt-2 font-mono text-lg text-[var(--ls-text-primary)]">${value}</p></div>`).join("")}
        </div>
      </section>
      <section class="panel rounded-[24px] p-4" aria-live="polite">
        <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">AI judge simulation</p>
        <div class="mt-3 rounded-2xl border border-[var(--ls-border)] bg-[var(--ls-surface-2)] p-4">
          <p class="text-sm text-[var(--ls-text-primary)]">The current judge avatar will probe maintainability, proportionality, and Article 21 balancing. Confidence <span class="mono">0.88</span>.</p>
          <button class="focus-ring mt-3 min-h-[44px] rounded-xl bg-[var(--ls-accent)] px-4 py-2 text-sm font-semibold text-white">Start mock round</button>
        </div>
      </section>
    `,
    desktop: `
      <section class="panel rounded-[28px] p-6 shadow-float">
        <div class="flex items-start justify-between gap-6">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--ls-text-secondary)]">S-28 · Moot Court Suite</p>
            <h1 class="mt-2 text-3xl font-semibold text-[var(--ls-text-primary)]">Phase 1 moot command surface</h1>
            <p class="mt-3 max-w-3xl text-sm leading-6 text-[var(--ls-text-secondary)]">Brings together problem selection, memorial drafting, argument maps, and a single-judge simulation for student preparation.</p>
          </div>
          ${commonChips}
        </div>
      </section>
      <section class="grid gap-6 xl:grid-cols-[0.85fr,1.15fr,0.9fr]">
        <div class="space-y-4">
          <div class="panel rounded-[24px] p-5">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Problem bank</p>
            <div class="mt-4 space-y-3">
              ${[
                "Predictive policing regulations",
                "Data fiduciary liability in health-tech",
                "International commercial arbitration seat challenge",
              ].map((x, i) => `<button class="focus-ring flex min-h-[44px] w-full items-center justify-between rounded-xl ${i === 0 ? "bg-[var(--ls-accent)] text-white" : "border border-[var(--ls-border)] bg-[var(--ls-surface-2)] text-[var(--ls-text-primary)]"} px-4 text-sm"><span>${x}</span><span class="font-mono text-xs">${i === 0 ? "SELECTED" : "↵"}</span></button>`).join("")}
            </div>
          </div>
        </div>
        <div class="panel rounded-[24px] p-5">
          <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Memorial and arguments</p>
          <div class="mt-4 grid gap-3 md:grid-cols-2">
            ${[
              ["Memorial draft", "Jurisdiction, facts, issues, arguments, prayer"],
              ["Counter arguments", "State necessity, public order, algorithmic efficiency"],
              ["Authorities", "Puttaswamy, Anuradha Bhasin, PUCL"],
              ["Judge question deck", "18 likely interventions"],
            ].map(([label, body]) => `<div class="rounded-2xl bg-[var(--ls-surface-2)] p-4"><p class="text-sm font-semibold text-[var(--ls-text-primary)]">${label}</p><p class="mt-2 text-sm text-[var(--ls-text-secondary)]">${body}</p></div>`).join("")}
          </div>
        </div>
        <div class="space-y-4">
          <div class="panel rounded-[24px] p-5" aria-live="polite">
            <p class="text-xs uppercase tracking-[0.18em] text-[var(--ls-text-secondary)]">Single-judge simulation</p>
            <div class="mt-4 rounded-2xl bg-[var(--ls-surface-2)] p-4 text-sm text-[var(--ls-text-primary)]">Phase 1 uses one AI judge only. Confidence <span class="mono">0.88</span>. Expect questions on proportionality, surveillance safeguards, and statutory competence.</div>
            <button class="focus-ring mt-4 min-h-[44px] w-full rounded-xl bg-[var(--ls-accent)] px-4 py-3 text-sm font-semibold text-white">Start mock round</button>
          </div>
        </div>
      </section>
    `,
    states: {
      emptyTitle: "No moot problem selected",
      emptyBody: "Choose a problem from the bank to unlock drafting, arguments, and judge simulation.",
      emptyJson: '{ "problem": null, "judgeMode": "single" }',
      errorText: "moot suite could not be loaded",
      offlineText: "Offline · Showing cached moot preparation workspace from 5m ago",
    },
    accessibilityMobile: "<li>The single-judge simulation state is described in text so Phase 1 constraints are clear without relying only on badges.</li>",
    accessibilityDesktop: "<li>Problem bank, drafting surface, and judge simulation are separated into fixed columns for easier preparation flow.</li>",
  },
];

fs.copyFileSync(logoSourcePath, path.join(outDir, logoFileName));
for (const file of files) {
  fs.writeFileSync(path.join(outDir, file.filename), renderPage(file));
}
