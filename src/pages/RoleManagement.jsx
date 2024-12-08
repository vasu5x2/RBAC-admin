import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Box,
} from "@mui/material";

const RoleManagement = () => {
  const [data, setData] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRole, setSelectedRole] = useState({});
  const [dialogType, setDialogType] = useState(""); 

  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((json) => setData(json));
  }, []);

  if (!data) return <div>Loading...</div>;

  const { roles } = data;

 
  const handleDialogOpen = (type, role = {}) => {
    setDialogType(type);
    setSelectedRole(role);
    setOpenDialog(true);
  };


  const handleDialogClose = () => {
    setSelectedRole({});
    setOpenDialog(false);
  };


  const handleInputChange = (e) => {
    setSelectedRole({ ...selectedRole, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (dialogType === "Add") {
      setData((prevData) => ({
        ...prevData,
        roles: [...prevData.roles, { ...selectedRole, id: prevData.roles.length + 1 }],
      }));
    } else if (dialogType === "Edit") {
      setData((prevData) => ({
        ...prevData,
        roles: prevData.roles.map((role) =>
          role.id === selectedRole.id ? selectedRole : role
        ),
      }));
    }
    handleDialogClose();
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Button
        variant="contained"
        color="primary"
        sx={{ marginBottom: 2 }}
        onClick={() => handleDialogOpen("Add")}
      >
        Add Role
      </Button>

      {roles.map((role) => (
        <Card key={role.id} sx={{ marginBottom: 2, padding: 2 }}>
          <CardContent>
            <Typography variant="h6">{role.name}</Typography>
            <Typography variant="body2">
              Permissions: {role.permissions.join(", ")}
            </Typography>
            <Button
              variant="outlined"
              color="info"
              size="small"
              sx={{ marginTop: 1, marginRight: 1 }}
              onClick={() => handleDialogOpen("Edit", role)}
            >
              Edit
            </Button>
          </CardContent>
        </Card>
      ))}

    
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>{dialogType} Role</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="dense"
            label="Role Name"
            name="name"
            value={selectedRole.name || ""}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Permissions (comma-separated)"
            name="permissions"
            value={selectedRole.permissions ? selectedRole.permissions.join(", ") : ""}
            onChange={(e) =>
              setSelectedRole({
                ...selectedRole,
                permissions: e.target.value.split(",").map((perm) => perm.trim()),
              })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default RoleManagement;
