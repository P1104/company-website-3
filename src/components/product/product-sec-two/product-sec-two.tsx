"use client";
import React, { useId, useEffect, useState, useRef } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import type { Container } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import {
  motion,
  useAnimation,
  useInView,
  AnimatePresence,
  Variants,
} from "framer-motion";
import { Card, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Zap, Globe, ArrowRight, HousePlug, File } from "lucide-react";
import { Bot, BarChart3, Headphones } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
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

// Memoized Sparkles component
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
          max: speed || 1,
        },
        straight: false,
      },
      number: {
        density: {
          enable: true,
          width: 400,
          height: 400,
        },
        value: particleDensity || 80,
      },
      opacity: {
        value: {
          min: 0.1,
          max: 0.5,
        },
        animation: {
          enable: true,
          speed: speed || 4,
          sync: false,
        },
      },
      shape: {
        type: "circle",
      },
      size: {
        value: {
          min: minSize || 1,
          max: maxSize || 3,
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

// Floating elements animation from product-sec-one
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
          className="absolute w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full opacity-20"
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

// Magnetic effect component from product-sec-one
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
        <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-500" />
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

interface ProductSuite {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  color: string;
  detailedDescription: string;
  stats: Array<{ label: string; value: string }>;
  whyChoose: Array<{ icon: React.ReactNode; text: string }>;
  carouselImages: Array<{ url: string; alt: string }>;
}

const productSuites: ProductSuite[] = [
  {
    id: "analytics",
    title: "Adro",
    description: "A comprehensive analytics platform for actionable insights.",
    detailedDescription:
      "Transform your data into powerful insights with our advanced analytics platform.",
    icon: <BarChart3 className="w-6 h-6" />,
    features: [
      "Real-time Data Processing",
      "Advanced Visualization",
      "Predictive Analytics",
      "Custom Dashboard Creation",
    ],
    color: "from-purple-500 to-pink-500",
    stats: [
      { label: "Self Hosted", value: "100%" },
      { label: "Support", value: "24/7" },
      { label: "Free LLM", value: "✓" },
      { label: "Device Native", value: "✓" },
    ],
    carouselImages: [
      { url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop", alt: "Analytics Dashboard" },
      { url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop", alt: "Data Visualization" },
      { url: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=600&fit=crop", alt: "Predictive Models" },
    ],
    whyChoose: [
      { icon: <Zap className="w-4 h-4 text-indigo-500 flex-shrink-0" />, text: "Easy Integration" },
      { icon: <Globe className="w-4 h-4 text-indigo-500 flex-shrink-0" />, text: "Cross-Platform Compatibility" },
    ],
  },
  {
    id: "chatbot",
    title: "ChatBot JS",
    description:
      "Customizable AI chatbot designed for seamless website integration.",
    detailedDescription:
      "Enhance your website with a simple and easy-to-integrate AI assistant.",
    icon: <Bot className="w-6 h-6" />,
    features: [
      "AI Bot Integration for Websites",
      "Knowledge Base Creation",
      "Custom Prompt Templates",
      "Support for Multiple AI Models",
    ],
    color: "from-blue-500 to-cyan-500",
    stats: [
      { label: "Uptime", value: "99.9%" },
      { label: "Support", value: "24/7" },
      { label: "Integration", value: "1-Click" },
      { label: "Setup Time", value: "5 Min" },
    ],
    carouselImages: [
      { url: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&h=600&fit=crop", alt: "AI Chatbot Interface" },
      { url: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop", alt: "Bot Integration" },
      { url: "https://images.unsplash.com/photo-1526378800651-c32d170fe6f8?w=800&h=600&fit=crop", alt: "Custom Templates" },
    ],
    whyChoose: [
      { icon: <Bot className="w-4 h-4 text-indigo-500 flex-shrink-0" />, text: "No-Code Setup" },
      { icon: <CheckCircle className="w-4 h-4 text-indigo-500 flex-shrink-0" />, text: "Ready-to-Use Templates" },
    ],
  },
  {
    id: "customer-service",
    title: "Customer Service",
    description:
      "Cloud-based manufacturing intelligence powered by digital forms.",
    detailedDescription:
      "Deliver exceptional customer support with our comprehensive service platform.",
    icon: <Headphones className="w-6 h-6" />,
    features: [
      "Omnichannel Support",
      "Automated Ticket Routing",
      "Performance Analytics",
      "Integration Capabilities",
    ],
    color: "from-green-500 to-emerald-500",
    stats: [
      { label: "Uptime", value: "99.9%" },
      { label: "Support", value: "24/7" },
      { label: "Languages", value: "50+" },
      { label: "Response", value: "< 2s" },
    ],
    carouselImages: [
      { url: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop", alt: "Customer Service" },
      { url: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=600&fit=crop", alt: "Support Dashboard" },
      { url: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=600&fit=crop", alt: "Team Collaboration" },
    ],
    whyChoose: [
      { icon: <Headphones className="w-4 h-4 text-indigo-500 flex-shrink-0" />, text: "Multi-Channel Support" },
      { icon: <ArrowRight className="w-4 h-4 text-indigo-500 flex-shrink-0" />, text: "Automated Workflows" },
    ],
  },
];

// Optimized Card Component
const ProductCard = React.memo(
  ({
    suite,
    index,
    isSelected,
    onClick,
  }: {
    suite: ProductSuite;
    index: number;
    isSelected: boolean;
    onClick: () => void;
  }) => {
    const cardRef = useRef(null);
    const isInView = useInView(cardRef, { once: true, amount: 0.2 });

    return (
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{
          duration: 0.5,
          delay: index * 0.1,
          ease: "easeOut",
        }}
        whileHover={{
          y: -8,
          transition: { duration: 0.2 },
        }}
        whileTap={{ scale: 0.98 }}
      >
        <Card
          className={cn(
            "cursor-pointer transition-all duration-300 border-4 overflow-hidden relative group h-full",
            isSelected
              ? "border-indigo-500 bg-indigo-50 shadow-lg"
              : "border-gray-400 hover:border-indigo-300 hover:shadow-md"
          )}
          onClick={onClick}
        >
          <CardHeader className="text-center relative z-10 p-4 sm:p-6">
            <motion.div
              className={cn(
                "w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full flex items-center justify-center text-white",
                "bg-gradient-to-r",
                suite.color
              )}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              {suite.icon}
            </motion.div>

            <h3 className="text-lg sm:text-xl font-semibold mb-2">{suite.title}</h3>
            <p className="text-sm sm:text-base text-gray-600">{suite.description}</p>

            <AnimatePresence>
              {isSelected && (
                <motion.div
                  className="absolute top-3 right-3 sm:top-4 sm:right-4"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-500" />
                </motion.div>
              )}
            </AnimatePresence>
          </CardHeader>
        </Card>
      </motion.div>
    );
  }
);

ProductCard.displayName = "ProductCard";

// Optimized Feature List
const FeatureList = React.memo(({ features }: { features: string[] }) => {
  return (
    <motion.ul
      className="space-y-2 sm:space-y-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, staggerChildren: 0.05 }}
    >
      {features.map((feature, index) => (
        <motion.li
          key={index}
          className="flex items-start gap-2 sm:gap-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0 mt-0.5" />
          <span className="text-sm sm:text-base">{feature}</span>
        </motion.li>
      ))}
    </motion.ul>
  );
});

FeatureList.displayName = "FeatureList";

export function ProductSecTwo() {
  const [selectedSuite, setSelectedSuite] = useState<ProductSuite>(
    productSuites[0]
  );
  const detailRef = useRef(null);
  const heroRef = useRef(null);
  const isDetailInView = useInView(detailRef, { once: true, amount: 0.2 });
  const isHeroInView = useInView(heroRef, { once: true, amount: 0.3 });

  // Subtitle animation with magnetic effect from product-sec-one
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
    <div className="text-gray-900 relative overflow-hidden pt-20 sm:pt-24 md:pt-34">
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
          className="absolute -top-32 -right-32 sm:-top-40 sm:-right-40 w-64 h-64 sm:w-80 sm:h-80 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl"
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
          className="absolute -bottom-32 -left-32 sm:-bottom-40 sm:-left-40 w-64 h-64 sm:w-80 sm:h-80 bg-gradient-to-tr from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl"
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
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="px-4 sm:px-6" ref={heroRef}>
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              className="mb-6 sm:mb-8"
              initial="hidden"
              animate={isHeroInView ? "visible" : "hidden"}
            >
              {/* Subtitle with magnetic hover effect */}
              <motion.div
                className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-4"
                variants={subtitleVariants}
                whileHover="hover"
              >
                <motion.span
                  className="text-xl sm:text-2xl md:text-3xl text-gray-600"
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
                    className="text-2xl sm:text-3xl md:text-4xl font-bold bg-clip-text text-black relative"
                    whileHover={{
                      scale: 1.05,
                      transition: { duration: 0.3 }
                    }}
                  >
                    Equilibrate.AI
                    {/* Animated underline */}
                    <motion.div
                      className="absolute -bottom-1 sm:-bottom-2 left-0 h-0.5 sm:h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
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
                animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.8, delay: 2.5 }}
                className="mt-8 sm:mt-12"
              >
                {/* Additional content can be added here */}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Product Suites Overview */}
        <section className="py-4 sm:py-6 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-12 sm:mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
                Our Product Suite
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 px-4">
                Choose a product as a service to explore its capabilities and components
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-16">
              {productSuites.map((suite, index) => (
                <ProductCard
                  key={suite.id}
                  suite={suite}
                  index={index}
                  isSelected={selectedSuite.id === suite.id}
                  onClick={() => setSelectedSuite(suite)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Detailed Product View */}
        <section className="pb-20 sm:pb-28 px-4 sm:px-6" ref={detailRef}>
          <div className="max-w-7xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedSuite.id}
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isDetailInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-start lg:items-center"
              >
                {/* Left Content */}
                <div className="order-2 lg:order-1">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <div
                      className={cn(
                        "w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center text-white flex-shrink-0",
                        "bg-gradient-to-r",
                        selectedSuite.color
                      )}
                    >
                      {selectedSuite.icon}
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold">
                      {selectedSuite.title}
                    </h2>
                  </div>

                  <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8">
                    {selectedSuite.description}
                  </p>

                  <p className="text-base sm:text-lg mb-6 sm:mb-8">
                    {selectedSuite.detailedDescription}
                  </p>

                  <div className="mb-6 sm:mb-8">
                    <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
                      Key Features:
                    </h3>
                    <FeatureList features={selectedSuite.features} />
                  </div>

                  <div className="mb-6 sm:mb-8">
                    <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
                      Why Choose {selectedSuite.title}?
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div className="flex items-center gap-2 text-gray-700">
                        <Zap className="w-4 h-4 text-indigo-500 flex-shrink-0" />
                        <span className="text-sm sm:text-base">Easy Integration</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <HousePlug className="w-4 h-4 text-indigo-500 flex-shrink-0" />
                        <span className="text-sm sm:text-base">Runs on local LLMs</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <Globe className="w-4 h-4 text-indigo-500 flex-shrink-0" />
                        <span className="text-sm sm:text-base">Quick dashboards</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <File className="w-4 h-4 text-indigo-500 flex-shrink-0" />
                        <span className="text-sm sm:text-base">Secure data, stays on your system</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white w-full sm:w-auto"
                    >
                      View Suite
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-indigo-500 text-indigo-600 bg-indigo-50 w-full sm:w-auto"
                    >
                      Learn More
                    </Button>
                  </div>
                </div>

                {/* Right Content - Carousel Card */}
                <div className="relative order-1 lg:order-2">
                  <Card className="p-6 sm:p-8 border-4 border-indigo-200 overflow-hidden">
                    <Carousel className="w-full">
                      <CarouselContent>
                        {selectedSuite.carouselImages.map((image, index) => (
                          <CarouselItem key={index}>
                            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
                              <Image
                              width={100}
                              height={100}
                                src={image.url}
                                alt={image.alt}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                                <p className="text-white font-semibold text-sm sm:text-base">
                                  {image.alt}
                                </p>
                              </div>
                            </div>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <CarouselPrevious className="left-2" />
                      <CarouselNext className="right-2" />
                    </Carousel>
                    
                    <div className="mt-6">
                      <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-center">
                        {selectedSuite.title}
                      </h3>

                      <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 text-center">
                        Experience the power of{" "}
                        {selectedSuite.title.toLowerCase()} with our
                        comprehensive solution.
                      </p>

                      <div className="grid grid-cols-2 gap-3 sm:gap-4 text-sm">
                        {selectedSuite.stats.map((stat, index) => (
                          <div
                            key={index}
                            className="p-2 sm:p-3 bg-gray-100 rounded-lg border border-gray-400"
                          >
                            <div className="font-semibold text-base sm:text-lg">
                              {stat.value}
                            </div>
                            <div className="text-xs sm:text-sm text-gray-600">{stat.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>
      </div>
    </div>
  );
}