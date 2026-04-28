
import AppsideBar from "./Sidebar"
import Layout from "./Layout"
import { SidebarProvider } from "../ui/sidebar"
import { callApi } from "../../../Services/Api";
import { ShowSuccessToast } from "@/Utils/SuccessToast";
import { showErrorToast } from "@/Utils/ErrorToast";
import {  useEffect, useState } from "react";



function Dashboard({ children }: { children?: React.ReactNode }) {

      const [userData, setUserData] = useState("");

   const fetchUserData = async () => {    
      try {
        const userId = localStorage.getItem("userId")
        const res = await callApi(`user/${userId}`);
        console.log(res)
        setUserData(res.data);
      } catch (error:any) {
        console.log("Login Error:", error);
        showErrorToast(error)
      }
    };
    useEffect(()=> {
      fetchUserData()
    },[])
  return (
    <div className="flex">
      <SidebarProvider className="relative">
        <AppsideBar userData={userData} />
        <main>{children}</main>
        <Layout userData={userData} />
      </SidebarProvider>
    </div>
  );
}

export default Dashboard;
