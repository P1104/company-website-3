// File: src/components/home/hero-section-one/hero-section-one.tsx
"use client";

import React, { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";
import Spline from "@splinetool/react-spline";
import Link from "next/link";

function AnimatedTitle() {
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShouldAnimate(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const titleVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  return shouldAnimate ? (
    <motion.h1
      className="relative text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-black mb-6 sm:mb-8 leading-tight"
      variants={titleVariants}
      initial="hidden"
      animate="visible"
    >
      <span className="block bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent drop-shadow-sm">
        EQUILIBRATE.AI
      </span>
    </motion.h1>
  ) : (
    <h1 className="relative text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 sm:mb-8 leading-tight">
      <span className="block bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent drop-shadow-sm">
        EQUILIBRATE.AI
      </span>
    </h1>
  );
}

export function HeroSectionOne() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isSplineLoaded, setIsSplineLoaded] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 15,
        y: (e.clientY / window.innerHeight - 0.5) * 15,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section className="relative z-10 pt-6 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20 min-h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-24 items-center w-full">
          <motion.div
            className="text-center lg:text-left order-1"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <AnimatedTitle />

            <motion.p
              className="text-lg sm:text-xl lg:text-2xl text-slate-700 mb-8 sm:mb-10 lg:mb-12 pb-12 leading-relaxed font-light px-4 sm:px-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Democratizing technology by{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-semibold">
                breaking all tech barriers
              </span>{" "}
              with AI
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Link href="/product">
                <motion.button
                  className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white font-bold text-base sm:text-lg rounded-2xl shadow-2xl overflow-hidden w-full sm:w-auto"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3">
                    <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
                    Explore Products
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                  </span>

                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />

                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-indigo-600/20 blur-xl group-hover:blur-2xl transition-all duration-300" />
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            className="flex justify-center lg:justify-end order-2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative w-full max-w-md lg:max-w-none">
              <div className="w-full aspect-square sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[500px] lg:h-[500px] relative mx-auto">
                <motion.div
                  className="relative w-full h-full"
                  style={{
                    transform: `translate3d(${mousePosition.x}px, ${mousePosition.y}px, 0)`,
                  }}
                  transition={{ type: "spring", stiffness: 100, damping: 15 }}
                  whileHover={{ scale: 1.02 }}
                >
                  {!isSplineLoaded && (
                    <div className="absolute z-10 inset-0 flex items-center justify-center rounded-full">
                      <div className="text-center">
                        <motion.div
                          className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-6"
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        />
                        <p className="text-slate-600 text-lg font-medium">
                          Loading
                        </p>
                        <div className="flex justify-center mt-3 space-x-1">
                          {[0, 1, 2].map((i) => (
                            <motion.div
                              key={i}
                              className="w-2 h-2 bg-blue-500 rounded-full"
                              animate={{
                                scale: [1, 1.5, 1],
                                opacity: [0.5, 1, 0.5],
                              }}
                              transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                delay: i * 0.2,
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                  <Spline
                    scene="/models/ai-interaction.splinecode"
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                    onLoad={() => setIsSplineLoaded(true)}
                    onError={(error) => {
                      console.error("Spline error:", error);
                      setIsSplineLoaded(false);
                    }}
                  />
                </motion.div>
              </div>

              <motion.div
                className="mt-8 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/70 backdrop-blur-md rounded-full border-2 border-white/60 text-slate-700 shadow-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm font-medium">
                    Click on the bubble
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}