// File: src/components/home/hero-section-three/hero-section-three.tsx
"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useInView, useScroll, useTransform, Variants } from "framer-motion";
import { Zap, Cpu, Target, Globe, Users, Cog } from "lucide-react";

type FeatureType = {
  title: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  description: string;
};

const CentralAIBrain: React.FC<{ isInView: boolean }> = ({ isInView }) => {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <motion.div
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
      initial={{ opacity: 0, scale: 0 }}
      animate={isInView ? { 
        opacity: 1, 
        scale: 1
      } : { 
        opacity: 0, 
        scale: 0
      }}
      transition={{ 
        duration: 1.2, 
        delay: 1.5,
        type: "spring",
        stiffness: 150,
        damping: 20
      }}
      whileHover={{
        scale: 1.1,
        transition: { duration: 0.3 }
      }}
      style={{ perspective: "1000px" }}
    >
      <div className="relative w-20 h-20 sm:w-24 md:w-28 lg:w-32 sm:h-24 md:h-28 lg:h-32">
        {Array.from({ length: 3 }).map((_, i) => (
          <motion.div
            key={i}
            className={`absolute inset-0 rounded-full border-2 ${
              i === 0 ? 'border-blue-400/40' : 
              i === 1 ? 'border-purple-400/40' : 
              'border-cyan-400/40'
            }`}
            style={{
              width: `${80 + i * 12 + (windowWidth > 768 ? 40 + i * 8 : 0)}px`,
              height: `${80 + i * 12 + (windowWidth > 768 ? 40 + i * 8 : 0)}px`,
              top: `${-i * 6 - (windowWidth > 768 ? i * 4 : 0)}px`,
              left: `${-i * 6 - (windowWidth > 768 ? i * 4 : 0)}px`,
            }}
            animate={{
              rotate: i % 2 === 0 ? [0, 360] : [360, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              rotate: { 
                duration: 15 + i * 5, 
                repeat: Infinity, 
                ease: "linear" 
              },
              scale: { 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: i * 0.5
              }
            }}
          />
        ))}

        <motion.div
          className="absolute inset-0 w-16 h-16 sm:w-18 md:w-20 lg:w-24 sm:h-18 md:h-20 lg:h-24 rounded-full bg-gradient-to-br from-white via-blue-50 to-purple-50
                     border-3 border-blue-300/60 shadow-2xl backdrop-blur-sm
                     flex items-center justify-center transform-gpu m-2 sm:m-3 lg:m-4"
          animate={{
            boxShadow: [
              "0 0 20px rgba(59, 130, 246, 0.3)",
              "0 0 40px rgba(139, 92, 246, 0.5)",
              "0 0 20px rgba(6, 182, 212, 0.3)",
            ],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          whileHover={{
            rotateX: 15,
            rotateZ: 5,
          }}
        >
          <motion.div
            className="relative z-10 text-slate-700 font-bold tracking-wider text-center"
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              fontSize: 'clamp(6px, 1.5vw, 10px)',
              lineHeight: '1',
              textShadow: '0 0 10px rgba(6, 182, 212, 0.8)'
            }}
          >
            EQUILIBRATE.AI
          </motion.div>
        </motion.div>

        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 sm:w-2 sm:h-2 bg-cyan-400 rounded-full"
            style={{
              top: "50%",
              left: "50%",
              transformOrigin: `${40 + i * 6}px 0px`
            }}
            animate={{
              rotate: [0, 360],
              scale: [0.5, 1, 0.5],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              rotate: { 
                duration: 8 + i * 2, 
                repeat: Infinity, 
                ease: "linear" 
              },
              scale: { 
                duration: 3, 
                repeat: Infinity, 
                delay: i * 0.3 
              },
              opacity: { 
                duration: 3, 
                repeat: Infinity, 
                delay: i * 0.3 
              }
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

function EnhancedConnectionLines({ isInView }: { isInView: boolean }) {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 900 700"
      preserveAspectRatio="xMidYMid meet"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="lineGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.6" />
          <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.6" />
        </linearGradient>
        <linearGradient id="lineGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.5" />
          <stop offset="50%" stopColor="#10b981" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.5" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      <motion.path
        d="M180,210 Q300,300 450,350"
        stroke="url(#lineGrad1)"
        strokeWidth="2"
        fill="none"
        filter="url(#glow)"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
        transition={{ duration: 2, delay: 0.5 }}
      />
      
      <motion.path
        d="M450,180 Q400,250 450,320"
        stroke="url(#lineGrad1)"
        strokeWidth="2"
        fill="none"
        filter="url(#glow)"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
        transition={{ duration: 1.5, delay: 0.8 }}
      />
      
      <motion.path
        d="M720,210 Q600,300 450,350"
        stroke="url(#lineGrad1)"
        strokeWidth="2"
        fill="none"
        filter="url(#glow)"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
        transition={{ duration: 2, delay: 1.1 }}
      />
      
      <motion.path
        d="M180,490 Q300,400 450,350"
        stroke="url(#lineGrad2)"
        strokeWidth="2"
        fill="none"
        filter="url(#glow)"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
        transition={{ duration: 2, delay: 1.3 }}
      />
      
      <motion.path
        d="M450,520 Q400,400 450,350"
        stroke="url(#lineGrad2)"
        strokeWidth="2"
        fill="none"
        filter="url(#glow)"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
        transition={{ duration: 2, delay: 1.3 }}
      />
      
      <motion.path
        d="M730,490 Q630,450 450,350"
        stroke="url(#lineGrad2)"
        strokeWidth="2"
        fill="none"
        filter="url(#glow)"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
        transition={{ duration: 2, delay: 1.7 }}
      />

      <motion.path
        d="M450,180 L450,210"
        stroke="url(#lineGrad1)"
        strokeWidth="2"
        fill="none"
        filter="url(#glow)"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
        transition={{ duration: 1, delay: 0.8 }}
      />
      <motion.path
        d="M450,520 L450,490"
        stroke="url(#lineGrad2)"
        strokeWidth="2"
        fill="none"
        filter="url(#glow)"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
        transition={{ duration: 1, delay: 1.5 }}
      />

      {Array.from({ length: 8 }).map((_, i) => (
        <motion.circle
          key={i}
          r="3"
          fill={i < 4 ? "#06b6d4" : "#10b981"}
          opacity="0.7"
          initial={{ opacity: 0 }}
          animate={isInView ? { 
            opacity: [0, 0.7, 0] 
          } : { opacity: 0 }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 0.3 + 2,
            ease: "easeInOut",
          }}
        >
          <animateMotion
            dur="6s"
            repeatCount="indefinite"
            path={
              i < 2 ? "M180,210 Q300,300 450,350" :
              i < 4 ? "M720,210 Q600,300 450,350" :
              i < 6 ? "M450,180 Q450,250 450,320" :
              "M450,520 Q450,450 450,380"
            }
            begin={`${i * 0.5}s`}
          />
        </motion.circle>
      ))}
    </svg>
  );
}

function EnhancedNetworkNode({
  feature,
  index,
  position,
  ...props
}: {
  feature: FeatureType;
  index: number;
  position: { x: number; y: number };
} & Omit<React.ComponentProps<"div">, 
  | "onDrag" | "onDragEnd" | "onDragStart" | "onDragEnter" | "onDragLeave" | "onDragOver" | "onDrop"
  | "onAnimationStart" | "onAnimationEnd" | "onAnimationIteration"
  | "onTransitionEnd"
>) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const isTopNode = index < 3;

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const nodeVariants: Variants = {
    hidden: {
      opacity: 0,
      scale: 0,
      filter: "blur(10px)",
    },
    visible: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 25,
        delay: index * 0.15,
        duration: 0.8,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-40"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
      }}
      variants={nodeVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      whileHover={{
        scale: 1.1,
        zIndex: 100,
        transition: {
          type: "spring",
          stiffness: 400,
          damping: 20,
        },
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      <motion.div
        className="relative w-20 h-20 sm:w-24 md:w-28 lg:w-32 sm:h-24 md:h-28 lg:h-32 transform-gpu"
        whileHover={{
          rotateX: 8,
          rotateZ: 3,
        }}
      >
        <div className="absolute inset-0 bg-white/95 backdrop-blur-lg rounded-2xl border border-gray-200/80 shadow-lg group-hover:border-blue-200/80 group-hover:shadow-blue-100/20 transition-all duration-300">
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="relative z-10 p-3 sm:p-4 lg:p-5 rounded-xl bg-gradient-to-br from-gray-50 to-blue-50/80 border border-gray-100 shadow-sm flex items-center justify-center"
              whileHover={{
                rotate: 15,
                scale: 1.05,
                transition: { duration: 0.3 },
              }}
              style={{
                width: '65%',
                height: '65%'
              }}
            >
              <feature.icon 
                className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-slate-600" 
                strokeWidth={1.5} 
              />
            </motion.div>
          </div>
        </div>
      </motion.div>

      <motion.div
        className={`absolute left-1/2 transform -translate-x-1/2 pointer-events-none z-[70] ${
          isMobile ? 'bottom-full mb-4 sm:mb-6' : 
          isTopNode ? 'bottom-full mb-4 sm:mb-6' : 'top-full mt-4 sm:mt-6'
        }`}
        initial={{ opacity: 0, y: isMobile ? 15 : (isTopNode ? 15 : -15), scale: 0.9 }}
        animate={isHovered ? { 
          opacity: 1, 
          y: 0, 
          scale: 1
        } : { 
          opacity: 0, 
          y: isMobile ? 15 : (isTopNode ? 15 : -15), 
          scale: 0.9
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 25,
        }}
      >
        <div className="bg-white/95 backdrop-blur-lg border border-gray-200/80 rounded-xl px-4 py-3 pb-3 shadow-lg shadow-gray-500/10 max-w-sm">
          <div className="text-slate-800 font-semibold text-sm text-center">
            {feature.title}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

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

export const HeroSectionThree: React.FC = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const features = [
    {
      title: "Accessible Innovation",
      icon: Zap,
      description: "Cutting-edge AI and data analytics within reach",
    },
    {
      title: "Sustainability at Core",
      icon: Globe,
      description: "Responsible transformation with environmental impact",
    },
    {
      title: "Enriching Communities",
      icon: Users,
      description: "Building stronger communities through technology",
    },
    {
      title: "End-to-End Solutions",
      icon: Cog,
      description: "Complete AI chatbots and analytics solutions",
    },
    {
      title: "Future-Ready Technology",
      icon: Cpu,
      description: "Generative AI and Industry 4.0 principles",
    },
    {
      title: "Proven Excellence",
      icon: Target,
      description: "Consistent delivery from consulting to implementation",
    },
  ];

  const nodePositions = [
    { x: 20, y: 25 },
    { x: 50, y: 15 },
    { x: 80, y: 25 },
    { x: 20, y: 75 },
    { x: 50, y: 85 },
    { x: 80, y: 75 },
  ];

  return (
    <motion.section
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
      className="overflow-visible"
      style={{ y }}
    >
      <motion.div
        className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div
          className="text-center mb-8 sm:mb-12 lg:mb-20"
          variants={itemVariants}
        >
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black mb-4 sm:mb-6 lg:mb-8 leading-tight overflow-hidden"
          >
            {"Why Equilibrate Leads the Future".split(" ").map((word, i) => (
              <motion.span
                key={i}
                className="inline-block mr-2 sm:mr-3 lg:mr-4 bg-gradient-to-r from-gray-900 via-slate-800 to-gray-900 bg-clip-text text-transparent transition-colors duration-200 ease-out hover:bg-gradient-to-r hover:from-violet-600 hover:via-blue-600 hover:to-cyan-500"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  delay: i * 0.08,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                whileHover={{
                  y: -3,
                  transition: { duration: 0.18 },
                }}
              >
                {word}
              </motion.span>
            ))}
          </motion.h2>

          <motion.p
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-600 max-w-xs sm:max-w-2xl lg:max-w-4xl mx-auto leading-relaxed px-4 sm:px-0"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Innovation, and commitment combined to deliver
            transformation across industries.
          </motion.p>
        </motion.div>

        <motion.div
          className="relative max-w-7xl mx-auto h-80 sm:h-96 md:h-[500px] lg:h-[600px] xl:h-[700px]"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <EnhancedConnectionLines isInView={isInView} />
          <CentralAIBrain isInView={isInView} />

          {features.map((feature, index) => (
            <EnhancedNetworkNode
              key={feature.title}
              feature={feature}
              index={index}
              position={nodePositions[index]}
            />
          ))}
        </motion.div>
      </motion.div>
    </motion.section>
  );
};