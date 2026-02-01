# Weekly Reports — Design Specification

This is a complete design specification for recreating the Weekly Reports UI exactly. Copy this entire document as a prompt when building in another repo.

---

## Overview

A three-panel productivity feature for reviewing AI-generated weekly business summaries with inline commenting and text highlighting. The design is minimal, clean, and uses subtle animations for polish.

```
┌──────────────────────────────────────────────────────────────────────┐
│                           DESKTOP LAYOUT                             │
├───────────────┬──────────────────────────────┬───────────────────────┤
│ Left Sidebar  │       Main Content           │    Right Sidebar      │
│ (280-400px)   │       (flexible)             │    (320-520px)        │
│               │                              │                       │
│ Report List   │       Report Detail          │    Comments           │
│ + Search      │       + Highlights           │    + Feedback         │
│               │                              │                       │
│ [Resizable →] │                              │    [← Resizable]      │
└───────────────┴──────────────────────────────┴───────────────────────┘
```

---

## 1. Typography

### Font Family

```css
font-family:
  "Manrope",
  system-ui,
  -apple-system,
  BlinkMacSystemFont,
  "Segoe UI",
  Roboto,
  "Helvetica Neue",
  Arial,
  sans-serif;
```

Import from Google Fonts with weights: 400, 500, 600

### Text Styles Used

| Element                | Size               | Weight         | Tracking         | Color                       |
| ---------------------- | ------------------ | -------------- | ---------------- | --------------------------- |
| Report title (desktop) | 30px (text-3xl)    | 500 (medium)   | tight (-0.025em) | foreground                  |
| Report title (mobile)  | 20px (text-xl)     | 500 (medium)   | tight            | foreground                  |
| Sidebar headers        | 18px (text-lg)     | 600 (semibold) | tight            | foreground                  |
| Report body            | 15px (text-[15px]) | 400 (normal)   | normal           | foreground                  |
| List item title        | 14px (text-sm)     | 500 (medium)   | normal           | foreground                  |
| Descriptions           | 14px (text-sm)     | 400 (normal)   | normal           | muted-foreground            |
| Section labels         | 12px (text-xs)     | 500 (medium)   | wider (0.05em)   | muted-foreground, UPPERCASE |
| Dates/timestamps       | 12px (text-xs)     | 400 (normal)   | normal           | muted-foreground            |
| Badge text             | 12px (text-xs)     | 500 (medium)   | normal           | varies by variant           |
| Avatar initials        | 10px (text-[10px]) | 500 (medium)   | normal           | muted-foreground            |

---

## 2. Color System (OKLCH)

### Light Mode

```css
:root {
  --background: oklch(1 0 0); /* pure white */
  --foreground: oklch(0.145 0 0); /* near black */
  --muted: oklch(0.97 0 0); /* very light gray */
  --muted-foreground: oklch(0.556 0 0); /* medium gray */
  --border: oklch(0.922 0 0); /* subtle gray border */
  --brand: oklch(68.5% 0.169 237.325); /* vibrant blue */
  --highlight: oklch(85% 0.15 85); /* warm yellow */
  --sidebar: oklch(0.98 0 0); /* off-white */
}
```

### Dark Mode

```css
.dark {
  --background: oklch(0.205 0 0); /* dark gray */
  --foreground: oklch(0.985 0 0); /* near white */
  --muted: oklch(0.269 0 0); /* darker gray */
  --muted-foreground: oklch(0.708 0 0); /* lighter gray text */
  --border: oklch(1 0 0 / 10%); /* white 10% opacity */
  --brand: oklch(68.5% 0.169 237.325); /* same blue */
  --highlight: oklch(45% 0.12 85); /* muted yellow */
  --sidebar: oklch(0.18 0 0); /* dark sidebar */
}
```

### Key Color Usage

