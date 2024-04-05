//during return statement
//it shows the new password and confirm password fields
//on submit, it takes the token from the url and dispatches the resetPassword function to update the password

import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { resetPassword } from "../../services/operation/authAPI";
import { RootState } from "../../redux/index";

function UpdatePassword() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const { loading } = useSelector((store: RootState) => store.auth);
    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { password, confirmPassword } = formData;

    const handleOnChange = (e: any) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    };

    const handleOnSubmit = (e: any) => {
        e.preventDefault();
        const token = location.pathname.split("/").at(-1);
        console.log("token :- >", token);
        resetPassword(password, confirmPassword, token, navigate, dispatch);
    };

    return (
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
            {loading ? (
                <div className="spinner"></div>
            ) : (
                <div className="max-w-[500px] p-4 lg:p-8">
                    <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-gray-100">
                        Choose new password
                    </h1>
                    <p className="my-4 text-[1.125rem] leading-[1.625rem] text-gray-400">
                        Almost done. Enter your new password and youre all set.
                    </p>
                    <form onSubmit={handleOnSubmit}>
                        <label className="relative">
                            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-gray-100">
                                New Password <sup className="text-pink-500">*</sup>
                            </p>
                            <input
                                required
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={password}
                                onChange={handleOnChange}
                                placeholder="Enter Password"
                                style={{
                                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                }}
                                className="w-full rounded-[0.5rem] bg-gray-700 p-[12px] text-gray-100"
                            />
                            <span
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                            >
                                {showPassword ? (
                                    <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                                ) : (
                                    <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                                )}
                            </span>
                        </label>
                        <label className="relative mt-3 block">
                            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-gray-100">
                                Confirm New Password <sup className="text-pink-500">*</sup>
                            </p>
                            <input
                                required
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                value={confirmPassword}
                                onChange={handleOnChange}
                                placeholder="Confirm Password"
                                style={{
                                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                }}
                                className="w-full rounded-[0.5rem] bg-gray-700 p-[12px] text-gray-100"
                            />
                            <span
                                onClick={() => setShowConfirmPassword((prev) => !prev)}
                                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                            >
                                {showConfirmPassword ? (
                                    <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                                ) : (
                                    <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                                )}
                            </span>
                        </label>

                        <button
                            type="submit"
                            className="mt-6 w-full rounded-[8px] bg-yellow-500 py-[12px] px-[12px] font-medium text-gray-900"
                        >
                            Reset Password
                        </button>
                    </form>
                    <div className="mt-6 flex items-center justify-between">
                        <Link to="/login">
                            <p className="flex items-center gap-x-2 text-gray-100">
                                <BiArrowBack /> Back To Login
                            </p>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UpdatePassword;
