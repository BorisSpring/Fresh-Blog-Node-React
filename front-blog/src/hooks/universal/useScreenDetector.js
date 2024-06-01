import { useEffect, useState } from 'react';

export const useScreenDetector = () => {
  const [windowSize, setwindowSize] = useState(window.innerWidth);

  const handleWindowSizeChange = () => {
    setwindowSize(() => window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);

    return () => window.removeEventListener('resize', handleWindowSizeChange);
  }, []);

  const isMobile = windowSize <= 768;
  const isTablet = windowSize <= 1024 && windowSize > 768;
  const isDesktop = windowSize > 1024;

  return { isMobile, isTablet, isDesktop };
};
