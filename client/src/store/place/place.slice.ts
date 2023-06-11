import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPlace, IPlacesResponse } from '../../types';

type InitialState = {
    isLoading: boolean,
    places: IPlace[]
}

const initialState: InitialState = {
    isLoading: false,
    places: []
}

const placeSlice = createSlice({
    name: 'place',
    initialState,
    reducers: {},
    // extraReducers: builder => {
    //     builder
    //         .addCase(fetchAllPlaces.pending, (state, action) => {
    //             state.isLoading = true
    //         })
    //         .addCase(fetchAllPlaces.fulfilled, (state, { payload }: PayloadAction<IPlace[]>) => {
    //             state.isLoading = false
    //             state.places = payload
    //         })
    //         .addCase(fetchAllPlaces.rejected, (state, action) => {

    //         })
    // }
})

export const placeReducer = placeSlice.reducer