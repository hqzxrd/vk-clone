import { createSlice } from '@reduxjs/toolkit'

type TypeTheme = `light` | `dark`

export interface IInitialTheme {
	theme: TypeTheme
}

export const initialState: IInitialTheme = {
	theme: `light`,
}

export const themeSlice = createSlice({
	name: `theme`,
	initialState,
	reducers: {
		changeTheme(state) {
			if (state.theme === `light`) {
				state.theme = `dark`
			} else {
				state.theme = `light`
			}
		},
	},
})

export const { changeTheme } = themeSlice.actions

export const { reducer } = themeSlice
