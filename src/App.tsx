import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { WallpaperCard } from './components/WallpaperCard';
import { Footer } from './components/Footer';
import { wallpapers } from './data/wallpapers';

function App() {
  // 只显示前12张图片
  const initialWallpapers = wallpapers.slice(0, 12);

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <Hero />

      {/* Wallpaper Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {initialWallpapers.map((wallpaper, index) => (
            <WallpaperCard
              key={wallpaper.id}
              wallpaper={wallpaper}
              priority={index < 6} // 前6张优先加载
            />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default App;