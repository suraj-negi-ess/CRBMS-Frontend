import React, { useState } from "react";
import "./Login.css";
import { motion } from "framer-motion";
import { Lock, Mail } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import Input from "../../components/Input/Input";
import FloatingShapes from "../../components/FloatingShapes/FloatingShapes";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../../Redux/alertSlicer";
import axios from "axios";
import { setLoginEmail } from "../../Redux/verifyEmailSlicer";
import ebizLogo from "../../assets/Images/ebizlogo.png";
import toast from "react-hot-toast";

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
      <FloatingShapes
        color={"#2232c5"}
        width={"256px"}
        height={"256px"}
        top={"-5%"}
        left={"10%"}
        delay={0}
      />
      <FloatingShapes
        color={"#2232c5"}
        width={"192px"}
        height={"192px"}
        top={"70%"}
        left={"80%"}
        delay={5}
      />
      <FloatingShapes
        color={"#2232c5"}
        width={"128px"}
        height={"128px"}
        top={"40%"}
        left={"-10%"}
        delay={2}
      />
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
              <motion.button
                whileHover={{ scale: 1.05 }}
                // whileTap={{ scale: 1 }}
                className="loginButton"
                type="submit"
                // disabled={isLoading}
              >
                {/* {isLoading ? <RotateLeftIcon className="loaderIcon" /> : "Login"} */}
                {/* <RotateLeftIcon className="loaderIcon" /> */}
                Login
              </motion.button>
            </div>
          </form>
        </div>
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
            <img src={ebizLogo} style={{ mixBlendMode: "color-burn" }} />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default UserLogin;
