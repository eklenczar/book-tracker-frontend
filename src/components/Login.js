import React, { useState } from "react";
import "./Login.css";

function Login({ onLogin }) {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleUserNameChange = (e) => setUserName(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  function handleUserSubmit(e) {
    e.preventDefault();
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: username,
        password: password,
      }),
    }).then((response) => {
      if (response.ok) {
        response.json().then((user) => onLogin(user));
        setUserName("")
        setPassword("")
      } else {
        response.json().then((errorData) => setErrors(errorData.errors));
      }
    });
  }
  
  return (
    <>
      <div className="container">
        <div className="center">
          <form>
            <label>Username</label>
            <br />
            <input
              name="username"
              value={username}
              onChange={handleUserNameChange}
            />
            <br />
            <label>Password</label>
            <br />
            <input
              type="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
            />
            <br />
            <br />
            <div className="login-button">
              <button onClick={handleUserSubmit}>Login</button>
            </div>
          </form>
        </div>
      </div>
      <div>
        {errors.length > 0 && (
          <ul style={{ color: "red" }}>
            {errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default Login;
