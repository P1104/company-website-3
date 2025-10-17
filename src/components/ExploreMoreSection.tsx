"use client"

import { motion } from "framer-motion";
import { useCallback } from "react";

interface ExplorMoreSectionProps {
  onExploreClick?: () => void;
}

export function ExploreMoreSection({ onExploreClick }: ExplorMoreSectionProps) {
  const handleClick = useCallback(() => {
    onExploreClick?.();
  }, [onExploreClick]);

  return (
    <motion.div
      className="w-full py-12 px-6 text-center bg-gradient-to-b from-transparent via-blue-50/30 to-transparent md:hidden block"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ duration: 0.5 }}
    >
      <motion.button
        onClick={handleClick}
        className="px-6 py-3 text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200 rounded-full shadow-lg hover:shadow-xl hover:scale-105"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Explore more →
      </motion.button>
    </motion.div>
  );
}