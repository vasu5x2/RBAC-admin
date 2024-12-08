import React, { useState, useEffect } from "react";
import { PieChart, Pie, Tooltip, Legend, Cell, ResponsiveContainer } from "recharts";

const UserStatusPieChart = () => {
  const [statusCounts, setStatusCounts] = useState({
    Active: 0,
    Inactive: 0
  });

  useEffect(() => {
    // Fetch the data.json file
    fetch("/data.json")
      .then((response) => response.json())
      .then((json) => {
        const { users } = json;
        
        // Calculate the number of active and inactive users
        const statusCount = users.reduce((acc, user) => {
          acc[user.status] = acc[user.status] + 1 || 1;
          return acc;
        }, {});

        setStatusCounts(statusCount);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Prepare pie chart data
  const pieData = Object.keys(statusCounts).map((status) => ({
    name: status,
    value: statusCounts[status]
  }));

  // Define colors for each section
  const COLORS = ["#0088FE", "#FF8042"];

  return (
    <div style={{ width: "100%", height: 400 }}>
      <h2  style={{ display: "flex",alignItems:"center", justifyContent: "center", gap: "20px",}}>User Status Distribution</h2>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserStatusPieChart;
