#!/usr/bin/env python3
"""Convert pounds to kilograms."""

from __future__ import annotations

import sys

POUNDS_TO_KG = 0.45359237


def pounds_to_kg(pounds: float) -> float:
    return pounds * POUNDS_TO_KG


def _parse_input() -> float:
    if len(sys.argv) > 1:
        raw = sys.argv[1]
    else:
        raw = input("Enter weight in pounds: ").strip()

    try:
        return float(raw)
    except ValueError as exc:
        raise SystemExit(f"Invalid number: {raw}") from exc


def main() -> None:
    pounds = _parse_input()
    kilograms = pounds_to_kg(pounds)
    print(f"{pounds} lb = {kilograms:.3f} kg")


if __name__ == "__main__":
    main()
