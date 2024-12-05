import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  PersonAdd as PersonAddIcon,
  DeleteOutline,
  People as PeopleIcon,
} from "@mui/icons-material";
import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { hideLoading, showLoading } from "../../Redux/alertSlicer";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { PaperWrapper } from "../../Style";

const CommitteeCard = ({ committee, onDelete }) => {
  const [hover, setHover] = useState(false);

  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this committee?")) {
      try {
        showLoading();
        await axios.delete(`/api/v1/committee/committees/${committee.id}`);
        onDelete(committee.id);
        toast.success("Committee deleted successfully!");
        hideLoading();
      } catch (error) {
        console.error("Error deleting committee:", error);
        toast.error("Failed to delete committee. Please try again.");
      }
    }
  };

  const handleView = () => {
    navigate(`/view-committee/${committee.id}`, { state: { committee } });
  };

  return (
    <Card
      elevation={hover ? 2 : 1}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      sx={{
        height: "400",
        display: "flex",
        flexDirection: "column",
        width: "32%",
        background: "#fafafa80",
      }}
    >
      <CardActionArea
        sx={{
          height: "100%",
        }}
      >
        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: "2px",
              gap: "10px",
            }}
          >
            <Typography variant="h6" component="h2">
              {committee.name}
            </Typography>
            <Box
              sx={{
                background: "#ff0000c2",
                borderRadius: "50%",
                padding: "5px",
              }}
            >
              {user?.isAdmin && (
                <Tooltip title="Delete Committee">
                  <DeleteOutline
                    onClick={handleDelete}
                    sx={{ cursor: "pointer", color: "white" }}
                    fontSize="medium"
                  />
                </Tooltip>
              )}
            </Box>
          </Box>
          <Typography color="text.secondary" variant="body2" sx={{ mb: 2 }}>
            {committee.description}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <AvatarGroup max={4}>
              {(committee.members || []).map((member, index) => (
                <Tooltip
                  key={index}
                  title={
                    <Box
                      component="img"
                      src={`http://localhost:9000/${member?.avatarPath || "https://icon-library.com/images/no-image-available-icon/no-image-available-icon-2.jpg"}`}
                      alt={member?.fullname || "Unknown"}
                      sx={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                        boxShadow: "0 0 8px rgba(0,0,0,0.3)",
                      }}
                    />
                  }
                  slotProps={{
                    tooltip: {
                      sx: {
                        padding: 0,
                        bgcolor: "transparent",
                        boxShadow: "none",
                      },
                    },
                  }}
                  placement="top"
                  arrow
                >
                  <Avatar
                    alt={member?.fullname || "Unknown"}
                    src={member?.avatar || ""}
                    sx={{
                      bgcolor: "primary.main",
                      width: "30px",
                      height: "30px",
                    }}
                  >
                    {member?.fullname ? member.fullname.charAt(0) : "?"}
                  </Avatar>
                </Tooltip>
              ))}
            </AvatarGroup>
            <Tooltip title="View all members">
              <Chip
                label={`${committee.memberCount}`}
                size="large"
                color="success"
                variant="outlined"
                icon={<PeopleIcon />}
                onClick={handleView}
                sx={{ cursor: "pointer", padding: "5px" }}
              />
            </Tooltip>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CommitteeCard;
