
/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useRef, useEffect } from "react";
import { motion, useAnimation, useInView, Variants } from "framer-motion";
import { Clock } from "lucide-react";

interface Post {
  id: string;
  title: string;
  summary: string;
  author: string;
  published: string;
  url: string;
  image: string;
}

interface CardSectionProps {
  posts?: Post[];
}

interface PostCardProps {
  post: Post;
  index: number;
}

const Sparkles = ({ minSize = 0.6, maxSize = 1.4, particleDensity = 80, particleColor = "#3b82f6",}) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: particleDensity }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * (maxSize - minSize) + minSize + "px",
            height: Math.random() * (maxSize - minSize) + minSize + "px",
            backgroundColor: particleColor,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

const PostCard: React.FC<PostCardProps> = React.memo(({ post, index }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.2 });

  const itemVariants: Variants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <motion.div
      ref={cardRef}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={itemVariants}
      whileHover={{
        y: -8,
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.98 }}
      className="h-full"
    >
      <div className="h-full bg-white overflow-hidden transition-all duration-300 border-0 hover:shadow-2xl relative group rounded-xl shadow-lg flex flex-col">
        <div className="relative h-56 overflow-hidden flex-shrink-0">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="absolute bottom-4 left-4 z-10"
          >
            <span className="inline-block px-3 py-1 text-sm font-medium text-white shadow-lg bg-blue-600/90 border-0 backdrop-blur-sm rounded-full">
              Article
            </span>
          </motion.div>
        </div>

        <div className="p-6 flex flex-col flex-grow">
          <div className="flex items-center text-sm text-gray-500 mb-3">
            <Clock className="w-4 h-4 mr-2" />
            {post.published} • {post.author}
          </div>
          <motion.div whileHover={{ scale: 1.01, x: 2 }}>
            <h3 className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors mb-3 line-clamp-2">
              <a href={post.url}>{post.title}</a>
            </h3>
          </motion.div>

          <motion.div whileHover={{ scale: 1.005 }} className="flex-grow">
            <p className="text-gray-600 mb-4 line-clamp-3">{post.summary}</p>
          </motion.div>

          {/* <motion.div whileHover={{ x: 4 }}>
            <a
              href={post.url}
              className="inline-flex items-center px-0 text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              Read more
              <motion.div
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <ArrowRight className="w-4 h-4 ml-2" />
              </motion.div>
            </a>
          </motion.div> */}
        </div>
      </div>
    </motion.div>
  );
});

PostCard.displayName = "PostCard";

export const BlogSectionTwo = ({
  posts = [
    {
      id: "post-1",
      title:
        "The Power of Artificial Intelligence: From Concept to Competitive Advantage",
      summary:
        "Artificial Intelligence (AI) is revolutionizing modern business by enabling automation, smarter decision-making, and personalized customer experiences.",
      author: "Prajwal",
      published: "Jun 16, 2025",
      url: "#",
      image:
        "/blog-sec-two/The Power of Artificial Intelligence From Concept to Competitive Advantage.png",
    },
    {
      id: "post-2",
      title:
        "Harnessing Data Analytics: Transforming Information Into Business Intelligence",
      summary:
        "Data analytics transforms raw information into powerful business intelligence, enabling smarter decisions, greater efficiency, and proactive risk management.",
      author: "Prajwal",
      published: "Jun 16, 2025",
      url: "#",
      image:
        "/blog-sec-two/Harnessing Data Analytics Transforming Information Into Business Intelligence.png",
    },
    {
      id: "post-3",
      title:
        "The Rise of Voice Assistants: How Equilibrate Is Shaping the Future of Human-Tech Interaction",
      summary:
        "Equilibrate is redefining human-tech interaction with smart, multilingual voice assistants powered by AI and real-time speech recognition.",
      author: "Prajwal",
      published: "Jun 17, 2025",
      url: "#",
      image:
        "/blog-sec-two/The Rise of Voice Assistants How Equilibrate Is Shaping the Future of Human-Tech Interaction.png",
    },
    {
      id: "post-4",
      title:
        "The Paradox of Progress: How AI is Both Securing and Threatening Data Privacy",
      summary:
        "AI is both a shield and a threat in data security—while it detects anomalies, stops phishing, and automates threat response.",
      author: "Prajwal",
      published: "Jun 17, 2025",
      url: "#",
      image: "/blog-sec-two/role-of-AI-in-data-privacy-and-security.png",
    },
    {
      id: "post-5",
      title: "Emerging Open-Source Models in the Era of AI Innovation",
      summary:
        "Open-source AI is democratizing innovation by making powerful models accessible to developers, researchers, and startups worldwide.",
      author: "Prajwal",
      published: "Jun 18, 2025",
      url: "#",
      image:
        "/blog-sec-two/Emerging Open-Source Models in the Era of AI Innovation.png",
    },
    {
      id: "post-6",
      title:
        "The Evolution of AI Agents: From Simple Scripts to Autonomous Thinkers",
      summary:
        "AI agents have evolved from static rule-based systems to autonomous, tool-using entities that reason, plan, and collaborate.",
      author: "Prajwal",
      published: "Jun 18, 2025",
      url: "#",
      image:
        "/blog-sec-two/The Evolution of AI Agents From Simple Scripts to Autonomous Thinkers.png",
    },
  ],
}: CardSectionProps) => {
  const sectionRef = useRef(null);
  const isSectionInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const controls = useAnimation();

  useEffect(() => {
    if (isSectionInView) {
      controls.start("visible");
    }
  }, [isSectionInView, controls]);

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
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <div className="relative overflow-hidden">
      {/* Sparkles Background */}
      <div className="absolute inset-0 w-full h-full">
        <Sparkles
          minSize={0.6}
          maxSize={1.4}
          particleDensity={80}
          particleColor="#3b82f6"
       
        />
      </div>

      {/* Main Content */}
      <div className="relative z-15">
        <section className="py-20 lg:py-16" ref={sectionRef}>
          <motion.div
            className="container mx-auto flex flex-col items-center gap-12 lg:px-16"
            initial="hidden"
            animate={controls}
            variants={containerVariants}
          >
            {/* Header */}
            <motion.div className="text-center max-w-4xl" variants={itemVariants}>
              <motion.h2
                className="mb-4 text-3xl md:text-4xl font-bold leading-relaxed"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
              >
                {["Featured", "Articles"].map((word, i) => (
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

              <motion.p
                className="text-lg text-gray-600 md:text-xl"
                variants={itemVariants}
              >
                Discover our latest thoughts on technology and design
              </motion.p>
            </motion.div>

            {/* Cards Grid */}
            <motion.div 
              className="w-full max-w-7xl"
              variants={itemVariants}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 sm:px-6">
                {posts.map((post, index) => (
                  <PostCard key={post.id} post={post} index={index} />
                ))}
              </div>
            </motion.div>
          </motion.div>
        </section>
      </div>
    </div>
  );
};