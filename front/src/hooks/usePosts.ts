import { PostService } from '@/services/post/post.service'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'

export const usePosts = (queries?: string) => {
	const { userId } = useParams()

	const { isLoading, data: posts } = useQuery(
		`userPosts${userId}`,
		() => PostService.getAll(queries ? queries : ``),
		{
			select: ({ data }) => data,
		}
	)

	return { isLoading, posts }
}
