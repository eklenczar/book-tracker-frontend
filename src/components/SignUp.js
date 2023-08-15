import React, { useState } from "react";

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
      } else {
        response.json().then((errorData) => setErrors(errorData.errors));
      }
    });
  }

  return (
    <div>
      <div>
        <form>
          <label>Username</label>
          <input name="username" value={name} onChange={handleNameChange} />
          <label>Email</label>
          <input name="email" value={email} onChange={handleEmailChange} />
          <label>Password</label>
          <input
            name="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <button onClick={handleNewUserSubmit}>Submit</button>
        </form>
      </div>
      {errors.length > 0 && (
        <ul style={{ color: "red" }}>
          {errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SignUp;
