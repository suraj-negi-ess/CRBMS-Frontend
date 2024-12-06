import React, { useState, useEffect } from "react";
import RoomsCard from "../../components/Rooms/RoomsCard";
import { Box, styled, Paper, Button, Grid2, Typography } from "@mui/material";
import dayjs from "dayjs";
import axios from "axios";
import toast from "react-hot-toast";
import { PersonAddAlt1Rounded } from "@mui/icons-material";
import "./RoomsPage.css";
import { MainContainer, RightContent } from "../../Style";
import PopupModals from "../../components/Common Components/Modals/PopupModals";
import AddRoomForm from "./AddRoomForm";
import RoomFilter from "./RoomFilter";
import CustomButton from "../../components/Common Components/CustomButton/CustomButton";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { useSelector } from "react-redux";

const DataGridWrapper = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  width: "100%",
  padding: "15px",
  borderRadius: "20px",
}));

const RoomsPage = () => {
  const [roomsData, setRoomsData] = useState([]); // State for rooms data
  const [capacity, setCapacity] = useState("");
  const [isAvailable, setIsAvailable] = useState("all"); // Default to 'all'
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [amenitiesList, setAmenitiesList] = useState([]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [meetingStartTime, setMeetingStartTime] = useState(null); // For start time filter
  const [meetingEndingTime, setMeetingEndingTime] = useState(null); // For end time filter
  const { user } = useSelector((state) => state.user);
  // Fetch room data
  const fetchRoomsData = async () => {
    try {
      const response = await axios.get("api/v1/rooms/all-rooms");
      setRoomsData(response.data.data.rooms);
      // toast.success("Room Fetched Successfully");
      // console.log(response.data.data.rooms);
    } catch (error) {
      toast.error("Something Went Wrong");
      console.error("Error fetching room data:", error);
    }
  };

  // Fetch amenities data
  const fetchAmenitiesData = async () => {
    try {
      const response = await axios.get("/api/v1/amenity/get-all-amenities");
      const names = response.data.data.roomAmenities.map((item) => item.name);
      setAmenitiesList(names);
    } catch (error) {
      console.error("Error fetching amenities data:", error);
    }
  };

  useEffect(() => {
    fetchRoomsData();
    fetchAmenitiesData();
  }, []);

  // Handle capacity change
  const handleChangeCapacity = (event) => {
    setCapacity(event.target.value);
  };

  // Handle amenities change
  const handleChangeAmenities = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedAmenities(typeof value === "string" ? value.split(",") : value);
  };

  // Handle availability change
  const handleAvailabilityChange = (event) => {
    setIsAvailable(event.target.value);
  };

  // Filter rooms based on the selected filters
  const filteredRooms = roomsData.filter((room) => {
    // Filter by availability
    const availabilityFilter =
      isAvailable === "all"
        ? true
        : room.isAvailable === (isAvailable === "available");

    // Filter by capacity
    const capacityFilter = capacity ? room.capacity >= capacity : true;

    // Filter by amenities
    const amenitiesFilter =
      selectedAmenities.length > 0
        ? selectedAmenities.every((amenity) => room.amenities.includes(amenity))
        : true;

    // Filter by date and time
    const timeFilter =
      meetingStartTime && meetingEndingTime
        ? dayjs(room.availableFrom).isBefore(meetingStartTime) &&
          dayjs(room.availableTo).isAfter(meetingEndingTime)
        : true;

    return (
      availabilityFilter && capacityFilter && amenitiesFilter && timeFilter
    );
  });

  return (
    <div className="right-content w-100">
      <DataGridWrapper>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "10px",
          }}
        >
          <Typography
            variant="h1"
            component="h1"
            sx={{
              marginRight: "20px",
              fontSize: "22px",
              fontWeight: 500,
              lineHeight: 1.5,
              color: "#2E2E2E",
            }}
          >
            Conference Rooms
          </Typography>
          {user?.isAdmin ? (
            <CustomButton
              onClick={() => setIsAddOpen(true)}
              title={"Add New Room"}
              placement={"left"}
              Icon={AddOutlinedIcon}
              fontSize={"medium"}
              background={"rgba(3, 176, 48, 0.68)"}
            />
          ) : (
            ""
          )}
        </Box>
        <MainContainer>
          <RoomFilter />
          <div className="cardBox row w-100">
            {filteredRooms.map((room, index) => (
              <div
                className="col-xs-12 col-sm-6 col-md-5 col-lg-4 col-xl-3 mb-4"
                key={index}
              >
                <RoomsCard room={room} />
              </div>
            ))}
          </div>
        </MainContainer>
      </DataGridWrapper>
      <PopupModals
        isOpen={isAddOpen}
        setIsOpen={setIsAddOpen}
        title={"Add New Room"}
        modalBody={<AddRoomForm />}
      />
    </div>
  );
};

export default RoomsPage;
