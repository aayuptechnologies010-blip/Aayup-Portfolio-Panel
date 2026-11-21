export interface Leader {
  id: string;
  name: string;
  role: string;
  department: string;
  badge: string;
  directorField: string;
  bio: string;
  visionQuote: string;
  avatar: string;
  linkedin: string;
  highlights: string[];
}

export type Leadership = Leader;

export interface TeamMember {
  name: string;
  role: string;
  focus: string;
  avatar: string;
}

export interface Service {
  id: string;
  title: string;
  category: string;
  description: string;
  icon: string;
  deliverables: string[];
  techTags: string[];
  highlight: string;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: "Web Platforms" | "Mobile Apps" | "CRM / ERP" | "AI & Automation";
  image: string;
  description: string;
  problem: string;
  solution: string;
  keyFeatures: string[];
  techStack: string[];
  metrics: string;
  duration: string;
}

export interface Testimonial {
  id: string;
  clientName: string;
  role: string;
  company: string;
  feedback: string;
  rating: number;
  projectDelivered: string;
  avatar: string;
}

export const COMPANY_INFO = {
  name: "Aayup Technologies Pvt. Ltd.",
  tagline: "Engineering Next-Gen Digital Products, Enterprise Scalability & AI Automation",
  description:
    "We architect resilient, high-speed digital systems, enterprise software, and mission-critical cloud applications for global innovators.",
  foundedYear: "2023",
  location: "Virar, Palghar, Maharashtra, India",
  website: "https://www.aayuptechnologies.com",
  email: "contact@aayuptechnologies.com",
  phone: "+91 99201 54728",
  stats: [
    { value: "50+", label: "Projects Delivered" },
    { value: "99.8%", label: "Client Satisfaction" },
    { value: "7+ Yrs", label: "Core Tech Leadership" },
    { value: "24/7", label: "Critical Support" },
  ],
};

export const LEADERSHIP: Leadership[] = [
  {
    id: "founder-ceo",
    name: "Vivek Chaurasiya",
    role: "Founder & Chief Executive Officer",
    department: "Executive Leadership",
    badge: "Founder & CEO",
    directorField: "Strategic Vision & Global Growth",
    visionQuote:
      "Technology is only as powerful as the business problems it eliminates. At AAYUP, our core obsession is converting complex enterprise challenges into intuitive, high-velocity digital products.",
    bio: "Visionary entrepreneur and tech strategist steering AAYUP Technologies. Dedicated to building world-class engineering teams and fostering long-term strategic partnerships with industry disruptors.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1200&auto=format&fit=crop&q=90",
    linkedin: "https://linkedin.com",
    highlights: ["Global Product Strategy", "Client Success Architecture", "Cross-Functional Leadership"],
  },
  {
    id: "director-cto",
    name: "Aayush Pandey",
    role: "Managing Director & Chief Technology Officer",
    department: "Engineering & Architecture",
    badge: "Director & CTO",
    directorField: "Cloud Architectures & Software Engineering",
    visionQuote:
      "At AAYUP Technologies, our vision is to engineer resilient, high-speed digital architectures and modern cloud systems that empower high-growth global enterprises to scale without friction.",
    bio: "Pioneering technology architecture and enterprise transformations with over 7+ years of deep expertise in cloud ecosystems, microservices, mobile architectures, and high-performance engineering.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&auto=format&fit=crop&q=90",
    linkedin: "https://linkedin.com",
    highlights: ["Serverless & Cloud Systems", "High-Throughput Microservices", "Full-Stack Security & Scale"],
  },
];

export const CORE_TEAM = [
  {
    name: "Priya Sharma",
    role: "Lead Project Manager",
    focus: "Agile Delivery & Client Success",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=90",
  },
  {
    name: "Rahul Verma",
    role: "Lead Systems Engineer",
    focus: "Scalable Full-Stack & API Platforms",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop&q=90",
  },
  {
    name: "Neha Singh",
    role: "Head of Product Design (UI/UX)",
    focus: "Human-Centered Design Systems",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&auto=format&fit=crop&q=90",
  },
];

