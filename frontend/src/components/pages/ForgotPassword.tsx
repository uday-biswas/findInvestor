//during the return statement
//define the email and emailSent states

//before the email is sent, the emailSent state is false, it will show the form to enter the email address
//and a submit button to send the email.
//after submit, the submit handler will dispatch the getPasswordResetToken function from the authAPI.js file
//which will send the reset link to the email and set the emailSent state to true.

//after the email is sent, the emailSent state is true, it will show the message that the email is sent to the email address
//and a button to resend the email.

import { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { getPasswordResetToken } from "../../services/operation/authAPI";
import { RootState } from "../../redux/index";
import BounceLoader from "react-spinners/BounceLoader";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [emailSent, setEmailSent] = useState(false);
    const dispatch = useDispatch();
    const { loading } = useSelector((store: RootState) => store.auth);

    const handleOnSubmit = (e: any) => {
        e.preventDefault();
        getPasswordResetToken(email, setEmailSent, dispatch);
    };

    return (
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
            {loading ? (
                <BounceLoader
                    color={"blue"}
                    loading={loading}
                    size={100}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            ) : (
                <div className="max-w-[550px] p-4 lg:p-8">
                    <h1 className="text-[1.875rem] font-bold leading-[2.375rem] text-gray-100">
                        {!emailSent ? "Reset your password" : "Check email"}
                    </h1>
                    <p className="my-4 text-[1.125rem] font-semibold leading-[1.625rem] text-gray-400">
                        {!emailSent
                            ? "Have no fear. We'll email you instructions to reset your password."
                            : `We have sent the reset email to ${email}`}
                    </p>
                    <form onSubmit={handleOnSubmit}>
                        {!emailSent && (
                            <label className="w-full">
                                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-gray-100">
                                    Email Address <sup className="text-pink-500">*</sup>
                                </p>
                                <input
                                    required
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter email address"
                                    style={{
                                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                    }}
                                    className="w-full rounded-[0.5rem] bg-gray-700 p-[12px] text-gray-100"
                                />
                            </label>
                        )}
                        <button
                            type="submit"
                            className="mt-6 w-full rounded-[8px] bg-yellow-500 py-[12px] px-[12px] font-medium text-gray-900"
                        >
                            {!emailSent ? "Submit" : "Resend Email"}
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

export default ForgotPassword;
