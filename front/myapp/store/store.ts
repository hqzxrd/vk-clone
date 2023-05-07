import { reducers } from './rootReducer'
import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

export const store = configureStore({
	reducer: reducers,
	devTools: true,
})

export type TypeRootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
