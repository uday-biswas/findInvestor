// import axios, { AxiosRequestConfig } from "axios";

// const axiosInstance = axios.create({});

// const apiConnector = async (method: AxiosRequestConfig["method"], url: string, bodyData: any, headers: AxiosRequestConfig["headers"], params: AxiosRequestConfig["params"]) => {
//     try {
//         const response = await axiosInstance({
//           method,
//           url,
//           data: bodyData || null,
//           headers: headers || null,
//           params: params || null,
//         });
//         return response.data;
//       } catch (error) {
//         // Handle or log the error
//         console.error("API Error:", error);
//         throw error;
//       }
// };
// export { apiConnector, axiosInstance };

import axios from "axios";

const axiosInstance = axios.create({});

const apiConnector = (method: any, url: any, bodyData?: any, headers?: any, params?: any) => {
    return axiosInstance({
        method: `${method}`,
        url: `${url}`,
        data: bodyData ? bodyData : null,
        headers: headers ? headers : null,
        params: params ? params : null,
    });
};
export { apiConnector, axiosInstance };