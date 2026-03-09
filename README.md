# TestingProject

## Plan: Study Progress Dashboard (Python)

Build a simple dashboard that tracks study progress based on user input.

### 1. Goals
- Let users log study sessions (date, subject, duration, notes).
- Show progress summaries (daily/weekly totals, streaks, subject breakdown).
- Keep setup simple so the app can run locally with minimal dependencies.

### 2. Tech Stack
- Python 3.11+
- Streamlit for the dashboard UI
- Pandas for data processing
- SQLite (or CSV for v1) for persistence
- Matplotlib/Plotly for simple charts

### 3. Core Features (v1)
- Input form:
  - Subject
  - Minutes studied
  - Date
  - Optional notes
- Data storage:
  - Save each session entry persistently.
- Dashboard views:
  - Total study time this week
  - Study time trend by day
  - Time by subject
  - Current and longest study streak
- Basic data validation:
  - Prevent negative/empty duration values.

### 4. Build Steps
1. Initialize project structure (`app.py`, `data/`, `requirements.txt`).
2. Implement data model and storage layer.
3. Build Streamlit input form for session logging.
4. Add summary metrics and charts.
5. Add streak calculation logic.
6. Test with sample inputs and edge cases.
7. Document run instructions and next enhancements.

### 5. Suggested File Structure
```text
.
├── README.md
├── requirements.txt
├── app.py
├── data/
│   └── study_sessions.db
└── src/
    ├── storage.py
    ├── metrics.py
    └── charts.py
```

### 6. Future Enhancements
- User profiles and authentication
- Goal setting (e.g., 10 hours/week target)
- Export reports to CSV/PDF
- Reminder notifications
