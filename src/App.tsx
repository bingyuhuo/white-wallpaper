import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { WallpaperCard } from './components/WallpaperCard';
import { Footer } from './components/Footer';
import { wallpapers } from './data/wallpapers';
import { useInfiniteScroll } from './hooks/useInfiniteScroll';
import { useCategory } from './hooks/useCategory';
import { PreviewProvider } from './components/preview/PreviewContext';

function App() {
  const { displayedItems, isLoading, hasMore } = useInfiniteScroll(wallpapers, 12);
  const { currentCategory, isAnimating, toggleCategory } = useCategory();

  // 根据当前分类过滤壁纸
  const filteredWallpapers = displayedItems.filter(w => w.category === currentCategory);

  return (
    <PreviewProvider>
      <div className="min-h-screen bg-gray-900">
        <Header />
        <Hero />

        {/* Wallpaper Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Category Navigation */}
          <div className="flex items-center space-x-8 mb-8 border-b border-gray-800">
            <button
              onClick={() => toggleCategory('other')}
              className={`pb-2 px-1 text-lg font-medium transition-colors relative ${
                currentCategory === 'other'
                  ? 'text-white border-b-2 border-blue-500'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
              disabled={isAnimating}
            >
              All Wallpapers
            </button>
            <button
              onClick={() => toggleCategory('mobile')}
              className={`pb-2 px-1 text-lg font-medium transition-colors relative ${
                currentCategory === 'mobile'
                  ? 'text-white border-b-2 border-blue-500'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
              disabled={isAnimating}
            >
              Mobile
            </button>
          </div>

          {/* Wallpaper Grid with Animation */}
          <div className="relative">
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
              style={{
                opacity: isAnimating ? 0 : 1,
                transform: `scale(${isAnimating ? 0.98 : 1})`,
                filter: `blur(${isAnimating ? '4px' : '0px'})`,
                transition: `
                  all 400ms cubic-bezier(0.4, 0, 0.2, 1)
                `
              }}
            >
              {filteredWallpapers.map((wallpaper, index) => (
                <div
                  key={wallpaper.id}
                  className="transform transition-all duration-400"
                  style={{
                    opacity: isAnimating ? 0.6 : 1,
                    transform: `translateY(${isAnimating ? '8px' : '0'})`,
                    transition: 'all 400ms cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                >
                  <WallpaperCard
                    wallpaper={wallpaper}
                    priority={index < 6}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>
          )}
          
          {/* No More Content Indicator */}
          {!hasMore && filteredWallpapers.length > 0 && (
            <div className="text-center text-gray-400 py-8">
              No more pictures
            </div>
          )}
        </section>

        <Footer />
      </div>
    </PreviewProvider>
  );
}

export default App;