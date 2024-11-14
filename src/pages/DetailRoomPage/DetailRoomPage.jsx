import React, { useEffect, useState } from "react";
import room from "../../assets/Images/room.jpg";
import "./DetailRoomPage.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import roomPic from "../../assets/Images/room.jpg";

const DetailRoomPage = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [error, setError] = useState(null);

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

  return (
    <div className="right-content w-100">
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
    </div>
  );
};

export default DetailRoomPage;
