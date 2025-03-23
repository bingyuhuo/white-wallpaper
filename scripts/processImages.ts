import * as sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import * as fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const processImages = async () => {
  const originalDir = join(__dirname, '../public/images/original');
  const thumbnailDir = join(__dirname, '../public/images/thumbnails');

  // 确保目录存在
  if (!fs.existsSync(thumbnailDir)) {
    fs.mkdirSync(thumbnailDir, { recursive: true });
  }

  // 读取原始图片目录和缩略图目录
  const originalFiles = fs.readdirSync(originalDir);
  const thumbnailFiles = fs.existsSync(thumbnailDir) ? fs.readdirSync(thumbnailDir) : [];

  for (const file of originalFiles) {
    if (file.match(/\.(jpg|jpeg|png)$/i)) {
      const inputPath = join(originalDir, file);
      const outputPath = join(thumbnailDir, file);

      // 检查缩略图是否已存在且不是新文件
      if (thumbnailFiles.includes(file)) {
        const originalStats = fs.statSync(inputPath);
        const thumbnailStats = fs.statSync(outputPath);
        
        // 如果原图修改时间比缩略图新，则重新生成
        if (originalStats.mtimeMs <= thumbnailStats.mtimeMs) {
          console.log(`⏭️ Skipped: ${file} (already processed)`);
          continue;
        }
      }

      try {
        // 生成缩略图
        await sharp.default(inputPath)
          .resize(800, null, {
            withoutEnlargement: true,
            fit: 'inside'
          })
          .jpeg({ quality: 80 })
          .toFile(outputPath);

        console.log(`✅ Processed: ${file}`);
      } catch (error) {
        console.error(`❌ Error processing ${file}:`, error);
      }
    }
  }
};

processImages().catch(console.error); 