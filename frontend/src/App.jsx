import { useState, useEffect } from "react";
import "./styles/App.css";
import Header from "./header/Header";
import Sidebar from "./Sidebar";
import CardWindow from "./cardWindow/CardWindow";
import { mockedCards } from "./constants";

function App() {
  const [limit, setLimit] = useState(25);
  const [page, setPage] = useState(1);
  const [user, setUser] = useState(null);
  const [cards, setCards] = useState(mockedCards);
  const [cardCount, setCardCount] = useState(25);

  useEffect(() => {
    fetch(`http://localhost:5000/get?limit=${limit}&page=${page}`)
      .then((response) => response.json())
      .then((data) => {
        const fetchPromises = data.results.map((result) =>
          fetch(result.url).then((response) => response.json())
        );
        return Promise.all(fetchPromises);
      })
      .then((newCards) => setCards(newCards))
      .catch((error) => console.error(error));
  }, []);
  return (
    <div className="pageContainer">
      <Sidebar setCards={setCards} />
      <CardWindow cards={cards} />
      <Header user={user} setUser={setUser} />
    </div>
  );
}

export default App;
