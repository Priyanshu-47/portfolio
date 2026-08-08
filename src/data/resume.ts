import type { IconType } from 'react-icons'
import {
  SiDotnet,
  SiReact,
  SiTypescript,
  SiPython,
  SiJavascript,
  SiNextdotjs,
  SiRedux,
  SiDocker,
  SiPostgresql,
  SiMysql,
  SiGithub,
  SiSwagger,
  SiCursor,
} from 'react-icons/si'
import { FaAws } from 'react-icons/fa6'

/* ---------------------------------------------------------------------------
   Profile
--------------------------------------------------------------------------- */
export const profile = {
  name: 'Priyanshu Lodha',
  initials: 'PL',
  role: 'Full Stack Software Engineer',
  location: 'Pune, Maharashtra, India',
  email: 'priyanshulodha47@gmail.com',
  phone: '+91 98500 50647',
  phoneRaw: '9850050647',
  resumeUrl: '/resume.pdf',
  linkedin: 'https://linkedin.com/in/priyanshu-lodha/',
  github: 'https://github.com/Priyanshu-47',
  tagline:
    'I design and ship secure, scalable full-stack products — .NET & React at the core, deployed on AWS, and accelerated by AI.',
  summary:
    "I'm a Full Stack Software Engineer at Hexaware Technologies, engineering enterprise-grade applications for Carlyle's LP Connect investor platform with ASP.NET Core, React, SQL Server and AWS. My work spans secure REST APIs built on Entity Framework Core, responsive React interfaces, and integrations with Auth0, Salesforce and Appian — deployed and monitored on AWS.",
  summaryExtra:
    'Beyond enterprise software, I have trained CNNs for computer vision, built AI pipelines for healthcare document analysis, and shipped full-stack SaaS products — inventory management, HR platforms and food-ordering systems — end to end. I am a strong believer in AI-assisted engineering: Cursor AI is woven into my daily workflow for code generation, debugging, documentation and impact analysis.',
  stats: [
    { value: '2+', label: 'Years of experience' },
    { value: '4+', label: 'Projects shipped' },
    { value: '5+', label: 'AWS services used' },
    { value: '3', label: 'Certifications' },
  ],
  /* Live values pulled from https://github.com/Priyanshu-47 (fetched 2026-08-08) */
  githubStats: {
    repos: 27,
    handle: 'github.com/Priyanshu-47',
    activity: 'Daily DSA practice on NeetCode',
  },
}

export type Social = {
  label: string
  href: string
}

export const socials: Social[] = [
  { label: 'LinkedIn', href: profile.linkedin },
  { label: 'GitHub', href: profile.github },
  { label: 'Email', href: `mailto:${profile.email}` },
]

/* ---------------------------------------------------------------------------
   Core stack (featured)
--------------------------------------------------------------------------- */
export type CoreTech = {
  name: string
  tagline: string
  description: string
  usage: string[]
  icon: IconType
}

export const coreStack: CoreTech[] = [
  {
    name: '.NET',
    tagline: 'Backend backbone',
    description:
      'ASP.NET Core REST APIs, Entity Framework Core and Clean Architecture power every backend I build.',
    usage: ['Carlyle LP Connect', 'WorkSphere HR', 'Hotpot'],
    icon: SiDotnet,
  },
  {
    name: 'React',
    tagline: 'Frontend craft',
    description:
      'Component-driven, typed interfaces built with React, TypeScript and Redux — responsive, accessible and fast.',
    usage: ['Every project', 'Hexaware platforms'],
    icon: SiReact,
  },
  {
    name: 'AWS',
    tagline: 'Cloud & scale',
    description:
      'Lambda, ECS, S3, RDS and CloudWatch for deployment, storage, observability and monitoring in production.',
    usage: ['Carlyle LP Connect', 'Cloud-native builds'],
    icon: FaAws,
  },
  {
    name: 'Python',
    tagline: 'AI & data',
    description:
      'CNNs and machine-learning pipelines for computer-vision and healthcare document-analysis use cases.',
    usage: ['NeoDocto', 'LinuxWorld'],
    icon: SiPython,
  },
  {
    name: 'Cursor AI',
    tagline: 'AI-assisted dev',
    description:
      'An everyday multiplier for code generation, debugging, documentation and impact analysis across teams.',
    usage: ['Hexaware daily workflow'],
    icon: SiCursor,
  },
]

