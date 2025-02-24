import {useState, useEffect} from "react";
import axios from "axios";

function InventoryPage() {
    
    const [inventory, setInventory] = useState([]);
    const [newItem, setNewItem] = useState({
      name: "",
      category: "",
      quantity: 1,
      purchasedDate: new Date().toISOString().split("T")[0],
      status: "Available"
    });

    const categoryOptions = ["tool", "seed", "supply", "plant"];
    const statusOptions = ["Growing", "Ready to Harvest", "Harvested", "Available"];


    useEffect(() => {
        fetchInventory();
      }, []);
    
      const fetchInventory = () => {
        axios.get("http://localhost:5000/api/inventory")
          .then((response) => setInventory(response.data))
          .catch((error) => console.error("Error fetching inventory:", error));
      };
    
      const handleChange = (e) => {
        setNewItem({ ...newItem, [e.target.name]: e.target.value });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:5000/api/inventory", newItem)
          .then(() => {
            fetchInventory(); // Refresh list
            setNewItem({ name: "", category: "tool", quantity: 1, purchasedDate: new Date().toISOString().split("T")[0], status: "Available" });
          })
          .catch((error) => console.error("Error adding item:", error));
      };
    

    return (
      <div>
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

        <button type="submit">Add Item</button>
      </form>

      </div>
    );
  }
  
  export default InventoryPage;
  