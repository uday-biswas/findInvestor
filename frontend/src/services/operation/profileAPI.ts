import { toast } from "react-hot-toast";
import { NavigateFunction } from "react-router-dom";
import { setLoading, setUser } from "../../redux/profileReducer";
import { apiConnector } from "../apiConnector";
import { endpoints } from "../api";
import { logout } from "./authAPI";
import { Dispatch } from "@reduxjs/toolkit";
import { loadStripe } from "@stripe/stripe-js";

const {
    GET_USER_DETAILS_API,
    UPDATE_PROFILE_API,
    UPGRADE_USING_STRIPE_API,
    PAYMENT_SUCCESS_API,
} = endpoints;

export async function getUserDetails(token: any, navigate: NavigateFunction, dispatch: Dispatch) {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
        const response = await apiConnector("GET", GET_USER_DETAILS_API, null, {
            Authorization: `Bearer ${token}`,
        });
        console.log("GET_USER_DETAILS API RESPONSE............", response);

        if (!response.data.success) {
            throw new Error(response.data.message);
        }
        const userImage = response.data.data.image
            ? response.data.data.image
            : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.data.firstName} ${response.data.data.lastName}`;
        dispatch(setUser({ ...response.data.data, image: userImage }));
    } catch (error: any) {
        logout(navigate, dispatch);
        console.log("GET_USER_DETAILS API ERROR............", error);
        toast.error("Could Not Get User Details");
        const errorResponse = error?.response?.data?.message;
        console.log(`toast error: - > ${errorResponse}`);
        toast.error(errorResponse);
    }
    toast.dismiss(toastId);
    dispatch(setLoading(false));
}

export async function updateProfile(
    gender: string,
    about: string,
    dob: string,
    contact: string,
    email: string,
    dispatch: Dispatch
) {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
        const response = await apiConnector("PUT", UPDATE_PROFILE_API, {
            gender,
            about,
            dob,
            contact,
            email,
        });
        console.log("UPDATE_PROFILE API RESPONSE............", response?.data);

        if (!response.data.success) {
            throw new Error(response.data.message);
        }
        toast.success("Profile Updated Successfully");
        console.log("additional details: ", response.data.data);
        dispatch(setUser(response.data.data))
        localStorage.setItem("user", JSON.stringify(response.data.data));
    } catch (error: any) {
        console.log(`toast error: - > ${error?.response?.data?.message}`);
        toast.error(error?.response?.data?.message);
    }
    toast.dismiss(toastId);
    dispatch(setLoading(false));
}

export async function upgradeUsingStripe(email: any, membership: string) {
    const toastId = toast.loading("Loading...");
    const stripes = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
    console.log("stripe: ", stripes);
    console.log("email show: ", email);
    try {
        const response = await apiConnector("POST", UPGRADE_USING_STRIPE_API, {
            email,
            membership,
        });
        // console.log("Upgrade API RESPONSE............", response?.data);
        if (!response.data.success) {
            throw new Error(response.data.message);
        }
        if (stripes) {
            const result = stripes.redirectToCheckout({
                sessionId: response.data.sessionId,
            });

            if ((await result).error) {
                throw new Error((await result).error.message);
            }
        }

        toast.success("Redirecting to Payment Gateway...");
        localStorage.setItem("sessionId", response.data.sessionId);
    } catch (error: any) {
        console.log(`toast error: - > ${error?.message}`);
        toast.error(error?.message);
    }
    toast.dismiss(toastId);
}

export async function paymentSuccess(email: any, sessionId: string, dispatch: Dispatch) {
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("POST", PAYMENT_SUCCESS_API, {
            email,
            session: sessionId,
        });
        console.log("Payment success API RESPONSE............", response?.data);
        if (!response.data.success) {
            throw new Error(response.data.message);
        }
        toast.success("Payment Successful");
        dispatch(setUser(response.data.data));
        localStorage.setItem("user", JSON.stringify(response.data.data));
    }
    catch (error: any) {
        console.log(`toast error: - > ${error?.message}`);
        toast.error(error?.message);
    }
    toast.dismiss(toastId);
}