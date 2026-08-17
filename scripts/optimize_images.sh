#!/usr/bin/env bash
#
# Downscale the PNG masters and re-encode them to WebP for shipping.
#
# Two separate problems, solved in one pass:
#
#   Downscaling fixes MEMORY. A decoded bitmap costs width x height x 4 bytes
#   in RAM no matter what format it arrived in, so pixel dimensions — not file
#   size — are what crash a phone. The masters ship at up to 2464x1856 (18MB
#   decoded each); main.js preloads a background for every branch target, so a
#   three-way branch could hold ~73MB of backgrounds at once. That is what was
#   killing mobile Safari and Chrome on the examine panels.
#
#   WebP fixes TRANSFER. It shrinks the files on disk and over the wire and
#   does nothing at all for decoded memory. Both are worth having; only the
#   first one stops the crashes.
#
# Every master is fully opaque except the frame border (checked: alpha channel
# min == max == 1 across backgrounds, objects and characters), so alpha is
# stripped everywhere but there. The frame border is also the one asset whose
# downscale is load-bearing rather than merely nice: at 8000x8000 it decoded to
# ~256MB the instant a hotspot opened. See the art doc, section 3b.
#
# Idempotent: always encodes from the masters, never from its own output, so
# re-running does not stack generational loss.
#
# Requires cwebp (libwebp) and magick (ImageMagick):
#     brew install webp imagemagick
#
# Usage:
#     ./scripts/optimize_images.sh [source_dir] [dest_dir]
# Defaults: source_dir=assets_backup/images-png-master, dest_dir=assets/images
#
# NOTE: the masters live in assets_backup/, which is git-ignored (it is a
# working directory, not shipped — see CLAUDE.md). A fresh clone therefore
# cannot re-run this script without the masters being restored first. The
# shipped .webp files in assets/images/ are the tracked artifacts.

set -euo pipefail

SRC="${1:-assets_backup/images-png-master}"
DEST="${2:-assets/images}"

# Widths by role. Objects and characters display at ~269px inside
# .tier2-frame (width: min(100%, 20rem) minus padding), so 800 still covers a
# 3x DPR phone. Backgrounds are dim, blurred backdrops behind text; 1600 is
# ~1.1x for a 1440px desktop at 2x DPR and heavily oversampled for a phone.
W_BACKGROUND=1600
W_OBJECT=800
W_FRAME=1000

# The tally wall (js/gallery.js) shows every plate at once. At shipped widths
# that grid would decode to ~110MB — the same failure the examine panels had.
# A separate thumbnail tier fixes it: 400px covers the largest wall cell
# (~272px in a 62rem grid) at 2x DPR, and the whole set costs well under 1MB.
# Written to a thumbs/ subdirectory of DEST; the frame border has no wall cell
# and is skipped.
W_THUMB=400
QUALITY_THUMB=78

QUALITY=82        # for photographic art
QUALITY_FRAME=90  # line-art scrollwork; ringing shows up faster on hard edges

for bin in cwebp magick; do
  command -v "$bin" >/dev/null 2>&1 || { echo "error: $bin not found (brew install webp imagemagick)" >&2; exit 1; }
done
[ -d "$SRC" ] || { echo "error: source dir '$SRC' not found" >&2; exit 1; }

mkdir -p "$DEST" "$DEST/thumbs"
tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT

before=0; after=0; thumbs=0

for src in "$SRC"/*.png; do
  [ -e "$src" ] || { echo "error: no PNGs in '$SRC'" >&2; exit 1; }
  name="$(basename "$src" .png)"

  # The frame border is the only asset with a meaningful alpha channel: it is
  # a border-image on transparent ground, so flattening it would fill the
  # scrollwork's gaps with black and box every examine photo in a solid slab.
  case "$name" in
    decorative-frame-border) width=$W_FRAME; q=$QUALITY_FRAME; alpha=keep ;;
    scene-*|ending-*)        width=$W_BACKGROUND; q=$QUALITY; alpha=strip ;;
    *)                       width=$W_OBJECT;     q=$QUALITY; alpha=strip ;;
  esac

  # Only ever shrink: -resize '1600x>' leaves anything already narrower alone.
  if [ "$alpha" = strip ]; then
    magick "$src" -resize "${width}x>" -background black -alpha remove -alpha off -strip "$tmp/$name.png"
    cwebp -q "$q" -quiet "$tmp/$name.png" -o "$DEST/$name.webp"
  else
    magick "$src" -resize "${width}x>" -strip "$tmp/$name.png"
    cwebp -q "$q" -alpha_q 100 -quiet "$tmp/$name.png" -o "$DEST/$name.webp"
  fi

  # Wall thumbnail. Encoded from the master too, never from the shipped WebP,
  # so this stays as generational-loss-free as everything else here.
  if [ "$name" != "decorative-frame-border" ]; then
    magick "$src" -resize "${W_THUMB}x>" -background black -alpha remove -alpha off -strip "$tmp/$name-thumb.png"
    cwebp -q "$QUALITY_THUMB" -quiet "$tmp/$name-thumb.png" -o "$DEST/thumbs/$name.webp"
    t=$(stat -f%z "$DEST/thumbs/$name.webp")
    thumbs=$((thumbs + t))
  fi

  b=$(stat -f%z "$src"); a=$(stat -f%z "$DEST/$name.webp")
  before=$((before + b)); after=$((after + a))
  dims=$(magick identify -format "%wx%h" "$DEST/$name.webp")
  printf "%-34s %8sK -> %6sK  %s\n" "$name" "$((b/1024))" "$((a/1024))" "$dims"
done

echo
printf "total: %sK -> %sK  (%s%% of original)\n" \
  "$((before/1024))" "$((after/1024))" "$((after * 100 / before))"
printf "wall thumbs: %sK across %s files\n" \
  "$((thumbs/1024))" "$(ls -1 "$DEST/thumbs" | wc -l | tr -d ' ')"
