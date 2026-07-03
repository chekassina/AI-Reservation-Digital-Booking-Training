import React, { useState } from "react";
import { Sparkles, Menu, X, BookOpen, MessageCircle, Search } from "lucide-react";

interface HeaderProps {
  currentTab: string;
  setTab: (tab: string) => void;
  onOpenEnroll: () => void;
  courseSearchQuery: string;
  setCourseSearchQuery: (query: string) => void;
}

export default function Header({
  currentTab,
  setTab,
  onOpenEnroll,
  courseSearchQuery,
  setCourseSearchQuery,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showQuickSearch, setShowQuickSearch] = useState(false);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "courses", label: "Courses" },
    { id: "trainer", label: "AI Trainer" },
    { id: "corporate", label: "Corporate Training" },
    { id: "resources", label: "AI Prompts & Guides" },
    { id: "blog", label: "Blog" },
    { id: "faq", label: "FAQ" },
    { id: "contact", label: "Contact" },
  ];

  const handleNavClick = (tabId: string) => {
    setTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/50 bg-white/70 backdrop-blur-md shadow-sm">
      <div className="mx-auto flex max-w-7xl h-18 items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo / Branding */}
        <button
          onClick={() => handleNavClick("home")}
          className="flex items-center gap-2.5 text-left focus:outline-none group cursor-pointer"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-600 text-white font-bold text-xl shadow-lg shadow-teal-600/20 group-hover:scale-105 transition-transform duration-200">
            C
          </div>
          <div>
            <span className="block font-sans text-base font-bold tracking-tight text-slate-900 leading-none">
              CYBER <span className="text-teal-600">GRADUATES</span>
            </span>
            <span className="block text-[10px] font-bold uppercase tracking-widest text-teal-600 leading-normal mt-0.5">
              AI & Digital Booking Training
            </span>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all duration-150 cursor-pointer ${
                currentTab === item.id
                  ? "text-teal-700 bg-white/85 border border-white/50 shadow-xs"
                  : "text-slate-650 hover:text-teal-700 hover:bg-white/40"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* CTAs / Quick Search */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Quick search button */}
          <div className="relative">
            {showQuickSearch ? (
              <div className="flex items-center bg-white/60 backdrop-blur-sm border border-slate-250/30 rounded-full px-3 py-1.5 w-60 animate-fade-in">
                <Search className="h-4.5 w-4.5 text-slate-400 mr-2" />
                <input
                  type="text"
                  placeholder="Search reservation courses..."
                  value={courseSearchQuery}
                  onChange={(e) => {
                    setCourseSearchQuery(e.target.value);
                    if (currentTab !== "courses") setTab("courses");
                  }}
                  className="bg-transparent text-xs w-full focus:outline-none text-slate-700"
                  autoFocus
                />
                <button
                  onClick={() => {
                    setShowQuickSearch(false);
                    setCourseSearchQuery("");
                  }}
                  className="text-slate-400 hover:text-slate-600 ml-1 cursor-pointer"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowQuickSearch(true)}
                className="p-2 text-slate-700 hover:bg-white/40 rounded-full cursor-pointer transition-colors"
                title="Search Courses"
              >
                <Search className="h-5 w-5" />
              </button>
            )}
          </div>

          <button
            onClick={() => handleNavClick("trainer")}
            className="flex items-center gap-1.5 px-4.5 py-2 border border-white/50 text-teal-800 text-xs font-bold rounded-full hover:bg-white/90 transition-all cursor-pointer bg-white/50 backdrop-blur-sm shadow-xs"
          >
            <MessageCircle className="h-4 w-4 text-teal-600" />
            AI Trainer
          </button>

          <button
            onClick={onOpenEnroll}
            className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-full text-xs font-bold shadow-lg shadow-teal-600/20 transition-all hover:scale-102 active:scale-98 cursor-pointer"
          >
            Enroll Now
          </button>
        </div>

        {/* Mobile menu trigger / quick search */}
        <div className="flex items-center gap-2.5 lg:hidden">
          <button
            onClick={() => {
              setTab("courses");
              setShowQuickSearch(true);
            }}
            className="p-2 text-slate-600 hover:bg-slate-50 rounded-lg cursor-pointer"
          >
            <Search className="h-5 w-5" />
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-blue-950 hover:bg-slate-50 rounded-lg cursor-pointer"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white/95 backdrop-blur-md px-4 py-4 space-y-2.5 shadow-lg animate-slide-down">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`block w-full text-left px-4 py-2.5 text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
                currentTab === item.id
                  ? "text-teal-700 bg-teal-50"
                  : "text-blue-950/80 hover:text-teal-700 hover:bg-slate-50"
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => handleNavClick("trainer")}
              className="flex items-center justify-center gap-2 w-full py-2.5 border border-teal-600/30 text-teal-800 text-sm font-bold rounded-lg hover:bg-teal-50"
            >
              <MessageCircle className="h-4.5 w-4.5 text-teal-600" />
              Practice with AI Trainer
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenEnroll();
              }}
              className="w-full py-3 bg-gradient-to-r from-teal-600 to-blue-950 text-white text-center text-sm font-bold rounded-lg shadow-md hover:brightness-105 active:scale-95 transition-all"
            >
              Enroll in Courses
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