- Brand blue: Active states, badges, primary buttons, highlight rings
- brand/10: Badge backgrounds, selected preset backgrounds
- brand/8: Active indicator ring glow, ambient glow effect
- brand/55: Active border color
- muted/30: Hover backgrounds
- muted/50: Selected item backgrounds, panel header backgrounds
- muted/5: Subtle hover on comments

---

## 3. Spacing & Layout

### Page Container

```tsx
<div className="min-h-screen bg-background text-foreground">
  <div className="flex h-screen overflow-hidden">
    {/* Left Sidebar */}
    {/* Main Content */}
    {/* Right Sidebar */}
  </div>
</div>
```

### Panel Dimensions

| Panel         | Default | Min   | Max   |
| ------------- | ------- | ----- | ----- |
| Left Sidebar  | 280px   | 280px | 400px |
| Main Content  | flex-1  | -     | -     |
| Right Sidebar | 360px   | 320px | 520px |

### Key Spacing Values

| Token        | Value | Usage                                      |
| ------------ | ----- | ------------------------------------------ |
| `gap-1.5`    | 6px   | Between icon and text                      |
| `gap-2`      | 8px   | Between tags, badges, small elements       |
| `gap-3`      | 12px  | Between avatar and name, list item spacing |
| `gap-6`      | 24px  | Between major sections                     |
| `p-2`        | 8px   | Report list item padding                   |
| `p-3`        | 12px  | Comment card padding                       |
| `p-4`        | 16px  | Standard sidebar/panel padding             |
| `p-5`        | 20px  | Expanded panel padding                     |
| `px-6 py-6`  | 24px  | Main content padding (desktop)             |
| `px-4 pb-4`  | 16px  | Main content padding (mobile)              |
| `space-y-1`  | 4px   | Report list item gaps                      |
| `space-y-4`  | 16px  | Content section gaps                       |
| `space-y-10` | 40px  | Settings section gaps                      |

---

## 4. Component Specifications

### Left Sidebar Header

```tsx
<div className="flex flex-col gap-2 p-4">
  <div className="flex items-center justify-between">
    <span className="text-lg font-semibold tracking-tight">Weekly Reports</span>
    <button className="size-8 rounded-lg hover:bg-muted/30 flex items-center justify-center">
      <Settings className="size-4" />
    </button>
  </div>
  <Input placeholder="Search reports..." className="h-9" />
</div>
```

### Report List Item

```tsx
<div
  className={cn(
    "cursor-pointer rounded-md p-2 transition-colors",
    "hover:bg-muted/30",
    isSelected && "bg-muted/50 border border-border",
  )}
>
  <div className="flex items-center justify-between gap-2">
    <span className="text-sm font-medium line-clamp-2">
      Weekly Business Report
    </span>
    <Badge variant="brand" className="shrink-0 h-6 rounded-full px-3">
      Week 5
    </Badge>
  </div>
  <span className="text-xs text-muted-foreground">Jan 26 - 1, 2026</span>
</div>
```

### Report List Loading Skeleton

```tsx
<div className="space-y-1 p-4">
  {[1, 2, 3, 4].map((i) => (
    <div key={i} className="rounded-md p-2 space-y-2">
      <div className="flex items-center justify-between">
        <div className="h-5 w-36 rounded-md bg-muted animate-pulse" />
        <div className="h-5 w-14 rounded-full bg-muted animate-pulse" />
      </div>
      <div className="h-4 w-28 rounded-md bg-muted animate-pulse" />
    </div>
  ))}
</div>
```

### Main Content Header (Desktop)

