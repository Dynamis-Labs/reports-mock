/**
 * Mock Memory Events
 *
 * Business/strategy focused events spanning 16 weeks (8 past + 8 future).
 * Categories: Product Strategy, Fundraising, GTM, Hiring
 */

import type { MemoryEvent } from "../types/memory";

// Use current date for dynamic week calculations
const NOW = new Date();

function daysAgo(days: number): Date {
  const date = new Date(NOW);
  date.setDate(date.getDate() - days);
  return date;
}

function daysFromNow(days: number): Date {
  const date = new Date(NOW);
  date.setDate(date.getDate() + days);
  return date;
}

function getWeekNumber(date: Date): number {
  const startOfYear = new Date(date.getFullYear(), 0, 1);
  const days = Math.floor(
    (date.getTime() - startOfYear.getTime()) / (24 * 60 * 60 * 1000),
  );
  return Math.ceil((days + startOfYear.getDay() + 1) / 7);
}

function getWeekLabel(date: Date): string {
  const nowWeekStart = new Date(NOW);
  nowWeekStart.setDate(NOW.getDate() - NOW.getDay());
  nowWeekStart.setHours(0, 0, 0, 0);

  const dateWeekStart = new Date(date);
  dateWeekStart.setDate(date.getDate() - date.getDay());
  dateWeekStart.setHours(0, 0, 0, 0);

  const diffMs = dateWeekStart.getTime() - nowWeekStart.getTime();
  const weekDiff = Math.round(diffMs / (7 * 24 * 60 * 60 * 1000));

  if (weekDiff === 0) return "This Week";
  if (weekDiff === -1) return "Last Week";
  if (weekDiff === 1) return "Next Week";
  if (weekDiff < 0) return `${Math.abs(weekDiff)} Weeks Ago`;
  return `In ${weekDiff} Weeks`;
}

// Random event titles and summaries for Q1 Product Strategy
const productStrategyEvents = [
  {
    title: "API Review Session",
    summary:
      "Reviewed API endpoint design with backend team. Approved new pagination approach.",
    type: "meeting" as const,
  },
  {
    title: "User Research Findings",
    summary:
      "Presented findings from 20 user interviews. Key insight: users want better search.",
    type: "milestone" as const,
  },
  {
    title: "Sprint Retro",
    summary:
      "Team retrospective on sprint 22. Identified 3 areas for improvement.",
    type: "meeting" as const,
  },
  {
    title: "Feature Flag Review",
    summary: "Decided to keep beta flags for 2 more weeks before GA rollout.",
    type: "decision" as const,
  },
  {
    title: "Design System Update",
    summary:
      "Updated component library with new form elements and accessibility improvements.",
    type: "milestone" as const,
  },
  {
    title: "Performance Audit",
    summary:
      "Lighthouse scores improved from 72 to 89. Core Web Vitals now passing.",
    type: "milestone" as const,
  },
  {
    title: "Tech Debt Discussion",
    summary:
      "Prioritized tech debt items for Q1. Database migration moved to top.",
    type: "meeting" as const,
  },
  {
    title: "Mobile App Kickoff",
    summary:
      "Started planning mobile app development. React Native selected as framework.",
    type: "decision" as const,
  },
  {
    title: "QA Strategy Review",
    summary:
      "Aligned on automated testing coverage goals. Target: 80% by Q1 end.",
    type: "meeting" as const,
  },
  {
    title: "Documentation Sprint",
    summary:
      "Completed API documentation overhaul. 45 new code examples added.",
    type: "milestone" as const,
  },
  {
    title: "Competitor Analysis",
    summary:
      "Deep dive into competitor features. Identified 3 differentiation opportunities.",
    type: "meeting" as const,
  },
  {
    title: "Security Review",
    summary: "Passed security audit. Zero critical vulnerabilities found.",
    type: "milestone" as const,
  },
  {
    title: "Integration Planning",
    summary: "Mapped out Slack and Salesforce integration requirements.",
    type: "meeting" as const,
  },
  {
    title: "UX Improvements",
    summary: "Shipped 12 micro-interactions and loading state improvements.",
    type: "milestone" as const,
  },
  {
    title: "Analytics Implementation",
    summary: "Deployed new analytics tracking. Now capturing 25 new events.",
    type: "milestone" as const,
  },
  {
    title: "Error Handling Overhaul",
    summary: "Standardized error messages across all API endpoints.",
    type: "decision" as const,
  },
  {
    title: "Onboarding Flow Update",
    summary: "Reduced onboarding steps from 7 to 4. Conversion up 15%.",
    type: "milestone" as const,
  },
  {
    title: "Accessibility Audit",
    summary: "Achieved WCAG 2.1 AA compliance across all main flows.",
    type: "milestone" as const,
  },
  {
    title: "Database Migration Plan",
    summary: "Finalized migration strategy to PostgreSQL 15.",
    type: "decision" as const,
  },
  {
    title: "Customer Feedback Review",
    summary: "Analyzed 500+ support tickets. Top 3 pain points identified.",
    type: "meeting" as const,
  },
  {
    title: "Release Notes Published",
    summary: "Published v2.4.0 release notes. 12 new features documented.",
    type: "milestone" as const,
  },
  {
    title: "Load Testing Results",
    summary: "System handles 10K concurrent users. 99.9% uptime maintained.",
    type: "milestone" as const,
  },
  {
    title: "Feature Prioritization",
    summary: "Stack ranked 40 feature requests. Top 10 scheduled for Q1.",
    type: "decision" as const,
  },
  {
    title: "SDK Beta Launch",
    summary: "Released Python SDK beta to 50 developers. Positive feedback.",
    type: "milestone" as const,
  },
  {
    title: "Caching Strategy",
    summary: "Implemented Redis caching. API response times down 60%.",
    type: "milestone" as const,
  },
  {
    title: "Search Improvements",
    summary: "Deployed Elasticsearch upgrade. Search relevance up 40%.",
    type: "milestone" as const,
  },
  {
    title: "Notification System",
    summary: "Shipped email digest feature. 10K users opted in.",
    type: "milestone" as const,
  },
  {
    title: "Dark Mode Launch",
    summary: "Dark mode now available. 35% of users enabled it.",
    type: "milestone" as const,
  },
  {
    title: "Export Feature",
    summary: "Added CSV/PDF export for all reports.",
    type: "milestone" as const,
  },
  {
    title: "Webhook System",
    summary: "Launched webhook integration. 200 endpoints configured.",
    type: "milestone" as const,
  },
];

