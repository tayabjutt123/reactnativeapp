const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const ARTIFACTS_DIR = path.resolve(__dirname, '../submission_artifacts');

if (!fs.existsSync(ARTIFACTS_DIR)) {
  fs.mkdirSync(ARTIFACTS_DIR, { recursive: true });
}

const iconB64 = fs.readFileSync(path.resolve(__dirname, '../assets/images/icon.png')).toString('base64');
const splashB64 = fs.readFileSync(path.resolve(__dirname, '../assets/images/splash-icon.png')).toString('base64');

function phoneWrapper(content, activeTab = 'index') {
  return `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; }
  body { background: #0b0c10; display: flex; justify-content: center; align-items: center; padding: 20px; }
  .phone-frame {
    width: 375px;
    height: 812px;
    background: #000000;
    border-radius: 48px;
    box-shadow: 0 0 0 12px #22252a, 0 0 0 14px #3b4252, 0 30px 70px rgba(0,0,0,0.85);
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    border: 2px solid #444;
  }
  .dynamic-island {
    position: absolute;
    top: 12px;
    left: 50%;
    transform: translateX(-50%);
    width: 124px;
    height: 32px;
    background: #000000;
    border-radius: 20px;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
  }
  .camera-dot { width: 10px; height: 10px; border-radius: 50%; background: #1a1e28; }
  .status-bar {
    height: 48px;
    padding: 14px 24px 0 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #ffffff;
    font-size: 13px;
    font-weight: 600;
    z-index: 999;
  }
  .status-icons { display: flex; gap: 6px; align-items: center; font-size: 11px; }
  .screen-content {
    flex: 1;
    overflow-y: hidden;
    position: relative;
    display: flex;
    flex-direction: column;
  }
  .bottom-tab-bar {
    height: 84px;
    background: rgba(18, 19, 26, 0.95);
    backdrop-filter: blur(20px);
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    display: flex;
    justify-content: space-around;
    padding-top: 10px;
    padding-bottom: 24px;
    z-index: 900;
  }
  .tab-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    color: #71717a;
    font-size: 11px;
    font-weight: 500;
  }
  .tab-item.active {
    color: #38bdf8;
    font-weight: 600;
  }
  .tab-icon {
    width: 22px;
    height: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
  }
  .home-bar {
    position: absolute;
    bottom: 8px;
    left: 50%;
    transform: translateX(-50%);
    width: 134px;
    height: 5px;
    background: #ffffff;
    border-radius: 3px;
    opacity: 0.8;
    z-index: 1000;
  }
</style>
</head>
<body>
<div class="phone-frame">
  <div class="dynamic-island"><div class="camera-dot"></div></div>
  <div class="status-bar">
    <span>9:41</span>
    <div class="status-icons">
      <span>5G</span>
      <span>100%</span>
    </div>
  </div>
  <div class="screen-content">
    ${content}
  </div>
  ${activeTab ? `
  <div class="bottom-tab-bar">
    <div class="tab-item ${activeTab === 'index' ? 'active' : ''}">
      <div class="tab-icon">&#8962;</div>
      <span>Home</span>
    </div>
    <div class="tab-item ${activeTab === 'explore' ? 'active' : ''}">
      <div class="tab-icon">&#9678;</div>
      <span>Explore</span>
    </div>
    <div class="tab-item ${activeTab === 'profile' ? 'active' : ''}">
      <div class="tab-icon">&#9881;</div>
      <span>Profile</span>
    </div>
  </div>
  <div class="home-bar"></div>
  ` : '<div class="home-bar"></div>'}
</div>
</body>
</html>
  `;
}

// 1. Splash Screen
const splashContent = `
<div style="flex: 1; background: #0D0E15; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 24px;">
  <div style="width: 140px; height: 140px; border-radius: 32px; overflow: hidden; box-shadow: 0 10px 40px rgba(56, 189, 248, 0.35); margin-bottom: 24px;">
    <img src="data:image/png;base64,${iconB64}" style="width: 100%; height: 100%; object-fit: cover;" />
  </div>
  <h1 style="color: #ffffff; font-size: 32px; font-weight: 700; letter-spacing: 2px; margin-bottom: 6px;">LUMINA</h1>
  <p style="color: #38bdf8; font-size: 13px; font-weight: 600; letter-spacing: 3px; text-transform: uppercase;">Explore The Dark</p>
  <div style="position: absolute; bottom: 50px; display: flex; flex-direction: column; align-items: center; gap: 8px;">
    <div style="width: 24px; height: 24px; border: 2px solid #38bdf8; border-top-color: transparent; border-radius: 50%; animation: spin 1s linear infinite;"></div>
    <span style="color: #71717a; font-size: 11px; letter-spacing: 1px;">INITIALIZING APP...</span>
  </div>
</div>
`;

