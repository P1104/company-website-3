// StartModal.tsx - FIXED with consistent theme
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function StartModal({ onStart, onNavigateHome, gameLoaded, isMobile }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
      animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
      transition={{ duration: 0.3 }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(to bottom right, rgba(248, 250, 252, 0.95), rgba(191, 219, 254, 0.95))",
        backdropFilter: "blur(8px)",
        padding: "14px",
        overflow: "hidden",
      }}
    >
      {/* Gradient Background - Same as HeroSectionThemeWrapper */}
      <div style={{ position: "absolute", inset: 0 }}>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.08) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
            opacity: 0.3,
          }}
        />
      </div>

      {/* Iridescence-like Background Effect */}
      <div style={{ position: "absolute", inset: 0, opacity: 0.08, zIndex: 0 }}>
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom right, rgba(96, 165, 250, 0.3), rgba(168, 85, 247, 0.2), rgba(244, 114, 182, 0.3))"
        }} />
      </div>

      {/* Animated Orbs */}
      {isClient && (
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", zIndex: 0 }}>
          <motion.div
            style={{
              position: "absolute",
              top: "25%",
              left: "15%",
              width: "300px",
              height: "300px",
              background: "linear-gradient(to bottom right, rgba(96, 165, 250, 0.15), rgba(147, 51, 234, 0.15))",
              borderRadius: "50%",
              filter: "blur(60px)",
            }}
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 90, 180],
              x: [0, 30, 0],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            style={{
              position: "absolute",
              bottom: "25%",
              right: "15%",
              width: "280px",
              height: "280px",
              background: "linear-gradient(to bottom right, rgba(168, 85, 247, 0.15), rgba(244, 114, 182, 0.15))",
              borderRadius: "50%",
              filter: "blur(60px)",
            }}
            animate={{
              scale: [1.1, 1, 1.1],
              rotate: [180, 90, 0],
              x: [0, -25, 0],
              y: [0, 25, 0],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      )}

      {/* Floating Particles */}
      {isClient && (
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            overflow: "hidden",
            pointerEvents: "none",
            opacity: 0.3,
            zIndex: 0,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 2 }}
        >
          {Array.from({ length: 25 }).map((_, i) => (
            <motion.div
              key={i}
              style={{
                position: "absolute",
                width: isMobile ? "4px" : "6px",
                height: isMobile ? "4px" : "6px",
                borderRadius: "50%",
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                backgroundColor: i % 3 === 0 ? '#3b82f6' : i % 3 === 1 ? '#8b5cf6' : '#ec4899',
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.8, 0.2],
                scale: [0.8, 1.2, 0.8]
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>
      )}

      {/* Modal Card */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        style={{
          width: "min(800px, 95vw)",
          background: "linear-gradient(135deg, rgba(226, 232, 240, 0.7), rgba(241, 245, 249, 0.7))",
          borderRadius: "24px",
          boxShadow: "0 25px 80px rgba(59, 130, 246, 0.25), 0 0 60px rgba(139, 92, 246, 0.15)",
          border: "2px solid rgba(226, 232, 240, 0.5)",
          padding: "2px",
          position: "relative",
          overflow: "hidden",
          zIndex: 10,
        }}
      >
        <div
          style={{
            background: "linear-gradient(135deg, rgba(248, 250, 252, 0.95) 0%, rgba(241, 245, 249, 0.95) 100%)",
            borderRadius: "22px",
            padding: "40px 35px",
            textAlign: "center",
            position: "relative",
            zIndex: 1,
          }}
        >
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{
              background: "linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontSize: isMobile ? "1.8rem" : "2.2rem",
              fontWeight: "900",
              marginBottom: "12px",
              letterSpacing: "2px",
              lineHeight: 1.1,
            }}
          >
            🎮 WELCOME TO
          </motion.div>

          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: 0.1 }}
            style={{
              background: "linear-gradient(90deg, #60a5fa, #a78bfa, #f472b6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontSize: isMobile ? "1.6rem" : "2rem",
              fontWeight: "900",
              marginBottom: "18px",
              letterSpacing: "3px",
            }}
          >
            EQUILIBRATE.AI
          </motion.div>

          <p
            style={{
              background: "linear-gradient(90deg, #3b82f6, #7c3aed)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontSize: "0.95rem",
              marginBottom: "40px",
              letterSpacing: "4px",
              textTransform: "uppercase",
              fontWeight: "700",
            }}
          >
            Ready To Play
          </p>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onStart}
              disabled={!gameLoaded}
              style={{
                width: "100%",
                padding: "20px",
                borderRadius: "16px",
                fontWeight: "900",
                fontSize: isMobile ? "1.1rem" : "1.3rem",
                letterSpacing: "3px",
                textTransform: "uppercase",
                background: gameLoaded
                  ? "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #a855f7 100%)"
                  : "linear-gradient(135deg, rgba(59, 130, 246, 0.5), rgba(139, 92, 246, 0.5))",
                color: "#ffffff",
                border: "2px solid rgba(226, 232, 240, 0.3)",
                cursor: gameLoaded ? "pointer" : "not-allowed",
                boxShadow: gameLoaded
                  ? "0 10px 40px rgba(59, 130, 246, 0.5), 0 0 20px rgba(139, 92, 246, 0.3)"
                  : "none",
                opacity: gameLoaded ? 1 : 0.6,
                transition: "all 0.3s ease",
              }}
            >
              {gameLoaded ? "🚀 PLAY GAME" : "⏳ Loading Game..."}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onNavigateHome}
              style={{
                padding: "14px 0",
                background: "linear-gradient(135deg, rgba(96, 165, 250, 0.2), rgba(168, 85, 247, 0.2))",
                border: "2px solid rgba(96, 165, 250, 0.4)",
                borderRadius: "12px",
                color: "#3b82f6",
                fontSize: isMobile ? "1rem" : "1.1rem",
                fontWeight: "700",
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "all 0.3s ease",
                width: "100%",
              }}
            >
              🌐 Visit Equilibrate.AI
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}