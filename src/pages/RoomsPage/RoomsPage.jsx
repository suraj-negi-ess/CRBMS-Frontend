import React, { useState, useEffect } from "react";
import RoomsCard from "../../components/Rooms/RoomsCard";
import {
  Chip,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  Box,
  Button,
  Checkbox,
  ListItemText,
} from "@mui/material";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import axios from "axios";
import toast from "react-hot-toast";
import "./RoomsPage.css";
import { ContentHeader, MainContainer, RightContent } from "../../Style";

const RoomsPage = () => {
  const [roomsData, setRoomsData] = useState([]); // State for rooms data
  const [capacity, setCapacity] = useState("");
  const [isAvailable, setIsAvailable] = useState("all"); // Default to 'all'
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [amenitiesList, setAmenitiesList] = useState([]);
  const [selectedDate, setSelectedDate] = useState(dayjs()); // For date filter
  const [meetingStartTime, setMeetingStartTime] = useState(null); // For start time filter
  const [meetingEndingTime, setMeetingEndingTime] = useState(null); // For end time filter

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

  // Handle Start Time Change
  const handleStartTimeChange = (newStartTime) => {
    setMeetingStartTime(newStartTime);

    // Auto-select one hour later for ending time
    const autoEndTime = newStartTime.add(1, "hour");
    setMeetingEndingTime(autoEndTime);
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
    <MainContainer>
      <ContentHeader sx={{ position: "sticky" }} elevation="8">
        <DatePicker
          value={selectedDate}
          onChange={(newValue) => setSelectedDate(newValue)}
          format="DD-MM-YYYY"
          disablePast
          sx={{
            "& .MuiInputBase-root": {
              fontSize: "16px", // Adjust font size
              height: "40px", // Adjust input height
            },
          }}
        />
        <TimePicker
          value={meetingStartTime}
          onChange={handleStartTimeChange}
          defaultValue={dayjs(Date.now())}
          sx={{
            "& .MuiInputBase-root": {
              fontSize: "16px",
              height: "40px",
            },
          }}
        />
        <TimePicker
          value={meetingEndingTime}
          onChange={(newValue) => setMeetingEndingTime(newValue)}
          sx={{
            "& .MuiInputBase-root": {
              fontSize: "16px",
              height: "40px",
            },
          }}
        />
        <FormControl sx={{ width: 300 }} size="small">
          <InputLabel id="demo-multiple-checkbox-label">Amenities</InputLabel>
          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            value={selectedAmenities}
            onChange={handleChangeAmenities}
            input={<OutlinedInput label="Amenities" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} size="small" />
                ))}
              </Box>
            )}
          >
            {amenitiesList.map((item, index) => (
              <MenuItem key={index} value={item}>
                <Checkbox checked={selectedAmenities.includes(item)} />
                <ListItemText primary={item} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ marginRight: "10px", minWidth: 100 }} size="small">
          <InputLabel id="demo-select-small-label">Seats</InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={capacity}
            onChange={handleChangeCapacity}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>10+</MenuItem>
            <MenuItem value={20}>20+</MenuItem>
            <MenuItem value={30}>30+</MenuItem>
          </Select>
        </FormControl>
      </ContentHeader>
      <RightContent>
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
      </RightContent>
    </MainContainer>
  );
};

export default RoomsPage;
