import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 mt-12 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p className="text-center text-gray-400">
          © {new Date().getFullYear()} White Wallpaper. All rights reserved.
        </p>
      </div>
    </footer>
  );
}; 