export const SERVICES: Service[] = [
  {
    id: "web-dev",
    title: "Web & SaaS Engineering",
    category: "Full-Stack Development",
    icon: "Globe",
    description:
      "High-speed, SEO-dominating web platforms and multi-tenant SaaS architectures built with Next.js App Router, React, and serverless compute.",
    deliverables: [
      "Sub-second page speeds & 95+ Core Web Vitals",
      "Dynamic Headless CMS & E-commerce integration",
      "PWA & Responsive edge caching",
    ],
    techTags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js"],
    highlight: "Engineered for 10x traffic bursts without downtime",
  },
  {
    id: "mobile-apps",
    title: "Mobile App Development",
    category: "iOS & Android Solutions",
    icon: "Smartphone",
    description:
      "Smooth, high-performance native and cross-platform mobile experiences with offline-first synchronization and real-time hardware telemetry.",
    deliverables: [
      "iOS App Store & Google Play production builds",
      "Offline database sync & background processing",
      "Push notification systems & biometrics",
    ],
    techTags: ["Flutter", "React Native", "Swift", "Kotlin", "Firebase"],
    highlight: "60 FPS native feel across both platforms",
  },
  {
    id: "crm-erp",
    title: "Custom CRM & ERP Platforms",
    category: "Enterprise Systems",
    icon: "LayoutDashboard",
    description:
      "Mission-critical business software that unites dispersed operations, automated pipelines, document generators, and granular access controls.",
    deliverables: [
      "Kanban deal pipelines & lead management",
      "Automated invoice & GST tax compliance engines",
      "Custom role-based permissions (RBAC)",
    ],
    techTags: ["PostgreSQL", "Docker", "Node.js", "Express", "Prisma"],
    highlight: "Replaces 5+ disparate SaaS tools into one unified hub",
  },
  {
    id: "ai-automation",
    title: "AI & Intelligent Automation",
    category: "Machine Learning & LLMs",
    icon: "Bot",
    description:
      "Operational intelligence pipelines using Large Language Models, generative agents, automated ticket routing, and predictive ML scoring.",
    deliverables: [
      "RAG pipelines over proprietary enterprise knowledge",
      "Automated WhatsApp & customer conversational agents",
      "Predictive telemetry & anomaly detection",
    ],
    techTags: ["Python", "FastAPI", "OpenAI / LangChain", "PyTorch", "Redis"],
    highlight: "Saves 30+ hours/week in manual operational overhead",
  },
  {
    id: "ui-ux",
    title: "UI/UX & Product Design",
    category: "Design Systems",
    icon: "Palette",
    description:
      "World-class product aesthetics, interactive wireframes, and scalable design component libraries engineered for effortless conversion.",
    deliverables: [
      "Interactive Figma high-fidelity prototypes",
      "Scalable atomic design systems",
      "Usability audits & user journey mapping",
    ],
    techTags: ["Figma", "Design Systems", "Prototyping", "Micro-Interactions"],
    highlight: "Proven 35%+ average conversion uplift",
  },
  {
    id: "cloud-devops",
    title: "Cloud Infrastructure & DevOps",
    category: "Architecture & Security",
    icon: "Cloud",
    description:
      "Hardened cloud infrastructure on AWS and Vercel with zero-trust networking, automated CI/CD pipelines, and proactive observability.",
    deliverables: [
      "Automated staging & production CI/CD deployments",
      "Database read-replicas & automated backups",
      "Enterprise SSL, DDoS shield & rate limiting",
    ],
    techTags: ["AWS", "Vercel", "Docker", "Cloudflare", "GitHub Actions"],
    highlight: "99.99% uptime guarantee with instant rollbacks",
  },
];

