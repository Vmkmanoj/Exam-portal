import React from "react";
import logo from "../nav/logo.png";
import "../nav/nav.css";

function Nav() {
    return (
        <div className="bg-white h-96  w-28 mainbox border-black shadow-lg">
            <div className="flex flex-col ml-14 justify-between  items-center  mr-20">
                <img src={logo} className="h-12"></img>
                <ul className="flex flex-col gap-10 text-xl cursor-pointer">
                    <li>Home</li>
                    <li>Test</li>
                    <li>Practic</li>
                </ul>
            </div>
        </div>
    );
}

export default Nav;
