import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./Redux/store.js";

import "react-big-calendar/lib/css/react-big-calendar.css";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { createContext, useState } from "react";

// Create context
export const MyContext = createContext();

const MyContextProvider = ({ children }) => {
  const [state, setState] = useState({
    isSidebarOpen: true, // Example: Managing sidebar state
  });

  const toggleSidebar = () => {
    setState((prev) => ({ ...prev, isSidebarOpen: !prev.isSidebarOpen }));
  };

  return (
    <MyContext.Provider value={{ state, toggleSidebar }}>
      {children}
    </MyContext.Provider>
  );
};

createRoot(document.getElementById("root")).render(
  <MyContextProvider>
    <Provider store={store}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <App />
      </LocalizationProvider>
    </Provider>
  </MyContextProvider>
);
