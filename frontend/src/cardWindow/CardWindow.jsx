import React from "react";
import "../styles/CardWindow.css";
import Card from "./Card";

function CardWindow(props) {
  console.log(props.viewCollected);
  if (props.viewCollected === "all") {
    return (
      <div className="cardWindow">
        {props.cards.map((card, index) => (
          <Card card={card} key={index} user={props.user} />
        ))}
      </div>
    );
  } else if (props.viewCollected === "uncollected") {
    return (
      <div className="cardWindow">
        {props.cards.map((card, index) =>
          !card.caught ? (
            <Card card={card} key={index} user={props.user} />
          ) : null
        )}
      </div>
    );
  } else {
    return (
      <div className="cardWindow">
        {props.cards.map((card, index) => {
          return !card.caught ? null : (
            <Card card={card} key={index} user={props.user} />
          );
        })}
      </div>
    );
  }
}

export default CardWindow;
