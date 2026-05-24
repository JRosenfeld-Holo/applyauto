"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { blogPosts } from "@/lib/blog-data";
import {
  ArrowRight,
  Sparkles,
  Play,
  Check,
  ChevronDown,
  Terminal,
  Briefcase,
  Mail,
  ChevronRight,
  TrendingUp,
  Settings,
  Upload,
  Zap,
  Users,
  Clock,
} from "lucide-react";

interface SimulatorJob {
  id: string;
  title: string;
  company: string;
  logo: string;
  matchScore: number;
  roleType: string;
  location: string;
  hiringManager: {
    name: string;
    title: string;
    avatar: string;
  };
  strategy: {
    valueProp: string;
    emailSubject: string;
    emailBody: string;
  };
  atsLogs: string[];
}

const mockJobs: SimulatorJob[] = [
  {
    id: "job-1",
    title: "Senior Frontend Engineer",
    company: "Vercel",
    logo: "▲",
    matchScore: 98,
    roleType: "Remote / USA",
    location: "San Francisco, CA",
    hiringManager: {
      name: "Guillermo Rauch",
      title: "CEO & Co-founder",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop",
    },
    strategy: {
      valueProp: "Strong match: 6 years building high-performance web apps, open-source contributor, directly relevant experience.",
      emailSubject: "Re: Frontend Engineer role",
      emailBody: "Guillermo —\n\nSaw Vercel is growing the core team. I've spent the last 3 years building rendering tools that cut load times by 40% at scale — feels like a natural fit.\n\nAlready submitted via your portal. Happy to share specifics if helpful.\n\nBest,\n[Candidate]",
    },
    atsLogs: [
      "✅ Found: Senior Frontend Engineer at Vercel — 98% match",
      "🔗 Opening Vercel careers portal...",
      "📬 Creating a dedicated inbox for this application",
      "✍️  Setting up your candidate account...",
      "📧 Verified your email — account active",
      "📂 Uploading your resume to the portal",
      "📝 Filling in your work history and education",
      "🔒 Completing security checks...",
      "🚀 Submitting your application...",
      "✅ Done! Application confirmed · Ref: VRCL-901847",
    ],
  },
  {
    id: "job-2",
    title: "Staff AI Platform Engineer",
    company: "OpenAI",
    logo: "⬡",
    matchScore: 94,
    roleType: "Hybrid / SF",
    location: "San Francisco, CA",
    hiringManager: {
      name: "Sarah Jenkins",
      title: "Director of Platform Engineering",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
    },
    strategy: {
      valueProp: "Strong match: infrastructure background, experience scaling distributed systems, aligns with OpenAI's platform roadmap.",
      emailSubject: "Platform Engineer role at OpenAI",
      emailBody: "Sarah —\n\nI applied through OpenAI's portal for the Platform role and wanted to reach out directly.\n\nI've spent 4 years scaling distributed systems — cut latency by 18% at my last company. Feels relevant to what your team is building.\n\nOpen to a quick call if you'd like to hear more.\n\nBest,\n[Candidate]",
    },
    atsLogs: [
      "✅ Found: Staff AI Platform Engineer at OpenAI — 94% match",
      "🔗 Opening OpenAI careers portal...",
      "📬 Creating a dedicated inbox for this application",
      "✍️  Setting up your candidate account...",
      "📧 Email verified — account ready",
      "📂 Uploading your resume...",
      "📝 Auto-filling your work history and skills",
      "🔒 Completing security verification...",
      "🚀 Submitting your application...",
      "✅ Done! Application received · Status: Applied",
    ],
  },
  {
    id: "job-3",
    title: "Senior Software Engineer",
    company: "Linear",
    logo: "Ⓛ",
    matchScore: 89,
    roleType: "Remote / Global",
    location: "Global",
    hiringManager: {
      name: "Karri Saarinen",
      title: "Co-founder & CEO",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop",
    },
    strategy: {
      valueProp: "Good match: product-minded engineer with relevant open-source work and remote experience.",
      emailSubject: "Software Engineer — your open role",
      emailBody: "Karri —\n\nBig fan of Linear's approach to product. I applied for the engineering role and wanted to introduce myself directly.\n\nI've built offline-first sync engines that handle real-time collaboration at scale — seems relevant given your architecture.\n\nWould love to chat if there's a fit.\n\nBest,\n[Candidate]",
    },
    atsLogs: [
      "✅ Found: Senior Software Engineer at Linear — 89% match",
      "🔗 Opening Linear careers portal...",
      "📬 Setting up a dedicated inbox for this application",
      "✍️  Creating your candidate account...",
      "📂 Uploading resume and covering note...",
      "📝 Filling in your experience — 6 years mapped",
      "🚀 Submitting your application...",
      "✅ Done! Application received · Status: Confirmed",
    ],
  },
];

