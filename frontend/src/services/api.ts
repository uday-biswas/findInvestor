const BASE_URL = window.location.origin.includes('3000')
    ? window.location.origin.replace("3000", "4000/api/v1")
    : import.meta.env.VITE_BACKEND_URL;
// const BASE_URL = window.location.origin.replace(":3000", ":4000/api/v1");

// AUTH ENDPOINT
export const endpoints = {
    SENDOTP_API: BASE_URL + "/auth/sendotp",
    SIGNUP_API: BASE_URL + "/auth/signup",
    LOGIN_API: BASE_URL + "/auth/login",
    RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
    RESETPASSWORD_API: BASE_URL + "/auth/reset-password",

    INVESTOR_API: BASE_URL + "/investor/getInvestorDetails",
    PITCHDECK_API: BASE_URL + "/pitchdeck/getpitchdeckdetails",

    GET_USER_DETAILS_API: BASE_URL + "/profile/getUserDetails",
    UPDATE_PROFILE_API: BASE_URL + "/profile/updateProfile",
    UPGRADE_USING_STRIPE_API: BASE_URL + "/profile/upgradeUser",
    PAYMENT_SUCCESS_API: BASE_URL + "/profile/paymentSuccess",

    COURSE_PAYMENT_API: BASE_URL + "/payment/capturePayment",
    COURSE_VERIFY_API: BASE_URL + "/payment/verifyPayment",
    SEND_PAYMENT_SUCCESS_EMAIL_API: BASE_URL + "/payment/sendPaymentSuccessEmail",

    CREATE_LIST_API: BASE_URL + "/list/createList",
    GET_LIST_DETAILS_API: BASE_URL + "/list/getListDetails",
    DELETE_LIST_API: BASE_URL + "/list/deleteList",
    ADD_PAGE_TO_LIST_API: BASE_URL + "/list/addPageToList",
    ADD_INVESTOR_TO_LIST_API: BASE_URL + "/list/addInvestorToList",
    REMOVE_INVESTOR_FROM_LIST_API: BASE_URL + "/list/removeInvestorFromList",
    UPDATE_LIST_API: BASE_URL + "/list/updateList",
};
