import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  Avatar,
  IconButton,
  Paper,
  styled,
  Autocomplete,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import axios from "axios";
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

const AddRoomForm = () => {
  const [roomImagePreview, setRoomImagePreview] = useState(null);
  const [amenitiesList, setAmenitiesList] = useState([]);

  useEffect(() => {
    const fetchAmenities = async () => {
      try {
        const response = await axios.get("api/v1/amenity/get-all-amenities");
        const amenities = response.data.data.roomAmenities.map(
          (amenity) => amenity.name
        );
        setAmenitiesList(amenities);
      } catch (error) {
        toast.error("Failed to load amenities");
        console.error("Error fetching amenities:", error);
      }
    };

    fetchAmenities();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: "",
      location: "",
      capacity: "",
      roomImage: "",
      password: "",
      description: "",
      sanitationStatus: false,
      isAvailable: true,
      amenities: [],
    },
    // validationSchema: null,
    // location,
    // capacity,
    // roomImagePath,
    // amenities,
    validationSchema: Yup.object({
      name: Yup.string().required("Room Name is required"),
      location: Yup.string().required("Location is required"),
      capacity: Yup.number()
        .required("Capacity is required")
        .positive()
        .integer(),
      password: Yup.string().required("Password is required"),
      description: Yup.string(),
      // amenities: Yup.array()
      //   .of(Yup.string())
      //   .required("Select at least one amenity"),
    }),
    onSubmit: async (values, { resetForm }) => {
      console.log("Form Submitted:", values);
      try {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("location", values.location);
        formData.append("capacity", values.capacity);
        formData.append("description", values.description);
        formData.append("password", values.password);
        formData.append("amenities", JSON.stringify(values.amenities));
        if (values.roomImage) formData.append("roomImage", values.roomImage);

        const response = await axios.post("api/v1/rooms/add-room", formData, {
          withCredentials: true,
        });

        toast.success("Room added successfully");
        resetForm();
        setRoomImagePreview(null);
      } catch (error) {
        toast.error(error.response?.data?.message || "An error occurred");
        console.error("Error adding room:", error);
      }
    },
  });

  const handleRoomImageChange = (event) => {
    const file = event.currentTarget.files[0];
    if (file) {
      formik.setFieldValue("roomImage", file);
      setRoomImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="right-content w-100">
      <FormWrapper>
        <Box component="form" onSubmit={formik.handleSubmit}>
          <Typography variant="h6" component="h2">
            Add New Room
          </Typography>
          <Box display="flex" justifyContent="space-between">
            <TextField
              label="Room Name"
              name="name"
              margin="normal"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              style={{ marginRight: 8, flex: 1 }}
              size="small"
            />
            <TextField
              label="Location"
              name="location"
              margin="normal"
              value={formik.values.location}
              onChange={formik.handleChange}
              error={formik.touched.location && Boolean(formik.errors.location)}
              helperText={formik.touched.location && formik.errors.location}
              style={{ flex: 1 }}
              size="small"
            />
          </Box>
          <Box display="flex" justifyContent="space-between">
            <TextField
              label="Capacity"
              name="capacity"
              margin="normal"
              type="number"
              value={formik.values.capacity}
              onChange={formik.handleChange}
              error={formik.touched.capacity && Boolean(formik.errors.capacity)}
              helperText={formik.touched.capacity && formik.errors.capacity}
              size="small"
              style={{ marginRight: 8, flex: 1 }}
            />
            <TextField
              label="Password"
              name="password"
              margin="normal"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              size="small"
              style={{ flex: 1 }}
              fullWidth
              mb={2}
            />
          </Box>
          <TextField
            label="Description"
            name="description"
            margin="normal"
            value={formik.values.description}
            onChange={formik.handleChange}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={formik.touched.description && formik.errors.description}
            size="small"
            // style={{ flex: 1 }}
            multiline
            rows={3}
            fullWidth
            style={{ marginBottom: 16 }}
          />
          <Autocomplete
            multiple
            id="amenities"
            name="amenities"
            size="small"
            options={amenitiesList}
            value={formik.values.amenities}
            onChange={(_, newValue) =>
              formik.setFieldValue("amenities", newValue)
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Amenities"
                error={
                  formik.touched.amenities && Boolean(formik.errors.amenities)
                }
                helperText={formik.touched.amenities && formik.errors.amenities}
              />
            )}
            disableCloseOnSelect
            isOptionEqualToValue={(option, value) => option === value}
          />
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            mt={2}
            mb={2}
          >
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="room-image-upload"
              type="file"
              onChange={handleRoomImageChange}
            />
            <label htmlFor="room-image-upload">
              <IconButton component="span">
                <Avatar
                  sx={{ width: 100, height: 100 }}
                  src={roomImagePreview}
                  alt="Room Image Preview"
                >
                  <PhotoCameraIcon fontSize="large" />
                </Avatar>
              </IconButton>
            </label>
          </Box>
          <Box mt={2} display="flex" justifyContent="flex-end">
            <Button type="submit" variant="contained" color="primary">
              Add Room
            </Button>
          </Box>
        </Box>
      </FormWrapper>
    </div>
  );
};

export default AddRoomForm;