export default function Home() {
  const [activeJobId, setActiveJobId] = useState<string>("job-1");
  const [simulatorTab, setSimulatorTab] = useState<"apply" | "outreach">("apply");
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState<number>(0);
  const [faqOpen, setFaqOpen] = useState<Record<number, boolean>>({});

  const [railAtStart, setRailAtStart] = useState<boolean>(true);

  const terminalRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const simulatorIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const activeJob = mockJobs.find((j) => j.id === activeJobId) || mockJobs[0];

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logs]);

  const runSimulator = () => {
    if (isRunning) return;
    setIsRunning(true);
    setLogs([]);
    setProgress(0);
    setSimulatorTab("apply");

    if (simulatorIntervalRef.current) clearInterval(simulatorIntervalRef.current);

    let currentLogIndex = 0;
    const targetLogs = activeJob.atsLogs;

    simulatorIntervalRef.current = setInterval(() => {
      if (currentLogIndex < targetLogs.length) {
        setLogs((prev) => [...prev, targetLogs[currentLogIndex]]);
        setProgress(Math.round(((currentLogIndex + 1) / targetLogs.length) * 100));
        currentLogIndex++;
      } else {
        if (simulatorIntervalRef.current) {
          clearInterval(simulatorIntervalRef.current);
          simulatorIntervalRef.current = null;
        }
        setIsRunning(false);
      }
    }, 850);
  };

  useEffect(() => {
    setLogs(["🤖 Standing by. Pick a job and click 'Watch It Apply' to see ApplyAuto in action."]);
    setProgress(0);
    setIsRunning(false);
    if (simulatorIntervalRef.current) {
      clearInterval(simulatorIntervalRef.current);
      simulatorIntervalRef.current = null;
    }
  }, [activeJobId]);

  useEffect(() => {
    return () => {
      if (simulatorIntervalRef.current) clearInterval(simulatorIntervalRef.current);
    };
  }, []);

  const toggleFaq = (index: number) => {
    setFaqOpen((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const testimonials = [
    {
      quote: "I applied to 80 jobs in 4 days without touching a single form. ApplyAuto handled everything — account creation, uploads, submissions. I spent that time prepping for interviews instead. Signed my offer at Vercel last week.",
      author: "Alex Rivera",
      role: "Staff Frontend Engineer",
      company: "Now at Vercel",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=150&auto=format&fit=crop",
    },
    {
      quote: "What I didn't expect was how good the outreach messages were. Actual hiring managers replied to me. Not recruiters — the people who make the call. My response rate went from basically zero to 18% in the first two weeks.",
      author: "Jessica Chen",
      role: "Senior Engineer",
      company: "Now at Supabase",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
    },
    {
      quote: "I'd tried every job board and cold email template you can think of. Nothing worked like this. ApplyAuto found the right people, sent the right message, and got me a conversation I never would have had otherwise. Job hunting used to feel hopeless. Not anymore.",
      author: "Liam O'Connor",
      role: "Director of Product",
      company: "Now at Linear",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop",
    },
    {
      quote: "The first week I was skeptical. By week two I had three interviews lined up. ApplyAuto doesn't just blast applications — it finds roles where you're actually a fit and writes outreach that gets replies. I'd never gotten a response from a cold message before this.",
      author: "Marcus T.",
      role: "Product Manager",
      company: "Now at Figma",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
    },
    {
      quote: "Three months of applying manually with nothing to show. Two weeks with ApplyAuto and I had five interviews. The hiring manager outreach is what nobody else does — and it's the thing that actually works.",
      author: "Priya Sharma",
      role: "Data Engineer",
      company: "Now at Databricks",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop",
    },
  ];

  const faqs = [
    {
      q: "How is this different from just applying on job boards?",
      a: "Job boards make you do the work: find the listing, fill out the form, write a cover letter, do it 50 more times. ApplyAuto handles all of that. But the bigger difference is what happens after you apply — it finds the actual hiring manager and sends them a short note on your behalf, which is the move most candidates never bother with because it takes too long to do manually.",
    },
    {
      q: "Will employers know I used ApplyAuto?",
      a: "No. Your resume goes out as your resume. Your contact details, your name, your words in the outreach. We write each message using your actual experience against the specific job description, so they read like something you spent 20 minutes on — because we did.",
    },
    {
      q: "How personalized is the outreach to hiring managers?",
      a: "ApplyAuto reads the job description against your background, figures out what's actually relevant to that specific role, and writes a short message built around it. The research alone would take you 20 minutes per application; we do it in seconds, for every one.",
    },
    {
      q: "Can I see what it's doing before it sends anything?",
      a: "Yes. Review mode queues every application for your approval before anything goes out. Most people switch to full auto after the first week once they see what the messages look like. But you can stay in review mode indefinitely if you prefer.",
    },
    {
      q: "What kinds of jobs can it apply to?",
      a: "Any job posted on LinkedIn, Indeed, or company career pages using standard hiring portals. You tell us what roles and locations you're targeting, and ApplyAuto handles the rest — including filtering out jobs where your background isn't a strong fit.",
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "@id": "https://applyauto.ai/#software",
        "name": "ApplyAuto",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Web",
        "description": "ApplyAuto is an automated job application software that applies to jobs on your behalf on LinkedIn, Indeed, and company career portals, then contacts the hiring manager directly with a personalized message.",
        "offers": [
          {
            "@type": "Offer",
            "name": "Explore",
            "price": "0",
            "priceCurrency": "USD",
            "description": "3 applications per week, basic job matching, resume profile builder"
          },
          {
            "@type": "Offer",
            "name": "Autopilot",
            "price": "49",
            "priceCurrency": "USD",
            "billingPeriod": "P1M",
            "description": "20 applications per day, LinkedIn outreach to hiring managers, personalized email for every job, hiring manager contact discovery, AI match scoring"
          }
        ],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "reviewCount": "1200",
          "bestRating": "5"
        },
        "featureList": [
          "Automated ATS form submission",
          "Hiring manager contact discovery",
          "Personalized outreach email generation",
          "LinkedIn message sequencing",
          "AI-powered job match scoring",
          "Resume parsing and profile builder"
        ]
      },
      {
        "@type": "Organization",
        "@id": "https://applyauto.ai/#organization",
        "name": "ApplyAuto",
        "url": "https://applyauto.ai",
        "logo": "https://applyauto.ai/logo.webp",
        "description": "ApplyAuto automates the job application process — submitting applications to ATS portals and sending personalized outreach to hiring managers on behalf of job seekers.",
        "sameAs": []
      },
      {
        "@type": "FAQPage",
        "@id": "https://applyauto.ai/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How is automated job application software different from applying on job boards?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Job boards make you do the work: find the listing, fill out the form, write a cover letter, do it 50 more times. ApplyAuto handles all of that automatically. It also finds the actual hiring manager and sends them a short note on your behalf — the move most candidates never bother with because it takes too long to do manually."
            }
          },
          {
            "@type": "Question",
            "name": "Will employers know I used ApplyAuto to apply to their jobs?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No. Your resume goes out as your resume. Your contact details, your name, your words in the outreach. ApplyAuto writes each message using your actual experience against the specific job description, so they read like something you spent 20 minutes on — because it did."
            }
          },
          {
            "@type": "Question",
            "name": "How personalized is the outreach to hiring managers?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "ApplyAuto reads the job description against your background, figures out what's actually relevant to that specific role, and writes a short message built around it. The research alone would take you 20 minutes per application; it does it in seconds, for every one."
            }
          },
          {
            "@type": "Question",
            "name": "Can I review job applications before they are sent?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Review mode queues every application for your approval before anything goes out. Most people switch to full auto after the first week once they see what the messages look like. You can stay in review mode indefinitely if you prefer."
            }
          },
          {
            "@type": "Question",
            "name": "What job portals does ApplyAuto support?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Any job posted on LinkedIn, Indeed, or company career pages using standard hiring portals. You tell ApplyAuto what roles and locations you're targeting, and it handles the rest — including filtering out jobs where your background isn't a strong fit."
            }
          }
        ]
      },
      {
        "@type": "HowTo",
        "@id": "https://applyauto.ai/#howto",
        "name": "How to automate your job applications with ApplyAuto",
        "description": "Set up ApplyAuto in 5 minutes to automatically apply to jobs and contact hiring managers on your behalf.",
        "totalTime": "PT5M",
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Tell ApplyAuto what you want",
            "text": "Enter your target job title, preferred location, and whether you want remote or in-office roles. That's the entire setup."
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Upload your resume",
            "text": "ApplyAuto extracts your work history and skills, then lets you verify the data before anything goes out on your behalf."
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "ApplyAuto runs automatically",
            "text": "Each day it pulls new job listings, scores them against your background, submits applications to strong matches, and sends the hiring manager a personalized note — without you opening a single browser tab."
          }
        ]
      }
    ]
  };

  return (
    <>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
    <div className="bg-black text-zinc-100 font-sans min-h-screen selection:bg-cyan-500/20 selection:text-cyan-200">

      {/* Background ambient glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-gradient-to-r from-blue-600/10 via-cyan-500/5 to-teal-500/10 blur-[140px]" />
        <div className="absolute top-[900px] right-1/4 translate-x-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-r from-cyan-500/6 via-blue-500/8 to-teal-500/5 blur-[160px]" />
        <div className="absolute bottom-[200px] left-10 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-blue-600/5 via-cyan-500/8 to-transparent blur-[150px]" />
      </div>

      <SiteHeader />

      {/* Hero */}
      <section className="relative z-10 overflow-hidden pt-20 sm:pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <iframe
            src="https://my.spline.design/glowingplanetparticles-HmCVKutonlFn3Oqqe6DI9nWi/"
            style={{ border: "none" }}
            width="100%"
            height="100%"
            title="Background animation"
          />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto text-center space-y-7">

          <div className="inline-flex">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#06b6d4]/30 bg-[#06b6d4]/8 px-3 py-1 text-xs font-semibold text-[#06b6d4]">
              <Sparkles className="h-3.5 w-3.5 animate-pulse" />
              Now in private beta
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-[76px] font-bold text-white tracking-tight font-bricolage max-w-4xl mx-auto leading-[1.02]">
            Stop filling out{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#2563eb] via-[#06b6d4] to-[#10d9a0] whitespace-nowrap">
              job applications.
            </span>
          </h1>

          <p className="max-w-xl mx-auto text-base sm:text-lg text-zinc-300 leading-relaxed">
            Upload your resume once. ApplyAuto applies to jobs on your behalf, then reaches out to the actual hiring manager — all while you sleep.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-2">
            <a href="#onboarding" className="button min-w-[170px] select-none decoration-transparent">
              <div className="points_wrapper">
                {[...Array(10)].map((_, i) => <i key={i} className="point" />)}
              </div>
              <span className="inner font-bricolage text-sm font-bold tracking-wide">
                Start for Free
                <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
                  <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                </svg>
              </span>
            </a>
            <a href="#simulator" className="inline-flex items-center gap-2 hover:bg-white/5 text-sm font-semibold text-zinc-200 border border-white/10 rounded-full px-6 py-3 backdrop-blur transition-all">
              <Play className="h-4 w-4 text-zinc-400 fill-zinc-400" />
              Watch It Work
            </a>
          </div>

          <div className="pt-6 flex flex-wrap justify-center gap-x-8 gap-y-3 text-xs font-semibold text-zinc-500 uppercase tracking-widest">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#10d9a0]" />
              50+ apps per night
            </div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#06b6d4]" />
              18x more interviews
            </div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#2563eb]" />
              5-min setup
            </div>
          </div>
        </div>
      </section>

      {/* App Simulator */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 pb-20">
        <div id="simulator" className="relative mt-0 max-w-5xl mx-auto scroll-mt-24">
          <div className="absolute inset-0 -top-8 mx-auto h-56 max-w-4xl rounded-[28px] bg-gradient-to-r from-[#2563eb]/20 via-[#06b6d4]/10 to-[#10d9a0]/15 blur-3xl z-0" />

          <div className="relative z-10 border border-white/10 bg-[#07070a]/90 rounded-2xl shadow-2xl backdrop-blur-xl overflow-hidden">

            {/* Window chrome */}
            <div className="border-b border-white/5 px-4 py-3 bg-[#0d0d12]/60 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-full bg-red-500/30 border border-red-500/50" />
                <span className="h-3 w-3 rounded-full bg-yellow-500/30 border border-yellow-500/50" />
                <span className="h-3 w-3 rounded-full bg-green-500/30 border border-green-500/50" />
                <div className="h-4 w-px bg-white/10 mx-2" />
                <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-[#06b6d4]" />
                  ApplyAuto Live Demo
                </span>
              </div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-[#06b6d4]/10 px-2 py-0.5 border border-[#06b6d4]/25 text-[10px] font-bold text-[#06b6d4]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#06b6d4] animate-ping" />
                Engine Ready
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">

              {/* Job list */}
              <div className="lg:col-span-4 border-r border-white/5 p-4 lg:p-5 flex flex-col gap-4 bg-[#08080c]/50">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Matched Jobs</h3>
                  <div className="flex items-center gap-1 text-[11px] text-zinc-500">
                    <TrendingUp className="w-3 h-3 text-[#10d9a0]" />
                    <span>Live feed</span>
                  </div>
                </div>

                <div className="space-y-2 flex-1">
                  {mockJobs.map((job) => (
                    <button
                      key={job.id}
                      onClick={() => setActiveJobId(job.id)}
                      className={`w-full text-left p-3.5 rounded-xl border transition-all flex flex-col gap-2 ${
                        activeJobId === job.id
                          ? "bg-white/5 border-[#06b6d4]/30 shadow-[inset_0_0_12px_rgba(6,182,212,0.08)]"
                          : "bg-transparent border-white/5 hover:border-white/10 hover:bg-white/[0.02]"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2.5">
                          <span className="h-8 w-8 rounded-lg bg-zinc-800 flex items-center justify-center font-bold text-sm text-zinc-200 border border-white/5">
                            {job.logo}
                          </span>
                          <div>
                            <h4 className="text-xs font-bold text-white truncate max-w-[130px]">{job.title}</h4>
                            <p className="text-[10px] text-zinc-400">{job.company}</p>
                          </div>
                        </div>
                        <div className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                          job.matchScore >= 95
                            ? "bg-[#10d9a0]/10 border-[#10d9a0]/30 text-[#10d9a0]"
                            : "bg-[#06b6d4]/10 border-[#06b6d4]/20 text-[#06b6d4]"
                        }`}>
                          {job.matchScore}%
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-zinc-600 mt-1 pt-2 border-t border-white/5">
                        <span>{job.roleType}</span>
                        <span>{job.location}</span>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="pt-2 border-t border-white/5">
                  <button
                    onClick={runSimulator}
                    disabled={isRunning}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#2563eb] to-[#10d9a0] hover:opacity-90 transition-all font-bold text-xs text-white py-3 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isRunning ? (
                      <>
                        <span className="h-3.5 w-3.5 rounded-full border-2 border-white/20 border-t-white animate-spin" />
                        Applying now...
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5 fill-current" />
                        Watch It Apply
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Detail panel */}
              <div className="lg:col-span-8 flex flex-col">

                {/* Tabs */}
                <div className="border-b border-white/5 bg-[#09090d]/80 px-4 py-2 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setSimulatorTab("apply")}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                        simulatorTab === "apply"
                          ? "bg-white/5 text-white ring-1 ring-white/10"
                          : "text-zinc-400 hover:text-zinc-200"
                      }`}
                    >
                      <Briefcase className="w-3.5 h-3.5 text-[#2563eb]" />
                      Auto-Apply
                    </button>
                    <button
                      onClick={() => setSimulatorTab("outreach")}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                        simulatorTab === "outreach"
                          ? "bg-white/5 text-white ring-1 ring-white/10"
                          : "text-zinc-400 hover:text-zinc-200"
                      }`}
                    >
                      <Mail className="w-3.5 h-3.5 text-[#06b6d4]" />
                      Hiring Manager Outreach
                    </button>
                  </div>

                  {/* Progress bar — always visible after first run */}
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-white/5 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-[#2563eb] to-[#10d9a0] h-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    {progress > 0 && <span className="text-[10px] font-mono text-zinc-500">{progress}%</span>}
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col bg-[#050508]/40">

                  {simulatorTab === "apply" ? (
                    <div className="flex-1 flex flex-col gap-4">
                      <div className="flex items-center gap-2 text-xs text-zinc-400">
                        <span className="h-2 w-2 rounded-full bg-[#06b6d4] animate-pulse" />
                        <span>Application agent running</span>
                      </div>

                      {/* Log terminal */}
                      <div ref={terminalRef} className="flex-1 min-h-[220px] max-h-[300px] border border-white/5 bg-[#030305]/95 rounded-xl p-4 font-mono text-xs text-zinc-300 space-y-2 overflow-y-auto">
                        {logs.map((log, idx) => (
                          <div key={idx} className="flex gap-2">
                            <span className="text-zinc-700 select-none shrink-0">{String(idx + 1).padStart(2, "0")}</span>
                            <span className={
                              log.includes("✅")
                                ? "text-emerald-400 font-semibold"
                                : log.includes("📧") || log.includes("📬")
                                ? "text-cyan-300"
                                : "text-zinc-300"
                            }>
                              {log}
                            </span>
                          </div>
                        ))}
                        {isRunning && (
                          <div className="flex items-center gap-1.5 text-zinc-600 animate-pulse">
                            <span>▊</span>
                          </div>
                        )}
                      </div>

                      {/* Job info footer */}
                      <div className="border border-white/5 bg-[#09090d]/60 rounded-xl p-3.5 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{activeJob.logo}</span>
                          <div>
                            <h4 className="text-xs font-bold text-white">{activeJob.title}</h4>
                            <p className="text-[10px] text-zinc-500">{activeJob.company}</p>
                          </div>
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                          activeJob.matchScore >= 95
                            ? "bg-[#10d9a0]/10 border-[#10d9a0]/30 text-[#10d9a0]"
                            : "bg-[#06b6d4]/10 border-[#06b6d4]/20 text-[#06b6d4]"
                        }`}>
                          {activeJob.matchScore}% match
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex-1 flex flex-col gap-4">

                      {/* Hiring manager + strategy */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                        <div className="border border-white/5 bg-[#0a0a0f] rounded-xl p-4 flex items-center gap-3.5">
                          <img
                            src={activeJob.hiringManager.avatar}
                            alt={activeJob.hiringManager.name}
                            className="h-12 w-12 rounded-xl object-cover ring-1 ring-white/10"
                          />
                          <div>
                            <span className="text-[9px] font-bold text-[#06b6d4] uppercase tracking-widest">Hiring Contact Found</span>
                            <h4 className="text-xs font-bold text-white mt-0.5">{activeJob.hiringManager.name}</h4>
                            <p className="text-[10px] text-zinc-400">{activeJob.hiringManager.title}</p>
                          </div>
                        </div>

                        <div className="border border-white/5 bg-[#0a0a0f] rounded-xl p-4 flex flex-col justify-center">
                          <span className="text-[9px] font-bold text-[#10d9a0] uppercase tracking-widest">Why You're a Fit</span>
                          <p className="text-[11px] text-zinc-300 font-medium leading-relaxed mt-1">
                            {activeJob.strategy.valueProp}
                          </p>
                        </div>
                      </div>

                      {/* Email preview */}
                      <div className="border border-white/5 bg-[#030305]/95 rounded-xl flex flex-col overflow-hidden text-xs">
                        <div className="border-b border-white/5 bg-white/[0.02] px-4 py-2 text-zinc-400 flex flex-col gap-1 font-mono text-[10px]">
                          <div><span className="text-zinc-600">TO: </span>{activeJob.hiringManager.name.toLowerCase().replace(" ", ".")}@{activeJob.company.toLowerCase()}.com</div>
                          <div><span className="text-zinc-600">SUBJECT: </span>{activeJob.strategy.emailSubject}</div>
                        </div>
                        <div className="p-4 font-mono text-[11px] text-zinc-300 whitespace-pre-wrap leading-relaxed min-h-[160px] max-h-[160px] overflow-y-auto">
                          {activeJob.strategy.emailBody}
                        </div>
                      </div>

                      {/* LinkedIn sequence */}
                      <div className="flex items-center gap-3 justify-between bg-white/[0.02] border border-white/5 rounded-xl px-4 py-2.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[10px] font-semibold text-zinc-500 uppercase">LinkedIn:</span>
                          {["View profile", "Connect", "Follow-up (3 days)"].map((step, i, arr) => (
                            <React.Fragment key={step}>
                              <span className={`text-[10px] px-2 py-0.5 rounded border ${
                                i === 1 ? "bg-cyan-500/10 border-cyan-500/20 text-cyan-400" : "bg-white/5 border-white/10 text-zinc-300"
                              }`}>{step}</span>
                              {i < arr.length - 1 && <ChevronRight className="w-3 h-3 text-zinc-700" />}
                            </React.Fragment>
                          ))}
                        </div>
                        <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-widest shrink-0">Queued</span>
                      </div>

                    </div>
                  )}

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <section className="relative z-10 border-y border-white/5 bg-white/[0.01] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { stat: "18.4%", label: "Average interview rate" },
            { stat: "4 min", label: "Time per application" },
            { stat: "1,200+", label: "Job seekers using it now" },
            { stat: "85%", label: "Less time on applications" },
          ].map(({ stat, label }) => (
            <div key={label} className="space-y-1">
              <div className="text-3xl sm:text-4xl font-bold font-bricolage text-white tracking-tight">{stat}</div>
              <div className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 scroll-mt-20">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <p className="text-xs font-bold text-[#10d9a0] uppercase tracking-widest">What ApplyAuto does for you</p>
            <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight font-bricolage leading-tight">
              You focus on the job.<br />We handle everything else.
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 max-w-xl mx-auto">
              Most people spend 80% of their job search on things that aren't interviews. ApplyAuto handles those so you can spend that time preparing for the ones you get.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <Briefcase className="w-5 h-5" />,
                color: "blue",
                title: "Applies while you sleep",
                desc: "ApplyAuto finds matching jobs, creates your account on each careers portal, uploads your resume, fills out every form, and hits submit. You wake up with applications already in.",
                bullets: ["All major job portals supported", "Dedicated inbox per application"],
              },
              {
                icon: <Users className="w-5 h-5" />,
                color: "cyan",
                title: "Goes direct to the hiring manager",
                desc: "We find the person who'll actually make the hire — not a recruiter screening keywords — and send a short note about why your background fits what they're building. It takes us seconds. Doing it manually takes hours, which is why most candidates skip it.",
                bullets: ["Each message references the specific role", "LinkedIn + email outreach"],
              },
              {
                icon: <Zap className="w-5 h-5" />,
                color: "teal",
                title: "Only applies where you'll get noticed",
                desc: "ApplyAuto reads each job description against your resume and scores the match. If it's weak, we skip it. If it's strong, we apply — and write the outreach to prove why.",
                bullets: ["Scores every role before applying", "Each outreach is written to the specific job"],
              },
            ].map(({ icon, color, title, desc, bullets }) => {
              const colors = {
                blue: { bg: "bg-[#2563eb]/10", border: "border-[#2563eb]/20", text: "text-[#2563eb]", bullet: "#2563eb" },
                cyan: { bg: "bg-[#06b6d4]/10", border: "border-[#06b6d4]/20", text: "text-[#06b6d4]", bullet: "#06b6d4" },
                teal: { bg: "bg-[#10d9a0]/10", border: "border-[#10d9a0]/20", text: "text-[#10d9a0]", bullet: "#10d9a0" },
              }[color]!;
              const glows = {
                blue: ["hsla(220,82%,55%,0.35)", "hsla(200,90%,60%,0.35)", "hsla(189,94%,43%,0.35)"],
                cyan: ["hsla(189,94%,43%,0.35)", "hsla(170,90%,50%,0.35)", "hsla(161,86%,46%,0.35)"],
                teal: ["hsla(161,86%,46%,0.35)", "hsla(150,85%,50%,0.35)", "hsla(189,94%,43%,0.35)"],
              }[color]!;
              const beams = {
                blue: ["hsl(220,82%,60%)", "hsl(189,94%,55%)"],
                cyan: ["hsl(189,94%,55%)", "hsl(161,86%,55%)"],
                teal: ["hsl(161,86%,55%)", "hsl(220,82%,60%)"],
              }[color]!;
              return (
                <div
                  key={title}
                  className="relative hover:bg-white/[0.04] transition-all duration-300 rounded-2xl p-6 flex flex-col gap-5"
                  style={{
                    backgroundColor: "hsla(240,15%,9%,1)",
                    backgroundImage: `radial-gradient(at 88% 40%,hsla(240,15%,9%,1) 0px,transparent 85%),radial-gradient(at 49% 30%,hsla(240,15%,9%,1) 0px,transparent 85%),radial-gradient(at 14% 26%,hsla(240,15%,9%,1) 0px,transparent 85%),radial-gradient(at 0% 64%,${glows[0]} 0px,transparent 85%),radial-gradient(at 41% 94%,${glows[1]} 0px,transparent 85%),radial-gradient(at 100% 99%,${glows[2]} 0px,transparent 85%)`,
                    boxShadow: "0px -16px 24px 0px rgba(255,255,255,0.25) inset",
                  }}
                >
                  {/* Animated rotating border */}
                  <div style={{ overflow: "hidden", pointerEvents: "none", position: "absolute", zIndex: -10, top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "calc(100% + 2px)", height: "calc(100% + 2px)", backgroundImage: "linear-gradient(0deg,hsl(0,0%,100%) -50%,hsl(0,0%,40%) 100%)", borderRadius: "1rem" }}>
                    <div style={{ pointerEvents: "none", position: "fixed", zIndex: 200, top: "50%", left: "50%", transform: "translate(-50%,-50%) rotate(0deg)", transformOrigin: "left", width: "200%", height: "10rem", backgroundImage: `linear-gradient(0deg,hsla(0,0%,100%,0) 0%,${beams[0]} 40%,${beams[1]} 60%,hsla(0,0%,40%,0) 100%)`, animation: "rotate 8s linear infinite" }} />
                  </div>

                  <div className={`h-10 w-10 rounded-xl ${colors.bg} border ${colors.border} flex items-center justify-center ${colors.text}`}>
                    {icon}
                  </div>
                  <div className="space-y-2.5">
                    <h3 className="text-lg font-bold text-white tracking-tight">{title}</h3>
                    <p className="text-sm text-zinc-400 leading-relaxed">{desc}</p>
                  </div>
                  <ul className="text-xs text-zinc-400 space-y-2.5 mt-auto pt-4 border-t border-white/5">
                    {bullets.map((b) => (
                      <li key={b} className="flex items-center gap-2.5">
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "1rem", height: "1rem", backgroundColor: colors.bullet, borderRadius: "50%", flexShrink: 0 }}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="hsla(240,15%,9%,1)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 6 9 17l-5-5" />
                          </svg>
                        </div>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="relative z-10 py-24 border-t border-white/5 bg-white/[0.01] scroll-mt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            <div className="lg:col-span-6 space-y-7">
              <span className="inline-block text-[10px] font-bold text-[#06b6d4] uppercase tracking-widest bg-[#06b6d4]/10 px-2.5 py-1 rounded-full border border-[#06b6d4]/20">
                Setup
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight font-bricolage leading-tight">
                Set it up in 5 minutes. Then close your laptop.
              </h2>
              <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
                One resume upload and a few job preferences. That's it. ApplyAuto runs daily after that — scoring new listings against your background and applying to the ones that are actually worth your time.
              </p>

              <div className="space-y-5 pt-2">
                {[
                  {
                    n: "1",
                    title: "Tell us what you want",
                    desc: "Job title, location, remote or in-office. That's the whole setup.",
                  },
                  {
                    n: "2",
                    title: "We read your resume",
                    desc: "ApplyAuto extracts your experience and lets you verify before anything goes out.",
                  },
                  {
                    n: "3",
                    title: "The engine runs itself",
                    desc: "Each day it pulls new listings, applies to strong matches, and sends the hiring manager a note — without you opening a single browser tab.",
                  },
                ].map(({ n, title, desc }) => (
                  <div key={n} className="flex gap-3.5">
                    <div className="h-6 w-6 rounded-full bg-[#2563eb]/10 border border-[#2563eb]/20 flex items-center justify-center font-bold text-xs text-[#06b6d4] shrink-0 mt-0.5">{n}</div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{title}</h4>
                      <p className="text-xs text-zinc-400 mt-1">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mockup UI */}
            <div className="lg:col-span-6 border border-white/10 bg-[#07070a]/90 rounded-2xl p-5 md:p-6 backdrop-blur-xl shadow-xl space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <Settings className="w-4 h-4 text-[#06b6d4]" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Your Profile</span>
                </div>
                <span className="text-[10px] font-mono text-zinc-500 bg-white/5 px-2 py-0.5 rounded border border-white/5">Step 2 of 3</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-white/5 bg-[#040406] rounded-xl p-4 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-zinc-500 uppercase font-medium">resume.pdf</span>
                    <Upload className="w-3.5 h-3.5 text-zinc-400" />
                  </div>
                  <div className="border border-white/5 bg-white/[0.02] rounded-lg p-3 text-[10px] text-zinc-400 space-y-2 h-[150px] overflow-y-auto">
                    <p className="text-white font-semibold">ALEX RIVERA</p>
                    <p className="text-[9px] text-zinc-500">alex@example.com · San Francisco, CA</p>
                    <p className="pt-2 border-t border-white/5 text-zinc-400">EXPERIENCE</p>
                    <p className="font-semibold text-zinc-300">Staff Engineer — Vercel</p>
                    <p className="text-[9px] text-zinc-500">2022 – Present</p>
                    <p className="text-[9px] text-zinc-400">Built rendering tools that cut page load times by 40%.</p>
                  </div>
                </div>

                <div className="border border-white/5 bg-[#040406] rounded-xl p-4 flex flex-col gap-3.5">
                  <span className="text-[10px] text-zinc-500 uppercase font-medium">What you're looking for</span>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-[10px] text-zinc-500 mb-1">Target roles</label>
                      <input readOnly value="Staff Engineer, Tech Lead, Principal" className="w-full bg-white/5 border border-white/10 rounded px-2.5 py-1.5 text-[11px] text-white focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-[10px] text-zinc-500 mb-1">Work style</label>
                      <div className="flex gap-2">
                        <span className="text-[9px] bg-[#06b6d4]/10 border border-[#06b6d4]/30 text-[#06b6d4] px-2 py-0.5 rounded font-semibold">Remote</span>
                        <span className="text-[9px] bg-white/5 border border-white/10 text-zinc-400 px-2 py-0.5 rounded">Hybrid</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] text-zinc-500 mb-1">Daily application limit</label>
                      <input readOnly value="20 applications / day" className="w-full bg-white/5 border border-white/10 rounded px-2.5 py-1.5 text-[11px] text-white focus:outline-none" />
                    </div>
                  </div>
                </div>
              </div>

              <button className="w-full bg-gradient-to-r from-[#2563eb] to-[#10d9a0] hover:opacity-90 transition-all text-white font-bold text-xs py-3 rounded-xl shadow-lg">
                Start Applying Automatically
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <div className="relative z-10 px-3 sm:px-6 md:px-10">
        <section className="w-full max-w-7xl mx-auto mt-24 rounded-3xl border border-[#2563eb]/20 p-6 shadow-2xl" style={{ backgroundColor: "#09091a" }}>

          <div className="flex gap-6 items-center px-1 sm:px-0">
            <h2 className="text-[40px] sm:text-6xl lg:text-7xl leading-[0.9] text-white font-bricolage tracking-tighter shrink-0">
              Testimonials.
            </h2>
            <span aria-hidden="true" className="w-px shrink-0 bg-[#2563eb]/20 h-10" />
            <p className="sm:text-base text-sm text-neutral-400 tracking-tight">
              People who stopped spending evenings on job boards.
            </p>
          </div>

          <div className="h-px bg-[#2563eb]/20 mt-4" />

          <div className="relative overflow-hidden h-[420px] rounded-3xl mt-6">
            <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10" style={{ background: "linear-gradient(to right, #09091a, transparent)" }} />
            <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10" style={{ background: "linear-gradient(to left, #09091a, transparent)" }} />

            <div
              ref={railRef}
              onScroll={(e) => setRailAtStart(e.currentTarget.scrollLeft < 8)}
              className="flex gap-6 overflow-x-auto scroll-smooth px-6 absolute inset-0 items-center"
              style={{ scrollbarWidth: "none" }}
            >
              {testimonials.map(({ quote, author, role, company, avatar }, i) => {
                const rotations = ["-rotate-1", "rotate-1", "-rotate-2", "rotate-2", "-rotate-1"];
                return (
                  <article
                    key={author}
                    className={`min-w-[420px] sm:min-w-[520px] max-w-[640px] border rounded-[24px] p-8 text-neutral-100 snap-center shadow-2xl shrink-0 ${rotations[i % rotations.length]}`}
                    style={{ backgroundColor: "#0d0e1c", borderColor: "rgba(37,99,235,0.25)" }}
                  >
                    <p className="text-lg sm:text-xl md:text-2xl text-neutral-100 tracking-tight leading-snug">
                      &ldquo;{quote}&rdquo;
                    </p>
                    <div className="mt-8 flex items-center gap-3">
                      <img src={avatar} alt={author} className="w-10 h-10 rounded-xl object-cover" />
                      <div>
                        <div className="text-sm font-semibold tracking-tight text-white">{author}</div>
                        <div className="text-xs text-neutral-400 tracking-tight">{role} · <span className="text-[#10d9a0]">{company}</span></div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="absolute bottom-6 right-6 z-20 flex items-center gap-3">
              <button
                aria-label="Previous"
                onClick={() => railRef.current?.scrollBy({ left: -540, behavior: "smooth" })}
                disabled={railAtStart}
                className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-[#2563eb]/25 bg-[#2563eb]/10 text-neutral-100 hover:bg-[#2563eb]/30 transition-colors disabled:opacity-40 disabled:pointer-events-none"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
              </button>
              <button
                aria-label="Next"
                onClick={() => railRef.current?.scrollBy({ left: 540, behavior: "smooth" })}
                className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#06b6d4] hover:bg-[#10d9a0] text-[#09091a] transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </button>
            </div>
          </div>

        </section>
      </div>

      {/* Pricing */}
      <section id="pricing" className="relative z-10 mt-32 mb-16 scroll-mt-20">
        <div className="pointer-events-none absolute -z-10 inset-0">
          <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-[#2563eb]/10 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 h-80 w-80 rounded-full bg-[#06b6d4]/10 blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 text-sm text-[#06b6d4]/80 mb-4 uppercase tracking-widest font-bold">
              Pricing Plans
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl tracking-tight text-white font-bricolage font-bold">
              Choose your plan
            </h2>
            <p className="mt-5 text-base md:text-lg leading-relaxed text-white/70 max-w-2xl mx-auto">
              Start free. Upgrade when ApplyAuto starts getting you interviews.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">

            {/* Explore */}
            <div className="bg-white/5 ring-1 ring-white/10 rounded-3xl p-8 flex flex-col">
              <div className="mb-6">
                <h3 className="text-xl tracking-tight text-white font-bricolage font-semibold">Explore</h3>
                <p className="mt-2 text-sm text-white/60">Test the waters. No credit card needed.</p>
              </div>
              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl tracking-tight text-white font-bricolage font-semibold">$0</span>
                  <span className="text-white/50 text-sm">/month</span>
                </div>
              </div>
              <a href="#onboarding" className="block w-full text-center text-sm font-semibold text-white bg-white/5 ring-1 ring-white/10 rounded-full py-3 px-4 hover:bg-white/10 transition">
                Get Started Free
              </a>
              <ul className="mt-8 space-y-4 flex-1">
                {["3 applications per week", "Basic job matching", "Resume profile builder", "Community support"].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-white/70">
                    <Check className="w-5 h-5 text-[#2563eb] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Autopilot */}
            <div className="bg-gradient-to-br from-[#2563eb]/10 via-[#06b6d4]/10 to-[#10d9a0]/10 ring-2 ring-[#06b6d4]/50 rounded-3xl p-8 relative flex flex-col shadow-[0_0_40px_rgba(6,182,212,0.1)]">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-gradient-to-r from-[#2563eb] via-[#06b6d4] to-[#10d9a0] rounded-full px-3 py-1 whitespace-nowrap">
                  <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/></svg>
                  Most Popular
                </span>
              </div>
              <div className="mb-6">
                <h3 className="text-xl tracking-tight text-white font-bricolage font-semibold">Autopilot</h3>
                <p className="mt-2 text-sm text-white/60">Full job search running in the background.</p>
              </div>
              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl tracking-tight text-white font-bricolage font-semibold">$49</span>
                  <span className="text-white/50 text-sm">/month</span>
                </div>
              </div>
              <a href="#onboarding" className="block w-full text-center text-sm font-semibold text-white bg-gradient-to-r from-[#2563eb] via-[#06b6d4] to-[#10d9a0] rounded-full py-3 px-4 hover:opacity-90 transition shadow-[0_8px_30px_rgba(6,182,212,0.25)]">
                Start Autopilot — $49/mo
              </a>
              <ul className="mt-8 space-y-4 flex-1">
                {[
                  "20 applications per day",
                  "LinkedIn outreach to hiring managers",
                  "Personalized email for every job",
                  "Hiring manager contact discovery",
                  "AI match scoring",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-white/70">
                    <Check className="w-5 h-5 text-[#06b6d4] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* For Teams */}
            <div className="bg-white/5 ring-1 ring-white/10 rounded-3xl p-8 flex flex-col">
              <div className="mb-6">
                <h3 className="text-xl tracking-tight text-white font-bricolage font-semibold">For Teams</h3>
                <p className="mt-2 text-sm text-white/60">Recruiting agencies and career coaches.</p>
              </div>
              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl tracking-tight text-white font-bricolage font-semibold">Custom</span>
                </div>
              </div>
              <a href="#onboarding" className="block w-full text-center text-sm font-semibold text-white bg-white/5 ring-1 ring-white/10 rounded-full py-3 px-4 hover:bg-white/10 transition">
                Talk to Us
              </a>
              <ul className="mt-8 space-y-4 flex-1">
                {[
                  "Everything in Autopilot",
                  "Unlimited applications",
                  "Managed accounts for multiple candidates",
                  "Dedicated support & SLA",
                  "Custom reporting",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-white/70">
                    <Check className="w-5 h-5 text-[#10d9a0] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          <div className="mt-16 text-center">
            <p className="text-sm text-white/60">
              Have questions?{" "}
              <a href="#faqs" className="text-[#06b6d4] hover:text-[#10d9a0] transition">View our FAQ</a>
              {" "}or{" "}
              <a href="#onboarding" className="text-[#06b6d4] hover:text-[#10d9a0] transition">chat with us</a>
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faqs" className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 bg-black scroll-mt-20">
        <div className="max-w-3xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <p className="text-xs font-bold text-[#10d9a0] uppercase tracking-widest">Questions</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-bricolage">
              Honest answers
            </h2>
          </div>

          <div className="space-y-2.5">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border border-white/5 bg-[#07070a]/60 hover:bg-[#0b0b10] rounded-xl overflow-hidden transition-colors">
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left px-5 py-4 flex items-center justify-between text-sm font-semibold text-white"
                >
                  <span className="pr-4">{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-zinc-500 transition-transform shrink-0 ${faqOpen[idx] ? "rotate-180 text-[#10d9a0]" : ""}`} />
                </button>
                {faqOpen[idx] && (
                  <div className="px-5 pb-5 text-sm text-zinc-400 leading-relaxed border-t border-white/5 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Insights */}
      <section id="blog" className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 border-t border-white/5 scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid gap-8 lg:gap-12 lg:grid-cols-12 items-center">

            {/* Left: Headline */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#06b6d4]/20 bg-[#06b6d4]/5 px-4 py-2 backdrop-blur">
                  <span className="text-xs font-medium tracking-wider text-[#06b6d4] uppercase flex items-center gap-2">
                    Latest Insights
                    <Zap className="w-3 h-3" />
                  </span>
                </div>
                <div className="h-px bg-gradient-to-r from-[#06b6d4]/50 to-transparent flex-1" />
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-[0.95] tracking-tight text-white font-bricolage">
                Master the modern job search with{" "}
                <span className="bg-gradient-to-r from-[#06b6d4] to-[#10d9a0] bg-clip-text text-transparent">expert insights</span>
              </h2>
            </div>

            {/* Right: Summary + CTAs */}
            <div className="lg:col-span-5 space-y-6 lg:space-y-8">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <p className="text-neutral-300 leading-relaxed text-sm sm:text-base">
                  How to get past ATS filters, reach hiring managers directly, and run a faster job search — with or without automation.
                </p>
              </div>
              <Link
                href="/blog"
                className="group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#06b6d4] to-[#10d9a0] text-black px-6 py-3 rounded-full font-semibold text-sm hover:opacity-90 transition-all duration-300 hover:shadow-lg hover:shadow-[#06b6d4]/25 hover:scale-[1.03]"
              >
                <span>Read all articles</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

          </div>

          {/* Blog Cards Grid */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogPosts.slice(0, 3).map((post) => {
              const colorMap: Record<string, string> = {
                "Job Search Strategy": "#06b6d4",
                "ATS & Applications": "#2563eb",
                "Hiring Manager Outreach": "#10d9a0",
                "Automation": "#a78bfa",
              };
              const color = colorMap[post.category] ?? "#06b6d4";
              return (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group border border-white/5 bg-[#07070a]/60 hover:bg-[#0c0c12]/80 hover:border-white/10 rounded-2xl p-6 flex flex-col gap-4 transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <span
                      className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border"
                      style={{ color, borderColor: `${color}33`, backgroundColor: `${color}0d` }}
                    >
                      {post.category}
                    </span>
                    <div className="flex items-center gap-1.5 text-[11px] text-zinc-500">
                      <Clock className="w-3 h-3" />
                      {post.readTime} min read
                    </div>
                  </div>
                  <h3 className="text-base font-semibold text-white leading-snug tracking-tight group-hover:text-[#06b6d4] transition-colors">
                    {post.h1}
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed flex-1">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-500 group-hover:text-[#06b6d4] transition-colors mt-auto pt-4 border-t border-white/5">
                    Read article
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="onboarding" className="relative z-10 py-28 border-t border-white/5 bg-gradient-to-b from-transparent to-zinc-950/80 scroll-mt-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight font-bricolage">
              Your next job is already posted.
            </h2>
            <p className="text-sm sm:text-base text-zinc-400">
              Let ApplyAuto find it, apply to it, and get you in front of the person who can hire you. Start free — no credit card required.
            </p>
          </div>

          <div className="max-w-md mx-auto border border-white/10 bg-black/60 rounded-2xl p-6 backdrop-blur shadow-xl">
            <form onSubmit={(e) => e.preventDefault()} className="space-y-3">
              <input
                type="email"
                required
                placeholder="Your email address"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#06b6d4] focus:ring-1 focus:ring-[#06b6d4]/50 transition-all"
              />
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#2563eb] to-[#10d9a0] hover:opacity-90 transition-all text-white font-bold text-sm py-3 rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.2)] flex items-center justify-center gap-2"
              >
                Get Early Access — It&apos;s Free
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
            <p className="text-[11px] text-zinc-600 mt-3 text-center">
              Join 1,200+ job seekers already on autopilot. Cancel anytime.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl ring-1 ring-white/10 bg-neutral-950 backdrop-blur">

            {/* Soft ambient glows */}
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#06b6d4]/8 blur-3xl" />
              <div className="absolute -right-24 -bottom-24 h-72 w-72 rounded-full bg-[#10d9a0]/6 blur-3xl" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40" />
            </div>

            {/* Content */}
            <div className="relative px-8 md:px-12 pt-14 pb-10">

              {/* Top grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-12 border-b border-white/10">

                {/* Brand column */}
                <div className="lg:col-span-2">
                  <div className="flex flex-col items-start">
                    <div className="flex items-center gap-2.5 mb-4">
                      <Image src="/logo.webp" alt="ApplyAuto" width={44} height={24} className="h-6 w-auto" />
                      <span className="font-bricolage text-lg font-bold text-white tracking-tight">ApplyAuto</span>
                    </div>

                    <p className="mb-6 text-left text-sm leading-relaxed text-zinc-400 max-w-xs">
                      Autonomous job applications and hiring manager outreach — so you can focus on interviewing, not filling out forms.
                    </p>

                    {/* Social icons */}
                    <div className="flex items-center gap-3">
                      <a href="#" aria-label="Twitter" className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 ring-1 ring-white/10 text-zinc-400 transition hover:bg-white/10 hover:text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                      </a>
                      <a href="#" aria-label="GitHub" className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 ring-1 ring-white/10 text-zinc-400 transition hover:bg-white/10 hover:text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                      </a>
                      <a href="#" aria-label="LinkedIn" className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 ring-1 ring-white/10 text-zinc-400 transition hover:bg-white/10 hover:text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Product */}
                <div className="text-left">
                  <h4 className="mb-4 text-sm font-semibold tracking-tight text-white">Product</h4>
                  <ul className="space-y-3">
                    <li><a href="#features" className="text-sm text-zinc-400 transition hover:text-white">Features</a></li>
                    <li><a href="#simulator" className="text-sm text-zinc-400 transition hover:text-white">Live Demo</a></li>
                    <li><a href="#pricing" className="text-sm text-zinc-400 transition hover:text-white">Pricing</a></li>
                    <li><a href="#how-it-works" className="text-sm text-zinc-400 transition hover:text-white">How It Works</a></li>
                  </ul>
                </div>

                {/* Resources */}
                <div className="text-left">
                  <h4 className="mb-4 text-sm font-semibold tracking-tight text-white">Resources</h4>
                  <ul className="space-y-3">
                    <li><Link href="/blog" className="text-sm text-zinc-400 transition hover:text-white">Blog</Link></li>
                    <li><Link href="/guides" className="text-sm text-zinc-400 transition hover:text-white">Guides</Link></li>
                    <li><Link href="/guides/linkedin-easy-apply-alternative" className="text-sm text-zinc-400 transition hover:text-white">Easy Apply Alternatives</Link></li>
                    <li><a href="#faqs" className="text-sm text-zinc-400 transition hover:text-white">FAQs</a></li>
                  </ul>
                </div>

                {/* For Job Seekers */}
                <div className="text-left">
                  <h4 className="mb-4 text-sm font-semibold tracking-tight text-white">For Job Seekers</h4>
                  <ul className="space-y-3">
                    <li><Link href="/for/software-engineers" className="text-sm text-zinc-400 transition hover:text-white">Software Engineers</Link></li>
                    <li><Link href="/for/product-managers" className="text-sm text-zinc-400 transition hover:text-white">Product Managers</Link></li>
                    <li><Link href="/for/data-scientists" className="text-sm text-zinc-400 transition hover:text-white">Data Scientists</Link></li>
                    <li><Link href="/for/designers" className="text-sm text-zinc-400 transition hover:text-white">Designers</Link></li>
                  </ul>
                </div>
              </div>

              {/* Bottom bar */}
              <div className="flex flex-col items-center justify-between gap-4 pt-8 md:flex-row">
                <p className="text-sm text-zinc-500">&copy; {new Date().getFullYear()} ApplyAuto Inc. All rights reserved.</p>
                <div className="flex items-center gap-6">
                  <Link href="/privacy" className="text-sm text-zinc-500 transition hover:text-white">Privacy</Link>
                  <Link href="/terms" className="text-sm text-zinc-500 transition hover:text-white">Terms</Link>
                  <a href="#" className="text-sm text-zinc-500 transition hover:text-white">Security</a>
                </div>
              </div>

            </div>
          </div>
        </div>
      </footer>

    </div>
    </>
  );
}
