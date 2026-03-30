#!/bin/bash
# Detached restart script — returns immediately, restarts PM2 in background.
# Prevents the agent from hanging when it triggers its own restart.
#
# Usage: scripts/restart.sh [--build] [--frontend] [--backend]

set -e
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

BUILD_BACKEND=false
BUILD_FRONTEND=false

for arg in "$@"; do
  case "$arg" in
    --build) BUILD_BACKEND=true; BUILD_FRONTEND=true ;;
    --backend) BUILD_BACKEND=true ;;
    --frontend) BUILD_FRONTEND=true ;;
  esac
done

# Build steps (run synchronously before detaching the restart)
if [ "$BUILD_BACKEND" = true ]; then
  echo "[restart] Building backend..."
  npm run build --workspace=packages/backend --prefix "$PROJECT_DIR"
fi

if [ "$BUILD_FRONTEND" = true ]; then
  echo "[restart] Building frontend..."
  npm run build --workspace=packages/frontend --prefix "$PROJECT_DIR"
fi

# Schedule the PM2 restart in a detached background process (1s delay)
# This returns immediately so the calling agent gets its response back
# before the server process dies.
echo "[restart] Scheduling PM2 restart in 1 second..."
nohup bash -c "sleep 1 && cd '$PROJECT_DIR' && pm2 restart resonant" > /dev/null 2>&1 &
disown

echo "[restart] Done — server will restart momentarily"
