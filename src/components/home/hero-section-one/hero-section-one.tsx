"use client";

import React, { useState, useId, useEffect } from "react";
import { motion, useAnimation, Variants } from "framer-motion";
import { ArrowRight,Zap } from "lucide-react";
import Spline from "@splinetool/react-spline";
import Link from "next/link";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import type { Container } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

// Enhanced Grid Pattern Component
function GridPattern({
  width,
  height,
  x,
  y,
  squares,
  ...props
}: React.ComponentProps<"svg"> & {
  width: number;
  height: number;
  x: string;
  y: string;
  squares?: number[][];
}) {
  const patternId = React.useId();

  return (
    <svg aria-hidden="true" {...props}>
      <defs>
        <pattern
          id={patternId}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path
            d={`M.5 ${height}V.5H${width}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-blue-300/40"
          />
        </pattern>
      </defs>
      <rect
        width="100%"
        height="100%"
        strokeWidth={0}
        fill={`url(#${patternId})`}
      />
      {squares && (
        <svg x={x} y={y} className="overflow-visible">
          {squares.map(([x, y], index) => (
            <rect
              strokeWidth="0"
              key={index}
              width={width + 1}
              height={height + 1}
              x={x * width}
              y={y * height}
              fill="currentColor"
              className="text-blue-500/20"
            />
          ))}
        </svg>
      )}
    </svg>
  );
}

// Grid pattern generator function
function genRandomPattern(length?: number): number[][] {
  length = length ?? 4;
  return Array.from({ length }, () => [
    Math.floor(Math.random() * 4) + 7,
    Math.floor(Math.random() * 6) + 1,
  ]);
}

type ParticlesProps = {
  id?: string;
  className?: string;
  background?: string;
  particleSize?: number;
  minSize?: number;
  maxSize?: number;
  speed?: number;
  particleColor?: string;
  particleDensity?: number;
};

const SparklesParticles = React.memo((props: ParticlesProps) => {
  const {
    id,
    className,
    background,
    minSize,
    maxSize,
    particleColor,
    particleDensity,
  } = props;
  const [init, setInit] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);

  useEffect(() => {
    if (isInitializing) return;
    setIsInitializing(true);
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
      setIsInitializing(false);
    });
  }, [isInitializing]);

  const controls = useAnimation();

  const particlesLoaded = async (container?: Container) => {
    if (container) {
      controls.start({
        opacity: 1,
        transition: { duration: 0.8 },
      });
    }
  };

  const generatedId = useId();

  const particleOptions = {
    background: { color: { value: background || "transparent" } },
    fullScreen: { enable: false, zIndex: 1 },
    fpsLimit: 120,
    interactivity: {
      events: {
        onHover: { enable: true, mode: "attract" },
        resize: { enable: true },
      },
      modes: {
        attract: { distance: 200, duration: 0.4, factor: 1 },
      },
    },
    particles: {
      color: { value: particleColor || "#6366f1" },
      move: {
        direction: "none" as const,
        enable: true,
        outModes: { default: "out" as const },
        random: true,
        speed: { min: 0.3, max: 1.2 },
        straight: false,
      },
      number: {
        density: { enable: true, width: 800, height: 600 },
        value: particleDensity || 56,
      },
      opacity: {
        value: { min: 0.3, max: 0.7 },
        animation: { enable: true, speed: 1, sync: false },
      },
      shape: { type: "circle" },
      size: { value: { min: minSize || 1, max: maxSize || 3 } },
    },
    detectRetina: true,
  };

  return (
    <motion.div animate={controls} className={cn("opacity-0", className)}>
      {init && (
        <Particles
          id={id || generatedId}
          className={cn("h-full w-full")}
          particlesLoaded={particlesLoaded}
          options={particleOptions}
        />
      )}
    </motion.div>
  );
});

SparklesParticles.displayName = "SparklesParticles";

function AnimatedTitle() {
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShouldAnimate(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const titleVariants:Variants = {
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

      <motion.div
        className="absolute -top-4 -right-4 sm:-top-6"
        animate={{
          rotate: [0, 10, -10, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >

      </motion.div>
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
  const [particlesReady, setParticlesReady] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 15,
        y: (e.clientY / window.innerHeight - 0.5) * 15,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);

    const timer = setTimeout(() => setParticlesReady(true), 200);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timer);
    };
  }, []);

  return (
    <section className="relative min-h-screen pt-6 overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-100/40 via-transparent to-purple-100/20" />

      {/* Grid Background with reduced opacity */}
      <div className="absolute inset-0 -z-10">
        <GridPattern
          width={72}
          height={56}
          x="50%"
          y="100%"
          squares={genRandomPattern(6)}
          className="absolute inset-0 -z-10 text-blue-300/20 opacity-20"
        />
      </div>

      {particlesReady && (
        <div className="absolute inset-0">
          <SparklesParticles
            background="transparent"
            minSize={1}
            maxSize={4}
            particleDensity={1}
            particleColor="#6366f1"
          />
        </div>
      )}

      <motion.div
        className="absolute inset-0 opacity-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 3 }}
      >
        {Array.from({ length: 16 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${2 + Math.random() * 8}px`,
              height: `${2 + Math.random() * 8}px`,
              background: `hsl(${240 + Math.random() * 60}, 80%, 65%)`,
            }}
            animate={{
              y: [0, -60 - Math.random() * 40, 0],
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20 min-h-screen flex items-center">
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

              <motion.button
                className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-slate-300 text-slate-700 font-semibold text-base sm:text-lg rounded-2xl hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 w-full sm:w-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </motion.button>
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
                    <div className="absolute inset-0 flex items-center justify-center rounded-full">
                      <div className="text-center">
                        <motion.div
                          className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-6"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        <p className="text-slate-600 text-lg font-medium">Loading AI Experience</p>
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
                      background: "transparent",
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
                  <span className="text-sm font-medium">Click on the bubble</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}