import React, { useState } from "react";
import "./SignUp.css";

function SignUp({ onAddUser }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  function handleNewUserSubmit(e) {
    e.preventDefault();
    fetch("/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    }).then((response) => {
      if (response.ok) {
        response.json().then((newUser) => onAddUser(newUser));
        setName("")
        setEmail("")
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
            <input name="username" value={name} onChange={handleNameChange} />
            <br />
            <label>Email</label>
            <br />
            <input name="email" value={email} onChange={handleEmailChange} />
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
            <div className="signup-button">
              <button onClick={handleNewUserSubmit}>Submit</button>
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

export default SignUp;
