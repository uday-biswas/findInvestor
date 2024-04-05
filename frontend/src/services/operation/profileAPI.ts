import { toast } from "react-hot-toast";
import { NavigateFunction } from "react-router-dom";
import { setLoading, setUser } from "../../redux/profileReducer";
import { apiConnector } from "../apiConnector";
import { endpoints } from "../api";
import { logout } from "./authAPI";
import { Dispatch } from "@reduxjs/toolkit";

const {
    GET_USER_DETAILS_API,
} = endpoints;

//function to get user details
//it takes token and navigate as parameter
//its returning a async function which takes dispatch as parameter
//its using apiConnector function to make to create a instance of axios to send the get request to the GET_USER_DETAILS_API
//if the response is not success then it will throw a error
//if the response is success then it will dispatch the setUser action with the response data
//if there is any error then it will dispatch the logout action.
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
        console.log(`tost error: - > ${errorResponse}`);
        toast.error(errorResponse);
    }
    toast.dismiss(toastId);
    dispatch(setLoading(false));
}
