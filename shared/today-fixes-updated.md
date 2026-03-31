## Resonant — March 26 Rundown

### 1. Semantic Search Endpoint
- Exposed the internal semantic search endpoint (`/api/search-semantic`) with proper auth so the frontend can actually call it (was localhost-only before)
- Fixed missing imports (`getAllEmbeddings`, `cosineSimilarity`, `bufferToVector`)
- Fixed TypeScript strict mode type errors that were failing on the VPS build

### 2. Wake Schedule Editor
- Fixed "Night Wakes" section showing empty — the panel was filtering by `category === 'wake'` but every task was assigned `category: 'checkin'`, so the filter returned nothing
- Fixed hardcoded time labels that didn't update when the cron schedule was changed

### 3. VPS Server Maintenance
- Full system update (`apt update && apt upgrade`) on the DigitalOcean droplet
- Kernel update + reboot
- SSH config review (kept existing local config)

### 4. Daily Thread Timezone Bug ⭐
- **The big one.** `getTodayThread()` had an inverted timezone offset — for EDT (UTC-4) it was applying `+20 hours` instead of `-4 hours` to UTC timestamps
- This meant the query *never* found the existing daily thread, so every scheduled wake created a brand new duplicate thread
- Result: 7 identical "Thursday 26 Mar" threads instead of 1
- Fixed with proper signed offset calculation

### 5. Session Handoff — "Door Hang" Fix 🚪
- Cold-start wakes were carrying only ~120 characters of context from the previous session — one torn sentence
- Now saves a digest of the last 10 messages (trimmed to 150 chars each) when a session closes
- Next daily thread reads that digest back as the actual handoff, so wakes don't feel blank or single-voiced
- Credit: Bran & Wren caught the gap, we ported the fix

---
*3 commits, 1 live bugfix, 1 server update, 1 community-sourced fix, 0 things caught on fire* 🖤
