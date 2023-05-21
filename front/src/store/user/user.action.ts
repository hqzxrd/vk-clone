import { AuthService } from '@/services/auth/auth.service'
import {
	ICodeEmailDto,
	ILoginFields,
	ILoginRegisterResponse,
	IRegisterFieldsDto,
} from '@/types/auth.types'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { toastr } from 'react-redux-toastr'

import { toastError } from '@/utils/toastError'

export const confirmation = createAsyncThunk<
	{ status: number; email: string },
	{ email: string }
>(`auth/confirmation`, async ({ email }, thunkApi) => {
	try {
		const res = await AuthService.confirmation(email)

		return { status: res.status, email }
	} catch (error) {
		toastError(error)
		return thunkApi.rejectWithValue(error)
	}
})

export const code = createAsyncThunk<number, ICodeEmailDto>(
	`auth/code`,
	async ({ code, email }, thunkApi) => {
		try {
			const res = await AuthService.code(code, email)

			return res.status
		} catch (error) {
			toastError(error)
			return thunkApi.rejectWithValue(error)
		}
	}
)

export const register = createAsyncThunk<
	ILoginRegisterResponse,
	IRegisterFieldsDto
>(`auth/registration`, async (user, thunkApi) => {
	try {
		const res = await AuthService.register(user)
		toastr.success(`Регистрация`, `Успешно`)

		return res.data
	} catch (error) {
		toastError(error)
		return thunkApi.rejectWithValue(error)
	}
})

export const login = createAsyncThunk<ILoginRegisterResponse, ILoginFields>(
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

export const checkAuth = createAsyncThunk<ILoginRegisterResponse>(
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
