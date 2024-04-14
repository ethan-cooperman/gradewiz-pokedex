import React from "react";
import { useState, useEffect } from "react";
import "../styles/LoginButton.css";

function LoginButton(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  function handleSignIn() {
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }
    fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if (data.result === "Login successful") {
          console.log("User logged in" + data.user_id);
          props.setUser({ user_id: data.user_id, user_email: email });
          props.setShowOptions(false);
        } else {
          setEmail("");
          setPassword("");
          alert(data.result);
        }
      })
      .catch((error) => {
        alert("Could not connect to server");
        console.error("Error:", error);
      });
    props.setShowOptions(false);
  }

  async function handleSignUp() {
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }
    // register user
    fetch("http://localhost:5000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if (data.result === "User created successfully") {
          console.log("User created" + data.user_id);
          props.setUser({ user_id: data.user_id, user_email: email });
          props.setShowOptions(false);
        } else {
          setEmail("");
          setPassword("");
          alert(data.result);
        }
      })
      .catch((error) => {
        alert("Could not connect to server");
        console.error("Error:", error);
      });
  }

  function handleSignOut() {
    props.setUser(null);
    props.setShowOptions(false);
    console.log("Sign out");
  }
  useEffect(() => {
    setEmail("");
    setPassword("");
  }, [props.showOptions]);
  return (
    <div className="loginDiv">
      {props.user !== null ? (
        <button className="signOutButton" onClick={() => handleSignOut()}>
          <div
            tyle={{
              width: "100%",
              fontSize: "60%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            User:
          </div>
          <div
            style={{
              width: "100%",
              fontSize: "60%",
              justifyContent: "center",
              alignItems: "center",
              paddingTop: "10%",
              paddingBottom: "10%",
              display: "flex",
            }}
          >
            {props.user.user_email}
          </div>
          <div
            style={{
              width: "100%",
              fontSize: "0.8vw",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Sign Out
          </div>
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
