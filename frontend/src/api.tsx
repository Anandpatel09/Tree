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

interface ChangePass{
   currentPassword:string,
     newPassword:string
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
  return BaseUrl.get("/auth/get-profile",{
    headers:{
      Authorization:`Bearer ${token}`,
    }
  });
};

//add members
export const addUsers = (payload: FormValues) => {
  return BaseUrl.post("/auth/add-members", payload);
};

// update profile
export const updateUser = (id: number, payload: any) => {
  return BaseUrl.patch(`/auth/profile/${id}`, payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

// update password 
export const updatePassword =(payload:ChangePass)=>{
  const token=localStorage.getItem("token")
  return BaseUrl.put('/auth/update-password',payload,{
    headers:{
      Authorization:`Bearer ${token}`,
    }
  })
}


//get family tree data 

export const familyData=()=>{
  const token =localStorage.getItem("token")
  return BaseUrl.get('/auth/dasboard',{
    headers:{
      Authorization:`Bearer ${token}`,
    }
  })
}

//get users detail 

export const membersDetail=()=>{
  const token =localStorage.getItem("token")
  return BaseUrl.get('/auth/members',{
    headers:{
      Authorization:`Bearer ${token}`,
    }
  })
}


// delete user 

export const deleteMember = (id: number) => {
    const token =localStorage.getItem("token")
  return BaseUrl.delete(`/auth/member/${id}`,{
    headers:{
      Authorization:`Bearer ${token}`,
    }
    });
};