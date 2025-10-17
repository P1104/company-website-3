// ParticlesComponent.tsx
import React, { useState, useEffect, useId } from "react";
import { motion } from "framer-motion";

// Lightweight particle system that doesn't block rendering
const ParticlesComponent = React.memo(() => {
  const [shouldRender, setShouldRender] = useState(false);
  const generatedId = useId();

  useEffect(() => {
    // Only start particles after a significant delay
    const timer = setTimeout(() => {
      setShouldRender(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!shouldRender) return null;

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none">
      {/* CSS-only particles for better performance */}
      <div className="absolute inset-0 opacity-20">
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={`${generatedId}-${i}`}
            className="absolute w-1 h-1 bg-blue-400 rounded-full"
            style={{
              left: `${20 + Math.random() * 60}%`,
              top: `${20 + Math.random() * 60}%`,
            }}
            animate={{
              y: [0, -10, 0],
              opacity: [0.2, 0.4, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      
      {/* Optional: Load heavy particles library only if needed */}
      <LazyTsParticles />
    </div>
  );
});

// Ultra-lazy loading of the actual particles library
const LazyTsParticles = React.memo(() => {
  const [showRealParticles, setShowRealParticles] = useState(false);

  useEffect(() => {
    // Only load if user stays on page for 5+ seconds
    const timer = setTimeout(() => {
      setShowRealParticles(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!showRealParticles) return;

    let mounted = true;

    const loadParticles = async () => {
      try {
        // Fixed: Removed unused 'Particles' import to avoid eslint error
        const [, { initParticlesEngine }, { loadSlim }] = await Promise.all([
          import("@tsparticles/react"),
          import("@tsparticles/react"),
          import("@tsparticles/slim")
        ]);

        if (!mounted) return;

        await initParticlesEngine(async (engine) => {
          await loadSlim(engine);
        });

        // Render particles here if still mounted
        console.log("Advanced particles loaded");
      } catch (error) {
        console.warn("Failed to load advanced particles:", error);
      }
    };

    loadParticles();

    return () => {
      mounted = false;
    };
  }, [showRealParticles]);

  return null; // For now, just use CSS particles
});

LazyTsParticles.displayName = "LazyTsParticles";
ParticlesComponent.displayName = "ParticlesComponent";

export default ParticlesComponent;