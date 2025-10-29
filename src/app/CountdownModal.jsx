// CountdownModal.jsx - WITH FULL THEME AND ANIMATIONS
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function CountdownModal({ onCountdownComplete, isMobile }) {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      onCountdownComplete();
    }
  }, [countdown, onCountdownComplete]);

  return (
    <div 
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 10001,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(to bottom right, rgba(248, 250, 252, 0.9), rgba(191, 219, 254, 0.9))',
        backdropFilter: 'blur(12px)',
        padding: '16px',
        overflow: 'hidden'
      }}
    >
      <style>{`
        @keyframes float-orb {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(30px, -20px) scale(1.1); }
        }
        @keyframes float-orb-2 {
          0%, 100% { transform: translate(0, 0) scale(1.1); }
          50% { transform: translate(-30px, 25px) scale(1); }
        }
        @keyframes slideIn {
          from { 
            opacity: 0; 
            transform: scale(0.95) translateY(-20px);
          }
          to { 
            opacity: 1; 
            transform: scale(1) translateY(0);
          }
        }
        @keyframes pulse-glow {
          0%, 100% { 
            filter: brightness(1) drop-shadow(0 0 20px rgba(59, 130, 246, 0.5)); 
          }
          50% { 
            filter: brightness(1.1) drop-shadow(0 0 30px rgba(139, 92, 246, 0.8)); 
          }
        }
      `}</style>

      {/* Grid Background */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.25, zIndex: 0 }}>
        <div style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          width: '100%',
          height: '100%',
        }} />
      </div>

      {/* Iridescence Effect */}
      <div style={{ 
        position: 'absolute', 
        inset: 0, 
        opacity: 0.08, 
        zIndex: 0,
        background: 'linear-gradient(to bottom right, rgba(96, 165, 250, 0.3), rgba(168, 85, 247, 0.2), rgba(244, 114, 182, 0.3))'
      }} />

      {/* Animated Orbs */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 0 }}>
        <motion.div
          style={{
            position: 'absolute',
            top: '15%',
            left: '10%',
            width: '280px',
            height: '280px',
            background: 'linear-gradient(to bottom right, rgba(59, 130, 246, 0.15), rgba(139, 92, 246, 0.15))',
            borderRadius: '50%',
            filter: 'blur(60px)',
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
            position: 'absolute',
            bottom: '20%',
            right: '8%',
            width: '260px',
            height: '260px',
            background: 'linear-gradient(to bottom right, rgba(168, 85, 247, 0.15), rgba(244, 114, 182, 0.15))',
            borderRadius: '50%',
            filter: 'blur(60px)',
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

      {/* Floating Particles */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0, opacity: 0.3 }}>
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              width: isMobile ? '3px' : '5px',
              height: isMobile ? '3px' : '5px',
              borderRadius: '50%',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: i % 3 === 0 ? '#3b82f6' : i % 3 === 1 ? '#8b5cf6' : '#ec4899',
            }}
            animate={{
              y: [0, -40, 0],
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
      </div>

      {/* Modal Card */}
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: -30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        style={{
          width: 'min(700px, 95vw)',
          background: 'linear-gradient(135deg, rgba(96, 165, 250, 0.2), rgba(168, 85, 247, 0.2))',
          padding: '3px',
          borderRadius: '24px',
          boxShadow: '0 25px 80px rgba(59, 130, 246, 0.3), 0 0 40px rgba(139, 92, 246, 0.2)',
          border: '2px solid rgba(226, 232, 240, 0.5)',
          animation: 'slideIn 0.5s ease-out',
          position: 'relative',
          zIndex: 10
        }}
      >
        <div style={{
          background: 'linear-gradient(135deg, rgba(248, 250, 252, 0.95) 0%, rgba(241, 245, 249, 0.95) 100%)',
          borderRadius: '22px',
          padding: '40px 35px',
          textAlign: 'center'
        }}>
          <div style={{
            background: 'linear-gradient(90deg, #ffd700, #ffed4e, #ffd700)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontSize: isMobile ? '2rem' : '2.5rem',
            fontWeight: '900',
            marginBottom: '24px',
            letterSpacing: '2px'
          }}>
            GAME STARTING IN
          </div>
          
          <motion.div
            animate={{ 
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              fontSize: isMobile ? '5rem' : '7rem',
              fontWeight: '900',
              background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '32px',
              textShadow: '0 0 40px rgba(59, 130, 246, 0.3)',
              animation: 'pulse-glow 1s ease-in-out infinite'
            }}
          >
            {countdown}
          </motion.div>

          <div style={{
            background: 'linear-gradient(135deg, rgba(96, 165, 250, 0.15) 0%, rgba(168, 85, 247, 0.15) 100%)',
            borderRadius: '20px',
            padding: '24px',
            border: '2px solid rgba(59, 130, 246, 0.3)'
          }}>
            <p style={{
              color: '#3b82f6',
              fontSize: '0.85rem',
              fontWeight: '800',
              marginBottom: '20px',
              textTransform: 'uppercase',
              letterSpacing: '3px'
            }}>
              🎯 CONTROLS
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
              gap: '20px',
              fontSize: '0.9rem',
              color: '#1e293b'
            }}>
              {!isMobile && (
                <div style={{
                  textAlign: 'center',
                  background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(96, 165, 250, 0.15) 100%)',
                  borderRadius: '16px',
                  padding: '20px',
                  border: '2px solid rgba(59, 130, 246, 0.3)'
                }}>
                  <div style={{
                    fontWeight: '800',
                    color: '#0f172a',
                    marginBottom: '12px',
                    fontSize: '1.05rem'
                  }}>
                    💻 Desktop
                  </div>
                  <div style={{ lineHeight: '1.8', fontWeight: '600' }}>
                    <div>← → Arrow Keys</div>
                    <div>Space to Jump</div>
                  </div>
                </div>
              )}
              <div style={{
                textAlign: 'center',
                background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(168, 85, 247, 0.15) 100%)',
                borderRadius: '16px',
                padding: '20px',
                border: '2px solid rgba(139, 92, 246, 0.3)'
              }}>
                <div style={{
                  fontWeight: '800',
                  color: '#0f172a',
                  marginBottom: '12px',
                  fontSize: '1.05rem'
                }}>
                  📱 Mobile
                </div>
                <div style={{ lineHeight: '1.8', fontWeight: '600' }}>
                  <div>Tap buttons</div>
                  <div>at bottom</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}