import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Home() {
  return (
    <main className="home-page">
      <section className="hero-section">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="eyebrow">THE STADIUM EXPERIENCE STARTS HERE</p>
          <h1>Feel every cheer.<br /><span>Book every moment.</span></h1>
          <p className="hero-description">
            Secure your seat for the biggest IPL clashes with a quick, simple,
            and beautifully clear booking experience.
          </p>
          <div className="hero-actions">
            <Link className="primary-button" to="/matches">Explore matches</Link>
            <Link className="text-link" to="/booking">Book a ticket <span>→</span></Link>
          </div>
        </motion.div>
        <motion.div
          className="hero-ball"
          initial={{ opacity: 0, scale: 0.7, rotate: -25 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
        >
          <span>IPL</span>
        </motion.div>
      </section>
      <section className="feature-strip">
        <div><strong>01</strong><span>Choose your match</span></div>
        <div><strong>02</strong><span>Select your seat</span></div>
        <div><strong>03</strong><span>Bring the energy</span></div>
      </section>
    </main>
  );
}

export default Home;