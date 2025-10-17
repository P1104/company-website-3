"use client";

import React, { useId, useEffect, useState, useRef } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import type { Container } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import {
  motion,
  useAnimation,
  useInView,
  Variants,
} from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Clock,
  Factory,
  Heart,
  Zap,
  Battery,
  Settings,
  BarChart3,
} from "lucide-react";
import Image from "next/image";

function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
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

const Sparkles = React.memo((props: ParticlesProps) => {
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
        transition: {
          duration: 0.5,
        },
      });
    }
  };

  const generatedId = useId();

  const particleOptions = {
    background: {
      color: {
        value: background || "transparent",
      },
    },
    fullScreen: {
      enable: false,
      zIndex: 1,
    },
    fpsLimit: 60,
    interactivity: {
      events: {
        onClick: {
          enable: false,
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
    },
    particles: {
      color: {
        value: particleColor || "#6366f1",
      },
      move: {
        direction: "none" as const,
        enable: true,
        outModes: {
          default: "out" as const,
        },
        random: false,
        speed: {
          min: 0.1,
          max: speed || 0.5,
        },
        straight: false,
      },
      number: {
        density: {
          enable: true,
          width: 800,
          height: 600,
        },
        value: particleDensity || 30,
      },
      opacity: {
        value: {
          min: 0.1,
          max: 0.3,
        },
        animation: {
          enable: true,
          speed: speed || 1,
          sync: false,
        },
      },
      shape: {
        type: "circle",
      },
      size: {
        value: {
          min: minSize || 1,
          max: maxSize || 2,
        },
      },
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

Sparkles.displayName = "Sparkles";

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

interface UseCase {
  id: string;
  title: string;
  category: string;
  readTime: string;
  description: string;
  icon: React.ReactNode;
  image: string;
}

const UseCaseCard = React.memo(
  ({ useCase, index }: { useCase: UseCase; index: number }) => {
    const cardRef = useRef(null);
    const isInView = useInView(cardRef, { once: true, amount: 0.2 });

    return (
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{
          duration: 0.5,
          delay: index * 0.05,
          ease: "easeOut",
        }}
        whileHover={{
          y: -8,
          transition: { duration: 0.2 },
        }}
        whileTap={{ scale: 0.98 }}
      >
        <Card className="h-full bg-white overflow-hidden transition-all duration-300 border border-gray-200 hover:border-indigo-300 hover:shadow-lg relative group">
          <div className="relative h-48 overflow-hidden bg-gray-100">
            <Image
              src={useCase.image}
              alt={useCase.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 hover:scale-105"
              priority={index < 3}
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bccbqbDUK3Y4q9y1B1X5sK7/2Q=="
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-transparent to-transparent" />
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="absolute bottom-4 left-4"
            >
              <Badge className="text-gray-800 shadow-sm bg-white/90">
                {useCase.category}
              </Badge>
            </motion.div>
          </div>

          <CardHeader className="pb-3">
            <div className="flex items-center text-sm text-gray-500 mb-2">
              <Clock className="w-4 h-4 mr-2" />
              {useCase.readTime}
            </div>
            <motion.div whileHover={{ scale: 1.02, x: 4 }}>
              <CardTitle className="text-xl font-semibold text-gray-900 hover:text-indigo-600 transition-colors">
                {useCase.title}
              </CardTitle>
            </motion.div>
          </CardHeader>

          <CardContent>
            <motion.div whileHover={{ scale: 1.01 }}>
              <CardDescription className="text-gray-600 mb-4">
                {useCase.description}
              </CardDescription>
            </motion.div>

            <motion.div whileHover={{ x: 6 }}>
              <Button
                variant="link"
                className="px-0 text-indigo-600 hover:text-indigo-800 group"
              >
                Read more
                <motion.div
                  whileHover={{ rotate: -45, x: 6 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </motion.div>
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }
);

UseCaseCard.displayName = "UseCaseCard";

export const UseCasesSectionTwo = () => {
  const [particlesReady, setParticlesReady] = useState(false);
  const heroRef = useRef(null);
  const detailRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true, amount: 0.3 });
  const isDetailInView = useInView(detailRef, { once: true, amount: 0.2 });

  useEffect(() => {
    const timer = setTimeout(() => {
      setParticlesReady(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

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
  const gradientTextVariants: Variants = {
    hidden: { 
      backgroundPosition: "200% center" 
    },
    visible: {
      backgroundPosition: "0% center",
      transition: {
        duration: 2,
        ease: "easeInOut"
      }
    }
  };

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

  const useCases = [
    {
      id: "1",
      title: "Dynamic Process Intelligence for Modern Manufacturers",
      category: "Manufacturing",
      readTime: "5 min read",
      description:
        "AI-powered process intelligence and knowledge automation that drives yield, quality, and margin optimization for advanced manufacturers.",
      icon: <Factory className="w-6 h-6" />,
      image: "/use-cases-sec-two/usecaseone.jpeg",
    },
    {
      id: "2",
      title: "Optimizing Hospital Performance with AI & ML",
      category: "Healthcare",
      readTime: "7 min read",
      description:
        "AI-powered knowledge and analytics platform that reduces hospital readmissions and equipment downtime, improving care quality and operational efficiency.",
      icon: <Heart className="w-6 h-6" />,
      image: "/use-cases-sec-two/usecasetwo.jpeg",
    },
    {
      id: "3",
      title: "Faster Quality Decisions with Conversational AI",
      category: "Quality Control",
      readTime: "6 min read",
      description:
        "Empower quality teams to query specifications, process parameters, and inspection criteria—cutting down search time and improving compliance.",
      icon: <Zap className="w-6 h-6" />,
      image: "/use-cases-sec-two/usecasefour.jpeg",
    },
    {
      id: "4",
      title: "Battery Health Analytics & Predictive Maintenance",
      category: "Energy",
      readTime: "8 min read",
      description:
        "Battery-operated systems often face hidden performance degradation that traditional monitoring fails to catch early. Capacity fade, abnormal discharge patterns, or remaining useful life—especially when ...",
      icon: <Battery className="w-6 h-6" />,
      image: "/use-cases-sec-two/usecasefive.jpeg",
    },
    {
      id: "5",
      title: "AI-Powered Knowledge Access for Process Precision",
      category: "Process Engineering",
      readTime: "5 min read",
      description:
        "Transforming disconnected SOPs, technical docs, and drawings into a conversational AI system for real-time, accurate process engineering support.",
      icon: <Settings className="w-6 h-6" />,
      image: "/use-cases-sec-two/usecasesix.jpeg",
    },
    {
      id: "6",
      title: "Data-Driven Plant Optimization",
      category: "Analytics",
      readTime: "6 min read",
      description:
        "Dataraft empowers Plant Heads to unify production data, predict bottlenecks, and optimize energy use-enabling faster, data-driven decisions and measurable cost savings.",
      icon: <BarChart3 className="w-6 h-6" />,
      image: "/use-cases-sec-two/usecaseseven.jpeg",
    },
  ];

  return (
    <div className="text-gray-900 relative overflow-hidden">
      {/* Enhanced Sparkles Background for entire component */}
      {particlesReady && (
        <div className="absolute inset-0 w-full h-full">
          <Sparkles
            background="transparent"
            minSize={0.6}
            maxSize={1.4}
            particleDensity={80}
            particleColor="#3b82f6"
            speed={0.8}
            className="opacity-80"
          />
        </div>
      )}

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
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 rounded-full blur-3xl"
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
        <section className="px-6 pt-30 flex items-center" ref={heroRef}>
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              className="mb-8"
              initial="hidden"
              animate={isHeroInView ? "visible" : "hidden"}
            >
              {/* Main Title with reveal effect */}
              <div className="perspective-1000">
                <motion.div
                  variants={textVariants}
                  custom={0}
                  className="overflow-hidden"
                >
                  <motion.h1 
                    className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent"
                    variants={gradientTextVariants}
                    style={{
                      backgroundSize: "200% 100%"
                    }}
                  >
                    AI Solutions
                  </motion.h1>
                </motion.div>
              </div>

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
                  Industry-Specific AI Applications
                </motion.span>
              </motion.div>

              {/* Description */}
              <motion.p 
                className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed mb-12"
                initial={{ opacity: 0, y: 50 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.8, delay: 1.8 }}
                whileHover={{ 
                  scale: 1.01,
                  y: -1
                }}
              >
                Discover how our AI-powered solutions transform industries through intelligent automation, predictive analytics, and conversational interfaces.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="py-8 px-6 pb-16" ref={detailRef}>
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={
                isDetailInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
              }
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Featured Use Cases
              </h2>
              <p className="text-xl text-gray-600">
                Explore our industry-specific AI applications
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {useCases.map((useCase, index) => (
                <UseCaseCard key={useCase.id} useCase={useCase} index={index} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};