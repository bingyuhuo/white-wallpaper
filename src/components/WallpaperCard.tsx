import React from 'react';
import { Download } from 'lucide-react';
import { Wallpaper } from '../data/wallpapers';
import { downloadImage } from '../utils/download';

interface WallpaperCardProps {
  wallpaper: Wallpaper;
  priority?: boolean;
}

export const WallpaperCard: React.FC<WallpaperCardProps> = ({
  wallpaper,
  priority = false
}) => {
  return (
    <div className="relative bg-gray-800 rounded-lg overflow-hidden">
      <img
        src={wallpaper.thumbnail}
        alt={wallpaper.title}
        className="w-full h-full object-cover"
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        width={800}
        height={450}
      />
      <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-60 transition-opacity flex items-center justify-center opacity-0 hover:opacity-100">
        <button
          onClick={() => downloadImage(wallpaper.original, wallpaper.title)}
          className="bg-white text-gray-900 px-6 py-3 rounded-full flex items-center space-x-2 hover:bg-gray-100"
        >
          <Download className="w-5 h-5" />
          <span>Download Original</span>
        </button>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-medium text-white">{wallpaper.title}</h3>
      </div>
    </div>
  );
}; 