import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // If there's a hash, don't scroll to top immediately - let the component handle hash scrolling
    if (hash && pathname === '/') {
      return;
    }
    
    // For other routes or home without hash, scroll to top
    if (pathname !== '/' || !hash) {
      window.scrollTo({ top: 0, behavior: 'auto' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