```tsx
<div className="space-y-4 px-6 py-6">
  {/* Title Row */}
  <div className="flex items-center justify-between mb-2">
    <div className="flex items-center gap-3">
      <h1 className="text-3xl font-medium tracking-tight">
        Weekly Business Report
      </h1>
      <Badge
        variant="brand"
        className="h-6 rounded-full px-3 text-xs font-medium"
      >
        Week 5
      </Badge>
    </div>
    <div className="flex items-center gap-2">
      <Button variant="outline" size="sm">
        <Sparkles className="size-4 mr-1.5" />
        Review Actions
        <span className="ml-1.5 rounded-full bg-muted px-1.5 text-[10px] font-semibold">
          3
        </span>
      </Button>
      <Button variant="ghost" size="icon" className="size-8">
        <Link className="size-4" />
      </Button>
    </div>
  </div>

  {/* Meta Row */}
  <div className="flex h-5 items-center gap-3 text-sm text-muted-foreground">
    <span>January 26 - 1, 2026</span>
    <Separator orientation="vertical" className="h-3" />
    <span>4:04 PM</span>
  </div>

  {/* Data Sources */}
  <div className="flex flex-wrap gap-2">
    <Badge
      variant="secondary"
      className="h-5 rounded-full border border-border bg-muted/30 px-2"
    >
      Slack
    </Badge>
    <Badge
      variant="secondary"
      className="h-5 rounded-full border border-border bg-muted/30 px-2"
    >
      Linear
    </Badge>
    <Badge
      variant="secondary"
      className="h-5 rounded-full border border-border bg-muted/30 px-2"
    >
      Google Calendar
    </Badge>
  </div>
</div>
```

### Main Content Header (Mobile)

```tsx
<div className="flex items-center gap-3 p-4 border-b border-border">
  <Button variant="ghost" size="icon" onClick={() => setMobileView("list")}>
    <ArrowLeft className="size-4" />
  </Button>
  <span className="text-sm font-medium truncate">{report.title}</span>
</div>
```

### Right Sidebar Header

```tsx
<div className="p-4 border-b border-border">
  <span className="text-lg font-semibold tracking-tight">Comments</span>
</div>
```

### Comments Empty State

```tsx
<div className="px-4 pt-8 text-center text-sm text-muted-foreground">
  Highlight text in the report to add feedback.
</div>
```

### Comment Thread Card

```tsx
<div
  className={cn(
    "rounded-lg border p-3 transition-all",
    "hover:bg-muted/5",
    isActive && "border-brand/55 ring-4 ring-brand/8",
  )}
>
  <div className="flex items-start gap-3">
    <Avatar className="size-8 border border-border shrink-0">
      <AvatarImage src={user.avatar} />
      <AvatarFallback className="text-[10px] font-medium">JC</AvatarFallback>
    </Avatar>
    <div className="min-w-0 flex-1">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium truncate">Justin Cheng</span>
        <span className="text-xs text-muted-foreground">(me)</span>
      </div>
      <span className="text-xs text-muted-foreground block mb-1">
        2 hours ago
      </span>
      <p className="text-sm text-muted-foreground whitespace-pre-wrap">
        {comment.text}
      </p>
    </div>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="size-6 rounded hover:bg-muted/30 flex items-center justify-center shrink-0">
          <MoreHorizontal className="size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</div>
```

### Comment Input Form

```tsx
<div
  className={cn(
    "rounded-lg border border-border bg-background p-4",
    isFloating ? "max-w-sm shadow-2xl" : "w-full",
  )}
>
  {/* Header */}
  <div className="flex items-center gap-3 mb-3">
    <Avatar className="size-8 border border-border">
      <AvatarFallback className="text-[10px]">JC</AvatarFallback>
    </Avatar>
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium truncate">Justin Cheng</span>
      <span className="text-xs text-muted-foreground">(me)</span>
    </div>
  </div>

  {/* Textarea */}
  <Textarea
    className="min-h-[120px] resize-none border-border"
    rows={3}
    placeholder="Add your feedback..."
  />

  {/* Actions */}
  <div className="flex justify-end gap-2 mt-3">
    <Button variant="outline" size="sm">
      Cancel
    </Button>
    <Button size="sm">
      <Check className="size-4 mr-1" />
      Submit
    </Button>
  </div>
</div>
```

