import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import "./MembersPage.css";
import { Paper, styled, Button } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import dayjs from "dayjs";

const AdminRow = styled("div")({
  backgroundColor: "lightgreen",
  "&:hover": {
    backgroundColor: "#b2fab4", // Adjust shade on hover
  },
});

const UserListWrapper = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  height: "100%",
  width: "100%",
  lineHeight: "60px",
  borderRadius: "20px",
  padding: "15px",
  marginTop: "10px",
}));

const MembersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleBlockStatusChange = async (id, isBlocked) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `/api/v1/user/block-status`,
        { userId: id, isBlocked: !isBlocked },
        { withCredentials: true }
      );

      if (response.status === 200) {
        toast.success(
          `User ${isBlocked ? "unblocked" : "blocked"} successfully!`
        );
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === id ? { ...user, isBlocked: !isBlocked } : user
          )
        );
      }
    } catch (error) {
      console.error("Failed to update block status", error);
      toast.error("An error occurred while updating the block status");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "avatarPath",
      headerName: "Avatar",
      width: 100,
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <img
            src={`http://localhost:9000/${params.value}`}
            alt="avatar"
            style={{ width: "45px", height: "45px", borderRadius: "50%" }}
          />
        </Box>
      ),
    },
    { field: "fullname", headerName: "Full Name", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "phoneNumber", headerName: "Phone Number", width: 150 },
    {
      field: "status",
      headerName: "Status",
      width: 100,
      renderCell: (params) => {
        // Calculate if the user is "active" or "inactive"
        const lastLoggedIn = dayjs(params.row.lastLoggedIn);
        const now = dayjs();
        const isActive = now.diff(lastLoggedIn, "second") <= 10; // Change to "day" and "30" for production

        return (
          <Box display="flex" alignItems="center" justifyContent="center">
            <FiberManualRecordIcon
              sx={{
                color: isActive ? "green" : "red",
                fontSize: 16,
                marginRight: 1,
              }}
            />
            {isActive ? "Active" : "Inactive"}
          </Box>
        );
      },
    },
  ];

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/v1/user/users?page=1&limit=10`);

      if (response.data.success) {
        const formattedUsers = response.data.data.users.rows.map((user) => ({
          id: user.id,
          avatarPath: user.avatarPath,
          fullname: user.fullname,
          email: user.email,
          phoneNumber: user.phoneNumber,
          isAdmin: user.isAdmin,
          isBlocked: user.isBlocked, // Make sure this field is included
        }));
        setUsers(formattedUsers);
      }
    } catch (error) {
      toast.error("Failed to fetch users");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = (id) => {
    alert(`${id} is Deleted`);
  };

  const actionColumns = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => (
        <div className="action">
          <Link to={`/edit/${params.id}`}>
            <EditOutlinedIcon color="success" />
          </Link>
          <Link to={`/view/${params.id}`}>
            <VisibilityOutlinedIcon color="secondary" />
          </Link>
          <div className="delete" onClick={() => handleDelete(params.id)}>
            <DeleteOutlineOutlinedIcon color="error" />
          </div>
        </div>
      ),
    },
    {
      field: "isBlocked",
      headerName: "Block Status",
      width: 150,
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <Button
            variant="contained"
            color={params.row.isBlocked ? "success" : "error"}
            onClick={() =>
              handleBlockStatusChange(params.row.id, params.row.isBlocked)
            }
            disabled={loading}
          >
            {params.row.isBlocked ? "Unblock" : "Block"}
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <div className="right-content w-100">
      <UserListWrapper>
        <Box sx={{ width: "100%" }}>
          <DataGrid
            showCellVerticalBorder
            showColumnVerticalBorder
            rows={users}
            columns={[...columns, ...actionColumns]}
            loading={loading}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            pageSizeOptions={[10]}
            sx={{
              "& .MuiDataGrid-cell:focus": {
                outline: "none",
              },
            }}
            getRowClassName={(params) =>
              params.row.isAdmin ? "admin-row" : ""
            }
          />
        </Box>
      </UserListWrapper>
    </div>
  );
};

export default MembersPage;
