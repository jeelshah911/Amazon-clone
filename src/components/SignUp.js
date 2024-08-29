import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axios";
import "./SignUp.css";

function SignUp() {
    const navigate = useNavigate();

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signup = (e) => {
        e.preventDefault();

        axios
            .post("/auth/signup", { email, password, fullName })
            .then((res) => {
                alert(res.data.message); // Show success message
                navigate("/login"); // Navigate to login page only if signup is successful
            })
            .catch((err) => {
                console.warn(err); // Log error in console
                alert("Signup failed. Please try again."); // Optionally show an error message to the user
            });
    };

    return (
        <div className="container">
            <div className="logo" onClick={() => navigate("/")}>
                <img src="./amazon_logo.png" alt="Amazon Logo" />
            </div>

            <div className="form-container">
                <h3>Create Account</h3>
                <div className="input-container">
                    <p>Name</p>
                    <input
                        type="text"
                        placeholder="First and Last Name"
                        onChange={(e) => setFullName(e.target.value)}
                        value={fullName}
                    />
                </div>
                <div className="input-container">
                    <p>Email</p>
                    <input
                        type="email"
                        placeholder="example@example.com"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                </div>
                <div className="input-container">
                    <p>Password</p>
                    <input
                        type="password"
                        placeholder="At least 6 characters"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                </div>
                <div className="input-container">
                    <p>Password Again</p>
                    <input
                        type="password"
                        placeholder="Password again"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                </div>
                <button className="button" onClick={signup}>
                    Create Account
                </button>
                <div className="info-text">
                    By creating an account you agree to Amazon's{" "}
                    <span>Conditions of Use</span> and <span>Privacy Notice</span>.
                </div>
            </div>
            <div className="already-have-account-text">Already have an account?</div>
            <button className="sign-up-button" onClick={() => navigate("/login")}>
                Sign in
            </button>
        </div>
    );
}

export default SignUp;
