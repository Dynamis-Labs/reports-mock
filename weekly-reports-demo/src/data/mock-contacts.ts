import type { Contact } from "../types/contact";

/**
 * Mock CRM Contacts
 *
 * 38 contacts organized into three categories:
 * - Investors (12): VCs, angels, board members
 * - Clients (14): Enterprise customers, prospects
 * - Other (12): Advisors, partners, industry contacts
 */

// ─────────────────────────────────────────────────────────────────────────────
// Helper: Create Date relative to "now" (Feb 2026)
// ─────────────────────────────────────────────────────────────────────────────

const NOW = new Date(2026, 1, 2); // Feb 2, 2026

function daysAgo(days: number): Date {
  const date = new Date(NOW);
  date.setDate(date.getDate() - days);
  return date;
}

function weeksAgo(weeks: number): Date {
  return daysAgo(weeks * 7);
}

function monthsAgo(months: number): Date {
  const date = new Date(NOW);
  date.setMonth(date.getMonth() - months);
  return date;
}

// ─────────────────────────────────────────────────────────────────────────────
// Mock Contacts
// ─────────────────────────────────────────────────────────────────────────────

export const mockContacts: Contact[] = [
  // ═══════════════════════════════════════════════════════════════════════════
  // INVESTORS (12 contacts)
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: "inv-1",
    firstName: "Jonathan",
    lastName: "Chen",
    company: "Andreessen Horowitz",
    title: "General Partner",
    department: "Growth Fund",
    email: "jchen@a16z.com",
    phone: "+1 (650) 555-0101",
    linkedIn: "linkedin.com/in/jonathanchen",
    twitter: "@jchen_a16z",
    timezone: "America/Los_Angeles",
    location: "Menlo Park, CA",
    category: "investor",

    relationship: "champion",
    relationshipScore: 94,
    warmth: "hot",
    communicationStyle: "casual",

    roleBadges: ["Lead Investor", "Board Observer"],
    tags: ["Series A", "Strategic", "Active Support"],

    insights: {
      aiSummary:
        "Our lead investor champion. Jon has been incredibly hands-on with introductions and strategic guidance. Believes strongly in our vision.",
      strengths: [
        "Weekly office hours available",
        "Deep enterprise GTM experience",
        "Strong founder network",
      ],
      risks: ["High expectations for growth metrics"],
      talkingPoints: [
        "Q1 growth update",
        "Board meeting prep",
        "Hiring pipeline review",
      ],
      interests: ["AI/ML", "Developer tools", "Enterprise SaaS"],
      bestReachTime: "Responsive on text, prefers quick calls",
      insightsUpdatedAt: daysAgo(1),
    },

    notes: {
      customSummary:
        "Jon led our Series A. Incredibly supportive - always makes time. His network has been invaluable for enterprise intros.",
      quickFacts: [
        "Ex-Google PM Director",
        "Stanford MBA",
        "3x founder himself",
      ],
      personalDetails: "Big Warriors fan. Two daughters. Runs marathons.",
      notesUpdatedAt: daysAgo(3),
    },

    recentTopics: ["Q1 Planning", "Enterprise Pipeline", "Series B Timing"],

    interactions: [
      {
        id: "int-inv1-1",
        type: "meeting",
        date: daysAgo(2),
        subject: "Monthly Investor Update",
        summary: "Walked through metrics. He's pushing us to hire faster.",
        sentiment: "positive",
        keyTopics: ["Metrics", "Hiring", "Growth"],
      },
    ],

    lastContacted: daysAgo(2),
    nextFollowUp: daysAgo(-5),
    firstContact: monthsAgo(8),
    createdAt: monthsAgo(8),
    updatedAt: daysAgo(2),
  },

  {
    id: "inv-2",
    firstName: "Sarah",
    lastName: "Kim",
    company: "Sequoia Capital",
    title: "Partner",
    department: "US Fund",
    email: "skim@sequoiacap.com",
    linkedIn: "linkedin.com/in/sarahkim",
    timezone: "America/Los_Angeles",
    location: "Menlo Park, CA",
    category: "investor",

    relationship: "decision_maker",
    relationshipScore: 78,
    warmth: "warm",
    communicationStyle: "formal",

    roleBadges: ["Series B Interest", "Due Diligence"],
    tags: ["Series B", "Prospect", "Top Tier"],

    insights: {
      aiSummary:
        "Series B prospect. Sarah has been tracking us since seed. She's methodical and data-driven - need to nail the metrics presentation.",
      strengths: [
        "Deep category expertise",
        "$500M fund to deploy",
        "Excellent portfolio support",
      ],
      risks: ["Competitive deal process", "High bar for unit economics"],
      talkingPoints: [
        "Customer cohort analysis",
        "Path to profitability",
        "Competitive moat",
      ],
      interests: ["Unit economics", "Retention curves", "Market sizing"],
      bestReachTime: "Email preferred, responds within 24 hours",
      insightsUpdatedAt: daysAgo(5),
    },

    notes: {
      customSummary:
        "Very sharp. She'll find any weakness in the model. Be prepared with granular data. Worth the effort - Sequoia's brand is unmatched.",
      quickFacts: ["Ex-McKinsey", "Harvard MBA", "Board member at Notion"],
      personalDetails: "Avid reader. Recommends business books constantly.",
      notesUpdatedAt: weeksAgo(1),
    },

    recentTopics: ["Unit Economics", "Series B Timeline", "Market Analysis"],

    interactions: [
      {
        id: "int-inv2-1",
        type: "meeting",
        date: weeksAgo(1),
        subject: "Series B Introduction",
        summary:
          "Initial meeting went well. She wants to see Q1 numbers before deep dive.",
        sentiment: "positive",
        keyTopics: ["Series B", "Metrics", "Timeline"],
      },
    ],

    lastContacted: weeksAgo(1),
    nextFollowUp: daysAgo(-14),
    firstContact: monthsAgo(6),
    createdAt: monthsAgo(6),
    updatedAt: weeksAgo(1),
  },

  {
    id: "inv-3",
    firstName: "Michael",
    lastName: "Rivera",
    company: "Benchmark",
    title: "General Partner",
    department: "Early Stage",
    email: "mrivera@benchmark.com",
    linkedIn: "linkedin.com/in/michaelrivera",
    timezone: "America/Los_Angeles",
    location: "San Francisco, CA",
    category: "investor",

    relationship: "influencer",
    relationshipScore: 65,
    warmth: "warm",
    communicationStyle: "casual",

    roleBadges: ["Seed Investor", "Advisor"],
    tags: ["Seed Round", "Advisor Network"],

    insights: {
      aiSummary:
        "Seed investor who's remained engaged. Good sounding board for strategy but less active operationally than our Series A leads.",
      strengths: [
        "Long-term perspective",
        "Founder-friendly",
        "Great judgment",
      ],
      risks: ["Less hands-on support"],
      talkingPoints: ["Strategic direction", "Market positioning"],
      interests: ["Long-term vision", "Team culture", "Market dynamics"],
      bestReachTime: "Quarterly catch-ups work best",
      insightsUpdatedAt: weeksAgo(2),
    },

    notes: {
      customSummary:
        "Mike was our first believer. Wrote our seed check in 48 hours. Values relationship over metrics.",
      quickFacts: ["Founded 2 unicorns", "Known for founder backing"],
      personalDetails: "Wine collector. Napa trips.",
      notesUpdatedAt: monthsAgo(1),
    },

    recentTopics: ["Long-term Strategy", "Team Building"],

    interactions: [
      {
        id: "int-inv3-1",
        type: "call",
        date: weeksAgo(3),
        subject: "Quarterly Catch-up",
        summary:
          "Good conversation about long-term vision. Offered to help with hiring.",
        sentiment: "positive",
        keyTopics: ["Vision", "Hiring"],
      },
    ],

    lastContacted: weeksAgo(3),
    nextFollowUp: daysAgo(-21),
    firstContact: monthsAgo(14),
    createdAt: monthsAgo(14),
    updatedAt: weeksAgo(3),
  },

  {
    id: "inv-4",
    firstName: "Lisa",
    lastName: "Wang",
    company: "Greylock Partners",
    title: "Partner",
    department: "Enterprise",
    email: "lwang@greylock.com",
    linkedIn: "linkedin.com/in/lisawang",
    timezone: "America/Los_Angeles",
    location: "Menlo Park, CA",
    category: "investor",

    relationship: "contact",
    relationshipScore: 55,
    warmth: "cool",
    communicationStyle: "formal",

    roleBadges: ["Series B Interest"],
    tags: ["Series B", "Enterprise Focus"],

    insights: {
      aiSummary:
        "Interested in Series B but wants to see more traction. Specializes in enterprise software - good fit for our ICP.",
      strengths: ["Enterprise expertise", "Large fund"],
      risks: ["Hasn't committed time yet"],
      talkingPoints: ["Enterprise traction", "Sales motion"],
      interests: ["Enterprise sales", "Product-market fit"],
      bestReachTime: "Email only",
      insightsUpdatedAt: weeksAgo(2),
    },

    notes: {
      customSummary:
        "Met at an industry event. Interested but non-committal. Need to prove enterprise traction.",
      quickFacts: ["Ex-Box executive", "Focus on enterprise infra"],
      personalDetails: "Triathlete.",
      notesUpdatedAt: weeksAgo(2),
    },

    recentTopics: ["Enterprise Motion", "Series B"],

    interactions: [
      {
        id: "int-inv4-1",
        type: "email",
        date: weeksAgo(2),
        subject: "Following Up",
        summary: "Sent update on enterprise wins. Waiting for response.",
        sentiment: "neutral",
        keyTopics: ["Enterprise", "Follow-up"],
      },
    ],

    lastContacted: weeksAgo(2),
    nextFollowUp: daysAgo(-7),
    firstContact: monthsAgo(3),
    createdAt: monthsAgo(3),
    updatedAt: weeksAgo(2),
  },

  {
    id: "inv-5",
    firstName: "David",
    lastName: "Park",
    company: "Lightspeed Venture Partners",
    title: "Partner",
    department: "Growth",
    email: "dpark@lsvp.com",
    linkedIn: "linkedin.com/in/davidpark",
    timezone: "America/Los_Angeles",
    location: "Menlo Park, CA",
    category: "investor",

    relationship: "decision_maker",
    relationshipScore: 72,
    warmth: "warm",
    communicationStyle: "casual",

    roleBadges: ["Series B Lead Candidate"],
    tags: ["Series B", "Active"],

    insights: {
      aiSummary:
        "Strong Series B candidate. David has done extensive diligence and seems bullish. Competition for the round is heating up.",
      strengths: ["Fast decision maker", "Founder references strong"],
      risks: ["May push for larger round than planned"],
      talkingPoints: ["Round sizing", "Board composition", "Valuation"],
      interests: ["Growth metrics", "Competitive landscape"],
      bestReachTime: "Very responsive to text",
      insightsUpdatedAt: daysAgo(3),
    },

    notes: {
      customSummary:
        "David is aggressive about leading. Good energy but need to manage expectations on valuation.",
      quickFacts: ["Led 12 Series Bs", "Snap investor"],
      personalDetails: "Big Lakers fan. Dad jokes.",
      notesUpdatedAt: daysAgo(5),
    },

    recentTopics: ["Series B Terms", "Round Sizing"],

    interactions: [
      {
        id: "int-inv5-1",
        type: "meeting",
        date: daysAgo(4),
        subject: "Term Sheet Discussion",
        summary: "Reviewing preliminary terms. Numbers look good.",
        sentiment: "positive",
        keyTopics: ["Terms", "Valuation"],
      },
    ],

    lastContacted: daysAgo(4),
    nextFollowUp: daysAgo(-2),
    firstContact: monthsAgo(2),
    createdAt: monthsAgo(2),
    updatedAt: daysAgo(4),
  },

  {
    id: "inv-6",
    firstName: "Emily",
    lastName: "Zhang",
    company: "Index Ventures",
    title: "Principal",
    department: "US Fund",
    email: "ezhang@indexventures.com",
    linkedIn: "linkedin.com/in/emilyzhang",
    timezone: "America/New_York",
    location: "New York, NY",
    category: "investor",

    relationship: "contact",
    relationshipScore: 60,
    warmth: "new",
    communicationStyle: "async",

    roleBadges: ["Series B Interest"],
    tags: ["Series B", "New Relationship"],

    insights: {
      aiSummary:
        "New connection from conference. Very interested in the space but still getting up to speed on our specific approach.",
      strengths: ["Fresh perspective", "Strong sourcing network"],
      risks: ["Junior - needs partner buy-in"],
      talkingPoints: ["Product demo", "Market overview"],
      interests: ["Developer tools", "Open source"],
      bestReachTime: "Email or Twitter DM",
      insightsUpdatedAt: daysAgo(7),
    },

    notes: {
      customSummary:
        "Met at SaaStr. Energetic and smart. Will need to bring in her partner for any serious discussion.",
      quickFacts: ["Ex-Stripe PM", "Developer background"],
      personalDetails: "Runs a tech newsletter.",
      notesUpdatedAt: daysAgo(7),
    },

    recentTopics: ["Product Overview", "Market Opportunity"],

    interactions: [
      {
        id: "int-inv6-1",
        type: "meeting",
        date: daysAgo(7),
        subject: "Intro Meeting",
        summary: "Good chemistry. She wants to schedule a deeper dive.",
        sentiment: "positive",
        keyTopics: ["Introduction", "Product"],
      },
    ],

    lastContacted: daysAgo(7),
    nextFollowUp: daysAgo(-3),
    firstContact: daysAgo(10),
    createdAt: daysAgo(10),
    updatedAt: daysAgo(7),
  },

  {
    id: "inv-7",
    firstName: "Robert",
    lastName: "Thompson",
    company: "Accel",
    title: "Partner",
    department: "Growth",
    email: "rthompson@accel.com",
    linkedIn: "linkedin.com/in/robertthompson",
    timezone: "America/Los_Angeles",
    location: "Palo Alto, CA",
    category: "investor",

    relationship: "influencer",
    relationshipScore: 68,
    warmth: "warm",
    communicationStyle: "formal",

    roleBadges: ["Strategic Advisor"],
    tags: ["Advisory", "Network"],

    insights: {
      aiSummary:
        "Not investing directly but valuable for strategic advice and introductions. Deep enterprise network.",
      strengths: ["Enterprise network", "Board experience"],
      risks: ["Time-constrained"],
      talkingPoints: ["Enterprise strategy", "Board intros"],
      interests: ["Enterprise GTM", "International expansion"],
      bestReachTime: "Schedule through EA",
      insightsUpdatedAt: weeksAgo(1),
    },

    notes: {
      customSummary:
        "Robert has been helpful with intros even though Accel passed on the round. Keep relationship warm.",
      quickFacts: ["20+ boards", "Slack early investor"],
      personalDetails: "Collects modern art.",
      notesUpdatedAt: weeksAgo(1),
    },

    recentTopics: ["Enterprise Intros", "Strategy"],

    interactions: [
      {
        id: "int-inv7-1",
        type: "email",
        date: weeksAgo(1),
        subject: "Introduction Request",
        summary: "Made intro to Snowflake CTO. Very helpful.",
        sentiment: "positive",
        keyTopics: ["Introductions"],
      },
    ],

    lastContacted: weeksAgo(1),
    nextFollowUp: daysAgo(-14),
    firstContact: monthsAgo(6),
    createdAt: monthsAgo(6),
    updatedAt: weeksAgo(1),
  },

  {
    id: "inv-8",
    firstName: "Jennifer",
    lastName: "Lee",
    company: "Founders Fund",
    title: "Partner",
    department: "Growth",
    email: "jlee@foundersfund.com",
    linkedIn: "linkedin.com/in/jenniferlee",
    timezone: "America/Los_Angeles",
    location: "San Francisco, CA",
    category: "investor",

    relationship: "contact",
    relationshipScore: 50,
    warmth: "cool",
    communicationStyle: "formal",

    roleBadges: ["Series B Interest"],
    tags: ["Series B", "Early Conversations"],

    insights: {
      aiSummary:
        "Early stage conversations. Jennifer is evaluating the space broadly - not exclusive to us.",
      strengths: ["Bold bets", "Founder-friendly terms"],
      risks: ["Slow process", "Contrarian views"],
      talkingPoints: ["Vision", "Long-term potential"],
      interests: ["Moonshot potential", "Technical differentiation"],
      bestReachTime: "Email, slow responder",
      insightsUpdatedAt: weeksAgo(2),
    },

    notes: {
      customSummary:
        "FF is known for big swings. Need to emphasize the long-term vision, not just near-term metrics.",
      quickFacts: ["SpaceX board", "Contrarian investor"],
      personalDetails: "Pilot. Burning Man regular.",
      notesUpdatedAt: weeksAgo(2),
    },

    recentTopics: ["Vision", "Technical Approach"],

    interactions: [
      {
        id: "int-inv8-1",
        type: "email",
        date: weeksAgo(2),
        subject: "Vision Deck",
        summary: "Sent our long-term vision deck. Awaiting feedback.",
        sentiment: "neutral",
        keyTopics: ["Vision"],
      },
    ],

    lastContacted: weeksAgo(2),
    nextFollowUp: daysAgo(-10),
    firstContact: monthsAgo(1),
    createdAt: monthsAgo(1),
    updatedAt: weeksAgo(2),
  },

  {
    id: "inv-9",
    firstName: "Marcus",
    lastName: "Williams",
    company: "General Catalyst",
    title: "Managing Director",
    department: "Growth Equity",
    email: "mwilliams@generalcatalyst.com",
    linkedIn: "linkedin.com/in/marcuswilliams",
    timezone: "America/New_York",
    location: "Boston, MA",
    category: "investor",

    relationship: "decision_maker",
    relationshipScore: 75,
    warmth: "warm",
    communicationStyle: "formal",

    roleBadges: ["Board Candidate", "Series B"],
    tags: ["Series B", "Strong Interest"],

    insights: {
      aiSummary:
        "Serious Series B contender. Marcus brings operational expertise and could be valuable board member.",
      strengths: ["Operational background", "Healthcare/Enterprise expertise"],
      risks: ["May want board seat"],
      talkingPoints: ["Board dynamics", "Operational support"],
      interests: ["Go-to-market", "Operational efficiency"],
      bestReachTime: "Prefers scheduled calls",
      insightsUpdatedAt: daysAgo(6),
    },

    notes: {
      customSummary:
        "Marcus was a COO before VC. His operational perspective is valuable but need to manage board expectations.",
      quickFacts: ["Ex-HubSpot COO", "Board at 8 companies"],
      personalDetails: "Runs daily. Big on fitness.",
      notesUpdatedAt: daysAgo(6),
    },

    recentTopics: ["Operational Support", "Board Composition"],

    interactions: [
      {
        id: "int-inv9-1",
        type: "call",
        date: daysAgo(6),
        subject: "Diligence Call",
        summary: "Deep dive on operations. He's impressed with our efficiency.",
        sentiment: "positive",
        keyTopics: ["Operations", "Diligence"],
      },
    ],

    lastContacted: daysAgo(6),
    nextFollowUp: daysAgo(-4),
    firstContact: monthsAgo(2),
    createdAt: monthsAgo(2),
    updatedAt: daysAgo(6),
  },

  {
    id: "inv-10",
    firstName: "Amanda",
    lastName: "Chen",
    company: "Bessemer Venture Partners",
    title: "Partner",
    department: "Cloud",
    email: "achen@bvp.com",
    linkedIn: "linkedin.com/in/amandachen",
    timezone: "America/Los_Angeles",
    location: "San Francisco, CA",
    category: "investor",

    relationship: "contact",
    relationshipScore: 58,
    warmth: "warm",
    communicationStyle: "async",

    roleBadges: ["Cloud Specialist"],
    tags: ["Series B", "Cloud Focus"],

    insights: {
      aiSummary:
        "Cloud infrastructure specialist. Interested but wants to see more ARR before committing.",
      strengths: ["Deep cloud expertise", "BVP cloud index"],
      risks: ["High ARR bar"],
      talkingPoints: ["Cloud metrics", "ARR trajectory"],
      interests: ["Cloud metrics", "NDR", "CAC payback"],
      bestReachTime: "Email preferred",
      insightsUpdatedAt: weeksAgo(1),
    },

    notes: {
      customSummary:
        "Amanda knows cloud metrics better than anyone. Need to hit their ARR threshold before she'll engage seriously.",
      quickFacts: ["Created BVP Cloud Index", "Twilio early investor"],
      personalDetails: "Competitive tennis player.",
      notesUpdatedAt: weeksAgo(1),
    },

    recentTopics: ["Cloud Metrics", "ARR Growth"],

    interactions: [
      {
        id: "int-inv10-1",
        type: "email",
        date: weeksAgo(1),
        subject: "Metrics Update",
        summary:
          "Shared Q4 metrics. She wants to reconnect when we hit $5M ARR.",
        sentiment: "neutral",
        keyTopics: ["Metrics", "Timeline"],
      },
    ],

    lastContacted: weeksAgo(1),
    nextFollowUp: daysAgo(-30),
    firstContact: monthsAgo(4),
    createdAt: monthsAgo(4),
    updatedAt: weeksAgo(1),
  },

  {
    id: "inv-11",
    firstName: "Peter",
    lastName: "Nguyen",
    company: "Insight Partners",
    title: "Managing Director",
    department: "Software",
    email: "pnguyen@insightpartners.com",
    linkedIn: "linkedin.com/in/peternguyen",
    timezone: "America/New_York",
    location: "New York, NY",
    category: "investor",

    relationship: "contact",
    relationshipScore: 52,
    warmth: "cool",
    communicationStyle: "formal",

    roleBadges: ["Growth Investor"],
    tags: ["Growth Stage", "Later Stage"],

    insights: {
      aiSummary:
        "Growth investor - probably too early for them but worth maintaining relationship for Series C.",
      strengths: ["Huge fund", "Scale expertise"],
      risks: ["We're too early for their stage"],
      talkingPoints: ["Long-term vision", "Scale plans"],
      interests: ["Scale", "International expansion"],
      bestReachTime: "Annual check-ins",
      insightsUpdatedAt: monthsAgo(1),
    },

    notes: {
      customSummary:
        "Insight typically invests Series C+. Keep them warm for future but don't expect near-term engagement.",
      quickFacts: ["$30B AUM", "Focus on scale-ups"],
      personalDetails: "Jazz enthusiast.",
      notesUpdatedAt: monthsAgo(1),
    },

    recentTopics: ["Long-term Plans"],

    interactions: [
      {
        id: "int-inv11-1",
        type: "email",
        date: monthsAgo(1),
        subject: "Annual Update",
        summary: "Sent annual update. Noted to reconnect at Series C stage.",
        sentiment: "neutral",
        keyTopics: ["Update"],
      },
    ],

    lastContacted: monthsAgo(1),
    nextFollowUp: monthsAgo(-6),
    firstContact: monthsAgo(8),
    createdAt: monthsAgo(8),
    updatedAt: monthsAgo(1),
  },

  {
    id: "inv-12",
    firstName: "Rachel",
    lastName: "Foster",
    company: "First Round Capital",
    title: "Partner",
    department: "Seed",
    email: "rfoster@firstround.com",
    linkedIn: "linkedin.com/in/rachelfoster",
    timezone: "America/Los_Angeles",
    location: "San Francisco, CA",
    category: "investor",

    relationship: "champion",
    relationshipScore: 88,
    warmth: "hot",
    communicationStyle: "casual",

    roleBadges: ["Seed Investor", "Active Supporter"],
    tags: ["Seed Round", "Community"],

    insights: {
      aiSummary:
        "Our most engaged seed investor. Rachel is constantly connecting us with resources from First Round's platform.",
      strengths: [
        "FR community access",
        "Operator network",
        "Always available",
      ],
      risks: ["Pro-rata only at this stage"],
      talkingPoints: ["Platform resources", "Founder intros"],
      interests: ["Founder community", "Knowledge sharing"],
      bestReachTime: "Very responsive - any channel",
      insightsUpdatedAt: daysAgo(4),
    },

    notes: {
      customSummary:
        "Rachel goes above and beyond. Her FR community intros have been incredibly valuable. True partner.",
      quickFacts: ["Built FR's platform team", "2x founder"],
      personalDetails: "Rescue dog mom. Foodie.",
      notesUpdatedAt: daysAgo(4),
    },

    recentTopics: ["FR Community", "Founder Intros"],

    interactions: [
      {
        id: "int-inv12-1",
        type: "slack",
        date: daysAgo(4),
        subject: "Founder Intro",
        summary: "Intro'd us to 3 founders in adjacent spaces. Always helpful.",
        sentiment: "positive",
        keyTopics: ["Introductions", "Community"],
      },
    ],

    lastContacted: daysAgo(4),
    nextFollowUp: daysAgo(-10),
    firstContact: monthsAgo(14),
    createdAt: monthsAgo(14),
    updatedAt: daysAgo(4),
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // CLIENTS (14 contacts)
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: "cli-1",
    firstName: "Sarah",
    lastName: "Chen",
    company: "Accenture",
    title: "VP of Engineering",
    department: "Technology",
    email: "sarah.chen@accenture.com",
    phone: "+1 (415) 555-0123",
    linkedIn: "linkedin.com/in/sarahchen",
    twitter: "@sarahchentech",
    timezone: "America/Los_Angeles",
    location: "San Francisco, CA",
    category: "client",

    relationship: "champion",
    relationshipScore: 92,
    warmth: "hot",
    communicationStyle: "async",

    roleBadges: ["Technical Champion", "Decision Maker"],
    tags: ["Enterprise", "High Priority", "Q1 Target", "API Integration"],

    insights: {
      aiSummary:
        "Technical visionary who champions AI-powered automation. She's your strongest internal advocate and has successfully pushed through two major procurement cycles.",
      strengths: [
        "Strong technical understanding",
        "Internal political capital",
        "Fast decision-making",
      ],
      risks: [
        "Busy schedule limits meeting availability",
        "High expectations for technical depth",
      ],
      talkingPoints: [
        "Follow up on API integration timeline",
        "Share the new ML features roadmap",
        "Discuss enterprise pricing flexibility",
      ],
      interests: [
        "Distributed systems",
        "Developer experience",
        "Team productivity metrics",
      ],
      bestReachTime: "Tuesdays and Thursdays, 9-11 AM PT",
      insightsUpdatedAt: daysAgo(2),
      companyNews: [
        {
          id: "news-acc-1",
          headline: "Accenture announces $3B investment in AI capabilities",
          date: daysAgo(5),
          sourceUrl: "https://newsroom.accenture.com",
          category: "press",
        },
        {
          id: "news-acc-2",
          headline: "New partnership with Google Cloud for generative AI",
          date: daysAgo(12),
          sourceUrl: "https://newsroom.accenture.com",
          category: "product",
        },
        {
          id: "news-acc-3",
          headline: "Q1 earnings beat expectations, revenue up 8%",
          date: daysAgo(18),
          category: "funding",
        },
      ],
    },

    notes: {
      customSummary:
        "Met at AWS re:Invent 2024. Incredibly sharp and doesn't tolerate BS - come prepared with concrete technical details.",
      quickFacts: [
        "Stanford CS PhD",
        "Previously at Google (8 years)",
        "Runs weekly architecture reviews",
      ],
      personalDetails:
        "Marathon runner, completed Boston Marathon 2024. Daughter starts college next fall.",
      notesUpdatedAt: daysAgo(5),
    },

    recentTopics: [
      "Q1 Planning",
      "API Integration",
      "Enterprise Pricing",
      "Security Compliance",
    ],

    interactions: [
      {
        id: "int-cli1-1",
        type: "email",
        date: daysAgo(1),
        subject: "Re: Q1 Strategy Discussion",
        summary:
          "Confirmed budget approval for pilot. Wants technical deep-dive with her architects next week.",
        sentiment: "positive",
        keyTopics: ["Budget", "Technical Review", "Timeline"],
      },
    ],

    lastContacted: daysAgo(1),
    nextFollowUp: daysAgo(-5),
    firstContact: monthsAgo(4),
    createdAt: monthsAgo(4),
    updatedAt: daysAgo(1),
  },

  {
    id: "cli-2",
    firstName: "James",
    lastName: "Morrison",
    company: "JPMorgan Chase",
    title: "Managing Director",
    department: "Technology",
    email: "james.morrison@jpmorgan.com",
    phone: "+1 (212) 555-0456",
    linkedIn: "linkedin.com/in/jamesmorrison",
    timezone: "America/New_York",
    location: "New York, NY",
    category: "client",

    relationship: "decision_maker",
    relationshipScore: 78,
    warmth: "warm",
    communicationStyle: "formal",

    roleBadges: ["Decision Maker", "Budget Authority"],
    tags: ["Enterprise", "Financial Services", "Compliance-Heavy"],

    insights: {
      aiSummary:
        "Methodical executive who values data-driven decisions. Needs ironclad compliance documentation before any vendor approval.",
      strengths: [
        "Clear budget authority ($2M+)",
        "Direct line to CTO",
        "Respected across divisions",
      ],
      risks: [
        "Long procurement cycles (8-12 weeks)",
        "Requires legal review for all contracts",
      ],
      talkingPoints: [
        "SOC 2 Type II certification",
        "Financial services references",
        "On-premise deployment options",
      ],
      interests: [
        "Regulatory technology",
        "Risk management",
        "Operational efficiency",
      ],
      bestReachTime: "Early mornings, 7-8 AM ET",
      insightsUpdatedAt: daysAgo(7),
      companyNews: [
        {
          id: "news-jpm-1",
          headline: "JPMorgan launches new AI-powered fraud detection system",
          date: daysAgo(3),
          sourceUrl: "https://www.jpmorganchase.com/news",
          category: "product",
        },
        {
          id: "news-jpm-2",
          headline: "Expands technology workforce with 2,000 new hires",
          date: daysAgo(10),
          category: "leadership",
        },
        {
          id: "news-jpm-3",
          headline: "Record quarterly profit driven by trading revenues",
          date: daysAgo(21),
          sourceUrl: "https://www.jpmorganchase.com/ir",
          category: "funding",
        },
      ],
    },

    notes: {
      customSummary:
        "Very formal communication style. His EA (Jennifer) is the gatekeeper - be responsive to her requests.",
      quickFacts: [
        "Wharton MBA",
        "20+ years at JPM",
        "Board member of fintech accelerator",
      ],
      personalDetails: "Avid golfer, member at Winged Foot.",
      notesUpdatedAt: weeksAgo(2),
    },

    recentTopics: [
      "Compliance Review",
      "Security Architecture",
      "Reference Calls",
    ],

    interactions: [
      {
        id: "int-cli2-1",
        type: "meeting",
        date: daysAgo(3),
        subject: "Security Architecture Review",
        summary:
          "Brought their CISO. Detailed walkthrough of our security posture. They want penetration test results.",
        sentiment: "neutral",
        keyTopics: ["Security", "Penetration Testing", "Compliance"],
      },
    ],

    lastContacted: daysAgo(3),
    nextFollowUp: daysAgo(-4),
    firstContact: monthsAgo(2),
    createdAt: monthsAgo(2),
    updatedAt: daysAgo(3),
  },

  {
    id: "cli-3",
    firstName: "Priya",
    lastName: "Sharma",
    company: "Stripe",
    title: "Staff Engineer",
    department: "Developer Platform",
    email: "priya@stripe.com",
    linkedIn: "linkedin.com/in/priyasharma",
    twitter: "@priyacodes",
    timezone: "America/Los_Angeles",
    location: "Seattle, WA (Remote)",
    category: "client",

    relationship: "influencer",
    relationshipScore: 85,
    warmth: "hot",
    communicationStyle: "casual",

    roleBadges: ["Technical Influencer", "Early Adopter"],
    tags: ["Developer Tools", "API-First", "Conference Speaker"],

    insights: {
      aiSummary:
        "Highly respected voice in the developer tools community. Her tweets about tools go viral. Getting her genuine endorsement is worth 10 sales calls.",
      strengths: [
        "40K+ Twitter following",
        "Conference speaker circuit",
        "Genuine product feedback",
      ],
      risks: [
        "Won't promote anything she doesn't love",
        "Skeptical of enterprise software",
      ],
      talkingPoints: [
        "New CLI improvements she suggested",
        "Invite to beta program",
        "Potential conference speaking slot",
      ],
      interests: ["Developer experience", "Open source", "API design", "Rust"],
      bestReachTime: "Async - Twitter DMs or Slack",
      insightsUpdatedAt: daysAgo(3),
      companyNews: [
        {
          id: "news-stripe-1",
          headline: "Stripe launches new embedded finance platform for SaaS",
          date: daysAgo(2),
          sourceUrl: "https://stripe.com/newsroom",
          category: "product",
        },
        {
          id: "news-stripe-2",
          headline: "Valued at $50B in latest secondary market transactions",
          date: daysAgo(15),
          category: "funding",
        },
        {
          id: "news-stripe-3",
          headline: "Opens new engineering hub in Toronto",
          date: daysAgo(25),
          sourceUrl: "https://stripe.com/blog",
          category: "leadership",
        },
      ],
    },

    notes: {
      customSummary:
        "Met at KubeCon. Super authentic and hates corporate speak. Just be real with her.",
      quickFacts: [
        "Maintains popular OSS project (15K stars)",
        "Writes for The Pragmatic Engineer",
      ],
      personalDetails: "Rescue dog named Kubernetes (Kube for short).",
      notesUpdatedAt: daysAgo(10),
    },

    recentTopics: ["CLI Improvements", "API Design", "Developer Experience"],

    interactions: [
      {
        id: "int-cli3-1",
        type: "slack",
        date: daysAgo(2),
        subject: "CLI Feedback Thread",
        summary:
          "Detailed feedback on new CLI commands. Loved the autocomplete feature.",
        sentiment: "positive",
        keyTopics: ["CLI", "UX Feedback"],
      },
    ],

    lastContacted: daysAgo(2),
    nextFollowUp: daysAgo(-7),
    firstContact: monthsAgo(3),
    createdAt: monthsAgo(3),
    updatedAt: daysAgo(2),
  },

  {
    id: "cli-4",
    firstName: "David",
    lastName: "Park",
    company: "Salesforce",
    title: "Senior Director",
    department: "Platform Engineering",
    email: "dpark@salesforce.com",
    phone: "+1 (415) 555-0789",
    linkedIn: "linkedin.com/in/davidpark",
    timezone: "America/Los_Angeles",
    location: "San Francisco, CA",
    category: "client",

    relationship: "key_stakeholder",
    relationshipScore: 45,
    warmth: "cool",
    communicationStyle: "sync",

    roleBadges: ["Key Stakeholder", "At Risk"],
    tags: ["Enterprise", "Renewal Risk", "Needs Attention"],

    insights: {
      aiSummary:
        "Relationship has cooled since their team restructuring. He's evaluating competitors. Urgent need to re-engage.",
      strengths: ["Existing customer (2 years)", "Team knows our product"],
      risks: [
        "Actively evaluating competitors",
        "Frustrated with support tickets",
      ],
      talkingPoints: [
        "Address outstanding support issues",
        "Share Q1 roadmap preview",
        "Discuss renewal terms",
      ],
      interests: ["Platform reliability", "Cost optimization"],
      bestReachTime: "Schedule through EA",
      insightsUpdatedAt: daysAgo(1),
      companyNews: [
        {
          id: "news-sfdc-1",
          headline: "Salesforce launches Agentforce AI platform",
          date: daysAgo(7),
          sourceUrl: "https://salesforce.com/news",
          category: "product",
        },
        {
          id: "news-sfdc-2",
          headline: "Announces acquisition of data analytics startup",
          date: daysAgo(14),
          category: "funding",
        },
        {
          id: "news-sfdc-3",
          headline: "CEO Marc Benioff speaks at World Economic Forum",
          date: daysAgo(20),
          category: "leadership",
        },
      ],
    },

    notes: {
      customSummary:
        "WARNING: Renewal at risk. He mentioned looking at alternatives. Need executive engagement ASAP.",
      quickFacts: [
        "Reports to SVP",
        "Team of 50+ engineers",
        "Contract renews Q2",
      ],
      personalDetails: "New father (twins!), probably sleep-deprived.",
      notesUpdatedAt: daysAgo(1),
    },

    recentTopics: [
      "Support Issues",
      "Renewal Discussion",
      "Competitor Evaluation",
    ],

    interactions: [
      {
        id: "int-cli4-1",
        type: "call",
        date: daysAgo(4),
        subject: "Account Check-in",
        summary:
          "Tense call. He's frustrated with response times. Mentioned evaluating a competitor.",
        sentiment: "negative",
        keyTopics: ["Support Issues", "Competitor Threat"],
      },
    ],

    lastContacted: daysAgo(4),
    nextFollowUp: daysAgo(0),
    firstContact: monthsAgo(24),
    createdAt: monthsAgo(24),
    updatedAt: daysAgo(1),
  },

  {
    id: "cli-5",
    firstName: "Elena",
    lastName: "Rodriguez",
    company: "Shopify",
    title: "Director of Engineering",
    department: "Merchant Platform",
    email: "elena.rodriguez@shopify.com",
    linkedIn: "linkedin.com/in/elenarodriguez",
    timezone: "America/Toronto",
    location: "Toronto, ON",
    category: "client",

    relationship: "contact",
    relationshipScore: 65,
    warmth: "new",
    communicationStyle: "async",

    roleBadges: ["New Lead", "High Potential"],
    tags: ["E-commerce", "Growth Stage", "Inbound Lead"],

    insights: {
      aiSummary:
        "Inbound lead from our webinar. She's building a new internal tools team with budget allocated for Q1. Fast-moving opportunity.",
      strengths: [
        "Clear budget and timeline",
        "Technical background",
        "Motivated",
      ],
      risks: ["Also evaluating 2 other vendors", "Tight Q1 deadline"],
      talkingPoints: [
        "E-commerce use cases",
        "Integration with their stack",
        "Quick pilot option",
      ],
      interests: ["Internal tooling", "Developer productivity"],
      bestReachTime: "Flexible - responds quickly to email",
      insightsUpdatedAt: daysAgo(0),
      companyNews: [
        {
          id: "news-shop-1",
          headline: "Shopify reports strong holiday season, GMV up 24%",
          date: daysAgo(8),
          sourceUrl: "https://news.shopify.com",
          category: "funding",
        },
        {
          id: "news-shop-2",
          headline: "Launches Shop Pay installments in Europe",
          date: daysAgo(16),
          category: "product",
        },
      ],
    },

    notes: {
      customSummary:
        "Great energy on intro call. She knows exactly what she wants. Move fast - she has urgency.",
      quickFacts: ["Ex-Wealthsimple, Ex-Uber", "Built 3 internal tools teams"],
      personalDetails: "Loves salsa dancing. Training for Ironman.",
      notesUpdatedAt: daysAgo(1),
    },

    recentTopics: ["Internal Tools Strategy", "Pilot Program", "Integration"],

    interactions: [
      {
        id: "int-cli5-1",
        type: "meeting",
        date: daysAgo(1),
        subject: "Discovery Call",
        summary:
          "Excellent meeting. Clear requirements and budget. Wants to move to pilot within 2 weeks.",
        sentiment: "positive",
        keyTopics: ["Discovery", "Requirements", "Pilot Timeline"],
      },
    ],

    lastContacted: daysAgo(1),
    nextFollowUp: daysAgo(-2),
    firstContact: daysAgo(3),
    createdAt: daysAgo(3),
    updatedAt: daysAgo(1),
  },

  {
    id: "cli-6",
    firstName: "Aisha",
    lastName: "Patel",
    company: "Microsoft",
    title: "Principal Product Manager",
    department: "Azure DevOps",
    email: "aipatel@microsoft.com",
    linkedIn: "linkedin.com/in/aishapatel",
    twitter: "@aikidev",
    timezone: "America/Los_Angeles",
    location: "Redmond, WA",
    category: "client",

    relationship: "champion",
    relationshipScore: 95,
    warmth: "hot",
    communicationStyle: "casual",

    roleBadges: ["Champion", "Product Partner", "Reference Customer"],
    tags: ["Strategic Account", "Case Study", "Product Advisory Board"],

    insights: {
      aiSummary:
        "Your most enthusiastic champion. She's done conference talks about your product and actively refers new customers. Treat her like a product partner.",
      strengths: [
        "Vocal advocate (2 conference talks)",
        "Product advisory board member",
        "Enterprise reference customer",
      ],
      risks: ["Don't take her for granted", "High expectations for support"],
      talkingPoints: [
        "Early preview of Q2 features",
        "Co-presenting at Build",
        "Expansion to other Azure teams",
      ],
      interests: ["Product development", "Developer tools", "AI/ML"],
      bestReachTime: "Very responsive - DM on Twitter or Teams",
      insightsUpdatedAt: daysAgo(5),
    },

    notes: {
      customSummary:
        "Our best customer relationship. She's given us 3 referrals that closed. Always include her in beta programs.",
      quickFacts: [
        "10 years at Microsoft",
        "Former startup founder (acquired)",
        "Writes for MS DevBlog",
      ],
      personalDetails:
        "Two cats named Git and Hub. Competitive Valorant player.",
      notesUpdatedAt: weeksAgo(2),
    },

    recentTopics: ["Q2 Roadmap Preview", "Build Conference", "Team Expansion"],

    interactions: [
      {
        id: "int-cli6-1",
        type: "meeting",
        date: daysAgo(6),
        subject: "Q2 Roadmap Preview",
        summary:
          "Shared early roadmap. She's thrilled about collaboration features. Wants to be first to test.",
        sentiment: "positive",
        keyTopics: ["Roadmap", "Collaboration Features", "Beta Access"],
      },
    ],

    lastContacted: daysAgo(6),
    nextFollowUp: daysAgo(-7),
    firstContact: monthsAgo(18),
    createdAt: monthsAgo(18),
    updatedAt: daysAgo(6),
  },

  {
    id: "cli-7",
    firstName: "Tom",
    lastName: "Anderson",
    company: "Netflix",
    title: "Engineering Manager",
    department: "Studio Technology",
    email: "tanderson@netflix.com",
    linkedIn: "linkedin.com/in/tomanderson",
    timezone: "America/Los_Angeles",
    location: "Los Angeles, CA",
    category: "client",

    relationship: "contact",
    relationshipScore: 50,
    warmth: "cold",
    communicationStyle: "async",

    roleBadges: ["Dormant Lead", "Re-engage"],
    tags: ["Media & Entertainment", "Lost Opportunity", "Reactivate"],

    insights: {
      aiSummary:
        "Deal went dark 6 months ago due to internal reorg. Now that things have settled, worth re-engaging. Their team has grown 2x.",
      strengths: ["Was very interested", "Team has grown (more budget)"],
      risks: ["May have moved on", "Need fresh pitch"],
      talkingPoints: [
        "Catch up on their new initiatives",
        "Share what's new since we last spoke",
      ],
      interests: ["Content pipeline tools", "Global team collaboration"],
      bestReachTime: "Try LinkedIn message",
      insightsUpdatedAt: daysAgo(0),
    },

    notes: {
      customSummary:
        "Deal paused during restructuring. His new team is focused on studio collaboration - could be even better fit.",
      quickFacts: ["Ex-Amazon, Ex-Adobe", "Manages 30+ engineers"],
      personalDetails: "Surfer, works from home near the beach.",
      notesUpdatedAt: daysAgo(0),
    },

    recentTopics: [],

    interactions: [
      {
        id: "int-cli7-1",
        type: "email",
        date: monthsAgo(6),
        subject: "Re: Putting on Hold",
        summary:
          "Let us know the org was restructuring. Asked to reconnect in 6 months.",
        sentiment: "neutral",
        keyTopics: ["Deal Pause", "Restructuring"],
      },
    ],

    lastContacted: monthsAgo(6),
    nextFollowUp: daysAgo(-1),
    firstContact: monthsAgo(8),
    createdAt: monthsAgo(8),
    updatedAt: daysAgo(0),
  },

  {
    id: "cli-8",
    firstName: "Michelle",
    lastName: "Liu",
    company: "Airbnb",
    title: "VP of Engineering",
    department: "Platform",
    email: "mliu@airbnb.com",
    linkedIn: "linkedin.com/in/michelleliu",
    timezone: "America/Los_Angeles",
    location: "San Francisco, CA",
    category: "client",

    relationship: "decision_maker",
    relationshipScore: 70,
    warmth: "warm",
    communicationStyle: "formal",

    roleBadges: ["Decision Maker", "Enterprise"],
    tags: ["Enterprise", "Tech", "Active Opportunity"],

    insights: {
      aiSummary:
        "Senior executive with budget authority. Methodical decision-maker who needs strong business case and references.",
      strengths: ["Clear budget", "Direct decision authority"],
      risks: ["Slow procurement", "Needs multiple stakeholder alignment"],
      talkingPoints: [
        "ROI model",
        "Reference customers",
        "Implementation plan",
      ],
      interests: ["Platform reliability", "Developer productivity"],
      bestReachTime: "Schedule through her chief of staff",
      insightsUpdatedAt: daysAgo(5),
    },

    notes: {
      customSummary:
        "High-value prospect. She values efficiency and clear communication. Don't waste her time.",
      quickFacts: ["Ex-Google", "Stanford MBA", "Board advisor to 2 startups"],
      personalDetails: "Wine enthusiast. Napa regular.",
      notesUpdatedAt: daysAgo(5),
    },

    recentTopics: ["Business Case", "Implementation", "References"],

    interactions: [
      {
        id: "int-cli8-1",
        type: "meeting",
        date: daysAgo(5),
        subject: "Executive Briefing",
        summary:
          "Walked through business case. She's interested but needs more references.",
        sentiment: "positive",
        keyTopics: ["Business Case", "References"],
      },
    ],

    lastContacted: daysAgo(5),
    nextFollowUp: daysAgo(-3),
    firstContact: monthsAgo(1),
    createdAt: monthsAgo(1),
    updatedAt: daysAgo(5),
  },

  {
    id: "cli-9",
    firstName: "Kevin",
    lastName: "O'Brien",
    company: "Deloitte",
    title: "Partner",
    department: "Technology Consulting",
    email: "kobrien@deloitte.com",
    phone: "+1 (312) 555-0234",
    linkedIn: "linkedin.com/in/kevinobrien",
    timezone: "America/Chicago",
    location: "Chicago, IL",
    category: "client",

    relationship: "blocker",
    relationshipScore: 35,
    warmth: "cold",
    communicationStyle: "formal",

    roleBadges: ["Potential Blocker", "Competitor Relationship"],
    tags: ["Consulting", "Complex Sale", "Political"],

    insights: {
      aiSummary:
        "Has existing relationship with a competitor. May be steering the deal their way. Need to find his angle - likely wants to wrap services around whichever vendor wins.",
      strengths: [
        "Senior partner with influence",
        "Could become champion if aligned",
      ],
      risks: ["Competitor relationship", "Controls evaluation process"],
      talkingPoints: [
        "Services partnership opportunity",
        "Implementation consulting revenue",
      ],
      interests: ["Consulting revenue", "Client relationships"],
      bestReachTime: "Travels Mon-Thu, best on Fridays",
      insightsUpdatedAt: weeksAgo(1),
    },

    notes: {
      customSummary:
        "Challenging situation. He's been dismissive and keeps bringing up competitor features. Strategy: position as services opportunity.",
      quickFacts: ["25+ years at Deloitte", "On competitor's advisory board"],
      personalDetails: "Notre Dame football fan. Lake house in Michigan.",
      notesUpdatedAt: weeksAgo(1),
    },

    recentTopics: ["Competitor Comparison", "Implementation Concerns"],

    interactions: [
      {
        id: "int-cli9-1",
        type: "meeting",
        date: weeksAgo(1),
        subject: "Vendor Evaluation Committee",
        summary:
          "Tough room. He kept pushing back on our architecture. Felt orchestrated.",
        sentiment: "negative",
        keyTopics: ["Architecture", "Vendor Evaluation"],
      },
    ],

    lastContacted: weeksAgo(1),
    nextFollowUp: daysAgo(-3),
    firstContact: monthsAgo(2),
    createdAt: monthsAgo(2),
    updatedAt: weeksAgo(1),
  },

  {
    id: "cli-10",
    firstName: "Jessica",
    lastName: "Martinez",
    company: "Uber",
    title: "Director of Engineering",
    department: "Maps Platform",
    email: "jmartinez@uber.com",
    linkedIn: "linkedin.com/in/jessicamartinez",
    timezone: "America/Los_Angeles",
    location: "San Francisco, CA",
    category: "client",

    relationship: "influencer",
    relationshipScore: 72,
    warmth: "warm",
    communicationStyle: "casual",

    roleBadges: ["Technical Evaluator", "Influencer"],
    tags: ["Tech", "Active Evaluation"],

    insights: {
      aiSummary:
        "Technical evaluator with strong influence on the decision. Needs to be convinced on technical merits.",
      strengths: ["Respected technical voice", "Can champion internally"],
      risks: ["Very technical bar", "Needs proof points"],
      talkingPoints: ["Technical architecture", "Performance benchmarks"],
      interests: ["Scale", "Performance", "Developer experience"],
      bestReachTime: "Slack or email preferred",
      insightsUpdatedAt: daysAgo(4),
    },

    notes: {
      customSummary:
        "Jessica is the technical gatekeeper. Win her over and she'll champion internally.",
      quickFacts: ["Ex-Google", "Distributed systems expert"],
      personalDetails: "Rock climbing enthusiast.",
      notesUpdatedAt: daysAgo(4),
    },

    recentTopics: ["Technical Deep Dive", "Performance", "Architecture"],

    interactions: [
      {
        id: "int-cli10-1",
        type: "meeting",
        date: daysAgo(4),
        subject: "Technical Deep Dive",
        summary: "Good technical discussion. She wants to see our benchmarks.",
        sentiment: "positive",
        keyTopics: ["Architecture", "Performance"],
      },
    ],

    lastContacted: daysAgo(4),
    nextFollowUp: daysAgo(-5),
    firstContact: monthsAgo(1),
    createdAt: monthsAgo(1),
    updatedAt: daysAgo(4),
  },

  {
    id: "cli-11",
    firstName: "Ryan",
    lastName: "Wilson",
    company: "Datadog",
    title: "VP of Product",
    department: "Product",
    email: "rwilson@datadoghq.com",
    linkedIn: "linkedin.com/in/ryanwilson",
    timezone: "America/New_York",
    location: "New York, NY",
    category: "client",

    relationship: "champion",
    relationshipScore: 82,
    warmth: "hot",
    communicationStyle: "casual",

    roleBadges: ["Product Champion", "Integration Partner"],
    tags: ["Integration", "Partnership", "Strategic"],

    insights: {
      aiSummary:
        "Exploring deep integration partnership. Ryan sees strong synergy between our products and wants to build a joint solution.",
      strengths: ["Product vision alignment", "Technical team support"],
      risks: ["Partnership timelines can slip"],
      talkingPoints: ["Integration roadmap", "Joint GTM", "Technical specs"],
      interests: ["Observability", "Developer experience", "Integrations"],
      bestReachTime: "Very responsive to Slack",
      insightsUpdatedAt: daysAgo(3),
    },

    notes: {
      customSummary:
        "Ryan is excited about the integration opportunity. Keep him engaged and this could be a game-changer.",
      quickFacts: ["Built Datadog's APM product", "Ex-New Relic"],
      personalDetails: "Home brewer. Fantasy football obsessed.",
      notesUpdatedAt: daysAgo(3),
    },

    recentTopics: ["Integration", "Partnership", "Joint Roadmap"],

    interactions: [
      {
        id: "int-cli11-1",
        type: "meeting",
        date: daysAgo(3),
        subject: "Integration Planning",
        summary: "Mapped out integration architecture. Both teams excited.",
        sentiment: "positive",
        keyTopics: ["Integration", "Architecture"],
      },
    ],

    lastContacted: daysAgo(3),
    nextFollowUp: daysAgo(-7),
    firstContact: monthsAgo(2),
    createdAt: monthsAgo(2),
    updatedAt: daysAgo(3),
  },

  {
    id: "cli-12",
    firstName: "Amy",
    lastName: "Nguyen",
    company: "Twilio",
    title: "Engineering Manager",
    department: "Developer Platform",
    email: "anguyen@twilio.com",
    linkedIn: "linkedin.com/in/amynguyen",
    timezone: "America/Los_Angeles",
    location: "San Francisco, CA",
    category: "client",

    relationship: "contact",
    relationshipScore: 58,
    warmth: "warm",
    communicationStyle: "async",

    roleBadges: ["Prospect", "Technical Evaluator"],
    tags: ["Tech", "Developer Platform"],

    insights: {
      aiSummary:
        "Mid-stage prospect. Amy is evaluating us for her team but needs to build internal consensus.",
      strengths: ["Clear use case", "Budget available"],
      risks: ["Needs to convince her peers"],
      talkingPoints: ["Team productivity metrics", "ROI calculator"],
      interests: ["Developer productivity", "API design"],
      bestReachTime: "Email works best",
      insightsUpdatedAt: daysAgo(6),
    },

    notes: {
      customSummary:
        "Amy is bought in but needs help selling internally. Give her the materials she needs.",
      quickFacts: ["5 years at Twilio", "Ex-startup engineer"],
      personalDetails: "New mom. Flexible schedule.",
      notesUpdatedAt: daysAgo(6),
    },

    recentTopics: ["ROI", "Internal Buy-in", "Use Cases"],

    interactions: [
      {
        id: "int-cli12-1",
        type: "email",
        date: daysAgo(6),
        subject: "ROI Materials",
        summary:
          "Sent ROI calculator and case studies. She's presenting internally.",
        sentiment: "positive",
        keyTopics: ["ROI", "Materials"],
      },
    ],

    lastContacted: daysAgo(6),
    nextFollowUp: daysAgo(-4),
    firstContact: monthsAgo(1),
    createdAt: monthsAgo(1),
    updatedAt: daysAgo(6),
  },

  {
    id: "cli-13",
    firstName: "Chris",
    lastName: "Taylor",
    company: "Figma",
    title: "Head of Infrastructure",
    department: "Engineering",
    email: "ctaylor@figma.com",
    linkedIn: "linkedin.com/in/christaylor",
    timezone: "America/Los_Angeles",
    location: "San Francisco, CA",
    category: "client",

    relationship: "decision_maker",
    relationshipScore: 75,
    warmth: "warm",
    communicationStyle: "casual",

    roleBadges: ["Decision Maker", "Technical Leader"],
    tags: ["Tech", "High Growth", "Design Tools"],

    insights: {
      aiSummary:
        "Fast-moving opportunity at a high-growth company. Chris has budget and authority - just needs to see the value.",
      strengths: ["Clear authority", "Fast decision cycles"],
      risks: ["Many priorities competing for attention"],
      talkingPoints: ["Quick time to value", "Minimal implementation overhead"],
      interests: ["Infrastructure", "Scale", "Developer velocity"],
      bestReachTime: "Mornings work best",
      insightsUpdatedAt: daysAgo(2),
    },

    notes: {
      customSummary:
        "Chris is decisive and values speed. Show quick wins and he'll move fast.",
      quickFacts: ["Early Figma employee", "Built their infra from scratch"],
      personalDetails: "Cyclist. Rides to work daily.",
      notesUpdatedAt: daysAgo(2),
    },

    recentTopics: ["Implementation Speed", "Quick Wins", "Value"],

    interactions: [
      {
        id: "int-cli13-1",
        type: "meeting",
        date: daysAgo(2),
        subject: "Value Discussion",
        summary: "Focused on quick wins. He wants a pilot starting next week.",
        sentiment: "positive",
        keyTopics: ["Pilot", "Quick Wins"],
      },
    ],

    lastContacted: daysAgo(2),
    nextFollowUp: daysAgo(-3),
    firstContact: weeksAgo(2),
    createdAt: weeksAgo(2),
    updatedAt: daysAgo(2),
  },

  {
    id: "cli-14",
    firstName: "Lauren",
    lastName: "Baker",
    company: "Notion",
    title: "Director of Engineering",
    department: "Platform",
    email: "lbaker@notion.so",
    linkedIn: "linkedin.com/in/laurenbaker",
    timezone: "America/Los_Angeles",
    location: "San Francisco, CA",
    category: "client",

    relationship: "champion",
    relationshipScore: 85,
    warmth: "hot",
    communicationStyle: "casual",

    roleBadges: ["Champion", "Power User"],
    tags: ["Tech", "Productivity", "Reference"],

    insights: {
      aiSummary:
        "Lauren is a true believer. Her team is one of our most active users and she's always willing to give references.",
      strengths: ["Vocal advocate", "Active user", "Great reference"],
      risks: ["Keep her engaged with new features"],
      talkingPoints: ["New features", "Feedback session", "Reference requests"],
      interests: ["Productivity tools", "Team collaboration"],
      bestReachTime: "Very responsive on Slack",
      insightsUpdatedAt: daysAgo(4),
    },

    notes: {
      customSummary:
        "Lauren's team uses us daily. She's our go-to reference and always has great product feedback.",
      quickFacts: ["4 years at Notion", "Built their platform team"],
      personalDetails: "Yoga instructor on weekends. Plant mom.",
      notesUpdatedAt: daysAgo(4),
    },

    recentTopics: ["Product Feedback", "New Features", "Team Usage"],

    interactions: [
      {
        id: "int-cli14-1",
        type: "slack",
        date: daysAgo(4),
        subject: "Feature Feedback",
        summary:
          "Great feedback on new collaboration features. Already using them daily.",
        sentiment: "positive",
        keyTopics: ["Features", "Feedback"],
      },
    ],

    lastContacted: daysAgo(4),
    nextFollowUp: daysAgo(-10),
    firstContact: monthsAgo(12),
    createdAt: monthsAgo(12),
    updatedAt: daysAgo(4),
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // OTHER (12 contacts) - Advisors, Partners, Industry
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: "oth-1",
    firstName: "Alex",
    lastName: "Thompson",
    company: "Independent",
    title: "Executive Coach",
    department: "Advisory",
    email: "alex@alexthompson.co",
    linkedIn: "linkedin.com/in/alexthompson",
    timezone: "America/Los_Angeles",
    location: "Los Angeles, CA",
    category: "other",

    relationship: "champion",
    relationshipScore: 90,
    warmth: "hot",
    communicationStyle: "casual",

    roleBadges: ["Executive Coach", "Trusted Advisor"],
    tags: ["Advisor", "Leadership", "Coach"],

    insights: {
      aiSummary:
        "Our executive coach. Alex has been invaluable for leadership development and navigating difficult situations.",
      strengths: ["Trusted sounding board", "CEO coaching experience"],
      risks: ["Expensive - use wisely"],
      talkingPoints: [
        "Leadership challenges",
        "Board dynamics",
        "Team building",
      ],
      interests: ["Leadership development", "Organizational psychology"],
      bestReachTime: "Weekly standing call",
      insightsUpdatedAt: daysAgo(7),
    },

    notes: {
      customSummary:
        "Alex is our secret weapon. Use him for the hard stuff - leadership conflicts, board prep, etc.",
      quickFacts: ["Coached 50+ CEOs", "Ex-McKinsey Partner"],
      personalDetails: "Meditation teacher. Lives on a boat.",
      notesUpdatedAt: daysAgo(7),
    },

    recentTopics: ["Leadership", "Board Prep", "Team Dynamics"],

    interactions: [
      {
        id: "int-oth1-1",
        type: "call",
        date: daysAgo(7),
        subject: "Weekly Coaching",
        summary: "Worked through board meeting approach. Great frameworks.",
        sentiment: "positive",
        keyTopics: ["Board Prep", "Leadership"],
      },
    ],

    lastContacted: daysAgo(7),
    nextFollowUp: daysAgo(0),
    firstContact: monthsAgo(10),
    createdAt: monthsAgo(10),
    updatedAt: daysAgo(7),
  },

  {
    id: "oth-2",
    firstName: "Dr. Maria",
    lastName: "Santos",
    company: "Stanford University",
    title: "Professor",
    department: "Computer Science",
    email: "msantos@stanford.edu",
    linkedIn: "linkedin.com/in/mariasantos",
    twitter: "@msantos_cs",
    timezone: "America/Los_Angeles",
    location: "Stanford, CA",
    category: "other",

    relationship: "influencer",
    relationshipScore: 75,
    warmth: "warm",
    communicationStyle: "formal",

    roleBadges: ["Academic Advisor", "AI Expert"],
    tags: ["Research", "AI/ML", "Academic"],

    insights: {
      aiSummary:
        "Leading AI researcher and informal technical advisor. Her endorsement carries weight in the AI community.",
      strengths: ["AI expertise", "Academic credibility", "PhD pipeline"],
      risks: ["Academic pace - slower than startup"],
      talkingPoints: [
        "Research collaboration",
        "PhD recruiting",
        "Technical papers",
      ],
      interests: ["Machine learning", "Systems research", "Education"],
      bestReachTime: "Email preferred, academic schedule",
      insightsUpdatedAt: weeksAgo(2),
    },

    notes: {
      customSummary:
        "Dr. Santos is brilliant. Great for technical validation and recruiting her PhD students.",
      quickFacts: ["ACM Fellow", "Google AI advisory board", "100+ papers"],
      personalDetails: "Amateur astronomer. Has a telescope at home.",
      notesUpdatedAt: weeksAgo(2),
    },

    recentTopics: ["AI Research", "PhD Recruiting", "Technical Review"],

    interactions: [
      {
        id: "int-oth2-1",
        type: "meeting",
        date: weeksAgo(2),
        subject: "Technical Advisory",
        summary:
          "Reviewed our ML approach. Got valuable feedback and paper references.",
        sentiment: "positive",
        keyTopics: ["ML", "Research"],
      },
    ],

    lastContacted: weeksAgo(2),
    nextFollowUp: daysAgo(-14),
    firstContact: monthsAgo(6),
    createdAt: monthsAgo(6),
    updatedAt: weeksAgo(2),
  },

  {
    id: "oth-3",
    firstName: "James",
    lastName: "Wright",
    company: "TechCrunch",
    title: "Senior Editor",
    department: "Editorial",
    email: "james.wright@techcrunch.com",
    twitter: "@jameswright_tc",
    timezone: "America/Los_Angeles",
    location: "San Francisco, CA",
    category: "other",

    relationship: "contact",
    relationshipScore: 62,
    warmth: "warm",
    communicationStyle: "casual",

    roleBadges: ["Press Contact", "Tech Media"],
    tags: ["Media", "PR", "Press"],

    insights: {
      aiSummary:
        "Key tech journalist. Good relationship - he's written about us twice. Worth maintaining for future coverage.",
      strengths: ["TC reach", "Fair journalist", "Enterprise beat"],
      risks: ["Busy - needs strong angle"],
      talkingPoints: [
        "Upcoming announcements",
        "Industry trends",
        "Exclusives",
      ],
      interests: ["Enterprise tech", "AI applications", "Startup stories"],
      bestReachTime: "Twitter DM or text",
      insightsUpdatedAt: weeksAgo(3),
    },

    notes: {
      customSummary:
        "James has been fair to us. Keep him in the loop on big announcements - he appreciates the heads up.",
      quickFacts: ["10 years at TC", "Former startup founder"],
      personalDetails: "Amateur DJ. Vinyl collector.",
      notesUpdatedAt: weeksAgo(3),
    },

    recentTopics: ["Industry Coverage", "Announcements"],

    interactions: [
      {
        id: "int-oth3-1",
        type: "email",
        date: weeksAgo(3),
        subject: "Story Pitch",
        summary:
          "Pitched our Series B angle. He's interested when we're ready.",
        sentiment: "positive",
        keyTopics: ["Press", "Series B"],
      },
    ],

    lastContacted: weeksAgo(3),
    nextFollowUp: daysAgo(-21),
    firstContact: monthsAgo(8),
    createdAt: monthsAgo(8),
    updatedAt: weeksAgo(3),
  },

  {
    id: "oth-4",
    firstName: "Linda",
    lastName: "Chen",
    company: "AWS",
    title: "Partner Solutions Architect",
    department: "Startups",
    email: "lindachen@amazon.com",
    linkedIn: "linkedin.com/in/lindachen",
    timezone: "America/Los_Angeles",
    location: "Seattle, WA",
    category: "other",

    relationship: "contact",
    relationshipScore: 68,
    warmth: "warm",
    communicationStyle: "formal",

    roleBadges: ["Cloud Partner", "AWS Contact"],
    tags: ["Partnership", "AWS", "Infrastructure"],

    insights: {
      aiSummary:
        "Our AWS partner contact. Helpful for credits, co-marketing opportunities, and marketplace listing.",
      strengths: ["AWS credits access", "Co-marketing budget"],
      risks: ["AWS bureaucracy can be slow"],
      talkingPoints: [
        "Marketplace listing",
        "Co-marketing",
        "Technical integration",
      ],
      interests: ["Partner success", "AWS services adoption"],
      bestReachTime: "Email, standard business hours",
      insightsUpdatedAt: weeksAgo(1),
    },

    notes: {
      customSummary:
        "Linda has been helpful with credits and AWS Marketplace. Keep her updated on our AWS usage.",
      quickFacts: ["8 years at AWS", "Former startup founder"],
      personalDetails: "Hiker. Completed the PCT.",
      notesUpdatedAt: weeksAgo(1),
    },

    recentTopics: ["AWS Credits", "Marketplace", "Partnership"],

    interactions: [
      {
        id: "int-oth4-1",
        type: "email",
        date: weeksAgo(1),
        subject: "Marketplace Update",
        summary: "Discussing AWS Marketplace listing timeline. Q2 target.",
        sentiment: "positive",
        keyTopics: ["Marketplace", "Timeline"],
      },
    ],

    lastContacted: weeksAgo(1),
    nextFollowUp: daysAgo(-14),
    firstContact: monthsAgo(6),
    createdAt: monthsAgo(6),
    updatedAt: weeksAgo(1),
  },

  {
    id: "oth-5",
    firstName: "Mark",
    lastName: "Johnson",
    company: "Wilson Sonsini",
    title: "Partner",
    department: "Corporate",
    email: "mjohnson@wsgr.com",
    phone: "+1 (650) 555-0345",
    linkedIn: "linkedin.com/in/markjohnson",
    timezone: "America/Los_Angeles",
    location: "Palo Alto, CA",
    category: "other",

    relationship: "key_stakeholder",
    relationshipScore: 85,
    warmth: "hot",
    communicationStyle: "formal",

    roleBadges: ["Legal Counsel", "Trusted Advisor"],
    tags: ["Legal", "Corporate", "Advisor"],

    insights: {
      aiSummary:
        "Our outside general counsel. Mark has shepherded us through seed, Series A, and now Series B. Invaluable legal partner.",
      strengths: [
        "Deep startup experience",
        "Fast turnaround",
        "Strategic advice",
      ],
      risks: ["Expensive - but worth it for complex matters"],
      talkingPoints: ["Series B docs", "Board matters", "IP strategy"],
      interests: ["Startup law", "Corporate governance"],
      bestReachTime: "Very responsive to email and text",
      insightsUpdatedAt: daysAgo(3),
    },

    notes: {
      customSummary:
        "Mark is our legal secret weapon. He's seen everything and always gives strategic, not just legal, advice.",
      quickFacts: ["20+ years at WSGR", "Worked with 200+ startups"],
      personalDetails: "Wine collector. Stanford Law grad.",
      notesUpdatedAt: daysAgo(3),
    },

    recentTopics: ["Series B Docs", "Corporate Governance"],

    interactions: [
      {
        id: "int-oth5-1",
        type: "call",
        date: daysAgo(3),
        subject: "Series B Docs Review",
        summary: "Reviewed term sheet terms. Good alignment on key points.",
        sentiment: "positive",
        keyTopics: ["Series B", "Legal"],
      },
    ],

    lastContacted: daysAgo(3),
    nextFollowUp: daysAgo(-5),
    firstContact: monthsAgo(18),
    createdAt: monthsAgo(18),
    updatedAt: daysAgo(3),
  },

  {
    id: "oth-6",
    firstName: "Susan",
    lastName: "Miller",
    company: "Greenhouse",
    title: "VP of Customer Success",
    department: "Customer Success",
    email: "smiller@greenhouse.io",
    linkedIn: "linkedin.com/in/susanmiller",
    timezone: "America/New_York",
    location: "New York, NY",
    category: "other",

    relationship: "influencer",
    relationshipScore: 65,
    warmth: "warm",
    communicationStyle: "async",

    roleBadges: ["Industry Peer", "GTM Expert"],
    tags: ["Network", "GTM", "CS Expert"],

    insights: {
      aiSummary:
        "Industry peer who's been helpful with CS best practices. Great sounding board for GTM strategy.",
      strengths: ["CS expertise", "Enterprise experience"],
      risks: ["Busy with her own job"],
      talkingPoints: ["CS metrics", "Enterprise playbook"],
      interests: ["Customer success", "SaaS metrics", "Enterprise GTM"],
      bestReachTime: "Email or LinkedIn",
      insightsUpdatedAt: weeksAgo(2),
    },

    notes: {
      customSummary:
        "Susan has been generous with her time. Her CS playbook has been invaluable.",
      quickFacts: ["Built Greenhouse CS from scratch", "10+ years in CS"],
      personalDetails: "Marathon runner. Book club organizer.",
      notesUpdatedAt: weeksAgo(2),
    },

    recentTopics: ["CS Best Practices", "Enterprise GTM"],

    interactions: [
      {
        id: "int-oth6-1",
        type: "call",
        date: weeksAgo(2),
        subject: "CS Strategy Chat",
        summary: "Shared her enterprise CS playbook. Great insights.",
        sentiment: "positive",
        keyTopics: ["CS", "Strategy"],
      },
    ],

    lastContacted: weeksAgo(2),
    nextFollowUp: daysAgo(-30),
    firstContact: monthsAgo(4),
    createdAt: monthsAgo(4),
    updatedAt: weeksAgo(2),
  },

  {
    id: "oth-7",
    firstName: "Daniel",
    lastName: "Kim",
    company: "Honeycomb",
    title: "CEO",
    department: "Executive",
    email: "daniel@honeycomb.io",
    linkedIn: "linkedin.com/in/danielkim",
    twitter: "@danielkim",
    timezone: "America/Los_Angeles",
    location: "San Francisco, CA",
    category: "other",

    relationship: "influencer",
    relationshipScore: 70,
    warmth: "warm",
    communicationStyle: "casual",

    roleBadges: ["Founder Peer", "Developer Tools"],
    tags: ["Network", "Founder", "DevTools"],

    insights: {
      aiSummary:
        "Fellow developer tools CEO. Great for comparing notes on GTM, fundraising, and building in the space.",
      strengths: ["Similar stage company", "DevTools expertise"],
      risks: ["Could be competitive eventually"],
      talkingPoints: ["Market trends", "Fundraising", "GTM strategies"],
      interests: ["Observability", "Developer experience", "Startup building"],
      bestReachTime: "Twitter DM or text",
      insightsUpdatedAt: weeksAgo(3),
    },

    notes: {
      customSummary:
        "Daniel is a great founder peer. We share notes openly. Not competitive today but worth watching.",
      quickFacts: ["3x founder", "YC alum", "Built Honeycomb to $50M ARR"],
      personalDetails: "Board game enthusiast. Has a game night.",
      notesUpdatedAt: weeksAgo(3),
    },

    recentTopics: ["Market Trends", "Fundraising"],

    interactions: [
      {
        id: "int-oth7-1",
        type: "call",
        date: weeksAgo(3),
        subject: "Founder Catch-up",
        summary: "Compared notes on Series B process. Helpful perspective.",
        sentiment: "positive",
        keyTopics: ["Fundraising", "Market"],
      },
    ],

    lastContacted: weeksAgo(3),
    nextFollowUp: daysAgo(-21),
    firstContact: monthsAgo(8),
    createdAt: monthsAgo(8),
    updatedAt: weeksAgo(3),
  },

  {
    id: "oth-8",
    firstName: "Nicole",
    lastName: "Brown",
    company: "Rippling",
    title: "VP of Sales",
    department: "Sales",
    email: "nbrown@rippling.com",
    linkedIn: "linkedin.com/in/nicolebrown",
    timezone: "America/Los_Angeles",
    location: "San Francisco, CA",
    category: "other",

    relationship: "contact",
    relationshipScore: 60,
    warmth: "warm",
    communicationStyle: "casual",

    roleBadges: ["Sales Leader", "GTM Expert"],
    tags: ["Network", "Sales", "GTM"],

    insights: {
      aiSummary:
        "Accomplished sales leader. Could be a future hire target or just a great network contact for sales advice.",
      strengths: ["Enterprise sales expertise", "Built teams at scale"],
      risks: ["Happy at Rippling currently"],
      talkingPoints: ["Sales playbook", "Team building"],
      interests: ["Enterprise sales", "Sales ops", "Team building"],
      bestReachTime: "Email or LinkedIn",
      insightsUpdatedAt: weeksAgo(4),
    },

    notes: {
      customSummary:
        "Nicole built Rippling's sales org. Great contact for when we're ready to scale sales.",
      quickFacts: ["Built $100M sales org", "Ex-Salesforce"],
      personalDetails: "Yoga enthusiast. Travels extensively.",
      notesUpdatedAt: weeksAgo(4),
    },

    recentTopics: ["Sales Best Practices"],

    interactions: [
      {
        id: "int-oth8-1",
        type: "linkedin",
        date: weeksAgo(4),
        subject: "Coffee Chat",
        summary: "Discussed enterprise sales approaches. Great advice.",
        sentiment: "positive",
        keyTopics: ["Sales"],
      },
    ],

    lastContacted: weeksAgo(4),
    nextFollowUp: daysAgo(-30),
    firstContact: monthsAgo(3),
    createdAt: monthsAgo(3),
    updatedAt: weeksAgo(4),
  },

  {
    id: "oth-9",
    firstName: "Andrew",
    lastName: "Lee",
    company: "Y Combinator",
    title: "Partner",
    department: "Investment",
    email: "alee@ycombinator.com",
    linkedIn: "linkedin.com/in/andrewlee",
    twitter: "@andrewlee_yc",
    timezone: "America/Los_Angeles",
    location: "San Francisco, CA",
    category: "other",

    relationship: "champion",
    relationshipScore: 82,
    warmth: "hot",
    communicationStyle: "casual",

    roleBadges: ["YC Partner", "Mentor"],
    tags: ["YC", "Mentor", "Network"],

    insights: {
      aiSummary:
        "Our YC partner from batch. Andrew continues to be a great resource for advice and YC network introductions.",
      strengths: ["YC network", "Startup pattern matching"],
      risks: ["Limited bandwidth - many portfolio companies"],
      talkingPoints: ["YC resources", "Founder intros", "Strategy check-in"],
      interests: ["Startups", "Developer tools", "Founder success"],
      bestReachTime: "Text or Slack",
      insightsUpdatedAt: weeksAgo(1),
    },

    notes: {
      customSummary:
        "Andrew has been a great YC partner. His pattern matching and network are invaluable.",
      quickFacts: ["2x founder (1 exit)", "YC partner 5 years"],
      personalDetails: "Parent of twins. Avid reader.",
      notesUpdatedAt: weeksAgo(1),
    },

    recentTopics: ["YC Resources", "Fundraising Advice"],

    interactions: [
      {
        id: "int-oth9-1",
        type: "call",
        date: weeksAgo(1),
        subject: "Office Hours",
        summary: "Discussed Series B strategy. Good framing advice.",
        sentiment: "positive",
        keyTopics: ["Series B", "Strategy"],
      },
    ],

    lastContacted: weeksAgo(1),
    nextFollowUp: daysAgo(-14),
    firstContact: monthsAgo(16),
    createdAt: monthsAgo(16),
    updatedAt: weeksAgo(1),
  },

  {
    id: "oth-10",
    firstName: "Rebecca",
    lastName: "Torres",
    company: "Craft Ventures",
    title: "Talent Partner",
    department: "Talent",
    email: "rtorres@craftventures.com",
    linkedIn: "linkedin.com/in/rebeccatorres",
    timezone: "America/Los_Angeles",
    location: "San Francisco, CA",
    category: "other",

    relationship: "contact",
    relationshipScore: 65,
    warmth: "warm",
    communicationStyle: "async",

    roleBadges: ["Talent Partner", "Recruiting"],
    tags: ["Recruiting", "Talent", "Network"],

    insights: {
      aiSummary:
        "VC talent partner who helps with executive recruiting. Good resource as we scale the team.",
      strengths: ["Executive search expertise", "Startup talent network"],
      risks: ["Primarily helps portfolio companies"],
      talkingPoints: [
        "Executive hiring",
        "Talent market",
        "Compensation benchmarks",
      ],
      interests: ["Talent", "Startup hiring", "Leadership"],
      bestReachTime: "Email works best",
      insightsUpdatedAt: weeksAgo(2),
    },

    notes: {
      customSummary:
        "Rebecca has helped place executives at top startups. Good resource for senior hires.",
      quickFacts: ["10+ years in startup recruiting", "200+ exec placements"],
      personalDetails: "Foodie. Knows every restaurant in SF.",
      notesUpdatedAt: weeksAgo(2),
    },

    recentTopics: ["Executive Hiring", "Talent Market"],

    interactions: [
      {
        id: "int-oth10-1",
        type: "email",
        date: weeksAgo(2),
        subject: "VP Engineering Search",
        summary: "Discussed VP Eng search. She'll send some candidates.",
        sentiment: "positive",
        keyTopics: ["Hiring", "Executive Search"],
      },
    ],

    lastContacted: weeksAgo(2),
    nextFollowUp: daysAgo(-7),
    firstContact: monthsAgo(2),
    createdAt: monthsAgo(2),
    updatedAt: weeksAgo(2),
  },

  {
    id: "oth-11",
    firstName: "Paul",
    lastName: "Garcia",
    company: "Cooley LLP",
    title: "Partner",
    department: "IP & Litigation",
    email: "pgarcia@cooley.com",
    phone: "+1 (650) 555-0456",
    linkedIn: "linkedin.com/in/paulgarcia",
    timezone: "America/Los_Angeles",
    location: "Palo Alto, CA",
    category: "other",

    relationship: "contact",
    relationshipScore: 55,
    warmth: "cool",
    communicationStyle: "formal",

    roleBadges: ["IP Attorney", "Legal"],
    tags: ["Legal", "IP", "Patents"],

    insights: {
      aiSummary:
        "IP specialist we've consulted for patent strategy. Good to have in the network for IP matters.",
      strengths: ["Deep IP expertise", "Patent litigation experience"],
      risks: ["Expensive - use for specific IP needs"],
      talkingPoints: ["Patent strategy", "IP protection"],
      interests: ["Technology patents", "IP strategy"],
      bestReachTime: "Email, business hours",
      insightsUpdatedAt: monthsAgo(1),
    },

    notes: {
      customSummary:
        "Paul did our initial IP review. Keep in touch for when we need patent work.",
      quickFacts: ["20 years IP law", "Former USPTO examiner"],
      personalDetails: "Collector of vintage tech.",
      notesUpdatedAt: monthsAgo(1),
    },

    recentTopics: ["IP Strategy"],

    interactions: [
      {
        id: "int-oth11-1",
        type: "meeting",
        date: monthsAgo(1),
        subject: "IP Review",
        summary: "Reviewed our IP position. Recommendations for patent filing.",
        sentiment: "positive",
        keyTopics: ["Patents", "IP"],
      },
    ],

    lastContacted: monthsAgo(1),
    nextFollowUp: daysAgo(-60),
    firstContact: monthsAgo(4),
    createdAt: monthsAgo(4),
    updatedAt: monthsAgo(1),
  },

  {
    id: "oth-12",
    firstName: "Stephanie",
    lastName: "Wong",
    company: "Emergence Capital",
    title: "Operating Partner",
    department: "Operations",
    email: "swong@emcap.com",
    linkedIn: "linkedin.com/in/stephaniewong",
    timezone: "America/Los_Angeles",
    location: "San Francisco, CA",
    category: "other",

    relationship: "influencer",
    relationshipScore: 70,
    warmth: "warm",
    communicationStyle: "casual",

    roleBadges: ["Operating Partner", "GTM Expert"],
    tags: ["Network", "Operations", "GTM"],

    insights: {
      aiSummary:
        "VC operating partner who helps portfolio companies with GTM. Great resource even though we're not in their portfolio.",
      strengths: ["Enterprise GTM expertise", "B2B playbooks"],
      risks: ["Not in their portfolio - limited time"],
      talkingPoints: ["GTM strategy", "Enterprise playbook"],
      interests: ["B2B SaaS", "Enterprise GTM", "Sales motions"],
      bestReachTime: "LinkedIn or email",
      insightsUpdatedAt: weeksAgo(3),
    },

    notes: {
      customSummary:
        "Stephanie has been generous despite us not being portfolio. Her enterprise playbook is gold.",
      quickFacts: ["Built GTM at 3 unicorns", "Ex-Salesforce"],
      personalDetails: "Triathlete. Completed Ironman twice.",
      notesUpdatedAt: weeksAgo(3),
    },

    recentTopics: ["Enterprise GTM", "Sales Motion"],

    interactions: [
      {
        id: "int-oth12-1",
        type: "call",
        date: weeksAgo(3),
        subject: "GTM Strategy",
        summary:
          "Reviewed our enterprise GTM. Great suggestions on sales process.",
        sentiment: "positive",
        keyTopics: ["GTM", "Sales"],
      },
    ],

    lastContacted: weeksAgo(3),
    nextFollowUp: daysAgo(-21),
    firstContact: monthsAgo(5),
    createdAt: monthsAgo(5),
    updatedAt: weeksAgo(3),
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Utility Functions
// ─────────────────────────────────────────────────────────────────────────────

export function getAllTags(): string[] {
  const tagSet = new Set<string>();
  mockContacts.forEach((contact) => {
    contact.tags.forEach((tag) => tagSet.add(tag));
    contact.roleBadges.forEach((badge) => tagSet.add(badge));
  });
  return Array.from(tagSet).sort();
}

export function getContactsByWarmth(warmth: Contact["warmth"]): Contact[] {
  return mockContacts.filter((c) => c.warmth === warmth);
}

export function getContactsNeedingFollowUp(): Contact[] {
  const now = new Date();
  return mockContacts.filter((c) => c.nextFollowUp && c.nextFollowUp <= now);
}

export function getContactsByCategory(
  category: Contact["category"],
): Contact[] {
  return mockContacts.filter((c) => c.category === category);
}
