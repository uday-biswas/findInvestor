import { toast } from "react-hot-toast";
import { setLoading, setToken } from "../../redux/authReducer";
import { setUser } from "../../redux/profileReducer";
import { apiConnector } from "../apiConnector";
import { endpoints } from "../api";
import { NavigateFunction } from "react-router-dom";
import { Dispatch } from "@reduxjs/toolkit";
const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  RESETPASSTOKEN_API,
  RESETPASSWORD_API,
} = endpoints;

const sendOtp = async (email: string, navigate: NavigateFunction, dispatch: Dispatch) => {
  const toastId = toast.loading("Loading...");
  try {
    dispatch(setLoading(true));
    const response = await apiConnector("POST", SENDOTP_API, { email });
    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("OTP Sent Successfully");
    navigate("/verify-email");
  } catch (error: any) {
    const errorResponse = error?.response?.data?.message;
    toast.error("Could Not Send OTP");
    toast.error(errorResponse);
  } finally {
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  }
};

const signUp = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  confirmPassword: string,
  otp: any,
  navigate: NavigateFunction,
  dispatch: Dispatch
) => {
  const toastId = toast.loading("Loading...");
  console.log("signup tost id", toastId);
  dispatch(setLoading(true));
  try {
    const response = await apiConnector("POST", SIGNUP_API, {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      otp,
    });

    // console.log("SIGNUP API RESPONSE............", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    toast.success("Signup Successful");
    navigate("/login");
  } catch (error: any) {
    // console.log("SIGNUP API ERROR............", error);
    const errorResponse = error?.response?.data?.message;
    // console.log(`tost error: - > ${errorResponse}`);
    toast.error(errorResponse);
    toast.error("NOT ABLE TO SIGNUP");

    // navigate("/signup")
  }
  dispatch(setLoading(false));
  toast.dismiss(toastId);
};

const login = async (email: string, password: string, navigate: NavigateFunction, dispatch: Dispatch) => {
  const toastId = toast.loading("Loading...");
  dispatch(setLoading(true));
  try {
    const response = await apiConnector("POST", LOGIN_API, {
      email,
      password,
    });

    // console.log("LOGIN API RESPONSE............", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("Login Successful");
    const userImage = response.data?.user?.image
      ? response.data.user.image
      : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`;

    localStorage.setItem("token", JSON.stringify(response.data.token));
    localStorage.setItem("user", JSON.stringify(response.data.user));

    dispatch(setToken(response.data.token));
    dispatch(setUser({ ...response.data.user, image: userImage }));
    console.log("login user", response.data.user)

    navigate("/");
  } catch (error: any) {
    // console.log("LOGIN API ERROR............", error);
    toast.error("Login Failed");
    const errorResponse = error?.response?.data?.message;
    toast.error(errorResponse);
  }
  dispatch(setLoading(false));
  toast.dismiss(toastId);
};

const getPasswordResetToken = async (email: string, setEmailSent: (arg0: boolean) => void, dispatch: Dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await apiConnector("POST", RESETPASSTOKEN_API, {
      email,
    });

    // console.log("RESET PASSWORD TOKEN RESPONSE....", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("Reset Email Sent");
    setEmailSent(true);
  } catch (error: any) {
    // console.log("RESET PASSWORD TOKEN Error", error);
    toast.error("Failed to send email for resetting password");
    const errorResponse = error?.response?.data?.message;
    toast.error(errorResponse);
  }
  dispatch(setLoading(false));
};

const resetPassword = async (password: string, confirmPassword: string, token: any, navigate: NavigateFunction, dispatch: Dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await apiConnector("POST", RESETPASSWORD_API, {
      password,
      confirmPassword,
      token,
    });

    // console.log("RESET Password RESPONSE ... ", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("Password has been reset successfully");
    navigate("/login");
  } catch (error: any) {
    // console.log("RESET PASSWORD TOKEN Error", error);
    toast.error("Unable to reset password");
    const errorResponse = error?.response?.data?.message;
    toast.error(errorResponse);
  }
  dispatch(setLoading(false));
};

const logout = (navigate: NavigateFunction, dispatch: Dispatch) => {
  dispatch(setToken(null));
  dispatch(setUser(null));
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  toast.success("Logged Out");
  navigate("/");
};

export { sendOtp, signUp, login, logout, getPasswordResetToken, resetPassword };
