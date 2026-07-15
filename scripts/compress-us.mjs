import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve("public/us");
const MAX = 1600;
const QUALITY = 82;

const files = fs
  .readdirSync(ROOT)
  .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
  .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));

let before = 0;
let after = 0;

for (const file of files) {
  const input = path.join(ROOT, file);
  const tmp = path.join(ROOT, `.__tmp__${file}`);
  const statBefore = fs.statSync(input).size;
  before += statBefore;

  const image = sharp(input, { failOn: "none" }).rotate();
  const meta = await image.metadata();
  const isJpeg = /jpe?g$/i.test(file);

  let pipeline = image.resize({
    width: MAX,
    height: MAX,
    fit: "inside",
    withoutEnlargement: true,
  });

  if (isJpeg) {
    pipeline = pipeline.jpeg({ quality: QUALITY, mozjpeg: true });
  } else if (/png$/i.test(file)) {
    pipeline = pipeline.png({ compressionLevel: 9, palette: true });
  } else {
    pipeline = pipeline.webp({ quality: QUALITY });
  }

  await pipeline.toFile(tmp);
  // Windows can lock files (Vite HMR) — overwrite via copy then remove temp
  try {
    fs.copyFileSync(tmp, input);
    fs.unlinkSync(tmp);
  } catch {
    await new Promise((r) => setTimeout(r, 300));
    fs.copyFileSync(tmp, input);
    fs.unlinkSync(tmp);
  }

  const statAfter = fs.statSync(input).size;
  after += statAfter;

  const pct = Math.round((1 - statAfter / statBefore) * 100);
  console.log(
    `${file.padEnd(42)} ${(statBefore / 1024 / 1024).toFixed(1)}MB → ${(statAfter / 1024).toFixed(0)}KB  (−${pct}%)  ${meta.width}x${meta.height}`,
  );
}

console.log(
  `\nTOTAL ${(before / 1024 / 1024).toFixed(1)}MB → ${(after / 1024 / 1024).toFixed(1)}MB  (−${Math.round((1 - after / before) * 100)}%)`,
);
