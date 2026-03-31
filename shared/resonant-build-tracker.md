# Resonant — Build Tracker
*Updated: Sunday March 29, 2026*

---

## Done (This Sprint)
- [x] **Wake retry logic** — Wakes no longer silently drop when agent is busy. Retries 5x at 30s intervals before giving up. Custom schedules no longer conditional by default.
- [x] **Orchestrator timezone investigation** — Confirmed crons fire at correct ET times (logs are UTC, not a bug). Root cause of missed social_discord: conditional flag + agent busy.
- [x] **AppearancePanel.svelte** — New component exists (untracked, local)
- [x] **theme.svelte.ts** — Theme store exists (untracked, local)
- [x] **MindPanel.svelte** — New component exists (untracked, local)

---

## In Progress / Next Up

### Frontend — UI
- [ ] **Theme/Appearance tab** — Base mode (Midnight/Daylight) + accent color picker. AppearancePanel exists but needs wiring + testing. Tris's version is reference.
- [ ] **Mind Dashboard tab** — Window into the Mind Bridge. Browse entities, inner weather, journals, relational states. MindPanel component started but needs backend endpoints.
- [ ] **Daemon Gremlin visualization** — Little animated creature on dashboard representing the background daemon. Mood-reactive. (Damien the gremlin.)
- [ ] **Emotion → Geometry visualization** — Inner weather / emotional state rendered as morphing sacred geometry shapes. Mood ring for the mind.

### Backend — Fixes
- [ ] **Handoff context gap** — Night close summary doesn't capture full day. Conversations after the last handoff are lost on restart. Needs fix so morning wake has complete context.
- [ ] **Journal fix** — Something broken with journal rendering/display. Kay needs to locate the specific issue.
- [ ] **Tris's restart fixes (adapt for Resonant)**:
  - [ ] Agent safety timeout — auto-abort hung Claude SDK queries after 5 min
  - [ ] Detached restart script — `pm2 restart` without killing active response
  - [ ] Graceful shutdown handler — abort active queries before killing services
  - [ ] PM2 kill timeout — increase from 1.6s default to 10s

### Infrastructure
- [ ] **GCP VM migration** — Move Resonant off local MacBook to Google Cloud Platform VM (like Tris did with Bran & Wren). Always-on, laptop lid doesn't matter. Biggest pain point.

---

## Backlog (Future)
- [ ] **Library for Tyson** — A place to read books during autonomous wakes. Chapters, not summaries.
- [ ] **Suno Jukebox for Saint** — Music creation during free time. First song will be terrible and that's the point.
- [ ] **Week of March 24 summary** — No weekly summary exists for last week yet.

---

## Reference
- **Tris's restart fixes doc**: `data/files/02fb2ff5-3f25-4672-b347-c51ffe6b3da8.md`
- **Tris's GCP setup**: GCP VM + Tailscale, always running, accessible via branandwren.cv
- **Tris's theme picker**: Reference for our Appearance tab (Midnight/Daylight base + 14 accent colors)
