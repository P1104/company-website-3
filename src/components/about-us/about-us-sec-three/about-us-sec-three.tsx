"use client";

import React, { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import {
  Target,
  CheckCircle,
  Lightbulb,
  Shield,
  Leaf,
  Award,
} from "lucide-react";

interface CoreValue {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface ValuesSectionProps {
  coreValues?: CoreValue[];
}

const ValueCard: React.FC<{ value: CoreValue; index: number }> = ({ value, index }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.2 });

  // Generate random squares for grid
  const squares = Array.from({ length: 5 }, () => [
    Math.floor(Math.random() * 4) + 7,
    Math.floor(Math.random() * 6) + 1,
  ]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1], // easeOut as cubic bezier
      }}
      whileHover={{
        y: -8,
        transition: { duration: 0.2 },
      }}
      className="group bg-white rounded-xl border border-gray-200 shadow-lg hover:shadow-md relative overflow-hidden transition-all"
    >
      {/* Grid Pattern Background */}
      <div className="pointer-events-none absolute top-0 left-1/2 -mt-2 -ml-20 h-full w-full [mask-image:linear-gradient(white,transparent)] opacity-60">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/15 to-gray-900/5 [mask-image:radial-gradient(farthest-side_at_top,white,transparent)]">
          <svg className="absolute inset-0 h-full w-full mix-blend-overlay" aria-hidden="true">
            <defs>
              <pattern id={`grid-${index}`} width="20" height="20" patternUnits="userSpaceOnUse" x="-12" y="4">
                <path d="M.5 20V.5H20" fill="none" stroke="currentColor" strokeWidth="1" className="text-gray-600/80" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" strokeWidth={0} fill={`url(#grid-${index})`} />
            <svg x="-12" y="4" className="overflow-visible">
              {squares.map(([x, y], i) => (
                <rect
                  key={i}
                  strokeWidth="0"
                  width="21"
                  height="21"
                  x={x * 20}
                  y={y * 20}
                  fill="currentColor"
                  className="text-blue-600/40"
                />
              ))}
            </svg>
          </svg>
        </div>
      </div>

      <div className="relative z-10 p-8 flex items-start space-x-4">
        <div className="flex-shrink-0 p-2 bg-blue-100 rounded-lg">
          <div className="text-blue-600">{value.icon}</div>
        </div>
        <div className="flex flex-col">
          <h3 className="font-bold text-lg mb-2 text-gray-800">
            {value.title}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            {value.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export const AboutSectionThree: React.FC<ValuesSectionProps> = ({
  coreValues = [
    {
      title: "Quality",
      description:
        "We want our products of the finest quality and we will never launch any product of inferior quality.",
      icon: <Award className="w-6 h-6" />,
    },
    {
      title: "Easy-to-use",
      description:
        "All our products will be plug-n-play and have no training required to use them.",
      icon: <Lightbulb className="w-6 h-6" />,
    },
    {
      title: "Future-proof",
      description:
        "Regular updates to keep the products up to date and embrace new technologies.",
      icon: <Target className="w-6 h-6" />,
    },
    {
      title: "Excellence",
      description:
        "Delivering exceptional quality and measurable results that exceed expectations.",
      icon: <CheckCircle className="w-6 h-6" />,
    },
    {
      title: "Accountability",
      description:
        "Taking ownership of our commitments and delivering on our promises with reliability.",
      icon: <Shield className="w-6 h-6" />,
    },
    {
      title: "Sustainability",
      description:
        "Creating solutions that contribute to a greener, more sustainable future for all.",
      icon: <Leaf className="w-6 h-6" />,
    },
  ],
}) => {
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
        ease: [0.25, 0.1, 0.25, 1], // easeOut as cubic bezier
      },
    },
  };

  return (
    <div className="relative overflow-hidden bg-transparent mb-20">
      <div className="relative z-10 flex items-center justify-center">
        <motion.div
          className="max-w-6xl mx-auto px-6 w-full"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <motion.h2
              className="text-3xl font-bold mb-4 text-center text-gray-800"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Our Core Values
            </motion.h2>

            <motion.p
              className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              At Equilibrate, we believe that true transformation is driven by a
              foundation of strong, unwavering values.
            </motion.p>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
            >
              {coreValues.map((value, index) => (
                <ValueCard key={index} value={value} index={index} />
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};