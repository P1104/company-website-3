"use client"

import { useState, useEffect } from "react";

export function ExploreMoreSection() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button when the section is visible
      const section = document.querySelector('[data-explore-more-section]');
      
      if (section) {
        const rect = section.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Show when section is in viewport
        if (rect.top < windowHeight && rect.bottom > 0) {
          setShowButton(true);
        } else {
          setShowButton(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleClick = () => {
    // Trigger the navbar's mobile menu
    const event = new CustomEvent('openMobileMenu');
    window.dispatchEvent(event);
  };

  return (
    <>
      {/* Hidden marker section for visibility detection */}
      <div data-explore-more-section className="h-0" />

      {/* Fixed button - appears when marker is visible */}
      {showButton && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 md:hidden">
          <button
            onClick={handleClick}
            className="px-6 py-3 text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-colors duration-200 rounded-full shadow-lg"
          >
            Explore more →
          </button>
        </div>
      )}
    </>
  );
}