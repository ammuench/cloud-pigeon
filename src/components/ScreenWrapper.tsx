import React from "react";

import Navigation from "./Navigation";

type ScreenWrapperProps = {
  children: JSX.Element;
};

const ScreenWrapper: React.FC<ScreenWrapperProps> = ({ children }) => (
  <div className="grid min-h-screen grid-cols-1 grid-rows-[auto_1fr]">
    <Navigation />
    {children}
  </div>
);

export default ScreenWrapper;
