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
