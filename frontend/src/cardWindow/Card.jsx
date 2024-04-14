import React from "react";
import "../styles/Card.css";

function Card(props) {
  const upperCaseFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  console.log(props.card);
  return (
    <div className="card">
      <h1
        style={{
          width: "82%",
          height: "5%",
          position: "relative",
          fontSize: "15%",
          fontWeight: "bolder",
          fontFamily: "Roboto, sans-serif",
          left: "18%",
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
