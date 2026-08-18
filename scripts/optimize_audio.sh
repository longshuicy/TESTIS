#!/usr/bin/env bash
#
# Re-encode the audio masters in assets_sound_src/ to the shipped files in
# assets/sound/. The counterpart to optimize_images.sh, and the same bargain:
# masters are the truth, shipped files are artifacts, and nothing is ever
# edited in place.
#
# Sound doc section 7 owns the format decisions this script implements:
#
#   Beds     -> AAC 96kbps .m4a. They run 4 to 9 minutes; browsers stream them
#               with range requests, so what a player downloads is roughly
#               minutes-listened x bitrate, not the file size.
#   Stings   -> AAC 128kbps .m4a. Short, and they land inside a silence the
#               rest of the design worked to earn, so they get the better rate.
#   Two WAVs -> stay uncompressed, for reasons that are not about size:
#               bed-scene-5 is a seamless loop (every lossy codec adds encoder
#               padding that a loop turns into a click), and drip-single is
#               fired dozens of times with tight timing (decode latency to
#               lose, nothing to gain).
#
# A LOOPING STING CAN BE THE SAME TRAP AS bed-scene-5, but only if its head
# meets its tail. A sting the game loops under a held plate hits its own loop
# point while the player is still reading, and AAC's padding reads as a hiccup
# in a texture that was steady across the seam. A recording that already fades
# to silence before it ends has nowhere for the padding to show. Check before
# assuming: add a file to STING_LOOP below and it ships as 16-bit WAV instead.
#
# Float32 WAV masters are converted down to 16-bit even when they stay WAV:
# 32-bit float playback in <audio> is not reliable across browsers, and the
# same reasoning already applies to drip-single.
#
# The two interface cues (prompt-notification.mp3, confirmation.mp3) were
# delivered as shipped and have no master here. They are not touched.
# drip-single.wav is derived from drip.wav by a cut this script does not make
# (see sound doc section 10); it is not touched either.
#
# Idempotent: always encodes from the masters, never from its own output.
#
# Requires afconvert, which ships with macOS. No install step.
#
# Usage:
#     ./scripts/optimize_audio.sh [source_dir] [dest_dir]
# Defaults: source_dir=assets_sound_src, dest_dir=assets/sound
#
# NOTE: assets_sound_src/ is git-ignored (a working directory, not shipped —
# see CLAUDE.md), so a fresh clone cannot re-run this without the masters being
# restored first. The shipped files in assets/sound/ are the tracked artifacts.

set -euo pipefail

SRC="${1:-assets_sound_src}"
DEST="${2:-assets/sound}"

BITRATE_BED=96000
BITRATE_STING=128000

# Stings the game loops rather than plays once. Anything listed here ships as
# WAV, not AAC — see the encoder-padding note in the header.
#
# Empty, and plate-scene-7 is deliberately not in it despite looping. AAC does
# add 64ms of padding to it (measured: the master's 8.550s reads as 8.615s in
# the browser), but that master already ends with 1.15s of digital silence, so
# the padding lands inside silence that is part of the recording. Nothing to
# hear, and no reason to pay 740KB instead of 117KB. The bed-scene-5 rule needs
# a loop whose head meets its tail; this one does not have one.
STING_LOOP=""

# Masters with no shipped counterpart, or whose shipped file is produced by a
# cut this script does not make.
SKIP="drip drip-single plate-scene-5"

command -v afconvert >/dev/null 2>&1 || { echo "error: afconvert not found (macOS only)" >&2; exit 1; }
[ -d "$SRC" ] || { echo "error: source dir '$SRC' not found" >&2; exit 1; }

mkdir -p "$DEST"

before=0; after=0; count=0

for src in "$SRC"/*; do
  [ -f "$src" ] || continue
  base="$(basename "$src")"
  name="${base%.*}"

  skip=
  for s in $SKIP; do [ "$name" = "$s" ] && skip=1; done
  [ -n "$skip" ] && { printf "%-30s %s\n" "$name" "skipped (see header)"; continue; }

  # plate-scene-5 ships from its trimmed copy, not the 87-second delivery.
  case "$name" in
    *-trimmed) name="${name%-trimmed}" ;;
  esac

  loop=
  for s in $STING_LOOP; do [ "$name" = "$s" ] && loop=1; done

  case "$name" in
    bed-scene-5)
      # Seamless tick loop: 24-bit master down to 16-bit, still WAV.
      out="$DEST/$name.wav"
      afconvert -f WAVE -d LEI16 "$src" "$out"
      note="WAV 16-bit (seamless loop)"
      ;;
    bed-*)
      out="$DEST/$name.m4a"
      afconvert -f m4af -d aac -b "$BITRATE_BED" "$src" "$out"
      note="AAC ${BITRATE_BED}"
      ;;
    plate-*)
      if [ -n "$loop" ]; then
        out="$DEST/$name.wav"
        afconvert -f WAVE -d LEI16 "$src" "$out"
        note="WAV 16-bit (looping sting)"
      else
        out="$DEST/$name.m4a"
        afconvert -f m4af -d aac -b "$BITRATE_STING" "$src" "$out"
        note="AAC ${BITRATE_STING}"
      fi
      ;;
    *)
      printf "%-30s %s\n" "$name" "skipped (no rule; add one above)"
      continue
      ;;
  esac

  b=$(stat -f%z "$src"); a=$(stat -f%z "$out")
  before=$((before + b)); after=$((after + a)); count=$((count + 1))
  printf "%-30s %8sK -> %7sK  %s\n" "$name" "$((b/1024))" "$((a/1024))" "$note"
done

echo
printf "total: %sK -> %sK  (%s%% of masters) across %s files\n" \
  "$((before/1024))" "$((after/1024))" "$((after * 100 / before))" "$count"
echo
echo "Not produced here (no master, or a cut this script does not make):"
echo "  prompt-notification.mp3, confirmation.mp3  — delivered as shipped"
echo "  drip-single.wav                            — cut from drip.wav, sound doc section 10"
