"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import createGlobe, { COBEOptions } from "cobe";
import { Sparkles } from "@/components/ui/sparkles";

const GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 0,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 1.2,
  baseColor: [0.9, 0.9, 0.9],
  markerColor: [59 / 255, 130 / 255, 246 / 255],
  glowColor: [0.9, 0.9, 0.9],
  markers: [
    { location: [14.5995, 120.9842], size: 0.03 },
    { location: [19.076, 72.8777], size: 0.1 },
    { location: [23.8103, 90.4125], size: 0.05 },
    { location: [30.0444, 31.2357], size: 0.07 },
    { location: [39.9042, 116.4074], size: 0.08 },
    { location: [-23.5505, -46.6333], size: 0.1 },
    { location: [19.4326, -99.1332], size: 0.1 },
    { location: [40.7128, -74.006], size: 0.1 },
    { location: [34.6937, 135.5022], size: 0.05 },
    { location: [41.0082, 28.9784], size: 0.06 },
  ],
};

function Globe({
  className = "",
  config = GLOBE_CONFIG,
}: {
  className?: string;
  config?: COBEOptions;
}) {
  const phi = useRef(0);
  const widthRef = useRef(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const [r, setR] = useState(0);

  const updatePointerInteraction = (value: number | null) => {
    pointerInteracting.current = value;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value ? "grabbing" : "grab";
    }
  };

  const updateMovement = (clientX: number) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current;
      pointerInteractionMovement.current = delta;
      setR(delta / 200);
    }
  };

  const onRender = useCallback(
    (state: Record<string, unknown>) => {
      if (!pointerInteracting.current) phi.current += 0.005;
      state.phi = phi.current + r;
      state.width = widthRef.current * 2;
      state.height = widthRef.current * 2;
    },
    [r]
  );

  const onResize = useCallback(() => {
    if (canvasRef.current) {
      widthRef.current = canvasRef.current.offsetWidth;
    }
  }, []);

  useEffect(() => {
    window.addEventListener("resize", onResize);
    onResize();

    const globe = createGlobe(canvasRef.current!, {
      ...config,
      width: widthRef.current * 2,
      height: widthRef.current * 2,
      onRender,
    });

    setTimeout(() => {
      if (canvasRef.current) {
        canvasRef.current.style.opacity = "1";
      }
    });
    return () => {
      window.removeEventListener("resize", onResize);
      globe.destroy();
    };
  }, [config, onRender, onResize]);

  return (
    <div
      className={`absolute inset-0 mx-auto aspect-[1/1] w-full max-w-[400px] ${className}`}
    >
      <canvas
        className="size-full opacity-0 transition-opacity duration-500 [contain:layout_paint_size]"
        ref={canvasRef}
        onPointerDown={(e) =>
          updatePointerInteraction(
            e.clientX - pointerInteractionMovement.current
          )
        }
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) =>
          e.touches[0] && updateMovement(e.touches[0].clientX)
        }
      />
    </div>
  );
}

export const ContactSecThree = () => {
  const contactMethods = [
    {
      icon: Mail,
      title: "Email Us",
      description: "Get in touch via email",
      value: "anish.navali@equilibrateai.com",
      link: "mailto:anish.navali@equilibrateai.com",
      features: ["24/7 Response", "Detailed Discussions"],
    },
    {
      icon: Phone,
      title: "Call Us",
      description: "Speak directly with our team",
      value: "+91-9606024155",
      link: "tel:+91-9606024155",
      features: ["Instant Connection", "Real-time Solutions"],
    },
    {
      icon: MapPin,
      title: "Visit Us",
      description: "Our headquarters",
      value: "Bangalore, Karnataka, India",
      link: "#location",
      features: ["In-Person Meetings", "Office Tours"],
    },
  ];

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.23, 0.86, 0.39, 0.96],
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3 + i * 0.1,
        duration: 0.6,
        ease: [0.23, 0.86, 0.39, 0.96],
      },
    }),
    hover: {
      y: -5,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <section className="relative pb-12 px-4  overflow-hidden pt-4">
      <Sparkles
        background="transparent"
        minSize={0.6}
        maxSize={1.4}
        particleDensity={80}
        particleColor="#3b82f6"
        speed={0.8}
        className="opacity-80"
      />
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="space-y-8"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} initial="hidden" animate="visible">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Other ways to reach us
            </h3>
            <p className="text-gray-600 text-lg">
              Choose the method that works best for you.
            </p>
          </motion.div>

          <div className="space-y-6">
            {contactMethods.map((method, index) => (
              <motion.a
                key={index}
                href={method.link}
                className="block p-6 bg-gray-50/90 backdrop-blur-xl rounded-2xl border border-gray-200 hover:bg-gray-100 transition-all group relative overflow-hidden"
                custom={index}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
              >
                <div className="flex items-center gap-4 relative z-10">
                  <motion.div className="w-14 h-14 rounded-xl bg-blue-100 border border-blue-200 flex items-center justify-center">
                    <method.icon className="w-7 h-7 text-blue-500" />
                  </motion.div>
                  <div className="flex-1">
                    <h4 className="text-xl font-semibold text-gray-900 mb-1">
                      {method.title}
                    </h4>
                    <p className="text-gray-600 text-sm mb-2">
                      {method.description}
                    </p>
                    <p className="text-gray-900 font-medium">{method.value}</p>
                    <div className="mt-2 flex gap-2">
                      {method.features.map((feature, i) => (
                        <span
                          key={i}
                          className="text-xs bg-gray-200 px-2 py-1 rounded-full text-gray-600"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                  <motion.div
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={{ x: -10 }}
                    animate={{ x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <ArrowRight className="w-5 h-5 text-gray-900" />
                  </motion.div>
                </div>
              </motion.a>
            ))}
          </div>

          <motion.div
            className="relative h-64 bg-gray-50/90 backdrop-blur-xl rounded-2xl border border-gray-200 overflow-hidden"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <Globe className="top-0" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
