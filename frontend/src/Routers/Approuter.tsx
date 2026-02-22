import Login from "@/UIcomponent/Authentication/Login";
import SignUp from "@/UIcomponent/Authentication/SignUp";
import { Routes, Route } from "react-router-dom";
export default function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
}
