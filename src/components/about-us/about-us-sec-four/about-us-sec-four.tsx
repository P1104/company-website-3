"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import Image from "next/image";

export function AboutSectionFour() {
  return (
    <section className="py-16 bg-transparent">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Our Impact Story
          </motion.h2>
          <motion.p
            className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Transforming state-wide data collection through innovative
            technology solutions that serve millions of citizens across
            Karnataka.
          </motion.p>
        </motion.div>

        {/* Main Project Card */}
        <motion.div
          className="relative overflow-hidden rounded-2xl bg-white border border-gray-200/80 shadow-lg backdrop-blur-lg mb-12"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-3">
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <defs>
                <pattern
                  id="about-grid"
                  width="15"
                  height="15"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 15 0 L 0 0 0 15"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.4"
                    className="text-gray-400"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#about-grid)" />
            </svg>
          </div>

          <div className="relative z-10 p-8 sm:p-10 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Client Logo and Branding */}
              <motion.div
                className="text-center lg:text-left"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                {/* Logo Container */}
                <div className="relative inline-flex items-center justify-center mb-8">
                  <motion.div
                    className="relative w-32 h-32 sm:w-36 sm:h-36 lg:w-40 lg:h-40 rounded-xl bg-gray-50 shadow-md border border-gray-200/80 flex items-center justify-center overflow-hidden"
                    transition={{ duration: 0.3 }}
                  >
                    <div className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-inner">
                      <Image
                        width={100}
                        height={100}
                        src="/karnataka.png"
                        alt="Karnataka Government Logo"
                        className="w-full h-full object-contain p-2"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                          const fallback = e.currentTarget
                            .nextElementSibling as HTMLElement;
                          if (fallback) fallback.style.display = "flex";
                        }}
                      />
                      <div
                        className="w-full h-full hidden items-center justify-center text-center p-2"
                        style={{ display: "none" }}
                      >
                        <div>
                          <div className="text-xs font-semibold mb-1">
                            KARNATAKA
                          </div>
                          <div className="text-xs">GOVERNMENT</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Client Information */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                    Socio-Economic Survey 2025
                  </h3>
                  <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                    We developed a comprehensive web application for
                    Karnataka`&apos;`s state-wide socio-economic survey,
                    creating an integrated ecosystem of digital tools that
                    revolutionized data collection and enumerator training
                    processes.
                  </p>

                  {/* Partnership details */}
                  <div className="flex flex-wrap gap-3 mb-6">
                    {[
                      "Web Application",
                      "AI Training Bot",
                      "WhatsApp Integration",
                      "Data Analytics",
                    ].map((service, i) => (
                      <motion.span
                        key={service}
                        className="px-3 py-2 bg-blue-50 text-blue-700 text-sm font-medium rounded-lg border border-blue-200"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.7 + i * 0.1, duration: 0.3 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        {service}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>

              {/* Project Image and Impact Statistics */}
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                {/* Project Image */}
                <motion.div
                  className="relative rounded-xl overflow-hidden shadow-lg border border-gray-200"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    width={100}
                    height={100}
                    src="/anish_explain.jpg"
                    alt="Project presentation and team collaboration"
                    className="w-full h-64 sm:h-72 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                  <motion.div
                    className="absolute bottom-4 left-4 right-4"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 1.0 }}
                  >
                    <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-sm">
                      <p className="text-sm font-medium text-gray-900">
                        Project Presentation
                      </p>
                      <p className="text-xs text-gray-600">
                        Team collaboration and solution demonstration
                      </p>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Impact Statistics - Compact Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    {
                      number: "1.5+",
                      unit: "Lakh",
                      label: "Users Served",
                      color: "from-blue-600 to-blue-700",
                    },
                    {
                      number: "95K+",
                      unit: "Trained",
                      label: "Enumerators",
                      color: "from-green-600 to-emerald-600",
                    },
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      className="relative p-4 bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg border border-gray-200/60 shadow-sm hover:shadow-md transition-all duration-300"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                      whileHover={{ y: -2, scale: 1.02 }}
                    >
                      <div
                        className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.color} rounded-t-lg`}
                      />

                      <div className="text-center">
                        <motion.div
                          className={`text-2xl sm:text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-1`}
                          initial={{ scale: 0.7 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.6,
                            delay: 0.9 + index * 0.1,
                          }}
                        >
                          {stat.number}
                        </motion.div>
                        <div className="text-sm font-semibold text-gray-700 mb-1">
                          {stat.unit}
                        </div>
                        <div className="text-sm font-medium text-gray-900">
                          {stat.label}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Solutions Delivered */}
            <motion.div
              className="mt-12 pt-8 border-t border-gray-200/80"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    title: "Survey Web Application",
                    description:
                      "Comprehensive platform for data collection and management across all districts of Karnataka.",
                    features: [
                      "Real-time data sync",
                      "Offline capabilities",
                      "Multi-language support",
                    ],
                  },
                  {
                    title: "AI Training Bot",
                    description:
                      "Intelligent chatbot system that trained 95,000+ enumerators with interactive learning modules.",
                    features: [
                      "Automated training",
                      "Progress tracking",
                      "Certification system",
                    ],
                  },
                  {
                    title: "WhatsApp Integration",
                    description:
                      "24/7 query resolution system for survey status and support through WhatsApp bot.",
                    features: [
                      "Instant responses",
                      "Status tracking",
                      "Multi-lingual support",
                    ],
                  },
                ].map((solution, index) => (
                  <motion.div
                    key={solution.title}
                    className="p-5 rounded-xl bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-100"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 1.1 + index * 0.1 }}
                    whileHover={{ y: -2 }}
                  >
                    <h4 className="text-lg font-bold text-gray-900 mb-3">
                      {solution.title}
                    </h4>
                    <p className="text-gray-700 mb-4 leading-relaxed text-sm">
                      {solution.description}
                    </p>
                    <ul className="space-y-2">
                      {solution.features.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="flex items-center gap-2 text-sm text-gray-600"
                        >
                          <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
