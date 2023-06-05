import { PostService } from '@/services/post/post.service'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'

export const useComments = (postId: number, queries: string) => {
	const { query } = useRouter()

	const { isLoading, data: comments } = useQuery(
		`postComments/${postId}`,
		() => PostService.getCommentsByPostId(queries ? queries : ``),
		{
			select: ({ data }) => data,
		}
	)

	return { isLoading, comments }
}
