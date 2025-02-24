import { useState } from "react";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // For now, just redirect to the dashboard
    if (username && password) {
      navigate("/dashboard");
    } else {
      alert("Please enter both username and password");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>

      <p>Or go to the dashboard:</p>
      <button onClick={() => navigate("/dashboard")}>Go to Dashboard</button>
    </div>
  );
}

export default HomePage;

