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
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import { useNavigate } from "react-router-dom";
import roomPic from "../../assets/Images/room.jpg";

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
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transition: "box-shadow 0.3s ease-in-out",
        // ":hover": {
        //   boxShadow: room.isAvailable
        //     ? "10px 10px 10px 10px rgba(0, 255, 0, 0.3)" // light green shadow
        //     : "10px 10px 10px 10px rgba(255, 0, 0, 0.3)", // light red shadow
        // },
      }}
      elevation={elevation}
      onMouseEnter={() => setElevation(24)}
      onMouseLeave={() => setElevation(6)}
    >
      <CardActionArea style={{ height: "250px" }}>
        <CardMedia
          component="img"
          style={{ height: "125px" }}
          image={roomPic}
          alt="green iguana"
        />

        <CardContent style={{ height: "125px" }}>
          {/* <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "row",
                alignItems: "center",
              }}
            > */}
          <Typography variant="h6" component="div">
            {room.name}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              display: "flex",
              alignItems: "center",
              // justifyContent: "center",
              gap: 1,
            }}
          >
            <GroupsOutlinedIcon />
            {room.capacity} People
          </Typography>
          {/* </div> */}
          <Typography
            variant="body2"
            sx={{ color: "text.secondary", fontSize: 14, textAlign: "center" }}
          >
            {room.description || "No description available."}
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
          <ul style={{ height: "200px" }}>
            {room.amenities.map((amenity, index) => (
              <li>{amenity}</li>
            ))}
          </ul>
        </CardContent>
      </CardActionArea>
      <CardActions height="150">
        <Button
          fullWidth
          size="small"
          variant="outlined"
          onClick={handleCardClick}
        >
          Book Now
        </Button>
      </CardActions>
    </Card>
  );
};

export default RoomsCard;
