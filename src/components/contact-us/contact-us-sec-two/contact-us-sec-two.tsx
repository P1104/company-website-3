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
  Phone,
  Briefcase,
} from "lucide-react";
import { Globe } from "@/components/ui/globe"; // ✅ imported your new globe

interface FormData {
  name: string;
  email: string;
  company: string;
  designation: string;
  phone: string;
  message: string;
}

export function ContactSecTwo() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    designation: "",
    phone: "",
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
      transition: { duration: 0.8, ease: [0.23, 0.86, 0.39, 0.96] },
    },
  };

  const handleInputChange = (field: keyof FormData, value: unknown) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+?[\d\s-()]+$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isFormValid = () =>
    formData.name.trim() &&
    formData.email.trim() &&
    formData.phone.trim() &&
    formData.message.trim() &&
    /\S+@\S+\.\S+/.test(formData.email) &&
    /^\+?[\d\s-()]+$/.test(formData.phone) &&
    formData.message.trim().length >= 10;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);

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
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="mb-12"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
        
          <p className="text-gray-600 text-lg">
            Tell us about yourself and we&apos;ll get back to you within 24
            hours.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* LEFT COLUMN - FORM */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="space-y-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {/* Name */}
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      className={`w-full pl-10 pr-4 py-4 bg-gray-50 border rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 ${
                        errors.name ? "border-red-400" : "border-gray-200"
                      }`}
                    />
                    {errors.name && (
                      <p className="text-red-400 text-sm mt-2">{errors.name}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className={`w-full pl-10 pr-4 py-4 bg-gray-50 border rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 ${
                        errors.email ? "border-red-400" : "border-gray-200"
                      }`}
                    />
                    {errors.email && (
                      <p className="text-red-400 text-sm mt-2">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      className={`w-full pl-10 pr-4 py-4 bg-gray-50 border rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 ${
                        errors.phone ? "border-red-400" : "border-gray-200"
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-red-400 text-sm mt-2">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* Company */}
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Company"
                      value={formData.company}
                      onChange={(e) =>
                        handleInputChange("company", e.target.value)
                      }
                      className="w-full pl-10 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  {/* Designation */}
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Designation"
                      value={formData.designation}
                      onChange={(e) =>
                        handleInputChange("designation", e.target.value)
                      }
                      className="w-full pl-10 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  {/* Message */}
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-4 h-5 w-5 text-gray-400" />
                    <textarea
                      placeholder="Tell us about your Enquiry..."
                      rows={6}
                      value={formData.message}
                      onChange={(e) =>
                        handleInputChange("message", e.target.value)
                      }
                      className={`w-full pl-10 pr-4 py-4 bg-gray-50 border rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 resize-none ${
                        errors.message ? "border-red-400" : "border-gray-200"
                      }`}
                    />
                    {errors.message && (
                      <p className="text-red-400 text-sm mt-2">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    disabled={!isFormValid() || isSubmitting}
                    className="w-full relative group overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-5 px-8 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
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
                <div className="text-center py-16">
                  <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-gray-600 mb-8">
                    We’ll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        name: "",
                        email: "",
                        company: "",
                        designation: "",
                        phone: "",
                        message: "",
                      });
                      setErrors({});
                    }}
                    className="px-8 py-4 bg-white border-2 border-gray-300 rounded-xl text-gray-900 font-medium hover:bg-gray-50 hover:border-blue-400 hover:text-blue-600 transition-all duration-200 shadow-lg"
                  >
                    Send Another Message
                  </button>
                </div>
              )}
            </AnimatePresence>
          </motion.div>
{/* RIGHT COLUMN - GLOBE CARD */}
<motion.div
  className="hidden lg:flex items-center justify-center"
  initial={{ opacity: 0, x: 50 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.8, delay: 0.4 }}
>
  <div className="w-full max-w-[500px]">
    <div className="relative bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Gradient accent background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-70" />

      {/* Globe */}
      <div className="relative w-full h-[450px] flex items-center justify-center p-6">
        <Globe className="w-full h-full" />
      </div>

      {/* Footer Info */}
      <div className="relative border-t border-gray-100 px-6 py-4 bg-white/90 backdrop-blur-sm flex flex-col items-center text-center">
        <p className="text-gray-900 font-medium text-base flex items-center gap-2">
          📍 Bangalore, Karnataka, India
        </p>
       
      </div>
    </div>
  </div>
</motion.div>

        </div>
      </div>
    </section>
  );
}
