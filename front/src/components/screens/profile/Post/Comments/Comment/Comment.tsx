import UpdateComment from '../UpdateComment/UpdateComment'
import { PostService } from '@/services/post/post.service'
import { IComment, IPost } from '@/types/post.types'
import { FC, useState } from 'react'
import { useQueryClient } from 'react-query'

import AvatarMini from '@/components/ui/AvatarMini/AvatarMini'
import PencilIcon from '@/components/ui/Icon/PencilIcon'

import { useAuth } from '@/hooks/useAuth'

import styles from './Comment.module.scss'

interface props {
	comment: IComment
	post: IPost
}

const Comment: FC<props> = ({ post, comment }) => {
	const [isUpdate, setIsUpdate] = useState<boolean>(false)
	const { user } = useAuth()
	const queryClient = useQueryClient()

	const deleteComment = async (commentId: number) => {
		console.log(user.id, post.author.id)
		const res = await PostService.deleteComment(commentId)

		if (res.status === 204)
			queryClient.invalidateQueries(`postComments/${post.id}`)
	}

	return (
		<div className={styles.comment}>
			{user.id === comment.author.id ? (
				<div className={styles.comment_actions}>
					<div className={styles.update} onClick={() => setIsUpdate(!isUpdate)}>
						<PencilIcon />
					</div>
					<div
						className={styles.delete}
						onClick={() => deleteComment(comment.id)}
					>
						X
					</div>
				</div>
			) : (
				<></>
			)}

			<div className={styles.main}>
				<AvatarMini
					user={comment.author}
					width={35}
					height={35}
					isLink={true}
				/>

				<div className={styles.content}>
					<div className={styles.name}>
						{comment.author.name} {comment.author.surname}
					</div>
					{isUpdate ? (
						<UpdateComment
							post={post}
							comment={comment}
							setIsUpdate={setIsUpdate}
						/>
					) : (
						<div className={styles.text}>{comment.text}</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default Comment
