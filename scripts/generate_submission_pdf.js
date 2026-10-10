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
<title>Mobile Application Development - Assignment 02 Submission</title>
<style>
  @page {
    size: A4;
    margin: 12mm 14mm 12mm 14mm;
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
    line-height: 1.45;
    font-size: 12.5px;
  }
  .page {
    page-break-after: always;
    display: flex;
    flex-direction: column;
    min-height: 260mm;
  }
  .page:last-child {
    page-break-after: avoid;
  }
  
  /* Header & Branding */
  .header {
    border-bottom: 2px solid #2563eb;
    padding-bottom: 10px;
    margin-bottom: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .header-left {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .header-logo {
    width: 44px;
    height: 44px;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(37, 99, 235, 0.25);
  }
  .header-title h1 {
    font-size: 19px;
    color: #111827;
    font-weight: 800;
    letter-spacing: -0.3px;
  }
  .header-title p {
    font-size: 11.5px;
    color: #6b7280;
  }
  .header-badge {
    background: #eff6ff;
    color: #2563eb;
    padding: 5px 12px;
    border-radius: 20px;
    font-weight: 700;
    font-size: 11px;
    border: 1px solid #bfdbfe;
    text-align: right;
  }

  /* Section Styling */
  .section-title {
    font-size: 14px;
    font-weight: 700;
    color: #1e3a8a;
    border-left: 4px solid #2563eb;
    padding-left: 10px;
    margin-bottom: 10px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  /* Cards & Callouts */
  .card {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 12px 14px;
    margin-bottom: 14px;
  }
  .link-box {
    background: #ffffff;
    border: 1px solid #cbd5e1;
    border-radius: 8px;
    padding: 9px 12px;
    margin-bottom: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .link-label {
    font-weight: 700;
    font-size: 12.5px;
    color: #1e293b;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .link-url {
    color: #2563eb;
    font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
    font-size: 11.5px;
    text-decoration: none;
    font-weight: 600;
  }
  .link-desc {
    font-size: 10.5px;
    color: #64748b;
    margin-top: 2px;
  }

  /* Table styling */
  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 14px;
    font-size: 11.5px;
  }
  th, td {
    padding: 7px 10px;
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
    padding: 2px 7px;
    border-radius: 10px;
    font-size: 9.5px;
    font-weight: 700;
    display: inline-block;
  }

  /* Screenshot display */
  .screenshot-container {
    background: #0f172a;
    border-radius: 8px;
    padding: 8px;
    text-align: center;
    margin-bottom: 10px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
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
    gap: 14px;
    margin-bottom: 12px;
  }
  .mobile-card {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 10px;
    text-align: center;
  }
  .mobile-card h4 {
    font-size: 12px;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 3px;
  }
  .mobile-card p {
    font-size: 10.5px;
    color: #64748b;
    margin-bottom: 6px;
  }
  .mobile-img {
    max-width: 88%;
    height: auto;
    border-radius: 18px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    margin: 0 auto;
    display: block;
  }

  .footer {
    margin-top: auto;
    border-top: 1px solid #e2e8f0;
    padding-top: 6px;
    display: flex;
    justify-content: space-between;
    font-size: 10.5px;
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
          <h1>Assignment 02: Bottom Tab Bar, Splash Screen &amp; App Icon</h1>
          <p>Mobile Application Development &bull; Student: Muhammad Tayyab &bull; Expo SDK 57</p>
        </div>
      </div>
      <div class="header-badge">DUE: 10-OCT-2026<br><span style="color:#16a34a;">VERIFIED</span></div>
    </div>

    <div class="section-title">Assignment Requirements Checklist</div>
    <table>
      <thead>
        <tr>
          <th>Required Addition</th>
          <th>Implementation Details</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>1. Add New Bottom Tab Screen</strong></td>
          <td>Created <code>src/app/profile.tsx</code> with Profile header, stats cards, themed preference toggles, and system info.</td>
          <td><span class="status-tag">COMPLETED</span></td>
        </tr>
        <tr>
          <td><strong>2. Customize Splash &amp; App Icon</strong></td>
          <td>Replaced default assets with custom neon fox logo ("Lumina") for app icon (1024x1024), adaptive icons & splash screen.</td>
          <td><span class="status-tag">COMPLETED</span></td>
        </tr>
        <tr>
          <td><strong>3. Use Themed Components</strong></td>
          <td>Replaced simple <code>View</code> & <code>Text</code> with <code>ThemedView</code> and <code>ThemedText</code> across entire codebase.</td>
          <td><span class="status-tag">COMPLETED</span></td>
        </tr>
        <tr>
          <td><strong>4. Extension of Assignment 01</strong></td>
          <td>Extended existing project with personalized Home Screen, Explore Screen, and new Profile Screen.</td>
          <td><span class="status-tag">COMPLETED</span></td>
        </tr>
      </tbody>
    </table>

    <div class="section-title">1. Project Links (GitHub &amp; APK Installer)</div>
    <div class="card">
      <div class="link-box">
        <div>
          <div class="link-label">&#128187; GitHub Repository Link</div>
          <div class="link-desc">Complete source code, git commits, configuration, and documentation</div>
        </div>
        <div>
          <a class="link-url" href="https://github.com/tayabjutt123/reactnativeapp">https://github.com/tayabjutt123/reactnativeapp</a>
        </div>
      </div>

      <div class="link-box">
        <div>
          <div class="link-label">&#128241; APK Installer Link (Standalone Release)</div>
          <div class="link-desc">Direct standalone Android APK package installer for testing &amp; grading</div>
        </div>
        <div>
          <a class="link-url" href="https://github.com/tayabjutt123/reactnativeapp/releases/download/v1.0.0/app-release.apk">https://github.com/tayabjutt123/reactnativeapp/.../app-release.apk</a>
        </div>
      </div>

      <div class="link-box">
        <div>
          <div class="link-label">&#9729; Expo EAS Build Project Link</div>
          <div class="link-desc">Expo Application Services cloud build pipeline &amp; distribution URL</div>
        </div>
        <div>
          <a class="link-url" href="https://expo.dev/accounts/tayabjutt/projects/myApp/builds">https://expo.dev/accounts/tayabjutt/projects/myApp/builds</a>
        </div>
      </div>
    </div>

    <div class="section-title">2. VS Code Project Folder Screenshot</div>
    <div class="screenshot-container">
      <img class="screenshot-img" src="data:image/png;base64,${vscodePng}" alt="VS Code Project Folder Screenshot" />
    </div>

    <div class="footer">
      <span>Student: Muhammad Tayyab (tayabjutt123) &bull; Project: reactnativeapp</span>
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
          <p>Custom Startup Splash Screen &amp; Home Screen (Hy! I am Tayyab)</p>
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
        <p>Personalized intro banner, feature highlight cards, and bottom tabs</p>
        <img class="mobile-img" src="data:image/png;base64,${homePng}" alt="Home Screen" />
      </div>
    </div>

    <div class="card">
      <h4 style="font-size: 12px; color: #1e3a8a; margin-bottom: 5px;">Implementation Highlights for Screens 1 &amp; 2:</h4>
      <ul style="padding-left: 16px; font-size: 11.5px; color: #475569; display: flex; flex-direction: column; gap: 3px;">
        <li>Replaced default splash screen image with customized high-resolution design in <code>app.json</code> and <code>assets/images/splash-icon.png</code>.</li>
        <li>Customized startup splash screen overlay in <code>src/components/animated-icon.tsx</code> with matching background color <code>#0D0E15</code>.</li>
        <li>Home Screen extended from Assignment 01: personalized with "Hy! I am Tayyab" and clean feature overview cards.</li>
        <li>Integrated bottom tab navigation with custom template tab icons [Home, Explore, Profile].</li>
      </ul>
    </div>

    <div class="footer">
      <span>Assignment 02: Bottom Tab Bar, Splash Screen and App Icon &bull; Muhammad Tayyab</span>
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
        <p>Collapsible feature explanations updated for 3 bottom tabs</p>
        <img class="mobile-img" src="data:image/png;base64,${explorePng}" alt="Explore Screen" />
      </div>

      <div class="mobile-card">
        <h4>Screen 4: Profile Tab Screen (NEW)</h4>
        <p>Developer profile, stats grid, interactive switches, and system info</p>
        <img class="mobile-img" src="data:image/png;base64,${profilePng}" alt="Profile Screen" />
      </div>
    </div>

    <div class="card">
      <h4 style="font-size: 12px; color: #1e3a8a; margin-bottom: 5px;">Profile Screen Architectural Highlights:</h4>
      <ul style="padding-left: 16px; font-size: 11.5px; color: #475569; display: flex; flex-direction: column; gap: 3px;">
        <li><strong>Strict Themed Component Usage:</strong> 100% built using <code>ThemedView</code> and <code>ThemedText</code> for automatic dark/light theme switching.</li>
        <li><strong>Meaningful Application Content:</strong> Displays Muhammad Tayyab's developer credentials, quick project metrics, and preferences.</li>
        <li><strong>Interactive Controls:</strong> Live toggles for Push Notifications, Offline Cloud Sync, and Haptic Feedback.</li>
        <li><strong>Quality Verification:</strong> Codebase verified with <code>npx expo lint</code> (0 warnings, 0 errors) and <code>npx tsc --noEmit</code> (0 errors).</li>
      </ul>
    </div>

    <div class="footer">
      <span>Assignment 02: Bottom Tab Bar, Splash Screen and App Icon &bull; Muhammad Tayyab</span>
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

console.log('Compiling updated PDF with headless Chrome...');
const cmd = `"${CHROME_PATH}" --headless=new --disable-gpu --run-all-compositor-stages-before-draw --print-to-pdf="${pdfPath}" "file:///${htmlPath.replace(/\\/g, '/')}"`;
execSync(cmd);

fs.copyFileSync(pdfPath, rootPdfPath);
console.log(`Generated PDF at ${pdfPath}`);
console.log(`Copied PDF to root: ${rootPdfPath}`);
console.log('All submission artifacts generated successfully!');
