import { motion } from "framer-motion";

function BookingHistory() {
  return (
    <main className="booking-page">
      <motion.div
        className="booking-details"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >
        <p className="eyebrow">YOUR TICKETS</p>
        <h1>Booking History</h1>
        <p>Your confirmed bookings will appear here.</p>
      </motion.div>
    </main>
  );
}

export default BookingHistory;