import { bindActionCreators } from '@reduxjs/toolkit'
import { useMemo } from 'react'
import { useDispatch } from 'react-redux'

import { actions } from '@/store/rootActions'
import { useAppDispatch } from '@/store/store'

export const useActions = async () => {
	const dispatch = useAppDispatch()

	return useMemo(() => bindActionCreators(actions, dispatch), [dispatch])
}
