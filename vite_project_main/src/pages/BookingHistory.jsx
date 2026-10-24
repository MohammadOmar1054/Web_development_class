import { useState } from "react";
import { motion } from "framer-motion";
import { getSavedBookings } from "../utils/bookingStorage";

function BookingHistory() {
  const [bookings] = useState(getSavedBookings);

  return (
    <main className="booking-page">
      <motion.div
        className="booking-details"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >
        <p className="eyebrow">YOUR TICKETS</p>
        <h1>My Ticket Bookings</h1>
        {bookings.length === 0 ? (
          <p>Your confirmed bookings will appear here.</p>
        ) : (
          <div className="booking-table-wrapper">
            <table className="booking-table">
              <thead>
                <tr>
                  <th>Match</th>
                  <th>Date</th>
                  <th>Stand</th>
                  <th>Tickets</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.id}>
                    <td>{booking.match}</td>
                    <td>{booking.date}</td>
                    <td>{booking.stand}</td>
                    <td>{booking.tickets}</td>
                    <td>{currency.format(booking.totalAmount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </main>
  );
}

const currency = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export default BookingHistory;