import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import {callApi} from  "../../../Services/Api"
import { useEffect, useState } from "react";
import { showErrorToast } from "@/Utils/ErrorToast";
import { ShowSuccessToast } from "@/Utils/SuccessToast";
import { useNavigate } from "react-router-dom";




export function Login() {

    const navigate = useNavigate()
     const [formData, setFormData] = useState({
       email: "",
       password: "",
     });
     
     const handleChange = (e:any) => {
  const { name, value } = e.target;
  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
};

  const handleLogin = async () => {
    try {
     if(!formData.email || !formData.email) {
      return
     }
     const res = await callApi("login", "post", formData);
    console.log("Login Response:", res);
    ShowSuccessToast(res)
    console.log(res)
    navigate("/dashboard")

    // saving accesstoken and userId in localStorage
    localStorage.setItem("accessToken", res?.data.accessToken);
    localStorage.setItem("userId", res?.data.userId)

    } catch (error:any) {
      console.log("Login Error:", error);
      showErrorToast(error)
    }
  };
  
 useEffect(()=>{
 handleLogin();
 },[])

  return (
    <div className="flex justify-center items-center w-full h-screen">
      <Card className="w-full max-w-sm ">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
          <CardAction>
            <Button variant="link">Sign Up</Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="m@example.com"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button
            type="submit"
            className="w-full bg-green-700 text-white hover:bg-green-600"
            onClick={handleLogin}
          >
            Login
          </Button>
          <Button
            variant="outline"
            className="w-full hover:bg-white! hover:text-black!"
          >
            Login with Google
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
