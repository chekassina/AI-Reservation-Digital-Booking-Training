import { Course, Testimonial, BlogPost, FAQItem, TrainerScenario } from "./types";

export const COURSES: Course[] = [
  {
    id: "ai-res",
    title: "AI for Reservation Professionals",
    category: "ai",
    description: "Learn how to leverage generative AI models to respond to guest inquiries, write booking policies, and automate customer responses in minutes.",
    fullDescription: "Step into the future of reservation management. This course teaches reservation consultants and managers how to utilize tools like Google Gemini, ChatGPT, and Copilot to handle guest correspondence with high speed and personalized luxury. Learn how to draft prompt frameworks, handle double-bookings using AI assistance, and draft multilingual replies instantly.",
    duration: "4 Weeks (Self-Paced / Hybrid)",
    price: "$299 USD",
    certification: "Certified Hospitality AI Specialist (CHAS)",
    requirements: [
      "Basic computer literacy",
      "Familiarity with standard hotel reservations processes",
      "Stable internet connection"
    ],
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800",
    modules: [
      "Module 1: Introduction to Generative AI in Hospitality & Tourism",
      "Module 2: Advanced Prompt Engineering for Reservation Desks",
      "Module 3: Handling VIP Requests & Complaint De-escalation with AI",
      "Module 4: Automated Email Flow Crafting & Multilingual Communication"
    ],
    skillsGained: [
      "AI Prompt Engineering",
      "Accelerated Inquiry Response",
      "Tone-Perfect De-escalation",
      "Multilingual Guest Relations"
    ]
  },
  {
    id: "pms-mastery",
    title: "Property Management Systems (PMS) Training",
    category: "pms",
    description: "Master modern hotel PMS software. Learn check-ins, guest billing, room assignments, and front desk operations.",
    fullDescription: "Gain hands-on expertise with industry-leading Property Management Systems (PMS). Understand how modern hotel lobbies coordinate room keys, guest profiles, direct invoicing, and housekeeping statuses in real-time. This course uses simulated sandbox environments of major cloud PMS systems.",
    duration: "6 Weeks (Self-Paced with Practical Sandboxes)",
    price: "$349 USD",
    certification: "Professional PMS Operator Certificate (PPOC)",
    requirements: [
      "Familiarity with general guest service operations",
      "PC or Mac with web browser"
    ],
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=800",
    modules: [
      "Module 1: PMS Architecture & Navigating the Dashboard",
      "Module 2: Guest Profile Management & Billing Ledgers",
      "Module 3: Handling Check-Ins, Check-Outs, and Room Moves",
      "Module 4: Housekeeping Coordination & Group Booking Management"
    ],
    skillsGained: [
      "PMS Interface Navigation",
      "Guest Ledger Management",
      "Housekeeping Allocation",
      "Folio Settlement"
    ]
  },
  {
    id: "crs-distribution",
    title: "Central Reservation Systems (CRS) Essentials",
    category: "crs",
    description: "Unlock the power of global reservation nodes. Manage room inventory, corporate rate codes, and CRS-to-PMS linking.",
    fullDescription: "Learn how hotel groups and luxury lodges coordinate inventory globally. This course guides you through Central Reservation Systems (CRS), dealing with wholesale rate distribution, inventory synchronization, corporate negotiated rates, and managing multiple global distribution system (GDS) codes.",
    duration: "5 Weeks (Online + Live Workshop Option)",
    price: "$399 USD",
    certification: "CRS Revenue & Distribution Specialist",
    requirements: [
      "Understand standard PMS operations or 6 months front office experience"
    ],
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=800",
    modules: [
      "Module 1: CRS Fundamentals & Global Distribution Networks",
      "Module 2: Rate Plans, Promo Codes, and Yield Settings",
      "Module 3: Managing Wholesale Blocks & GDS Connectivity",
      "Module 4: Inventory Thresholds & Stop-Sell Procedures"
    ],
    skillsGained: [
      "CRS Rate Administration",
      "Stop-Sell Inventory Control",
      "Corporate Rate Coding",
      "Global Distribution Strategies"
    ]
  },
  {
    id: "booking-engines",
    title: "Online Booking Engines Optimization",
    category: "marketing",
    description: "Optimize direct bookings, minimize cart abandonment, and increase conversion rates on hotel websites.",
    fullDescription: "Why let third parties take 20% commission? Learn the psychology of hotel reservation websites, how booking engines convert traffic into direct paying guests, and how to setup secure direct gateways, room upsells, add-on packages, and automated post-booking confirmations.",
    duration: "3 Weeks (Self-Paced)",
    price: "$249 USD",
    certification: "Certified Direct Booking Professional",
    requirements: [
      "No specific prior software experience required"
    ],
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=800",
    modules: [
      "Module 1: Booking Engine UX Principles & Cart Abandonment",
      "Module 2: Direct Upsell Funnels & Package Structuring",
      "Module 3: Dynamic Rate Adjustments & Booking Incentives",
      "Module 4: Direct Payment Gateways & Secure API integrations"
    ],
    skillsGained: [
      "Direct Booking Funnel Design",
      "Add-on / Upselling Strategizing",
      "Conversion Rate Optimization (CRO)",
      "Secure Gateway Configuration"
    ]
  },
  {
    id: "channel-managers",
    title: "Channel Managers & OTA Management",
    category: "crs",
    description: "Connect to Booking.com, Expedia, and Airbnb simultaneously. Avoid overbookings and balance price parity.",
    fullDescription: "Master channel manager software to synchronize your rates and inventory across hundreds of Online Travel Agencies (OTAs) instantly. Learn about XML connections, handling extranet dashboards, matching price parities, and setting up reservation mapping rules to prevent room conflicts.",
    duration: "4 Weeks (Self-Paced with Practical Sandboxes)",
    price: "$299 USD",
    certification: "Hotel Distribution Channel Architect",
    requirements: [
      "Basic understanding of reservation offices"
    ],
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=800",
    modules: [
      "Module 1: OTA Ecosystem Overview & Extranet Basics",
      "Module 2: How Channel Managers Synchronize Rates/Inventory",
      "Module 3: Maintaining Price Parity & Managing OTA Commission Files",
      "Module 4: Dealing with Sync Errors & Double Bookings Protocols"
    ],
    skillsGained: [
      "OTA Extranet Management",
      "Channel Mapping Setup",
      "Rate Parity Enforcement",
      "Double Booking Mitigation"
    ]
  },
  {
    id: "crm-guest",
    title: "Customer Relationship Management (CRM)",
    category: "crm",
    description: "Build lifetime guest loyalty. Automate pre-arrival requests, guest preferences, and VIP profiles.",
    fullDescription: "A guest is not a transaction; they are a relationship. Learn how to leverage CRM engines to compile guest histories, flag allergies and preferences, send pre-arrival amenity questionnaires, and launch targeted email loyalty campaigns to ensure return stays.",
    duration: "4 Weeks (Online)",
    price: "$279 USD",
    certification: "Hospitality Guest Relationship Manager (HGRM)",
    requirements: [
      "Basic understanding of hospitality or guest services"
    ],
    image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80&w=800",
    modules: [
      "Module 1: Guest Profiling & Preference Management Databases",
      "Module 2: Pre-Arrival & Post-Departure Automated Workflows",
      "Module 3: Creating and Measuring Guest Loyalty Tiers",
      "Module 4: Managing VIP Protocol Alerts across PMS and CRM"
    ],
    skillsGained: [
      "CRM Database Administration",
      "Loyalty Campaign Setup",
      "Automated Guest Email Flows",
      "VIP Pre-Arrival Coordination"
    ]
  },
  {
    id: "ai-hospitality-tools",
    title: "AI Tools for Hospitality Desk",
    category: "ai",
    description: "Master ChatGPT, Microsoft Copilot, Google Gemini and custom hospitality bots to answer complex itineraries.",
    fullDescription: "Become the ultimate digital receptionist. This deep-dive masterclass focuses on harnessing the top AI systems side-by-side to construct complex custom itineraries, translate local guides into 20+ languages, audit booking confirmations for compliance, and draft complex refund emails during travel chaos.",
    duration: "3 Weeks (Crash Course)",
    price: "$199 USD",
    certification: "Hospitality AI Power-User Certificate",
    requirements: [
      "No requirements, perfect for beginners and managers alike"
    ],
    image: "https://images.unsplash.com/photo-1493612276216-ee3925520721?auto=format&fit=crop&q=80&w=800",
    modules: [
      "Module 1: Side-by-side: Gemini vs. ChatGPT vs. Copilot",
      "Module 2: Creating Custom Itineraries in Real-Time",
      "Module 3: Instant Local Guide translations & Cultural Profiling",
      "Module 4: Quality Audits of Booking FOLIOs and Policies"
    ],
    skillsGained: [
      "Multitool AI Workflows",
      "Dynamic Tour Planning",
      "Automated Itinerary Formatting",
      "Folio Audit Automation"
    ]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Lerato Motsumi",
    role: "Senior Reservation Consultant",
    location: "Gaborone, Botswana",
    stars: 5,
    quote: "I now use AI to answer guest enquiries in minutes. I can construct custom luxury itineraries in seconds, allowing me to close bookings 4x faster!",
    avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=150"
  },
  {
    id: "t2",
    name: "Brandon Jacobs",
    role: "Hotel Reservation Manager",
    location: "Cape Town, South Africa",
    stars: 5,
    quote: "This course completely changed how our reservation team works. Our direct bookings rose by 18% after implementing the booking engine conversion techniques.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150"
  },
  {
    id: "t3",
    name: "Naomi Mwangi",
    role: "Safari Operations Manager",
    location: "Nairobi, Kenya",
    stars: 5,
    quote: "Our lodge coordinators mastered the cloud PMS software within weeks. The lessons are highly practical and tailored perfectly to African hospitality standards.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150"
  },
  {
    id: "t4",
    name: "Carlos Mendes",
    role: "Front Office Supervisor",
    location: "Maputo, Mozambique",
    stars: 5,
    quote: "Understanding PMS Ledgers and GDS codes opened up so many doors for me. I was promoted to Reservation Lead just 2 months after completing the training!",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150"
  }
];

