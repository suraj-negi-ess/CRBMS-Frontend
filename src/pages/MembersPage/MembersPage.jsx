import React, { useEffect, useState } from "react";
import { Box, Paper, styled, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import BlockIcon from '@mui/icons-material/Block';
import toast from "react-hot-toast";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import DeleteModal from "./DeleteModal";
import "./MembersPage.css";
import {
  AddCircleOutlineOutlined,
  CircleRounded,
  PersonAddAlt1Rounded,
} from "@mui/icons-material";
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import PopupModals from "../../components/Modals/PopupModals";
import AddMemberForm from "./AddMemberForm";
import UpdateMemberForm from "./UpdateMemberForm";
import ViewMember from "./ViewMember";
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
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [showDeleted, setShowDeleted] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [updatedId, setUpdatedId] = useState('');
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [viewId, setViewId] = useState('');
  const navigate = useNavigate();
  const filteredUsers = users.filter((user) =>
    showDeleted ? true : !user.deletedAt
  );
  
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/v1/user/users?page=1&limit=10`);
      console.log(response.data.data.users.rows);

      if (response.data.success) {
        setUsers(response.data.data.users.rows);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleOpen = (id) => {
    setDeleteId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setDeleteId(null);
  };

  const handleEdit=(id)=>{
    setUpdatedId(id);
    setIsEditOpen(true);
  }

  const handleView=(id)=>{
    setViewId(id);
    setIsViewOpen(true);
  }

  const handleDelete = async () => {
    try {
      setLoading(true);
      const response = await axios.delete(
        `/api/v1/user/soft-delete/${deleteId}`
      );
      console.log(response);
      if (response.status === 200) {
        toast.success("User deleted successfully");
        setUsers((prevUsers) =>
          prevUsers.filter((user) => user.id !== deleteId)
        );
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user");
    } finally {
      setLoading(false);
      handleClose(); // Close modal after delete
    }
  };

  // Block/unblock user
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
          `User ${isBlocked ? "unblocked" : "blocked"} successfully`
        );
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === id ? { ...user, isBlocked: !isBlocked } : user
          )
        );
      }
    } catch (error) {
      console.error("Failed to update block status:", error);
      toast.error("An error occurred while updating the block status");
    } finally {
      setLoading(false);
    }
  };

  // Columns for DataGrid
  const columns = [
    // { field: "id", headerName: "ID", width: 90 },
    {
      field: "avatarPath",
      headerName: "Avatar",
      width: 100,
      renderCell: (params) => (
        params.value?<img
          src={`http://localhost:9000/${params.value}`}
          alt="avatar"
          style={{ width: "35px", height: "35px", borderRadius: "50%" }}
        />:<AccountCircleRoundedIcon style={{ width: "35px", height: "35px", borderRadius: "50%" }} />
      ),
    },
    { field: "fullname", headerName: "Full Name", width: 330 },
    { field: "email", headerName: "Email", width: 330 },
    { field: "phoneNumber", headerName: "Phone Number", width: 200 },
    // {
    //   field: "status",
    //   headerName: "Status",
    //   width: 100,
    //   renderCell: (params) => {
    //     const isActive =
    //       dayjs().diff(dayjs(params.row.lastLoggedIn), "day") <= 30; // Active if last login is within 30 days
    //     return (
    //       <Box display="flex" alignItems="center">
    //         <FiberManualRecordIcon
    //           sx={{ color: isActive ? "green" : "red", fontSize: 16, mr: 1 }}
    //         />
    //         {isActive ? "Active" : "Inactive"}
    //       </Box>
    //     );
    //   },
    // },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => (
        <div style={{ display: "flex", gap: "10px" }}>
            <EditOutlinedIcon 
            className="cursor" 
            color="success" 
            onClick={()=>handleEdit(params.id)} 
            />

            <VisibilityOutlinedIcon 
            color="secondary" 
            className="cursor" 
            onClick={()=>handleView(params.id)} 
            />
          <div className="delete">
            <DeleteOutlineOutlinedIcon
              color="error"
              onClick={() => handleOpen(params.id)}
            />
          </div>
          <div className="delete">
            <BlockIcon
              color={params.row.isBlocked ? "success" : "error"}
              
              onClick={() =>
                handleBlockStatusChange(params.row.id, params.row.isBlocked)
              }
              disabled={loading}
            />
          </div>
        </div>
      ),
     },
    // {
    //   field: "isBlocked",
    //   headerName: "Block Status",
    //   width: 150,
    //   renderCell: (params) => (
    //     <Button
    //       variant="contained"
    //       color={params.row.isBlocked ? "success" : "error"}
    //       onClick={() =>
    //         handleBlockStatusChange(params.row.id, params.row.isBlocked)
    //       }
    //       disabled={loading}
    //     >
    //       {params.row.isBlocked ? "Unblock" : "Block"}
    //     </Button>
    //   ),
    // }
  ];

  return (
    <div className="right-content w-100">
       <UserListWrapper>
        <div className="legendWrapper">
          <div className="legends">
            <div className="legendAdmin">
              <CircleRounded color="success" />
              <p className="legendText">Admins</p>
            </div>
            <div className="legendDeleted">
              <CircleRounded color="error" />
              <p className="legendText">Deleted Members</p>
            </div>
          </div>
          <div className="buttonWrapper">
            <Button
              variant="contained"
              onClick={() => setShowDeleted(!showDeleted)}
            >
              {showDeleted ? "Hide Deleted" : "Show Deleted"}
            </Button>
            <Button variant="contained" color="success" onClick={()=>setIsOpen(true)}>
                <PersonAddAlt1Rounded /> Add User
            </Button>
          </div>
        </div>
        <Box sx={{ width: "100%" }}>
          <DataGrid
            showCellVerticalBorder
            showColumnVerticalBorder
            rows={filteredUsers}
            rowHeight={40}
            columns={[...columns]}
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
            getRowClassName={(params) => {
              if (params.row.deletedAt) {
                return "delete-row";
              }
              if (params.row.isAdmin) {
                return "admin-row";
              }
              return "";
            }}
          />
        </Box>
      </UserListWrapper>
      <DeleteModal
        open={open}
        onClose={handleClose}
        onDeleteConfirm={handleDelete}
      />
      <PopupModals
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={'Add New Member'}
        modalBody={
          <AddMemberForm />
        } />

      <PopupModals
        isOpen={isEditOpen}
        setIsOpen={setIsEditOpen}
        title={'Update Member Profile'}
        modalBody={
          <UpdateMemberForm id={updatedId} />
        } />

      <PopupModals
        isOpen={isViewOpen}
        setIsOpen={setIsViewOpen}
        title={'View Member Profile'}
        modalBody={
          <ViewMember id={viewId} />
        } />
    </div>
  );
};

export default MembersPage;
