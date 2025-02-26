import { useNavigate } from "react-router-dom";
import "../css/navbar.css";

const NavBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear authentication token
    navigate("/"); // Redirect to homepage (login)
  };

  return (
    <nav className="navbar">
      <a href="/" className="navbar-logo">Homestead APP</a>
      <ul className="nav-links">
        <li><button className="nav-button" onClick={() => navigate("/")}>Home</button></li>
        <li><button className="nav-button" onClick={() => navigate("/dashboard")}>Dashboard</button></li>
        <li><button className="nav-button logout-button" onClick={handleLogout}>Logout</button></li>
      </ul>
    </nav>
  );
};

export default NavBar;
