import { useEffect, useState } from "react"
import { IPlacesResponse } from "../types"
import PlaceService from "../services/place/place.service"

const useFetch = <T>() => {
    const [data, setPlaces] = useState<IPlacesResponse>({ places: [] })
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<any>()

    useEffect(() => {
        const fetchAlltPlaces = async () => {
            try {
                setIsLoading(true)
                const response = await PlaceService.getAllPlaces()
                setPlaces({ places: response.data.places })
                setIsLoading(false)
            } catch (error) {
                setError(error)
            } finally {
                setIsLoading(false)
            }
        }
        
        fetchAlltPlaces()
    }, [])

    return { data, isLoading, error }
}

export default useFetch