### Text Highlight Wrapper

```tsx
<span
  className={cn(
    "transition-colors duration-200",
    hasComment && "cursor-pointer",
    isActive && "ring-2 ring-brand/30",
  )}
  style={{ backgroundColor: "var(--highlight)" }}
  data-highlight-id={highlightId}
>
  {text}
</span>
```

### Settings Page Layout

```tsx
<div className="max-w-3xl mx-auto px-4 md:p-8">
  {/* Header */}
  <div className="flex items-center justify-between mb-6">
    <h2 className="text-2xl font-bold tracking-tight">
      Weekly Report Settings
    </h2>
    <Button variant="ghost" size="icon" className="size-8">
      <X className="size-4" />
    </Button>
  </div>

  {/* Sections */}
  <div className="space-y-10">
    {/* Schedule Section */}
    <div className="space-y-4">
      <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        SCHEDULE
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Preset buttons */}
      </div>
    </div>
  </div>
</div>
```

### Settings Preset Button

```tsx
<button
  className={cn(
    "w-full rounded-lg border py-3 px-4 text-left transition-colors",
    isSelected
      ? "border-brand bg-brand/10 text-brand"
      : "border-border hover:bg-muted/30",
  )}
>
  <span className="block text-sm font-medium">{preset.label}</span>
  <span className="block text-xs text-muted-foreground mt-1">
    {preset.description}
  </span>
</button>
```

---

## 5. Animations

### Spring Configuration (Primary)

```tsx
transition={{ type: "spring", duration: 0.4, bounce: 0 }}
```

- `type: "spring"`: Physics-based motion
- `duration: 0.4`: 400ms
- `bounce: 0`: No overshoot (critically damped, professional feel)

### Sidebar Resize Animation

```tsx
<motion.div
  style={{ width }}
  transition={{ type: "spring", duration: 0.3, bounce: 0 }}
/>
```

### Content Entrance (Blur + Slide)

```tsx
initial={{ opacity: 0, y: -8, filter: "blur(4px)" }}
animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
exit={{ opacity: 0, y: 8, filter: "blur(4px)" }}
transition={{ type: "spring", duration: 0.4, bounce: 0 }}
```

### Layout Animations

```tsx
<motion.div
  layoutId={`report-${report.id}`}
  transition={{ type: "spring", duration: 0.4, bounce: 0 }}
/>
```

### Pulsing Active Indicator

```tsx
<span className="relative flex size-2">
  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-75" />
  <span className="relative inline-flex size-2 rounded-full bg-brand" />
</span>
```

### Button Press

```tsx
<motion.button
  whileTap={{ scale: 0.97 }}
  transition={{ type: "spring", duration: 0.15, bounce: 0 }}
/>
```

### Tooltip/Popover Enter

```tsx
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
exit={{ opacity: 0 }}
transition={{ duration: 0.15 }}
```

### Hover Effects

```css
/* Card hover */
hover:bg-muted/30 hover:border-border

/* Text hover */
group-hover:text-foreground

/* All with transition-colors */
transition-colors
```

---

## 6. Border Radius Scale

```css
--radius: 0.625rem; /* 10px base */
--radius-sm: calc(var(--radius) - 4px); /* 6px */
--radius-md: calc(var(--radius) - 2px); /* 8px */
--radius-lg: var(--radius); /* 10px */
--radius-xl: calc(var(--radius) + 4px); /* 14px */
```

### Usage

| Element      | Radius            |
| ------------ | ----------------- |
| List items   | rounded-md (8px)  |
| Cards        | rounded-lg (10px) |
| Panels       | rounded-xl (14px) |
| Avatars      | rounded-full      |
| Badges/pills | rounded-full      |
| Buttons      | rounded-md (8px)  |

---

## 7. Shadows

