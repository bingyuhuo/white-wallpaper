import React from 'react';
import { Twitter } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img src="/logo.svg" alt="White Wallpaper Logo" className="w-8 h-8" />
            <h1 className="text-2xl font-bold text-white">White Wallpaper</h1>
          </div>
          <a
            href="https://x.com/spears_ron21336"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <Twitter className="w-6 h-6" />
          </a>
        </div>
      </div>
    </header>
  );
}; 