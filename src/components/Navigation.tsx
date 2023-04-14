import React, { useState } from "react";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";

import LogoWithTextPNG from "../../assets/logo/png/logo-with-text.png";
import { useGoogleProfileStore } from "../store/googleProfileStore";

const Navigation: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const logOut = () => {
    window.electronAPI.logOut();
  };

  const { profile } = useGoogleProfileStore();

  return (
    <div className="navbar bg-primary text-primary-content">
      <div className="h-full flex-1">
        <div className="flex h-full items-center text-primary-content">
          <img className="ml-4 inline-block h-10" src={LogoWithTextPNG} />
        </div>
      </div>
      <div className="flex-none gap-2">
        <div className="dropdown-end dropdown">
          {profile && (
            <button
              onClick={toggleMenu}
              className="btn flex w-auto justify-between gap-4 overflow-hidden border-0  pr-0 text-white"
            >
              {`${profile.nickname}`}
              <img className="h-12 w-12" src={profile.picture} />
            </button>
          )}

          <ul
            className={`top-13 menu rounded-box absolute right-0 w-[200px] bg-secondary p-2 text-secondary-content opacity-0 shadow-lg transition-opacity ${
              showMenu ? " opacity-100" : "pointer-events-none"
            }`}
          >
            <li>
              <a>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                Item 2
              </a>
            </li>
            <li>
              <a>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Item 1
              </a>
            </li>
            <li>
              <a onClick={logOut}>
                <ArrowLeftCircleIcon className="h-5 w-5" />
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
