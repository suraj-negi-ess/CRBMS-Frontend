import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

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
import UpdateMemberForm from "./pages/MembersPage/UpdateMemberForm";
import CommitteeManagementMUI from "./pages/CommitteePage/CommitteePage";
import AddCommitteeForm from "./pages/CommitteePage/AddCommitteeForm";
import CommitteeMemberList from "./pages/CommitteePage/CommitteeMemberList";
import ViewMember from "./pages/MembersPage/ViewMember";
import { useState } from "react";
import { useSelector } from "react-redux";
import MyCommitteePage from "./pages/CommitteePage/MyCommitteePage";
import MeetingForm from "./pages/MeetingPage/MeetingForm";
import Loader from "./components/Loader/Loader";
import TodaysMeetings from "./pages/SinglePage/TodaysMeetings";
import Layout from "./components/Layout/Layout";

axios.defaults.baseURL = "http://localhost:9000";
axios.defaults.withCredentials = true;

function App() {
  const { loading } = useSelector((state) => state.alerts);
  // const [loading, setLoading] = useState(true);
  const { user } = useSelector((state) => state.user);
  const isAdmin = user?.isAdmin;
  return (
    <BrowserRouter>
      {loading && (
        // <div className="spinner-parent">
        //   <div className="spinner-border text-primary" role="status"></div>
        // </div>
        <Loader />
      )}
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
        {/* <Route path="/meeting-calendar" element={<CalenderPage />} /> */}
        {/* Public Routes - No Sidebar/Header */}
        <Route path="/rooms/:id" element={<DetailRoomPage />} />
        <Route path="/meetings/today" element={<TodaysMeetings />} />
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
              <Layout />
            </ProtectedRoutes>
          }
        >
          {isAdmin ? (
            <Route path="/home" element={<HomePage />} />
          ) : (
            <Route path="/home" element={<RoomsPage />} />
          )}
          {/* <Route path="/home" element={<HomePage />} /> */}
          <Route path="/rooms" element={<RoomsPage />} />
          {/* <Route path="/rooms/:id" element={<DetailRoomPage />} /> */}
          <Route path="/members" element={<MembersPage />} />
          <Route path="/meetings" element={<MainMeetingPage />} />
          <Route path="/meeting-calendar" element={<CalenderPage />} />
          <Route path="/my-committee" element={<MyCommitteePage />} />
          <Route path="/add-amenity" element={<AmenitiesAdd />} />
          <Route path="/amenities" element={<AmenitiesList />} />
          <Route path="/add-member" element={<AddMemberForm />} />
          <Route path="/add-room" element={<AddRoomForm />} />
          <Route path="/edit/:id" element={<UpdateMemberForm />} />
          <Route path="/committee" element={<CommitteeManagementMUI />} />
          <Route path="/add-committee" element={<AddCommitteeForm />} />
          <Route path="/book-meeting/:id" element={<MeetingForm />} />
          <Route
            path="/view-committee/:committeeId"
            element={<CommitteeMemberList />}
          />
          <Route path="/view/:id" element={<ViewMember />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