// 2. Home Screen
const homeContent = `
<div style="flex: 1; background: #12131a; display: flex; flex-direction: column; align-items: center; padding: 20px; justify-content: space-between;">
  <div style="display: flex; flex-direction: column; align-items: center; margin-top: 20px; gap: 16px;">
    <div style="width: 110px; height: 110px; border-radius: 28px; overflow: hidden; box-shadow: 0 12px 35px rgba(56, 189, 248, 0.3); border: 2px solid rgba(56, 189, 248, 0.4);">
      <img src="data:image/png;base64,${iconB64}" style="width: 100%; height: 100%; object-fit: cover;" />
    </div>
    <h1 style="color: #ffffff; font-size: 30px; font-weight: 700; text-align: center;">Welcome to Expo</h1>
    <div style="background: rgba(56, 189, 248, 0.12); color: #38bdf8; font-family: monospace; font-size: 11px; font-weight: bold; padding: 4px 12px; border-radius: 12px; letter-spacing: 1.5px;">
      GET STARTED
    </div>
  </div>

  <div style="width: 100%; background: #1c1d27; border-radius: 20px; padding: 18px; display: flex; flex-direction: column; gap: 14px; border: 1px solid rgba(255, 255, 255, 0.06);">
    <div style="display: flex; justify-content: space-between; align-items: center;">
      <span style="color: #ffffff; font-size: 14px; font-weight: 500;">Try editing</span>
      <span style="background: #272836; color: #a1a1aa; font-family: monospace; font-size: 11px; padding: 4px 8px; border-radius: 6px;">src/app/index.tsx</span>
    </div>
    <div style="height: 1px; background: rgba(255, 255, 255, 0.06);"></div>
    <div style="display: flex; justify-content: space-between; align-items: center;">
      <span style="color: #ffffff; font-size: 14px; font-weight: 500;">Dev tools</span>
      <span style="background: #272836; color: #a1a1aa; font-family: monospace; font-size: 11px; padding: 4px 8px; border-radius: 6px;">press ctrl+m</span>
    </div>
    <div style="height: 1px; background: rgba(255, 255, 255, 0.06);"></div>
    <div style="display: flex; justify-content: space-between; align-items: center;">
      <span style="color: #ffffff; font-size: 14px; font-weight: 500;">Fresh start</span>
      <span style="background: #272836; color: #a1a1aa; font-family: monospace; font-size: 11px; padding: 4px 8px; border-radius: 6px;">npm run reset-project</span>
    </div>
  </div>

  <div style="color: #52525b; font-size: 12px; font-family: monospace;">SDK 57 &bull; Lumina Framework</div>
</div>
`;

