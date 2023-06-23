import UpdateComment from '../UpdateComment/UpdateComment'
import { PostService } from '@/services/post/post.service'
import { IComment, IPost } from '@/types/post.types'
import cn from 'classnames'
import Link from 'next/link'
import { FC, useState } from 'react'
import { useQueryClient } from 'react-query'

import AvatarMini from '@/components/ui/AvatarMini/AvatarMini'
import LikeIcon from '@/components/ui/Icon/LikeIcon'
import PencilIcon from '@/components/ui/Icon/PencilIcon'

import { useAuth } from '@/hooks/useAuth'

import styles from './Comment.module.scss'

interface props {
	comment: IComment
	post: IPost
}

const Comment: FC<props> = ({ post, comment }) => {
	console.log(comment)

	const [likes, setLikes] = useState<number>(comment.countLikes)
	const [isLike, setIsLike] = useState<boolean>(comment.isLike)
	const [isUpdate, setIsUpdate] = useState<boolean>(false)
	const { user } = useAuth()
	const queryClient = useQueryClient()

	const deleteComment = async () => {
		const res = await PostService.deleteComment(comment.id)

		if (res.status === 204)
			queryClient.invalidateQueries(`postComments/${post.id}`)
	}

	const likeComment = async () => {
		const res = await PostService.likeComment(comment.id)
		console.log(res.status)

		if (res.status === 200) {
			setLikes(res.data.countLikes)
			setIsLike(res.data.isLike)
			queryClient.invalidateQueries(`postComments/${post.id}`)
		}
	}

	return (
		<div className={styles.comment}>
			{user.id === post.author.id || user.id === comment.author.id ? (
				<div className={styles.comment_actions}>
					<div className={styles.update} onClick={() => setIsUpdate(!isUpdate)}>
						{user.id === comment.author.id ? <PencilIcon /> : <></>}
					</div>
					<div className={styles.delete} onClick={() => deleteComment()}>
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
					<Link href={`/users/${comment.author.id}`} className={styles.name}>
						{comment.author.name} {comment.author.surname}
					</Link>
					{isUpdate ? (
						<UpdateComment
							post={post}
							comment={comment}
							setIsUpdate={setIsUpdate}
						/>
					) : (
						<>
							<div className={styles.text}>{comment.text}</div>
							<div className={styles.reactions}>
								<div
									className={
										isLike ? cn(styles.like, styles.isLiked) : styles.like
									}
									onClick={() => likeComment()}
								>
									<LikeIcon /> {likes}
								</div>
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	)
}

export default Comment
