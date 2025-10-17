"use client";

import React, { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

interface TeamMember {
  name: string;
  role: string;
  description: string;
  image?: string;
}

interface TeamSectionProps {
  teamMembers?: TeamMember[];
}

const TeamMemberCard: React.FC<{ member: TeamMember; index: number }> = ({
  member,
  index,
}) => {
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
          <svg
            className="absolute inset-0 h-full w-full mix-blend-overlay"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id={`grid-${index}`}
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
                x="-12"
                y="4"
              >
                <path
                  d="M.5 20V.5H20"
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
              fill={`url(#grid-${index})`}
            />
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

      <div className="relative z-10 p-8 text-center flex flex-col items-center">
        <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-4 border-white shadow-lg">
          {member.image ? (
            <Image
              width={100}
              height={100}
              src={member.image}
              alt={member.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold text-xl">
              {member.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
          )}
        </div>

        <h3 className="font-bold text-lg mb-1 text-gray-800">{member.name}</h3>
        <Badge variant="secondary" className="mb-3 text-blue-700 bg-blue-100">
          {member.role}
        </Badge>
        <p className="text-gray-600 text-sm leading-relaxed">
          {member.description}
        </p>
      </div>
    </motion.div>
  );
};

export const AboutSectionTwo: React.FC<TeamSectionProps> = ({
  teamMembers = [
    {
      name: "Shrinivas Navali",
      role: "Advisor",
      description:
        "IT Veteran with over 30 years experience in delivering software products and services.",
        image: "/about-us-sec-two/Srinivas-navali-profilepic.jpg",
    },
    {
      name: "Anish Navali",
      role: "Founder",
      description: "Tech enthusiast focused on building GenAI products.",
      image: "/about-us-sec-two/anish-navali-profilepic.jpg",
    },
    {
      name: "Gagandeep H S",
      role: "Founding member",
      description: "AI and Frontend technologies specialist.",
      image: "/about-us-sec-two/gagandeep-profilepic.jpg",
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
    <div className="relative overflow-hidden bg-transparent mb-10 mt-6">
      <div className="relative z-10 flex items-center justify-center">
        <motion.div
          className="max-w-6xl mx-auto px-6 w-full"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div className="mb-16" variants={itemVariants}>
            <motion.h2
              className="text-3xl font-bold mb-8 text-center text-gray-800"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              THE TEAM
            </motion.h2>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
            >
              {teamMembers.map((member, index) => (
                <TeamMemberCard key={index} member={member} index={index} />
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};