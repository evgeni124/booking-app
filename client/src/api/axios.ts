import axios, { InternalAxiosRequestConfig, AxiosResponse } from "axios";
import { SERVER_URL } from "../urls/consts/consts";

export const axiosInstance = axios.create({
    baseURL: SERVER_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
})

export const axiosInstancePrivate = axios.create({
    baseURL: SERVER_URL,
    withCredentials: true
})

export type axiosRequestConfig = InternalAxiosRequestConfig
export type axiosResponse = AxiosResponse