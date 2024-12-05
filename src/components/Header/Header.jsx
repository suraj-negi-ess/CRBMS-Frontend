import React, { useContext, useState } from "react";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import unknownUser from "../../assets/Images/unknownUser.PNG";
// Images
import logo from "../../assets/Images/logo.webp";

// MUI
import {
  Badge,
  Button,
  Divider,
  ListItemIcon,
  Menu,
  MenuItem,
  Popover,
} from "@mui/material";

// ICONS
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import MenuOutlined from "@mui/icons-material/MenuOutlined";
import SearchBox from "../SearchBox/SearchBox";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import FullscreenOutlinedIcon from "@mui/icons-material/FullscreenOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import Logout from "@mui/icons-material/Logout";
import KeyOutlinedIcon from "@mui/icons-material/KeyOutlined";

// Context and State Management
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import axios from "axios";
import { MyContext } from "../Layout/Layout";

// Notifications Menu Component
import NotificationsMenu from "../Notifications/NotificationsMenu";
import { notifications } from "../../data";

const Header = () => {
  const context = useContext(MyContext);
  const { user } = useSelector((state) => state.user);

  const [menuAnchor, setMenuAnchor] = useState(null);
  const [notificationsAnchor, setNotificationsAnchor] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const navigate = useNavigate();

  // Common Function to Toggle Menus
  const handleMenuToggle = (anchorSetter) => (event) => {
    anchorSetter((prevAnchor) => (prevAnchor ? null : event.currentTarget));
  };

  // Handle Fullscreen Toggle
  const handleFullScreen = () => {
    const elem = document.documentElement;

    if (!isFullScreen) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      }
    }
    setIsFullScreen(!isFullScreen); // Toggle State
  };

  // Logout Handler
  const handleLogout = async () => {
    try {
      const response = await axios.post(
        `/api/v1/user/logout`,
        {},
        { withCredentials: true }
      );
      if (response.status === 200) {
        toast.success("User Logged Out");
        navigate("/login");
      } else {
        toast.error("Logout Failed");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
      console.error(error);
    }
  };

  return (
    <header>
      <div className="container-fluid w-100">
        <div className="row d-flex flex-row align-items-center">
          <div className="col-sm-2 col-xs-3 part1">
            <Link to={"/home"} className="d-flex align-items-center logo gap-2">
              <img src={logo} alt="logo" />
              <span>Harambee</span>
            </Link>
          </div>

          {/* Sidebar and Search */}
          <div className="col-sm-3 col-xs-3 d-flex align-items-center gap-5 part2">
            <Button
              className="rounded-circle"
              onClick={() =>
                context.setIsSidebarVisible(!context.isSidebarVisible)
              }
            >
              {context.isSidebarVisible ? <MenuOpenIcon /> : <MenuOutlined />}
            </Button>
            <SearchBox />
          </div>

          {/* Action Buttons */}
          <div className="col-sm-7 col-xs-3 d-flex align-items-center justify-content-end gap-2">
            {/* Light Mode Button */}
            <Button className="rounded-circle">
              <LightModeOutlinedIcon />
            </Button>

            {/* Notifications Button */}
            <Button
              className="rounded-circle"
              onClick={handleMenuToggle(setNotificationsAnchor)}
            >
              <Badge badgeContent={4} color="error">
                <NotificationsOutlinedIcon />
              </Badge>
            </Button>

            {/* Fullscreen Button */}
            <Button className="rounded-circle" onClick={handleFullScreen}>
              {isFullScreen ? (
                <FullscreenExitOutlinedIcon />
              ) : (
                <FullscreenOutlinedIcon />
              )}
            </Button>

            {/* Profile Button */}
            <Button
              className="myAccWrapper"
              onClick={handleMenuToggle(setMenuAnchor)}
            >
              <div className="profileImage">
                <span className="profilePhoto">
                  <img
                    src={
                      user?.avatarPath
                        ? `http://localhost:9000/${user?.avatarPath}`
                        : unknownUser
                    }
                    alt="My Pic"
                  />
                </span>
              </div>
              {/* <div className="myAcc d-flex align-items-center">
                <div className="userInfo">
                  <h4>{user?.fullname}</h4>
                  <p className="mb-0">{user?.username || ""}</p>
                </div>
              </div> */}
            </Button>
          </div>
        </div>
      </div>

      {/* Profile Menu */}
      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleMenuToggle(setMenuAnchor)}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <div className="userInfo">
          <h4>Welcome,</h4>
          <p className="mb-0">{user?.fullname}</p>
        </div>
        <Divider variant="middle" component="li" />
        <MenuItem
          onClick={handleMenuToggle(setMenuAnchor)}
          sx={{ color: "green" }}
        >
          <ListItemIcon>
            <PersonOutlineOutlinedIcon
              fontSize="small"
              sx={{ color: "green" }}
            />
          </ListItemIcon>
          Profile
        </MenuItem>
        <MenuItem
          onClick={handleMenuToggle(setMenuAnchor)}
          sx={{ color: "blue" }}
        >
          <ListItemIcon>
            <KeyOutlinedIcon fontSize="small" sx={{ color: "blue" }} />
          </ListItemIcon>
          Reset Password
        </MenuItem>
        <MenuItem onClick={handleLogout} sx={{ color: "red" }}>
          <ListItemIcon>
            <Logout fontSize="small" sx={{ color: "red" }} />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>

      {/* Notifications Menu */}
      <Popover
        open={Boolean(notificationsAnchor)}
        anchorEl={notificationsAnchor}
        onClose={handleMenuToggle(setNotificationsAnchor)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <NotificationsMenu
          notifications={notifications}
          onViewAll={() => alert("View All Notifications clicked!")}
        />
      </Popover>
    </header>
  );
};

export default Header;
