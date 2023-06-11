import { axiosInstancePrivate } from "../api/axios"
import { setCredentials } from "../store/user/auth.slice"
import { IAuthResponse } from "../types"
import { useAppDispatch } from "./hooks"

export const useRefresh = () => {
    const dispatch = useAppDispatch()

    const refresh = async () => {
        try {
            const response = await axiosInstancePrivate.post<IAuthResponse>('/api/token/refresh', null, {
                withCredentials: true
            })
    
            dispatch(setCredentials({ 
                accessToken: response.data.accessToken, 
                role: response.data.role,
                user: response.data.user
            }))
    
            return response   
        } catch (error) {
            console.log('error refresh', error)
        }
    }

    return { refresh }
}