import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Navbar() {
  return (
    <nav className="navbar">
      <motion.div
        className="brand"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="brand-mark">IPL</span>
        <h2>Ticket Booking</h2>
      </motion.div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/matches">Matches</Link>
        <Link className="nav-cta" to="/booking">Book Ticket</Link>
        <Link to="/history">History</Link>
      </div>
    </nav>
  );
}

export default Navbar;