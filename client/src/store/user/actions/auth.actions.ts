import { createAsyncThunk } from '@reduxjs/toolkit';
import AuthService from '../../../services/auth/auth.service';
import { FormData, IAuthResponse } from '../../../types';
import { AxiosError } from 'axios';

export const login = createAsyncThunk<IAuthResponse, FormData>('user/login', async (data, thunkApi) => {
    try {
        const response = await AuthService.login(data)
        return response.data
    } catch (error) {
        const err = error as AxiosError
        return thunkApi.rejectWithValue(err)
    }
})

export const register = createAsyncThunk('user/register', async (data: FormData, thunkApi) => {
    try {
        const response = await AuthService.register(data)
        return response.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const logout = createAsyncThunk('user/logout', async (_, thunkApi) => {
    try {
        const response = await AuthService.logout()
        return response.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})