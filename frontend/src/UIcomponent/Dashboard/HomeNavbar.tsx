// import { Input } from "@/components/ui/input";
// import { Menu } from "lucide-react";
// import {
//   DropdownMenu,
//   DropdownMenuTrigger,
//   DropdownMenuContent,
//   DropdownMenuItem,
// } from "@/components/ui/dropdown-menu";

// import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import { useState } from "react";
// import HomeSidebar from "./HomeSidebar";

// const HomeNavbar = () => {
//   const [sidebar, setSidebar] = useState(false);

//   return (
//     <>
//     <HomeSidebar open={sidebar} setOpen={setSidebar}/>
//     <div className="h-16 w-full border-b flex items-center justify-between p-6 bg-muted">
//       <Button
//         className="bg-blue-600 hover:bg-blue-400 text-white"
//         onClick={()=>setSidebar(true)}
//       >
//         <Menu className="w-6 h-6 cursor-pointer" />
//       </Button>

//       <h1 className="text-lg font-semibold">Village Family Directory</h1>
//       {/* Center */}
//       <Input placeholder="Search members..." className="w-66 mx-6 " />
//       {/* Right */}
//       <div className="flex items-center gap-4">
//         <DropdownMenu>
//           <DropdownMenuTrigger>
//             <Avatar>
//               <AvatarImage src="/avatar.png" />
//               <AvatarFallback className="rounded border bg-gray-300">
//                 AD
//               </AvatarFallback>
//             </Avatar>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent>
//             <DropdownMenuItem>Profile</DropdownMenuItem>
//             <DropdownMenuItem>Settings</DropdownMenuItem>
//             <DropdownMenuItem>Logout</DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       </div>
//     </div>
//     </>
//   );
// };

// export default HomeNavbar;

import { Input } from "@/components/ui/input";
import { Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import HomeSidebar from "./HomeSidebar";

const HomeNavbar = () => {
  const [sidebar, setSidebar] = useState(false);

  return (
    <>
      <HomeSidebar open={sidebar} setOpen={setSidebar} />

      <header className="h-16 w-full border-b flex items-center justify-between px-6 bg-muted">
        {/* LEFT */}
        <div className="flex items-center gap-4">
          <Button
            className="bg-blue-600 hover:bg-blue-500 text-white"
            onClick={() => setSidebar(true)}
          >
            <Menu size={16} />
          </Button>

          <h1 className="text-lg font-semibold">Village Family Directory</h1>
        </div>

        {/* CENTER */}
        <div className="w-[300px]">
          <Input placeholder="Search members..." />
        </div>

        {/* RIGHT */}
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar className="cursor-pointer">
              <AvatarImage src="/avatar.png" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="mr-2">
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
    </>
  );
};

export default HomeNavbar;
