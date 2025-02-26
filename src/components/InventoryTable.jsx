import React from "react";
import "../css/inventoryTable.css";


function InventoryTable({ inventory, onEdit, onDelete }) {
  return (
    <div>
      {inventory.length > 0 ? (
        <table border="1">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Purchased Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((item) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{item.quantity}</td>
                <td>{new Date(item.purchasedDate).toLocaleDateString()}</td>
                <td>{item.status}</td>
                <td>
                  <button onClick={() => onEdit(item)}>Edit</button>
                  <button onClick={() => onDelete(item._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No inventory items available.</p>
      )}
    </div>
  );
}

export default InventoryTable;
