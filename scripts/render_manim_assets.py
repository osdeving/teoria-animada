from __future__ import annotations

import shutil
import subprocess
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
MEDIA_DIR = ROOT / "tmp" / "manim-media"

SCENES = {
    "mmc": {
        "file": ROOT / "manim_scenes" / "mmc.py",
        "output": ROOT / "public" / "manim" / "mmc" / "scene.mp4",
        "scene_name": "LeastCommonMultipleScene",
    },
}


def render_asset(slug: str) -> None:
    if slug not in SCENES:
        available = ", ".join(sorted(SCENES))
        raise SystemExit(f"Unknown scene '{slug}'. Available: {available}")

    scene = SCENES[slug]
    output_path = scene["output"]
    output_path.parent.mkdir(parents=True, exist_ok=True)

    MEDIA_DIR.mkdir(parents=True, exist_ok=True)

    command = [
        sys.executable,
        "-m",
        "manim",
        "render",
        "--format",
        "mp4",
        "--media_dir",
        str(MEDIA_DIR),
        "--output_file",
        "scene.mp4",
        "--progress_bar",
        "display",
        "-qm",
        str(scene["file"]),
        scene["scene_name"],
    ]

    subprocess.run(command, check=True, cwd=ROOT)

    matches = list(MEDIA_DIR.rglob("scene.mp4"))
    if not matches:
        raise FileNotFoundError("Manim render finished but scene.mp4 was not found.")

    rendered_file = max(matches, key=lambda path: path.stat().st_mtime)
    shutil.copy2(rendered_file, output_path)
    print(f"Rendered {slug} -> {output_path.relative_to(ROOT)}")


def main() -> None:
    requested = sys.argv[1:] or ["mmc"]
    for slug in requested:
        render_asset(slug)


if __name__ == "__main__":
    main()