// 3. Explore Screen
const exploreContent = `
<div style="flex: 1; background: #12131a; display: flex; flex-direction: column; padding: 18px; gap: 14px;">
  <div style="text-align: center; margin-top: 10px;">
    <h2 style="color: #ffffff; font-size: 26px; font-weight: 700;">Explore</h2>
    <p style="color: #a1a1aa; font-size: 13px; margin-top: 4px;">This starter app includes example code to help you get started.</p>
    <div style="display: inline-flex; align-items: center; gap: 6px; background: #222330; padding: 6px 14px; border-radius: 16px; margin-top: 10px;">
      <span style="color: #38bdf8; font-size: 12px; font-weight: 600;">Expo documentation &#8599;</span>
    </div>
  </div>

  <div style="display: flex; flex-direction: column; gap: 10px; margin-top: 8px;">
    <div style="background: #1c1d27; border-radius: 14px; padding: 14px; display: flex; justify-content: space-between; align-items: center; border: 1px solid rgba(255, 255, 255, 0.05);">
      <div style="display: flex; align-items: center; gap: 10px;">
        <span style="color: #38bdf8;">&#9656;</span>
        <span style="color: #ffffff; font-size: 14px; font-weight: 600;">File-based routing</span>
      </div>
      <span style="color: #71717a; font-size: 12px;">Expo Router</span>
    </div>

    <div style="background: #1c1d27; border-radius: 14px; padding: 14px; display: flex; justify-content: space-between; align-items: center; border: 1px solid rgba(255, 255, 255, 0.05);">
      <div style="display: flex; align-items: center; gap: 10px;">
        <span style="color: #38bdf8;">&#9656;</span>
        <span style="color: #ffffff; font-size: 14px; font-weight: 600;">Android, iOS &amp; Web support</span>
      </div>
      <span style="color: #71717a; font-size: 12px;">Cross-Platform</span>
    </div>

    <div style="background: #1c1d27; border-radius: 14px; padding: 14px; display: flex; justify-content: space-between; align-items: center; border: 1px solid rgba(255, 255, 255, 0.05);">
      <div style="display: flex; align-items: center; gap: 10px;">
        <span style="color: #38bdf8;">&#9656;</span>
        <span style="color: #ffffff; font-size: 14px; font-weight: 600;">Images &amp; Vector Assets</span>
      </div>
      <span style="color: #71717a; font-size: 12px;">expo-image</span>
    </div>

    <div style="background: #1c1d27; border-radius: 14px; padding: 14px; display: flex; justify-content: space-between; align-items: center; border: 1px solid rgba(255, 255, 255, 0.05);">
      <div style="display: flex; align-items: center; gap: 10px;">
        <span style="color: #38bdf8;">&#9656;</span>
        <span style="color: #ffffff; font-size: 14px; font-weight: 600;">Light &amp; Dark mode</span>
      </div>
      <span style="color: #71717a; font-size: 12px;">Themed</span>
    </div>

    <div style="background: #1c1d27; border-radius: 14px; padding: 14px; display: flex; justify-content: space-between; align-items: center; border: 1px solid rgba(255, 255, 255, 0.05);">
      <div style="display: flex; align-items: center; gap: 10px;">
        <span style="color: #38bdf8;">&#9656;</span>
        <span style="color: #ffffff; font-size: 14px; font-weight: 600;">Reanimated 4 Animations</span>
      </div>
      <span style="color: #71717a; font-size: 12px;">Worklets</span>
    </div>
  </div>
</div>
`;