// Generate random events for Q1 Product Strategy across all weeks
function generateProductStrategyEvents(): MemoryEvent[] {
  const events: MemoryEvent[] = [];
  let eventId = 100;

  // Generate for 8 weeks past to 8 weeks future
  for (let weekOffset = -8; weekOffset <= 8; weekOffset++) {
    // Random number of events per week (1-8)
    const numEvents = Math.floor(Math.random() * 8) + 1;

    for (let i = 0; i < numEvents; i++) {
      const dayInWeek = Math.floor(Math.random() * 7); // 0-6 days within the week
      const daysFromToday = weekOffset * 7 + dayInWeek;
      const eventDate =
        daysFromToday < 0
          ? daysAgo(Math.abs(daysFromToday))
          : daysFromNow(daysFromToday);

      const eventTemplate =
        productStrategyEvents[
          Math.floor(Math.random() * productStrategyEvents.length)
        ];

      events.push({
        id: `mem-ps-${eventId++}`,
        title: eventTemplate.title,
        summary: eventTemplate.summary,
        type: eventTemplate.type,
        status: daysFromToday < 0 ? "resolved" : "active",
        date: eventDate,
        weekLabel: getWeekLabel(eventDate),
        weekNumber: getWeekNumber(eventDate),
        initiativeId: "init-1", // Q1 Product Strategy
        participants: [
          { id: "p-1", name: "Sarah Chen" },
          { id: "p-2", name: "Marcus Williams" },
        ],
        actionItems:
          Math.random() > 0.5
            ? [
                {
                  id: `ai-${eventId}-1`,
                  title: "Follow up on action items",
                  isCompleted: daysFromToday < 0,
                },
                {
                  id: `ai-${eventId}-2`,
                  title: "Update documentation",
                  isCompleted: daysFromToday < -3,
                },
              ]
            : [],
        sources: [
          { id: `s-${eventId}-1`, title: "Meeting Notes", type: "document" },
        ],
        category: "Product Strategy",
        tags: ["product", "q1"],
        createdAt: eventDate,
        updatedAt: eventDate,
      });
    }
  }

  return events;
}

const generatedProductStrategyEvents = generateProductStrategyEvents();

