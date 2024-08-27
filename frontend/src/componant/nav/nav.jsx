import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {image_log} from "../nav/Home.jpg";

import { Link } from "react-router-dom";

function Nav() {
    const navigate = useNavigate();


    const handingpath = (path) => {
        navigate(path);
    };

    useEffect(() => {
        
        

        handingpath();


    }, [navigate]); 

    return (
        <div className="bg-white h-dvh w-28 mainbox border-black shadow-lg">
            <div className="flex flex-col ml-14 justify-between items-center mr-20">
                <img src="path-to-logo" className="h-12" alt="Logo" />
                <ul className="flex flex-col gap-10 text-xl cursor-pointer">
                    <li><button className="border-cyan-300"><img src={image_log} alt="" /><Link to='/home'>,...</Link></button></li>
                    <li onClick={() => handingpath("/taketest")}>Test</li>
                    {/* <li onClick={() => handingpath("/practice")}>Practice</li> */}
                </ul>
            </div>
        </div>
    );
}

export default Nav;
