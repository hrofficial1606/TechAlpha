import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/Login.css";

import Header from "../components/Header";
import SideMenu from "../components/SideMenu";
import RightSideMenu from "../components/RightSideMenu";

function Login() {

  const navigate = useNavigate();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleLogin = async () => {

    try {

      const res = await API.post("/auth/login",{
        email,
        password
      });

      localStorage.setItem("token",res.data.token);
      localStorage.setItem("name",res.data.name);

      navigate("/");

    } catch {

      alert("Invalid email or password");

    }

  };

  return (

    <div className="login-page">

      <Header/>
      <SideMenu/>
      <RightSideMenu/>

      <div className="login-wrapper">

        <div className="login-card">

          <h2 className="login-title">LOGIN</h2>

          <input
            type="email"
            placeholder="Email"
            className="login-input"
            onChange={(e)=>setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="login-input"
            onChange={(e)=>setPassword(e.target.value)}
          />

          <button
            className="login-btn"
            onClick={handleLogin}
          >
            LOGIN
          </button>

          <p className="login-register">

            DON'T HAVE AN ACCOUNT?

            <span
              className="register-link"
              onClick={()=>navigate("/register")}
            >
              REGISTER
            </span>

          </p>

        </div>

      </div>

    </div>

  );
}

export default Login;