// File: src/components/home/hero-section-two/hero-section-two.tsx
"use client";
import React, { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import {
  Brain,
  Zap,
  Shield,
  HeadphonesIcon,
  Lock,
  LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

type FeatureType = {
  title: string;
  icon: LucideIcon | React.FC<{ className?: string }>;
  description: string;
};

interface FeatureCardProps {
  feature: FeatureType;
  className?: string;
  index: number;
}

function FeatureCard({
  feature,
  className,
  index,
  ...props
}: FeatureCardProps &
  Omit<
    React.ComponentProps<"div">,
    | keyof FeatureCardProps
    | "onAnimationStart"
    | "onAnimationEnd"
    | "onAnimationIteration"
    | "onDrag"
    | "onDragStart"
    | "onDragEnd"
  >) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const cardVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 60,
      rotateX: -15,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        delay: index * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const contentVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.15 + 0.3,
        ease: "easeOut",
      },
    },
  };

  const iconVariants: Variants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
        delay: index * 0.15 + 0.5,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={cn(
        "relative overflow-hidden p-6 perspective-1000 group",
        className
      )}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      whileHover={{
        y: -8,
        rotateY: 3,
        scale: 1.02,
        transition: { duration: 0.3, ease: "easeOut" },
      }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <motion.div className="relative z-10 flex flex-col h-full" variants={contentVariants}>
        <motion.div
          className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600 drop-shadow-lg flex-shrink-0"
          variants={iconVariants}
          whileHover={{
            scale: 1.1,
            rotate: 5,
            backgroundColor: "#dbeafe",
            transition: { duration: 0.2 },
          }}
        >
          <feature.icon
            className="h-6 w-6"
            strokeWidth={1}
          />
        </motion.div>

        <motion.h3
          className="text-xl font-bold text-gray-900 mb-3 leading-tight flex-shrink-0"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: 0.6, delay: index * 0.15 + 0.7 }}
        >
          {feature.title}
        </motion.h3>

        <motion.p
          className="text-gray-600 leading-relaxed text-base flex-grow"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: index * 0.15 + 0.9 }}
        >
          {feature.description}
        </motion.p>
      </motion.div>
    </motion.div>
  );
}

export const HeroSectionTwo: React.FC = () => {
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

  // const itemVariants: Variants = {
  //   hidden: { y: 20, opacity: 0 },
  //   visible: {
  //     y: 0,
  //     opacity: 1,
  //     transition: {
  //       duration: 0.5,
  //       ease: "easeOut",
  //     },
  //   },
  // };

  const PlayIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <rect
        x="3"
        y="5"
        width="18"
        height="14"
        rx="2"
        stroke="currentColor"
        strokeWidth="2"
      />
      <polygon points="10,9 16,12 10,15" fill="currentColor" />
    </svg>
  );

  return (
    <div className="relative min-h-screen overflow-hidden border-gray-200">
      <motion.div
        className="relative z-10 container mx-auto px-3 xs:px-4 sm:px-6 md:px-8 lg:px-8 pt-4 xs:pt-6 sm:pt-8 md:pt-10 lg:pt-10 pb-6 xs:pb-8 sm:pb-10 md:pb-12 lg:pb-14"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="text-center mb-6 xs:mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          <motion.div
            className="text-center"
            variants={containerVariants}
          >
            <motion.h1
              className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold mb-4 xs:mb-6 sm:mb-8 md:mb-10 drop-shadow overflow-hidden px-2 sm:px-0 leading-tight"
            >
              {"Our Philosophy".split(" ").map((word, i) => (
                <motion.span
                  key={i}
                  className="inline-block mr-2 mb-2 bg-gradient-to-r from-gray-900 via-slate-800 to-gray-900 bg-clip-text text-transparent transition-colors duration-200 ease-out hover:bg-gradient-to-r hover:from-violet-600 hover:via-blue-600 hover:to-cyan-500"
                  initial={{ opacity: 0, rotateY: 90 }}
                  whileInView={{ opacity: 1, rotateY: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.1,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  whileHover={{
                    y: -3,
                    transition: { duration: 0.2 },
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>

            <motion.p
              className="text-sm xs:text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-2 sm:px-4 md:px-0 font-light"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              whileHover={{ scale: 1.01 }}
            >
              Discover the core principles that drive our mission to deliver 
              intelligent, secure, and efficient solutions for modern businesses.
            </motion.p>
          </motion.div>
        </div>

        {/* Philosophy Cards */}
        <motion.div
          className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-2 xs:gap-3 sm:gap-4 md:gap-6 mb-4 xs:mb-6 sm:mb-8 md:mb-10 lg:mb-12"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
        >
          {[
            {
              icon: Zap,
              title: "Simplicity",
              description:
                "Intuitive design and seamless user experiences that reduce complexity without compromising functionality.",
            },
            {
              icon: Shield,
              title: "Security",
              description:
                "Enterprise-grade security protocols ensuring your data remains protected and compliant at all times.",
            },
            {
              icon: Zap,
              title: "Performance",
              description:
                "Optimized solutions delivering exceptional speed and reliability for mission-critical operations.",
            },
            {
              icon: Zap,
              title: "Innovation",
              description:
                "Cutting-edge AI technology designed to enhance productivity and drive measurable business growth.",
            },
          ].map((feature, index) => (
            <FeatureCard
              key={feature.title}
              feature={feature}
              index={index}
              className="bg-white/95 backdrop-blur-lg rounded-2xl border border-gray-200/80 shadow-lg hover:shadow-xl hover:border-blue-200/60 h-full transition-all duration-300"
            />
          ))}
        </motion.div>

        {/* Feature Cards Grid */}
        <motion.div
          className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-2 xs:gap-3 sm:gap-4 md:gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {[
            {
              icon: Lock,
              title: "Data Encryption",
              description:
                "Military-grade encryption protocols safeguarding your sensitive information with zero-trust architecture.",
            },
            {
              icon: Brain,
              title: "AI Intelligence",
              description:
                "Advanced machine learning algorithms providing intelligent insights and automated decision-making capabilities.",
            },
            {
              icon: PlayIcon,
              title: "Real-Time Analytics",
              description:
                "Comprehensive dashboards delivering instant visibility into performance metrics and business intelligence.",
            },
            {
              icon: HeadphonesIcon,
              title: "Expert Support",
              description:
                "Dedicated technical specialists available around the clock to ensure optimal system performance.",
            },
          ].map((feature, index) => (
            <FeatureCard
              key={feature.title}
              feature={feature}
              index={index}
              className="bg-white/95 backdrop-blur-lg rounded-2xl border border-gray-200/80 shadow-lg hover:shadow-xl hover:border-blue-200/60 h-full transition-all duration-300"
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};