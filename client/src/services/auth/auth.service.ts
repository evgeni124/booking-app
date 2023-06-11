import { axiosInstance, axiosInstancePrivate } from "../../api/axios";
import { FormData } from "../../types";
import { IAuthResponse } from "../../types";
import { URL_USER_LOGIN, URL_USER_LOGOUT, URL_USER_REGISTER } from "../../urls/consts/consts";

const AuthService = {
    async login(data: FormData) {
        const response = await axiosInstance.post<IAuthResponse>(URL_USER_LOGIN, data, {
            withCredentials: true
        })
        return response
    },

    async register(data: FormData) {
        const response = await axiosInstance.post<IAuthResponse>(URL_USER_REGISTER, data, {
            withCredentials: true
        })
        return response
    },

    async logout() {
        const response = await axiosInstancePrivate.post(URL_USER_LOGOUT, null, {
            withCredentials: true
        })
        return response
    }
}

export default AuthService