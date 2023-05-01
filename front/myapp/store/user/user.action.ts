import { IAuthResponse, IEmailPassord } from './user.interface'
import { AuthService } from '@/services/auth/auth.service'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { toastr } from 'react-redux-toastr'

import { toastError } from '@/utils/toastError'

export const register = createAsyncThunk<IAuthResponse, IEmailPassord>(
	`auth/register`,
	async ({ email, password }, thunkApi) => {
		try {
			const res = await AuthService.register(email, password)
			toastr.success(`Регистрация`, `Успешно`)
			return res.data
		} catch (error) {
			toastError(error)
			return thunkApi.rejectWithValue(error)
		}
	}
)

export const login = createAsyncThunk<IAuthResponse, IEmailPassord>(
	`auth/login`,
	async ({ email, password }, thunkApi) => {
		try {
			const res = await AuthService.login(email, password)
			toastr.success(`Вход`, `Успешно`)
			return res.data
		} catch (error) {
			toastError(error)
			return thunkApi.rejectWithValue(error)
		}
	}
)

export const logout = createAsyncThunk(`auth/logout`, () => {
	AuthService.logout()
})

export const checkAuth = createAsyncThunk<IAuthResponse, IEmailPassord>(
	`auth/check-auth`,
	async (_, thunkApi) => {
		try {
			const res = await AuthService.getNewsTokens()
			return res.data
		} catch (error) {
			toastError(error)
			return thunkApi.rejectWithValue(error)
		}
	}
)
