import { useState } from "react";
import API from "../services/api.js";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });

  const submit = async () => {
    const res = await API.post("/login", form);
    if(res.data.success){
      localStorage.setItem("token", res.data.token);
      window.location.href = "/dashboard";
    } else {
      alert(res.data.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input placeholder="Email" onChange={(e)=>setForm({...form,email:e.target.value})}/>
      <input placeholder="Password" type="password" onChange={(e)=>setForm({...form,password:e.target.value})}/>
      <button onClick={submit}>Login</button>
    </div>
  );
}