import {
	checkAuth,
	code,
	confirmation,
	login,
	logout,
	register,
} from './user.action'
import { IInitialState } from './user.interface'
import { IUserDto } from '@/types/auth.types'
import { createSlice } from '@reduxjs/toolkit'

import {
	getAuthStatusLocalStore,
	getUserLocalStore,
} from '@/utils/local-storage'

export const initialUser: IUserDto = {
	id: 0,
	email: ``,
	name: ``,
	surname: ``,
	avatar: ``,
}

const initialState: IInitialState = {
	user: getUserLocalStore(`user`) || initialUser,
	isAuth: getAuthStatusLocalStore(`auth`),
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
			state.isAuth = true
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
			state.isAuth = true
		})
		builder.addCase(login.rejected, (state) => {
			state.isLoading = false
			state.user = initialUser
		})
		///
		builder.addCase(logout.fulfilled, (state) => {
			state.isLoading = false
			state.user = initialUser
			state.isAuth = null
		})
		builder.addCase(checkAuth.fulfilled, (state, { payload }) => {
			// state.user = payload.user
		})
	},
})

export const { reducer } = userSlice
