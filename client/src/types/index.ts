
export type FormData = {
    email: string
    password: string
    name?: string
    surname?: string
}

export interface IUser {
    id: number | null
    name: string
    surname: string
    email: string
}

export interface IAuthResponse  {
    user: IUser,
    role: string,
    accessToken: string
}

export interface IPlace {
    id: number
    title: string
    description: string
    images: string[]
    numberGuests: null | number
    price: null | number
}

export interface IPlacesResponse {
    places: IPlace[]
}

export interface IOnePlaceResponse {
    place: IPlace
}

export interface IResultAuthResponse {
    payload: IAuthResponse
}

export interface IErrorsValidation {
    errors: [
        {password: string}
    ]
}