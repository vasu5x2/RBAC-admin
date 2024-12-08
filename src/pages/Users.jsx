import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  IconButton,
  useTheme,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

const Users = () => {
  const [data, setData] = useState({ users: [] });
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState(""); // 'Add', 'Edit', 'Delete'
  const [selectedUser, setSelectedUser] = useState({});
  const theme = useTheme();

  useEffect(() => {
    // Simulate fetch from API
    fetch("/data.json")
      .then((response) => response.json())
      .then((json) => setData(json));
  }, []);

  if (!data.users) return <div>Loading...</div>;

  const { users } = data;

  const handleDialogOpen = (type, user = {}) => {
    setDialogType(type);
    setSelectedUser(user);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setSelectedUser({});
  };

  const handleInputChange = (e) => {
    setSelectedUser({ ...selectedUser, [e.target.name]: e.target.value });
  };

  const handleAction = () => {
    if (dialogType === "Add") {
      setData((prevData) => ({
        users: [
          ...prevData.users,
          { ...selectedUser, id: Date.now() }, // Generate a unique ID
        ],
      }));
    } else if (dialogType === "Edit") {
      setData((prevData) => ({
        users: prevData.users.map((user) =>
          user.id === selectedUser.id ? selectedUser : user
        ),
      }));
    } else if (dialogType === "Delete") {
      setData((prevData) => ({
        users: prevData.users.filter((user) => user.id !== selectedUser.id),
      }));
    }
    handleDialogClose();
  };

  return (
    <Box
      sx={{
        backgroundColor:
          theme.palette.mode === "dark" ? "#121212" : theme.palette.grey[100],
        padding: 3,
        borderRadius: 2,
        boxShadow: theme.palette.mode === "dark" ? "0px 0px 10px #444" : "0px 0px 10px #ccc",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          marginBottom: 2,
          color: theme.palette.text.primary,
        }}
      >
        User Management
      </Typography>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        color="primary"
        sx={{
          marginBottom: 2,
          textTransform: "none",
          backgroundColor: theme.palette.primary.main,
        }}
        onClick={() => handleDialogOpen("Add")}
      >
        Add User
      </Button>
      <TableContainer
  component={Paper}
  sx={{
    backgroundColor: theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
    boxShadow: theme.palette.mode === "dark" ? "0px 0px 10px #444" : "0px 0px 10px #ccc",
    borderRadius: 2,
  }}
>
  <Table>
    <TableHead>
      <TableRow>
        {["Name", "Email", "Role", "Status", "Actions"].map((header) => (
          <TableCell
            key={header}
            sx={{
              fontWeight: "bold",
              color: theme.palette.mode === "dark" ? "#fff" : theme.palette.text.secondary,
              textTransform: "uppercase",
              borderBottom: `2px solid ${
                theme.palette.mode === "dark" ? "#444" : theme.palette.divider
              }`,
            }}
          >
            {header}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
    <TableBody>
      {users.map((user) => (
        <TableRow
          key={user.id}
          sx={{
            backgroundColor:
              theme.palette.mode === "dark" ? "#2c2c2c" : "#fff",
            "&:hover": {
              backgroundColor:
                theme.palette.mode === "dark" ? "#3a3a3a" : theme.palette.grey[200],
            },
          }}
        >
          <TableCell sx={{ color: theme.palette.mode === "dark" ? "#fff" : theme.palette.text.primary }}>
            {user.name}
          </TableCell>
          <TableCell sx={{ color: theme.palette.mode === "dark" ? "#fff" : theme.palette.text.primary }}>
            {user.email}
          </TableCell>
          <TableCell sx={{ color: theme.palette.mode === "dark" ? "#fff" : theme.palette.text.primary }}>
            {user.role}
          </TableCell>
          <TableCell sx={{ color: theme.palette.mode === "dark" ? "#fff" : theme.palette.text.primary }}>
            {user.status}
          </TableCell>
          <TableCell>
            <IconButton
              color="info"
              size="small"
              onClick={() => handleDialogOpen("Edit", user)}
              sx={{
                color: theme.palette.mode === "dark" ? "#90caf9" : theme.palette.info.main,
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              color="error"
              size="small"
              onClick={() => handleDialogOpen("Delete", user)}
              sx={{
                color: theme.palette.mode === "dark" ? "#f44336" : theme.palette.error.main,
              }}
            >
              <DeleteIcon />
            </IconButton>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>


      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>
          {dialogType} {dialogType === "Delete" ? "" : "User"}
        </DialogTitle>
        <DialogContent>
          {dialogType === "Delete" ? (
            <Typography>
              Are you sure you want to delete{" "}
              <strong>{selectedUser.name}</strong>?
            </Typography>
          ) : (
            <>
              <TextField
                fullWidth
                margin="dense"
                label="Name"
                name="name"
                value={selectedUser.name || ""}
                onChange={handleInputChange}
              />
              <TextField
                fullWidth
                margin="dense"
                label="Email"
                name="email"
                value={selectedUser.email || ""}
                onChange={handleInputChange}
              />
              <TextField
                fullWidth
                margin="dense"
                label="Role"
                name="role"
                value={selectedUser.role || ""}
                onChange={handleInputChange}
              />
              <TextField
                fullWidth
                margin="dense"
                label="Status"
                name="status"
                value={selectedUser.status || ""}
                onChange={handleInputChange}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button
            onClick={handleAction}
            variant="contained"
            color={dialogType === "Delete" ? "error" : "primary"}
          >
            {dialogType}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Users;
