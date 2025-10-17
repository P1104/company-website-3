"use client";

import React from 'react';
import { motion } from "framer-motion";
import { Mail, Github, Linkedin } from "lucide-react";
import { Sparkles } from '@/components/ui/sparkles';


export const ContactSecFour = () => {
  const handleClick = (e: React.MouseEvent, href: string) => {
    if (href.startsWith('mailto:')) {
      e.preventDefault();
      window.location.href = href;
    }
  };

  const LinkBox = ({ 
    Icon, 
    href 
  }: { 
    Icon: React.ComponentType<{ className?: string }>;
    href: string;
  }) => (
    <a
      href={href}
      title=''
      target={href.startsWith('mailto:') ? '_self' : '_blank'}
      rel="noopener noreferrer"
      onClick={(e) => handleClick(e, href)}
      className="relative grid h-20 w-full place-content-center sm:h-28 md:h-36 bg-gray-100 hover:bg-blue-500 transition-colors duration-300 group"
    >
      <Icon className="text-xl sm:text-3xl md:text-4xl text-gray-900 group-hover:text-white" />
    </a>
  );

  return (

        <section className="pb-28 relative z-10 pt-4 ">
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
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Connect with us
          </h3>
          <p className="text-gray-600">
            Follow us on social media for updates and insights
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="divide-y border divide-gray-200 border-gray-200"
        >
          <div className="grid grid-cols-2 divide-x divide-gray-200">
            <LinkBox Icon={Mail} href="mailto:anish.navali@equilibrateai.com" />
            <LinkBox Icon={Github} href="https://github.com" />
          </div>
          <div className="grid grid-cols-1 divide-x divide-gray-200">
            <LinkBox Icon={Linkedin} href="https://www.linkedin.com/company/equilibrate-ai" />
          </div>
        </motion.div>
      </div>
    </section>

  
  );
};