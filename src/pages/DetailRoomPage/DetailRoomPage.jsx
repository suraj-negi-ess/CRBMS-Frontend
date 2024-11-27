import React, { useEffect, useState } from "react";
import room from "../../assets/Images/room.jpg";
import "./DetailRoomPage.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import roomPic from "../../assets/Images/room.jpg";
import { Button, Paper, styled } from "@mui/material";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

const ContentWrapper = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  height: "100%",
  width: "100%",
  lineHeight: "60px",
  borderRadius: "20px",
  padding: "15px",
  marginTop: "10px",
}));

const DetailRoomPage = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const fetchData = async () => {
    try {
      const response = await axios.get(`/api/v1/rooms/${id}`);
      setRoom(response.data.data.room);
    } catch (error) {
      setError("Failed to fetch room data.");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  if (!room) {
    return <p>Room not found</p>;
  }

  // Check if amenities is an array or a string and handle accordingly
  let amenitiesList = [];

  if (Array.isArray(room.amenities)) {
    amenitiesList = room.amenities; // If it's already an array
  } else if (typeof room.amenities === "string") {
    amenitiesList = room.amenities.split(","); // If it's a string, split it
  }

  const handleBookNow = () => {
    // take id and navigate to /book-meeting
    navigate(`/book-meeting/${id}`);
  };

  return (
    <div className="right-content w-100">
      <ContentWrapper>
        <div
          className="wrapper"
          style={{ background: "#fff", borderRadius: "5%" }}
        >
          <div className="w-100 d-flex flex-row">
            <div className="imageWrapper flex-1">
              <img
                // src={`http://localhost:9000/${room.roomImagePath}`}
                src={roomPic}
                alt="Room"
              />
            </div>

            <div className="infoWrapper d-flex flex-1 flex-column justify-content-space-around">
              <h2>{room.name}</h2>
              <p>Capacity: {room.capacity} People</p>
              <p>
                {room.isAvailable ? "Available" : `Booked By: ${room.bookedBy}`}
              </p>
              <h4>Amenities:</h4>
              <ul>
                {amenitiesList.length > 0 ? (
                  amenitiesList.map((amenity, index) => (
                    <li key={index}>{amenity.trim()}</li> // Trim to remove any extra spaces
                  ))
                ) : (
                  <p>No amenities listed</p>
                )}
              </ul>
            </div>
          </div>
          <p>{room.description}</p>
        </div>
        <div className="buttonWrapper">
          <div className="checkButtonWrapper">
            <DatePicker
              // value={selectedDate}
              // onChange={(newValue) => setSelectedDate(newValue)}
              format="DD-MM-YYYY"
              disablePast
              sx={{
                "& .MuiInputBase-root": {
                  fontSize: "16px", // Adjust font size
                  height: "40px", // Adjust input height
                },
              }}
            />
            <div className="timeWrapper">
              <TimePicker
                // value={meetingStartTime}
                // onChange={handleStartTimeChange}
                defaultValue={dayjs(Date.now())}
                sx={{
                  "& .MuiInputBase-root": {
                    fontSize: "16px",
                    height: "40px",
                  },
                }}
              />
              <TimePicker
                // value={meetingEndingTime}
                // onChange={(newValue) => setMeetingEndingTime(newValue)}
                sx={{
                  "& .MuiInputBase-root": {
                    fontSize: "16px",
                    height: "40px",
                  },
                }}
              />
            </div>
          </div>
          <Button size="large" variant="contained" onClick={handleBookNow}>
            Book Now
          </Button>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default DetailRoomPage;
