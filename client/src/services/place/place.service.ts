import { IOnePlaceResponse, IPlacesResponse } from "../../types"
import { axiosInstance } from "../../api/axios";
import { ULR_ONE_PLACE, URL_PLACES } from "../../urls/consts/consts";

const PlaceService = {
    async getAllPlaces() {
        const response = await axiosInstance.get<IPlacesResponse>(URL_PLACES)
        return response
    },

    async getOnePlace(id: string) {
        const response = await axiosInstance.get<IOnePlaceResponse>(ULR_ONE_PLACE + `${id}`)
        return response
    }
}

export default PlaceService


