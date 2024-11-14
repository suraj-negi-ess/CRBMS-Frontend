import React, { useEffect, useState } from "react";
import room from "../../assets/Images/room.jpg";
import "./DetailRoomPage.css";
import { useParams } from "react-router-dom";
import { roomCardData } from "../../data";
import axios from "axios";

const DetailRoomPage = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null); // State to hold room data
  const [error, setError] = useState(null);
  const fetchData = async () => {
    try {
      const response = await axios.get(`/api/v1/rooms/:${id}`);
      setRoom(response.data); // Assuming API returns { room: {...} }
      console.log(response.data.data.room);
    } catch (error) {
      setError("Failed to fetch room data.");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
    console.log("asda");
  }, [id]);

  if (!room) {
    return <p>Room not found</p>;
  }
  return (
    <div className="right-content">
      <div
        className="wrapper"
        style={{ background: "#fff", borderRadius: "5%" }}
      >
        <div className="w-100 d-flex flex-row">
          <div className="imageWrapper">
            <img src={room.roomImg} alt="Room" />
          </div>

          <div className="infoWrapper d-flex flex-column justify-content-space-arounf">
            <h2>{room.roomName}</h2>
            <p>Capacity: {room.capacity} People</p>
            <p>Amenities: Projector, WiFi, Microphone</p>
            <p>Current : Team Dhruv</p>
            <p>
              {room.isAvailable ? "Availabe" : `Booked By : ${room.bookedBy}`}
            </p>
            <p>Reating: 4.5/5 </p>
          </div>
        </div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          varius enim in eros elementum tristique.
        </p>
      </div>
    </div>
  );
};

export default DetailRoomPage;
