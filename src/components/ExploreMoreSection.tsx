"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import { Home, Zap, CreditCard, Package, Mail, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface NavItem {
  name: string;
  url: string;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
  subItems?: { name: string; url: string }[];
}

export function ExploreMoreSection() {
  const [showButton, setShowButton] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedSubMenu, setExpandedSubMenu] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("Home");

  const navItems: NavItem[] = [
    {
      name: "Home",
      url: "/home",
      icon: Home,
    },
    {
      name: "Company",
      url: "#",
      icon: Zap,
      subItems: [
        { name: "About Us", url: "/about-us" },
        { name: "Careers", url: "/carrers" },
      ],
    },
    {
      name: "Resources",
      url: "#",
      icon: CreditCard,
      subItems: [
        { name: "Blog", url: "/blog" },
        { name: "Use Cases", url: "/use-cases" },
      ],
    },
    {
      name: "Products",
      url: "/product",
      icon: Package,
    },
    {
      name: "Contact Us",
      url: "/contact-us",
      icon: Mail,
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Show button when the section is visible
      const section = document.querySelector('[data-explore-more-section]');
      
      if (section) {
        const rect = section.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Show when section is in viewport and menu is closed
        if (rect.top < windowHeight && rect.bottom > 0 && !isMobileMenuOpen) {
          setShowButton(true);
        } else {
          setShowButton(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const handleMobileItemClick = (itemName: string) => {
    setActiveTab(itemName);
    setIsMobileMenuOpen(false);
    setExpandedSubMenu(null);
  };

  const toggleSubMenu = (itemName: string) => {
    setExpandedSubMenu(expandedSubMenu === itemName ? null : itemName);
  };

  return (
    <>
      {/* Hidden marker section for visibility detection */}
      <div data-explore-more-section className="h-0" />

      {/* Fixed button - appears when marker is visible */}
      <AnimatePresence>
        {showButton && (
          <motion.div
            key="explore-btn"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 md:hidden"
          >
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="px-6 py-3 text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-colors duration-200 rounded-full shadow-lg active:scale-95"
            >
              Explore more →
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Content */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-black/80 backdrop-blur-xl border-l border-white/10"
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                  <h2 className="text-white text-lg font-semibold">Menu</h2>
                  <button
                    type="button"
                    title="Close menu"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 text-white/80 hover:text-white rounded-full hover:bg-white/10 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Navigation Items */}
                <div className="flex-1 overflow-y-auto py-4">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.name;
                    const hasSubItems =
                      item.subItems && item.subItems.length > 0;
                    const isExpanded = expandedSubMenu === item.name;

                    return (
                      <div key={item.name} className="mb-2">
                        {hasSubItems ? (
                          <button
                            onClick={() => toggleSubMenu(item.name)}
                            className={cn(
                              "w-full flex items-center justify-between px-6 py-3 text-left transition-colors",
                              "text-white/80 hover:text-white hover:bg-white/5",
                              isActive && "text-white bg-white/10"
                            )}
                          >
                            <div className="flex items-center gap-3">
                              <Icon size={18} strokeWidth={2} />
                              <span className="font-medium">{item.name}</span>
                            </div>
                            <motion.svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              animate={{ rotate: isExpanded ? 180 : 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 9l-7 7-7-7"
                              />
                            </motion.svg>
                          </button>
                        ) : (
                          <Link
                            href={item.url}
                            onClick={() => handleMobileItemClick(item.name)}
                            className={cn(
                              "flex items-center gap-3 px-6 py-3 transition-colors",
                              "text-white/80 hover:text-white hover:bg-white/5",
                              isActive && "text-white bg-white/10"
                            )}
                          >
                            <Icon size={18} strokeWidth={2} />
                            <span className="font-medium">{item.name}</span>
                          </Link>
                        )}

                        {/* Sub Menu */}
                        <AnimatePresence>
                          {hasSubItems && isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden bg-white/5"
                            >
                              {item.subItems?.map((subItem) => (
                                <Link
                                  key={subItem.name}
                                  href={subItem.url}
                                  onClick={() =>
                                    handleMobileItemClick(item.name)
                                  }
                                  className="block px-12 py-3 text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                                >
                                  {subItem.name}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}