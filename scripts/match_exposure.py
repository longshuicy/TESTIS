#!/usr/bin/env python3
"""
Bring Chapter II's exposure into Chapter I's range, without touching the palette.

Chapter II came out of the generator far brighter than Chapter I: its scenes sat
around 0.09-0.59 mean luminance where Chapter I's sit at 0.02-0.08. Light art
under light prose does not work, and the fix has to keep the four-anchor palette
that unify_colors.py applies or the two chapters stop matching.

So this runs BEFORE unify_colors.py and only moves luminance:

    per-image black point  ->  unify_colors.py (palette)  ->  optimize_images.sh

Order matters. Darkening first means a crushed midtone lands on the *dark* end
of the anchor ramp and a highlight still lands on the light end, so the result
is near-black with navy mid-tones and small bright highlights -- which is what
Chapter I looks like. Darkening afterwards would instead dim the anchors
themselves, flattening exactly the highlights that give Chapter I its lit
surfaces.

The black point is solved per image against the *composed* transform (the lift,
then the anchor curve), so the number quoted here is the mean the file will
actually have after unify_colors runs. ANCHORS is imported from unify_colors rather than
copied, so the palette has one definition.

Relative order is preserved rather than every image being snapped to one value:
source means are rank-mapped into a target band, so a dim bar stays dimmer than
a bright street. Chapter I varies too; the point is to match its envelope, not
to flatten Chapter II.

Usage:  python3 match_exposure.py <src_dir> <dst_dir>
"""

import os
import sys
import importlib.util

import numpy as np
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))

# Import the palette from unify_colors so the anchor curve is never duplicated.
_spec = importlib.util.spec_from_file_location("unify_colors", os.path.join(HERE, "unify_colors.py"))
_uc = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(_uc)
ANCHORS = _uc.ANCHORS

# Chapter I's shipped envelope, measured: scenes+endings 0.020-0.084 (median
# 0.063), objects 0.029-0.187 (median 0.072). Backgrounds carry prose and get
# the tighter, darker band; objects appear in the examine panel over their own
# scrim and can hold a little more light.
BANDS = {
    "wide":   (0.030, 0.078),
    "object": (0.035, 0.090),
}

_STOPS = np.array([a[0] for a in ANCHORS], dtype=np.float64)
_COLS = np.array([a[1] for a in ANCHORS], dtype=np.float64)
# Luminance each anchor colour actually has, i.e. the curve unify_colors applies.
_ANCHOR_LUM = 0.2126 * _COLS[:, 0] + 0.7152 * _COLS[:, 1] + 0.0722 * _COLS[:, 2]


def role(name):
    return "object" if name.startswith("obj-") else "wide"


def lum(arr):
    return 0.2126 * arr[..., 0] + 0.7152 * arr[..., 1] + 0.0722 * arr[..., 2]


def lift_black(x, black):
    """Raise the black point, keeping white at white.

    A plain gamma was the obvious way to darken and the wrong one: it pulls the
    linework down along with the ground, so the image gets dark and *flat*
    (measured: Chapter II fell to sd 0.04 against Chapter I's 0.08-0.13). This
    instead crushes the murky low end to true black and leaves the bright end
    where it is, which is how Chapter I reads -- near-black ground, linework
    still bright. Contrast goes up while the mean comes down.
    """
    b = black * 255.0
    return np.clip((x - b) / max(255.0 - b, 1e-6), 0.0, 1.0) * 255.0


def composed_mean(rgb, black):
    """Mean luminance after the black lift and then the anchor curve."""
    L = lum(lift_black(rgb, black))
    return float(np.interp(L, _STOPS, _ANCHOR_LUM).mean() / 255.0)


def solve_black(rgb, target, lo=0.0, hi=0.97):
    """Bisect for the black point whose composed mean hits `target`."""
    for _ in range(50):
        mid = (lo + hi) / 2.0
        if composed_mean(rgb, mid) > target:
            lo = mid          # still too bright, crush harder
        else:
            hi = mid
    return (lo + hi) / 2.0


def main():
    if len(sys.argv) < 3:
        print(__doc__.strip().splitlines()[-1]); sys.exit(1)
    src, dst = sys.argv[1], sys.argv[2]
    os.makedirs(dst, exist_ok=True)

    files = sorted(f for f in os.listdir(src) if f.lower().endswith(".png"))
    if not files:
        print(f"error: no PNGs in {src}"); sys.exit(1)

    # Pass 1: measure, so the band mapping can preserve relative order.
    stats = {}
    for f in files:
        a = np.asarray(Image.open(os.path.join(src, f)).convert("RGB"), dtype=np.float64)
        L = lum(a)
        stats[f] = (L.mean() / 255.0, role(f))

    # Pass 2: rank-map each role group into its band, solve gamma, write.
    for grp, (t_lo, t_hi) in BANDS.items():
        grp_files = [f for f in files if stats[f][1] == grp]
        if not grp_files:
            continue
        means = [stats[f][0] for f in grp_files]
        s_lo, s_hi = min(means), max(means)
        span = (s_hi - s_lo) or 1.0

        for f in sorted(grp_files, key=lambda x: stats[x][0]):
            src_mean = stats[f][0]
            target = t_lo + (src_mean - s_lo) / span * (t_hi - t_lo)

            arr = np.asarray(Image.open(os.path.join(src, f)).convert("RGBA"), dtype=np.float64)

            black = solve_black(arr[..., :3], target)
            out = arr.copy()
            out[..., :3] = lift_black(arr[..., :3], black)
            Image.fromarray(np.clip(out, 0, 255).astype(np.uint8)).save(os.path.join(dst, f))

            print(f"  {f:<28} {src_mean:.3f} -> {target:.3f} (black point {black:.3f})")


if __name__ == "__main__":
    main()
