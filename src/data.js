// icons
import MeetingRoomOutlinedIcon from "@mui/icons-material/MeetingRoomOutlined";
import Groups2OutlinedIcon from "@mui/icons-material/Groups2Outlined";
import EventNoteOutlinedIcon from "@mui/icons-material/EventNoteOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import Diversity2Icon from "@mui/icons-material/Diversity2";
import ChairOutlinedIcon from "@mui/icons-material/ChairOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import RoomServiceOutlinedIcon from "@mui/icons-material/RoomServiceOutlined";
import BeenhereOutlinedIcon from "@mui/icons-material/BeenhereOutlined";
import roomImage from "./assets/Images/room.jpg";

export const adminSideBarData = [
  // {
  //   id: 1,
  //   name: "Dashboard",
  //   icon: DashboardOutlinedIcon,
  //   path: "/home",
  // },
  {
    id: 1,
    name: "Dashboard", //MY Meetings
    icon: LaptopMacIcon,
    path: "/meeting-calendar",
  },
  {
    id: 2,
    name: "Users",
    icon: Groups2OutlinedIcon,
    path: "/members",
    subMenu: [
      { name: "User List", path: "/members" },
      { name: "Add User", path: "/add-member" },
    ],
  },
  {
    id: 3,
    name: "Committee",
    icon: Groups2OutlinedIcon,
    path: "/committee",
    subMenu: [
      { name: "Committee List", path: "/committee" },
      { name: "Add Committee", path: "/add-committee" },
    ],
  },
  {
    id: 4,
    name: "Amenities",
    icon: CalendarMonthOutlinedIcon,
    path: "/amenities",
    subMenu: [
      { name: "Amenities List", path: "/amenities" },
      { name: "Add Amenity", path: "/add-amenity" },
    ],
  },
  {
    id: 5,
    name: "Rooms",
    icon: MeetingRoomOutlinedIcon,
    path: "/rooms",
    subMenu: [
      { name: "Room List", path: "/rooms" },
      { name: "Add Room", path: "/add-room" },
    ],
  },
];

export const userSideBarData = [
  {
    id: 1,
    name: "My Meeting", //MY Meetings
    icon: LaptopMacIcon,
    path: "/meeting-calendar",
  },
  {
    id: 2,
    name: "Book A Room",
    icon: MeetingRoomOutlinedIcon,
    path: "/rooms",
  },
  {
    id: 3,
    name: "My Committee",
    icon: Diversity2Icon,
    path: "/my-committee",
  },
];

export const cardData = [
  {
    id: 1,
    name: "Bookings",
    icon: ChairOutlinedIcon,
    count: 234,
    description: "This is room 1",
  },
  {
    id: 2,
    name: "System Users",
    icon: AdminPanelSettingsOutlinedIcon,
    count: 234,
    description: "This is room 1",
  },
  {
    id: 3,
    name: "Users",
    icon: PeopleAltOutlinedIcon,
    count: 234,
    description: "This is room 1",
  },
  {
    id: 4,
    name: "Rooms",
    icon: RoomServiceOutlinedIcon,
    count: 234,
    description: "This is room 1",
  },
  {
    id: 5,
    name: "Available Rooms",
    icon: BeenhereOutlinedIcon,
    count: 234,
    description: "This is room 1",
  },
];

