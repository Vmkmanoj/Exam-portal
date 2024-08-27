import React from "react"
import Login from "../src/componant/login/login"
import Nav from "./componant/nav/nav"
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./componant/home/home";
import Taketest from "./componant/test/taketest";

function App() {


 

  return (
    <>
   

    <Router>
    <Location1></Location1>

    <Routes>

    <Route path="/" element={ <Login></Login>}></Route>

  
    <Route path="/home" element={<Home></Home>}></Route>

    <Route path="/Taketest" element={<Taketest></Taketest>}></Route>


    
   
    

    </Routes>

    </Router>     
    </>
  )
}


function Location1(){
  const location = useLocation();
  if(location.pathname!=='/'){
    return <Nav></Nav>
  }else{
     return null;
  }

}

export default App
