// src/App.jsx
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import axios from "axios";
import Loader from "./components/Loader/Loader";
import PublicRoutes from "./components/Routes/PublicRoutes";
import ProtectedRoutes from "./components/Routes/ProtectedRoutes";
import {
  adminRoutes,
  userRoutes,
  publicRoutes,
} from "./components/Routes/Routes";
import Layout from "./components/Layout/Layout";

// Axios Configuration
axios.defaults.baseURL = "http://localhost:9000";
axios.defaults.withCredentials = true;

function App() {
  const { loading } = useSelector((state) => state.alerts);
  const { user } = useSelector((state) => state.user);

  return (
    <BrowserRouter>
      {loading && <Loader />}
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 5000,
          style: { background: "#363636", color: "#fff" },
        }}
      />
      <Routes>
        {publicRoutes.map(({ path, Component }, index) => (
          <Route
            key={index}
            path={path}
            element={
              <PublicRoutes>
                <Component />
              </PublicRoutes>
            }
          />
        ))}

        <Route
          element={
            <ProtectedRoutes>
              <Layout />
            </ProtectedRoutes>
          }
        >
          {(user?.isAdmin ? adminRoutes : userRoutes).map(
            ({ path, Component }, index) => (
              <Route key={index} path={path} element={<Component />} />
            )
          )}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
