import {
  ShieldCheck,
  GraduationCap,
  Layers3,
  Brain,
  Sparkles,
  Users,
  BriefcaseBusiness,
  Trophy,
  Lightbulb,
  Megaphone,
  Cpu,
  Video,
  ExternalLink,
  Github
} from "lucide-react";

// ========================================================
// TYPES & INTERFACES
// ========================================================

export interface ProjectItem {
  title: string;
  category: string;
  description: string;
  problem: string;
  solution: string;
  tech: string[];
  githubUrl: string;
  liveUrl?: string;
  mockupType: "phone" | "browser";
}

export interface CreativeWorkItem {
  title: string;
  category: string;
  type: "video" | "design" | "campaign";
  description: string;
  tools: string[];
  details: {
    role: string;
    timeline: string;
    deliverables: string;
  };
}

export interface ExperienceItem {
  role: string;
  organization: string;
  description: string;
  learnings: string[];
  duration?: string;
}

export interface TimelineItem {
  type: "education" | "experience";
  title: string;
  subtitle: string;
  date: string;
  tags?: string[];
  bullets?: string[];
}

// ========================================================
// PORTFOLIO DATASETS
// ========================================================

export const roles = [
  "AI Builder",
  "Full Stack Developer",
  "Creative Creator",
  "Technology Innovator",
  "Full Stack Developer & AI Enthusiast"
];

export const navItems = [
  "About",
  "Projects",
  "Skills",
  "Leadership",
  "Creative",
  "Contact"
];

export const skillGroups = [
  {
    title: "Technical",
    icon: Cpu,
    skills: [
      "HTML",
      "CSS",
      "JavaScript",
      "PHP",
      "MySQL",
      "Python",
      "MERN Stack",
      "WordPress",
      "Wix",
      "AI Tools",
      "Prompt Engineering"
    ]
  },
  {
    title: "Creative",
    icon: Video,
    skills: [
      "Video Editing",
      "Canva Design",
      "Content Creation",
      "Digital Marketing",
      "Storytelling"
    ]
  },
  {
    title: "Professional",
    icon: Users,
    skills: [
      "Leadership",
      "Communication",
      "Problem Solving",
      "Project Management",
      "Team Collaboration"
    ]
  }
];

export const certifications = [
  "Oracle Generative AI",
  "Oracle AI Foundations Associate",
  "IBMR Corporate Hybrid Program",
  "E-Commerce & AI Technologies",
  "Python & MySQL Database",
  "C, C++, Java"
];

export const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/chetan-waddamani/" },
  { label: "GitHub", href: "https://github.com/Chetan-120" },
  { label: "Email", href: "mailto:waddamanic@gmail.com" }
];

// Centralized Project Showcase Data
export const projectsData: ProjectItem[] = [
  {
    title: "Rakshika",
    category: "AI-Powered Safety Platform",
    description: "An AI-powered emergency assistance platform designed to improve dispatch response speeds and user communication workflows during critical situations.",
    problem: "Traditional emergency dialing pathways require manual dial inputs, lack client-side audio stress auditing, and fail to coordinate real-time coordinates telemetry to responders.",
    solution: "Coded a lightweight emergency routing pipeline integrated with client-side voice stress auditing buffers, cancelable count triggers, and direct coordinates sync links.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "MongoDB", "Socket.IO", "Leaflet"],
    githubUrl: "https://github.com/Chetan-120/rakshika",
    liveUrl: "https://rakshika-weld.vercel.app/",
    mockupType: "phone"
  },
  {
    title: "NoteSyncer",
    category: "Secure Academic Portal",
    description: "An academic resource vault designed for student circles to securely index, search, and upload notes and programming manuals.",
    problem: "Sharing study files across private chat channels causes links to expire, leaves resources unindexed, and lacks folder upload validation.",
    solution: "Developed an encryption-backed document management portal featuring secure session tokens, relational search lists, and folder upload sanitization layers.",
    tech: ["HTML5", "CSS3", "Bootstrap", "JavaScript", "PHP", "MySQL"],
    githubUrl: "https://github.com/Chetan-120/NoteSyncer",
    mockupType: "browser"
  },
  {
    title: "Brain Battle",
    category: "Real-time Quiz Engine",
    description: "A lightweight, browser-based quiz game designed to host trivia sessions for classmates, featuring optimized state cycles.",
    problem: "Multiplayer engagement triggers latency spikes and lagging scoring tallies when utilizing heavy client dependencies or slow render pools.",
    solution: "Coded a pure JavaScript trivia engine utilizing client-side event loops, custom event listeners, and CSS transition frames optimized for high frame rates.",
    tech: ["HTML5", "CSS3", "JavaScript (ES6+)"],
    githubUrl: "https://github.com/Chetan-120/charan120",
    mockupType: "browser"
  }
];

