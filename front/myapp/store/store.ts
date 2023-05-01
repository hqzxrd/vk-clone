import { reducers } from './rootReducer'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
	reducer: reducers,
	devTools: true,
})

export type TypeRootState = ReturnType<typeof store.getState>
