import { Link } from "react-router-dom";

function DashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Select an option:</p>
      <div>
        <Link to="/inventory">
          <button>Go to Inventory</button>
        </Link>
        <Link to="/gardenlogs">
          <button>Go to Garden Logs</button>
        </Link>
      </div>
    </div>
  );
}

export default DashboardPage;
