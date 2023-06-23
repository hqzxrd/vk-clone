import Comment from './Comment/Comment'
import { PostService } from '@/services/post/post.service'
import { IPost } from '@/types/post.types'
import { FC, KeyboardEvent, useState } from 'react'
import { useQueryClient } from 'react-query'

import AvatarMini from '@/components/ui/AvatarMini/AvatarMini'
import SendIcon from '@/components/ui/Icon/Send'
import Textarea from '@/components/ui/Textarea/Textarea'

import { useAuth } from '@/hooks/useAuth'
import { useComments } from '@/hooks/useComments'
import { useProfile } from '@/hooks/useProfile'

import styles from './Comments.module.scss'

interface props {
	post: IPost
}

const Comments: FC<props> = ({ post }) => {
	const [text, setText] = useState<string>(``)
	const { user } = useAuth()
	const { profile } = useProfile()
	const { comments } = useComments(post.id, `?post=${post.id}`)
	const queryClient = useQueryClient()

	const pressEnter = (e: KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === `Enter` && e.shiftKey == false) {
			e.preventDefault()
			sendComment()
		}
	}

	const sendComment = async () => {
		if (!text) return

		const res = await PostService.createComment(post.id, text)

		if (res.status === 201) {
			queryClient.invalidateQueries(`postComments/${post.id}`)
			setText(``)
		}
	}

	if (!profile || !comments) return <></>

	return (
		<div className={styles.comments}>
			{comments[0].map((comment) => {
				return <Comment post={post} comment={comment} key={comment.id} />
			})}

			<div className={styles.create_comment}>
				<AvatarMini user={user} width={32} height={32} isLink={false} />

				<div className={styles.textarea_wrapper}>
					<Textarea
						text={text}
						setText={setText}
						resize={true}
						placeholder="Написать комментарий..."
						style={{ overflow: `hidden`, height: 35, fontSize: 14 }}
						onKeyDown={(e) => pressEnter(e)}
					/>
				</div>
				<div className={styles.send}>
					<SendIcon onClick={() => sendComment()} />
				</div>
			</div>
		</div>
	)
}

export default Comments