| Element                | Shadow               |
| ---------------------- | -------------------- |
| Floating comment input | shadow-2xl           |
| Dropdown menus         | shadow-md            |
| Default cards          | none (flat design)   |
| Card hover             | shadow-sm (optional) |

---

## 8. Interactive States

### Report List Item States

| State    | Border        | Background  | Text       |
| -------- | ------------- | ----------- | ---------- |
| Default  | transparent   | transparent | foreground |
| Hover    | transparent   | bg-muted/30 | foreground |
| Selected | border-border | bg-muted/50 | foreground |

### Comment Thread States

| State   | Border          | Background  | Ring                |
| ------- | --------------- | ----------- | ------------------- |
| Default | border-border   | transparent | none                |
| Hover   | border-border   | bg-muted/5  | none                |
| Active  | border-brand/55 | transparent | ring-4 ring-brand/8 |

### Highlight States

| State       | Background       | Cursor  | Ring                 |
| ----------- | ---------------- | ------- | -------------------- |
| Default     | var(--highlight) | default | none                 |
| Has comment | var(--highlight) | pointer | none                 |
| Active      | var(--highlight) | pointer | ring-2 ring-brand/30 |

### Button States

| State    | Style                              |
| -------- | ---------------------------------- |
| Default  | bg-primary text-primary-foreground |
| Hover    | bg-primary/90                      |
| Active   | scale(0.97)                        |
| Disabled | opacity-50 cursor-not-allowed      |

---

## 9. Required Dependencies

```json
{
  "motion": "^12.x",
  "lucide-react": "^0.561.x",
  "tailwindcss": "^4.x",
  "@radix-ui/react-avatar": "^1.x",
  "@radix-ui/react-dropdown-menu": "^2.x",
  "@radix-ui/react-separator": "^1.x",
  "react-markdown": "^9.x"
}
```

---

## 10. CSS Setup

```css
@import "tailwindcss";

@layer base {
  html,
  body,
  #root {
    height: 100%;
  }

  body {
    margin: 0;
    font-family: "Manrope", system-ui, sans-serif;
    font-weight: 400;
  }

  * {
    @apply border-border outline-ring/50;
  }

  body {
    @apply bg-background text-foreground;
  }
}

@layer utilities {
  .scrollbar-thin {
    scrollbar-width: thin;
  }

  .scrollbar-thin::-webkit-scrollbar {
    width: 6px;
  }

  .scrollbar-thin::-webkit-scrollbar-thumb {
    background-color: var(--border);
    border-radius: 3px;
  }
}
```

---

## 11. Data Structures

```typescript
interface WeeklyReport {
  id: string;
  title: string;
  weekNumber: number;
  dateRange: { start: Date; end: Date };
  generatedAt: Date;
  content: string; // Markdown
  dataSources: DataSource[];
  highlights: Highlight[];
}

interface DataSource {
  id: string;
  type: "slack" | "linear" | "calendar" | "email" | "document";
  label: string;
}

interface Highlight {
  id: string;
  reportId: string;
  startOffset: number;
  endOffset: number;
  contextSelector: string;
  comments: Comment[];
}

interface Comment {
  id: string;
  highlightId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  text: string;
  createdAt: Date;
  updatedAt?: Date;
}

interface User {
  id: string;
  name: string;
  avatar?: string;
  email: string;
}

interface SchedulePreset {
  id: string;
  label: string;
  description: string;
  cronExpression: string;
}
```

---

## 12. Mobile Behavior

### View States

```typescript
type MobileView = "list" | "detail";
const [mobileView, setMobileView] = useState<MobileView>("list");
```

### Responsive Adjustments

| Element         | Desktop            | Mobile           |
| --------------- | ------------------ | ---------------- |
| Report title    | text-3xl           | text-xl          |
| Content padding | px-6 py-6          | px-4 pt-0 pb-4   |
| Sidebars        | Visible, resizable | Hidden / Sheet   |
| Comments        | Right sidebar      | Sheet from right |

