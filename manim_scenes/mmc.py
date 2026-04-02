from __future__ import annotations

import numpy as np
from manim import BLACK, Create, FadeOut, Scene, Text, VMobject, Write, linear
from manim.mobject.text.text_mobject import register_font


FONT_FILE = "assets/fonts/Caveat-Medium.ttf"
FONT_NAME = "Caveat"
INK = "#F7F3EA"
NOTE_INK = "#D7E0F0"

STEPS = [
    ("12, 18, 30", "2", "da por 2"),
    (" 6,  9, 15", "2", "da por 2"),
    (" 3,  9, 15", "3", "da por 3"),
    (" 1,  3,  5", "3", "da por 3"),
    (" 1,  1,  5", "5", "da por 5"),
    (" 1,  1,  1", None, None),
]
FOOTER = "2^2 · 3^2 · 5 = 180"
FINAL_NOTE = "agora, basta\ncalcular o produto\ndas potencias"


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

        divider_x = 1.18
        left_anchor_x = divider_x - 0.12
        right_anchor_x = divider_x + 0.16
        note_anchor_x = divider_x + 1.35
        top_y = 2.9
        row_gap = 0.8
        font_size = 88
        note_font_size = 42

        with register_font(FONT_FILE):
            left_rows: list[Text] = []
            right_rows: list[Text] = []
            notes: list[Text | None] = []

            for row_index, (left_text, right_text, note_text) in enumerate(STEPS):
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

                if note_text is None:
                    notes.append(None)
                    continue

                note = Text(
                    note_text,
                    font=FONT_NAME,
                    font_size=note_font_size,
                    color=NOTE_INK,
                )
                note.move_to(
                    np.array([note_anchor_x + note.width / 2, y + 0.03, 0.0]),
                )
                notes.append(note)

            footer_y = top_y - (len(STEPS) - 1) * row_gap - 1.08
            footer = Text(
                FOOTER,
                font=FONT_NAME,
                font_size=82,
                color=INK,
            )
            footer.move_to(
                np.array(
                    [divider_x + 0.2 + footer.width / 2, footer_y, 0.0],
                ),
            )

            final_note = Text(
                FINAL_NOTE,
                font=FONT_NAME,
                font_size=36,
                color=NOTE_INK,
                line_spacing=0.72,
            )
            final_note.move_to(
                np.array(
                    [note_anchor_x + final_note.width / 2, footer_y + 1.45, 0.0],
                ),
            )

        vertical_line = scribble_line(
            np.array([divider_x, top_y + 0.42, 0.0]),
            np.array([divider_x, footer_y - 0.48, 0.0]),
        )
        horizontal_line = scribble_line(
            np.array([divider_x - 0.02, footer_y + 0.55, 0.0]),
            np.array([footer.get_right()[0] + 0.24, footer_y + 0.55, 0.0]),
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
        active_note = notes[0]
        self.play(
            Write(active_note, rate_func=linear),
            run_time=0.45,
        )

        for row_index, row in enumerate(left_rows[1:], start=1):
            self.play(Write(row, rate_func=linear), run_time=0.9)

            if row_index >= len(right_rows):
                continue

            self.play(
                Write(right_rows[row_index], rate_func=linear),
                run_time=0.45,
            )

            if notes[row_index] is not None:
                self.play(
                    FadeOut(active_note, rate_func=linear),
                    Write(notes[row_index], rate_func=linear),
                    run_time=0.4,
                )
                active_note = notes[row_index]

        self.play(
            FadeOut(active_note, rate_func=linear),
            run_time=0.25,
        )

        self.play(
            Create(horizontal_line, rate_func=linear),
            run_time=0.7,
        )
        self.play(
            Write(footer, rate_func=linear),
            run_time=1.8,
        )
        self.play(
            Write(final_note, rate_func=linear),
            run_time=1.4,
        )
        self.wait(1.2)
