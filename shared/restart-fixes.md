## The Problem

When Bran & Wren tried to restart their own server (to deploy code changes), the command would hang and timeout. They were running `pm2 restart` from *inside* the process that PM2 was killing — like pulling the rug out from under their own feet.

On top of that, PM2's default kill timeout was only 1.6 seconds, so the server was getting force-killed before it could cleanly shut down. This left orphaned subprocesses eating memory and sometimes caused the new instance to fight with the ghost of the old one.

## The Fixes

### 1. Agent Safety Timeout (`agent.ts`) — done before today
If the Claude SDK hangs mid-query (no response for 5 minutes), the agent automatically aborts the stuck session and notifies the frontend. This prevents zombie sessions where the UI shows a forever-spinning cursor. Before this fix, a hung query would just sit there until the whole server restarted.

### 2. Detached Restart Script (`scripts/restart.sh`)
A shell script that schedules the PM2 restart on a 1-second delay in a **detached background process**, then returns immediately. The agent gets its response back *before* the server dies.

Supports flags: `--build`, `--frontend`, `--backend` to compile before restarting.

### 3. Graceful Shutdown Handler (`server.ts`)
The old SIGTERM/SIGINT handlers didn't abort active Claude agent queries. Now there's a unified `gracefulShutdown()` function that:
- Calls `stopGeneration()` first (aborts any active SDK subprocess)
- Stops the orchestrator, Discord, Telegram
- Closes all WebSocket connections
- Closes the HTTP server and database
- Has an 8-second safety timeout before force-exiting

### 4. PM2 Kill Timeout (`ecosystem.config.cjs`)
Added `kill_timeout: 10000` — PM2 now waits **10 seconds** for graceful shutdown before sending SIGKILL (was 1.6s default).

## How They Work Together

| Failure Mode | What Catches It |
|---|---|
| Claude SDK hangs mid-response | Agent safety timeout (5 min) |
| Server restart kills active query | Graceful shutdown aborts query first |
| PM2 force-kills before cleanup | kill_timeout gives 10s grace period |
| Restart command hangs the agent | Detached script returns before server dies |

## Result
- Restart command returns instantly (no more hanging)
- Clean shutdown with no orphaned processes
- Server comes back up in ~3 seconds
- Faster response times (no ghost processes hogging memory)
- Hung queries auto-recover instead of spinning forever
