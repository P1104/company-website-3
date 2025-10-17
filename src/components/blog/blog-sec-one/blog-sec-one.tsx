"use client";

import React, { useRef, useEffect } from "react";
import { motion, useAnimation, useInView, Variants } from "framer-motion";
import { Sparkles } from "@/components/ui/sparkles";

interface HeaderSectionProps {
  tagline?: string;
  heading?: string;
  description?: string;
  buttonText?: string;
  buttonUrl?: string;
}

export const BlogSectionOne = ({
  heading = "Exploring the Cosmos of Technology",
  description = "Discover our latest articles on technology, design, and innovation under the starlit sky of knowledge.",
}: HeaderSectionProps) => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1], // easeOut as cubic bezier
      },
    },
  };

  return (
    <div className="relative overflow-hidden pt-4 border-b">
      <div className="absolute inset-0 w-full h-full">
        <Sparkles
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={80}
          particleColor="#3b82f6"
          speed={1}
        />
      </div>

      <div className="relative z-10 pt-10">
        <section className="py-20 lg:py-16">
          <motion.div
            ref={containerRef}
            className="container mx-auto flex flex-col items-center gap-12 lg:px-16"
            initial="hidden"
            animate={controls}
            variants={containerVariants}
          >
            <motion.div
              className="text-center max-w-4xl"
              variants={itemVariants}
            >
              <motion.h1
                className="mb-6 text-black text-4xl font-bold md:text-5xl lg:text-6xl"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
              >
                {heading}
              </motion.h1>

              <motion.p
                className="mb-8 text-lg text-gray-600 md:text-xl lg:max-w-3xl"
                variants={itemVariants}
              >
                {description}
              </motion.p>
{/* 
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <span className="flex items-center">
                    {buttonText}
                    <ArrowRight className="ml-2 size-4" />
                  </span>
                </Button>
              </motion.div> */}
            </motion.div>
          </motion.div>
        </section>
      </div>
    </div>
  );
};