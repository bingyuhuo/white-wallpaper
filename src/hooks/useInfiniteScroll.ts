import { useEffect, useState, useCallback } from 'react';

export function useInfiniteScroll<T>(
  items: T[],
  initialCount: number,
  loadMoreCount: number = 12
) {
  const [displayedItems, setDisplayedItems] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // 初始化显示的项目
  useEffect(() => {
    setDisplayedItems(items.slice(0, initialCount));
  }, [items, initialCount]);

  // 加载更多项目
  const loadMore = useCallback(() => {
    if (isLoading || displayedItems.length >= items.length) return;
    
    setIsLoading(true);
    const nextItems = items.slice(0, displayedItems.length + loadMoreCount);
    setDisplayedItems(nextItems);
    setIsLoading(false);
  }, [displayedItems.length, items, isLoading, loadMoreCount]);

  // 监听滚动事件
  useEffect(() => {
    const handleScroll = () => {
      if (isLoading) return;
      
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight;
      
      // 当滚动到距离底部100px时触发加载
      if (scrollHeight - scrollTop - clientHeight < 100) {
        loadMore();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMore, isLoading]);

  return {
    displayedItems,
    isLoading,
    hasMore: displayedItems.length < items.length
  };
} 