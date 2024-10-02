import React, { useEffect } from "react";
import "../submit/submit.css"


function Submit(){



    useEffect(()=>{
        localStorage.removeItem('token');
    })


    return(


        <div className="submit">

            <h1 className="ans">ANSWES Submited</h1>

        </div>

    )


}

export default Submit;