// Centralized Experience / Internship Data
export const experiencesData: ExperienceItem[] = [
  {
    role: "AI for Sustainability Virtual Intern",
    organization: "1M1B Foundation × IBM SkillsBuild × AICTE",
    duration: "May 2026 – June 2026",
    description: "• Completed an AI-focused virtual internship exploring Responsible AI, Generative AI, Retrieval-Augmented Generation (RAG), and Agentic AI.\n\n• Designed and developed Rakshika, an AI-powered women's safety platform focused on emergency assistance and location-based support.\n\n• Applied AI concepts to solve a real-world problem while learning ethical and responsible AI practices.",
    learnings: [
      "Responsible AI",
      "Generative AI",
      "Retrieval-Augmented Generation (RAG)",
      "Agentic AI",
      "Problem Solving"
    ]
  },
  {
    role: "Full Stack Development Intern",
    organization: "NullClass",
    duration: "2023 – 2024",
    description: "Worked on building modular full-stack interfaces and backend endpoints utilizing MERN stack architectures.",
    learnings: [
      "Implemented modular dashboard views and dynamic data rendering routes.",
      "Conducted integration tests and code validation cycles with local teams."
    ]
  },
  {
    role: "Web Development Intern",
    organization: "Pravinya Infotech",
    duration: "2023 – 2024",
    description: "Coded backend database features and responsive templates using PHP, MySQL, and CSS layouts.",
    learnings: [
      "Structured server-side queries and handled relational table setups.",
      "Debugging client-facing forms and formatting css cross-browser alignment."
    ]
  },
  {
    role: "Content & Social Media Specialist",
    organization: "ClickNaukari",
    duration: "2024 – 2025",
    description: "Designed marketing media templates, video recaps, and graphics to drive audience outreach.",
    learnings: [
      "Produced graphic designs in Canva and edited short-form highlight clips.",
      "Maintained uniform branding and template structures across campaigns."
    ]
  }
];

// Centralized Milestone Journey Timeline Data
export const timelineJourneyData: TimelineItem[] = [
  {
    type: "education",
    title: "BCA @ IBMR",
    subtitle: "Bachelor of Computer Applications, IBMR Hubli",
    date: "2022 - 2025",
    tags: ["CGPA: 8.45", "Computer Science", "Database Systems"],
    bullets: [
      "Acquired core foundations in programming, database systems, and software engineering concepts.",
      "Developed initial web tools and collaborative platform projects like NoteSyncer and Brain Battle."
    ]
  },
  {
    type: "experience",
    title: "Former General Secretary",
    subtitle: "IBMR College Student Council",
    date: "2024 - 2025",
    tags: ["Leadership", "Council Governance", "Student Welfare"],
    bullets: [
      "Represented student interests, managed communication channels, and coordinated student welfare operations.",
      "Coordinated campus activities in collaboration with department leads and college administrative deans."
    ]
  },
  {
    type: "experience",
    title: "Internships",
    subtitle: "Nullclass & Pravinya Infotech",
    date: "2023 - 2024",
    tags: ["MERN Stack", "PHP", "MySQL", "Web Development"],
    bullets: [
      "Completed internships focusing on full-stack development structures, responsive layout designs, and data tables.",
      "Coded web dashboards, resolved query alignments, and reviewed database controls."
    ]
  },
  {
    type: "education",
    title: "MCA @ MSRUAS",
    subtitle: "M.S. Ramaiah University of Applied Sciences, Bengaluru",
    date: "2025 - 2027",
    tags: ["Advanced Computing", "Distributed Systems", "Postgraduate Studies"],
    bullets: [
      "Entered postgraduate studies to explore advanced system architectures, cloud models, and user interfaces.",
      "Focusing on engineering secure, accessible web technologies and modular software designs."
    ]
  },
  {
    type: "experience",
    title: "AI for Sustainability Virtual Intern",
    subtitle: "1M1B Foundation × IBM SkillsBuild × AICTE",
    date: "May 2026 – June 2026",
    tags: ["Responsible AI", "Generative AI", "RAG", "Agentic AI", "Problem Solving"],
    bullets: [
      "Completed an AI-focused virtual internship exploring Responsible AI, Generative AI, Retrieval-Augmented Generation (RAG), and Agentic AI.",
      "Designed and developed Rakshika, an AI-powered women's safety platform focused on emergency assistance and location-based support.",
      "Applied AI concepts to solve a real-world problem while learning ethical and responsible AI practices."
    ]
  },
  {
    type: "experience",
    title: "Rakshika",
    subtitle: "AI-Powered Safety & Assistance Platform (Designing)",
    date: "Active Project",
    tags: ["Design & Exploration", "Safety Tech", "Accessibility"],
    bullets: [
      "Designing an AI-powered safety platform focused on emergency support, accessibility, and user-centric experiences.",
      "Exploring low-friction audio trigger pathways and communication layouts for panic coordination."
    ]
  }
];

