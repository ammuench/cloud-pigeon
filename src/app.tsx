import React from "react";
import { createHashRouter, RouterProvider } from "react-router-dom";

import SplashScreen from "./screens/SplashScreen";

import "./index.css";

const router = createHashRouter([
  {
    path: "/",
    element: <SplashScreen />,
  },
]);

const App = () => (
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

export default App;
