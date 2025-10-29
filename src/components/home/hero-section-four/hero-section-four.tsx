"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  Variants,
  AnimatePresence,
} from "framer-motion";
import {  Target, Users, Cog, ChevronDown } from "lucide-react";

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

type FeatureType = {
  title: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  description: string;
};

const FeatureCard = ({
  feature,
  
  isExpanded,
  onClick,
}: {
  feature: FeatureType;
  index: number;
  isExpanded: boolean;
  onClick: () => void;
}) => {
  const arrowVariants: Variants = {
    collapsed: { rotate: 0 },
    expanded: { rotate: 180 }
  };

  return (
    <motion.div
      className="relative rounded-2xl bg-white/95 backdrop-blur-lg border border-gray-200/80 shadow-lg hover:shadow-xl cursor-pointer group transition-all duration-300"
      onClick={onClick}
      whileHover={{
        y: -2,
        boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(59, 130, 246, 0.1)",
        transition: { duration: 0.2 }
      }}
    >
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 pointer-events-none"
        style={{
          background: "linear-gradient(135deg, rgba(59, 130, 246, 0.02) 0%, rgba(139, 92, 246, 0.02) 50%, rgba(6, 182, 212, 0.02) 100%)"
        }}
        transition={{ duration: 0.3 }}
      />

      <motion.div
        className="absolute inset-0 rounded-2xl border border-transparent pointer-events-none"
        style={{
          background: `linear-gradient(135deg, transparent, ${isExpanded ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.05)'}, transparent)`,
        }}
        animate={{
          opacity: [0.5, 1, 0.5]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="relative z-10 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <motion.div
              className="flex-shrink-0 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600 border border-blue-200/50 shadow-sm"
              whileHover={{
                scale: 1.05,
                rotate: 5,
                transition: { duration: 0.2 }
              }}
            >
              <feature.icon className="h-6 w-6" strokeWidth={1.5} />
            </motion.div>

            <motion.h3
              className="text-lg sm:text-xl font-semibold text-gray-900 leading-tight"
              whileHover={{
                color: "#3b82f6",
                transition: { duration: 0.2 }
              }}
            >
              {feature.title}
            </motion.h3>
          </div>

          <motion.button
            className="flex-shrink-0 ml-4 flex items-center justify-center w-8 h-8 rounded-full bg-gray-50 border border-gray-200 group-hover:bg-blue-50 group-hover:border-blue-200 transition-all duration-300"
            variants={arrowVariants}
            animate={isExpanded ? "expanded" : "collapsed"}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronDown className="w-4 h-4 text-gray-500 group-hover:text-blue-600 transition-colors duration-300" />
          </motion.button>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              className="mt-4 space-y-4 overflow-hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              />

              <motion.p
                className="text-gray-700 leading-relaxed text-sm"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                {feature.description}
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

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
      className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-center"
      variants={titleVariants}
      initial="hidden"
      animate="visible"
    >
      {["What", "We", "Deliver"].map((word, index) => (
        <motion.span
          key={index}
          className="inline-block mr-3 bg-gradient-to-r from-gray-900 via-slate-800 to-gray-900 bg-clip-text text-transparent transition-colors duration-200 ease-out hover:bg-gradient-to-r hover:from-violet-600 hover:via-blue-600 hover:to-cyan-500"
          initial={{ opacity: 0, rotateY: 90 }}
          whileInView={{ opacity: 1, rotateY: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.08 }}
          whileHover={{ y: -3, transition: { duration: 0.18 } }}
        >
          {word}
        </motion.span>
      ))}
    </motion.h1>
  ) : (
    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-center">
      {["What", "We", "Deliver"].map((word, index) => (
        <span
          key={index}
          className="inline-block mr-3 bg-gradient-to-r from-gray-900 via-slate-800 to-gray-900 bg-clip-text text-transparent"
        >
          {word}
        </span>
      ))}
    </h1>
  );
}

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
        "We create intelligent chatbot systems that understand context, learn from interactions, and provide deeply personalized customer experiences. Our bots integrate seamlessly with your existing platforms and can handle complex conversations with advanced natural language processing capabilities.",
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
      className="relative overflow-x-hidden"
      style={{ y }}
    >
      <motion.div
        className="relative z-10 container mx-auto px-4 sm:px-6 pt-20 pb-10 overflow-x-hidden"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
          <motion.div
            className="text-left order-2 lg:order-1"
            variants={containerVariants}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <AnimatedTitle />

            <motion.p
              className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed font-light max-w-2xl"
              variants={itemVariants}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Equilibrate.AI transforms businesses with cutting-edge solutions in{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-medium">
                AI Development, Data Analytics, and Customer Service Automation
              </span>
              . We build intelligent systems tailored to your business needs.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              {["Enterprise Ready", "24/7 Support", "Scalable Solutions","User friendly"].map((tag, i) => (
                <motion.span
                  key={tag}
                  className="px-4 py-2 bg-blue-50 text-blue-700 text-sm font-medium rounded-full border border-blue-200"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 + i * 0.1, duration: 0.3 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {tag}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="flex justify-center lg:justify-end order-1 lg:order-2 overflow-hidden"
            variants={itemVariants}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <RobotImage />
          </motion.div>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10px" }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
              },
            },
          }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <FeatureCard
                feature={feature}
                index={index}
                isExpanded={expandedIndex === index}
                onClick={() => handleCardClick(index)}
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.section>
  );
};