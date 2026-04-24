import fs from "node:fs";
import path from "node:path";

const sourceDir = "/Users/rajeevbarnwal/Desktop/Codes/Nyay/docs/wireframes";
const finalDir = path.join(sourceDir, "Final User Screens");
const logoSourcePath = "/Users/rajeevbarnwal/Desktop/Logo/LegalSaathi_Logo.png";
const logoFileName = "LegalSaathi_Logo.png";

const screenFiles = fs
  .readdirSync(sourceDir)
  .filter((file) => /^S-.*-legal-pro\.html$/.test(file))
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }));

const readTitle = (filePath) => {
  const content = fs.readFileSync(filePath, "utf8");
  const match = content.match(/<title>(.*?)<\/title>/i);
  return match ? match[1].replace(/^Legal Sathi —\s*/, "").replace(/^Legal Saathi —\s*/, "").trim() : filePath;
};

fs.mkdirSync(finalDir, { recursive: true });
if (fs.existsSync(logoSourcePath)) {
  fs.copyFileSync(logoSourcePath, path.join(finalDir, logoFileName));
}

const screens = screenFiles.map((file) => {
  const sourcePath = path.join(sourceDir, file);
  const targetPath = path.join(finalDir, file);
  fs.copyFileSync(sourcePath, targetPath);
  return {
    file,
    title: readTitle(sourcePath),
  };
});

const indexHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Legal Saathi — Final User Prototype</title>
    <style>
      :root {
        --bg: #0f1720;
        --surface: #152233;
        --surface-2: #1b2c42;
        --line: #2f4663;
        --text: #e5eef7;
        --muted: #98aec4;
        --accent: #2b6cb0;
        --accent-2: #f59e0b;
        --success: #059669;
        --shadow: rgba(3, 8, 20, 0.35);
      }
      * { box-sizing: border-box; }
      html, body { height: 100%; }
      body {
        margin: 0;
        font-family: Inter, system-ui, sans-serif;
        background:
          radial-gradient(circle at top right, rgba(43, 108, 176, 0.22), transparent 28%),
          linear-gradient(180deg, rgba(43, 108, 176, 0.05), transparent 18%),
          var(--bg);
        color: var(--text);
      }
      .app {
        display: grid;
        min-height: 100vh;
        grid-template-columns: 320px minmax(0, 1fr);
      }
      .sidebar {
        border-right: 1px solid var(--line);
        background: rgba(15, 25, 35, 0.82);
        backdrop-filter: blur(10px);
        padding: 24px 20px;
      }
      .brand {
        display: flex;
        align-items: flex-start;
        gap: 14px;
      }
      .brand img {
        display: block;
        width: 124px;
        height: auto;
        object-fit: contain;
      }
      .eyebrow {
        margin: 0;
        font-size: 11px;
        font-weight: 700;
        letter-spacing: 0.24em;
        text-transform: uppercase;
        color: var(--muted);
      }
      .title {
        margin: 4px 0 0;
        font-size: 24px;
        font-weight: 700;
      }
      .copy {
        margin: 14px 0 0;
        font-size: 14px;
        line-height: 1.6;
        color: var(--muted);
      }
      .stats {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 10px;
        margin-top: 20px;
      }
      .stat {
        border: 1px solid var(--line);
        border-radius: 18px;
        background: linear-gradient(180deg, rgba(43, 108, 176, 0.14), rgba(43, 108, 176, 0.04));
        padding: 12px;
      }
      .stat strong {
        display: block;
        font: 700 18px/1.2 "JetBrains Mono", ui-monospace, monospace;
        color: var(--text);
      }
      .stat span {
        display: block;
        margin-top: 8px;
        font-size: 11px;
        color: var(--muted);
        text-transform: uppercase;
        letter-spacing: 0.16em;
      }
      .search-wrap {
        margin-top: 22px;
      }
      .search {
        width: 100%;
        border: 1px solid var(--line);
        border-radius: 16px;
        background: var(--surface);
        color: var(--text);
        padding: 12px 14px;
        font-size: 14px;
        outline: none;
      }
      .search:focus {
        border-color: var(--accent);
        box-shadow: 0 0 0 2px rgba(43, 108, 176, 0.25);
      }
      .screen-list {
        margin-top: 18px;
        display: grid;
        gap: 8px;
        max-height: calc(100vh - 300px);
        overflow: auto;
        padding-right: 4px;
      }
      .screen-item {
        width: 100%;
        border: 1px solid var(--line);
        border-radius: 16px;
        background: var(--surface);
        color: var(--text);
        text-align: left;
        padding: 12px 14px;
        cursor: pointer;
        transition: transform 140ms ease, border-color 140ms ease, background 140ms ease;
      }
      .screen-item:hover {
        transform: translateY(-1px);
        border-color: rgba(43, 108, 176, 0.5);
      }
      .screen-item[data-active="true"] {
        background: linear-gradient(180deg, rgba(43, 108, 176, 0.2), rgba(43, 108, 176, 0.08));
        border-color: rgba(43, 108, 176, 0.58);
        box-shadow: 0 16px 32px rgba(43, 108, 176, 0.14);
      }
      .screen-code {
        display: block;
        font: 700 11px/1.2 "JetBrains Mono", ui-monospace, monospace;
        letter-spacing: 0.16em;
        text-transform: uppercase;
        color: var(--muted);
      }
      .screen-name {
        display: block;
        margin-top: 7px;
        font-size: 14px;
        line-height: 1.45;
        color: var(--text);
      }
      .viewer {
        min-width: 0;
        padding: 22px;
      }
      .viewer-shell {
        display: grid;
        grid-template-rows: auto minmax(0, 1fr);
        height: calc(100vh - 44px);
        gap: 16px;
      }
      .toolbar {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
        border: 1px solid var(--line);
        border-radius: 22px;
        background: rgba(21, 34, 51, 0.88);
        padding: 16px 18px;
        box-shadow: 0 28px 60px var(--shadow);
      }
      .toolbar h2 {
        margin: 0;
        font-size: 22px;
      }
      .toolbar p {
        margin: 6px 0 0;
        font-size: 13px;
        color: var(--muted);
      }
      .toolbar-actions,
      .view-modes {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
      }
      .tool-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-height: 42px;
        border-radius: 14px;
        border: 1px solid var(--line);
        background: var(--surface-2);
        color: var(--text);
        padding: 0 14px;
        text-decoration: none;
        cursor: pointer;
        font-size: 13px;
        font-weight: 600;
      }
      .tool-btn[data-active="true"] {
        background: var(--accent);
        border-color: transparent;
      }
      .preview-stage {
        min-height: 0;
        border: 1px solid var(--line);
        border-radius: 28px;
        background: linear-gradient(180deg, rgba(21, 34, 51, 0.94), rgba(15, 23, 32, 0.94));
        box-shadow: 0 32px 72px var(--shadow);
        padding: 18px;
        overflow: auto;
      }
      .frame-wrap {
        display: flex;
        justify-content: center;
        min-height: 100%;
      }
      .frame-shell {
        width: min(100%, 390px);
        min-height: 100%;
        border-radius: 30px;
        border: 1px solid rgba(255,255,255,0.08);
        background: #0d1620;
        padding: 10px;
        box-shadow: 0 26px 60px rgba(0,0,0,0.32);
        transition: width 180ms ease;
      }
      .frame-shell[data-mode="desktop"] {
        width: min(100%, 1320px);
        border-radius: 22px;
      }
      iframe {
        display: block;
        width: 100%;
        height: calc(100vh - 190px);
        min-height: 720px;
        border: 0;
        border-radius: 22px;
        background: #fff;
      }
      .footer-note {
        margin-top: 12px;
        font-size: 12px;
        color: var(--muted);
      }
      @media (max-width: 1080px) {
        .app {
          grid-template-columns: 1fr;
        }
        .sidebar {
          border-right: 0;
          border-bottom: 1px solid var(--line);
        }
        .screen-list {
          max-height: 320px;
        }
        .viewer-shell {
          height: auto;
        }
        iframe {
          height: 78vh;
          min-height: 620px;
        }
      }
    </style>
  </head>
  <body>
    <div class="app">
      <aside class="sidebar">
        <div class="brand">
          <img src="./${logoFileName}" alt="Legal Saathi" />
          <div>
            <p class="eyebrow">Final Prototype</p>
            <h1 class="title">Legal Saathi User Screens</h1>
            <p class="copy" style="margin-top:10px;">Enterprise legal operations for Bharat.</p>
          </div>
        </div>
        <p class="copy">Browse the finalized user journey screens from onboarding through settings and support. Open this file directly in Safari or Chrome on your MacBook.</p>
        <div class="stats">
          <div class="stat">
            <strong>${screens.length}</strong>
            <span>Final Screens</span>
          </div>
          <div class="stat">
            <strong>S-01</strong>
            <span>Starts Here</span>
          </div>
          <div class="stat">
            <strong>S-32</strong>
            <span>Ends Here</span>
          </div>
        </div>
        <div class="search-wrap">
          <input id="screenSearch" class="search" type="search" placeholder="Search by screen code or title" />
        </div>
        <div id="screenList" class="screen-list"></div>
      </aside>
      <main class="viewer">
        <div class="viewer-shell">
          <section class="toolbar">
            <div>
              <p class="eyebrow" id="currentCode">S-01</p>
              <h2 id="currentTitle">Splash and Onboarding</h2>
              <p id="currentFile">S-01-legal-pro.html</p>
            </div>
            <div class="toolbar-actions">
              <div class="view-modes">
                <button type="button" class="tool-btn" data-mode="mobile">Mobile 390</button>
                <button type="button" class="tool-btn" data-mode="desktop">Desktop 1440</button>
              </div>
              <button type="button" class="tool-btn" id="prevBtn">Previous</button>
              <button type="button" class="tool-btn" id="nextBtn">Next</button>
              <a class="tool-btn" id="openTabBtn" href="#" target="_blank" rel="noreferrer">Open in New Tab</a>
            </div>
          </section>
          <section class="preview-stage">
            <div class="frame-wrap">
              <div class="frame-shell" id="frameShell" data-mode="mobile">
                <iframe id="previewFrame" title="Legal Saathi prototype preview"></iframe>
              </div>
            </div>
            <p class="footer-note">Tip: use the mobile and desktop buttons to preview the same screen in different widths without leaving the prototype.</p>
          </section>
        </div>
      </main>
    </div>
    <script>
      const screens = ${JSON.stringify(screens)};

      const state = {
        index: 0,
        mode: "mobile",
        query: "",
      };

      const elements = {
        list: document.getElementById("screenList"),
        search: document.getElementById("screenSearch"),
        currentCode: document.getElementById("currentCode"),
        currentTitle: document.getElementById("currentTitle"),
        currentFile: document.getElementById("currentFile"),
        frame: document.getElementById("previewFrame"),
        frameShell: document.getElementById("frameShell"),
        prevBtn: document.getElementById("prevBtn"),
        nextBtn: document.getElementById("nextBtn"),
        openTabBtn: document.getElementById("openTabBtn"),
        modeButtons: Array.from(document.querySelectorAll("[data-mode]")),
      };

      const formatCode = (file) => file.replace("-legal-pro.html", "");

      const filteredScreens = () =>
        screens.filter((screen) => {
          const haystack = (screen.file + " " + screen.title).toLowerCase();
          return haystack.includes(state.query.toLowerCase());
        });

      const getActiveScreens = () => {
        const filtered = filteredScreens();
        if (!filtered.length) return screens;
        return filtered;
      };

      const syncToolbar = (screen) => {
        elements.currentCode.textContent = formatCode(screen.file);
        elements.currentTitle.textContent = screen.title;
        elements.currentFile.textContent = screen.file;
        elements.frame.src = screen.file;
        elements.openTabBtn.href = screen.file;
        elements.frameShell.dataset.mode = state.mode;
        elements.modeButtons.forEach((button) => {
          button.dataset.active = button.dataset.mode === state.mode ? "true" : "false";
        });
      };

      const renderList = () => {
        const activeScreens = getActiveScreens();
        const activeScreen = activeScreens[Math.min(state.index, activeScreens.length - 1)] || screens[0];
        state.index = Math.max(0, activeScreens.findIndex((screen) => screen.file === activeScreen.file));
        elements.list.innerHTML = activeScreens
          .map((screen, index) => {
            const active = index === state.index;
            return \`<button type="button" class="screen-item" data-index="\${index}" data-active="\${active ? "true" : "false"}"><span class="screen-code">\${formatCode(screen.file)}</span><span class="screen-name">\${screen.title}</span></button>\`;
          })
          .join("");
        syncToolbar(activeScreen);
      };

      const setScreen = (index) => {
        const activeScreens = getActiveScreens();
        state.index = Math.max(0, Math.min(index, activeScreens.length - 1));
        renderList();
      };

      elements.search.addEventListener("input", (event) => {
        state.query = event.target.value;
        state.index = 0;
        renderList();
      });

      elements.list.addEventListener("click", (event) => {
        const item = event.target.closest("[data-index]");
        if (!item) return;
        setScreen(Number(item.dataset.index));
      });

      elements.prevBtn.addEventListener("click", () => setScreen(state.index - 1));
      elements.nextBtn.addEventListener("click", () => setScreen(state.index + 1));
      elements.modeButtons.forEach((button) => {
        button.addEventListener("click", () => {
          state.mode = button.dataset.mode;
          const activeScreens = getActiveScreens();
          syncToolbar(activeScreens[state.index] || screens[0]);
        });
      });

      document.addEventListener("keydown", (event) => {
        if (event.key === "ArrowDown") setScreen(state.index + 1);
        if (event.key === "ArrowUp") setScreen(state.index - 1);
      });

      renderList();
    </script>
  </body>
</html>
`;

const openCommand = `#!/bin/zsh
cd "$(dirname "$0")"
open "index.html"
`;

fs.writeFileSync(path.join(finalDir, "index.html"), indexHtml, "utf8");
fs.writeFileSync(path.join(finalDir, "open-prototype.command"), openCommand, "utf8");
fs.chmodSync(path.join(finalDir, "open-prototype.command"), 0o755);

console.log(`Built final user prototype with ${screens.length} screens in ${finalDir}`);
