import React from "react";
import LoginButton from "./LoginButton";
import { useState } from "react";

function ProfileButton({ user, setUser, ...props }) {
  const [showOptions, setShowOptions] = useState(false);
  return (
    <div
      style={{
        display: "flex",
        position: "absolute",
        width: "10%",
        height: "130%",
        top: "2%",
        right: "3%",
        alignContent: "center",
        flexDirection: "column",
      }}
    >
      <button
        style={{
          backgroundColor: "transparent",
          position: "relative",
          padding: "0",
          height: "100%",
          border: "none",
          display: "flex",
          justifyContent: "center",
        }}
        onClick={() => setShowOptions(!showOptions)}
      >
        <img
          src="icons/Login-User-Icon.svg"
          alt="ProfileIcon"
          style={{
            position: "fixed",
            top: "2%",
            aspectRatio: "1",
            width: "4%",
          }}
        />
      </button>
      {showOptions && (
        <LoginButton
          user={user}
          setUser={setUser}
          setShowOptions={setShowOptions}
          showOptions={showOptions}
        />
      )}
    </div>
  );
}
export default ProfileButton;
