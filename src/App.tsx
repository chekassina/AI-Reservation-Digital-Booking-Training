import React, { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import WhyCyber from "./components/WhyCyber";
import ReservationTeam from "./components/ReservationTeam";
import CoursesGrid from "./components/CoursesGrid";
import TrainerWidget from "./components/TrainerWidget";
import PromptGenerator from "./components/PromptGenerator";
import CorporateQuote from "./components/CorporateQuote";
import FAQWidget from "./components/FAQWidget";
import Footer from "./components/Footer";
import WhyAIHospitality from "./components/WhyAIHospitality";
import { TESTIMONIALS, BLOGS } from "./data";
import { BlogPost, Course } from "./types";
import { 
  Award, Sparkles, MessageSquare, ShieldCheck, Mail, Phone, MapPin, 
  BookOpen, Star, HelpCircle, ArrowRight, CheckCircle, FileText, Send, X, 
  TrendingUp, Download, Compass, Smartphone, Monitor, ChevronRight
} from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("home");
  const [courseSearch, setCourseSearch] = useState<string>("");

  // Global Enrollment Modal State
  const [globalEnrollOpen, setGlobalEnrollOpen] = useState(false);
  const [globalEnrollSuccess, setGlobalEnrollSuccess] = useState(false);
  const [globalEnrollData, setGlobalEnrollData] = useState({
    name: "",
    email: "",
    phone: "",
    courseId: "ai-res"
  });

  // Blog modal state
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);

  // Floating WhatsApp State
  const [whatsAppOpen, setWhatsAppOpen] = useState(false);
  const [whatsAppMsg, setWhatsAppMsg] = useState("");
  const [whatsAppHistory, setWhatsAppHistory] = useState<Array<{ sender: "user" | "bot"; text: string }>>([
    { sender: "bot", text: "Hello! Welcome to CyberGraduates Academy Support. Ask us anything about our AI reservations and PMS training! 🏨💡" }
  ]);

  const handleGlobalEnroll = (e: React.FormEvent) => {
    e.preventDefault();
    setGlobalEnrollSuccess(true);
    setTimeout(() => {
      setGlobalEnrollOpen(false);
      setGlobalEnrollSuccess(false);
      setGlobalEnrollData({ name: "", email: "", phone: "", courseId: "ai-res" });
    }, 3500);
  };

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!whatsAppMsg.trim()) return;

    const userText = whatsAppMsg;
    setWhatsAppHistory((prev) => [...prev, { sender: "user", text: userText }]);
    setWhatsAppMsg("");

    setTimeout(() => {
      let botReply = "That sounds fantastic! We offer practical, hand-on simulations of PMS and CRS engines. To get started, you can click on the 'Courses' tab on our website, or schedule a free live chat with our AI Trainer! 🌟";
      const textLower = userText.toLowerCase();

      if (textLower.includes("price") || textLower.includes("cost") || textLower.includes("fee")) {
        botReply = "Our courses start from just $199 USD and we offer accredited certifications with lifetime online access! Check our 'Courses' tab for detailed module breakdowns.";
      } else if (textLower.includes("certificate") || textLower.includes("accred")) {
        botReply = "Yes, absolutely! On graduating any course, you receive an Accredited Hospitality AI Specialist or PMS Operator Certificate widely accepted by global luxury resorts and Safari camps.";
      } else if (textLower.includes("safari") || textLower.includes("camp") || textLower.includes("lodge")) {
        botReply = "We specialize in safari lodge reservation training! Many of our graduates work at premier lodges in Botswana, South Africa, and Kenya. Our CRS and Guest CRM modules are perfect for wilderness operations.";
      } else if (textLower.includes("ai") || textLower.includes("gemini") || textLower.includes("chatgpt")) {
        botReply = "Our AI modules are highly interactive! You can even try our live 'AI Trainer' sandbox right here on the website to practice de-escalating angry reservation scenarios. Click 'AI Trainer' in our navigation bar.";
      }

      setWhatsAppHistory((prev) => [...prev, { sender: "bot", text: botReply }]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col antialiased selection:bg-teal-500 selection:text-white relative overflow-hidden">
      
      {/* Ambient Gradient Background Accents for Frosted Glass feel */}
      <div className="absolute top-[-5%] right-[-10%] w-[600px] h-[600px] bg-teal-200/35 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute top-[25%] left-[-10%] w-[500px] h-[500px] bg-blue-200/30 rounded-full blur-[110px] pointer-events-none z-0"></div>
      <div className="absolute bottom-[35%] right-[-5%] w-[600px] h-[600px] bg-teal-150/30 rounded-full blur-[130px] pointer-events-none z-0"></div>
      <div className="absolute bottom-[5%] left-[-5%] w-[500px] h-[500px] bg-indigo-150/25 rounded-full blur-[100px] pointer-events-none z-0"></div>
      
      {/* HEADER SECTION */}
      <Header
        currentTab={activeTab}
        setTab={setActiveTab}
        onOpenEnroll={() => setGlobalEnrollOpen(true)}
        courseSearchQuery={courseSearch}
        setCourseSearchQuery={setCourseSearch}
      />

      {/* DYNAMIC TAB BODY */}
      <main className="flex-1">
        
        {activeTab === "home" && (
          <div className="animate-fade-in">
            {/* HERO PANEL */}
            <Hero
              onStartLearning={() => {
                setActiveTab("courses");
                setTimeout(() => {
                  document.getElementById("courses-section")?.scrollIntoView({ behavior: "smooth" });
                }, 100);
              }}
              onViewCourses={() => setActiveTab("courses")}
              searchQuery={courseSearch}
              setSearchQuery={(q) => {
                setCourseSearch(q);
                setActiveTab("courses");
              }}
            />

            {/* RESERVATION TEAM WORK ENERGY SECTION */}
            <ReservationTeam
              onLearnMore={() => {
                setActiveTab("courses");
                setTimeout(() => {
                  document.getElementById("courses-section")?.scrollIntoView({ behavior: "smooth" });
                }, 100);
              }}
            />

            {/* WHY CYBERGRADUATES SECTION */}
            <WhyCyber />

            {/* STATISTICS OVERVIEW SECTION */}
            <section className="py-16 bg-gradient-to-r from-blue-950 to-teal-900 text-white shadow-inner">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                  <div className="space-y-2">
                    <span className="block text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">
                      98%
                    </span>
                    <span className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-teal-300">
                      Student Satisfaction
                    </span>
                  </div>
                  <div className="space-y-2 font-sans">
                    <span className="block text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">
                      500+
                    </span>
                    <span className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-teal-300">
                      Professionals Trained
                    </span>
                  </div>
                  <div className="space-y-2">
                    <span className="block text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">
                      100%
                    </span>
                    <span className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-teal-300">
                      Practical Skills
                    </span>
                  </div>
                  <div className="space-y-2">
                    <span className="block text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">
                      24/7
                    </span>
                    <span className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-teal-300">
                      Online Sandbox Access
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* WHY AI IN HOSPITALITY SECTION */}
            <WhyAIHospitality
              onViewBlog={() => {
                setActiveTab("blog");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              onViewAICourses={() => {
                setActiveTab("courses");
                setCourseSearch("AI");
                setTimeout(() => {
                  document.getElementById("courses-section")?.scrollIntoView({ behavior: "smooth" });
                }, 150);
              }}
            />

            {/* CURRICULUMS CARD SECTION (PREVIEW FILTERABLE) */}
            <CoursesGrid
              searchQuery={courseSearch}
              setSearchQuery={setCourseSearch}
              enrollmentOpen={globalEnrollOpen}
              onOpenEnroll={() => setGlobalEnrollOpen(true)}
            />

            {/* LEARNING MODES PANEL */}
            <section className="py-20 sm:py-24 bg-white border-y border-slate-100">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-16">
                  <h2 className="text-3xl font-extrabold text-blue-950 tracking-tight mb-4">Flexible Learning Modalities</h2>
                  <p className="text-slate-600 text-sm">We provide options tailored for individual professionals and large enterprise lodge chains.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {[
                    { title: "Self-Paced Training", desc: "Gain certifications at your own cadence. Study 100% online with 12 months access.", action: "View Catalog" },
                    { title: "Corporate Groups", desc: "For resorts, safari lodges, or travel agencies needing private billing files.", action: "Request Quote" },
                    { title: "Live Workshops", desc: "Interact directly with luxury booking consultants in intensive weekend labs.", action: "Contact Admissions" },
                    { title: "Custom On-Site", desc: "Physical operational audits and on-site PMS setup for hospitality groups.", action: "Request Quote" }
                  ].map((mode, i) => (
                    <div key={i} className="bg-slate-50 border border-slate-100 p-7 rounded-2xl hover:border-teal-500 hover:shadow-sm transition-all duration-300 flex flex-col justify-between">
                      <div>
                        <h3 className="font-bold text-slate-800 text-base mb-3">{mode.title}</h3>
                        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">{mode.desc}</p>
                      </div>
                      <button
                        onClick={() => {
                          if (mode.action === "Request Quote") setActiveTab("corporate");
                          else if (mode.action === "Contact Admissions") setActiveTab("contact");
                          else setActiveTab("courses");
                        }}
                        className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 hover:text-teal-800 cursor-pointer self-start"
                      >
                        {mode.action}
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* WHO SHOULD ENROLL GRID */}
            <section className="py-20 bg-slate-50">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-16">
                  <h2 className="text-3xl font-extrabold text-blue-950 tracking-tight mb-3">Who Should Enroll?</h2>
                  <p className="text-slate-600 text-sm">CyberGraduates modules are engineered specifically for high-growth sectors.</p>
                </div>

                <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
                  {[
                    "Reservation Consultants", "Hotel Front Office Staff", "Travel Agency Consultants",
                    "Tour Operators", "Hospitality Revenue Managers", "Safari Lodge Operators",
                    "Government Tourism Officers", "Camp Coordinators", "Guest Relation Leads", "Sales Teams"
                  ].map((role, i) => (
                    <div key={i} className="bg-white border border-slate-200/60 px-5 py-3.5 rounded-xl shadow-sm text-xs sm:text-sm font-bold text-slate-700 hover:border-teal-500 transition-colors">
                      ✦ {role}
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* SUCCESS STORIES SECTION */}
            <section className="py-20 sm:py-24 bg-white border-t border-slate-100">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-16">
                  <h2 className="text-3xl font-extrabold text-blue-950 tracking-tight mb-4">Student Success Stories</h2>
                  <p className="text-slate-600 text-sm">See how reservation consultants are scaling their daily operations with our certifications.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {TESTIMONIALS.map((test) => (
                    <div key={test.id} className="bg-slate-50 border border-slate-100 p-6.5 rounded-2xl flex flex-col justify-between hover:shadow-sm transition-all">
                      <div className="space-y-4">
                        {/* Rating stars */}
                        <div className="flex gap-1">
                          {[...Array(test.stars)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed italic">
                          "{test.quote}"
                        </p>
                      </div>

                      <div className="flex items-center gap-3 pt-6 border-t border-slate-100 mt-6">
                        <img
                          src={test.avatar}
                          alt={test.name}
                          referrerPolicy="no-referrer"
                          className="h-10 w-10 rounded-full object-cover border border-slate-200"
                        />
                        <div>
                          <span className="block font-bold text-xs text-slate-800 leading-none">{test.name}</span>
                          <span className="block text-[10px] text-slate-500 mt-1">{test.role}</span>
                          <span className="block text-[9px] font-semibold text-teal-600 mt-0.5">{test.location}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* CALL TO ACTION BANNER */}
            <section className="py-20 bg-gradient-to-r from-teal-700 to-blue-950 text-white shadow-xl">
              <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
                <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
                  Ready to Future-Proof Your Booking Career?
                </h2>
                <p className="text-slate-200 text-base max-w-2xl mx-auto leading-relaxed">
                  Join thousands of tourism and resort professionals embracing automated AI reservation flows, PMS sandboxes, and rate parities.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => setGlobalEnrollOpen(true)}
                    className="px-8 py-4 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm sm:text-base rounded-xl shadow-lg transition-all active:scale-95 cursor-pointer"
                  >
                    Enroll Today & Begin Practicing
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* 2. COURSES TAB */}
        {activeTab === "courses" && (
          <CoursesGrid
            searchQuery={courseSearch}
            setSearchQuery={setCourseSearch}
            enrollmentOpen={globalEnrollOpen}
            onOpenEnroll={() => setGlobalEnrollOpen(true)}
          />
        )}

        {/* 3. AI TRAINER TAB */}
        {activeTab === "trainer" && (
          <div className="animate-fade-in">
            <TrainerWidget />
          </div>
        )}

        {/* 4. CORPORATE TRAINING TAB */}
        {activeTab === "corporate" && (
          <div className="animate-fade-in">
            <CorporateQuote />
          </div>
        )}

        {/* 5. AI PROMPTS & RESOURCES TAB */}
        {activeTab === "resources" && (
          <div className="animate-fade-in">
            {/* Heading */}
            <div className="py-12 bg-slate-50 border-b border-slate-100 text-center px-4">
              <h1 className="text-3xl font-extrabold text-blue-950 tracking-tight mb-3">
                Hospitality AI Prompts & Resources
              </h1>
              <p className="text-slate-600 text-sm max-w-2xl mx-auto">
                Access interactive copy-to-clipboard prompt compilers, check-out checklists, and free downloads designed for professional reservation agents.
              </p>
            </div>

            {/* Prompt Generator Compiler */}
            <PromptGenerator />

            {/* Free Templates Downloads list */}
            <section className="py-20 bg-slate-50">
              <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                  <h3 className="text-xl font-bold text-blue-950 mb-2">Free Operational Downloads</h3>
                  <p className="text-slate-500 text-xs sm:text-sm">Download templates and cheatsheets to pin onto your front-desk monitors.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {[
                    { title: "Standard Email Templates Booklet", type: "PDF Guide", size: "2.4 MB" },
                    { title: "Overbooking Escalation Checklist", type: "Word Cheatsheet", size: "450 KB" },
                    { title: "Cloud PMS Keyboard Shortcuts", type: "Ready-to-Print poster", size: "1.2 MB" },
                  ].map((res, i) => (
                    <div key={i} className="bg-white border border-slate-100 p-6 rounded-2xl flex items-center justify-between shadow-sm">
                      <div className="space-y-1">
                        <span className="block text-[9px] font-extrabold text-teal-600 uppercase tracking-widest">{res.type}</span>
                        <h4 className="font-bold text-slate-800 text-sm">{res.title}</h4>
                        <span className="block text-[10px] text-slate-400">{res.size}</span>
                      </div>
                      <button
                        onClick={() => alert(`Simulating download of: ${res.title}. The system generated document is sent to your email.`)}
                        className="p-3 bg-slate-50 hover:bg-slate-100 rounded-xl text-teal-700 cursor-pointer transition-colors"
                        title="Download Template"
                      >
                        <Download className="h-5 w-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}

        {/* 6. BLOG TAB */}
        {activeTab === "blog" && (
          <div className="animate-fade-in py-16 sm:py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-2xl mx-auto mb-16">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-950 tracking-tight mb-4">
                  CyberGraduates Hospitality Blog
                </h1>
                <p className="text-slate-600 text-sm">
                  Stay updated with technical summaries of global travel parities, PMS, and AI integrations.
                </p>
              </div>

              {/* Grid of articles */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {BLOGS.map((blog) => (
                  <div
                    key={blog.id}
                    className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col h-full group"
                  >
                    <div className="h-48 overflow-hidden bg-slate-100">
                      <img
                        src={blog.image}
                        alt={blog.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6.5 flex flex-col flex-1">
                      <div className="flex items-center gap-3 text-[10px] text-teal-600 font-extrabold uppercase tracking-widest mb-3">
                        <span>{blog.category}</span>
                        <span>•</span>
                        <span>{blog.readTime}</span>
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-teal-700 transition-colors mb-3 leading-snug line-clamp-2">
                        {blog.title}
                      </h3>
                      <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-6 line-clamp-3 flex-1">
                        {blog.summary}
                      </p>
                      <button
                        onClick={() => setSelectedBlog(blog)}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-950 hover:text-teal-700 cursor-pointer self-start"
                      >
                        Read Full Article
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 7. FAQ TAB */}
        {activeTab === "faq" && (
          <div className="animate-fade-in">
            <FAQWidget />
          </div>
        )}

        {/* 8. CONTACT TAB */}
        {activeTab === "contact" && (
          <div className="animate-fade-in py-16 sm:py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                {/* Left side info */}
                <div className="lg:col-span-5 space-y-6">
                  <div>
                    <h1 className="text-3xl font-extrabold text-blue-950 tracking-tight leading-none mb-3">
                      Get In Touch
                    </h1>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Have questions about our syllabus options, customized hotel pricing, or enrollment policies? Our support team is active 24/7.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-4 p-4.5 bg-white border border-slate-100 rounded-2xl shadow-sm">
                      <Mail className="h-6 w-6 text-teal-600 flex-shrink-0" />
                      <div>
                        <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide">Email Admissions</span>
                        <a href="mailto:admissions@cybergraduates.com" className="font-bold text-xs sm:text-sm text-slate-800 hover:text-teal-700">
                          admissions@cybergraduates.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-4.5 bg-white border border-slate-100 rounded-2xl shadow-sm">
                      <Phone className="h-6 w-6 text-teal-600 flex-shrink-0" />
                      <div>
                        <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide">Phone / WhatsApp</span>
                        <span className="font-bold text-xs sm:text-sm text-slate-800">
                          +27 21 555 4321
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-4.5 bg-white border border-slate-100 rounded-2xl shadow-sm">
                      <MapPin className="h-6 w-6 text-teal-600 flex-shrink-0" />
                      <div>
                        <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide">Admissions HQ Office</span>
                        <span className="font-bold text-xs sm:text-sm text-slate-800 leading-snug block mt-0.5">
                          CyberGraduates Labs, Waterfront Drive, Cape Town, South Africa
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Mock Map Panel */}
                  <div className="border border-slate-200 rounded-2xl overflow-hidden h-44 relative bg-slate-100 shadow-sm">
                    {/* Visual pattern of map representation */}
                    <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-70" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                      <MapPin className="h-8 w-8 text-rose-500 animate-bounce mb-1" />
                      <span className="text-xs font-bold text-slate-800">Interactive Location Map</span>
                      <span className="text-[10px] text-slate-500 mt-0.5">Waterfront Hub, South Africa</span>
                    </div>
                  </div>
                </div>

                {/* Right side Form */}
                <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6">
                  <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-3">Send Us a Direct Message</h3>
                  
                  <form onSubmit={(e) => { e.preventDefault(); alert("Form submitted successfully! Admissions will review and reply within 120 minutes."); }} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Your Name</label>
                        <input type="text" required placeholder="e.g. Lerato" className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-teal-500 text-slate-800 font-semibold" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Email Address</label>
                        <input type="email" required placeholder="name@domain.com" className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-teal-500 text-slate-800 font-semibold" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Subject</label>
                      <input type="text" required placeholder="Admissions questions" className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-teal-500 text-slate-800 font-semibold" />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Your Message</label>
                      <textarea rows={4} required placeholder="Tell us about your team size, lodge operations, or career goals..." className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-teal-500 text-slate-800 font-semibold" />
                    </div>

                    <button type="submit" className="w-full py-3 bg-blue-950 hover:bg-blue-900 text-white font-bold text-xs rounded-xl shadow cursor-pointer transition-colors text-center">
                      Submit Message
                    </button>
                  </form>
                </div>
              </div>

            </div>
          </div>
        )}

      </main>

      {/* FOOTER SECTION */}
      <Footer setTab={setActiveTab} />

      {/* FLOATERS AND MODALS */}

      {/* FLOATING WHATSAPP CHAT MODULE */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
        
        {/* Chat box container */}
        {whatsAppOpen && (
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 w-80 sm:w-85 overflow-hidden flex flex-col h-100 mb-3.5 animate-scale-in">
            {/* WhatsApp Header */}
            <div className="bg-teal-700 text-white p-4 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <div className="h-10 w-10 bg-teal-900/40 border border-white/20 rounded-full flex items-center justify-center font-bold">
                    CG
                  </div>
                  <span className="absolute bottom-0 right-0 h-3 w-3 bg-emerald-400 border-2 border-teal-700 rounded-full" />
                </div>
                <div>
                  <span className="block font-bold text-sm">Admissions Advisor</span>
                  <span className="block text-[10px] text-teal-100">Typically replies instantly</span>
                </div>
              </div>
              <button
                onClick={() => setWhatsAppOpen(false)}
                className="text-teal-100 hover:text-white p-1 hover:bg-teal-800 rounded-full transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Message Feed */}
            <div className="flex-1 bg-teal-50/20 overflow-y-auto p-4 space-y-3 font-sans">
              {whatsAppHistory.map((item, i) => (
                <div
                  key={i}
                  className={`p-3 text-xs leading-relaxed rounded-xl max-w-[85%] ${
                    item.sender === "user"
                      ? "bg-teal-600 text-white ml-auto rounded-tr-none"
                      : "bg-white border border-slate-100 text-slate-800 mr-auto rounded-tl-none shadow-sm"
                  }`}
                >
                  <p className="font-semibold">{item.text}</p>
                </div>
              ))}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSendWhatsApp} className="p-3 border-t border-slate-100 bg-white flex gap-2">
              <input
                type="text"
                value={whatsAppMsg}
                onChange={(e) => setWhatsAppMsg(e.target.value)}
                placeholder="Type your question..."
                className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-xs text-slate-800 font-semibold focus:outline-none focus:ring-1 focus:ring-teal-600"
              />
              <button
                type="submit"
                className="p-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-lg shadow cursor-pointer transition-colors flex items-center justify-center"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        )}

        {/* Action Button */}
        <button
          onClick={() => setWhatsAppOpen(!whatsAppOpen)}
          className="h-14 w-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all cursor-pointer relative"
          title="WhatsApp admissions advisor"
        >
          <MessageSquare className="h-6.5 w-6.5" />
          <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full animate-ping" />
        </button>

      </div>

      {/* GLOBAL ENROLLMENT DIALOG */}
      {globalEnrollOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl overflow-hidden max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative animate-scale-in">
            <button
              onClick={() => setGlobalEnrollOpen(false)}
              className="absolute top-4 right-4 h-8.5 w-8.5 bg-slate-50 text-slate-400 hover:text-slate-600 hover:bg-slate-100 flex items-center justify-center rounded-full transition-colors cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>

            {globalEnrollSuccess ? (
              <div className="text-center py-8 space-y-4">
                <div className="h-14 w-14 bg-teal-100 text-teal-600 border border-teal-200 rounded-full flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-800">Enrollment Active!</h3>
                <p className="text-slate-500 text-xs sm:text-sm max-w-sm mx-auto leading-relaxed">
                  Excellent, <strong>{globalEnrollData.name}</strong>. Your entry reservation has been mapped successfully. Checklist credentials has been dispatched to <strong>{globalEnrollData.email}</strong>.
                </p>
              </div>
            ) : (
              <form onSubmit={handleGlobalEnroll} className="space-y-4">
                <div className="border-b border-slate-100 pb-3 mb-2 flex items-center gap-2">
                  <Award className="h-5 w-5 text-teal-600" />
                  <h3 className="font-bold text-slate-800 text-base">Academy Quick Enrollment</h3>
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-slate-500 uppercase">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={globalEnrollData.name}
                    onChange={(e) => setGlobalEnrollData({ ...globalEnrollData, name: e.target.value })}
                    placeholder="e.g. Lerato Modise"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-800 font-semibold focus:outline-none focus:ring-1 focus:ring-teal-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-slate-500 uppercase">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={globalEnrollData.email}
                    onChange={(e) => setGlobalEnrollData({ ...globalEnrollData, email: e.target.value })}
                    placeholder="lerato@domain.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-800 font-semibold focus:outline-none focus:ring-1 focus:ring-teal-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-slate-500 uppercase">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={globalEnrollData.phone}
                    onChange={(e) => setGlobalEnrollData({ ...globalEnrollData, phone: e.target.value })}
                    placeholder="+27 71 234 567"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-800 font-semibold focus:outline-none focus:ring-1 focus:ring-teal-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-slate-500 uppercase">Select Course Path</label>
                  <select
                    value={globalEnrollData.courseId}
                    onChange={(e) => setGlobalEnrollData({ ...globalEnrollData, courseId: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-800 font-semibold focus:outline-none focus:ring-1 focus:ring-teal-500"
                  >
                    <option value="ai-res">AI for Reservation Professionals ($299)</option>
                    <option value="pms-mastery">Property Management Systems ($349)</option>
                    <option value="crs-distribution">Central Reservation Systems ($399)</option>
                    <option value="booking-engines">Online Booking Engines ($249)</option>
                    <option value="channel-managers">Channel Managers & OTA parities ($299)</option>
                    <option value="crm-guest">Customer CRM Loyalty ($279)</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-md active:scale-95 transition-all text-center cursor-pointer"
                >
                  Activate License
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* BLOG POST ARTICLE READING MODAL */}
      {selectedBlog && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl overflow-hidden max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative max-h-[85vh] overflow-y-auto animate-scale-in">
            <button
              onClick={() => setSelectedBlog(null)}
              className="absolute top-4 right-4 h-8.5 w-8.5 bg-slate-50 text-slate-400 hover:text-slate-600 hover:bg-slate-100 flex items-center justify-center rounded-full transition-colors cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="space-y-5">
              <span className="inline-block text-[10px] font-bold bg-teal-50 text-teal-700 border border-teal-200/50 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                {selectedBlog.category}
              </span>

              <h3 className="text-xl font-bold text-slate-900 leading-snug">
                {selectedBlog.title}
              </h3>

              <div className="flex items-center gap-2 text-xs text-slate-400 font-semibold">
                <span>By {selectedBlog.author}</span>
                <span>•</span>
                <span>{selectedBlog.date}</span>
              </div>

              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed whitespace-pre-line font-medium border-t border-slate-100 pt-4">
                {selectedBlog.content}
              </p>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-center gap-3">
                <div className="h-9 w-9 bg-teal-500/10 text-teal-600 rounded-full flex items-center justify-center font-bold text-sm">
                  CG
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800">Learn directly in our Academy</h4>
                  <p className="text-slate-500 text-[10px] leading-relaxed mt-0.5">
                    This article is part of our standard <strong>"AI for Reservation Professionals"</strong> curriculum.
                  </p>
                </div>
              </div>

              <div className="pt-3">
                <button
                  onClick={() => setSelectedBlog(null)}
                  className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors text-center cursor-pointer"
                >
                  Close Article
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
