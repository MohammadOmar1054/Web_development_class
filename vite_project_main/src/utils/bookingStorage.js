export const BOOKINGS_STORAGE_KEY = "ipl-ticket-bookings";
export const DRAFT_BOOKING_STORAGE_KEY = "ipl-booking-draft";

function readJson(storage, key, fallback) {
  try {
    const value = storage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch (error) {
    console.error(`Unable to read ${key} from browser storage.`, error);
    return fallback;
  }
}

export function getSavedBookings() {
  const bookings = readJson(window.localStorage, BOOKINGS_STORAGE_KEY, []);
  return Array.isArray(bookings) ? bookings : [];
}

export function saveBooking(booking) {
  const bookings = [booking, ...getSavedBookings()];
  window.localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(bookings));
  return bookings;
}

export function getBookingDraft() {
  return readJson(window.sessionStorage, DRAFT_BOOKING_STORAGE_KEY, null);
}

export function saveBookingDraft(draft) {
  window.sessionStorage.setItem(DRAFT_BOOKING_STORAGE_KEY, JSON.stringify(draft));
}

export function clearBookingDraft() {
  window.sessionStorage.removeItem(DRAFT_BOOKING_STORAGE_KEY);
}
