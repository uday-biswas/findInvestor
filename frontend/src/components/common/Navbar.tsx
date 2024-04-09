import { useState } from "react";
import { Link, useLocation, matchPath, useNavigate } from "react-router-dom";
import { NavbarLinks } from "../../data/navbar-links";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { logout } from "../../services/operation/authAPI";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, CreditCard, LogOut } from "lucide-react";
import { FaRegStar } from "react-icons/fa6";
import Profile from "./Profile";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/index";

const Navbar = () => {
    const { token } = useSelector((store: RootState) => store.auth);
    const user = useSelector((store: RootState) => store.profile.user ? store.profile.user : null);
    console.log("user", user);

    // const [navVisible, setNavVisible] = useState(false);
    const [detailsModal, setDetailsModal] = useState(false);

    const location = useLocation();
    const matchRoute = (route: any) => {
        return matchPath({ path: route }, location.pathname);
    };

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // const toggleNav = () => {
    //     setNavVisible(!navVisible);
    // };

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
                                    <button className="rounded-[8px] border border-gray-700 bg-gray-800 px-[12px] py-[8px] text-gray-300">
                                        Log in
                                    </button>
                                </Link>
                                <Link to="/signup">
                                    <button className="rounded-[8px] border border-gray-700 bg-gray-800 px-[12px] py-[8px] text-gray-300">
                                        Sign up
                                    </button>
                                </Link>
                            </>
                        )}

                        {token !== null && (
                            <div className="flex gap-3">
                                {
                                    user.membership === "gold" ? (
                                        <button className="rounded-[8px] font-semibold border bg-yellow-400 text-black py-1 px-2">
                                            <FaRegStar className="inline-block mr-1" />
                                            Gold
                                        </button>
                                    ) : user.membership === "silver" ? (
                                        <button className="rounded-[8px] font-semibold border text-white bg-green-700 py-1 px-2">
                                            <FaRegStar className="inline-block mr-1" />
                                            Silver
                                        </button>
                                    ) : (
                                        <Link to="/upgrade">
                                            <button className="rounded-[8px] font-semibold border bg-emerald-400 text-black py-1 px-2">
                                                <FaRegStar className="inline-block mr-1" />
                                                Upgrade Now
                                            </button>
                                        </Link>
                                    )
                                }
                                <DropdownMenu>
                                    <DropdownMenuTrigger>
                                        <Avatar>
                                            <AvatarImage src={user ? user.image : null} />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-48 mr-2">
                                        <DropdownMenuLabel>
                                            <div className="flex flex-col gap-2">
                                                <div>{user ? `${user.firstName} ${user.lastName}` : null}</div>
                                                <div className="text-xs text-gray-400">{user ? user.email : null}</div>
                                            </div>
                                        </DropdownMenuLabel>
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
                                        <div onClick={() => logout(navigate, dispatch)}>
                                            <DropdownMenuItem>
                                                <LogOut className="mr-2 h-4 w-4" />
                                                <span>Log out</span>
                                                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                                            </DropdownMenuItem>
                                        </div>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                <Profile detailsModal={detailsModal} setDetailsModal={setDetailsModal} user={user} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
