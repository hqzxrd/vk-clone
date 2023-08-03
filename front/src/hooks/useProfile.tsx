import { useAuth } from './useAuth'
import { UserService } from '@/services/user/user.service'
import { useEffect } from 'react'
import { useQuery } from 'react-query'
import { useDispatch } from 'react-redux'

import { updateUserState } from '@/store/user/user.slice'

import { returnStringOrNubmer } from '@/utils/user-link'
import { useParams } from 'react-router-dom'

export const useProfile = (id?: number) => {
	const { user } = useAuth()
	const dispatch = useDispatch()
	const { userId } = useParams()
	const userIdStr = userId as string

	const { isLoading, data: profile } = useQuery(
		`${userIdStr ? userIdStr : id}`,
		() => UserService.getById(id ? id : returnStringOrNubmer(userIdStr)),
		{
			select: ({ data }) => data,
			enabled: id ? true : userIdStr !== undefined,
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
