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

// Enhanced Grid Pattern Component - same as hero section three
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
            className="text-gray-600/80"
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
              className="text-blue-600/40"
            />
          ))}
        </svg>
      )}
    </svg>
  );
}

// Grid pattern generator function - same as hero section three
function genRandomPattern(length?: number): number[][] {
  length = length ?? 5;
  return Array.from({ length }, () => [
    Math.floor(Math.random() * 4) + 7,
    Math.floor(Math.random() * 6) + 1,
  ]);
}

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
  const p = genRandomPattern();

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
        "relative overflow-hidden p-6 perspective-1000",
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
      <motion.div
        className="pointer-events-none absolute top-0 left-1/2 -mt-2 -ml-20 h-full w-full  [mask-image:linear-gradient(white,transparent)] opacity-60"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.6 } : { opacity: 0 }}
        transition={{ duration: 1, delay: index * 0.15 + 0.2 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/15 to-gray-900/5 [mask-image:radial-gradient(farthest-side_at_top,white,transparent)]">
          <GridPattern
            width={20}
            height={20}
            x="-12"
            y="4"
            squares={p}
            className="absolute inset-0 h-full w-full mix-blend-overlay"
          />
        </div>
      </motion.div>

      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400/20 to-purple-400/20 opacity-0"
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />

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

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

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
    <div className="relative min-h-screen overflow-hidden border-t border-gray-400 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Grid Background with reduced opacity - matching hero section one */}
      <div className="absolute inset-0 -z-10">
        <GridPattern
          width={72}
          height={56}
          x="50%"
          y="100%"
          squares={genRandomPattern(6)}
          className="absolute inset-0 -z-10 text-gray-300/30 opacity-15"
        />
      </div>

      {/* Additional background gradients - matching hero section one subtlety */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-100/20 via-transparent to-gray-100/10" />

      <motion.div
        className="absolute inset-0 opacity-15"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ duration: 3 }}
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${2 + Math.random() * 2}px`,
              height: `${2 + Math.random() * 2}px`,
              background: `hsl(${220 + Math.random() * 40}, 30%, 70%)`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>

      <motion.div
        className="relative z-10  container mx-auto px-3 xs:px-4 sm:px-6 md:px-8 lg:px-8 pt-4 xs:pt-6 sm:pt-8 md:pt-10 lg:pt-10 pb-6 xs:pb-8 sm:pb-10 md:pb-12 lg:pb-14"
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
              whileHover={{ scale: 1.01 }}
            >
              {"Our Philosophy".split(" ").map((word, i) => (
                <motion.span
                  key={i}
                  className="inline-block mr-2 mb-2 bg-gradient-to-r from-gray-900 via-slate-800 to-gray-900 bg-clip-text text-transparent"
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
                    color: "#3b82f6",
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

        {/* Enhanced Philosophy Cards */}
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

        {/* Enhanced Features Section */}
        <motion.div
          className="text-center mb-4 xs:mb-6 sm:mb-8 md:mb-10 lg:mb-12"
          variants={itemVariants}
          whileInView={{ scale: [0.9, 1] }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* Optional: Add title and description here if needed */}
        </motion.div>

        {/* Enhanced Feature Cards Grid */}
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