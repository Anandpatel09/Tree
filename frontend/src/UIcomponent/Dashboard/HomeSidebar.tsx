import { NavLink } from "react-router-dom";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { LayoutDashboard, UserPlus, Search, LogOut } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface SidebarProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const HomeSidebar = ({ open, setOpen }: SidebarProps) => {
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent
        side="left"
        className="w-60 p-2 bg-blue-600 text-white mt-16"
      >
        {/* HEADER */}
        <div className="p-4 text-lg font-semibold  border-blue-500">
          Village Directory
        </div>
        <Separator />

        {/* MENU */}
        <nav className="flex flex-col gap-2 p-4">
          <NavLink
            to="/dashboard"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 p-2 rounded hover:bg-blue-500"
          >
            <LayoutDashboard size={16} />
            Dashboard
          </NavLink>

          <NavLink
            to="/add-members"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 p-2 rounded hover:bg-blue-500"
          >
            <UserPlus size={16} />
            Add Member
          </NavLink>

          <NavLink
            to="/search"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 p-2 rounded hover:bg-blue-500"
          >
            <Search size={16} />
            Search
          </NavLink>
        </nav>
        <Separator />

        {/* FOOTER */}
        <button
          className="flex items-center gap-3 w-full p-2 rounded hover:bg-blue-500"
          onClick={() => setOpen(false)}
        >
          <NavLink to="/logout" className="flex items-center gap-3 w-full">
            <LogOut size={16} />
            Logout
          </NavLink>
        </button>
      </SheetContent>
    </Sheet>
  );
};

export default HomeSidebar;
