import React, { useState, useEffect } from 'react';
import { Download, Eye } from 'lucide-react';
import { Wallpaper } from '../data/wallpapers';
import { downloadImage } from '../utils/download';
import { ImagePreviewModal } from './ImagePreviewModal';
import { usePreview } from './preview/PreviewContext';

interface WallpaperCardProps {
  wallpaper: Wallpaper;
  priority?: boolean;
}

export const WallpaperCard: React.FC<WallpaperCardProps> = ({
  wallpaper,
  priority = false
}) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const { activePreviewId, setActivePreviewId } = usePreview();

  // 打开预览
  const openPreview = () => {
    setActivePreviewId(wallpaper.id);
    setIsPreviewOpen(true);
  };
  
  // 关闭预览
  const closePreview = () => {
    setActivePreviewId(null);
    setIsPreviewOpen(false);
  };

  // 当activePreviewId变化时，如果不等于当前壁纸ID，则关闭预览
  useEffect(() => {
    if (activePreviewId !== null && activePreviewId !== wallpaper.id && isPreviewOpen) {
      setIsPreviewOpen(false);
    }
  }, [activePreviewId, wallpaper.id, isPreviewOpen]);

  return (
    <div className="relative bg-gray-800 rounded-lg overflow-hidden group">
      {/* 添加固定的宽高比容器 */}
      <div className="aspect-ratio-16/9 relative">
        <img
          src={wallpaper.thumbnail}
          alt={wallpaper.title}
          className="absolute inset-0 w-full h-full object-cover"
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          width={800}
          height={450}
        />
      </div>
      
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