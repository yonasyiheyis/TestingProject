# TestingProject

## Planned Feature: Study Progress Dashboard

A simple Python dashboard for tracking study progress based on user input.

### Overview

A lightweight, terminal-based (or simple web-based) dashboard where users can log their study sessions and visualize progress over time.

### Planned Features

- **Session logging** — Input study topic, duration, and date
- **Progress tracking** — Cumulative hours per subject over time
- **Goal setting** — Define weekly/monthly targets per topic
- **Summary view** — Display streaks, total hours, and completion rates
- **Data persistence** — Store entries in a local CSV or SQLite database

### Planned Tech Stack

- **Python 3.x**
- `rich` or `curses` for terminal UI (or `Flask`/`Dash` for a browser-based view)
- `sqlite3` or `csv` for local data storage
- `matplotlib` or `plotext` for progress charts

### Planned Project Structure

```
study_dashboard/
├── main.py          # Entry point
├── db.py            # Data storage and retrieval
├── ui.py            # Dashboard display logic
├── models.py        # Data models (session, goal)
└── data/
    └── progress.db  # Local SQLite database
```

### Usage (Planned)

```bash
# Log a study session
python main.py log --topic "Python" --duration 90

# View dashboard summary
python main.py dashboard

# Set a weekly goal
python main.py goal --topic "Python" --hours 5
```