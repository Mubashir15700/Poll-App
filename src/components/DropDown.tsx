"use client"
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import axios from "../config/axios";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { logOut } from "@/redux/slices/authSlice";

const Dropdown = ({ displayName }: { displayName: string | null }) => {
    const dispatch = useDispatch();
    const router = useRouter();

    function deleteCookie() {
        axios.post("/auth/logout")
            .then(response => {
                // Check if logout was successful
                if (response.status === 200) {
                    // Dispatch logout action
                    dispatch(logOut());
                    // Redirect to the homepage
                    router.push("/");
                } else {
                    // If logout was not successful, show an error toast
                    toast.error("Logout failed");
                    console.error("Logout failed:", response.data);
                }
            })
            .catch(error => {
                // Handle errors if any
                toast.error("Logout failed");
                console.error("Logout failed:", error);
            });
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className="bg-slate-950 text-white border border-transparent rounded">
                    {displayName}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-gray-300 border rounded">
                <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span onClick={deleteCookie}>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default Dropdown;
