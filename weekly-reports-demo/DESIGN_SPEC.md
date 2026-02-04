# Weekly Reports — Design Specification

Complete design specification for the Weekly Reports UI. This document reflects the actual implementation.

---

## Layout Structure

Multi-section app with icon navigation, contextual sidebars, and content areas:

```
┌─────────────────────────────────────────────────────────────────────┐
│ Nav │ Sidebar │  [Reports/Radar Toggle]  │                        │
│ 52px│ 220px   │       Content Area        │    Optional Panels     │
│     │         │    (max-w-2xl centered)   │    (Comments, etc)     │
│     │         │                           │                        │
└─────────────────────────────────────────────────────────────────────┘
```

### Panel Dimensions

| Panel         | Width     | Notes                              |
| ------------- | --------- | ---------------------------------- |
| Icon Nav      | 52px      | Fixed, contains app icons          |
| Left Sidebar  | 200-280px | Resizable, default 220px           |
| Main Content  | flex-1    | Fills remaining space              |
| Content Col   | max-w-2xl | 672px, centered on viewport        |
| Comment Layer | 256px     | Absolute positioned overlay (w-64) |

### Page Breadcrumb Header

36px height breadcrumb showing current location:

- Section icon + label
- Optional sub-page (e.g., "Reports / Week 6 Report")
- Present on ALL pages for consistent navigation context

### Reports/Radar Toggle

Centered pill toggle at top of main content area:

- Uses Motion `layoutId` for smooth background animation
- State persisted via `reports-store.ts`

---

## Typography

### Font Family

```css
font-family: "Figtree", system-ui, sans-serif;
```

Import from Google Fonts with weights: 400, 500, 600

### Type Scale

| Token          | Size      | Pixel | Usage              |
| -------------- | --------- | ----- | ------------------ |
| `text-display` | 2rem      | 32px  | Report title       |
| `text-title`   | 1.5rem    | 24px  | Section headings   |
| `text-heading` | 1.125rem  | 18px  | Panel titles       |
| `text-body`    | 0.9375rem | 15px  | Report content     |
| `text-ui`      | 0.875rem  | 14px  | UI labels, buttons |
| `text-caption` | 0.75rem   | 12px  | Metadata, dates    |
| `text-micro`   | 0.6875rem | 11px  | Badges, counters   |

### Modal Type Scale

Refined typography for modal dialogs (smaller than main UI for better density):

| Token              | Size      | Pixel | Usage                  |
| ------------------ | --------- | ----- | ---------------------- |
| `text-modal-title` | 1rem      | 16px  | Modal action titles    |
| `text-modal-ui`    | 0.875rem  | 14px  | Input text, names      |
| `text-modal-label` | 0.75rem   | 12px  | Labels, secondary text |
| `text-modal-micro` | 0.6875rem | 11px  | Badges, counts         |

---

## Color System (Slate/Gray HSL)

### Light Mode

```css
/* Background and Foreground */
--color-background: hsl(210 40% 98%); /* Slate-50 */
--color-foreground: hsl(222 47% 11%); /* Slate-900 */

/* Surfaces */
--color-surface: hsl(210 40% 96%); /* Slate-100 */
--color-surface-elevated: hsl(0 0% 100%); /* White */

/* Muted */
--color-muted: hsl(210 40% 96%); /* Slate-100 */
--color-muted-foreground: hsl(215 16% 47%); /* Slate-500 */

/* Borders */
--color-border: hsl(214 32% 91%); /* Slate-200 */
--color-border-subtle: hsl(210 40% 96%); /* Slate-100 */

/* Accent - Slate-based monochromatic */
--color-accent: hsl(215 25% 27%); /* Slate-700 */
--color-accent-foreground: hsl(210 40% 98%);
--color-accent-muted: hsl(215 25% 27% / 10%);

/* Highlight - Yellow */
--color-highlight: hsl(48 96% 53% / 40%);
--color-highlight-active: hsl(48 96% 53% / 60%);

/* Semantic */
--color-success: hsl(142 71% 45%);
--color-warning: hsl(38 92% 50%);
--color-error: hsl(0 84% 60%);

/* Severity Colors (for Radar) */
--color-severity-critical: hsl(0 84% 60%); /* Red */
--color-severity-high: hsl(25 95% 53%); /* Orange */
--color-severity-medium: hsl(45 93% 47%); /* Yellow */
--color-severity-low: hsl(215 16% 47%); /* Gray */

/* Sources - Purple accent */
--color-sources: hsl(262 83% 58%);
--color-sources-foreground: hsl(0 0% 100%);
--color-sources-muted: hsl(262 83% 58% / 10%);

--color-sidebar: hsl(210 40% 98%);
```

