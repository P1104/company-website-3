"use client";

import React, { useState, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  Variants,
  AnimatePresence,
} from "framer-motion";
import { Target, Users, Cog } from "lucide-react";

type FeatureType = {
  title: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  description: string;
};

const FloatingLogo: React.FC<{ className?: string }> = ({ className = "" }) => (
  <motion.div
    className={`relative ${className}`}
    animate={{
      y: [0, -15, 0],
      rotateY: [0, 360],
      scale: [1, 1.1, 1],
    }}
    transition={{
      y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
      rotateY: { duration: 10, repeat: Infinity, ease: "linear" },
      scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
    }}
    whileHover={{
      scale: 1.2,
      rotateZ: 10,
      transition: { duration: 0.3 }
    }}
  >
  </motion.div>
);

const RobotImage: React.FC = () => {
  return (
    <motion.div 
      className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 mx-auto"
      initial={{ scale: 0, rotateY: -180 }}
      animate={{ scale: 1, rotateY: 0 }}
      transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
      whileHover={{ 
        scale: 1.05,
        rotateY: 5,
        transition: { duration: 0.3 }
      }}
      style={{ perspective: "1000px" }}
    >
      <motion.div 
        className="relative w-full h-full"
        animate={{ 
          y: [0, -15, 0]
        }}
        transition={{ 
          y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
        }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <motion.div
          className="relative w-full h-full flex items-center justify-center z-10"
          animate={{
            rotateY: [0, 3, -3, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <motion.img 
            src="/hero-sec-one/ai-robot.jpg" 
            alt="AI Robot" 
            className="w-56 h-56 md:w-64 md:h-64 lg:w-80 lg:h-80 object-contain rounded-3xl filter drop-shadow-2xl"
            style={{
              filter: "drop-shadow(0 25px 50px rgba(59, 130, 246, 0.4)) drop-shadow(0 0 30px rgba(139, 92, 246, 0.3))"
            }}
            initial={{ 
              filter: "brightness(0.3) contrast(1.5) drop-shadow(0 25px 50px rgba(59, 130, 246, 0.3))" 
            }}
            animate={{ 
              filter: "brightness(1) contrast(1) drop-shadow(0 25px 50px rgba(59, 130, 246, 0.4)) drop-shadow(0 0 30px rgba(139, 92, 246, 0.3))"
            }}
            transition={{
              duration: 2,
              delay: 1
            }}
            whileHover={{
              filter: "brightness(1.1) contrast(1.1) saturate(1.3) drop-shadow(0 30px 60px rgba(59, 130, 246, 0.5)) drop-shadow(0 0 40px rgba(139, 92, 246, 0.4))",
              transition: { duration: 0.3 }
            }}
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
              if (nextElement) {
                nextElement.style.display = 'flex';
              }
            }}
          />
          
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 rounded-3xl flex items-center justify-center text-white font-light text-2xl tracking-wider z-10" style={{ display: 'none' }}>
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl flex items-center justify-center">
              </div>
              <div className="text-lg font-medium">AI NEURAL CORE</div>
              <div className="text-sm opacity-75 mt-2">Next-Gen Intelligence</div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-48 md:w-56 lg:w-72 h-4 md:h-5 lg:h-6 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent rounded-full blur-lg"
          animate={{
            scaleX: [1, 1.2, 1],
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>

      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-60"
          style={{
            top: `${15 + Math.random() * 70}%`,
            left: `${10 + Math.random() * 80}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 1, 0.2],
            scale: [0.3, 1, 0.3]
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "easeInOut"
          }}
        />
      ))}

      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 border-blue-400/20 rounded-full"
          style={{
            width: `${300 + i * 40}px`,
            height: `${300 + i * 40}px`,
          }}
          animate={{
            rotateZ: i % 2 === 0 ? [0, 360] : [360, 0],
            scale: [1, 1.03, 1],
            opacity: [0.1, 0.4, 0.1]
          }}
          transition={{
            rotateZ: { duration: 25 + i * 8, repeat: Infinity, ease: "linear" },
            scale: { duration: 5, repeat: Infinity, ease: "easeInOut" },
            opacity: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
        />
      ))}

      <motion.div 
        className="absolute top-0 left-1/2 w-1 h-full bg-gradient-to-b from-transparent via-cyan-300/60 to-transparent transform -translate-x-1/2"
        animate={{
          rotateZ: [0, 360],
          scaleY: [0.5, 1, 0.5]
        }}
        transition={{
          rotateZ: { duration: 12, repeat: Infinity, ease: "linear" },
          scaleY: { duration: 4, repeat: Infinity, ease: "easeInOut" }
        }}
      />

      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 shadow-lg"
          style={{
            top: '50%',
            left: '50%',
            transformOrigin: `${120 + i * 20}px 0px`
          }}
          animate={{
            rotateZ: [0, 360],
            scale: [0.5, 1.2, 0.5],
            opacity: [0.4, 1, 0.4]
          }}
          transition={{
            rotateZ: { duration: 18 + i * 4, repeat: Infinity, ease: "linear" },
            scale: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 },
            opacity: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }
          }}
        />
      ))}
    </motion.div>
  );
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1 + 0.3,
      duration: 0.5,
    },
  }),
};

const FeatureCard = ({
  feature,
  index,
  isExpanded,
  onClick,
}: {
  feature: FeatureType;
  index: number;
  isExpanded: boolean;
  onClick: () => void;
}) => {
  const cardVariants: Variants = {
    collapsed: {
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 25,
      }
    },
    expanded: {
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 25,
      }
    }
  };

  const iconVariants: Variants = {
    collapsed: {
      scale: 1,
      rotate: 0,
      transition: { duration: 0.4 }
    },
    expanded: {
      scale: 1.3,
      rotate: 12,
      transition: { duration: 0.4 }
    }
  };

  return (
    <motion.div
      className="relative rounded-3xl bg-white/96 backdrop-blur-lg border border-gray-200/60 shadow-2xl cursor-pointer group"
      variants={cardVariants}
      initial="collapsed"
      animate={isExpanded ? "expanded" : "collapsed"}
      onClick={onClick}
      whileHover={{ 
        boxShadow: "0 30px 60px -12px rgba(59, 130, 246, 0.2), 0 0 0 1px rgba(59, 130, 246, 0.15)",
        scale: isExpanded ? 1.01 : 1.03,
        transition: { duration: 0.4 }
      }}
      whileTap={{ scale: 0.98 }}
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
        position: "relative",
        zIndex: isExpanded ? 50 : 10,
      }}
    >
      <motion.div 
        className="absolute inset-0 rounded-3xl pointer-events-none"
        style={{
          background: isExpanded 
            ? "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 25%, #06b6d4 50%, #10b981 75%, #f59e0b 100%)" 
            : "linear-gradient(45deg, #3b82f6 0%, #8b5cf6 50%, #06b6d4 100%)",
          backgroundSize: "300% 300%",
          opacity: isExpanded ? 0.12 : 0.04
        }}
        animate={{
          backgroundPosition: isExpanded ? ["0% 50%", "100% 50%", "0% 50%"] : ["0% 0%", "100% 100%", "0% 0%"],
        }}
        transition={{
          duration: isExpanded ? 8 : 12,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-3xl pointer-events-none"
        animate={{
          x: ["-120%", "120%"],
          opacity: isExpanded ? [0, 0.6, 0] : [0, 0.3, 0]
        }}
        transition={{
          duration: isExpanded ? 2 : 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.3
        }}
      />

      <motion.div
        className="absolute inset-0 rounded-3xl border-2 border-transparent pointer-events-none"
        style={{
          background: `linear-gradient(45deg, transparent, ${isExpanded ? 'rgba(59, 130, 246, 0.3)' : 'rgba(59, 130, 246, 0.1)'}, transparent)`,
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'subtract'
        }}
        animate={{
          rotate: [0, 360]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      <div className="relative z-20 p-6 flex flex-col min-h-[200px]">
        <motion.div 
          className="flex items-center gap-4 mb-4"
        >
          <motion.div
            className="flex-shrink-0 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-100 to-blue-50 text-blue-600 relative overflow-hidden shadow-lg"
            variants={iconVariants}
            animate={isExpanded ? "expanded" : "collapsed"}
          >
            <motion.div
              className="absolute inset-0 rounded-2xl bg-blue-200 pointer-events-none"
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0, 0.4, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: index * 0.5,
              }}
            />
            <feature.icon className="h-8 w-8 relative z-10" strokeWidth={1.5} />
          </motion.div>
          
          <motion.h3
            className="text-2xl font-bold text-gray-900 leading-tight"
            whileHover={{
              color: "#3b82f6",
              transition: { duration: 0.2 }
            }}
          >
            {feature.title}
          </motion.h3>
        </motion.div>

        <div className="flex-1 flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {!isExpanded ? (
              <motion.div
                key="hint"
                className="flex items-center justify-center py-4"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                <motion.p 
                  className="text-gray-500 text-base italic"
                  animate={{
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  Click to expand
                </motion.p>
              </motion.div>
            ) : (
              <motion.div
                key="description"
                className="py-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <motion.p
                  className="text-gray-700 leading-relaxed text-lg font-light"
                >
                  {feature.description}
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export const HeroSectionFour: React.FC = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const features = [
    {
      title: "AI Chatbot Development",
      icon: Users,
      description:
        "We create intelligent chatbot systems that understand context, learn from interactions, and provide deeply personalized customer experiences. Our bots integrate seamlessly with your existing platforms and can handle complex conversations with advanced natural language processing.",
    },
    {
      title: "Data Analytics Solutions",
      icon: Target,
      description:
        "Transform raw data into actionable insights with our advanced analytics platform. Get real-time dashboards, predictive modeling, and custom reports that drive smarter business decisions. Our solutions scale with your business and provide deep insights into customer behavior and market trends.",
    },
    {
      title: "Customer Service Automation",
      icon: Cog,
      description:
        "Streamline your customer support with AI-powered automation. Reduce response times, handle multiple queries simultaneously, and maintain 24/7 availability for your customers. Our automation solutions integrate with your existing CRM and support systems for seamless operation.",
    },
  ];

  const handleCardClick = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <motion.section
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
      className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white py-20"
      style={{ y }}
    >
      <motion.div
        className="absolute inset-0 opacity-30 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 2 }}
      >
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </motion.div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 100 - 50, 0],
              scale: [0, 1, 0],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${20 + i * 15}%`,
              top: `${20 + Math.random() * 60}%`,
            }}
            animate={{
              rotate: [0, 360],
              y: [0, -20, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 10 + i,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <div
              className={`w-4 h-4 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded ${
                i % 2 === 0 ? "rotate-45" : ""
              }`}
            />
          </motion.div>
        ))}
      </div>

      <motion.div
        className="relative z-30 container mx-auto px-4 sm:px-6 lg:px-8"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            className="text-center lg:text-left order-2 lg:order-1"
            variants={containerVariants}
          >
            <motion.h1
              className="text-5xl xl:text-6xl font-bold text-gray-900 mb-6 leading-tight"
              variants={itemVariants}
            >
              {["What", "Do", "We", "Do", "?"].map((word, index) => (
                <motion.span
                  key={index}
                  custom={index}
                  variants={wordVariants}
                  className="inline-block mr-2"
                  whileHover={{
                    scale: 1.05,
                    color: "#3b82f6",
                    transition: { duration: 0.2 },
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>

            <motion.p
              className="text-lg text-gray-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed mb-8"
              variants={itemVariants}
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.2 },
              }}
            >
              Equilibrate.AI is here to transform old age tech across industries
              with solutions in Development, Data Analytics and Customer
              Service. We build intelligent chatbot systems tailored to modern
              business needs. Our data-driven insights help companies make
              smarter, faster decisions. From prototypes to scalable systems, we
              empower businesses to grow with AI.
            </motion.p>
          </motion.div>

          <motion.div
            className="flex justify-center order-1 lg:order-2"
            variants={itemVariants}
          >
            <div className="relative w-full h-full sm:w-full sm:h-full mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100/20 via-white/10 to-purple-100/20 rounded-full blur-3xl scale-110" />
              <div className="absolute inset-0 border-4 border-blue-200/30 rounded-full blur-sm" />

              <motion.div 
                className="absolute -top-6 -left-6 sm:-top-8 sm:-left-8 w-12 h-12 sm:w-16 sm:h-16 z-20"
                initial={{ x: -50, y: -50, opacity: 0 }}
                animate={{ x: 0, y: 0, opacity: 1 }}
                transition={{ 
                  duration: 0.6,
                  delay: 0.6
                }}
              >
                <FloatingLogo className="w-full h-full" />
              </motion.div>

              <RobotImage />
              
              <motion.div
                className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-br from-purple-400/30 to-pink-500/30 rounded-full blur-2xl pointer-events-none"
                animate={{ 
                  scale: [1, 1.3, 1],
                  rotate: [0, 180, 360],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ 
                  duration: 12, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              />
            </div>
          </motion.div>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-none"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10px" }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.08,
                delayChildren: 0.2,
              },
            },
          }}
        >
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              feature={feature}
              index={index}
              isExpanded={expandedIndex === index}
              onClick={() => handleCardClick(index)}
            />
          ))}
        </motion.div>
      </motion.div>
    </motion.section>
  );
};