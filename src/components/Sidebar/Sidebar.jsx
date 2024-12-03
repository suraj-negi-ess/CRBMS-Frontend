import React, { useContext, useState } from "react";
import "./Sidebar.css";
import { Button, styled } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import PowerSettingsNewOutlinedIcon from "@mui/icons-material/PowerSettingsNewOutlined";
import { adminSideBarData, userSideBarData } from "../../data";
import { Link, NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useSelector } from "react-redux";
import { MyContext } from "../Layout/Layout";

// Styled components for the logout button
const LogoutButton = styled(Button)(({ theme }) => ({
  color: "red",
  textAlign: "left",
  justifyContent: "start",
  borderRadius: "0px",
  padding: "15px 15px",
  textTransform: "capitalize",
  fontFamily: "Poppins",
  fontSize: "large",
  "&:hover": {
    backgroundColor: theme.palette.error.dark,
    color: "black",
  },
}));

const LogoutIcon = styled("span")(({ theme }) => ({
  width: "25px",
  height: "25px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginRight: "20px",
}));

const Sidebar = () => {
  const { isSidebarVisible, setIsSidebarVisible } = useContext(MyContext);
  const navigate = useNavigate();
  const [openSubMenu, setOpenSubMenu] = useState(null);

  const { user } = useSelector((state) => state.user);
  const isAdmin = user?.isAdmin;

  const menuToBeRendered = isAdmin ? adminSideBarData : userSideBarData;

  const handleSubMenuToggle = (id) => {
    setOpenSubMenu((prevOpenId) => (prevOpenId === id ? null : id)); // Toggle submenu visibility
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        `/api/v1/user/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        toast.success("User Logged Out");
        navigate("/login");
      } else {
        toast.error("Logout Failed");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
      console.log(error);
    }
  };

  return (
    <div
      className={`${isSidebarVisible === true ? "sidebar-toggle" : "sidebar"}`}
    >
      <ul>
        {menuToBeRendered.map((item) => (
          <li key={item.id} className="menu-item">
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `nav-link ${isActive ? "active-link" : ""}`
              }
              style={({ isActive }) =>
                isActive
                  ? { backgroundColor: "#e0f7fa"} // Add your desired background color and styles here
                  : {}
              }
            >
              <Button
                className="button"
                fullWidth
                onClick={() =>
                  item.subMenu && isAdmin && handleSubMenuToggle(item.id)
                }
              >
                <span className="icon">{React.createElement(item.icon)}</span>
                {item.name}
                {item.subMenu && isAdmin && (
                  <span
                    className={`arrow ${
                      openSubMenu === item.id ? "rotate" : ""
                    }`}
                  >
                    <ArrowForwardIosIcon fontSize="12px" />
                  </span>
                )}
              </Button>
            </NavLink>
          </li>
        ))}
      </ul>
      <ul>
        <li className="logout">
          <LogoutButton fullWidth onClick={handleLogout}>
            <LogoutIcon>
              <PowerSettingsNewOutlinedIcon />
            </LogoutIcon>
            Logout
          </LogoutButton>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
