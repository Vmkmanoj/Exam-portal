import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../nav/nav.css";
import pen from "../nav/pen.jpg";
import logo from "../nav/Home.jpg";

function Nav() {
   
    // const navigate = useNavigate();



    // // const handleNavigation = (path) => {
    // //     navigate(path); // Navigate to the specified path
    // // };

    return (

        <>
        <div className={`mainbox  transition-all duration-300 w-32`}>
            
            <div className="flex flex-col ml-14 justify-between items-center mr-20">


                {/* nav button staring */}
             
                
                    <ul className="flex flex-col items-center justify-center gap-10 cursor-pointer mt-8">
                        {/* home button */}
                        <li>

                            <Link to="/home" className="button-home">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 m-2">
  <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
  <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
</svg>

                            </Link>
                            HOME
                        </li>

                        {/* test button */}


                        <li className="flex ml-14">

                            <Link to="/taketest">
                          
                               
                               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 ml-2">
  <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
</svg> <li className="w-24"> TEST</li> 

                            </Link>
                           

                           
                        </li>



                    </ul>
                
            </div>
        </div>

        </>
    );
}

export default Nav;
