import Forgetpassword from "@/UIcomponent/Authentication/Forgetpassword";
import Login from "@/UIcomponent/Authentication/Login";
import ResetPassword from "@/UIcomponent/Authentication/Resetpassword";
import SignUp from "@/UIcomponent/Authentication/SignUp";
import Home from "@/UIcomponent/Dashboard/Home";
import { Routes, Route } from "react-router-dom";
import { ROUTES } from "./routes";
import Logout from "@/UIcomponent/Authentication/Logout";
import Addmembers from "@/UIcomponent/BasicsUi/Addmembers";
import Profile from "@/UIcomponent/BasicsUi/Profile";
import Settings from "@/UIcomponent/BasicsUi/Settings";
import ProtectedRoute from "./ProtectedRoute";
import FamilyCard from "@/UIcomponent/Dashboard/FamilyCard";

export default function AppRouter() {
  return (
    <Routes>
      {/*  Public Routes (NO PROTECTION) */}
      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route path={ROUTES.LOGOUT} element={<Logout />} />
      <Route path={ROUTES.SIGNUP} element={<SignUp />} />
      <Route path={ROUTES.FORGOT_PASSWORD} element={<Forgetpassword />} />
      <Route path={ROUTES.RESET_PASSWORD} element={<ResetPassword />} />

      {/* Protected Routes */}
      <Route
        path={ROUTES.HOME}
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      <Route
        path={ROUTES.ADD_MEMBERS}
        element={
          <ProtectedRoute>
            <Addmembers />
          </ProtectedRoute>
        }
      />

      <Route
        path={ROUTES.SETTING}
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />

      <Route
        path={ROUTES.PROFILE}
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
     
    
      <Route
        path={ROUTES.ALL_MEMBERS}
        element={
          <ProtectedRoute>
             <FamilyCard />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}


