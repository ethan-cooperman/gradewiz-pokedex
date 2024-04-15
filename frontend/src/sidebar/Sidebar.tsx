import React from "react";
import "../styles/Sidebar.css";
import { useState } from "react";

function Sidebar(props) {
  const [search, setSearch] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);
  function makeSearch(search) {
    fetch(`http://localhost:5000/search?keyword=${search}`)
      .then((response) => response.json())
      .then((data) => {
        const fetchPromises = data.results.map((result) =>
          fetch(result.url).then((response) => response.json())
        );
        return Promise.all(fetchPromises);
      })
      .then((newCards) => props.setCards(newCards))
      .catch((error) => console.error(error));
  }
  return (
    <div className="sidebar">
      <h1
        style={{
          color: "navy",
          fontSize: "30%",
          alignSelf: "baseline",
          paddingLeft: "10px",
        }}
      >
        Filter
      </h1>
      <input
        type="text"
        placeholder="Search for a card"
        style={{
          backgroundColor: "white",
          width: "80%",
          color: "black",
        }}
        onChange={(e) => {
          setSearch(e.target.value);
          makeSearch(e.target.value);
        }}
      />
      <select
        name="viewCollected"
        id="viewCollected"
        style={{
          backgroundColor: "goldenrod",
          color: "navy",
          alignSelf: "baseline",
          marginTop: "3%",
          marginLeft: "10%",
        }}
      >
        <option value="all">All</option>
        <option value="collected">Collected</option>
        <option value="uncollected">Uncollected</option>
      </select>
    </div>
  );
}

export default Sidebar;
