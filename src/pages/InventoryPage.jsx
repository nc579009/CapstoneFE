import { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../components/NavBar";
import InventoryTable from "../components/InventoryTable"; // Importing new table component

function InventoryPage() {
  const [inventory, setInventory] = useState([]);
  const [newItem, setNewItem] = useState({
    name: "",
    category: "",
    quantity: 1,
    purchasedDate: new Date().toISOString().split("T")[0],
    status: "Available"
  });

  const [editingItem, setEditingItem] = useState(null);

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
        await axios.put(`http://localhost:5000/api/inventory/${editingItem._id}`, newItem, {
          headers: { "Content-Type": "application/json" },
        });
      } else {
        await axios.post("http://localhost:5000/api/inventory", newItem, {
          headers: { "Content-Type": "application/json" },
        });
      }

      fetchInventory();
      resetForm();
    } catch (error) {
      console.error("Error saving item:", error.response?.data || error.message);
    }
  };

  const handleEdit = (item) => {
    setNewItem(item);
    setEditingItem(item);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/inventory/${id}`);
      fetchInventory();
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

        <input
          type="date"
          name="purchasedDate"
          value={newItem.purchasedDate}
          onChange={handleChange}
          required
        />

        <select name="status" value={newItem.status} onChange={handleChange} required>
          {statusOptions.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>

        <button type="submit">{editingItem ? "Update Item" : "Add Item"}</button>
        {editingItem && <button type="button" onClick={resetForm}>Cancel Edit</button>}
      </form>

      <InventoryTable inventory={inventory} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
}

export default InventoryPage;
