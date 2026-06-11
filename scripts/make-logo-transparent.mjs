import sharp from "sharp";
import path from "path";

const input = path.join("public", "oxa-logo.png");
const output = path.join("public", "oxa-logo-transparent.png");

const image = sharp(input).ensureAlpha();
const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });

for (let i = 0; i < data.length; i += 4) {
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];
  const lightness = (r + g + b) / 3;
  if (lightness > 200 && Math.max(r, g, b) - Math.min(r, g, b) < 30) {
    data[i + 3] = lightness > 235 ? 0 : Math.round(((235 - lightness) / 35) * 255);
  }
}

await sharp(data, {
  raw: { width: info.width, height: info.height, channels: 4 },
})
  .png()
  .toFile(output);

console.log("Wrote", output);