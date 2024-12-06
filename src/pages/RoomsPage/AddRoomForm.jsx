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
  FormControlLabel,
  Switch,
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
  const [locationList, setLocationList] = useState([]);
  const [roomImageError, setRoomImageError] = useState("");
  const [formState, setFormState] = useState({
    sanitationStatus: false, // default value matches `defaultChecked`
  });

  const validateImage = (file) => {
    // Allowed image types
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];

    // Max file size (2MB)
    const maxSize = 2 * 1024 * 1024; // 2MB in bytes

    // Check file type
    if (!allowedTypes.includes(file.type)) {
      return "Only JPEG, PNG, GIF, and WEBP images are allowed.";
    }

    // Check file size
    if (file.size > maxSize) {
      return "Image must be smaller than 2MB.";
    }

    return null;
  };

  // Fetching the  list
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await axios.get("api/v1/location/activeLocations");
        const locations = response.data.data.result.map((location) => {
          return { id: location.id, location: location.locationName };
        });
        setLocationList(locations);
      } catch (error) {
        toast.error("Failed to load location");
        console.error("Error fetching location:", error);
      }
    };

    fetchLocation();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: "",
      location: null,
      capacity: "",
      roomImage: "",
      // password: "",
      description: "",
      sanitationStatus: false,
      isAvailable: true,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Room Name is required"),
      location: Yup.object({
        id: Yup.string().required("Id is required"),
        location: Yup.string().required("location is required"),
      }),
      capacity: Yup.number()
        .required("Capacity is required")
        .positive()
        .integer(),
      // password: Yup.string().required("Password is required"),
      description: Yup.string(),
    }),
    onSubmit: async (values, { resetForm }) => {
      console.log("Form Submitted:", values);
      try {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("capacity", values.capacity);
        formData.append("description", values.description);
        formData.append("location", values.location.id);
        formData.append("sanitationStatus", formState.sanitationStatus);
        if (values.roomImage) formData.append("roomImage", values.roomImage);

        const response = await axios.post("api/v1/rooms/add-room", formData, {
          withCredentials: true,
        });

        toast.success("Room added successfully");
        resetForm();
        setRoomImagePreview(null);
        setRoomImageError("");
      } catch (error) {
        toast.error(error.response?.data?.message || "An error occurred");
        console.error("Error adding room:", error);
      }
    },
  });

  const handleRoomImageChange = (event) => {
    const file = event.currentTarget.files[0];
    if (file) {
      // Reset previous error
      setRoomImageError("");

      // Validate image
      const validationError = validateImage(file);

      if (validationError) {
        // Set error and clear image
        setRoomImageError(validationError);
        setRoomImagePreview(null);
        formik.setFieldValue("roomImage", "");
        return;
      }

      // If validation passes
      formik.setFieldValue("roomImage", file);
      setRoomImagePreview(URL.createObjectURL(file));
    }
  };

   // Handle change for the Switch
   const handleSanitationStatusChange = (event) => {
    const { name, checked } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: checked, // Update state based on Switch value
    }));
  };
  
  return (
    <div className="pop-content w-100">
      <FormWrapper>
        <Box component="form" onSubmit={formik.handleSubmit}>
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
            <Autocomplete
              id="location"
              name="location"
              style={{ marginTop: 15, flex: 1 }}
              size="small"
              margin="normal"
              options={locationList}
              getOptionLabel={(locationList) => locationList.location}
              value={formik.values.location}
              onChange={(_, newValue) =>
                formik.setFieldValue("location", newValue)
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Location"
                  error={
                    formik.touched.location && Boolean(formik.errors.location)
                  }
                  helperText={formik.touched.location && formik.errors.location}
                />
              )}
              disableCloseOnSelect
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
              label="Tolerance Period"
              name="tolerancePeriod"
              margin="normal"
              type="number"
              // value={formik.values.Sanitation Time}
              onChange={formik.handleChange}
              // error={formik.touched.Sanitation Time && Boolean(formik.errors.Sanitation Time)}
              // helperText={formik.touched.Sanitation Time && formik.errors.Sanitation Time}
              size="small"
              style={{ marginRight: 8, flex: 1 }}
            />
          </Box>
          <Box display="flex" justifyContent="space-between">
            <FormControlLabel
              control={
                <Switch
                  checked={formState.sanitationStatus}
                  name="sanitationStatus"
                  onChange={handleSanitationStatusChange}
                />
              }
              label="Sanitation status"
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
                  sx={{ width: 50, height: 50 }}
                  src={roomImagePreview}
                  alt="Room Image Preview"
                >
                  <PhotoCameraIcon fontSize="medium" />
                </Avatar>
              </IconButton>
            </label>
          </Box>

          {roomImageError && (
            <Typography
              color="error"
              variant="body2"
              align="center"
              style={{ marginBottom: 16 }}
            >
              {roomImageError}
            </Typography>
          )}
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
