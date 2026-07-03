import React, { useState, useEffect, useRef } from "react";
import { Sparkles, ArrowRight, Play, Pause, Search, ShieldCheck, Volume2, VolumeX, ChevronRight, ChevronLeft, Image as ImageIcon, Video, Award, RefreshCw } from "lucide-react";

interface HeroProps {
  onStartLearning: () => void;
  onViewCourses: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const VIDEO_CHAPTERS = [
  {
    title: "01. Meet Your Coach",
    duration: "45s",
    narration: "Hello and welcome to CyberGraduates! I'm your Lead Hospitality Guide. In this masterclass, we will train your team on integrating generative AI, Property Management Systems, and CRM nodes to elevate guest bookings and convert corporate portfolios 4x faster.",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=800",
    badge: "EXECUTIVE WELCOME"
  },
  {
    title: "02. PMS Sandbox",
    duration: "45s",
    narration: "Master industry-leading Property Management Systems. Our interactive sandboxes let you practice check-ins, resolve double-bookings, balance room folios, and coordinate real-time housekeeping schedules with absolute zero-risk.",
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=800",
    badge: "PMS SYSTEMS PRACTICE"
  },
  {
    title: "03. GenAI Prompting",
    duration: "60s",
    narration: "Prompt engineering is the modern hospitality superpower. Learn how to feed Google Gemini or ChatGPT structured brand metrics to instantly respond to guest emails, handle negative reviews, and draft custom luxury itineraries in over 20 languages.",
    image: "https://images.unsplash.com/photo-1493612276216-ee3925520721?auto=format&fit=crop&q=80&w=800",
    badge: "AI LAB & FORMULAS"
  },
  {
    title: "04. Earn Certification",
    duration: "45s",
    narration: "Graduates unlock the prestigious CHAS Accredited Certification. Join hundreds of students across South Africa, Kenya, and Botswana who have secured promotions, reduced reservation lead times, and eliminated booking error rates.",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=800",
    badge: "CHAS ACCREDITATION"
  }
];

const GALLERY_PHOTOS = [
  {
    url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800",
    caption: "Our modern training facility hotel front desk setup."
  },
  {
    url: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=800",
    caption: "Preparing travel itineraries for premium African Safari Lodges."
  },
  {
    url: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=800",
    caption: "Graduation ceremony celebrating our CHAS accredited hospitality experts."
  }
];

export default function Hero({
  onStartLearning,
  onViewCourses,
  searchQuery,
  setSearchQuery,
}: HeroProps) {
  // Multimedia states
  const [activeMode, setActiveMode] = useState<"video" | "gallery">("video");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentChapter, setCurrentChapter] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<1 | 1.5 | 2>(1);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [waves, setWaves] = useState<number[]>([15, 30, 45, 10, 25, 40, 20, 35]);

