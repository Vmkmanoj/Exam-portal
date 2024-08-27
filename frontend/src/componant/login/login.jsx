import React, { useEffect, useState } from "react";
import side from "../login/side.jpg";
import "../login/login.css";
import { useNavigate } from "react-router-dom";

function Login() {

    // this are using for  email password set
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const Path = useNavigate();

   
///this state are using full for button
   
    const [val, setVal] = useState("register");
    const [button_1,setButton_1] =  useState("");
    const [account,setAccount] = useState("")

    const handleToggle = () => {
        setVal(val === "register" ? "login" : "register");
    };

    function change_name(){

        if(val==="register"){
            setButton_1("login")
            setAccount("create an account")
        }else{
            setButton_1("register")
            setAccount("login")
        }

    }

    const LoginOrRegister = async (e)=>{
        e.preventDefault();
        if (val === "login") {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password })
            
               });
            // console.log(email,password);
                const data = await response.json();

            if (data.success) {
                alert('Login successful!');
                Path('/home')
            } else {
                alert('Login failed: ' + data.message);
            }
        }
        else{

           e.preventDefault();
           console.log("page is not login")

           

        }

    }

   

    // useEffect hook to update the button text when the mode changes
    useEffect(()=>{
            change_name();
            // LoginOrRegister();
    },[val])


    return (
        <div className="main-body">
            <div className="inside-box">
                <div className="image-logo">
                    <img src={side} alt="Login Illustration" />
                </div>
            {/* changing login and register */}
            
                <div className="but-login">
                <button type="button" onClick={handleToggle}>
                                --→{button_1}
                            </button>
                </div>

                <div className="login-form m-0">

                    {/* heading */}

              
                    <h1 className="text-yellow-400 text-center font-black">Student {val}</h1>
                    {val==="register" ?<p className="text-sm ml-14">Create a new account to start using code.io</p> : <p className="text-sm ml-28">Already have an account?</p>}


                {  /* input for user name*/}
                    <form className="form gap-10" onSubmit={(e)=>LoginOrRegister(e)}>
                     {val === "login" ?
                            "" : <input
                            className="border-black"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your name"
                            />


                     }   
                        {/* input for email */}

                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                        />

                        {/* input for password */}
                  
                        <input className="text-9xl"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                        ></input>
                   

                    
                        
                        {/* forgot password filed */}
                       
                        {val==="login" ? <p className="text-blue-400 cursor-pointer">forgot password?</p>: ""}


                        {/* button for submit */}
                        <div className="button-login">
                            <button type="submit" >{account}</button>
                        
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
