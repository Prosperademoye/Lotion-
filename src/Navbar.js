export default function navbar({ toggleDiv }) {
  return (
    <nav className="nav">
      <div className="menu-icon" onClick={toggleDiv}>
        &#9776;
      </div>
      <div className="lotion">
        <text className="lotion-header">Lotion</text>{" "}
        <text className="likenotion">Like Notion, but worse. </text>
      </div>
      <div className="useless"></div>
    </nav>
  );
}
