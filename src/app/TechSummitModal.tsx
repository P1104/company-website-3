import { useState, useEffect } from 'react';
import { X, MapPin, Calendar, ExternalLink } from 'lucide-react';

interface TechSummitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: () => void;
}

export default function TechSummitModal({ isOpen, onClose, onNavigate }: TechSummitModalProps) {
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    if (!isOpen) return;

    setCountdown(10);

    const navigateTimer = setTimeout(() => {
      onNavigate();
    }, 10000);

    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearTimeout(navigateTimer);
      clearInterval(countdownInterval);
    };
  }, [isOpen, onNavigate]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: '20px',
        animation: 'fadeIn 0.3s ease-out',
      }}
      onClick={onClose}
    >
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>

      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
          borderRadius: '20px',
          padding: '2px',
          maxWidth: '480px',
          width: '100%',
          boxShadow: '0 20px 60px rgba(102, 126, 234, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)',
          position: 'relative',
          animation: 'slideUp 0.4s ease-out',
        }}
      >
        <div
          style={{
            background: 'linear-gradient(180deg, #1e1b4b 0%, #0f172a 100%)',
            borderRadius: '18px',
            padding: '32px 24px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Decorative background elements */}
          <div
            style={{
              position: 'absolute',
              top: '-50%',
              right: '-50%',
              width: '200%',
              height: '200%',
              background: 'radial-gradient(circle, rgba(102, 126, 234, 0.1) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          {/* Close Button */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              background: 'rgba(255, 255, 255, 0.1)',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s',
              color: 'rgba(255, 255, 255, 0.8)',
              zIndex: 10,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
              e.currentTarget.style.transform = 'scale(1.1) rotate(90deg)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
            }}
          >
            <X size={18} />
          </button>

          {/* Company Logo */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '16px',
              animation: 'float 3s ease-in-out infinite',
            }}
          >
            <div
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 24px rgba(240, 147, 251, 0.3)',
                fontSize: '36px',
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                color: 'white',
                border: '3px solid rgba(255, 255, 255, 0.2)',
              }}
            >
              EA
            </div>
          </div>

          {/* Company Name */}
          <h2
            style={{
              fontSize: '28px',
              fontWeight: 'bold',
              background: 'linear-gradient(90deg, #ffd700, #ffed4e, #ffd700)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textAlign: 'center',
              marginBottom: '20px',
              letterSpacing: '1px',
            }}
          >
            Equilibrate.AI
          </h2>

          {/* Invitation Section */}
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(240, 147, 251, 0.15) 100%)',
              borderRadius: '12px',
              padding: '20px',
              marginBottom: '20px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <div
              style={{
                fontSize: '20px',
                fontWeight: '700',
                color: '#ffd700',
                textAlign: 'center',
                marginBottom: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
            >
              🎉 Join Us at BTS 2025!
            </div>
            <p
              style={{
                fontSize: '14px',
                color: 'rgba(255, 255, 255, 0.85)',
                textAlign: 'center',
                lineHeight: '1.5',
              }}
            >
              Visit our booth at Bangalore Tech Summit and explore cutting-edge innovations!
            </p>
          </div>

          {/* Event Details - Compact */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              marginBottom: '20px',
            }}
          >
            {/* Location */}
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '10px',
                padding: '12px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '10px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <MapPin size={18} style={{ color: '#10b981', marginTop: '2px', flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '4px' }}>
                  Location
                </p>
                <p style={{ fontSize: '13px', color: 'white', fontWeight: '500', lineHeight: '1.4' }}>
                  BIEC, Tumkur Road, Bengaluru
                </p>
              </div>
            </div>

            {/* Dates */}
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '10px',
                padding: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <Calendar size={18} style={{ color: '#3b82f6', flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '4px' }}>
                  Event Dates
                </p>
                <p style={{ fontSize: '13px', color: 'white', fontWeight: '500' }}>
                  November 19-21, 2025
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons - Compact */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            <a
              href="https://bengalurutechsummit.karnataka.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: 'linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)',
                color: '#1a1a1a',
                padding: '14px 20px',
                borderRadius: '10px',
                fontSize: '15px',
                fontWeight: 'bold',
                textAlign: 'center',
                textDecoration: 'none',
                boxShadow: '0 4px 15px rgba(255, 215, 0, 0.3)',
                transition: 'all 0.3s',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(255, 215, 0, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(255, 215, 0, 0.3)';
              }}
            >
              <ExternalLink size={16} />
              Visit Summit Website
            </a>

            <button
              onClick={(e) => {
                e.preventDefault();
                console.log('🏠 Navigating to home page');
                onNavigate();
              }}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                padding: '12px 20px',
                borderRadius: '10px',
                fontSize: '14px',
                fontWeight: '600',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                cursor: 'pointer',
                transition: 'all 0.3s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
              }}
            >
              Continue to Home ({countdown}s) →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}