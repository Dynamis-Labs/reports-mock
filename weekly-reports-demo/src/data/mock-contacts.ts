import type { Contact, Interaction, ActivityEvent } from "../types/contact";

/**
 * Mock CRM Contacts
 *
 * Diverse set of contacts with rich "pokedex" style data:
 * - AI summaries that capture personality and relationship dynamics
 * - Custom notes with personal observations
 * - Role badges and tags for filtering
 * - Realistic interaction histories
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
  // Contact 1: Sarah Chen - Technical Champion
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "contact-1",
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

    relationship: "champion",
    relationshipScore: 92,
    warmth: "hot",
    communicationStyle: "async",

    roleBadges: ["Technical Champion", "Decision Maker"],
    tags: ["Enterprise", "High Priority", "Q1 Target", "API Integration"],

    insights: {
      aiSummary:
        "Technical visionary who champions AI-powered automation. She's your strongest internal advocate and has successfully pushed through two major procurement cycles for similar tools.",
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
    },

    notes: {
      customSummary:
        "Met at AWS re:Invent 2024. She's incredibly sharp and doesn't tolerate BS - come prepared with concrete technical details. Has a golden retriever named Byte.",
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
        id: "int-1-1",
        type: "email",
        date: daysAgo(1),
        subject: "Re: Q1 Strategy Discussion",
        summary:
          "Confirmed budget approval for pilot. Wants technical deep-dive with her architects next week.",
        sentiment: "positive",
        keyTopics: ["Budget", "Technical Review", "Timeline"],
      },
      {
        id: "int-1-2",
        type: "meeting",
        date: daysAgo(5),
        subject: "Quarterly Business Review",
        summary:
          "Walked through ROI projections. She's pushing for faster rollout. Agreed on 6-week pilot timeline.",
        sentiment: "positive",
        keyTopics: ["ROI", "Pilot Program", "Rollout Plan"],
        participants: ["Sarah Chen", "Mike Torres", "You"],
      },
      {
        id: "int-1-3",
        type: "call",
        date: daysAgo(12),
        subject: "Follow-up on Technical Questions",
        summary:
          "Addressed concerns about API rate limits and data residency. She's satisfied with our EU hosting option.",
        sentiment: "positive",
        keyTopics: ["API Limits", "Data Residency", "EU Compliance"],
      },
      {
        id: "int-1-4",
        type: "slack",
        date: daysAgo(18),
        subject: "Quick question on SSO",
        summary:
          "Asked about SAML vs OIDC support. Sent documentation links.",
        sentiment: "neutral",
        keyTopics: ["SSO", "Authentication"],
      },
    ],

    lastContacted: daysAgo(1),
    nextFollowUp: daysAgo(-5), // 5 days from now
    firstContact: monthsAgo(4),
    createdAt: monthsAgo(4),
    updatedAt: daysAgo(1),
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Contact 2: Marcus Williams - Decision Maker, Enterprise
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "contact-2",
    firstName: "Marcus",
    lastName: "Williams",
    company: "JPMorgan Chase",
    title: "Managing Director, Technology",
    department: "Corporate & Investment Bank",
    email: "marcus.williams@jpmorgan.com",
    phone: "+1 (212) 555-0456",
    linkedIn: "linkedin.com/in/marcuswilliams",
    timezone: "America/New_York",
    location: "New York, NY",

    relationship: "decision_maker",
    relationshipScore: 78,
    warmth: "warm",
    communicationStyle: "formal",

    roleBadges: ["Decision Maker", "Budget Authority"],
    tags: ["Enterprise", "Financial Services", "Compliance-Heavy", "Strategic"],

    insights: {
      aiSummary:
        "Methodical executive who values data-driven decisions. Needs ironclad compliance documentation before any vendor approval. Budget cycles align with Q3 planning.",
      strengths: [
        "Clear budget authority ($2M+ discretionary)",
        "Direct line to CTO",
        "Respected across divisions",
      ],
      risks: [
        "Long procurement cycles (8-12 weeks)",
        "Requires legal review for all contracts",
        "Risk-averse culture",
      ],
      talkingPoints: [
        "SOC 2 Type II certification timeline",
        "Reference customers in financial services",
        "On-premise deployment options",
      ],
      interests: [
        "Regulatory technology",
        "Risk management",
        "Operational efficiency",
      ],
      bestReachTime: "Early mornings, 7-8 AM ET",
      insightsUpdatedAt: daysAgo(7),
    },

    notes: {
      customSummary:
        "Very formal communication style. Always start emails with proper greeting. His EA (Jennifer) is the gatekeeper - be responsive to her requests.",
      quickFacts: [
        "Wharton MBA",
        "20+ years at JPM",
        "Board member of fintech accelerator",
      ],
      personalDetails: "Avid golfer, member at Winged Foot. Two kids in private school.",
      notesUpdatedAt: weeksAgo(2),
    },

    recentTopics: [
      "Compliance Review",
      "Vendor Assessment",
      "Security Architecture",
      "Reference Calls",
    ],

    interactions: [
      {
        id: "int-2-1",
        type: "meeting",
        date: daysAgo(3),
        subject: "Security Architecture Review",
        summary:
          "Brought their CISO to the call. Detailed walkthrough of our security posture. They want penetration test results.",
        sentiment: "neutral",
        keyTopics: ["Security", "Penetration Testing", "Compliance"],
        participants: ["Marcus Williams", "CISO Team", "You", "Security Lead"],
      },
      {
        id: "int-2-2",
        type: "email",
        date: daysAgo(8),
        subject: "Vendor Assessment Questionnaire",
        summary:
          "Sent 200+ question security questionnaire. Need to complete by end of month.",
        sentiment: "neutral",
        keyTopics: ["Vendor Assessment", "Security Questionnaire"],
      },
      {
        id: "int-2-3",
        type: "call",
        date: weeksAgo(3),
        subject: "Initial Discovery Call",
        summary:
          "Introduced our platform. He's interested but emphasized compliance is non-negotiable.",
        sentiment: "positive",
        keyTopics: ["Introduction", "Compliance Requirements"],
      },
    ],

    lastContacted: daysAgo(3),
    nextFollowUp: daysAgo(-4),
    firstContact: monthsAgo(2),
    createdAt: monthsAgo(2),
    updatedAt: daysAgo(3),
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Contact 3: Priya Sharma - Influencer, Technical Evaluator
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "contact-3",
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

    relationship: "influencer",
    relationshipScore: 85,
    warmth: "hot",
    communicationStyle: "casual",

    roleBadges: ["Technical Influencer", "Early Adopter"],
    tags: ["Developer Tools", "API-First", "Tech Twitter", "Conference Speaker"],

    insights: {
      aiSummary:
        "Highly respected voice in the developer tools community. Her tweets about tools go viral. Getting her genuine endorsement could be worth 10 sales calls.",
      strengths: [
        "40K+ Twitter following",
        "Conference speaker circuit",
        "Genuine product feedback",
      ],
      risks: [
        "Won't promote anything she doesn't love",
        "Very busy with OSS projects",
        "Skeptical of enterprise software",
      ],
      talkingPoints: [
        "New CLI improvements she suggested",
        "Invite to beta program",
        "Potential conference speaking slot",
      ],
      interests: [
        "Developer experience",
        "Open source",
        "API design",
        "Rust programming",
      ],
      bestReachTime: "Async communication preferred - Twitter DMs or Slack",
      insightsUpdatedAt: daysAgo(3),
    },

    notes: {
      customSummary:
        "Met at KubeCon. Super authentic and hates corporate speak. Just be real with her. She's been giving amazing product feedback on our CLI.",
      quickFacts: [
        "Maintains popular OSS project (15K stars)",
        "Writes for The Pragmatic Engineer",
        "Former Googler",
      ],
      personalDetails:
        "Vegetarian, loves hiking in the PNW. Has a rescue dog named Kubernetes (Kube for short).",
      notesUpdatedAt: daysAgo(10),
    },

    recentTopics: [
      "CLI Improvements",
      "API Design",
      "Developer Experience",
      "Beta Features",
    ],

    interactions: [
      {
        id: "int-3-1",
        type: "slack",
        date: daysAgo(2),
        subject: "CLI Feedback Thread",
        summary:
          "Shared detailed feedback on new CLI commands. Loved the autocomplete feature, had suggestions for error messages.",
        sentiment: "positive",
        keyTopics: ["CLI", "UX Feedback", "Error Messages"],
      },
      {
        id: "int-3-2",
        type: "meeting",
        date: weeksAgo(1),
        subject: "Product Feedback Session",
        summary:
          "Hour-long deep dive into developer workflow. She's excited about our direction but wants better TypeScript support.",
        sentiment: "positive",
        keyTopics: ["TypeScript", "Developer Workflow", "Product Roadmap"],
        participants: ["Priya Sharma", "Product Team", "You"],
      },
      {
        id: "int-3-3",
        type: "email",
        date: weeksAgo(3),
        subject: "Beta Program Invitation",
        summary:
          "Accepted beta program invite. Very enthusiastic about early access.",
        sentiment: "positive",
        keyTopics: ["Beta Program", "Early Access"],
      },
    ],

    lastContacted: daysAgo(2),
    nextFollowUp: daysAgo(-7),
    firstContact: monthsAgo(3),
    createdAt: monthsAgo(3),
    updatedAt: daysAgo(2),
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Contact 4: David Park - Key Stakeholder, At Risk
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "contact-4",
    firstName: "David",
    lastName: "Park",
    company: "Salesforce",
    title: "Senior Director, Platform Engineering",
    department: "Engineering",
    email: "dpark@salesforce.com",
    phone: "+1 (415) 555-0789",
    linkedIn: "linkedin.com/in/davidpark",
    timezone: "America/Los_Angeles",
    location: "San Francisco, CA",

    relationship: "key_stakeholder",
    relationshipScore: 45,
    warmth: "cool",
    communicationStyle: "sync",

    roleBadges: ["Key Stakeholder", "At Risk"],
    tags: ["Enterprise", "Renewal Risk", "Needs Attention", "Platform Team"],

    insights: {
      aiSummary:
        "Relationship has cooled since their team restructuring. He's evaluating competitors. Urgent need to re-engage and demonstrate value.",
      strengths: [
        "Existing customer (2 years)",
        "Good historical relationship",
        "Team knows our product well",
      ],
      risks: [
        "Actively evaluating competitors",
        "Frustrated with recent support tickets",
        "Budget under scrutiny",
      ],
      talkingPoints: [
        "Address outstanding support issues",
        "Share Q1 roadmap preview",
        "Discuss renewal terms flexibility",
      ],
      interests: ["Platform reliability", "Cost optimization", "Team velocity"],
      bestReachTime: "Schedule through EA - he's in back-to-back meetings",
      insightsUpdatedAt: daysAgo(1),
    },

    notes: {
      customSummary:
        "WARNING: Renewal at risk. He mentioned looking at alternatives in our last call. Need executive engagement ASAP. The support ticket from December still bothers him.",
      quickFacts: [
        "Reports to SVP of Engineering",
        "Team of 50+ engineers",
        "Contract renews in Q2",
      ],
      personalDetails: "New father (twins!), probably sleep-deprived. Be understanding of schedule constraints.",
      notesUpdatedAt: daysAgo(1),
    },

    recentTopics: [
      "Support Issues",
      "Renewal Discussion",
      "Competitor Evaluation",
      "Feature Requests",
    ],

    interactions: [
      {
        id: "int-4-1",
        type: "call",
        date: daysAgo(4),
        subject: "Account Check-in",
        summary:
          "Tense call. He's frustrated with response times on critical bugs. Mentioned evaluating a competitor.",
        sentiment: "negative",
        keyTopics: ["Support Issues", "Competitor Threat", "Account Health"],
      },
      {
        id: "int-4-2",
        type: "email",
        date: weeksAgo(2),
        subject: "Outstanding Support Tickets",
        summary:
          "Escalated three tickets that have been open for 3+ weeks. Very frustrated tone.",
        sentiment: "negative",
        keyTopics: ["Support Escalation", "SLA"],
      },
      {
        id: "int-4-3",
        type: "meeting",
        date: monthsAgo(1),
        subject: "Quarterly Business Review",
        summary:
          "QBR revealed declining usage metrics. He's questioning ROI.",
        sentiment: "mixed",
        keyTopics: ["Usage Metrics", "ROI", "Value Demonstration"],
        participants: ["David Park", "Account Team", "You", "CSM"],
      },
    ],

    lastContacted: daysAgo(4),
    nextFollowUp: daysAgo(0), // Today!
    firstContact: monthsAgo(24),
    createdAt: monthsAgo(24),
    updatedAt: daysAgo(1),
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Contact 5: Elena Rodriguez - New Contact, High Potential
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "contact-5",
    firstName: "Elena",
    lastName: "Rodriguez",
    company: "Shopify",
    title: "Director of Engineering",
    department: "Merchant Platform",
    email: "elena.rodriguez@shopify.com",
    linkedIn: "linkedin.com/in/elenarodriguez",
    timezone: "America/Toronto",
    location: "Toronto, ON",
    pronouns: "she/her",

    relationship: "contact",
    relationshipScore: 65,
    warmth: "new",
    communicationStyle: "async",

    roleBadges: ["New Lead", "High Potential"],
    tags: ["E-commerce", "Growth Stage", "Inbound Lead", "Product-Led Growth"],

    insights: {
      aiSummary:
        "Inbound lead from our webinar on developer productivity. She's building a new internal tools team and has budget allocated for Q1. Fast-moving opportunity.",
      strengths: [
        "Clear budget and timeline",
        "Technical background",
        "Motivated buyer",
      ],
      risks: [
        "New relationship - still building trust",
        "Also evaluating 2 other vendors",
        "Tight Q1 deadline",
      ],
      talkingPoints: [
        "E-commerce specific use cases",
        "Integration with their tech stack",
        "Quick pilot program option",
      ],
      interests: [
        "Internal tooling",
        "Developer productivity",
        "Merchant experience",
      ],
      bestReachTime: "Flexible - responds quickly to email",
      insightsUpdatedAt: daysAgo(0),
    },

    notes: {
      customSummary:
        "Great energy on intro call. She's dealt with similar problems at her last company (Wealthsimple) and knows exactly what she wants. Move fast - she has urgency.",
      quickFacts: [
        "Ex-Wealthsimple, Ex-Uber",
        "Built 3 internal tools teams",
        "Active on engineering Twitter",
      ],
      personalDetails: "Loves salsa dancing. Mentioned she's training for an Ironman.",
      notesUpdatedAt: daysAgo(1),
    },

    recentTopics: [
      "Internal Tools Strategy",
      "Team Building",
      "Pilot Program",
      "Integration Requirements",
    ],

    interactions: [
      {
        id: "int-5-1",
        type: "meeting",
        date: daysAgo(1),
        subject: "Discovery Call",
        summary:
          "Excellent first meeting. She has clear requirements and budget. Wants to move to pilot within 2 weeks.",
        sentiment: "positive",
        keyTopics: ["Discovery", "Requirements", "Pilot Timeline"],
        participants: ["Elena Rodriguez", "You", "SE"],
      },
      {
        id: "int-5-2",
        type: "email",
        date: daysAgo(3),
        subject: "Webinar Follow-up",
        summary:
          "Reached out after attending our webinar. Specifically interested in the developer productivity metrics.",
        sentiment: "positive",
        keyTopics: ["Webinar", "Inbound Interest"],
      },
    ],

    lastContacted: daysAgo(1),
    nextFollowUp: daysAgo(-2),
    firstContact: daysAgo(3),
    createdAt: daysAgo(3),
    updatedAt: daysAgo(1),
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Contact 6: James O'Brien - Blocker, Needs Strategy
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "contact-6",
    firstName: "James",
    lastName: "O'Brien",
    company: "Deloitte",
    title: "Partner, Technology Consulting",
    department: "Consulting",
    email: "jobrien@deloitte.com",
    phone: "+1 (312) 555-0234",
    linkedIn: "linkedin.com/in/jamesobrien",
    timezone: "America/Chicago",
    location: "Chicago, IL",

    relationship: "blocker",
    relationshipScore: 35,
    warmth: "cold",
    communicationStyle: "formal",

    roleBadges: ["Potential Blocker", "Competitor Relationship"],
    tags: ["Consulting", "Complex Sale", "Political", "Multi-Stakeholder"],

    insights: {
      aiSummary:
        "Has existing relationship with a competitor and may be steering the deal their way. Need to find his angle - likely wants to wrap services around whichever vendor wins.",
      strengths: ["Senior partner with influence", "Could become champion if aligned"],
      risks: [
        "Competitor relationship",
        "May be receiving kickbacks",
        "Controls evaluation process",
      ],
      talkingPoints: [
        "Services partnership opportunity",
        "Implementation consulting revenue",
        "Joint go-to-market",
      ],
      interests: [
        "Consulting revenue",
        "Client relationships",
        "Digital transformation",
      ],
      bestReachTime: "Travels Mon-Thu, best on Fridays",
      insightsUpdatedAt: weeksAgo(1),
    },

    notes: {
      customSummary:
        "Challenging situation. He's been dismissive in meetings and keeps bringing up competitor features. Strategy: position as services opportunity, not threat. Get our consulting partnership team involved.",
      quickFacts: [
        "25+ years at Deloitte",
        "Manages $50M book of business",
        "On competitor's advisory board (!!)",
      ],
      personalDetails: "Big Notre Dame football fan. Has a lake house in Michigan.",
      notesUpdatedAt: weeksAgo(1),
    },

    recentTopics: [
      "Competitor Comparison",
      "Implementation Concerns",
      "Services Model",
      "Risk Assessment",
    ],

    interactions: [
      {
        id: "int-6-1",
        type: "meeting",
        date: weeksAgo(1),
        subject: "Vendor Evaluation Committee",
        summary:
          "Tough room. He kept pushing back on our architecture. Asked pointed questions about scalability that felt orchestrated.",
        sentiment: "negative",
        keyTopics: ["Architecture", "Scalability", "Vendor Evaluation"],
        participants: ["James O'Brien", "Eval Committee", "You", "SE"],
      },
      {
        id: "int-6-2",
        type: "email",
        date: weeksAgo(2),
        subject: "Additional Technical Requirements",
        summary:
          "Sent 15 new requirements that seem designed to favor competitor. Need to address carefully.",
        sentiment: "negative",
        keyTopics: ["Requirements", "Technical Specs"],
      },
    ],

    lastContacted: weeksAgo(1),
    nextFollowUp: daysAgo(-3),
    firstContact: monthsAgo(2),
    createdAt: monthsAgo(2),
    updatedAt: weeksAgo(1),
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Contact 7: Aisha Patel - Champion, Long-term Relationship
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "contact-7",
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

    relationship: "champion",
    relationshipScore: 95,
    warmth: "hot",
    communicationStyle: "casual",

    roleBadges: ["Champion", "Product Partner", "Reference Customer"],
    tags: ["Strategic Account", "Case Study", "Product Advisory Board", "Expansion"],

    insights: {
      aiSummary:
        "Your most enthusiastic champion. She's done a conference talk about your product and actively refers new customers. Treat her like a product partner, not just a customer.",
      strengths: [
        "Vocal advocate (2 conference talks)",
        "Product advisory board member",
        "Enterprise reference customer",
      ],
      risks: [
        "Don't take her for granted",
        "Wants early access to all features",
        "High expectations for support",
      ],
      talkingPoints: [
        "Early preview of Q2 features",
        "Co-presenting opportunity at Build",
        "Expansion to other Azure teams",
      ],
      interests: [
        "Product development",
        "Developer tools",
        "AI/ML applications",
      ],
      bestReachTime: "Very responsive - DM on Twitter or Teams",
      insightsUpdatedAt: daysAgo(5),
    },

    notes: {
      customSummary:
        "Our best customer relationship. She's given us 3 referrals that closed. Always include her in beta programs. She loves being an insider.",
      quickFacts: [
        "10 years at Microsoft",
        "Former startup founder (acquired)",
        "Writes for Microsoft DevBlog",
      ],
      personalDetails:
        "Has two cats named Git and Hub. Competitive gamer (ranked in Valorant). Makes amazing chai.",
      notesUpdatedAt: weeksAgo(2),
    },

    recentTopics: [
      "Q2 Roadmap Preview",
      "Build Conference",
      "Team Expansion",
      "New Feature Feedback",
    ],

    interactions: [
      {
        id: "int-7-1",
        type: "meeting",
        date: daysAgo(6),
        subject: "Q2 Roadmap Preview",
        summary:
          "Shared early roadmap. She's thrilled about the new collaboration features. Wants to be first to test.",
        sentiment: "positive",
        keyTopics: ["Roadmap", "Collaboration Features", "Beta Access"],
        participants: ["Aisha Patel", "Product Team", "You"],
      },
      {
        id: "int-7-2",
        type: "slack",
        date: daysAgo(10),
        subject: "Feature Request",
        summary:
          "Suggested brilliant improvement to our notification system. Already added to roadmap.",
        sentiment: "positive",
        keyTopics: ["Feature Request", "Notifications"],
      },
      {
        id: "int-7-3",
        type: "email",
        date: weeksAgo(3),
        subject: "Conference Talk Proposal",
        summary:
          "She's proposing a joint session at Build about our integration. Amazing exposure.",
        sentiment: "positive",
        keyTopics: ["Conference", "Speaking Opportunity", "Partnership"],
      },
    ],

    lastContacted: daysAgo(6),
    nextFollowUp: daysAgo(-7),
    firstContact: monthsAgo(18),
    createdAt: monthsAgo(18),
    updatedAt: daysAgo(6),
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Contact 8: Tom Anderson - Dormant, Re-engage
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "contact-8",
    firstName: "Tom",
    lastName: "Anderson",
    company: "Netflix",
    title: "Engineering Manager",
    department: "Studio Technology",
    email: "tanderson@netflix.com",
    linkedIn: "linkedin.com/in/tomanderson",
    timezone: "America/Los_Angeles",
    location: "Los Angeles, CA",

    relationship: "contact",
    relationshipScore: 50,
    warmth: "cold",
    communicationStyle: "async",

    roleBadges: ["Dormant Lead", "Re-engage"],
    tags: ["Media & Entertainment", "Enterprise", "Lost Opportunity", "Reactivate"],

    insights: {
      aiSummary:
        "Deal went dark 6 months ago due to internal reorg. Now that things have settled, worth re-engaging. Their team has grown 2x since we last spoke.",
      strengths: [
        "Was very interested initially",
        "Team has grown (more budget)",
        "No competitor win - deal just paused",
      ],
      risks: [
        "May have moved on",
        "Different priorities now",
        "Need fresh pitch",
      ],
      talkingPoints: [
        "Catch up on their new initiatives",
        "Share what's new since we last spoke",
        "Offer fresh demo with new features",
      ],
      interests: [
        "Content pipeline tools",
        "Global team collaboration",
        "Creative workflows",
      ],
      bestReachTime: "Unpredictable - try LinkedIn message",
      insightsUpdatedAt: daysAgo(0),
    },

    notes: {
      customSummary:
        "Deal paused when his org went through restructuring. He moved to a new team. Now that dust has settled, time to reconnect. His new team is focused on studio collaboration tools - could be even better fit.",
      quickFacts: [
        "Ex-Amazon, Ex-Adobe",
        "Manages 30+ engineers now",
        "Focused on studio production tech",
      ],
      personalDetails: "Surfer, often works from home near the beach. Big film buff.",
      notesUpdatedAt: daysAgo(0),
    },

    recentTopics: [],

    interactions: [
      {
        id: "int-8-1",
        type: "email",
        date: monthsAgo(6),
        subject: "Re: Putting on Hold",
        summary:
          "Let us know the org was restructuring and they needed to pause. Asked to reconnect in 6 months.",
        sentiment: "neutral",
        keyTopics: ["Deal Pause", "Restructuring"],
      },
      {
        id: "int-8-2",
        type: "meeting",
        date: monthsAgo(7),
        subject: "Technical Deep Dive",
        summary:
          "Great technical discussion. His team was excited. Then the reorg news came.",
        sentiment: "positive",
        keyTopics: ["Technical Discussion", "Architecture"],
        participants: ["Tom Anderson", "His Team", "You", "SE"],
      },
    ],

    lastContacted: monthsAgo(6),
    nextFollowUp: daysAgo(-1), // Yesterday - overdue!
    firstContact: monthsAgo(8),
    createdAt: monthsAgo(8),
    updatedAt: daysAgo(0),
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Utility: Get all unique tags from contacts
// ─────────────────────────────────────────────────────────────────────────────

export function getAllTags(): string[] {
  const tagSet = new Set<string>();
  mockContacts.forEach((contact) => {
    contact.tags.forEach((tag) => tagSet.add(tag));
    contact.roleBadges.forEach((badge) => tagSet.add(badge));
  });
  return Array.from(tagSet).sort();
}

// ─────────────────────────────────────────────────────────────────────────────
// Utility: Get contacts by warmth level
// ─────────────────────────────────────────────────────────────────────────────

export function getContactsByWarmth(
  warmth: Contact["warmth"]
): Contact[] {
  return mockContacts.filter((c) => c.warmth === warmth);
}

// ─────────────────────────────────────────────────────────────────────────────
// Utility: Get contacts that need follow-up
// ─────────────────────────────────────────────────────────────────────────────

export function getContactsNeedingFollowUp(): Contact[] {
  const now = new Date();
  return mockContacts.filter(
    (c) => c.nextFollowUp && c.nextFollowUp <= now
  );
}
