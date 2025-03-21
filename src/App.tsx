import React, { useState, useEffect } from 'react';
import { Download, Twitter } from 'lucide-react';

const wallpapers = [
  {
    id: 1,
    url: '/image/1.jpg',
    title: 'White Wallpaper 1'
  },
  {
    id: 3,
    url: '/image/3.jpg',
    title: 'White Wallpaper 3'
  },
  {
    id: 4,
    url: '/image/4.jpg',
    title: 'White Wallpaper 4'
  },
  {
    id: 5,
    url: '/image/5.jpg',
    title: 'White Wallpaper 5'
  },
  {
    id: 8,
    url: '/image/8.jpg',
    title: 'White Wallpaper 8'
  },
  {
    id: 9,
    url: '/image/9.jpg',
    title: 'White Wallpaper 9'
  },
  {
    id: 10,
    url: '/image/10.jpg',
    title: 'White Wallpaper 10'
  },
  {
    id: 11,
    url: '/image/11.jpg',
    title: 'White Wallpaper 11'
  },
  {
    id: 12,
    url: '/image/12.jpg',
    title: 'White Wallpaper 12'
  }
];

function App() {
  const [loadedImages, setLoadedImages] = useState<{ [key: string]: boolean }>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 预加载第一张图片
    const firstImage = new Image();
    firstImage.src = wallpapers[0].url;
    firstImage.onload = () => {
      setLoadedImages(prev => ({ ...prev, [wallpapers[0].url]: true }));
      setIsLoading(false);
    };
  }, []);

  const handleImageLoad = (url: string) => {
    setLoadedImages(prev => ({ ...prev, [url]: true }));
  };

  const handleDownload = (url: string, title: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = `${title.toLowerCase().replace(/\s+/g, '-')}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white">White Wallpaper</h1>
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

      {/* Hero Section */}
      <div className="bg-gray-800 bg-opacity-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-4xl font-extrabold text-white sm:text-5xl">
            Discover Pure Elegance
          </h2>
          <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto">
            Explore our curated collection of pristine white wallpapers, designed to bring
            minimalist beauty and sophistication to your digital space.
          </p>
        </div>
      </div>

      {/* Wallpaper Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {wallpapers.map((wallpaper) => (
            <div
              key={wallpaper.id}
              className="group relative bg-gray-800 rounded-lg shadow-xl overflow-hidden transition-transform hover:scale-[1.02]"
            >
              <div className="aspect-w-16 aspect-h-9 relative">
                {!loadedImages[wallpaper.url] && (
                  <div className="absolute inset-0 bg-gray-700 animate-pulse flex items-center justify-center">
                    <div className="text-gray-400">Loading...</div>
                  </div>
                )}
                <img
                  src={wallpaper.url}
                  alt={wallpaper.title}
                  className={`w-full h-full object-cover transition-opacity duration-300 ${
                    loadedImages[wallpaper.url] ? 'opacity-100' : 'opacity-0'
                  }`}
                  loading="lazy"
                  onLoad={() => handleImageLoad(wallpaper.url)}
                />
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-opacity flex items-center justify-center opacity-0 group-hover:opacity-100">
                <button
                  onClick={() => handleDownload(wallpaper.url, wallpaper.title)}
                  className="bg-white text-gray-900 px-6 py-3 rounded-full flex items-center space-x-2 hover:bg-gray-100 transition-colors transform hover:scale-105"
                >
                  <Download className="w-5 h-5" />
                  <span>Download</span>
                </button>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-medium text-white">{wallpaper.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 mt-12 border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-gray-400">
            © {new Date().getFullYear()} White Wallpaper. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;