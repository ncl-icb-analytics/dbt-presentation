import { chromium } from "playwright";
import { slides } from "../lib/slides";
import * as fs from "fs";
import * as path from "path";

const THUMBNAIL_DIR = path.join(process.cwd(), "public", "thumbnails");
const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

async function generateThumbnails() {
  // Ensure thumbnail directory exists
  if (!fs.existsSync(THUMBNAIL_DIR)) {
    fs.mkdirSync(THUMBNAIL_DIR, { recursive: true });
  }

  console.log(`Generating thumbnails for ${slides.length} slides...`);
  console.log(`Using base URL: ${BASE_URL}`);

  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Set viewport to 1920x1080 for consistent screenshots
  await page.setViewportSize({ width: 1920, height: 1080 });

  for (const slide of slides) {
    const url = `${BASE_URL}/slides/${slide.id}`;
    const outputPath = path.join(THUMBNAIL_DIR, `slide-${slide.id}.png`);

    try {
      console.log(`  [${slide.id}/${slides.length}] ${slide.title}`);
      await page.goto(url, { waitUntil: "networkidle" });

      // Wait a bit for animations to settle
      await page.waitForTimeout(500);

      await page.screenshot({
        path: outputPath,
        clip: { x: 0, y: 0, width: 1920, height: 1080 },
      });
    } catch (error) {
      console.error(`  Failed to generate thumbnail for slide ${slide.id}:`, error);
    }
  }

  await browser.close();
  console.log(`\nDone! Thumbnails saved to ${THUMBNAIL_DIR}`);
}

generateThumbnails().catch(console.error);