// Centralized Creative Gallery Data
export const creativeGalleryData: CreativeWorkItem[] = [
  {
    title: "Short Films Production & Editing",
    category: "Video Editing",
    type: "video",
    description: "Directed and edited narrative short films focusing on visual storytelling and pacing. Coordinated audio-visual assets, managed student volunteer film crews, and refined post-production cuts based on group reviews.",
    tools: ["Premiere Pro", "After Effects", "DaVinci Resolve"],
    details: {
      role: "Lead Video Editor & Colorist",
      timeline: "3 Weeks",
      deliverables: "Final Cut, Audio Mastering, Color Correction Lookbook"
    }
  },
  {
    title: "Asian Paints Dealer Case Study",
    category: "Case Study Videos",
    type: "video",
    description: "Produced a case-study video project profiling local dealer networks. Assisted in recording field interviews, aligned B-roll content, and structured the final edits to communicate authentic feedback.",
    tools: ["Premiere Pro", "Interview Audio Master", "Motion Design"],
    details: {
      role: "Production Assistant & Video Editor",
      timeline: "2 Weeks",
      deliverables: "Structured Interview Cut, B-Roll Integration, Lower-Third Graphics"
    }
  },
  {
    title: "BCA Admission Recruitment Drive",
    category: "Promotional Content",
    type: "campaign",
    description: "Designed a digital recruitment campaign for the BCA program. Created promotional video reels and social media flyers in Canva, helping the department share admission details across local feeds.",
    tools: ["Canva Pro", "CapCut Video Editor", "Digital Ad Strategy"],
    details: {
      role: "Creative Director & Marketing Designer",
      timeline: "1 Month",
      deliverables: "15+ Social Banner Templates, 3 Promo Video Reels, Campaign Ad Copy"
    }
  },
  {
    title: "College Event Coverage & Social Promo",
    category: "Social Media Content",
    type: "video",
    description: "Led the media coverage coordination for college events and guest lectures. Organized student photography schedules and edited event highlights to promote student activities.",
    tools: ["Cinematography", "Social Media Analytics", "Canva Graphics"],
    details: {
      role: "Social Media Lead & Videographer",
      timeline: "Ongoing",
      deliverables: "Live Recap Stories, Post-Event Highlights Reel, Student Coordination"
    }
  },
  {
    title: "Canva Marketing Material Suite",
    category: "Poster Design",
    type: "design",
    description: "Designed a collection of poster templates, brochures, and digital announcements in Canva. Created consistent design templates that other student organizers could customize for their events.",
    tools: ["Canva Graphics", "Vector Illustration", "Color Theory"],
    details: {
      role: "Graphic Designer",
      timeline: "Ongoing",
      deliverables: "Print-Ready Banners, Custom Canva Asset Library, PDF Brochures"
    }
  }
];

export const linkIcons = {
  live: ExternalLink,
  github: Github
};

export const stats = [
  { value: "3+", label: "Internships", icon: BriefcaseBusiness },
  { value: "4+", label: "Projects Built", icon: Brain },
  { value: "Former", label: "General Secretary", icon: Trophy },
  { value: "Multiple", label: "AI & Sustainability Initiatives", icon: Lightbulb },
  { value: "Continuous", label: "Learning & Innovation", icon: Megaphone }
];
