import { createAsyncThunk } from "@reduxjs/toolkit"
import { IPlace } from "../../../types"
import { AxiosError } from "axios"
import PlaceService from "../../../services/place/place.service"


// export const fetchAllPlaces = createAsyncThunk<IPlace[], void>('fetch/places', async (_, thunkApi) => {
//     try {
//         const response = await PlaceService.getAllPlaces()
//         return response.data
//     } catch (error) {
//         const err = error as AxiosError
//         return thunkApi.rejectWithValue(err)
//     }
// })