import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import InventoryPage from "./pages/InventoryPage";
import GardenLogPage from "./pages/GardenLogPage";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/inventory" element={<InventoryPage />} />
      <Route path="/gardenlogs" element={<GardenLogPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
