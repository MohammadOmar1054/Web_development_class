function MatchCard(props) {
  return (
    <div className="match-card">
      <h2>
        {props.team1} vs {props.team2}
      </h2>
      <p>📍 {props.venue}</p>
      <p>📅 {props.date}</p>
    </div>
  );
}

function Matches() {
  return (
    <main className="matches-page">
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