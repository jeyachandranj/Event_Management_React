import React, { useContext, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { UserContext } from "../App";
import logo from "../assets/logo.png";
import backgroundImage from "../assets/bg.png";
import "../hallbook.css";

const Navbar = () => {
  const { state } = useContext(UserContext);
  const [activeTab, setActiveTab] = useState(""); // State to track active tab
  const location = useLocation();

  useEffect(() => {
    // Extract the current path from the URL
    const currentPath = location.pathname;
    console.log("Current Path:", currentPath);

    // Set activeTab based on the current path
    setActiveTab(currentPath.slice(1));
  }, [location]);

  const RenderUser = () => {
    if (state.userType === "admin") {
      return (
        <div>
          <Link to="/halls" style={{
                    backgroundColor: activeTab === "halls" ? "#ffffff" : "#6d7f69",
                    padding: "8px 12px", // Adjust padding as needed
                    textDecoration: "none",
                    borderRadius: "8px",
                  }}>Halls</Link>
        </div>
      );
    } else if (state.userType === "faculty") {
      return (
        <div>
          <Link to="/bookings" style={{
                    backgroundColor: activeTab === "bookings" ? "#ffffff" : "#6d7f69",
                    padding: "8px 12px", // Adjust padding as needed
                    textDecoration: "none",
                    borderRadius: "8px",
                  }}>Bookings</Link>
        </div>
      );
    } else {
      return (
        <div>
          <Link to="/halls">Halls</Link>
        </div>
      );
    }
  };

  const RenderMenu = () => {
    if (state.user) {
      return (
        <>
          <Link to="/logout">
            <button class="glow-button">Logout</button>
          </Link>
        </>
      );
    } else {
      return (
        <>
          <Link to="/login">
            <button className="glow-button">Sign In/Sign Up</button>
          </Link>
        </>
      );
    }
  };

  return (
    <nav
      className="w-full border-b rounded-lg overflow-hidden"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="py-5 md:py-0 container mx-auto px-6 flex items-center justify-between">
        <Link to={"/"}>
          <div
            aria-label="Home. logo"
            className="flex justify-between
            items-center"
            role="img"
          >
            <img className=" w-24 md:w-64" src={logo} alt="logo" />
          </div>
        </Link>
        <div>
          <button className="sm:block md:hidden text-gray-500 hover:text-gray-700 focus:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500">
            <svg
              aria-haspopup="true"
              aria-label="open Main Menu"
              xmlns="http://www.w3.org/2000/svg"
              className="md:hidden icon icon-tabler icon-tabler-menu"
              width="32"
              height="32"
              viewBox="0 0 32 32"
              strokeWidth="1.5"
              stroke="#2c3e50"
              fill="none"
              strokeLinecap="round"
            >
              <path stroke="none" d="M0 0h24v24H0z"></path>
              <line x1="4" y1="8" x2="20" y2="8"></line>
              <line x1="4" y1="16" x2="20" y2="16"></line>
              <line x1="4" y1="24" x2="20" y2="24"></line>
            </svg>
          </button>
          <div id="menu" className="md:block lg:block hidden">
            <button className="block md:hidden lg:hidden text-gray-500 hover:text-gray-700 focus:text-gray-700 fixed focus:outline-none focus:ring-2 focus:ring-gray-500 z-30 top-0 mt-6">
              <svg
                aria-label="close main menu"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#2c3e50"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" />
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <ul className="flex text-3xl md:text-base items-center py-10 md:flex flex-col md:flex-row justify-center fixed md:relative top-0 bottom-0 left-0 right-0 bg-white md:bg-transparent z-20 rounded-2xl">
              <li>
                <Link
                  to="/"
                  onClick={() => setActiveTab("")}
                  style={{
                    backgroundColor: activeTab === "" ? "#ffffff" : "#6d7f69",
                    padding: "8px 12px", // Adjust padding as needed
                    textDecoration: "none",
                    marginRight: "20px",
                    borderRadius: "8px",
                  }}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/events"
                  onClick={() => setActiveTab("events")}
                  style={{
                    backgroundColor: activeTab === "events" ? "#ffffff" : "#6d7f69",
                    padding: "8px 12px", // Adjust padding as needed
                    textDecoration: "none",
                    marginRight: "20px",
                    borderRadius: "8px",
                  }}
                >
                  Events
                </Link>
              </li>
              <li>
                <Link
                  to="/calendar"
                  onClick={() => setActiveTab("calendar")}
                  style={{
                    backgroundColor : activeTab === "calendar" ? "#ffffff" : "#6d7f69",
                    padding: "8px 12px", // Adjust padding as needed
                    textDecoration: "none",
                    marginRight: "20px",
                    borderRadius: "8px",
                  }}
                >
                  Calendar
                </Link>
              </li>
              <li>
                <RenderUser />
              </li>
              <li>
                <Link
                  to="/profile"
                  onClick={() => setActiveTab("profile")}
                  style={{
                    backgroundColor: activeTab === "profile" ? "#ffffff" : "#6d7f69",
                    padding: "8px 12px", 
                    textDecoration: "none",
                    marginRight: "20px",
                    marginLeft: "17px",
                    borderRadius: "8px",
                  }}
                >
                  Profile
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <RenderMenu />
      </div>
    </nav>
  );
};

export default Navbar;
