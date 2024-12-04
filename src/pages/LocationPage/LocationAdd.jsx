import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";

const LocationAdd = () => {
  const [formData, setFormData] = useState({
    name: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("api/v1/amenity/add-amenity", formData);
      toast.success("Amenity added Successfully");
      setFormData({ name: "", description: "", quantity: 1 });
    } catch (err) {
      toast.error(err.response?.data?.message);
      console.error("Error adding amenity:", err);
    }
  };

  return (
    <div className="pop-content w-100">
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          maxWidth: 500,
          margin: "auto",
          borderRadius: 3,
        }}
      >
        <TextField
          label="Location Name"
          name="location"
          value={formData.location}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
          size="small"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Add Location
        </Button>
      </Box>
    </div>
  );
};

export default LocationAdd;
