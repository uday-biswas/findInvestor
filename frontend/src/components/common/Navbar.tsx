//before return statement
//firstly take the token , user details and total items from redux store
//then fetch the sublinks from the api and create a function to check the route to make the navbar links active
//for return statement
//put the logo, then map through the navbar links array {home, catalog, about, contact} and put the links inside li tag.
//if the title is catalog then put the sublinks inside the div tag and map through the sublinks array and
// put the links inside li tag which will be shown on hover.
//then put the login & signup button if token is null else put the cart with totalItems and profile dropdown button.

import React, { useEffect, useState } from "react";
import { Link, useLocation, matchPath } from "react-router-dom";
import { NavbarLinks } from "../../data/navbar-links";
import { match } from "assert";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, CreditCard, LogOut } from "lucide-react";


// import { useSelector } from "react-redux";
// import { ACCOUNT_TYPE } from "../../utils/constant";
// import ProfileDropdown from "../core/auth/ProfileDropdown";
// import { AiOutlineShoppingCart } from "react-icons/ai";
// import { BsChevronDown } from "react-icons/bs";
// import { apiConnector } from "../../services/apiConnector";
// import { courseEndpoints } from "../../services/api";
// import { FiMenu } from "react-icons/fi";
// import { BiRightArrow } from "react-icons/bi";
// import { GiCancel } from "react-icons/gi";
import { FaRegStar } from "react-icons/fa6";
import Profile from "./Profile";
import { Button } from "../ui/button";
const Navbar = () => {
    //   const { token } = useSelector((store) => store.auth);
    //   const { user } = useSelector((store) => store.profile);
    //   const { totalItems } = useSelector((store) => store.cart);
    const token = "token";
    const plan = "free";

    //   const [hover, setHover] = useState(false);
    const [navVisible, setNavVisible] = useState(false);
    const [optionsDropdown, setOptionsDropdown] = useState(false);
    const [detailsModal, setDetailsModal] = useState(false);
    const [moreOptionsDropdown, setMoreOptionsDropdown] = useState(false);
    const [moreDetailsModal, setMoreDetailsModal] = useState(false);

    const location = useLocation();
    const matchRoute = (route: any) => {
        return matchPath({ path: route }, location.pathname);
    };
    const toggleNav = () => {
        setNavVisible(!navVisible);
    };

    const clicked = () => {
        console.log("clicked");
        setDetailsModal(false);
    }

    const logout = () => {
        console.log("logout");
    }

    return (
        <>
            {/* for tab and desktop */}
            <div
                className={` hidden md:flex h-14 items-center justify-center transition-all duration-200`}
            >
                <div className=" hidden md:flex w-11/12 max-w-maxContent items-center justify-between">
                    <div className="flex flex-row gap-6">
                        {/* logo */}
                        <Link to="/" className="text-white font-bold text-2xl ">
                            GetFunded
                        </Link>

                        {/* nav links */}
                        <nav>
                            <ul className="flex mt-1 gap-x-6 text-richblack-25 font-semibold">
                                {NavbarLinks?.map((element, index) => (
                                    <li key={index}>
                                        <Link to={element.path}>
                                            <p
                                                className={`${matchRoute(element.path)
                                                    ? "bg-gray-700 text-gray-200 px-2 rounded-[8px]"
                                                    : "hover:text-gray-400"
                                                    }`}
                                            >
                                                {element?.title}
                                            </p>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>

                    {/* login / signup / dashboard  */}
                    <div className=" items-center gap-x-4 md:flex">
                        {token === null && (
                            <>
                                <Link to="/login">
                                    <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                                        Log in
                                    </button>
                                </Link>
                                <Link to="/signup">
                                    <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                                        Sign up
                                    </button>
                                </Link>
                            </>
                        )}

                        {token !== null && (
                            <div className="flex gap-3">
                                <Link to="/upgrade">
                                    <button className="rounded-[8px] font-semibold border bg-emerald-400 text-black px-[12px] py-[8px] ">
                                        <FaRegStar className="inline-block mr-1" />
                                        Upgrade Now
                                    </button>
                                </Link>
                                <DropdownMenu>
                                    <DropdownMenuTrigger>
                                        <Avatar>
                                            <AvatarImage src="https://github.com/shadcn.png" />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-48">
                                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuGroup>
                                            <DropdownMenuItem onClick={() => setDetailsModal(true)}>
                                                <User className="mr-2 h-4 w-4" />
                                                <span>Profile</span>
                                                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                                            </DropdownMenuItem>
                                            <Link to="/billing">
                                                <DropdownMenuItem>
                                                    <CreditCard className="mr-2 h-4 w-4" />
                                                    <span>Billing</span>
                                                    <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                                                </DropdownMenuItem>
                                            </Link>
                                        </DropdownMenuGroup>
                                        <DropdownMenuSeparator />
                                        <div onClick={logout}>
                                            <DropdownMenuItem>
                                                <LogOut className="mr-2 h-4 w-4" />
                                                <span>Log out</span>
                                                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                                            </DropdownMenuItem>
                                        </div>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                <Profile detailsModal={detailsModal} setDetailsModal={setDetailsModal} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
