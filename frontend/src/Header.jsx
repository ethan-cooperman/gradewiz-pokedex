import React from "react";
import "./styles/Header.css";
import ProfileButton from "./ProfileButton";

function Header({ user, setUser, ...props }) {
  return (
    <header className="headerBar">
      <h1 className="headerTitle">Pokedex</h1>
      <ProfileButton user={user} setUser={setUser} />
    </header>
  );
}

export default Header;
