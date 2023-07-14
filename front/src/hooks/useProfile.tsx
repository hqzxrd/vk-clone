import { useAuth } from './useAuth'
import { UserService } from '@/services/user/user.service'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useQuery } from 'react-query'
import { useDispatch } from 'react-redux'

import { updateUserState } from '@/store/user/user.slice'

import { returnStringOrNubmer } from '@/utils/user-link'

export const useProfile = (userid?: number) => {
	const { user } = useAuth()
	const dispatch = useDispatch()
	const { query } = useRouter()
	const id = query.id as string

	const { isLoading, data: profile } = useQuery(
		`${id ? id : userid}`,
		() => UserService.getById(userid ? userid : returnStringOrNubmer(id)),
		{
			select: ({ data }) => data,
			enabled: userid ? true : query.id !== undefined,
		}
	)

	useEffect(() => {
		if (profile && user.id === profile.id) {
			localStorage.setItem('user', JSON.stringify(profile))
			dispatch(updateUserState(profile))
		}
	}, [profile])

	return { isLoading, profile }
}
