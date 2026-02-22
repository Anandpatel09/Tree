import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "@/Routers/routes";
import { useState } from "react";
import { loginapi, type Logindata } from "@/api";




const Login = () => {
  const navigate = useNavigate();

 const [email,setEmail]=useState<string>("");
 const [password,setPassword]=useState<string>("");

  const handleSinup = () => {
    navigate(ROUTES.SIGNUP);
  };

  const handleLogin=async(e: React.FormEvent<HTMLFormElement>)=>{
     e.preventDefault(); 
     const payload:Logindata={
      email:email,
      password:password
     }
  console.log("Payload:", payload);
     try {
      const result=await loginapi(payload);
      console.log("result====",result)

     }catch(err){

     }
  }


  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Please enter your email and password to login
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label>Email/UserName</Label>
                  <Input
                    type="text"
                    placeholder={"Enter your email/username"}
                    onChange={(e)=>setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label>Password</Label>
                  </div>
                  <Input
                    id=""
                    type="password"
                    placeholder={"Enter your password"}
                    onChange={(e)=>setPassword(e.target.value)}
                    required
                  />
                </div>
                <Link
                  to="/forgot-password"
                  className="text-sm text-blue-600 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <Button type="submit" className="w-full">
              Login
            </Button>
            </form>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            
            <Button variant="outline" className="w-full" onClick={handleSinup}>
              Sing Up
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};
export default Login;
