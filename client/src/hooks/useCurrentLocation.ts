import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

export const useCurrentLocation = () => {
    const location = useLocation()
    const [pathName, setPathName] = useState('')

    useEffect(() => {
        setPathName(location.pathname)
    }, [location])

    return { pathName }
}