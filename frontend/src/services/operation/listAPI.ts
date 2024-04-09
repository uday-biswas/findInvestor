import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { endpoints } from "../api";
import { Dispatch } from "@reduxjs/toolkit";
import { setInvestorLists, addList } from "../../redux/listReducer";
const {
    CREATE_LIST_API,
    GET_LIST_DETAILS_API,
    DELETE_LIST_API,
    ADD_INVESTOR_TO_LIST_API,
    REMOVE_INVESTOR_FROM_LIST_API,
    UPDATE_LIST_API,
} = endpoints;

const createList = async (name: string, description: string, email: string, dispatch: Dispatch) => {

    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("POST", CREATE_LIST_API, {
            name,
            description,
            email
        });

        if (!response.data.success) {
            throw new Error(response.data.message);
        }
        toast.success("List created successfully");
        console.log('response.data.list', response.data.list);
        dispatch(addList(response.data.list));
    } catch (error: any) {
        const errorResponse = error?.response?.data?.message;
        toast.error(errorResponse);
    }
    toast.dismiss(toastId);
}

const getListDetails = async (email: string, dispatch: Dispatch) => {
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("GET", GET_LIST_DETAILS_API, null, null, { email },);
        if (!response.data.success) {
            throw new Error(response.data.message);
        }
        dispatch(setInvestorLists(response.data.lists));
    } catch (error: any) {
        const errorResponse = error?.response?.data?.message;
        toast.error(errorResponse);
    }
    toast.dismiss(toastId);
}

const deleteList = async (id: string, email: string, dispatch: Dispatch, navigate: any) => {
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("DELETE", DELETE_LIST_API, { listId: id, email });
        if (!response.data.success) {
            throw new Error(response.data.message);
        }
        dispatch(setInvestorLists(response.data.lists));
        toast.success("List deleted successfully");
        navigate("/lists");
    } catch (error: any) {
        const errorResponse = error?.response?.data?.message;
        toast.error(errorResponse);
    }
    toast.dismiss(toastId);
}

const addInvestorToList = async (listIds: string[], investorIds: string[], email: string, dispatch: Dispatch) => {
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("POST", ADD_INVESTOR_TO_LIST_API, { listIds, investorIds, email });
        if (!response.data.success) {
            throw new Error(response.data.message);
        }
        dispatch(setInvestorLists(response.data.lists));
        console.log('response.data.lists', response.data.lists);
        toast.success("Investor added to list successfully");
    } catch (error: any) {
        const errorResponse = error?.response?.data?.message;
        toast.error(errorResponse);
    }
    toast.dismiss(toastId);
}

const removeInvestorFromList = async (listId: string, investorId: string, email: string, dispatch: Dispatch) => {
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("PUT", REMOVE_INVESTOR_FROM_LIST_API, { email, listId, investorId });
        if (!response.data.success) {
            throw new Error(response.data.message);
        }
        toast.success("Investor removed from list successfully");
        dispatch(setInvestorLists(response.data.lists));
    } catch (error: any) {
        const errorResponse = error?.response?.data?.message;
        toast.error(errorResponse);
    }
    toast.dismiss(toastId);
}

const updateList = async (name: string, description: string, email: string, id: string, dispatch: Dispatch) => {
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("PUT", UPDATE_LIST_API, { name, description, email, id });
        if (!response.data.success) {
            throw new Error(response.data.message);
        }
        toast.success("List updated successfully");
        dispatch(setInvestorLists(response.data.lists));
    } catch (error: any) {
        const errorResponse = error?.response?.data?.message;
        toast.error(errorResponse);
    }
    toast.dismiss(toastId);
}

export { createList, getListDetails, deleteList, addInvestorToList, removeInvestorFromList, updateList };
