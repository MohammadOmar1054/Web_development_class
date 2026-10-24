# Activity 5: Dynamic Booking Experience

## Files changed

### `src/pages/Booking.jsx`

The booking page now updates immediately whenever the user changes the number of tickets, match, or stand:

- Added a match selector with two upcoming matches. The selected match also supplies its venue and date.
- Added three stand categories: General, Premium, and VIP.
- Added a price for each stand category and used that price to calculate the total ticket amount.
- Added a live **Booking Summary** showing the name, match, venue, stand, ticket price, number of tickets, and total amount.
- Added stand-specific information below the summary. It shows a short description and the price for the selected stand.
- Kept the existing form validation and booking confirmation alert.

For example, choosing the VIP Stand and 3 tickets displays a ticket price of ₹2,000 and a total amount of ₹6,000.

### `src/App.css`

Added styling for the total amount in the booking summary and for the new stand information panel. The panel is visually separated from the summary so that the selected stand's details are easy to read.

## Result

The booking summary is now dynamic instead of waiting for the user to submit the form. This gives the user immediate feedback about the price before booking.
