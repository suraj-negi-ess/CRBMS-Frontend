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
import React from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { hideLoading, showLoading } from "../../Redux/alertSlicer";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

const CommitteeCard = ({ committee, onDelete }) => {
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
    navigate(`/view-committee/${committee.id}`);
  };

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardActionArea>
        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: "2px",
            }}
          >
            <Typography variant="h6" component="h2">
              {committee.name}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <VisibilityOutlinedIcon color="success" onClick={handleView} />
              {user?.isAdmin && (
                <DeleteOutline color="error" onClick={handleDelete} />
              )}
              <Chip
                label={`${committee.memberCount}`}
                size="large"
                color="primary"
                variant="filled"
                icon={<PeopleIcon />}
              />
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
                    sx={{ bgcolor: "primary.main" }}
                  >
                    {member?.fullname ? member.fullname.charAt(0) : "?"}
                  </Avatar>
                </Tooltip>
              ))}
            </AvatarGroup>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CommitteeCard;
