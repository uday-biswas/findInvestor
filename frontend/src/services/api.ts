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

    COURSE_PAYMENT_API: BASE_URL + "/payment/capturePayment",
    COURSE_VERIFY_API: BASE_URL + "/payment/verifyPayment",
    SEND_PAYMENT_SUCCESS_EMAIL_API: BASE_URL + "/payment/sendPaymentSuccessEmail",
};
