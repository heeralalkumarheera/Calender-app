# Wall Calendar Component

A responsive React wall-calendar component with a visual hero panel, interactive date-range selection, and integrated notes.

## Features

- Wall calendar aesthetic with a dedicated monthly hero image panel
- Day range selector with clear states:
  - Start date
  - End date
  - In-between days
- Integrated notes section:
  - Monthly memo note
  - Note for the selected date/range
- Client-side persistence via localStorage (no backend required)
- Responsive behavior for desktop and mobile layouts

## Tech Stack

- React 18
- date-fns
- CSS (custom, no UI framework)

## Run Locally

1. Install dependencies:

```bash
npm install
```

2. Start the app:

```bash
npm start
```

3. Open:

```text
http://localhost:3000
```

## UX Notes

- Click one day to set a range start.
- Click a second day (same day or later) to set the range end.
- Click another day after a completed range to start a new range.
- Use the Clear Range button to reset selection.
- Use Today to jump to current month and set current day as selection.

## Persistence

- Monthly memo: saved per month
- Range notes: saved per date-range key

All data is stored in browser localStorage.

## Submission Links

- Repository: ADD_YOUR_REPO_LINK
- Video demonstration (required): ADD_VIDEO_LINK
- Live demo (optional): ADD_DEPLOYED_LINK

## Evaluation Scope

This project is strictly frontend and intentionally avoids backend/API/database integrations.