export const BLOGS: BlogPost[] = [
  {
    id: "b1",
    title: "How AI is Reshaping Reservation Departments in 2026",
    summary: "The pen-and-paper era is long gone, and standard templates are fading. Here is how AI transforms guest communication into direct conversions.",
    content: "The modern hotel guest demands speed and luxury. Waiting 24 hours for a reservation team to draft an email quote often leads to the guest booking elsewhere. AI tools like Google Gemini enable reservation consultants to process custom, highly personalized booking confirmations, local activity guides, and complex room pricing quotes in under 2 minutes. By using strict prompt structures, teams can draft polite, de-escalating replies to guest grievances, translating them instantly to any language with perfect brand tone.",
    author: "Tshepo Modise",
    date: "June 28, 2026",
    category: "AI in Hospitality",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "b2",
    title: "Mastering PMS: 5 Essential Tips for Zero Booking Errors",
    summary: "Booking conflicts can lead to ruined honeymoons and angry guests. Follow this operational audit checklist to keep your PMS flawless.",
    content: "The Property Management System (PMS) is the heart of any lodging operation. Common errors arise from front-desk staff forgetting to close rooms in PMS during a block stay, leading to channel manager sync errors. To secure guest trust, implement a daily PMS-to-Channel Manager sync audit, keep VIP guest profile records updated, clear housekeeping folios by 2:00 PM, and always flag corporate billing profiles before the client check-out.",
    author: "Elena Petrova",
    date: "May 15, 2026",
    category: "Reservation Tips",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "b3",
    title: "Direct Bookings Secrets: Sidestepping OTA Commissions",
    summary: "Online Travel Agencies charge hotels up to 25% commission. Learn how to convert OTA guests into lifelong direct advocates.",
    content: "While Booking.com and Expedia bring massive visibility, direct reservations provide healthier cash flow. By creating custom landing page experiences, offering value-added direct perks (like complimentary local breakfast or late checkout), and utilizing an elegant booking engine, hotels can seamlessly retain guests. Use your hospitality CRM to tag OTA bookings, offering them a 10% direct discount code for their subsequent stays.",
    author: "Arthur Pendelton",
    date: "April 10, 2026",
    category: "Tourism Technology",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600"
  }
];

