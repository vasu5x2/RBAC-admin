import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const UserRoleBarChart = () => {
  const [roleData, setRoleData] = useState([]);

  useEffect(() => {
  
    fetch("/data.json")
      .then((response) => response.json())
      .then((json) => {
        const { users } = json;
        
      
        const rolesCount = {
          Admin: 0,
          Editor: 0,
          Viewer: 0,
        };

       
        users.forEach((user) => {
          if (user.role === "Admin") rolesCount.Admin++;
          if (user.role === "Editor") rolesCount.Editor++;
          if (user.role === "Viewer") rolesCount.Viewer++;
        });

       
        const chartData = [
          { name: "Admin", count: rolesCount.Admin },
          { name: "Editor", count: rolesCount.Editor },
          { name: "Viewer", count: rolesCount.Viewer },
        ];

        setRoleData(chartData); 
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
   <>

    <Box>
       <Typography
        variant="h2"
        component="h2"
        sx={{ textAlign: "center", marginBottom: 2, fontSize: "1.5rem", fontWeight: "bold" }}
      >
        User Role Distribution
      </Typography>
    </Box>
   

    <Box
      sx={{
        padding: 3,
        borderRadius: 2,
        backgroundColor: "#fff",
        boxShadow: "0px 0px 10px #ccc",
      }}
    >
  
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={roleData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </Box>
    </>
  );
};

export default UserRoleBarChart;
