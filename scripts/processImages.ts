import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join, parse } from 'path';
import * as fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 添加文件名转换函数
const generateNewFileName = (oldFileName: string, index: number, deviceType: string = 'iphone15', style: string = 'marble', feature: string = 'elegant') => {
  const { ext } = parse(oldFileName);
  // 使用传入的索引生成序号，确保每个文件有唯一的序号
  const number = (index + 1).toString().padStart(2, '0');
  
  return `${deviceType}-${style}-${feature}-${number}${ext}`;
};

// 修改获取当前最大序号的函数
const getMaxSequenceNumber = (files: string[], style: string, feature: string) => {
  let maxNum = 0;
  // 只匹配完全符合命名规则的文件
  const pattern = new RegExp(`^iphone15-${style}-${feature}-(\\d+)\\.[^.]+$`);
  
  files.forEach(file => {
    const match = file.match(pattern);
    if (match) {
      const num = parseInt(match[1]);
      if (!isNaN(num)) { // 确保解析出的是有效数字
        maxNum = Math.max(maxNum, num);
      }
    }
  });
  
  // 如果没有找到任何匹配的文件，从0开始
  return maxNum;
};

const isFileAlreadyProcessed = (fileName: string, style: string, feature: string) => {
  // 检查文件是否已经按照我们的命名规则命名
  const pattern = new RegExp(`^iphone15-${style}-${feature}-\\d+\\.[^.]+$`);
  return pattern.test(fileName);
};

const processImages = async () => {
  // 修改为新的目录结构
  const originalDir = join(__dirname, '../public/images/mobile/original');
  const thumbnailDir = join(__dirname, '../public/images/mobile/thumbnails');

  // 确保目录存在
  if (!fs.existsSync(thumbnailDir)) {
    fs.mkdirSync(thumbnailDir, { recursive: true });
  }

  // 读取原始图片目录和缩略图目录
  const originalFiles = fs.readdirSync(originalDir);
  const thumbnailFiles = fs.existsSync(thumbnailDir) ? fs.readdirSync(thumbnailDir) : [];

  // 定义要处理的图片数量和风格
  const maxImages = 4;
  const style = 'marble';
  const feature = 'elegant';

  // 只使用原始目录中的文件来计算序号
  const startNumber = getMaxSequenceNumber(originalFiles, style, feature);

  for (let i = 0; i < Math.min(originalFiles.length, maxImages); i++) {
    const file = originalFiles[i];
    if (file.match(/\.(jpg|jpeg|png)$/i)) {
      // 如果文件已经按照命名规则处理过，就跳过
      if (isFileAlreadyProcessed(file, style, feature)) {
        console.log(`⏭️ Skipped: ${file} (already renamed)`);
        continue;
      }

      // 使用 startNumber + i + 1 来生成新的序号
      const newFileName = generateNewFileName(file, startNumber + i, 'iphone15', style, feature);
      
      const inputPath = join(originalDir, file);
      const outputPath = join(thumbnailDir, newFileName);

      // 检查缩略图是否已存在
      if (thumbnailFiles.includes(newFileName)) {
        console.log(`⏭️ Skipped: ${file} (thumbnail exists)`);
        continue;
      }

      try {
        // 生成缩略图
        await sharp(inputPath)
          .resize(800, null, {
            withoutEnlargement: true,
            fit: 'inside'
          })
          .jpeg({ quality: 80 })
          .toFile(outputPath);

        // 重命名原始文件
        const newOriginalPath = join(originalDir, newFileName);
        if (inputPath !== newOriginalPath) {
          fs.renameSync(inputPath, newOriginalPath);
        }

        console.log(`✅ Processed and renamed: ${file} -> ${newFileName}`);
      } catch (error) {
        console.error(`❌ Error processing ${file}:`, error);
      }
    }
  }
};

processImages().catch(console.error); 