"use client";

import React, { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import {
  Clock,
  Factory,
  Heart,
  Zap,
  Battery,
  Settings,
  BarChart3,
} from "lucide-react";
import Image from "next/image";

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
        className="h-full"
      >
        <div className="h-full bg-white overflow-hidden transition-all duration-300 border-0 hover:shadow-2xl relative group rounded-xl shadow-lg flex flex-col">
          <div className="relative h-56 overflow-hidden flex-shrink-0">
            <Image
            width={100}
            height={100}
              src={useCase.image}
              alt={useCase.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="absolute bottom-4 left-4 z-10"
            >
              <span className="inline-block px-3 py-1 text-sm font-medium text-white shadow-lg bg-indigo-600/90 border-0 backdrop-blur-sm rounded-full">
                {useCase.category}
              </span>
            </motion.div>
          </div>

          <div className="p-6 flex flex-col flex-grow">
            <div className="flex items-center text-sm text-gray-500 mb-3">
              <Clock className="w-4 h-4 mr-2" />
              {useCase.readTime}
            </div>
            <motion.div whileHover={{ scale: 1.01, x: 2 }}>
              <h3 className="text-xl font-semibold text-gray-900 hover:text-indigo-600 transition-colors mb-3 line-clamp-2">
                {useCase.title}
              </h3>
            </motion.div>

            <motion.div whileHover={{ scale: 1.005 }} className="flex-grow">
              <p className="text-gray-600 mb-4 line-clamp-3">
                {useCase.description}
              </p>
            </motion.div>
{/* 
            <motion.div whileHover={{ x: 4 }}>
              <button className="inline-flex items-center px-0 text-indigo-600 hover:text-indigo-800 font-medium transition-colors">
                Read more
                <motion.div
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <ArrowRight className="w-4 h-4 ml-2" />
                </motion.div>
              </button>
            </motion.div> */}
          </div>
        </div>
      </motion.div>
    );
  }
);

UseCaseCard.displayName = "UseCaseCard";

export const UseCasesSectionTwo = () => {
  const heroRef = useRef(null);
  const detailRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true, amount: 0.3 });
  const isDetailInView = useInView(detailRef, { once: true, amount: 0.2 });

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
    <div className="text-gray-900 relative overflow-hidden bg-gradient-to-b from-white via-slate-50/30 to-white min-h-screen">
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl"
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
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-blue-400/15 via-cyan-400/15 to-purple-400/15 rounded-full blur-3xl"
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

      <div className="relative z-10 w-full">
        <section className="px-6 pt-24 pb-12 flex items-center" ref={heroRef}>
          <div className="max-w-7xl mx-auto text-center w-full">
            <motion.div
              className="mb-8"
              initial="hidden"
              animate={isHeroInView ? "visible" : "hidden"}
            >
              <div className="perspective-1000">
                <motion.div
                  variants={textVariants}
                  custom={0}
                  className="overflow-visible"
                >
                  <motion.h1 
                    className="text-5xl md:text-7xl font-bold overflow-visible mb-4"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    {["AI", "Solutions"].map((word, i) => (
                      <motion.span
                        key={i}
                        className="inline-block mr-4 bg-gradient-to-r from-gray-900 via-slate-800 to-gray-900 bg-clip-text text-transparent transition-colors duration-200 ease-out hover:bg-gradient-to-r hover:from-violet-600 hover:via-blue-600 hover:to-cyan-500"
                        initial={{ opacity: 0, rotateY: 90 }}
                        whileInView={{ opacity: 1, rotateY: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: i * 0.1 }}
                        whileHover={{ y: -3, transition: { duration: 0.18 } }}
                      >
                        {word}
                      </motion.span>
                    ))}
                  </motion.h1>
                </motion.div>
              </div>

              <motion.div 
                className="flex items-center justify-center gap-3 mb-8"
                variants={subtitleVariants}
                initial="hidden"
                animate={isHeroInView ? "visible" : "hidden"}
                whileHover="hover"
              >
                <motion.span 
                  className="text-2xl md:text-3xl text-gray-600"
                >
                  Industry-Specific AI Applications
                </motion.span>
              </motion.div>

              <motion.p 
                className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed"
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

        <section className="py-12 px-6 pb-20" ref={detailRef}>
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={
                isDetailInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
              }
              transition={{ duration: 0.6 }}
            >
              <motion.h2
                className="text-3xl md:text-4xl font-bold mb-4 overflow-visible"
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isDetailInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                {["Featured", "Use", "Cases"].map((word, i) => (
                  <motion.span
                    key={i}
                    className="inline-block mr-3 bg-gradient-to-r from-gray-900 via-slate-800 to-gray-900 bg-clip-text text-transparent transition-colors duration-200 ease-out hover:bg-gradient-to-r hover:from-violet-600 hover:via-blue-600 hover:to-cyan-500"
                    initial={{ opacity: 0, rotateY: 90 }}
                    whileInView={{ opacity: 1, rotateY: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    whileHover={{ y: -3, transition: { duration: 0.18 } }}
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.h2>
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