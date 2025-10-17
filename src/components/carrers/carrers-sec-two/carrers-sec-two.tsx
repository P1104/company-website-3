"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import {
  CalendarIcon,
  Upload,
  User,
  Mail,
  Phone,
  Briefcase,
  FileText,
  Calendar as CalendarIconAlt,
  Globe,
  Linkedin,
  X,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { format } from "date-fns";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  resume: File | null;
  noticePeriod: Date | undefined;
  coverLetter: string;
  skills: string[];
  experience: string;
  linkedinUrl: string;
  portfolioUrl: string;
  agreedToTerms: boolean;
}

export function CarrerSecTwo() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    position: "",
    resume: null,
    noticePeriod: undefined,
    coverLetter: "",
    skills: [],
    experience: "",
    linkedinUrl: "",
    portfolioUrl: "",
    agreedToTerms: false,
  });

  const [currentSkill, setCurrentSkill] = useState("");
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const positions = [
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "UI/UX Designer",
    "Project Manager",
    "DevOps Engineer",
    "Data Scientist",
    "Product Manager",
    "Other",
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const cardReveal: Variants = {
    hidden: { opacity: 0, y: 40, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeInOut",
      },
    },
  };

  const floatingCard: Variants = {
    hidden: { y: 0 },
    visible: {
      y: [0, -2, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const successCheckmark: Variants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
        delay: 0.2,
      },
    },
  };

  const handleInputChange = (field: keyof FormData, value: unknown) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    handleInputChange("resume", file);
  };

  const addSkill = () => {
    if (currentSkill.trim() && !formData.skills.includes(currentSkill.trim())) {
      handleInputChange("skills", [...formData.skills, currentSkill.trim()]);
      setCurrentSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    handleInputChange(
      "skills",
      formData.skills.filter((skill) => skill !== skillToRemove)
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.agreedToTerms) {
      alert("Please agree to the terms and conditions");
      return;
    }

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.position
    ) {
      alert("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true); // show loading animation

    try {
      const data = new FormData();
      data.append("firstName", formData.firstName);
      data.append("lastName", formData.lastName);
      data.append("email", formData.email);
      data.append("phone", formData.phone);
      data.append("position", formData.position);

      if (formData.noticePeriod) {
        data.append("noticePeriod", formData.noticePeriod.toISOString());
      }

      data.append("coverLetter", formData.coverLetter);
      data.append("skills", JSON.stringify(formData.skills));
      data.append("experience", formData.experience);
      data.append("linkedinUrl", formData.linkedinUrl);
      data.append("portfolioUrl", formData.portfolioUrl);

      if (formData.resume) {
        data.append("resume", formData.resume);
      }

      const response = await fetch("/api/contact-form/career", {
        method: "POST",
        body: data,
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.message || "Submission failed.");
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

  const isFormValid = () => {
    return (
      formData.firstName &&
      formData.lastName &&
      formData.email &&
      formData.phone &&
      formData.position &&
      formData.agreedToTerms
    );
  };

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-400/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-400/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          className="space-y-8"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.div className="relative">
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="space-y-6 relative"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  {/* Personal Information Section */}
                  <motion.div
                    variants={cardReveal}
                    className="bg-white/90 backdrop-blur-sm border border-white/20 rounded-2xl p-8 shadow-xl hover:shadow-2xl hover:bg-white/95 transition-all duration-300"
                    whileHover="visible"
                  >
                    <motion.div variants={floatingCard}>
                      <div className="flex items-center gap-3 mb-8">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <User className="h-6 w-6 text-blue-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">
                          Personal Information
                        </h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileFocus={{ scale: 1.02 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Label
                            htmlFor="firstName"
                            className="text-gray-800 font-medium mb-3 block"
                          >
                            First Name *
                          </Label>
                          <div className="relative">
                            <Input
                              id="firstName"
                              value={formData.firstName}
                              onChange={(e) =>
                                handleInputChange("firstName", e.target.value)
                              }
                              className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                              placeholder="Enter your first name"
                            />
                            <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          </div>
                        </motion.div>

                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileFocus={{ scale: 1.02 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Label
                            htmlFor="lastName"
                            className="text-gray-800 font-medium mb-3 block"
                          >
                            Last Name *
                          </Label>
                          <div className="relative">
                            <Input
                              id="lastName"
                              value={formData.lastName}
                              onChange={(e) =>
                                handleInputChange("lastName", e.target.value)
                              }
                              className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                              placeholder="Enter your last name"
                            />
                            <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* Contact Details Section */}
                  <motion.div
                    variants={cardReveal}
                    className="bg-white/90 backdrop-blur-sm border border-white/20 rounded-2xl p-8 shadow-xl hover:shadow-2xl hover:bg-white/95 transition-all duration-300"
                    transition={{ delay: 0.1 }}
                    whileHover="visible"
                  >
                    <motion.div variants={floatingCard}>
                      <div className="flex items-center gap-3 mb-8">
                        <div className="p-2 bg-green-100 rounded-lg">
                          <Mail className="h-6 w-6 text-green-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">
                          Contact Details
                        </h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileFocus={{ scale: 1.02 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Label
                            htmlFor="email"
                            className="text-gray-800 font-medium mb-3 block"
                          >
                            Email Address *
                          </Label>
                          <div className="relative">
                            <Input
                              id="email"
                              type="email"
                              value={formData.email}
                              onChange={(e) =>
                                handleInputChange("email", e.target.value)
                              }
                              className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                              placeholder="your.email@example.com"
                            />
                            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          </div>
                        </motion.div>

                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileFocus={{ scale: 1.02 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Label
                            htmlFor="phone"
                            className="text-gray-800 font-medium mb-3 block"
                          >
                            Phone Number *
                          </Label>
                          <div className="relative">
                            <Input
                              id="phone"
                              type="tel"
                              value={formData.phone}
                              onChange={(e) =>
                                handleInputChange("phone", e.target.value)
                              }
                              className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                              placeholder="+1 (555) 123-4567"
                            />
                            <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* Position & Resume Section */}
                  <motion.div
                    variants={cardReveal}
                    className="bg-white/90 backdrop-blur-sm border border-white/20 rounded-2xl p-8 shadow-xl hover:shadow-2xl hover:bg-white/95 transition-all duration-300"
                    transition={{ delay: 0.2 }}
                    whileHover="visible"
                  >
                    <motion.div variants={floatingCard}>
                      <div className="flex items-center gap-3 mb-8">
                        <div className="p-2 bg-purple-100 rounded-lg">
                          <Briefcase className="h-6 w-6 text-purple-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">
                          Position & Resume
                        </h3>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileFocus={{ scale: 1.02 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Label
                            htmlFor="position"
                            className="text-gray-800 font-medium mb-3 block"
                          >
                            Position *
                          </Label>
                          <div className="relative">
                            <Select
                              value={formData.position}
                              onValueChange={(value) =>
                                handleInputChange("position", value)
                              }
                            >
                              <SelectTrigger className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200">
                                <SelectValue placeholder="Select position" />
                              </SelectTrigger>
                              <SelectContent className="bg-white text-black border-2 border-gray-200 rounded-xl shadow-xl">
                                {positions.map((position) => (
                                  <SelectItem
                                    key={position}
                                    value={position}
                                    className="hover:bg-blue-50 focus:bg-blue-50 rounded-lg mx-1"
                                  >
                                    {position}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <Briefcase className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          </div>
                        </motion.div>

                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileFocus={{ scale: 1.02 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Label
                            htmlFor="noticePeriod"
                            className="text-gray-800 font-medium mb-3 block"
                          >
                            Available From
                          </Label>
                          <div className="relative">
                            <Popover
                              open={isCalendarOpen}
                              onOpenChange={setIsCalendarOpen}
                            >
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-xl text-gray-900 hover:bg-gray-50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 justify-start font-normal"
                                >
                                  {formData.noticePeriod
                                    ? format(formData.noticePeriod, "PPP")
                                    : "Select availability date"}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0 bg-white border-2 border-gray-200 rounded-xl shadow-xl">
                                <Calendar
                                  mode="single"
                                  selected={formData.noticePeriod}
                                  onSelect={(date) => {
                                    handleInputChange("noticePeriod", date);
                                    setIsCalendarOpen(false);
                                  }}
                                  initialFocus
                                  className="bg-white text-black rounded-xl [&_*]:text-black"
                                />
                              </PopoverContent>
                            </Popover>
                            <CalendarIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          </div>
                        </motion.div>
                      </div>

                      <motion.div
                        whileHover={{ scale: 1.01 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Label
                          htmlFor="resume"
                          className="text-gray-800 font-medium mb-3 block"
                        >
                          Resume/CV *
                        </Label>
                        <div className="border-3 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 hover:bg-blue-50/50 transition-all duration-300 bg-gray-50/50">
                          <Upload className="h-10 w-10 text-gray-400 mx-auto mb-4" />
                          <div className="space-y-2">
                            <p className="text-base text-gray-700 font-medium">
                              {formData.resume
                                ? formData.resume.name
                                : "Click to upload your resume"}
                            </p>
                            <p className="text-sm text-gray-500">
                              PDF, DOC, DOCX (max 5MB)
                            </p>
                            <Input
                              id="resume"
                              type="file"
                              accept=".pdf,.doc,.docx"
                              onChange={handleFileUpload}
                              className="hidden"
                            />
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() =>
                                document.getElementById("resume")?.click()
                              }
                              className="mt-4 px-6 py-2 bg-white border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 hover:border-blue-400 transition-all duration-200"
                            >
                              Choose File
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  </motion.div>

                  {/* Cover Letter Section */}
                  <motion.div
                    variants={cardReveal}
                    className="bg-white/90 backdrop-blur-sm border border-white/20 rounded-2xl p-8 shadow-xl hover:shadow-2xl hover:bg-white/95 transition-all duration-300"
                    transition={{ delay: 0.3 }}
                    whileHover="visible"
                  >
                    <motion.div variants={floatingCard}>
                      <div className="flex items-center gap-3 mb-8">
                        <div className="p-2 bg-orange-100 rounded-lg">
                          <FileText className="h-6 w-6 text-orange-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">
                          Cover Letter
                        </h3>
                      </div>

                      <motion.div
                        whileHover={{ scale: 1.01 }}
                        whileFocus={{ scale: 1.01 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Label
                          htmlFor="coverLetter"
                          className="text-gray-800 font-medium mb-3 block"
                        >
                          Tell us why you&apos;re a great fit for this role
                        </Label>
                        <div className="relative">
                          <Textarea
                            id="coverLetter"
                            value={formData.coverLetter}
                            onChange={(e) =>
                              handleInputChange("coverLetter", e.target.value)
                            }
                            className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 min-h-32 resize-none"
                            placeholder="Share your passion, experience, and what makes you the perfect candidate..."
                          />
                          <FileText className="absolute left-4 top-5 h-5 w-5 text-gray-400" />
                        </div>
                      </motion.div>
                    </motion.div>
                  </motion.div>

                  {/* Skills & Experience Section */}
                  <motion.div
                    variants={cardReveal}
                    className="bg-white/90 backdrop-blur-sm border border-white/20 rounded-2xl p-8 shadow-xl hover:shadow-2xl hover:bg-white/95 transition-all duration-300"
                    transition={{ delay: 0.4 }}
                    whileHover="visible"
                  >
                    <motion.div variants={floatingCard}>
                      <div className="flex items-center gap-3 mb-8">
                        <div className="p-2 bg-indigo-100 rounded-lg">
                          <CalendarIconAlt className="h-6 w-6 text-indigo-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">
                          Skills & Experience
                        </h3>
                      </div>

                      <div className="space-y-6">
                        <motion.div
                          whileHover={{ scale: 1.01 }}
                          whileFocus={{ scale: 1.01 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Label
                            htmlFor="skills"
                            className="text-gray-800 font-medium mb-3 block"
                          >
                            Your Skills & Technologies
                          </Label>
                          <div className="flex gap-3">
                            <Input
                              id="skills"
                              value={currentSkill}
                              onChange={(e) => setCurrentSkill(e.target.value)}
                              placeholder="Add a skill (e.g., React, Node.js, Python)"
                              className="flex-1 px-4 py-4 bg-white border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                              onKeyPress={(e) =>
                                e.key === "Enter" &&
                                (e.preventDefault(), addSkill())
                              }
                            />
                            <Button
                              type="button"
                              onClick={addSkill}
                              className="px-6 py-4 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-all duration-200"
                            >
                              Add
                            </Button>
                          </div>

                          {formData.skills.length > 0 && (
                            <motion.div
                              className="flex flex-wrap gap-3 mt-4"
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              transition={{ duration: 0.3 }}
                            >
                              {formData.skills.map((skill, index) => (
                                <motion.div
                                  key={index}
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  <Badge className="bg-blue-100 border-blue-200 text-blue-800 hover:bg-blue-200 px-3 py-2 text-sm font-medium rounded-lg flex items-center gap-2">
                                    {skill}
                                    <X
                                      className="h-4 w-4 cursor-pointer hover:text-red-500 transition-colors"
                                      onClick={() => removeSkill(skill)}
                                    />
                                  </Badge>
                                </motion.div>
                              ))}
                            </motion.div>
                          )}
                        </motion.div>

                        <motion.div
                          whileHover={{ scale: 1.01 }}
                          whileFocus={{ scale: 1.01 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Label
                            htmlFor="experience"
                            className="text-gray-800 font-medium mb-3 block"
                          >
                            Experience Level *
                          </Label>
                          <div className="relative">
                            <Select
                              value={formData.experience}
                              onValueChange={(value) =>
                                handleInputChange("experience", value)
                              }
                            >
                              <SelectTrigger className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200">
                                <SelectValue placeholder="Select your experience level" />
                              </SelectTrigger>
                              <SelectContent className="bg-white text-black border-2 border-gray-200 rounded-xl shadow-xl">
                                <SelectItem
                                  value="0-1"
                                  className="hover:bg-blue-50 focus:bg-blue-50 rounded-lg mx-1"
                                >
                                  0-1 years (Entry Level)
                                </SelectItem>
                                <SelectItem
                                  value="1-3"
                                  className="hover:bg-blue-50 focus:bg-blue-50 rounded-lg mx-1"
                                >
                                  1-3 years (Junior)
                                </SelectItem>
                                <SelectItem
                                  value="3-5"
                                  className="hover:bg-blue-50 focus:bg-blue-50 rounded-lg mx-1"
                                >
                                  3-5 years (Mid-Level)
                                </SelectItem>
                                <SelectItem
                                  value="5-10"
                                  className="hover:bg-blue-50 focus:bg-blue-50 rounded-lg mx-1"
                                >
                                  5-10 years (Senior)
                                </SelectItem>
                                <SelectItem
                                  value="10+"
                                  className="hover:bg-blue-50 focus:bg-blue-50 rounded-lg mx-1"
                                >
                                  10+ years (Expert)
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <CalendarIconAlt className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* Professional Links Section */}
                  <motion.div
                    variants={cardReveal}
                    className="bg-white/90 backdrop-blur-sm border border-white/20 rounded-2xl p-8 shadow-xl hover:shadow-2xl hover:bg-white/95 transition-all duration-300"
                    transition={{ delay: 0.5 }}
                    whileHover="visible"
                  >
                    <motion.div variants={floatingCard}>
                      <div className="flex items-center gap-3 mb-8">
                        <div className="p-2 bg-teal-100 rounded-lg">
                          <Globe className="h-6 w-6 text-teal-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">
                          Professional Links
                        </h3>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileFocus={{ scale: 1.02 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Label
                            htmlFor="linkedin"
                            className="text-gray-800 font-medium mb-3 block"
                          >
                            LinkedIn Profile
                          </Label>
                          <div className="relative">
                            <Input
                              id="linkedin"
                              value={formData.linkedinUrl}
                              onChange={(e) =>
                                handleInputChange("linkedinUrl", e.target.value)
                              }
                              placeholder="https://www.linkedin.com/in/yourprofile"
                              className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                            />
                            <Linkedin className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          </div>
                        </motion.div>

                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileFocus={{ scale: 1.02 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Label
                            htmlFor="portfolio"
                            className="text-gray-800 font-medium mb-3 block"
                          >
                            Portfolio Website
                          </Label>
                          <div className="relative">
                            <Input
                              id="portfolio"
                              value={formData.portfolioUrl}
                              onChange={(e) =>
                                handleInputChange(
                                  "portfolioUrl",
                                  e.target.value
                                )
                              }
                              placeholder="https://yourportfolio.com"
                              className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                            />
                            <Globe className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* Terms & Submit Section */}
                  <motion.div
                    variants={cardReveal}
                    className="bg-white/90 backdrop-blur-sm border border-white/20 rounded-2xl p-8 shadow-xl hover:shadow-2xl hover:bg-white/95 transition-all duration-300"
                    transition={{ delay: 0.6 }}
                    whileHover="visible"
                  >
                    <motion.div variants={floatingCard}>
                      {/* <motion.div
                        whileHover={{ scale: 1.01 }}
                        transition={{ duration: 0.2 }}
                        className="mb-8"
                      >
                        <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
                          <Checkbox
                            id="terms"
                            checked={formData.agreedToTerms}
                            onCheckedChange={(checked) =>
                              handleInputChange("agreedToTerms", checked)
                            }
                            className="mt-1 border-2 border-gray-400 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                          />
                          <label
                            htmlFor="terms"
                            className="text-sm text-gray-700 leading-relaxed cursor-pointer"
                          >
                            I agree to the{" "}
                            <span className="text-blue-600 hover:text-blue-800 underline">
                              terms and conditions
                            </span>{" "}
                            and consent to the processing of my personal data
                            for recruitment purposes. I understand that my
                            information will be used to evaluate my application
                            and contact me regarding potential opportunities.
                          </label>
                        </div>
                      </motion.div> */}

                      <motion.button
                        type="submit"
                        disabled={!isFormValid() || isSubmitting}
                        className="w-full relative group overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-5 px-8 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
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
                              Processing Application...
                            </>
                          ) : (
                            <>
                              Submit Application
                              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </>
                          )}
                        </span>
                      </motion.button>
                    </motion.div>
                  </motion.div>
                </motion.form>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center py-16"
              >
                <motion.div
                  className="w-24 h-24 rounded-full bg-green-100 border-4 border-green-200 flex items-center justify-center mx-auto mb-8"
                  variants={successCheckmark}
                  initial="hidden"
                  animate="visible"
                >
                  <CheckCircle className="w-12 h-12 text-green-600" />
                </motion.div>
                <motion.h3
                  className="text-3xl font-bold text-gray-900 mb-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  Application Submitted Successfully!
                </motion.h3>
                <motion.p
                  className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  Thank you for your interest in joining our team! We&apos;ve
                  received your application and will review it carefully. Our
                  hiring team will get back to you within 2-3 business days.
                </motion.p>
                <motion.button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({
                      firstName: "",
                      lastName: "",
                      email: "",
                      phone: "",
                      position: "",
                      resume: null,
                      noticePeriod: undefined,
                      coverLetter: "",
                      skills: [],
                      experience: "",
                      linkedinUrl: "",
                      portfolioUrl: "",
                      agreedToTerms: false,
                    });
                  }}
                  className="px-8 py-4 bg-white border-2 border-gray-300 rounded-xl text-gray-900 font-medium hover:bg-gray-50 hover:border-blue-400 hover:text-blue-600 transition-all duration-200 shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  Submit Another Application
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