export const PROJECTS: Project[] = [
  {
    id: "synergyflow-crm",
    title: "SynergyFlow Enterprise ERP / CRM",
    tagline: "Unified Multi-Branch Operations & Financial Accounting Suite",
    category: "CRM / ERP",
    image: "/project-crm-dashboard.webp",
    description:
      "Comprehensive internal ERP deployed across multi-location businesses. Consolidates customer pipelines, purchase orders, team quotas, and automated GST billing in real time.",
    problem:
      "The client was crippled by disorganized Excel sheets, delayed invoice deliveries, and poor follow-up tracking across 4 regional branches.",
    solution:
      "Engineered a centralized, encrypted web application featuring live pipeline analytics, automated WhatsApp notifications, and role-based staff permissions.",
    keyFeatures: [
      "Kanban lead progression with instant status alerts",
      "One-click PDF invoice generation with digital signatures",
      "Granular multi-branch staff permission hierarchies",
      "Executive revenue projections with exportable analytics",
    ],
    techStack: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS"],
    metrics: "45% faster invoice collections & 100% elimination of manual spreadsheets",
    duration: "5 Months",
  },
  {
    id: "ecommerce-platform",
    title: "Enterprise E-Commerce Engine",
    tagline: "High-Frequency Retail Storefront with Real-Time Stock Telemetry",
    category: "Web Platforms",
    image: "/project-web-development.webp",
    description:
      "Next-generation digital storefront engineered to handle intense flash-sale traffic with instant cart updates and edge-cached product catalogs.",
    problem:
      "Legacy shopping cart experienced severe cart abandonment due to 4+ second page latency and inventory mismatch during high festive sales.",
    solution:
      "Re-architected the entire storefront into an API-driven headless architecture utilizing Next.js edge caching and optimistic UI updates.",
    keyFeatures: [
      "Sub-second catalog browsing & instant filtering",
      "Multi-gateway checkout (Razorpay, Stripe, UPI)",
      "Automated stock level alerts & supplier reorder triggers",
      "Mobile-first checkout reducing abandoned transactions",
    ],
    techStack: ["Next.js", "Node.js", "MongoDB Atlas", "Tailwind CSS", "Redis"],
    metrics: "42% increase in sales conversion & 850ms average page load",
    duration: "4 Months",
  },
  {
    id: "bhoommetra-iot",
    title: "Bhoommetra Mobile & IoT Diagnostics",
    tagline: "Agricultural Telemetry Platform for Precision Farming",
    category: "Mobile Apps",
    image: "/project-mobile-app.webp",
    description:
      "IoT telemetry mobile application empowering modern farmers with automated soil fertility diagnostics, satellite weather forecasts, and crop disease detection.",
    problem:
      "Field teams struggled with erratic cellular signals in remote areas and lacked scientific soil telemetry to advise farmers accurately.",
    solution:
      "Constructed a cross-platform Flutter application featuring an offline-first SQLite database and low-power Bluetooth sync with IoT ground probes.",
    keyFeatures: [
      "Live soil moisture, pH, and nutrient telemetry readings",
      "Offline data synchronization with auto cloud sync",
      "AI-assisted crop disease diagnosis from camera scans",
      "Multilingual regional language voice-assisted UI",
    ],
    techStack: ["Flutter", "Python / FastAPI", "AWS IoT Core", "PostgreSQL"],
    metrics: "Over 12,000+ active field readings across Maharashtra & Gujarat",
    duration: "6 Months",
  },
  {
    id: "aether-ai",
    title: "Aether AI Analytics & Automation",
    tagline: "Operational Anomaly Classifier & LLM Workflow Agent",
    category: "AI & Automation",
    image: "/project-ai-analytics.webp",
    description:
      "Enterprise-grade machine learning microservice that ingests continuous log streams, extracts unstructured support tickets, and triggers automated remediation.",
    problem:
      "High volume customer requests required 15+ full-time support engineers just to triage, assign, and pull data from legacy databases.",
    solution:
      "Trained custom embedding classifiers and integrated an LLM retrieval agent to auto-solve repetitive queries and flag critical incidents in seconds.",
    keyFeatures: [
      "Sub-second unstructured ticket classification",
      "Autonomous resolution agent for common tier-1 requests",
      "Confidence-score based escalation to human leads",
      "Real-time operational anomaly heatmaps",
    ],
    techStack: ["Python", "FastAPI", "PyTorch", "LangChain", "Redis", "React"],
    metrics: "72% autonomous resolution rate & 90% faster ticket response time",
    duration: "5 Months",
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "test-1",
    clientName: "Rajesh Sharma",
    role: "Chief Technology Officer",
    company: "FinEdge Global",
    feedback:
      "Aayup Technologies built our enterprise fintech platform from scratch. Their performance optimization and architecture decisions exceeded our expectations. The team operates with exceptional engineering maturity.",
    rating: 5,
    projectDelivered: "Fintech Platform & Payment Microservices",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=90",
  },
  {
    id: "test-2",
    clientName: "Ananya Deshmukh",
    role: "Founder & Chief Executive Officer",
    company: "HealthPulse India",
    feedback:
      "Outstanding experience from day one. The mobile app and patient portal they created was seamless, modern, and delivered right on our tight launch deadline without sacrificing quality.",
    rating: 5,
    projectDelivered: "Telehealth Mobile App & Web Portal",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=90",
  },
  {
    id: "test-3",
    clientName: "David Miller",
    role: "Vice President of Product",
    company: "Nexus Logistics Corp",
    feedback:
      "High quality engineering, proactive communication, and modern UI design. They felt like a natural extension of our core US-based tech team. Truly impressed with their velocity.",
    rating: 5,
    projectDelivered: "Fleet Telemetry & Dispatch System",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=90",
  },
  {
    id: "test-4",
    clientName: "Pooja Malhotra",
    role: "Head of Marketing",
    company: "StyleHub Retail",
    feedback:
      "Our conversion rate jumped by 42% after the redesign. The speed and aesthetic detail they added to our eCommerce website are top notch. Customers constantly compliment the ease of checkout.",
    rating: 5,
    projectDelivered: "Enterprise Next.js eCommerce Storefront",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=90",
  },
];
