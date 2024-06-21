import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import SignUp from './Doctor/Pages/Auth/SignUp';
import Login from "./Doctor/Pages/Auth/Login"
import ForgotPassword from "./Doctor/Pages/Auth/ForgotPassword"
import ClinicsProvider from "./Contexts/ClinicsProvider";
import AuthProvider from "./Contexts/AuthProvider";
import MedicalRecordContext from "./Contexts/MedicalRecordContext";
import SettingsProvider from "./Contexts/SettingProvider";
import LandingPage from "./Doctor/Pages/LandingPage/LandingPage";
import QuestionsForm from "./Doctor/Pages/QuestionsForm/QuestionsForm";
import VerifyCode from "./Doctor/Pages/Auth/VerifyCode";
import ResetPassword from "./Doctor/Pages/Auth/ResetPassword";
import EmailVerfication from "./Doctor/Pages/Auth/EmailVerfication";
import ApprovedReqs from "./Doctor/Pages/ApprovedReqs/ApprovedReqs";
import Home from "./Doctor/Pages/homepage/Home"
import PendingRequests from "./Doctor/Pages/Requests/PendingRequests";
import Settings from "./Doctor/Pages/Settings/Settings";
import Profile from "./Doctor/Pages/profile/Profile";
import WaitingPage from "./Doctor/Pages/WaitingPage/WaitingPage";
import AdminHome from "./Admin/Pages/AdminHome/AdminHome";
import Diagnoses from "./Admin/Pages/diagnoses/Diagnoses";
import Doctors from "./Admin/Pages/Doctors/Doctors";
import UsersLookup from "./Admin/Pages/Patients/Patients";
import Treatments from "./Admin/Pages/Treatments/Treatments";
import Drugs from "./Admin/Pages/Drugs/Drugs";
import Symptoms from "./Admin/Pages/symptoms/Symptoms";
import Specialties from "./Admin/Pages/Specialties/Specialties";
import LabTest from "./Admin/Pages/labTests/LabTest";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Requests from "./Admin/Pages/Requests/Requests";
import Vaccines from "./Admin/Pages/vaccines/Vaccines";
import AdminLogin from "./Admin/Pages/adminLogin/AdminLogin";
import { ToastContainer, toast } from 'react-toastify';
import AdminProvider from "./Contexts/AdminProvider"


const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
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
  {
    path: "/doctorsquestions",
    element: <QuestionsForm />,
    errorElement: <h1 style={{ color: "red" }}>Error...............</h1>,
  },
  {
    path: "/verifycode",
    element: <VerifyCode />,
    errorElement: <h1 style={{ color: "red" }}>Error...............</h1>,
  },
  {
    path: "/resetpass",
    element: <ResetPassword />,
    errorElement: <h1 style={{ color: "red" }}>Error...............</h1>,
  },
  {
    path: "/emailver",
    element: <EmailVerfication />,
    errorElement: <h1 style={{ color: "red" }}>Error...............</h1>,
  },
  {
    path: "/approvedreqs",
    element: <ApprovedReqs />,
    errorElement: <h1 style={{ color: "red" }}>Error...............</h1>,
  },
  {
    path: "/home",
    element: <Home />,
    errorElement: <h1 style={{ color: "red" }}>Error...............</h1>,
  },
  {
    path: "/pendingreq",
    element: <PendingRequests />,
    errorElement: <h1 style={{ color: "red" }}>Error...............</h1>,
  },
  {
    path: "/settings",
    element: <Settings />,
    errorElement: <h1 style={{ color: "red" }}>Error...............</h1>,
  },
  {
    path: "/profile",
    element: <Profile />,
    errorElement: <h1 style={{ color: "red" }}>Error...............</h1>,
  },
  {
    path: "/Waiting",
    element: <WaitingPage />,
    errorElement: <h1 style={{ color: "red" }}>Error...............</h1>,
  },
  {
    path: "/adminhome",
    element: <AdminHome />,
    errorElement: <h1 style={{ color: "red" }}>Error...............</h1>,
  },
  {
    path: "/diagnoses",
    element: <Diagnoses />,
    errorElement: <h1 style={{ color: "red" }}>Error...............</h1>,
  },
  {
    path: "/doctors",
    element: <Doctors />,
    errorElement: <h1 style={{ color: "red" }}>Error...............</h1>,
  },
  {
    path: "/patients",
    element: <UsersLookup />,
    errorElement: <h1 style={{ color: "red" }}>Error...............</h1>,
  },
  {
    path: "/treatments",
    element: <Treatments />,
    errorElement: <h1 style={{ color: "red" }}>Error...............</h1>,
  },
  {
    path: "/drugs",
    element: <Drugs />,
    errorElement: <h1 style={{ color: "red" }}>Error...............</h1>,
  },
  {
    path: "/symptoms",
    element: <Symptoms />,
    errorElement: <h1 style={{ color: "red" }}>Error...............</h1>,
  },
  {
    path: "/spec",
    element: <Specialties />,
    errorElement: <h1 style={{ color: "red" }}>Error...............</h1>,
  },
  {
    path: "/lab",
    element: <LabTest />,
    errorElement: <h1 style={{ color: "red" }}>Error...............</h1>,
  },
  {
    path: "/requests",
    element: <Requests />,
    errorElement: <h1 style={{ color: "red" }}>Error...............</h1>,
  },
  {
    path: "/vaccines",
    element: <Vaccines />,
    errorElement: <h1 style={{ color: "red" }}>Error...............</h1>,
  },
  {
    path: "/adminlogin",
    element: <AdminLogin />,
    errorElement: <h1 style={{ color: "red" }}>Error...............</h1>,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
      <MedicalRecordContext>
        <SettingsProvider>
          <AuthProvider>
            <ClinicsProvider>
              <AdminProvider>
            <RouterProvider router={router}>
              <App />
            </RouterProvider>
            </AdminProvider>
            </ClinicsProvider>
          </AuthProvider>
        </SettingsProvider>
      </MedicalRecordContext>
      <ToastContainer />
  </React.StrictMode>
);
