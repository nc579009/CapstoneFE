import { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../components/NavBar";

function InventoryPage() {
  const [inventory, setInventory] = useState([]);
  const [newItem, setNewItem] = useState({
    name: "",
    category: "",
    quantity: 1,
    purchasedDate: new Date().toISOString().split("T")[0],
    status: "Available"
  });

  const [editingItem, setEditingItem] = useState(null); // Track item being edited

  const categoryOptions = ["tool", "seed", "supply", "plant"];
  const statusOptions = ["Growing", "Ready to Harvest", "Harvested", "Available"];

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/inventory");
      setInventory(response.data);
    } catch (error) {
      console.error("Error fetching inventory:", error);
    }
  };

  const handleChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setNewItem({
      name: "",
      category: "",
      quantity: 1,
      purchasedDate: new Date().toISOString().split("T")[0],
      status: "Available"
    });
    setEditingItem(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingItem) {
        // If editing, update the existing item
        await axios.put(`http://localhost:5000/api/inventory/${editingItem._id}`, newItem, {
          headers: { "Content-Type": "application/json" },
        });
      } else {
        // Otherwise, add a new item
        await axios.post("http://localhost:5000/api/inventory", newItem, {
          headers: { "Content-Type": "application/json" },
        });
      }

      fetchInventory(); // Refresh inventory list
      resetForm();
    } catch (error) {
      console.error("Error saving item:", error.response?.data || error.message);
    }
  };

  const handleEdit = (item) => {
    setNewItem(item); // Populate form with selected item
    setEditingItem(item);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/inventory/${id}`);
      fetchInventory(); // Refresh inventory list
    } catch (error) {
      console.error("Error deleting item:", error.response?.data || error.message);
    }
  };

  return (
    <div>
      <NavBar />
      <h1>Inventory</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={newItem.name}
          onChange={handleChange}
          placeholder="Item Name"
          required
        />

        {/* Category Dropdown */}
        <select name="category" value={newItem.category} onChange={handleChange} required>
          <option value="" disabled>Select Category</option>
          {categoryOptions.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>

        <input
          type="number"
          name="quantity"
          value={newItem.quantity}
          onChange={handleChange}
          placeholder="Quantity"
          required
        />

        {/* Date Picker for Purchased Date */}
        <input
          type="date"
          name="purchasedDate"
          value={newItem.purchasedDate}
          onChange={handleChange}
          required
        />

        {/* Status Dropdown */}
        <select name="status" value={newItem.status} onChange={handleChange} required>
          {statusOptions.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>

        <button type="submit">{editingItem ? "Update Item" : "Add Item"}</button>
        {editingItem && <button type="button" onClick={resetForm}>Cancel Edit</button>}
      </form>

      {inventory.length > 0 ? (
        <ul>
          {inventory.map((item) => (
            <li key={item._id}>
              {item.name} - {item.quantity} ({item.category}) - {item.status}{" "}
              <button onClick={() => handleEdit(item)}>Edit</button>
              <button onClick={() => handleDelete(item._id)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No inventory items available.</p>
      )}
    </div>
  );
}

export default InventoryPage;
