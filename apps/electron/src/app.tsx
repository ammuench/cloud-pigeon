import React from "react";
import { createHashRouter, RouterProvider } from "react-router-dom";

import DashboardScreen from "./screens/DashboardScreen";
import SplashScreen from "./screens/SplashScreen";

import "./index.css";

const router = createHashRouter([
  {
    path: "/",
    element: <SplashScreen />,
  },
  {
    path: "/dashboard",
    element: <DashboardScreen />,
  },
]);

const App = () => (
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

export default App;
