import {
	checkAuth,
	code,
	confirmation,
	login,
	logout,
	register,
} from './user.action'
import { IInitialState } from './user.interface'
import { IUser } from '@/types/user.types'
import { createSlice } from '@reduxjs/toolkit'

import {
	getAutorizeStatusLocalStore,
	getUserLocalStore,
} from '@/utils/local-storage'

export const initialUser: IUser = {
	isAuth: false,
	email: ``,
	name: ``,
	surname: ``,
}

const initialState: IInitialState = {
	user: getUserLocalStore(`user`) || initialUser,
	isAutorized: getAutorizeStatusLocalStore(`isAutorized`),
	isLoading: false,
}
export const userSlice = createSlice({
	name: `user`,
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(confirmation.pending, (state) => {
			state.isLoading = true
		})
		builder.addCase(confirmation.fulfilled, (state, { payload }) => {
			state.isLoading = false
			state.user.email = payload.email
		})
		builder.addCase(confirmation.rejected, (state) => {
			state.isLoading = false
		})
		///
		builder.addCase(code.pending, (state) => {
			state.isLoading = true
		})
		builder.addCase(code.fulfilled, (state) => {
			state.isLoading = false
		})
		builder.addCase(code.rejected, (state) => {
			state.isLoading = false
		})
		///
		builder.addCase(register.pending, (state) => {
			state.isLoading = true
		})
		builder.addCase(register.fulfilled, (state, { payload }) => {
			state.isLoading = false
			state.user = payload.user
			state.isAutorized = true
		})
		builder.addCase(register.rejected, (state) => {
			state.isLoading = false
			state.user = initialUser
		})
		///
		builder.addCase(login.pending, (state) => {
			state.isLoading = true
		})
		builder.addCase(login.fulfilled, (state, { payload }) => {
			state.isLoading = false
			state.user = payload.user
			state.isAutorized = true
		})
		builder.addCase(login.rejected, (state) => {
			state.isLoading = false
			state.user = initialUser
		})
		///
		builder.addCase(logout.fulfilled, (state) => {
			state.isLoading = false
			state.user = initialUser
			state.isAutorized = false
		})
		builder.addCase(checkAuth.fulfilled, (state, { payload }) => {
			state.user = payload.user
		})
	},
})

export const { reducer } = userSlice
