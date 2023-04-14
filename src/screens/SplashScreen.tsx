import React from "react";

import LogoSVG from "../svgIcons/LogoSVG";

const SplashScreen: React.FC = () => {
  const getProfile = async () => {
    const data = await window.electronAPI.getProfile();
    console.log(data);
  };

  const getPrivateData = async () => {
    const data = await window.electronAPI.getPrivateData();
    console.log(data);
  };

  const logout = async () => {
    await window.electronAPI.logOut();
  };

  return (
    <div className="hero min-h-screen bg-base-100">
      <div className="hero-body">
        <div className="container items-center">
          <LogoSVG className="m-auto text-white" />
          <h1 className="text-center text-5xl font-extrabold text-white">
            Welcome to <span className="font-bold">Cloud Pigeon</span>
          </h1>
          <h2 className="text-center text-2xl font-extrabold text-white">
            <span className="font-bold">Cloud Pigeon</span> is tool for managing
            your cloud saves on your steam deck and main computer.
          </h2>
        </div>
        <div>
          <button
            className="btn"
            onClick={async () => {
              await getProfile();
            }}
          >
            Get Profile?
          </button>
          <button
            className="btn"
            onClick={async () => {
              await getPrivateData();
            }}
          >
            Get Private?
          </button>
          <button
            className="btn"
            onClick={async () => {
              await logout();
            }}
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};
export default SplashScreen;
