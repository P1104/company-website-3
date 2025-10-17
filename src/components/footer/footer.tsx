"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Github, 
  Twitter, 
  Linkedin, 
  Instagram,
  Sparkles,
  CheckCircle
} from "lucide-react";

// Custom Button Component with proper TypeScript types
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, className = "", ...props }) => (
  <button
    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${className}`}
    {...props}
  >
    {children}
  </button>
);

// Custom Input Component with proper TypeScript types
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const Input: React.FC<InputProps> = ({ className = "", ...props }) => (
  <input
    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${className}`}
    {...props}
  />
);

// Custom Textarea Component with proper TypeScript types
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}

const Textarea: React.FC<TextareaProps> = ({ className = "", ...props }) => (
  <textarea
    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none ${className}`}
    {...props}
  />
);

// const FloatingBrain: React.FC<{ className?: string }> = ({ className = "" }) => (
//   <motion.div
//     className={`relative ${className}`}
//     animate={{
//       y: [0, -10, 0],
//       rotateY: [0, 360],
//     }}
//     transition={{
//       y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
//       rotateY: { duration: 8, repeat: Infinity, ease: "linear" },
//     }}
//   >
//     <div className="relative w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-2xl flex items-center justify-center">
//       <Brain className="w-8 h-8 text-white" />
//       <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl" />
//     </div>
//   </motion.div>
// );

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function FooterDemo() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);

  // Force scroll to top when component mounts (for page refreshes)
  useEffect(() => {
    // Small delay to ensure page is fully loaded
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isFormValid = () => {
    return (
      formData.name.trim() &&
      formData.email.trim() &&
      formData.subject.trim() &&
      formData.message.trim() &&
      /\S+@\S+\.\S+/.test(formData.email) &&
      formData.message.trim().length >= 10
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact-form/footer-route", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Submission failed.");
        return;
      }

      // Show success when email is successfully sent
      setIsSubmitted(true);
    } catch (error) {
      console.error("Submission error:", error);
      alert("Submission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
    setErrors({});
    setIsSubmitting(false);
  };

  const socialLinks = [
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Instagram, href: "#", label: "Instagram" }
  ];

  return (
    <footer 
      className="relative bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 border-t border-gray-400 overflow-hidden mt-auto"
      style={{
        position: 'relative',
        clear: 'both',
        minHeight: 'auto'
      }}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />
      </div>
      
      {/* Floating Particles */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {Array(15).fill(null).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full"
            initial={{
              x: Math.random() * 1200,
              y: Math.random() * 200,
              opacity: 0,
              scale: 0,
            }}
            animate={{
              y: [null, -50],
              opacity: [0, 0.6, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 6 + 3,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>
      
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-blue-400/10 to-purple-600/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-br from-purple-400/10 to-pink-600/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
            x: [0, -25, 0],
            y: [0, 25, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Company Info Section */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                {/* <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Brain className="w-7 h-7 text-white" />
                </div> */}
                <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Equilibrate.AI
                </h3>
              </div>
              <p className="text-lg text-black leading-relaxed max-w-md">
                Building innovative solutions for tomorrow&apos;s challenges with cutting-edge technology and exceptional service.
              </p>
            </div>
            
            {/* Contact Info */}
            <div className="space-y-4">
              <h4 className="text-xl font-semibold text-black mb-3">Get in Touch</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-4 group cursor-pointer">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                    <Mail className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="text-black group-hover:text-black transition-colors">
                    anish.navali@equilibrateai.com
                  </span>
                </div>
                <div className="flex items-center gap-4 group cursor-pointer">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                    <Phone className="w-5 h-5 text-green-600" />
                  </div>
                  <span className="text-black group-hover:text-black transition-colors">
                    +91-9606024155
                  </span>
                </div>
                <div className="flex items-center gap-4 group cursor-pointer">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                    <MapPin className="w-5 h-5 text-purple-600" />
                  </div>
                  <span className="text-black group-hover:text-black transition-colors">
                    Bangalore, Karnataka, India
                  </span>
                </div>
              </div>
            </div>
            
            {/* Social Links */}
            <div className="space-y-3">
              <h4 className="text-xl font-semibold text-black">Follow Us</h4>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    className="w-12 h-12 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl flex items-center justify-center hover:bg-white transition-all duration-300 shadow-sm hover:shadow-md group"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5 text-black group-hover:text-blue-600 transition-colors" />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
          
          {/* Contact Form Section */}
          <motion.div
            ref={cardRef}
            // whileHover={{ scale: 1.02, rotateX: 4, rotateY: -4 }}
            style={{
              perspective: 1000,
              transformStyle: "preserve-3d",
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.95) 80%, rgba(59,130,246,0.08) 100%)",
              boxShadow:
                "0 8px 32px 0 rgba(59,130,246,0.15), 0 1.5px 8px 0 rgba(59,130,246,0.08)",
            }}
            className="group bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-lg hover:shadow-2xl relative overflow-hidden transition-all"
          >
            {/* 3D Glow */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                opacity: 0.7,
                background:
                  "radial-gradient(circle at 60% 40%, rgba(59,130,246,0.12) 0%, transparent 70%)",
              }}
            />
            
            {/* Animated Border */}
            <motion.div
              className="absolute -inset-1 rounded-2xl pointer-events-none"
              style={{
                border: "2px solid rgba(59,130,246,0.15)",
                boxShadow:
                  "0 0 24px 2px rgba(59,130,246,0.10), 0 0 0 2px rgba(59,130,246,0.07)",
              }}
            />
            
            {/* Floating 3D particles */}
            <motion.div
              className="absolute right-4 top-4 w-8 h-8 rounded-full bg-blue-500/20 blur-[6px] pointer-events-none"
              animate={{
                y: [0, -10, 0],
                x: [0, 10, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                repeat: Infinity,
                duration: 3.2,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute left-4 bottom-4 w-6 h-6 rounded-full bg-blue-400/20 blur-[4px] pointer-events-none"
              animate={{
                y: [0, 8, 0],
                x: [0, -8, 0],
                scale: [1, 1.15, 1],
              }}
              transition={{
                repeat: Infinity,
                duration: 2.65,
                ease: "easeInOut",
              }}
            />

            <div className="relative z-10">
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="mb-5">
                      <h4 className="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2 drop-shadow">
                        <Sparkles className="w-6 h-6 text-blue-600" />
                        Send us a Message
                      </h4>
                      <p className="text-gray-600 leading-relaxed">
                        We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
                      </p>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Input
                            type="text"
                            name="name"
                            placeholder="Your full name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className={`bg-white/50 border-gray-200 focus:border-blue-400 transition-colors placeholder:text-gray-500 text-gray-900 ${
                              errors.name ? "border-red-400" : ""
                            }`}
                            required
                          />
                          {errors.name && (
                            <motion.p
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="text-red-400 text-sm"
                            >
                              {errors.name}
                            </motion.p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Input
                            type="email"
                            name="email"
                            placeholder="your.email@example.com"
                            value={formData.email}
                            onChange={handleInputChange}
                            className={`bg-white/50 border-gray-200 focus:border-blue-400 transition-colors placeholder:text-gray-500 text-gray-900 ${
                              errors.email ? "border-red-400" : ""
                            }`}
                            required
                          />
                          {errors.email && (
                            <motion.p
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="text-red-400 text-sm"
                            >
                              {errors.email}
                            </motion.p>
                          )}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Input
                          type="text"
                          name="subject"
                          placeholder="What's this about?"
                          value={formData.subject}
                          onChange={handleInputChange}
                          className={`bg-white/50 border-gray-200 focus:border-blue-400 transition-colors placeholder:text-gray-500 text-gray-900 ${
                            errors.subject ? "border-red-400" : ""
                          }`}
                          required
                        />
                        {errors.subject && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-400 text-sm"
                          >
                            {errors.subject}
                          </motion.p>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <Textarea
                          name="message"
                          placeholder="Tell us more about your inquiry..."
                          value={formData.message}
                          onChange={handleInputChange}
                          rows={4}
                          className={`bg-white/50 border-gray-200 focus:border-blue-400 transition-colors placeholder:text-gray-500 text-gray-900 ${
                            errors.message ? "border-red-400" : ""
                          }`}
                          required
                        />
                        {errors.message && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-400 text-sm"
                          >
                            {errors.message}
                          </motion.p>
                        )}
                      </div>
                      
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          type="submit"
                          disabled={!isFormValid() || isSubmitting}
                          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? (
                            <>
                              <motion.div
                                className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                                animate={{ rotate: 360 }}
                                transition={{
                                  duration: 1,
                                  repeat: Infinity,
                                  ease: "linear",
                                }}
                              />
                              Processing...
                            </>
                          ) : (
                            <>
                              <Send className="w-5 h-5" />
                              Send Message
                            </>
                          )}
                        </Button>
                      </motion.div>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.6 }}
                    className="text-center py-8"
                  >
                    <motion.div
                      className="w-16 h-16 rounded-full bg-green-100 border-4 border-green-200 flex items-center justify-center mx-auto mb-6"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    >
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </motion.div>
                    <motion.h3
                      className="text-2xl font-bold text-gray-900 mb-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                    >
                      Message Sent Successfully!
                    </motion.h3>
                    <motion.p
                      className="text-gray-600 mb-6"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                    >
                      Thank you for reaching out! We&apos;ve received your message and will get back to you within 24 hours.
                    </motion.p>
                    <motion.button
                      onClick={resetForm}
                      className="px-6 py-3 bg-white border-2 border-gray-300 rounded-xl text-gray-900 font-medium hover:bg-gray-50 hover:border-blue-400 hover:text-blue-600 transition-all duration-200 shadow-lg"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                    >
                      Send Another Message
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
        
        {/* Bottom Section */}
        <div className="pt-6 border-t border-gray-400 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-black text-sm">
            © 2025 Equilibrate.AI. All rights reserved.
          </p>
          {/* Decorative Brain Element */}
          {/* <div className="w-8 h-8">
            <FloatingBrain className="w-full h-full" />
          </div> */}
        </div>
      </div>
    </footer>
  );
}