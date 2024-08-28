import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../nav/nav.css";
import pen from "../nav/pen.jpg";
import logo from "../nav/Home.jpg";

function Nav() {
    const [isSidebarVisible, setSidebarVisible] = useState(true); // State to control sidebar visibility
    const navigate = useNavigate();

    const toggleSidebar = () => {
        setSidebarVisible(!isSidebarVisible); // Toggle sidebar visibility
    };

    const handleNavigation = (path) => {
        navigate(path); // Navigate to the specified path
        setSidebarVisible(false); // Hide sidebar after navigating
    };

    return (

        <>

         {/* Button to open the sidebar */}
         {!isSidebarVisible && (
                <button onClick={toggleSidebar} className="open-button text-2xl mt-5 ml-6">
                    &#9776;Open
                </button>
            )}
        <div
            className={`mainbox ${isSidebarVisible ? "sidebar-visible" : "sidebar-hidden"} transition-all duration-300`}
            style={{ left: isSidebarVisible ? "3px" : "-200px" }} // Adjust the width based on your sidebar's width
        >
            
            <div className="flex flex-col ml-14 justify-between items-center mr-20">
                {/* Button to close the sidebar */}
                <button onClick={toggleSidebar} className="close-button">x</button>

                {/* Sidebar content */}
                {isSidebarVisible && (
                    <ul className="flex flex-col items-center justify-center gap-10 cursor-pointer mt-8">
                        <li>
                            <Link to="/home" className="button-home">
                                <img src={logo} alt="Home" />
                            </Link>
                        </li>
                        <li>
                            <button onClick={() => handleNavigation("/taketest")} className="button-home ml-7">
                                <img src={pen} alt="Take Test" />
                            </button>
                        </li>
                    </ul>
                )}
            </div>
        </div>

        </>
    );
}

export default Nav;
