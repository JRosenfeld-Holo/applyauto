export interface BlogPostData {
  slug: string;
  title: string;
  h1: string;
  metaDescription: string;
  publishDate: string;
  updatedDate: string;
  readTime: number;
  category: string;
  excerpt: string;
  sections: {
    heading?: string;
    paragraphs: string[];
  }[];
}

export const blogPosts: BlogPostData[] = [
  {
    slug: "why-no-response-to-job-applications",
    title: "Why You're Not Getting Responses to Job Applications (And How to Fix It)",
    h1: "Why you're not getting responses to job applications",
    metaDescription:
      "Applied to dozens of jobs and heard nothing back? Here's exactly why — ATS filters, timing, missing follow-up — and what to do about each one.",
    publishDate: "2026-05-02",
    updatedDate: "2026-05-23",
    readTime: 7,
    category: "Job Search Strategy",
    excerpt:
      "Most candidates assume silence means rejection. Usually it means their application never reached a human. Here's what's actually happening and how to fix it.",
    sections: [
      {
        paragraphs: [
          "You applied. You waited. Nothing. After a week, you applied to ten more. Still nothing. If this is your job search right now, you're not doing anything wrong — you're just running into a system that was designed to filter people out, not in.",
          "The average corporate job posting gets 250 applications. Hiring managers personally review maybe 15 to 20 of them. The rest get filtered before a human ever sees them. Understanding where your application is getting stopped is the first step to changing the outcome.",
        ],
      },
      {
        heading: "Your resume isn't passing the ATS filter",
        paragraphs: [
          "Most companies use applicant tracking systems (ATS) to screen resumes before a recruiter reads them. These systems parse your resume for keywords that match the job description. If you're missing enough of them, your application gets marked as a low match and buried.",
          "The fix is simpler than most people think. Read the job description. Identify the exact phrases used for the skills and experience you have. Use those same phrases in your resume, not synonyms. If the job says \"cross-functional collaboration\" and your resume says \"worked with multiple teams,\" the ATS may not connect them.",
          "Format also matters. Multi-column layouts, text boxes, and tables can confuse ATS parsers. A single-column resume with standard section headers parses more reliably.",
        ],
      },
      {
        heading: "You applied too late",
        paragraphs: [
          "Applications submitted within the first 24 hours of a posting being live are significantly more likely to receive a response. LinkedIn data shows that roles often fill within the first three to five days of posting — not because the job closes, but because the hiring team starts scheduling interviews with early applicants and the rest of the pile gets deprioritized.",
          "Most job seekers browse job boards a few times a week. By the time they find a listing and apply, it's already four days old. Setting up daily job alerts and applying same-day to strong matches materially improves response rates.",
        ],
      },
      {
        heading: "Nobody knows you applied",
        paragraphs: [
          "Submitting an application through a company portal is necessary but not sufficient. The application goes into a queue. A recruiter may see it in a week. They may not see it at all if the pile is large enough.",
          "Candidates who follow up directly with the hiring manager after applying see response rates roughly three times higher than those who only submit through the portal. This doesn't mean calling them — it means a short, specific LinkedIn message or email referencing your application and one concrete reason your background fits.",
          "Two sentences is enough. \"I applied for the [role] yesterday and wanted to reach out directly. My background in [specific thing] is directly relevant to [thing from the job description] — happy to chat if it's useful.\" That's it.",
        ],
      },
      {
        heading: "You're applying to roles that aren't a real fit",
        paragraphs: [
          "Volume without targeting produces noise. If you're applying to any role that looks vaguely relevant, your application quality goes down and your match rate goes down with it.",
          "Most ATS systems score candidates on how well their profile matches the job requirements. A 60% match on a strong application doesn't beat an 85% match on a weaker one. Applying to 50 roles where you're a partial fit produces fewer responses than applying to 15 where you're a genuine match.",
        ],
      },
      {
        heading: "What to do about it",
        paragraphs: [
          "The combination that consistently produces better results: apply early to well-matched roles, optimize your resume keywords for each application, and follow up with the hiring manager within 24 hours of applying.",
          "That's a lot to do manually when you're applying to dozens of roles. Tools like ApplyAuto handle the application submissions and hiring manager outreach automatically — so you're doing both without the time cost of doing each one by hand.",
        ],
      },
    ],
  },

  {
    slug: "how-to-contact-hiring-manager-after-applying",
    title: "How to Contact a Hiring Manager After Applying (With Examples)",
    h1: "How to contact a hiring manager after applying",
    metaDescription:
      "Reaching out to the hiring manager after you apply can triple your response rate. Here's how to find them, what to say, and what to avoid.",
    publishDate: "2026-05-05",
    updatedDate: "2026-05-20",
    readTime: 6,
    category: "Hiring Manager Outreach",
    excerpt:
      "Hiring manager outreach after applying is the highest-ROI action in a job search. Most candidates skip it. Here's the exact approach that gets responses.",
    sections: [
      {
        paragraphs: [
          "Submitting a job application through a company portal is table stakes. The candidates who actually get interviews are often the ones who did one thing more: they reached out to the person running the hiring process directly.",
          "Research consistently shows candidates who contact the hiring manager after applying receive responses at two to three times the rate of those who only submit through the portal. Yet the vast majority of applicants never do it. That gap is your advantage.",
        ],
      },
      {
        heading: "How to find the hiring manager",
        paragraphs: [
          "LinkedIn is the most reliable starting point. Search for the company name plus a title that would own the role you're applying to. If you're applying for a product designer role, look for the Head of Design, VP of Product Design, or Design Director. For engineering roles, look for the Engineering Manager or VP of Engineering at the right company size.",
          "Alternatively, search LinkedIn for people who list the company in their current role with titles like \"hiring manager,\" \"recruiter,\" or \"talent acquisition.\" Recruiters can be useful too — a message to an internal recruiter is better than no message at all.",
          "If the job posting lists a contact name, that's your person. Some job descriptions mention the team lead or department head by name.",
        ],
      },
      {
        heading: "What to say (and what not to)",
        paragraphs: [
          "The message needs to be short. Hiring managers aren't reading long cold pitches. Two to three sentences, a clear connection between your background and the role, and a low-pressure close.",
          "What works: \"I applied for the [role title] this morning and wanted to reach out directly. I've spent the last four years building [specific relevant thing] at [company], which maps closely to what you're building. Happy to send over more context if it's useful.\"",
          "What doesn't: generic compliments about the company, restating your entire resume, asking for a favor without giving a reason, or anything longer than four sentences. Hiring managers get a lot of messages. The ones that get responses are specific and brief.",
          "Don't say you're \"passionate\" about the company or that this is your \"dream job.\" Name the actual work. Reference something specific about the role or the team's recent work if you can find it.",
        ],
      },
      {
        heading: "When to send it",
        paragraphs: [
          "Same day as your application, or within 24 hours. Roles fill fast — often within the first week of posting. A message sent four days after you apply is less useful than one sent the same afternoon.",
          "If you're applying to many roles, this becomes a logistics problem. Manually finding the hiring manager and crafting a message for each application isn't scalable past a handful of roles per week.",
        ],
      },
      {
        heading: "LinkedIn vs. email",
        paragraphs: [
          "LinkedIn is the default channel because it's easy to find the right person and the message arrives in a professional context. Connection requests with a note have a lower open rate than InMail, but InMail requires a premium account.",
          "If you can find a work email through the company's website or a tool like Hunter.io, email often gets higher response rates than LinkedIn messages — especially for senior hiring managers who are more reachable by email than on LinkedIn.",
        ],
      },
    ],
  },

  {
    slug: "how-many-jobs-to-apply-to-per-day",
    title: "How Many Jobs Should You Apply to Per Day?",
    h1: "How many jobs should you apply to per day?",
    metaDescription:
      "The answer depends on your approach. Applying to 3 well-targeted roles beats 30 generic ones. Here's how to find your right number and hit it consistently.",
    publishDate: "2026-05-07",
    updatedDate: "2026-05-07",
    readTime: 5,
    category: "Job Search Strategy",
    excerpt:
      "There's no universal right answer — but there is a wrong one. Spraying 50 applications a week without targeting produces almost nothing. Here's what the data suggests.",
    sections: [
      {
        paragraphs: [
          "Job search advice varies wildly on this. Some career coaches say five applications a day. Others say ten. A few say you should be applying to 30+ to generate enough pipeline. The honest answer is that volume matters far less than targeting.",
          "That said, the mechanics of job searching do favor consistent daily volume over sporadic bursts. Here's how to think about it.",
        ],
      },
      {
        heading: "Why quality-to-volume ratio matters more than raw numbers",
        paragraphs: [
          "Most ATS systems score applicants on fit. A candidate who's an 80% match on ten applications will get more responses than a candidate who's a 50% match on fifty. The applications you send to roles where you're only vaguely qualified hurt your time-to-interview more than they help your pipeline.",
          "The research from LinkedIn's Economic Graph team found that job seekers who applied to fewer, more relevant roles had meaningfully shorter job searches than those who applied broadly. Volume without fit is noise.",
        ],
      },
      {
        heading: "The case for consistent daily volume",
        paragraphs: [
          "Roles fill on a rolling basis. A job posted on Monday might have its first round of interviews scheduled by Thursday. If you're checking job boards weekly, you're often seeing listings that are already being filled.",
          "Applying to three to five well-matched roles per day, every day, outperforms applying to 25 roles on a Saturday. Daily applications mean you're consistently hitting fresh listings within 24 hours of posting — which is when the response rate is highest.",
        ],
      },
      {
        heading: "What a realistic target looks like",
        paragraphs: [
          "For a focused job search where you're doing the applications manually: three to five quality applications per day is sustainable and effective. That's 15 to 25 per week, or 60 to 100 per month. At an average interview rate of 10 to 15% for well-matched applications, that's six to fifteen interviews per month.",
          "If you're automating the application process, 15 to 20 per day becomes achievable without burning out. ApplyAuto runs at up to 20 applications per day — scoring each listing against your background before submitting, so the volume is targeted, not random.",
        ],
      },
      {
        heading: "When to adjust your number",
        paragraphs: [
          "If you're getting a response rate below 5%, the problem isn't volume — it's targeting or your resume. More applications to the same pool won't help. Tighten your criteria, audit your resume for ATS keyword issues, and look at the types of roles you're applying to.",
          "If you're getting response rates above 20%, you might have room to expand. More applications means more pipeline means more negotiating leverage at offer time.",
        ],
      },
    ],
  },

  {
    slug: "what-is-ats-applicant-tracking-system",
    title: "What Is an ATS? How Applicant Tracking Systems Filter Resumes (2026)",
    h1: "What is an ATS and how does it filter your resume?",
    metaDescription:
      "Applicant tracking systems screen most resumes before a human ever reads them. Here's exactly how they work, what they filter out, and how to make sure yours gets through.",
    publishDate: "2026-05-09",
    updatedDate: "2026-05-21",
    readTime: 8,
    category: "ATS & Applications",
    excerpt:
      "75% of resumes are rejected by ATS before a recruiter reads them. Most people don't know why. Here's how these systems work and what you can do about it.",
    sections: [
      {
        paragraphs: [
          "An applicant tracking system (ATS) is software that companies use to collect, organize, and filter job applications. When you submit a resume through a company's careers page, it almost always goes into an ATS first — not a recruiter's inbox.",
          "The ATS parses your resume, extracts your work history, skills, and education, then scores your application against the requirements of the job. Applications below a certain threshold get filtered out before a human reviews them. According to research from Harvard Business School, this automated screening eliminates an estimated 75% of applications.",
        ],
      },
      {
        heading: "Which companies use ATS software?",
        paragraphs: [
          "Most companies with more than 50 employees use some form of ATS. The most common platforms are Greenhouse, Lever, Workday, Taleo, iCIMS, and BambooHR. You can usually tell which one a company uses by looking at the URL of the careers page when you apply.",
          "LinkedIn Easy Apply has its own pipeline separate from the company ATS, which is part of why those applications convert at lower rates — they often don't go through the same structured review process.",
        ],
      },
      {
        heading: "How ATS systems parse and score resumes",
        paragraphs: [
          "ATS software converts your resume to plain text and identifies structured data: contact information, work history (company names, dates, titles), education, and skills. Then it compares what it found to the job requirements.",
          "The scoring is primarily keyword-based. If the job description says the role requires \"Python\" and \"machine learning\" and \"SQL,\" an ATS will look for those exact terms in your resume. Synonyms don't always register. \"Data analysis\" might not score the same as \"data analytics.\" \"ML\" might not register as \"machine learning.\"",
          "Some ATS platforms also factor in semantic matching, meaning they understand related terms — but keyword matching is still the foundation. The safest approach is to mirror the job description's exact phrasing when describing skills and experience you genuinely have.",
        ],
      },
      {
        heading: "Resume formatting that breaks ATS parsing",
        paragraphs: [
          "ATS systems are good at parsing structured, simple resumes. They're bad at parsing complex layouts. The following formatting choices frequently cause parsing errors:",
          "Multi-column layouts. Tables. Text boxes and graphics. Headers and footers (some ATS ignore content in them). Uncommon fonts that don't render properly. Dates in non-standard formats.",
          "A single-column resume using standard section headers (\"Work Experience,\" \"Education,\" \"Skills\") in a common font (Calibri, Arial, Georgia) saves as a PDF correctly and parses reliably across most major ATS platforms.",
        ],
      },
      {
        heading: "How to optimize your resume for ATS without gaming the system",
        paragraphs: [
          "Read the job description carefully and identify skills and qualifications you genuinely have. Where your resume describes those skills differently than the job posting does, update the phrasing to match. This is legitimate keyword matching — you're describing real experience in the language the employer uses.",
          "Add a \"Skills\" or \"Core Competencies\" section that lists your technical and domain skills explicitly. This gives the ATS a structured place to find them even if the same skills appear in different phrasing throughout your work history.",
          "Don't keyword stuff. Some candidates add invisible white text or list dozens of keywords in a skills section hoping to game the ATS. Modern systems flag this, and it backfires badly if it gets through to a recruiter.",
        ],
      },
      {
        heading: "Why ATS optimization alone isn't enough",
        paragraphs: [
          "Getting through the ATS filter puts you in the pile of candidates a recruiter reviews. That pile might still be 50 people deep. Optimizing your resume for ATS improves your chances of being reviewed, but it doesn't guarantee an interview.",
          "The candidates who consistently turn applications into interviews combine ATS optimization with direct hiring manager outreach. Getting your application in front of the actual decision-maker — not just the recruiter queue — is the step most people skip.",
        ],
      },
    ],
  },

  {
    slug: "linkedin-easy-apply-response-rate",
    title: "LinkedIn Easy Apply Has a 3% Response Rate. Here's What Actually Works.",
    h1: "LinkedIn Easy Apply response rate: why it's low and what works instead",
    metaDescription:
      "LinkedIn Easy Apply is fast but produces poor results. Here's the data on why, and what changes actually improve your job application response rate.",
    publishDate: "2026-05-12",
    updatedDate: "2026-05-22",
    readTime: 6,
    category: "Job Search Strategy",
    excerpt:
      "One-click applying is convenient. It's also how you end up in a pile with 400 other candidates and never hear back. Here's what to do instead.",
    sections: [
      {
        paragraphs: [
          "LinkedIn Easy Apply launched in 2011 to make job applications faster. It does that. You can submit an application in under 30 seconds. The problem is that so can everyone else — and the result is application piles that most hiring teams don't have the capacity to review properly.",
          "Recruiters who work at companies that use Easy Apply consistently report the same thing: the volume of Easy Apply submissions is so high that they effectively function as a lottery. A resume needs to be exceptional, or the applicant needs to have already been in touch, to reliably get noticed.",
        ],
      },
      {
        heading: "What happens to Easy Apply submissions",
        paragraphs: [
          "When you click Easy Apply, your LinkedIn profile gets sent to the company's recruiter inbox — not necessarily into their ATS. It doesn't include a cover letter unless you attach one manually. It doesn't go through the company's structured application process.",
          "Many companies use Easy Apply as a top-of-funnel filter, not as the primary application channel. They list the job on LinkedIn to generate traffic, but their internal process starts with candidates who applied through the company careers page. Easy Apply submissions are often reviewed separately, later, and with less attention.",
        ],
      },
      {
        heading: "The response rate data",
        paragraphs: [
          "The numbers vary by industry and role type, but independent surveys of job seekers consistently put LinkedIn Easy Apply response rates in the 3 to 5% range. Applying through a company's direct careers page typically produces response rates of 8 to 12% for well-matched candidates. Adding hiring manager outreach pushes that to 15 to 20%.",
          "The difference isn't marginal. It's the difference between hearing back on 3 applications out of 100 versus hearing back on 18.",
        ],
      },
      {
        heading: "What actually improves response rates",
        paragraphs: [
          "Apply through the company's careers page, not Easy Apply. This takes longer, but your application enters the company's actual hiring workflow rather than a LinkedIn-specific queue.",
          "Apply early. Response rates are highest for applications submitted within 24 hours of a job being posted. Roles that have been live for five or more days have already generated significant volume, and late applications rarely get the same attention.",
          "Contact the hiring manager. This is the single highest-impact change most job seekers can make. A short, specific LinkedIn message or email after applying — not a generic note, but one that references the specific role and connects your background to the team's needs — gets read when the application might not.",
        ],
      },
      {
        heading: "Easy Apply isn't useless",
        paragraphs: [
          "There are cases where Easy Apply makes sense: when you're testing a job search or casting a wide net early, when you have an unusually strong LinkedIn profile relative to the role, or when a company specifically uses LinkedIn as its primary hiring channel.",
          "For a serious job search where you're targeting specific roles at specific companies, Easy Apply should be the exception, not the default.",
        ],
      },
    ],
  },

  {
    slug: "how-long-to-hear-back-after-applying",
    title: "How Long Does It Take to Hear Back After Applying for a Job? (2026)",
    h1: "How long does it take to hear back after applying for a job?",
    metaDescription:
      "Most job seekers wait too long and never follow up. Here's the real timeline for hearing back after applying, by company size and role type, plus when to follow up.",
    publishDate: "2026-05-14",
    updatedDate: "2026-05-14",
    readTime: 5,
    category: "Job Search Strategy",
    excerpt:
      "The average time from application to first response is 3 to 5 business days for roles that will respond at all. After two weeks, the probability of hearing back drops sharply.",
    sections: [
      {
        paragraphs: [
          "The uncertainty after submitting a job application is one of the more frustrating parts of a job search. You don't know if your application was received, if it was reviewed, or if you should follow up.",
          "The data on response timelines is fairly consistent across surveys of recruiters and job seekers. Here's what to expect.",
        ],
      },
      {
        heading: "Average time to first response",
        paragraphs: [
          "For roles where a company intends to move forward with a candidate, the first response typically comes within three to five business days of application submission. This is usually an automated confirmation or a recruiter screening call request.",
          "Larger companies (5,000+ employees) often take longer: one to two weeks is common for a first response, because their hiring processes have more steps and the application volume is higher.",
          "Startups and smaller companies tend to move faster. If you apply to a 50-person company on a Monday, you'll often hear back within two to three days if they're interested.",
        ],
      },
      {
        heading: "When to follow up",
        paragraphs: [
          "If you haven't heard back within one week of applying, it's reasonable to follow up once. The best channel is a short message to the hiring manager or recruiter on LinkedIn, referencing your application and expressing continued interest.",
          "Keep it brief: \"I applied for the [role] last week and wanted to check in. Still very interested — happy to answer any questions about my background.\" One follow-up, one time. More than that reads as desperate rather than interested.",
          "If you've been through multiple interview rounds and are waiting to hear back on a decision, follow up after the timeline they gave you, plus two days. If they said you'd hear by Friday, reach out Monday morning.",
        ],
      },
      {
        heading: "The two-week rule",
        paragraphs: [
          "After two weeks with no response and no follow-up response, the probability of hearing back on that specific application is below 10%. Most open roles that received your application and didn't respond within two weeks have either moved forward with other candidates or put the search on hold.",
          "This doesn't mean you did anything wrong. It means you should move on — keep the company in your pipeline in case a new role opens, but stop waiting for a response to that specific application.",
        ],
      },
      {
        heading: "How to reduce the wait",
        paragraphs: [
          "The fastest path to reducing time-to-response is applying early (within 24 hours of a posting going live) and following up with a direct message to the hiring manager on the same day. Applications that arrive early with a personal touchpoint from the candidate get reviewed faster, period.",
          "Automating the application and outreach process — so every new matching role gets an application and a hiring manager message within hours of posting — is how candidates compress their job search timeline from months to weeks.",
        ],
      },
    ],
  },

  {
    slug: "best-job-boards-2026",
    title: "The Best Job Boards in 2026, Ranked by Response Rate",
    h1: "Best job boards in 2026 — ranked by what actually gets responses",
    metaDescription:
      "Not all job boards produce the same results. Here's how LinkedIn, Indeed, Greenhouse, and others compare on response rates, role quality, and competition.",
    publishDate: "2026-05-16",
    updatedDate: "2026-05-23",
    readTime: 7,
    category: "Job Search Strategy",
    excerpt:
      "Where you apply matters almost as much as how you apply. Here's an honest ranking of the major job boards and what each one is actually good for.",
    sections: [
      {
        paragraphs: [
          "Every major job board will tell you it's the best place to find your next role. The reality is more complicated. Different boards produce different results depending on your industry, seniority level, and how you use them.",
          "This ranking is based on response rate data from independent job seeker surveys, recruiter interviews, and what we see across thousands of applications submitted through ApplyAuto.",
        ],
      },
      {
        heading: "1. Company career pages (highest response rate)",
        paragraphs: [
          "Applying directly through a company's own career portal consistently produces the highest response rates — typically 8 to 15% for well-matched candidates. This is because your application enters the company's actual hiring workflow, not a third-party queue.",
          "The downside: you have to find the jobs. Company career pages don't aggregate listings — you need to know which companies you're targeting and check their sites directly, or use a tool that does it for you.",
          "Platforms like Greenhouse and Lever power the careers pages for thousands of companies. If you see a job application hosted on greenhouse.io or lever.co, you're applying through the company's real ATS — which is a good sign.",
        ],
      },
      {
        heading: "2. LinkedIn (high volume, variable quality)",
        paragraphs: [
          "LinkedIn has the largest job listing volume of any platform and the best tools for finding and contacting the hiring team directly. For that reason, it's still the starting point for most job searches.",
          "Response rates through LinkedIn Easy Apply are low (3 to 5%), but that's a function of how most people use it. Candidates who find the job on LinkedIn but apply through the company's direct careers page — and then message the hiring manager — see much better results.",
          "LinkedIn's best feature for job seekers isn't the apply button. It's the ability to find and reach out to the people doing the hiring.",
        ],
      },
      {
        heading: "3. Indeed (broad reach, lower signal)",
        paragraphs: [
          "Indeed aggregates more job listings than any other platform, including many that aren't posted elsewhere. For industries outside of tech, Indeed often has better coverage than LinkedIn.",
          "The application experience is inconsistent. Some Indeed applications route you to the company's real ATS; others go into Indeed's own pipeline, which many companies don't review closely. Response rates vary widely as a result.",
          "Indeed works best as a discovery tool — find the job on Indeed, then apply through the company's own careers page.",
        ],
      },
      {
        heading: "4. Wellfound (best for startup roles)",
        paragraphs: [
          "Formerly AngelList Talent, Wellfound is the dominant job board for startup roles — particularly Series A through Series C companies. If you're targeting early-stage companies, this is the most useful specialized board.",
          "The application process tends to be faster and less bureaucratic than large-company ATS flows, and response rates are higher for candidates who are a genuine fit.",
        ],
      },
      {
        heading: "5. Specialized boards (best for specific industries)",
        paragraphs: [
          "For certain fields, specialized boards outperform generalist ones. Dice and Built In for tech roles. Behance and Dribbble for design. Mediabistro for media and marketing. Hired for software engineering.",
          "The advantage of specialized boards is lower competition per listing and a more relevant applicant pool, which means your application doesn't get buried in a pile of 400 people who applied to the same generalist board.",
        ],
      },
      {
        heading: "The platform doesn't matter as much as the process",
        paragraphs: [
          "The job board is where you find the role. But the response rate is determined by when you apply, whether you apply through the company's ATS directly, and whether you follow up with the hiring manager. A great process on any board beats a weak process on the best board.",
        ],
      },
    ],
  },

  {
    slug: "follow-up-email-after-applying-for-job",
    title: "How to Write a Follow-Up Email After Applying for a Job (Template + Examples)",
    h1: "How to write a follow-up email after applying for a job",
    metaDescription:
      "Waiting to hear back? A well-timed follow-up email can move your application from the pile to the top. Here's exactly what to write, when to send it, and what to avoid.",
    publishDate: "2026-05-19",
    updatedDate: "2026-05-19",
    readTime: 6,
    category: "Hiring Manager Outreach",
    excerpt:
      "Most candidates never follow up after applying. Those who do — with the right message at the right time — see response rates two to three times higher. Here's the template.",
    sections: [
      {
        paragraphs: [
          "The follow-up email after applying is one of the most underused tools in a job search. Most candidates apply and then wait, hoping the hiring team will reach out. Some never do. The ones who follow up with a specific, relevant message move their application from the bottom of the pile to the top.",
          "This is the full guide: who to contact, when to reach out, what to write, and what kills a follow-up message before it gets read.",
        ],
      },
      {
        heading: "Who to contact",
        paragraphs: [
          "The hiring manager is the best person to reach — they're the one deciding who gets an interview. A recruiter is second best; they control who gets to the hiring manager.",
          "Find the hiring manager on LinkedIn by searching for the company plus a title that would own the role. If you're applying for a marketing analyst position, look for the Marketing Director or VP of Marketing. If the job posting lists a recruiter contact, reach out to them directly.",
          "Don't email the company's general contact email or HR inbox. Your message will get lost.",
        ],
      },
      {
        heading: "When to send it",
        paragraphs: [
          "The highest-impact time to follow up is the same day you apply, or within 24 hours. This isn't a follow-up in the traditional sense — it's simultaneous outreach that accompanies your application.",
          "If you didn't do same-day outreach, follow up five to seven business days after applying. Earlier than five days feels impatient. Later than two weeks is too late to be useful.",
        ],
      },
      {
        heading: "The follow-up email template",
        paragraphs: [
          "Subject: [Role Title] — [Your Name]",
          "Hi [Name],",
          "I applied for the [role title] position [today / last week] and wanted to reach out directly. My background in [specific relevant experience] maps closely to what the role requires — specifically [one concrete connection to the job description].",
          "Happy to answer any questions about my background or send over additional context. Looking forward to the possibility of connecting.",
          "[Your name]",
        ],
      },
      {
        heading: "What makes a follow-up work",
        paragraphs: [
          "Specificity. Generic messages get ignored. The connection between your background and the role needs to be explicit — not \"I'm passionate about your mission\" but \"I spent three years building the exact type of data pipeline this role requires.\"",
          "Brevity. Four sentences is enough. Six is too many. Hiring managers read dozens of messages a day; the ones that get responses are short and immediately clear about why the person is reaching out.",
          "A clear ask. Not \"I'd love to grab coffee\" or \"can we schedule a call?\" — just an offer to provide more context. Lower-stakes asks get more responses.",
        ],
      },
      {
        heading: "What kills a follow-up message",
        paragraphs: [
          "Starting with \"I know you're busy but...\" — it's a filler phrase that wastes the first sentence.",
          "Restating your entire resume. One specific, relevant connection point is more persuasive than a full summary.",
          "Over-enthusiasm without substance. Saying the company is \"amazing\" or the role is \"exactly what I've been looking for\" without connecting it to your actual background reads as noise.",
          "Following up more than twice. One message, one follow-up if no response after a week. Anything more than that damages your candidacy.",
        ],
      },
    ],
  },
];

export function getBlogPostBySlug(slug: string): BlogPostData | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getBlogPostsByCategory(category: string): BlogPostData[] {
  return blogPosts.filter((p) => p.category === category);
}

export const blogCategories = [
  "Job Search Strategy",
  "ATS & Applications",
  "Hiring Manager Outreach",
  "Automation",
];
