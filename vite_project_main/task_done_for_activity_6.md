# Activity 6: Client-Side Booking Form Validation

## Files changed

### `src/pages/Booking.jsx`

Improved the booking form validation:

- Added required email and phone number fields.
- Added validation for all mandatory fields:
  - Name
  - Email
  - Phone number
  - Number of tickets
  - Match
  - Stand
- Added an email Regular Expression (Regex) to check email format.
- Added a phone number Regex and digit-length check.
- Replaced the previous general alert validation with inline field-specific error messages.
- Added red highlighting for invalid inputs and select fields.
- Added accessible `aria-invalid` and `aria-describedby` attributes to invalid fields.
- Added automatic error removal when the user corrects a field.
- Kept the successful booking confirmation alert for valid submissions.

### `src/App.css`

Added styling for:

- Invalid form fields with a red border and light red background.
- Inline validation messages in red.
- Focus styling for invalid fields.

## How to test the validation

Run the project with:

```powershell
npm run dev
```

Open `http://localhost:5173/booking` in a browser and click **Book Ticket** without completing the form. Inline validation messages will be displayed.

To demonstrate the Regex validation, enter an invalid email such as `student@` and an invalid phone number such as `123`. Correct them with values such as `student@example.com` and `9876543210`; the error messages disappear automatically.

## Verification

- `npm run lint` passed.
- `npm run build` passed.
- Git commit: `21b10bc Add booking form validation`

## Result

The booking form now validates user input on the client side before submission, clearly identifies invalid fields, and gives immediate feedback when errors are corrected.
