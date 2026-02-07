# Weekly Reports Demo

A React-based executive dashboard application featuring weekly reports, CRM contacts, meetings, and memory timeline views. Built with a Synchro-inspired design system.

## Features

- **Home**: Personal tasks swimlane, involvement alerts, and next meeting widget
- **Reports**: Weekly executive reports with AI-generated summaries and inline commenting
- **Radar**: Risk alerts and monitoring with severity-based prioritization
- **Memory**: Initiative-centric timeline view with event connections and focus mode
- **CRM**: Contact management with activity tracking and relationship insights
- **Meetings**: Calendar integration with up-next highlighting and meeting briefs
- **Archive**: Historical reports and meeting recordings

## Tech Stack

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4 with custom design tokens
- **State Management**: Zustand with persistence
- **Animations**: Motion (framer-motion)
- **Icons**: HugeIcons (stroke-rounded)
- **UI Primitives**: Radix UI (Dialog, Select, Switch, Tabs, Separator)

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
  components/     # UI components organized by feature
    ui/           # Shared primitives (button, badge, card, dialog, etc.)
    layout/       # App shell, navigation, sidebars
    home/         # Home page components
    memory/       # Memory timeline components
    crm/          # CRM contact management
    meetings/     # Meetings page
    report/       # Report content rendering
    archive/      # Archive pages
    chat/         # Ask Sentra chatbox
    comments/     # Inline commenting system
    sources/      # Sources sidebar
    review-actions/ # Review actions modal
  data/           # Mock data for development
  hooks/          # Custom React hooks
  lib/            # Utility functions and constants
  stores/         # Zustand state stores
  types/          # TypeScript type definitions
```

## Design System

See [DESIGN_SPEC.md](./DESIGN_SPEC.md) for detailed design specifications including:

- Typography (DM Sans headings + Inter body)
- Color system (warm neutrals with cyan accent)
- HugeIcons icon system
- Custom border radius (3px / 5px / 7px)
- Component API (Button, Badge, Card, Dialog, etc.)
- Animation patterns (spring-based)
- Spacing and layout guidelines
