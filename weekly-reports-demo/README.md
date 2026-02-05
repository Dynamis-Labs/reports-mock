# Weekly Reports Demo

A React-based executive dashboard application featuring weekly reports, CRM contacts, meetings, and memory timeline views.

## Features

- **Reports**: Weekly executive reports with AI-generated summaries and inline commenting
- **Radar**: Risk alerts and monitoring with severity-based prioritization
- **Memory**: Initiative-centric timeline view with event connections and focus mode
- **CRM**: Contact management with activity tracking and relationship insights
- **Meetings**: Calendar integration with up-next highlighting and meeting briefs
- **ToDos**: Kanban-style task management linked to meetings and events

## Tech Stack

- **Framework**: React 18+ with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4
- **State Management**: Zustand with persistence
- **Animations**: Motion (framer-motion)
- **Icons**: Lucide React

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
  data/           # Mock data for development
  hooks/          # Custom React hooks
  lib/            # Utility functions
  stores/         # Zustand state stores
  types/          # TypeScript type definitions
```

## Design System

See [DESIGN_SPEC.md](./DESIGN_SPEC.md) for detailed design specifications including:

- Typography (Figtree font)
- Color system (Slate/Gray HSL)
- Component API
- Animation patterns
- Spacing and layout guidelines
