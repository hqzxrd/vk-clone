import { PostService } from '@/services/post/post.service'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'

export const usePosts = (queries?: string) => {
	const { query } = useRouter()

	const { isLoading, data: posts } = useQuery(
		`userPosts${query.id}`,
		() => PostService.getAll(queries ? queries : ``),
		{
			select: ({ data }) => data,
		}
	)

	return { isLoading, posts }
}
