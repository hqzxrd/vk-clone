import { bindActionCreators } from '@reduxjs/toolkit'
import { useMemo } from 'react'

import { actions } from '@/store/rootActions'
import { useAppDispatch } from '@/store/store'

export const useActions = () => {
	const dispatch = useAppDispatch()

	return useMemo(() => bindActionCreators(actions, dispatch), [dispatch])
}
