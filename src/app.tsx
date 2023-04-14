import React, { useEffect } from "react";
import { createHashRouter, RouterProvider } from "react-router-dom";

import SplashScreen from "./screens/SplashScreen";
import {
  GoogleProfile,
  useGoogleProfileStore,
} from "./store/googleProfileStore";

import "./index.css";

const router = createHashRouter([
  {
    path: "/",
    element: <SplashScreen />,
  },
]);

const App = () => {
  const { setGoogleProfile } = useGoogleProfileStore();
  useEffect(() => {
    window.electronAPI
      .getProfile()
      .then((gProfile: GoogleProfile) => setGoogleProfile(gProfile));
  });
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
};

export default App;
