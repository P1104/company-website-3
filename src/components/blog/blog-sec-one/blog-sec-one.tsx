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
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <div className="relative overflow-hidden pt-6">
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

      <div className="relative z-15 pt-12">
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
                className="mb-2 text-4xl font-bold md:text-5xl lg:text-6xl leading-relaxed"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
              >
                {heading.split(" ").map((word, i) => (
                  <motion.span
                    key={i}
                    className="inline-block mr-2 bg-gradient-to-r from-gray-900 via-slate-800 to-gray-900 bg-clip-text text-transparent transition-colors duration-200 ease-out hover:bg-gradient-to-r hover:from-violet-600 hover:via-blue-600 hover:to-cyan-500"
                    initial={{ opacity: 0, rotateY: 90 }}
                    whileInView={{ opacity: 1, rotateY: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    whileHover={{ y: -3, transition: { duration: 0.18 } }}
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.h1>

              <motion.p
                className="pt-4 text-lg text-gray-600 md:text-xl lg:max-w-3xl mx-auto"
                variants={itemVariants}
              >
                {description}
              </motion.p>
            </motion.div>
          </motion.div>
        </section>
      </div>
    </div>
  );
};