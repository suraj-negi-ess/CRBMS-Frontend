import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Chip,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  PersonAdd as PersonAddIcon,
  ChevronRight as ChevronRightIcon,
  DeleteOutline,
  People,
} from "@mui/icons-material";
import React from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PeopleIcon from "@mui/icons-material/People";
import { useSelector } from "react-redux";
import { hideLoading, showLoading } from "../../Redux/alertSlicer";

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
              mb: 2,
            }}
          >
            <Typography variant="h6" component="h2">
              {committee.name}
            </Typography>
            {user?.isAdmin ? (
              <Chip
                label={`${committee.memberCount}`}
                size="large"
                color="primary"
                variant="filled"
                icon={<PeopleIcon />}
              />
            ) : (
              ""
            )}
          </Box>
          <Typography color="text.secondary" variant="body2" sx={{ mb: 2 }}>
            {committee.description}
          </Typography>

          {/* Avatar Group */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {committee.members && committee.members.length > 0 ? (
              <AvatarGroup max={4}>
                {committee.members.map((member, index) => (
                  <Tooltip
                    key={index}
                    title={
                      <Box
                        component="img"
                        src={
                          `http://localhost:9000/${member?.avatarPath}` || ""
                        }
                        alt={member.fullname || "Unknown"}
                        sx={{
                          width: "100px",
                          height: "100px",
                          objectFit: "cover",
                          borderRadius: "50%",
                        }}
                      />
                    }
                    placement="top"
                    arrow
                  >
                    <Avatar
                      alt={member.fullname || "Unknown"}
                      src={member.avatar || ""}
                      sx={{ bgcolor: "primary.main" }}
                    >
                      {member.fullname ? member.fullname.charAt(0) : "?"}
                    </Avatar>
                  </Tooltip>
                ))}
              </AvatarGroup>
            ) : (
              // Fallback message if no members are available
              <Typography variant="body2" color="text.secondary">
                None
              </Typography>
            )}
            <IconButton
              color="primary"
              size="small"
              onClick={() => handleView()}
            >
              <ChevronRightIcon />
            </IconButton>
          </Box>
        </CardContent>
        <CardActions
          sx={{
            mt: "auto",
            borderTop: 1,
            borderColor: "divider",
            justifyContent: "space-between",
            gap: 1,
          }}
        >
          <Button
            size="medium"
            startIcon={<PersonAddIcon />}
            color="success"
            onClick={handleView}
            variant="outlined"
          >
            View Members
          </Button>
          {user?.isAdmin ? (
            <Button
              size="medium"
              startIcon={<DeleteOutline />}
              color="error"
              onClick={handleDelete}
              variant="contained"
            >
              Delete Committee
            </Button>
          ) : (
            ""
          )}
        </CardActions>
      </CardActionArea>
    </Card>
  );
};

export default CommitteeCard;
