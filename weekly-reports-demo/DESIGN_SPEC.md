# Weekly Reports — Design Specification

Complete design specification for the Weekly Reports UI. This document reflects the actual implementation.

---

## Layout Structure

4-panel layout with icon navigation, sidebar, content area, and overlay comments:

```
┌─────────────────────────────────────────────────────────────────────┐
│ Nav │ Sidebar │              [ Content (max-w-2xl) ]               │
│ 52px│ 220px   │        ←── centered on full viewport ──→           │
│     │         │                                                     │
│ Icon│ Reports │                    Report content                   │
│ nav │ list    │                    with comments                    │
│     │         │                    overlay on right                 │
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

---

## Typography

### Font Family

```css
font-family: "Manrope", system-ui, sans-serif;
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

## Color System (OKLCH)

### Light Mode

```css
--color-background: oklch(99% 0.005 260); /* Off-white */
--color-foreground: oklch(15% 0.01 260); /* Near-black */
--color-surface: oklch(97% 0.005 260); /* Light gray cards */
--color-surface-elevated: oklch(100% 0 0); /* Pure white */
--color-muted: oklch(95% 0.005 260); /* Subtle backgrounds */
--color-muted-foreground: oklch(45% 0.01 260); /* Secondary text */
--color-border: oklch(90% 0.01 260); /* Visible borders */
--color-border-subtle: oklch(94% 0.005 260); /* Dividers */

/* Accent - Blue */
--color-accent: oklch(68.5% 0.169 237.325);
--color-accent-foreground: oklch(100% 0 0);
--color-accent-muted: oklch(68.5% 0.169 237.325 / 10%);

/* Highlight - Yellow */
--color-highlight: oklch(85% 0.15 90 / 40%);
--color-highlight-active: oklch(80% 0.18 90 / 60%);

/* Semantic */
--color-success: oklch(55% 0.18 155);
--color-warning: oklch(70% 0.18 70);
--color-error: oklch(55% 0.22 25);

/* Sources - Purple accent for sources sidebar */
--color-sources: oklch(65% 0.15 290);
--color-sources-foreground: oklch(100% 0 0);
--color-sources-muted: oklch(65% 0.15 290 / 10%);

--color-sidebar: oklch(0.98 0 0);
```

### Dark Mode

```css
--color-background: oklch(0.205 0 0);
--color-foreground: oklch(0.985 0 0);
--color-surface: oklch(0.24 0 0);
--color-surface-elevated: oklch(0.26 0 0);
--color-muted: oklch(0.269 0 0);
--color-muted-foreground: oklch(0.708 0 0);
--color-border: oklch(1 0 0 / 10%);
--color-border-subtle: oklch(1 0 0 / 5%);
--color-highlight: oklch(45% 0.12 85);
--color-highlight-active: oklch(50% 0.15 85);
--color-sidebar: oklch(0.18 0 0);
```

---

## Spacing System

Airy, spacious layout optimized for reading:

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

### Common Gaps

| Token     | Value | Usage                           |
| --------- | ----- | ------------------------------- |
| `gap-1.5` | 6px   | Between icon and text           |
| `gap-2`   | 8px   | Between tags, badges            |
| `gap-3`   | 12px  | Between avatar and name         |
| `gap-4`   | 16px  | Between major elements in a row |

---

## Component API

### Button

```tsx
interface ButtonProps {
  variant?: "default" | "secondary" | "outline" | "ghost" | "link";
  size?: "sm" | "md" | "lg" | "icon";
}
```

**Sizes:**

- `sm`: h-8, px-3, text-caption
- `md`: h-9, px-4, text-ui
- `lg`: h-10, px-5, text-ui
- `icon`: size-8 (32px × 32px)

**Icon buttons:** Always use `size="icon"` with explicit `className="size-8"` for consistency.

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
    | "count";
}
```

**Variants:**

- `default`: bg-muted text-muted-foreground
- `active`: bg-accent text-accent-foreground
- `accent`: bg-accent-muted text-accent
- `outline`: border border-border text-muted-foreground
- `week`: bg-accent-muted text-accent font-semibold
- `source`: bg-surface text-muted-foreground border
- `count`: bg-accent text-accent-foreground (circular, size-5)

**Base styles:** px-2, py-0.5, rounded-md, text-micro, font-medium

### Input

```tsx
interface InputProps {
  // Standard HTML input props
}
```

Base height: h-9 for standard, h-7 for compact (sidebar search)

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
| Cards      | rounded-lg    |
| Buttons    | rounded-md/lg |
| Avatars    | rounded-full  |
| Badges     | rounded-md    |

---

## Shadows

```css
--shadow-sm: 0 1px 2px oklch(0% 0 0 / 3%);
--shadow-md: 0 2px 8px oklch(0% 0 0 / 5%);
--shadow-lg: 0 4px 16px oklch(0% 0 0 / 8%);
--shadow-xl: 0 8px 24px oklch(0% 0 0 / 10%);
--shadow-float: 0 12px 32px oklch(0% 0 0 / 12%);
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

### Data Flow

1. User selects text in `HighlightedContent`
2. `useTextSelection` captures selection with offsets
3. `CommentComposer` opens for user input
4. Comment saved to `comment-store` with highlight data
5. `HighlightRenderer` wraps text at stored offsets
6. `CommentLayer` positions `CommentCard` at highlight location

---

## Key Implementation Notes

1. **Icon buttons:** All use size-8 (32px) for consistency
2. **Badges:** Use the Badge component, not inline spans
3. **Dividers:** Use `border-b border-border-subtle` between sections
4. **Dates:** Use `tabular-nums` for consistent digit spacing
5. **Flex children:** Use `min-w-0` to prevent text overflow
6. **Shrink prevention:** Use `shrink-0` on badges/avatars
7. **Transitions:** All colors use `transition-colors duration-200`
8. **Highlighting:** DOM-based (wraps text with `<span>` elements)

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

### Layout-Specific Details

**Split Panel:**

- Grid: `grid-cols-[200px_1fr] gap-8`
- Modal width: `max-w-3xl` (wider to accommodate two columns)
- Left column: action header + participants list
- Right column: subject/name input + message/description textarea

**Minimal Card:**

- Centered card with max-width constraint
- Recipients displayed as inline chips: `[Name ×]`
- CC/BCC shown as inline badge: `[Name CC ×]`
- Borderless inputs for document-like editing
- Auto-growing textarea

**Accordion:**

- Stacked card sections with collapsible recipients
- Recipients section collapsed by default (shows count + preview)
- Content section always expanded
- Click header to expand/collapse recipients

### Common Patterns

- **"+Add" placement:** Always in section header (icon button), never at bottom of list
- **Typography:** Uses `text-modal-*` scale throughout
- **Footer:** Confirm button only (no Skip button)
- **Participant removal:** X button appears on hover

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
