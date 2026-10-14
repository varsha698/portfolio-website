// Project data for the Projects page and the counts on the home page.
//
// Content is drawn from the Final-Dev-Journal (varsha698/Final-Dev-Journal,
// updated 2026-10-14). Team projects describe my own contributions; anything
// the journal could not verify is left out.
//
// Fields:
//   name, desc            card title + one-line summary
//   org                   employer/client shown under the title
//   role                  "Primary author", "Contributor", "Team of 3", ...
//   features              bullet list shown in the modal
//   techstackused         free-text stack line in the modal
//   techstackicons        keys from src/components/techIcons.jsx
//   link                  live site (optional)
//   code                  public repository (optional; omit for private repos)
//   private               show the "private" badge

const XD = "Xecutive Development LLC";

export const professional = [
  {
    name: "Multi-State Sales Tax Filing System",
    org: XD,
    role: "Primary author",
    desc: "Django app that calculates, reconciles and exports sales-tax filings for Minnesota, Colorado and New York.",
    features: [
      "Syncs orders from Airtable and calculates per-jurisdiction tax through the MN sales-tax API, Colorado SUTS/TTR and USPS + Geocodio ZIP+4 lookups",
      "Parallel batch engine: 1,021 rows in 11.9 s instead of ~340 s serially, with a per-API-key rate pacer and background jobs to stay under Cloudflare's 100 s request limit",
      "New York state and local tax on separate lines, tax-inclusive back-out, and batch CSV upload with per-jurisdiction filing summaries",
      "130-column line-detail CSV export plus a reconciliation service",
      "Dockerized and deployed behind the company's Caddy + Cloudflare Tunnel gateway",
    ],
    techstackused: "Python, Django, PostgreSQL, Gunicorn, Docker, Caddy, Airtable API",
    techstackicons: ["python", "postgresql", "docker", "airtable"],
    private: true,
  },
  {
    name: "Operator Portal",
    org: XD,
    role: "Contributor (team project)",
    desc: "Production payroll and operations portal for field operators across a 7-state lawn and snow business.",
    features: [
      "Led the frontend redesign: light/dark token theming and a new sidebar app shell (+1.7k lines)",
      "Built the full English/Spanish i18n system for operator-facing screens",
      "Shipped tickets UX, cash-advance payment methods, retainer handling, pay-period grouping and an OptimoRoute ID editor",
      "Fixed admin RBAC gaps and an iOS Safari session-revalidation bug; auto-flagging of unknown service codes",
      "The app went live in July 2026 with 1,800+ backend specs and 400+ frontend tests across the team",
    ],
    techstackused: "Ruby on Rails 8 API, React 19, TypeScript, react-query, Zod, Recharts, RSpec, Vitest",
    techstackicons: ["rails", "react", "typescript"],
    private: true,
  },
  {
    name: "Andrew's Lawn & Snow — Marketing Website",
    org: XD,
    role: "Contributor (team project)",
    desc: "Live Next.js marketing and lead-capture site on Cloudflare.",
    features: [
      "Wired GTM/GA4 and the Meta Pixel + server-side Conversions API with shared event IDs for de-duplication, with tests",
      "Added GA4 dataLayer events for form submissions and click-to-call",
      "Redesigned the promo and contact forms and built the site search page",
      "Built the billboard carousel and cut its images from ~14.5 MB to ~1.9 MB",
    ],
    techstackused: "Next.js 16, React 19, Tailwind, Cloudflare (OpenNext), Sentry, GA4, Meta CAPI",
    techstackicons: ["nextjs", "react", "tailwind", "cloudflare"],
    link: "https://www.andrewslawnandsnow.com",
    private: true,
  },
  {
    name: "Automated Renewal Payments",
    org: XD,
    role: "Contributor (team project)",
    desc: "Rails engine that charges annual service renewals through Stripe and emails customers through Microsoft Graph.",
    features: [
      "Added a dry-run mode (on by default) with UI banners so a test run can never charge real cards",
      "Built a database-backed email template editor with live preview",
      "Split lawn and snow renewal seasons and taught the importer new Airtable column headers",
      "Containerized the app for the company VM and replaced hard-coded admin credentials with environment-based auth",
    ],
    techstackused: "Ruby on Rails 8, Stripe, Sidekiq, Redis, Microsoft Graph, RSpec, Docker",
    techstackicons: ["rails", "stripe", "docker"],
    private: true,
  },
  {
    name: "Equipment Inventory Tracker",
    org: XD,
    role: "Contributor (team project)",
    desc: "Real-time equipment inventory, rental and maintenance tracker with QR codes and an Android app.",
    features: [
      "Fixed a stale-closure race condition that created duplicate equipment rentals",
      "Added Android APK auto-update and partial-photo returns",
      "Performance and reporting improvements for ~1,775 tracked units",
    ],
    techstackused: "React 19, TypeScript, Supabase (Realtime, Auth, RLS), Capacitor, Cloudflare Pages",
    techstackicons: ["react", "typescript", "supabase", "cloudflare"],
    private: true,
  },
  {
    name: "Xecutive Development Website",
    org: XD,
    role: "Contributor (team project)",
    desc: "The company's corporate site and job-listings app.",
    features: [
      "Cut first-load cost: icon font 4.0 MB → 323 KB and main JS bundle 627 KB → 382 KB through route lazy-loading and deferred Sentry Replay",
      "Filtered Facebook in-app-browser noise that made up ~95% of Sentry error volume",
    ],
    techstackused: "TypeScript, React, Cloudflare Pages + Workers + D1, Sentry",
    techstackicons: ["typescript", "react", "cloudflare"],
    private: true,
  },
  {
    name: "Lawn Care & Snow Service Website",
    org: XD,
    role: "Sole author",
    desc: "Static Astro brochure site for a separately branded sister business.",
    features: [
      "Seven pages driven from a single typed content file",
      "Honeypot-protected contact form, sitemap and robots",
      "Kept in its own repo so brand and compliance content stay isolated",
    ],
    techstackused: "Astro 5, Tailwind 4, Cloudflare Pages",
    techstackicons: ["astro", "tailwind", "cloudflare"],
    private: true,
  },
  {
    name: "Security & Maintenance Across the Suite",
    org: XD,
    role: "Contributor",
    desc: "Hardening and fixes across the company's internal Rails and Next.js apps.",
    features: [
      "Internal app launcher: cleared 3 critical + 3 high advisories, fixed an auth fail-open, and stopped the production env file from being baked into Docker images",
      "Lead CRM: CVE patch pass (Rails 8.1.3.1), Brakeman bump, a user-delete 500 fix and admin column management",
      "Payroll hub: fixed a weed-and-feed calculation bug and added the full test suite to CI",
      "Mailer and sales portal: new merge tags and an admin dashboard",
    ],
    techstackused: "Ruby on Rails, Next.js, NextAuth, Flask, Docker, Brakeman",
    techstackicons: ["rails", "nextjs", "python", "docker"],
    private: true,
  },
];

