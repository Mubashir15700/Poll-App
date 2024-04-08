import { ReactNode, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { logIn } from "@/redux/slices/authSlice";
import axios from "../config/axios";
import ToggleButton from "./ToggleButton";
import Dropdown from "./DropDown";

const navLinks = [
    { name: "Home", href: "/home" },
    { name: "New Poll", href: "/new-poll" },
    { name: "My Polls", href: "/my-polls" },
];

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const dispatch = useDispatch();
    const pathName = usePathname();

    const currentUser = useSelector((state: RootState) => state.authReducer.userData);

    const displayName = currentUser?.username ?? "Guest";

    // Function to close the navbar when screen size changes
    useEffect(() => {
        const closeNavbarOnLargeScreen = () => {
            if (window.innerWidth >= 768) {
                setIsOpen(false);
            }
        };

        if (currentUser === null) {
            // Verify token on the server-side
            axios.get("/auth/verify-token").then(response => {
                const { userId, username } = response.data;
                dispatch(logIn({ userId, username }));
            }).catch(error => {
                // Handle token verification failure
                toast.error("Error verifying token");
                console.error("Error verifying token:", error);
                // Optionally dispatch an action to handle authentication failure
            });
        }

        window.addEventListener("resize", closeNavbarOnLargeScreen);

        return () => window.removeEventListener("resize", closeNavbarOnLargeScreen);
    }, []);

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    const renderNavLinks = (screenSize: string): ReactNode => {
        const navLinksJSX = navLinks.map((link) => {
            const isActive = pathName.startsWith(link.href);
            const linkJSX = (
                <Link
                    key={link.name}
                    href={link.href}
                    className={`mr-4 ${isActive ? "text-white font-bold " : "text-white"}`}
                    onClick={toggleNavbar}
                >
                    {link.name}
                </Link>
            );

            if (screenSize !== "large") {
                return (
                    <div key={link.name} className="mb-2">
                        {linkJSX}
                    </div>
                );
            }

            return linkJSX;
        });

        return navLinksJSX;
    };

    return (
        <div className="bg-gray-800 bg-opacity-90 backdrop-blur-md py-4 fixed top-0 left-0 w-full z-10">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/" className="text-white text-xl font-bold">
                    My Polling App
                </Link>
                <div className="md:hidden">
                    <ToggleButton isOpen={isOpen} toggleNavbar={toggleNavbar} />
                </div>
                <div className={`hidden md:block`}>
                    {renderNavLinks("large")}
                    <Dropdown displayName={displayName} />
                </div>
            </div>
            {isOpen && (
                <div className="md:hidden mt-2 ml-8">
                    {renderNavLinks("small")}
                    <Dropdown displayName={displayName} />
                </div>
            )}
        </div>
    );
};

export default Navbar;
