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
} from "@mui/material";
import "./RoomsPage.css";
import axios from "axios";
import toast from "react-hot-toast";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const amenitiesList = ["Projector", "Microphone", "Sound System", "WiFi"];

function getStyles(name, selectedAmenities) {
  return {
    fontWeight: selectedAmenities.includes(name) ? 600 : 400,
  };
}

const RoomsPage = () => {
  const [roomsData, setRoomsData] = useState([]); // State for rooms data
  const [capacity, setCapacity] = useState("");
  const [isAvailable, setIsAvailable] = useState("all"); // Default to 'all'
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [amenitiesList, setAmenitiesList] = useState([]);

  // Fetch room data function
  const fetchRoomsData = async () => {
    try {
      const response = await axios.get("api/v1/rooms/all-rooms");
      // console.log(response.data.data.rooms);
      toast.success("Room Fetched Successfully");
      setRoomsData(response.data.data.rooms);
    } catch (error) {
      toast.error("Something Went Wrong");
      console.error("Error fetching room data:", error);
    }
  };

  // Fetch amenities data function (Commented as per instructions)
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

  // Filtering rooms based on the selected filters
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

    return availabilityFilter && capacityFilter && amenitiesFilter;
  });

  return (
    <div className="right-content container w-100">
      <div className="row w-100">
        <div className="roomHeader col-xl-12 w-100">
          <FormControl sx={{ m: 1, width: 400 }} size="small">
            <InputLabel id="demo-multiple-chip-label">Amenities</InputLabel>
            <Select
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              value={selectedAmenities}
              onChange={handleChangeAmenities}
              input={
                <OutlinedInput id="select-multiple-chip" label="Amenities" />
              }
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} size="small" />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {amenitiesList.map((item, index) => (
                <MenuItem
                  key={index}
                  value={item}
                  style={getStyles(item, selectedAmenities)}
                >
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 100 }} size="small">
            <InputLabel id="demo-select-small-label">Seats</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={capacity}
              label="Capacity"
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
          <FormControl>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={isAvailable}
              onChange={handleAvailabilityChange}
            >
              <FormControlLabel value="all" control={<Radio />} label="All" />
              <FormControlLabel
                value="available"
                control={<Radio />}
                label="Available"
              />
              <FormControlLabel
                value="notAvailable"
                control={<Radio />}
                label="Not Available"
              />
            </RadioGroup>
          </FormControl>
        </div>
      </div>
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
    </div>
  );
};

export default RoomsPage;
