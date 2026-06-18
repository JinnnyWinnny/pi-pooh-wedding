import QRCode from "qrcode";
import { writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, "../public/wedding-qr.png");
const URL = "https://jinnnywinnny.github.io/pi-pooh-wedding/";

const png = await QRCode.toBuffer(URL, {
  type: "png",
  width: 220,
  margin: 1,
  errorCorrectionLevel: "M",
  color: {
    dark: "#15211f",
    light: "#00000000",
  },
});

writeFileSync(OUT, png);
console.log(`QR saved: ${OUT}`);
