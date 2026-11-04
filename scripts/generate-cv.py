#!/usr/bin/env python3
"""Generate Mats' first CV using confirmed facts only.

Run from any working directory: python3 scripts/generate-cv.py
Requires PyMuPDF (``import fitz``), already available in the cloud environment.
This is an optional document-generation helper; the website has no Python dependency.
"""

from pathlib import Path

import fitz


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public" / "documents" / "cv-mats-de-roon.pdf"


def rgb(value: str) -> tuple[float, float, float]:
    return tuple(int(value[i : i + 2], 16) / 255 for i in (1, 3, 5))


PAPER = rgb("#f6f5f0")
INK = rgb("#242723")
ORANGE = rgb("#ed642e")
MUTED = rgb("#66695f")
RULE = rgb("#d6d7ce")


def generate() -> None:
    document = fitz.open()
    page = document.new_page(width=595.28, height=841.89)
    page.draw_rect(page.rect, color=None, fill=PAPER)
    # Embed PyMuPDF's bundled fonts to retain Unicode punctuation in the PDF.
    page.insert_font(fontname="CVRegular", fontbuffer=fitz.Font("helv").buffer)
    page.insert_font(fontname="CVBold", fontbuffer=fitz.Font("hebo").buffer)

    def text(x, y, content, size=11, bold=False, color=INK):
        page.insert_text(
            (x, y), content, fontsize=size,
            fontname="CVBold" if bold else "CVRegular", color=color,
        )

    def paragraph(x, y, width, height, content, size=11, color=INK):
        remaining = page.insert_textbox(
            fitz.Rect(x, y, x + width, y + height), content,
            fontname="CVRegular", fontsize=size, lineheight=1.55, color=color,
        )
        if remaining < 0:
            raise ValueError(f"Text does not fit its CV layout: {content!r}")

    # Masthead: a quiet identity mark and a clear version label.
    text(48, 56, "MDR", size=13, bold=True)
    page.draw_circle((83, 51.5), 3.5, fill=ORANGE, color=None)
    text(366, 55, "CURRICULUM VITAE", size=9, bold=True, color=MUTED)
    page.draw_line((48, 77), (547, 77), color=RULE, width=0.7)

    text(48, 111, "Eerste versie · november 2026", size=9, color=MUTED)
    text(45, 168, "Mats de Roon", size=47, bold=True)
    text(48, 201, "Student ondernemerschap", size=18)
    text(48, 224, "Hogeschool Rotterdam · 18 jaar", size=11, color=MUTED)
    page.draw_line((48, 245), (104, 245), color=ORANGE, width=4)

    text(48, 279, "01", size=10, bold=True, color=ORANGE)
    text(88, 279, "PROFIEL", size=10, bold=True)
    paragraph(
        88, 295, 448, 53,
        "Eerstejaars student met de ambitie om een eigen bedrijf te starten, "
        "het liefst met de verkoop van een product. Welk product dat wordt, "
        "wil ik tijdens mijn studie ontdekken. Ik heb bij "
        "de BT-servicedesk van Facilicom gewerkt.",
        size=10.5,
    )

    page.draw_line((48, 357), (547, 357), color=RULE, width=0.7)
    text(48, 382, "02", size=10, bold=True, color=ORANGE)
    text(88, 382, "WERKERVARING", size=10, bold=True)
    text(88, 409, "Facilicom", size=16, bold=True)
    text(88, 430, "BT-servicedesk", size=10, color=MUTED)
    paragraph(
        88, 446, 448, 68,
        "Telefonisch mensen helpen bij computerproblemen. Aan de balie "
        "ondersteuning bieden bij problemen met laptops, telefoons en "
        "andere apparatuur. Nieuwe apparatuur uitgeven, inwisselen "
        "en innemen.",
        size=10.5,
    )
    text(88, 519, "IT-ondersteuning  /  Klantcontact  /  Apparatuuruitgifte", size=9.5, color=MUTED)

    page.draw_line((48, 541), (547, 541), color=RULE, width=0.7)
    text(48, 566, "03", size=10, bold=True, color=ORANGE)
    text(88, 566, "OPLEIDING", size=10, bold=True)
    text(88, 593, "Hogeschool Rotterdam", size=15, bold=True)
    text(88, 615, "HBO Ondernemerschap & Retail Management", size=10.5)
    text(88, 636, "Studiejaar 2026–2027 · Jaar 1", size=10, color=MUTED)

    page.draw_line((48, 658), (547, 658), color=RULE, width=0.7)
    text(48, 683, "04", size=10, bold=True, color=ORANGE)
    text(88, 683, "INTERESSES", size=10, bold=True)
    paragraph(
        88, 700, 448, 46,
        "Sporten en gymmen · Voetballen · Piano spelen\n"
        "Tijd met familie en vrienden · Af en toe samen gamen",
        size=10.5,
    )

    page.draw_line((48, 770), (547, 770), color=RULE, width=0.7)
    text(48, 794, "Mats de Roon", size=9, bold=True)
    text(361, 794, "Contactgegevens worden nog toegevoegd.", size=8.5, color=MUTED)

    document.set_metadata({
        "title": "CV · Mats de Roon",
        "author": "Mats de Roon",
        "subject": "Eerste versie · november 2026",
        "creator": "Portfolio document generator · PyMuPDF",
        "keywords": "CV, Mats de Roon, Hogeschool Rotterdam, Talentontwikkeling",
        "creationDate": "D:20261104000000Z",
        "modDate": "D:20261104000000Z",
    })
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    document.save(OUTPUT, garbage=4, deflate=True)
    document.close()
    print(f"Generated {OUTPUT.relative_to(ROOT)}")


if __name__ == "__main__":
    generate()
