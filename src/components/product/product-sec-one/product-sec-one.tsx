"use client";
import React, { useId, useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import type { Container, SingleOrMultiple } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import { motion, useAnimation, useInView, Variants } from "framer-motion";
import { Zap } from 'lucide-react';

function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
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

const Sparkles = (props: ParticlesProps) => {
  const {
    id,
    className,
    background,
    minSize,
    maxSize,
    speed,
    particleColor,
    particleDensity,
  } = props;
  const [init, setInit] = useState(false);
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);
  const controls = useAnimation();

  const particlesLoaded = async (container?: Container) => {
    if (container) {
      controls.start({
        opacity: 1,
        transition: {
          duration: 1,
        },
      });
    }
  };

  const generatedId = useId();
  return (
    <motion.div animate={controls} className={cn("opacity-0", className)}>
      {init && (
        <Particles
          id={id || generatedId}
          className={cn("h-full w-full")}
          particlesLoaded={particlesLoaded}
          options={{
            background: {
              color: {
                value: background || "transparent",
              },
            },
            fullScreen: {
              enable: false,
              zIndex: 1,
            },
            fpsLimit: 120,
            interactivity: {
              events: {
                onClick: {
                  enable: true,
                  mode: "push",
                },
                onHover: {
                  enable: false,
                  mode: "repulse",
                },
                resize: {
                  enable: true,
                },
              },
              modes: {
                push: {
                  quantity: 4,
                },
                repulse: {
                  distance: 200,
                  duration: 0.4,
                },
              },
            },
            particles: {
              bounce: {
                horizontal: {
                  value: 1,
                },
                vertical: {
                  value: 1,
                },
              },
              collisions: {
                absorb: {
                  speed: 2,
                },
                bounce: {
                  horizontal: {
                    value: 1,
                  },
                  vertical: {
                    value: 1,
                  },
                },
                enable: false,
                maxSpeed: 50,
                mode: "bounce",
                overlap: {
                  enable: true,
                  retries: 0,
                },
              },
              color: {
                value: particleColor || "#6366f1",
                animation: {
                  h: {
                    count: 0,
                    enable: false,
                    speed: 1,
                    decay: 0,
                    delay: 0,
                    sync: true,
                    offset: 0,
                  },
                  s: {
                    count: 0,
                    enable: false,
                    speed: 1,
                    decay: 0,
                    delay: 0,
                    sync: true,
                    offset: 0,
                  },
                  l: {
                    count: 0,
                    enable: false,
                    speed: 1,
                    decay: 0,
                    delay: 0,
                    sync: true,
                    offset: 0,
                  },
                },
              },
              effect: {
                close: true,
                fill: true,
                options: {},
                type: {} as SingleOrMultiple<string> | undefined,
              },
              groups: {},
              move: {
                angle: {
                  offset: 0,
                  value: 90,
                },
                attract: {
                  distance: 200,
                  enable: false,
                  rotate: {
                    x: 3000,
                    y: 3000,
                  },
                },
                center: {
                  x: 50,
                  y: 50,
                  mode: "percent",
                  radius: 0,
                },
                decay: 0,
                distance: {},
                direction: "none",
                drift: 0,
                enable: true,
                gravity: {
                  acceleration: 9.81,
                  enable: false,
                  inverse: false,
                  maxSpeed: 50,
                },
                path: {
                  clamp: true,
                  delay: {
                    value: 0,
                  },
                  enable: false,
                  options: {},
                },
                outModes: {
                  default: "out",
                },
                random: false,
                size: false,
                speed: {
                  min: 0.1,
                  max: 1,
                },
                spin: {
                  acceleration: 0,
                  enable: false,
                },
                straight: false,
                trail: {
                  enable: false,
                  length: 10,
                  fill: {},
                },
                vibrate: false,
                warp: false,
              },
              number: {
                density: {
                  enable: true,
                  width: 400,
                  height: 400,
                },
                limit: {
                  mode: "delete",
                  value: 0,
                },
                value: particleDensity || 120,
              },
              opacity: {
                value: {
                  min: 0.1,
                  max: 0.5,
                },
                animation: {
                  count: 0,
                  enable: true,
                  speed: speed || 4,
                  decay: 0,
                  delay: 0,
                  sync: false,
                  mode: "auto",
                  startValue: "random",
                  destroy: "none",
                },
              },
              reduceDuplicates: false,
              shadow: {
                blur: 0,
                color: {
                  value: "#000",
                },
                enable: false,
                offset: {
                  x: 0,
                  y: 0,
                },
              },
              shape: {
                close: true,
                fill: true,
                options: {},
                type: "circle",
              },
              size: {
                value: {
                  min: minSize || 1,
                  max: maxSize || 3,
                },
                animation: {
                  count: 0,
                  enable: false,
                  speed: 5,
                  decay: 0,
                  delay: 0,
                  sync: false,
                  mode: "auto",
                  startValue: "random",
                  destroy: "none",
                },
              },
              stroke: {
                width: 0,
              },
              zIndex: {
                value: 0,
                opacityRate: 1,
                sizeRate: 1,
                velocityRate: 1,
              },
              destroy: {
                bounds: {},
                mode: "none",
                split: {
                  count: 1,
                  factor: {
                    value: 3,
                  },
                  rate: {
                    value: {
                      min: 4,
                      max: 9,
                    },
                  },
                  sizeOffset: true,
                },
              },
              roll: {
                darken: {
                  enable: false,
                  value: 0,
                },
                enable: false,
                enlighten: {
                  enable: false,
                  value: 0,
                },
                mode: "vertical",
                speed: 25,
              },
              tilt: {
                value: 0,
                animation: {
                  enable: false,
                  speed: 0,
                  decay: 0,
                  sync: false,
                },
                direction: "clockwise",
                enable: false,
              },
              twinkle: {
                lines: {
                  enable: false,
                  frequency: 0.05,
                  opacity: 1,
                },
                particles: {
                  enable: false,
                  frequency: 0.05,
                  opacity: 1,
                },
              },
              wobble: {
                distance: 5,
                enable: false,
                speed: {
                  angle: 50,
                  move: 10,
                },
              },
              life: {
                count: 0,
                delay: {
                  value: 0,
                  sync: false,
                },
                duration: {
                  value: 0,
                  sync: false,
                },
              },
              rotate: {
                value: 0,
                animation: {
                  enable: false,
                  speed: 0,
                  decay: 0,
                  sync: false,
                },
                direction: "clockwise",
                path: false,
              },
              orbit: {
                animation: {
                  count: 0,
                  enable: false,
                  speed: 1,
                  decay: 0,
                  delay: 0,
                  sync: false,
                },
                enable: false,
                opacity: 1,
                rotation: {
                  value: 45,
                },
                width: 1,
              },
              links: {
                blink: false,
                color: {
                  value: "#fff",
                },
                consent: false,
                distance: 100,
                enable: false,
                frequency: 1,
                opacity: 1,
                shadow: {
                  blur: 5,
                  color: {
                    value: "#000",
                  },
                  enable: false,
                },
                triangles: {
                  enable: false,
                  frequency: 1,
                },
                width: 1,
                warp: false,
              },
              repulse: {
                value: 0,
                enabled: false,
                distance: 1,
                duration: 1,
                factor: 1,
                speed: 1,
              },
            },
            detectRetina: true,
          }}
        />
      )}
    </motion.div>
  );
};

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
    <div className="absolute inset-0 overflow-hidden pointer-events-none ">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-4 h-4 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full opacity-20"
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

