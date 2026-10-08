const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const ARTIFACTS_DIR = path.resolve(__dirname, '../submission_artifacts');

function getBase64(filePath) {
  return fs.readFileSync(filePath).toString('base64');
}

const vscodePng = getBase64(path.join(ARTIFACTS_DIR, 'vscode_project_folder.png'));
const splashPng = getBase64(path.join(ARTIFACTS_DIR, 'mobile_ui_splash.png'));
const homePng = getBase64(path.join(ARTIFACTS_DIR, 'mobile_ui_home.png'));
const explorePng = getBase64(path.join(ARTIFACTS_DIR, 'mobile_ui_explore.png'));
const profilePng = getBase64(path.join(ARTIFACTS_DIR, 'mobile_ui_profile.png'));
const iconPng = getBase64(path.resolve(__dirname, '../assets/images/icon.png'));

const html = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Mobile Application Project Submission</title>
<style>
  @page {
    size: A4;
    margin: 15mm 15mm 15mm 15mm;
  }
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  }
  body {
    background: #ffffff;
    color: #1f2937;
    line-height: 1.5;
    font-size: 13px;
  }
  .page {
    page-break-after: always;
    display: flex;
    flex-direction: column;
    min-height: 250mm;
  }
  .page:last-child {
    page-break-after: avoid;
  }
  
  /* Header & Branding */
  .header {
    border-bottom: 2px solid #2563eb;
    padding-bottom: 12px;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .header-left {
    display: flex;
    align-items: center;
    gap: 14px;
  }
  .header-logo {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(37, 99, 235, 0.25);
  }
  .header-title h1 {
    font-size: 20px;
    color: #111827;
    font-weight: 800;
    letter-spacing: -0.3px;
  }
  .header-title p {
    font-size: 12px;
    color: #6b7280;
  }
  .header-badge {
    background: #eff6ff;
    color: #2563eb;
    padding: 6px 14px;
    border-radius: 20px;
    font-weight: 700;
    font-size: 12px;
    border: 1px solid #bfdbfe;
  }

  /* Section Styling */
  .section-title {
    font-size: 15px;
    font-weight: 700;
    color: #1e3a8a;
    border-left: 4px solid #2563eb;
    padding-left: 10px;
    margin-bottom: 12px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  /* Cards & Callouts */
  .card {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 10px;
    padding: 14px 16px;
    margin-bottom: 16px;
  }
  .link-box {
    background: #ffffff;
    border: 1px solid #cbd5e1;
    border-radius: 8px;
    padding: 10px 14px;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .link-label {
    font-weight: 700;
    font-size: 13px;
    color: #1e293b;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .link-url {
    color: #2563eb;
    font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
    font-size: 12px;
    text-decoration: none;
    font-weight: 600;
  }
  .link-desc {
    font-size: 11px;
    color: #64748b;
    margin-top: 4px;
  }

  /* Table styling */
  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 16px;
    font-size: 12px;
  }
  th, td {
    padding: 8px 12px;
    text-align: left;
    border-bottom: 1px solid #e2e8f0;
  }
  th {
    background: #f1f5f9;
    color: #334155;
    font-weight: 700;
  }
  .status-tag {
    background: #dcfce7;
    color: #15803d;
    padding: 2px 8px;
    border-radius: 12px;
    font-size: 10px;
    font-weight: 700;
    display: inline-block;
  }

  /* Screenshot display */
  .screenshot-container {
    background: #0f172a;
    border-radius: 10px;
    padding: 10px;
    text-align: center;
    margin-bottom: 14px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }
  .screenshot-img {
    max-width: 100%;
    height: auto;
    border-radius: 6px;
    display: block;
    margin: 0 auto;
  }

  /* Mobile Screens Grid */
  .mobile-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-bottom: 16px;
  }
  .mobile-card {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 10px;
    padding: 12px;
    text-align: center;
  }
  .mobile-card h4 {
    font-size: 13px;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 4px;
  }
  .mobile-card p {
    font-size: 11px;
    color: #64748b;
    margin-bottom: 8px;
  }
  .mobile-img {
    max-width: 90%;
    height: auto;
    border-radius: 20px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.15);
    margin: 0 auto;
    display: block;
  }

  .footer {
    margin-top: auto;
    border-top: 1px solid #e2e8f0;
    padding-top: 8px;
    display: flex;
    justify-content: space-between;
    font-size: 11px;
    color: #94a3b8;
  }
