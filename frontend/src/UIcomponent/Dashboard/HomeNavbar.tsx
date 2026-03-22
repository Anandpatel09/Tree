import { Input } from "@/components/ui/input";
import {  Menu, Search, Settings, User, Users } from "lucide-react";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarBadge,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import HomeSidebar from "./HomeSidebar";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { NavLink } from "react-router-dom";
import { ROUTES } from "@/Routers/routes";

const HomeNavbar = () => {
  const [sidebar, setSidebar] = useState(false);
  const [profileBar, setprofileBar] = useState(false);


  return (
    <>
      <HomeSidebar open={sidebar} setOpen={setSidebar} />

      <header className="h-16 w-full border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center justify-between h-full px-6 max-w-7xl mx-auto">

          {/* LEFT */}
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              className="rounded-lg"
              onClick={() => setSidebar(true)}
            >
              <Menu size={18} />
            </Button>

            <h1 className="text-lg md:text-xl font-semibold text-gray-800">
              Village Family Directory
            </h1>
          </div>

          {/* RIGHT (Search + Avatar) */}
          <div className="flex items-center gap-4">

            {/* Search Bar */}
            <div className="hidden md:block w-[280px]">
              <Input
                placeholder="Search members..."
                className="rounded-xl bg-gray-100 border-none focus-visible:ring-2 focus-visible:ring-blue-500"
              />
            </div>

            {/* Avatar */}
            <Avatar className="w-10 h-10 ring-2 ring-gray-200 hover:ring-blue-400 transition"
              onClick={() => setprofileBar(true)}>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>AN</AvatarFallback>
              <AvatarBadge className="bg-green-500" />
            </Avatar>
          </div>

          {/* //profile side bar */}
          <Sheet open={profileBar} onOpenChange={setprofileBar}>
            <SheetContent
              side="right"
              className="w-60 p-2 bg-cyan-500 text-white mt-16"
            >
              {/* HEADER */}
              <div className="p-4 text-lg font-semibold  border-blue-500">
                welcome
              </div>
              <Separator className="" />

              {/* MENU */}
              <nav className="flex flex-col gap-2 p-4">
                <NavLink
                  to={ROUTES.PROFILE}
                  // onClick={}
                  className="flex items-center gap-3 p-2 rounded hover:bg-blue-500"
                >
                  <User size={16} />
                  Profile
                </NavLink>

                <NavLink
                  to={ROUTES.SETTING}
                  // onClick={}
                  className="flex items-center gap-3 p-2 rounded hover:bg-blue-500"
                >
                  <Settings size={16} />
                  Setting
                </NavLink>

                <NavLink
                  to="#"
                  // onClick={}
                  className="flex items-center gap-3 p-2 rounded hover:bg-blue-500"
                >
                  <Search size={16} />
                  Search
                </NavLink>

                <NavLink
                  to={ROUTES.ADD_MEMBERS}
                  // onClick={}
                  className="flex items-center gap-3 p-2 rounded hover:bg-blue-500"
                >
                  <Users size={16} />
                  Add user
                </NavLink>
              </nav>
              {/* <Separator /> */}
            </SheetContent>
          </Sheet>
        </div>
      </header>
    </>
  );
};

export default HomeNavbar;