  // Handle simulated video playback progress
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isPlaying && activeMode === "video") {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            // Move to next chapter or loop
            setCurrentChapter((ch) => (ch + 1) % VIDEO_CHAPTERS.length);
            return 0;
          }
          return prev + 1.5 * playbackSpeed;
        });

        // Animate audio waves
        setWaves(Array.from({ length: 8 }, () => Math.floor(Math.random() * 35) + 10));
      }, 100);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, playbackSpeed, activeMode]);

  // Reset video progress if chapter changes manually
  const handleChapterSelect = (idx: number) => {
    setCurrentChapter(idx);
    setProgress(0);
    setIsPlaying(true);
  };

  const handlePrevChapter = () => {
    setCurrentChapter((ch) => (ch === 0 ? VIDEO_CHAPTERS.length - 1 : ch - 1));
    setProgress(0);
  };

  const handleNextChapter = () => {
    setCurrentChapter((ch) => (ch + 1) % VIDEO_CHAPTERS.length);
    setProgress(0);
  };

  const currentChData = VIDEO_CHAPTERS[currentChapter];

  return (
    <section id="hero" className="relative min-h-[95vh] flex items-center justify-center overflow-hidden bg-slate-950 text-white">
      {/* Background Image with Blur & Deep Gradient Overlays */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/cyber_graduates_hero_1783109438609.jpg"
          alt="CyberGraduates AI Reservation Hub"
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover object-center opacity-30 scale-105 transform transition duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950 via-blue-950/95 to-teal-950/80 z-10" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-slate-950 to-transparent z-10" />
      </div>

      <div className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Heading and CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Animated Badge */}
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-teal-500/15 border border-teal-500/30 text-teal-300 text-xs font-semibold tracking-wider uppercase mb-6 shadow-sm animate-fade-in">
              <Sparkles className="h-3.5 w-3.5 text-amber-400 animate-spin-slow" />
              Accredited AI Reservation Academy
            </div>

            {/* Main Heading */}
            <h1 className="font-sans text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-white leading-[1.15] mb-5 animate-fade-in">
              Future-Proof Your Reservation Career with <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-emerald-400 to-amber-300">AI & Digital Booking</span> Technologies
            </h1>

            {/* Sub Heading */}
            <p className="max-w-xl text-sm sm:text-base lg:text-lg text-slate-200/90 font-medium leading-relaxed mb-8 animate-fade-in">
              Empower your hospitality career with hands-on training in AI guest management, Property Management Systems (PMS), online booking engines, and dynamic channel routing.
            </p>

            {/* Interactive Search Bar */}
            <div className="w-full max-w-xl bg-white/10 backdrop-blur-md p-1.5 rounded-2xl border border-white/20 shadow-xl mb-8 flex flex-col sm:flex-row gap-2">
              <div className="flex-1 flex items-center bg-white rounded-xl px-4 py-2">
                <Search className="h-4.5 w-4.5 text-slate-400 mr-2 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="PMS, CRM, Channel Managers, AI..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent text-xs sm:text-sm w-full focus:outline-none text-slate-800 font-medium"
                />
              </div>
              <button
                onClick={onStartLearning}
                className="bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs px-6 py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-95 cursor-pointer"
              >
                Find Courses
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-md">
              <button
                onClick={onStartLearning}
                className="w-full sm:w-auto bg-white text-slate-900 px-8 py-3 rounded-full font-bold text-xs sm:text-sm hover:scale-105 transition-all duration-250 cursor-pointer shadow-lg text-center"
              >
                Start Learning
              </button>
              <button
                onClick={onViewCourses}
                className="w-full sm:w-auto border border-white/30 backdrop-blur-md text-white px-8 py-3 rounded-full font-bold text-xs sm:text-sm hover:bg-white/10 transition-all duration-250 cursor-pointer text-center"
              >
                View Course Catalog
              </button>
            </div>

            {/* Trust Highlights */}
            <div className="mt-10 pt-6 border-t border-white/10 w-full flex flex-wrap gap-x-6 gap-y-3 text-slate-400 text-xs font-semibold">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-teal-400" />
                <span>International Certification</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-teal-400" />
                <span>100% Practical Skills</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-teal-400" />
                <span>Dedicated AI Coaching Lab</span>
              </div>
            </div>
          </div>

          {/* Right Column: Stunning Interactive Multimedia Hub */}
          <div className="lg:col-span-5 w-full">
            <div id="multimedia-terminal" className="bg-slate-900/90 backdrop-blur-lg rounded-2xl border border-white/10 overflow-hidden shadow-2xl relative flex flex-col">
              
              {/* Media Hub Tab Header */}
              <div className="flex items-center justify-between px-4.5 py-3 border-b border-white/15 bg-slate-950/60 text-[11px] font-bold text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-teal-500 animate-pulse" />
                  <span className="tracking-widest uppercase">MULTIMEDIA ACADEMY CENTER</span>
                </div>
                <div className="flex bg-slate-900 p-0.5 rounded-lg border border-white/5">
                  <button
                    onClick={() => {
                      setActiveMode("video");
                      setIsPlaying(false);
                    }}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                      activeMode === "video"
                        ? "bg-teal-600 text-white font-extrabold"
                        : "hover:text-white"
                    }`}
                  >
                    <Video className="h-3 w-3" />
                    Welcome Video
                  </button>
                  <button
                    onClick={() => {
                      setActiveMode("gallery");
                      setIsPlaying(false);
                    }}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                      activeMode === "gallery"
                        ? "bg-teal-600 text-white font-extrabold"
                        : "hover:text-white"
                    }`}
                  >
                    <ImageIcon className="h-3 w-3" />
                    Photo Tour
                  </button>
                </div>
              </div>

              {/* Media Screen Area */}
              <div className="relative aspect-video w-full overflow-hidden bg-slate-950 flex items-center justify-center">
                
                {activeMode === "video" ? (
                  <>
                    {/* VIDEO CONTAINER */}
                    <img
                      src={currentChData.image}
                      alt={currentChData.title}
                      className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out brightness-75 scale-102"
                    />

                    {/* Gradient Overlay for Subtitles */}
                    <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent z-10" />

                    {/* Video Watermark Badge */}
                    <div className="absolute top-3 left-3 bg-teal-600/90 backdrop-blur-md text-[9px] font-black tracking-widest px-2.5 py-1 rounded-md text-white border border-teal-400/20 z-10 uppercase shadow">
                      {currentChData.badge}
                    </div>

                    <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-[9px] font-mono px-2 py-0.5 rounded text-slate-300 z-10">
                      CH {currentChapter + 1} / {VIDEO_CHAPTERS.length}
                    </div>

                    {/* PLAYBACK OVERLAY COVERS (Not Playing state) */}
                    {!isPlaying && (
                      <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[1px] flex flex-col items-center justify-center text-center p-6 z-20 transition-all duration-300">
                        <button
                          onClick={() => setIsPlaying(true)}
                          className="h-16 w-16 flex items-center justify-center bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-white rounded-full shadow-lg shadow-teal-500/20 hover:scale-110 active:scale-95 transition-all cursor-pointer border-2 border-white/30"
                        >
                          <Play className="h-7 w-7 fill-white translate-x-0.5" />
                        </button>
                        <h4 className="mt-4 font-extrabold text-sm tracking-wide text-white drop-shadow">
                          Play Interactive Welcome Video
                        </h4>
                        <p className="text-[10px] text-slate-300 max-w-xs mt-1">
                          Learn about CyberGraduates certificates, PMS sandboxes, and AI prompt coaching in 3 minutes.
                        </p>
                      </div>
                    )}

                    {/* LIVE AUDIO WAVEFORM SIMULATION */}
                    {isPlaying && (
                      <div className="absolute top-4 right-16 flex items-end gap-0.5 h-6 z-20 bg-slate-950/40 p-1 rounded-md">
                        {waves.map((height, idx) => (
                          <div
                            key={idx}
                            style={{ height: `${height}%` }}
                            className="w-0.75 bg-teal-400 rounded-full transition-all duration-150"
                          />
                        ))}
                      </div>
                    )}

                    {/* DYNAMIC SYNCED NARRATION SUBTITLES */}
                    {isPlaying && (
                      <div className="absolute bottom-4 inset-x-4 z-20 text-center px-4">
                        <div className="bg-black/75 backdrop-blur-sm border border-white/10 rounded-xl p-2.5 shadow">
                          <p className="text-[11px] sm:text-xs font-medium text-amber-200 tracking-wide leading-relaxed animate-fade-in italic">
                            &ldquo;{currentChData.narration}&rdquo;
                          </p>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    {/* GALLERY TOUR CONTAINER */}
                    <img
                      src={GALLERY_PHOTOS[galleryIndex].url}
                      alt="CyberGraduates Tour"
                      className="absolute inset-0 w-full h-full object-cover transition-all duration-500"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-slate-950 to-transparent z-10" />

                    {/* Gallery Navigation Controls */}
                    <button
                      onClick={() => setGalleryIndex((prev) => (prev === 0 ? GALLERY_PHOTOS.length - 1 : prev - 1))}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-teal-600 text-white p-2 rounded-full transition-all cursor-pointer z-20"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setGalleryIndex((prev) => (prev + 1) % GALLERY_PHOTOS.length)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-teal-600 text-white p-2 rounded-full transition-all cursor-pointer z-20"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>

                    {/* Photo Caption Overlay */}
                    <div className="absolute bottom-3 inset-x-4 z-20 text-center">
                      <div className="bg-slate-950/80 backdrop-blur-md rounded-lg py-1.5 px-3 inline-block border border-white/5">
                        <p className="text-[10px] sm:text-xs font-semibold text-slate-200">
                          {GALLERY_PHOTOS[galleryIndex].caption}
                        </p>
                      </div>
                    </div>
                  </>
                )}

              </div>

              {/* Custom Video Controls Board (Only visible for Video mode) */}
              {activeMode === "video" && (
                <div className="bg-slate-950/95 p-3.5 border-t border-white/10 z-10">
                  {/* Progress Seek Bar */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] font-mono text-slate-400">
                      {isPlaying ? `0:${Math.floor((progress / 100) * 45).toString().padStart(2, "0")}` : "0:00"}
                    </span>
                    <div className="flex-1 h-1.5 bg-slate-800 rounded-full relative overflow-hidden cursor-pointer">
                      <div
                        style={{ width: `${progress}%` }}
                        className="h-full bg-gradient-to-r from-teal-500 to-emerald-400 rounded-full transition-all duration-150"
                      />
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">
                      {currentChData.duration}
                    </span>
                  </div>

                  {/* Operational Controls Group */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {/* Play / Pause Toggle */}
                      <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="h-8 w-8 rounded-full bg-white text-slate-950 flex items-center justify-center hover:bg-teal-400 hover:text-slate-950 transition-all cursor-pointer shadow-md"
                        title={isPlaying ? "Pause" : "Play"}
                      >
                        {isPlaying ? <Pause className="h-3.5 w-3.5 fill-current" /> : <Play className="h-3.5 w-3.5 fill-current translate-x-0.25" />}
                      </button>

                      {/* Chapter Navigation */}
                      <button
                        onClick={handlePrevChapter}
                        className="p-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
                        title="Previous Scene"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </button>
                      <button
                        onClick={handleNextChapter}
                        className="p-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
                        title="Next Scene"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </button>

                      {/* Mute Button */}
                      <button
                        onClick={() => setIsMuted(!isMuted)}
                        className="p-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
                        title={isMuted ? "Unmute" : "Mute"}
                      >
                        {isMuted ? <VolumeX className="h-4 w-4 text-rose-400" /> : <Volume2 className="h-4 w-4 text-teal-400" />}
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Playback Speed Tag */}
                      <button
                        onClick={() => setPlaybackSpeed((s) => (s === 1 ? 1.5 : s === 1.5 ? 2 : 1))}
                        className="text-[9px] font-bold bg-slate-900 border border-white/10 hover:border-teal-500 px-2 py-1 rounded text-slate-300 hover:text-teal-300 transition-all cursor-pointer"
                        title="Playback Speed"
                      >
                        {playbackSpeed}x Speed
                      </button>

                      {/* Replay Button */}
                      <button
                        onClick={() => {
                          setProgress(0);
                          setIsPlaying(true);
                        }}
                        className="p-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
                        title="Restart Chapter"
                      >
                        <RefreshCw className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Interactive Chapter Quick-Select */}
                  <div className="mt-3.5 pt-3.5 border-t border-white/5 grid grid-cols-4 gap-1.5">
                    {VIDEO_CHAPTERS.map((ch, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleChapterSelect(idx)}
                        className={`text-center py-1.5 rounded transition-all cursor-pointer border ${
                          currentChapter === idx
                            ? "bg-teal-950/80 border-teal-500/80 text-teal-300 font-extrabold"
                            : "bg-slate-900/50 border-transparent text-slate-400 hover:bg-slate-900 hover:text-slate-200"
                        }`}
                      >
                        <span className="block text-[8px] tracking-wider uppercase opacity-75">Scene 0{idx + 1}</span>
                        <span className="block text-[9px] truncate max-w-full font-bold px-1">{ch.title.split(" ").slice(1).join(" ")}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Multi-Purpose Footer Banner */}
              <div className="bg-slate-950/80 px-4 py-2 text-center border-t border-white/10 flex items-center justify-center gap-1.5 text-[10px] text-teal-400 font-bold">
                <Award className="h-3.5 w-3.5 text-amber-400 animate-pulse" />
                <span>Interactive Learning Demonstration Terminal</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