### Dark Mode

```css
--color-background: hsl(222 47% 11%); /* Slate-900 */
--color-foreground: hsl(210 40% 98%); /* Slate-50 */
--color-surface: hsl(217 33% 17%); /* Slate-800 */
--color-surface-elevated: hsl(215 25% 27%); /* Slate-700 */
--color-muted: hsl(217 33% 17%); /* Slate-800 */
--color-muted-foreground: hsl(215 20% 65%); /* Slate-400 */
--color-border: hsl(217 33% 17%); /* Slate-800 */
--color-border-subtle: hsl(217 33% 17% / 50%);
--color-highlight: hsl(48 96% 35%);
--color-highlight-active: hsl(48 96% 45%);
--color-sidebar: hsl(222 47% 11%);
```

---

## Icon System

### Base Sizes

| Token         | Size | Usage                 |
| ------------- | ---- | --------------------- |
| `--icon-sm`   | 14px | Small inline icons    |
| `--icon-base` | 16px | Default icon size     |
| `--icon-lg`   | 20px | Large/prominent icons |

### Stroke Widths

| Token             | Value | Usage                     |
| ----------------- | ----- | ------------------------- |
| `--stroke-thin`   | 1     | Large decorative icons    |
| `--stroke-normal` | 1.2   | Standard icons            |
| `--stroke-thick`  | 1.5   | UI action icons (default) |

**Standard pattern:**

```tsx
<Icon className="size-4" strokeWidth={1.5} />
```

---

## Spacing System

8px base grid for consistent spacing:

| Gap     | Value | Usage             |
| ------- | ----- | ----------------- |
| `gap-2` | 8px   | Standard spacing  |
| `gap-4` | 16px  | Between sections  |
| `gap-6` | 24px  | Major separations |

### Content Spacing

| Element                         | Value            |
| ------------------------------- | ---------------- |
| Header margin-bottom            | `mb-16`          |
| Section heading (h2) margin-top | `4rem`           |
| Section heading margin-bottom   | `1.5rem`         |
| Paragraph margin-bottom         | `1.5rem`         |
| Paragraph line-height           | `1.8`            |
| List item margin-bottom         | `0.75rem`        |
| Content padding                 | `py-12 lg:py-16` |
| Footer margin-top               | `mt-20`          |
| Comment card gap                | `120px`          |

---

## Component API

### Button

```tsx
interface ButtonProps {
  variant?: "default" | "secondary" | "outline" | "ghost" | "link";
  size?: "sm" | "md" | "lg" | "icon";
}
```

**Sizes (8px grid):**

- `sm`: h-8 (32px), px-3, text-caption
- `md`: h-10 (40px), px-4, text-ui
- `lg`: h-12 (48px), px-6, text-ui
- `icon`: size-8 (32px × 32px)

### Badge

```tsx
interface BadgeProps {
  variant?:
    | "default"
    | "active"
    | "accent"
    | "outline"
    | "week"
    | "source"
    | "count"
    | "urgent" // Red - for high priority
    | "high" // Orange
    | "medium" // Yellow
    | "low"; // Gray
}
```

**Priority variants (for ToDos):**

- `urgent`: Red background, for urgent priority
- `high`: Orange background, for high priority
- `medium`: Yellow background, for medium priority
- `low`: Gray background, for low priority

### Input

```tsx
interface InputProps {
  // Standard HTML input props
}
```

Base height: h-10 (40px) for standard, h-8 (32px) for compact

### Avatar

```tsx
interface AvatarProps {
  name: string;
  src?: string;
  size?: "sm" | "md" | "lg";
}
```

