import { useState, useEffect } from "react";
import axios from "axios";

const GardenLogPage = () => {
  const [gardenLogs, setGardenLogs] = useState([]);
  const [newEntry, setNewEntry] = useState({
    plantName: "",
    datePlanted: new Date().toISOString().split("T")[0],
    notes: "",
    status: "Growing",
  });
  const [editingId, setEditingId] = useState(null); // Track editing state

  // Fetch garden log data
  const fetchGardenLogs = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/garden");
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

  // Add a new entry
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        // Update existing entry
        await axios.put(`http://localhost:5000/api/garden/${editingId}`, newEntry);
      } else {
        // Add new entry
        await axios.post("http://localhost:5000/api/garden", newEntry);
      }

      fetchGardenLogs(); // Refresh list
      setNewEntry({ plantName: "", datePlanted: "", notes: "", status: "Growing" });
      setEditingId(null);
    } catch (error) {
      console.error("Error saving garden log:", error);
    }
  };

  // Edit an entry
  const handleEdit = (entry) => {
    setNewEntry(entry);
    setEditingId(entry._id);
  };

  // Delete an entry
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/garden/${id}`);
      fetchGardenLogs();
    } catch (error) {
      console.error("Error deleting entry:", error);
    }
  };

  return (
    <div>
      <h1>Garden Log</h1>

      {/* Form for adding/updating garden entries */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="plantName"
          placeholder="Plant Name"
          value={newEntry.plantName}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="datePlanted"
          value={newEntry.datePlanted}
          onChange={handleChange}
          required
        />
        <textarea
          name="notes"
          placeholder="Notes"
          value={newEntry.notes}
          onChange={handleChange}
        />
        <select name="status" value={newEntry.status} onChange={handleChange}>
          <option value="Growing">Growing</option>
          <option value="Ready to Harvest">Ready to Harvest</option>
          <option value="Harvested">Harvested</option>
        </select>
        <button type="submit">{editingId ? "Update Entry" : "Add Entry"}</button>
      </form>

      {/* Display garden log entries */}
      <ul>
        {gardenLogs.map((entry) => (
          <li key={entry._id}>
            <strong>{entry.plantName}</strong> - Planted on {entry.datePlanted} - {entry.status}
            <p>{entry.notes}</p>
            <button onClick={() => handleEdit(entry)}>Edit</button>
            <button onClick={() => handleDelete(entry._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GardenLogPage;
