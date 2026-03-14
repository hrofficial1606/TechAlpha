import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function VerifyOtp(){

  const navigate = useNavigate();

  const [form,setForm] = useState({
    email:"",
    otp:""
  });

  const handleChange = (e)=>{
    setForm({...form,[e.target.name]:e.target.value});
  };

  const handleSubmit = async (e)=>{
    e.preventDefault();

    await api.post("/auth/verify",form);

    alert("Account Verified");

    navigate("/login");
  };

  return(
    <div>
      <h2>Verify OTP</h2>

      <form onSubmit={handleSubmit}>

        <input name="email" placeholder="Email" onChange={handleChange}/>

        <input name="otp" placeholder="OTP" onChange={handleChange}/>

        <button type="submit">Verify</button>

      </form>
    </div>
  );
}

export default VerifyOtp;