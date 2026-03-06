# TestingProject

## Study Progress Dashboard

A simple Python dashboard for tracking study progress based on user input.

### Planned Features

- **Session Logging** - Users input study sessions with subject, duration, and date
- **Progress Overview** - View total hours studied per subject and overall
- **Goal Tracking** - Set weekly/monthly study goals and track completion percentage
- **Streak Counter** - Track consecutive days of study activity
- **Summary Reports** - Display progress charts in the terminal using ASCII or a lightweight library

### Planned Tech Stack

- **Python 3.x** - Core language
- **SQLite** - Local storage for session data via the built-in `sqlite3` module
- **Rich** or **Textual** - Terminal UI for a clean, readable dashboard
- **Matplotlib** (optional) - For generating progress charts

### Planned Project Structure

```
study-dashboard/
├── main.py           # Entry point, menu/navigation
├── db.py             # Database setup and queries
├── tracker.py        # Logic for logging and retrieving sessions
├── dashboard.py      # UI rendering and display
├── goals.py          # Goal setting and progress calculation
└── data/
    └── study.db      # SQLite database (auto-created on first run)
```

### Planned User Flow

1. User launches the app via `python main.py`
2. Main menu presents options: Log Session, View Dashboard, Set Goals, View Report
3. User inputs subject name, duration (in minutes), and optional notes
4. Dashboard updates to reflect the new session
5. Progress bars and summaries are displayed per subject and in aggregate

### Milestones

- [ ] Set up SQLite schema and basic CRUD operations
- [ ] Build session input form (CLI prompts)
- [ ] Implement dashboard view with subject summaries
- [ ] Add goal-setting and progress tracking
- [ ] Add streak detection
- [ ] (Optional) Export progress report to CSV or PDF
