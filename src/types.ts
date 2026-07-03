export interface Course {
  id: string;
  title: string;
  category: "ai" | "pms" | "crs" | "marketing" | "crm";
  description: string;
  fullDescription: string;
  duration: string;
  price: string;
  certification: string;
  requirements: string[];
  image: string;
  modules: string[];
  skillsGained: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  stars: number;
  quote: string;
  avatar: string;
}

export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  content: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
  image: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: "general" | "courses" | "payment" | "corporate";
}

export interface TrainerScenario {
  id: string;
  title: string;
  icon: string;
  description: string;
  guestName: string;
  scenarioKey: string;
}

export interface TrainerMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
}
