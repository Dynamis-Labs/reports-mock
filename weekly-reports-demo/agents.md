# Claude Code Agent Workflow

This document describes the structured agent workflow for feature development in this project.

## Agent Overview

| Agent          | Purpose              | Input             | Output               |
| -------------- | -------------------- | ----------------- | -------------------- |
| **Ideation**   | Explore approaches   | Feature request   | Recommended approach |
| **Validation** | Verify approach      | Approach proposal | Approval/rejection   |
| **Execution**  | Implement code       | Approved approach | Working code         |
| **Review**     | Code review          | Implemented code  | Review feedback      |
| **Test**       | Verify functionality | Reviewed code     | Test results         |

## Design System Reference

When implementing features, agents must follow the design system defined in [DESIGN_SPEC.md](./DESIGN_SPEC.md):

- **Icons**: Use `HugeiconsIcon` from `@hugeicons/react` with icons from `@hugeicons/core-free-icons`. Type: `IconSvgElement`. No `lucide-react`.
- **Fonts**: DM Sans for headings (`font-heading`), Inter for body/UI (`font-sans`)
- **Colors**: Warm neutrals (#fafafa / #171717), cyan accent (#00a6f5), black primary buttons
- **Border Radius**: `var(--radius-sm)` (3px), `var(--radius-md)` (5px), `var(--radius-lg)` (7px)
- **Shadows**: No shadow on cards at rest. Shadow-sm on hover.
- **Hover states**: Always `hover:text-foreground`, never `hover:text-white`

## Workflow Diagram

```
┌─────────────┐
│   User      │
│   Request   │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Ideation   │◄──────────────────┐
│   Agent     │                   │
└──────┬──────┘                   │
       │                          │
       ▼                          │
┌─────────────┐                   │
│ Validation  │───────────────────┘
│   Agent     │   (needs changes)
└──────┬──────┘
       │ (approved)
       ▼
┌─────────────┐
│  Execution  │◄──────────────────┐
│   Agent     │                   │
└──────┬──────┘                   │
       │                          │
       ▼                          │
┌─────────────┐                   │
│   Review    │───────────────────┘
│   Agent     │   (needs work)
└──────┬──────┘
       │ (approved)
       ▼
┌─────────────┐
│    Test     │───────────────────┐
│   Agent     │                   │
└──────┬──────┘                   │
       │ (pass)                   │ (fail)
       ▼                          │
┌─────────────┐                   │
│  Complete   │◄──────────────────┘
│             │   (return to execution)
└─────────────┘
```

## How to Use

### Invoking Agents

Use the Claude Code Skill tool to invoke each agent:

```
/ideation - Start feature exploration
/validation - Validate proposed approach
/execution - Implement approved features
/review - Review implemented code
/test - Test and verify functionality
```

### Communication Between Agents

Each agent produces structured output that serves as input for the next:

1. **Ideation -> Validation**
   - Passes: Recommended approach, alternatives considered, open questions

2. **Validation -> Execution**
   - Passes: Approved approach, implementation notes, risk mitigations

3. **Execution -> Review**
   - Passes: List of files changed, implementation decisions, areas of concern

4. **Review -> Test**
   - Passes: Review verdict, items to verify, edge cases to test

5. **Test -> Complete**
   - Passes: Test results, any remaining issues, completion status

## Best Practices

### For Ideation

- Always explore at least 2 approaches
- Consider existing patterns in the codebase
- Ask questions early, before recommending

### For Validation

- Read all referenced files before validating
- Check against DESIGN_SPEC.md for design system compliance
- Verify icon imports use HugeIcons (`@hugeicons/core-free-icons`), not Lucide
- Flag security concerns immediately

### For Execution

- Follow the established file structure
- Use TypeScript strictly (no `any`)
- Use `IconSvgElement` type for icon props (from `@hugeicons/react`)
- Use `rounded-[var(--radius-lg)]` for cards/buttons, `rounded-[var(--radius-md)]` for inputs
- Check for TypeScript errors frequently

### For Review

- Review for correctness first, style second
- Verify no `lucide-react` imports
- Verify no `hover:text-white` (should be `hover:text-foreground`)
- Categorize issues by severity
- Provide specific line numbers

### For Test

- Test happy path and edge cases
- Verify keyboard navigation
- Check both light and dark mode

## Files

Agent skills are located in:

```
.claude/skills/
├── ideation.md
├── validation.md
├── execution.md
├── review.md
└── test.md
```
