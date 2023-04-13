import React from "react";

import LogoSVG from "../svgIcons/LogoSVG";

const SplashScreen: React.FC = () => (
  <div className="hero min-h-screen bg-primary">
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
    </div>
  </div>
);
export default SplashScreen;
