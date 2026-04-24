import path from "node:path";

const filePath = "/Users/rajeevbarnwal/Desktop/Codes/Nyay/docs/wireframes/Final User Screens/S-01-legal-pro.html";
const fileUrl = "file://" + filePath;

const target = await fetch("http://127.0.0.1:9222/json/new?about:blank", { method: "PUT" }).then((r) => r.json());

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

const loadAt = async (width, height, mobile) => {
  await send("Emulation.setDeviceMetricsOverride", {
    width,
    height,
    deviceScaleFactor: mobile ? 2 : 1,
    mobile,
  });
  await send("Page.navigate", { url: fileUrl });
  await new Promise((r) => setTimeout(r, 300));
};

const click = async (selector) =>
  evalValue(`(() => {
    const el = document.querySelector(${JSON.stringify(selector)});
    if (!el) return false;
    el.click();
    return true;
  })()`);

const input = async (selector, value) =>
  evalValue(`(() => {
    const el = document.querySelector(${JSON.stringify(selector)});
    if (!el) return false;
    el.value = ${JSON.stringify(value)};
    el.dispatchEvent(new Event("input", { bubbles: true }));
    return true;
  })()`);

await loadAt(390, 844, true);
const mobileInitial = await evalValue(`(() => ({
  bodyScrollWidth: document.body.scrollWidth,
  documentScrollWidth: document.documentElement.scrollWidth,
  logoLeftAligned: !!document.querySelector('.preauth-mobile-brand img'),
  topBellShell: !!document.querySelector('.notify-button[style*="rgba(225,29,72,0.14)"]'),
  authCardGap: getComputedStyle(document.querySelector('.preauth-auth-card')).marginTop,
  personaAligned: (() => {
    const button = document.querySelector('[data-auth-persona="Citizen"]');
    const shell = button?.querySelector('.preauth-persona-icon-shell');
    if (!button || !shell) return null;
    const b = button.getBoundingClientRect();
    const s = shell.getBoundingClientRect();
    return Math.abs((b.left + b.width / 2) - (s.left + s.width / 2)) < 1;
  })(),
}))()`);
await click('[data-auth-persona="Citizen"]');
await click('[data-auth-mode="phone"]');
const mobilePhoneVisible = await evalValue(`(() => ({
  phonePanelHidden: document.querySelector('[data-auth-panel="phone"]')?.hidden ?? null,
  emailPanelHidden: document.querySelector('[data-auth-panel="email"]')?.hidden ?? null,
  personaActiveLabel: document.querySelector('[data-auth-persona="Citizen"]')?.getAttribute('data-action-active'),
}))()`);
await input('[data-auth-phone]', '9876543210');
const mobilePhoneReady = await evalValue(`(() => ({
  sendDisabled: document.querySelector('[data-auth-cta="phone"]')?.disabled ?? null,
  liveText: document.querySelector('[data-auth-live]')?.textContent?.trim() ?? ''
}))()`);
await click('[data-auth-cta="phone"]');
const mobileOtpStep = await evalValue(`(() => ({
  requestHidden: document.querySelector('[data-auth-phone-step="request"]')?.hidden ?? null,
  verifyHidden: document.querySelector('[data-auth-phone-step="verify"]')?.hidden ?? null,
  liveText: document.querySelector('[data-auth-live]')?.textContent?.trim() ?? ''
}))()`);

await loadAt(1440, 1024, false);
const desktopInitial = await evalValue(`(() => ({
  heroDateChip: !!document.querySelector('.hero-date-chip'),
  navHasColoredIcons: Array.from(document.querySelectorAll('.preauth-rail .desktop-nav-icon')).every((node) => /rgba\\(/.test(node.getAttribute('style') || '')),
  authCardGap: getComputedStyle(document.querySelector('.preauth-auth-card')).marginTop,
  headerBg: getComputedStyle(document.querySelector('.preauth-header-card')).backgroundColor,
  personaAligned: (() => {
    const button = document.querySelectorAll('[data-auth-persona="Citizen"]')[1];
    const shell = button?.querySelector('.preauth-persona-icon-shell');
    if (!button || !shell) return null;
    const b = button.getBoundingClientRect();
    const s = shell.getBoundingClientRect();
    return Math.abs((b.left + b.width / 2) - (s.left + s.width / 2)) < 1;
  })(),
}))()`);
await evalValue(`(() => {
  const surface = document.querySelectorAll('[data-auth-surface]')[1];
  const persona = surface?.querySelector('[data-auth-persona="Student"]');
  const mode = surface?.querySelector('[data-auth-mode="phone"]');
  persona?.click();
  mode?.click();
  return !!surface;
})()`);
const desktopPhoneVisible = await evalValue(`(() => ({
  phonePanelHidden: document.querySelectorAll('[data-auth-panel="phone"]')[1]?.hidden ?? null,
  selectedPersonaActive: document.querySelectorAll('[data-auth-persona="Student"]')[1]?.getAttribute('data-action-active'),
  selectedPersonaLabelVisible: getComputedStyle(document.querySelectorAll('[data-auth-persona="Student"] .preauth-persona-label')[1]).display,
}))()`);

console.log(JSON.stringify({
  mobileInitial,
  mobilePhoneVisible,
  mobilePhoneReady,
  mobileOtpStep,
  desktopInitial,
  desktopPhoneVisible,
}, null, 2));

ws.close();
await fetch(`http://127.0.0.1:9222/json/close/${target.id}`);
