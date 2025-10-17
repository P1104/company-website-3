"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  User,
  Mail,
  Building,
  MessageSquare,
  Send,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { Sparkles } from "@/components/ui/sparkles";

interface FormData {
  name: string;
  email: string;
  company: string;
  message: string;
}

export const ContactSecTwo = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.23, 0.86, 0.39, 0.96],
      },
    },
  };

  const handleInputChange = (field: keyof FormData, value: unknown) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
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
      formData.message.trim() &&
      /\S+@\S+\.\S+/.test(formData.email) &&
      formData.message.trim().length >= 10
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true); // show loading animation

    try {
      const res = await fetch("/api/contact-form/contact-us-route", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Submission failed.");
        return;
      }

      // ✅ Only show success when email is successfully triggered
      setIsSubmitted(true);
    } catch (error) {
      console.error("Submission error:", error);
      alert("Submission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="pb-20 px-4 relative z-10 overflow-hidden pt-4">
      {!isSubmitted && (
        <Sparkles
          background="transparent"
          minSize={0.3}
          maxSize={1}
          particleDensity={50}
          particleColor="#6366f1"
          speed={0.5}
        />
      )}
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="space-y-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3,
              },
            },
          }}
        >
          <motion.div variants={fadeInUp}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Send us a message
            </h2>
            <p className="text-gray-600 text-lg">
              Tell us about your project and we will get back to you within 24
              hours.
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="space-y-6 relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    whileFocus={{ scale: 1.02 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                  >
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                        className={`w-full pl-10 pr-4 py-4 bg-gray-50 border rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all ${
                          errors.name ? "border-red-400" : "border-gray-200"
                        }`}
                      />
                      {errors.name && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-400 text-sm mt-2"
                        >
                          {errors.name}
                        </motion.p>
                      )}
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    whileFocus={{ scale: 1.02 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                  >
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        className={`w-full pl-10 pr-4 py-4 bg-gray-50 border rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all ${
                          errors.email ? "border-red-400" : "border-gray-200"
                        }`}
                      />
                      {errors.email && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-400 text-sm mt-2"
                        >
                          {errors.email}
                        </motion.p>
                      )}
                    </div>
                  </motion.div>
                </div>

                <motion.div
                  whileHover={{ scale: 1.01 }}
                  whileFocus={{ scale: 1.02 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Company (Optional)"
                      value={formData.company}
                      onChange={(e) =>
                        handleInputChange("company", e.target.value)
                      }
                      className="w-full pl-10 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all"
                    />
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.01 }}
                  whileFocus={{ scale: 1.02 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-4 h-5 w-5 text-gray-400" />
                    <textarea
                      placeholder="Tell us about your project..."
                      rows={6}
                      value={formData.message}
                      onChange={(e) =>
                        handleInputChange("message", e.target.value)
                      }
                      className={`w-full pl-10 pr-4 py-4 bg-gray-50 border rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all resize-none ${
                        errors.message ? "border-red-400" : "border-gray-200"
                      }`}
                    />
                    {errors.message && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-400 text-sm mt-2"
                      >
                        {errors.message}
                      </motion.p>
                    )}
                  </div>
                </motion.div>

                <motion.button
                  type="submit"
                  disabled={!isFormValid() || isSubmitting}
                  className="w-full relative group overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-5 px-8 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.5 }}
                  />
                  <span className="relative flex items-center justify-center gap-3 text-lg">
                    {isSubmitting ? (
                      <>
                        <motion.div
                          className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        />
                        Processing Message...
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        Send Message
                        <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </span>
                </motion.button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
                className="text-center py-16"
              >
                <motion.div
                  className="w-24 h-24 rounded-full bg-green-100 border-4 border-green-200 flex items-center justify-center mx-auto mb-8"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                >
                  <CheckCircle className="w-12 h-12 text-green-600" />
                </motion.div>
                <motion.h3
                  className="text-3xl font-bold text-gray-900 mb-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  Message Sent Successfully!
                </motion.h3>
                <motion.p
                  className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  Thank you for reaching out! We`&apos;`ve received your message and will get back to you within 24 hours with a detailed response.
                </motion.p>
                <motion.button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({
                      name: "",
                      email: "",
                      company: "",
                      message: "",
                    });
                    setErrors({});
                    setIsSubmitting(false);
                  }}
                  className="px-8 py-4 bg-white border-2 border-gray-300 rounded-xl text-gray-900 font-medium hover:bg-gray-50 hover:border-blue-400 hover:text-blue-600 transition-all duration-200 shadow-lg"
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
        </motion.div>
      </div>
    </section>
  );
};