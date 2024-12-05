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

const AddCommitteeForm = ({ onAddCommittee }) => {
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
      onAddCommittee(response.data.data.committee);
    } catch (err) {
      toast.error(err.response?.data?.message);
      console.error("Error adding Committee:", err);
    }
  };

  return (
    <div className="pop-content w-100">
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
        onClick={handleSubmit}
      >
        Add Committee
      </Button>
    </div>
  );
};

export default AddCommitteeForm;
