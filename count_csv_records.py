#!/usr/bin/env python3
"""Count records in a CSV file."""

import argparse
import csv
import sys


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Count records in a CSV file.",
    )
    parser.add_argument("csv_path", help="Path to the CSV file")
    parser.add_argument(
        "--has-header",
        action="store_true",
        help="Skip the first row when counting records",
    )
    return parser.parse_args()


def main() -> int:
    args = parse_args()

    try:
        with open(args.csv_path, newline="", encoding="utf-8") as handle:
            reader = csv.reader(handle)
            count = 0
            for row in reader:
                if not row and not count:
                    # Empty file or leading blank line; continue counting other rows.
                    continue
                count += 1

        if args.has_header and count:
            count -= 1

        print(count)
        return 0
    except FileNotFoundError:
        print(f"error: file not found: {args.csv_path}", file=sys.stderr)
        return 1
    except PermissionError:
        print(f"error: permission denied: {args.csv_path}", file=sys.stderr)
        return 1
    except csv.Error as exc:
        print(f"error: invalid CSV: {exc}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
