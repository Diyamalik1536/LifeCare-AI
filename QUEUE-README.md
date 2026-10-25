# Appointment Queue (Patient <-> Doctor), no backend

Run each portal (npm install once, then npm run dev):
- Role    -> http://localhost:5173  (MUST be running: it hosts /bridge.html, the shared localStorage)
- Patient -> http://localhost:5174
- Doctor  -> http://localhost:5175

Flow: Patient books -> joins the end of that doctor's queue for the chosen date (token #N, status Pending)
-> Doctor sees it instantly on Schedule (pick the doctor in the header) -> Accept / Call In / Complete / Reject
-> Patient sees token, "N patients ahead", "You are next", "Your turn" live.
State: Redux (appointments.items) + localStorage, synced via Role/public/bridge.html (postMessage).
