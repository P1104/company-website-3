"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Sparkles } from "@/components/ui/sparkles";

const StarsBackground: React.FC<{ className?: string }> = ({ className = "" }) => {
  const stars = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    opacity: Math.random() * 0.6 + 0.2,
    animationDelay: Math.random() * 3,
  }));

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, star.opacity, 0],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: star.animationDelay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export const CarrerSecOne = () => {
  const floatingAnimation: Variants = {
    hidden: { y: 0 },
    visible: {
      y: [0, -15, 0],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="text-gray-900 relative overflow-hidden pt-16">
      <Sparkles
        background="transparent"
        minSize={0.4}
        maxSize={1.2}
        particleDensity={50}
        particleColor="#3b82f6"
        speed={0.5}
      />
      <StarsBackground className="opacity-30" />
      <section className="relative py-12 overflow-hidden px-4">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <motion.div variants={floatingAnimation} initial="hidden" animate="visible">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Join Our Team
              </h1>
            </motion.div>
            
            <motion.p 
              className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Build the future with us. We&apos;re looking for passionate
              individuals who want to make a difference in the world of
              technology.
            </motion.p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};