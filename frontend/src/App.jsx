import { useState, useEffect } from "react";
import "./styles/App.css";
import Header from "./header/Header";
import Sidebar from "./sidebar/Sidebar";
import CardWindow from "./cardWindow/CardWindow";
import { mockedCards } from "./constants";

function App() {
  const [limit, setLimit] = useState(100000);
  const [page, setPage] = useState(1);
  const [user, setUser] = useState(null);
  const [cards, setCards] = useState(mockedCards);
  const [cardCount, setCardCount] = useState(25);
  const [viewCollected, setViewCollected] = useState("all");
  let user_id = !user ? -1 : user.user_id;
  useEffect(() => {
    user_id = !user ? -1 : user.user_id;
    fetch(`http://localhost:5000/search?keyword=&user_id=${user_id}`)
      .then((response) => response.json())
      .then((data) => {
        const fetchPromises = data.results.map((result) =>
          fetch(result.url)
            .then((response) => response.json())
            .then((cardData, index) => {
              return { ...cardData, caught: result.caught };
            })
        );
        return Promise.all(fetchPromises);
      })
      .then((newCards) => setCards(newCards))
      .catch((error) => console.error(error));
  }, [page, limit, user]);
  return (
    <div className="pageContainer">
      <Sidebar
        setCards={setCards}
        viewCollected={viewCollected}
        setViewCollected={setViewCollected}
        user={user}
      />
      <CardWindow cards={cards} user={user} viewCollected={viewCollected} />
      <Header user={user} setUser={setUser} />
    </div>
  );
}

export default App;
