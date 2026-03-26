import axios from "axios";
import type { FormValues } from "./UIcomponent/BasicsUi/Addmembers";

export interface SignupResponse {
  success: boolean;
  message: string;
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export interface Logindata {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
  message:string;

}

export interface Forgetpasswordinterface {
  email: string;
}

interface resetpasswordpayload {
  password: string;
  confirmPassword: string;
}

const BaseUrl = axios.create({
  baseURL: "http://localhost:5000",
});

//INTERCEPTOR
BaseUrl.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

//signup
export const signupapi = (formData: FormData) => {
  return BaseUrl.post<SignupResponse>("/auth/signup", formData);
};

//login
export const loginapi = (payload: Logindata) => {
  return BaseUrl.post<LoginResponse>("/auth/login", payload);
};


///forget password
export const forgetpasswordapi=(payload:Forgetpasswordinterface)=>{
  return BaseUrl.post("/auth/forgot-password",payload)
}

//reset password
export const resetpasswordapi = (
  token: string,
  payload: resetpasswordpayload
) => {
  return BaseUrl.post(`/auth/reset-password/${token}`, payload);
};

//profile
export const getProfileApi = () => {
  const token=localStorage.getItem("token")
  console.log("token bearer ==== ======" , token)
  return BaseUrl.get("/auth/get-profile",{
    headers:{
      Authorization:`Bearer ${token}`,
    }
  });
};

//add members
export const addUsers = (payload: FormValues) => {
  return BaseUrl.post("/members/add", payload);
};


//