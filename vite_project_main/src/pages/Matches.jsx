import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function MatchCard(props) {
  return (
    <motion.article
      className="match-card"
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 280, damping: 18 }}
    >
      <div className="match-card-top"><span>UPCOMING MATCH</span><span>IPL 2026</span></div>
      <h2>{props.team1} <em>vs</em> {props.team2}</h2>
      <p>📍 {props.venue}</p>
      <p>📅 {props.date}</p>
      <Link className="card-button" to="/booking">Book this match <span>→</span></Link>
    </motion.article>
  );
}

function Matches() {
  return (
    <main className="matches-page">
      <p className="eyebrow centered">THE FIXTURES</p>
      <h1>Upcoming IPL Matches</h1>

      <div className="matches-grid">
        <MatchCard
          team1="RCB"
          team2="CSK"
          venue="M. Chinnaswamy Stadium, Bengaluru"
          date="25 March 2026"
        />
      </div>
    </main>
  );
}

export default Matches;