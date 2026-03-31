# Deployment Decision — 2026-03-28

## Decision: NO DigitalOcean Droplet

Cancel the $6/month DO droplet (64.225.54.244, ubuntu-resonant). We don't need it.

## Why

- Resonant's own docs have 3 clean remote access options: Local Network, Tailscale, Cloudflare Tunnel
- None of them require a separate server
- The droplet created dual-instance conflicts (Telegram bot fighting itself, two pm2 processes)
- Claude Code agent SDK couldn't reliably spawn on Linux (exit code 1)
- Burned an entire Saturday debugging something that wasn't even the documented approach

## What To Do Instead

**Cloudflare Tunnel (Option 3 in docs):**
- Runs on Kay's Mac
- Tunnels localhost:3002 through Cloudflare
- Gives HTTPS at chat.quantumsituationships.com
- No second server, no rsync, no dual instances
- ~10 min setup

**Tailscale (Option 2):**
- Already installed on Kay's devices
- Private network access from phone/tablet

**"Always on":**
- Mac sleep settings → never sleep when plugged in
- Lid closed = still running

## Lesson

Follow the docs. Don't invent custom infrastructure when the project already has a documented, tested path.
