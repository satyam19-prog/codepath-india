import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const submit = async () => {
    try {
      console.log(form)
      const res = await API.post("/register", form);
      if (!res.ok) console.log(res)
      alert("✅ Registered Successfully! Please Login.");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration Failed ❌");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <input placeholder="Name" onChange={(e)=>setForm({...form,name:e.target.value})}/>
      <input placeholder="Email" onChange={(e)=>setForm({...form,email:e.target.value})}/>
      <input placeholder="Password" type="password" onChange={(e)=>setForm({...form,password:e.target.value})}/>
      <button onClick={submit}>Register</button>
    </div>
  );
}