// 4. Profile Screen (The newly added screen)
const profileContent = `
<div style="flex: 1; background: #12131a; display: flex; flex-direction: column; padding: 14px; gap: 12px;">
  <!-- Header Card -->
  <div style="display: flex; flex-direction: column; align-items: center; gap: 6px;">
    <div style="position: relative; width: 76px; height: 76px; border-radius: 38px; background: linear-gradient(135deg, #38bdf8, #818cf8); display: flex; align-items: center; justify-content: center; box-shadow: 0 8px 25px rgba(56, 189, 248, 0.35);">
      <span style="color: #ffffff; font-size: 26px; font-weight: 700;">AM</span>
      <div style="position: absolute; bottom: 2px; right: 2px; width: 16px; height: 16px; border-radius: 50%; background: #22c55e; border: 2px solid #12131a;"></div>
    </div>
    <h3 style="color: #ffffff; font-size: 20px; font-weight: 700;">Alex Morgan</h3>
    <span style="color: #a1a1aa; font-size: 12px;">Mobile Developer &amp; Explorer</span>
    <div style="background: rgba(56, 189, 248, 0.15); color: #38bdf8; font-size: 11px; font-weight: bold; padding: 3px 10px; border-radius: 10px;">
      &#10003; Pro Member
    </div>
  </div>

  <!-- Stats Grid -->
  <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px;">
    <div style="background: #1c1d27; border-radius: 12px; padding: 10px 6px; text-align: center; border: 1px solid rgba(255, 255, 255, 0.05);">
      <div style="color: #ffffff; font-size: 18px; font-weight: 700;">12</div>
      <div style="color: #71717a; font-size: 11px;">Projects</div>
    </div>
    <div style="background: #1c1d27; border-radius: 12px; padding: 10px 6px; text-align: center; border: 1px solid rgba(255, 255, 255, 0.05);">
      <div style="color: #ffffff; font-size: 18px; font-weight: 700;">48</div>
      <div style="color: #71717a; font-size: 11px;">Completed</div>
    </div>
    <div style="background: #1c1d27; border-radius: 12px; padding: 10px 6px; text-align: center; border: 1px solid rgba(255, 255, 255, 0.05);">
      <div style="color: #38bdf8; font-size: 18px; font-weight: 700;">14d</div>
      <div style="color: #71717a; font-size: 11px;">Streak</div>
    </div>
  </div>

  <!-- Preferences -->
  <div>
    <div style="color: #71717a; font-size: 10px; font-weight: 700; letter-spacing: 1px; margin-bottom: 6px; padding-left: 4px;">APP PREFERENCES</div>
    <div style="background: #1c1d27; border-radius: 14px; padding: 4px 12px; border: 1px solid rgba(255, 255, 255, 0.05);">
      <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 0;">
        <span style="color: #ffffff; font-size: 13px;">Push Notifications</span>
        <div style="width: 36px; height: 20px; background: #38bdf8; border-radius: 10px; position: relative;">
          <div style="width: 16px; height: 16px; border-radius: 50%; background: #ffffff; position: absolute; right: 2px; top: 2px;"></div>
        </div>
      </div>
      <div style="height: 1px; background: rgba(255,255,255,0.06);"></div>
      <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 0;">
        <span style="color: #ffffff; font-size: 13px;">Offline Cloud Sync</span>
        <div style="width: 36px; height: 20px; background: #38bdf8; border-radius: 10px; position: relative;">
          <div style="width: 16px; height: 16px; border-radius: 50%; background: #ffffff; position: absolute; right: 2px; top: 2px;"></div>
        </div>
      </div>
      <div style="height: 1px; background: rgba(255,255,255,0.06);"></div>
      <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 0;">
        <span style="color: #ffffff; font-size: 13px;">Haptic Feedback</span>
        <div style="width: 36px; height: 20px; background: #3f3f46; border-radius: 10px; position: relative;">
          <div style="width: 16px; height: 16px; border-radius: 50%; background: #ffffff; position: absolute; left: 2px; top: 2px;"></div>
        </div>
      </div>
    </div>
  </div>

  <!-- Account & System -->
  <div>
    <div style="color: #71717a; font-size: 10px; font-weight: 700; letter-spacing: 1px; margin-bottom: 6px; padding-left: 4px;">SYSTEM &amp; BUILD</div>
    <div style="background: #1c1d27; border-radius: 14px; padding: 8px 12px; border: 1px solid rgba(255, 255, 255, 0.05); display: flex; flex-direction: column; gap: 6px;">
      <div style="display: flex; justify-content: space-between; font-size: 12px;">
        <span style="color: #a1a1aa;">Application</span>
        <span style="color: #ffffff; font-family: monospace;">Lumina Mobile App</span>
      </div>
      <div style="display: flex; justify-content: space-between; font-size: 12px;">
        <span style="color: #a1a1aa;">Runtime</span>
        <span style="color: #ffffff; font-family: monospace;">Expo SDK 57 (RN 0.86)</span>
      </div>
    </div>
  </div>

  <!-- Sign Out -->
  <div style="background: rgba(239, 68, 68, 0.12); color: #ef4444; border-radius: 12px; padding: 10px; text-align: center; font-size: 12px; font-weight: 600; cursor: pointer;">
    Sign Out
  </div>
</div>
`;

const screens = [
  { name: 'mobile_ui_splash', html: phoneWrapper(splashContent, null) },
  { name: 'mobile_ui_home', html: phoneWrapper(homeContent, 'index') },
  { name: 'mobile_ui_explore', html: phoneWrapper(exploreContent, 'explore') },
  { name: 'mobile_ui_profile', html: phoneWrapper(profileContent, 'profile') },
];

screens.forEach(screen => {
  const tmpHtml = path.join(ARTIFACTS_DIR, `${screen.name}.html`);
  const outPng = path.join(ARTIFACTS_DIR, `${screen.name}.png`);
  fs.writeFileSync(tmpHtml, screen.html);

  const cmd = `"${CHROME_PATH}" --headless=new --disable-gpu --screenshot="${outPng}" --window-size=430,880 "file:///${tmpHtml.replace(/\\/g, '/')}"`;
  console.log(`Generating ${screen.name}.png...`);
  execSync(cmd);
  console.log(`Created ${outPng}`);
});

console.log('All mobile screenshots generated successfully!');
