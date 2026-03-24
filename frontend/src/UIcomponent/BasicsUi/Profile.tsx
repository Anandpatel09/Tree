import { Card, CardContent } from "@/components/ui/card";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";



const ProfilePage = () => {


  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* 🔹 Profile Header */}
        <Card className="p-6 rounded-2xl shadow-sm bg-white">
          <CardContent className="flex flex-col md:flex-row items-center gap-6">

            <Avatar className="w-24 h-24 ring-4 ring-gray-100">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>AN</AvatarFallback>
            </Avatar>

            <div className="text-center md:text-left">
              <h2 className="text-2xl font-semibold text-gray-800">
                Anand Verma
              </h2>
              <p className="text-gray-500 text-sm">
                Village Member
              </p>
            </div>

            <Button className="ml-auto rounded-lg px-5">
              Edit Profile
            </Button>

          </CardContent>
        </Card>

        {/* 🔹 Tabs Section */}
        <Tabs defaultValue="personal" className="w-full">

          <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto">
            <TabsTrigger value="personal">Personal Info</TabsTrigger>
            <TabsTrigger value="family">Family Info</TabsTrigger>
          </TabsList>

          {/* 🔹 Personal Info */}
          <TabsContent value="personal">
            <Card className="p-6 rounded-2xl shadow-sm bg-white mt-4">
              <CardContent className="space-y-3">

                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Personal Details
                </h3>

                <p><strong>DOB:</strong> 12 Jan 2000</p>
                <p><strong>Gender:</strong> Male</p>
                <p><strong>Phone:</strong> 9876543210</p>
                <p><strong>Address:</strong> Delhi, India</p>

              </CardContent>
            </Card>
          </TabsContent>

          {/* 🔹 Family Info */}
          <TabsContent value="family">
            <Card className="p-6 rounded-2xl shadow-sm bg-white mt-4">
              <CardContent className="space-y-4">

                <h3 className="text-lg font-semibold text-gray-800">
                  Family Details
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  <div className="p-4 bg-gray-100 rounded-xl">
                    <p className="text-sm text-gray-500">Father</p>
                    <p className="font-medium">Rajesh Verma</p>
                  </div>

                  <div className="p-4 bg-gray-100 rounded-xl">
                    <p className="text-sm text-gray-500">Mother</p>
                    <p className="font-medium">Sunita Verma</p>
                  </div>

                  <div className="p-4 bg-gray-100 rounded-xl">
                    <p className="text-sm text-gray-500">Grandfather</p>
                    <p className="font-medium">Ramesh Verma</p>
                  </div>

                  <div className="p-4 bg-gray-100 rounded-xl">
                    <p className="text-sm text-gray-500">Grandmother</p>
                    <p className="font-medium">Sita Verma</p>
                  </div>

                </div>

              </CardContent>
            </Card>
          </TabsContent>

        </Tabs>

      </div>
    </div>
  );
};

export default ProfilePage;