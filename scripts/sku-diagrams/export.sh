#!/usr/bin/env bash
# Export each SKU .drawio to SVG (embedded, editable) and a PNG preview via the Windows draw.io CLI under WSL.
# Usage: scripts/sku-diagrams/export.sh [svg|png]   (default: both)
set -euo pipefail
ROOT=$(cd "$(dirname "$0")/../.." && pwd)
EXE="/mnt/c/Program Files/draw.io/draw.io.exe"
W=/mnt/c/Users/$USER/AppData/Local/Temp/sku-diagrams; mkdir -p "$W"
WIN='C:\Users\'"$USER"'\AppData\Local\Temp\sku-diagrams'
cd /mnt/c/Users/$USER
for f in "$ROOT"/public/downloads/sku-*-architecture.drawio; do
  b=$(basename "$f" .drawio); cp "$f" "$W/$b.drawio"
  if [ "${1:-both}" != svg ]; then timeout 120 "$EXE" -x -f png --width 2000 -b 10 -o "$WIN\\$b.png" "$WIN\\$b.drawio" >/dev/null 2>&1; fi
  if [ "${1:-both}" != png ]; then timeout 120 "$EXE" -x -f svg -e -b 10 -o "$WIN\\$b.svg" "$WIN\\$b.drawio" >/dev/null 2>&1
    cp "$W/$b.svg" "$ROOT/public/diagrams/$b.svg"; chmod 644 "$ROOT/public/diagrams/$b.svg"; fi
  echo "exported $b"
done
