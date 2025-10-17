"use client"

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";

export function Loader() {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 500); // 0.5 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {showLoader && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-white"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="flex gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {[0, 1, 2].map((index) => (
              <motion.div
                key={index}
                className="w-3 h-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
                animate={{
                  y: [0, -12, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  delay: index * 0.1,
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}