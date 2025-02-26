import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear authentication token
    navigate("/"); // Redirect to homepage (login)
  };

  return (
    <nav style={{ display: "flex", justifyContent: "space-between", padding: "10px", background: "#ddd" }}>
      <button onClick={() => navigate("/")}>Home</button>
      <button onClick={() => navigate("/dashboard")}>Dashboard</button>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
};

export default NavBar;