</style>
</head>
<body>

  <!-- PAGE 1: Overview & Links -->
  <div class="page">
    <div class="header">
      <div class="header-left">
        <img class="header-logo" src="data:image/png;base64,${iconPng}" alt="App Icon" />
        <div class="header-title">
          <h1>Mobile Application Project Submission</h1>
          <p>Expo SDK 57 &bull; React Native 0.86 &bull; Expo Router</p>
        </div>
      </div>
      <div class="header-badge">VERIFIED &bull; COMPLETED</div>
    </div>

    <div class="section-title">Submission Requirements Checklist</div>
    <table>
      <thead>
        <tr>
          <th>Requirement</th>
          <th>Implementation Details</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>1. New Bottom Tab Screen</strong></td>
          <td>Created <code>src/app/profile.tsx</code> with user avatar, profile stats, themed toggles & system info.</td>
          <td><span class="status-tag">COMPLETED</span></td>
        </tr>
        <tr>
          <td><strong>2. Customize Splash &amp; App Icon</strong></td>
          <td>Custom neon geometric emblem ("Lumina") for app icon (1024x1024), adaptive icons & splash screen.</td>
          <td><span class="status-tag">COMPLETED</span></td>
        </tr>
        <tr>
          <td><strong>3. Themed Components</strong></td>
          <td>Replaced simple <code>View</code> & <code>Text</code> with <code>ThemedView</code> and <code>ThemedText</code> across codebase.</td>
          <td><span class="status-tag">COMPLETED</span></td>
        </tr>
        <tr>
          <td><strong>4. Quality &amp; Linting</strong></td>
          <td>Passed TypeScript typecheck (<code>npx tsc --noEmit</code>) and Expo linter (<code>npx expo lint</code>) with 0 errors.</td>
          <td><span class="status-tag">PASSED (0 ERRORS)</span></td>
        </tr>
      </tbody>
    </table>

    <div class="section-title" style="margin-top: 10px;">1. Project Repository &amp; APK Installer Links</div>
    <div class="card">
      <div class="link-box">
        <div>
          <div class="link-label">&#128187; GitHub Repository Link</div>
          <div class="link-desc">Complete source code, git history, assets, and documentation</div>
        </div>
        <div>
          <a class="link-url" href="https://github.com/ShahzaibJatala/myApp">https://github.com/ShahzaibJatala/myApp</a>
        </div>
      </div>

      <div class="link-box">
        <div>
          <div class="link-label">&#128241; APK Installer Link (Release)</div>
          <div class="link-desc">Direct standalone Android APK package installer</div>
        </div>
        <div>
          <a class="link-url" href="https://github.com/ShahzaibJatala/myApp/releases/download/v1.0.0/myApp-v1.0.0.apk">https://github.com/ShahzaibJatala/myApp/releases/.../myApp-v1.0.0.apk</a>
        </div>
      </div>

      <div class="link-box">
        <div>
          <div class="link-label">&#9729; Expo EAS Cloud Build Link</div>
          <div class="link-desc">Cloud build pipeline, APK artifacts, and preview distributions</div>
        </div>
        <div>
          <a class="link-url" href="https://expo.dev/accounts/shahzaibjatala/projects/myApp/builds">https://expo.dev/accounts/shahzaibjatala/projects/myApp</a>
        </div>
      </div>
    </div>

    <div class="section-title">2. VS Code Project Folder Overview</div>
    <div class="screenshot-container">
      <img class="screenshot-img" src="data:image/png;base64,${vscodePng}" alt="VS Code Project Folder Screenshot" />
    </div>

    <div class="footer">
      <span>Developer: Shahzaib Jatala (shahzaibasifjatala@gmail.com)</span>
      <span>Page 1 of 3</span>
    </div>
  </div>

  <!-- PAGE 2: Mobile UI Screenshots (Splash & Home) -->
  <div class="page">
    <div class="header">
      <div class="header-left">
        <img class="header-logo" src="data:image/png;base64,${iconPng}" alt="App Icon" />
        <div class="header-title">
          <h1>Mobile App UI Screenshots (Part 1)</h1>
          <p>Custom Startup Splash Screen &amp; Home Screen</p>
        </div>
      </div>
      <div class="header-badge">UI MOCKUPS</div>
    </div>

    <div class="section-title">Mobile Screen Demonstrations</div>
    <div class="mobile-grid">
      <div class="mobile-card">
        <h4>Screen 1: Custom Splash Screen</h4>
        <p>Custom neon geometric fox branding with #0D0E15 theme background</p>
        <img class="mobile-img" src="data:image/png;base64,${splashPng}" alt="Splash Screen" />
      </div>

      <div class="mobile-card">
        <h4>Screen 2: Home Screen (Index)</h4>
        <p>Hero banner with custom animated logo, hint rows, and bottom tabs</p>
        <img class="mobile-img" src="data:image/png;base64,${homePng}" alt="Home Screen" />
      </div>
    </div>

    <div class="card">
      <h4 style="font-size: 13px; color: #1e3a8a; margin-bottom: 6px;">Key Features Implemented on Screens 1 &amp; 2:</h4>
      <ul style="padding-left: 18px; font-size: 12px; color: #475569; display: flex; flex-direction: column; gap: 4px;">
        <li>Replaced default Expo splash screen icon and adaptive foreground/background icons in <code>app.json</code>.</li>
        <li>Customized startup splash screen overlay in <code>src/components/animated-icon.tsx</code> with synchronized color theme.</li>
        <li>Refactored <code>src/components/hint-row.tsx</code> from standard <code>View</code> to <code>ThemedView</code>.</li>
        <li>Configured bottom tab bar in <code>src/components/app-tabs.tsx</code> displaying [Home, Explore, Profile].</li>
      </ul>
    </div>

    <div class="footer">
      <span>Mobile Application Project Submission &bull; Shahzaib Jatala</span>
      <span>Page 2 of 3</span>
    </div>
  </div>

  <!-- PAGE 3: Mobile UI Screenshots (Explore & Profile) -->
  <div class="page">
    <div class="header">
      <div class="header-left">
        <img class="header-logo" src="data:image/png;base64,${iconPng}" alt="App Icon" />
        <div class="header-title">
          <h1>Mobile App UI Screenshots (Part 2)</h1>
          <p>Explore Screen &amp; Newly Added Profile Tab Screen</p>
        </div>
      </div>
      <div class="header-badge">UI MOCKUPS</div>
    </div>

    <div class="section-title">Mobile Screen Demonstrations</div>
    <div class="mobile-grid">
      <div class="mobile-card">
        <h4>Screen 3: Explore Screen</h4>
        <p>Collapsible feature explanations built with ThemedView &amp; ThemedText</p>
        <img class="mobile-img" src="data:image/png;base64,${explorePng}" alt="Explore Screen" />
      </div>

      <div class="mobile-card">
        <h4>Screen 4: Profile Tab Screen (NEW)</h4>
        <p>User stats, interactive switches, account security, and build details</p>
        <img class="mobile-img" src="data:image/png;base64,${profilePng}" alt="Profile Screen" />
      </div>
    </div>

    <div class="card">
      <h4 style="font-size: 13px; color: #1e3a8a; margin-bottom: 6px;">Profile Screen Architectural Highlights:</h4>
      <ul style="padding-left: 18px; font-size: 12px; color: #475569; display: flex; flex-direction: column; gap: 4px;">
        <li><strong>Strict Themed Component Usage:</strong> 100% built with <code>ThemedView</code> and <code>ThemedText</code> with automatic light/dark mode adaptation.</li>
        <li><strong>Responsive Insets:</strong> Utilizes <code>useSafeAreaInsets</code> and custom <code>contentInset</code> for notch & dynamic island safety.</li>
        <li><strong>Native &amp; Web Tab Support:</strong> Custom vector tab icon added in <code>assets/images/tabIcons/profile.png</code> with @2x and @3x densities.</li>
        <li><strong>Interactive Controls:</strong> Live themed switches for push notifications, cloud sync, and haptics.</li>
      </ul>
    </div>

    <div class="footer">
      <span>Mobile Application Project Submission &bull; Shahzaib Jatala</span>
      <span>Page 3 of 3</span>
    </div>
  </div>

</body>
</html>
`;

const htmlPath = path.join(ARTIFACTS_DIR, 'submission_report.html');
const pdfPath = path.join(ARTIFACTS_DIR, 'Project_Submission.pdf');
const rootPdfPath = path.resolve(__dirname, '../Project_Submission.pdf');

fs.writeFileSync(htmlPath, html);
console.log(`Saved HTML report to ${htmlPath}`);

console.log('Compiling PDF with headless Chrome...');
const cmd = `"${CHROME_PATH}" --headless=new --disable-gpu --run-all-compositor-stages-before-draw --print-to-pdf="${pdfPath}" "file:///${htmlPath.replace(/\\/g, '/')}"`;
execSync(cmd);

fs.copyFileSync(pdfPath, rootPdfPath);
console.log(`Generated PDF at ${pdfPath}`);
console.log(`Copied PDF to root: ${rootPdfPath}`);
console.log('All submission artifacts generated successfully!');
