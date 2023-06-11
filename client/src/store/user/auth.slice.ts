import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { login } from './actions/auth.actions';
import { IAuthResponse, IUser } from '../../types';

type InitialState = {
    isLoading: boolean,
    user: IUser,
    role: string,
    accessToken: string,
}

const initialState: InitialState = {
    isLoading: false,
    user: {
        id: null,
        email: '',
        surname: '',
        name: ''
    },
    role: '',
    accessToken: '',
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, { payload }: PayloadAction<IAuthResponse>) => {
            state.accessToken = payload.accessToken
            state.role = payload.role
            state.user = payload.user
        },
        logOut: (state) => {
            state.accessToken = ''
            state.role = ''
            state.user = {
                email: '',
                id: null,
                surname: '',
                name: ''
            }
        }   
    },
    extraReducers: builder => {
        builder
            .addCase(login.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, { payload }: PayloadAction<IAuthResponse>) => {
                state.isLoading = false
                state.accessToken = payload.accessToken
                state.role = payload.role
                state.user = payload.user
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false
                state.accessToken = ''
            })
    }
})

export const { setCredentials, logOut } = authSlice.actions
export const authReducer = authSlice.reducer