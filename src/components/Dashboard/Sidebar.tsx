import {
  LayoutDashboard,
  LogOut,
  NotebookPen,
  SettingsIcon,
  User2,
  Users,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import logo from "../../assets/logo.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { NavTabItems } from "../NavTabItems";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";




function Appsidebar({userData}) {
  console.log("appsidebar", userData)
  const {role} = useContext(AuthContext)
 console.log(role)
 
const visibleItems = NavTabItems.filter((tab,i) => tab.allowedRoles.includes(role));
 
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="flex flex-row justify-between items-center w-full border relative">
        <img src={logo} alt="log" width={40} />
        <h2 className="text-xl">Hello {userData.name}</h2>

        <SidebarTrigger className="flex justify-center items-center cursor-pointer absolute rounded-full -right-4 top-10 bg-gray-200 hover:bg-gray-700 hover:text-white transition-all duration-100" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Alpha CRMs</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {visibleItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton asChild>
                    <Link to={item.path}>
                      {/* <item.icon /> */}
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-3 hover:bg-gray-100 cursor-pointer p-2 rounded">
            <SettingsIcon />
          </DropdownMenuTrigger>
          <DropdownMenuContent sideOffset={8} align="start">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              {" "}
              <User2 /> Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-red-600  focus:bg-red-600 data-highlighted:bg-red-600 data-highlighted:text-white flex items-center font-semibold">
              <Link to="/login" className="flex items-center">
                <LogOut className="hover:text-white" />{" "}
                <span className="ml-2">Logout</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

export default Appsidebar;
