export interface RolePageData {
  slug: string;
  title: string;
  h1: string;
  metaDescription: string;
  painPoint: string;
  stat: string;
  jobBoards: string[];
  avgApplications: number;
  topCompanies: string[];
}

export interface GuidePageData {
  slug: string;
  title: string;
  h1: string;
  metaDescription: string;
  intro: string;
  steps: { heading: string; body: string }[];
}

export const rolePages: RolePageData[] = [
  {
    slug: "software-engineers",
    title: "Automated Job Applications for Software Engineers",
    h1: "Stop filling out engineering job applications manually.",
    metaDescription:
      "ApplyAuto automatically applies to software engineering roles on LinkedIn, Indeed, and company career portals — then contacts the hiring manager directly. Average 18.4% interview rate.",
    painPoint:
      "Engineering job boards are full of duplicate listings and ATS forms that ask for everything already on your resume. Most engineers spend 3–5 hours a week on applications that never get a response.",
    stat: "The average software engineering job posting receives 250+ applications. The ones that get interviews aren't just well-qualified — they followed up with the hiring manager directly.",
    jobBoards: ["LinkedIn", "Indeed", "Greenhouse", "Lever", "Workday"],
    avgApplications: 20,
    topCompanies: ["Google", "Stripe", "Vercel", "Linear", "Figma"],
  },
  {
    slug: "product-managers",
    title: "Automated Job Applications for Product Managers",
    h1: "Stop filling out product management applications manually.",
    metaDescription:
      "ApplyAuto automatically applies to PM roles on LinkedIn, Indeed, and company portals — then reaches out to the hiring manager. Start free.",
    painPoint:
      "PM roles attract hundreds of applicants. Most hiring managers never see your application past the ATS filter unless someone who knows the role vouches for you — or you reach out directly.",
    stat: "Product management roles receive an average of 400+ applicants per opening. Response rates for candidates who contact the hiring manager directly are 3x higher than those who only submit through the portal.",
    jobBoards: ["LinkedIn", "Indeed", "Greenhouse", "Lever"],
    avgApplications: 20,
    topCompanies: ["Notion", "Figma", "Stripe", "Atlassian", "Shopify"],
  },
  {
    slug: "data-scientists",
    title: "Automated Job Applications for Data Scientists",
    h1: "Stop filling out data science job applications manually.",
    metaDescription:
      "ApplyAuto automatically applies to data science roles and contacts the hiring manager directly. 18.4% average interview rate. Start free.",
    painPoint:
      "Data science job postings often require a portfolio review before an interview is offered. Getting your application in front of the right person early — before the pile builds — matters more than most candidates realize.",
    stat: "Data science roles have grown 36% year-over-year according to LinkedIn's 2024 Jobs Report, but competition has grown proportionally. First-mover advantage on new postings is measurable.",
    jobBoards: ["LinkedIn", "Indeed", "Greenhouse", "Workday", "Databricks Careers"],
    avgApplications: 20,
    topCompanies: ["Databricks", "OpenAI", "Anthropic", "Scale AI", "Snowflake"],
  },
  {
    slug: "marketing-managers",
    title: "Automated Job Applications for Marketing Managers",
    h1: "Stop filling out marketing job applications manually.",
    metaDescription:
      "ApplyAuto automatically applies to marketing roles and contacts hiring managers directly. Start free, no credit card required.",
    painPoint:
      "Marketing roles are among the most competitive on job boards, with generic descriptions that make it hard to stand out in the ATS. Getting a message to the actual hiring manager changes the dynamic entirely.",
    stat: "Marketing manager roles receive an average of 350+ applications per posting. Less than 20% of applicants ever follow up with the hiring team directly.",
    jobBoards: ["LinkedIn", "Indeed", "Greenhouse", "Lever"],
    avgApplications: 20,
    topCompanies: ["HubSpot", "Mailchimp", "Canva", "Buffer", "Sprout Social"],
  },
  {
    slug: "designers",
    title: "Automated Job Applications for Designers",
    h1: "Stop filling out design job applications manually.",
    metaDescription:
      "ApplyAuto automatically applies to UX, product design, and graphic design roles — then contacts the hiring manager directly. Start free.",
    painPoint:
      "Design roles require a portfolio review that happens after the ATS stage. Getting your name in front of a design lead before they've read 200 applications is the difference between a callback and silence.",
    stat: "The average UX design role attracts 300+ applicants within the first 48 hours of posting. Applications submitted in the first 24 hours are 60% more likely to receive a response.",
    jobBoards: ["LinkedIn", "Indeed", "Dribbble", "Greenhouse", "Lever"],
    avgApplications: 20,
    topCompanies: ["Figma", "Adobe", "Notion", "Linear", "Framer"],
  },
];

