import type { Action } from "../types/action";

export interface DataSource {
  id: string;
  type: "slack" | "linear" | "calendar" | "email" | "document";
  label: string;
}

export interface Comment {
  id: string;
  highlightId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  text: string;
  createdAt: Date;
}

export interface Highlight {
  id: string;
  reportId: string;
  selectedText: string;
  comments: Comment[];
}

export interface WeeklyReport {
  id: string;
  title: string;
  weekNumber: number;
  dateRange: { start: Date; end: Date };
  generatedAt: Date;
  content: string;
  dataSources: DataSource[];
  highlights: Highlight[];
  actions?: Action[];
}

const now = new Date();

export const mockReports: WeeklyReport[] = [
  {
    id: "report-5",
    title: "Weekly Business Report",
    weekNumber: 5,
    dateRange: {
      start: new Date(2026, 0, 26),
      end: new Date(2026, 1, 1),
    },
    generatedAt: new Date(2026, 1, 1, 16, 4),
    dataSources: [
      { id: "ds-1", type: "slack", label: "Slack" },
      { id: "ds-2", type: "linear", label: "Linear" },
      { id: "ds-3", type: "calendar", label: "Google Calendar" },
    ],
    content: `## Highlights & Key Developments

This week marked a pivotal moment for the company with the successful public announcement of our $5M seed round, which immediately generated significant press coverage and a wave of 17 inbound leads. This external momentum is matched by an internal strategic pivot to aggressively pursue the SMB market, driven by the need to hit Series A growth targets within the next 12 weeks.

### Go-to-Market & Business Momentum

**Successful Public Launch:** The fundraise announcement was executed successfully, with coordinated posts across LinkedIn and X, resulting in coverage on Yahoo Finance, Silicon Angle, and PR Newswire. The immediate impact has been 17 inbound leads and a scheduled exclusive interview with Forbes, significantly increasing brand legitimacy.

**Strategic Pivot to SMB:** To meet the ambitious 12-week growth targets for Series A, the go-to-market strategy has officially shifted to prioritize the SMB segment due to its faster sales cycles. A dedicated SMB pipeline has been created in Attio to manage this new focus.

**Pipeline Advancement:** The enterprise pipeline continues to progress with a promising meeting at Accenture that revealed a potential direct sale opportunity. The team is actively pursuing a second demo to close a deal with Twilio. On the SMB front, a deal with Salesape is moving forward, with an order form requested for an initial 5-10 seats.

**First SMB Client Onboarded:** Following last week's close, the project kickoff with Campfire has been completed, officially moving them from a sales prospect to an active customer.

### Product & Engineering Velocity

**Major Features Shipped:**

- **Outlook Integration:** The full integration for Outlook calendars is complete, tested, and live in production. This includes the ability for users to connect their Outlook accounts during onboarding, unblocking a key requirement for enterprise clients.

- **Web App Performance Overhaul:** Loading times for the critical "Memory" and "Meetings" pages have been dramatically reduced through aggressive optimization, directly addressing user feedback about sluggish performance.

**Desktop Application Progress:** The core desktop recording functionality is stable and working. Focus is now on polishing the user experience, with ongoing work on the upload flow and integration with the web app.

### Risks & Blockers

- **Desktop App Remains Critical Blocker:** The desktop application is the single largest blocker for converting SMB interest into closed deals. Multiple prospects have expressed that they need the desktop experience before committing.

- **Product Cohesion Concerns:** Internal discussions have surfaced concerns about product cohesion and the need for a more disciplined product development process to ensure the user experience lives up to the new market hype.

### Action Items for Next Week

1. Finalize desktop app MVP and begin private beta testing
2. Close Salesape deal with signed order form
3. Schedule Forbes interview for maximum impact
4. Complete second Twilio demo and proposal
5. Review and refine SMB onboarding flow based on Campfire feedback`,
    highlights: [
      {
        id: "hl-1",
        reportId: "report-5",
        selectedText:
          "significant press coverage and a wave of 17 inbound leads",
        comments: [
          {
            id: "c-1",
            highlightId: "hl-1",
            userId: "user-1",
            userName: "Sarah Chen",
            text: "This is excellent traction. We should track conversion rates on these inbound leads.",
            createdAt: new Date(now.getTime() - 1000 * 60 * 60 * 2), // 2 hours ago
          },
        ],
      },
      {
        id: "hl-2",
        reportId: "report-5",
        selectedText: "Desktop Application Progress",
        comments: [
          {
            id: "c-2",
            highlightId: "hl-2",
            userId: "user-2",
            userName: "Marcus Johnson",
            text: "Can we get a more detailed timeline on the desktop app? This is blocking several deals.",
            createdAt: new Date(now.getTime() - 1000 * 60 * 45), // 45 mins ago
          },
        ],
      },
    ],
    actions: [
      {
        id: "action-1",
        type: "meeting",
        reportId: "report-5",
        title: "Follow-up: Accenture Direct Sale Opportunity",
        status: "pending",
        meetingName: "Accenture Deal Discussion",
        description:
          "Discuss the direct sale opportunity discovered during last week's meeting. Focus on pricing structure and timeline for pilot program.",
        participants: [
          {
            id: "p-1",
            name: "Sarah Chen",
            email: "sarah.chen@accenture.com",
            matchStatus: "matched",
            matchedContactId: "contact-accenture-1",
          },
          {
            id: "p-2",
            name: "Marcus Johnson",
            email: "marcus.j@example.com",
            matchStatus: "suggested",
          },
          {
            id: "p-3",
            name: "David Park",
            email: "d.park@accenture.com",
            matchStatus: "none",
          },
        ],
        calendarConnected: true,
      },
      {
        id: "action-2",
        type: "email",
        reportId: "report-5",
        title: "Forbes Interview Scheduling",
        status: "pending",
        subject: "Re: Exclusive Interview Request - Seed Round Coverage",
        message:
          "Hi Alex,\n\nThank you for reaching out about the interview opportunity. We'd be happy to schedule time to discuss our recent seed round and product vision.\n\nI'm available this week on Thursday or Friday afternoon. Would either of those work for you?\n\nBest regards",
        recipients: [
          {
            id: "r-1",
            name: "Alex Rivera",
            email: "alex.rivera@forbes.com",
            matchStatus: "matched",
            matchedContactId: "contact-forbes-1",
          },
        ],
      },
      {
        id: "action-3",
        type: "meeting",
        reportId: "report-5",
        title: "Twilio Second Demo",
        status: "pending",
        meetingName: "Twilio Product Demo - Round 2",
        description:
          "Present advanced features and discuss enterprise pricing. Address technical questions from their engineering team.",
        participants: [
          {
            id: "p-4",
            name: "Jennifer Wu",
            email: "jwu@twilio.com",
            matchStatus: "matched",
            matchedContactId: "contact-twilio-1",
          },
          {
            id: "p-5",
            name: "Engineering Lead",
            email: "",
            matchStatus: "none",
          },
        ],
        calendarConnected: true,
      },
    ],
  },
  {
    id: "report-4",
    title: "Weekly Business Report",
    weekNumber: 4,
    dateRange: {
      start: new Date(2026, 0, 19),
      end: new Date(2026, 0, 25),
    },
    generatedAt: new Date(2026, 0, 25, 17, 30),
    dataSources: [
      { id: "ds-1", type: "slack", label: "Slack" },
      { id: "ds-2", type: "linear", label: "Linear" },
    ],
    content: `## Executive Summary

Week 4 focused on preparation for the fundraise announcement and closing initial customer deals. The team made significant progress on both fronts, with the Campfire deal now signed and onboarding scheduled.

### Key Achievements

- Finalized press release and coordinated with PR agency
- Closed Campfire as first paying SMB customer ($12K ARR)
- Completed Outlook integration development
- Stabilized desktop app core functionality

### Looking Ahead

The public announcement is scheduled for Monday. All systems are ready for the expected increase in inbound interest.`,
    highlights: [],
  },
  {
    id: "report-3",
    title: "Weekly Business Report",
    weekNumber: 3,
    dateRange: {
      start: new Date(2026, 0, 12),
      end: new Date(2026, 0, 18),
    },
    generatedAt: new Date(2026, 0, 18, 16, 0),
    dataSources: [
      { id: "ds-1", type: "slack", label: "Slack" },
      { id: "ds-2", type: "calendar", label: "Google Calendar" },
    ],
    content: `## Executive Summary

A productive week focused on advancing enterprise conversations and accelerating development timelines. The team is energized by the upcoming fundraise announcement.

### Pipeline Updates

- Accenture meeting scheduled for next week
- Twilio showing strong interest, demo completed
- Campfire verbal commitment received

### Product Progress

- Outlook integration in final testing phase
- Desktop app recording stable on macOS
- Performance optimization sprint kicked off`,
    highlights: [],
  },
  {
    id: "report-2",
    title: "Weekly Business Report",
    weekNumber: 2,
    dateRange: {
      start: new Date(2026, 0, 5),
      end: new Date(2026, 0, 11),
    },
    generatedAt: new Date(2026, 0, 11, 15, 45),
    dataSources: [{ id: "ds-1", type: "slack", label: "Slack" }],
    content: `## Executive Summary

First full week of the new year. The team set ambitious Q1 goals and began executing against the Series A timeline.

### Strategic Planning

- Defined 12-week growth targets
- Identified key product milestones
- Mapped enterprise vs SMB strategy options

### Early Wins

- Three new enterprise discovery calls scheduled
- Desktop app prototype demonstrated internally
- Outlook integration scope finalized`,
    highlights: [],
  },
];
