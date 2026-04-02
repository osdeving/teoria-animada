from __future__ import annotations

import numpy as np
from manim import BLACK, Create, Scene, Text, VMobject, Write, linear
from manim.mobject.text.text_mobject import register_font


FONT_FILE = "assets/fonts/Caveat-Medium.ttf"
FONT_NAME = "Caveat"
INK = "#F7F3EA"

ROWS = [
    ("12, 18, 30", "2"),
    (" 6,  9, 15", "2"),
    (" 3,  9, 15", "3"),
    (" 1,  3,  5", "3"),
    (" 1,  1,  5", "5"),
    (" 1,  1,  1", None),
]
FOOTER = "2 · 2 · 3 · 3 · 5 = 180"


def scribble_line(start: np.ndarray, end: np.ndarray, *, width: float = 6) -> VMobject:
    direction = end - start
    length = np.linalg.norm(direction)
    unit = direction / length
    perpendicular = np.array([-unit[1], unit[0], 0.0])

    points = []
    segments = 8
    for index in range(segments + 1):
        alpha = index / segments
        point = start + direction * alpha
        if 0 < index < segments:
            wiggle = 0.06 * np.sin(alpha * np.pi * 3.2)
            point = point + perpendicular * wiggle
        points.append(point)

    line = VMobject()
    line.set_points_smoothly(points)
    line.set_stroke(INK, width=width)
    return line


class LeastCommonMultipleScene(Scene):
    def construct(self) -> None:
        self.camera.background_color = BLACK

        divider_x = 2.25
        left_anchor_x = divider_x - 0.08
        right_anchor_x = divider_x + 0.18
        top_y = 2.75
        row_gap = 0.94
        font_size = 110

        with register_font(FONT_FILE):
            left_rows: list[Text] = []
            right_rows: list[Text] = []

            for row_index, (left_text, right_text) in enumerate(ROWS):
                y = top_y - row_index * row_gap

                left = Text(left_text, font=FONT_NAME, font_size=font_size, color=INK)
                left.move_to(
                    np.array([left_anchor_x - left.width / 2, y, 0.0]),
                )
                left_rows.append(left)

                if right_text is None:
                    continue

                right = Text(
                    right_text,
                    font=FONT_NAME,
                    font_size=font_size,
                    color=INK,
                )
                right.move_to(
                    np.array([right_anchor_x + right.width / 2, y, 0.0]),
                )
                right_rows.append(right)

            footer_y = top_y - (len(ROWS) - 1) * row_gap - 1.35
            footer = Text(
                FOOTER,
                font=FONT_NAME,
                font_size=104,
                color=INK,
            )
            footer.move_to(
                np.array(
                    [right_anchor_x + footer.width / 2 - 0.05, footer_y, 0.0],
                ),
            )

        vertical_line = scribble_line(
            np.array([divider_x, top_y + 0.52, 0.0]),
            np.array([divider_x, footer_y - 0.55, 0.0]),
        )
        horizontal_line = scribble_line(
            np.array([divider_x - 0.02, footer_y + 0.7, 0.0]),
            np.array([footer.get_right()[0] + 0.28, footer_y + 0.7, 0.0]),
        )

        self.play(
            Write(left_rows[0], rate_func=linear),
            run_time=1.4,
        )
        self.play(
            Create(vertical_line, rate_func=linear),
            run_time=0.7,
        )
        self.play(
            Write(right_rows[0], rate_func=linear),
            run_time=0.55,
        )

        for row_index, row in enumerate(left_rows[1:], start=1):
            self.play(Write(row, rate_func=linear), run_time=0.9)

            if row_index >= len(right_rows):
                continue

            self.play(
                Write(right_rows[row_index], rate_func=linear),
                run_time=0.45,
            )

        self.play(
            Create(horizontal_line, rate_func=linear),
            run_time=0.7,
        )
        self.play(
            Write(footer, rate_func=linear),
            run_time=1.8,
        )
        self.wait(1.2)
