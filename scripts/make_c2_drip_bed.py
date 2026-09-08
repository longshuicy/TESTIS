#!/usr/bin/env python3
"""
Cut Chapter II's bed out of the original drip recording.

Chapter II has no music. Its bed is the water itself: one drip loop running
continuously under the whole chapter (sound doc, Chapter II beds).

`drip.wav` is 87s of regularly spaced drips at ~1.323s intervals, 24-bit stereo,
25MB -- far too big to ship and pointless to ship whole, since the loop only
needs a few intervals. This cuts a seamless loop from it:

  * a whole number of drip intervals, so the spacing across the loop point is
    the same as the spacing everywhere else and the repeat is not audible;
  * both cut points at the same phase inside the quiet gap between drips, where
    the noise floor is 0.002, then snapped to a zero crossing;
  * mono 16-bit, the same call `drip-single.wav` makes -- 24-bit WAV playback in
    <audio> is not reliable everywhere;
  * WAV rather than AAC, because an encoder's padding would put a gap at the
    loop point. Same exception `bed-scene-5.wav` and `drip-single.wav` take.

Idempotent: always cuts from assets_sound_src/drip.wav, never from its output.

Usage:  python3 scripts/make_c2_drip_bed.py
"""

import wave
import numpy as np

SRC = "assets_sound_src/drip.wav"
DST = "assets/sound/bed-c2-drip.wav"

INTERVALS = 9        # ~11.9s: long enough not to read as a loop, ~1.1MB
SKIP_DRIPS = 1       # the take opens 80ms in; start from the second drip
PRE_ROLL = 0.35      # lead-in inside the gap, applied identically at both ends
PEAK = 0.70          # headroom; playback level is set in audio.js, not here
FADE_MS = 2.0        # micro-fade against any DC step at the seam


def read_mono(path):
    with wave.open(path) as w:
        n, sr, ch, sw = w.getnframes(), w.getframerate(), w.getnchannels(), w.getsampwidth()
        raw = w.readframes(n)
    if sw == 3:
        b = np.frombuffer(raw, dtype=np.uint8).reshape(-1, 3)
        x = (b[:, 0].astype(np.int32)
             | (b[:, 1].astype(np.int32) << 8)
             | (b[:, 2].astype(np.int8).astype(np.int32) << 16)).astype(np.float64) / (2 ** 23)
    else:
        x = np.frombuffer(raw, dtype={2: np.int16, 4: np.int32}[sw]).astype(np.float64) / (2 ** (8 * sw - 1))
    return x.reshape(-1, ch).mean(axis=1), sr


def onsets_of(x, sr):
    win = int(sr * 0.005)
    env = np.sqrt(np.convolve(x ** 2, np.ones(win) / win, mode="same"))
    above = env > env.max() * 0.18
    raw = np.flatnonzero(np.diff(above.astype(np.int8)) == 1)
    keep = [raw[0]]
    for o in raw[1:]:
        if (o - keep[-1]) / sr > 0.25:
            keep.append(o)
    return np.array(keep)


def snap_zero(x, i, radius):
    """Nudge i to the nearest sign change, so the cut starts at ~0."""
    lo, hi = max(1, i - radius), min(len(x) - 1, i + radius)
    seg = x[lo:hi]
    z = np.flatnonzero(np.diff(np.signbit(seg)))
    return int(lo + z[np.argmin(np.abs(z - (i - lo)))]) if len(z) else i


def main():
    x, sr = read_mono(SRC)
    ons = onsets_of(x, sr)
    pre = int(PRE_ROLL * sr)

    a = snap_zero(x, ons[SKIP_DRIPS] - pre, int(0.01 * sr))
    b = snap_zero(x, ons[SKIP_DRIPS + INTERVALS] - pre, int(0.01 * sr))
    seg = x[a:b].copy()

    peak = np.abs(seg).max()
    if peak > 0:
        seg *= PEAK / peak

    f = int(FADE_MS / 1000.0 * sr)
    seg[:f] *= np.linspace(0, 1, f)
    seg[-f:] *= np.linspace(1, 0, f)

    pcm = np.clip(seg * 32767.0, -32768, 32767).astype(np.int16)
    with wave.open(DST, "wb") as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(sr)
        w.writeframes(pcm.tobytes())

    span = (b - a) / sr
    print(f"  {DST}")
    print(f"  {span:.3f}s  {INTERVALS} intervals ({span/INTERVALS:.3f}s apart)  "
          f"mono 16-bit {sr}Hz  {len(pcm)*2/1024:.0f}K")


if __name__ == "__main__":
    main()
