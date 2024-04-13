import { toast } from "react-hot-toast";
import { setLoading, setUser } from "../../redux/profileReducer";
import { apiConnector } from "../apiConnector";
import { endpoints } from "../api";
import { Dispatch } from "@reduxjs/toolkit";
import { loadStripe } from "@stripe/stripe-js";

const {
    UPDATE_PROFILE_API,
    UPGRADE_USING_STRIPE_API,
    PAYMENT_SUCCESS_API,
} = endpoints;

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