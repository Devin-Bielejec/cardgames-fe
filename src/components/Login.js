import React, { useState } from "react";

const Login = ({ socket, setIsLoggedIn }) => {
  const [currentName, setCurrentName] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    localStorage.setItem("username", currentName);
    setIsLoggedIn(true);
    setCurrentName("");
  };
  return (
    <main>
      <section>
        <h2>Give yourself a nickname</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            value={currentName}
            onChange={e => setCurrentName(e.target.value)}
            type="text"
            name="name"
            id="name"
          />
          <button>Join</button>
        </form>
      </section>
    </main>
  );
};

export default Login;
