import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

import Header from "../components/Header";
import SideMenu from "../components/SideMenu";
import RightSideMenu from "../components/RightSideMenu";

import "../styles/Register.css";

function Register() {

  const navigate = useNavigate();

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleRegister = async () => {

    try{

      await API.post("/auth/register",{
        name,
        email,
        password
      });

      alert("Registration Successful");

      navigate("/login");

    }catch(err){

      alert("Registration Failed");

    }

  };

  return (

    <div className="register-page">

      <Header/>
      <SideMenu/>
      <RightSideMenu/>

      <div className="register-wrapper">

        <div className="register-card">

          <h2 className="register-title">
            REGISTER
          </h2>

          <input
            type="text"
            placeholder="Full Name"
            className="register-input"
            onChange={(e)=>setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            className="register-input"
            onChange={(e)=>setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="register-input"
            onChange={(e)=>setPassword(e.target.value)}
          />

          <button
            className="register-btn"
            onClick={handleRegister}
          >
            CREATE ACCOUNT
          </button>

          <p className="login-link">

            Already have an account?

            <span onClick={()=>navigate("/login")}>
              LOGIN
            </span>

          </p>

        </div>

      </div>

    </div>

  );
}

export default Register;