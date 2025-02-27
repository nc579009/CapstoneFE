import React from "react";
import "../css/inventoryTable.css";

function GardenLogTable({ gardenLogs, onEdit, onDelete }) {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div>
      {gardenLogs.length > 0 ? (
        <table border="1">
          <thead>
            <tr>
              <th>Plant Name</th>
              <th>Planted Date</th>
              <th>Last Watered</th>
              <th>Growth Stage</th>
              <th>Notes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {gardenLogs.map((entry) => (
              <tr key={entry._id}>
                <td>{entry.plantName}</td>
                <td>{formatDate(entry.plantedDate)}</td>
                <td>{formatDate(entry.lastWatered)}</td>
                <td>{entry.growthStage}</td>
                <td>{entry.notes}</td>
                <td>
                  <button onClick={() => onEdit(entry)}>Edit</button> 
                  <br />
                  <br />
                  <button onClick={() => onDelete(entry._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No garden log entries available.</p>
      )}
    
    </div>
  );
}

export default GardenLogTable;
