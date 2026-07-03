import React, { useState, useMemo } from "react";
import { Course } from "../types";
import { COURSES } from "../data";
import { BookOpen, Calendar, Clock, DollarSign, Award, CheckCircle, ArrowRight, X, ChevronRight, Sparkles, Send } from "lucide-react";
import CoursePreviewModal from "./CoursePreviewModal";

interface CoursesGridProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  enrollmentOpen: boolean;
  onOpenEnroll: (courseId?: string) => void;
}

export default function CoursesGrid({
  searchQuery,
  setSearchQuery,
  enrollmentOpen,
  onOpenEnroll,
}: CoursesGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [previewCourse, setPreviewCourse] = useState<Course | null>(null);
  
  // Enrollment form state inside modal
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    experience: "beginner",
    notes: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const categories = [
    { id: "all", label: "All Curriculums" },
    { id: "ai", label: "AI & Tech Integration" },
    { id: "pms", label: "PMS Mastery" },
    { id: "crs", label: "CRS & Channel Distribution" },
    { id: "crm", label: "Guest Loyalty & CRM" },
  ];

  // Filtering logic
  const filteredCourses = useMemo(() => {
    return COURSES.filter((course) => {
      const matchesCategory =
        selectedCategory === "all" || course.category === selectedCategory || (selectedCategory === "crs" && course.category === "marketing");
      const matchesSearch =
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.fullDescription.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleOpenDetails = (course: Course) => {
    setSelectedCourse(course);
    setShowForm(false);
    setIsSuccess(false);
  };

  const handleCloseDetails = () => {
    setSelectedCourse(null);
  };

  const handleEnrollSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        // Automatically close modal after some time or reset
      }, 4000);
    }, 1500);
  };

  return (
    <section id="courses-section" className="py-20 sm:py-24 bg-transparent relative z-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-teal-50/75 border border-teal-100 text-teal-850 text-xs font-semibold tracking-wide uppercase mb-3">
            <BookOpen className="h-4 w-4 text-teal-600" />
            Empowerment Catalog
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Our Featured Training Programs
          </h2>
          <p className="text-slate-650 text-sm sm:text-base">
            Select a course to view deep-dive curriculum modules, certification paths, and practical requirements.
          </p>
        </div>

        {/* Filter Toolbar & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 bg-white/60 backdrop-blur-md p-4.5 rounded-2xl border border-white/60 shadow-xs">
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 text-xs font-semibold rounded-full cursor-pointer transition-all ${
                  selectedCategory === cat.id
                    ? "bg-teal-600 text-white shadow-md shadow-teal-600/15"
                    : "text-slate-700 hover:bg-white/50"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Search curriculum..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white/50 border border-slate-200/50 text-xs rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 font-medium"
            />
            <BookOpen className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
          </div>
        </div>

        {/* Course Cards Grid */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className="group bg-white/70 backdrop-blur-md rounded-2xl border border-white/60 overflow-hidden shadow-xs hover:shadow-xl hover:border-white/90 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
              >
                {/* Course Banner */}
                <div className="relative h-52 overflow-hidden bg-slate-100">
                  <img
                    src={course.image}
                    alt={course.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                  />
                  {/* Category & Status badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-1.5 items-start">
                    <span className="bg-slate-950/85 backdrop-blur-md text-teal-300 text-[9px] font-black tracking-widest px-2.5 py-1 rounded-md border border-white/10 shadow-md uppercase">
                      {course.category === "pms" && "Property Management (PMS)"}
                      {course.category === "crs" && "CRS & Channels"}
                      {course.category === "marketing" && "Direct Booking Engine"}
                      {course.category === "crm" && "Guest Loyalty & CRM"}
                      {course.category === "ai" && "AI Hospitality"}
                    </span>
                    {course.category === "ai" && (
                      <div className="inline-flex items-center gap-1 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 text-[9px] font-black tracking-wide px-2.5 py-1 rounded-md shadow-md border border-amber-300/30">
                        <Sparkles className="h-3 w-3 animate-pulse text-slate-950" />
                        AI ACCREDITED
                      </div>
                    )}
                  </div>
                  <div className="absolute bottom-4 right-4 bg-slate-950/90 backdrop-blur-sm text-amber-400 font-extrabold text-xs px-3 py-1.5 rounded-lg border border-white/15 shadow-md">
                    {course.price}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6.5 flex flex-col flex-1">
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-700 transition-colors mb-3 leading-snug line-clamp-1">
                    {course.title}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6 line-clamp-3 flex-1">
                    {course.description}
                  </p>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-semibold mb-6">
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-4 w-4 text-slate-400" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Award className="h-4 w-4 text-slate-400" />
                      <span className="line-clamp-1 max-w-[120px]">{course.certification.split(" ")[0]} Accredited</span>
                    </div>
                  </div>

                  <div className="space-y-2.5 mt-auto">
                    <button
                      onClick={() => setPreviewCourse(course)}
                      className="w-full py-2.5 bg-teal-50 hover:bg-teal-100 text-teal-850 text-xs font-extrabold rounded-full transition-all cursor-pointer flex items-center justify-center gap-1.5 border border-teal-100"
                    >
                      <Sparkles className="h-3.5 w-3.5 text-teal-600 animate-pulse" />
                      Try Interactive Preview
                    </button>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleOpenDetails(course)}
                        className="flex-1 py-2.5 border border-slate-200 hover:border-slate-300 text-slate-700 text-xs font-bold rounded-full transition-all hover:bg-white/90 cursor-pointer text-center"
                      >
                        Learn More
                      </button>
                      <button
                        onClick={() => {
                          handleOpenDetails(course);
                          setShowForm(true);
                        }}
                        className="flex-1 py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-full shadow-md shadow-teal-600/15 transition-all active:scale-95 cursor-pointer text-center"
                      >
                        Enroll Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white/60 backdrop-blur-md rounded-2xl border border-white/60 p-8 shadow-xs">
            <BookOpen className="h-12 w-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-800 mb-2">No Curriculums Found</h3>
            <p className="text-slate-500 text-sm max-w-md mx-auto">
              We couldn't find any courses matching "{searchQuery}". Try refining your terms or click another filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="mt-5 px-5 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-full cursor-pointer shadow-xs"
            >
              Clear Search & Filter
            </button>
          </div>
        )}

        {/* Dynamic Detail Modal / Slide-Over */}
        {selectedCourse && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
            <div className="bg-white/95 backdrop-blur-md rounded-2xl overflow-hidden max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-white/80 relative animate-scale-in">
              
              {/* Close Button */}
              <button
                onClick={handleCloseDetails}
                className="absolute top-4 right-4 z-10 h-9 w-9 bg-slate-900/50 hover:bg-slate-900 text-white flex items-center justify-center rounded-full transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Cover Banner */}
              <div className="relative h-56 bg-slate-100">
                <img
                  src={selectedCourse.image}
                  alt={selectedCourse.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-950 via-blue-950/40 to-transparent" />
                <div className="absolute bottom-5 left-6 right-6 text-white">
                  <span className="inline-block text-[10px] font-bold bg-amber-500 text-slate-950 px-2.5 py-0.5 rounded-full mb-2 uppercase tracking-wide">
                    {selectedCourse.category.toUpperCase()} Certification
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                    {selectedCourse.title}
                  </h3>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8">
                {!showForm ? (
                  /* COURSE DETAILS MODE */
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-teal-600 mb-2">Overview</h4>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        {selectedCourse.fullDescription}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-4 border-y border-slate-100 text-sm">
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold text-slate-400 uppercase">Duration</span>
                        <span className="font-bold text-slate-800 mt-1 flex items-center gap-1.5">
                          <Clock className="h-4 w-4 text-teal-600" />
                          {selectedCourse.duration}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold text-slate-400 uppercase">Price & Mode</span>
                        <span className="font-bold text-slate-800 mt-1 flex items-center gap-1.5">
                          <DollarSign className="h-4 w-4 text-teal-600" />
                          {selectedCourse.price}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold text-slate-400 uppercase">Award</span>
                        <span className="font-bold text-slate-800 mt-1 flex items-center gap-1.5">
                          <Award className="h-4 w-4 text-teal-600" />
                          Certified
                        </span>
                      </div>
                    </div>

                    {/* Modules Checklist */}
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-teal-600 mb-3.5">Curriculum & Modules</h4>
                      <div className="space-y-2">
                        {selectedCourse.modules.map((mod, i) => (
                          <div key={i} className="flex items-start gap-3 bg-slate-50 p-3 rounded-lg border border-slate-100 text-xs sm:text-sm text-slate-700">
                            <span className="h-6 w-6 rounded-full bg-teal-100 text-teal-700 font-bold flex items-center justify-center flex-shrink-0 text-xs">
                              {i + 1}
                            </span>
                            <span className="font-medium pt-0.5">{mod}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Requirements and Gained Skills */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-teal-600 mb-3">Target Prerequisites</h4>
                        <ul className="space-y-1.5 text-xs text-slate-600 font-semibold">
                          {selectedCourse.requirements.map((req, i) => (
                            <li key={i} className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-teal-600 flex-shrink-0" />
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-teal-600 mb-3">Skills Acquired</h4>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedCourse.skillsGained.map((skill, i) => (
                            <span key={i} className="text-[10px] sm:text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200/50 px-2.5 py-1 rounded-md">
                              ✦ {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Cert Accreditation Banner */}
                    <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl flex items-center gap-3.5">
                      <Award className="h-10 w-10 text-amber-500 flex-shrink-0" />
                      <div>
                        <h5 className="text-xs font-bold text-slate-800">Accredited: {selectedCourse.certification}</h5>
                        <p className="text-slate-500 text-[11px] leading-relaxed mt-0.5">
                          Validates core competency in advanced reservations modeling, luxury client relationship flows, and multi-channel synchronization modules.
                        </p>
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-slate-100">
                      <button
                        onClick={() => {
                          setPreviewCourse(selectedCourse);
                          setSelectedCourse(null);
                        }}
                        className="w-full sm:flex-1 py-3 bg-teal-50 hover:bg-teal-100 text-teal-850 border border-teal-250 text-xs sm:text-sm font-extrabold rounded-full transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
                      >
                        <Sparkles className="h-4 w-4 text-teal-600 animate-pulse" />
                        Try Interactive Preview
                      </button>
                      <div className="w-full sm:flex-1 flex gap-3">
                        <button
                          onClick={handleCloseDetails}
                          className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-bold rounded-full transition-all cursor-pointer text-center"
                        >
                          Back
                        </button>
                        <button
                          onClick={() => setShowForm(true)}
                          className="flex-1 py-3 bg-teal-600 hover:bg-teal-700 text-white text-xs sm:text-sm font-bold rounded-full shadow-lg shadow-teal-600/20 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                        >
                          Enroll Now
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* ENROLLMENT FORM MODE */
                  <div>
                    {isSuccess ? (
                      <div className="text-center py-12 space-y-4">
                        <div className="h-16 w-16 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center mx-auto shadow-sm border border-teal-200">
                          <CheckCircle className="h-10 w-10" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800">Enrollment Application Registered!</h3>
                        <p className="text-slate-500 text-sm max-w-md mx-auto leading-relaxed">
                          Thank you for choosing CyberGraduates, <strong>{formData.name}</strong>. We have sent a confirmation details brochure and an onboarding credentials email to <strong>{formData.email}</strong>.
                        </p>
                        <div className="pt-6">
                          <button
                            onClick={handleCloseDetails}
                            className="px-6 py-2.5 bg-slate-900 text-white text-xs font-bold rounded-xl shadow cursor-pointer hover:bg-slate-800 transition-colors"
                          >
                            Close Panel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <form onSubmit={handleEnrollSubmit} className="space-y-5">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                          <h4 className="font-bold text-slate-800 text-base">
                            Enroll in: <span className="text-teal-600">{selectedCourse.title}</span>
                          </h4>
                          <button
                            type="button"
                            onClick={() => setShowForm(false)}
                            className="text-xs text-slate-400 hover:text-slate-600 font-semibold uppercase cursor-pointer"
                          >
                            ← Back to Details
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Your Full Name *</label>
                            <input
                              type="text"
                              required
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              placeholder="e.g. Lerato Modise"
                              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-800 font-semibold focus:outline-none focus:ring-1 focus:ring-teal-500"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Email Address *</label>
                            <input
                              type="email"
                              required
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              placeholder="lerato@hospitality.com"
                              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-800 font-semibold focus:outline-none focus:ring-1 focus:ring-teal-500"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Phone / WhatsApp Number *</label>
                            <input
                              type="tel"
                              required
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              placeholder="+267 71 234 567"
                              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-800 font-semibold focus:outline-none focus:ring-1 focus:ring-teal-500"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Company / Lodge Name (Optional)</label>
                            <input
                              type="text"
                              value={formData.company}
                              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                              placeholder="e.g. Chobe Game Lodge"
                              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-800 font-semibold focus:outline-none focus:ring-1 focus:ring-teal-500"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Experience in Booking Desk</label>
                          <select
                            value={formData.experience}
                            onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-800 font-semibold focus:outline-none focus:ring-1 focus:ring-teal-500"
                          >
                            <option value="beginner">None / Beginner (0-1 year)</option>
                            <option value="intermediate">Intermediate desk operator (1-3 years)</option>
                            <option value="expert">Senior / Reservation Manager (3+ years)</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Special Requirements / Message</label>
                          <textarea
                            rows={2}
                            value={formData.notes}
                            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                            placeholder="Tell us if you need corporate invoice support or hybrid schedules."
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-800 font-semibold focus:outline-none focus:ring-1 focus:ring-teal-500"
                          />
                        </div>

                        <div className="bg-amber-50/50 border border-amber-200/40 p-3 rounded-lg text-[10px] text-amber-800 font-medium leading-relaxed">
                          Note: Enrollment is fully simulated. After clicking Submit, our systems will validate the input formats and simulate a successful student credentials provisioning email.
                        </div>

                        <div className="flex items-center gap-3 pt-3">
                          <button
                            type="button"
                            onClick={() => setShowForm(false)}
                            className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-full transition-all cursor-pointer"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1 py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-full shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center justify-center gap-1.5 disabled:opacity-50 cursor-pointer"
                          >
                            {isSubmitting ? "Processing..." : "Complete Enrollment"}
                            <Send className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

        {previewCourse && (
          <CoursePreviewModal
            course={previewCourse}
            onClose={() => setPreviewCourse(null)}
            onOpenEnroll={() => {
              setPreviewCourse(null);
              setSelectedCourse(previewCourse);
              setShowForm(true);
            }}
          />
        )}

      </div>
    </section>
  );
}
