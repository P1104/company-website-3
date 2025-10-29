// ============================================
// GAME OVER MODAL - With HeroSectionThemeWrapper Theme
// ============================================
import React from "react";

export default function GameOverModal({ finalScore, finalCoins, onRestart, onNavigateHome, isMobile }) {
  const handleTryAgain = () => {
    onRestart();
  };

  const handleVisitHome = () => {
    onNavigateHome();
  };

  return (
    <div 
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 10000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(to bottom right, rgba(248, 250, 252, 0.85), rgba(191, 219, 254, 0.85))',
        backdropFilter: 'blur(12px)',
        padding: '16px',
        overflow: 'hidden'
      }}
    >
      {/* Grid Background */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.2 }}>
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

      {/* Animated Orb */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        <div style={{
          position: 'absolute',
          top: '20%',
          right: '10%',
          width: '280px',
          height: '280px',
          background: 'linear-gradient(to bottom right, rgba(239, 68, 68, 0.15), rgba(168, 85, 247, 0.15))',
          borderRadius: '50%',
          filter: 'blur(60px)',
          animation: 'float-orb-2 30s ease-in-out infinite',
        }} />
      </div>

      <style>{`
        @keyframes float-orb-2 {
          0%, 100% { transform: translate(0, 0) scale(1.1); }
          50% { transform: translate(-30px, 25px) scale(1); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>

      <div 
        style={{
          width: 'min(700px, 95vw)',
          background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(168, 85, 247, 0.15))',
          padding: '3px',
          borderRadius: '24px',
          boxShadow: '0 25px 80px rgba(239, 68, 68, 0.3), 0 0 40px rgba(168, 85, 247, 0.2)',
          border: '2px solid rgba(226, 232, 240, 0.4)',
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
            background: 'linear-gradient(90deg, #ef4444, #f87171, #fca5a5)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontSize: isMobile ? '2.5rem' : '3.5rem',
            fontWeight: '900',
            marginBottom: '24px',
            letterSpacing: '2px'
          }}>
            GAME OVER
          </div>
          
          <div style={{
            background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.15) 0%, rgba(220, 38, 38, 0.15) 100%)',
            borderRadius: '20px',
            padding: '24px',
            marginBottom: '32px',
            border: '2px solid rgba(239, 68, 68, 0.3)'
          }}>
            <p style={{
              color: '#dc2626',
              fontSize: '0.95rem',
              marginBottom: '12px',
              textTransform: 'uppercase',
              letterSpacing: '3px',
              fontWeight: '800'
            }}>
              Final Score
            </p>
            <p style={{
              color: '#0f172a',
              fontSize: isMobile ? '2.5rem' : '3.5rem',
              fontWeight: '900',
              marginBottom: '8px'
            }}>
              {finalScore}
            </p>
            {/* <p style={{
              color: '#f59e0b',
              fontSize: '1rem',
              fontWeight: '700'
            }}>
              🪙 Coins: {finalCoins}
            </p> */}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <button
              onClick={handleTryAgain}
              style={{
                width: '100%',
                padding: '20px',
                borderRadius: '16px',
                fontWeight: '900',
                fontSize: isMobile ? '1.1rem' : '1.3rem',
                letterSpacing: '3px',
                textTransform: 'uppercase',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%)',
                color: '#ffffff',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 10px 40px rgba(16, 185, 129, 0.5)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
            >
              🔄 TRY AGAIN
            </button>

            <button
              onClick={handleVisitHome}
              style={{
                width: '100%',
                padding: '20px',
                borderRadius: '16px',
                fontWeight: '900',
                fontSize: isMobile ? '1rem' : '1.2rem',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #a855f7 100%)',
                color: '#ffffff',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 8px 30px rgba(59, 130, 246, 0.4)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
            >
              🌐 Visit Equilibrate.AI
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}