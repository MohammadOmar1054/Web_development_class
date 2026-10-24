import { useState } from "react";

const matches = [
  {
    id: "rcb-csk",
    name: "RCB vs CSK",
    venue: "M. Chinnaswamy Stadium, Bengaluru",
    date: "25 March 2026",
  },
  {
    id: "mi-kkr",
    name: "MI vs KKR",
    venue: "Wankhede Stadium, Mumbai",
    date: "28 March 2026",
  },
];

const stands = {
  general: {
    name: "General Stand",
    price: 500,
    description: "A comfortable and affordable view of the match.",
  },
  premium: {
    name: "Premium Stand",
    price: 1000,
    description: "A closer view with wider, more comfortable seating.",
  },
  vip: {
    name: "VIP Stand",
    price: 2000,
    description: "The best view of the action with premium seating.",
  },
};

const currency = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

function Booking() {
  const [name, setName] = useState("");
  const [tickets, setTickets] = useState(1);
  const [matchId, setMatchId] = useState("");
  const [stand, setStand] = useState("");

  const selectedMatch = matches.find((match) => match.id === matchId);
  const selectedStand = stands[stand];
  const ticketPrice = selectedStand?.price || 0;
  const totalAmount = ticketPrice * Number(tickets || 0);

  function handleBooking() {
    if (!name || !tickets || !stand || !selectedMatch) {
      alert("Please fill all the details");
      return;
    }

    alert("Ticket booked successfully!");
  }

  return (
    <main className="booking-page">
      <h1>Book Your Ticket</h1>

      <div className="booking-form">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        />

        <label htmlFor="tickets">Number of Tickets</label>
        <input
          id="tickets"
          type="number"
          min="1"
          max="10"
          value={tickets}
          onChange={(e) => setTickets(e.target.value)}
        />

        <label htmlFor="match">Select Match</label>
        <select
          id="match"
          value={matchId}
          onChange={(e) => setMatchId(e.target.value)}
        >
          <option value="">-- Select Match --</option>
          {matches.map((match) => (
            <option key={match.id} value={match.id}>
              {match.name} - {match.date}
            </option>
          ))}
        </select>

        <label htmlFor="stand">Select Stand</label>
        <select
          id="stand"
          value={stand}
          onChange={(e) => setStand(e.target.value)}
        >
          <option value="">-- Select Stand --</option>
          {Object.entries(stands).map(([standId, standDetails]) => (
            <option key={standId} value={standId}>
              {standDetails.name} ({currency.format(standDetails.price)})
            </option>
          ))}
        </select>

        <button onClick={handleBooking}>
          Book Ticket
        </button>
      </div>

      <section className="booking-details" aria-live="polite">
        <h3>Booking Summary</h3>
        <p>Name: <strong>{name || "-"}</strong></p>
        <p>Tickets: <strong>{tickets || "-"}</strong></p>
        <p>Match: <strong>{selectedMatch?.name || "-"}</strong></p>
        <p>Venue: <strong>{selectedMatch?.venue || "-"}</strong></p>
        <p>Stand: <strong>{selectedStand?.name || "-"}</strong></p>
        <p>Ticket price: <strong>{selectedStand ? currency.format(ticketPrice) : "-"}</strong></p>
        <p className="booking-total">Total amount: <strong>{selectedStand ? currency.format(totalAmount) : "-"}</strong></p>
      </section>

      {selectedStand && (
        <section className="stand-information">
          <h3>{selectedStand.name} Information</h3>
          <p>{selectedStand.description}</p>
          <p>Price per ticket: <strong>{currency.format(selectedStand.price)}</strong></p>
        </section>
      )}
    </main>
  );
}

export default Booking;