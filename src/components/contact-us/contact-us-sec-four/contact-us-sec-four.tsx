/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from 'react';
import { motion, Variants } from "framer-motion";
import { Mail, Github, Linkedin, Phone } from "lucide-react";

// Sparkles component fallback with proper typing
const Sparkles = ({ className, ...props }: { className?: string; [key: string]: any }) => (
  <div className={className} {...props} />
);

export const ContactSecFour = () => {
  const handleClick = (e: React.MouseEvent, href: string) => {
    if (href.startsWith('mailto:') || href.startsWith('tel:')) {
      e.preventDefault();
      window.location.href = href;
    }
  };

  interface LinkBoxProps {
    Icon: React.ComponentType<{ className?: string }>;
    href: string;
    label: string;
  }

  const LinkBox = ({ Icon, href, label }: LinkBoxProps) => (
    <a
      href={href}
      aria-label={label}
      target={href.startsWith('mailto:') || href.startsWith('tel:') ? '_self' : '_blank'}
      rel="noopener noreferrer"
      onClick={(e) => handleClick(e, href)}
      className="relative grid h-20 w-full place-content-center sm:h-28 md:h-36 bg-gray-100 hover:bg-blue-500 transition-colors duration-300 group"
    >
      <Icon className="text-xl sm:text-3xl md:text-4xl text-gray-900 group-hover:text-white" />
    </a>
  );

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

  return (
    <section className="pb-28 relative z-10 pt-4">
      <Sparkles
        background="transparent"
        minSize={0.6}
        maxSize={1.4}
        particleDensity={80}
        particleColor="#3b82f6"
        speed={0.8}
        className="opacity-80"
      />
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.h3
            className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold mb-4 xs:mb-6 sm:mb-8 md:mb-10 drop-shadow overflow-hidden px-2 sm:px-0 leading-tight"
          >
            {"Connect with us".split(" ").map((word, i) => (
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
          </motion.h3>

          <motion.p
            className="text-sm xs:text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-2 sm:px-4 md:px-0 font-light"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            whileHover={{ scale: 1.01 }}
          >
            Follow us on social media for updates and insights
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="divide-y border divide-gray-200 border-gray-200"
        >
          <div className="grid grid-cols-2 divide-x divide-gray-200">
            <LinkBox Icon={Mail} href="mailto:anish.navali@equilibrateai.com" label="Email us" />
            <LinkBox Icon={Github} href="https://github.com/Equilibrate-AI" label="Visit GitHub" />
          </div>
          <div className="grid grid-cols-2 divide-x divide-gray-200">
            <LinkBox Icon={Linkedin} href="https://www.linkedin.com/company/equilibrate-ai" label="Visit LinkedIn" />
            <LinkBox Icon={Phone} href="tel:+919606024155" label="Call us" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};