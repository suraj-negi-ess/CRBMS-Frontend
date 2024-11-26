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
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

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

const AddCommitteeForm = () => {
  const { user } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    createdByUserId: user.id,
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
      const response = await axios.post(
        "api/v1/committee/committees",
        formData
      );
      toast.success("Committee added Successfully");
      setFormData({ name: "", description: "" });
    } catch (err) {
      toast.error(err.response?.data?.message);
      console.error("Error adding Committee:", err);
    }
  };
  // api/v1/committee/committees
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
            Add Committee
          </Typography>

          <TextField
            label="Committee Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
            size="small"
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
            Add Committee
          </Button>
        </Box>
      </FormWrapper>
    </div>
  );
};

export default AddCommitteeForm;
