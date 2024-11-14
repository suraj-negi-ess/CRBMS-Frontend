import React, { useState } from "react";
import "./Sidebar.css";
import { Button, styled } from "@mui/material";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import PowerSettingsNewOutlinedIcon from "@mui/icons-material/PowerSettingsNewOutlined";
import { adminSideBarData, userSideBarData } from "../../data";
import { Link, NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useSelector } from "react-redux";

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

const ArrowIcon = styled("span")(({ theme }) => ({
  marginLeft: "auto",
  width: "25px",
  height: "25px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const Sidebar = () => {
  const navigate = useNavigate();
  const [openSubMenu, setOpenSubMenu] = useState(null);

  const { user } = useSelector((state) => state.user);
  const isAdmin = user?.isAdmin;

  const menuToBeRendered = isAdmin ? adminSideBarData : userSideBarData;

  const handleSubMenuToggle = (id) => {
    setOpenSubMenu((prevOpenId) => (prevOpenId === id ? null : id));
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
    <div className="sidebar">
      <ul>
        {menuToBeRendered.map((item) => (
          <li key={item.id} className="menu-item">
            <NavLink to={item.path} className="nav-link">
              <Button
                className="button"
                fullWidth
                onClick={() => item.subMenu && isAdmin && handleSubMenuToggle(item.id)}
              >
                <span className="icon">{React.createElement(item.icon)}</span>
                {item.name}
                {item.subMenu && isAdmin && (
                  <span className="arrow">
                    <ArrowCircleRightOutlinedIcon />
                  </span>
                )}
              </Button>
            </NavLink>
            {item.subMenu && isAdmin && openSubMenu === item.id && (
              <div className="subMenuWrapper">
                <ul className="subMenu">
                  {item.subMenu.map((subItem, idx) => (
                    <li key={idx}>
                      <Link to={subItem.path}>{subItem.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
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
            <ArrowIcon>
              <ArrowCircleRightOutlinedIcon />
            </ArrowIcon>
          </LogoutButton>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
