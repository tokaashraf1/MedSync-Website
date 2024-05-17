import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import SignUp from './Doctor/Pages/Auth/SignUp';
import Login from "./Doctor/Pages/Auth/Login"
import ForgotPassword from "./Doctor/Pages/Auth/ForgotPassword"
import ClinicsProvider from "./Contexts/ClinicsProvider";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DoctorsLandingPage />,
    errorElement: (
      <h1
        style={{
          color: "rgb(204, 51, 0)",
          transform: "translate(500px,200px) ",
          fontSize: "60px",
        }}
      >
        404 Not Found
      </h1>
    ),
  },
  {
    path: "/signup",
    element: <SignUp />,
    errorElement: <h1 style={{ color: "red" }}>Error...............</h1>,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <h1 style={{ color: "red" }}>Error...............</h1>,
  },
  {
    path: "/forgotpass",
    element: <ForgotPassword />,
    errorElement: <h1 style={{ color: "red" }}>Error...............</h1>,
  },


]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="819662330501-5urgmtps87jtcu46gdv42e3l4qb2tmtk.apps.googleusercontent.com">
      <MedicalRecordContext>
        <SettingsProvider>
          <AuthProvider>
            <ClinicsProvider>
            <RouterProvider router={router}>
              <App />
            </RouterProvider>
            </ClinicsProvider>
          </AuthProvider>
        </SettingsProvider>
      </MedicalRecordContext>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
