import { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../components/NavBar";
import GardenLogTable from "../components/GardenLogTable"; // Importing table component


const GardenLogPage = () => {
  const [gardenLogs, setGardenLogs] = useState([]);
  const [newEntry, setNewEntry] = useState({
    plantName: "",
    plantedDate: new Date().toISOString().split("T")[0], // Editable planted date
    lastWatered: new Date().toISOString().split("T")[0], // Editable last watered date
    growthStage: "seedling",
    notes: "",
  });
  const [editingId, setEditingId] = useState(null); // Track editing state

  // Fetch garden log data
  const fetchGardenLogs = async () => {
    try {
      const response = await axios.get("https://homesteadbe.onrender.com/api/garden");
      setGardenLogs(response.data);
    } catch (error) {
      console.error("Error fetching garden logs:", error);
    }
  };

  useEffect(() => {
    fetchGardenLogs();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setNewEntry({ ...newEntry, [e.target.name]: e.target.value });
  };

  // Add or update an entry
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`https://homesteadbe.onrender.com/api/garden/${editingId}`, newEntry);
      } else {
        await axios.post("https://homesteadbe.onrender.com/api/garden", newEntry);
      }

      fetchGardenLogs();
      setNewEntry({
        plantName: "",
        plantedDate: new Date().toISOString().split("T")[0],
        lastWatered: new Date().toISOString().split("T")[0],
        growthStage: "seedling",
        notes: "",
      });
      setEditingId(null);
    } catch (error) {
      console.error("Error saving garden log:", error);
    }
  };

  // Edit an entry
  const handleEdit = (entry) => {
    setNewEntry({
      plantName: entry.plantName,
      plantedDate: entry.plantedDate.split("T")[0],
      lastWatered: entry.lastWatered.split("T")[0],
      growthStage: entry.growthStage,
      notes: entry.notes,
    });
    setEditingId(entry._id);
  };

  // Delete an entry
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://homesteadbe.onrender.com/api/garden/${id}`);
      fetchGardenLogs();
    } catch (error) {
      console.error("Error deleting entry:", error);
    }
  };

  return (
    <div>
      <NavBar />
      <h1>Garden Log</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="plantName"
          placeholder="Plant Name"
          value={newEntry.plantName}
          onChange={handleChange}
          required
        />
        <br />

        <label>Planted Date:</label>
        <input
          type="date"
          name="plantedDate"
          value={newEntry.plantedDate}
          onChange={handleChange}
        />
        <br />

        <label>Last Watered:</label>
        <input
          type="date"
          name="lastWatered"
          value={newEntry.lastWatered}
          onChange={handleChange}
        />
        <br />

        <select name="growthStage" value={newEntry.growthStage} onChange={handleChange}>
          <option value="seedling">Seedling</option>
          <option value="vegetative">Vegetative</option>
          <option value="flowering">Flowering</option>
          <option value="harvest">Harvest</option>
        </select>
        <br />

        <textarea
          name="notes"
          placeholder="Notes"
          value={newEntry.notes}
          onChange={handleChange}
        />
        <br />

        <button type="submit">{editingId ? "Update Entry" : "Add Entry"}</button>
        <br />
        <br />
      </form>

      <GardenLogTable gardenLogs={gardenLogs} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default GardenLogPage;
