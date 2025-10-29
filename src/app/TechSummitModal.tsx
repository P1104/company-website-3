import { useState } from "react";
import { X, MapPin, Calendar, ExternalLink } from "lucide-react";
import Image from "next/image";

interface TechSummitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: () => void;
}

export default function TechSummitModal({
  isOpen,
  onClose,
  onNavigate,
}: TechSummitModalProps) {
  const [isNavigating, setIsNavigating] = useState(false);

  if (!isOpen) return null;

  const handleNavigate = () => {
    setIsNavigating(true);
    setTimeout(() => {
      onNavigate();
    }, 200);
  };

  return (
    <>
      <style>{`
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
        @keyframes fadeInOut {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
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
        .tech-summit-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(244, 241, 241, 1);
          backdrop-filter: blur(12px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 99999;
          padding: 20px;
          overflow: hidden;
          
        }
        .tech-summit-grid {
          position: absolute;
          inset: 0;
          opacity: 0.15;
          pointer-events: none;
          background-image: 
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px);
          background-size: 60px 60px;
        }
        .tech-summit-modal-card {
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(240, 147, 251, 0.2) 100%);
          border-radius: 24px;
          padding: 3px;
          max-width: 500px;
          width: 100%;
          box-shadow: 0 25px 80px rgba(102, 126, 234, 0.3), 0 0 60px rgba(240, 147, 251, 0.2);
          border: 2px solid rgba(226, 232, 240, 0.4);
          position: relative;
          z-index: 10;
          animation: slideUp 0.4s ease-out;
        }
        .tech-summit-content {
          background: linear-gradient(135deg, rgba(248, 250, 252, 0.98) 0%, rgba(241, 245, 249, 0.98) 100%);
          border-radius: 22px;
          padding: 32px 24px;
          position: relative;
          overflow: hidden;
        }
        .tech-summit-close-btn {
          position: absolute;
          top: 12px;
          right: 12px;
          background: linear-gradient(135deg, rgba(96, 165, 250, 0.2), rgba(168, 85, 247, 0.2));
          border: 2px solid rgba(96, 165, 250, 0.3);
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
          color: #3b82f6;
          z-index: 10;
        }
        .tech-summit-close-btn:hover {
          transform: scale(1.1) rotate(90deg);
        }
        .tech-summit-logo {
          display: flex;
          justify-content: center;
          margin-bottom: 16px;
          animation: float 3s ease-in-out infinite;
        }
        .tech-summit-logo-box {
          width: 80px;
          height: 80px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 24px rgba(102, 126, 234, 0.3);
          font-size: 36px;
          font-weight: bold;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
          color: white;
          border: 3px solid rgba(226, 232, 240, 0.3);
          transition: transform 0.2s;
        }
        .tech-summit-logo-box:hover {
          transform: scale(1.1);
        }
        .tech-summit-title {
          font-size: 28px;
          font-weight: bold;
          background: linear-gradient(90deg, #667eea, #764ba2, #f093fb);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-align: center;
          margin-bottom: 20px;
          letter-spacing: 1px;
        }
        .tech-summit-invitation {
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(240, 147, 251, 0.15) 100%);
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 20px;
          border: 2px solid rgba(102, 126, 234, 0.3);
        }
        .tech-summit-invitation-title {
          font-size: 18px;
          font-weight: 700;
          background: linear-gradient(90deg, #000000, #000000);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-align: center;
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        .tech-summit-invitation-text {
          font-size: 14px;
          color: #475569;
          text-align: center;
          line-height: 1.5;
          font-weight: 500;
        }
        .tech-summit-details {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 20px;
        }
        .tech-summit-detail-item {
          background: linear-gradient(135deg, rgba(96, 165, 250, 0.1), rgba(168, 85, 247, 0.08));
          border-radius: 10px;
          padding: 12px;
          display: flex;
          align-items: flex-start;
          gap: 10px;
          border: 2px solid rgba(96, 165, 250, 0.2);
          transition: transform 0.2s;
        }
        .tech-summit-detail-item:hover {
          transform: translateX(5px);
        }
        .tech-summit-detail-item.dates {
          background: linear-gradient(135deg, rgba(168, 85, 247, 0.1), rgba(240, 147, 251, 0.08));
          border-color: rgba(168, 85, 247, 0.2);
        }
        .tech-summit-detail-icon {
          color: #3b82f6;
          margin-top: 2px;
          flex-shrink: 0;
        }
        .tech-summit-detail-dates .tech-summit-detail-icon {
          color: #8b5cf6;
        }
        .tech-summit-detail-label {
          font-size: 12px;
          color: #64748b;
          margin-bottom: 4px;
          font-weight: 600;
        }
        .tech-summit-detail-value {
          font-size: 13px;
          color: #1e293b;
          font-weight: 600;
          line-height: 1.4;
        }
        .tech-summit-buttons {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .tech-summit-btn {
          padding: 14px 20px;
          border-radius: 10px;
          font-size: 15px;
          font-weight: bold;
          text-align: center;
          border: none;
          cursor: pointer;
          transition: all 0.3s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          text-decoration: none;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
          color: white;
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
        }
        .tech-summit-btn:hover {
          transform: scale(1.02) translateY(-2px);
        }
        .tech-summit-btn:active {
          transform: scale(0.98);
        }
        .tech-summit-btn-secondary {
          background: linear-gradient(135deg, rgba(96, 165, 250, 0.2), rgba(168, 85, 247, 0.2));
          color: #3b82f6;
          border: 2px solid rgba(96, 165, 250, 0.4);
          box-shadow: none;
        }
        .tech-summit-btn-secondary:hover {
          background: linear-gradient(135deg, rgba(96, 165, 250, 0.3), rgba(168, 85, 247, 0.3));
        }
      `}</style>

      <div className="tech-summit-backdrop" onClick={onClose}>
        <div className="tech-summit-grid" />

        <div
          className="tech-summit-modal-card"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="tech-summit-content">
            <div
              style={{
                position: "absolute",
                top: "-50%",
                right: "-50%",
                width: "200%",
                height: "200%",
                background:
                  "radial-gradient(circle, rgba(102, 126, 234, 0.1) 0%, transparent 70%)",
                pointerEvents: "none",
              }}
            />

            <button className="tech-summit-close-btn" onClick={onClose}>
              <X size={20} />
            </button>

            <div className="tech-summit-logo">
              <Image
                className="tech-summit-logo-box"
                src={"/logo.jpg"}
                alt="company logo"
                width={100}
                height={100}
              />
            </div>

            <h2 className="tech-summit-title">Equilibrate.AI</h2>

            <div className="tech-summit-invitation">
              <div className="tech-summit-invitation-title">
                Join Us at BTS 2025!
              </div>
              <p className="tech-summit-invitation-text">
                Visit our booth at Bangalore Tech Summit and explore
                cutting-edge innovations!
              </p>
            </div>

            <div className="tech-summit-details">
              <div className="tech-summit-detail-item">
                <MapPin size={18} className="tech-summit-detail-icon" />
                <div style={{ flex: 1 }}>
                  <p className="tech-summit-detail-label">Location</p>
                  <p className="tech-summit-detail-value">
                    MM Activ Sci-Tech Communications No.11/6, NITON, Block
                    &quot;C Second Floor, Palace Road Bengaluru - 560001,
                    Karnataka, India
                  </p>
                </div>
              </div>

              <div className="tech-summit-detail-item dates">
                <Calendar size={18} className="tech-summit-detail-icon" />
                <div style={{ flex: 1 }}>
                  <p className="tech-summit-detail-label">Event Dates</p>
                  <p className="tech-summit-detail-value">
                    November 18-20, 2025
                  </p>
                </div>
              </div>
            </div>

            <div className="tech-summit-buttons">
              <a
                href="https://www.bengalurutechsummit.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="tech-summit-btn"
              >
                <ExternalLink size={16} />
                Visit Summit Website
              </a>

              <button
                onClick={handleNavigate}
                disabled={isNavigating}
                className="tech-summit-btn tech-summit-btn-secondary"
                style={{ opacity: isNavigating ? 0.6 : 1 }}
              >
                {isNavigating ? "Navigating..." : "Continue to Home →"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
