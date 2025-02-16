import React, { useContext } from "react";
import axios from "axios";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";

import { storeContext } from "@/Store/Store";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar = () => {
    const { isAuth, setIsAuth } = useContext(storeContext);


    const handleLogout = async () => {
        try {
          const response = await axios.post("http://localhost:5000/api/auth/logOut", {}, { withCredentials: true });
      
          console.log("Logout successful:", response.data);
            setIsAuth(false)
  
          alert("You have been logged out successfully.");
          window.location.href = "/"; 
        } catch (error) {
          console.error("Logout failed:", error.response?.data?.message || error.message);
          alert(error.response?.data?.message || "Logout failed. Please try again.");
        }
      };

      


    const categories = [
        "Google",
        "Apple",
        "Microsoft",
        "Amazon",
        "Facebook",
        "Tesla",
        "IBM",
        "Intel",
        "Adobe",
        "Oracle",
        "Netflix",
        "Salesforce",
        "Spotify",
        "Uber",
        "Dropbox",
    ];

    return (
        <nav className="w-full bg-white shadow-md p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-xl font-bold text-gray-900">
                InterviewAce
                </Link>
                <NavigationMenu>
                    <NavigationMenuList className="flex gap-4">
                        <NavigationMenuItem>
                            <Link to="/">Home</Link>
                                
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Link to="/collection">Collections</Link>
                        </NavigationMenuItem>

                        {!isAuth ? (
                            <NavigationMenuItem>
                                <NavigationMenuTrigger>
                                    Profile
                                </NavigationMenuTrigger>
                                <NavigationMenuContent className="min-w-[200px] bg-gray-100 p-4 rounded-lg shadow-lg">
                                    <div className="flex flex-col gap-2">
                                        <NavigationMenuLink asChild>
                                            <Link
                                                to="/auth/login"
                                                className="hover:text-blue-600"
                                            >
                                                Login
                                            </Link>
                                        </NavigationMenuLink>
                                        <NavigationMenuLink asChild>
                                            <Link
                                                to="/auth/register"
                                                className="hover:text-blue-600"
                                            >
                                                Sign In
                                            </Link>
                                        </NavigationMenuLink>
                                    </div>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        ) : (
                            <NavigationMenuItem>
                                <NavigationMenuTrigger>
                                    <Avatar>
                                        <AvatarFallback className=" bg-[#0f2a42] text-white">
                                            A
                                        </AvatarFallback>
                                    </Avatar>
                                </NavigationMenuTrigger>
                                <NavigationMenuContent className="min-w-[200px] bg-gray-100 p-4 rounded-lg shadow-lg">
                                    <div className="flex flex-col gap-2">
                                        <NavigationMenuLink asChild>
                                            <Link
                                                to="/user/addCollection"
                                                className="hover:text-blue-600"
                                            >
                                                Create Collection
                                            </Link>
                                        </NavigationMenuLink>
                                        <NavigationMenuLink asChild>
                                            <Link
                                                to="/user/viewCollection"
                                                className="hover:text-blue-600"
                                            >
                                                View Collection
                                            </Link>
                                        </NavigationMenuLink>
                                        <NavigationMenuLink asChild>
                                            <Link
                                                className="hover:text-blue-600"
                                                onClick={handleLogout}
                                            >
                                                Logout
                                            </Link>
                                        </NavigationMenuLink>
                                    </div>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        )}
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
        </nav>
    );
};

export default Navbar;
