import React from "react";
import "../styles/CardWindow.css";
import Card from "./Card";

function CardWindow(props) {
  return (
    <div className="cardWindow">
      {props.cards.map((card, index) => (
        <Card card={card} key={index} user={props.user} />
      ))}
    </div>
  );
}

export default CardWindow;
