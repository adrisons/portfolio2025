export const config = {
  // Personal Information
  name: "Adrian Pereira Guerra",
  title: "Senior Front-End Engineer",
  description:
    "Building exceptional web experiences at Empathy.co. Specializing in React, Next.js, and modern front-end technologies.",
  company: "Empathy.co",

  // Social Links
  githubUsername: "adrisons",
  contactInfo: {
    email: "contact@example.com",
    linkedin: "https://linkedin.com/in/adrianpg",
    github: "https://github.com/adrisons",
    bluesky: "https://bsky.app/profile/adpegu.bsky.social",
  },

  // About Me
  about: {
    title: "About Me",
    description: [
      "I am a front-end developer with experience working in multidisciplinary teams, designing solutions that integrate software, system architecture, and business needs. Additionally, I enjoy leading technical teams: fostering trust-based relationships, motivating people, and resolving conflicts so that everyone can do their best.",
      "I also actively participate in defining OKRs and engaging in strategic conversations with stakeholders. I collaborate closely with design, QA, and product teams to ensure that solutions are robust, efficient, and aligned with project goals.",
    ],
  },

  // Experience
  experiences: [
    {
      id: 1,
      role: "Senior Front-End Engineer",
      company: "Empathy.co",
      location: "Remote",
      period: "Apr 2022 - Present",
      description: `Led a development team to deliver high-quality results through collaborative efforts and transparent communication, while bridging the gap between cross-functional teams to ensure alignment on shared objectives. 
      Focused on proactive technical planning, stakeholder engagement, and the development of flexible technical solutions. Key contributions include enhancing the Playboard tool, partnering with the core product team, and delivering a tailored solution for a major e-commerce client.`,
      skills: [
        "React",
        "Next.js",
        "TypeScript",
        "JavaScript",
        "CSS",
        "Vue",
        "Jest",
        "Playwright",
      ],
    },
  ],

  // Skills
  skillCategories: [
    {
      id: "frontend",
      label: "Frontend",
      skills: [
        { name: "Vue", level: 90 },
        { name: "TypeScript", level: 90 },
        { name: "JavaScript", level: 90 },
        { name: "HTML/CSS", level: 90 },
        { name: "React", level: 80 },
        { name: "Next.js", level: 80 },
        { name: "Angular", level: 75 },
      ],
    },
    {
      id: "tools",
      label: "Tools & Platforms",
      skills: [
        { name: "Git", level: 90 },
        { name: "Jest", level: 85 },
        { name: "GitHub Actions", level: 80 },
        { name: "Storybook", level: 80 },
        { name: "Github Copilot", level: 75 },
        { name: "RxJS", level: 70 },
        { name: "Cypress", level: 70 },
        { name: "Playwright", level: 60 },
      ],
    },
    {
      id: "soft-skills",
      label: "Soft Skills",
      skills: [
        { name: "Communication", level: 95 },
        { name: "Teamwork", level: 90 },
        { name: "Leadership", level: 85 },
        { name: "Problem Solving", level: 85 },
        { name: "Time Management", level: 75 },
        { name: "Conflict Resolution", level: 80 },
        { name: "Emotional Intelligence", level: 70 },
        { name: "Self confidence", level: 60 },
      ],
    },
  ],

  // RSS Feed Configuration
  rss: {
    rssFeedUrl: "https://frontendtherapy.substack.com/feed",
    placeholderImage: "/placeholder.svg?height=200&width=400",
    newsletterTitle: "Frontend Therapy Newsletter",
    newsletterDescription:
      "I write about frontend development, React, performance optimization, and UI/UX design. Join thousands of developers who receive practical tips and insights directly in their inbox.",
    subscribeFormAction: "https://frontendtherapy.substack.com/",
    subscribeEmbedUrl: "https://frontendtherapy.substack.com/embed",
    visitLink: "https://frontendtherapy.substack.com/",
    whySubscribe: [
      "Tips for improving team performance and fostering collaboration",
      "Actionable advice for becoming a better technical leader",
      "Personal stories and lessons learned from solving complex technical challenges",
      "Strategies to enhance team happiness and productivity",
      "Exclusive content on building and leading high-performing teams",
      "Real-world examples of overcoming technical and organizational hurdles",
    ],
  },
};
