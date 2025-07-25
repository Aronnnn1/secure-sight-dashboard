const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const inputDir = path.join(__dirname, '..', 'public', 'videos');
const outputDir = path.join(__dirname, '..', 'public', 'thumbnails');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const videoFiles = fs.readdirSync(inputDir).filter(file => file.endsWith('.mp4'));

videoFiles.forEach((videoFile, index) => {
  const inputPath = path.join(inputDir, videoFile);
  const outputPath = path.join(outputDir, `incident${index + 1}.jpg`);
  const command = `ffmpeg -ss 00:00:01 -i "${inputPath}" -frames:v 1 -q:v 2 "${outputPath}"`;
  console.log(`Generating thumbnail for ${videoFile}...`);
  try {
    execSync(command);
    console.log(`✅ Saved: ${outputPath}`);
  } catch (error) {
    console.error(`❌ Failed to generate thumbnail for ${videoFile}:`, error.message);
  }
});
