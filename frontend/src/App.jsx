import { useState } from "react";
import "./styles/App.css";
import Header from "./Header";

function App() {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState(null);

  return (
    <div className="pageContainer">
      <Header user={user} setUser={setUser} />
    </div>
  );
}

export default App;
