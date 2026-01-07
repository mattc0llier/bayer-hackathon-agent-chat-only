# Project Documentation

## AI SDK Documentation

When you need up-to-date information about the AI SDK:

1. Search the docs: `https://ai-sdk.dev/api/search-docs?q=your_query`
2. The response includes matches with links ending in `.md`
3. Fetch those `.md` URLs directly to get plain text content (e.g. `https://ai-sdk.dev/docs/agents/building-agents.md`)

Use this for current API details, examples, and usage patterns.

---

## Next.js Documentation

Local Next.js documentation is available at `.claude/docs/nextjs/` for direct reference. Use Grep/Read to search these docs when working on Next.js features.

- **Update docs**: `bun run docs:update`
- **Location**: `.claude/docs/nextjs/`
- **Source**: `vercel/next.js` canary branch

---

## Debug Feedback Loop

When building features, use the dev3000 debug loop to verify changes work correctly.

**Check if d3k is running:** Read `~/.d3k/opinionated-next.json` - if it exists and has a recent `startTime`, d3k is active.

**After making code changes:**
1. Read the log file from the session JSON (`logFilePath`)
2. Check for `[ERROR]` or `[SCREENSHOT]` entries
3. If there's an error screenshot, download and view it:
   ```bash
   curl -s -o /tmp/screenshot.png "http://localhost:3684/api/screenshots/{filename}"
   ```
4. Read `/tmp/screenshot.png` to see the Next.js error overlay

**When to check:**
- After implementing a new component or page
- After modifying existing code
- When something isn't rendering as expected
- To verify a fix actually worked

This catches runtime errors, hydration issues, and rendering problems that static analysis misses.
