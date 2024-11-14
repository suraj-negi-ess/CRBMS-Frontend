import React, { useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";

// Images
import logo from "../../assets/Images/logo.webp";
import DP from "../../assets/Images/DP.jpg";
// MUI
import { Badge, Button, ListItemIcon, Menu, MenuItem } from "@mui/material";

// ICONS
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import MenuIcon from "@mui/icons-material/Menu";
import SearchBox from "../SearchBox/SearchBox";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import { Logout, PersonAdd, Settings } from "@mui/icons-material";
import PrivacyTipOutlinedIcon from "@mui/icons-material/PrivacyTipOutlined";
import FullscreenOutlinedIcon from "@mui/icons-material/FullscreenOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { useSelector } from "react-redux";

const Header = () => {
  const { user } = useSelector((state) => state.user);

  const [anchorEl, setAnchorEl] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleFullScreen = () => {
    const elem = document.documentElement; // Target the whole page for full-screen

    if (!isFullScreen) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
    setIsFullScreen(!isFullScreen); // Toggle the state
  };

  return (
    <>
      <header className="d-flex align-items-center">
        <div className="container-fluid w-100">
          <div className="row d-flex flex-row align-items-center ">
            <div className="col-sm-2 col-xs-3 part1">
              <Link to={"/"} className="d-flex align-items-center logo ">
                <img src={logo} alt="logo" />
                <span>Harambee</span>
              </Link>
            </div>

            <div className="col-sm-3 col-xs-3 d-flex align-items-center gap-5 part2">
              <Button className="rounded-circle">
                <MenuOpenIcon />
              </Button>
              <SearchBox />
            </div>

            <div className="col-sm-7 col-xs-3 d-flex align-items-center justify-content-end gap-2">
              <Button className="rounded-circle">
                <LightModeOutlinedIcon />
              </Button>
              {/* <Button className="rounded-circle">
                <Badge badgeContent={4} color="error">
                  <NotificationsOutlinedIcon />
                </Badge>
              </Button> */}
              <Button className="rounded-circle" onClick={handleFullScreen}>
                <FullscreenOutlinedIcon />
              </Button>

              <Button className="myAccWrapper" onClick={handleClick}>
                <div className="profileImage">
                  <span className="profilePhoto">
                    <img
                      src={`http://localhost:9000/${user.avatarPath}`}
                      alt="My Pic"
                    />{" "}
                    {/* DP is your default image */}
                  </span>
                </div>

                <div className="myAcc d-flex align-items-center">
                  <div className="userInfo">
                    <h4>{user.fullname}</h4>
                    <p className="mb-0">{user.username || ""}</p>
                  </div>
                </div>
              </Button>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                slotProps={{
                  paper: {
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 1.5,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      "&::before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem onClick={handleClose} sx={{ color: "green" }}>
                  <ListItemIcon>
                    <PersonOutlineOutlinedIcon
                      fontSize="small"
                      sx={{ color: "green" }}
                    />
                  </ListItemIcon>
                  Profile
                </MenuItem>
                <MenuItem onClick={handleClose} sx={{ color: "blue" }}>
                  <ListItemIcon>
                    <PrivacyTipOutlinedIcon
                      fontSize="small"
                      sx={{ color: "blue" }}
                    />
                  </ListItemIcon>
                  Reset Password
                </MenuItem>
                <MenuItem onClick={handleClose} sx={{ color: "red" }}>
                  <ListItemIcon>
                    <Logout fontSize="small" sx={{ color: "red" }} />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
