import { PostService } from '@/services/post/post.service'
import { useQuery } from 'react-query'

export const useComments = (
	postId: number,
	queries: string,
	enabled?: boolean
) => {
	const { isLoading, data: comments } = useQuery(
		`postComments/${postId}`,
		() => PostService.getCommentsByPostId(queries ? queries : ``),
		{
			select: ({ data }) => data,
			enabled: !enabled,
		}
	)

	return { isLoading, comments }
}
