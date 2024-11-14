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
  InputAdornment,
} from "@mui/material";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { Visibility, VisibilityOff } from "@mui/icons-material";
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

const AddMemberForm = () => {
  const [avatarPreview, setAvatarPreview] = useState(null);

  const committees = [
    "Finance",
    "Operations",
    "Events",
    "Membership",
    "Marketing",
    "Information Technology",
    "Hiring",
    "Agriculture",
  ];

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      fullname: "",
      email: "",
      role: "User",
      phoneNumber: "",
      committee: [],
      avatar: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      fullname: Yup.string().required("Name is required"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      role: Yup.string().required("Role is required"),
      phoneNumber: Yup.string()
        .matches(/^\d+$/, "Phone number must contain only digits")
        .required("Phone number is required")
        .length(10),
      password: Yup.string().required("Password is required"),
      committee: Yup.array()
        .of(Yup.string())
        .required("Select at least one committee"), // Add committee validation
    }),
    onSubmit: async (values, { resetForm }) => {
      console.log("Form Submitted");
      console.log(formik.errors);
      console.log(formik.values);
      try {
        const formData = new FormData();
        formData.append("username", values.username);
        formData.append("fullname", values.fullname);
        formData.append("email", values.email);
        formData.append("role", values.role);
        formData.append("phoneNumber", values.phoneNumber);
        formData.append("committee", values.committee);
        formData.append("password", values.password);

        if (values.avatar) {
          formData.append("avatar", values.avatar);
        }

        const response = await axios.post("api/v1/user/register", formData, {
          withCredentials: true,
        });

        console.log(response);

        toast.success("User added successfully");

        // Reset the form on success
        resetForm(); // Resets all form fields to their initial state
        setAvatarPreview(null); // Reset the avatar preview if applicable
      } catch (error) {
        toast.error(error.response?.data?.message || "An error occurred");
        console.error(error);
      }
    },
  });

  const handleAvatarChange = (event) => {
    const file = event.currentTarget.files[0];
    if (file) {
      formik.setFieldValue("avatar", file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="right-content w-100">
      <FormWrapper>
        <Box component="form" onSubmit={formik.handleSubmit}>
          <Typography variant="h6" component="h2">
            Add New Member
          </Typography>

          {/* Row with Username and Name fields */}
          <Box display="flex" justifyContent="space-between">
            <TextField
              label="Username"
              name="username"
              margin="normal"
              value={formik.values.username}
              onChange={formik.handleChange}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
              style={{ marginRight: 8, flex: 1 }}
              size="small"
            />
            <TextField
              label="Name"
              name="fullname"
              margin="normal"
              value={formik.values.fullname}
              onChange={formik.handleChange}
              error={formik.touched.fullname && Boolean(formik.errors.fullname)}
              helperText={formik.touched.fullname && formik.errors.fullname}
              style={{ flex: 1 }}
              size="small"
            />
          </Box>

          {/* Email field */}
          <Box display="flex" justifyContent="space-between" mb={2}>
            <TextField
              label="Email"
              name="email"
              margin="normal"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              size="small"
              style={{ marginRight: 8, flex: 1 }}
              fullWidth
            />
            <TextField
              label="Password"
              name="password"
              margin="normal"
              // Assuming you have formik values for password here
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              size="small"
              style={{ marginRight: 8, flex: 1 }}
              fullWidth
              type={showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showPassword
                          ? "hide the password"
                          : "display the password"
                      }
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      onMouseUp={handleMouseUpPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          {/* Row with Role and Phone fields */}
          <Box display="flex" justifyContent="space-between" mb={2}>
            <TextField
              label="Role"
              name="role"
              select
              margin="normal"
              value={formik.values.role}
              onChange={formik.handleChange}
              error={formik.touched.role && Boolean(formik.errors.role)}
              helperText={formik.touched.role && formik.errors.role}
              style={{ marginRight: 8, flex: 1 }}
              size="small"
            >
              <MenuItem value="User">User</MenuItem>
              <MenuItem value="Admin">Visitor</MenuItem>
            </TextField>
            <TextField
              label="Phone Number"
              name="phoneNumber"
              margin="normal"
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
              style={{ flex: 1 }}
              error={
                formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
              }
              helperText={
                formik.touched.phoneNumber && formik.errors.phoneNumber
              }
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">+91 - </InputAdornment>
                  ),
                },
              }}
              size="small"
            />
          </Box>

          {/* Committee Field */}
          <Autocomplete
            multiple
            id="committee"
            name="committee"
            options={committees}
            value={formik.values.committee}
            onChange={(_, newValue) =>
              formik.setFieldValue("committee", newValue)
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Committee"
                error={
                  formik.touched.committee && Boolean(formik.errors.committee)
                }
                helperText={formik.touched.committee && formik.errors.committee}
              />
            )}
            disableCloseOnSelect
            isOptionEqualToValue={(option, value) => option === value}
            ListboxProps={{
              style: {
                maxHeight: 200, // height of the dropdown menu
                overflowY: "auto", // enable scrolling
              },
            }}
          />

          {/* Avatar Section at the Bottom */}
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            mt={4}
            mb={3}
          >
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="avatar-upload"
              type="file"
              onChange={handleAvatarChange}
            />
            <label htmlFor="avatar-upload">
              <IconButton component="span">
                <Avatar
                  sx={{ width: 100, height: 100 }} // Larger size for Avatar
                  src={avatarPreview}
                  alt="Avatar Preview"
                >
                  <PhotoCameraIcon fontSize="large" />
                </Avatar>
              </IconButton>
            </label>
          </Box>

          {/* Action Buttons */}
          <Box mt={2} display="flex" justifyContent="flex-end">
            <Button type="submit" variant="contained" color="primary">
              Add Member
            </Button>
          </Box>
        </Box>
      </FormWrapper>
    </div>
  );
};

export default AddMemberForm;
