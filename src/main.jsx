import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import ProfileProvider from "./contexts/profile-context/ProfileProvider";
import RoleProvider from "./contexts/role-context/RoleProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ProfileProvider>
        <RoleProvider>
          <App />
        </RoleProvider>
      </ProfileProvider>
    </BrowserRouter>
  </StrictMode>,
);
