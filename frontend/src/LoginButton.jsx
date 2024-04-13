import React from "react";
import { useState } from "react";
import "./styles/LoginButton.css";

function LoginButton(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  function handleSignIn() {
    props.setUser({ name: "User" });
    props.setShowOptions(false);
    console.log("Sign in");
  }

  function handleSignUp() {
    props.setUser({ name: "User" });
    props.setShowOptions(false);
    console.log("Sign up");
  }

  function handleSignOut() {
    props.setUser(null);
    props.setShowOptions(false);
    console.log("Sign out");
  }
  console.log(email, password);
  return (
    <div className="loginDiv">
      {props.user !== null ? (
        <button className="signOutButton" onClick={() => handleSignOut()}>
          Sign Out
        </button>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <input
            type="text"
            style={{ backgroundColor: "white", width: "90%", color: "black" }}
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            style={{ backgroundColor: "white", width: "90%", color: "black" }}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="smallButtonContainer">
            <button className="smallButton" onClick={() => handleSignIn()}>
              Sign In
            </button>
            <button className="smallButton" onClick={() => handleSignUp()}>
              Sign Up
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default LoginButton;
