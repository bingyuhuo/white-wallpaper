import React, { useState } from 'react';
import { Download, Eye } from 'lucide-react';
import { Wallpaper } from '../data/wallpapers';
import { downloadImage } from '../utils/download';
import { ImagePreviewModal } from './ImagePreviewModal';

interface WallpaperCardProps {
  wallpaper: Wallpaper;
  priority?: boolean;
}

export const WallpaperCard: React.FC<WallpaperCardProps> = ({
  wallpaper,
  priority = false
}) => {
  // 添加预览模态框状态
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // 打开预览
  const openPreview = () => setIsPreviewOpen(true);
  
  // 关闭预览
  const closePreview = () => setIsPreviewOpen(false);

  return (
    <div className="relative bg-gray-800 rounded-lg overflow-hidden group">
      <img
        src={wallpaper.thumbnail}
        alt={wallpaper.title}
        className="w-full h-full object-cover"
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        width={800}
        height={450}
      />
      
      {/* 预览按钮 - 保持在中央 */}
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-opacity flex items-center justify-center opacity-0 group-hover:opacity-100">
        <button
          onClick={openPreview}
          className="bg-white text-gray-900 px-5 py-3 rounded-full flex items-center space-x-2 hover:bg-gray-100 transition-all"
        >
          <Eye className="w-5 h-5" />
          <span>Preview</span>
        </button>
      </div>
      
      {/* 下载按钮 - 移动到右下角 */}
      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={() => downloadImage(wallpaper.original, wallpaper.title)}
          className="bg-white text-gray-900 p-2 rounded-full flex items-center justify-center hover:bg-gray-100 shadow-lg transition-all"
          aria-label={`Download ${wallpaper.title}`}
        >
          <Download className="w-5 h-5" />
        </button>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-medium text-white">{wallpaper.title}</h3>
      </div>

      {/* 预览模态框 */}
      <ImagePreviewModal
        imageUrl={wallpaper.original}
        title={wallpaper.title}
        isOpen={isPreviewOpen}
        onClose={closePreview}
      />
    </div>
  );
}; 