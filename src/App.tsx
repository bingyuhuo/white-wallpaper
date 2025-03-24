import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { WallpaperCard } from './components/WallpaperCard';
import { Footer } from './components/Footer';
import { wallpapers } from './data/wallpapers';
import { useInfiniteScroll } from './hooks/useInfiniteScroll';

function App() {
  // 使用useInfiniteScroll Hook来处理无限滚动
  const { displayedItems, isLoading, hasMore } = useInfiniteScroll(wallpapers, 12);

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <Hero />

      {/* Wallpaper Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedItems.map((wallpaper, index) => (
            <WallpaperCard
              key={wallpaper.id}
              wallpaper={wallpaper}
              priority={index < 6} // 前6张优先加载
            />
          ))}
        </div>
        
        {/* 加载状态指示器 */}
        {isLoading && (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
        )}
        
        {/* 没有更多内容的提示 */}
        {!hasMore && displayedItems.length > 0 && (
          <div className="text-center text-gray-400 py-8">
            没有更多图片了
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default App;