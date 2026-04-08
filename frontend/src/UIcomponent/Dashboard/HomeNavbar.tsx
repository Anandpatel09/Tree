import { Menu, Settings, User, Users } from "lucide-react";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarBadge,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import HomeSidebar from "./HomeSidebar";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { NavLink } from "react-router-dom";
import { ROUTES } from "@/Routers/routes";
import { getProfileApi } from "@/api";

const resolveImageUrl = (value?: string | null) =>
  value
    ? value.startsWith("http")
      ? value
      : `http://localhost:5000/uploads/${value}`
    : "";

const HomeNavbar = () => {
  const [sidebar, setSidebar] = useState(false);
  const [profileBar, setprofileBar] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfileApi();
        setUser(response.data);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };
    fetchProfile();
  }, []);

  return (
    <>
      <HomeSidebar open={sidebar} setOpen={setSidebar} />

      <header className="h-16 w-full border-b bg-white/70 backdrop-blur-xl sticky top-0 z-50 shadow-sm">
        <div className="flex items-center justify-between h-full px-6 max-w-7xl mx-auto">

          {/* 🔹 LEFT */}
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              className="rounded-xl border-gray-200 hover:bg-gray-100 transition"
              onClick={() => setSidebar(true)}
            >
              <Menu size={18} />
            </Button>

            <div className="flex flex-col leading-tight">
              <h1 className="text-lg md:text-xl font-semibold text-gray-900 tracking-tight">
                Village Directory
              </h1>
              <span className="text-xs text-gray-500">
                Family Management System
              </span>
            </div>
          </div>

          {/* 🔹 RIGHT */}
          <div className="flex items-center gap-4">

            {/* Avatar */}
            <Avatar
              className="w-10 h-10 cursor-pointer ring-2 ring-gray-200 hover:ring-blue-400 transition"
              onClick={() => setprofileBar(true)}
            >
              <AvatarImage src={
                user?.profile_pic
                  ? resolveImageUrl(user.profile_pic)
                  : "https://github.com/shadcn.png"
              } />
              <AvatarFallback>{user?.full_name ? user.full_name.split(' ').map((n: string) => n[0]).join('').toUpperCase() : 'AN'}</AvatarFallback>
              <AvatarBadge className="bg-green-500" />
            </Avatar>
          </div>

          {/* 🔹 PROFILE SIDEBAR */}
          <Sheet open={profileBar} onOpenChange={setprofileBar}>
            <SheetContent
              side="right"
              className="w-64 p-0 mt-16 bg-white shadow-xl"
            >
              {/* HEADER */}
              <div className="p-5 border-b">
                <h2 className="text-lg font-semibold text-gray-800">
                  Welcome, {user?.full_name || 'Anand'} 👋
                </h2>
                <p className="text-sm text-gray-500">
                  Manage your account
                </p>
              </div>

              {/* MENU */}
              <nav className="flex flex-col p-3 gap-1 text-sm">

                <NavLink
                  to={ROUTES.PROFILE}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition"
                >
                  <User size={16} />
                  Profile
                </NavLink>

                <NavLink
                  to={ROUTES.SETTING}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition"
                >
                  <Settings size={16} />
                  Settings
                </NavLink>

                <Separator className="my-2" />

                <NavLink
                  to={ROUTES.ADD_MEMBERS}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-blue-50 text-blue-600 font-medium transition"
                >
                  <Users size={16} />
                  Add Member
                </NavLink>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>
    </>
  );
};

export default HomeNavbar;