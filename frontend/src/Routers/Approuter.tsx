import Forgetpassword from "@/UIcomponent/Authentication/Forgetpassword";
import Login from "@/UIcomponent/Authentication/Login";
import ResetPassword from "@/UIcomponent/Authentication/Resetpassword";
import SignUp from "@/UIcomponent/Authentication/SignUp";
import Home from "@/UIcomponent/Dashboard/Home";
import { Routes, Route } from "react-router-dom";
import { ROUTES } from "./routes";
import Logout from "@/UIcomponent/Authentication/Logout";
import Addmembers from "@/UIcomponent/AddUser/Addmembers";
export default function AppRouter() {
  return (
    <Routes>
      {/* //Auth routes */}
      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route path={ROUTES.LOGOUT} element={<Logout />} />
      <Route path={ROUTES.SIGNUP} element={<SignUp />} />
      <Route path={ROUTES.FORGOT_PASSWORD} element={<Forgetpassword />} />
      <Route path={ROUTES.RESET_PASSWORD} element={<ResetPassword />} />

      {/* //Home routes  */}
        <Route path={ROUTES.HOME} element={<Home/>}/>
        <Route path={ROUTES.ADD_MEMBERS} element={<Addmembers/>}/>



    </Routes>
  );
}
