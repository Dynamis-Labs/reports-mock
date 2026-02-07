# Weekly Reports — Design Specification

Complete design specification for the Weekly Reports UI. Updated to reflect the Synchro-style design system overhaul.

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

### Font Pairing

Three-font system for visual hierarchy:

```css
/* Heading font — geometric grotesque with warmth */
--font-heading: "DM Sans", system-ui, sans-serif;
/* Weights: 400, 500, 600, 700 */

/* Body/UI font — screen-optimized neo-grotesque */
--font-sans: "Inter", system-ui, sans-serif;
/* Weights: 400, 500, 600 */

/* Label font — geometric sans with rounded terminals */
--font-label: "Manrope", system-ui, sans-serif;
/* Weights: 500, 600, 700 */
/* Used for section labels in drawers and panels */
```

Loaded via Google Fonts in `index.html`.

### Type Scale

| Token          | Size      | Pixel | Font    | Weight | Usage              |
| -------------- | --------- | ----- | ------- | ------ | ------------------ |
| `text-display` | 1.75rem   | 28px  | DM Sans | 600    | Page titles        |
| `text-title`   | 1.375rem  | 22px  | DM Sans | 600    | Section headings   |
| `text-heading` | 1.125rem  | 18px  | DM Sans | 600    | Panel titles       |
| `text-body`    | 0.9375rem | 15px  | Inter   | 400    | Report content     |
| `text-ui`      | 0.875rem  | 14px  | Inter   | 500    | UI labels, buttons |
| `text-caption` | 0.75rem   | 12px  | Inter   | 400    | Metadata, dates    |
| `text-micro`   | 0.6875rem | 11px  | Inter   | 600    | Badges, counters   |

---

## Color System (Warm Neutrals)

### Light Mode

```css
/* Background and Foreground */
--color-background: #fafafa; /* warm white */
--color-foreground: #171717; /* near-black */

/* Surfaces */
--color-surface: #f5f5f5; /* subtle gray */
--color-surface-elevated: #ffffff; /* pure white */

/* Muted */
--color-muted: #f5f5f5;
--color-muted-foreground: #737373;

/* Borders */
--color-border: #e5e5e5;
--color-border-subtle: #f0f0f0;

/* Accent — Cyan for links, focus rings, active nav */
--color-accent: #00a6f5;
--color-accent-foreground: #ffffff;
--color-accent-muted: hsl(199 100% 48% / 10%);

/* Primary — BLACK for filled buttons (Synchro style) */
--color-primary: #171717;
--color-primary-foreground: #ffffff;

/* Highlight — Yellow */
--color-highlight: hsl(48 96% 53% / 40%);
--color-highlight-active: hsl(48 96% 53% / 60%);

/* Semantic */
--color-success: #16a34a;
--color-warning: #d97706;
--color-error: #dc2626;

/* Severity Colors (for Radar) */
--color-severity-critical: #dc2626; /* Red */
--color-severity-high: #ea580c; /* Orange */
--color-severity-medium: #d97706; /* Yellow */
--color-severity-low: #737373; /* Gray */

/* Sources — Indigo accent */
--color-sources: hsl(262 83% 58%);
--color-sources-foreground: #ffffff;
--color-sources-muted: hsl(262 83% 58% / 10%);

--color-sidebar: #fafafa;
```

### Dark Mode

```css
--color-background: #0a0a0a;
--color-foreground: #fafafa;
--color-surface: #171717;
--color-surface-elevated: #1f1f1f;
--color-muted: #262626;
--color-muted-foreground: #a3a3a3;
--color-border: #262626;
--color-border-subtle: #1f1f1f;
--color-accent: #00a6f5; /* cyan stays */
--color-primary: #fafafa; /* white buttons in dark */
--color-primary-foreground: #0a0a0a;
--color-sidebar: #0a0a0a;
```

---

## Border Radius System

Custom three-tier radius system:

```css
--radius-sm: 3px; /* badges, small elements */
--radius-md: 5px; /* inputs, list items */
--radius-lg: 7px; /* cards, buttons, modals */
--radius-full: 9999px; /* pills, avatars */
```

