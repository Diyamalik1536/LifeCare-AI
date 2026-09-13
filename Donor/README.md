# LifeCare AI — Blood Donation & Emergency Blood Management

Frontend-only module (React + Vite + plain CSS — no Tailwind, no CSS
frameworks). All data is mocked in `src/data/mockData.js` and held in React
state — there is no backend, API call, or database connection in this
codebase.

## Getting started

```bash
npm install
npm run dev
```

The app runs at **http://localhost:5173**.

## Structure

- `src/index.css` — global design tokens (CSS variables for every color,
  radius and shadow), the page reset, shared animations, and the shared
  modal/button/form-field classes reused by every popup in the app.
- `src/components/` — all UI building blocks (inventory cards, donor table,
  emergency request cards, modals, notifications, sidebar/navbar). Each
  `ComponentName.jsx` has its own `ComponentName.css` file next to it with
  only the styles specific to that component.
- `src/pages/BloodDonation.jsx` (+ `BloodDonation.css`) — assembles the full
  dashboard and owns all React state (inventory, donors, requests, modals,
  notifications).
- `src/data/mockData.js` — mock dataset plus `get*`/`create*` functions
  (`getDonors`, `createDonor`, `getBloodRequests`, `createBloodRequest`,
  `getBloodInventory`) written so they can be swapped for real API calls
  later without touching component code.
- `src/utils/donorMatching.js` — standalone AI match-scoring heuristic
  (blood compatibility, distance, availability, eligibility). Replace the
  internals with a real backend/AI call when ready; the exported function
  signatures (`scoreDonor`, `getRankedMatches`) can stay the same.

## Connecting the real backend later

Swap the bodies of `getDonors`, `createDonor`, `getBloodRequests`, and
`createBloodRequest` in `src/data/mockData.js` for `fetch`/`axios` calls to
your Express API, and swap `scoreDonor`/`getRankedMatches` in
`src/utils/donorMatching.js` for a call to your AI matching service.
