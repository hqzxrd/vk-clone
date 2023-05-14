import { UserService } from '@/services/user/user.service'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'

export const useProfile = (userid?: number) => {
	const { query } = useRouter()

	const id = query.id as string

	const { isLoading, data } = useQuery(
		`get_profile`,
		() => UserService.getById(userid ? userid : +id),
		{
			select: ({ data }) => data,
		}
	)

	return { isLoading, data }
}
