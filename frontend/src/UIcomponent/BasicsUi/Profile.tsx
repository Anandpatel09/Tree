import { Card, CardContent } from "@/components/ui/card";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { getProfileApi } from "@/api";
import EditProfile from "./EditProfile";


interface User {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  profile_pic: string | null;
  dob: string;
  gender: string;
  created_at: string;
};


const ProfilePage = () => {
  const [editProfile, setEditProfileUser] = useState(false);
  const [profileUser, setProfileUser] = useState<User | null>(null);


  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfileApi();
        setProfileUser(response?.data)
      } catch (error) {
        console.error("error fetching profile", error);
      }
    }
    fetchProfile();
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* 🔹 Profile Header */}
        <Card className="p-6 rounded-2xl shadow-sm bg-white">
          <CardContent className="flex flex-col md:flex-row items-center gap-6">
            <Avatar className="w-24 h-24 ring-4 ring-gray-100">
              <AvatarImage src={profileUser?.profile_pic || ""} />
              <AvatarFallback>
                {profileUser?.full_name
                  ?.split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-semibold text-gray-800">
                {profileUser?.full_name}
              </h2>
              <p className="text-gray-500 text-sm">
                Account Holder
              </p>
            </div>
            <Button
            onClick={()=>setEditProfileUser(true)}
            className="ml-auto rounded-lg px-5">
              Edit Profile
            </Button>
          </CardContent>
        </Card>
        {/* 🔹 Tabs Section */}
        <Tabs defaultValue="personal" className="w-full">

          {/* 🔹 Personal Info */}
          <TabsContent value="personal">
            <Card className="p-6 rounded-2xl shadow-sm bg-white mt-4">
              <CardContent className="space-y-3">

                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Personal Details
                </h3>

                <p><strong>DOB: </strong> {profileUser && new Date(profileUser.dob).toLocaleDateString()}</p>
                <p><strong>Gender:</strong>{profileUser?.gender} </p>
                <p><strong>Phone:</strong> {profileUser?.phone}</p>
                <p><strong>Email:</strong> {profileUser?.email}</p>

              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>


{/* //Edit profile */}
<EditProfile  editProfile={editProfile} setEditProfileUser={setEditProfileUser}/>


      </div>
    </div>
  );
};

export default ProfilePage;