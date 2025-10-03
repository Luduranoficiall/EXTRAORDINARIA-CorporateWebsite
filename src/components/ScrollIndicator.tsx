import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export function ScrollIndicator() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollPx = document.documentElement.scrollTop;
      const winHeightPx =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (scrollPx / winHeightPx) * 100;
      setScrollProgress(scrolled);
    };

    window.addEventListener('scroll', updateScrollProgress);
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-primary/30 z-50"
      style={{
        transformOrigin: '0%',
      }}
    >
      <motion.div
        className="h-full bg-primary glow-border"
        style={{
          width: `${scrollProgress}%`,
          boxShadow: '0 0 10px rgba(0, 212, 255, 0.8)',
        }}
      />
    </motion.div>
  );
}