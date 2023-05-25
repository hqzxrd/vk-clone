import { createSlice } from '@reduxjs/toolkit'

import { getTheme, saveTheme } from '@/utils/local-storage'

export type TypeTheme = `light` | `dark`

export interface IInitialTheme {
	theme: TypeTheme
}

export const initialState: IInitialTheme = {
	theme: getTheme(`theme`) ? (getTheme(`theme`) as TypeTheme) : `light`,
}

export const themeSlice = createSlice({
	name: `theme`,
	initialState,
	reducers: {
		changeTheme(state) {
			if (state.theme === `light`) {
				state.theme = `dark`
				saveTheme(`theme`, `dark`)
			} else {
				state.theme = `light`
				saveTheme(`theme`, `light`)
			}
		},
	},
})

export const { changeTheme } = themeSlice.actions

export const { reducer } = themeSlice
