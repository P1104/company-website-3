"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ArrowRight, Clock } from "lucide-react";
import { Sparkles } from "@/components/ui/sparkles";

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

const PostCard: React.FC<PostCardProps> = React.memo(({ post, index }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{
        duration: 0.5,
        delay: index * 0.05, // Reduced delay for faster sequential loading
        ease: "easeOut",
      }}
      whileHover={{
        y: -8,
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.98 }}
    >
      <Card className="h-full bg-white overflow-hidden transition-all duration-300 border border-gray-200 hover:border-blue-300 hover:shadow-lg relative group">
        <div className="relative h-48 overflow-hidden rounded-t-lg bg-gray-100">
          <Image
            src={post.image}
            alt={post.title}
            fill // Use fill instead of width/height for better responsive behavior
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 hover:scale-105"
            priority={index < 3} // Prioritize first 3 images
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bccbqbDUK3Y4q9y1B1X5sK7/2Q=="
            onLoad={() => {
              // Optional: Add loading complete handler
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-transparent to-transparent" />
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="absolute bottom-4 left-4"
          >
            <Badge className="text-gray-800 shadow-sm bg-white/90">
              Article
            </Badge>
          </motion.div>
        </div>

        <CardHeader className="pb-3">
          <div className="flex items-center text-sm text-gray-500 mb-2">
            <Clock className="w-4 h-4 mr-2" />
            {post.published} • {post.author}
          </div>
          <motion.div whileHover={{ scale: 1.02, x: 4 }}>
            <h3 className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors line-clamp-2">
              <a href={post.url}>
                {post.title}
              </a>
            </h3>
          </motion.div>
        </CardHeader>

        <CardContent>
          <motion.div whileHover={{ scale: 1.01 }}>
            <p className="text-gray-600 mb-4 line-clamp-3">
              {post.summary}
            </p>
          </motion.div>

          <motion.div whileHover={{ x: 6 }}>
            <Button
              variant="link"
              className="px-0 text-blue-600 hover:text-blue-800 group"
            >
              <a href={post.url} className="flex items-center">
                Read more
                <motion.div
                  whileHover={{ rotate: -45, x: 6 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </motion.div>
              </a>
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
});

PostCard.displayName = "PostCard";

export const BlogSectionTwo = ({
  posts = [
    {
      id: "post-1",
      title: "The Power of Artificial Intelligence: From Concept to Competitive Advantage",
      summary: "Artificial Intelligence (AI) is revolutionizing modern business by enabling automation, smarter decision-making, and personalized customer experiences.",
      author: "Prajwal",
      published: "Jun 16, 2025",
      url: "#",
      image: "/blog-sec-two/The Power of Artificial Intelligence From Concept to Competitive Advantage.png"
    },
    {
      id: "post-2",
      title: "Harnessing Data Analytics: Transforming Information Into Business Intelligence",
      summary: "Data analytics transforms raw information into powerful business intelligence, enabling smarter decisions, greater efficiency, and proactive risk management.",
      author: "Prajwal",
      published: "Jun 16, 2025",
      url: "#",
      image: "/blog-sec-two/Harnessing Data Analytics Transforming Information Into Business Intelligence.png",
    },
    {
      id: "post-3",
      title: "The Rise of Voice Assistants: How Equilibrate Is Shaping the Future of Human-Tech Interaction",
      summary: "Equilibrate is redefining human-tech interaction with smart, multilingual voice assistants powered by AI and real-time speech recognition.",
      author: "Prajwal",
      published: "Jun 17, 2025",
      url: "#",
      image: "/blog-sec-two/The Rise of Voice Assistants How Equilibrate Is Shaping the Future of Human-Tech Interaction.png",
    },
    {
      id: "post-4",
      title: "The Paradox of Progress: How AI is Both Securing and Threatening Data Privacy",
      summary: "AI is both a shield and a threat in data security—while it detects anomalies, stops phishing, and automates threat response.",
      author: "Prajwal",
      published: "Jun 17, 2025",
      url: "#",
      image: "/blog-sec-two/role-of-AI-in-data-privacy-and-security.png",
    },
    {
      id: "post-5",
      title: "Emerging Open-Source Models in the Era of AI Innovation",
      summary: "Open-source AI is democratizing innovation by making powerful models accessible to developers, researchers, and startups worldwide.",
      author: "Prajwal",
      published: "Jun 18, 2025",
      url: "#",
      image: "/blog-sec-two/Emerging Open-Source Models in the Era of AI Innovation.png",
    },
    {
      id: "post-6",
      title: "The Evolution of AI Agents: From Simple Scripts to Autonomous Thinkers",
      summary: "AI agents have evolved from static rule-based systems to autonomous, tool-using entities that reason, plan, and collaborate.",
      author: "Prajwal",
      published: "Jun 18, 2025",
      url: "#",
      image: "/blog-sec-two/The Evolution of AI Agents From Simple Scripts to Autonomous Thinkers.png",
    },
  ],
}: CardSectionProps) => {
  const sectionRef = useRef(null);
  const isSectionInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <div className="text-gray-900 relative overflow-hidden">
      {/* Sparkles Background */}
      <div className="absolute inset-0 w-full h-full">
        <Sparkles
          background="transparent"
          minSize={0.5}
          maxSize={1}
          particleDensity={25}
          particleColor="#3b82f6"
          speed={0.3}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        <section className="py-16 px-6" ref={sectionRef}>
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={
                isSectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
              }
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Featured Articles
              </h2>
              <p className="text-xl text-gray-600">
                Discover our latest thoughts on technology and design
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, index) => (
                <PostCard
                  key={post.id}
                  post={post}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Floating Elements */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 left-10 w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full opacity-60 blur-xl"
      />

      <motion.div
        animate={{
          y: [0, 20, 0],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute bottom-1/4 right-10 w-32 h-32 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full opacity-60 blur-xl"
      />
    </div>
  );
};