export const personal = [
  {
    name: "dev-journal",
    role: "Sole author",
    desc: "Automated developer journal: a nightly GitHub Action collects my commits, PRs and reviews and publishes a timeline.",
    features: [
      "Standard-library-only Python collector using the GitHub Search API, paginated and de-duplicated by URL so reruns are safe",
      "Nightly cron commits journal.json and a chained workflow redeploys the site",
      "Single-file HTML/CSS/JS frontend with a by-project view and a backfill covering 29 projects",
      "Running every night since mid-2026",
    ],
    techstackused: "Python (stdlib), GitHub Actions, GitHub Pages, vanilla JS",
    techstackicons: ["python", "github"],
    link: "https://journal.varshinibhavanam.com",
    private: true,
  },
  {
    name: "AI Market Signals Research",
    role: "Sole author",
    desc: "Research framework that blends price, news-sentiment and macro features into next-day signals, with honest backtesting.",
    features: [
      "XGBoost + LSTM ensemble with the blend weight tuned on a held-out split",
      "Walk-forward backtests with realistic fees and slippage — results are reported even where they trail buy-and-hold",
      "Portfolio-risk tools: factor exposure, correlation-regime alerts, drawdown tracking and a tax-loss scanner with wash-sale checks",
      "One FastAPI backend serves both a Streamlit and a Next.js UI; CI runs pytest on Python 3.10–3.12",
    ],
    techstackused: "Python, XGBoost, PyTorch (LSTM), FinBERT/VADER, FastAPI, Next.js, Streamlit, SQLite, Docker",
    techstackicons: ["python", "pytorch", "fastapi", "nextjs", "docker"],
    private: true,
  },
  {
    name: "ai-doc-editor",
    role: "Sole author",
    desc: "Local-first AI writing studio running open-weight LLMs, with RAG and a LoRA fine-tuning harness.",
    features: [
      "Async FastAPI backend serving LLaMA 3 / Mistral locally — no cloud LLM API",
      "Chat over JSON, server-sent events and WebSocket transports",
      "Retrieval-augmented generation over ChromaDB with an async batched indexer",
      "Rule-based grammar and readability engine kept separate from the LLM",
      "LoRA fine-tuning and benchmark runners for grammar, summarize and rewrite tasks",
    ],
    techstackused: "Python, FastAPI, PyTorch, Hugging Face PEFT, ChromaDB, PostgreSQL + pgvector, Next.js 15, Tiptap",
    techstackicons: ["python", "fastapi", "pytorch", "nextjs", "postgresql"],
    code: "https://github.com/varsha698/ai-doc-editor",
  },
  {
    name: "QuizMaster — AI Quiz Generator",
    role: "Sole author",
    desc: "Turns pasted text or photographed notes into multiple-choice quizzes using an LLM and in-browser OCR.",
    features: [
      "Quiz generation through the Groq API (Llama 3.1)",
      "Image-to-text with a lazily loaded Tesseract.js OCR worker",
      "JWT auth and quiz persistence on a Node/Express + MongoDB backend",
      "Installable PWA with offline indicator and English/German i18n",
      "Also ported the persistence layer to ASP.NET Core (.NET 9) with Swagger",
    ],
    techstackused: "Angular 20, Tailwind, Node.js, Express, MongoDB, Groq API, Tesseract.js, ASP.NET Core",
    techstackicons: ["angular", "nodejs", "mongodb", "csharp"],
    code: "https://github.com/varsha698/Quiz-Generator",
  },
  {
    name: "LifeAdmin — iOS App",
    role: "Sole author",
    desc: "Native SwiftUI app that pulls commitments out of plain text and keeps tasks in sync with the calendar.",
    features: [
      "Capture sheet with natural-language date extraction and an inbox to approve extracted commitments",
      "Task list with two-way EventKit calendar sync and local notifications",
      "Every action recorded as a receipt, viewable in Settings",
      "SwiftData persistence; project generated with XcodeGen",
    ],
    techstackused: "Swift, SwiftUI, SwiftData, EventKit, XcodeGen",
    techstackicons: ["swift"],
    code: "https://github.com/varsha698/Personal-Admin-Assistant",
  },
  {
    name: "Cloud Infrastructure Reference (AWS)",
    role: "Sole author",
    desc: "Terraform, Docker, Ansible and GitHub Actions wrapped around a Flask app as a production-style AWS reference.",
    features: [
      "Terraform VPC across two AZs: ALB → Auto Scaling Group → encrypted RDS PostgreSQL, with ECR scan-on-push and least-privilege security groups",
      "Four-stage pipeline: lint → test → build/push to ECR → Ansible deploy",
      "CPU-based autoscaling alarms, a CloudWatch dashboard and Slack alerts",
      "Alternate Kubernetes manifests",
    ],
    techstackused: "Terraform, AWS, Docker, Ansible, Kubernetes, GitHub Actions, Flask, PostgreSQL",
    techstackicons: ["terraform", "aws", "docker", "ansible", "kubernetes", "github"],
    code: "https://github.com/varsha698/DevOps_Project",
  },
  {
    name: "PantryPal — Mobile App",
    role: "Team of 3",
    desc: "Flutter + Firebase app helping students and families stretch their groceries.",
    features: [
      "Pantry tracking and recipe matching ranked by the ingredients you already have",
      "Filters for time, budget and dietary needs",
      "Community feed with photos, likes and comments, plus a local food-resource directory",
      "GitHub Actions CI",
    ],
    techstackused: "Flutter, Dart, Firebase (Auth, Firestore, Storage)",
    techstackicons: ["flutter", "dart", "firebase"],
    code: "https://github.com/varsha698/PantryPalApp",
  },
  {
    name: "Sales Analytics Pipeline",
    role: "Sole author",
    desc: "pandas pipeline that cleans 2,824 sales transactions and produces KPI tables for a Tableau dashboard.",
    features: [
      "Cleans three years of transactions (25 columns) into a tidy dataset",
      "Exports 10 KPI tables: revenue, AOV, product lines, regions and year-over-year growth",
      "Finds $10.0M revenue across 307 orders, with EMEA the top region and +34% growth from 2003 to 2004",
    ],
    techstackused: "Python, pandas, numpy, Tableau",
    techstackicons: ["python", "pandas"],
    code: "https://github.com/varsha698/Sales-Analytics-Project",
  },
  {
    name: "Forge — Studio Landing Page",
    role: "Sole author",
    desc: "Design prototype for a software-studio landing page with a 3D WebGL hero.",
    features: [
      "React Three Fiber glass-blob hero with bloom and chromatic aberration, lazy-loaded with a mobile fallback",
      "GSAP page-transition wipes, Lenis smooth scrolling and magnetic buttons",
      "Pinned horizontal showcase section (placeholder content)",
    ],
    techstackused: "React 19, Vite, React Three Fiber, three.js, GSAP, Lenis, Tailwind 4",
    techstackicons: ["react", "vite", "tailwind"],
    private: true,
  },
  {
    name: "Personal Portfolio Website",
    role: "Sole author",
    desc: "This site — React 19, Vite, Tailwind and Framer Motion on Cloudflare Pages.",
    features: [
      "Route-level code splitting with tree-shaken brand icons",
      "Command palette (⌘K / Ctrl K), live GitHub activity and an animated terminal",
      "Accessible project dialogs, reduced-motion support and Open Graph previews",
    ],
    techstackused: "React 19, Vite 6, Tailwind CSS, Framer Motion, Cloudflare Pages",
    techstackicons: ["react", "vite", "tailwind", "cloudflare"],
    link: "https://varshinibhavanam.com",
    code: "https://github.com/varsha698/portfolio-website",
  },
];

export const projectCount = professional.length + personal.length;
