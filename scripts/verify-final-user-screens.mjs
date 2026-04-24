import fs from "node:fs";
import path from "node:path";

const baseDir = "/Users/rajeevbarnwal/Desktop/Codes/Nyay/docs/wireframes/Final User Screens";
const files = fs
  .readdirSync(baseDir)
  .filter((file) => /^S-.*-legal-pro\.html$/.test(file))
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }));

const list = await fetch("http://127.0.0.1:9222/json/list").then((r) => r.json());
let target = list.find((t) => t.url && t.url.startsWith("file:///Users/rajeevbarnwal/Desktop/Codes/Nyay/docs/wireframes/"));
if (!target) {
  target = await fetch("http://127.0.0.1:9222/json/new?about:blank", { method: "PUT" }).then((r) => r.json());
}

const ws = new WebSocket(target.webSocketDebuggerUrl);
let id = 0;
const pending = new Map();

ws.onmessage = (event) => {
  const msg = JSON.parse(event.data.toString());
  if (msg.id && pending.has(msg.id)) {
    const { resolve, reject } = pending.get(msg.id);
    pending.delete(msg.id);
    if (msg.error) reject(new Error(msg.error.message));
    else resolve(msg.result);
  }
};

await new Promise((resolve, reject) => {
  ws.onopen = resolve;
  ws.onerror = reject;
});

const send = (method, params = {}) =>
  new Promise((resolve, reject) => {
    const msgId = ++id;
    pending.set(msgId, { resolve, reject });
    ws.send(JSON.stringify({ id: msgId, method, params }));
  });

const evalValue = async (expression) => {
  const result = await send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true });
  return result.result.value;
};

await send("Page.enable");
await send("Runtime.enable");

const results = [];

for (const file of files) {
  const fileUrl = "file://" + path.join(baseDir, file);

  await send("Emulation.setDeviceMetricsOverride", {
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    mobile: true,
  });
  await send("Page.navigate", { url: fileUrl });
  await new Promise((r) => setTimeout(r, 260));
  const mobile = await evalValue(`(() => ({
    innerWidth: window.innerWidth,
    bodyScrollWidth: document.body.scrollWidth,
    documentScrollWidth: document.documentElement.scrollWidth,
    hasLogo: !!document.querySelector('img[src$="LegalSaathi_Logo.png"]'),
    activeButtons: document.querySelectorAll('[data-action-select]').length,
    hasMobileDock: !!document.querySelector('.mobile-dock'),
  }))()`);

  await send("Emulation.setDeviceMetricsOverride", {
    width: 1440,
    height: 1024,
    deviceScaleFactor: 1,
    mobile: false,
  });
  await send("Page.navigate", { url: fileUrl });
  await new Promise((r) => setTimeout(r, 260));
  const desktop = await evalValue(`(() => {
    const text = document.body.innerText || "";
    const sticky = document.querySelector('.desktop-sticky-stack');
    const shell = document.querySelector('main.grid-pattern');
    return {
      hasDate: /\\b\\d{2}\\s[A-Z][a-z]{2}\\s\\d{4}\\b/.test(text),
      hasIST: /\\bIST\\b/.test(text),
      hasRegion: /ap-south-1/i.test(text),
      hasRLS: /\\bRLS\\b/.test(text),
      hasSticky: !!sticky,
      stickyStyle: sticky ? sticky.getAttribute('style') || '' : '',
      hasLighterShell: !!(shell && /background-color:/i.test(shell.getAttribute('style') || '')),
      hasLogo: !!document.querySelector('img[src$="LegalSaathi_Logo.png"]'),
      legacyBrandGone: !/Legal Sathi\\b/.test(text),
      actionButtons: document.querySelectorAll('[data-action-select]').length,
      brandedTagline: /Enterprise legal operations for Bharat\\./.test(text),
    };
  })()`);

  results.push({ file, mobile, desktop });
}

const focusedChecks = files
  .filter((file) => /^S-(0[1-9]|1[0-4])/.test(file))
  .map((file) => {
    const content = fs.readFileSync(path.join(baseDir, file), "utf8");
    return {
      file,
      hasNewBrand: !content.includes("Legal Sathi") && content.includes("Legal Saathi"),
      hasLogo: content.includes("LegalSaathi_Logo.png"),
      hasActionState: content.includes("data-action-select"),
    };
  });

const specials = {
  s07: fs.readFileSync(path.join(baseDir, "S-07-legal-pro.html"), "utf8"),
  s08: fs.readFileSync(path.join(baseDir, "S-08-legal-pro.html"), "utf8"),
  s10: fs.readFileSync(path.join(baseDir, "S-10-legal-pro.html"), "utf8"),
  s13: fs.readFileSync(path.join(baseDir, "S-13-legal-pro.html"), "utf8"),
};

const failedScreens = results.filter((entry) => {
  const isPreAuthEntry = entry.file === "S-01-legal-pro.html";
  const mobileOk =
    entry.mobile.bodyScrollWidth <= 390 &&
    entry.mobile.documentScrollWidth <= 390 &&
    entry.mobile.hasLogo &&
    (isPreAuthEntry ? !entry.mobile.hasMobileDock : entry.mobile.hasMobileDock);
  const desktopOk =
    entry.desktop.hasDate &&
    entry.desktop.hasIST &&
    entry.desktop.hasRegion &&
    entry.desktop.hasRLS &&
    entry.desktop.hasSticky &&
    /top:calc\(var\(--ls-desktop-card-top\) - 4px\); gap:10px;/.test(entry.desktop.stickyStyle) &&
    entry.desktop.hasLighterShell &&
    entry.desktop.hasLogo &&
    entry.desktop.legacyBrandGone &&
    entry.desktop.brandedTagline;
  return !(mobileOk && desktopOk);
});

const focusedFailures = focusedChecks.filter((entry) => !entry.hasNewBrand || !entry.hasLogo || !entry.hasActionState);

const specialChecks = {
  s07HasIcons:
    specials.s07.includes('title="Send prompt to LegalGPT India"') &&
    specials.s07.includes('title="Voice input"'),
  s08HasSearchMarker:
    specials.s08.includes("4,218 MATCHES") &&
    specials.s08.includes("4,218 HITS") &&
    specials.s08.includes('stroke-width="1.9"'),
  s10HasFilterIcon: specials.s10.includes('title="Filter roles"') && specials.s10.includes('stroke-width="1.9"'),
  s13HasBellSnooze: specials.s13.includes('title="Snooze selected alerts"') && specials.s13.includes('stroke-width="1.9"'),
};

console.log("checked=" + results.length);
console.log("failedScreens=" + failedScreens.length);
console.log("focusedFailures=" + focusedFailures.length);
console.log("specialChecks=" + JSON.stringify(specialChecks));
if (failedScreens.length) {
  console.log(JSON.stringify(failedScreens, null, 2));
}
if (focusedFailures.length) {
  console.log(JSON.stringify(focusedFailures, null, 2));
}

ws.close();
