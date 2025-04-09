import React, { createContext, useContext, useState, ReactNode } from 'react';

interface PreviewContextType {
  activePreviewId: number | null;
  setActivePreviewId: (id: number | null) => void;
}

const PreviewContext = createContext<PreviewContextType | undefined>(undefined);

export const PreviewProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activePreviewId, setActivePreviewId] = useState<number | null>(null);

  return (
    <PreviewContext.Provider value={{ activePreviewId, setActivePreviewId }}>
      {children}
    </PreviewContext.Provider>
  );
};

export const usePreview = (): PreviewContextType => {
  const context = useContext(PreviewContext);
  if (context === undefined) {
    throw new Error('usePreview must be used within a PreviewProvider');
  }
  return context;
}; 