import { Button } from "@material-ui/core";
import React, { useState } from "react";
import { actionType } from "../Context/Reducer";
import { useStateValue } from "../Context/StateProvider";
import { auth, provider } from "../Firebase/firebase";
import "./Login.css";

function Login() {
  const [state, dispatch] = useStateValue();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [email1, setEmail1] = useState("");
  const [pass1, setPass1] = useState("");
  const [username, setUsername] = useState("");
  const signIn = () => {
    auth
      .signInWithEmailAndPassword(email1, pass1)
      .then((result) => {
        dispatch({
          type: actionType.SET_USER,
          user: result.user,
        });
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const signUp = () => {
    auth
      .createUserWithEmailAndPassword(email, pass)
      .then((result) => {
        result.user.updateProfile({
          displayName: username,
        });
        dispatch({
          type: actionType.SET_USER,
          user: result.user,
        });
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div className="login">
      <div className="extra">
        <p>If You Has Already Registered Then SignIn To See Message</p>
        <Button
          onClick={() => {
            document.getElementById("signup").classList.add("show3");
          }}
          style={{ color: "#fff", background: "#67d3fb", margin: "10px" }}
        >
          Register
        </Button>
        <Button
          onClick={() =>
            document.getElementById("signin").classList.add("show2")
          }
          style={{ color: "#fff", background: "#67d3fb", margin: "10px" }}
        >
          Login
        </Button>
      </div>

      <div className="login-container" id="signin">
        <img
          src="https://cdn0.iconfinder.com/data/icons/kameleon-free-pack-rounded/110/Chat-2-512.png"
          alt=""
        />
        <input
          placeholder="Email"
          value={email1}
          onChange={(e) => {
            setEmail1(e.target.value);
          }}
          type="text"
        />
        <input
          placeholder="Password"
          value={pass1}
          onChange={(e) => {
            setPass1(e.target.value);
          }}
          type="password"
        />
        <Button
          style={{ color: "#fff", margin: "10px", background: "#67d3fb" }}
          className="login-button"
          type="submit"
          onClick={signIn}
        >
          Sign In
        </Button>
      </div>

      <div className="login-container" id="signup">
        <img
          src="https://cdn0.iconfinder.com/data/icons/kameleon-free-pack-rounded/110/Chat-2-512.png"
          alt=""
        />
        <input
          required
          placeholder="Username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          type="text"
        />
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          type="text"
        />
        <input
          placeholder="Password"
          value={pass}
          onChange={(e) => {
            setPass(e.target.value);
          }}
          type="password"
        />
        <Button
          style={{ color: "#fff", margin: "10px", background: "#67d3fb" }}
          className="login-button"
          type="submit"
          onClick={signUp}
        >
          Sign Up
        </Button>
      </div>
    </div>
  );
}

export default Login;
