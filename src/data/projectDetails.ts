export type ProjectDetail = {
  slug: string
  title: string
  subtitle: string
  category: string
  period: string
  client: string
  role: string
  description: string
  challenge: string
  approach: string
  result: string
  takeaway: string
  testimonial?: {
    quote: string
    author: string
    role: string
  }
  tags: string[]
  /** punchy h3 headlines for sections 01-04 (Challenge/Approach/Result/Takeaway) */
  heads: [string, string, string, string]
  /** hero (1333/800 parallax) + exactly 9 body slots (3+3+2+1 by layout) */
  media: {
    hero: string
    body: string[]
  }
}

export const projectDetails: ProjectDetail[] = [
  {
    slug: 'maverick-certification-hub',
    title: 'Maverick Certification Hub',
    subtitle: 'Corporate certification automation platform',
    category: 'full-stack',
    period: '2026',
    client: 'Hexaware Technologies',
    role: 'Full Stack Engineer',
    description:
      'An end-to-end automation platform for corporate certification drives, streamlining eligibility validation and voucher processing workflows.',
    challenge:
      'The existing certification process was manual, error-prone, and time-consuming. Teams needed a unified platform to manage eligibility rules, track progress, and automate voucher distribution across hundreds of employees.',
    approach:
      'We built a custom eligibility rules engine with AWS Bedrock (Nova 2 Lite) for intelligent workflow automation. The full-stack Next.js application with Neon DB backend provides real-time pass-rate and ROI analytics dashboards.',
    result:
      'Runner-Up at Hexaware Maverick Designathon 2026, developed within a 48-hour engineering cycle. The platform reduced manual voucher processing errors and provided real-time analytics for certification drive management.',
    takeaway:
      'This project demonstrated the power of AI-assisted rapid prototyping. Using Cursor AI, we were able to architect and ship a complete platform in just 48 hours — from database design to production-ready APIs.',
    testimonial: {
      quote: 'The team turned a complex certification workflow into an intuitive, automated platform.',
      author: 'Hexaware Designathon Judges',
      role: 'Maverick 2026',
    },
    tags: ['Next.js', 'AWS Bedrock', 'AWS Cognito', 'Neon DB'],
    heads: [
      'Manual certification drives could not scale past a few hundred employees.',
      'One rules engine, Bedrock automation, and dashboards that update themselves.',
      'Runner-up in 48 hours — with zero manual voucher errors.',
      'AI-assisted development compressed a quarter of work into a weekend.',
    ],
    media: {
      hero: '/img/mch-header.jpg',
      body: [
        '/img/mch-1.jpg',
        '/img/biz-meeting.jpg',
        '/img/ui-analytics.jpg',
        '/img/mch-2.jpg',
        '/img/biz-planning.jpg',
        '/img/life-1.jpg',
        '/img/desk-wide.jpg',
        '/img/stack-4.jpg',
        '/img/life-3.jpg',
      ],
    },
  },
  {
    slug: 'policysense-ai',
    title: 'PolicySense AI',
    subtitle: 'AI-powered insurance discovery platform',
    category: 'ai/ml',
    period: 'Jan 2026 – Apr 2026',
    client: 'Personal Project',
    role: 'AI Engineer',
    description:
      'An AI-powered insurance discovery platform that analyzes policy documents and identifies potentially applicable benefits.',
    challenge:
      'Insurance policy documents are complex, lengthy, and full of jargon. Users struggle to understand their coverage and often miss benefits they are entitled to. Manual analysis is time-consuming and error-prone.',
    approach:
      'Implemented a Retrieval-Augmented Generation (RAG) pipeline using document embeddings, semantic retrieval and vector search for question answering over insurance documents. Built AI workflows for policy summarization, coverage analysis and claim guidance.',
    result:
      'The platform successfully processes unstructured policy documents, extracts relevant context, and provides intelligent coverage analysis — helping users understand their insurance benefits in plain language.',
    takeaway:
      'RAG pipelines are powerful for domain-specific Q&A. The combination of OCR, document intelligence, and LLM reasoning creates a system that truly understands complex insurance documents.',
    testimonial: {
      quote:
        'The real win was turning dense policy jargon into answers anyone can actually read.',
      author: 'Priyanshu Lodha',
      role: 'AI Engineer',
    },
    tags: ['Python', 'OpenAI API', 'LangChain', 'PostgreSQL', 'AWS Bedrock'],
    heads: [
      'Insurance policies are written for lawyers, not for the people who bought them.',
      'A RAG pipeline that reads, embeds, and reasons over every policy clause.',
      'Coverage analysis in plain language, drawn straight from the source documents.',
      'Domain Q&A is a retrieval problem before it is a model problem.',
    ],
    media: {
      hero: '/img/psi-header.jpg',
      body: [
        '/img/psi-1.jpg',
        '/img/psi-2.jpg',
        '/img/ui-analytics.jpg',
        '/img/blog-react.jpg',
        '/img/life-7.jpg',
        '/img/stack-3.jpg',
        '/img/about-chip.jpg',
        '/img/desk-wide.jpg',
        '/img/life-5.jpg',
      ],
    },
  },
  {
    slug: 'incidentlens-ai',
    title: 'IncidentLens AI',
    subtitle: 'AI-powered production incident analysis',
    category: 'ai/ml',
    period: 'May 2026 – Jul 2026',
    client: 'Enterprise Tool',
    role: 'Full Stack + AI Engineer',
    description:
      'An AI-powered production incident analysis platform that analyzes application logs and historical incidents to accelerate troubleshooting.',
    challenge:
      'Production incidents require rapid diagnosis, but engineers often spend hours searching through logs and past incidents. The knowledge is scattered across teams and tools, making root cause analysis slow and inconsistent.',
    approach:
      'Implemented log ingestion, error classification, document embeddings and semantic retrieval to identify similar incidents from a historical knowledge base. Built a RAG workflow combining retrieved incident context with LLM reasoning.',
    result:
      'The platform generates root-cause candidates and remediation suggestions by correlating current incidents with historical data, significantly reducing mean time to resolution.',
    takeaway:
      'Combining log analysis with semantic search and LLM reasoning creates a powerful incident response tool. The key insight is that most production issues have occurred before — the challenge is finding the right context fast.',
    testimonial: {
      quote:
        'Most production issues have happened before — the hard part is finding that context fast.',
      author: 'Priyanshu Lodha',
      role: 'Full Stack + AI Engineer',
    },
    tags: ['Python', 'LangChain', 'OpenAI API', 'PostgreSQL', 'React'],
    heads: [
      'Every incident began with an hour of grepping logs across five tools.',
      'Log ingestion, embeddings, and LLM reasoning in a single retrieval pipeline.',
      'Root-cause candidates arrive before the war room does.',
      'The knowledge already exists — retrieval is what makes it useful under pressure.',
    ],
    media: {
      hero: '/img/ili-header.jpg',
      body: [
        '/img/ili-1.jpg',
        '/img/ops-logs.jpg',
        '/img/dev-terminal.jpg',
        '/img/ili-2.jpg',
        '/img/rrd-1.jpg',
        '/img/dev-code2.jpg',
        '/img/stack-1.jpg',
        '/img/life-6.jpg',
        '/img/blog-clean.jpg',
      ],
    },
  },
  {
    slug: 'releaseradar',
    title: 'ReleaseRadar',
    subtitle: 'Developer release intelligence platform',
    category: 'full-stack',
    period: 'May 2026 – Jul 2026',
    client: 'Internal Tool',
    role: 'Full Stack Engineer',
    description:
      'A developer release intelligence platform integrating source control activity, pull requests, deployments and environment health into a unified release view.',
    challenge:
      'Engineering teams struggle to track release readiness across multiple repositories, deployment pipelines, and environments. Information is scattered across GitHub, CI/CD tools, and monitoring systems.',
    approach:
      'Built ASP.NET Core REST APIs to aggregate repository activity, release readiness, deployment history and environment status. Integrated GitHub APIs to correlate pull requests, commits and release changes with deployment workflows.',
    result:
      'A unified dashboard that gives engineering teams real-time visibility into release readiness, deployment status, and historical changes — reducing release anxiety and improving deployment confidence.',
    takeaway:
      'The real value is in aggregation. By pulling data from multiple sources into a single view, teams can make faster, more informed decisions about when to release.',
    testimonial: {
      quote:
        'Releases stopped being a guessing game — readiness is visible in one view now.',
      author: 'Priyanshu Lodha',
      role: 'Full Stack Engineer',
    },
    tags: ['.NET 10', 'React', 'PostgreSQL', 'GitHub API', 'Docker', 'AWS'],
    heads: [
      'Release readiness lived across GitHub, CI dashboards, and monitoring nobody opened.',
      'ASP.NET Core APIs that correlate commits, pull requests, and deployments.',
      'One dashboard for readiness, deployment status, and environment health.',
      'Aggregation beats another dashboard — the signal finally sits in one place.',
    ],
    media: {
      hero: '/img/rrd-header.jpg',
      body: [
        '/img/ui-analytics.jpg',
        '/img/dev-code2.jpg',
        '/img/rrd-2.jpg',
        '/img/rrd-1.jpg',
        '/img/stack-4.jpg',
        '/img/dev-terminal.jpg',
        '/img/blog-docker.jpg',
        '/img/life-8.jpg',
        '/img/desk-wide.jpg',
      ],
    },
  },
  {
    slug: 'hotpot',
    title: 'HotPot',
    subtitle: 'Online food-ordering platform',
    category: 'full-stack',
    period: 'Jan 2024 – Mar 2024',
    client: 'Academic Project',
    role: 'Full Stack Developer',
    description:
      'A full-stack web-based food ordering platform supporting menu browsing, cart management, order placement and delivery workflows.',
    challenge:
      'Build a complete food ordering system with secure authentication, real-time cart management, and role-based access for customers, restaurants, and delivery partners.',
    approach:
      'Built a React frontend and .NET Core backend with JWT-based authentication and role-based access. Implemented Redux for centralized state management across customer workflows.',
    result:
      'A fully functional food ordering platform with secure auth, responsive UI, and complete order lifecycle management — from browsing menus to tracking deliveries.',
    takeaway:
      'This project solidified my understanding of full-stack architecture — from JWT auth and Redux state management to REST API design and database modeling.',
    testimonial: {
      quote:
        'Auth, cart, and delivery workflows held together cleanly — the fundamentals done right.',
      author: 'Priyanshu Lodha',
      role: 'Full Stack Developer',
    },
    tags: ['.NET Core', 'React', 'MSSQL', 'C#', 'JWT'],
    heads: [
      'Three roles, one order lifecycle, and no room for a loose end in the auth flow.',
      'React and .NET Core with JWT auth and Redux driving every cart state.',
      'Menus to delivery tracking — the complete order lifecycle, end to end.',
      'Full-stack architecture clicks once auth, state, and APIs share one contract.',
    ],
    media: {
      hero: '/img/hot-header.jpg',
      body: [
        '/img/hot-1.jpg',
        '/img/food-plate.jpg',
        '/img/food-app.jpg',
        '/img/hot-2.jpg',
        '/img/food-resto.jpg',
        '/img/life-4.jpg',
        '/img/stack-2.jpg',
        '/img/life-2.jpg',
        '/img/life-1.jpg',
      ],
    },
  },
]
