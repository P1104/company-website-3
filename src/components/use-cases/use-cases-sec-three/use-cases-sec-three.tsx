"use client";

import React, { useEffect, useRef } from "react";
import { motion, useAnimation, useInView, Variants } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { Sparkles } from "@/components/ui/sparkles";


export const UseCasesSecThree = () => {
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
        delayChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1] // easeOut as cubic bezier
      }
    }
  };

  return (
    <div className="relative text-gray-900 overflow-hidden py-16 pt-2 pb-24 px-4">
      {/* Sparkles Background */}
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

      {/* Foreground Content */}
      <div className="relative z-10 container mx-auto mb-12">
        <motion.div
          ref={containerRef}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="max-w-4xl mx-auto"
        >
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -5 }}
          >
            <Card className="border-2 border-indigo-200 shadow-lg">
              <CardContent className="p-8 text-center">
                <motion.h3 
                  className="text-2xl font-bold mb-4"
                  variants={itemVariants}
                >
                  Want to learn more?
                </motion.h3>
                
                <motion.p 
                  className="text-gray-600 mb-6"
                  variants={itemVariants}
                >
                  Contact us to discuss how our AI solutions can transform your business.
                </motion.p>
                
                <motion.div
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    variant="outline"
                    size="lg"
                    className="border-indigo-500 bg-indigo-50 text-indigo-700"
                  >
                    <span className="flex items-center">
                      <Mail className="mr-2 size-4" />
                      Get in Touch
                    </span>
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};