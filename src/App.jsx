import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import RoomsPage from "./pages/RoomsPage/RoomsPage";
import MembersPage from "./pages/MembersPage/MembersPage";
import DetailRoomPage from "./pages/DetailRoomPage/DetailRoomPage";
import UserLogin from "./pages/Login/UserLogin";
import RoomLogin from "./pages/Login/RoomLogin";
import VerifyEmail from "./pages/Login/VerifyEmail";
import axios from "axios";
import PublicRoutes from "./components/Routes/PublicRoutes";
import ProtectedRoutes from "./components/Routes/ProtectedRoutes";
import MainMeetingPage from "./pages/MeetingPage/MainMeetingPage";
import CalenderPage from "./pages/CalenderPage/CalenderPage";
import AmenitiesAdd from "./pages/AmenitiesPage/AmenitiesAdd";
import AmenitiesList from "./pages/AmenitiesPage/AmenitiesList";
import { Toaster } from "react-hot-toast";
import ForgotPassword from "./pages/Login/ForgotPassword";
import ResetPassword from "./pages/Login/ResetPassword";
import AddMemberForm from "./pages/MembersPage/AddMemberForm";
import AddRoomForm from "./pages/RoomsPage/AddRoomForm";

axios.defaults.baseURL = "http://localhost:9000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          // Define default options
          className: "",
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
          },
        }}
      />
      <Routes>
        {/* Public Routes - No Sidebar/Header */}
        <Route
          path="/login"
          element={
            <PublicRoutes>
              <UserLogin />
            </PublicRoutes>
          }
        />
        <Route
          path="/room-login"
          element={
            <PublicRoutes>
              <RoomLogin />
            </PublicRoutes>
          }
        />
        <Route
          path="/verify-email"
          element={
            <PublicRoutes>
              <VerifyEmail />
            </PublicRoutes>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <PublicRoutes>
              <ForgotPassword />
            </PublicRoutes>
          }
        />
        <Route
          path="/reset-password/:token"
          element={
            <PublicRoutes>
              <ResetPassword />
            </PublicRoutes>
          }
        />

        {/* Protected Routes - With Sidebar and Header */}
        <Route
          element={
            <ProtectedRoutes>
              <MainLayout />
            </ProtectedRoutes>
          }
        >
          <Route path="/home" element={<HomePage />} />
          <Route path="/rooms" element={<RoomsPage />} />
          <Route path="/rooms/:id" element={<DetailRoomPage />} />
          <Route path="/members" element={<MembersPage />} />
          <Route path="/meetings" element={<MainMeetingPage />} />
          <Route path="/calendar" element={<CalenderPage />} />
          <Route path="/add-amenity" element={<AmenitiesAdd />} />
          <Route path="/amenities" element={<AmenitiesList />} />
          <Route path="/add-member" element={<AddMemberForm />} />
          <Route path="/add-room" element={<AddRoomForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const MainLayout = () => {
  return (
    <>
      <Header />
      <div className="main d-flex">
        <div className="sidebarWrapper">
          <Sidebar />
        </div>
        <div className="content">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default App;
