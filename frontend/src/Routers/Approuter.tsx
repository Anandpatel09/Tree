import Login from "@/UIcomponent/Authentication/Login";
import Singup from "@/UIcomponent/Authentication/SingUp";
import { Routes, Route } from "react-router-dom";
export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/singup" element={<Singup />}/>
      
     
    </Routes>
  );
}
