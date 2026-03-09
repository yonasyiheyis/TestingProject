# TestingProject

## Planned Feature: Study Progress Dashboard

A simple Python dashboard for tracking study progress based on user input.

### Overview

A terminal or web-based dashboard that lets users log study sessions and visualize their progress over time.

### Planned Features

- **Session logging** — Users input the subject, duration, and optional notes for each study session
- **Progress tracking** — Cumulative time tracked per subject across sessions
- **Visualizations** — Charts showing daily/weekly study time and subject breakdowns
- **Goals** — Users can set target hours per subject and see progress toward those goals
- **History view** — Filterable log of past sessions

### Tech Stack

- **Python** — Core language
- **Tkinter or Streamlit** — UI (terminal-friendly or lightweight web dashboard)
- **SQLite** — Local storage for session data
- **Matplotlib or Plotly** — Charts and visualizations

### Data Model

Each study session will record:
- Subject/topic name
- Date and time
- Duration (minutes)
- Optional notes

### Getting Started (planned)

```bash
pip install -r requirements.txt
python dashboard.py
```

Users will be prompted to log a new session or view existing progress on launch.