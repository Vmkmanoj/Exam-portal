import React from "react"
import Login from "../src/componant/login/login"
import Nav from "./componant/nav/nav"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {

  return (
    <>
    {/* <Nav></Nav> */}

    <Router>

    <Routes>
      
    <Route path="/" element={ <Login></Login>}></Route>
    <Route path="/home" element={<Nav></Nav>}></Route>

    </Routes>

    </Router>



   
   
    

     
    </>
  )
}

export default App
