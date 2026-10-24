import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Matches from "./pages/Matches";
import Booking from "./pages/Booking";
import BookingHistory from "./pages/BookingHistory";
import "./APP.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/matches" element={<PageTransition><Matches /></PageTransition>} />
          <Route path="/booking" element={<PageTransition><Booking /></PageTransition>} />
          <Route path="/history" element={<PageTransition><BookingHistory /></PageTransition>} />
        </Routes>
      </AnimatePresence>
    </BrowserRouter>
  );
}

function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="page-transition"
    >
      {children}
    </motion.div>
  );
}

export default App;