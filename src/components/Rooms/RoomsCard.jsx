import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import ReduceCapacityOutlinedIcon from "@mui/icons-material/ReduceCapacityOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import LiveTvOutlinedIcon from "@mui/icons-material/LiveTvOutlined";
import MicOutlinedIcon from "@mui/icons-material/MicOutlined";
import SpeakerOutlinedIcon from "@mui/icons-material/SpeakerOutlined";
import WifiOutlinedIcon from "@mui/icons-material/WifiOutlined";
import { useNavigate } from "react-router-dom";

const RoomsCard = ({ room }) => {
  const [elevation, setElevation] = useState(6);
  const navigate = useNavigate();
  const handleCardClick = () => {
    navigate(`/rooms/${room.id}`);
  };

  return (
    <Card
      sx={{
        maxWidth: 345,
        height: 400,
        border: room.isAvailable ? "2px solid green" : "2px solid red",
        borderRadius: "20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transition: "box-shadow 0.3s ease-in-out",
        ":hover": {
          boxShadow: room.isAvailable
            ? "10px 10px 10px 10px rgba(0, 255, 0, 0.3)" // light green shadow
            : "10px 10px 10px 10px rgba(255, 0, 0, 0.3)", // light red shadow
        },
      }}
      elevation={elevation}
      onMouseEnter={() => setElevation(24)}
      onMouseLeave={() => setElevation(6)}
      onClick={handleCardClick}
    >
      <CardActionArea height="200">
        <img
          src={`http://localhost:9000/${room.roomImagePath}`}
          alt={room.name}
          height="100"
          style={{ width: "100%", objectFit: "cover" }}
        />

        <CardContent>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Typography variant="h6" component="div">
              {room.roomName}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
              }}
            >
              <GroupsOutlinedIcon />
              {room.capacity} People
            </Typography>
          </div>
          <Typography
            variant="body2"
            sx={{ color: "text.secondary", fontSize: 14 }}
          >
            {room.description}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              display: "flex",
              alignItems: "center",
              // justifyContent: "center",
              gap: 1,
              mt: 1,
            }}
          >
            <LocationOnOutlinedIcon />
            {room.location}
          </Typography>
          <Typography variant="body2" sx={{ mt: 1, display: "flex", gap: 1 }}>
            {room.amenities.map((amenity, index) => (
              <React.Fragment key={index}>
                {amenity === "Projector" && <LiveTvOutlinedIcon />}
                {amenity === "Microphone" && <MicOutlinedIcon />}
                {amenity === "Sound System" && <SpeakerOutlinedIcon />}
                {amenity === "WiFi" && <WifiOutlinedIcon />}
              </React.Fragment>
            ))}
          </Typography>
          <Typography
            variant="body2"
            sx={{ mt: 1, color: room.isAvailable ? "green" : "red" }}
          >
            {/* {room.isAvailable ? "Available" : `Booked by: ${room.bookedBy}`} */}
            {room.isAvailable ? "Available" : "Not Available"}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          fullWidth
          size="small"
          disabled={!room.isAvailable}
          sx={{
            background: room.isAvailable ? "green" : "red",
            color: "white",
          }}
        >
          {/* {room.isAvailable ? "Book Now" : "Unavailable"} */}
          Book Now
        </Button>
      </CardActions>
    </Card>
  );
};

export default RoomsCard;