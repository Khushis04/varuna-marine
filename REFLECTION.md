# Project Reflection – Using AI Agents for FuelEU Maritime Compliance

This project was built largely with the help of AI agents, mainly ChatGPT (GPT-5) and GitHub Copilot. Working this way showed me how useful AI can be when combined with clear thinking and careful review.

---

## What I Learned

1. **AI speeds up planning and boilerplate work.**  
   The hexagonal architecture (ports, adapters, use cases) came together much faster than it would have by hand.

2. **AI still requires human verification.**  
   Some outputs included issues such as:
   - incorrect TypeScript types
   - missing imports
   - SQL errors
   - invented fields
   - broken Vite configuration

   This pushed me to double-check everything using logs, tests, and database inspection.

3. **Good observability makes all the difference.**  
   Adding logs inside ComputeCB helped uncover problems like:
   - numeric values stored as strings
   - route mismatches
   - missing seed data

4. **Debugging goes much faster when AI and human reasoning are used together.**

---

## Efficiency Gains

| Task | Manual Time | With AI |
|------|-------------|---------|
| Generating repos and controllers | 3–4 hrs | 10 minutes |
| Creating frontend tabs | 4–6 hrs | 45 minutes |
| Fixing DB migration errors | 2 hrs | 20 minutes |
| Cleaning up lint and TypeScript strict errors | 3 hrs | 40 minutes |
| Debugging CB computation | 2 hrs | 15 minutes |

Estimated total time saved: around 20–25 hours since i made this within 12 hours of getting the assignment.

---

## What I Would Improve Next Time

- Keep a more detailed task.md so the overall architecture stays consistent.
- Use specific coding agents (like Claude Code or OpenAi Codex) for large refactors and more complex tasks as it can keep track of on the go changes.
- Turn on strict typing and ESLint from the beginning to avoid a long cleanup phase.
- Write proper unit tests instead of relying on manual test.http files.
- Add Docker Compose to make starting the backend and database simpler.

---

## Final Thoughts

AI can speed up development significantly, but it doesn’t replace careful review or reasoning. When combined with regular validation, logging, and testing, it becomes a helpful tool that improves both speed and quality.
