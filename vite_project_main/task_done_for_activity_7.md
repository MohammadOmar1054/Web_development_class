# Activity 7: Client-Side Booking State with Browser Storage

## Features implemented

- Completed bookings are saved in `localStorage`, so they remain available after a page refresh or browser restart.
- Saved bookings are loaded automatically on the **My Ticket Bookings** page.
- The booking history is displayed in a table containing:
  - Match
  - Date
  - Stand
  - Number of tickets
  - Total amount
- In-progress booking form values are saved in `sessionStorage`.
- Refreshing the booking page restores the current name, email, phone, ticket count, match, and stand selections.
- The temporary session draft is cleared after a successful booking.
- Added safe browser-storage reading with console error reporting when stored JSON is invalid.

## Files changed

### `src/utils/bookingStorage.js`

Added shared helper functions for reading, writing, and clearing booking data in `localStorage` and `sessionStorage`.

### `src/pages/Booking.jsx`

- Restores an unfinished booking from `sessionStorage` when the page opens.
- Saves form changes as an in-progress session draft.
- Creates a complete booking record after validation succeeds.
- Saves completed records to `localStorage`.
- Clears the temporary draft after successful booking.

### `src/pages/BookingHistory.jsx`

- Loads completed bookings from `localStorage` when the page opens.
- Displays saved records in the **My Ticket Bookings** table.
- Shows an empty-state message when no bookings have been saved.

### `src/App.css`

Added responsive styling for the persisted booking table, including horizontal scrolling on small screens.

## How to test persisted bookings

1. Start the project:

   ```powershell
   npm run dev
   ```

2. Open `http://localhost:5173/booking`.
3. Enter valid details:
   - Name: `Student One`
   - Email: `student@example.com`
   - Phone: `9876543210`
   - Tickets: `2`
   - Select a match and stand.
4. Click **Book Ticket** and dismiss the success message.
5. Open **History** from the navigation bar.
6. Confirm the booking appears in the **My Ticket Bookings** table.
7. Refresh the browser using `Ctrl + R`.
8. The same booking should still be visible.
9. Take a screenshot showing the table after the refresh. This is the evidence for persisted `localStorage` data.

## Browser Developer Tools evidence

To show the stored data:

1. Open Developer Tools with `F12` or `Ctrl + Shift + I`.
2. Open the **Application** tab.
3. Expand **Local Storage** and select the project URL.
4. Find the key `ipl-ticket-bookings`.
5. Open **Session Storage** and select the project URL to find `ipl-booking-draft` while a booking is incomplete.
6. Use the **Console** tab to inspect storage values if needed:

   ```javascript
   JSON.parse(localStorage.getItem("ipl-ticket-bookings"))
   JSON.parse(sessionStorage.getItem("ipl-booking-draft"))
   ```

## Verification

- `npm run lint` passed.
- `npm run build` passed.