export const guidePages: GuidePageData[] = [
  {
    slug: "how-to-automate-job-applications",
    title: "How to Automate Job Applications in 2026 — Complete Guide",
    h1: "How to automate job applications",
    metaDescription:
      "Step-by-step guide to automating your job search in 2026. Learn how to use AI tools to apply to jobs automatically and contact hiring managers without spending hours on forms.",
    intro:
      "Automating job applications means using software to find relevant job listings, fill out application forms on your behalf, and follow up with hiring managers — cutting the time you spend on applications from hours to minutes per week.",
    steps: [
      {
        heading: "Set your job search criteria",
        body: "Define the job titles you're targeting, your preferred locations, and whether you want remote, hybrid, or in-office roles. Good automation tools let you set seniority level, salary range, and company size filters so you're not applying to roles that aren't a fit.",
      },
      {
        heading: "Upload your resume once",
        body: "Your resume is the source of truth. A job application automation tool parses your work history, skills, and education — then uses that data to fill out ATS forms accurately. You review the extracted data before anything goes out.",
      },
      {
        heading: "Let the tool apply automatically",
        body: "Once configured, the software monitors job boards for new listings that match your criteria, scores each one against your background, and submits applications to strong matches. Most tools support LinkedIn, Indeed, Greenhouse, Lever, and Workday.",
      },
      {
        heading: "Automate hiring manager outreach",
        body: "The step most candidates skip: contacting the hiring manager directly after applying. Automated outreach tools identify the relevant person at each company and send a short, personalized message referencing your application and why your background fits the role.",
      },
      {
        heading: "Monitor and refine",
        body: "Track your interview rate by role type, company size, and location to understand where you're getting traction. Most users see measurable results within the first two weeks — if you're not getting responses, adjust your job criteria or resume before applying to more.",
      },
    ],
  },
  {
    slug: "how-to-apply-to-100-jobs",
    title: "How to Apply to 100 Jobs Without Spending 100 Hours",
    h1: "How to apply to 100 jobs (without spending 100 hours on it)",
    metaDescription:
      "The practical guide to applying to 100 jobs efficiently — using automation to handle ATS forms, cover letters, and hiring manager outreach without burning out.",
    intro:
      "Applying to 100 jobs manually takes roughly 150–200 hours if you do it properly — researching each role, tailoring your resume, filling out forms, and writing outreach. Automation cuts that to under 2 hours of active work.",
    steps: [
      {
        heading: "Start with a focused target list",
        body: "100 applications to the right roles beats 500 to anything that vaguely matches. Narrow your criteria: 3–5 job titles, specific seniority levels, industries you have background in, and geography. Volume without targeting produces noise.",
      },
      {
        heading: "Use one resume, not 100 versions",
        body: "The research on resume tailoring shows marginal benefit for most candidates — ATS systems parse for keyword matches, and you can address fit in the outreach message instead. A strong general resume applied consistently outperforms 100 slightly-tweaked versions.",
      },
      {
        heading: "Automate the form-filling",
        body: "ATS form submission is the most time-consuming part of applying at scale. Tools like ApplyAuto create an account on each careers portal, upload your resume, fill in work history and education, and submit — handling 20+ applications per day automatically.",
      },
      {
        heading: "Prioritize companies where you have a real fit",
        body: "AI match scoring reads each job description against your background and flags your strongest matches. Apply to the top 30% first — those are where you'll get responses, and responses early give you negotiating leverage later.",
      },
      {
        heading: "Send outreach to hiring managers in parallel",
        body: "Every application should be paired with a short message to whoever manages that team. It doesn't need to be long — two sentences about your background and why you applied is enough to get noticed. Automate this with templates built around your actual experience.",
      },
    ],
  },
  {
    slug: "linkedin-easy-apply-alternative",
    title: "LinkedIn Easy Apply Alternatives — What Actually Works in 2026",
    h1: "LinkedIn Easy Apply alternatives that actually get responses",
    metaDescription:
      "LinkedIn Easy Apply is fast but gets low response rates. Here are the best alternatives for automating job applications in 2026 — including full ATS submission and hiring manager outreach.",
    intro:
      "LinkedIn Easy Apply lets you submit a job application in two clicks, but those applications land in a pile with hundreds of others and often never get read. The alternatives that work go further: they submit to the actual company ATS and follow up with the hiring manager directly.",
    steps: [
      {
        heading: "Why LinkedIn Easy Apply has a low response rate",
        body: "Easy Apply sends your LinkedIn profile to a recruiter inbox. It doesn't submit to the company's ATS, doesn't include a cover letter by default, and competes with hundreds of identical one-click submissions. Hiring managers rarely see Easy Apply submissions before a recruiter filters them.",
      },
      {
        heading: "Apply directly to the company careers page",
        body: "Applications submitted through a company's own portal (Greenhouse, Lever, Workday, etc.) go directly into their hiring pipeline. They're taken more seriously than Easy Apply submissions because they require more effort — and that effort signals genuine interest.",
      },
      {
        heading: "Add a direct message to the hiring manager",
        body: "The single highest-ROI action in a job search: a short, specific message to the person hiring for the role. It doesn't need to be elaborate. Two sentences connecting your background to what they're building, sent via LinkedIn or email, gets read when the application alone wouldn't.",
      },
      {
        heading: "Use automation to do both at scale",
        body: "ApplyAuto submits applications directly to company career portals — not Easy Apply — and sends outreach to the hiring manager for each one. Users applying to 20 roles per day report interview rates of 18.4%, compared to 3–5% for LinkedIn Easy Apply alone.",
      },
    ],
  },
];

export function getRoleBySlug(slug: string): RolePageData | undefined {
  return rolePages.find((r) => r.slug === slug);
}

export function getGuideBySlug(slug: string): GuidePageData | undefined {
  return guidePages.find((g) => g.slug === slug);
}
