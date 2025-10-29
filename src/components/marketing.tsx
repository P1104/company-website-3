// File: src/components/marketing/marketing.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function Marketing() {
  return (
    <div className="overflow-hidden bg-transparent relative z-10 py-16 px-4">
      <motion.div
        className="max-w-7xl mx-auto text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        {/* Section Header */}
        <motion.h2
          className="mx-auto text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 lg:mb-8 leading-tight overflow-hidden"
          whileHover={{ scale: 1.02 }}
        >
          {"Delivering impactful digital solutions"
            .split(" ")
            .map((word, i) => (
              <motion.span
                key={i}
                className="inline-block mr-2 sm:mr-3 lg:mr-4 bg-gradient-to-r from-gray-900 via-slate-800 to-gray-900 bg-clip-text text-transparent transition-colors duration-200 ease-out hover:bg-gradient-to-r hover:from-violet-600 hover:via-blue-600 hover:to-cyan-500"
                initial={{ opacity: 0, rotateY: 90 }}
                whileInView={{ opacity: 1, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
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

        {/* Main Client Card */}
        <motion.div
          className="relative overflow-hidden rounded-2xl bg-white border border-gray-200 shadow-lg z-20"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          whileHover={{
            y: -2,
            boxShadow: "0 8px 25px -8px rgba(0, 0, 0, 0.12)",
          }}
        >
          {/* Subtle background pattern */}
          <div className="absolute inset-0 opacity-3 pointer-events-none">
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <defs>
                <pattern
                  id="client-grid"
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 20 0 L 0 0 0 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.5"
                    className="text-gray-300"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#client-grid)" />
            </svg>
          </div>

          <div className="relative z-10 p-8 sm:p-10 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
              {/* Client Logo and Branding */}
              <motion.div
                className="text-center lg:text-left"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                {/* Logo Container */}
                <div className="relative inline-flex items-center justify-center mb-6">
                  <motion.div
                    className="relative w-28 h-28 sm:w-32 sm:h-32 lg:w-36 lg:h-36 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center overflow-hidden"
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0 4px 12px -4px rgba(0, 0, 0, 0.1)",
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center text-white font-semibold text-sm shadow-sm">
                      <div className="w-full h-full flex items-center justify-center text-center p-2">
                        <Image
                          className="text-xs font-semibold mb-1"
                          src={"/karnataka.png"}
                          alt={"logo"}
                          width={100}
                          height={100}
                        />
                      </div>
                    </div>
                  </motion.div>

                  {/* Project Badge */}
                  <motion.div
                    className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded-md shadow-sm"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.6 }}
                  >
                    2025
                  </motion.div>
                </div>

                {/* Client Information */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <h3 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-3">
                    Government of Karnataka
                  </h3>
                  <p className="text-base text-slate-600 mb-5 leading-relaxed">
                    Successfully delivered a comprehensive web application for
                    state-wide data collection and survey management, serving
                    citizens across Karnataka.
                  </p>

                  {/* Project details */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {[
                      "Web Application",
                      "Survey Platform",
                      "Data Management",
                      "Trainer Chatbot",
                    ].map((service, i) => (
                      <motion.span
                        key={service}
                        className="px-3 py-1.5 bg-blue-50 text-blue-700 text-sm font-medium rounded-md border border-blue-100"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6 + i * 0.05, duration: 0.2 }}
                      >
                        {service}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>

              {/* Project Impact */}
              <motion.div
                className="grid grid-cols-1 gap-6"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <motion.div
                  className="relative p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.7 }}
                >
                  <div className="text-center">
                    <motion.div
                      className="text-4xl sm:text-5xl font-bold text-blue-600 mb-2"
                      initial={{ scale: 0.8 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.8 }}
                    >
                      150K+
                    </motion.div>
                    <div className="text-lg font-medium text-blue-700 mb-2">
                      Users
                    </div>
                    <div className="text-base font-semibold text-slate-800 mb-2">
                      Successfully Served
                    </div>
                    <div className="text-sm text-slate-600">
                      Citizens across Karnataka state
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="grid grid-cols-2 gap-4"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.9 }}
                >
                  <div className="p-4 bg-green-50 rounded-lg border border-green-100 text-center">
                    <div className="text-2xl font-bold text-green-600 mb-1">
                      95K+
                    </div>
                    <div className="text-sm font-medium text-green-700">
                      Training Bot
                    </div>
                    <div className="text-xs text-green-600 mt-1">
                      Enumerators Trained
                    </div>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-100 text-center">
                    <div className="text-2xl font-bold text-purple-600 mb-1">
                      24/7
                    </div>
                    <div className="text-sm font-medium text-purple-700">
                      WhatsApp Bot
                    </div>
                    <div className="text-xs text-purple-600 mt-1">
                      Query Support
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Project Info Footer */}
          <motion.div
            className="px-8 sm:px-10 lg:px-12 pb-8 sm:pb-10 lg:pb-12 relative z-10"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 1.0 }}
          >
            <div className="pt-6 border-t border-gray-100">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-6 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span>Successfully Delivered</span>
                  </div>
                  <div className="hidden sm:block w-px h-4 bg-gray-300" />
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    <span>Web Application Platform</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}