export const roomCardData = [
  {
    id: "CRBMS001",
    roomName: "Room A",
    roomImg: roomImage,
    capacity: 20,
    amenities: ["Projector", "Whiteboard", "WiFi"],
    isAvailable: true,
    location: "1st Floor, Building A",
    bookedBy: null,
    nextAvailable: "2024-10-21T10:00:00",
    description: "A well-equipped room with a projector and a whiteboard.",
  },
  {
    id: "CRBMS002",
    roomName: "Room B",
    roomImg: roomImage,
    capacity: 15,
    amenities: ["Conference Phone", "Whiteboard"],
    isAvailable: false,
    location: "2nd Floor, Building B",
    bookedBy: "Committee Alpha",
    nextAvailable: "2024-10-22T14:00:00",
    description: "Ideal for small meetings and conference calls.",
  },
  {
    id: "CRBMS003",
    roomName: "Room C",
    roomImg: roomImage,
    capacity: 30,
    amenities: ["Projector", "Microphone", "Sound System", "WiFi"],
    isAvailable: true,
    location: "3rd Floor, Building C",
    bookedBy: null,
    nextAvailable: "2024-10-21T09:00:00",
    description: "Spacious room with sound system for large meetings.",
  },
  {
    id: "CRBMS004",
    roomName: "Room D",
    roomImg: roomImage,
    capacity: 10,
    amenities: ["Television", "Whiteboard"],
    isAvailable: false,
    location: "Ground Floor, Building A",
    bookedBy: "Committee Beta",
    nextAvailable: "2024-10-21T16:00:00",
    description: "Small room ideal for interviews and discussions.",
  },
  {
    id: "CRBMS005",
    roomName: "Room E",
    roomImg: roomImage,
    capacity: 25,
    amenities: ["WiFi", "Whiteboard"],
    isAvailable: true,
    location: "1st Floor, Building D",
    bookedBy: null,
    nextAvailable: "2024-10-21T11:00:00",
    description: "Quiet room with fast WiFi and ample seating.",
  },
  {
    id: "CRBMS006",
    roomName: "Room F",
    roomImg: roomImage,
    capacity: 50,
    amenities: ["Projector", "Microphone", "WiFi"],
    isAvailable: false,
    location: "2nd Floor, Building E",
    bookedBy: "Committee Gamma",
    nextAvailable: "2024-10-23T09:00:00",
    description: "Large room with advanced AV equipment for conferences.",
  },
  {
    id: "CRBMS007",
    roomName: "Room G",
    roomImg: roomImage,
    capacity: 12,
    amenities: ["Conference Phone", "WiFi"],
    isAvailable: true,
    location: "3rd Floor, Building F",
    bookedBy: null,
    nextAvailable: "2024-10-21T12:00:00",
    description: "Conference room with seating for 12 people.",
  },
  {
    id: "CRBMS008",
    roomName: "Room H",
    roomImg: roomImage,
    capacity: 40,
    amenities: ["Projector", "Sound System", "WiFi"],
    isAvailable: false,
    location: "4th Floor, Building G",
    bookedBy: "Committee Delta",
    nextAvailable: "2024-10-22T11:00:00",
    description: "Fully equipped large room for presentations.",
  },
  {
    id: "CRBMS009",
    roomName: "Room I",
    roomImg: roomImage,
    capacity: 18,
    amenities: ["Projector", "WiFi"],
    isAvailable: true,
    location: "Ground Floor, Building H",
    bookedBy: null,
    nextAvailable: "2024-10-21T14:00:00",
    description: "Mid-size room suitable for training sessions.",
  },
  {
    id: "CRBMS010",
    roomName: "Room J",
    roomImg: roomImage,
    capacity: 22,
    amenities: ["Projector", "Conference Phone", "WiFi"],
    isAvailable: false,
    location: "1st Floor, Building I",
    bookedBy: "Committee Epsilon",
    nextAvailable: "2024-10-23T13:00:00",
    description:
      "Room with advanced communication tools for international meetings.",
  },
  {
    id: "CRBMS011",
    roomName: "Room K",
    roomImg: roomImage,
    capacity: 14,
    amenities: ["WiFi", "Whiteboard"],
    isAvailable: true,
    location: "2nd Floor, Building J",
    bookedBy: null,
    nextAvailable: "2024-10-21T10:00:00",
    description: "Small room with modern amenities.",
  },
  {
    id: "CRBMS012",
    roomName: "Room L",
    roomImg: roomImage,
    capacity: 35,
    amenities: ["Projector", "WiFi", "Microphone"],
    isAvailable: true,
    location: "3rd Floor, Building K",
    bookedBy: null,
    nextAvailable: "2024-10-21T15:00:00",
    description: "Well-furnished room for medium to large meetings.",
  },
  {
    id: "CRBMS013",
    roomName: "Room M",
    roomImg: roomImage,
    capacity: 28,
    amenities: ["Projector", "Sound System", "WiFi"],
    isAvailable: false,
    location: "4th Floor, Building L",
    bookedBy: "Committee Zeta",
    nextAvailable: "2024-10-24T09:00:00",
    description: "Spacious room with sound system and projector.",
  },
  {
    id: "CRBMS014",
    roomName: "Room N",
    roomImg: roomImage,
    capacity: 20,
    amenities: ["WiFi", "Whiteboard"],
    isAvailable: true,
    location: "1st Floor, Building M",
    bookedBy: null,
    nextAvailable: "2024-10-21T09:30:00",
    description: "Quiet room for private discussions.",
  },
  {
    id: "CRBMS015",
    roomName: "Room O",
    roomImg: roomImage,
    capacity: 18,
    amenities: ["Television", "Whiteboard"],
    isAvailable: false,
    location: "2nd Floor, Building N",
    bookedBy: "Committee Theta",
    nextAvailable: "2024-10-22T13:00:00",
    description: "Modern room with a large display for presentations.",
  },
  {
    id: "CRBMS016",
    roomName: "Room P",
    roomImg: roomImage,
    capacity: 12,
    amenities: ["Conference Phone", "WiFi"],
    isAvailable: true,
    location: "3rd Floor, Building O",
    bookedBy: null,
    nextAvailable: "2024-10-21T10:30:00",
    description: "Small conference room with modern communication facilities.",
  },
  {
    id: "CRBMS017",
    roomName: "Room Q",
    roomImg: roomImage,
    capacity: 24,
    amenities: ["WiFi", "Projector"],
    isAvailable: false,
    location: "Ground Floor, Building P",
    bookedBy: "Committee Iota",
    nextAvailable: "2024-10-23T11:00:00",
    description: "Spacious meeting room with fast WiFi.",
  },
  {
    id: "CRBMS018",
    roomName: "Room R",
    roomImg: roomImage,
    capacity: 16,
    amenities: ["Whiteboard", "WiFi"],
    isAvailable: true,
    location: "1st Floor, Building Q",
    bookedBy: null,
    nextAvailable: "2024-10-21T14:30:00",
    description: "Perfect for small group discussions.",
  },
  {
    id: "CRBMS019",
    roomName: "Room S",
    roomImg: roomImage,
    capacity: 50,
    amenities: ["Projector", "Sound System", "WiFi"],
    isAvailable: false,
    location: "2nd Floor, Building R",
    bookedBy: "Committee Kappa",
    nextAvailable: "2024-10-25T09:00:00",
    description: "Large room with a powerful sound system for big meetings.",
  },
  {
    id: "CRBMS020",
    roomName: "Room T",
    roomImg: roomImage,
    capacity: 15,
    amenities: ["Television", "WiFi"],
    isAvailable: true,
    location: "3rd Floor, Building S",
    bookedBy: null,
    nextAvailable: "2024-10-21T12:00:00",
    description: "Mid-size room with a large screen for visual presentations.",
  },
];