export const mockMemoryEvents: MemoryEvent[] = [
  // Generated Q1 Product Strategy events (all weeks populated)
  ...generatedProductStrategyEvents,

  // ═══════════════════════════════════════════════════════════════════════════
  // THIS WEEK - 4 events
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "mem-1",
    title: "Scope Freeze Approved",
    summary:
      "Final scope approved for Q1 launch. All feature requests after this date will be deferred to Q2 planning cycle. Change control process now in effect.",
    type: "decision",
    status: "active",
    date: daysAgo(0),
    weekLabel: getWeekLabel(daysAgo(0)),
    weekNumber: getWeekNumber(daysAgo(0)),
    initiativeId: "init-1", // Q1 Product Strategy
    participants: [
      { id: "p-1", name: "Sarah Chen" },
      { id: "p-2", name: "Marcus Williams" },
      { id: "p-3", name: "Emily Park" },
    ],
    actionItems: [
      { id: "ai-1", title: "Update roadmap document", isCompleted: true },
      { id: "ai-2", title: "Notify engineering team", isCompleted: false },
      {
        id: "ai-3",
        title: "Schedule Q2 planning kickoff",
        isCompleted: false,
        dueDate: daysFromNow(7),
      },
    ],
    sources: [
      { id: "s-1", title: "Scope Review Meeting", type: "meeting" },
      { id: "s-2", title: "Feature Priority Doc", type: "document" },
    ],
    category: "Product Strategy",
    tags: ["scope", "planning", "q1"],
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: "mem-2",
    title: "Weekly Sync: Blockers",
    summary:
      "Reviewed current blockers and mitigation plans. Marketing dependency resolved. Two risks mitigated with contingency plans in place.",
    type: "meeting",
    status: "active",
    date: daysAgo(1),
    weekLabel: getWeekLabel(daysAgo(1)),
    weekNumber: getWeekNumber(daysAgo(1)),
    initiativeId: "init-1", // Q1 Product Strategy
    participants: [
      { id: "p-1", name: "Sarah Chen" },
      { id: "p-4", name: "James Liu" },
      { id: "p-5", name: "Rachel Kim" },
      { id: "p-6", name: "David Thompson" },
    ],
    actionItems: [
      { id: "ai-4", title: "Follow up with design team", isCompleted: true },
      { id: "ai-5", title: "Update risk register", isCompleted: false },
    ],
    sources: [
      { id: "s-3", title: "Meeting Notes", type: "document" },
      { id: "s-4", title: "Calendar Event", type: "calendar" },
    ],
    category: "Product Strategy",
    tags: ["blockers", "weekly-sync"],
    createdAt: daysAgo(1),
    updatedAt: daysAgo(1),
  },
  {
    id: "mem-3",
    title: "Finalize Go-To-Market Brief",
    summary:
      "Marketing team needs final GTM brief by Friday. Includes positioning, messaging framework, and launch timeline for Q1 product release.",
    type: "commitment",
    status: "active",
    date: daysAgo(2),
    weekLabel: getWeekLabel(daysAgo(2)),
    weekNumber: getWeekNumber(daysAgo(2)),
    initiativeId: "init-3", // Enterprise GTM Launch
    participants: [
      { id: "p-7", name: "Alex Rivera" },
      { id: "p-8", name: "Nina Patel" },
    ],
    actionItems: [
      {
        id: "ai-6",
        title: "Complete competitive analysis section",
        isCompleted: false,
      },
      { id: "ai-7", title: "Review with CEO", isCompleted: false },
    ],
    sources: [
      { id: "s-5", title: "GTM Template", type: "document" },
      { id: "s-6", title: "Strategy Thread", type: "email" },
    ],
    category: "GTM",
    tags: ["marketing", "launch", "gtm"],
    createdAt: daysAgo(2),
    updatedAt: daysAgo(1),
  },
  {
    id: "mem-4",
    title: "Partner Meeting with A16Z",
    summary:
      "Initial partnership discussion with A16Z portfolio team. Exploring integration opportunities and potential co-marketing initiatives.",
    type: "meeting",
    status: "active",
    date: daysAgo(1),
    weekLabel: getWeekLabel(daysAgo(1)),
    weekNumber: getWeekNumber(daysAgo(1)),
    initiativeId: "init-2", // Series A Fundraise
    participants: [
      { id: "p-9", name: "Jon Martinez" },
      { id: "p-10", name: "Lisa Wang" },
    ],
    actionItems: [
      { id: "ai-8", title: "Send follow-up deck", isCompleted: false },
      { id: "ai-9", title: "Schedule technical deep-dive", isCompleted: false },
    ],
    sources: [
      { id: "s-7", title: "Meeting Recording", type: "meeting" },
      { id: "s-8", title: "Partnership Deck", type: "document" },
    ],
    category: "Fundraising",
    tags: ["partnerships", "a16z", "investors"],
    createdAt: daysAgo(1),
    updatedAt: daysAgo(0),
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // LAST WEEK - 3 events
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "mem-5",
    title: "Q1 Roadmap Finalized",
    summary:
      "Engineering and product aligned on Q1 deliverables. Three major features confirmed: search overhaul, API v2, and analytics dashboard.",
    type: "milestone",
    status: "resolved",
    date: daysAgo(5),
    weekLabel: getWeekLabel(daysAgo(5)),
    weekNumber: getWeekNumber(daysAgo(5)),
    initiativeId: "init-1", // Q1 Product Strategy
    participants: [
      { id: "p-1", name: "Sarah Chen" },
      { id: "p-2", name: "Marcus Williams" },
      { id: "p-4", name: "James Liu" },
    ],
    actionItems: [
      { id: "ai-10", title: "Publish roadmap to wiki", isCompleted: true },
      { id: "ai-11", title: "Brief customer success team", isCompleted: true },
    ],
    sources: [
      { id: "s-9", title: "Roadmap Document", type: "document" },
      { id: "s-10", title: "Planning Session", type: "meeting" },
    ],
    category: "Product Strategy",
    tags: ["roadmap", "q1", "planning"],
    createdAt: daysAgo(5),
    updatedAt: daysAgo(4),
  },
  {
    id: "mem-6",
    title: "Term Sheet Review",
    summary:
      "Reviewed term sheet from Benchmark. Key terms include $15M at $60M pre-money, 1x non-participating preferred, one board seat.",
    type: "meeting",
    status: "active",
    date: daysAgo(7),
    weekLabel: getWeekLabel(daysAgo(7)),
    weekNumber: getWeekNumber(daysAgo(7)),
    initiativeId: "init-2", // Series A Fundraise
    participants: [
      { id: "p-9", name: "Jon Martinez" },
      { id: "p-11", name: "Maria Garcia" },
      { id: "p-12", name: "Tom Baker" },
    ],
    actionItems: [
      {
        id: "ai-12",
        title: "Review liquidation preferences with legal",
        isCompleted: false,
      },
      {
        id: "ai-13",
        title: "Discuss board seat structure with co-founders",
        isCompleted: true,
      },
    ],
    sources: [
      { id: "s-11", title: "Term Sheet PDF", type: "document" },
      { id: "s-12", title: "Email from Jon", type: "email" },
    ],
    category: "Fundraising",
    tags: ["term-sheet", "benchmark", "series-a"],
    createdAt: daysAgo(7),
    updatedAt: daysAgo(5),
  },
  {
    id: "mem-7",
    title: "Investor Update Sent",
    summary:
      "Monthly investor update shared. Highlights: 40% MoM growth, 3 new enterprise customers, expanded team by 4 engineers.",
    type: "email",
    status: "resolved",
    date: daysAgo(6),
    weekLabel: getWeekLabel(daysAgo(6)),
    weekNumber: getWeekNumber(daysAgo(6)),
    initiativeId: "init-2", // Series A Fundraise
    participants: [
      { id: "p-9", name: "Jon Martinez" },
      { id: "p-13", name: "Investors" },
    ],
    actionItems: [],
    sources: [
      { id: "s-13", title: "Update Email", type: "email" },
      { id: "s-14", title: "Metrics Dashboard", type: "document" },
    ],
    category: "Fundraising",
    tags: ["investors", "update", "monthly"],
    createdAt: daysAgo(6),
    updatedAt: daysAgo(6),
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 2 WEEKS AGO - 3 events
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "mem-8",
    title: "Board Deck Draft Complete",
    summary:
      "First draft of Q4 board deck ready for review. Covers financial performance, product milestones, hiring progress, and 2026 strategy.",
    type: "milestone",
    status: "resolved",
    date: daysAgo(10),
    weekLabel: getWeekLabel(daysAgo(10)),
    weekNumber: getWeekNumber(daysAgo(10)),
    initiativeId: "init-2", // Series A Fundraise
    participants: [
      { id: "p-9", name: "Jon Martinez" },
      { id: "p-14", name: "CFO" },
    ],
    actionItems: [
      { id: "ai-14", title: "Incorporate CEO feedback", isCompleted: true },
      { id: "ai-15", title: "Finalize financials", isCompleted: true },
    ],
    sources: [
      { id: "s-15", title: "Board Deck", type: "document" },
      { id: "s-16", title: "Review Thread", type: "slack" },
    ],
    category: "Fundraising",
    tags: ["board", "deck", "q4"],
    createdAt: daysAgo(10),
    updatedAt: daysAgo(8),
  },
  {
    id: "mem-9",
    title: "Pipeline Review",
    summary:
      "Sales pipeline review with leadership. $2.4M in qualified opportunities, 60% conversion expected. Focus on enterprise expansion.",
    type: "meeting",
    status: "resolved",
    date: daysAgo(12),
    weekLabel: getWeekLabel(daysAgo(12)),
    weekNumber: getWeekNumber(daysAgo(12)),
    initiativeId: "init-3", // Enterprise GTM Launch
    participants: [
      { id: "p-15", name: "Sales Team" },
      { id: "p-9", name: "Jon Martinez" },
    ],
    actionItems: [
      { id: "ai-16", title: "Update CRM with new leads", isCompleted: true },
      {
        id: "ai-17",
        title: "Schedule enterprise demos",
        isCompleted: true,
      },
    ],
    sources: [
      { id: "s-17", title: "Pipeline Report", type: "document" },
      { id: "s-18", title: "Sales Meeting", type: "meeting" },
    ],
    category: "GTM",
    tags: ["sales", "pipeline", "enterprise"],
    createdAt: daysAgo(12),
    updatedAt: daysAgo(10),
  },
  {
    id: "mem-10",
    title: "Hiring Plan Blocked",
    summary:
      "Engineering hiring on hold pending budget approval. 4 open positions affected. Escalated to leadership for resolution.",
    type: "alert",
    status: "active",
    date: daysAgo(11),
    weekLabel: getWeekLabel(daysAgo(11)),
    weekNumber: getWeekNumber(daysAgo(11)),
    initiativeId: "init-4", // Engineering Hiring
    participants: [
      { id: "p-16", name: "HR Lead" },
      { id: "p-4", name: "James Liu" },
    ],
    actionItems: [
      {
        id: "ai-18",
        title: "Get budget approval from finance",
        isCompleted: false,
      },
      {
        id: "ai-19",
        title: "Prioritize roles for immediate hire",
        isCompleted: true,
      },
    ],
    sources: [
      { id: "s-19", title: "Budget Email", type: "email" },
      { id: "s-20", title: "Hiring Plan", type: "document" },
    ],
    category: "Hiring",
    tags: ["hiring", "blocked", "engineering"],
    createdAt: daysAgo(11),
    updatedAt: daysAgo(9),
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 3 WEEKS AGO - 3 events
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "mem-11",
    title: "Series A Kickoff",
    summary:
      "Officially launched Series A fundraising process. Targeting $12-15M at $50-60M pre. Initial outreach to 20 funds complete.",
    type: "milestone",
    status: "active",
    date: daysAgo(17),
    weekLabel: getWeekLabel(daysAgo(17)),
    weekNumber: getWeekNumber(daysAgo(17)),
    initiativeId: "init-2", // Series A Fundraise
    participants: [
      { id: "p-9", name: "Jon Martinez" },
      { id: "p-11", name: "Maria Garcia" },
    ],
    actionItems: [
      { id: "ai-20", title: "Complete investor data room", isCompleted: true },
      { id: "ai-21", title: "Schedule partner meetings", isCompleted: true },
    ],
    sources: [
      { id: "s-21", title: "Fundraising Plan", type: "document" },
      { id: "s-22", title: "Investor List", type: "document" },
    ],
    category: "Fundraising",
    tags: ["series-a", "fundraising", "kickoff"],
    createdAt: daysAgo(17),
    updatedAt: daysAgo(15),
  },
  {
    id: "mem-12",
    title: "Legal Review Meeting",
    summary:
      "Reviewed IP assignments and employee agreements with counsel. Minor updates needed to contractor agreements.",
    type: "meeting",
    status: "resolved",
    date: daysAgo(18),
    weekLabel: getWeekLabel(daysAgo(18)),
    weekNumber: getWeekNumber(daysAgo(18)),
    initiativeId: "init-2", // Series A Fundraise
    participants: [
      { id: "p-17", name: "Legal Counsel" },
      { id: "p-9", name: "Jon Martinez" },
    ],
    actionItems: [
      { id: "ai-22", title: "Update contractor templates", isCompleted: true },
      { id: "ai-23", title: "Complete IP assignment audit", isCompleted: true },
    ],
    sources: [
      { id: "s-23", title: "Legal Checklist", type: "document" },
      { id: "s-24", title: "Meeting Notes", type: "meeting" },
    ],
    category: "Fundraising",
    tags: ["legal", "ip", "compliance"],
    createdAt: daysAgo(18),
    updatedAt: daysAgo(16),
  },
  {
    id: "mem-13",
    title: "Counter-proposal Deadline",
    summary:
      "Benchmark counter-proposal needs to be sent by Dec 28. Jon mentioned competing offers from other funds.",
    type: "commitment",
    status: "active",
    date: daysAgo(19),
    weekLabel: getWeekLabel(daysAgo(19)),
    weekNumber: getWeekNumber(daysAgo(19)),
    initiativeId: "init-2", // Series A Fundraise
    participants: [
      { id: "p-9", name: "Jon Martinez" },
      { id: "p-11", name: "Maria Garcia" },
    ],
    actionItems: [
      {
        id: "ai-24",
        title: "Draft counter-proposal terms",
        isCompleted: false,
      },
      { id: "ai-25", title: "Review with board advisor", isCompleted: false },
    ],
    sources: [
      { id: "s-25", title: "Original Term Sheet", type: "document" },
      { id: "s-26", title: "Email Thread", type: "email" },
    ],
    category: "Fundraising",
    tags: ["term-sheet", "deadline", "benchmark"],
    createdAt: daysAgo(19),
    updatedAt: daysAgo(17),
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 4-5 WEEKS AGO - 2 events
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "mem-14",
    title: "Product Vision Workshop",
    summary:
      "Full-day offsite to align on 2026 product vision. Defined three strategic pillars: AI-first, enterprise-ready, developer-friendly.",
    type: "meeting",
    status: "resolved",
    date: daysAgo(28),
    weekLabel: getWeekLabel(daysAgo(28)),
    weekNumber: getWeekNumber(daysAgo(28)),
    initiativeId: "init-1", // Q1 Product Strategy
    participants: [
      { id: "p-1", name: "Sarah Chen" },
      { id: "p-2", name: "Marcus Williams" },
      { id: "p-9", name: "Jon Martinez" },
    ],
    actionItems: [
      { id: "ai-26", title: "Document vision pillars", isCompleted: true },
      { id: "ai-27", title: "Share with all-hands", isCompleted: true },
    ],
    sources: [
      { id: "s-27", title: "Vision Workshop Notes", type: "document" },
      { id: "s-28", title: "Miro Board", type: "document" },
    ],
    category: "Product Strategy",
    tags: ["vision", "strategy", "offsite"],
    createdAt: daysAgo(28),
    updatedAt: daysAgo(25),
  },
  {
    id: "mem-15",
    title: "Enterprise Security Audit",
    summary:
      "Passed SOC2 Type I audit with zero critical findings. Two minor recommendations to address in Q1.",
    type: "milestone",
    status: "resolved",
    date: daysAgo(32),
    weekLabel: getWeekLabel(daysAgo(32)),
    weekNumber: getWeekNumber(daysAgo(32)),
    initiativeId: "init-3", // Enterprise GTM Launch
    participants: [
      { id: "p-18", name: "Security Team" },
      { id: "p-4", name: "James Liu" },
    ],
    actionItems: [
      { id: "ai-28", title: "Address minor findings", isCompleted: false },
      { id: "ai-29", title: "Update compliance docs", isCompleted: true },
    ],
    sources: [
      { id: "s-29", title: "Audit Report", type: "document" },
      { id: "s-30", title: "Compliance Dashboard", type: "document" },
    ],
    category: "GTM",
    tags: ["security", "soc2", "compliance"],
    createdAt: daysAgo(32),
    updatedAt: daysAgo(30),
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 6-8 WEEKS AGO - 2 events
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "mem-16",
    title: "Initial Investor Outreach",
    summary:
      "Started reaching out to seed investors about Series A timing. Positive signals from 3 tier-1 firms.",
    type: "email",
    status: "resolved",
    date: daysAgo(42),
    weekLabel: getWeekLabel(daysAgo(42)),
    weekNumber: getWeekNumber(daysAgo(42)),
    initiativeId: "init-2", // Series A Fundraise
    participants: [
      { id: "p-9", name: "Jon Martinez" },
      { id: "p-19", name: "Board Advisor" },
    ],
    actionItems: [
      { id: "ai-30", title: "Schedule intro calls", isCompleted: true },
      { id: "ai-31", title: "Prepare pitch deck v1", isCompleted: true },
    ],
    sources: [
      { id: "s-31", title: "Outreach Emails", type: "email" },
      { id: "s-32", title: "Investor Tracker", type: "document" },
    ],
    category: "Fundraising",
    tags: ["outreach", "investors", "series-a"],
    createdAt: daysAgo(42),
    updatedAt: daysAgo(40),
  },
  {
    id: "mem-17",
    title: "Q4 Planning Kickoff",
    summary:
      "Kicked off Q4 planning process. Defined OKRs for product, engineering, and GTM teams.",
    type: "meeting",
    status: "resolved",
    date: daysAgo(50),
    weekLabel: getWeekLabel(daysAgo(50)),
    weekNumber: getWeekNumber(daysAgo(50)),
    initiativeId: "init-1", // Q1 Product Strategy
    participants: [
      { id: "p-1", name: "Sarah Chen" },
      { id: "p-2", name: "Marcus Williams" },
      { id: "p-7", name: "Alex Rivera" },
    ],
    actionItems: [
      { id: "ai-32", title: "Finalize Q4 OKRs", isCompleted: true },
      { id: "ai-33", title: "Resource allocation review", isCompleted: true },
    ],
    sources: [
      { id: "s-33", title: "Planning Doc", type: "document" },
      { id: "s-34", title: "OKR Template", type: "document" },
    ],
    category: "Product Strategy",
    tags: ["planning", "okrs", "q4"],
    createdAt: daysAgo(50),
    updatedAt: daysAgo(48),
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // NEXT WEEK - 2 events (FUTURE)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "mem-18",
    title: "Board Meeting",
    summary:
      "Q4 board meeting scheduled. Will present financials, product update, and Series A progress.",
    type: "meeting",
    status: "active",
    date: daysFromNow(5),
    weekLabel: getWeekLabel(daysFromNow(5)),
    weekNumber: getWeekNumber(daysFromNow(5)),
    initiativeId: "init-2", // Series A Fundraise
    participants: [
      { id: "p-9", name: "Jon Martinez" },
      { id: "p-20", name: "Board Members" },
    ],
    actionItems: [
      { id: "ai-34", title: "Finalize board deck", isCompleted: false },
      { id: "ai-35", title: "Prep Q&A responses", isCompleted: false },
    ],
    sources: [
      { id: "s-35", title: "Board Deck Draft", type: "document" },
      { id: "s-36", title: "Calendar Invite", type: "calendar" },
    ],
    category: "Fundraising",
    tags: ["board", "meeting", "q4"],
    createdAt: daysAgo(3),
    updatedAt: daysAgo(1),
  },
  {
    id: "mem-19",
    title: "Launch Prep Review",
    summary:
      "Final review of Q1 launch preparations. Marketing, engineering, and support teams to confirm readiness.",
    type: "commitment",
    status: "active",
    date: daysFromNow(6),
    weekLabel: getWeekLabel(daysFromNow(6)),
    weekNumber: getWeekNumber(daysFromNow(6)),
    initiativeId: "init-3", // Enterprise GTM Launch
    participants: [
      { id: "p-7", name: "Alex Rivera" },
      { id: "p-1", name: "Sarah Chen" },
      { id: "p-21", name: "Support Lead" },
    ],
    actionItems: [
      { id: "ai-36", title: "Complete launch checklist", isCompleted: false },
      { id: "ai-37", title: "Test support workflows", isCompleted: false },
    ],
    sources: [
      { id: "s-37", title: "Launch Checklist", type: "document" },
      { id: "s-38", title: "Readiness Review", type: "meeting" },
    ],
    category: "GTM",
    tags: ["launch", "preparation", "review"],
    createdAt: daysAgo(2),
    updatedAt: daysAgo(1),
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // IN 2-3 WEEKS - 2 events (FUTURE)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "mem-20",
    title: "Q1 Product Launch",
    summary:
      "Major Q1 product release including new search, API v2, and analytics dashboard. Press embargo lifts at 9am PT.",
    type: "milestone",
    status: "active",
    date: daysFromNow(14),
    weekLabel: getWeekLabel(daysFromNow(14)),
    weekNumber: getWeekNumber(daysFromNow(14)),
    initiativeId: "init-1", // Q1 Product Strategy
    participants: [
      { id: "p-1", name: "Sarah Chen" },
      { id: "p-7", name: "Alex Rivera" },
      { id: "p-22", name: "PR Team" },
    ],
    actionItems: [
      { id: "ai-38", title: "Final QA sign-off", isCompleted: false },
      { id: "ai-39", title: "Coordinate press release", isCompleted: false },
    ],
    sources: [
      { id: "s-39", title: "Launch Plan", type: "document" },
      { id: "s-40", title: "Press Release Draft", type: "document" },
    ],
    category: "Product Strategy",
    tags: ["launch", "q1", "product"],
    createdAt: daysAgo(5),
    updatedAt: daysAgo(2),
  },
  {
    id: "mem-21",
    title: "Enterprise Customer Kickoff",
    summary:
      "Kickoff meeting with Fortune 500 enterprise customer. 3-year contract worth $1.2M ARR.",
    type: "meeting",
    status: "active",
    date: daysFromNow(18),
    weekLabel: getWeekLabel(daysFromNow(18)),
    weekNumber: getWeekNumber(daysFromNow(18)),
    initiativeId: "init-3", // Enterprise GTM Launch
    participants: [
      { id: "p-15", name: "Sales Team" },
      { id: "p-23", name: "Enterprise Client" },
    ],
    actionItems: [
      {
        id: "ai-40",
        title: "Prepare onboarding materials",
        isCompleted: false,
      },
      { id: "ai-41", title: "Schedule training sessions", isCompleted: false },
    ],
    sources: [
      { id: "s-41", title: "Contract Signed", type: "document" },
      { id: "s-42", title: "Kickoff Agenda", type: "document" },
    ],
    category: "GTM",
    tags: ["enterprise", "customer", "kickoff"],
    createdAt: daysAgo(7),
    updatedAt: daysAgo(3),
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // IN 4-6 WEEKS - 2 events (FUTURE)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "mem-22",
    title: "Series A Close Target",
    summary:
      "Target date for Series A close. Goal: $15M at $60M+ valuation with strong lead investor.",
    type: "milestone",
    status: "active",
    date: daysFromNow(35),
    weekLabel: getWeekLabel(daysFromNow(35)),
    weekNumber: getWeekNumber(daysFromNow(35)),
    initiativeId: "init-2", // Series A Fundraise
    participants: [
      { id: "p-9", name: "Jon Martinez" },
      { id: "p-11", name: "Maria Garcia" },
    ],
    actionItems: [
      { id: "ai-42", title: "Complete due diligence", isCompleted: false },
      { id: "ai-43", title: "Finalize legal docs", isCompleted: false },
    ],
    sources: [
      { id: "s-43", title: "Term Sheet Final", type: "document" },
      { id: "s-44", title: "Legal Review", type: "document" },
    ],
    category: "Fundraising",
    tags: ["series-a", "close", "milestone"],
    createdAt: daysAgo(10),
    updatedAt: daysAgo(5),
  },
  {
    id: "mem-23",
    title: "Engineering Team Expansion",
    summary:
      "Target: 4 new engineers onboarded. Roles: 2 backend, 1 frontend, 1 DevOps.",
    type: "commitment",
    status: "active",
    date: daysFromNow(40),
    weekLabel: getWeekLabel(daysFromNow(40)),
    weekNumber: getWeekNumber(daysFromNow(40)),
    initiativeId: "init-4", // Engineering Hiring
    participants: [
      { id: "p-4", name: "James Liu" },
      { id: "p-16", name: "HR Lead" },
    ],
    actionItems: [
      { id: "ai-44", title: "Complete final interviews", isCompleted: false },
      { id: "ai-45", title: "Extend offers", isCompleted: false },
    ],
    sources: [
      { id: "s-45", title: "Hiring Pipeline", type: "document" },
      { id: "s-46", title: "Interview Schedule", type: "calendar" },
    ],
    category: "Hiring",
    tags: ["hiring", "engineering", "expansion"],
    createdAt: daysAgo(8),
    updatedAt: daysAgo(4),
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// Utility Functions
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Get events grouped by week label
 */
export function getEventsByWeek(
  events: MemoryEvent[],
): Map<string, MemoryEvent[]> {
  const grouped = new Map<string, MemoryEvent[]>();

  // Sort events by date (newest first)
  const sorted = [...events].sort(
    (a, b) => b.date.getTime() - a.date.getTime(),
  );

  for (const event of sorted) {
    const existing = grouped.get(event.weekLabel) || [];
    grouped.set(event.weekLabel, [...existing, event]);
  }

  return grouped;
}

/**
 * Get unique categories from events
 */
export function getUniqueCategories(events: MemoryEvent[]): string[] {
  const categories = new Set<string>();
  for (const event of events) {
    if (event.category) {
      categories.add(event.category);
    }
  }
  return Array.from(categories).sort();
}

/**
 * Get week date range string (dynamic)
 */
export function getWeekDateRange(weekLabel: string): string {
  // Parse the week label to get offset
  let offset = 0;
  if (weekLabel === "This Week") {
    offset = 0;
  } else if (weekLabel === "Last Week") {
    offset = -1;
  } else if (weekLabel === "Next Week") {
    offset = 1;
  } else if (weekLabel.includes("Weeks Ago")) {
    offset = -parseInt(weekLabel.split(" ")[0], 10);
  } else if (weekLabel.includes("In")) {
    offset = parseInt(weekLabel.split(" ")[1], 10);
  }

  const now = new Date();
  const currentWeekStart = new Date(now);
  currentWeekStart.setDate(now.getDate() - now.getDay());
  currentWeekStart.setHours(0, 0, 0, 0);

  const weekStart = new Date(currentWeekStart);
  weekStart.setDate(currentWeekStart.getDate() + offset * 7);

  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);

  const startStr = weekStart.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
  const endStr = weekEnd.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  return `${startStr} - ${endStr}`;
}

/**
 * Get ordered week labels (most recent first)
 */
export function getOrderedWeekLabels(events: MemoryEvent[]): string[] {
  const weekOrder = ["This Week", "Last Week", "2 Weeks Ago", "3 Weeks Ago"];
  const presentWeeks = new Set(events.map((e) => e.weekLabel));
  return weekOrder.filter((w) => presentWeeks.has(w));
}
