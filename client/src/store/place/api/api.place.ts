import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { SERVER_URL } from '../../../urls/consts/consts';
import { useAppSelector } from '../../../hooks/hooks';

export const placeApi = createApi({
    reducerPath: 'placeApi',
    baseQuery: fetchBaseQuery({ baseUrl: SERVER_URL + '/api'}),
    endpoints: (builder) => ({
        getAllPlaces: builder.query<null, null>({
            query: () => ({
                url: '/places/all',
                headers: { 'Authorization': ''}
            })
        })
    })
})


export const { useGetAllPlacesQuery } = placeApi