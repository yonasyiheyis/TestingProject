# TestingProject

## Plan: Simple Python Study Progress Dashboard

### Goal
Build a lightweight Python dashboard where a user can log study sessions and view progress over time.

### Core Features
- Add study entries from user input:
  - Date
  - Subject
  - Topic
  - Minutes studied
  - Optional notes
- View summary metrics:
  - Total study time
  - Study time by subject
  - Number of study sessions
  - Average daily study time
- Visualize trends:
  - Daily/weekly study minutes chart
  - Subject distribution chart
- Track progress against goals:
  - Daily or weekly minutes target
  - Progress percentage toward current goal

### Proposed Tech Stack
- Python 3.11+
- `streamlit` for a simple interactive dashboard UI
- `pandas` for data handling
- `plotly` (or `matplotlib`) for charts
- CSV file for initial storage (upgrade path to SQLite later)

### Data Design (Initial)
Single table/file `study_log` with:
- `id` (auto-generated)
- `date` (YYYY-MM-DD)
- `subject` (string)
- `topic` (string)
- `minutes` (integer)
- `notes` (string, optional)
- `created_at` (timestamp)

### Implementation Steps
1. Project setup:
   - Create virtual environment
   - Install dependencies
   - Add basic project structure
2. Data layer:
   - Implement read/write for CSV
   - Add validation for user input
3. Input form:
   - Build form to submit study sessions
   - Show success/error states
4. Dashboard views:
   - KPI summary cards
   - Time-series chart for study minutes
   - Subject breakdown chart
5. Goals and progress:
   - Let user set weekly goal
   - Compute progress and remaining minutes
6. Polish:
   - Add filters (date range, subject)
   - Improve layout and labels
   - Add basic tests for data functions

### Milestones
- Milestone 1: Capture and persist study entries
- Milestone 2: Display baseline summaries and charts
- Milestone 3: Add goal tracking and filters
- Milestone 4: Final cleanup and documentation

### Future Enhancements
- Authentication for multiple users
- SQLite/PostgreSQL backend
- Export reports (CSV/PDF)
- Reminder notifications for study targets
