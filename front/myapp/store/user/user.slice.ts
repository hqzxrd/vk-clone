import { checkAuth, code, login, logout, register } from './user.action'
import { IInitialState } from './user.interface'
import { createSlice } from '@reduxjs/toolkit'

import { getStoreLocal } from '@/utils/local-storage'

const initialState: IInitialState = {
	user: getStoreLocal(`user`),
	isLoading: false,
}

interface FulfilledAction<ThunkArg, PromiseResult> {
	type: string
	payload: PromiseResult
	meta: {
		requestId: string
		arg: ThunkArg
	}
}

export const userSlice = createSlice({
	name: `user`,
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(register.pending, (state) => {
			state.isLoading = true
		})
		builder.addCase(register.fulfilled, (state, { payload }) => {
			state.isLoading = false
			state.user = payload.user
		})
		builder.addCase(register.rejected, (state) => {
			state.isLoading = false
			state.user = null
		})
		///
		builder.addCase(login.pending, (state) => {
			state.isLoading = true
		})
		builder.addCase(login.fulfilled, (state, { payload }) => {
			state.isLoading = false
			state.user = payload.user
		})
		builder.addCase(login.rejected, (state) => {
			state.isLoading = false
			state.user = null
		})
		///
		builder.addCase(code.pending, (state) => {
			state.isLoading = true
		})
		builder.addCase(code.fulfilled, (state, { payload }) => {
			state.isLoading = false
			state.user!.isAuth = true
		})
		builder.addCase(code.rejected, (state) => {
			state.isLoading = false
		})
		///
		builder.addCase(logout.fulfilled, (state) => {
			state.isLoading = false
			state.user = null
		})

		builder.addCase(checkAuth.fulfilled, (state, { payload }) => {
			state.user = payload.user
		})
	},
})

export const { reducer } = userSlice