Usage in Tailwind:

```tsx
className = "rounded-[var(--radius-sm)]"; // badges
className = "rounded-[var(--radius-md)]"; // inputs, list items
className = "rounded-[var(--radius-lg)]"; // cards, buttons, modals
className = "rounded-full"; // pills, avatars
```

---

## Shadow System (Minimal)

Cards get NO shadow by default. Shadow only on hover or floating elements.

```css
--shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.03);
--shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.04);
--shadow-md: 0 4px 12px rgba(0, 0, 0, 0.06);
--shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.08);
--shadow-xl: 0 12px 32px rgba(0, 0, 0, 0.1);
--shadow-float: 0 16px 48px rgba(0, 0, 0, 0.12);
```

**Rules:**

- Cards: no shadow at rest, shadow-sm on hover
- Dropdowns/modals: shadow-lg
- Floating inputs (chatbox): shadow-float

---

## Icon System — HugeIcons

### Package

```
@hugeicons/react
@hugeicons/core-free-icons
```

No `lucide-react` — fully removed from the project.

### Usage Pattern

```tsx
import { HugeiconsIcon } from "@hugeicons/react";
import { Home01Icon } from "@hugeicons/core-free-icons";

<HugeiconsIcon icon={Home01Icon} size={16} strokeWidth={1.5} />;
```

### Type

Icon data uses `IconSvgElement` (imported from `@hugeicons/react`), not `LucideIcon`.

### Standard Sizes

| Size | Pixels | Usage                |
| ---- | ------ | -------------------- |
| 12   | 12px   | Extra small (inline) |
| 14   | 14px   | Small icons          |
| 16   | 16px   | Default icon size    |
| 18   | 18px   | Medium icons         |
| 20   | 20px   | Large icons          |
| 24   | 24px   | Extra large icons    |

Default `strokeWidth={1.5}` for all icons.

---

## Spacing System

8px base grid for consistent spacing:

| Gap     | Value | Usage             |
| ------- | ----- | ----------------- |
| `gap-2` | 8px   | Standard spacing  |
| `gap-4` | 16px  | Between sections  |
| `gap-8` | 32px  | Major separations |

### Content Spacing

| Element                         | Value            |
| ------------------------------- | ---------------- |
| Header margin-bottom            | `mb-16`          |
| Section heading (h2) margin-top | `4rem`           |
| Section heading margin-bottom   | `1.5rem`         |
| Paragraph margin-bottom         | `1.5rem`         |
| Paragraph line-height           | `1.8`            |
| Card padding                    | `p-5` (20px)     |
| Page horizontal padding         | `px-8` (32px)    |
| Content padding                 | `py-12 lg:py-16` |

---

## Component API

### Button

```tsx
interface ButtonProps {
  variant?:
    | "default"
    | "secondary"
    | "outline"
    | "ghost"
    | "link"
    | "destructive";
  size?: "xs" | "sm" | "md" | "lg" | "icon" | "icon-sm";
}
```

**Variants:**

- `default` (primary): `bg-primary text-primary-foreground` (BLACK filled)
- `secondary`: `bg-neutral-100 text-foreground`
- `outline`: `border border-border bg-transparent`
- `ghost`: `text-muted-foreground hover:bg-neutral-100`
- `link`: `text-accent underline-offset-4 hover:underline`
- `destructive`: `bg-red-600 text-white`

**Sizes (8px grid):**

- `xs`: h-7 (28px), px-2, text-caption
- `sm`: h-8 (32px), px-3, text-caption
- `md`: h-9 (36px), px-4, text-ui
- `lg`: h-10 (40px), px-6, text-ui
- `icon`: size-8 (32px x 32px)
- `icon-sm`: size-7 (28px x 28px)

