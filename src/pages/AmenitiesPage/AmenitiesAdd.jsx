import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  styled,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import toast from "react-hot-toast";

const FormWrapper = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  height: "100%",
  width: "100%",
  lineHeight: "60px",
  borderRadius: "20px",
  padding: "15px",
  marginTop: "10px",
}));

const AmenitiesAdd = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    quantity: 1,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleQuantityChange = (amount) => {
    setFormData((prevData) => ({
      ...prevData,
      quantity: Math.max(1, prevData.quantity + amount), // Ensure quantity is at least 1
    }));
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
    <div className="right-content w-100">
      <FormWrapper>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            maxWidth: 500,
            margin: "auto",
            mt: 5,
            p: 3,
            border: "2px solid #ddd",
            borderRadius: 3,
            background: "lightGrey",
          }}
        >
          <Typography variant="h4" gutterBottom align="center">
            Add Amenity
          </Typography>

          <TextField
            label="Amenity Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
            size="small"
          />
          <TextField
            label="Quantity"
            name="quantity"
            value={formData.quantity}
            onChange={(e) =>
              setFormData({
                ...formData,
                quantity: Math.max(1, Number(e.target.value)),
              })
            }
            fullWidth
            required
            margin="normal"
            size="small"
            // type="number"
            InputProps={{
              min: 1,
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton
                    onClick={() => handleQuantityChange(-1)}
                    disabled={formData.quantity <= 1}
                  >
                    <Remove />
                  </IconButton>
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => handleQuantityChange(1)}>
                    <Add />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
            multiline
            rows={4}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Add Amenity
          </Button>
        </Box>
      </FormWrapper>
    </div>
  );
};

export default AmenitiesAdd;
