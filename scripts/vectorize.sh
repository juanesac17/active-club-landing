#!/usr/bin/env bash
# Vectoriza PNGs monocromáticos → SVG con fill="currentColor" (recoloreable por CSS).
# Stopgap: auto-trazado con potrace. Reemplazar por los SVG del diseñador cuando estén.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
ICONS_SRC="$ROOT/src/assets/icons/icons-negro"
ICONS_OUT="$ROOT/src/assets/icons"
IMG="$ROOT/src/assets/images"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

# png_to_svg <input.png> <output.svg>
png_to_svg() {
  local in="$1" out="$2"
  # transparente → blanco, aplanar, a bitmap; potrace traza lo negro
  magick "$in" -background white -flatten -alpha off -threshold 50% "$TMP/bm.pbm"
  potrace "$TMP/bm.pbm" --svg --turdsize 2 --alphamax 1 -o "$out"
  # recoloreable + sin tamaño fijo (escala por CSS vía viewBox)
  sd '#000000' 'currentColor' "$out"
  sd ' width="[0-9.]+(pt|px)?"' '' "$out"
  sd ' height="[0-9.]+(pt|px)?"' '' "$out"
}

# --- Íconos: 6.x (negro) → nombre semántico ---
# Sin array asociativo (macOS trae bash 3.2). Pares "archivo:nombre".
ICON_MAP="6.1:dumbbell 6.2:stopwatch 6.3:hand-grip 6.4:bolt 6.5:mat \
6.6:boxing-gloves 6.7:barbell-bench 6.8:spin-bike 6.9:kettlebell"
for pair in $ICON_MAP; do
  key="${pair%%:*}"; name="${pair##*:}"
  png_to_svg "$ICONS_SRC/$key.png" "$ICONS_OUT/$name.svg"
  echo "icon  → $name.svg"
done

# --- Logos: versión negra → SVG currentColor ---
png_to_svg "$IMG/logo-negro.png"        "$IMG/logo-horizontal.svg"
png_to_svg "$IMG/logo-negro2.png"       "$IMG/logo-vertical.svg"
png_to_svg "$IMG/nombre-marca-negro.png" "$IMG/wordmark.svg"
echo "logos → logo-horizontal.svg, logo-vertical.svg, wordmark.svg"

echo "DONE"