export const meetings = [
  {
    id: 1,
    title: "Project Kickoff",
    startTime: "09:00:00",
    endTime: "09:45:00", // 45 minutes duration
    duration: "45 minutes",
    organizerName: "John Doe",
    status: "Completed",
  },
  {
    id: 2,
    title: "Team Sync",
    startTime: "10:00:00", // 15 min gap after previous meeting
    endTime: "10:30:00", // 30 minutes duration
    duration: "30 minutes",
    organizerName: "Jane Smith",
    status: "Completed",
  },
  {
    id: 3,
    title: "Client Demo",
    startTime: "10:45:00", // 15 min gap
    endTime: "11:15:00", // 30 minutes duration
    duration: "30 minutes",
    organizerName: "Alice Johnson",
    status: "In Progress",
  },
  {
    id: 4,
    title: "Sprint Planning",
    startTime: "11:30:00", // 15 min gap
    endTime: "12:30:00", // 1 hour duration
    duration: "1 hour",
    organizerName: "Bob Lee",
    status: "Scheduled",
  },
  {
    id: 5,
    title: "All Hands Meeting",
    startTime: "12:45:00", // 15 min gap
    endTime: "13:30:00", // 45 minutes duration
    duration: "45 minutes",
    organizerName: "Cathy Brown",
    status: "Scheduled",
  },
];
