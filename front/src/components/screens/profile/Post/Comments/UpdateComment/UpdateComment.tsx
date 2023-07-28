import { PostService } from '@/services/post/post.service'
import { IComment, IPost } from '@/types/post.types'
import { Dispatch, FC, SetStateAction, useState } from 'react'
import { useQueryClient } from 'react-query'

import Button from '@/components/ui/Form/Button'
import Textarea from '@/components/ui/Textarea/Textarea'

import styles from './UpdateComment.module.scss'

interface props {
	post: IPost
	comment: IComment
	setIsUpdate: Dispatch<SetStateAction<boolean>>
}

const UpdateComment: FC<props> = ({ post, comment, setIsUpdate }) => {
	const [text, setText] = useState<string>(comment.text)
	const queryClient = useQueryClient()

	const updateComment = async () => {
		const res = await PostService.updateComment(comment.id, text)

		if (res?.status === 200) {
			queryClient.invalidateQueries(`postComments/${post.id}`)
			setText(``)
			setIsUpdate(false)
		}
	}

	return (
		<div className={styles.updateComment}>
			<Textarea
				text={text}
				setText={setText}
				resize={true}
				style={{ height: `fit-content`, overflow: 'hidden', width: `100%` }}
			/>
			<Button onClick={() => updateComment()}>Сохранить</Button>
		</div>
	)
}

export default UpdateComment
