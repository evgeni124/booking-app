import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hooks";
import { useRefresh } from "./useRefresh";
import { axiosInstancePrivate } from "../api/axios";
import type { axiosRequestConfig, axiosResponse } from "../api/axios";
import { setCredentials } from "../store/user/auth.slice";
import { useNavigate } from "react-router-dom";

export const useAxiosPrivate = () => {
    const dispatch = useAppDispatch();
    const { accessToken } = useAppSelector(state => state.auth);
    const navigate = useNavigate()
    const { refresh } = useRefresh();

    useEffect(() => {
        const requestIntercept = axiosInstancePrivate.interceptors.request.use((config: axiosRequestConfig) => {
            if (!config.headers['Authorization']) {
                config.headers['Authorization'] = `Bearer ${accessToken}`
            }
            return config
        }, (error) => Promise.reject(error))

        const responseIntercept = axiosInstancePrivate.interceptors.response.use((response: axiosResponse) => response, async (error) => {
            const originalRequest = error?.config

            if (error.response.status === 401 && !accessToken && error.config) {
                console.log(401, error)
                navigate('/login')
            }

            if (error.response.status === 403 && !originalRequest._isRetry) {
                originalRequest._isRetry = true;
                const response = await refresh()
                
                if (response?.status === 200 && response.data.accessToken) {
                    originalRequest.headers['Authorization'] = `Bearer ${response.data.accessToken}`
                    dispatch(setCredentials({ 
                        accessToken: response.data.accessToken, 
                        role: response.data.role,
                        user: response.data.user
                    }))
                }

                return axiosInstancePrivate(originalRequest)
            }

            return Promise.reject(error)
        })

        return () => {
            axiosInstancePrivate.interceptors.request.eject(requestIntercept)
            axiosInstancePrivate.interceptors.response.eject(responseIntercept)
        }
    }, [accessToken, refresh])

    return axiosInstancePrivate
}