import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Paper, Box, styled } from "@mui/material";
import {
  Add,
  Remove,
  DeleteOutlineOutlined as DeleteIcon,
  EditOutlined as EditIcon,
  VisibilityOutlined as ViewIcon,
} from "@mui/icons-material";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import "./Amenities.css";

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

  useEffect(() => {
    const fetchAmenities = async () => {
      try {
        const response = await axios.get("/api/v1/amenity/get-all-amenities");
        setAmenities(response.data.data.roomAmenities); // Assuming response data has 'amenities' array
        toast.success("Amenities fetched successfully!");
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

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/v1/amenity/delete/${id}`);
      setAmenities((prevAmenities) =>
        prevAmenities.filter((amenity) => amenity.id !== id)
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
    {
      field: "quantity",
      headerName: "Quantity",
      flex: 1,
      renderCell: (params) => (
        <Box display="flex" alignItems="center">
          <Button
            size="small"
            onClick={() => handleQuantityChange(params.row.id, -1)}
            disabled={params.row.quantity <= 1}
          >
            <Remove />
          </Button>
          <Box mx={1}>{params.row.quantity}</Box>
          <Button
            size="small"
            onClick={() => handleQuantityChange(params.row.id, 1)}
          >
            <Add />
          </Button>
        </Box>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => (
        <Box display="flex" alignItems="center" gap={1}>
          <Link to={`/view/${params.id}`}>
            <ViewIcon color="secondary" />
          </Link>
          <DeleteIcon
            color="error"
            onClick={() => handleDelete(params.id)}
            style={{ cursor: "pointer" }}
          />
        </Box>
      ),
    },
  ];

  return (
    <div className="right-content w-100">
      <DataGridWrapper>
        <DataGrid
          rows={amenities}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          autoHeight
          disableSelectionOnClick
          getRowClassName={(params) =>
            params.row.quantity < 5 ? "low-row" : ""
          }
        />
      </DataGridWrapper>
    </div>
  );
};

export default AmenitiesList;
