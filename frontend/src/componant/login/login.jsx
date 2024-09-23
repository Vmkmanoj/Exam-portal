import React, { useEffect, useState } from "react";
import side from "../login/side.jpg";
import "../login/login.css";
import { useNavigate } from "react-router-dom";

function Login() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const [val, setVal] = useState("register");
    const [buttonText, setButtonText] = useState("login");
    const [accountText, setAccountText] = useState("create an account");

    const handleToggle = () => {
        setVal((prev) => (prev === "register" ? "login" : "register"));
    };

    useEffect(() => {
        if (val === "register") {
            setButtonText("login");
            setAccountText("create an account");
        } else {
            setButtonText("register");
            setAccountText("login");
        }
    }, [val]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = val === "login" ? "http://localhost:3001/login" : "http://localhost:3001/register";
        const body = val === "login"
            ? JSON.stringify({ email, password })
            : JSON.stringify({ name, email, password });

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: body
        });
        
        const data = await response.json();

        console.log(data.token)

        if (data.success) {
            alert(val === "login" ? 'Login successful!' : "Registration successful!");

            if (val === "login") {
                // Store the JWT token in localStorage
                localStorage.setItem('token', data.token); // Assuming the token is in `data.token`

                // Redirect to the home page after login
                navigate('/home');
            } else {
                // After registration, redirect to login
                navigate('/');
            }
        } else {
            alert(`${val.charAt(0).toUpperCase() + val.slice(1)} failed: ${data.message}`);
        }
    };

    return (
        <div className="main-body">
            <div className="inside-box">
                <div className="image-logo">
                    <img src={side} alt="Login Illustration" />
                </div>
                <div className="but-login">
                    <button type="button" onClick={handleToggle}>
                        --→{buttonText}
                    </button>
                </div>

                <div className="login-form m-0">
                    <h1 className="text-yellow-400 text-center font-black">Student {val}</h1>
                    {val === "register"
                        ? <p className="text-sm ml-14">Create a new account to start using code.io</p>
                        : <p className="text-sm ml-28">Already have an account?</p>
                    }

                    <form className="form gap-10" onSubmit={handleSubmit}>
                        {val === "register" && (
                            <input
                                className="border-black"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter your name"
                            />
                        )}
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                        />
                        <input
                            className="text-9xl"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                        />
                        {val === "login" && <p className="text-blue-400 cursor-pointer">Forgot password?</p>}
                        <div className="button-login">
                            <button type="submit">{accountText}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
