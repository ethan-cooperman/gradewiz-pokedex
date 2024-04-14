import React from "react";
import "./styles/Sidebar.css";
import { useState } from "react";

function Sidebar(props) {
  const [search, setSearch] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);
  return (
    <div className="sidebar">
      <input
        type="text"
        placeholder="Search for a card"
        style={{
          backgroundColor: "white",
          width: "80%",
          color: "black",
        }}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}

export default Sidebar;
