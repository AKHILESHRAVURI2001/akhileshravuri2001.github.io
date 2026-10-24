import sharp from 'sharp';
import path from 'path';

const refImagePath = 'C:/Users/Akhilesh/.gemini/antigravity-ide/brain/5d50c2e8-20cd-4aaf-a7c5-c0daa7891450/.user_uploaded/media_1789638692831.jpg';
const outputDir = 'e:/MY-GITHUB/AKHILESHRAVURI2001/akhileshravuri2001.github.io/public';

async function process() {
  const metadata = await sharp(refImagePath).metadata();
  console.log('Image dimensions:', metadata.width, metadata.height);
  const W = metadata.width;
  const H = metadata.height;

  // Let's crop:
  // 1. Profile photo (About Me left side)
  // In the image, About Me starts around Y = 265 to 430
  // Profile photo is around X: 5% to 26%, Y: 26.5% to 41%
  await sharp(refImagePath)
    .extract({
      left: Math.round(W * 0.055),
      top: Math.round(H * 0.265),
      width: Math.round(W * 0.205),
      height: Math.round(H * 0.14)
    })
    .toFile(path.join(outputDir, 'profile_akhilesh.jpg'));

  // 2. Hero setup right side
  await sharp(refImagePath)
    .extract({
      left: Math.round(W * 0.48),
      top: Math.round(H * 0.04),
      width: Math.round(W * 0.51),
      height: Math.round(H * 0.205)
    })
    .toFile(path.join(outputDir, 'hero_workspace.jpg'));

  // 3. Project 1: Real Estate Website
  await sharp(refImagePath)
    .extract({
      left: Math.round(W * 0.055),
      top: Math.round(H * 0.588),
      width: Math.round(W * 0.285),
      height: Math.round(H * 0.073)
    })
    .toFile(path.join(outputDir, 'project_realestate.jpg'));

  // 4. Project 2: DevOps Monitoring Stack
  await sharp(refImagePath)
    .extract({
      left: Math.round(W * 0.355),
      top: Math.round(H * 0.588),
      width: Math.round(W * 0.285),
      height: Math.round(H * 0.073)
    })
    .toFile(path.join(outputDir, 'project_monitoring.jpg'));

  // 5. Project 3: E-commerce Website
  await sharp(refImagePath)
    .extract({
      left: Math.round(W * 0.655),
      top: Math.round(H * 0.588),
      width: Math.round(W * 0.285),
      height: Math.round(H * 0.073)
    })
    .toFile(path.join(outputDir, 'project_ecommerce.jpg'));

  // 6. Footer CTA background
  await sharp(refImagePath)
    .extract({
      left: 0,
      top: Math.round(H * 0.88),
      width: W,
      height: Math.round(H * 0.08)
    })
    .toFile(path.join(outputDir, 'cta_banner.jpg'));

  console.log('All crops generated successfully!');
}

process().catch(console.error);
