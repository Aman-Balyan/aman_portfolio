export const portfolio = {
  name: "Aman Balyan",
  shortName: "Aman",
  title: "Software Engineer",

  roles: [
    "Software Engineer",
    // "Backend Developer",
    // "Java Developer",
    // "QA Automation Engineer",
    // "DevOps Practitioner",
  ],

  description:
    "I build scalable backend systems, automation frameworks, and modern web applications focused on performance, reliability, and clean architecture.",

  email: "balyanaman013@gmail.com",
  phone: "+91 8307070466",
  location: "India",
  linkedin: "www.linkedin.com/in/aman-balyan13",
  resume: "./Aman_Balyan_Resume.pdf",

  about: {
    summary:
      "Software Engineer with 2+ years building production-grade REST APIs, workflow automation systems, and client-facing platforms. I've worked across compliance and energy domains at early-stage startups — stepping up as product owner on multiple regional platform rollouts, owning requirement gathering, team coordination, and UAT sign-off end to end.",
    highlights: [
      { value: "2+",  label: "Years Experience"     },
      { value: "4",   label: "Companies"            },
      { value: "3+",  label: "Platforms Deployed"   },
      { value: "50+", label: "Defects Tracked"      },
    ],
  },

  skills: [
    {
      category: "Languages",
      items: ["Java", "Python", "SQL", "Bash"],
    },
    {
      category: "Frameworks",
      items: ["Spring Boot", "Spring MVC", "Spring Security", "Hibernate/JPA", "React.js", "REST Assured"],
    },
    {
      category: "Cloud & DevOps",
      items: ["AWS EC2", "AWS S3", "AWS VPC", "Docker", "Jenkins", "CI/CD"],
    },
    {
      category: "Databases & Messaging",
      items: ["MySQL", "Redis", "Kafka"],
    },
    {
      category: "Testing & QA",
      items: ["Selenium WebDriver", "TestNG", "Postman", "SonarQube"],
    },
    {
      category: "Tools",
      items: ["Git", "GitHub", "Maven", "JIRA"],
    },
  ],

  experience: [
    {
      company: "FIOS Compliance",
      role: "Software Engineer",
      period: "Nov 2025 – Jun 2026",
      type: "Full-time",
      points: [
        "Designed and maintained Spring Boot REST APIs powering core compliance workflows with multi-source data ingestion and business rule validation across multiple client environments.",
        "Built React.js dashboard components with real-time data rendering, integrating directly with Spring Boot APIs for live compliance reporting.",
        "Built Selenium WebDriver automation pipelines to extract and normalize data from multiple external sources, replacing manual data collection — including dynamic JS-rendered pages via headless browser execution.",
        "Automated end-to-end ETL workflows using Java and Selenium, significantly reducing turnaround time for compliance reporting cycles.",
      ],
    },
    {
      company: "GNA Energy",
      role: "Software Engineer",
      period: "Sep 2024 – Oct 2025",
      type: "Full-time",
      points: [
        "Managed Power Sector BD for AdaniBoard, leading client meetings with PTC, HPPC, and other enterprise stakeholders.",
        "Owned full-cycle delivery of region-specific web platforms — gathered requirements, managed cross-functional delegation, and drove UAT sign-off across multiple state deployments.",
        "Designed and developed Spring Boot REST APIs for internal energy reporting platforms across multiple state-level deployments.",
        "Built ETL data processing modules using Kafka for event streaming and Redis for distributed caching.",
      ],
    },
    {
      company: "JPFT",
      role: "QA Intern",
      period: "Jun 2024 – Sep 2024",
      type: "Internship",
      points: [
        "Wrote and executed functional, regression, and smoke test cases across multiple application modules.",
        "Tracked 50+ defects end-to-end in JIRA across the full bug lifecycle.",
        "Built automated regression test scripts using Selenium WebDriver, reducing manual testing cycles significantly.",
      ],
    },
    {
      company: "Xebia",
      role: "DevOps Intern",
      period: "Aug 2023 – Nov 2023",
      type: "Internship",
      points: [
        "Deployed a full-stack employee management portal on AWS EC2 with CI/CD pipelines using Jenkins and Docker.",
        "Integrated SonarQube into the CI/CD workflow for automated code quality checks, improving overall code health.",
      ],
    },
  ],




projects: [
    {
      title: "AI Question Generation System",
      description:
        "Python and Flask REST API backend for AI-powered question generation and automated answer evaluation. Integrates NLP-based semantic similarity scoring for intelligent response assessment without manual intervention.",
      tech: ["Python", "Flask", "NLP", "REST API", "AI/ML"],
      type: "AI / Backend",
    },
    {
      title: "Inventory Optimization Engine",
      description:
        "Implemented Ant Colony Optimization (ACO) and Markov Decision Process (MDP) algorithms in Java to simulate and optimize inventory allocation across dynamic supply chain scenarios.",
      tech: ["Java", "ACO Algorithm", "MDP", "Optimization"],
      type: "Algorithms",
    },
    {
      title: "Employee Management Portal",
      description:
        "Deployed a full-stack employee management portal on AWS EC2 with Jenkins and Docker CI/CD pipelines. Integrated SonarQube for automated code quality checks across the team.",
      tech: ["AWS EC2", "Docker", "Jenkins", "CI/CD", "SonarQube"],
      type: "DevOps",
    }
 
  ]};