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
        console.log(e.target.name, e.target.value);
        setNewItem({ ...newItem, [e.target.name]: e.target.value });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
      
        try {
          const response = await axios.post("http://localhost:5000/api/inventory", newItem, {
            headers: { "Content-Type": "application/json" },
          });
      
          console.log("Added Item:", response.data);
          fetchInventory(); // Refresh inventory list
          resetForm(); // Reset form fields
        } catch (error) {
          console.error("Error adding item:", error.response?.data || error.message);
        }
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
            <option value = "" disabled selected > Select Category  </option>
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
  