#!/usr/bin/env bash
#
# Take the Chapter II art as delivered and turn it into shipped WebP.
#
# Chapter I's masters arrived already in their final palette, so its shipping
# path is nothing but optimize_images.sh. Chapter II's originals are neutral
# cool grey rather than the navy the rest of the game is drawn in, and three
# are named differently from the manifest, so they need fixing first. This
# script is those fixes plus the handoff, written down so the result is
# reproducible rather than a thing that happened once in a shell.
#
# Pipeline:
#   assets_original/chapter_II/   delivered PNGs (source of truth, untouched)
#     -> rename to the manifest's names
#     -> crop the plate to 4:5      matching Chapter I's held plates
#     -> match_exposure.py          per-image levels into Chapter I's range
#     -> unify_colors.py            palette remap onto Chapter I's anchors
#     -> assets_backup/images-png-master/    joins the master set
#     -> optimize_images.sh         downscale + WebP + wall thumbs
#     -> assets/images/
#
# Idempotent: always works from assets_original/, never from its own output.
#
# Requires magick, cwebp, and python3 with numpy + pillow.
#
# Usage:  ./scripts/prepare_chapter2_art.sh

set -euo pipefail

SRC="assets_original/chapter_II"
MASTERS="assets_backup/images-png-master"

[ -d "$SRC" ] || { echo "error: '$SRC' not found" >&2; exit 1; }
command -v magick >/dev/null || { echo "error: magick not found" >&2; exit 1; }
python3 -c "import numpy, PIL" 2>/dev/null || { echo "error: python3 needs numpy + pillow" >&2; exit 1; }

stage="$(mktemp -d)"; unified="$(mktemp -d)"
trap 'rm -rf "$stage" "$unified"' EXIT

echo "staging $SRC ..."
cp "$SRC"/*.png "$stage"/

# The delivered names differ from the art doc's manifest in three places. The
# manifest is what scenes-c2.js references, so it wins.
#   parked -> packed: the car is packed for a move, not parked.
mv "$stage/obj-cup-holder-receipt.png" "$stage/obj-cup-receipt.png"
mv "$stage/obj-parked-car.png"         "$stage/obj-packed-car.png"
mv "$stage/obj-school-bag.png"         "$stage/obj-schoolbag.png"

# The plate is cropped to 4:5 to match Chapter I's held plates, which all ship
# 800x1000. Delivered 16:9-ish at 1232x928, it is cut to a centred 742x928 —
# full height, so nothing is lost vertically, and the centre column is where the
# feet and the submerged objects are. optimize_images.sh then lands it at
# 800x1000, byte-for-byte the same framing Chapter I's plate uses.
echo "cropping the plate to 4:5 ..."
magick "$stage/plate-c2-pool.png" -gravity center -crop 742x928+0+0 +repage "$stage/plate-c2-pool.png"

# NOTE: scene-01-dropoff was delivered light-ground — black ink on pale grey,
# where every other asset in both chapters is dark-ground. It is shipped exactly
# as delivered regardless: Chapter I's pipeline inverts nothing, and negating
# this one produced a photographic-negative look that matched neither Chapter I
# nor the rest of Chapter II. A pixel operation cannot turn a light line drawing
# into Chapter I's dark painted scenes; that image wants regenerating at source.
# Do not add an invert step here.

# Exposure first, palette second, and the order is load-bearing — see the header
# of match_exposure.py. Chapter II came out of the generator far brighter than
# Chapter I (0.09-0.59 mean against 0.02-0.08), which does not hold light prose.
echo "matching exposure to Chapter I ..."
exposed="$(mktemp -d)"; trap 'rm -rf "$stage" "$unified" "$exposed"' EXIT
python3 scripts/match_exposure.py "$stage" "$exposed"

# Palette remap onto Chapter I's four anchors. This is a hue unifier, not a
# darkener: Chapter II is neutral cool grey out of the generator, Chapter I is
# navy/steel-blue, and this is what puts them in the same world.
echo "unifying palette ..."
python3 scripts/unify_colors.py "$exposed" "$unified" >/dev/null

echo "installing masters into $MASTERS ..."
mkdir -p "$MASTERS"
cp "$unified"/*.png "$MASTERS"/

# optimize_images.sh re-encodes from masters and is byte-deterministic, so
# running it across the whole master directory rewrites Chapter I's files with
# identical bytes and leaves no diff. Verified, not assumed.
echo "encoding ..."
./scripts/optimize_images.sh
