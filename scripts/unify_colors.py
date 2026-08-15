#!/usr/bin/env python3
"""
Remap every PNG in assets/ to a smooth gradient built from 4 anchor colors,
and write the results to assets_unified/.

Instead of hard luminance cutoffs (which caused speckly noise wherever the
source had subtle grain/dither), each pixel is placed on a continuous
gradient between the 4 anchor colors by luminance, then linearly
interpolated between whichever two anchors it falls between. This keeps
transitions smooth while still reading, to the eye, as those 4 colors.

Anchors (evenly spaced across the 0-255 luminance range):
  0    -> #000000  darkest / pure black
  85   -> #1a2230  dark midtone (dark desaturated navy)
  170  -> #6a80a1  mid steel blue (existing accent tone from the originals)
  255  -> #ffffff  highlight / true white

Usage:
    python3 unify_colors.py [source_dir] [dest_dir]
Defaults: source_dir=assets, dest_dir=assets_unified
"""

import os
import sys
import numpy as np
from PIL import Image

# --- anchor colors + the luminance stop each one sits at ---------------
ANCHORS = [
    (0,   (0, 0, 0)),         # darkest / pure black
    (85,  (26, 34, 48)),      # dark midtone (dark desaturated navy)
    (170, (106, 128, 161)),   # mid steel blue (#6a80a1)
    (255, (255, 255, 255)),   # highlight / true white
]


def luminance(rgb):
    # rgb: (..., 3) float array in 0-255
    r, g, b = rgb[..., 0], rgb[..., 1], rgb[..., 2]
    return 0.2126 * r + 0.7152 * g + 0.0722 * b


def remap_image(img: Image.Image) -> Image.Image:
    rgba = img.convert("RGBA")
    arr = np.array(rgba).astype(np.float32)
    rgb = arr[..., :3]
    alpha = arr[..., 3]

    lum = luminance(rgb)

    stops = np.array([a[0] for a in ANCHORS], dtype=np.float32)
    colors = np.array([a[1] for a in ANCHORS], dtype=np.float32)

    # Interpolate each channel independently along the luminance axis so
    # every pixel gets a smooth blend between its two nearest anchors.
    out_rgb = np.stack(
        [np.interp(lum, stops, colors[:, c]) for c in range(3)],
        axis=-1,
    )

    out = np.dstack([out_rgb, alpha]).astype(np.uint8)
    return Image.fromarray(out)


def main():
    src = sys.argv[1] if len(sys.argv) > 1 else "assets"
    dst = sys.argv[2] if len(sys.argv) > 2 else "assets_unified"

    os.makedirs(dst, exist_ok=True)

    files = sorted(f for f in os.listdir(src) if f.lower().endswith(".png"))
    if not files:
        print(f"No PNG files found in {src}")
        return

    for fname in files:
        src_path = os.path.join(src, fname)
        dst_path = os.path.join(dst, fname)
        img = Image.open(src_path)
        remapped = remap_image(img)
        remapped.save(dst_path)
        print(f"{fname} -> {dst_path}")

    print(f"\nDone. {len(files)} images written to {dst}/")


if __name__ == "__main__":
    main()
