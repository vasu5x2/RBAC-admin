import React from "react";
import UserRoleBarChart from "../charts/UserRoleBarChart"; // Import the UserRoleBarChart component
import UserStatusPieChart from "../charts/UserStatusPieChart";
import TotalUsers from "../charts/TotalUsers";

const Home = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: "10px",
          marginTop:"70px",
          padding: "10px",
        }}
      >
       
        <TotalUsers />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
          height: "75vh",
        }}
      >
        <div style={{ flex: 1 }}>
          <UserRoleBarChart />
        </div>
        <div style={{ flex: 1 }}>
          <UserStatusPieChart />
        </div>
      </div>
    </>
  );
};

export default Home;
