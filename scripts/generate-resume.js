const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { pathToFileURL } = require('url');

const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Allan K J - Resume</title>
  <style>
    @page {
      size: A4;
      margin: 7mm 11mm 7mm 11mm;
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      color: #1a1a1a;
      background: #ffffff;
      line-height: 1.3;
      font-size: 8.3pt;
    }
    a {
      color: #111;
      text-decoration: none;
    }
    .header {
      text-align: center;
      margin-bottom: 7px;
      padding-bottom: 4px;
      border-bottom: 1.5px solid #1a1a1a;
    }
    .name {
      font-size: 18pt;
      font-weight: 800;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      color: #0c0d12;
      margin-bottom: 2px;
    }
    .contact-line {
      font-size: 8pt;
      color: #333;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 8px;
    }
    .contact-sep {
      color: #888;
    }
    .section {
      margin-bottom: 6px;
    }
    .section-title {
      font-size: 8.8pt;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.07em;
      color: #0c0d12;
      border-bottom: 1px solid #ccc;
      padding-bottom: 1px;
      margin-bottom: 3.5px;
    }
    .summary-text {
      font-size: 8.2pt;
      color: #2b2b2b;
      line-height: 1.35;
      text-align: justify;
    }
    .item {
      margin-bottom: 4px;
    }
    .item-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
    }
    .item-title {
      font-size: 8.7pt;
      font-weight: 700;
      color: #111;
    }
    .item-subtitle {
      font-size: 8.2pt;
      font-weight: 600;
      color: #333;
    }
    .item-meta {
      font-size: 7.8pt;
      color: #555;
      font-style: italic;
    }
    .item-desc {
      font-size: 8pt;
      color: #333;
      margin-top: 1px;
      line-height: 1.3;
    }
    .bullets {
      margin-left: 14px;
      margin-top: 1px;
    }
    .bullets li {
      font-size: 8pt;
      color: #333;
      margin-bottom: 1px;
      line-height: 1.3;
    }
    .skills-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 8.2pt;
    }
    .skills-table td {
      padding: 1px 0;
      vertical-align: top;
    }
    .skills-label {
      font-weight: 700;
      width: 90px;
      color: #111;
    }
    .skills-value {
      color: #2b2b2b;
    }
    .cert-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 3px 12px;
    }
    .cert-item {
      font-size: 8pt;
      margin-bottom: 1.5px;
    }
    .cert-name {
      font-weight: 700;
      color: #111;
    }
    .cert-issuer {
      color: #555;
      font-size: 7.5pt;
      font-style: italic;
    }
    .cert-desc {
      color: #333;
      font-size: 7.5pt;
      line-height: 1.22;
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="name">Allan K. J</div>
    <div class="contact-line">
      <span>Coimbatore, Tamil Nadu, India</span>
      <span class="contact-sep">|</span>
      <span>+91 93614 09760</span>
      <span class="contact-sep">|</span>
      <span><a href="mailto:allan22kj@gmail.com">allan22kj@gmail.com</a></span>
      <span class="contact-sep">|</span>
      <span><a href="https://linkedin.com/in/allan-k-j-21389838a">LinkedIn Profile</a></span>
      <span class="contact-sep">|</span>
      <span><a href="https://github.com/ALLAN-KJ">GitHub Profile</a></span>
    </div>
  </div>

  <div class="section">
    <div class="section-title">Professional Summary</div>
    <p class="summary-text">
      Second-year Computer Science Engineering student specializing in Cybersecurity, with hands-on experience across enterprise IT security, networking, and full-stack development gained through internships and hackathons. Comfortable working directly with production systems, from enterprise IT security operations at ZF Group to shipping a complete web application in a five-day build sprint. Particularly interested in the intersection of system security and practical software development, with a growing foundation in Linux administration, network fundamentals, and applied AI tools.
    </p>
  </div>

  <div class="section">
    <div class="section-title">Education</div>
    <div class="item">
      <div class="item-header">
        <span class="item-title">Karunya Institute of Technology and Sciences</span>
        <span class="item-meta">Coimbatore, India</span>
      </div>
      <div class="item-header">
        <span class="item-subtitle">B.Tech – Computer Science & Engineering (Specialisation: Cybersecurity)</span>
        <span class="item-meta">Expected: May 2029</span>
      </div>
      <div class="item-desc">CGPA: 7.06 / 10 (Overall)</div>
    </div>
  </div>

  <div class="section">
    <div class="section-title">Internship Experience</div>
    <div class="item">
      <div class="item-header">
        <span class="item-title">ZF Group (ZF Friedrichshafen AG)</span>
        <span class="item-meta">June 2 – July 3, 2026</span>
      </div>
      <div class="item-header">
        <span class="item-subtitle">IT Security & Networking Intern | In-Person | Coimbatore, India</span>
      </div>
      <div class="item-desc">Worked with the IT security and operations team at a global automotive technology company, learning core networking and cybersecurity concepts.</div>
    </div>
    <div class="item">
      <div class="item-header">
        <span class="item-title">Conesta Forge (powered by Fludigo)</span>
        <span class="item-meta">June 21 – 26, 2026</span>
      </div>
      <div class="item-header">
        <span class="item-subtitle">5-Day AI Build Sprint | Remote</span>
      </div>
      <div class="item-desc">Built and shipped "Tool Finder" solo, from blank idea to live product in five days, under a hard deadline. Finished #33 on the program leaderboard.</div>
    </div>
    <div class="item">
      <div class="item-header">
        <span class="item-title">Qaroo</span>
        <span class="item-meta">June 1 – 20, 2026</span>
      </div>
      <div class="item-header">
        <span class="item-subtitle">Software Intern | Remote</span>
      </div>
      <div class="item-desc">Completed a three-week internship covering the basics of full-stack development and API integration.</div>
    </div>
  </div>

  <div class="section">
    <div class="section-title">Technical Skills</div>
    <table class="skills-table">
      <tr>
        <td class="skills-label">Languages:</td>
        <td class="skills-value">Python, C, Java, TypeScript, HTML, CSS, JavaScript</td>
      </tr>
      <tr>
        <td class="skills-label">APIs & Tools:</td>
        <td class="skills-value">ElevenLabs API, Groq API, Antigravity, Docker, Git, VS Code</td>
      </tr>
      <tr>
        <td class="skills-label">Domains:</td>
        <td class="skills-value">Cybersecurity, System Design, IoT, Linux System Administration</td>
      </tr>
    </table>
  </div>

  <div class="section">
    <div class="section-title">Projects</div>
    <div class="item">
      <div class="item-header">
        <span class="item-title">Personal Portfolio Website — 3D Interactive Site</span>
        <span class="item-meta"><a href="https://allan-kj.github.io">allan-kj.github.io</a></span>
      </div>
      <div class="item-subtitle">Next.js 15, TypeScript, Three.js, React Three Fiber, GSAP, Tailwind CSS, Lenis</div>
      <ul class="bullets">
        <li>Built an interactive 3D portfolio featuring a bash terminal emulator and Miles Morales-inspired kinetic glitch typography.</li>
        <li>Implemented physics-based momentum scrolling (Lenis) with GSAP animations and post-processing effects.</li>
      </ul>
    </div>
    <div class="item">
      <div class="item-header">
        <span class="item-title">Smart India Hackathon (SIH) 2026 — Problem Statement 26160 (IPsec Sentinel)</span>
        <span class="item-meta"><a href="https://sih-2026-frontend-eight.vercel.app">sih-2026-frontend-eight.vercel.app</a></span>
      </div>
      <div class="item-desc">Built and deployed a full-stack solution for SIH 2026 Problem Statement 26160. Deployed frontend on Vercel and backend on Render; live and accessible to all users.</div>
    </div>
    <div class="item">
      <div class="item-header">
        <span class="item-title">Student LMS Platform</span>
        <span class="item-meta"><a href="https://student-lms-vds8.onrender.com/">student-lms-vds8.onrender.com</a></span>
      </div>
      <div class="item-desc">Built a full-stack learning management system during the Qaroo internship, with API integration and live student-facing features.</div>
    </div>
    <div class="item">
      <div class="item-header">
        <span class="item-title">GHOST — AI Voice Assistant (In Progress)</span>
        <span class="item-meta">Python, SpeechRecognition, NLP</span>
      </div>
      <div class="item-desc">Building a voice-controlled AI assistant that sends WhatsApp messages and opens websites like Google and YouTube.</div>
    </div>
    <div class="item">
      <div class="item-header">
        <span class="item-title">Education-Themed 3D Website (In Progress)</span>
        <span class="item-meta">Next.js, Three.js, GSAP</span>
      </div>
      <div class="item-desc">Designing a book-shaped, themed website for interactive education.</div>
    </div>
  </div>

  <div class="section">
    <div class="section-title">Certifications & Workshops</div>
    <div class="cert-grid">
      <div class="cert-item">
        <div class="cert-name">Google Cloud Certified — Generative AI Leader</div>
        <div class="cert-issuer">Google Cloud (Valid Nov 2026 – Nov 2029)</div>
        <div class="cert-desc">Generative AI architectures, Google Cloud AI infrastructure, enterprise AI leadership.</div>
      </div>
      <div class="cert-item">
        <div class="cert-name">Red Hat System Administration I (RH124 v10)</div>
        <div class="cert-issuer">Red Hat (RHA)</div>
        <div class="cert-desc">Linux CLI, filesystem hierarchy management, and user/group administration.</div>
      </div>
      <div class="cert-item">
        <div class="cert-name">Oracle Java Foundations (1Z0-811)</div>
        <div class="cert-issuer">Oracle</div>
        <div class="cert-desc">Java syntax, data types, control flow, arrays, OOP, and exception handling.</div>
      </div>
      <div class="cert-item">
        <div class="cert-name">Artificial Intelligence Fundamentals</div>
        <div class="cert-issuer">IBM SkillsBuild</div>
        <div class="cert-desc">AI fundamentals, machine learning methodologies, and ethical AI practices.</div>
      </div>
      <div class="cert-item">
        <div class="cert-name">Introduction to IoT & Digital Transformation</div>
        <div class="cert-issuer">Cisco Networking Academy</div>
        <div class="cert-desc">IoT architecture, connected devices, and digital transformation in enterprise IT.</div>
      </div>
      <div class="cert-item">
        <div class="cert-name">Privacy and Security in Online Social Media</div>
        <div class="cert-issuer">NPTEL (IIIT Hyderabad / IIT Madras) — Elite (67%)</div>
        <div class="cert-desc">12-week certification covering social network security and privacy risks.</div>
      </div>
      <div class="cert-item">
        <div class="cert-name">EC-Council Cybersecurity Workshop</div>
        <div class="cert-issuer">EC-Council — 1 CPE Credit</div>
        <div class="cert-desc">Core cybersecurity concepts, threat identification, and defensive security.</div>
      </div>
      <div class="cert-item">
        <div class="cert-name">AIORI-3 Workshop on Internet Measurements</div>
        <div class="cert-issuer">MeitY / NIXI & APNIC Foundation</div>
        <div class="cert-desc">Student workshop on Internet measurements & routing infrastructure (Sept 2026).</div>
      </div>
    </div>
  </div>

  <div class="section">
    <div class="section-title">Competitions & Activities</div>
    <ul class="bullets">
      <li><strong>Smart India Hackathon (SIH) 2026:</strong> Built and deployed IPsec Sentinel for Problem Statement 26160 (AI-powered IPsec VPN analyzer with XGBoost &amp; PQC readiness scoring; live on Vercel &amp; Render).</li>
      <li><strong>Mindkraft 2026 (Karunya Institute):</strong> Took part in three cybersecurity & IoT events — "Hashes over Roses 3.0", "Crypto Crime 2.0", "IoT Inferno".</li>
      <li><strong>Conesta Forge (5-Day AI Build Sprint):</strong> Shipped a working web app solo under 5 days, finishing #33 on leaderboard.</li>
      <li><strong>Hacknex Hackathon:</strong> Participated.</li>
      <li><strong>Aurelion Hackathon (24-Hour):</strong> Participated as part of a small team.</li>
    </ul>
  </div>
</body>
</html>`;

const tempHtmlPath = path.resolve('scripts/resume_temp.html');
const targetPdfPath = path.resolve('public/resume.pdf');

fs.writeFileSync(tempHtmlPath, htmlContent, 'utf-8');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const fileUrl = pathToFileURL(tempHtmlPath).href;

console.log('Generating PDF from HTML via Chrome...');
execSync(`"${chromePath}" --headless=new --disable-gpu --no-pdf-header-footer --print-to-pdf="${targetPdfPath}" "${fileUrl}"`);

if (fs.existsSync(targetPdfPath)) {
  const stat = fs.statSync(targetPdfPath);
  const pdfStr = fs.readFileSync(targetPdfPath).toString('latin1');
  const pages = (pdfStr.match(/\/Type\s*\/Page\b/g) || []).length;
  console.log(`Successfully generated public/resume.pdf (${stat.size} bytes, ${pages} page${pages === 1 ? '' : 's'})`);
} else {
  console.error('Failed to generate PDF');
  process.exit(1);
}

fs.unlinkSync(tempHtmlPath);
