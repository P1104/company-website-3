"use client";

import React, { useEffect, useRef } from 'react';
import { motion,Variants } from "framer-motion";

// Stars Background Component
function StarsBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();

    const stars: {
      x: number;
      y: number;
      radius: number;
      opacity: number;
      speed: number;
    }[] = [];

    for (let i = 0; i < 150; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.2,
        opacity: Math.random() * 0.8,
        speed: Math.random() * 0.03,
      });
    }

    function animate() {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 0, 0, ${star.opacity})`;
        ctx.fill();

        star.y += star.speed;

        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
      });

      requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
      }}
    />
  );
}

export const ContactSecOne = () => {
  const fadeInUp:Variants = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: "easeInOut" 
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  return (
    <div className="relative text-gray-900 overflow-hidden">
      <StarsBackground />
      
      <section className="relative z-10 py-24 px-4 text-center overflow-hidden">
        <motion.div
          className="max-w-4xl mx-auto"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 
            className="text-4xl sm:text-6xl md:text-7xl font-bold mb-8 tracking-tight text-gray-900 pt-6"
            variants={fadeInUp}
          >
            Get in
            <br />
            <span className="text-Black">
              Touch
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            variants={fadeInUp}
          >
            Ready to transform your business? Let us start a conversation about your goals and how we can help you achieve them.
          </motion.p>
        </motion.div>
      </section>
    </div>  
  );
};