All buttons use `rounded-[var(--radius-lg)]` (7px).

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
    | "urgent"
    | "high"
    | "medium"
    | "low"
    | "todo"
    | "in-progress"
    | "in-review"
    | "completed";
}
```

**Status chips (Kanban):**

- `todo`: gray-100 bg, gray-600 text
- `in-progress`: emerald-50 bg, emerald-700 text
- `in-review`: violet-50 bg, violet-700 text
- `completed`: teal-50 bg, teal-700 text

**Priority chips:**

- `urgent`: red-50 bg, red-700 text
- `high`: orange-50 bg, orange-700 text
- `medium`: amber-50 bg, amber-700 text
- `low`: neutral-100 bg, neutral-600 text

Shape: `rounded-full` (pill), `text-micro` (11px), `px-2 py-0.5`.

### Input

Base height: h-10 (40px) for standard, h-8 (32px) for compact.
Border radius: `rounded-[var(--radius-md)]` (5px).
Font: Inter.

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

Fallback: `bg-neutral-200` with initials.

---

## New UI Primitives

Components added as part of the design system overhaul:

| Component | File               | Purpose                                    |
| --------- | ------------------ | ------------------------------------------ |
| Card      | `ui/card.tsx`      | Composable card with header/content/footer |
| Separator | `ui/separator.tsx` | Semantic divider (Radix)                   |
| Progress  | `ui/progress.tsx`  | Accessible progress bar                    |
| Skeleton  | `ui/skeleton.tsx`  | Loading placeholder                        |
| Switch    | `ui/switch.tsx`    | Toggle switch (Radix)                      |
| Tabs      | `ui/tabs.tsx`      | Tab navigation (Radix)                     |
| Dialog    | `ui/dialog.tsx`    | Modal dialog (Radix)                       |
| Select    | `ui/select.tsx`    | Styled dropdown (Radix)                    |

---

## Card Design

```
bg-surface-elevated border border-border rounded-[var(--radius-lg)]
NO shadow by default
hover: shadow-sm + border-neutral-300
padding: p-5 (20px)
```

---

## Animation

### Spring Configurations

```ts
const springs = {
  quick: { type: "spring", stiffness: 500, damping: 35 }, // buttons, toggles
  default: { type: "spring", stiffness: 350, damping: 32 }, // panels, modals
  gentle: { type: "spring", stiffness: 250, damping: 28 }, // content
  page: { type: "spring", stiffness: 200, damping: 25 }, // page transitions
};
```

### Staggered Content

```ts
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.08 },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};
```

No blur effect on stagger items.

### Interactive Feedback

- Button press: `whileTap={{ scale: 0.985 }}`
- Cards: subtle `whileHover={{ y: -2 }}` only
- No `whileHover={{ y: -1 }}` on buttons (removed)
- Nav: `whileTap={{ scale: 0.95 }}`

---

## Interactive States

### List Item States

| State    | Background      | Text             |
| -------- | --------------- | ---------------- |
| Default  | transparent     | muted-foreground |
| Hover    | bg-muted/50     | foreground       |
| Selected | bg-accent-muted | foreground       |

**Important:** Use `hover:text-foreground`, never `hover:text-white`.

### Card Hover

```tsx
className = "hover:shadow-sm hover:border-neutral-300 transition-all";
```

---

## Pages

### Home Page

- Personal tasks swimlane with category cards
- Involvement section with tabs (Blocked, At-Risk, Actions, Updates)
- Next meeting widget with brief popup

### Memory Page

- 16-week horizontal timeline (8 past + 8 future)
- Initiative sidebar with focus mode
- Connection lines visualization
- Zoom controls

### CRM Page

- Contact card grid with filters
- Contact drawer (480px right-side popout) — see CRM Contact Drawer section below

### Meetings Page

- Past/Up Next/Later sections
- Meeting detail modal with brief and recap views
- Platform indicators (Zoom, Google Meet, Teams, etc.)

### Reports + Radar

- Prose editorial format with DM Sans headings + Inter body
- Category icons via HugeIcons
- Radar severity badges

### Archive

- Historical reports/meetings by category
- Tab-based navigation

---

## Comments System

Google Docs-style inline commenting on report content.

| Component            | Purpose                                        |
| -------------------- | ---------------------------------------------- |
| `HighlightedContent` | Container enabling text selection and comments |
| `HighlightRenderer`  | Recursively wraps text in highlight spans      |
| `CommentLayer`       | Positions comment cards next to highlights     |
| `CommentCard`        | Displays comment with edit/delete actions      |
| `CommentComposer`    | Slide-in panel for writing new comments        |
| `useTextSelection`   | Hook for capturing text selection events       |

---

## CRM Contact Drawer

480px right-side popout with portal rendering, backdrop dismiss, and keyboard dismiss (Escape).

### Section Order

```
1. Profile Header (avatar, name, title, company-as-LinkedIn-link, contact info)
2. Quick Actions (pill-shaped centered buttons: Email, Schedule)
3. Tags (pill-shaped, single combobox, slightly inset)
   ─── divider (border-border/20) ───
