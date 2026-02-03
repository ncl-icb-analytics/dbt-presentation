const { chromium } = require("playwright");
const path = require("path");

const THUMBNAIL_DIR = path.join(process.cwd(), "public", "thumbnails");
const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
const TOTAL_SLIDES = 22;

async function generateThumbnails() {
  console.log(`Generating thumbnails for ${TOTAL_SLIDES} slides...`);
  console.log(`Using base URL: ${BASE_URL}`);

  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1920, height: 1080 });

  for (let i = 1; i <= TOTAL_SLIDES; i++) {
    const url = `${BASE_URL}/slides/${i}`;
    const outputPath = path.join(THUMBNAIL_DIR, `slide-${i}.png`);

    console.log(`  [${i}/${TOTAL_SLIDES}]`);
    await page.goto(url, { waitUntil: "networkidle" });
    await page.waitForTimeout(500);
    await page.screenshot({
      path: outputPath,
      clip: { x: 0, y: 0, width: 1920, height: 1080 },
    });
  }

  await browser.close();
  console.log(`\nDone! Thumbnails saved to ${THUMBNAIL_DIR}`);
}

generateThumbnails().catch(console.error);
