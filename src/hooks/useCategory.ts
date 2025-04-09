import { useState } from 'react';

type Category = 'mobile' | 'other';

export function useCategory() {
  const [currentCategory, setCurrentCategory] = useState<Category>('other');
  const [isAnimating, setIsAnimating] = useState(false);

  const toggleCategory = (category: Category) => {
    if (category === currentCategory) return;
    
    setIsAnimating(true);
    setCurrentCategory(category);
    // 动画结束后重置状态
    setTimeout(() => setIsAnimating(false), 400);
  };

  return {
    currentCategory,
    isAnimating,
    toggleCategory
  };
} 