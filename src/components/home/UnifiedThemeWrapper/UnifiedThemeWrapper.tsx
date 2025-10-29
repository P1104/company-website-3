"use client"
import React, { useState, useId, useEffect } from "react";
import { motion } from "framer-motion";
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

  const particlesLoaded = async (container?: Container) => {
    if (container) {
      // Particles loaded
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
        attract: { distance: 200, duration: 0.1, factor: 0.1 },
      },
    },
    particles: {
      color: { value: particleColor || "#6366f1" },
      move: {
        direction: "none" as const,
        enable: true,
        outModes: { default: "out" as const },
        random: true,
        speed: { min: 0.3, max: 0.5 },
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
    <motion.div className={cn("opacity-0", className)}>
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

interface UnifiedThemeWrapperProps {
  children: React.ReactNode;
}

export function UnifiedThemeWrapper({ children }: UnifiedThemeWrapperProps) {
  const [particlesReady, setParticlesReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setParticlesReady(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-100/40 via-transparent to-purple-100/20 pointer-events-none" />

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

      {/* Particles */}
      {particlesReady && (
        <div className="absolute inset-0 pointer-events-none">
          <SparklesParticles
            background="transparent"
            minSize={1}
            maxSize={4}
            particleDensity={1}
            particleColor="#6366f1"
          />
        </div>
      )}

      {/* Animated floating elements */}
      <motion.div className="absolute inset-0 opacity-40 pointer-events-none">
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

      {/* Main content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}