/* ---------------------------------------------------------------------------
   Experience
--------------------------------------------------------------------------- */
export type SceneMode = 'terminal' | 'cloud' | 'vision'

export type Job = {
  role: string
  company: string
  location: string
  period: string
  highlights: string[]
  tags: string[]
  /** Mini-avatar context action shown in the expanded card */
  scene?: { mode: SceneMode; label: string; line: string }
}

export const experience: Job[] = [
  {
    role: 'Full Stack Software Engineer',
    company: 'Hexaware Technologies',
    location: 'Pune, MH',
    period: 'May 2024 – Present',
    highlights: [
      "Develop and maintain enterprise-grade web applications for Carlyle's LP Connect investor platform using ASP.NET Core, React, SQL Server and AWS.",
      'Design secure REST APIs, reusable backend services and database components using Entity Framework Core.',
      'Build responsive React components and collaborate closely with UI/UX teams to deliver intuitive user experiences.',
      'Deliver enterprise modules including investor onboarding, document management, contact self-service and wire instruction workflows.',
      'Integrate Auth0, Salesforce, Appian and EBX MDM for secure authentication and business-process automation.',
      'Use AWS Lambda, ECS, S3, RDS and CloudWatch for cloud deployment and monitoring.',
      'Investigate production issues, perform root-cause analysis and provide L2/L3 support for business-critical applications.',
      'Drive AI-assisted development workflows using Cursor AI for code generation, debugging, documentation and impact analysis.',
    ],
    tags: ['ASP.NET Core', 'React', 'SQL Server', 'AWS', 'Cursor AI', 'Auth0'],
    scene: { mode: 'cloud', label: 'cloud deploy', line: '$ aws ecs update-service --cluster lp-connect' },
  },
  {
    role: 'AI Intern',
    company: 'NeoDocto',
    location: 'Remote',
    period: 'Dec 2021 – Feb 2022',
    highlights: [
      'Developed AI models for healthcare document analysis and prediction.',
      'Built preprocessing pipelines for medical datasets.',
      'Improved verification workflows through intelligent document processing.',
    ],
    tags: ['Python', 'Machine Learning', 'NLP'],
    scene: { mode: 'terminal', label: 'AI pipeline', line: '$ python train.py --model document-ai' },
  },
  {
    role: 'Summer Intern',
    company: 'LinuxWorld Informatics Pvt Ltd',
    location: 'Jaipur, RJ',
    period: 'Sept 2021',
    highlights: [
      'Developed CNN-based vehicle recognition models.',
      'Implemented and evaluated neural-network algorithms for computer-vision use cases.',
    ],
    tags: ['Python', 'CNN', 'Computer Vision'],
    scene: { mode: 'vision', label: 'computer vision', line: '$ python detect.py --task vehicle-cnn' },
  },
]

/* ---------------------------------------------------------------------------
   Projects
--------------------------------------------------------------------------- */
export type Project = {
  title: string
  subtitle: string
  period: string
  description: string
  highlights: string[]
  tags: string[]
  featured?: boolean
}

export const projects: Project[] = [
  {
    title: 'Carlyle — LP Connect',
    subtitle: 'Enterprise investor platform',
    period: 'May 2024 – Present',
    description:
      'Enterprise modules for Carlyle’s investor platform, used worldwide for secure investment management.',
    highlights: [
      'Designed backend APIs with ASP.NET Core and Entity Framework.',
      'Built reusable React components and integrated secure authentication via Auth0.',
      'Leveraged Cursor AI to accelerate impact analysis, implementation, testing and documentation.',
    ],
    tags: ['.NET Core', 'React', 'SQL Server', 'Auth0', 'AWS', 'Cursor AI'],
    featured: true,
  },
  {
    title: 'InventoryFlow SaaS',
    subtitle: 'Cloud-ready inventory management',
    period: 'May 2026 – Jul 2026',
    description:
      'A cloud-ready inventory platform for stock tracking, purchase orders and warehouse management.',
    highlights: [
      'Implemented real-time inventory updates using SignalR.',
      'Built dashboards for analytics, inventory alerts and reporting.',
    ],
    tags: ['ASP.NET Core', 'React', 'SignalR', 'PostgreSQL'],
  },
  {
    title: 'WorkSphere HR',
    subtitle: 'Full-stack HR management',
    period: 'Jan 2026 – Apr 2026',
    description:
      'A full-stack HR platform covering employee management, attendance, payroll and leave tracking.',
    highlights: [
      'Implemented JWT authentication, role-based authorization and REST APIs with ASP.NET Core.',
      'Developed responsive React dashboards for HR, Managers and Employees.',
      'Containerized with Docker and backed by PostgreSQL for scalable storage.',
    ],
    tags: ['.NET 10', 'React', 'PostgreSQL', 'Docker', 'JWT'],
  },
  {
    title: 'Hotpot',
    subtitle: 'Online food-ordering platform',
    period: 'Jan 2024 – Mar 2024',
    description:
      'A web-based food-ordering platform to browse menus, place orders and track deliveries in real time.',
    highlights: [
      'Built a React frontend with Redux for centralized state management.',
      'Created a .NET Core backend with role-based JWT authentication.',
    ],
    tags: ['.NET Core', 'React', 'MSSQL', 'Redux', 'JWT'],
  },
]

