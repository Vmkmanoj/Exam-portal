import React  from "react";
import "../home/home.css";

function Home(props){

    return(

      <div className="ml-52 mt-10 p-6 mainclass">

        <div> 

          <h1>{props.element}</h1>
          
        </div>

      </div>
   
    )

}

export default Home;