**Sizes:**

- `sm`: size-6 (24px)
- `md`: size-8 (32px)
- `lg`: size-10 (40px)

---

## New Components

### PageBreadcrumbHeader

```tsx
interface PageBreadcrumbHeaderProps {
  items: { label: string; icon?: LucideIcon; href?: string }[];
}
```

36px height breadcrumb for consistent navigation context.

### ReportsRadarToggle

```tsx
interface ReportsRadarToggleProps {
  value: "reports" | "radar";
  onChange: (value: "reports" | "radar") => void;
}
```

Pill-style toggle with Motion layoutId animation.

### EmptyState

```tsx
interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
}
```

Clean placeholder for "Coming Soon" sections.

---

## New Pages

### ToDos Page (3-Column Kanban)

| Column    | Status      | Description      |
| --------- | ----------- | ---------------- |
| Active    | `active`    | Tasks to be done |
| Completed | `completed` | Finished tasks   |
| Cancelled | `cancelled` | Abandoned tasks  |

**Todo Card displays:**

- Title
- Linked event (meeting/email reference)
- Due date
- Priority tag (urgent/high/medium/low)

**Interactions:**

- Click card → opens drawer
- Drawer has status change buttons

### Radar Page (Risk Alerts)

Shares layout with Reports via toggle. Displays risk alerts with severity levels:

| Severity | Color  | Indicator |
| -------- | ------ | --------- |
| Critical | Red    | Dot       |
| High     | Orange | Dot       |
| Medium   | Yellow | Dot       |
| Low      | Gray   | Dot       |

Items grouped by severity in sidebar, detail view in reading pane.

### Meetings Page

Full-width page (no sidebar) showing meetings organized by time:

| Section    | Content                        | Card Style         |
| ---------- | ------------------------------ | ------------------ |
| Past Today | Meetings that have ended today | Compact list items |
| Up Next    | The next upcoming meeting      | Featured card      |
| Later      | Future meetings (today+)       | Medium date cards  |

**Section Dividers:**

- "Scroll for history" - subtle indicator above past list
- "UP NEXT" - green accent line with badge
- "LATER" - simple section header

**Meeting Cards:**

| Card Type        | Features                                         |
| ---------------- | ------------------------------------------------ |
| MeetingListItem  | Calendar icon, title, badges, hover actions      |
| UpNextCard       | Full featured: countdown, attendees, join button |
| LaterMeetingCard | Circular date badge, title, time, platform       |

**Visibility Badges:**

- `shared` - Green (emerald-500/15)
- `private` - Amber (amber-500/15)

**Countdown Timer:**

- Updates every minute via `useCountdown` hook
- Shows format: "In 15 mins (2:00 PM)"
- Special states: "Starting now", "In progress", "Ended"

**Detail Views:**

| Mode  | Trigger            | Content                                    |
| ----- | ------------------ | ------------------------------------------ |
| Brief | Click upcoming     | Agenda, attendees, meeting link, join btn  |
| Recap | Click past meeting | Recording, overview, takeaways, AI actions |

**Platform Indicators:**

- Zoom: Blue video icon
- Google Meet: Green video icon
- Teams: Purple users icon
- Phone: Slate phone icon
- In-Person: Orange building icon

---

## Animation

### Spring Configurations

```ts
const springs = {
  quick: { type: "spring", stiffness: 400, damping: 30 }, // Buttons, toggles
  default: { type: "spring", stiffness: 300, damping: 30 }, // Panels, modals
  gentle: { type: "spring", stiffness: 200, damping: 25 }, // Page content
  page: { type: "spring", stiffness: 150, damping: 20 }, // Page transitions
};
```

### Staggered Content

```ts
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};
```

### Interactive Feedback

- Button press: `whileTap={{ scale: 0.98 }}`
- Button hover: `whileHover={{ y: -1 }}`
- Nav button: `whileHover={{ scale: 1.05 }}`, `whileTap={{ scale: 0.95 }}`

---

## Interactive States

### List Item States