/* ---------------------------------------------------------------------------
   Skills
--------------------------------------------------------------------------- */
export type Skill = { label: string; icon?: IconType }

export type SkillGroup = {
  title: string
  skills: Skill[]
}

export const skillGroups: SkillGroup[] = [
  {
    title: 'Languages',
    skills: [
      { label: 'C#', icon: SiDotnet },
      { label: 'JavaScript', icon: SiJavascript },
      { label: 'TypeScript', icon: SiTypescript },
      { label: 'Python', icon: SiPython },
      { label: 'SQL' },
      { label: 'HTML & CSS' },
    ],
  },
  {
    title: 'Frameworks',
    skills: [
      { label: 'ASP.NET Core', icon: SiDotnet },
      { label: '.NET 10' },
      { label: 'React', icon: SiReact },
      { label: 'Next.js', icon: SiNextdotjs },
      { label: 'Entity Framework Core' },
      { label: 'Redux', icon: SiRedux },
    ],
  },
  {
    title: 'Databases',
    skills: [
      { label: 'SQL Server', icon: SiMysql },
      { label: 'PostgreSQL', icon: SiPostgresql },
    ],
  },
  {
    title: 'Cloud',
    skills: [
      { label: 'AWS Lambda' },
      { label: 'AWS ECS' },
      { label: 'AWS S3' },
      { label: 'AWS RDS' },
      { label: 'AWS CloudWatch' },
    ],
  },
  {
    title: 'Developer Tools',
    skills: [
      { label: 'Git', icon: SiGithub },
      { label: 'GitHub', icon: SiGithub },
      { label: 'Docker', icon: SiDocker },
      { label: 'Swagger', icon: SiSwagger },
      { label: 'Postman' },
      { label: 'Cursor AI', icon: SiCursor },
    ],
  },
  {
    title: 'Concepts',
    skills: [
      { label: 'REST APIs' },
      { label: 'Microservices' },
      { label: 'JWT Auth' },
      { label: 'Clean Architecture' },
      { label: 'Agile' },
      { label: 'CI/CD' },
      { label: 'Production Support' },
    ],
  },
]

/* ---------------------------------------------------------------------------
   Education & certifications
--------------------------------------------------------------------------- */
export type Education = {
  school: string
  degree?: string
  period: string
  location: string
}

export const education: Education[] = [
  {
    school: 'S.N.J.B. Late Sau. Kantabai Bhavarlalji Jain College of Engineering',
    degree: 'B.E. in Computer Science · 8.88 CGPA',
    period: 'Aug 2019 – Aug 2023',
    location: 'Chandwad, MH',
  },
  {
    school: 'ARTH — LinuxWorld Informatics Pvt Ltd',
    period: 'Sept 2020 – Dec 2021',
    location: 'Jaipur, RJ',
  },
]

export type Certification = {
  title: string
  issuer: string
}

export const certifications: Certification[] = [
  { title: 'Microsoft Azure Fundamentals (AZ-900)', issuer: 'Microsoft' },
  { title: 'AWS AI Learning Track', issuer: 'AWS' },
  { title: 'Runner-Up — Hexaware Maverick Designathon 2026', issuer: 'Hexaware Technologies' },
]
