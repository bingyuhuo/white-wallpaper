import * as fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface Wallpaper {
  id: number;
  title: string;
  thumbnail: string;
  original: string;
}

const generateWallpaperData = () => {
  const originalDir = join(__dirname, '../public/images/original');
  const outputFile = join(__dirname, '../src/data/wallpapers.ts');
  
  try {
    const files = fs.readdirSync(originalDir);
    const wallpapers: Wallpaper[] = [];
    
    // 获取文件信息并按照修改时间排序（最新的在前面）
    const fileStats = files
      .filter(file => file.match(/\.(jpg|jpeg|png)$/i))
      .map(file => ({
        name: file,
        stats: fs.statSync(join(originalDir, file))
      }))
      .sort((a, b) => b.stats.mtime.getTime() - a.stats.mtime.getTime());
    
    // 生成壁纸数据
    fileStats.forEach((file, index) => {
      wallpapers.push({
        id: index + 1,
        title: `White Wallpaper ${index + 1}`,
        thumbnail: `/images/thumbnails/${file.name}`,
        original: `/images/original/${file.name}`
      });
    });

    // 生成 TypeScript 文件内容
    const fileContent = `// 此文件由 generateWallpaperData.ts 自动生成
export interface Wallpaper {
  id: number;
  title: string;
  thumbnail: string;
  original: string;
}

export const wallpapers: Wallpaper[] = ${JSON.stringify(wallpapers, null, 2)};
`;

    // 写入文件
    fs.writeFileSync(outputFile, fileContent);
    console.log('✅ Wallpaper data generated successfully!');
  } catch (error) {
    console.error('❌ Error generating wallpaper data:', error);
  }
};

generateWallpaperData(); 