### Comments Sheet (Mobile)

```tsx
<Sheet>
  <SheetContent side="right" className="w-full max-w-md p-4">
    <SheetHeader>
      <SheetTitle className="text-lg font-semibold">Comments</SheetTitle>
    </SheetHeader>
    {/* Comment threads */}
  </SheetContent>
</Sheet>
```

---

## 13. Background Effects

### Ambient Glow

```tsx
<div className="pointer-events-none fixed inset-x-0 -bottom-32 z-0 flex justify-center">
  <div className="h-72 w-full max-w-2xl rounded-full bg-brand/8 blur-3xl" />
</div>
```

- Position: Fixed to bottom, extends below viewport
- Size: 288px tall, max 672px wide
- Color: Brand at 8% opacity
- Blur: 64px radius (blur-3xl)

---

## 14. Key Implementation Notes

1. **Dates use `tabular-nums`** for consistent digit spacing
2. **Overlapping avatars use `-space-x-2`** for stacked effect
3. **All text colors transition with `transition-colors`** for smooth hover states
4. **Use `min-w-0` on flex children** to prevent text overflow issues
5. **Use `shrink-0` on badges/avatars** to prevent squishing
6. **Comments sidebar uses `bg-sidebar`** for subtle differentiation
7. **Floating inputs use `shadow-2xl`** for elevation
8. **DOM-based highlighting** (not overlay positioning) — wraps text nodes with `<span>` elements
9. **Click outside to close**: Use mousedown/touchstart listeners on document
10. **Escape to close**: Add keydown listener when panels are open
11. **Minimum text selection**: 3 characters before creating highlight
12. **Line clamp**: Use `line-clamp-2` on list item titles to prevent overflow

---

## 15. Badge Variants

### Week Badge (Primary)

```tsx
// variant="brand"
className = "h-6 rounded-full bg-brand/10 px-3 text-xs font-medium text-brand";
```

### Data Source Badge (Secondary)

```tsx
// variant="secondary"
className =
  "h-5 rounded-full border border-border bg-muted/30 px-2 text-xs font-medium text-muted-foreground";
```

### Status Badge

```tsx
const statusConfig = {
  pending: {
    dotClass: "bg-muted-foreground",
    bgClass: "bg-muted/30",
    textClass: "text-muted-foreground",
  },
  reviewed: {
    dotClass: "bg-brand",
    bgClass: "bg-brand/10",
    textClass: "text-brand",
  },
};
```

---

## 16. Accessibility

1. **Keyboard Navigation:**
   - Report list items: `tabIndex={0}`, Enter/Space to select
   - Comments: Tab through threads, Enter to expand
   - Escape closes panels/sheets

2. **Focus States:**
   - Visible focus ring on all interactive elements
   - `focus-visible:ring-2 focus-visible:ring-brand/50`

3. **Screen Readers:**
   - `aria-label` on icon buttons
   - `aria-expanded` on collapsible sections
   - Semantic heading hierarchy (h1 → h2 → h3)

---

## 17. Design Principles

### Visual Hierarchy

- **Primary:** Report title (30px, foreground)
- **Secondary:** Section headers, body (15px, foreground/muted)
- **Tertiary:** Labels, dates (12px, muted-foreground, uppercase)

### Color Restraint

- Grayscale dominates the interface
- Brand color reserved for:
  - Active/selected states
  - Highlights
  - Primary actions
  - Badges that need emphasis

### Interaction Feedback

- Hover states are subtle — background tint appears
- Active states use brand color ring (8% opacity)
- Transitions are fast but smooth (400ms spring, no bounce)

### Border Treatment

- Borders are extremely light (`oklch(0.922 0 0)`)
- Used to separate, not emphasize
- Rounded corners on everything (8-12px typical)

### Information Density

- Dense but not crowded
- Clear visual separation between sections
- Liberal whitespace between major elements
