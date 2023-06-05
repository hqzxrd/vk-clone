import { PostService } from '@/services/post/post.service'
import { FC, useRef, useState } from 'react'
import { useQueryClient } from 'react-query'

import AvatarMini from '@/components/ui/AvatarMini/AvatarMini'
import SendIcon from '@/components/ui/Icon/Send'
import Textarea from '@/components/ui/Textarea/Textarea'

import { useComments } from '@/hooks/useComments'
import { useProfile } from '@/hooks/useProfile'

import styles from './Comment.module.scss'

interface props {
	postId: number
}

const Comments: FC<props> = ({ postId }) => {
	const [text, setText] = useState<string>(``)
	const { profile } = useProfile()
	const { comments } = useComments(postId, `?post=${postId}`)
	const queryClient = useQueryClient()
	const send = async () => {
		const res = await PostService.createComment(postId, text)

		if (res.status === 201) {
			queryClient.invalidateQueries(`postComments/${postId}`)
			setText(``)
		}
	}

	if (!profile || !comments) return <></>

	return (
		<div className={styles.comments}>
			{comments[0].map((comment) => {
				return (
					<div className={styles.comment}>
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
							<div className={styles.text}>{comment.text}</div>
						</div>
					</div>
				)
			})}

			<div className={styles.create_comment}>
				<div>
					<AvatarMini user={profile} width={33} height={33} isLink={false} />
				</div>
				<div className={styles.textarea_wrapper}>
					<Textarea
						text={text}
						setText={setText}
						resize={true}
						placeholder="Написать комментарий..."
						style={{ overflow: `hidden`, height: 35 }}
					/>
				</div>
				<div className={styles.send}>
					<SendIcon onClick={() => send()} />
				</div>
			</div>
		</div>
	)
}

export default Comments