// Magnetic effect component
const MagneticZap = () => {
  return (
    <motion.div
      className="relative inline-block"
      whileHover="hover"
      variants={{
        hover: {
          scale: 1.1,
          transition: { duration: 0.3 }
        }
      }}
    >
      <motion.div
        variants={{
          hover: {
            rotate: [0, -10, 10, -5, 0],
            transition: { duration: 0.6 }
          }
        }}
      >
        <Zap className="w-8 h-8 text-indigo-500" />
      </motion.div>
      <motion.div
        className="absolute inset-0 bg-indigo-400 rounded-full blur-xl opacity-0"
        variants={{
          hover: {
            opacity: 0.4,
            scale: 1.5,
            transition: { duration: 0.3 }
          }
        }}
      />
    </motion.div>
  );
};

export const ProductSecOne = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

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
    <>
      <div className="text-gray-900 relative overflow-hidden pt-8 flex items-center">
        {/* Enhanced Sparkles Background */}
        <div className="absolute inset-0 w-full h-full">
          <Sparkles
            background="transparent"
            minSize={0.3}
            maxSize={1.5}
            particleDensity={80}
            particleColor="#6366f1"
            speed={0.8}
          />
        </div>

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
                {/* Subtitle with magnetic hover effect */}
                <motion.div 
                  className="flex items-center justify-center gap-3 mb-8"
                  variants={subtitleVariants}
                  whileHover="hover"
                >
                  <motion.span 
                    className="text-2xl md:text-3xl text-gray-600"
                    whileHover={{ 
                      color: "#4f46e5",
                      transition: { duration: 0.3 }
                    }}
                  >
                    Power It with
                  </motion.span>
                  <div className="flex items-center gap-2">
                    <MagneticZap />
                    <motion.span 
                      className="text-3xl md:text-4xl font-bold bg-clip-text text-black relative"
                      whileHover={{
                        scale: 1.05,
                        transition: { duration: 0.3 }
                      }}
                    >
                      Equilibrate.AI
                      {/* Animated underline */}
                      <motion.div
                        className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 1.5, delay: 2 }}
                      />
                    </motion.span>
                  </div>
                </motion.div>

                {/* Call to action with ripple effect */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                  transition={{ duration: 0.8, delay: 2.5 }}
                  className="mt-12"
                >
                  {/* Uncomment if needed
                  <motion.button
                    className="relative px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-full overflow-hidden shadow-2xl"
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 20px 40px rgba(99, 102, 241, 0.4)"
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      className="absolute inset-0 "
                      initial={{ scale: 0, opacity: 0 }}
                      whileHover={{ 
                        scale: 4, 
                        opacity: 0.1,
                        transition: { duration: 0.6 }
                      }}
                    />
                    <span className="relative z-10">Discover Our Solutions</span>
                  </motion.button>
                  */}
                </motion.div>
              </motion.div>
            </div>
          </section>
        </div>
      </div>  
    </>
  );
};