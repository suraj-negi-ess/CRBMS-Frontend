import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  CardActions,
  Chip,
} from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";

const RoomsCard = ({ room }) => {
  const navigate = useNavigate();
  const [hover, setHover] = useState(false);
  const { user } = useSelector((state) => state.user);
  const handleCardClick = () => {
    navigate(`/rooms/${room.id}`);
  };

  return (
    <Paper
      elevation={hover ? 20 : 4}
      sx={{
        position: "relative",
        borderRadius: "15px",
        overflow: "hidden",
        backgroundColor: "#fff",
        transformOrigin: "center",
        transition: "all 0.4s ease-in-out",
        ":hover": {
          boxShadow:
            "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
          "& img": {
            transform: "scale(1.1)",
          },
          "& .title": {
            color: "#28666e",
          },
        },
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* Image Section */}
      <Box
        component="figure"
        sx={{
          margin: 0,
          padding: 0,
          aspectRatio: "16 / 9",
          overflow: "hidden",
        }}
      >
        <Box
          component="img"
          src={`http://localhost:9000/${room.roomImagePath}`}
          alt={room.roomImagePath}
          sx={{
            width: "100%",
            height: "100%",
            transformOrigin: "center",
            transform: "scale(1.001)",
            transition: "transform 0.4s ease-in-out",
          }}
        />
      </Box>

      {/* Card Content */}
      <Box
        sx={{
          p: 1,
          display: "flex",
          flexDirection: "column",
          // justifyContent: "space-between"
          gap: 1,
          height: "250px",
        }}
      >
        <Typography
          variant="h6"
          component="h2"
          className="title"
          sx={{
            fontFamily: "'Bebas Neue', cursive",
            fontSize: "1.2rem",
            color: "black",
            transition: "color 0.3s ease-out",
          }}
        >
          {room.name}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <GroupsOutlinedIcon />
          {room.capacity} People
        </Typography>

        {/* Room Location */}
        <Typography
          variant="body2"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <LocationOnOutlinedIcon />
          {room.location || "Unknown Location"}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            textTransform: "capitalize",
          }}
        >
          {room.sanitationStatus || "Unknown Status"}
        </Typography>

        {/* Amenities */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 1,
          }}
        >
          {room.amenities.map((amenity, index) => (
            <Chip key={index} label={amenity} size="small" />
          ))}
        </Box>
      </Box>
      <CardActions sx={{ p: 0 }}>
        {user?.isAdmin ? (
          <Box
            sx={{
              display: "flex",
              width: "100%",
            }}
          >
            <Button
              fullWidth
              variant="contained"
              onClick={handleCardClick}
              sx={{
                borderRadius: "0 0 0px 10px",
                flex: 2,
              }}
              size="small"
            >
              View Room
            </Button>
            <Button
              fullWidth
              variant="contained"
              onClick={handleCardClick}
              sx={{
                borderRadius: "0 0 10px 0px",
                background: "red",
                flex: 1,
              }}
              size="small"
            >
              <DeleteIcon />
            </Button>
          </Box>
        ) : (
          <Button
            fullWidth
            variant="contained"
            onClick={handleCardClick}
            sx={{
              borderRadius: "0 0 12px 12px",
            }}
          >
            Book Now
          </Button>
        )}
      </CardActions>
    </Paper>
  );
};

export default RoomsCard;
