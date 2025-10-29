"use client"
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const HeroSectionThemeWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="relative bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 overflow-hidden">
      {/* 3D Grid Background - More subtle */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.08) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
            transform: "perspective(1000px) rotateX(60deg) translateZ(-100px)",
          }}
        />
      </div>

      {/* Iridescence-like Background Effect */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-200/30 via-purple-200/20 to-pink-200/30" />
      </div>

      {/* Animated Orbs - Slower and more elegant */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-400/15 to-purple-600/15 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 90, 180],
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-purple-400/15 to-pink-600/15 rounded-full blur-3xl"
          animate={{
            scale: [1.1, 1, 1.1],
            rotate: [180, 90, 0],
            x: [0, -25, 0],
            y: [0, 25, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Consistent Slow Floating Particles - Matching hero-section-one */}
      {isClient && (
        <motion.div
          className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 2 }}
        >
          {Array.from({ length: 25 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 sm:w-2 sm:h-2 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                backgroundColor: i % 3 === 0 ? '#3b82f6' : i % 3 === 1 ? '#8b5cf6' : '#ec4899',
              }}
              animate={{ 
                y: [0, -30, 0], 
                opacity: [0.2, 0.8, 0.2],
                scale: [0.8, 1.2, 0.8]
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>
      )}

      {/* Additional Floating Elements - Very slow and subtle */}
      {isClient && (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {Array(15).fill(null).map((_, i) => (
            <motion.div
              key={`extra-${i}`}
              className="absolute w-0.5 h-0.5 sm:w-1 sm:h-1 bg-blue-400/60 rounded-full"
              initial={{
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
                y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
                opacity: 0,
                scale: 0,
              }}
              animate={{
                y: [null, -80],
                opacity: [0, 0.6, 0],
                scale: [0, 1, 0],
                x: [null, Math.random() * 40 - 20],
              }}
              transition={{
                duration: Math.random() * 6 + 8, // Much slower: 8-14 seconds
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
                delay: Math.random() * 10,
              }}
            />
          ))}
        </div>
      )}

      {/* Gradient Overlay - Consistent with hero-section-one */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-blue-50/30 via-white/20 to-purple-50/30 pointer-events-none overflow-hidden" />

      {/* Content */}
      <div className="overflow-x-hidden">{children}</div>
    </div>
  );
};