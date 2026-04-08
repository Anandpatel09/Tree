import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { updatePassword } from "@/api";
import toast from "react-hot-toast";

const SettingsPage = () => {
const [newPassword,setNewPassword]=useState<string>("")
const [currentPassword,setCurrentPassword]=useState<string>("")
const [confirmPassword,setconfirmPassword]=useState<string>("")

const handlePassword= async()=>{
  const payload={
    currentPassword:currentPassword,
     newPassword:newPassword
  }
  let result;
  try {
       result=await updatePassword(payload)
      toast.success(`${result?.data?.message}`)
  } catch (error: any) {
  const message =
    error?.response?.data?.message ||
    error?.message ||
    "Something went wrong";

  toast.error(message);
}

}  
  return (
    <div className="min-h-screen bg-gray-200 p-6">
      <div className="max-w-4xl mx-auto space-y-6">

       

        {/* 🔹 Password Settings */}
        <Card className="p-6 bg-white">
          <CardContent className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Change Password
            </h2>

            <Input type="password" placeholder="Current Password" value={currentPassword}  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>setCurrentPassword(e.target.value)}/>

            <Input type="password" placeholder="New Password" value={newPassword} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setNewPassword(e.target.value)} />

            <Input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setconfirmPassword(e.target.value)}/>

            <Button className="w-fit rounded-lg"
            onClick={handlePassword}>
              Update Password
            </Button>
          </CardContent>
        </Card>

        {/* 🔹 Preferences */}
        <Card className="p-6 bg-white">
          <CardContent className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Preferences
            </h2>

            <div className="flex items-center justify-between">
              <Label>Email Notifications</Label>
              <Switch />
            </div>

            <div className="flex items-center justify-between">
              <Label>Dark Mode</Label>
              <Switch />
            </div>
          </CardContent>
        </Card>

        {/* 🔹 Danger Zone */}
        {/* <Card className="p-6   border border-red-200 bg-red-50">
          <CardContent className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-red-600">
                Logout
              </h2>
              <p className="text-sm text-red-500">
                You will be signed out from your account
              </p>
            </div>

            <Button variant="destructive">
              Logout
            </Button>
          </CardContent>
        </Card> */}

      </div>
    </div>
  );
};

export default SettingsPage;