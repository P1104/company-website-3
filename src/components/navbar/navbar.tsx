"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Home, Zap, CreditCard, Package, Mail, X, Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface NavItem {
  name: string;
  url: string;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
  subItems?: { name: string; url: string }[];
}

export const Navbar = () => {
  const [mounted, setMounted] = useState(false);
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("Home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedSubMenu, setExpandedSubMenu] = useState<string | null>(null);

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
    setMounted(true);

    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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

  if (!mounted) return null;

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 hidden md:block"
        initial={{ y: -20, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          top: isScrolled ? "1rem" : "1.5rem",
        }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
      >
        <motion.div
          className="flex items-center gap-1 bg-black/50 backdrop-blur-md py-2 px-2 rounded-full border border-white/10 shadow-lg"
          animate={{
            scale: isScrolled ? 0.95 : 1,
            opacity: isScrolled ? 0.95 : 1,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.name;
            const hasDropdown = item.subItems && item.subItems.length > 0;

            return (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => setHoveredTab(item.name)}
                onMouseLeave={() => setHoveredTab(null)}
              >
                <Link
                  href={item.url}
                  onClick={() => setActiveTab(item.name)}
                  className={cn(
                    "relative cursor-pointer text-sm font-medium px-4 py-2 rounded-full transition-all duration-300",
                    "text-white/80 hover:text-white",
                    isActive && "text-white",
                    "flex items-center gap-2"
                  )}
                >
                  <Icon size={16} strokeWidth={2} />
                  <span>{item.name}</span>
                  {hasDropdown && (
                    <svg
                      className={`ml-1 w-3 h-3 transition-transform duration-200 ${
                        hoveredTab === item.name ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  )}
                </Link>

                {hasDropdown && (
                  <AnimatePresence>
                    {hoveredTab === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 mt-2 w-48 bg-black/70 rounded-md shadow-lg py-2 border border-white/10 z-30"
                        style={{
                          backdropFilter: "blur(12px)",
                          WebkitBackdropFilter: "blur(12px)",
                        }}
                      >
                        {item.subItems?.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.url}
                            className="block px-4 py-2 text-sm text-white/80 hover:text-white transition duration-150"
                            onClick={() => setActiveTab(item.name)}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            );
          })}
        </motion.div>
      </motion.nav>

      {/* Mobile Hamburger Button - Always visible on mobile */}
      <motion.button
        onClick={() => setIsMobileMenuOpen(true)}
        className="fixed top-4 right-4 z-50 md:hidden p-3 bg-black  backdrop-blur-md rounded-full border border-white/10 shadow-lg text-white hover:bg-white/5 transition-colors"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        whileTap={{ scale: 0.95 }}
      >
        <Menu size={20} />
      </motion.button>

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
};