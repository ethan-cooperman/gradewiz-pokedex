import React from "react";
import "../styles/Sidebar.css";
import { useState } from "react";

function Sidebar(props) {
  const [search, setSearch] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);
  function makeSearch(search) {
    const user_id = !props.user ? -1 : props.user.user_id;
    fetch(`http://localhost:5000/search?keyword=${search}&user_id=${user_id}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.log(response);
          throw new Error("Failed to search");
        }
      })
      .then((data) => {
        const fetchPromises = data.results.map((result) =>
          fetch(result.url)
            .then((response) => response.json())
            .then((cardData) => {
              return { ...cardData, caught: result.caught };
            })
        );
        return Promise.all(fetchPromises);
      })
      .then((newCards) => {
        props.setCards(newCards);
      })
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
        value={props.viewCollected}
        onChange={(e) => props.setViewCollected(e.target.value)}
      >
        <option value="all">All</option>
        <option value="collected">Collected</option>
        <option value="uncollected">Uncollected</option>
      </select>
    </div>
  );
}

export default Sidebar;
