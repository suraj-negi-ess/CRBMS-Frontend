import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Paper, Box, styled } from "@mui/material";
import {
  Add,
  Remove,
  DeleteOutlineOutlined as DeleteIcon,
  VisibilityOutlined as ViewIcon,
} from "@mui/icons-material";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import "./Amenities.css";
import PopupModals from "../../components/Modals/PopupModals";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { PersonAddAlt1Rounded } from "@mui/icons-material";
import AmenitiesAdd from "./AmenitiesAdd";
import DeleteModal from "../MembersPage/DeleteModal";
import AmenitiesEdit from "./AmenitiesEdit";

const DataGridWrapper = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  width: "100%",
  padding: "15px",
  marginTop: "10px",
  borderRadius: "20px",
}));

const AmenitiesList = () => {
  const [amenities, setAmenities] = useState([]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [updatedId, setUpdatedId] = useState("");
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    const fetchAmenities = async () => {
      try {
        const response = await axios.get("/api/v1/amenity/get-all-amenities");
        setAmenities(response.data.data.roomAmenities); // Assuming response data has 'amenities' array
        // toast.success("Amenities fetched successfully!");
      } catch (error) {
        toast.error("Failed to fetch amenities!");
        console.error("Error fetching amenities:", error);
      }
    };

    fetchAmenities();
  }, []);

  const handleQuantityChange = async (id, delta) => {
    const updatedAmenities = amenities.map((amenity) =>
      amenity.id === id
        ? { ...amenity, quantity: Math.max(1, amenity.quantity + delta) }
        : amenity
    );
    setAmenities(updatedAmenities);

    try {
      await axios.put("/api/v1/amenity/update-room-amenity-quantity", {
        id,
        quantity: updatedAmenities.find((amenity) => amenity.id === id)
          .quantity,
      });
      toast.success("Quantity updated successfully!");
    } catch (error) {
      toast.error("Failed to update quantity!");
      console.error("Error updating quantity:", error);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setDeleteId(null);
  };

  const handleOpen = (id) => {
    setDeleteId(id);
    setOpen(true);
  };

  const handleEdit = (id) => {
    setUpdatedId(id);
    setIsEditOpen(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/v1/amenity/delete/${deleteId}`);
      setAmenities((prevAmenities) =>
        prevAmenities.filter((amenity) => amenity.id !== deleteId)
      );
      toast.success("Amenity deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete amenity!");
      console.error("Error deleting amenity:", error);
    }
  };

  const columns = [
    { field: "name", headerName: "Amenity Name", flex: 1 },
    { field: "description", headerName: "Description", flex: 1.5 },
    // {
    //   field: "quantity",
    //   headerName: "Quantity",
    //   flex: 1,
    //   renderCell: (params) => (
    //     <Box display="flex" alignItems="center">
    //       <Button
    //         size="small"
    //         onClick={() => handleQuantityChange(params.row.id, -1)}
    //         disabled={params.row.quantity <= 1}
    //       >
    //         <Remove />
    //       </Button>
    //       <Box mx={1}>{params.row.quantity}</Box>
    //       <Button
    //         size="small"
    //         onClick={() => handleQuantityChange(params.row.id, 1)}
    //       >
    //         <Add />
    //       </Button>
    //     </Box>
    //   ),
    // },
    {
      field: "action",
      headerName: "Action",
      flex: 0.5,
      renderCell: (params) => (
        <Box display="flex" alignItems="center" gap={1}>
          <EditOutlinedIcon
            className="cursor"
            color="success"
            onClick={() => handleEdit(params.id)}
          />
          {/* <Link to={`/view/${params.id}`}>
            <ViewIcon color="secondary" />
          </Link> */}
          <DeleteIcon
            color="error"
            onClick={() => handleOpen(params.id)}
            style={{ cursor: "pointer" }}
          />
        </Box>
      ),
    },
  ];

  return (
    <div className="right-content w-100">
      <DataGridWrapper>
        <div className="buttonWrapper">
          <Button
            variant="contained"
            color="success"
            onClick={() => setIsAddOpen(true)}
          >
            <PersonAddAlt1Rounded /> Add Amenities
          </Button>
        </div>
        <DataGrid
          rows={amenities}
          columns={columns}
          pageSize={5}
          rowHeight={40}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
          getRowClassName={
            (params) => params.row.quantity < 5 && "" //? "low-row" : ""
          }
        />
      </DataGridWrapper>

      <PopupModals
        isOpen={isAddOpen}
        setIsOpen={setIsAddOpen}
        title={"Add Amenity"}
        modalBody={<AmenitiesAdd />}
      />

      <PopupModals
        isOpen={isEditOpen}
        setIsOpen={setIsEditOpen}
        title={"Edit Amenities"}
        modalBody={<AmenitiesEdit id={updatedId} />}
      />

      <DeleteModal
        open={open}
        onClose={handleClose}
        onDeleteConfirm={handleDelete}
      />
    </div>
  );
};

export default AmenitiesList;
