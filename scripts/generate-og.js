const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="bgGlow" cx="40%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#1A1824" stop-opacity="0.9" />
      <stop offset="55%" stop-color="#0A0B0F" stop-opacity="1" />
      <stop offset="100%" stop-color="#060709" stop-opacity="1" />
    </radialGradient>
    <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#D9A15C" />
      <stop offset="100%" stop-color="#F2C488" />
    </linearGradient>
    <linearGradient id="borderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#D9A15C" stop-opacity="0.5" />
      <stop offset="50%" stop-color="#FFFFFF" stop-opacity="0.08" />
      <stop offset="100%" stop-color="#D9A15C" stop-opacity="0.25" />
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bgGlow)" />

  <!-- Outer border frame -->
  <rect x="36" y="36" width="1128" height="558" rx="20" fill="none" stroke="url(#borderGradient)" stroke-width="1.5" />

  <!-- Amber corner accent dots -->
  <circle cx="64" cy="64" r="4" fill="#D9A15C" />
  <circle cx="1136" cy="64" r="4" fill="#D9A15C" />
  <circle cx="64" cy="566" r="4" fill="#D9A15C" />
  <circle cx="1136" cy="566" r="4" fill="#D9A15C" />

  <!-- Category / Domain Tag -->
  <g transform="translate(100, 130)">
    <rect width="320" height="38" rx="19" fill="rgba(217, 161, 92, 0.12)" stroke="rgba(217, 161, 92, 0.35)" stroke-width="1.2" />
    <text x="160" y="24" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="13" font-weight="700" fill="#D9A15C" text-anchor="middle" letter-spacing="2.5">PORTFOLIO &amp; SELECTED WORKS</text>
  </g>

  <!-- Name -->
  <text x="100" y="255" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="82" font-weight="900" fill="#EDEDF2" letter-spacing="-2">Allan K J<tspan fill="#D9A15C">.</tspan></text>

  <!-- Title / Role -->
  <text x="100" y="325" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="36" font-weight="700" fill="url(#goldGradient)" letter-spacing="-0.5">Cybersecurity Student &amp; Developer</text>

  <!-- Subtitle -->
  <text x="100" y="395" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="22" font-weight="400" fill="#9A9AA5">Second-year B.Tech CSE (Cybersecurity) @ Karunya University</text>
  <text x="100" y="432" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="19" font-weight="400" fill="#787885">Full-Stack Web Apps • Enterprise IT Security • Interactive 3D Websites</text>

  <!-- Bottom URL / Domain Badge -->
  <g transform="translate(100, 505)">
    <rect width="260" height="34" rx="8" fill="rgba(255, 255, 255, 0.04)" stroke="rgba(255, 255, 255, 0.08)" stroke-width="1" />
    <text x="130" y="22" font-family="monospace" font-size="15" font-weight="600" fill="#D9A15C" text-anchor="middle" letter-spacing="0.5">allan-kj.github.io</text>
  </g>
</svg>
`;

async function generate() {
  const outputPath = path.join(process.cwd(), "public", "og-image.png");
  await sharp(Buffer.from(svg))
    .png({ quality: 95 })
    .toFile(outputPath);
  console.log("Successfully created:", outputPath);
}

generate().catch(err => {
  console.error(err);
  process.exit(1);
});
