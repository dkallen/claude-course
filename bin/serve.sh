#!/usr/bin/env bash
# Local dev server for the course platform.
# Usage: npm start  (or ./bin/serve.sh)
# Idempotent — safe to run if the server is already up.

PORT=8080
ROOT="$(cd "$(dirname "$0")/.." && pwd)"

if lsof -iTCP:"$PORT" -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo "Port $PORT is already in use — server is probably running."
    echo "Open http://localhost:$PORT/course.html"
    exit 0
fi

echo "Serving $ROOT on http://localhost:$PORT"
echo "Open http://localhost:$PORT/course.html"
echo "Press Ctrl+C to stop."
exec python3 -m http.server "$PORT" -d "$ROOT"
