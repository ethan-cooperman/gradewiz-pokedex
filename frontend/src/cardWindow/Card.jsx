import React from "react";
import "../styles/Card.css";
import { useState, useEffect } from "react";

function Card(props) {
  const [isCollected, setIsCollected] = useState(false);
  const upperCaseFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handleCatch = async () => {
    if (!props.user) {
      alert("Please sign in to catch Pokemon");
      return;
    }
    if (!isCollected) {
      console.log(
        "Catching Pokemon with id " +
          props.card.id +
          " for user " +
          props.user.user_id
      );
      fetch("http://localhost:5000/favorite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: props.user.user_id,
          pokemon_id: props.card.id,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          if (data.result === "Favorite created successfully") {
            setIsCollected(true);
          } else {
            alert(data.result);
          }
        })
        .catch((error) => {
          alert("Could not connect to server");
          console.error("Error:", error);
        });
    } else {
      console.log(
        "Releasing Pokemon with id " +
          props.card.id +
          " for user " +
          props.user.user_id
      );
      fetch("http://localhost:5000/unfavorite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: props.user.user_id,
          pokemon_id: props.card.id,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          if (data.result === "Favorite deleted successfully") {
            setIsCollected(false);
          } else {
            alert(data.result);
          }
        })
        .catch((error) => {
          alert("Could not connect to server");
          console.error("Error:", error);
        });
    }
  };

  return (
    <div className="card">
      <button
        style={{
          position: "absolute",
          left: "8%",
          top: "3%",
          width: "10%",
          height: "5%",
          aspectRatio: 1,
          backgroundColor: "transparent",
          padding: 0,
          border: "none",
          margin: 0,
        }}
        onClick={() => handleCatch()}
      >
        {isCollected ? (
          <img src="icons/pokeball_color.png" className="pokeball" />
        ) : (
          <img src="icons/pokeball_bw.png" className="pokeball" />
        )}
      </button>
      <h1
        style={{
          width: "82%",
          height: "5%",
          position: "relative",
          fontSize: "15%",
          fontWeight: "bolder",
          fontFamily: "Roboto, sans-serif",
          left: "22%",
          paddingTop: "1vw",
          textShadow: "1px 1px 1px navy",
        }}
      >
        {upperCaseFirstLetter(props.card.name)}
      </h1>
      <div
        style={{
          position: "absolute",
          fontSize: "1vw",
          right: "8%",
          top: "3%",
          color: "maroon",
          fontWeight: "bolder",
        }}
      >
        {props.card.stats[0].base_stat} HP
      </div>
      <img
        src={props.card.sprites.other["official-artwork"].front_default}
        alt={props.card.name}
        style={{
          position: "relative",
          top: "0vh",
          left: "25%",
          width: "45%",
          height: "35%",
          aspectRatio: 1,
        }}
      />
      <div style={{ height: "10%", width: "100%" }} />
      <div className="statsContainer">
        <p className="statsText">Weight:</p>
        <p className="statsText">{props.card.weight}</p>
      </div>
      <div className="statsContainer">
        <p className="statsText">Abilities:</p>
        <p className="statsText" style={{ fontSize: "8%" }}>
          {" " +
            props.card.abilities.map(
              (ability) => " " + upperCaseFirstLetter(ability.ability.name)
            )}
        </p>
      </div>
      <div className="statsContainer">
        <p className="statsText">Type:</p>
        <p className="statsText">
          {upperCaseFirstLetter(props.card.types[0].type.name) +
            (props.card.types.length > 1
              ? " & " + upperCaseFirstLetter(props.card.types[1].type.name)
              : "")}
        </p>
      </div>
    </div>
  );
}

export default Card;
