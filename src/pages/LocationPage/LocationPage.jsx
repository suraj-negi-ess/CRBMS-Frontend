import React, { useState } from "react";
import { PaperWrapper, RightContent } from "../../Style";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { Box, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import PopupModals from "../../components/Modals/PopupModals";
import LocationAdd from "./LocationAdd";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import {
  Add,
  Remove,
  DeleteOutlineOutlined as DeleteIcon,
  VisibilityOutlined as ViewIcon,
} from "@mui/icons-material";
import ToggleOffOutlinedIcon from "@mui/icons-material/ToggleOffOutlined";
import ToggleOnOutlinedIcon from "@mui/icons-material/ToggleOnOutlined";

const LocationPage = () => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
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
  // Fake data for the DataGrid
  const rows = [
    { id: 1, serialNo: 1, name: "Location A", status: "Active" },
    { id: 2, serialNo: 2, name: "Location B", status: "Inactive" },
    { id: 3, serialNo: 3, name: "Location C", status: "Active" },
  ];

  // Columns for the DataGrid
  const columns = [
    {
      field: "serialNo",
      headerName: "Serial No.",
      width: 100,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "status",
      headerName: "Status",
      width: 120,
    },
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
          <DeleteIcon
            color="error"
            onClick={() => handleOpen(params.id)}
            style={{ cursor: "pointer" }}
          />
          {status === "Inactive" ? (
            <ToggleOffOutlinedIcon />
          ) : (
            <ToggleOnOutlinedIcon />
          )}
        </Box>
      ),
    },
  ];

  return (
    <RightContent>
      <PaperWrapper>
        {/* Add Button */}
        <Button
          variant="contained"
          color="success"
          onClick={() => setIsAddOpen(true)}
          style={{ marginBottom: "15px" }}
        >
          <AddOutlinedIcon /> Location
        </Button>

        {/* DataGrid */}
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
          rowHeight={40}
        
        />

        {/* Popup Modal */}
        <PopupModals
          isOpen={isAddOpen}
          setIsOpen={setIsAddOpen}
          title={"Add Location"}
          modalBody={<LocationAdd />}
        />
      </PaperWrapper>
    </RightContent>
  );
};

export default LocationPage;