4. Relationship Status
5. Last Interaction (Gmail icon for email, priority-sorted)
6. Personal Notes (inline editable)
7. Interesting Facts
8. Recent Activity (accordion, collapsed by default)
   ─── divider (border-border/20) ───
9. Recent Company Activity (accordion, collapsed by default)
```

### Typography Tiers

| Tier           | Class                                                     | Usage                         |
| -------------- | --------------------------------------------------------- | ----------------------------- |
| Primary        | `text-sm font-medium text-foreground`                     | Names, subjects, key info     |
| Secondary      | `text-sm text-muted-foreground`                           | Descriptions, summaries, body |
| Tertiary       | `text-xs text-muted-foreground/60`                        | Timestamps, sources, labels   |
| Section header | `text-xs font-medium text-muted-foreground tracking-wide` | All section titles            |

### Spacing Rules

| Context                         | Value              |
| ------------------------------- | ------------------ |
| Between sections                | `space-y-6`        |
| Section header to content       | `mb-2.5`           |
| Content area horizontal padding | `px-5`             |
| Internal card padding           | `p-3`              |
| Divider opacity                 | `border-border/20` |

### Shape Rules

| Element                                | Shape                          |
| -------------------------------------- | ------------------------------ |
| Quick action buttons (Email, Schedule) | `rounded-full` (pill)          |
| Tag pills                              | `rounded-full` (pill)          |
| Notes textarea, tag combobox input     | `rounded-lg` (rectangular)     |
| Last interaction card                  | `rounded-lg` (rectangular)     |
| Section containers                     | No containers unless necessary |

### Hover Behavior

Button variants use theme-aware opacity instead of hardcoded colors:

- Outline: `hover:bg-foreground/[0.04]`
- Ghost: `hover:bg-foreground/[0.06]`

This works in both light and dark mode because `foreground` flips with the theme.

### Divider Rules

Only 2 dividers in the drawer:

1. Before AI-powered sections (after Tags)
2. Before company activity accordion

All dividers: `border-t border-border/20` (standardized, not mixed /30, /40).

---

## Key Implementation Notes

1. **Icons:** HugeIcons with `<HugeiconsIcon icon={X} size={16} strokeWidth={1.5} />`
2. **Icon type:** `IconSvgElement` from `@hugeicons/react`
3. **Font pairing:** DM Sans for headings, Inter for body/UI, Manrope for section labels
4. **Color palette:** Warm neutrals (#fafafa / #171717), not Slate HSL
5. **Primary buttons:** Black filled (Synchro style)
6. **Border radii:** 3px / 5px / 7px custom system via CSS variables
7. **Shadows:** None on cards at rest, shadow-sm on hover only
8. **Hover text:** Always `hover:text-foreground`, never `hover:text-white`
9. **Spacing grid:** 8px base (gap-2, gap-4, gap-8)
10. **Dates:** Use `tabular-nums` for consistent digit spacing

---

## Dependencies

```json
{
  "react": "^19.x",
  "motion": "^12.x",
  "@hugeicons/react": "latest",
  "@hugeicons/core-free-icons": "latest",
  "tailwindcss": "^4.x",
  "@tailwindcss/typography": "^0.5.x",
  "zustand": "^5.x",
  "@radix-ui/react-dialog": "latest",
  "@radix-ui/react-select": "latest",
  "@radix-ui/react-switch": "latest",
  "@radix-ui/react-tabs": "latest",
  "@radix-ui/react-separator": "latest"
}
```
