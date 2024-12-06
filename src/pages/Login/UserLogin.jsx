import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

// Styles
import "./Login.css";
import { motion } from "framer-motion";

// Material UI IMPORTS
import { Lock, Mail } from "@mui/icons-material";
import { Button } from "@mui/material";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../../Redux/alertSlicer";

//Components
import { setLoginEmail } from "../../Redux/verifyEmailSlicer";
import Input from "../../components/Common Components/Input/Input";

// Assests Import
import ebizLogo from "../../assets/Images/ebizlogo.png";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/v1/user/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        dispatch(setLoginEmail(email));
        navigate("/verify-email");
        toast.success(`Please complete authentication with OTP`);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error(error.response.data.message);
      console.log(error.response.data.message);
    }
  };

  return (
    <div className="authWrapper">
      <motion.div
        className="userLogin"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div style={{ padding: 10 }}>
          <h2 className="heading">Conference Room Booking Management System</h2>
          <form onSubmit={handleLogin}>
            <Input
              icon={Mail}
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              icon={Lock}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "24px",
              }}
            >
              <Link to="/forgot-password" className="forgotLink">
                Forgot Password?
              </Link>
            </div>
            {/* {error && (
              <p className="error">{error}</p>
            )} */}
            <div className="loginButtonBox">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mb: 2, width: "50%" }}
              >
                Login
              </Button>
            </div>
          </form>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              height: "100%",
              alignItems: "center",
              gap: 5,
            }}
          >
            <i>powered by</i>
            <div style={{ objectFit: "cover", width: "75px", height: "40px" }}>
              <img src={ebizLogo} style={{ borderRadius: "10px" }} />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default UserLogin;