| State    | Background      | Text             |
| -------- | --------------- | ---------------- |
| Default  | transparent     | muted-foreground |
| Hover    | bg-muted        | foreground       |
| Selected | bg-accent-muted | foreground       |

### Comment Card States

| State   | Style                                 |
| ------- | ------------------------------------- |
| Default | bg-sidebar border-border shadow-sm    |
| Hover   | Shows edit/delete action icons        |
| Edit    | Inline textarea replaces comment text |
| Delete  | Overlay confirmation dialog           |

### Highlight States

| State   | Background                    | Cursor  |
| ------- | ----------------------------- | ------- |
| Default | var(--color-highlight)        | pointer |
| Hover   | var(--color-highlight-active) | pointer |
| Active  | var(--color-highlight-active) | pointer |

---

## Border Radius

| Element    | Radius        |
| ---------- | ------------- |
| List items | rounded-md    |
| Cards      | rounded-lg/xl |
| Buttons    | rounded-md/lg |
| Avatars    | rounded-full  |
| Badges     | rounded-md    |

---

## Shadows

```css
--shadow-sm: 0 1px 2px hsl(0 0% 0% / 3%);
--shadow-md: 0 2px 8px hsl(0 0% 0% / 5%);
--shadow-lg: 0 4px 16px hsl(0 0% 0% / 8%);
--shadow-xl: 0 8px 24px hsl(0 0% 0% / 10%);
--shadow-float: 0 12px 32px hsl(0 0% 0% / 12%);
```

Usage:

- Floating inputs: shadow-float
- Dropdown menus: shadow-lg
- Default cards: none (flat design)

---

## Comments System

The comments system enables Google Docs-style inline commenting on report content.

### Architecture

| Component            | Purpose                                        |
| -------------------- | ---------------------------------------------- |
| `HighlightedContent` | Container enabling text selection and comments |
| `HighlightRenderer`  | Recursively wraps text in highlight spans      |
| `CommentLayer`       | Positions comment cards next to highlights     |
| `CommentCard`        | Displays comment with edit/delete actions      |
| `CommentComposer`    | Slide-in panel for writing new comments        |
| `useTextSelection`   | Hook for capturing text selection events       |

### Key Features

- **DOM-based highlighting:** Text wrapped in `<span data-highlight>` elements
- **Position calculation:** Cards positioned relative to highlight Y coordinate
- **Auto-scroll:** Clicking a comment scrolls to its highlighted text
- **Overlap prevention:** Cards stack with 120px minimum gap
- **Inside scroll container:** Comment layer scrolls with content (Google Docs behavior)

---

## Key Implementation Notes

1. **Icon standard:** All icons use `size-4` (16px) with `strokeWidth={1.5}` by default
2. **Icon buttons:** All use size-8 (32px) for consistency
3. **Badges:** Use the Badge component, not inline spans
4. **Font family:** Figtree (not Manrope)
5. **Color palette:** Slate/Gray HSL (not OKLCH)
6. **Spacing grid:** 8px base (gap-2, gap-4, gap-6)
7. **Dividers:** Use `border-b border-border-subtle` between sections
8. **Dates:** Use `tabular-nums` for consistent digit spacing
9. **Flex children:** Use `min-w-0` to prevent text overflow
10. **Shrink prevention:** Use `shrink-0` on badges/avatars
11. **Transitions:** All colors use `transition-colors duration-200`

---

## Review Actions Modal

### Layout Variants

The Review Actions Modal supports three switchable layouts:

| Layout         | Description                                           | Best For                         |
| -------------- | ----------------------------------------------------- | -------------------------------- |
| `split-panel`  | Two-column: participants left, content right          | Seeing everything at once        |
| `minimal-card` | Clean card with inline recipient chips                | Simple reviews, modern aesthetic |
| `accordion`    | Collapsible sections, recipients collapsed by default | Maximum content visibility       |

**Layout Switcher:** Located in the modal header before pagination. Three icons allow switching between layouts. Selection persists to localStorage.

---

## Dependencies

```json
{
  "motion": "^12.x",
  "lucide-react": "^0.561.x",
  "tailwindcss": "^4.x",
  "@tailwindcss/typography": "^0.5.x"
}
```
