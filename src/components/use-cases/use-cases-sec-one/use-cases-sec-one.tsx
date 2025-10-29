"use client";

import React from "react";
import { motion, useInView, Variants } from "framer-motion";
import { Sparkles } from "@/components/ui/sparkles";

// Floating elements animation
const FloatingElements = () => {
  const floatingVariants: Variants = {
    animate: {
      y: [0, -20, 0],
      rotate: [0, 5, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-4 h-4 rounded-full opacity-20"
          style={{
            left: `${20 + i * 15}%`,
            top: `${30 + i * 10}%`,
          }}
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: i * 0.8 }}
        />
      ))}
    </div>
  );
};

export const UseCasesSecOne = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  // Text reveal animation
  const textVariants: Variants = {
    hidden: { 
      opacity: 0,
      y: 100,
      rotateX: 90
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.8,
        delay: i * 0.1,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };

  // Gradient text animation
  // const gradientTextVariants: Variants = {
  //   hidden: { 
  //     backgroundPosition: "200% center" 
  //   },
  //   visible: {
  //     backgroundPosition: "0% center",
  //     transition: {
  //       duration: 2,
  //       ease: "easeInOut"
  //     }
  //   }
  // };

  // Subtitle animation with magnetic effect
  const subtitleVariants: Variants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      filter: "blur(10px)"
    },
    visible: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 1,
        delay: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.3 }
    }
  };

  return (
    <div className="text-gray-900 relative overflow-hidden pt-6 flex items-center">
      {/* Enhanced Sparkles Background */}
      <Sparkles
        background="transparent"
        minSize={0.6}
        maxSize={1.4}
        particleDensity={80}
        particleColor="#3b82f6"
        speed={0.8}
        className="opacity-80"
      />

      {/* Floating Elements */}
      <FloatingElements />

      {/* Animated Background Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full">
        {/* Hero Section */}
        <section className="py-20 px-6" ref={ref}>
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              className="mb-8"
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              {/* Main Title with reveal effect */}
              <div className="perspective-1000 mb-6">
                <motion.div
                  variants={textVariants}
                  custom={0}
                  className="overflow-visible"
                >
                  <motion.h1 
                    className="text-5xl md:text-7xl font-bold mb-6 overflow-visible"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    {["AI", "Solutions"].map((word, i) => (
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
                </motion.div>
              </div>

              {/* Subtitle with magnetic hover effect */}
              <motion.div 
                className="flex items-center justify-center gap-3 mb-8"
                variants={subtitleVariants}
                
              >
                <motion.span 
                  className="text-2xl md:text-3xl text-gray-600"
                >
                  Industry-Specific AI Applications
                </motion.span>
              </motion.div>

              {/* Description */}
              <motion.p 
                className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed mb-12"
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.8, delay: 1.8 }}
              
              >
                Discover how our AI-powered solutions transform industries through intelligent automation, predictive analytics, and conversational interfaces.
              </motion.p>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
};