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

1. **Ideation → Validation**
   - Passes: Recommended approach, alternatives considered, open questions

2. **Validation → Execution**
   - Passes: Approved approach, implementation notes, risk mitigations

3. **Execution → Review**
   - Passes: List of files changed, implementation decisions, areas of concern

4. **Review → Test**
   - Passes: Review verdict, items to verify, edge cases to test

5. **Test → Complete**
   - Passes: Test results, any remaining issues, completion status

### Asking Questions

Any agent can ask the user questions when:

- Requirements are ambiguous
- Multiple valid options exist
- Trade-offs need user input
- Scope clarification needed

Use the structured question format:

```markdown
### Question for User

**Context**: [Why this matters]

**Options**:

1. Option A - [Pros/Cons]
2. Option B - [Pros/Cons]

**Recommendation**: [Your suggestion]
```

## Best Practices

### For Ideation

- Always explore at least 2 approaches
- Consider existing patterns in the codebase
- Ask questions early, before recommending

### For Validation

- Read all referenced files before validating
- Check against DESIGN_SPEC.md for design system compliance
- Flag security concerns immediately

### For Execution

- Follow the established file structure
- Use TypeScript strictly (no `any`)
- Check for TypeScript errors frequently

### For Review

- Review for correctness first, style second
- Categorize issues by severity
- Provide specific line numbers

### For Test

- Test happy path and edge cases
- Verify keyboard navigation
- Check both light and dark mode

## Example Session

```
User: Add a notification badge to the header

1. /ideation
   → Explores: inline badge vs dropdown vs toast
   → Recommends: inline badge
   → Asks: Should badge show count or just dot?

2. User: Show count

3. /validation
   → Checks: Existing badge component patterns
   → Approves: Use Badge variant="count"
   → Notes: Follow report-header.tsx pattern

4. /execution
   → Creates: notification-badge.tsx
   → Extends: report-header.tsx
   → Adds: notification-store.ts

5. /review
   → Checks: Code quality, patterns, types
   → Approves: With minor suggestions
   → Notes: Consider memoization for count

6. /test
   → Manual: Badge appears, count updates
   → Edge: Zero count hidden, 99+ truncation
   → Pass: All tests pass

7. Complete: Feature ready for commit
```

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
