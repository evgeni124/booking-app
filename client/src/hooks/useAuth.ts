import { useEffect, useState } from "react"
import { useAppSelector } from "./hooks"

const useAuth = () => {
    const { accessToken } = useAppSelector(state => state.auth)
    
    const isAuth = Boolean(accessToken)

    return { isAuth }
}

export default useAuth