export const FAQS: FAQItem[] = [
  {
    id: "f1",
    question: "Do I need prior hospitality experience to enroll?",
    answer: "No, our courses are structured for both newcomers looking to enter the hospitality industry and seasoned professionals wanting to upgrade their technological skillsets.",
    category: "general"
  },
  {
    id: "f2",
    question: "Are these certificates internationally recognized?",
    answer: "Yes! CyberGraduates certifications are accredited, confirming practical mastery of AI, reservation nodes, CRS, and leading PMS models widely used by global hotels, Safari lodges, and travel agencies.",
    category: "general"
  },
  {
    id: "f3",
    question: "How long does each course take?",
    answer: "Our courses are fully flexible and range from 3 to 6 weeks. You can study at your own pace from any computer, tablet, or mobile phone.",
    category: "courses"
  },
  {
    id: "f4",
    question: "Do you offer group rates or corporate hotel training?",
    answer: "Absolutely. We specialize in custom hotel, resort, and safari lodge training. We can tailor the material to your specific PMS system and host hybrid workshops. Contact our Corporate Support for a quote.",
    category: "corporate"
  },
  {
    id: "f5",
    question: "What payment options are supported?",
    answer: "We support secure credit/debit card transactions via Stripe, direct bank transfers, and flexible weekly installment plans for individual students.",
    category: "payment"
  }
];

export const TRAINER_SCENARIOS: TrainerScenario[] = [
  {
    id: "angry_guest",
    title: "Double-Booked Deluxe Suite",
    icon: "AlertTriangle",
    description: "An angry guest arrives at your boutique safari lodge, only to find their premium deluxe suite has been double-booked. They must de-escalate and offer creative alternatives.",
    guestName: "Mr. Henderson",
    scenarioKey: "angry_guest"
  },
  {
    id: "corporate_vip",
    title: "Demanding Corporate VIP Negotiator",
    icon: "DollarSign",
    description: "A professional travel broker demands an unrealistic 40% discount during high-occupancy season for a large group. Negotiate a win-win deal.",
    guestName: "Ms. Evelyn (Travel Broker)",
    scenarioKey: "corporate_vip"
  },
  {
    id: "last_minute_safari",
    title: "Last-Minute Multi-Destination Booking",
    icon: "Compass",
    description: "A guest wants an intricate safari itinerary starting tomorrow, with multiple dietary needs and transfer connections, on a very strict budget.",
    guestName: "Amara Okeke",
    scenarioKey: "last_minute_safari"
  },
  {
    id: "tech_failure",
    title: "Double Payment / CRS Discrepancy",
    icon: "WifiOff",
    description: "A guest claims they were charged twice online, but your Central Reservation System has no record of the reservation. Resolve the system failure gracefully.",
    guestName: "Dr. David Sterling",
    scenarioKey: "tech_failure"
  }
];
