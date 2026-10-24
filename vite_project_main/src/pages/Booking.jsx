import { useEffect, useState } from "react";
import {
  clearBookingDraft,
  getBookingDraft,
  saveBooking,
  saveBookingDraft,
} from "../utils/bookingStorage";

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

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const phoneRegex = /^\+?[0-9][0-9\s-]{8,14}$/;

function Booking() {
  const draft = getBookingDraft();
  const [name, setName] = useState(draft?.name || "");
  const [email, setEmail] = useState(draft?.email || "");
  const [phone, setPhone] = useState(draft?.phone || "");
  const [tickets, setTickets] = useState(draft?.tickets || 1);
  const [matchId, setMatchId] = useState(draft?.matchId || "");
  const [stand, setStand] = useState(draft?.stand || "");
  const [errors, setErrors] = useState({});

  const selectedMatch = matches.find((match) => match.id === matchId);
  const selectedStand = stands[stand];
  const ticketPrice = selectedStand?.price || 0;
  const totalAmount = ticketPrice * Number(tickets || 0);

  useEffect(() => {
    saveBookingDraft({ name, email, phone, tickets, matchId, stand });
  }, [name, email, phone, tickets, matchId, stand]);

  function validateBooking() {
    const nextErrors = {};
    const phoneDigits = phone.replace(/\D/g, "");

    if (!name.trim()) nextErrors.name = "Name is required.";
    if (!email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!emailRegex.test(email.trim())) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (!phone.trim()) {
      nextErrors.phone = "Phone number is required.";
    } else if (!phoneRegex.test(phone.trim()) || phoneDigits.length < 10 || phoneDigits.length > 15) {
      nextErrors.phone = "Enter a valid phone number.";
    }
    if (!tickets || Number(tickets) < 1 || Number(tickets) > 10) {
      nextErrors.tickets = "Choose between 1 and 10 tickets.";
    }
    if (!matchId) nextErrors.match = "Please select a match.";
    if (!stand) nextErrors.stand = "Please select a stand.";

    return nextErrors;
  }

  function handleBooking(event) {
    event.preventDefault();
    const nextErrors = validateBooking();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    saveBooking({
      id: `${Date.now()}-${matchId}`,
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      tickets: Number(tickets),
      match: selectedMatch.name,
      date: selectedMatch.date,
      venue: selectedMatch.venue,
      stand: selectedStand.name,
      ticketPrice,
      totalAmount,
      bookedAt: new Date().toISOString(),
    });
    clearBookingDraft();
    alert("Ticket booked successfully!");
  }

  function handleFieldChange(setter, field, value) {
    setter(value);
    const nextError = getFieldError(field, value);
    setErrors((currentErrors) => {
      const nextErrors = { ...currentErrors };
      if (nextError) {
        nextErrors[field] = nextError;
      } else {
        delete nextErrors[field];
      }
      return nextErrors;
    });
  }

  function getFieldError(field, value) {
    const trimmedValue = String(value).trim();
    const phoneDigits = trimmedValue.replace(/\D/g, "");

    if (field === "name" && !trimmedValue) return "Name is required.";
    if (field === "email") {
      if (!trimmedValue) return "Email is required.";
      if (!emailRegex.test(trimmedValue)) return "Enter a valid email address.";
    }
    if (field === "phone") {
      if (!trimmedValue) return "Phone number is required.";
      if (!phoneRegex.test(trimmedValue) || phoneDigits.length < 10 || phoneDigits.length > 15) {
        return "Enter a valid phone number.";
      }
    }
    if (field === "tickets" && (!value || Number(value) < 1 || Number(value) > 10)) {
      return "Choose between 1 and 10 tickets.";
    }
    if (field === "match" && !value) return "Please select a match.";
    if (field === "stand" && !value) return "Please select a stand.";

    return "";
  }

  function fieldClass(field) {
    return errors[field] ? "invalid-field" : "";
  }

  return (
    <main className="booking-page">
      <h1>Book Your Ticket</h1>

      <form className="booking-form" onSubmit={handleBooking} noValidate>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          value={name}
          className={fieldClass("name")}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-error" : undefined}
          onChange={(e) => handleFieldChange(setName, "name", e.target.value)}
          placeholder="Enter your name"
        />
        {errors.name && <p id="name-error" className="field-error">{errors.name}</p>}

        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          className={fieldClass("email")}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
          onChange={(e) => handleFieldChange(setEmail, "email", e.target.value)}
          placeholder="Enter your email"
        />
        {errors.email && <p id="email-error" className="field-error">{errors.email}</p>}

        <label htmlFor="phone">Phone Number</label>
        <input
          id="phone"
          type="tel"
          value={phone}
          className={fieldClass("phone")}
          aria-invalid={Boolean(errors.phone)}
          aria-describedby={errors.phone ? "phone-error" : undefined}
          onChange={(e) => handleFieldChange(setPhone, "phone", e.target.value)}
          placeholder="Enter your phone number"
        />
        {errors.phone && <p id="phone-error" className="field-error">{errors.phone}</p>}

        <label htmlFor="tickets">Number of Tickets</label>
        <input
          id="tickets"
          type="number"
          min="1"
          max="10"
          value={tickets}
          className={fieldClass("tickets")}
          aria-invalid={Boolean(errors.tickets)}
          aria-describedby={errors.tickets ? "tickets-error" : undefined}
          onChange={(e) => handleFieldChange(setTickets, "tickets", e.target.value)}
        />
        {errors.tickets && <p id="tickets-error" className="field-error">{errors.tickets}</p>}

        <label htmlFor="match">Select Match</label>
        <select
          id="match"
          value={matchId}
          className={fieldClass("match")}
          aria-invalid={Boolean(errors.match)}
          aria-describedby={errors.match ? "match-error" : undefined}
          onChange={(e) => handleFieldChange(setMatchId, "match", e.target.value)}
        >
          <option value="">-- Select Match --</option>
          {matches.map((match) => (
            <option key={match.id} value={match.id}>
              {match.name} - {match.date}
            </option>
          ))}
        </select>
        {errors.match && <p id="match-error" className="field-error">{errors.match}</p>}

        <label htmlFor="stand">Select Stand</label>
        <select
          id="stand"
          value={stand}
          className={fieldClass("stand")}
          aria-invalid={Boolean(errors.stand)}
          aria-describedby={errors.stand ? "stand-error" : undefined}
          onChange={(e) => handleFieldChange(setStand, "stand", e.target.value)}
        >
          <option value="">-- Select Stand --</option>
          {Object.entries(stands).map(([standId, standDetails]) => (
            <option key={standId} value={standId}>
              {standDetails.name} ({currency.format(standDetails.price)})
            </option>
          ))}
        </select>
        {errors.stand && <p id="stand-error" className="field-error">{errors.stand}</p>}

        <button type="submit">
          Book Ticket
        </button>
      </form>

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