import axios from "axios";
//signup interface
export interface SignupResponse {
  success: boolean;
  message: string;
}

//login interface
export interface Logindata {
  email: string;
  password: string;
}

//forget password
export interface Forgetpasswordinterface{
email:string;
}

interface resetpasswordpayload{
  password:string;
  confirmPassword:string;
}


const BaseUrl = axios.create({
  baseURL: "http://localhost:5000",
});

//signup
export const signupapi = (formData: FormData) => {
  return BaseUrl.post<SignupResponse>("/auth/signup", formData);
};

//login
export const loginapi = (payload: Logindata) => {
  return BaseUrl.post("/auth/login", payload);
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